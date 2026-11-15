import inventoryService from './inventory.service.js';
import { sendSuccess, sendCreated, sendError } from '../../utils/response.js';
export async function getSummary(req, res, next) {
  try {
    const summary = await inventoryService.getSummary();
    return sendSuccess(res, summary, 'Inventory summary retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getItems(req, res, next) {
  try {
    const {
      category,
      lowStockOnly
    } = req.query;
    const items = await inventoryService.getItems(category, lowStockOnly === 'true');
    return sendSuccess(res, items, 'Inventory items retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getItemById(req, res, next) {
  try {
    const item = await inventoryService.getItemById(req.params.id);
    if (!item) {
      return sendError(res, 404, `Inventory item '${req.params.id}' not found`);
    }
    return sendSuccess(res, item, 'Inventory item retrieved');
  } catch (err) {
    next(err);
  }
}
export async function createItem(req, res, next) {
  try {
    const created = await inventoryService.createItem(req.body);
    return sendCreated(res, created, 'Inventory item created successfully');
  } catch (err) {
    next(err);
  }
}
export async function recordStockMovement(req, res, next) {
  try {
    const result = await inventoryService.recordStockMovement(req.body);
    return sendCreated(res, result, 'Stock movement recorded successfully');
  } catch (err) {
    next(err);
  }
}
export async function getLocations(req, res, next) {
  try {
    const locations = await inventoryService.getStorageLocations();
    return sendSuccess(res, locations, 'Storage locations retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getMovements(req, res, next) {
  try {
    const {
      itemId,
      limit
    } = req.query;
    const movements = await inventoryService.getMovements(itemId, limit ? parseInt(limit, 10) : 50);
    return sendSuccess(res, movements, 'Stock movements retrieved');
  } catch (err) {
    next(err);
  }
}
export default {
  getSummary,
  getItems,
  getItemById,
  createItem,
  recordStockMovement,
  getLocations,
  getMovements
};
