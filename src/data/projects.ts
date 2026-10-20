import { GITHUB_USERNAME } from './site';
import type { Project } from '../types/project';

export const FEATURED_REPOSITORY_NAMES = [
  'My-Pay-tracker',
  'car-dealership-project-website',
  'Lost-and-Found-Campus-',
] as const;

export const STATIC_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'My-Pay-tracker',
    description:
      'My Pay Tracker is a React Native mobile app for New Zealand shift workers to log work hours, manage multiple employers, preview gross/net pay, calculate PAYE tax, ACC levy, and 8% holiday pay. Built with Expo, TypeScript, Supabase, Zustand, TanStack Query, React Hook Form, and Zod. Includes unit tests for the tax engine and a cloud-sync architecture.',
    language: 'TypeScript',
    html_url: `https://github.com/${GITHUB_USERNAME}/My-Pay-tracker`,
    homepage: null,
    topics: ['TypeScript', 'Finance', 'Tracking'],
    updated_at: '2026-05-04T07:35:06Z',
    stargazers_count: 0,
    default_branch: 'main',
    problem: 'Many New Zealand shift workers do not know their estimated pay before payday, especially when working different hours, jobs, tax codes, or casual shifts.',
    solution: 'Built a mobile app that allows users to track shifts, estimate gross and net pay, manage multiple employers, and calculate PAYE tax, ACC levy, and holiday pay.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Zustand', 'TanStack Query', 'React Hook Form', 'Zod', 'Jest', 'NZ PAYE tax calculation logic'],
    role: 'Designed and developed the mobile app, implemented the frontend, backend integration, data validation, tax calculation logic, and testing for the core pay calculation engine.',
    features: ['User authentication', 'Shift logging', 'Multiple employer support', 'Gross pay calculation', 'Net pay preview', 'PAYE tax calculation', 'ACC levy calculation', '8% holiday pay calculation', 'Dashboard analytics', 'Cloud sync', 'Offline-friendly state management', 'Tax engine unit tests'],
    testing: ['Unit tests for tax calculation engine', 'Manual testing of shift entry', 'Form validation testing', 'Authentication flow testing', 'Edge case testing for pay calculations'],
    images: ['/projects/my-pay-tracker.png'],
    isMobileApp: true,
  },
  {
    id: 2,
    name: 'car-dealership-project-website',
    description:
      'Car dealership website for browsing vehicle listings, managing inventory content, and presenting dealership information with a PHP-based web stack.',
    language: 'PHP',
    html_url: `https://github.com/${GITHUB_USERNAME}/car-dealership-project-website`,
    homepage: 'https://coss.infinityfree.me/',
    topics: ['PHP', 'MySQL', 'Dealership'],
    updated_at: '2026-04-16T03:35:29Z',
    stargazers_count: 0,
    default_branch: 'main',
    problem: 'Local dealerships needed an easy way to manage vehicle inventory and display cars online to potential customers.',
    solution: 'Developed a custom CMS and public-facing website using PHP and MySQL to manage and display car listings efficiently.',
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    role: 'Full-stack developer responsible for database design, backend logic, and frontend implementation.',
    features: ['Vehicle browsing', 'Admin dashboard', 'Inventory management', 'Search and filter options'],
    testing: ['Manual functional testing', 'Form submission testing', 'Database query verification', 'Responsive layout testing'],
    images: ['/projects/car-dealership.png'],
    isMobileApp: false,
  },
  {
    id: 3,
    name: 'Lost-and-Found-Campus-',
    description:
      'Campus lost-and-found platform designed to help students report, browse, and recover misplaced items through a focused TypeScript application.',
    language: 'TypeScript',
    html_url: `https://github.com/${GITHUB_USERNAME}/Lost-and-Found-Campus-`,
    homepage: null,
    topics: ['TypeScript', 'Campus', 'Web App'],
    updated_at: '2026-05-04T23:48:53Z',
    stargazers_count: 0,
    default_branch: 'main',
    problem: 'Students frequently lose items on campus and lack a centralized platform to report or search for found items.',
    solution: 'Built a web platform allowing users to post lost items, search found items, and contact finders.',
    techStack: ['TypeScript', 'React', 'Node.js', 'Express', 'SQL'],
    role: 'Frontend and backend development, focusing on user flow and secure item reporting.',
    features: ['Report lost item', 'Browse found items', 'Search by category', 'Secure contact system'],
    testing: ['End-to-end user flow testing', 'Form validation', 'Search filtering testing', 'UI/UX usability testing'],
    images: ['/projects/lost-and-found.png'],
    isMobileApp: false,
  },
];

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
};
