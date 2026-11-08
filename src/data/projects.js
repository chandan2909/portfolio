// Projects shown on the site, in this order.
// image: a file in public/assets (a 1200x630 PNG fills the card best).
// live: leave empty for projects without a live site. featured: true adds a "Featured" badge.
export const PROJECTS = [
    {
        id: 'portfolio',
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing modern web development skills using HTML, CSS, JavaScript, and responsive design principles.',
        image: '/assets/portfolio-screenshot.png',
        github: 'https://github.com/chandan2909/portfolio',
        live: 'https://chandanpathak.me',
        tags: ['HTML', 'CSS', 'JavaScript'],
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
    {
        id: 'kodemy',
        title: 'Kodemy',
        description: 'Kodemy is a full-stack Learning Management System (LMS) built to deliver an engaging, modern online learning experience. Students can browse courses, watch video lectures, track their learning progress, and interact with an AI-powered chatbot — all within a sleek, responsive interface.',
        image: '/assets/projects/kodemy.png',
        github: 'https://github.com/chandan2909/frontend-react',
        live: 'https://kodemy.chandanpathak.me/',
        tags: ['React JS', 'Express JS', 'MySQL', 'REST API', 'Node.js'],
    },
];
