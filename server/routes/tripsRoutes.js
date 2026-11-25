const express = require('express');
const { readCollection, mutateCollection } = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();
const MAX_TRIPS_PER_USER = 20;

router.use(requireAuth);

function getUserTripsSorted(allTrips, userId) {
    return allTrips
        .filter((t) => t.userId === userId)
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

router.get('/', async (req, res, next) => {
    try {
        const allTrips = await readCollection('trips', []);
        const userTrips = getUserTripsSorted(allTrips, req.user.sub);
        const activeTrip = userTrips.find((t) => t.isActive) || userTrips[0] || null;
        return res.json({ activeTrip, trips: userTrips });
    } catch (err) {
        return next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const payload = req.body || {};
        if (!payload.formData || typeof payload.formData !== 'object') {
            return res.status(400).json({ error: 'Trip payload must include formData.' });
        }

        const now = new Date().toISOString();
        const tripId = String(payload.id || `up_trip_${Date.now()}`);

        const result = await mutateCollection('trips', (allTrips) => {
            const otherUsersTrips = allTrips.filter((t) => t.userId !== req.user.sub);
            const myTrips = allTrips
                .filter((t) => t.userId === req.user.sub)
                .map((t) => ({ ...t, isActive: false }));

            const existingIdx = myTrips.findIndex((t) => t.id === tripId);
            const savedRecord = {
                id: tripId,
                userId: req.user.sub,
                createdAt: existingIdx >= 0 ? myTrips[existingIdx].createdAt : (payload.createdAt || now),
                updatedAt: now,
                isActive: true,
                formData: payload.formData,
                topDestination: payload.topDestination || null,
                rankedDestinations: Array.isArray(payload.rankedDestinations) ? payload.rankedDestinations : []
            };

            if (existingIdx >= 0) {
                myTrips.splice(existingIdx, 1);
            }
            const nextMyTrips = [savedRecord, ...myTrips]
                .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                .slice(0, MAX_TRIPS_PER_USER);

            return {
                data: [...otherUsersTrips, ...nextMyTrips],
                output: { savedRecord, trips: nextMyTrips }
            };
        }, []);

        return res.status(201).json({
            trip: result.savedRecord,
            trips: result.trips
        });
    } catch (err) {
        return next(err);
    }
});

router.patch('/:id/activate', async (req, res, next) => {
    try {
        const targetId = String(req.params.id || '');
        const outcome = await mutateCollection('trips', (allTrips) => {
            const owns = allTrips.some((t) => t.id === targetId && t.userId === req.user.sub);
            if (!owns) {
                return { data: allTrips, output: { notFound: true } };
            }
            const updated = allTrips.map((t) =>
                t.userId === req.user.sub ? { ...t, isActive: t.id === targetId } : t
            );
            const myTrips = getUserTripsSorted(updated, req.user.sub);
            const activeTrip = myTrips.find((t) => t.id === targetId) || null;
            return { data: updated, output: { activeTrip, trips: myTrips } };
        }, []);

        if (outcome.notFound) {
            return res.status(404).json({ error: 'Trip snapshot not found.' });
        }
        return res.json(outcome);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const targetId = String(req.params.id || '');
        const outcome = await mutateCollection('trips', (allTrips) => {
            const target = allTrips.find((t) => t.id === targetId && t.userId === req.user.sub);
            if (!target) {
                return { data: allTrips, output: { notFound: true } };
            }
            let remaining = allTrips.filter((t) => !(t.id === targetId && t.userId === req.user.sub));
            let myTrips = getUserTripsSorted(remaining, req.user.sub);
            if (myTrips.length > 0 && !myTrips.some((t) => t.isActive)) {
                const newestId = myTrips[0].id;
                remaining = remaining.map((t) =>
                    t.userId === req.user.sub && t.id === newestId ? { ...t, isActive: true } : t
                );
                myTrips = getUserTripsSorted(remaining, req.user.sub);
            }
            const activeTrip = myTrips.find((t) => t.isActive) || myTrips[0] || null;
            return {
                data: remaining,
                output: { deletedId: targetId, activeTrip, trips: myTrips }
            };
        }, []);

        if (outcome.notFound) {
            return res.status(404).json({ error: 'Trip snapshot not found.' });
        }
        return res.json(outcome);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
