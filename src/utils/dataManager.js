// Data Manager — API-based persistence for projects & skills
// All data is stored in MySQL (Aiven) and fetched via API

// ─── In-memory cache (TTL = 60 s) ───────────────────────────────
const CACHE_TTL = 60_000;
const cache = {};

function cacheGet(key) {
    const entry = cache[key];
    if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
    return null;
}

function cacheSet(key, data) {
    cache[key] = { data, ts: Date.now() };
}

function cacheInvalidate(key) {
    delete cache[key];
}

// ─── Fallback seed data (shown when Aiven DB API is unreachable) ──
const FALLBACK_PROJECTS = [
    {
        id: 'f1',
        title: 'Portfolio Website',
        description: 'A modern, responsive developer portfolio built with React, Tailwind CSS, and a MySQL backend on Aiven. Features an admin panel, dark mode, and contact form.',
        image: '/assets/portfolio-screenshot.png',
        github: 'https://github.com/chandan2909/chandan2909.github.io',
        live: 'https://portfoliochandan.vercel.app',
        tags: ['React', 'Tailwind', 'MySQL', 'Vercel'],
        featured: true,
    },
    {
        id: 'f2',
        title: 'Project Three',
        description: 'A dynamic web application showcasing full-stack development skills with modern tooling and responsive design principles.',
        image: '/assets/project-three.gif',
        github: 'https://github.com/chandan2909',
        live: '',
        tags: ['JavaScript', 'CSS', 'HTML'],
        featured: false,
    },
];

