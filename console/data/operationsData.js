// Universal Operations & Management System Data for Vincent's Farm (300 m²)

// 1. Configurable Production Types & Units (Never hardcoded)
export const initialProductionConfig = {
  types: [
    { id: 'type-crops', name: 'Vegetables & Leafy Greens', domain: 'Cultivation', defaultUnit: 'kg', icon: 'Grass' },
    { id: 'type-fungi', name: 'Gourmet Mushrooms & Fungi', domain: 'Cultivation', defaultUnit: 'kg', icon: 'Spa' },
    { id: 'type-poultry-eggs', name: 'Poultry Egg Production', domain: 'Livestock', defaultUnit: 'pcs', icon: 'Egg' },
    { id: 'type-poultry-meat', name: 'Pastured Meat Birds', domain: 'Livestock', defaultUnit: 'birds', icon: 'Pets' },
    { id: 'type-ruminants', name: 'Small Ruminants (Goat/Sheep)', domain: 'Livestock', defaultUnit: 'head', icon: 'Pets' },
    { id: 'type-finfish', name: 'Freshwater Aquaculture', domain: 'Aquaculture', defaultUnit: 'kg', icon: 'SetMeal' },
    { id: 'type-bsf', name: 'BSF Bioconversion Protein', domain: 'Circular', defaultUnit: 'kg', icon: 'Loop' },
    { id: 'type-compost', name: 'Bokashi & Biochar Compost', domain: 'Circular', defaultUnit: 'kg', icon: 'Yard' },
  ],
  measurementUnits: ['kg', 'g', 'pcs', 'liters', 'birds', 'head', 'trays', 'bags', 'bundles', 'm³', 'kWh'],
  customFields: [
    { id: 'cf-protein', name: 'Crude Protein (%)', appliesTo: ['Livestock', 'Circular'], type: 'number' },
    { id: 'cf-brix', name: 'Brix Sugar Rating (°Bx)', appliesTo: ['Cultivation'], type: 'number' },
    { id: 'cf-moisture', name: 'Substrate Moisture (%)', appliesTo: ['Cultivation', 'Circular'], type: 'number' },
    { id: 'cf-fcr', name: 'Feed Conversion Ratio (FCR)', appliesTo: ['Aquaculture', 'Livestock'], type: 'number' },
  ]
};

