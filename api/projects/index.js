import { getPool, initTables } from '../_lib/db.js';
import { requireAuth, sanitize } from '../_lib/auth.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();

        if (req.method === 'GET') {
            const [rows] = await db.execute(
                'SELECT id, title, description, image, github, live, tags, desktop_app FROM projects ORDER BY sort_order ASC, id ASC'
            );
            const projects = rows.map(r => {
                let tags = [];
                try {
                    tags = typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []);
                } catch { tags = []; }
                return {
                    id: String(r.id),
                    title: r.title,
                    description: r.description || '',
                    image: r.image || '',
                    github: r.github || '',
                    live: r.live || '',
                    tags,
                    desktopApp: !!r.desktop_app,
                };
            });
            res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
            return res.json(projects);
        }

        if (req.method === 'POST') {
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

            const [maxOrder] = await db.execute('SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM projects');
            const sortOrder = maxOrder[0].next_order;

            const [result] = await db.execute(
                'INSERT INTO projects (title, description, image, github, live, tags, desktop_app, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [safeTitle, safeDesc, safeImage, safeGithub, safeLive, JSON.stringify(safeTags), desktopApp ? 1 : 0, sortOrder]
            );
            return res.json({ success: true, id: String(result.insertId), message: 'Project created' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Projects API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
