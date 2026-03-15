// Data Manager — API-based persistence for projects & skills
// All data is stored in MySQL (Aiven) and fetched via API

// ─── Projects API ───────────────────────────────────────────────

export async function getProjects() {
    try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        return await res.json();
    } catch (err) {
        console.error('Failed to load projects:', err);
        return [];
    }
}

export async function saveProject(project) {
    try {
        if (project.id) {
            // Update existing
            const res = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
            return await res.json();
        } else {
            // Create new
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
            return await res.json();
        }
    } catch (err) {
        console.error('Failed to save project:', err);
        return { success: false, message: 'Network error' };
    }
}

export async function deleteProject(id) {
    try {
        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        return await res.json();
    } catch (err) {
        console.error('Failed to delete project:', err);
        return { success: false, message: 'Network error' };
    }
}

// ─── Skills API ─────────────────────────────────────────────────

export async function getSkills() {
    try {
        const res = await fetch('/api/skills');
        if (!res.ok) throw new Error('Failed to fetch skills');
        return await res.json();
    } catch (err) {
        console.error('Failed to load skills:', err);
        return [];
    }
}

export async function saveSkill(skill) {
    try {
        if (skill.id) {
            const res = await fetch(`/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill),
            });
            return await res.json();
        } else {
            const res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill),
            });
            return await res.json();
        }
    } catch (err) {
        console.error('Failed to save skill:', err);
        return { success: false, message: 'Network error' };
    }
}

export async function deleteSkill(id) {
    try {
        const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
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
