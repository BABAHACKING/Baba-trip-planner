import { generateTripPlan, evaluateUPDestinations } from './src/services/scoringService.js';

console.log('====================================================');
console.log('COMPREHENSIVE TEST SUITE: PERSONALIZED TRIP PLAN');
console.log('Testing Travelers: 1, 2, 4 | Days: 1, 2, 4, 7');
console.log('Testing Budgets: budget, moderate, luxury');
console.log('Testing Transports: cab, train, bus');
console.log('====================================================\n');

const testCases = [
    // 1 Traveler, 1 Day, Budget, Bus, Adventure
    {
        name: 'Case 1: 1 Traveler, 1 Day (Budget, Bus, Adventure & Forests)',
        formData: {
            people: 1,
            days: 1,
            budget: 'budget',
            transport: 'bus',
            groupType: 'single',
            landscapes: ['adventure', 'forests_fossils']
        }
    },
    // 2 Travelers, 2 Days, Moderate, Cab, Waterfalls & Spiritual
    {
        name: 'Case 2: 2 Travelers, 2 Days (Moderate, Cab, Waterfalls & Spiritual)',
        formData: {
            people: 2,
            days: 2,
            budget: 'moderate',
            transport: 'cab',
            groupType: 'couple',
            landscapes: ['waterfalls', 'spiritual']
        }
    },
    // 4 Travelers, 4 Days, Luxury, Train, Spiritual & Ghats Culture
    {
        name: 'Case 3: 4 Travelers, 4 Days (Luxury, Train, Spiritual & Ghats)',
        formData: {
            people: 4,
            days: 4,
            budget: 'luxury',
            transport: 'train',
            groupType: 'family',
            landscapes: ['spiritual', 'ghats_culture', 'heritage']
        }
    },
    // 4 Travelers, 7 Days, Moderate, Cab, Complete UP Circuit
    {
        name: 'Case 4: 4 Travelers, 7 Days (Moderate, Cab, Full Circuit: All Interests)',
        formData: {
            people: 4,
            days: 7,
            budget: 'moderate',
            transport: 'cab',
            groupType: 'friends',
            landscapes: ['waterfalls', 'heritage', 'adventure', 'culinary']
        }
    }
];

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
    } else {
        console.error(`  ❌ ASSERTION FAILED: ${message}`);
        throw new Error(message);
    }
}