// 2. Cultivation Data (Crops, Batches, Health, Records)
export const initialCultivationData = {
  catalog: [
    { id: 'plt-1', name: 'Tuscan Lacinato Kale', variety: 'Nero di Toscana', category: 'Leafy Greens', daysToMaturity: 55, harvestType: 'Continuous Pick', spacing: '30 cm' },
    { id: 'plt-2', name: 'Bok Choy White Stem', variety: 'F1 Hybrid Shanghai', category: 'Brassica', daysToMaturity: 30, harvestType: 'Single Cut', spacing: '15 cm' },
    { id: 'plt-3', name: 'Grey Oyster Mushroom', variety: 'Pleurotus ostreatus', category: 'Fungi', daysToMaturity: 18, harvestType: 'Multi Flush (3x)', spacing: 'Vertical Rack' },
    { id: 'plt-4', name: 'California Dwarf Papaya', variety: 'Carica papaya', category: 'Fruit Tree', daysToMaturity: 240, harvestType: 'Continuous Perennial', spacing: '2.5 m' },
    { id: 'plt-5', name: 'Sweet Cherry Tomato', variety: 'Sweet Million F1', category: 'Solanaceae', daysToMaturity: 65, harvestType: 'Cluster Harvest', spacing: '45 cm Trellis' }
  ],
  batches: [
    {
      id: 'bat-cult-01',
      code: 'BAT-2026-CUL-01',
      name: 'Spring Greenhouse Bok Choy NFT',
      plantId: 'plt-2',
      plantName: 'Bok Choy White Stem',
      status: 'Active', // Draft | Planned | Active | On Hold | Completed | Cancelled
      zone: 'Zone 1: Micro-Greenhouse',
      startDate: '2026-10-22',
      expectedEndDate: '2026-11-20',
      actualEndDate: null,
      initialQuantity: 120,
      unit: 'heads',
      harvests: [
        { id: 'h-c-1', date: '2026-11-08', quantity: 14.5, unit: 'kg', grade: 'Grade A', steward: 'Vincent' },
        { id: 'h-c-2', date: '2026-11-12', quantity: 12.0, unit: 'kg', grade: 'Grade A', steward: 'Vincent' }
      ],
      healthScore: 98,
      notes: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected under insect screen.',
      history: [
        { date: '2026-10-22 08:00', action: 'Batch Created & Seedlings Transplanted', user: 'Vincent' },
        { date: '2026-11-01 10:30', action: 'EC calibrated to 1.6 mS/cm, pH adjusted to 6.2', user: 'Vincent' },
        { date: '2026-11-08 07:15', action: 'First Cut Harvest: 14.5 kg logged', user: 'Vincent' }
      ]
    },
    {
      id: 'bat-cult-02',
      code: 'BAT-2026-CUL-02',
      name: 'Zone 4 Heirloom Tomato Trellis',
      plantId: 'plt-5',
      plantName: 'Sweet Cherry Tomato',
      status: 'Active',
      zone: 'Zone 4: Permaculture Beds',
      startDate: '2026-09-10',
      expectedEndDate: '2026-12-15',
      actualEndDate: null,
      initialQuantity: 24,
      unit: 'vines',
      harvests: [
        { id: 'h-c-3', date: '2026-11-02', quantity: 6.8, unit: 'kg', grade: 'Grade A', steward: 'Vincent' }
      ],
      healthScore: 92,
      notes: 'Biochar-rich keyhole bed #2 with companion basil and marigolds for biological pest deterrence.',
      history: [
        { date: '2026-09-10', action: 'Transplanted from nursery pots to Keyhole bed #2', user: 'Vincent' },
        { date: '2026-10-14', action: 'Bamboo trellis lines tied, suckers pruned', user: 'Vincent' }
      ]
    },
    {
      id: 'bat-cult-03',
      code: 'BAT-2026-CUL-03',
      name: 'Oyster Mushroom Fruiting Chamber #2',
      plantId: 'plt-3',
      plantName: 'Grey Oyster Mushroom',
      status: 'Active',
      zone: 'Zone 1: Micro-Greenhouse',
      startDate: '2026-10-28',
      expectedEndDate: '2026-11-30',
      actualEndDate: null,
      initialQuantity: 50,
      unit: 'sawdust bags',
      harvests: [
        { id: 'h-c-4', date: '2026-11-09', quantity: 4.8, unit: 'kg', grade: 'Prime', steward: 'Vincent' }
      ],
      healthScore: 99,
      notes: 'Maintained at 88% RH via ultrasonic mister. Pinheads forming on 95% of bags.',
      history: [
        { date: '2026-10-28', action: 'Fully colonized bag logs transferred to fruiting chamber', user: 'Vincent' }
      ]
    }
  ]
};

