import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool, { initDatabase } from '../config/database.js';

dotenv.config();

const SALT_ROUNDS = 12;

async function seed() {
    try {
        console.log('🔧 Initializing database...');
        await initDatabase();

        const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';

        // Check if admin already exists
        const [existing] = await pool.execute(
            'SELECT id FROM admin_users WHERE username = ?',
            ['admin']
        );

        if (existing.length > 0) {
            console.log('⚠️  Admin user already exists. Resetting password...');
            const hash = await bcrypt.hash(defaultPassword, SALT_ROUNDS);
            await pool.execute(
                'UPDATE admin_users SET password_hash = ? WHERE username = ?',
                [hash, 'admin']
            );
            console.log(`✅ Admin password reset to: ${defaultPassword}`);
        } else {
            const hash = await bcrypt.hash(defaultPassword, SALT_ROUNDS);
            await pool.execute(
                'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
                ['admin', hash]
            );
            console.log(`✅ Admin user created with password: ${defaultPassword}`);
        }

        console.log('🔐 Password has been hashed with bcrypt (12 salt rounds)');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seed();