for (const tc of testCases) {
    console.log(`Testing: ${tc.name}...`);

    const ranked = evaluateUPDestinations(tc.formData);
    assert(Array.isArray(ranked) && ranked.length > 0, 'Ranked destinations should be a non-empty array');

    const plan = generateTripPlan(tc.formData, ranked);

    // 1. Verify Top-Level TripPlan Object Schema
    assert(typeof plan.id === 'string' && plan.id.startsWith('tripplan_'), 'TripPlan must have a valid id');
    assert(typeof plan.createdAt === 'string', 'TripPlan must have createdAt timestamp');
    assert(typeof plan.summary === 'object' && plan.summary !== null, 'TripPlan must have summary object');
    assert(Array.isArray(plan.destinations) && plan.destinations.length > 0, 'TripPlan must have destinations array');
    assert(Array.isArray(plan.itinerary), 'TripPlan must have itinerary array');
    assert(typeof plan.foodAndStay === 'object', 'TripPlan must have foodAndStay object');
    assert(typeof plan.mapRoute === 'object', 'TripPlan must have mapRoute object');
    assert(typeof plan.aiGuideContext === 'object', 'TripPlan must have aiGuideContext');

    // 2. Verify Summary
    const s = plan.summary;
    assert(s.travelers === tc.formData.people, `Travelers count must be ${tc.formData.people}`);
    assert(s.duration === tc.formData.days, `Summary duration must be ${tc.formData.days}`);
    assert(s.durationDays === tc.formData.days, `Summary durationDays must be ${tc.formData.days}`);
    assert(s.budgetTier === tc.formData.budget, `Summary budgetTier must be ${tc.formData.budget}`);
    assert(typeof s.budgetPerPerson === 'number' && s.budgetPerPerson > 0, 'budgetPerPerson must be a positive number');
    assert(s.transport === tc.formData.transport, `transport must match ${tc.formData.transport}`);
    assert(Array.isArray(s.routeCircuit) && s.routeCircuit.length > 0, 'routeCircuit must be an array of destinations');
    assert(typeof s.routeDisplay === 'string' && s.routeDisplay.length > 0, 'routeDisplay string must exist');
    assert(typeof s.estimatedTotalCost.calculatedTotal === 'number' && s.estimatedTotalCost.calculatedTotal > 0, 'Total cost must be a positive number');

    // 3. Verify Itinerary Length equals Trip Duration
    assert(plan.itinerary.length === tc.formData.days, `Itinerary length (${plan.itinerary.length}) must equal trip days (${tc.formData.days})`);

    // 4. Verify Every Day Object
    plan.itinerary.forEach((dayObj, dayIdx) => {
        assert(dayObj.day === dayIdx + 1, `Day number must be sequential: expected ${dayIdx + 1}, got ${dayObj.day}`);
        assert(typeof dayObj.destination === 'string' && dayObj.destination.length > 0, `Day ${dayObj.day} must have a destination name`);
        assert(typeof dayObj.theme === 'string' && dayObj.theme.length > 0, `Day ${dayObj.day} must have a theme`);
        assert(typeof dayObj.hotel === 'object' && dayObj.hotel !== null, `Day ${dayObj.day} must have a hotel object`);
        assert(typeof dayObj.hotel.name === 'string' && dayObj.hotel.name.length > 0, `Day ${dayObj.day} hotel must have a name`);
        assert(Array.isArray(dayObj.schedule), `Day ${dayObj.day} must contain schedule array`);
        assert(Array.isArray(dayObj.activities), `Day ${dayObj.day} must contain activities array`);
        assert(dayObj.schedule.length > 0, `Day ${dayObj.day} schedule must have activities`);

        // Check daySummary
        const ds = dayObj.daySummary;
        assert(typeof ds === 'object' && ds !== null, `Day ${dayObj.day} must have daySummary`);
        assert(typeof ds.totalDistance === 'string', `Day ${dayObj.day} must have totalDistance string`);
        assert(typeof ds.totalTravelTime === 'string', `Day ${dayObj.day} must have totalTravelTime string`);
        assert(typeof ds.estimatedDayCost === 'number' && ds.estimatedDayCost > 0, `Day ${dayObj.day} estimatedDayCost must be a positive number`);

        // 5. Verify Every Schedule / Activity Item
        dayObj.schedule.forEach((item, actIdx) => {
            assert(typeof item.id === 'string' && item.id.length > 0, `Day ${dayObj.day} Act ${actIdx + 1} must have id`);
            assert(typeof item.timeSlot === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have timeSlot`);
            assert(typeof item.startTime === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have startTime`);
            assert(typeof item.endTime === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have endTime`);
            assert(typeof item.place === 'string' && item.place.length > 0, `Day ${dayObj.day} Act ${actIdx + 1} must have place`);
            assert(typeof item.category === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have category`);
            assert(typeof item.activity === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have activity`);
            assert(typeof item.estimatedDuration === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have estimatedDuration`);
            assert(typeof item.distance === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have distance`);
            assert(typeof item.travelTime === 'string', `Day ${dayObj.day} Act ${actIdx + 1} must have travelTime`);
            assert(typeof item.estimatedCost === 'number' && !isNaN(item.estimatedCost), `Day ${dayObj.day} Act ${actIdx + 1} estimatedCost must be a valid number`);
            assert(typeof item.coordinates === 'object' && item.coordinates !== null, `Day ${dayObj.day} Act ${actIdx + 1} must have coordinates object`);
            assert(typeof item.coordinates.lat === 'number' && typeof item.coordinates.lng === 'number', `Day ${dayObj.day} Act ${actIdx + 1} coordinates must have lat & lng numbers`);
        });
    });

    console.log(`  ✓ Passed: ${tc.formData.days} days verified, ${plan.itinerary.reduce((acc, d) => acc + d.schedule.length, 0)} schedule activities checked.`);
    console.log(`  ✓ Route: ${s.routeDisplay}`);
    console.log(`  ✓ Total Cost: ${s.estimatedTotalCost.formatted} (₹${s.budgetPerPerson}/person)\n`);
}

console.log('====================================================');
console.log(`ALL TESTS PASSED SUCCESSFULLY (${passedTests}/${totalTests} assertions passed)`);
console.log('====================================================');
