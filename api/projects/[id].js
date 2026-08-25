import { getPool, initTables } from '../_lib/db.js';
import { requireAuth, validateId, sanitize } from '../_lib/auth.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();
        const id = validateId(req.query.id, res);
        if (id === null) return;

        if (req.method === 'PUT') {
            if (!requireAuth(req, res)) return;

            const { title, description, image, github, live, tags, desktopApp } = req.body;
            if (!title || typeof title !== 'string' || !title.trim()) {
                return res.status(400).json({ success: false, message: 'Title is required' });
            }

            const safeTitle = sanitize(title, 255);
            const safeDesc = sanitize(description || '', 5000);
            const safeImage = sanitize(image || '', 10000);
            const safeGithub = sanitize(github || '', 500);
            const safeLive = sanitize(live || '', 500);
            const safeTags = Array.isArray(tags) ? tags.slice(0, 10).map(t => sanitize(String(t), 50)) : [];

            await db.execute(
                'UPDATE projects SET title=?, description=?, image=?, github=?, live=?, tags=?, desktop_app=? WHERE id=?',
                [safeTitle, safeDesc, safeImage, safeGithub, safeLive, JSON.stringify(safeTags), desktopApp ? 1 : 0, id]
            );
            return res.json({ success: true, message: 'Project updated' });
        }

        if (req.method === 'DELETE') {
            if (!requireAuth(req, res)) return;

            await db.execute('DELETE FROM projects WHERE id=?', [id]);
            return res.json({ success: true, message: 'Project deleted' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Project API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
