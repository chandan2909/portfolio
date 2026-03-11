// Data Manager — localStorage-based persistence for projects & skills
// This replaces hardcoded arrays in Projects.jsx and Skills.jsx

const PROJECTS_KEY = 'portfolio_projects';
const SKILLS_KEY = 'portfolio_skills';
const ADMIN_PASSWORD_KEY = 'admin_password';

// ─── Default Data ───────────────────────────────────────────────

const defaultProjects = [
    {
        id: '1',
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing modern web development skills using HTML, CSS, JavaScript, and responsive design principles.',
        image: './assets/portfolio-screenshot.png',
        github: 'https://github.com/chandan2909/portfolio',
        live: 'https://chandanpathak.dev',
        tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        id: '2',
        title: 'ATM Interface',
        description: 'Interactive ATM management system built with modern programming concepts, featuring secure transactions and intuitive user interface design.',
        image: './assets/project-three.gif',
        github: 'https://github.com/chandan2909/Atm-manage',
        tags: ['Java', 'OOP'],
        desktopApp: true,
    },
];

const defaultSkills = [
    { id: '1', name: 'HTML', category: 'Markup Language', level: 'Intermediate' },
    { id: '2', name: 'CSS', category: 'Styling & Design', level: 'Intermediate' },
    { id: '3', name: 'JavaScript', category: 'Programming & Logic', level: 'Intermediate' },
    { id: '4', name: 'Git/GitHub', category: 'Version Control', level: 'Basic' },
    { id: '5', name: 'SQL', category: 'Database Management', level: 'Intermediate' },
    { id: '6', name: 'Java', category: 'Object-Oriented Programming', level: 'Intermediate' },
];

// ─── Projects CRUD ──────────────────────────────────────────────

export function getProjects() {
    try {
        const stored = localStorage.getItem(PROJECTS_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn('Failed to read projects from localStorage:', e);
    }
    return [...defaultProjects];
}

export function saveProjects(projects) {
    try {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
        console.error('Failed to save projects:', e);
    }
}

export function resetProjects() {
    localStorage.removeItem(PROJECTS_KEY);
    return [...defaultProjects];
}

// ─── Skills CRUD ────────────────────────────────────────────────

export function getSkills() {
    try {
        const stored = localStorage.getItem(SKILLS_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn('Failed to read skills from localStorage:', e);
    }
    return [...defaultSkills];
}

export function saveSkills(skills) {
    try {
        localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
    } catch (e) {
        console.error('Failed to save skills:', e);
    }
}

export function resetSkills() {
    localStorage.removeItem(SKILLS_KEY);
    return [...defaultSkills];
}

// ─── Admin Auth (API-based with bcrypt hashing) ─────────────────
// Uses relative URLs — Vercel serves API from same domain,
// locally Vite proxy forwards /api/* to the Express server

export async function checkPassword(password) {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        return data.success;
    } catch (err) {
        console.error('Auth check failed:', err);
        return false;
    }
}

export async function changePassword(currentPassword, newPassword) {
    try {
        const res = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Password change failed:', err);
        return { success: false, message: 'Network error' };
    }
}

// ─── Unique ID generator ────────────────────────────────────────

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

