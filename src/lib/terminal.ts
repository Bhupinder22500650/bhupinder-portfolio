import { PERSONAL_INFO } from '../data/site';
import { SKILLS } from '../data/experience';
import { STATIC_PROJECTS } from '../data/projects';
import { formatRepoName } from './projects';

const commands = new Map<string, () => string>([
  ['help', () => 'Available commands: help, whoami, about, skills, projects, contact, date, clear, echo [text]'],
  ['whoami', () => `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`],
  ['about', () => PERSONAL_INFO.tagline],
  ['contact', () => `Email: ${PERSONAL_INFO.email} | LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}`],
  ['skills', () => SKILLS.map(group => `${group.category}: ${group.items.join(', ')}`).join(' | ')],
  ['projects', () => `Featured Projects: ${STATIC_PROJECTS.map(project => formatRepoName(project.name)).join(', ')}`],
  ['date', () => new Date().toString()],
  ['sudo', () => 'Nice try! This incident will be reported.'],
]);

export function executeCommand(input: string): { clear: boolean; output: string } {
  const [command = '', ...args] = input.trim().split(/\s+/);
  const name = command.toLowerCase();
  if (name === 'clear') return { clear: true, output: '' };
  if (name === 'echo') return { clear: false, output: args.join(' ') };
  const handler = commands.get(name);
  return { clear: false, output: handler ? handler() : `Command not found: ${name}. Type "help" for a list of commands.` };
}
