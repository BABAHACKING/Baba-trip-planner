// test_scoring.mjs - Unit test for scoringService logic
import {
    evaluateUPDestinations,
    buildAndSaveUserProfile,
    UP_CITIES,
    INTEREST_OPTIONS,
    BUDGET_OPTIONS,
    TRANSPORT_OPTIONS,
    generateComprehensiveItinerary
} from './src/services/scoringService.js';

console.log("=== RUNNING SCORING ENGINE UNIT TEST ===");

const testFormData = {
    people: 2,
    groupType: 'couple',
    landscapes: ['spiritual', 'waterfalls'],
    budget: 'moderate',
    transport: 'cab',
    days: 4,
    pickupLocation: 'Varanasi'
};

const ranked = evaluateUPDestinations(testFormData);

console.log("1. Ranked Destinations Count:", ranked.length);
ranked.forEach((city, i) => {
    console.log(`   #${i + 1} ${city.name} - Final Score: ${city.scores.final}%`);
    console.log(`      Interest: ${city.scores.interest} | Budget: ${city.scores.budget} | Dist: ${city.scores.distance} | Dur: ${city.scores.duration} | Trans: ${city.scores.transport}`);
});

console.log("\n2. Generating Comprehensive 4-Day Itinerary...");
const topCity = ranked[0];
const itinerary = generateComprehensiveItinerary(topCity, ranked, 4, testFormData.landscapes);
console.log(`   Generated ${itinerary.length} days of detailed itinerary.`);
itinerary.forEach(d => {
    console.log(`   - Day ${d.day} (${d.city}): ${d.title}`);
});

console.log("\n=== ALL SCORING ENGINE TESTS COMPLETED SUCCESSFULLY ===");

