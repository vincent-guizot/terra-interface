import { LivestockService } from '../src/modules/livestock/livestock.service';
import { AquacultureService } from '../src/modules/aquaculture/aquaculture.service';
import { TilapiaTelemetryService } from '../src/modules/aquaculture/tilapia-telemetry.service';
import { calculateHenDayProduction } from '../src/modules/livestock/kub-poultry.model';

async function testLivestockAndAquacultureInvariants() {
  console.log('🧪 Running Livestock & Aquaculture Domain Invariant Tests...');

  // 1. Test Hen-Day Production Formula
  // 21 eggs from 24 hens = (21 / 24) * 100 = 87.5%
  const hdpResult = calculateHenDayProduction(24, 21, 2.5);
  if (hdpResult.henDayProductionPercent !== 87.5) {
    throw new Error(`HDP failed: expected 87.5%, got ${hdpResult.henDayProductionPercent}%`);
  }
  console.log('  ✔ Hen-Day Production % formula verified (87.5%)');

  // 2. Test Livestock Service Egg Harvest & Grade Distribution
  const livestockService = new LivestockService({
    batch: { findUnique: async () => null },
    batchOutput: { create: async () => null },
    batchEvent: { create: async () => null },
  } as any);

  const eggHarvest = await livestockService.recordEggHarvest({
    batchCode: 'BAT-2026-LIV-01',
    eggsCollected: 22,
    totalHens: 24,
    gradeACount: 20,
    crackedCount: 2,
  });

  if (eggHarvest.henDayProductionPercent !== 91.7) {
    throw new Error(`Expected 91.7% HDP, got ${eggHarvest.henDayProductionPercent}`);
  }
  if (eggHarvest.gradeACount !== 20 || eggHarvest.crackedCount !== 2) {
    throw new Error('Egg grading breakdown failed');
  }
  console.log('  ✔ Egg harvest recording & grading breakdown verified');

  // 3. Test Water Quality Telemetry Evaluation & Critical Thresholds
  const telemetry = new TilapiaTelemetryService();
  const alertEvaluation = telemetry.evaluateWaterQuality({
    dissolvedOxygenMgL: 4.2, // Below 5.0 -> Critical alert
    pH: 7.2,
    waterTempC: 26.5,
    ammoniaPpm: 0.65, // Above 0.5 -> Elevated alert
    nitratePpm: 15.0,
  });

  if (alertEvaluation.status !== 'ATTENTION_REQUIRED') {
    throw new Error(`Expected ATTENTION_REQUIRED status, got ${alertEvaluation.status}`);
  }
  if (alertEvaluation.alerts.length !== 2) {
    throw new Error(`Expected 2 alerts (DO & Ammonia), got ${alertEvaluation.alerts.length}`);
  }
  console.log('  ✔ Water quality threshold alerts (DO < 5.0, Ammonia > 0.5) verified');

  // 4. Test Aquaculture Service & Pond Stocking
  const aquaService = new AquacultureService(
    { batch: { findMany: async () => [] } } as any,
    telemetry,
  );
  const ponds = await aquaService.getPonds();
  if (ponds.length !== 3) {
    throw new Error(`Expected 3 canonical ponds, got ${ponds.length}`);
  }
  const tilapiaPond = ponds.find((p) => p.pondCode === 'PND-01');
  if (!tilapiaPond || tilapiaPond.totalBiomassKg <= 0 || tilapiaPond.stockingDensityKgM3 <= 0) {
    throw new Error('Tilapia pond biomass / density metrics failed');
  }
  console.log('  ✔ Bio-pond biomass and stocking density verified');

  console.log('🎉 All Livestock & Aquaculture Invariant Tests Passed Successfully!');
}

testLivestockAndAquacultureInvariants();
