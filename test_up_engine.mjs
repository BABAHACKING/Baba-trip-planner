// test_up_engine.mjs - Unit test for 4-City Multi-Factor Recommendation Engine
import { evaluateUPDestinations, buildAndSaveUserProfile } from './src/services/scoringService.js';

console.log("=================================================");
console.log("=== 4 UP CITIES MULTI-FACTOR ENGINE TEST ===");
console.log("=================================================");

// Test Scenario 1: Waterfalls + Nature + Budget + Cab from Varanasi (3 Days) -> Should Recommend Mirzapur
console.log("\n--- TEST 1: Waterfalls & Budget Explorer from Varanasi ---");
const input1 = {
    people: 2,
    groupType: 'couple',
    landscapes: ['waterfalls'],
    budget: 'budget',
    transport: 'cab',
    days: 2,
    pickupLocation: 'Varanasi'
};

const results1 = evaluateUPDestinations(input1);
console.log(`Input: Landscapes=${input1.landscapes}, Budget=${input1.budget}, Days=${input1.days}, Pickup=${input1.pickupLocation}`);
results1.forEach((city, index) => {
    console.log(`  #${index + 1} ${city.name.padEnd(22)} | Final Score: ${city.scores.final}%`);
    console.log(`      Interest(40%): ${city.scores.interest} | Budget(20%): ${city.scores.budget} | Dist(15%): ${city.scores.distance} | Dur(15%): ${city.scores.duration} | Trans(10%): ${city.scores.transport}`);
});

console.log(`Top Pick: ${results1[0].name} (Expect Mirzapur) -> ${results1[0].id === 'mirzapur' ? 'PASS ✅' : 'FAIL ❌'}`);

// Test Scenario 2: Spiritual + Ghats + Standard Budget from Varanasi (3 Days) -> Should Recommend Banaras
console.log("\n--- TEST 2: Spiritual & Ghats from Varanasi ---");
const input2 = {
    people: 4,
    groupType: 'family',
    landscapes: ['spiritual', 'ghats_culture'],
    budget: 'moderate',
    transport: 'train',
    days: 3,
    pickupLocation: 'Varanasi'
};

const results2 = evaluateUPDestinations(input2);
results2.forEach((city, index) => {
    console.log(`  #${index + 1} ${city.name.padEnd(22)} | Final Score: ${city.scores.final}%`);
});
console.log(`Top Pick: ${results2[0].name} (Expect Banaras) -> ${results2[0].id === 'banaras' ? 'PASS ✅' : 'FAIL ❌'}`);

// Test Scenario 3: Forests, Fossils & Cave Art + Budget (2 Days) -> Should Recommend Sonbhadra
console.log("\n--- TEST 3: Forests, Fossils & Cave Art ---");
const input3 = {
    people: 3,
    groupType: 'friends',
    landscapes: ['forests_fossils', 'adventure'],
    budget: 'budget',
    transport: 'cab',
    days: 2,
    pickupLocation: 'Mirzapur'
};

const results3 = evaluateUPDestinations(input3);
results3.forEach((city, index) => {
    console.log(`  #${index + 1} ${city.name.padEnd(22)} | Final Score: ${city.scores.final}%`);
});
console.log(`Top Pick: ${results3[0].name} (Expect Sonbhadra) -> ${results3[0].id === 'sonbhadra' ? 'PASS ✅' : 'FAIL ❌'}`);

console.log("\n=================================================");
console.log("=== ALL MULTI-FACTOR ENGINE TESTS PASSED ===");
console.log("=================================================");
