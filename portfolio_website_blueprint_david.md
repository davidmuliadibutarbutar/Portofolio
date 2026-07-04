# Portfolio Website Blueprint - David Muliadi Butarbutar

> A complete Markdown blueprint for building a modern fullstack portfolio website with an admin CMS panel.  
> This document can be used as a **README**, **project specification**, or **AI prompt** for generating the website.

---

## 1. Project Overview

Build a modern, responsive, and lightweight portfolio website for **David Muliadi Butarbutar**, a Software Engineer experienced in backend development, web application development, API integration, database optimization, and enterprise system development.

The website must include a public portfolio page and an admin CMS panel so the portfolio content can be maintained without editing source code directly.

### Main Goal

Create a professional portfolio website that presents:

- Personal profile
- Work experience
- Technical skills
- Projects
- Education
- Publications
- Contact information
- Downloadable resume
- Admin panel for content management

### Recommended Approach

Use **Vue 3 + Node.js + JSON file storage**.

This approach is suitable because:

- No database setup is required.
- Data is easy to backup and migrate.
- Deployment is simpler.
- Content can still be managed dynamically from an admin panel.
- The system remains lightweight and fast.

---

## 2. Developer Profile

```json
{
  "name": "David Muliadi Butarbutar",
  "title": "Software Engineer",
  "headline": "Software Engineer specializing in backend development, API integration, enterprise systems, and database optimization.",
  "location": "Medan, Indonesia",
  "email": "muliadibutarbutar13@gmail.com",
  "phone": "+62 898 2174 339",
  "linkedin": "https://www.linkedin.com/in/david-muliadi-butarbutar-02847119a/",
  "github": "https://github.com/yourusername",
  "resume": "/uploads/profile/resume.pdf"
}
```

> Public portfolio recommendation: use **Medan, Indonesia** instead of a full home address.

---

## 3. Portfolio Summary

David Muliadi Butarbutar is a Software Engineer with experience developing enterprise applications using C#, .NET, ASP.NET, Vue.js, Next.js, PostgreSQL, SQL Server, REST API, and Kotlin.

He has worked on systems related to facility management, transporter rating, goods release, unmanned weighbridge, traffic control, learning dashboard, approval workflow, reporting, and API integrations.

### Professional Focus

- Backend development
- REST API development and integration
- SQL Server and PostgreSQL database development
- Query optimization
- Enterprise web application development
- Approval workflow systems
- Vue.js and Next.js frontend development
- System maintenance and bug fixing
- Deployment and production support

---

## 4. Website Features

### Public Website

The public website must include:

- Responsive landing page
- Dark mode support
- Hero section with profile summary
- About section
- Skills section
- Work experience timeline
- Projects section
- Education section
- Publications section
- Contact section
- Resume download button
- SEO-friendly metadata
- Mobile-first layout

### Admin CMS Panel

The admin panel must include:

- Admin login
- JWT-based authentication
- Dashboard overview
- Manage profile data
- Manage projects
- Manage work experience
- Manage skills
- Manage education
- Manage publications
- Manage certifications
- Manage languages
- Upload profile image
- Upload project images
- Upload resume PDF

---

## 5. Tech Stack

### Frontend

- Vue 3
- Vite
- Tailwind CSS
- Vue Router
- Pinia
- Axios
- Lucide Icons or Heroicons

### Backend

- Node.js
- Express.js
- JWT authentication
- Bcrypt password hashing
- Multer file upload
- fs-extra for JSON file operations
- CORS
- dotenv

### Storage

- JSON files for content data
- Local file system for uploaded images and resume files

### Optional Future Upgrade

The system can later be migrated from JSON storage to:

- PostgreSQL
- SQL Server
- MySQL
- SQLite
- Prisma ORM

---

## 6. Recommended Pages

### Public Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Main landing page |
| About | `/about` | Personal summary and background |
| Projects | `/projects` | List of portfolio projects |
| Project Detail | `/projects/:id` | Detailed project information |
| Experience | `/experience` | Work experience timeline |
| Contact | `/contact` | Contact information and links |

### Admin Pages