const FALLBACK_SKILLS = [
    { id: 's1', name: 'HTML5', category: 'Markup Language', level: 'Expert', icon: 'M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.2 26.2-97.2-26.2-6.6-73.8h47.7l3.2 38.7 52.9 13.2 52.9-13.2 6-62.7H95.2L82.6 160.1h218.5l7.1-0.3z' },
    { id: 's2', name: 'CSS3', category: 'Stylesheet Language', level: 'Expert', icon: 'M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm302.8 162.1H128.5l4.3 49.3h170.1l-14.6 148.3-96.3 25.3-96.3-25.3-6.4-71.8h48.2l3.2 40.1 51.3 13.4 51.3-13.4 6.3-70H81.8l-12.3-134h228.5l5.6 0.1-1.1 8.3z' },
    { id: 's3', name: 'JavaScript', category: 'Programming Language', level: 'Advanced', icon: 'M0 0h384v384H0V0zm351.6 315.2c-5.4-28.5-29.5-42.1-56.4-42.1-26.9 0-44.3 14.3-44.3 31.9 0 14.8 8.8 24.1 28.1 29.7l28.2 7.1c14.3 3.6 19.8 8.5 19.8 17.6 0 10.2-8.8 16.9-24.3 16.9-16.9 0-28.5-8-31.4-22.3H224c3.7 30.4 27.9 46.7 62.3 46.7 30.6 0 52.4-15.8 52.4-36.6 0-17.5-9.9-27.7-32.3-33.5l-25-6.2c-12.3-3.1-18.5-7.8-18.5-17 0-10 9.2-16.2 23.2-16.2 15.1 0 25 6.7 28.5 19.5l36.9-0.4zM175.3 196.9H137v108.3c0 22.3-9.4 32.3-28.4 32.3-18.4 0-27.1-10.2-27.1-32.3V196.9H43.2v111.2c0 44.2 24.4 62.9 61.7 62.9 37.2 0 61.9-19 61.9-63.2l0.1-110.9z' },
    { id: 's4', name: 'React', category: 'Frontend Framework', level: 'Advanced', icon: 'M287.9 0C297 0 304 7 304 15.6v30.7l32-9.8c8.6-2.6 17.7 2.2 20.3 10.8l9.7 32.1 29.7-17.1c7.5-4.3 17-1.7 21.3 5.8l15.6 27.1 25.3-24.9c6.2-6.1 16.3-6 22.4.2 6.1 6.3 6 16.3-.2 22.4l-25 24.6 17.3 29.9c4.4 7.5 1.8 17.1-5.7 21.5l-29.9 17.2 9.7 32.1c2.6 8.6-2.2 17.7-10.8 20.3l-32.3 9.8V304c0 8.8-7.1 16-15.9 16h-30.5l9.7 32.3c2.5 8.6-2.4 17.6-11 20.1l-31.8 9.3 17.1 29.7c4.3 7.4 1.7 17-5.7 21.4l-27.4 15.7 24.9 25.3c6.1 6.2 6 16.3-.2 22.4-6.3 6.1-16.3 6-22.4-.2l-24.6-25-29.9 17.3c-7.5 4.4-17.1 1.8-21.5-5.7l-17.2-29.9-32.1 9.7c-8.6 2.6-17.7-2.2-20.3-10.8L192 452.8v30.7c0 8.8-7 15.5-15.7 15.5h-32.5c-8.8 0-15.7-7-15.7-15.7V452l-32 9.8c-8.6 2.6-17.7-2.2-20.3-10.8l-9.8-32.3-29.7 17.1c-7.5 4.3-17 1.7-21.3-5.8L0 402.8l-25.4 24.9c-6.2 6.1-16.3 6-22.4-.2-6.1-6.3-6-16.3.2-22.4l25-24.6-17.3-29.9c-4.4-7.5-1.8-17.1 5.7-21.5l29.9-17.2-9.7-32.1c-2.6-8.6 2.2-17.7 10.8-20.3l32.3-9.8V240c0-8.8 7.1-16 15.9-16h30.5l-9.7-32.3c-2.5-8.6 2.4-17.6 11-20.1l31.8-9.3-17.1-29.7c-4.3-7.4-1.7-17 5.7-21.4l27.4-15.7-24.9-25.3c-6.1-6.2-6-16.3.2-22.4 6.3-6.1 16.3-6 22.4.2l24.6 25 29.9-17.3c7.5-4.4 17.1-1.8 21.5 5.7l17.2 29.9 32.1-9.7c8.6-2.6 17.7 2.2 20.3 10.8L192 111v-30.7C192 71.7 198.8 64 207.6 64H240c8.8 0 16 7.2 16 16v.2l31.4-9.6c8.6-2.6 17.7 2.1 20.4 10.7l9.8 32.3 29.7-17.1c7.5-4.3 17-1.7 21.3 5.8l15.6 27.1 25.4-25.1' },
    { id: 's5', name: 'Java', category: 'Programming Language', level: 'Intermediate', icon: 'M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 01-2 2.6c128.3-33.4 128.1-128.4 36.8-171.4 10.5 49.5-40.8 78.2-34.8 168.8zM207.29 468c-5.35 3.41-14 6.13-38.4 6.82-38.51 1.13-74.2-13.21-48.31-28.79 15.79-9.5 58.93-17.76 58.93-17.76s-15.55-2.67-38.88-7.28c-30.48-5.9-66.52-16.85-55.47-32.71 20.23-28.5 168.18 6.67 168.18 6.67s-26.5-12.19-55.5-21.7c-35.6-11.65-79.1-26.04-52.67-41.8 22.07-13.3 81.61-11.26 133.8 11.42 56.06 23.96 74.45 72.14 28.22 94.08z' },
    { id: 's6', name: 'MySQL', category: 'Database', level: 'Intermediate', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
    { id: 's7', name: 'Node.js', category: 'Backend Runtime', level: 'Intermediate', icon: 'M11.998 0C5.373 0 0 5.373 0 12s5.373 12 11.998 12C18.627 24 24 18.627 24 12S18.626 0 11.998 0zM6.44 16.832c-.213.012-.215-.295-.004-.306 2.042-.115 3.69-.43 3.69-.43s-2.048-4.09-2.648-5.568c-.128-.318.153-.674.5-.674h2.43c.196 0 .37.126.435.312l1.178 3.345 1.178-3.345a.459.459 0 01.435-.312h2.43c.347 0 .628.356.5.674-.6 1.478-2.648 5.568-2.648 5.568s1.648.315 3.69.43c.211.011.209.318-.004.306-2.264-.127-3.9-.424-3.9-.424s-.47 1.05-.617 1.45c-.148.4-.604.477-.888.161-.283-.314-.822-1.186-.936-1.354a.26.26 0 01-.021-.08.287.287 0 01.02-.1c.115-.17.653-1.04.936-1.355.285-.315.74-.238.888.162.148.4.617 1.45.617 1.45s-1.636.297-3.9.424z' },
    { id: 's8', name: 'Tailwind CSS', category: 'CSS Framework', level: 'Advanced', icon: 'M12 6C9.33 6 7.67 7.33 7 10c1 -1.33 2.17 -1.83 3.5 -1.5c.76 .19 1.31 .74 1.91 1.35C13.41 10.86 14.73 12 17 12c2.67 0 4.33 -1.33 5 -4c-1 1.33 -2.17 1.83 -3.5 1.5c-.76-.19-1.31-.74-1.91-1.35C15.59 7.14 14.27 6 12 6zm-5 6C4.33 12 2.67 13.33 2 16c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.31.74 1.91 1.35C8.41 16.86 9.73 18 12 18c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.31-.74-1.91-1.35C10.59 13.14 9.27 12 7 12z' },
];

// ─── Auth Token Management ──────────────────────────────────────

const TOKEN_KEY = 'admin_token';

export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
    const token = getAuthToken();
    return token
        ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        : { 'Content-Type': 'application/json' };
}

