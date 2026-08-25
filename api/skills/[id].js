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

            const { name, category, level } = req.body;
            if (!name || typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }

            const validLevels = ['Basic', 'Intermediate', 'Advanced', 'Expert'];
            const safeLevel = validLevels.includes(level) ? level : 'Basic';
            const safeName = sanitize(name, 100);
            const safeCategory = sanitize(category || '', 200);

            await db.execute(
                'UPDATE skills SET name=?, category=?, level=? WHERE id=?',
                [safeName, safeCategory, safeLevel, id]
            );
            return res.json({ success: true, message: 'Skill updated' });
        }

        if (req.method === 'DELETE') {
            if (!requireAuth(req, res)) return;

            await db.execute('DELETE FROM skills WHERE id=?', [id]);
            return res.json({ success: true, message: 'Skill deleted' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Skill API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
