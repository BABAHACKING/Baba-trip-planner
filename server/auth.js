const crypto = require('crypto');
const { readCollectionSync, writeCollection } = require('./db');

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

let cachedJwtSecret = null;

function getJwtSecret() {
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length >= 16) {
        return process.env.JWT_SECRET.trim();
    }
    if (cachedJwtSecret) return cachedJwtSecret;

    const config = readCollectionSync('config', {});
    if (config && typeof config.jwtSecret === 'string' && config.jwtSecret.length >= 32) {
        cachedJwtSecret = config.jwtSecret;
        return cachedJwtSecret;
    }

    const generated = crypto.randomBytes(48).toString('hex');
    cachedJwtSecret = generated;
    writeCollection('config', { ...config, jwtSecret: generated }).catch((err) => {
        console.error('Failed to persist generated JWT secret:', err);
    });
    return generated;
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derived = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${derived}`;
}

function verifyPassword(password, storedHash) {
    if (!storedHash || !storedHash.includes(':')) return false;
    const [salt, keyHex] = storedHash.split(':');
    if (!salt || !keyHex) return false;
    const keyBuffer = Buffer.from(keyHex, 'hex');
    const derived = crypto.scryptSync(password, salt, 64);
    if (keyBuffer.length !== derived.length) return false;
    return crypto.timingSafeEqual(keyBuffer, derived);
}

function base64UrlEncode(input) {
    const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input), 'utf8');
    return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str) {
    const padLen = (4 - (str.length % 4)) % 4;
    const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLen);
    return Buffer.from(padded, 'base64').toString('utf8');
}

function signToken(user) {
    const now = Math.floor(Date.now() / 1000);
    const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = base64UrlEncode(
        JSON.stringify({
            sub: user.id,
            email: user.email,
            name: user.name,
            iat: now,
            exp: now + TOKEN_TTL_SECONDS
        })
    );
    const signingInput = `${header}.${payload}`;
    const signature = crypto
        .createHmac('sha256', getJwtSecret())
        .update(signingInput)
        .digest();
    return `${signingInput}.${base64UrlEncode(signature)}`;
}

function verifyToken(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, sigB64] = parts;
    const signingInput = `${header}.${payload}`;
    const expectedSig = base64UrlEncode(
        crypto.createHmac('sha256', getJwtSecret()).update(signingInput).digest()
    );
    const a = Buffer.from(sigB64, 'utf8');
    const b = Buffer.from(expectedSig, 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    try {
        const parsed = JSON.parse(base64UrlDecode(payload));
        const now = Math.floor(Date.now() / 1000);
        if (!parsed.exp || parsed.exp < now) return null;
        return parsed;
    } catch {
        return null;
    }
}

function extractBearerToken(req) {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7).trim();
    }
    return null;
}

function requireAuth(req, res, next) {
    const token = extractBearerToken(req);
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Authentication required. Please sign in.' });
    }
    req.user = decoded;
    return next();
}

function optionalAuth(req, res, next) {
    const token = extractBearerToken(req);
    if (token) {
        req.user = verifyToken(token);
    }
    return next();
}

function sanitizeUser(user) {
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}

module.exports = {
    hashPassword,
    verifyPassword,
    signToken,
    verifyToken,
    requireAuth,
    optionalAuth,
    sanitizeUser
};
