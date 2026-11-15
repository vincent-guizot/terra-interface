/**
 * Vincent's Farm 300 m² Master Plan Constants
 * Canonical Spatial & Domain Metadata
 */

export const HOMESTEAD_METADATA = {
  ID: 'vincents-farm-300m2',
  NAME: "Vincent's Farm",
  TOTAL_AREA_SQM: 300.0,
  DIMENSIONS: '15m x 20m Master Plan',
  LOCATION: 'West Java, Indonesia',
  CLIMATE: 'Tropical Highland Monsoon',
  STEWARD: 'Vincent',
  TARGET_CIRCULARITY: 95.0,
  SYSTEM_VERSION: 'Terra Interface Core v2.4 (Express)'
};
export const PRODUCTION_DOMAINS = {
  CULTIVATION: 'CULTIVATION',
  LIVESTOCK: 'LIVESTOCK',
  AQUACULTURE: 'AQUACULTURE',
  CIRCULAR: 'CIRCULAR',
  INVENTORY: 'INVENTORY',
  ENERGY_WATER: 'ENERGY_WATER',
  CATALOG: 'CATALOG'
};
export const BATCH_LIFECYCLE_STATUS = {
  DRAFT: 'DRAFT',
  PLANNED: 'PLANNED',
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};
export const CANONICAL_FACILITIES = [{
  id: 'FAC-GUD-01',
  code: 'FAC-GUD-01',
  name: 'Gudang & Utilitas',
  category: 'infrastructure',
  location: 'East Utility Wing (Integrated with Mushroom House)',
  dimensions: '2.0m × 2.5m (2 Levels = 10.0 m² floor space)',
  footprintSqm: 5.0,
  floorAreaSqm: 10.0,
  levels: 2,
  buildingType: 'Permanent 2-Level Utility & Operations Structure',
  description: 'Level 1: tool depot, water manifold valves, off-grid inverter & battery. Level 2: climate-controlled seed vault and clean staging. Structurally integrated with Mushroom House.',
  status: 'Operational'
}, {
  id: 'FAC-MSH-01',
  code: 'FAC-MSH-01',
  name: 'Mushroom House',
  category: 'cultivation',
  location: 'East Utility Wing (Adjoining Gudang & Utilitas)',
  dimensions: '3.0m × 2.5m (7.5 m²)',
  footprintSqm: 7.5,
  levels: 1,
  buildingType: 'Insulated Climate-Controlled Fungi Fruiting Room',
  description: 'Ultrasonic humidity misting lines, inline RH/temp sensors, HEPA air filtration. Adjoins Gudang & Utilitas.',
  status: 'Operational'
}, {
  id: 'FAC-CHK-01',
  code: 'FAC-CHK-01',
  name: 'Chicken Coop',
  category: 'livestock',
  location: 'North-East Livestock Quarter (Standalone Poultry)',
  dimensions: '4.0m × 3.0m (12.0 m²)',
  footprintSqm: 12.0,
  buildingType: 'Elevated Deep-Litter Poultry House & Predator-Proof Run',
  description: 'Standalone elevated building separate from ruminants. Houses Ayam KUB and Joper flocks.',
  status: 'Active'
}, {
  id: 'FAC-GT-01',
  code: 'FAC-GT-01',
  name: 'Goat Barn',
  category: 'livestock',
  location: 'North Livestock Sector (Standalone, separate from sheep)',
  dimensions: '3.5m × 2.5m (8.75 m²)',
  footprintSqm: 8.75,
  buildingType: 'Elevated Slatted-Floor Goat Barn',
  description: 'Standalone elevated building with high-clearance slatted floor for Boer cross goats.',
  status: 'Active'
}, {
  id: 'FAC-SHP-01',
  code: 'FAC-SHP-01',
  name: 'Sheep Barn',
  category: 'livestock',
  location: 'North-West Livestock Sector (Standalone, separate from goats)',
  dimensions: '3.5m × 2.5m (8.75 m²)',
  footprintSqm: 8.75,
  buildingType: 'Elevated Slatted-Floor Sheep Housing',
  description: 'Standalone elevated building with low-gradient entrance ramp for Domba Garut.',
  status: 'Active'
}, {
  id: 'FAC-BSF-01',
  code: 'FAC-BSF-01',
  name: 'BSF / Maggot House',
  category: 'circular',
  location: 'Central Circular Hub',
  dimensions: '3.0m × 2.0m (6.0 m²)',
  footprintSqm: 6.0,
  buildingType: 'Ventilated Screened Insect Bioconversion Shelter',
  description: 'Stacked 5-tier vertical larvae feeding trays converting poultry and food waste to protein.',
  status: 'Active'
}, {
  id: 'FAC-HYD-01',
  code: 'FAC-HYD-01',
  name: 'Hydroponic / Vertical Garden',
  category: 'cultivation',
  location: 'South-West Production Strip',
  dimensions: '6.0m × 2.5m (15.0 m²)',
  footprintSqm: 15.0,
  buildingType: 'Multi-Tier A-Frame & Dutch Bucket Hydroponic Array',
  description: 'High-density NFT gullies for bok choy and Dutch buckets for heirloom tomatoes.',
  status: 'Operational'
}, {
  id: 'FAC-CRG-01',
  code: 'FAC-CRG-01',
  name: 'Carport Rooftop Greenhouse',
  category: 'cultivation',
  location: 'South Entrance Over Carport',
  dimensions: '5.0m × 3.0m (15.0 m²)',
  footprintSqm: 15.0,
  buildingType: 'Elevated Polycarbonate Seedling Nursery',
  description: 'Microclimate seedling nursery with micro-misting.',
  status: 'Operational'
}, {
  id: 'FAC-PFT-01',
  code: 'FAC-PFT-01',
  name: 'TOGA Garden',
  category: 'cultivation',
  location: 'South-East Herb Quadrant',
  dimensions: '4.0m × 2.0m (8.0 m²)',
  footprintSqm: 8.0,
  buildingType: 'Permaculture Raised Keyhole Beds',
  description: 'Tanaman Obat Keluarga medicinal beds amended with matured BSF frass compost.',
  status: 'Active'
}, {
  id: 'FAC-PFT-02',
  code: 'FAC-PFT-02',
  name: 'Perimeter Fruit Trees',
  category: 'cultivation',
  location: 'Outer Boundary Linear Hedgerow',
  dimensions: '20.0m × 1.0m (20.0 m²)',
  footprintSqm: 20.0,
  buildingType: 'Multi-Story Edible Windbreak Hedgerow',
  description: 'Papaya, Dwarf Cavendish Banana, Citrus, and Guava border.',
  status: 'Active'
}];
export const STANDARD_MEASUREMENT_UNITS = [{
  symbol: 'kg',
  name: 'Kilogram',
  dimension: 'MASS'
}, {
  symbol: 'g',
  name: 'Gram',
  dimension: 'MASS'
}, {
  symbol: 'L',
  name: 'Liter',
  dimension: 'VOLUME'
}, {
  symbol: 'mL',
  name: 'Milliliter',
  dimension: 'VOLUME'
}, {
  symbol: 'pcs',
  name: 'Pieces',
  dimension: 'DISCRETE'
}, {
  symbol: 'head',
  name: 'Head (Animals)',
  dimension: 'DISCRETE'
}, {
  symbol: 'birds',
  name: 'Birds (Flock)',
  dimension: 'DISCRETE'
}, {
  symbol: 'trays',
  name: 'Trays (BSF / Seedlings)',
  dimension: 'DISCRETE'
}, {
  symbol: 'kWh',
  name: 'Kilowatt-Hour',
  dimension: 'ENERGY'
}, {
  symbol: 'kWp',
  name: 'Kilowatt-Peak',
  dimension: 'POWER'
}];

