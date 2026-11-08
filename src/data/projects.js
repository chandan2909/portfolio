// Projects shown on the site, in this order.
// image: a file in public/assets (a 1200x630 PNG fills the card best).
// live: leave empty for projects without a live site. featured: true adds a "Featured" badge.
// githubBackend: optional second repo; the card then shows "Frontend Code" and "Backend Code".
export const PROJECTS = [
    {
        id: 'kodbank',
        title: 'KodBank',
        description: 'A full-stack bank management system with secure card and PIN login, using BCrypt password hashing, OTP verification and a 3-attempt lockout through Spring Security and JWT. Includes role-based access with an admin panel, deposits, withdrawals and fund transfers with a full audit trail, PDF account statements, and account freeze and unfreeze. It grew out of my MCA final-year ATM Management System.',
        image: '/assets/projects/kodbank.png',
        github: 'https://github.com/chandan2909/kodbank',
        live: '',
        tags: ['React', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL'],
    },
    {
        id: 'kodcart',
        title: 'KodCart',
        description: 'A full-stack e-commerce application: a React front end consuming a Spring Boot REST API, built with JPA/Hibernate and MySQL, with JWT authentication and Razorpay payment integration.',
        image: '/assets/projects/kodcart.png',
        github: 'https://github.com/chandan2909/kodcart-frontend',
        githubBackend: 'https://github.com/chandan2909/kodcart-backend',
        live: '',
        tags: ['React', 'Spring Boot', 'JWT', 'MySQL', 'Razorpay'],
    },
    {
        id: 'kodemy',
        title: 'Kodemy',
        description: 'Kodemy is a full-stack Learning Management System (LMS) built to deliver an engaging, modern online learning experience. Students can browse courses, watch video lectures, track their learning progress, and interact with an AI-powered chatbot — all within a sleek, responsive interface.',
        image: '/assets/projects/kodemy.png',
        github: 'https://github.com/chandan2909/lms-frontend',
        live: 'https://kodemy.chandanpathak.me/',
        tags: ['React JS', 'Express JS', 'MySQL', 'REST API', 'Node.js'],
    },
    {
        id: 'portfolio',
        title: 'Portfolio Website',
        description: 'My personal portfolio, built with React, Vite and Tailwind CSS, showcasing my projects and academic background.',
        image: '/assets/portfolio-screenshot.png',
        github: 'https://github.com/chandan2909/portfolio',
        live: 'https://chandanpathak.me',
        tags: ['React', 'Vite', 'Tailwind CSS'],
    },
    {
        id: 'atm',
        title: 'ATM Interface',
        description: 'Interactive ATM management system built with modern programming concepts, featuring secure transactions and intuitive user interface design.',
        image: '/assets/project-three.gif',
        github: 'https://github.com/chandan2909/Atm-manage',
        live: '',
        tags: ['Java', 'OOP', 'SWING'],
    },
];
