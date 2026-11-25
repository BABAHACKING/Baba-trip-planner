const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { readCollectionSync } = require('./db');
const { getDistrictSummaries } = require('./catalogLoader');
const authRoutes = require('./routes/authRoutes');
const placesRoutes = require('./routes/placesRoutes');
const tripsRoutes = require('./routes/tripsRoutes');
const aiRoutes = require('./routes/aiRoutes');
const contactRoutes = require('./routes/contactRoutes');

function createApp() {
    const app = express();

    const allowedOrigins = [
        'http://localhost:3005',
        'http://127.0.0.1:3005',
        `http://localhost:${process.env.SERVER_PORT || 5000}`
    ];

    app.use(
        cors({
            origin(origin, callback) {
                if (
                    !origin ||
                    allowedOrigins.includes(origin) ||
                    /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
                ) {
                    return callback(null, true);
                }
                return callback(new Error('Origin not allowed by CORS'));
            },
            credentials: true
        })
    );

    app.use(express.json({ limit: '2mb' }));

    app.get('/api/health', (req, res) => {
        const districts = getDistrictSummaries();
        const users = readCollectionSync('users', []);
        const trips = readCollectionSync('trips', []);
        const inquiries = readCollectionSync('inquiries', []);

        res.json({
            status: 'ok',
            service: 'india-tourist-express-api',
            port: Number(process.env.SERVER_PORT || 5000),
            uptimeSeconds: Math.round(process.uptime()),
            catalog: {
                districts: districts.length,
                places: districts.reduce((sum, d) => sum + d.placeCount, 0),
                photos: districts.reduce((sum, d) => sum + d.photoCount, 0)
            },
            storage: {
                users: users.length,
                trips: trips.length,
                inquiries: inquiries.length
            },
            geminiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY)
        });
    });

    app.use('/api/auth', authRoutes);
    app.use('/api/places', placesRoutes);
    app.use('/api/trips', tripsRoutes);
    app.use('/api/ai', aiRoutes);
    app.use('/api/contact', contactRoutes);

    app.use('/api', (req, res) => {
        res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
    });

    // Serve production build if requested or built without React dev server
    const buildDir = path.join(__dirname, '..', 'build');
    if (process.env.SERVE_BUILD === 'true' && fs.existsSync(buildDir)) {
        app.use(express.static(buildDir));
        app.get('/{*splat}', (req, res) => {
            res.sendFile(path.join(buildDir, 'index.html'));
        });
    }

    app.use((err, req, res, next) => {
        console.error('Unhandled Express API error:', err);
        res.status(err.status || 500).json({
            error: err.message || 'Internal server error.'
        });
    });

    return app;
}

const app = createApp();

if (require.main === module) {
    const serverPort = Number(process.env.SERVER_PORT || 5000);
    app.listen(serverPort, () => {
        console.log(`India Tourist Express API listening on http://localhost:${serverPort}`);
    });
}

module.exports = { app, createApp };
