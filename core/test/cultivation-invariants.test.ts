import { CultivationService } from '../src/modules/cultivation/cultivation.service';

function testCultivationInvariants() {
  console.log('🧪 Running Cultivation Dosing & Calibration Invariant Tests...');

  const service = new CultivationService(null as any);

  // 1. Test Nutrient Dosing Calculation with EC deficit
  // Target 1.8, Current 1.2, Reservoir 200L -> deficit 0.6
  // concentrate = (0.6 / 0.1) * (200 / 10) * 5 = 6 * 20 * 5 = 600 mL
  const dosingResult = service.calculateNutrientDosing({
    ecTarget: 1.8,
    currentEc: 1.2,
    reservoirLiters: 200,
    targetPh: 6.0,
    currentPh: 6.8, // Should recommend pH Down
  });

  if (dosingResult.solutionAPumpMl !== 600 || dosingResult.solutionBPumpMl !== 600) {
    throw new Error(`Dosing math failed: expected 600 mL, got ${dosingResult.solutionAPumpMl}`);
  }
  if (dosingResult.status !== 'CORRECTION_REQUIRED') {
    throw new Error(`Status should be CORRECTION_REQUIRED, got ${dosingResult.status}`);
  }
  if (dosingResult.phAdjustment.direction !== 'PH_DOWN' || dosingResult.phAdjustment.amountMl <= 0) {
    throw new Error(`pH Down calculation failed: ${JSON.stringify(dosingResult.phAdjustment)}`);
  }
  console.log('  ✔ Nutrient A/B dosing calculation and pH Down buffer verified (600 mL)');

  // 2. Test Balanced EC (no dosing required)
  const balancedResult = service.calculateNutrientDosing({
    ecTarget: 1.6,
    currentEc: 1.6,
    reservoirLiters: 150,
  });
  if (dosingResult.solutionAPumpMl < 0 || balancedResult.solutionAPumpMl !== 0) {
    throw new Error('Balanced EC should produce 0 mL pump dosage');
  }
  if (balancedResult.status !== 'BALANCED') {
    throw new Error(`Balanced status failed, got ${balancedResult.status}`);
  }
  console.log('  ✔ Balanced nutrient status verified');

  // 3. Test Microgreen Calibration Benchmarks
  const calibrations = service.getMicrogreenCalibration();
  if (!calibrations || calibrations.length < 3) {
    throw new Error('Microgreen calibrations missing');
  }
  const sunflower = calibrations.find((c) => c.cropName.includes('Sunflower'));
  if (!sunflower || sunflower.seedingDensityGramsPerTray <= 0 || sunflower.yieldMultiplierRatio <= 0) {
    throw new Error('Sunflower calibration invalid');
  }
  console.log('  ✔ Microgreen seeding and yield calibrations verified');

  // 4. Test Organic Biocontrol Pest Scouting
  const scoutResult = service.recordPestScouting({
    zoneId: 'Z-01',
    identifiedPest: 'Aphids',
    infestationLevel: 'Moderate',
    affectedArea: 'Gully 2',
  });
  if (!scoutResult.recommendedBioControl || !scoutResult.recommendedBioControl.toLowerCase().includes('neem')) {
    throw new Error(`Expected Neem recipe for Aphids, got: ${scoutResult.recommendedBioControl}`);
  }
  console.log('  ✔ Organic pest recipe auto-matching for Aphids verified');

  console.log('🎉 All Cultivation Invariant Tests Passed Successfully!');
}

testCultivationInvariants();