// 2. Livestock Management (KUB Chickens, Cornish Cross, Joper, Goats, Sheep)
export const initialLivestockData = {
  animals: [
    { id: 'ani-1', code: 'LIV-CK-01', breed: 'Ayam KUB (Kampung Unggul Balitnak)', species: 'Chicken', type: 'Dual Purpose (Egg & Meat)', population: 24, location: 'Zone 3: Coop Alpha', health: 'Excellent', dailyFeedKg: 2.8, eggDaily: 21 },
    { id: 'ani-2', code: 'LIV-CK-02', breed: 'Joper (Jawa Super)', species: 'Chicken', type: 'Intensive Free-Range Meat', population: 30, location: 'Zone 3: Pen Bravo', health: 'Healthy', dailyFeedKg: 3.5, eggDaily: 0 },
    { id: 'ani-3', code: 'LIV-CK-03', breed: 'Cornish Cross Broilers', species: 'Chicken', type: 'Fast Meat Bioconverter', population: 20, location: 'Zone 3: Mobile Tractor', health: 'Good', dailyFeedKg: 3.2, eggDaily: 0 },
    { id: 'ani-4', code: 'LIV-GT-01', breed: 'Kambing Boer / PE Cross', species: 'Goat', type: 'Dairy & Forage Clearing', population: 4, location: 'Zone 4: Orchard Paddock', health: 'Vibrant', dailyFeedKg: 12.0, eggDaily: 0 },
    { id: 'ani-5', code: 'LIV-SH-01', breed: 'Domba Garut Silangan', species: 'Sheep', type: 'Grassland Regenerator', population: 4, location: 'Zone 4: Perimeter Run', health: 'Excellent', dailyFeedKg: 10.0, eggDaily: 0 },
  ],
  batches: [
    {
      id: 'bat-live-01',
      code: 'BAT-2026-LIV-01',
      name: 'KUB Layer Flock Season 2',
      breed: 'Ayam KUB',
      species: 'Chicken',
      status: 'Active',
      zone: 'Zone 3: Poultry Hub',
      startDate: '2026-05-10',
      expectedEndDate: '2027-05-10',
      actualEndDate: null,
      initialQuantity: 24,
      unit: 'birds',
      currentCount: 24,
      mortality: 0,
      harvests: [
        { id: 'h-l-1', date: '2026-11-12', product: 'Fresh Pastured Eggs', quantity: 21, unit: 'pcs', grade: 'Grade A', steward: 'Vincent' },
        { id: 'h-l-2', date: '2026-11-11', product: 'Fresh Pastured Eggs', quantity: 22, unit: 'pcs', grade: 'Grade A', steward: 'Vincent' },
        { id: 'h-l-3', date: '2026-11-10', product: 'Fresh Pastured Eggs', quantity: 20, unit: 'pcs', grade: 'Grade A', steward: 'Vincent' },
      ],
      feedingRatio: '50% Fermented Grains + 35% Live BSF Prepupae + 15% Fresh Forage',
      vaccinationHistory: 'ND-IB administered at Week 4, Wormwood herbal dewormer active.',
      history: [
        { date: '2026-05-10', action: 'Point of Lay pullets housed in deep litter coop', user: 'Vincent' },
        { date: '2026-08-01', action: 'Peak laying rate reached (91.6% hen-day egg production)', user: 'Vincent' }
      ]
    },
    {
      id: 'bat-live-02',
      code: 'BAT-2026-LIV-02',
      name: 'Joper Pastured Meat Cycle 4',
      breed: 'Ayam Joper',
      species: 'Chicken',
      status: 'Active',
      zone: 'Zone 3: Pen Bravo',
      startDate: '2026-10-01',
      expectedEndDate: '2026-12-05',
      actualEndDate: null,
      initialQuantity: 30,
      unit: 'birds',
      currentCount: 30,
      mortality: 0,
      harvests: [],
      feedingRatio: 'Formulated starter crumb + Azolla + BSF larvae',
      vaccinationHistory: 'Gumboro and ND Lasota completed.',
      history: [
        { date: '2026-10-01', action: 'Day-old chicks placed in brooding pen with heat lamp', user: 'Vincent' },
        { date: '2026-10-21', action: 'Weaned from heat lamp into outdoor grazing tractor', user: 'Vincent' }
      ]
    }
  ]
};

// 3. Aquaculture Management (Tilapia, Catfish, Ponds, Water Quality)
export const initialAquacultureData = {
  ponds: [
    { id: 'pnd-1', name: 'Circular Bio-Pond Alpha', volumeM3: 8.0, species: 'Nile Tilapia (450 pcs)', tempC: 25.1, ph: 7.1, doMgL: 6.8, ammoniaPpm: 0.15, status: 'Optimal' },
    { id: 'pnd-2', name: 'Catfish Sump Basin Beta', volumeM3: 4.0, species: 'African Walking Catfish (120 pcs)', tempC: 25.8, ph: 6.9, doMgL: 5.4, ammoniaPpm: 0.25, status: 'Healthy' }
  ],
  batches: [
    {
      id: 'bat-aqua-01',
      code: 'BAT-2026-AQU-01',
      name: 'Monosex Nile Tilapia Finish Batch',
      pondId: 'pnd-1',
      pondName: 'Pond Alpha',
      species: 'Nile Tilapia (Oreochromis niloticus)',
      status: 'Active',
      zone: 'Zone 2: Aquaponics',
      startDate: '2026-08-15',
      expectedEndDate: '2026-11-28',
      actualEndDate: null,
      initialQuantity: 450,
      unit: 'fingerlings',
      currentCount: 442,
      survivalRate: 98.2,
      avgWeightG: 450,
      harvests: [
        { id: 'h-a-1', date: '2026-11-05', quantity: 18.5, unit: 'kg', avgWeightG: 440, grade: 'Prime Table Size', steward: 'Vincent' }
      ],
      waterQualityLog: { ph: 7.1, do: 6.8, temp: 25.1, nitrate: 42, ammonia: 0.15 },
      feedingSchedule: '450g daily (70% 32% CP Pellets + 30% Duckweed from biofilter)',
      history: [
        { date: '2026-08-15', action: 'Stocked 450 graded fingerlings (20g avg)', user: 'Vincent' },
        { date: '2026-10-01', action: 'Sampled average weight: 260g. FCR calculated at 1.22', user: 'Vincent' },
        { date: '2026-11-05', action: 'Selective pre-harvest: 18.5 kg harvested for homestead freezer', user: 'Vincent' }
      ]
    }
  ]
};

