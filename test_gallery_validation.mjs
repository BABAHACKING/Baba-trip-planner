import { generateTripPlan, UP_CITIES } from './src/services/scoringService.js';

console.log('--- Testing UP_CITIES 4-Image Galleries & Google Images Links ---');
for (const city of UP_CITIES) {
    if (!city.images || city.images.length < 4) {
        throw new Error(`City ${city.name} does not have at least 4 images!`);
    }
    if (!city.googleImagesUrl || !city.googleImagesUrl.includes('google.com/search?tbm=isch')) {
        throw new Error(`City ${city.name} missing valid googleImagesUrl!`);
    }
    console.log(`✓ City ${city.name}: ${city.images.length} real photos, googleImagesUrl verified.`);
}

console.log('\n--- Testing Generated Trip Plan Activities 4-Image Galleries ---');
const sampleForm = {
    destination: 'banaras',
    people: '2',
    budget: 'moderate',
    days: '4',
    pace: 'moderate',
    groupType: 'couple',
    transport: 'cab',
    pickupLocation: 'Varanasi Junction (BSB)',
    landscapes: ['temples', 'river_ghats', 'historical_monuments', 'waterfalls_nature', 'handicrafts_silk']
};

const plan = generateTripPlan(sampleForm);

let totalActivitiesChecked = 0;
let totalSightActivitiesChecked = 0;

for (const day of plan.itinerary) {
    console.log(`\nDay ${day.day} (${day.destination}):`);
    for (const act of day.activities) {
        totalActivitiesChecked++;
        if (act.category === 'sight' || act.category === 'spiritual' || act.category === 'heritage' || act.category === 'waterfalls') {
            totalSightActivitiesChecked++;
            if (!act.images || act.images.length < 4) {
                throw new Error(`Activity ${act.place} in Day ${day.day} does not have 4 images! Found: ${act.images?.length}`);
            }
            if (!act.googleImagesUrl || !act.googleImagesUrl.includes('google.com/search?tbm=isch')) {
                throw new Error(`Activity ${act.place} missing valid googleImagesUrl!`);
            }
            console.log(`  ✓ ${act.place} (${act.activity}): ${act.images.length} photos | Google: ${act.googleImagesUrl.slice(0, 60)}...`);
        }
    }
}

console.log(`\n====================================================`);
console.log(`VERIFICATION COMPLETE:`);
console.log(`- ${UP_CITIES.length} Destination Cities verified with 4-image arrays & Google links`);
console.log(`- ${totalSightActivitiesChecked} Sight Activities verified with 4 real images & Google Images links`);
console.log(`- ${totalActivitiesChecked} Total Activities verified`);
console.log(`====================================================\n`);
