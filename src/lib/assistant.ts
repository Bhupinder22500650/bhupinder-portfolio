import { AVAILABLE_FOR_WORK, PERSONAL_INFO } from '../data/site';
import { EDUCATION, SKILLS } from '../data/experience';
import { STATIC_PROJECTS } from '../data/projects';
import { CERTIFICATES } from '../data/certificates';
import type { Project } from '../types/project';
import { formatRepoName } from './projects';

export interface AssistantAction {
  label: string;
  href: string;
  download?: boolean;
}

export interface AssistantContext {
  topic?: 'projects' | 'skills' | 'experience' | 'education' | 'certificates' | 'contact' | 'about';
  projectName?: string;
  projectNames?: string[];
}

export interface AssistantReply {
  text: string;
  actions: AssistantAction[];
  suggestions: string[];
  context: AssistantContext;
}

export const ASSISTANT_WELCOME = "Hi! I can help you explore Bhupinder's projects, skills, experience and qualifications. What would you like to know?";
export const SUGGESTED_QUESTIONS = [
  'What projects have you built?',
  'Tell me about your QA experience',
  'What are your top skills?',
  'How can I contact Bhupinder?',
];

const section = (id: string, label: string): AssistantAction => ({ label, href: `/#${id}` });
const contactActions: AssistantAction[] = [
  { label: 'Send an email', href: `mailto:${PERSONAL_INFO.email}` },
  section('contact', 'Contact form'),
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
];
const projectAliases = [
  ['my pay tracker', 'pay tracker', 'paytracker', 'pay app'],
  ['car dealership', 'dealership', 'car website', 'vehicle listings'],
  ['lost and found', 'lost found', 'campus app', 'campus project'],
];
const normalize = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, '').replace(/[^a-z0-9+#]+/g, ' ').trim()
  .replace(/\b(experiance|expereince)\b/g, 'experience')
  .replace(/\b(projets|projcts)\b/g, 'projects');
const containsPhrase = (text: string, phrase: string) => ` ${text} `.includes(` ${normalize(phrase)} `);
const testingQuestion = (text: string) => /\b(test(?:s|ed|er|ers|ing)?|qa|bugs?)\b/.test(text);
const stackQuestion = (text: string) => /\b(tech|technical|technologies|stack|frameworks?|languages?|tools)\b|built with/.test(text);

function reply(text: string, context: AssistantContext = {}, actions: AssistantAction[] = [], suggestions = SUGGESTED_QUESTIONS): AssistantReply {
  return { text, context, actions, suggestions };
}

function projectActions(project: Project): AssistantAction[] {
  const actions = [{ label: 'Source code', href: project.html_url }, section('projects', 'View case studies')];
  if (project.homepage) actions.unshift({ label: 'Open website', href: project.homepage });
  return actions;
}

function projectReply(project: Project, question: string): AssistantReply {
  const title = formatRepoName(project.name);
  const context: AssistantContext = { topic: 'projects', projectName: project.name };
  let text: string;
  if (testingQuestion(question)) {
    text = `${title} — testing\n${project.testing?.map(item => `• ${item}`).join('\n') || 'Detailed test coverage is not listed for this project.'}`;
  } else if (stackQuestion(question)) {
    text = `${title} uses ${project.techStack?.join(', ') || project.language || 'the technologies listed in its source code'}.`;
  } else if (/\b(features?|functionality)\b|what (?:can|does) it do/.test(question)) {
    text = `${title} — key features\n${project.features?.map(item => `• ${item}`).join('\n') || project.description}`;
  } else if (/\b(role|contribution|responsibilities)\b|what did (?:you|he) (?:do|build)/.test(question)) {
    text = `${title} — Bhupinder's contribution\n${project.role || project.solution}`;
  } else if (/\b(live|try|download|website)\b/.test(question)) {
    text = project.homepage
      ? `You can open ${title} using the website link below.`
      : `${title} does not have a public download or hosted website listed yet. You can explore its source code and case study below.`;
  } else if (/\b(github|code|source|link|links|open|see|view)\b/.test(question)) {
    text = `Here are the links for ${title}.`;
  } else {
    text = `${title}\n${project.solution || project.description}\n\nBhupinder's contribution: ${project.role || 'See the case study for details.'}`;
  }
  return reply(text, context, projectActions(project), ['What technologies does it use?', 'How was it tested?', 'What are its key features?']);
}

function listProjects(projects = STATIC_PROJECTS): AssistantReply {
  return reply(
    `Featured projects:\n${projects.map((project, index) => `${index + 1}. ${formatRepoName(project.name)} — ${project.solution || project.description}`).join('\n\n')}\n\nChoose a project to explore its technology, features or testing.`,
    { topic: 'projects', projectNames: projects.map(project => project.name) },
    [section('projects', 'View projects'), { label: 'GitHub profile', href: PERSONAL_INFO.github }],
    projects.map(project => `Tell me about ${formatRepoName(project.name)}`),
  );
}

export function getAssistantReply(input: string, context: AssistantContext = {}): AssistantReply {
  const text = normalize(input);
  if (!text) return reply('What would you like to explore? You can choose a topic below.', context);

  // These details need a direct conversation rather than an assumption.
  if (/\b(visa|citizenship|sponsorship)\b|(?:your|his|expected) salary|salary expectations?|(?:phone|telephone) number|work (?:rights|authorization|eligibility)|start date/.test(text)) {
    return reply("That detail isn't listed in the portfolio. Please contact Bhupinder directly for an accurate answer.", { topic: 'contact' }, contactActions);
  }


  if (/\b(contact|email|reach|hire|hiring|linkedin)\b|work with (?:you|him|bhupinder)/.test(text)) {
    return reply(`You can reach Bhupinder via:\n• Email: ${PERSONAL_INFO.email}\n• LinkedIn: ${PERSONAL_INFO.linkedin}\n\nYou can also use the contact form using the link below.`, { topic: 'contact' }, contactActions, ['Are you available for work?', 'Show me the CV']);
  }

  if (/\b(cv|resume)\b/.test(text) || text.includes('curriculum vitae')) {
    return reply("You can download Bhupinder's CV below. It covers his education, experience and skills.", { topic: 'about' }, [{ label: 'Download CV', href: PERSONAL_INFO.cvPath, download: true }], ['Tell me about your experience', 'How can I contact Bhupinder?']);
  }

  const namedProjects = STATIC_PROJECTS.filter((project, index) =>
    containsPhrase(text, project.name) || projectAliases[index]?.some(alias => containsPhrase(text, alias)));
  if (namedProjects.length > 1 && /\b(compare|comparison|versus|vs|difference)\b/.test(text)) {
    return reply(namedProjects.map(project => `${formatRepoName(project.name)}\n${project.solution}\nTechnology: ${project.techStack?.slice(0, 5).join(', ')}`).join('\n\n'), { topic: 'projects' }, [section('projects', 'Compare case studies')], namedProjects.map(project => `Tell me about ${formatRepoName(project.name)}`));
  }
  if (namedProjects[0]) return projectReply(namedProjects[0], text);

  if (context.topic === 'projects') {
    const ordinal = /\b(first|1st|second|2nd|third|3rd)\b/.exec(text)?.[1];
    const index = ordinal && ({ first: 0, '1st': 0, second: 1, '2nd': 1, third: 2, '3rd': 2 } as Record<string, number>)[ordinal];
    const choices = context.projectNames || STATIC_PROJECTS.map(project => project.name);
    const choice = typeof index === 'number' ? STATIC_PROJECTS.find(project => project.name === choices[index]) : undefined;
    if (choice) return projectReply(choice, text);
    const previousProject = STATIC_PROJECTS.find(project => project.name === context.projectName);
    const reference = /\b(it|its|that|this)\b/.test(text);
    const personalQuestion = /\b(your|his|you|bhupinder)\b/.test(text) && !reference;
    const followUp = reference || testingQuestion(text) || stackQuestion(text) || /\b(features?|role|contribution|more|details|code|source|links?|live|website)\b/.test(text);
    if (previousProject && followUp && !personalQuestion) return projectReply(previousProject, text);
  }

  if ((/\b(available|availability|opportunities|internships?)\b|looking for work|open to work/.test(text)) && !/\b(projects?|apps?)\b/.test(text)) {
    return reply(AVAILABLE_FOR_WORK
      ? `Bhupinder is currently open to junior software testing, QA, IT support, internship and junior developer opportunities. He is based in ${PERSONAL_INFO.location}. Contact him to discuss a particular role.`
      : 'Please contact Bhupinder to check his current availability.', { topic: 'contact' }, contactActions, ['Show me the CV', 'Tell me about your QA experience']);
  }

  if (/\b(github|repositories|repos)\b|source code/.test(text)) {
    return reply("You can explore Bhupinder's repositories on GitHub or view the featured projects and their case studies.", { topic: 'projects' }, [{ label: 'GitHub profile', href: PERSONAL_INFO.github }, section('projects', 'View projects')]);
  }

  if (/\b(projects?|apps?|build|built|portfolio)\b/.test(text) && !/\b(who|yourself)\b/.test(text)) {
    const matches = [...new Set(STATIC_PROJECTS.flatMap(project => project.techStack || []))].filter(tech => containsPhrase(text, tech));
    // A question about React Native should not also match an unrelated React web project.
    const technologies = matches.filter(tech => !matches.some(other => other !== tech && containsPhrase(normalize(other), tech)));
    if (!technologies.length && /\b(?:uses?|using)|built with/.test(text)) {
      return reply("I couldn't find a featured project using that technology. You can explore the listed projects or ask Bhupinder for more details.", { topic: 'projects' }, [section('projects', 'View projects')]);
    }
    if (technologies.length) {
      const matched = STATIC_PROJECTS.filter(project => technologies.some(tech => project.techStack?.some(stack => containsPhrase(normalize(stack), tech))));
      return listProjects(matched);
    }
    return listProjects();
  }

  if (/\b(certificates?|certifications?|credentials|qualifications|ccna|forage|skyscanner|deloitte)\b/.test(text)) {
    const matches = CERTIFICATES.filter(cert => containsPhrase(text, cert.name)
      || normalize(cert.name).split(' ').filter(word => word.length > 3 && containsPhrase(text, word)).length >= 2
      || cert.issuer.split(' / ').some(issuer => containsPhrase(text, issuer))
      || (text.includes('ccna') && cert.category === 'Networking'));
    const certificate = matches.length === 1 ? matches[0] : undefined;
    if (certificate) return reply(`${certificate.name}\n${certificate.issuer} · ${certificate.date}`, { topic: 'certificates' }, [{ label: 'View certificate', href: certificate.filePath }, section('certificates', 'All certificates')]);
    return reply(`Bhupinder's certificates include:\n${CERTIFICATES.map(cert => `• ${cert.name} — ${cert.issuer} (${cert.date})`).join('\n')}`, { topic: 'certificates' }, [section('certificates', 'View certificates')], ['Show me the CCNA certificate', 'Where did you study?']);
  }

  if (/\b(study|studied|studying|education|degree|weltec|university|graduate|graduation|college)\b/.test(text)) {
    const education = EDUCATION.find(item => item.title.includes('Bachelor'))!;
    return reply(`${education.title}\n${education.institution}\n${education.period}\n\n${education.description}`, { topic: 'education' }, [section('about', 'Experience & education')], ['What certificates do you have?', 'What are your top skills?']);
  }

  if (testingQuestion(text)) {
    const role = EDUCATION.find(item => /tester|testing/i.test(item.title))!;
    return reply(`Bhupinder serves as a ${role.title} at ${role.institution} (${role.period}).\n\n${role.description}`, { topic: 'experience' }, [section('about', 'View experience')], ['How was My Pay Tracker tested?', 'Are you available for work?']);
  }

  if (/\bit support\b|support experience|support technician/.test(text)) {
    const role = EDUCATION.find(item => /support technician/i.test(item.title))!;
    return reply(`${role.title}\n${role.institution} (${role.period})\n\n${role.description}`, { topic: 'experience' }, [section('about', 'View experience')]);
  }

  const skills = SKILLS.flatMap(group => group.items.map(skill => ({ skill, category: group.category }))).filter(item => containsPhrase(text, item.skill) || containsPhrase(text, normalize(item.skill).replace(/ js$/, '')));
  if (/\b(skills?|technical|technologies|tech|stack|frameworks?|languages?|know)\b/.test(text) || skills.length) {
    const answer = skills.length
      ? skills.map(item => `• ${item.skill}: ${item.category}`).join('\n')
      : SKILLS.map(group => `• ${group.category}: ${group.items.join(', ')}`).join('\n');
    return reply(`Bhupinder's skills:\n${answer}`, { topic: 'skills' }, [section('about', 'View skills')], ['Which projects use React Native?', 'Tell me about your QA experience']);
  }

  if (/\b(experience|work|jobs?|roles?|background)\b/.test(text)) {
    return reply(`Experience includes:\n${EDUCATION.filter(item => !item.title.includes('Bachelor')).map(item => `• ${item.title} at ${item.institution} (${item.period})\n  ${item.description}`).join('\n\n')}`, { topic: 'experience' }, [section('about', 'View experience')], ['Tell me about your QA experience', 'Tell me about your IT support experience']);
  }

  if (/\b(where|location|based|live)\b/.test(text)) {
    return reply(`Bhupinder is based in ${PERSONAL_INFO.location}. He is interested in opportunities in Wellington or remote across New Zealand.`, { topic: 'about' }, contactActions);
  }

  if (/who (?:is|are)|about (?:you|him|bhupinder)|introduce|yourself|what (?:do|does) (?:you|he|bhupinder) do/.test(text)) {
    if (/who are you/.test(text)) return reply("I'm the Portfolio Assistant. I can help you find Bhupinder's projects, skills, experience, certificates and contact details.", context);
    return reply(`${PERSONAL_INFO.name} is a final-year IT student based in ${PERSONAL_INFO.location}, focused on software testing, IT support and practical full-stack development.`, { topic: 'about' }, [section('about', 'About Bhupinder')]);
  }
  if (/how (?:are|r) (?:you|u)|how (?:is|s) it going|hows it going|how do you do/.test(text)) return reply("I'm here and ready to help! How can I help you explore Bhupinder's work today?", context);
  if (/\b(thanks|thank you|cheers)\b/.test(text)) return reply("You're welcome! Is there anything else you'd like to explore?", context);
  if (/\b(bye|goodbye)\b/.test(text)) return reply('Thanks for visiting! You can come back anytime or contact Bhupinder using the links below.', context, contactActions);
  if (/\b(hello+|hi+|hey|good morning|good evening)\b/.test(text)) return reply('Hello! Ask about skills, projects, testing, education, or contact options.', context);
  if (/\b(help|options)\b|what can you/.test(text)) return reply('I can help with project details, technologies, testing, experience, education, certificates, the CV and contact information. Choose a topic below to get started.', context);
  return reply("I couldn't find that detail in the portfolio. Try asking about a project, skill, experience or qualification, or contact Bhupinder for more information.", context, [section('contact', 'Contact Bhupinder')]);
}

export function getBotResponse(input: string): string {
  return getAssistantReply(input).text;
}