// ─── Projects API ───────────────────────────────────────────────

export async function getProjects() {
    const hit = cacheGet('projects');
    if (hit) return hit;
    try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        cacheSet('projects', data);
        return data;
    } catch (err) {
        console.warn('API unavailable, using fallback project data:', err.message);
        return FALLBACK_PROJECTS;
    }
}

export async function saveProject(project) {
    try {
        let res;
        if (project.id) {
            res = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(project),
            });
        } else {
            res = await fetch('/api/projects', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify(project),
            });
        }
        cacheInvalidate('projects');
        return await res.json();
    } catch (err) {
        console.error('Failed to save project:', err);
        return { success: false, message: 'Network error' };
    }
}

export async function deleteProject(id) {
    try {
        const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        cacheInvalidate('projects');
        return await res.json();
    } catch (err) {
        console.error('Failed to delete project:', err);
        return { success: false, message: 'Network error' };
    }
}

// ─── Skills API ─────────────────────────────────────────────────

export async function getSkills() {
    const hit = cacheGet('skills');
    if (hit) return hit;
    try {
        const res = await fetch('/api/skills');
        if (!res.ok) throw new Error('Failed to fetch skills');
        const data = await res.json();
        cacheSet('skills', data);
        return data;
    } catch (err) {
        console.warn('API unavailable, using fallback skill data:', err.message);
        return FALLBACK_SKILLS;
    }
}

export async function saveSkill(skill) {
    try {
        let res;
        if (skill.id) {
            res = await fetch(`/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(skill),
            });
        } else {
            res = await fetch('/api/skills', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify(skill),
            });
        }
        cacheInvalidate('skills');
        return await res.json();
    } catch (err) {
        console.error('Failed to save skill:', err);
        return { success: false, message: 'Network error' };
    }
}

export async function deleteSkill(id) {
    try {
        const res = await fetch(`/api/skills/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        cacheInvalidate('skills');
        return await res.json();
    } catch (err) {
        console.error('Failed to delete skill:', err);
        return { success: false, message: 'Network error' };
    }
}


// ─── Admin Auth (API-based with bcrypt hashing) ─────────────────

export async function checkPassword(password) {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (data.success && data.token) {
            setAuthToken(data.token);
        }
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
            headers: authHeaders(),
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Password change failed:', err);
        return { success: false, message: 'Network error' };
    }
}
