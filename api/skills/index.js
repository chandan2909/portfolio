import { getPool, initTables } from '../_lib/db.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();

        // GET — list all skills
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
            return res.json(skills);
        }

        // POST — create new skill
        if (req.method === 'POST') {
            const { name, category, level } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }

            const [maxOrder] = await db.execute('SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM skills');
            const sortOrder = maxOrder[0].next_order;

            const [result] = await db.execute(
                'INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)',
                [name, category || '', level || 'Basic', sortOrder]
            );
            return res.json({ success: true, id: String(result.insertId), message: 'Skill created' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Skills API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