// 4. Circular System Management (Waste, BSF, Compost Batches, Maturity)
export const initialCircularData = {
  wasteRecords: [
    { id: 'wst-1', date: '2026-11-12', source: 'Kitchen & Meal Prep', type: 'Organic Food Scraps', weightKg: 2.8, routedTo: 'BSF Bioconversion Bin 3' },
    { id: 'wst-2', date: '2026-11-11', source: 'Zone 1 Greenhouse Trimming', type: 'Crop Residue & Roots', weightKg: 4.2, routedTo: 'Bokashi Pile #12' },
    { id: 'wst-3', date: '2026-11-10', source: 'Zone 3 Poultry Deep Litter', type: 'Manure & Wood shavings', weightKg: 14.0, routedTo: 'Hot Compost Windrow' },
    { id: 'wst-4', date: '2026-11-09', source: 'Swirl Filter Basin', type: 'Fish Mineral Sludge', weightKg: 8.5, routedTo: 'Banana Circle Mulch' },
  ],
  bsfBatches: [
    {
      id: 'bat-bsf-01',
      code: 'BAT-2026-BSF-08',
      name: 'Autumn Biomass Bioconversion Tray #3',
      status: 'Active',
      zone: 'Zone 3: Poultry & BSF Hub',
      startDate: '2026-11-04',
      expectedEndDate: '2026-11-18',
      initialQuantity: 15.0, // kg waste
      unit: 'kg waste',
      larvaeYieldKg: 2.4,
      frassYieldKg: 4.8,
      feedConversionEfficiency: '16.0% biomass to live insect protein',
      history: [
        { date: '2026-11-04', action: 'Inoculated 10g 5-DOL (day-old-larvae) into 15kg shredded scraps', user: 'Vincent' },
        { date: '2026-11-11', action: 'Peak feeding activity observed. Temp 36°C in substrate.', user: 'Vincent' }
      ]
    }
  ],
  compostBatches: [
    {
      id: 'bat-cmp-01',
      code: 'BAT-2026-CMP-12',
      name: 'High-Nitrogen Bokashi Ferment #12',
      status: 'Active',
      zone: 'Zone 4: Composting Bay',
      startDate: '2026-10-15',
      expectedEndDate: '2026-11-25',
      initialQuantity: 250,
      unit: 'kg biomass',
      temperatureC: 58.5,
      maturityStage: 'Thermophilic Breakdown (Day 28 of 40)',
      maturityIndex: 82, // %
      moisturePercent: 52,
      recipe: '40% Poultry litter + 30% Bamboo leaves + 20% Biochar (quenched) + 10% EM4 Bokashi bran',
      harvests: [
        { id: 'h-cmp-1', date: '2026-11-02', quantity: 60, unit: 'kg', destination: 'Keyhole Raised Bed #1', steward: 'Vincent' }
      ],
      history: [
        { date: '2026-10-15', action: 'Layered and inoculated with EM4 lactic acid bacteria', user: 'Vincent' },
        { date: '2026-10-22', action: 'Turned pile. Core temp reached 62°C (pathogen pasteurization)', user: 'Vincent' }
      ]
    }
  ]
};

