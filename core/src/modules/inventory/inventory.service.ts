import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RecordStockMovementDto } from './dto/record-stock-movement.dto';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { StockMovementType } from '@prisma/client';

export interface StorageLocationItem {
  id: string;
  name: string;
  type: string;
  temp?: string;
  humidity?: string;
  capacity?: string;
  itemCount?: number;
}

export interface InventoryStockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  locationId: string;
  locationName: string;
  inStock: number;
  unit: string;
  minThreshold: number;
  isLowStock: boolean;
  lastUpdated: string;
}

export interface InventoryMovementRecord {
  id: string;
  itemId: string;
  sku: string;
  itemName: string;
  type: StockMovementType;
  quantityDelta: number;
  unit: string;
  balanceAfter?: number;
  referenceBatchCode?: string;
  stewardName: string;
  notes?: string;
  timestamp: string;
}

const CANONICAL_STORAGE_LOCATIONS: StorageLocationItem[] = [
  {
    id: 'loc-1',
    name: 'Homestead Tool & Feed Shed A',
    type: 'Dry Storage',
    temp: 'Ambient (26°C)',
    humidity: '60%',
    capacity: '2.5 Tons',
  },
  {
    id: 'loc-2',
    name: 'Eco-Living Cold Cellar',
    type: 'Cold Storage (4°C)',
    capacity: '800 L',
  },
  {
    id: 'loc-3',
    name: 'Seed Preservation Vault',
    type: 'Airtight Desiccated (16°C)',
    capacity: '120 Jars',
  },
  {
    id: 'loc-4',
    name: 'Biological Inoculant Rack',
    type: 'Shaded Microclimate (22°C)',
    capacity: '30 Containers',
  },
];

const INITIAL_INVENTORY_ITEMS: InventoryStockItem[] = [
  {
    id: 'inv-1',
    sku: 'SKU-FEE-01',
    name: 'High-Protein Aquaculture Pellets (32% CP)',
    category: 'Feeds',
    locationId: 'loc-1',
    locationName: 'Homestead Tool & Feed Shed A',
    inStock: 75.0,
    unit: 'kg',
    minThreshold: 25.0,
    isLowStock: false,
    lastUpdated: '2026-11-12T08:30:00Z',
  },
  {
    id: 'inv-2',
    sku: 'SKU-SEE-01',
    name: 'Heirloom Lacinato Kale Seeds',
    category: 'Seeds',
    locationId: 'loc-3',
    locationName: 'Seed Preservation Vault',
    inStock: 12.0,
    unit: 'packs',
    minThreshold: 3.0,
    isLowStock: false,
    lastUpdated: '2026-11-10T10:00:00Z',
  },
  {
    id: 'inv-3',
    sku: 'SKU-BIO-01',
    name: 'EM4 Microbial Inoculant Culture',
    category: 'Biologicals',
    locationId: 'loc-4',
    locationName: 'Biological Inoculant Rack',
    inStock: 6.0,
    unit: 'liters',
    minThreshold: 2.0,
    isLowStock: false,
    lastUpdated: '2026-11-05T11:15:00Z',
  },
  {
    id: 'inv-4',
    sku: 'SKU-MIN-01',
    name: 'Agricultural Horticultural Lime (CaCO3)',
    category: 'Soil & Amendments',
    locationId: 'loc-1',
    locationName: 'Homestead Tool & Feed Shed A',
    inStock: 40.0,
    unit: 'kg',
    minThreshold: 15.0,
    isLowStock: false,
    lastUpdated: '2026-11-08T09:00:00Z',
  },
  {
    id: 'inv-5',
    sku: 'SKU-FOO-01',
    name: 'Frozen Nile Tilapia Clean Fillets',
    category: 'Homestead Food Pantry',
    locationId: 'loc-2',
    locationName: 'Eco-Living Cold Cellar',
    inStock: 22.5,
    unit: 'kg',
    minThreshold: 10.0,
    isLowStock: false,
    lastUpdated: '2026-11-10T14:00:00Z',
  },
  {
    id: 'inv-6',
    sku: 'SKU-BSF-01',
    name: 'Fresh Harvested BSF Prepupae (42% Protein)',
    category: 'Biologicals',
    locationId: 'loc-1',
    locationName: 'Homestead Tool & Feed Shed A',
    inStock: 4.8,
    unit: 'kg',
    minThreshold: 2.0,
    isLowStock: false,
    lastUpdated: '2026-11-12T16:00:00Z',
  },
  {
    id: 'inv-7',
    sku: 'SKU-FER-01',
    name: 'Bokashi Thermophilic Compost Humus',
    category: 'Soil & Amendments',
    locationId: 'loc-1',
    locationName: 'Homestead Tool & Feed Shed A',
    inStock: 350.0,
    unit: 'kg',
    minThreshold: 50.0,
    isLowStock: false,
    lastUpdated: '2026-11-11T12:00:00Z',
  },
];

