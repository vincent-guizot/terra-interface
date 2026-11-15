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
