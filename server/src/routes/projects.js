import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/projects — list all
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute(
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
        res.json(projects);
    } catch (err) {
        console.error('GET projects error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/projects — create
router.post('/', async (req, res) => {
    try {
        const { title, description, image, github, live, tags, desktopApp } = req.body;
        if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

        const [maxOrder] = await pool.execute('SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM projects');
        const sortOrder = maxOrder[0].next_order;

        const [result] = await pool.execute(
            'INSERT INTO projects (title, description, image, github, live, tags, desktop_app, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description || '', image || '', github || '', live || '', JSON.stringify(tags || []), desktopApp ? 1 : 0, sortOrder]
        );
        res.json({ success: true, id: String(result.insertId), message: 'Project created' });
    } catch (err) {
        console.error('POST project error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PUT /api/projects/:id — update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, github, live, tags, desktopApp } = req.body;
        if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

        await pool.execute(
            'UPDATE projects SET title=?, description=?, image=?, github=?, live=?, tags=?, desktop_app=? WHERE id=?',
            [title, description || '', image || '', github || '', live || '', JSON.stringify(tags || []), desktopApp ? 1 : 0, id]
        );
        res.json({ success: true, message: 'Project updated' });
    } catch (err) {
        console.error('PUT project error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE /api/projects/:id — delete
router.delete('/:id', async (req, res) => {
    try {
        await pool.execute('DELETE FROM projects WHERE id=?', [req.params.id]);
        res.json({ success: true, message: 'Project deleted' });
    } catch (err) {
        console.error('DELETE project error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
