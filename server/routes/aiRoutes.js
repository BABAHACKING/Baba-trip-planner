const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
const PREFERRED_MODELS = [
    process.env.GEMINI_MODEL,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-pro'
].filter(Boolean);

function sanitizeChatHistory(history) {
    if (!Array.isArray(history)) return [];
    const normalized = history
        .filter((item) => item && (item.role === 'user' || item.role === 'model') && Array.isArray(item.parts) && item.parts[0]?.text)
        .map((item) => ({
            role: item.role,
            parts: [{ text: String(item.parts[0].text) }]
        }));

    // Gemini requires chat history to start with a 'user' turn
    const firstUserIdx = normalized.findIndex((item) => item.role === 'user');
    return firstUserIdx >= 0 ? normalized.slice(firstUserIdx) : [];
}

async function generateWithFallback(handler) {
    if (!GEMINI_KEY) {
        throw new Error('Server Gemini API key is not configured.');
    }
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    let lastError = null;
    for (const modelName of PREFERRED_MODELS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            return await handler(model, modelName);
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError || new Error('Unable to reach Gemini models.');
}

router.post('/chat', async (req, res) => {
    const message = String(req.body?.message || '').trim();
    const history = sanitizeChatHistory(req.body?.history);

    if (!message) {
        return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const constrainedMessage = [
        'Context: You are a helpful India Tourist travel guide specializing in Uttar Pradesh (Varanasi, Prayagraj, Mirzapur, Sonbhadra, Lucknow, Ayodhya, Mathura).',
        'Rule: Answer ONLY questions related to travel, tourism, timings, culture, food, routes, or logistics. Politely decline unrelated topics.',
        `User Query: ${message}`
    ].join('\n');

    try {
        const result = await generateWithFallback(async (model, modelName) => {
            const chat = model.startChat({
                history,
                generationConfig: { maxOutputTokens: 500 }
            });
            const response = await chat.sendMessage(constrainedMessage);
            return { reply: response.response.text(), model: modelName };
        });

        return res.json({ reply: result.reply, model: result.model, source: 'gemini' });
    } catch (err) {
        console.error('Express /api/ai/chat error:', err.message);
        return res.status(502).json({
            error: 'AI travel service is currently unavailable.',
            details: err.message
        });
    }
});

router.post('/itinerary', async (req, res) => {
    const formData = req.body || {};
    const days = Number(formData.days) || 3;
    const people = Number(formData.people) || 2;
    const groupType = String(formData.groupType || 'travelers');
    const landscapes = Array.isArray(formData.landscapes) && formData.landscapes.length > 0
        ? formData.landscapes.join(', ')
        : 'spiritual, heritage';
    const pickupLocation = String(formData.pickupLocation || 'Varanasi');

    const prompt = `
        You are an expert travel agent specializing in creating personalized itineraries for India.
        CRITICAL: Generate ONLY travel and tourism itinerary data starting from ${pickupLocation}.
        Generate a detailed ${days}-day itinerary for ${people} people (${groupType}) visiting destinations focused on: ${landscapes}.
        Return strictly a raw JSON array of objects without markdown formatting:
        [{ "day": 1, "destination": "Name of city/place", "activity": "Short description (max 10 words)" }]
    `;

    try {
        const result = await generateWithFallback(async (model, modelName) => {
            const out = await model.generateContent(prompt);
            const rawText = out.response.text();
            const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            return { itinerary: JSON.parse(cleanText), model: modelName };
        });

        return res.json({ itinerary: result.itinerary, model: result.model, source: 'gemini' });
    } catch (err) {
        console.error('Express /api/ai/itinerary error:', err.message);
        return res.status(502).json({
            error: 'Unable to generate AI itinerary right now.',
            details: err.message
        });
    }
});

module.exports = router;
