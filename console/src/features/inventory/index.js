import { STOCK_MOVEMENT_TYPES } from "../../data/inventory/domain.data.js";
// Inventory Ledger Feature Module — Terra Interface
export const INVENTORY_DOMAIN = 'INVENTORY';
export { STOCK_MOVEMENT_TYPES };
export { default as RecordStockMovementDrawer } from './drawers/RecordStockMovementDrawer.js';
export { default as InventoryLedgerHistoryDrawer } from './drawers/InventoryLedgerHistoryDrawer.js';
