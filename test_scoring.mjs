// test_scoring.mjs - Unit test for scoringService logic & TripPlan generation
import {
    evaluateUPDestinations,
    buildAndSaveUserProfile,
    generateTripPlan,
    UP_CITIES,
    INTEREST_OPTIONS,
    BUDGET_OPTIONS,
    TRANSPORT_OPTIONS,
    generateComprehensiveItinerary
} from './src/services/scoringService.js';

console.log("=== RUNNING SCORING ENGINE & TRIP PLAN UNIT TEST ===");

const testFormData = {
    people: 2,
    groupType: 'couple',
    landscapes: ['spiritual', 'waterfalls'],
    budget: 'budget',
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

console.log("\n2. Generating Master Trip Plan Object...");
const tripPlan = generateTripPlan(testFormData);
console.log("   Trip Plan ID:", tripPlan.id);
console.log("   Summary:", tripPlan.summary.travelersLabel, "|", tripPlan.summary.durationLabel, "|", tripPlan.summary.budgetLabel);
console.log("   Route:", tripPlan.summary.routeCircuitString);
console.log("   Est Total Cost:", tripPlan.summary.estimatedTotalCost.formatted);
console.log("   Itinerary Days Generated:", tripPlan.itinerary.length);

tripPlan.itinerary.forEach(d => {
    console.log(`\n   --- DAY ${d.day}: ${d.destination} (${d.title}) ---`);
    console.log(`       Hotel: ${d.hotel.name} (${d.hotel.type}) - ₹${d.hotel.pricePerNight}/night`);
    console.log(`       Activities Count: ${d.activities.length}`);
    d.activities.forEach((act, idx) => {
        console.log(`       [${act.timeSlot}] ${act.place} -> ${act.activity} (Est: ₹${act.estimatedCost})`);
    });
    console.log(`       Day Summary: ${d.daySummary.totalDistance} | ${d.daySummary.totalTravelTime} | Est Cost: ₹${d.daySummary.estimatedDayCost}`);
});

console.log("\n3. Food & Stay Summary:");
console.log("   Stays count:", tripPlan.foodAndStay.stays.length);
console.log("   Food spots count:", tripPlan.foodAndStay.foodSpots.length);

console.log("\n4. Map Route Summary:");
console.log("   Circuit waypoints:", tripPlan.mapRoute.circuitWaypoints.map(w => w.city).join(' -> '));

console.log("\n=== ALL TRIP PLAN ENGINE TESTS COMPLETED SUCCESSFULLY ===");


