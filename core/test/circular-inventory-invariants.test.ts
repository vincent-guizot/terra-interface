import { CircularService } from '../src/modules/circular/circular.service';
import { MaggotHarvestService } from '../src/modules/circular/maggot-harvest.service';
import { InventoryService } from '../src/modules/inventory/inventory.service';
import { computeCircularityScore } from '../src/modules/circular/circularity-index.calculator';
import { StockMovementType } from '@prisma/client';

async function testCircularAndInventoryInvariants() {
  console.log('🧪 Running Circular Systems & Inventory Ledger Invariant Tests...');

  // =========================================================================
  // 1. Test Circularity Index Closed-Loop Formula
  // =========================================================================
  const metrics = computeCircularityScore({
    totalWasteGeneratedKg: 29.5,
    divertedToBsfKg: 15.0,
    divertedToCompostKg: 10.5,
    divertedToMulchKg: 3.0,
    externalLandfillKg: 1.0,
  });

  // (15.0 + 10.5 + 3.0) / 29.5 = 28.5 / 29.5 = 96.61%
  if (metrics.circularityScorePercent < 95.0) {
    throw new Error(`Circularity score below 95% target: got ${metrics.circularityScorePercent}%`);
  }
  console.log(`  ✔ Circularity Index formula verified (${metrics.circularityScorePercent}% closed loop)`);

  // =========================================================================
  // 2. Test Maggot Harvest Service Protein & Allocation Invariants
  // =========================================================================
  const maggotService = new MaggotHarvestService();
  const harvest = maggotService.logDailyHarvest('tray-01', 2.0, 4.0);

  if (harvest.freshPrepupaeKg !== 2.0 || harvest.dryResidueFrassKg !== 4.0) {
    throw new Error('Maggot harvest yield mismatch');
  }
  if (harvest.crudeProteinPercent !== 42.4) {
    throw new Error(`Expected 42.4% protein, got ${harvest.crudeProteinPercent}%`);
  }
  if (harvest.allocatedToPoultryKg !== 1.3 || harvest.allocatedToTilapiaKg !== 0.7) {
    throw new Error(`Expected 1.3kg poultry & 0.7kg tilapia split, got ${harvest.allocatedToPoultryKg} & ${harvest.allocatedToTilapiaKg}`);
  }
  console.log('  ✔ Maggot harvest protein % and 65/35 feed allocation verified');

  // =========================================================================
  // 3. Test Inventory Ledger & Balance Derivation
  // =========================================================================
  const mockPrisma = {
    inventoryItem: { findMany: async () => [], findFirst: async () => null, update: async () => null },
    stockMovement: { findMany: async () => [], create: async () => null },
    storageLocation: { findMany: async () => [] },
    batch: { findUnique: async () => null },
    batchEvent: { create: async () => null },
    batchOutput: { create: async () => null },
    $transaction: async (ops: any) => ops,
  } as any;

  const inventoryService = new InventoryService(mockPrisma);

  // Initial stock for SKU-FEE-01 is 75 kg
  const itemsInitial = await inventoryService.getItems();
  const pelletsInitial = itemsInitial.find((i) => i.sku === 'SKU-FEE-01');
  if (!pelletsInitial || pelletsInitial.inStock !== 75.0) {
    throw new Error(`Expected initial pellet stock of 75kg, got ${pelletsInitial?.inStock}`);
  }

  // Record feeding outflow deduction of 5 kg
  const feedingMovement = await inventoryService.recordMovement({
    sku: 'SKU-FEE-01',
    type: StockMovementType.FEEDING_OUT,
    quantityDelta: 5.0, // Should be normalized to -5.0
    unit: 'kg',
    referenceBatchCode: 'BAT-2026-LIV-01',
    stewardName: 'Vincent',
    notes: 'Morning poultry feeding',
  });

  if (feedingMovement.quantityDelta !== -5.0 || feedingMovement.balanceAfter !== 70.0) {
    throw new Error(`Feeding deduction failed: delta=${feedingMovement.quantityDelta}, balance=${feedingMovement.balanceAfter}`);
  }

  // Record purchase inflow addition of 25 kg
  const purchaseMovement = await inventoryService.recordMovement({
    sku: 'SKU-FEE-01',
    type: StockMovementType.PURCHASE_IN,
    quantityDelta: 25.0,
    unit: 'kg',
    stewardName: 'Vincent',
  });

  if (purchaseMovement.quantityDelta !== 25.0 || purchaseMovement.balanceAfter !== 95.0) {
    throw new Error(`Purchase inflow failed: balance=${purchaseMovement.balanceAfter}`);
  }
  console.log('  ✔ Immutable Inventory Ledger mathematical balance derivation (+/- deltas) verified');

  // Test deduction rejection when insufficient stock
  try {
    await inventoryService.recordMovement({
      sku: 'SKU-FEE-01',
      type: StockMovementType.FEEDING_OUT,
      quantityDelta: -500.0,
      unit: 'kg',
    });
    throw new Error('Should have rejected overdraft movement');
  } catch (err: any) {
    if (!err.message.includes('Insufficient inventory')) {
      throw err;
    }
  }
  console.log('  ✔ Overdraft protection invariant verified (cannot exceed inStock balance)');

  // =========================================================================
  // 4. Test Cross-Module Circular BSF Harvest Auto-Intake to Inventory
  // =========================================================================
  const circularService = new CircularService(mockPrisma, maggotService, inventoryService);

  const bsfStockBefore = (await inventoryService.getItems()).find((i) => i.sku === 'SKU-BSF-01')?.inStock || 0;

  const harvestResult = await circularService.recordMaggotHarvest({
    batchCode: 'BAT-2026-BSF-08',
    trayId: 'tray-01',
    prepupaeYieldKg: 3.2,
    frassYieldKg: 6.0,
    allocatedToPoultryKg: 2.0,
    allocatedToTilapiaKg: 1.2,
    notes: 'Optimal prepupae harvest for high-protein feeding',
  });

  const bsfStockAfter = (await inventoryService.getItems()).find((i) => i.sku === 'SKU-BSF-01')?.inStock || 0;
  const expectedBsfStock = Math.round((bsfStockBefore + 3.2) * 10) / 10;

  if (bsfStockAfter !== expectedBsfStock) {
    throw new Error(`Expected BSF stock ${expectedBsfStock}kg, got ${bsfStockAfter}kg`);
  }
  console.log(`  ✔ Cross-module Maggot Harvest -> Inventory Ledger HARVEST_IN auto-intake verified (+3.2kg -> ${bsfStockAfter}kg)`);

  // =========================================================================
  // 5. Test Bokashi Aerobic Composting Temperature Stages & Turn Protocol
  // =========================================================================
  const turnResult = await circularService.recordCompostTurn({
    batchCode: 'BAT-2026-CMP-12',
    bayNumber: 'Bay 1',
    coreTempC: 64.0,
    edgeTempC: 47.5,
    ambientTempC: 28.0,
    turnCount: 4,
    moisturePercent: 55.0,
    biocharAddedKg: 5.0,
  });

  if (turnResult.tempLog.microbialPhase !== 'Thermophilic (Active Pasteurization)') {
    throw new Error(`Expected Thermophilic phase at 64°C, got ${turnResult.tempLog.microbialPhase}`);
  }
  if (!turnResult.batchStatus || turnResult.batchStatus.turnCount !== 4) {
    throw new Error('Compost batch turn count update failed');
  }
  console.log('  ✔ Bokashi thermophilic stage (64°C active pasteurization) & turn logging verified');

  // =========================================================================
  // 6. Test Compost Harvest to Inventory Ledger
  // =========================================================================
  const humusStockBefore = (await inventoryService.getItems()).find((i) => i.sku === 'SKU-FER-01')?.inStock || 0;

  await circularService.recordCompostHarvest({
    batchCode: 'BAT-2026-CMP-12',
    bayNumber: 'Bay 1',
    curedHumusKg: 80.0,
    curedMaturityScore: 98.0,
    destination: 'Zone 4 Permaculture Raised Beds',
  });

  const humusStockAfter = (await inventoryService.getItems()).find((i) => i.sku === 'SKU-FER-01')?.inStock || 0;
  if (humusStockAfter !== humusStockBefore + 80.0) {
    throw new Error(`Expected humus stock ${humusStockBefore + 80.0}kg, got ${humusStockAfter}kg`);
  }
  console.log(`  ✔ Bokashi Cured Humus harvest -> Inventory Ledger HARVEST_IN verified (+80kg -> ${humusStockAfter}kg)`);

  console.log('🎉 All Circular Systems & Inventory Ledger Invariant Tests Passed Successfully!');
}

testCircularAndInventoryInvariants();
