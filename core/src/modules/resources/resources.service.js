export const CANONICAL_RESOURCE_FLOWS = [{
  id: 'flow-chk-bsf',
  name: 'Poultry Manure Bioconversion Transfer',
  source: 'Chicken Coop',
  sourceId: 'fac-chk-01',
  destination: 'BSF / Maggot House',
  destinationId: 'fac-bsf-01',
  flowType: 'ACTUAL',
  material: 'Chicken Manure & Carbon Bedding',
  quantity: 14.0,
  unit: 'kg',
  timestamp: '2026-11-15 08:30',
  status: 'Active',
  category: 'Biomass & Circular',
  description: 'Spent deep-litter poultry manure and wood shavings harvested from Chicken Coop bedding and loaded into BSF bioconversion rearing trays.',
  verification: 'Logged by Vincent during morning coop maintenance'
}, {
  id: 'flow-bsf-maggot',
  name: 'Live Maggot Protein Supplement Feed',
  source: 'BSF / Maggot House',
  sourceId: 'fac-bsf-01',
  destination: 'Chicken Coop',
  destinationId: 'fac-chk-01',
  flowType: 'ACTUAL',
  material: 'Live BSF Prepupae (42% CP)',
  quantity: 2.4,
  unit: 'kg',
  timestamp: '2026-11-15 09:15',
  status: 'Active',
  category: 'Protein & Feed',
  description: 'Fresh self-harvested live 5th-instar BSF prepupae fed directly to layer hens as premium organic protein ration, replacing commercial soy mash.',
  verification: 'Weighed on digital platform scale'
}, {
  id: 'flow-bsf-frass',
  name: 'BSF Frass Pre-Compost Conditioning',
  source: 'BSF / Maggot House',
  sourceId: 'fac-bsf-01',
  destination: 'Compost Processing Bay',
  destinationId: 'fac-circular-hub',
  flowType: 'ACTUAL',
  material: 'Nutrient-Rich BSF Frass Residue',
  quantity: 18.0,
  unit: 'kg',
  timestamp: '2026-11-15 10:00',
  status: 'Active',
  category: 'Soil & Compost',
  description: 'Digested organic residue and larval shed skins transferred to Bokashi composting bays for thermal maturation.',
  verification: 'Batch logged in circularity ledger'
}, {
  id: 'flow-ruminant-manure',
  name: 'Small Ruminant Manure Composting Stream',
  source: 'Goat Barn & Sheep Barn',
  sourceId: 'fac-gt-01',
  destination: 'Compost Processing Bay',
  destinationId: 'fac-circular-hub',
  flowType: 'ACTUAL',
  material: 'Goat / Sheep Droppings & Uneaten Forage',
  quantity: 12.5,
  unit: 'kg',
  timestamp: '2026-11-15 08:45',
  status: 'Active',
  category: 'Soil & Compost',
  description: 'Manure sweepings from slatted elevated floors combined with uneaten forage and loaded into thermophilic compost windrows.',
  verification: 'Sweep tally recorded'
}, {
  id: 'flow-compost-toga',
  name: 'Finished Vermicompost Soil Enrichment',
  source: 'Compost Processing Bay',
  sourceId: 'fac-circular-hub',
  destination: 'TOGA Garden',
  destinationId: 'fac-tog-01',
  flowType: 'PLANNED',
  material: 'Matured Bokashi Humus + 10% Biochar',
  quantity: 25.0,
  unit: 'kg',
  timestamp: '2026-11-16 07:00 (Scheduled)',
  status: 'Scheduled',
  category: 'Soil & Compost',
  description: 'Top-dressing and root zone conditioning for turmeric, ginger, and lemongrass beds.',
  verification: 'Scheduled on weekly bed maintenance cycle'
}, {
  id: 'flow-compost-fruit',
  name: 'Fruit Tree Ring Mulching & Biochar Infusion',
  source: 'Compost Processing Bay',
  sourceId: 'fac-circular-hub',
  destination: 'Perimeter Fruit Trees',
  destinationId: 'fac-pft-01',
  flowType: 'PLANNED',
  material: 'Coarse Compost & Activated Bamboo Biochar',
  quantity: 35.0,
  unit: 'kg',
  timestamp: '2026-11-17 07:30 (Scheduled)',
  status: 'Scheduled',
  category: 'Soil & Compost',
  description: 'Drip-line ring application to papaya, banana, and citrus perimeter planting zones.',
  verification: 'Scheduled on bi-weekly orchard nourishment'
}, {
  id: 'flow-kitchen-bsf',
  name: 'Kitchen Scrap & Fruit Peel Diverted Feed',
  source: 'Domestic Kitchen & Crop Trimmings',
  sourceId: 'fac-kitchen',
  destination: 'BSF / Maggot House',
  destinationId: 'fac-bsf-01',
  flowType: 'ACTUAL',
  material: 'Vegetable Scraps, Fruit Rinds, Coffee Grounds',
  quantity: 6.2,
  unit: 'kg',
  timestamp: '2026-11-15 13:00',
  status: 'Active',
  category: 'Biomass & Circular',
  description: '100% of organic domestic kitchen waste collected and fed into active BSF bioconversion rearing trays.',
  verification: 'Kitchen scrap tally container weighed daily'
}, {
  id: 'flow-rainwater-hydro',
  name: 'Roof Rainwater Gravity Irrigation (Hydroponic)',
  source: 'Water Storage Cisterns',
  sourceId: 'fac-cisterns',
  destination: 'Hydroponic / Vertical Garden',
  destinationId: 'fac-hyd-01',
  flowType: 'ESTIMATED',
  material: 'Filtered Rainwater (TDS < 45 ppm)',
  quantity: 120.0,
  unit: 'liters',
  timestamp: '2026-11-15 (Daily Cumulative)',
  status: 'Active',
  category: 'Water & Irrigation',
  description: 'Direct supply to automated NFT and vertical tower dosing tanks.',
  verification: 'Digital inline flowmeter MTR-W-01'
}, {
  id: 'flow-rainwater-greenhouse',
  name: 'Greenhouse Automated Misting & Irrigation',
  source: 'Water Storage Cisterns',
  sourceId: 'fac-cisterns',
  destination: 'Carport Rooftop Greenhouse',
  destinationId: 'fac-crg-01',
  flowType: 'ESTIMATED',
  material: 'Rainwater / Header Tank Clarified Water',
  quantity: 85.0,
  unit: 'liters',
  timestamp: '2026-11-15 (Daily Cumulative)',
  status: 'Active',
  category: 'Water & Irrigation',
  description: 'Micro-sprinklers for seedling propagation trays and rooftop crop benches.',
  verification: 'Digital inline flowmeter MTR-W-02'
}, {
  id: 'flow-rainwater-livestock',
  name: 'Livestock Potable Water Supply',
  source: 'Water Storage Cisterns',
  sourceId: 'fac-cisterns',
  destination: 'Chicken Coop, Goat Barn & Sheep Barn',
  destinationId: 'fac-livestock-hub',
  flowType: 'ESTIMATED',
  material: 'Sand-Filtered Rainwater with Mineral Buffer',
  quantity: 65.0,
  unit: 'liters',
  timestamp: '2026-11-15 (Daily Cumulative)',
  status: 'Active',
  category: 'Water & Irrigation',
  description: 'Automated float-valve watering cups for poultry, goats, and sheep.',
  verification: 'Sub-metered through livestock manifold'
}, {
  id: 'flow-aquaponics-nutrient',
  name: 'Nitrified Aquaculture Effluent Discharge',
  source: 'Aquaculture Bio-Ponds',
  sourceId: 'fac-aqua-ponds',
  destination: 'Hydroponic / Vertical Garden',
  destinationId: 'fac-hyd-01',
  flowType: 'ESTIMATED',
  material: 'Bio-Filtered Fish Water (Rich in NO3-)',
  quantity: 180.0,
  unit: 'liters',
  timestamp: '2026-11-15 (Continuous Recirculation)',
  status: 'Active',
  category: 'Water & Irrigation',
  description: 'Nitrified aquaculture overflow recirculated through gravel and NFT bio-filtration beds.',
  verification: 'Recirculation pump telemetry runtime monitor'
}];
export const CANONICAL_RESOURCES_DATA = {
  energy: {
    generationCurrentKw: 4.8,
    peakTodayKw: 5.1,
    dailyTotalKwh: 24.6,
    monthTotalKwh: 682,
    solarArrayCapacityKwp: 5.2,
    batterySoC: 91,
    batteryVoltage: '53.2 V',
    batteryCapacityKwh: 15.3,
    autonomyHoursRemaining: 18.4,
    status: '100% Solar Powered',
    loads: [{
      name: 'Pumps & Misting',
      power: '380 W',
      share: '28%'
    }, {
      name: 'Cold Storage & Freeze',
      power: '320 W',
      share: '24%'
    }, {
      name: 'Greenhouse Lighting & Fans',
      power: '290 W',
      share: '22%'
    }, {
      name: 'Domestic Base Load',
      power: '360 W',
      share: '26%'
    }]
  },
  water: {
    totalStorageCapacityLiters: 12000,
    currentVolumeLiters: 10400,
    percentFull: 86.7,
    autonomyDaysRemaining: 23.1,
    dailyConsumptionLiters: 450,
    rainfallTodayMm: 12.4,
    rainwaterHarvestedTodayL: 1475,
    tdsPpm: 42,
    tanks: [{
      name: 'Cistern #1 (Clean Potable & Nursery)',
      capacity: 4000,
      current: 3800,
      percent: 95.0,
      tds: 38
    }, {
      name: 'Cistern #2 (Biochar Slow Sand Clarifier)',
      capacity: 4000,
      current: 3600,
      percent: 90.0,
      tds: 46
    }, {
      name: 'Cistern #3 (Gravity Header Supply)',
      capacity: 4000,
      current: 3000,
      percent: 75.0,
      tds: 42
    }]
  },
  circular: {
    circularityScorePercent: 98.2,
    totalWasteGeneratedKg: 42.0,
    divertedToBsfKg: 18.5,
    divertedToCompostKg: 16.0,
    divertedToMulchKg: 6.0,
    landfillKg: 1.5
  }
};
export class ResourcesService {
  constructor() {
    this.flows = [...CANONICAL_RESOURCE_FLOWS];
    this.resources = {
      ...CANONICAL_RESOURCES_DATA
    };
  }
  async getResourcesOverview() {
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      energy: this.resources.energy,
      water: this.resources.water,
      circular: this.resources.circular,
      activeFlowsCount: this.flows.length,
      calculatedAt: new Date().toISOString()
    };
  }
  async getResourceFlows(category, flowType) {
    let result = [...this.flows];
    if (category) {
      result = result.filter(f => f.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (flowType) {
      result = result.filter(f => f.flowType.toLowerCase() === flowType.toLowerCase());
    }
    return result;
  }
  async getFlowById(id) {
    return this.flows.find(f => f.id === id) || null;
  }
}
export default new ResourcesService();
