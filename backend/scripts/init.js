import fs from 'fs-extra';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { config } from '../src/config.js';

const profile = {
  name: 'David Muliadi Butarbutar',
  title: 'Software Engineer',
  headline: 'Software Engineer specializing in backend development, API integration, enterprise systems, and database optimization.',
  bio: 'Software Engineer with experience developing enterprise applications using C#, .NET, ASP.NET, Vue.js, Next.js, SQL Server, PostgreSQL, REST API, and Kotlin. Experienced in building internal systems, approval workflows, reporting modules, API integrations, and database optimization.',
  photo: '',
  email: 'muliadibutarbutar13@gmail.com',
  phone: '+62 898 2174 339',
  location: 'Medan, Indonesia',
  linkedin: 'https://www.linkedin.com/in/david-muliadi-butarbutar-02847119a/',
  github: 'https://github.com/yourusername',
  resume: '/uploads/resume/resume.pdf'
};

const experience = [
  {
    id: '1',
    company: 'Wilmar Consultancy Services',
    position: 'Software Engineer',
    location: 'Medan, Indonesia',
    startDate: '2022-02-01',
    endDate: null,
    current: true,
    description: 'Develop, maintain, and enhance enterprise applications, including web applications, backend services, REST APIs, database queries, reporting modules, approval workflows, and system integrations.',
    achievements: [
      'Developed Facility Management System using Vue.js and .NET.',
      'Built Transporter Rating System using Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, and NextAuth.',
      'Developed Unmanned Weighbridge System with RFID and face recognition integration.',
      'Implemented Traffic Control System integration for plant access and barrier gate workflows.',
      'Improved database performance through SQL query optimization.',
      'Supported QA testing, bug fixing, deployment, and production issue handling.'
    ],
    techStack: ['C#', '.NET', 'ASP.NET', 'SQL Server', 'PostgreSQL', 'Vue.js', 'Next.js', 'REST API', 'Kotlin']
  }
];

const projects = [
  {
    id: '1',
    title: 'Facility Management System',
    slug: 'facility-management-system',
    description: 'Developed a Facility Management System using Vue.js for billing, timesheet, permit, utility, complaint, tenant document, approval, and reporting management. Built a Vue 3 SPA using Vite, PrimeVue, Vuex, and Axios. Implemented authentication, RabbitMQ integration, role-based menus, form validation, REST API integration, localization, and export/print reporting features. Developed master data modules such as company, customer, location, department, price list, VAT terms, SAP material, approval matrix, and running number. Backend was built using .NET and ASP.NET.',
    image: '',
    techStack: ['Vue 3', 'Vite', 'PrimeVue', 'Vuex', 'Axios', 'RabbitMQ', '.NET', 'ASP.NET', 'C#', 'PostgreSQL'],
    githubUrl: null,
    demoUrl: null,
    featured: true,
    category: 'Enterprise Application',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Transporter Rating System',
    slug: 'transporter-rating-system',
    description: 'Developed a Transporter Rating System using Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, and NextAuth. Built role-based access control for Admin, Participant, and Viewer. Implemented master data, survey period management, questionnaire builder, survey entry, draft workflow, submission tracking, and audit log. Created dashboard and reporting features for transporter performance with filtering, ranking score, Excel/CSV export, reminder email, and radar chart analysis. Integrated PostgreSQL using Prisma ORM and implemented form validation using React Hook Form and Zod.',
    image: '',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'NextAuth', 'React Hook Form', 'Zod'],
    githubUrl: null,
    demoUrl: null,
    featured: true,
    category: 'Enterprise Application',
    createdAt: '2024-06-01'
  },
  {
    id: '3',
    title: 'Goods Release System',
    slug: 'goods-release-system',
    description: 'Built an application for goods release and goods reporting processes from factory operations using ASP.NET Web Forms and SQL Server. Implemented approval matrix workflows, master data management for company, location, department, goods type, UOM, release reason, document, group, and user. Developed transaction creation, transaction list, approval process, report list, report detail, and matrix reporting modules.',
    image: '',
    techStack: ['C#', 'ASP.NET', 'ASPX Web Forms', 'SQL Server'],
    githubUrl: null,
    demoUrl: null,
    featured: false,
    category: 'Enterprise Application',
    createdAt: '2023-06-01'
  },
  {
    id: '4',
    title: 'Unmanned Weighbridge System',
    slug: 'unmanned-weighbridge-system',
    description: 'Developed an Unmanned Weighbridge System using multiple .NET-based platforms, including desktop, web forms, REST APIs, Kotlin, and SQL Server. Improved database performance through query tuning. The system supports integrated weighing processes using RFID cards and face recognition through Hikvision integration. Developed Traffic Control System modules for plant access through barrier gates. Built complex integrations for truck registration before entering plant areas. Developed an Android application using Kotlin for security checking after operator registration. The system has been rolled out across several locations in Indonesia.',
    image: '',
    techStack: ['C#', '.NET', 'ASP.NET', 'Kotlin', 'SQL Server', 'REST API', 'RFID', 'Hikvision'],
    githubUrl: null,
    demoUrl: null,
    featured: false,
    category: 'Enterprise Application',
    createdAt: '2023-01-01'
  },
  {
    id: '5',
    title: 'Learning Dashboard',
    slug: 'learning-dashboard',
    description: 'Built a Learning Dashboard project using .NET Framework and SQL Server. The application supports reporting processes for an internal company training center. Implemented approval transaction workflows using a release matrix feature that automatically collects approval destinations based on created documents. Developed master data modules such as company, location, cost list, department, division, grade level, user, release matrix, vendor list and profile, and student list and profile.',
    image: '',
    techStack: ['C#', '.NET Framework', 'SQL Server', 'ASP.NET'],
    githubUrl: null,
    demoUrl: null,
    featured: false,
    category: 'Enterprise Application',
    createdAt: '2023-09-01'
  }
];

