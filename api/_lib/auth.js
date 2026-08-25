import crypto from 'crypto';

const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret() {
    const secret = process.env.ADMIN_PASSWORD_HASH;
    if (!secret) throw new Error('ADMIN_PASSWORD_HASH env var not set');
    return secret;
}

export function generateToken() {
    const secret = getSecret();
    const timestamp = Date.now();
    const payload = `${timestamp}`;
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return `${timestamp}.${signature}`;
}

export function verifyToken(token) {
    if (!token) return false;
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // Check expiry
    if (Date.now() - timestamp > TOKEN_MAX_AGE_MS) return false;

    // Verify signature
    const secret = getSecret();
    const expected = crypto.createHmac('sha256', secret).update(timestampStr).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
}

export function requireAuth(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Authentication required' });
        return false;
    }
    const token = authHeader.slice(7);
    if (!verifyToken(token)) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
        return false;
    }
    return true;
}

export function validateId(id, res) {
    const num = parseInt(id, 10);
    if (isNaN(num) || num <= 0) {
        res.status(400).json({ success: false, message: 'Invalid ID parameter' });
        return null;
    }
    return num;
}

export function sanitize(str, maxLen = 1000) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>"'&]/g, (c) => {
        const map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' };
        return map[c];
    }).slice(0, maxLen);
}

export function sanitizeEmail(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>"'&]/g, (c) => {
        const map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' };
        return map[c];
    }).slice(0, 254);
}
