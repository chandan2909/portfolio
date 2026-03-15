import { getPool, initTables } from '../_lib/db.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();

        // GET — list all projects
        if (req.method === 'GET') {
            const [rows] = await db.execute(
                'SELECT id, title, description, image, github, live, tags, desktop_app FROM projects ORDER BY sort_order ASC, id ASC'
            );
            const projects = rows.map(r => ({
                id: String(r.id),
                title: r.title,
                description: r.description || '',
                image: r.image || '',
                github: r.github || '',
                live: r.live || '',
                tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []),
                desktopApp: !!r.desktop_app,
            }));
            return res.json(projects);
        }

        // POST — create new project
        if (req.method === 'POST') {
            const { title, description, image, github, live, tags, desktopApp } = req.body;
            if (!title) {
                return res.status(400).json({ success: false, message: 'Title is required' });
            }

            const [maxOrder] = await db.execute('SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM projects');
            const sortOrder = maxOrder[0].next_order;

            const [result] = await db.execute(
                'INSERT INTO projects (title, description, image, github, live, tags, desktop_app, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [title, description || '', image || '', github || '', live || '', JSON.stringify(tags || []), desktopApp ? 1 : 0, sortOrder]
            );
            return res.json({ success: true, id: String(result.insertId), message: 'Project created' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Projects API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