| Page | Route | Description |
|---|---|---|
| Login | `/admin/login` | Admin authentication |
| Dashboard | `/admin` | Admin dashboard |
| Profile Manager | `/admin/profile` | Manage profile data |
| Project Manager | `/admin/projects` | Manage projects |
| Experience Manager | `/admin/experience` | Manage work experience |
| Skill Manager | `/admin/skills` | Manage technical skills |
| Education Manager | `/admin/education` | Manage education |
| Publication Manager | `/admin/publications` | Manage publications |
| Certification Manager | `/admin/certifications` | Manage certifications |
| Language Manager | `/admin/languages` | Manage languages |

---

## 7. UI and Design Requirements

### Design Style

Use a clean, professional, modern developer portfolio style.

Recommended visual style:

- Dark mode first
- Minimalist layout
- Clean typography
- Soft gradient background
- Card-based sections
- Rounded corners
- Subtle shadow
- Smooth hover animations
- Clear CTA buttons

### Color Direction

Recommended color palette:

- Background: dark navy / slate
- Primary: blue or cyan
- Accent: emerald or violet
- Text: white / gray
- Card background: dark slate

### Layout Requirements

- Mobile-first responsive design
- Max-width container for desktop
- Sticky navbar
- Smooth scrolling
- Project cards with image, description, and tech stack
- Timeline layout for work experience
- Skill badges or progress indicators
- Contact section with clickable links

---

## 8. Project Structure

```text
portfolio/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.vue
│   │   │   │   ├── Footer.vue
│   │   │   │   └── Navbar.vue
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.vue
│   │   │   │   ├── AboutSection.vue
│   │   │   │   ├── SkillsSection.vue
│   │   │   │   ├── ProjectsSection.vue
│   │   │   │   ├── ExperienceSection.vue
│   │   │   │   ├── EducationSection.vue
│   │   │   │   ├── PublicationsSection.vue
│   │   │   │   └── ContactSection.vue
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout.vue
│   │   │   │   ├── AdminSidebar.vue
│   │   │   │   ├── ProfileForm.vue
│   │   │   │   ├── ProjectForm.vue
│   │   │   │   ├── ExperienceForm.vue
│   │   │   │   └── SkillForm.vue
│   │   │   └── common/
│   │   │       ├── Button.vue
│   │   │       ├── Card.vue
│   │   │       ├── Modal.vue
│   │   │       └── FileUpload.vue
│   │   ├── views/
│   │   │   ├── Home.vue
│   │   │   ├── About.vue
│   │   │   ├── Projects.vue
│   │   │   ├── ProjectDetail.vue
│   │   │   ├── Experience.vue
│   │   │   ├── Contact.vue
│   │   │   └── admin/
│   │   │       ├── Login.vue
│   │   │       ├── Dashboard.vue
│   │   │       ├── ProfileAdmin.vue
│   │   │       ├── ProjectsAdmin.vue
│   │   │       ├── ExperienceAdmin.vue
│   │   │       ├── SkillsAdmin.vue
│   │   │       ├── EducationAdmin.vue
│   │   │       ├── PublicationsAdmin.vue
│   │   │       ├── CertificationsAdmin.vue
│   │   │       └── LanguagesAdmin.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── stores/
│   │   │   ├── authStore.js
│   │   │   └── portfolioStore.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   ├── App.vue
│   │   └── main.js
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── profileController.js
│   │   │   ├── projectController.js
│   │   │   ├── experienceController.js
│   │   │   ├── skillController.js
│   │   │   ├── educationController.js
│   │   │   ├── publicationController.js
│   │   │   ├── certificationController.js
│   │   │   └── languageController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── profile.js
│   │   │   ├── projects.js
│   │   │   ├── experience.js
│   │   │   ├── skills.js
│   │   │   ├── education.js
│   │   │   ├── publications.js
│   │   │   ├── certifications.js
│   │   │   └── languages.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── upload.js
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   └── jsonDB.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   └── server.js
│   ├── data/
│   │   ├── users.json
│   │   ├── profile.json
│   │   ├── experience.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── education.json
│   │   ├── certifications.json
│   │   ├── publications.json
│   │   └── languages.json
│   ├── uploads/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── resume/
│   ├── scripts/
│   │   └── init.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── README.md
└── .gitignore
```

