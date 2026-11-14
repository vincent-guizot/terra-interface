import { IntelligenceService } from '../src/modules/intelligence/intelligence.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { diagnoseVisualDeficiency } from '../src/modules/intelligence/plant-diagnosis.engine';
import { estimateRainCatchmentVolume, generateWestJavaForecast } from '../src/modules/intelligence/weather-forecast.dto';
import { EcologicalCalculator } from '../src/helpers/ecological-calculator.helper';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

async function runTests() {
  console.log('🧪 Running Terra AI Autonomy Engine & Ecological Invariants Tests...\n');

  // Mock PrismaService for isolated unit testing
  const mockPrisma = {
    aiRecommendation: {
      count: async () => 0,
      create: async (args: any) => args.data,
      updateMany: async () => ({ count: 1 }),
      findMany: async () => [],
    },
  } as unknown as PrismaService;

  const service = new IntelligenceService(mockPrisma);

  // -------------------------------------------------------------
  // Test 1: Autonomy Score Derivation & Baseline Calculations
  // -------------------------------------------------------------
  const initialAutonomy = await service.getAutonomyScores();
  assert(initialAutonomy.foodScore === 84.0, `Expected baseline foodScore 84.0%, got ${initialAutonomy.foodScore}`);
  assert(initialAutonomy.energyScore === 96.8, `Expected energyScore 96.8%, got ${initialAutonomy.energyScore}`);
  assert(initialAutonomy.circularityScore === 96.6, `Expected circularityScore 96.6%, got ${initialAutonomy.circularityScore}`);
  assert(initialAutonomy.overallAutonomyScore >= 90.0, `Expected overall score >= 90.0, got ${initialAutonomy.overallAutonomyScore}`);
  assert(initialAutonomy.rating === 'EXCELLENT', `Expected rating EXCELLENT, got ${initialAutonomy.rating}`);
  console.log(`  ✔ Autonomy Score Formula Verified: Overall=${initialAutonomy.overallAutonomyScore}%, Rating=${initialAutonomy.rating}`);

  // -------------------------------------------------------------
  // Test 2: Helper Biotechnical Formulas
  // -------------------------------------------------------------
  const waterDays = EcologicalCalculator.calculateWaterAutonomyDays(6850, 340);
  assert(waterDays === 20.1, `Expected water autonomy 20.1 days, got ${waterDays}`);

  const batteryHours = EcologicalCalculator.calculateBatteryAutonomyHours(15.3, 91, 0.75, 0.9);
  assert(batteryHours === 16.7 || batteryHours === 18.4 || batteryHours > 16, `Expected valid battery hours, got ${batteryHours}`);

  const henDayRate = EcologicalCalculator.calculateHenDayRate(14, 15);
  assert(henDayRate === 93.3, `Expected hen-day rate 93.3%, got ${henDayRate}`);

  const fcr = EcologicalCalculator.calculateFcr(56.25, 45.0);
  assert(fcr === 1.25, `Expected FCR 1.25, got ${fcr}`);
  console.log(`  ✔ Biotechnical helper formulas verified (Water=${waterDays}d, FCR=${fcr})`);

  // -------------------------------------------------------------
  // Test 3: Microclimate Catchment & Forecast Invariants
  // -------------------------------------------------------------
  // 18 mm rain * 140 m2 roof * 0.85 runoff = 2,142 Liters
  const catchment = estimateRainCatchmentVolume(18.0, 140, 0.85);
  assert(catchment === 2142, `Expected 2,142 L catchment for 18mm rain, got ${catchment}`);

  const forecast = generateWestJavaForecast();
  assert(forecast.expectedRoofCatchmentLiters > 0, 'Expected positive roof catchment');
  assert(forecast.relativeHumidityPercent >= 50 && forecast.relativeHumidityPercent <= 100, 'Expected valid RH %');
  console.log(`  ✔ Microclimate catchment formula verified: 18mm -> ${catchment} Liters`);

  // -------------------------------------------------------------
  // Test 4: Dynamic Recommendation Lifecycle & Autonomy Recalculation
  // -------------------------------------------------------------
  const activeInsights = await service.getInsights();
  assert(activeInsights.length >= 3, `Expected at least 3 active recommendations, got ${activeInsights.length}`);

  // Apply Soil Recommendation (rec-01)
  const appliedRec = await service.applyRecommendation('rec-01', 'Scheduled post-harvest bed seeding');
  assert(appliedRec.status === 'APPLIED', `Expected applied status, got ${appliedRec.status}`);

  // Recalculated autonomy should dynamically rise due to bonus caloric production
  const updatedAutonomy = await service.getAutonomyScores();
  assert(
    updatedAutonomy.foodScore > initialAutonomy.foodScore,
    `Expected foodScore to increase from ${initialAutonomy.foodScore} to ${updatedAutonomy.foodScore}`
  );
  assert(
    updatedAutonomy.overallAutonomyScore >= initialAutonomy.overallAutonomyScore,
    `Expected overall score to increase or stay equal: ${updatedAutonomy.overallAutonomyScore} vs ${initialAutonomy.overallAutonomyScore}`
  );
  console.log(
    `  ✔ Dynamic Autonomy Recalculation Verified: Food Score rose from ${initialAutonomy.foodScore}% to ${updatedAutonomy.foodScore}%`
  );

  // Dismiss Recommendation (rec-02)
  const dismissedRec = await service.dismissRecommendation('rec-02');
  assert(dismissedRec.status === 'DISMISSED', `Expected dismissed status, got ${dismissedRec.status}`);

  const remainingInsights = await service.getInsights();
  const foundRec01 = remainingInsights.some((r) => r.id === 'rec-01');
  const foundRec02 = remainingInsights.some((r) => r.id === 'rec-02');
  assert(!foundRec01 && !foundRec02, 'Expected applied and dismissed recommendations removed from active queue');
  console.log(`  ✔ Recommendation Lifecycle (Pending -> Applied / Dismissed) verified`);

  // -------------------------------------------------------------
  // Test 5: Plant Deficiency Visual Diagnosis Invariants
  // -------------------------------------------------------------
  const diag1 = diagnoseVisualDeficiency('Lower Old Leaves', 'Interveinal Yellowing');
  assert(diag1.probableDeficiency === 'Magnesium (Mg)', `Expected Mg, got ${diag1.probableDeficiency}`);

  const diag2 = diagnoseVisualDeficiency('Upper Young Leaves', 'Marginal Scorching');
  assert(diag2.probableDeficiency === 'Calcium (Ca)', `Expected Ca, got ${diag2.probableDeficiency}`);

  const diag3 = diagnoseVisualDeficiency('Lower Old Leaves', 'Marginal Scorching');
  assert(diag3.probableDeficiency === 'Potassium (K)', `Expected K, got ${diag3.probableDeficiency}`);

  const diag4 = diagnoseVisualDeficiency('Entire Plant', 'Uniform Pale Yellow');
  assert(diag4.probableDeficiency === 'Nitrogen (N)', `Expected N, got ${diag4.probableDeficiency}`);
  console.log('  ✔ Plant visual diagnosis engine verified across 4 deficiency profiles');

  // -------------------------------------------------------------
  // Test 6: Terra AI Assistant Natural Language Query & Audit Trail
  // -------------------------------------------------------------
  const queryRes = await service.processQuery({
    query: 'What is the nitrate level and nitrogen cycle in Pond Alpha?',
    sessionId: 'test-session-vincent',
  });
  assert(queryRes.intentCategory.includes('Nitrogen'), `Expected Nitrogen intent, got ${queryRes.intentCategory}`);
  assert(queryRes.reply.includes('Zone 2 biofilter'), 'Expected grounded reply mentioning biofilter');
  assert(queryRes.relatedZones.length > 0, 'Expected related zones');

  const auditJson = service.exportChatAudit();
  const parsedAudit = JSON.parse(auditJson);
  assert(parsedAudit.totalInteractions >= 1, 'Expected at least 1 interaction in audit trail');
  assert(parsedAudit.auditTrail[0].query.includes('nitrate'), 'Expected audit trail to contain query');
  console.log('  ✔ Terra AI contextual chat & audit serializer verified');

  console.log('\n🎉 All Terra AI Autonomy Engine & Ecological Invariants Passed Successfully!');
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
