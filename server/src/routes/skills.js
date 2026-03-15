import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/skills — list all
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id, name, category, level FROM skills ORDER BY sort_order ASC, id ASC'
        );
        const skills = rows.map(r => ({
            id: String(r.id),
            name: r.name,
            category: r.category || '',
            level: r.level || 'Basic',
        }));
        res.json(skills);
    } catch (err) {
        console.error('GET skills error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/skills — create
router.post('/', async (req, res) => {
    try {
        const { name, category, level } = req.body;
        if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

        const [maxOrder] = await pool.execute('SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM skills');
        const sortOrder = maxOrder[0].next_order;

        const [result] = await pool.execute(
            'INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)',
            [name, category || '', level || 'Basic', sortOrder]
        );
        res.json({ success: true, id: String(result.insertId), message: 'Skill created' });
    } catch (err) {
        console.error('POST skill error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PUT /api/skills/:id — update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, level } = req.body;
        if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

        await pool.execute(
            'UPDATE skills SET name=?, category=?, level=? WHERE id=?',
            [name, category || '', level || 'Basic', id]
        );
        res.json({ success: true, message: 'Skill updated' });
    } catch (err) {
        console.error('PUT skill error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE /api/skills/:id — delete
router.delete('/:id', async (req, res) => {
    try {
        await pool.execute('DELETE FROM skills WHERE id=?', [req.params.id]);
        res.json({ success: true, message: 'Skill deleted' });
    } catch (err) {
        console.error('DELETE skill error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
