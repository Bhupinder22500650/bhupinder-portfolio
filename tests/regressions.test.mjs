import test from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

const load = async name => (await import(pathToFileURL(join(process.env.PORTFOLIO_TEST_BUILD, name + '.js')).href)).default;
const { executeCommand } = await load('lib/terminal');
const { getBotResponse, getAssistantReply, ASSISTANT_WELCOME } = await load('lib/assistant');
const { mergeFeaturedRepos, readCachedRepos } = await load('lib/projects');
const { STATIC_PROJECTS, FEATURED_REPOSITORY_NAMES } = await load('data/projects');
const { normalizeContactMessage } = await load('lib/email');
const { readStorage, writeStorage } = await load('lib/storage');
const { THEME_INIT_SCRIPT } = await load('lib/theme');

test('prototype-property commands are treated as unknown text', () => {
  for (const name of ['constructor', '__proto__', 'toString', 'hasOwnProperty']) {
    const result = executeCommand(name);
    assert.equal(result.clear, false);
    assert.equal(typeof result.output, 'string');
    assert.match(result.output, /Command not found/);
  }
});

test('terminal handles normalized commands, echo, and clear', () => {
  assert.match(executeCommand(' HELP ').output, /Available commands/);
  assert.equal(executeCommand('echo   hello world').output, 'hello world');
  assert.deepEqual(executeCommand('clear'), { clear: true, output: '' });
});

test('partial and empty GitHub responses retain every featured project in order', () => {
  for (const data of [[], [STATIC_PROJECTS[0]], STATIC_PROJECTS.slice(1)]) {
    assert.deepEqual(mergeFeaturedRepos(data).map(project => project.name), [...FEATURED_REPOSITORY_NAMES]);
  }
});

test('live metadata merges without replacing case studies or accepting unsafe homepage URLs', () => {
  const live = { ...STATIC_PROJECTS[0], description: 'Updated description', homepage: 'javascript:alert(1)', problem: 'Untrusted case study' };
  const result = mergeFeaturedRepos([live])[0];
  assert.equal(result.description, 'Updated description');
  assert.equal(result.homepage, STATIC_PROJECTS[0].homepage);
  assert.equal(result.problem, STATIC_PROJECTS[0].problem);
});

test('cache rejects corrupt, expired, future, and malformed data', () => {
  const now = 2000000;
  for (const raw of ['broken JSON', 'null', '{}', JSON.stringify({ timestamp: 0, data: [] }), JSON.stringify({ timestamp: now + 1, data: [] }), JSON.stringify({ timestamp: now, data: null }), JSON.stringify({ timestamp: now, data: [{}] })]) {
    assert.equal(readCachedRepos(raw, now), null);
  }
  assert.deepEqual(readCachedRepos(JSON.stringify({ timestamp: now, data: STATIC_PROJECTS }), now), STATIC_PROJECTS);
});

test('assistant routes project and hiring questions instead of substring greetings', () => {
  assert.match(getBotResponse('Tell me about this project'), /Featured projects/);
  assert.match(getBotResponse('How can I hire you for a QA role?'), /You can reach/);
  assert.match(getBotResponse('Tell me about your technical testing experience'), /Junior Systems Tester/);
  assert.match(getBotResponse('hi'), /^Hello!/);
  assert.doesNotMatch(getBotResponse('this'), /^Hello!/);
});

test('assistant handles a greeting and casual follow-up without losing the conversation', () => {
  assert.match(getBotResponse('hi'), /^Hello!/);
  assert.match(getBotResponse('how are you'), /ready to help/);
  assert.match(getBotResponse('how r u?'), /ready to help/);
  assert.match(getBotResponse('thanks'), /welcome/i);
  for (const text of [ASSISTANT_WELCOME, getBotResponse('unknown topic'), getBotResponse('who are you')]) {
    assert.doesNotMatch(text, /demo|rule[- ]based/i);
  }
});

test('assistant remembers a project across technology, testing, and feature follow-ups', () => {
  const detail = getAssistantReply('Tell me about My Pay Tracker');
  const tech = getAssistantReply('What technologies does it use?', detail.context);
  assert.match(tech.text, /My Pay Tracker uses React Native/);
  assert.doesNotMatch(tech.text, /PHP/);
  const testing = getAssistantReply('How was it tested?', tech.context);
  assert.match(testing.text, /tax calculation engine/);
  const features = getAssistantReply('What are its features?', testing.context);
  assert.match(features.text, /Shift logging/);
  assert.ok(features.actions.some(action => action.href.endsWith('/My-Pay-tracker')));
});

