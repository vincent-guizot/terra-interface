"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cultivation_service_1 = require("../src/modules/cultivation/cultivation.service");
function testCultivationInvariants() {
    console.log('🧪 Running Cultivation Dosing & Calibration Invariant Tests...');
    const service = new cultivation_service_1.CultivationService(null);
    const dosingResult = service.calculateNutrientDosing({
        ecTarget: 1.8,
        currentEc: 1.2,
        reservoirLiters: 200,
        targetPh: 6.0,
        currentPh: 6.8,
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
    const calibrations = service.getMicrogreenCalibration();
    if (!calibrations || calibrations.length < 3) {
        throw new Error('Microgreen calibrations missing');
    }
    const sunflower = calibrations.find((c) => c.cropName.includes('Sunflower'));
    if (!sunflower || sunflower.seedingDensityGramsPerTray <= 0 || sunflower.yieldMultiplierRatio <= 0) {
        throw new Error('Sunflower calibration invalid');
    }
    console.log('  ✔ Microgreen seeding and yield calibrations verified');
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
