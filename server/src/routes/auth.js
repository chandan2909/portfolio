import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';

const router = express.Router();
const SALT_ROUNDS = 12;

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        // Get the admin user
        const [rows] = await pool.execute(
            'SELECT password_hash FROM admin_users WHERE username = ?',
            ['admin']
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Admin account not configured. Run: npm run seed' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, rows[0].password_hash);

        if (isMatch) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/auth/change-password
router.post('/change-password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Both current and new password are required' });
        }

        if (newPassword.length < 4) {
            return res.status(400).json({ success: false, message: 'New password must be at least 4 characters' });
        }

        // Verify current password first
        const [rows] = await pool.execute(
            'SELECT password_hash FROM admin_users WHERE username = ?',
            ['admin']
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Admin account not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, rows[0].password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash and save new password
        const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await pool.execute(
            'UPDATE admin_users SET password_hash = ? WHERE username = ?',
            [newHash, 'admin']
        );

        return res.json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