// 5. Inventory Management (Catalog, Stock In/Out, Locations)
export const initialInventoryData = {
  storageLocations: [
    { id: 'loc-1', name: 'Homestead Tool & Feed Shed A', type: 'Dry Storage', temp: 'Ambient (26°C)', humidity: '60%' },
    { id: 'loc-2', name: 'Eco-Living Cold Cellar', type: 'Cold Storage (4°C)', capacity: '800 L' },
    { id: 'loc-3', name: 'Seed Preservation Vault', type: 'Airtight Desiccated (16°C)', capacity: '120 Jars' },
    { id: 'loc-4', name: 'Biological Inoculant Rack', type: 'Shaded Microclimate (22°C)', capacity: '30 Containers' }
  ],
  items: [
    { id: 'inv-1', code: 'SKU-FEE-01', name: 'High-Protein Aquaculture Pellets (32% CP)', category: 'Feed & Nutrition', location: 'Homestead Tool & Feed Shed A', inStock: 75, unit: 'kg', minThreshold: 25, unitCost: 'Rp 14.500/kg' },
    { id: 'inv-2', code: 'SKU-SEE-01', name: 'Heirloom Lacinato Kale Seeds', category: 'Seed Bank', location: 'Seed Preservation Vault', inStock: 12, unit: 'packs', minThreshold: 3, unitCost: 'Rp 25.000/pack' },
    { id: 'inv-3', code: 'SKU-BIO-01', name: 'EM4 Microbial Inoculant Culture', category: 'Biologicals', location: 'Biological Inoculant Rack', inStock: 6, unit: 'liters', minThreshold: 2, unitCost: 'Rp 38.000/L' },
    { id: 'inv-4', code: 'SKU-MIN-01', name: 'Agricultural Horticultural Lime (CaCO3)', category: 'Soil & Water Amendments', location: 'Homestead Tool & Feed Shed A', inStock: 40, unit: 'kg', minThreshold: 15, unitCost: 'Rp 8.000/kg' },
    { id: 'inv-5', code: 'SKU-FOO-01', name: 'Frozen Nile Tilapia Clean Fillets', category: 'Homestead Food Pantry', location: 'Eco-Living Cold Cellar', inStock: 22.5, unit: 'kg', minThreshold: 10, unitCost: 'Internal Asset' },
  ],
  transactions: [
    { id: 'tx-1', date: '2026-11-12 08:30', sku: 'SKU-FEE-01', itemName: 'Aquaculture Pellets', type: 'Stock Out', quantity: 2.5, unit: 'kg', destination: 'Pond Alpha Feeding', steward: 'Vincent' },
    { id: 'tx-2', date: '2026-11-10 14:00', sku: 'SKU-FOO-01', itemName: 'Frozen Nile Tilapia Clean Fillets', type: 'Stock In', quantity: 8.5, unit: 'kg', destination: 'Harvest Batch B-24', steward: 'Vincent' },
    { id: 'tx-3', date: '2026-11-05 11:15', sku: 'SKU-BIO-01', itemName: 'EM4 Microbial Inoculant', type: 'Stock In', quantity: 5.0, unit: 'liters', destination: 'Local Supply Restock', steward: 'Vincent' },
  ]
};

// 6. Energy & Water Management (Sensors, Solar, Batteries, Storage, Consumption)
export const initialEnergyWaterData = {
  energy: {
    pvArray: { capacityKwp: 5.2, panelsCount: 10, brand: 'Tier 1 Bifacial Half-Cell 520W', string1V: 242, string2V: 238, todayYieldKwh: 24.6, peakKw: 5.1 },
    inverter: { model: '8kW High-Frequency Pure Sine Hybrid', efficiency: '97.8%', mode: 'Solar Priority & Battery Buffer', currentLoadW: 1340 },
    battery: { capacityKwh: 15.3, chemistry: 'LiFePO4 (16S 100Ah)', voltageV: 53.2, socPercent: 91, cycleCount: 184, temperatureC: 28.5, healthPercent: 99.4 },
    hourlyGeneration: [
      { hour: '06:00', kw: 0.2 }, { hour: '08:00', kw: 1.8 }, { hour: '10:00', kw: 4.2 },
      { hour: '12:00', kw: 4.8 }, { hour: '14:00', kw: 4.1 }, { hour: '16:00', kw: 1.9 }, { hour: '18:00', kw: 0.1 }
    ]
  },
  water: {
    sources: [
      { name: 'Monsoon Rooftop Rain Catchment', yieldThisMonthL: 8200, quality: '42 ppm TDS • Filtered', status: 'Primary Active' },
      { name: 'Deep Well Backup Aquifer', pumpKw: 0.75, capacityLh: 1200, status: 'Standby 100%' },
      { name: 'Aquaponics Bio-Recirculation', recoveryRate: '97.4%', volumeCirculatedDayL: 2800, status: 'Continuous' }
    ],
    storageTanks: [
      { id: 'tnk-1', name: 'Cistern #1 (Primary Clean)', currentL: 3800, totalL: 4000, pct: 95, destination: 'Homestead & Micro-drip' },
      { id: 'tnk-2', name: 'Cistern #2 (Biochar Settling)', currentL: 3600, totalL: 4000, pct: 90, destination: 'Greenhouse Misting' },
      { id: 'tnk-3', name: 'Cistern #3 (Gravity Header Tank)', currentL: 3000, totalL: 4000, pct: 75, destination: 'Emergency Buffer' }
    ],
    dailyConsumption: [
      { category: 'Greenhouse & Drip Irrigation', volumeL: 140, share: '41%' },
      { category: 'Pond Water Exchange & Filter Flush', volumeL: 90, share: '26%' },
      { category: 'Livestock & Poultry Drinking', volumeL: 40, share: '12%' },
      { category: 'Homestead Residence Living', volumeL: 70, share: '21%' }
    ]
  }
};
