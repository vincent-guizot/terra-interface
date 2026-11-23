// Zones of the Vincent's Farm master-plan image (public/images/farm-master-plan.jpg).
// Hotspot rects are [x, y, width, height] in pixels of FARM_IMAGE. Per-zone sizes are
// the figures printed on the master plan; the site total is 500 m².
export const FARM_IMAGE = {
  src: '/images/farm-master-plan.jpg',
  width: 895,
  height: 974,
  totalAreaM2: 500,
};

export const ZONE_CATEGORIES = [
  { id: 'habitat', label: 'Habitat', emoji: '🏠' },
  { id: 'livestock', label: 'Livestock', emoji: '🐔' },
  { id: 'cultivation', label: 'Cultivation', emoji: '🌱' },
  { id: 'aquaculture', label: 'Aquaculture', emoji: '🐟' },
  { id: 'circular', label: 'Waste / Circular', emoji: '♻️' },
  { id: 'utilities', label: 'Utilities', emoji: '📦' },
];

// facilityId links a zone to an entry in master-plan.js (null = no detail record yet).
export const farmZones = [
  { id: 'z1',  code: '1',  name: 'Rumah Tinggal (2 Lantai)', short: 'Main House',     size: '8 × 9 m',     areaM2: 72, category: 'habitat',     facilityId: null,         rect: [75, 460, 420, 190] },
  { id: 'z1a', code: '1A', name: 'Dapur & Akses Belakang',   short: 'Dapur',          size: '2 × 6 m',     areaM2: 12, category: 'habitat',     facilityId: null,         rect: [475, 530, 200, 230] },
  { id: 'z1b', code: '1B', name: 'Carport',                  short: 'Carport',        size: '3,5 × 5,5 m', areaM2: 19, category: 'utilities',   facilityId: null,         rect: [55, 680, 240, 160] },
  { id: 'z2a', code: '2A', name: 'KUB Layer',                short: 'KUB Layer',      size: '10–12 ekor', areaM2: 7,  category: 'livestock',   facilityId: 'fac-chk-01', rect: [190, 150, 185, 160] },
  { id: 'z2b', code: '2B', name: 'Cornish Cross',            short: 'Cornish Cross',  size: '± 6 ekor/batch', areaM2: 5, category: 'livestock', facilityId: 'fac-chk-01', rect: [380, 150, 160, 160] },
  { id: 'z3',  code: '3',  name: 'Kolam Ikan',               short: 'Fish Pond',      size: '3 × 4 m',     areaM2: 12, category: 'aquaculture', facilityId: null,         rect: [180, 325, 230, 150] },
  { id: 'z4',  code: '4',  name: 'Kandang Kambing & Domba',  short: 'Goat & Sheep',   size: '3,5 × 4 m',   areaM2: 14, category: 'livestock',   facilityId: 'fac-gt-01',  rect: [580, 160, 285, 180] },
  { id: 'z5',  code: '5',  name: 'Kebun Sayur (Raised Bed)', short: 'Kebun Sayur',    size: '4,5 × 4 m',   areaM2: 18, category: 'cultivation', facilityId: 'fac-hyd-01', rect: [460, 345, 260, 175] },
  { id: 'z6',  code: '6',  name: 'Kebun TOGA',               short: 'Kebun TOGA',     size: '2 × 3 m',     areaM2: 6,  category: 'cultivation', facilityId: 'fac-tog-01', rect: [740, 375, 125, 170] },
  { id: 'z7',  code: '7',  name: 'Jamur Tiram',              short: 'Jamur Tiram',    size: '2 × 2,5 m',   areaM2: 5,  category: 'cultivation', facilityId: 'fac-msh-01', rect: [225, 50, 180, 105] },
  { id: 'z8',  code: '8',  name: 'Kompos & BSF (Maggot)',    short: 'Kompos & BSF',   size: '2 × 2,5 m',   areaM2: 5,  category: 'circular',    facilityId: 'fac-bsf-01', rect: [465, 50, 145, 110] },
  { id: 'z9',  code: '9',  name: 'Gudang & Utilitas',        short: 'Gudang',         size: '2 × 2,5 m',   areaM2: 5,  category: 'utilities',   facilityId: 'fac-gud-01', rect: [675, 50, 175, 110] },
];

export const getZoneById = (id) => farmZones.find((z) => z.id === id) || null;
export const getZoneByFacilityId = (facilityId) => farmZones.find((z) => z.facilityId === facilityId) || null;
export const getCategory = (id) => ZONE_CATEGORIES.find((c) => c.id === id) || ZONE_CATEGORIES[0];
export const zoneCenter = (zone) => [zone.rect[0] + zone.rect[2] / 2, zone.rect[1] + zone.rect[3] / 2];

// Resource flows between zones (drawn over the master-plan image in Map → Resource Flow).
// category: energy | water | food | waste. `via` bends the arrow (offset in image px).
export const FLOW_COLORS = { energy: '#F5B301', water: '#1C8FE8', food: '#4CAF2A', waste: '#A8531A' };

export const zoneFlows = [
  { id: 'f-energy-1', category: 'energy', from: 'z9', to: 'z1', via: [0, 40] },
  { id: 'f-water-1', category: 'water', from: 'z3', to: 'z5', via: [0, -40] },
  { id: 'f-water-2', category: 'water', from: 'z3', to: 'z6', via: [60, 90] },
  { id: 'f-food-1', category: 'food', from: 'z8', to: 'z5', via: [60, 30] },
  { id: 'f-food-2', category: 'food', from: 'z8', to: 'z3', via: [-40, 40] },
  { id: 'f-food-3', category: 'food', from: 'z5', to: 'z1a', via: [30, 30] },
  { id: 'f-waste-1', category: 'waste', from: 'z2a', to: 'z8', via: [0, -60] },
  { id: 'f-waste-2', category: 'waste', from: 'z4', to: 'z8', via: [0, -50] },
  { id: 'f-waste-3', category: 'waste', from: 'z1a', to: 'z8', via: [180, -140] },
];
