const express = require('express');
const crypto = require('crypto');
const { readCollection, mutateCollection } = require('../db');
const { hashPassword, verifyPassword, signToken, requireAuth, sanitizeUser } = require('../auth');

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', async (req, res, next) => {
    try {
        const rawEmail = String(req.body?.email || '').trim().toLowerCase();
        const password = String(req.body?.password || '');
        const rawName = String(req.body?.name || '').trim();

        if (!EMAIL_REGEX.test(rawEmail)) {
            return res.status(400).json({ error: 'Please provide a valid email address.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }

        const displayName = rawName || rawEmail.split('@')[0];

        const outcome = await mutateCollection('users', (users) => {
            const exists = users.find((u) => u.email === rawEmail);
            if (exists) {
                return { data: users, output: { conflict: true } };
            }
            const newUser = {
                id: `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
                name: displayName,
                email: rawEmail,
                passwordHash: hashPassword(password),
                createdAt: new Date().toISOString()
            };
            users.push(newUser);
            return { data: users, output: { user: newUser } };
        }, []);

        if (outcome.conflict) {
            return res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
        }

        const token = signToken(outcome.user);
        return res.status(201).json({
            message: 'Account created successfully.',
            token,
            user: sanitizeUser(outcome.user)
        });
    } catch (err) {
        return next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const rawEmail = String(req.body?.email || '').trim().toLowerCase();
        const password = String(req.body?.password || '');

        if (!rawEmail || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const users = await readCollection('users', []);
        const user = users.find((u) => u.email === rawEmail);
        if (!user || !verifyPassword(password, user.passwordHash)) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = signToken(user);
        return res.json({
            message: 'Signed in successfully.',
            token,
            user: sanitizeUser(user)
        });
    } catch (err) {
        return next(err);
    }
});

router.get('/me', requireAuth, async (req, res, next) => {
    try {
        const users = await readCollection('users', []);
        const user = users.find((u) => u.id === req.user.sub);
        if (!user) {
            return res.status(404).json({ error: 'User account not found.' });
        }
        return res.json({ user: sanitizeUser(user) });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
