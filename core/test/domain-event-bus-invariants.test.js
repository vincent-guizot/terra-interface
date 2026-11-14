"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_event_bus_1 = require("../src/common/events/domain-event-bus");
const event_audit_logger_1 = require("../src/common/events/event-audit-logger");
const inventory_event_listener_1 = require("../src/common/events/listeners/inventory-event.listener");
const telemetry_alert_listener_1 = require("../src/common/events/listeners/telemetry-alert.listener");
const inventory_service_1 = require("../src/modules/inventory/inventory.service");
async function testDomainEventBusInvariants() {
    console.log('🧪 Running Domain Event Bus & Decoupled Invariant Tests...');
    (0, inventory_event_listener_1.registerInventoryEventListener)();
    (0, telemetry_alert_listener_1.registerTelemetryAlertListener)();
    event_audit_logger_1.eventAuditLogger.clearAuditLog();
    const initialLogCount = event_audit_logger_1.eventAuditLogger.getAuditLog().length;
    if (initialLogCount !== 0) {
        throw new Error('Expected clean audit log at test start');
    }
    const itemBefore = await inventory_service_1.inventoryService.getItemById('inv-5');
    const initialStock = itemBefore.inStock;
    domain_event_bus_1.domainEventBus.emit('HARVEST_COMPLETED', {
        batchId: 'BAT-2026-AQU-02',
        domain: 'aquaculture',
        productName: 'Frozen Nile Tilapia Clean Fillets',
        quantity: 15.0,
        unit: 'kg',
        stewardName: 'Vincent',
        destination: 'Eco-Living Cold Cellar',
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    const itemAfter = await inventory_service_1.inventoryService.getItemById('inv-5');
    if (itemAfter.inStock !== initialStock + 15.0) {
        throw new Error(`Inventory stock intake invariant failed: expected ${initialStock + 15.0}, got ${itemAfter.inStock}`);
    }
    console.log(`  ✔ Automated inventory intake on HARVEST_COMPLETED verified (Stock: ${initialStock} -> ${itemAfter.inStock} kg)`);
    domain_event_bus_1.domainEventBus.emit('TELEMETRY_THRESHOLD_EXCEEDED', {
        metric: 'BATTERY_SOC',
        currentValue: 18.5,
        threshold: 20.0,
        severity: 'CRITICAL',
        actionTaken: 'AUTOMATED_SHUTDOWN_PROTECTION_ENGAGED',
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    const latestAlert = telemetry_alert_listener_1.telemetryAlertHistory[0];
    if (!latestAlert || latestAlert.metric !== 'BATTERY_SOC' || latestAlert.severity !== 'CRITICAL') {
        throw new Error('Telemetry threshold breach alert invariant failed');
    }
    console.log(`  ✔ Microgrid critical telemetry alert handler verified (Action: ${latestAlert.actionTaken})`);
    const logs = event_audit_logger_1.eventAuditLogger.getAuditLog(10);
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
