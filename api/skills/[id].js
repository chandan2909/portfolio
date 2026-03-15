import { getPool, initTables } from '../_lib/db.js';

export default async function handler(req, res) {
    try {
        await initTables();
        const db = getPool();
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Skill ID required' });
        }

        // PUT — update skill
        if (req.method === 'PUT') {
            const { name, category, level } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required' });
            }
            await db.execute(
                'UPDATE skills SET name=?, category=?, level=? WHERE id=?',
                [name, category || '', level || 'Basic', id]
            );
            return res.json({ success: true, message: 'Skill updated' });
        }

        // DELETE — delete skill
        if (req.method === 'DELETE') {
            await db.execute('DELETE FROM skills WHERE id=?', [id]);
            return res.json({ success: true, message: 'Skill deleted' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });
    } catch (err) {
        console.error('Skill API error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