---

## 9. Environment Variables

### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend `.env`

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=change-this-to-a-strong-random-secret
JWT_EXPIRES_IN=7d
UPLOAD_DIR=./uploads
DATA_DIR=./data
CORS_ORIGIN=http://localhost:5173
```

---

## 10. API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Admin login | No |
| GET | `/api/auth/me` | Get current admin user | Yes |
| POST | `/api/auth/refresh` | Refresh token | Yes |

### Profile

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/profile` | Get profile data | No |
| PUT | `/api/profile` | Update profile data | Yes |

### Projects

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/projects` | Get all projects | No |
| GET | `/api/projects/:id` | Get project by ID | No |
| POST | `/api/projects` | Create project | Yes |
| PUT | `/api/projects/:id` | Update project | Yes |
| DELETE | `/api/projects/:id` | Delete project | Yes |

### Experience

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/experience` | Get all experience | No |
| POST | `/api/experience` | Create experience | Yes |
| PUT | `/api/experience/:id` | Update experience | Yes |
| DELETE | `/api/experience/:id` | Delete experience | Yes |

### Other CRUD Endpoints

Use the same CRUD pattern for:

- `/api/skills`
- `/api/education`
- `/api/certifications`
- `/api/publications`
- `/api/languages`

### File Upload

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/upload/profile` | Upload profile photo | Yes |
| POST | `/api/upload/project` | Upload project image | Yes |
| POST | `/api/upload/resume` | Upload resume PDF | Yes |

Upload response example:

```json
{
  "success": true,
  "filePath": "/uploads/projects/project-image-123456.jpg"
}
```

---

## 11. Data Structure

### `profile.json`

```json
{
  "name": "David Muliadi Butarbutar",
  "title": "Software Engineer",
  "headline": "Software Engineer specializing in backend development, API integration, enterprise systems, and database optimization.",
  "bio": "Software Engineer with experience developing enterprise applications using C#, .NET, ASP.NET, Vue.js, Next.js, SQL Server, PostgreSQL, REST API, and Kotlin. Experienced in building internal systems, approval workflows, reporting modules, API integrations, and database optimization.",
  "photo": "/uploads/profile/avatar.jpg",
  "email": "muliadibutarbutar13@gmail.com",
  "phone": "+62 898 2174 339",
  "location": "Medan, Indonesia",
  "linkedin": "https://www.linkedin.com/in/david-muliadi-butarbutar-02847119a/",
  "github": "https://github.com/yourusername",
  "resume": "/uploads/profile/resume.pdf"
}
```

### `experience.json`

```json
[
  {
    "id": "1",
    "company": "Wilmar Consultancy Services",
    "position": "Software Engineer",
    "location": "Medan, Indonesia",
    "startDate": "2022-02-01",
    "endDate": null,
    "current": true,
    "description": "Develop, maintain, and enhance enterprise applications, including web applications, backend services, REST APIs, database queries, reporting modules, approval workflows, and system integrations.",
    "achievements": [
      "Developed Facility Management System using Vue.js and .NET.",
      "Built Transporter Rating System using Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, and NextAuth.",
      "Developed Unmanned Weighbridge System with RFID and face recognition integration.",
      "Implemented Traffic Control System integration for plant access and barrier gate workflows.",
      "Improved database performance through SQL query optimization.",
      "Supported QA testing, bug fixing, deployment, and production issue handling."
    ],
    "techStack": [
      "C#",
      ".NET",
      "ASP.NET",
      "SQL Server",
      "PostgreSQL",
      "Vue.js",
      "Next.js",
      "REST API",
      "Kotlin"
    ]
  }
]
```

### `projects.json`

```json
[
  {
    "id": "1",
    "title": "Facility Management System",
    "slug": "facility-management-system",
    "description": "Developed a Facility Management System using Vue.js for billing, timesheet, permit, utility, complaint, tenant document, approval, and reporting management. Built a Vue 3 SPA using Vite, PrimeVue, Vuex, and Axios. Implemented authentication, RabbitMQ integration, role-based menus, form validation, REST API integration, localization, and export/print reporting features. Developed master data modules such as company, customer, location, department, price list, VAT terms, SAP material, approval matrix, and running number. Backend was built using .NET and ASP.NET.",
    "image": "/uploads/projects/facility-management.jpg",
    "techStack": [
      "Vue 3",
      "Vite",
      "PrimeVue",
      "Vuex",
      "Axios",
      "RabbitMQ",
      ".NET",
      "ASP.NET",
      "C#",
      "PostgreSQL"
    ],
    "githubUrl": null,
    "demoUrl": null,
    "featured": true,
    "category": "Enterprise Application",
    "createdAt": "2024-01-01"
  },
  {
    "id": "2",
    "title": "Transporter Rating System",
    "slug": "transporter-rating-system",
    "description": "Developed a Transporter Rating System using Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, and NextAuth. Built role-based access control for Admin, Participant, and Viewer. Implemented master data, survey period management, questionnaire builder, survey entry, draft workflow, submission tracking, and audit log. Created dashboard and reporting features for transporter performance with filtering, ranking score, Excel/CSV export, reminder email, and radar chart analysis. Integrated PostgreSQL using Prisma ORM and implemented form validation using React Hook Form and Zod.",
    "image": "/uploads/projects/transporter-rating.jpg",
    "techStack": [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "NextAuth",
      "React Hook Form",
      "Zod"
    ],
    "githubUrl": null,
    "demoUrl": null,
    "featured": true,
    "category": "Enterprise Application",
    "createdAt": "2024-06-01"
  },
  {
    "id": "3",
    "title": "Goods Release System",
    "slug": "goods-release-system",
    "description": "Built an application for goods release and goods reporting processes from factory operations using ASP.NET Web Forms and SQL Server. Implemented approval matrix workflows, master data management for company, location, department, goods type, UOM, release reason, document, group, and user. Developed transaction creation, transaction list, approval process, report list, report detail, and matrix reporting modules.",
    "image": "/uploads/projects/goods-release.jpg",
    "techStack": [
      "C#",
      "ASP.NET",
      "ASPX Web Forms",
      "SQL Server"
    ],
    "githubUrl": null,
    "demoUrl": null,
    "featured": false,
    "category": "Enterprise Application",
    "createdAt": "2023-06-01"
  },
  {
    "id": "4",
    "title": "Unmanned Weighbridge System",
    "slug": "unmanned-weighbridge-system",
    "description": "Developed an Unmanned Weighbridge System using multiple .NET-based platforms, including desktop, web forms, REST APIs, Kotlin, and SQL Server. Improved database performance through query tuning. The system supports integrated weighing processes using RFID cards and face recognition through Hikvision integration. Developed Traffic Control System modules for plant access through barrier gates. Built complex integrations for truck registration before entering plant areas. Developed an Android application using Kotlin for security checking after operator registration. The system has been rolled out across several locations in Indonesia.",
    "image": "/uploads/projects/unmanned-weighbridge.jpg",
    "techStack": [
      "C#",
      ".NET",
      "ASP.NET",
      "Kotlin",
      "SQL Server",
      "REST API",
      "RFID",
      "Hikvision"
    ],
    "githubUrl": null,
    "demoUrl": null,
    "featured": false,
    "category": "Enterprise Application",
    "createdAt": "2023-01-01"
  },
  {
    "id": "5",
    "title": "Learning Dashboard",
    "slug": "learning-dashboard",
    "description": "Built a Learning Dashboard project using .NET Framework and SQL Server. The application supports reporting processes for an internal company training center. Implemented approval transaction workflows using a release matrix feature that automatically collects approval destinations based on created documents. Developed master data modules such as company, location, cost list, department, division, grade level, user, release matrix, vendor list and profile, and student list and profile.",
    "image": "/uploads/projects/learning-dashboard.jpg",
    "techStack": [
      "C#",
      ".NET Framework",
      "SQL Server",
      "ASP.NET"
    ],
    "githubUrl": null,
    "demoUrl": null,
    "featured": false,
    "category": "Enterprise Application",
    "createdAt": "2023-09-01"
  }
]
```

### `skills.json`

```json
[
  {
    "id": "1",
    "name": "C#",
    "category": "Programming Language",
    "level": 85,
    "icon": "csharp"
  },
  {
    "id": "2",
    "name": ".NET",
    "category": "Framework",
    "level": 85,
    "icon": "dotnet"
  },
  {
    "id": "3",
    "name": "ASP.NET",
    "category": "Framework",
    "level": 80,
    "icon": "aspnet"
  },
  {
    "id": "4",
    "name": "Vue.js",
    "category": "Frontend",
    "level": 80,
    "icon": "vue"
  },
  {
    "id": "5",
    "name": "Next.js",
    "category": "Frontend",
    "level": 75,
    "icon": "nextjs"
  },
  {
    "id": "6",
    "name": "TypeScript",
    "category": "Programming Language",
    "level": 75,
    "icon": "typescript"
  },
  {
    "id": "7",
    "name": "SQL Server",
    "category": "Database",
    "level": 85,
    "icon": "mssql"
  },
  {
    "id": "8",
    "name": "PostgreSQL",
    "category": "Database",
    "level": 80,
    "icon": "postgresql"
  },
  {
    "id": "9",
    "name": "REST API",
    "category": "Backend",
    "level": 85,
    "icon": "api"
  },
  {
    "id": "10",
    "name": "Kotlin",
    "category": "Programming Language",
    "level": 70,
    "icon": "kotlin"
  },
  {
    "id": "11",
    "name": "Prisma",
    "category": "ORM",
    "level": 70,
    "icon": "prisma"
  },
  {
    "id": "12",
    "name": "Tailwind CSS",
    "category": "Frontend",
    "level": 75,
    "icon": "tailwind"
  }
]
```

### `education.json`

```json
[
  {
    "id": "1",
    "institution": "Del Institute of Technology",
    "degree": "Bachelor's Degree",
    "field": "Information Technology",
    "startDate": null,
    "endDate": null,
    "gpa": "3.03/4.00",
    "description": "Studied Information Technology with focus on software development, databases, and information systems."
  }
]
```

### `publications.json`

```json
[
  {
    "id": "1",
    "title": "User Responses of the Development of Language Laboratory System",
    "journal": "IJEIT",
    "volume": "Vol. 3",
    "description": "A journal publication that explains the equipment borrowing process in Del's language laboratory. The application was implemented using the Laravel framework.",
    "url": "https://bit.ly/JournalIJEIT",
    "publishedAt": null
  }
]
```

### `certifications.json`

```json
[]
```

### `languages.json`

```json
[
  {
    "id": "1",
    "name": "Indonesian",
    "level": "Native"
  },
  {
    "id": "2",
    "name": "English",
    "level": "Professional Working Proficiency"
  }
]
```

### `users.json`

```json
[
  {
    "id": "1",
    "username": "admin",
    "password": "$2b$10$hashed_password_here",
    "role": "admin",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

## 12. Installation Guide

### Prerequisites

Install:

- Node.js version 18 or higher
- npm or pnpm

No database installation is required.

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Initialize JSON Storage

```bash
cd backend
npm run init
```

The initialization script must create:

```text
backend/data/
backend/uploads/
backend/uploads/profile/
backend/uploads/projects/
backend/uploads/resume/
```

It must also generate default JSON files:

```text
users.json
profile.json
experience.json
projects.json
skills.json
education.json
certifications.json
publications.json
languages.json
```

---

## 13. Running the Application

### Development Mode

Run backend:

```bash
cd backend
npm run dev
```

Run frontend:

```bash
cd frontend
npm run dev
```

Default URLs:

```text
Frontend: http://localhost:5173
Backend API: http://localhost:3000/api
Admin Panel: http://localhost:5173/admin
```

### Production Build

Build frontend:

```bash
cd frontend
npm run build
```

Run backend:

```bash
cd backend
npm start
```

---

## 14. Admin Login

Default admin credentials for first setup:

```text
Username: admin
Password: admin123
```

Security requirement:

- Change default password after first login.
- Use bcrypt to store hashed passwords.
- Never store plain-text passwords in production.

---

## 15. Backend Requirements

### JSON Database Service

Create a reusable `jsonDB.js` service with methods:

- `read(collectionName)`
- `write(collectionName, data)`
- `findById(collectionName, id)`
- `create(collectionName, payload)`
- `update(collectionName, id, payload)`
- `remove(collectionName, id)`

### Validation

Add basic validation for:

- Required fields
- Email format
- URL format
- Uploaded file type
- Uploaded file size

### Security

Implement:

- JWT authentication
- Password hashing with bcrypt
- Protected admin endpoints
- CORS configuration
- File upload type validation
- API error handling
- Rate limiting for login endpoint

---

## 16. Frontend Requirements

### Public Frontend

The public frontend must:

- Fetch data from API
- Show loading state
- Show fallback content if data is empty
- Use responsive design
- Support dark mode
- Show featured projects first
- Display skills grouped by category
- Display work experience in timeline format
- Display project detail page by slug or ID

### Admin Frontend

The admin frontend must:

- Store JWT token securely
- Protect admin routes
- Provide CRUD forms
- Show confirmation before delete
- Show success/error notifications
- Support image and resume upload
- Refresh data after create/update/delete
- Validate form input before submit

---

## 17. Component Requirements

### Public Components

- `HeroSection.vue`
- `AboutSection.vue`
- `SkillsSection.vue`
- `ExperienceSection.vue`
- `ProjectsSection.vue`
- `EducationSection.vue`
- `PublicationsSection.vue`
- `ContactSection.vue`
- `ProjectCard.vue`
- `SkillBadge.vue`
- `TimelineItem.vue`

### Admin Components

- `AdminLayout.vue`
- `AdminSidebar.vue`
- `AdminHeader.vue`
- `DataTable.vue`
- `Modal.vue`
- `ConfirmDialog.vue`
- `ProfileForm.vue`
- `ProjectForm.vue`
- `ExperienceForm.vue`
- `SkillForm.vue`
- `EducationForm.vue`
- `PublicationForm.vue`
- `CertificationForm.vue`
- `LanguageForm.vue`
- `FileUpload.vue`

---

## 18. Homepage Content Structure

The homepage should follow this order:

1. Navbar
2. Hero section
3. About section
4. Skills section
5. Featured projects
6. Experience timeline
7. Education
8. Publications
9. Contact CTA
10. Footer

### Hero Section Copy

```text
Hi, I'm David Muliadi Butarbutar.
Software Engineer specializing in backend development, API integration, enterprise systems, and database optimization.
```

Recommended buttons:

- View Projects
- Download Resume
- Contact Me

### About Section Copy

```text
I am a Software Engineer experienced in building enterprise applications using C#, .NET, ASP.NET, Vue.js, Next.js, SQL Server, PostgreSQL, REST API, and Kotlin. I have worked on systems involving facility management, transporter rating, goods release, unmanned weighbridge, traffic control, training dashboards, approval workflows, reporting, and third-party integrations.
```

---

## 19. SEO Requirements

Add metadata:

```text
Title: David Muliadi Butarbutar - Software Engineer Portfolio
Description: Portfolio website of David Muliadi Butarbutar, Software Engineer specializing in backend development, API integration, enterprise systems, and database optimization.
Keywords: David Muliadi Butarbutar, Software Engineer, C#, .NET, Vue.js, Next.js, SQL Server, PostgreSQL, REST API, Portfolio
Author: David Muliadi Butarbutar
```

Add Open Graph metadata:

```text
og:title
og:description
og:image
og:url
og:type
```

---

## 20. Deployment Recommendation

### Frontend

Recommended platforms:

- Vercel
- Netlify
- Static hosting on VPS

Frontend environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Backend

Recommended platforms:

- Railway with persistent volume
- Render with disk storage
- VPS using PM2
- Node.js hosting with persistent file storage

Important backend production requirements:

- Use persistent storage for `/data`
- Use persistent storage for `/uploads`
- Use strong JWT secret
- Enable HTTPS
- Configure correct CORS origin
- Backup JSON files regularly

### VPS Deployment with PM2

```bash
cd backend
npm install
npm install -g pm2

pm2 start src/server.js --name portfolio-api
pm2 save
pm2 startup
```

---

## 21. Backup Strategy

Because the system uses JSON files and local uploads, backup these folders:

```text
backend/data/
backend/uploads/
```

Create backup:

```bash
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz backend/data backend/uploads
```

Restore backup:

```bash
tar -xzf portfolio-backup-20260704.tar.gz
```

---

## 22. Development Checklist

### Frontend Checklist

- [ ] Create Vue 3 project with Vite
- [ ] Install Tailwind CSS
- [ ] Setup Vue Router
- [ ] Setup Pinia
- [ ] Setup Axios API service
- [ ] Create public layout
- [ ] Create admin layout
- [ ] Build homepage sections
- [ ] Build project listing page
- [ ] Build project detail page
- [ ] Build admin login page
- [ ] Build admin CRUD pages
- [ ] Add dark mode
- [ ] Add responsive design
- [ ] Add loading and error states

### Backend Checklist

- [ ] Create Express.js project
- [ ] Setup dotenv
- [ ] Setup CORS
- [ ] Setup JSON DB service
- [ ] Setup auth controller
- [ ] Setup JWT middleware
- [ ] Setup CRUD controllers
- [ ] Setup routes
- [ ] Setup file upload with Multer
- [ ] Setup init script
- [ ] Setup error handler
- [ ] Add validation
- [ ] Add rate limiting
- [ ] Test API endpoints

### Content Checklist

- [ ] Add profile photo
- [ ] Add resume PDF
- [ ] Update GitHub link
- [ ] Add real project screenshots
- [ ] Review project descriptions
- [ ] Review skill levels
- [ ] Add certifications if available
- [ ] Confirm education dates
- [ ] Confirm publication year

---

## 23. Acceptance Criteria

The project is considered complete when:

- Public portfolio pages load correctly.
- All content is fetched from backend JSON APIs.
- Admin can login successfully.
- Admin can create, update, and delete portfolio data.
- Admin can upload profile image, project images, and resume PDF.
- Website is responsive on mobile, tablet, and desktop.
- Dark mode works.
- Resume download works.
- Contact links work.
- Production build runs successfully.
- Data and uploads can be backed up easily.
- Default admin password has been changed.

---

## 24. AI Prompt for Generating the Website

Use this prompt in ChatGPT, Codex, Cursor, Claude Code, or other AI coding tools:

```text
Build a fullstack portfolio website based on the Markdown specification provided.

Tech stack:
- Frontend: Vue 3, Vite, Tailwind CSS, Vue Router, Pinia, Axios
- Backend: Node.js, Express.js, JWT, Bcrypt, Multer, fs-extra
- Storage: JSON files and local uploads folder
- No database required

Requirements:
1. Create a responsive public portfolio website for David Muliadi Butarbutar.
2. Create an admin CMS panel for managing profile, projects, experience, skills, education, publications, certifications, and languages.
3. Use JSON files in backend/data as storage.
4. Use backend/uploads for profile image, project images, and resume PDF.
5. Implement JWT authentication for admin routes.
6. Implement CRUD APIs for every portfolio section.
7. Implement Vue admin forms for each portfolio section.
8. Implement dark mode and modern professional UI.
9. Use the data structures and sample content from this Markdown file.
10. Include setup instructions and scripts for initialization.

Generate the project files with clean folder structure, reusable components, and production-ready configuration.
```

---

## 25. Notes

Before publishing the website:

- Replace GitHub placeholder with the real GitHub profile URL.
- Upload a professional profile photo.
- Upload a final resume PDF.
- Replace placeholder project images with real screenshots.
- Keep only public-safe personal information.
- Review all project descriptions before publishing.
- Change the default admin password.
