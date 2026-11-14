import { domainEventBus } from '../src/common/events/domain-event-bus';
import { eventAuditLogger } from '../src/common/events/event-audit-logger';
import { registerInventoryEventListener } from '../src/common/events/listeners/inventory-event.listener';
import { registerTelemetryAlertListener, telemetryAlertHistory } from '../src/common/events/listeners/telemetry-alert.listener';
import { inventoryService } from '../src/modules/inventory/inventory.service';

async function testDomainEventBusInvariants() {
  console.log('🧪 Running Domain Event Bus & Decoupled Invariant Tests...');

  // Register listeners
  registerInventoryEventListener();
  registerTelemetryAlertListener();

  // 1. Test Event Bus Emission & Audit Logging
  eventAuditLogger.clearAuditLog();
  const initialLogCount = eventAuditLogger.getAuditLog().length;
  if (initialLogCount !== 0) {
    throw new Error('Expected clean audit log at test start');
  }

  // 2. Test Harvest Completed Event and Automated Inventory Intake
  const itemBefore = await inventoryService.getItemById('inv-5');
  const initialStock = itemBefore.inStock;

  domainEventBus.emit('HARVEST_COMPLETED', {
    batchId: 'BAT-2026-AQU-02',
    domain: 'aquaculture',
    productName: 'Frozen Nile Tilapia Clean Fillets',
    quantity: 15.0,
    unit: 'kg',
    stewardName: 'Vincent',
    destination: 'Eco-Living Cold Cellar',
  });

  // Small delay to ensure event processing
  await new Promise((resolve) => setTimeout(resolve, 50));

  const itemAfter = await inventoryService.getItemById('inv-5');
  if (itemAfter.inStock !== initialStock + 15.0) {
    throw new Error(`Inventory stock intake invariant failed: expected ${initialStock + 15.0}, got ${itemAfter.inStock}`);
  }
  console.log(`  ✔ Automated inventory intake on HARVEST_COMPLETED verified (Stock: ${initialStock} -> ${itemAfter.inStock} kg)`);

  // 3. Test Telemetry Threshold Breach Alert Listener
  domainEventBus.emit('TELEMETRY_THRESHOLD_EXCEEDED', {
    metric: 'BATTERY_SOC',
    currentValue: 18.5,
    threshold: 20.0,
    severity: 'CRITICAL',
    actionTaken: 'AUTOMATED_SHUTDOWN_PROTECTION_ENGAGED',
  });

  await new Promise((resolve) => setTimeout(resolve, 50));

  const latestAlert = telemetryAlertHistory[0];
  if (!latestAlert || latestAlert.metric !== 'BATTERY_SOC' || latestAlert.severity !== 'CRITICAL') {
    throw new Error('Telemetry threshold breach alert invariant failed');
  }
  console.log(`  ✔ Microgrid critical telemetry alert handler verified (Action: ${latestAlert.actionTaken})`);

  // 4. Test Audit Trail Invariants
  const logs = eventAuditLogger.getAuditLog(10);
  if (logs.length < 2) {
    throw new Error(`Expected at least 2 audit log records, found ${logs.length}`);
  }
  console.log(`  ✔ Event audit log trail verified (${logs.length} events logged in buffer)`);

  console.log('\n✨ All Domain Event Bus Invariant Tests Passed Successfully!\n');
}

testDomainEventBusInvariants().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
