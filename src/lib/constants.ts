export const AVAILABLE_FOR_WORK = true;

export const GITHUB_USERNAME = 'Bhupinder22500650';

export const FEATURED_REPOSITORY_NAMES = [
  'My-Pay-tracker',
  'car-dealership-project-website',
  'Lost-and-Found-Campus-',
] as const;

export const PERSONAL_INFO = {
  name: 'Bhupinder Singh',
  nameShort: 'B. Singh',
  title: 'Junior Software Tester | IT Support | Full-Stack IT Student',
  location: 'Wellington, NZ',
  email: 'bhupindersinghrakhra99@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bhupinder-singh-530856251/',
  github: `https://github.com/${GITHUB_USERNAME}`,
  cvPath: '/cv.pdf',
  profilePhoto: '/profile.jpg',
  ogImage: '/og-image.jpg',
  tagline:
    'Final-year IT student based in Wellington, New Zealand, with hands-on experience in software testing, IT support, and full-stack web/mobile projects. I build practical applications using React, React Native, Node.js, TypeScript, SQL, and Supabase.',
};

export const ABOUT_TEXT = [
  'I am a final-year Bachelor of Information Technology student based in Wellington, New Zealand. My main focus is software testing, IT support, and building practical full-stack applications.',
  'I have hands-on experience testing real web application features at Student Job Search, where I check functionality, user flows, UI/UX issues, performance problems, and report bugs clearly. I also have IT support experience helping users with hardware, software, network, and system issues.',
  'My goal is to grow into a junior software tester, QA analyst, IT support technician, or junior developer role where I can contribute, learn quickly, and build reliable technology.',
];

export const SKILLS = [
  {
    category: 'Strong',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Git',
      'GitHub',
      'Manual Testing Basics',
      'Bug Reporting',
    ],
  },
  {
    category: 'Working Knowledge',
    items: [
      'TypeScript',
      'React Native',
      'Expo',
      'Node.js',
      'Express.js',
      'SQL',
      'MySQL',
      'Supabase',
      'REST APIs',
      'Zod',
      'Zustand',
    ],
  },
  {
    category: 'Learning',
    items: [
      'AWS',
      'CI/CD',
      'Power BI',
      'Linux',
      'Cybersecurity Fundamentals',
      'Automated Testing',
    ],
  },
];

export const EDUCATION = [
  {
    title: 'Junior Systems Tester',
    institution: 'Student Job Search — Wellington, NZ',
    description:
      'Testing Student Job Search web application features by checking functionality, user flows, UI/UX issues, form validation, performance problems, and reporting bugs clearly for the development team.',
    current: true,
    period: 'Jun 2026 – Present',
  },
  {
    title: 'IT Volunteer Support Technician',
    institution: 'Wellington E2E Centre — Lower Hutt, NZ',
    description:
      'Provided basic IT support by helping users with hardware, software, system access, network issues, and general troubleshooting.',
    current: true,
    period: 'Apr 2026 – Present',
  },
  {
    title: 'Bachelor of Information Technology',
    institution: 'Wellington Institute of Technology (WelTec)',
    description:
      'Focus: Computer Software Technology, Web Development, Cybersecurity, and Data Science. Expected graduation Nov 2026.',
    current: true,
    period: 'Feb 2024 – Nov 2026 (Expected)',
  },
  {
    title: 'Produce Assistant',
    institution: "PAK'nSAVE — Wellington, NZ",
    description:
      'Demonstrated strong time management meeting daily operational targets. Collaborated with team members to maintain quality standards and applied problem-solving skills to resolve workflow and customer-related issues.',
    current: false,
    period: 'Jan 2024 – Present',
  },
];

export const STATIC_PROJECTS = [
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

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

export const CERTIFICATES = [
  {
    id: 1,
    name: 'Front-End Software Engineering',
    issuer: 'Skyscanner / Forage',
    date: 'May 2026',
    filePath: '/certificates/frontend-software-engineering.pdf',
    category: 'Development',
    isPdf: true,
  },
  {
    id: 2,
    name: 'IT Help Desk for Beginners',
    issuer: 'LinkedIn Learning',
    date: 'Apr 2026',
    filePath: '/certificates/it-help-desk-beginners.pdf',
    category: 'IT Support',
    isPdf: true,
  },
  {
    id: 3,
    name: 'Automation AI Accelerator',
    issuer: 'Forage',
    date: 'Mar 2026',
    filePath: '/certificates/automation-ai-accelerator.pdf',
    category: 'AI & Automation',
    isPdf: true,
  },
  {
    id: 4,
    name: 'Data Analytics Job Simulation',
    issuer: 'Deloitte / Forage',
    date: 'Jan 2026',
    filePath: '/certificates/data-analysis.pdf',
    category: 'Data',
    isPdf: true,
  },
  {
    id: 5,
    name: 'Become a Full-Stack Web Developer',
    issuer: 'LinkedIn Learning',
    date: 'Feb 2023',
    filePath: '/certificates/fullstack-web-developer.pdf',
    category: 'Development',
    isPdf: true,
  },
  {
    id: 6,
    name: 'DevOps Fundamentals',
    issuer: 'Udemy',
    date: 'Nov 2022',
    filePath: '/certificates/devops.pdf',
    category: 'DevOps',
    isPdf: true,
  },
  {
    id: 7,
    name: 'Introduction to Hardware and Operating Systems',
    issuer: 'IBM / Coursera',
    date: 'Nov 2023',
    filePath: '/certificates/hardware-os.pdf',
    category: 'IT Support',
    isPdf: true,
  },
  {
    id: 8,
    name: 'Computer Networking / CCNA Preparation',
    issuer: 'Udemy',
    date: 'Jun 2023',
    filePath: '/certificates/ccna.jpg',
    category: 'Networking',
    isPdf: false,
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
