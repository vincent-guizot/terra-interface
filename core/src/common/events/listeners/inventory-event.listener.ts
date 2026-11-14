import { domainEventBus, HarvestCompletedPayload } from '../domain-event-bus';
import { inventoryService } from '../../../modules/inventory/inventory.service';
import { StockMovementType } from '@prisma/client';

export function registerInventoryEventListener(): void {
  domainEventBus.on('HARVEST_COMPLETED', async (payload: HarvestCompletedPayload) => {
    try {
      console.log(`[EventBus:InventoryListener] Harvest completed for batch ${payload.batchId}: ${payload.quantity} ${payload.unit} of ${payload.productName}`);
      
      const items = await inventoryService.getItems();
      const matched = items.find((i) => 
        i.name.toLowerCase().includes(payload.productName.toLowerCase()) || 
        payload.productName.toLowerCase().includes(i.name.toLowerCase())
      );

      const targetItem = matched || items.find((i) => i.id === 'inv-5') || items[0];
      if (!targetItem) {
        console.warn(`[EventBus:InventoryListener] No target inventory item found for ${payload.productName}`);
        return;
      }

      const movement = await inventoryService.recordMovement({
        itemId: targetItem.id,
        type: StockMovementType.HARVEST_IN,
        quantityDelta: payload.quantity,
        unit: payload.unit,
        referenceBatchCode: payload.batchId,
        stewardName: payload.stewardName || 'Vincent',
        notes: `Automated intake from harvested batch ${payload.batchId} (${payload.domain}) to ${payload.destination}`,
      });

      console.log(`[EventBus:InventoryListener] Automated stock intake recorded (MovID: ${movement.id}, Item: ${targetItem.name}, NewBalance: ${movement.balanceAfter})`);
    } catch (err: any) {
      console.error(`[EventBus:InventoryListener] Failed to process HARVEST_COMPLETED: ${err.message}`);
    }
  });
}