const INITIAL_STOCK_MOVEMENTS: InventoryMovementRecord[] = [
  {
    id: 'mov-1',
    itemId: 'inv-1',
    sku: 'SKU-FEE-01',
    itemName: 'High-Protein Aquaculture Pellets (32% CP)',
    type: StockMovementType.FEEDING_OUT,
    quantityDelta: -2.5,
    unit: 'kg',
    balanceAfter: 75.0,
    referenceBatchCode: 'BAT-2026-AQU-01',
    stewardName: 'Vincent',
    notes: 'Morning ration for Bio-Pond Alpha Nile Tilapia',
    timestamp: '2026-11-12T08:30:00Z',
  },
  {
    id: 'mov-2',
    itemId: 'inv-5',
    sku: 'SKU-FOO-01',
    itemName: 'Frozen Nile Tilapia Clean Fillets',
    type: StockMovementType.HARVEST_IN,
    quantityDelta: 8.5,
    unit: 'kg',
    balanceAfter: 22.5,
    referenceBatchCode: 'BAT-2026-AQU-01',
    stewardName: 'Vincent',
    notes: 'Fillet yield from 12 harvested adult tilapia',
    timestamp: '2026-11-10T14:00:00Z',
  },
  {
    id: 'mov-3',
    itemId: 'inv-3',
    sku: 'SKU-BIO-01',
    itemName: 'EM4 Microbial Inoculant Culture',
    type: StockMovementType.PURCHASE_IN,
    quantityDelta: 5.0,
    unit: 'liters',
    balanceAfter: 6.0,
    stewardName: 'Vincent',
    notes: 'Local agricultural store purchase restock',
    timestamp: '2026-11-05T11:15:00Z',
  },
];

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  private memoryLocations: StorageLocationItem[] = [...CANONICAL_STORAGE_LOCATIONS];
  private memoryItems: InventoryStockItem[] = [...INITIAL_INVENTORY_ITEMS];
  private memoryMovements: InventoryMovementRecord[] = [...INITIAL_STOCK_MOVEMENTS];

  constructor(private readonly prisma: PrismaService) {}

  async getStorageLocations(): Promise<StorageLocationItem[]> {
    try {
      const locations = await this.prisma.storageLocation.findMany({
        include: { items: true },
      });
      if (locations.length > 0) {
        return locations.map((loc) => ({
          id: loc.id,
          name: loc.name,
          type: loc.type,
          capacity: loc.capacityInfo || undefined,
          itemCount: loc.items.length,
        }));
      }
    } catch (err) {
      this.logger.warn(`Prisma getStorageLocations fallback: ${err.message}`);
    }

    return this.memoryLocations.map((loc) => {
      const count = this.memoryItems.filter((i) => i.locationId === loc.id).length;
      return { ...loc, itemCount: count };
    });
  }

  async getItems(category?: string, lowStockOnly?: boolean): Promise<InventoryStockItem[]> {
    try {
      const whereClause: any = {};
      if (category) whereClause.category = category;

      const items = await this.prisma.inventoryItem.findMany({
        where: whereClause,
        include: { location: true, movements: true },
      });

      if (items.length > 0) {
        const mapped = items.map((i) => {
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
            lastUpdated: i.updatedAt.toISOString(),
          };
        });

        if (lowStockOnly) {
          return mapped.filter((i) => i.isLowStock);
        }
        return mapped;
      }
    } catch (err) {
      this.logger.warn(`Prisma getItems fallback: ${err.message}`);
    }

    let result = [...this.memoryItems];
    if (category) {
      result = result.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (lowStockOnly) {
      result = result.filter((i) => i.isLowStock);
    }
    return result;
  }

  async getItemById(idOrSku: string): Promise<InventoryStockItem & { movements: InventoryMovementRecord[] }> {
    const item = this.memoryItems.find((i) => i.id === idOrSku || i.sku === idOrSku);
    if (!item) {
      throw new NotFoundException(`Inventory item with identifier '${idOrSku}' not found`);
    }

    const movements = this.memoryMovements
      .filter((m) => m.itemId === item.id || m.sku === item.sku)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      ...item,
      movements,
    };
  }

  async getMovements(itemId?: string, limit: number = 50): Promise<InventoryMovementRecord[]> {
    try {
      const whereClause = itemId ? { itemId } : {};
      const movements = await this.prisma.stockMovement.findMany({
        where: whereClause,
        include: { item: true },
        orderBy: { timestamp: 'desc' },
        take: limit,
      });

      if (movements.length > 0) {
        return movements.map((m) => ({
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
          timestamp: m.timestamp.toISOString(),
        }));
      }
    } catch (err) {
      this.logger.warn(`Prisma getMovements fallback: ${err.message}`);
    }

    let records = [...this.memoryMovements];
    if (itemId) {
      records = records.filter((m) => m.itemId === itemId || m.sku === itemId);
    }
    return records.slice(0, limit);
  }

  async recordMovement(dto: RecordStockMovementDto): Promise<InventoryMovementRecord> {
    const item = this.memoryItems.find((i) => i.id === dto.itemId || i.sku === dto.sku);
    if (!item) {
      throw new NotFoundException(`Inventory item not found for delta recording`);
    }

    // Determine normalized delta based on movement type
    let delta = dto.quantityDelta;
    const isOutflow = (
      [
        StockMovementType.BATCH_CONSUME_OUT,
        StockMovementType.FEEDING_OUT,
        StockMovementType.MORTALITY_LOSS_OUT,
        StockMovementType.WASTE_OUT,
      ] as StockMovementType[]
    ).includes(dto.type);

    if (isOutflow && delta > 0) {
      delta = -Math.abs(delta);
    } else if (dto.type === StockMovementType.PURCHASE_IN || dto.type === StockMovementType.HARVEST_IN) {
      delta = Math.abs(delta);
    }

    const newStock = Math.round((item.inStock + delta) * 100) / 100;
    if (newStock < 0) {
      throw new BadRequestException(
        `Insufficient inventory for '${item.name}'. Available: ${item.inStock} ${item.unit}, attempted deduction: ${Math.abs(delta)} ${item.unit}`,
      );
    }

    item.inStock = newStock;
    item.isLowStock = newStock <= item.minThreshold;
    item.lastUpdated = new Date().toISOString();

    const movement: InventoryMovementRecord = {
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
      timestamp: new Date().toISOString(),
    };

    this.memoryMovements.unshift(movement);

    // Persist via Prisma if connected
    try {
      const dbItem = await this.prisma.inventoryItem.findFirst({
        where: { OR: [{ id: item.id }, { sku: item.sku }] },
      });

      if (dbItem) {
        await this.prisma.$transaction([
          this.prisma.stockMovement.create({
            data: {
              itemId: dbItem.id,
              type: dto.type,
              quantityDelta: delta,
              unit: dto.unit || item.unit,
              referenceBatchCode: dto.referenceBatchCode,
              stewardName: dto.stewardName || 'Vincent',
              notes: dto.notes,
            },
          }),
          this.prisma.inventoryItem.update({
            where: { id: dbItem.id },
            data: { inStock: newStock },
          }),
        ]);
      }
    } catch (err) {
      this.logger.warn(`Prisma recordMovement persistence fallback: ${err.message}`);
    }

    return movement;
  }

  async getLowStockAlerts() {
    const items = await this.getItems();
    const lowStock = items.filter((i) => i.isLowStock);
    return {
      alertCount: lowStock.length,
      items: lowStock.map((i) => ({
        id: i.id,
        sku: i.sku,
        name: i.name,
        category: i.category,
        locationName: i.locationName,
        currentStock: i.inStock,
        reorderThreshold: i.minThreshold,
        deficit: Math.round((i.minThreshold - i.inStock) * 100) / 100,
        unit: i.unit,
      })),
    };
  }

  async createItem(dto: CreateInventoryItemDto): Promise<InventoryStockItem> {
    const exists = this.memoryItems.some((i) => i.sku === dto.sku);
    if (exists) {
      throw new BadRequestException(`Item with SKU '${dto.sku}' already exists.`);
    }

    const loc = this.memoryLocations.find((l) => l.id === dto.locationId);
    const newItem: InventoryStockItem = {
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
      lastUpdated: new Date().toISOString(),
    };

    this.memoryItems.push(newItem);

    if (dto.initialStock && dto.initialStock > 0) {
      this.memoryMovements.unshift({
        id: `mov-${Date.now()}`,
        itemId: newItem.id,
        sku: newItem.sku,
        itemName: newItem.name,
        type: StockMovementType.PURCHASE_IN,
        quantityDelta: dto.initialStock,
        unit: dto.unit,
        balanceAfter: dto.initialStock,
        stewardName: 'Vincent',
        notes: 'Initial inventory item stock creation',
        timestamp: new Date().toISOString(),
      });
    }

    return newItem;
  }
}