test('assistant changes topics and does not attach old project context to personal questions', () => {
  const project = getAssistantReply('Tell me about the dealership project');
  assert.match(getAssistantReply('What technologies does it use?', project.context).text, /PHP, MySQL/);
  const personal = getAssistantReply('What are your top skills?', project.context);
  assert.equal(personal.context.projectName, undefined);
  assert.match(personal.text, /Strong/);
  assert.match(getAssistantReply('Where did you study?', project.context).text, /Bachelor of Information Technology/);
});

test('assistant supports project choices and technology-specific project searches', () => {
  const list = getAssistantReply('What projects have you built?');
  assert.match(getAssistantReply('Tell me about the second one', list.context).text, /Car Dealership/);
  const mobile = getAssistantReply('Which projects use React Native?');
  assert.match(mobile.text, /My Pay Tracker/);
  assert.doesNotMatch(mobile.text, /Lost And Found|Car Dealership/);
  const react = getAssistantReply('Which projects use React?');
  assert.match(getAssistantReply('Tell me about the second one', react.context).text, /Lost And Found Campus/);
  assert.match(getBotResponse('Which projects use Rust?'), /couldn.t find a featured project/);
  assert.match(getBotResponse('Compare My Pay Tracker and car dealership'), /Technology:/);
});

test('assistant separates project availability from personal availability', () => {
  const project = getAssistantReply('Tell me about My Pay Tracker');
  assert.match(getAssistantReply('Is it available to download?', project.context).text, /does not have a public download/);
  assert.match(getBotResponse('Is My Pay Tracker available to download?'), /does not have a public download/);
  assert.match(getBotResponse('Are you available for work?'), /currently open/);
});

test('assistant provides usable CV, certificate, section, and contact actions', () => {
  assert.ok(getAssistantReply('Download your résumé').actions.some(action => action.href === '/cv.pdf' && action.download));
  assert.ok(getAssistantReply('Show me the CCNA certificate').actions.some(action => action.href === '/certificates/ccna.jpg'));
  assert.ok(getAssistantReply('Show the Deloitte certificate').actions.some(action => action.href === '/certificates/data-analysis.pdf'));
  assert.ok(getAssistantReply('What certificates do you have?').actions.some(action => action.href === '/#certificates'));
  assert.ok(getAssistantReply('How do I contact you?').actions.some(action => action.href.startsWith('mailto:')));
  assert.match(getBotResponse('Are you available for work?'), /currently open/);
  assert.match(getBotResponse('What is your salary?'), /isn.t listed/);
});

test('contact rejects whitespace-only messages and trims valid submissions', () => {
  const valid = { from_name: ' Bhupinder ', from_email: ' test@example.com ', message: ' Hello ' };
  assert.deepEqual(normalizeContactMessage(valid), { from_name: 'Bhupinder', from_email: 'test@example.com', message: 'Hello' });
  assert.throws(() => normalizeContactMessage({ ...valid, message: '   ' }));
  assert.throws(() => normalizeContactMessage({ ...valid, from_name: '   ' }));
  assert.throws(() => normalizeContactMessage({ ...valid, from_email: 'bad-address' }));
});

test('storage helpers tolerate unavailable browser storage', () => {
  assert.equal(readStorage('theme'), null);
  assert.doesNotThrow(() => writeStorage('theme', 'light'));
});

test('theme bootstrap validates saved values and survives blocked storage', () => {
  const run = storage => {
    const document = { documentElement: { dataset: {} } };
    runInNewContext(THEME_INIT_SCRIPT, { document, localStorage: storage, matchMedia: () => ({ matches: true }) });
    return document.documentElement.dataset;
  };
  assert.deepEqual(run({ getItem: () => 'invalid' }), { theme: 'light', primary: 'clay' });
  assert.deepEqual(run({ getItem: () => { throw new Error('Storage blocked'); } }), { theme: 'light', primary: 'clay' });
  assert.deepEqual(run({ getItem: key => key === 'theme' ? 'dark' : 'sage' }), { theme: 'dark', primary: 'sage' });
});
