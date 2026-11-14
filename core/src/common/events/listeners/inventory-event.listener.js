"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInventoryEventListener = registerInventoryEventListener;
const domain_event_bus_1 = require("../domain-event-bus");
const inventory_service_1 = require("../../../modules/inventory/inventory.service");
const client_1 = require("@prisma/client");
function registerInventoryEventListener() {
    domain_event_bus_1.domainEventBus.on('HARVEST_COMPLETED', async (payload) => {
        try {
            console.log(`[EventBus:InventoryListener] Harvest completed for batch ${payload.batchId}: ${payload.quantity} ${payload.unit} of ${payload.productName}`);
            const items = await inventory_service_1.inventoryService.getItems();
            const matched = items.find((i) => i.name.toLowerCase().includes(payload.productName.toLowerCase()) ||
                payload.productName.toLowerCase().includes(i.name.toLowerCase()));
            const targetItem = matched || items.find((i) => i.id === 'inv-5') || items[0];
            if (!targetItem) {
                console.warn(`[EventBus:InventoryListener] No target inventory item found for ${payload.productName}`);
                return;
            }
            const movement = await inventory_service_1.inventoryService.recordMovement({
                itemId: targetItem.id,
                type: client_1.StockMovementType.HARVEST_IN,
                quantityDelta: payload.quantity,
                unit: payload.unit,
                referenceBatchCode: payload.batchId,
                stewardName: payload.stewardName || 'Vincent',
                notes: `Automated intake from harvested batch ${payload.batchId} (${payload.domain}) to ${payload.destination}`,
            });
            console.log(`[EventBus:InventoryListener] Automated stock intake recorded (MovID: ${movement.id}, Item: ${targetItem.name}, NewBalance: ${movement.balanceAfter})`);
        }
        catch (err) {
            console.error(`[EventBus:InventoryListener] Failed to process HARVEST_COMPLETED: ${err.message}`);
        }
    });
}
