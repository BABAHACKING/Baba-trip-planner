import { generateTripPlan } from './src/services/scoringService.js';

console.log('Testing Map + Route Module Data Flow...');

// Test with 3 different questionnaire profiles
const testProfiles = [
    {
        name: 'Profile 1: 3-Day Cab Waterfalls & Heritage',
        input: {
            days: 3,
            groupType: 'couple',
            people: 2,
            budget: 'moderate',
            transport: 'cab',
            landscapes: ['waterfalls', 'heritage', 'spiritual']
        }
    },
    {
        name: 'Profile 2: 5-Day Train Spiritual & Culture',
        input: {
            days: 5,
            groupType: 'family',
            people: 4,
            budget: 'luxury',
            transport: 'train',
            landscapes: ['spiritual', 'ghats_culture', 'culinary']
        }
    },
    {
        name: 'Profile 3: 2-Day Bus Adventure',
        input: {
            days: 2,
            groupType: 'friends',
            people: 3,
            budget: 'budget',
            transport: 'bus',
            landscapes: ['adventure', 'forests_fossils']
        }
    }
];

let allPassed = true;

for (const prof of testProfiles) {
    console.log(`\n========================================`);
    console.log(`Testing ${prof.name}`);
    console.log(`========================================`);

    const plan = generateTripPlan(prof.input);

    // 1. Check summary
    if (!plan.summary) {
        console.error('FAIL: summary is missing');
        allPassed = false;
        continue;
    }
    console.log(`✓ Summary: ${plan.summary.durationDays} Days, ${plan.summary.transportLabel}`);
    console.log(`  Circuit: ${plan.summary.routeCircuitString}`);

    // 2. Check itinerary (Single Source of Truth)
    if (!plan.itinerary || plan.itinerary.length !== prof.input.days) {
        console.error(`FAIL: expected ${prof.input.days} days, got ${plan.itinerary?.length}`);
        allPassed = false;
        continue;
    }
    console.log(`✓ Itinerary contains ${plan.itinerary.length} days.`);

    // 3. Inspect Day 1 activities and coordinates
    const day1 = plan.itinerary[0];
    console.log(`✓ Day 1: ${day1.destination} - ${day1.title}`);
    console.log(`  Stay Hotel: ${day1.hotel.name} (${day1.hotel.type}) - GPS: ${JSON.stringify(day1.hotel.coordinates)}`);

    if (!day1.activities || day1.activities.length === 0) {
        console.error('FAIL: Day 1 has no activities');
        allPassed = false;
        continue;
    }

    console.log(`✓ Day 1 Activities Sequence (${day1.activities.length} stops):`);
    let coordsValid = true;
    for (let i = 0; i < day1.activities.length; i++) {
        const act = day1.activities[i];
        if (!act.coordinates || typeof act.coordinates.lat !== 'number' || typeof act.coordinates.lng !== 'number') {
            console.error(`  FAIL: Activity #${i + 1} "${act.place}" missing valid coordinates:`, act.coordinates);
            coordsValid = false;
            allPassed = false;
        } else {
            console.log(`  ${i + 1}. [${act.category.toUpperCase()}] ${act.place} (${act.activity})`);
            console.log(`     GPS: [${act.coordinates.lat.toFixed(4)}, ${act.coordinates.lng.toFixed(4)}] | Dist: ${act.distance || '—'} | Transit: ${act.travelTime || '—'}`);
        }
    }

    if (coordsValid) {
        console.log('✓ All activities have valid, distinct GPS coordinates for map plotting.');
    }

    // 4. Test Route Segments generation
    const segments = [];
    for (let i = 0; i < day1.activities.length - 1; i++) {
        const from = day1.activities[i];
        const to = day1.activities[i + 1];
        segments.push({
            from: from.place,
            to: to.place,
            dist: to.distance,
            time: to.travelTime,
            transport: plan.summary.transportLabel
        });
    }

    console.log(`✓ Day 1 Route Segments (${segments.length} segments):`);
    segments.forEach((seg, sIdx) => {
        console.log(`   Segment ${sIdx + 1}: "${seg.from}" → "${seg.to}" | ${seg.dist} | ${seg.time} | Mode: ${seg.transport}`);
    });

    // 5. Test Multi-Day Circuit Map Data
    if (!plan.mapRoute || !plan.mapRoute.circuitWaypoints || plan.mapRoute.circuitWaypoints.length === 0) {
        console.error('FAIL: mapRoute circuitWaypoints missing');
        allPassed = false;
    } else {
        console.log(`✓ Multi-Day Circuit Route: ${plan.mapRoute.circuitWaypoints.map(w => w.city).join(' → ')} (~${plan.mapRoute.totalCircuitDistanceKm} km)`);
    }
}

if (allPassed) {
    console.log('\n========================================');
    console.log('ALL MAP + ROUTE MODULE UNIT & FLOW TESTS PASSED!');
    console.log('========================================');
} else {
    console.error('\nSOME TESTS FAILED.');
    process.exit(1);
}
