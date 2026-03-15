import { getPool, initTables } from '../_lib/db.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Project ID required' });
        }

        // PUT — update project
        if (req.method === 'PUT') {
            const { title, description, image, github, live, tags, desktopApp } = req.body;
            if (!title) {
                return res.status(400).json({ success: false, message: 'Title is required' });
            }
            await db.execute(
                'UPDATE projects SET title=?, description=?, image=?, github=?, live=?, tags=?, desktop_app=? WHERE id=?',
                [title, description || '', image || '', github || '', live || '', JSON.stringify(tags || []), desktopApp ? 1 : 0, id]
            );
            return res.json({ success: true, message: 'Project updated' });
        }

        // DELETE — delete project
        if (req.method === 'DELETE') {
            await db.execute('DELETE FROM projects WHERE id=?', [id]);
            return res.json({ success: true, message: 'Project deleted' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Project API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
