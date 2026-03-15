import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool, { initDatabase } from '../config/database.js';

dotenv.config();

const SALT_ROUNDS = 12;

const defaultProjects = [
    {
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing modern web development skills using HTML, CSS, JavaScript, and responsive design principles.',
        image: './assets/portfolio-screenshot.png',
        github: 'https://github.com/chandan2909/portfolio',
        live: 'https://chandanpathak.dev',
        tags: ['HTML', 'CSS', 'JavaScript'],
        desktopApp: false,
    },
    {
        title: 'ATM Interface',
        description: 'Interactive ATM management system built with modern programming concepts, featuring secure transactions and intuitive user interface design.',
        image: './assets/project-three.gif',
        github: 'https://github.com/chandan2909/Atm-manage',
        tags: ['Java', 'OOP'],
        desktopApp: true,
    },
];

const defaultSkills = [
    { name: 'HTML', category: 'Markup Language', level: 'Intermediate' },
    { name: 'CSS', category: 'Styling & Design', level: 'Intermediate' },
    { name: 'JavaScript', category: 'Programming & Logic', level: 'Intermediate' },
    { name: 'Git/GitHub', category: 'Version Control', level: 'Basic' },
    { name: 'SQL', category: 'Database Management', level: 'Intermediate' },
    { name: 'Java', category: 'Object-Oriented Programming', level: 'Intermediate' },
];

async function seed() {
    try {
        console.log('🔧 Initializing database...');
        await initDatabase();

        // ─── Seed admin password ─────────────────────────
        const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
        const [existingAdmin] = await pool.execute(
            'SELECT id FROM admin_users WHERE username = ?', ['admin']
        );

        if (existingAdmin.length > 0) {
            console.log('⚠️  Admin user already exists. Resetting password...');
            const hash = await bcrypt.hash(defaultPassword, SALT_ROUNDS);
            await pool.execute('UPDATE admin_users SET password_hash = ? WHERE username = ?', [hash, 'admin']);
        } else {
            const hash = await bcrypt.hash(defaultPassword, SALT_ROUNDS);
            await pool.execute('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', ['admin', hash]);
        }
        console.log(`✅ Admin password set to: ${defaultPassword}`);

        // ─── Seed projects ───────────────────────────────
        const [existingProjects] = await pool.execute('SELECT COUNT(*) as count FROM projects');
        if (existingProjects[0].count === 0) {
            for (let i = 0; i < defaultProjects.length; i++) {
                const p = defaultProjects[i];
                await pool.execute(
                    'INSERT INTO projects (title, description, image, github, live, tags, desktop_app, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [p.title, p.description, p.image, p.github, p.live || '', JSON.stringify(p.tags), p.desktopApp ? 1 : 0, i + 1]
                );
            }
            console.log(`✅ ${defaultProjects.length} default projects seeded`);
        } else {
            console.log(`⚠️  Projects already exist (${existingProjects[0].count}), skipping seed`);
        }

        // ─── Seed skills ─────────────────────────────────
        const [existingSkills] = await pool.execute('SELECT COUNT(*) as count FROM skills');
        if (existingSkills[0].count === 0) {
            for (let i = 0; i < defaultSkills.length; i++) {
                const s = defaultSkills[i];
                await pool.execute(
                    'INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)',
                    [s.name, s.category, s.level, i + 1]
                );
            }
            console.log(`✅ ${defaultSkills.length} default skills seeded`);
        } else {
            console.log(`⚠️  Skills already exist (${existingSkills[0].count}), skipping seed`);
        }

        console.log('🎉 Seed complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seed();
