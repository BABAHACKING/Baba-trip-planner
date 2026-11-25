const express = require('express');
const { getDistrictSummaries, searchPlaces, getPlaceByCityAndId } = require('../catalogLoader');

const router = express.Router();

router.get('/districts', (req, res, next) => {
    try {
        const districts = getDistrictSummaries();
        const totalPlaces = districts.reduce((sum, d) => sum + d.placeCount, 0);
        const totalPhotos = districts.reduce((sum, d) => sum + d.photoCount, 0);
        return res.json({ districts, totalPlaces, totalPhotos });
    } catch (err) {
        return next(err);
    }
});

router.get('/', (req, res, next) => {
    try {
        const { city = '', category = '', q = '' } = req.query;
        const places = searchPlaces({ city, category, q });
        return res.json({ count: places.length, places });
    } catch (err) {
        return next(err);
    }
});

router.get('/:city/:id', (req, res, next) => {
    try {
        const place = getPlaceByCityAndId(req.params.city, req.params.id);
        if (!place) {
            return res.status(404).json({ error: 'Attraction not found in catalog.' });
        }
        return res.json({ place });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