const skills = [
  ['1', 'C#', 'Programming Language', 85],
  ['2', '.NET', 'Framework', 85],
  ['3', 'ASP.NET', 'Framework', 80],
  ['4', 'Vue.js', 'Frontend', 80],
  ['5', 'Next.js', 'Frontend', 75],
  ['6', 'TypeScript', 'Programming Language', 75],
  ['7', 'SQL Server', 'Database', 85],
  ['8', 'PostgreSQL', 'Database', 80],
  ['9', 'REST API', 'Backend', 85],
  ['10', 'Kotlin', 'Programming Language', 70],
  ['11', 'Prisma', 'ORM', 70],
  ['12', 'Tailwind CSS', 'Frontend', 75]
].map(([id, name, category, level]) => ({ id, name, category, level, icon: name.toLowerCase().replaceAll(' ', '-') }));

const education = [
  {
    id: '1',
    institution: 'Del Institute of Technology',
    degree: "Bachelor's Degree",
    field: 'Information Technology',
    startDate: null,
    endDate: null,
    gpa: '3.03/4.00',
    description: 'Studied Information Technology with focus on software development, databases, and information systems.'
  }
];

const publications = [
  {
    id: '1',
    title: 'User Responses of the Development of Language Laboratory System',
    journal: 'IJEIT',
    volume: 'Vol. 3',
    description: "A journal publication that explains the equipment borrowing process in Del's language laboratory. The application was implemented using the Laravel framework.",
    url: 'https://bit.ly/JournalIJEIT',
    publishedAt: null
  }
];

const languages = [
  { id: '1', name: 'Indonesian', level: 'Native' },
  { id: '2', name: 'English', level: 'Professional Working Proficiency' }
];

const collections = {
  profile,
  experience,
  projects,
  skills,
  education,
  publications,
  certifications: [],
  languages
};

await fs.ensureDir(config.dataDir);
await fs.ensureDir(path.join(config.uploadDir, 'profile'));
await fs.ensureDir(path.join(config.uploadDir, 'projects'));
await fs.ensureDir(path.join(config.uploadDir, 'resume'));

for (const [name, data] of Object.entries(collections)) {
  await fs.writeJson(path.join(config.dataDir, `${name}.json`), data, { spaces: 2 });
}

await fs.writeJson(
  path.join(config.dataDir, 'users.json'),
  [
    {
      id: '1',
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ],
  { spaces: 2 }
);

console.log('Portfolio data initialized.');
