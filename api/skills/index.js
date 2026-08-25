import { getPool, initTables } from '../_lib/db.js';
import { requireAuth, sanitize } from '../_lib/auth.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();

        if (req.method === 'GET') {
            const [rows] = await db.execute(
                'SELECT id, name, category, level FROM skills ORDER BY sort_order ASC, id ASC'
            );
            const skills = rows.map(r => ({
                id: String(r.id),
                name: r.name,
                category: r.category || '',
                level: r.level || 'Basic',
            }));
            res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
            return res.json(skills);
        }

        if (req.method === 'POST') {
            if (!requireAuth(req, res)) return;

            const { name, category, level } = req.body;
            if (!name || typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }

            const validLevels = ['Basic', 'Intermediate', 'Advanced', 'Expert'];
            const safeLevel = validLevels.includes(level) ? level : 'Basic';
            const safeName = sanitize(name, 100);
            const safeCategory = sanitize(category || '', 200);

            const [maxOrder] = await db.execute('SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM skills');
            const sortOrder = maxOrder[0].next_order;

            const [result] = await db.execute(
                'INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)',
                [safeName, safeCategory, safeLevel, sortOrder]
            );
            return res.json({ success: true, id: String(result.insertId), message: 'Skill created' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Skills API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
