const express = require('express');
const crypto = require('crypto');
const { readCollection, mutateCollection } = require('../db');

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
    try {
        const firstName = String(req.body?.firstName || '').trim();
        const lastName = String(req.body?.lastName || '').trim();
        const email = String(req.body?.email || '').trim().toLowerCase();
        const phone = String(req.body?.phone || '').trim();
        const destination = String(req.body?.destination || '').trim();
        const subject = String(req.body?.subject || '').trim();
        const message = String(req.body?.message || '').trim();

        if (!firstName || !lastName || !EMAIL_REGEX.test(email) || !subject || !message) {
            return res.status(400).json({ error: 'Please complete all required fields with a valid email.' });
        }

        const inquiry = {
            id: `inq_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
            firstName,
            lastName,
            email,
            phone,
            destination,
            subject,
            message,
            createdAt: new Date().toISOString()
        };

        await mutateCollection('inquiries', (list) => {
            list.unshift(inquiry);
            return { data: list, output: inquiry };
        }, []);

        return res.status(201).json({
            message: 'Thank you for contacting India Tourist! Your inquiry has been saved.',
            inquiryId: inquiry.id
        });
    } catch (err) {
        return next(err);
    }
});

router.get('/stats', async (req, res, next) => {
    try {
        const inquiries = await readCollection('inquiries', []);
        return res.json({ totalInquiries: inquiries.length });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
