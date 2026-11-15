export const initialInventoryData = {
  storageLocations: [{
    id: 'loc-1',
    name: 'Homestead Tool & Feed Shed A',
    type: 'Dry Storage',
    temp: 'Ambient (26°C)',
    humidity: '60%'
  }, {
    id: 'loc-2',
    name: 'Eco-Living Cold Cellar',
    type: 'Cold Storage (4°C)',
    capacity: '800 L'
  }, {
    id: 'loc-3',
    name: 'Seed Preservation Vault',
    type: 'Airtight Desiccated (16°C)',
    capacity: '120 Jars'
  }, {
    id: 'loc-4',
    name: 'Biological Inoculant Rack',
    type: 'Shaded Microclimate (22°C)',
    capacity: '30 Containers'
  }],
  items: [{
    id: 'inv-1',
    code: 'SKU-FEE-01',
    name: 'High-Protein Aquaculture Pellets (32% CP)',
    category: 'Feed & Nutrition',
    location: 'Homestead Tool & Feed Shed A',
    inStock: 75,
    unit: 'kg',
    minThreshold: 25,
    unitCost: 'Rp 14.500/kg'
  }, {
    id: 'inv-2',
    code: 'SKU-SEE-01',
    name: 'Heirloom Lacinato Kale Seeds',
    category: 'Seed Bank',
    location: 'Seed Preservation Vault',
    inStock: 12,
    unit: 'packs',
    minThreshold: 3,
    unitCost: 'Rp 25.000/pack'
  }, {
    id: 'inv-3',
    code: 'SKU-BIO-01',
    name: 'EM4 Microbial Inoculant Culture',
    category: 'Biologicals',
    location: 'Biological Inoculant Rack',
    inStock: 6,
    unit: 'liters',
    minThreshold: 2,
    unitCost: 'Rp 38.000/L'
  }, {
    id: 'inv-4',
    code: 'SKU-MIN-01',
    name: 'Agricultural Horticultural Lime (CaCO3)',
    category: 'Soil & Water Amendments',
    location: 'Homestead Tool & Feed Shed A',
    inStock: 40,
    unit: 'kg',
    minThreshold: 15,
    unitCost: 'Rp 8.000/kg'
  }, {
    id: 'inv-5',
    code: 'SKU-FOO-01',
    name: 'Frozen Nile Tilapia Clean Fillets',
    category: 'Homestead Food Pantry',
    location: 'Eco-Living Cold Cellar',
    inStock: 22.5,
    unit: 'kg',
    minThreshold: 10,
    unitCost: 'Internal Asset'
  }],
  transactions: [{
    id: 'tx-1',
    date: '2026-11-12 08:30',
    sku: 'SKU-FEE-01',
    itemName: 'Aquaculture Pellets',
    type: 'Stock Out',
    quantity: 2.5,
    unit: 'kg',
    destination: 'Pond Alpha Feeding',
    steward: 'Vincent'
  }, {
    id: 'tx-2',
    date: '2026-11-10 14:00',
    sku: 'SKU-FOO-01',
    itemName: 'Frozen Nile Tilapia Clean Fillets',
    type: 'Stock In',
    quantity: 8.5,
    unit: 'kg',
    destination: 'Harvest Batch B-24',
    steward: 'Vincent'
  }, {
    id: 'tx-3',
    date: '2026-11-05 11:15',
    sku: 'SKU-BIO-01',
    itemName: 'EM4 Microbial Inoculant',
    type: 'Stock In',
    quantity: 5.0,
    unit: 'liters',
    destination: 'Local Supply Restock',
    steward: 'Vincent'
  }]
};
