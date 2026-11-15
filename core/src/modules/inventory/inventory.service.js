"use strict";

import * as common_1 from "../../common/errors/http-exceptions.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
import * as client_1 from "@prisma/client";
import * as inventory_canonical_data_1 from "./data/inventory.canonical-data.js";
var InventoryService_1;
let InventoryService = InventoryService_1 = class InventoryService {
  constructor(prisma) {
    this.prisma = prisma;
    this.logger = console;
    this.memoryLocations = [...inventory_canonical_data_1.CANONICAL_STORAGE_LOCATIONS];
    this.memoryItems = [...inventory_canonical_data_1.INITIAL_INVENTORY_ITEMS];
    this.memoryMovements = [...inventory_canonical_data_1.INITIAL_STOCK_MOVEMENTS];
  }
  async getStorageLocations() {
    try {
      const locations = await this.prisma.storageLocation.findMany({
        include: {
          items: true
        }
      });
      if (locations.length > 0) {
        return locations.map(loc => ({
          id: loc.id,
          name: loc.name,
          type: loc.type,
          capacity: loc.capacityInfo || undefined,
          itemCount: loc.items.length
        }));
      }
    } catch (err) {
      this.logger.warn(`Prisma getStorageLocations fallback: ${err.message}`);
    }
    return this.memoryLocations.map(loc => {
      const count = this.memoryItems.filter(i => i.locationId === loc.id).length;
      return {
        ...loc,
        itemCount: count
      };
    });
  }
  async getItems(category, lowStockOnly) {
    try {
      const whereClause = {};
      if (category) whereClause.category = category;
      const items = await this.prisma.inventoryItem.findMany({
        where: whereClause,
        include: {
          location: true,
          movements: true
        }
      });
      if (items.length > 0) {
        const mapped = items.map(i => {
          const derivedStock = i.movements.reduce((acc, m) => acc + m.quantityDelta, 0);
          const isLow = derivedStock <= i.minThreshold;
          return {
            id: i.id,
            sku: i.sku,
            name: i.name,
            category: i.category,
            locationId: i.locationId,
            locationName: i.location.name,
            inStock: Math.round(derivedStock * 100) / 100,
            unit: i.unit,
            minThreshold: i.minThreshold,
            isLowStock: isLow,
            lastUpdated: i.updatedAt.toISOString()
          };
        });
        if (lowStockOnly) {
          return mapped.filter(i => i.isLowStock);
        }
        return mapped;
      }
    } catch (err) {
      this.logger.warn(`Prisma getItems fallback: ${err.message}`);
    }
    let result = [...this.memoryItems];
    if (category) {
      result = result.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }
    if (lowStockOnly) {
      result = result.filter(i => i.isLowStock);
    }
    return result;
  }
  async getItemById(idOrSku) {
    const item = this.memoryItems.find(i => i.id === idOrSku || i.sku === idOrSku);
    if (!item) {
      throw new common_1.NotFoundException(`Inventory item with identifier '${idOrSku}' not found`);
    }
    const movements = this.memoryMovements.filter(m => m.itemId === item.id || m.sku === item.sku).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return {
      ...item,
      movements
    };
  }
  async getMovements(itemId, limit = 50) {
    try {
      const whereClause = itemId ? {
        itemId
      } : {};
      const movements = await this.prisma.stockMovement.findMany({
        where: whereClause,
        include: {
          item: true
        },
        orderBy: {
          timestamp: 'desc'
        },
        take: limit
      });
      if (movements.length > 0) {
        return movements.map(m => ({
          id: m.id,
          itemId: m.itemId,
          sku: m.item.sku,
          itemName: m.item.name,
          type: m.type,
          quantityDelta: m.quantityDelta,
          unit: m.unit,
          referenceBatchCode: m.referenceBatchCode || undefined,
          stewardName: m.stewardName,
          notes: m.notes || undefined,
          timestamp: m.timestamp.toISOString()
        }));
      }
    } catch (err) {
      this.logger.warn(`Prisma getMovements fallback: ${err.message}`);
    }
    let records = [...this.memoryMovements];
    if (itemId) {
      records = records.filter(m => m.itemId === itemId || m.sku === itemId);
    }
    return records.slice(0, limit);
  }
  async recordMovement(dto) {
    const item = this.memoryItems.find(i => i.id === dto.itemId || i.sku === dto.sku);
    if (!item) {
      throw new common_1.NotFoundException(`Inventory item not found for delta recording`);
    }
    let delta = dto.quantityDelta;
    const isOutflow = [client_1.StockMovementType.BATCH_CONSUME_OUT, client_1.StockMovementType.FEEDING_OUT, client_1.StockMovementType.MORTALITY_LOSS_OUT, client_1.StockMovementType.WASTE_OUT].includes(dto.type);
    if (isOutflow && delta > 0) {
      delta = -Math.abs(delta);
    } else if (dto.type === client_1.StockMovementType.PURCHASE_IN || dto.type === client_1.StockMovementType.HARVEST_IN) {
      delta = Math.abs(delta);
    }
    const newStock = Math.round((item.inStock + delta) * 100) / 100;
    if (newStock < 0) {
      throw new common_1.BadRequestException(`Insufficient inventory for '${item.name}'. Available: ${item.inStock} ${item.unit}, attempted deduction: ${Math.abs(delta)} ${item.unit}`);
    }
    item.inStock = newStock;
    item.isLowStock = newStock <= item.minThreshold;
    item.lastUpdated = new Date().toISOString();
    const movement = {
      id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      itemId: item.id,
      sku: item.sku,
      itemName: item.name,
      type: dto.type,
      quantityDelta: delta,
      unit: dto.unit || item.unit,
      balanceAfter: newStock,
      referenceBatchCode: dto.referenceBatchCode,
      stewardName: dto.stewardName || 'Vincent',
      notes: dto.notes || `Stock movement logged (${dto.type})`,
      timestamp: new Date().toISOString()
    };
    this.memoryMovements.unshift(movement);
    try {
      const dbItem = await this.prisma.inventoryItem.findFirst({
        where: {
          OR: [{
            id: item.id
          }, {
            sku: item.sku
          }]
        }
      });
      if (dbItem) {
        await this.prisma.$transaction([this.prisma.stockMovement.create({
          data: {
            itemId: dbItem.id,
            type: dto.type,
            quantityDelta: delta,
            unit: dto.unit || item.unit,
            referenceBatchCode: dto.referenceBatchCode,
            stewardName: dto.stewardName || 'Vincent',
            notes: dto.notes
          }
        }), this.prisma.inventoryItem.update({
          where: {
            id: dbItem.id
          },
          data: {
            inStock: newStock
          }
        })]);
      }
    } catch (err) {
      this.logger.warn(`Prisma recordMovement persistence fallback: ${err.message}`);
    }
    return movement;
  }
  async getLowStockAlerts() {
    const items = await this.getItems();
    const lowStock = items.filter(i => i.isLowStock);
    return {
      alertCount: lowStock.length,
      items: lowStock.map(i => ({
        id: i.id,
        sku: i.sku,
        name: i.name,
        category: i.category,
        locationName: i.locationName,
        currentStock: i.inStock,
        reorderThreshold: i.minThreshold,
        deficit: Math.round((i.minThreshold - i.inStock) * 100) / 100,
        unit: i.unit
      }))
    };
  }
  async createItem(dto) {
    const exists = this.memoryItems.some(i => i.sku === dto.sku);
    if (exists) {
      throw new common_1.BadRequestException(`Item with SKU '${dto.sku}' already exists.`);
    }
    const loc = this.memoryLocations.find(l => l.id === dto.locationId);
    const newItem = {
      id: `inv-${Date.now()}`,
      sku: dto.sku,
      name: dto.name,
      category: dto.category,
      locationId: dto.locationId,
      locationName: loc ? loc.name : 'Homestead Storage',
      inStock: dto.initialStock || 0,
      unit: dto.unit,
      minThreshold: dto.minThreshold,
      isLowStock: (dto.initialStock || 0) <= dto.minThreshold,
      lastUpdated: new Date().toISOString()
    };
    this.memoryItems.push(newItem);
    if (dto.initialStock && dto.initialStock > 0) {
      this.memoryMovements.unshift({
        id: `mov-${Date.now()}`,
        itemId: newItem.id,
        sku: newItem.sku,
        itemName: newItem.name,
        type: client_1.StockMovementType.PURCHASE_IN,
        quantityDelta: dto.initialStock,
        unit: dto.unit,
        balanceAfter: dto.initialStock,
        stewardName: 'Vincent',
        notes: 'Initial inventory item stock creation',
        timestamp: new Date().toISOString()
      });
    }
    return newItem;
  }
  async recordStockMovement(dto) {
    const item = await this.getItemById(dto.itemId);
    if (!item) {
      throw new Error(`Inventory item '${dto.itemId}' not found`);
    }
    const delta = Number(dto.quantityDelta);
    item.inStock = Math.round((item.inStock + delta) * 100) / 100;
    item.isLowStock = item.inStock <= item.minThreshold;
    item.lastUpdated = new Date().toISOString();
    const movement = {
      id: `mov-${Date.now()}`,
      itemId: item.id,
      sku: item.sku,
      itemName: item.name,
      type: dto.type || (delta < 0 ? 'FEEDING_OUT' : 'HARVEST_IN'),
      quantityDelta: delta,
      unit: item.unit,
      balanceAfter: item.inStock,
      referenceBatchCode: dto.referenceBatchCode || null,
      stewardName: dto.stewardName || 'Vincent',
      notes: dto.notes || '',
      timestamp: new Date().toISOString()
    };
    this.memoryMovements.unshift(movement);
    return movement;
  }
  async getSummary() {
    const items = await this.getItems();
    const locations = await this.getStorageLocations();
    const lowStockCount = items.filter(i => i.isLowStock || i.inStock <= i.minThreshold).length;
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      totalItemsCount: items.length,
      storageLocationsCount: locations.length,
      lowStockAlertsCount: lowStockCount,
      locations,
      recentMovements: this.memoryMovements.slice(0, 5)
    };
  }
};
export { InventoryService };
export const inventoryService = new InventoryService(prisma_service_1.prisma);
export default inventoryService;
