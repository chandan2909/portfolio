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
        console.error('Failed to load projects:', err);
        return [];
    }
}

export async function saveProject(project) {
    try {
        let res;
        if (project.id) {
            res = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
        } else {
            res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
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
        console.error('Failed to load skills:', err);
        return [];
    }
}

export async function saveSkill(skill) {
    try {
        let res;
        if (skill.id) {
            res = await fetch(`/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill),
            });
        } else {
            res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
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