export const ZONE_DEFINITIONS = [
  {
    "code": "Z-01",
    "name": "Smart Micro-Greenhouse",
    "areaSqm": 35,
    "domain": "CULTIVATION",
    "colorHex": "#10B981",
    "description": "Climate-controlled nursery with vertical NFT and oyster mushroom chambers."
  },
  {
    "code": "Z-02",
    "name": "Aquaponics & Bio-Pond",
    "areaSqm": 25,
    "domain": "AQUACULTURE",
    "colorHex": "#0284C7",
    "description": "Recirculating aquaculture with Nile tilapia, catfish, and nitrifying bio-filtration."
  },
  {
    "code": "Z-03",
    "name": "Intensive Poultry & BSF Hub",
    "areaSqm": 20,
    "domain": "LIVESTOCK",
    "colorHex": "#F59E0B",
    "description": "Deep litter coop for Ayam KUB, Joper, and 5-tray Black Soldier Fly bioconversion."
  },
  {
    "code": "Z-04",
    "name": "Permaculture Food Forest & Beds",
    "areaSqm": 110,
    "domain": "CULTIVATION",
    "colorHex": "#65A30D",
    "description": "Keyhole raised beds, California papaya, and dwarf Cavendish banana circles."
  },
  {
    "code": "Z-05",
    "name": "Solar Array & Battery Hub",
    "areaSqm": 30,
    "domain": "ENERGY_WATER",
    "colorHex": "#D97706",
    "description": "5.2 kWp bifacial rooftop array, 8 kW hybrid inverter, and 15.3 kWh LiFePO4 battery pack."
  },
  {
    "code": "Z-06",
    "name": "Water Catchment & Filtration",
    "areaSqm": 25,
    "domain": "ENERGY_WATER",
    "colorHex": "#0D9488",
    "description": "140 m² roof catchment with vortex pre-filter and 12,000 L gravity-fed storage."
  },
  {
    "code": "Z-07",
    "name": "Eco-Living Quarters & Nursery",
    "areaSqm": 55,
    "domain": "CULTIVATION",
    "colorHex": "#8B5CF6",
    "description": "Passive solar homestead dwelling, seed vault, and central Home OS terminal."
  }
];

export const ALERT_THRESHOLDS = {
  "WATER_QUALITY": {
    "DO_MIN_MG_L": 5,
    "PH_MIN": 6.5,
    "PH_MAX": 8,
    "AMMONIA_MAX_PPM": 0.5,
    "NITRATE_MAX_PPM": 60
  },
  "ENERGY": {
    "BATTERY_MIN_SOC": 20,
    "BATTERY_DUMP_LOAD_SOC": 90,
    "MAX_CELL_DELTA_V": 0.03
  },
  "WATER_STORAGE": {
    "CRITICAL_LEVEL_LITERS": 2500,
    "FULL_CAPACITY_LITERS": 12000
  }
};
