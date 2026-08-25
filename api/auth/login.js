import bcrypt from 'bcryptjs';
import { getPool, initTable } from '../_lib/db.js';
import { generateToken } from '../_lib/auth.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        await initTable();
        const db = getPool();

        const [rows] = await db.execute(
            'SELECT password_hash FROM admin_users WHERE username = ?',
            ['admin']
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, rows[0].password_hash);

        if (isMatch) {
            const token = generateToken();
            return res.json({ success: true, token, message: 'Login successful' });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
