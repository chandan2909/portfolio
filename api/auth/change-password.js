import bcrypt from 'bcryptjs';
import { getPool, initTable } from '../_lib/db.js';

const SALT_ROUNDS = 12;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Both current and new password are required' });
        }

        if (newPassword.length < 4) {
            return res.status(400).json({ success: false, message: 'New password must be at least 4 characters' });
        }

        await initTable();
        const db = getPool();

        const [rows] = await db.execute(
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

        const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await db.execute(
            'UPDATE admin_users SET password_hash = ? WHERE username = ?',
            [newHash, 'admin']
        );

        return res.json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
