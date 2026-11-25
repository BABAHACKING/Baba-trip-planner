const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CATALOG_PATH = path.join(__dirname, '..', 'public', 'js', 'places-catalog.js');

let cachedMtime = 0;
let cachedCatalog = null;

function getCatalog() {
    const stat = fs.statSync(CATALOG_PATH);
    if (cachedCatalog && stat.mtimeMs === cachedMtime) {
        return cachedCatalog;
    }
    const code = fs.readFileSync(CATALOG_PATH, 'utf8');
    const ctx = { window: {} };
    vm.createContext(ctx);
    vm.runInContext(code, ctx);
    cachedCatalog = ctx.window.PLACES_CATALOG || {};
    cachedMtime = stat.mtimeMs;
    return cachedCatalog;
}

function getDistrictSummaries() {
    const catalog = getCatalog();
    return Object.entries(catalog).map(([cityKey, placesMap]) => {
        const entries = Object.values(placesMap);
        const totalPhotos = entries.reduce((sum, item) => sum + ((item.images && item.images.length) || 0), 0);
        const first = entries[0] || {};
        return {
            cityKey,
            cityLabel: first.cityLabel || cityKey,
            districtPage: first.districtPage || `${cityKey}.html`,
            placeCount: entries.length,
            photoCount: totalPhotos,
            heroImage: first.image || (first.images && first.images[0]) || ''
        };
    });
}

function searchPlaces({ city = '', category = '', q = '' } = {}) {
    const catalog = getCatalog();
    const cityFilter = String(city || '').toLowerCase().trim();
    const catFilter = String(category || '').toLowerCase().trim();
    const queryFilter = String(q || '').toLowerCase().trim();

    const results = [];
    for (const [cityKey, placesMap] of Object.entries(catalog)) {
        if (cityFilter && cityKey.toLowerCase() !== cityFilter) continue;
        for (const place of Object.values(placesMap)) {
            const badgeMatch = !catFilter || (place.badgeText || '').toLowerCase().includes(catFilter) || (place.badgeClass || '').toLowerCase().includes(catFilter);
            if (!badgeMatch) continue;
            if (queryFilter) {
                const haystack = `${place.name || ''} ${place.location || ''} ${place.shortDesc || ''} ${(place.highlights || []).join(' ')}`.toLowerCase();
                if (!haystack.includes(queryFilter)) continue;
            }
            results.push(place);
        }
    }
    return results;
}

function getPlaceByCityAndId(cityKey, placeId) {
    const catalog = getCatalog();
    const normalizedCity = String(cityKey || '').toLowerCase().trim();
    const cityMap = catalog[normalizedCity];
    if (!cityMap) return null;
    if (cityMap[placeId]) return cityMap[placeId];
    return Object.values(cityMap).find((p) => p.id === placeId) || null;
}

module.exports = {
    getCatalog,
    getDistrictSummaries,
    searchPlaces,
    getPlaceByCityAndId
};
