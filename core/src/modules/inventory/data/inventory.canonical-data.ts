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

export const CANONICAL_STORAGE_LOCATIONS: StorageLocationItem[] = [
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

export const INITIAL_INVENTORY_ITEMS: InventoryStockItem[] = [
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

export const INITIAL_STOCK_MOVEMENTS: InventoryMovementRecord[] = [
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
