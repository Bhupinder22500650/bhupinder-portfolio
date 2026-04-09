export const AVAILABLE_FOR_WORK = true;

export const GITHUB_USERNAME = 'Bhupinder22500650';

export const PERSONAL_INFO = {
  name: 'Bhupinder Singh',
  nameShort: 'B. Singh',
  title: 'Full-Stack Developer & IT Support',
  location: 'Wellington, NZ',
  email: 'bhupindersinghrakhra99@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bhupinder-singh-530856251/',
  github: `https://github.com/${GITHUB_USERNAME}`,
  cvPath: '/cv.pdf',
  profilePhoto: '/profile.jpg',
  ogImage: '/og-image.jpg',
  tagline:
    'Final-year IT student building full-stack web and mobile apps with JavaScript, React, Node.js, and SQL. Passionate about clean, scalable code and real-world software solutions.',
};

export const ABOUT_TEXT = [
  "Final-year Bachelor of Information Technology student with hands-on experience building full-stack web and mobile applications using JavaScript, React, Node.js, and SQL. Passionate about writing clean, scalable code and delivering real-world software solutions.",
  "Currently volunteering as an IT Support Technician while completing coursework in data analytics and digital ethics. I thrive at the intersection of software engineering and meaningful technology — with a strong interest in healthtech, cloud engineering, and continuous professional development.",
];

export const SKILLS = [
  { label: 'JavaScript', highProficiency: true },
  { label: 'React.js', highProficiency: true },
  { label: 'React Native', highProficiency: true },
  { label: 'Node.js', highProficiency: true },
  { label: 'Express.js', highProficiency: true },
  { label: 'SQL & MySQL', highProficiency: true },
  { label: 'HTML & CSS', highProficiency: false },
  { label: 'PHP', highProficiency: false },
  { label: 'Git & GitHub', highProficiency: false },
  { label: 'AWS (S3, EC2)', highProficiency: false },
  { label: 'Power BI', highProficiency: false },
  { label: 'Agile / Scrum', highProficiency: false },
  { label: 'RESTful APIs', highProficiency: false },
  { label: 'IT Support', highProficiency: false },
  { label: 'Linux (Ubuntu)', highProficiency: false },
];

export const EDUCATION = [
  {
    title: 'IT Volunteer Support Technician',
    institution: 'Wellington E2E Centre — Lower Hutt, NZ',
    description:
      'Provide IT support and technical assistance to staff and educators at a community learning centre. Manage hardware/software systems, diagnose network and peripheral issues, and advise on best practices for system security and reliability.',
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
    name: 'car-online-sale-system',
    description:
      'Responsive full-stack web app for online car listings and seller management with complete CRUD functionality. Features a MySQL schema for listings, users, and feedback. BEM CSS architecture optimised for cross-browser compatibility.',
    language: 'PHP',
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    homepage: null,
    topics: ['PHP', 'MySQL', 'JavaScript'],
    updated_at: '2026-03-01T00:00:00Z',
    stargazers_count: 5,
  },
  {
    id: 2,
    name: 'coffee-bliss-mobile-app',
    description:
      'Cross-platform mobile ordering app with authentication, menu browsing, cart, checkout, and order history. Implements AsyncStorage for local data persistence and tested on both iOS and Android.',
    language: 'JavaScript',
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    homepage: null,
    topics: ['React Native', 'Expo', 'AsyncStorage'],
    updated_at: '2025-12-01T00:00:00Z',
    stargazers_count: 7,
  },
  {
    id: 3,
    name: 'khci-mind-and-movement',
    description:
      'IT project planning simulation for a NZD 250,000 healthcare initiative. Included WBS, Gantt charts, Agile workflows in Jira, risk assessments, stakeholder communication plans, and full project documentation.',
    language: 'HTML',
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    homepage: null,
    topics: ['Jira', 'MS Project', 'Agile'],
    updated_at: '2025-10-01T00:00:00Z',
    stargazers_count: 3,
  },
  {
    id: 4,
    name: 'portfolio-website',
    description:
      'Personal portfolio built with Next.js 15, Tailwind CSS v4, Framer Motion, and the Digital Curator design system. Features GitHub API integration, EmailJS contact form, and Vercel Analytics.',
    language: 'TypeScript',
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    homepage: null,
    topics: ['Next.js', 'TypeScript', 'Tailwind'],
    updated_at: '2026-04-01T00:00:00Z',
    stargazers_count: 9,
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
    name: 'Full-Stack Web Developer',
    issuer: 'Online Certification',
    date: 'Dec 2023',
    filePath: '/certificates/fullstack-web-developer.pdf',
    category: 'Development',
    isPdf: true,
  },
  {
    id: 2,
    name: 'Computer Networking (CCNA)',
    issuer: 'Cisco',
    date: 'Jun 2023',
    filePath: '/certificates/ccna.jpg',
    category: 'Networking',
    isPdf: false,
  },
  {
    id: 3,
    name: 'Data Analysis',
    issuer: 'Online Certification',
    date: 'Jan 2025',
    filePath: '/certificates/data-analysis.pdf',
    category: 'Data',
    isPdf: true,
  },
  {
    id: 4,
    name: 'DevOps Fundamentals',
    issuer: 'Online Certification',
    date: 'Dec 2023',
    filePath: '/certificates/devops.pdf',
    category: 'DevOps',
    isPdf: true,
  },
  {
    id: 5,
    name: 'Hardware & Operating Systems',
    issuer: 'IBM / Coursera',
    date: 'Nov 2023',
    filePath: '/certificates/hardware-os.pdf',
    category: 'IT Support',
    isPdf: true,
  },
  {
    id: 6,
    name: 'Learning C++',
    issuer: 'Online Certification',
    date: 'Jul 2023',
    filePath: '/certificates/learning-cpp.pdf',
    category: 'Development',
    isPdf: true,
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
