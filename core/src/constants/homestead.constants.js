"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STANDARD_MEASUREMENT_UNITS = exports.ALERT_THRESHOLDS = exports.ZONE_DEFINITIONS = exports.BATCH_LIFECYCLE_STATUS = exports.PRODUCTION_DOMAINS = exports.HOMESTEAD_METADATA = void 0;
exports.HOMESTEAD_METADATA = {
    NAME: "Vincent's Farm",
    TOTAL_AREA_SQM: 300.0,
    DIMENSIONS: '15m x 20m Master Plan',
    LOCATION: 'West Java, Indonesia',
    CLIMATE: 'Tropical Highland Monsoon',
    STEWARD: 'Vincent',
    TARGET_CIRCULARITY: 95.0,
};
exports.PRODUCTION_DOMAINS = {
    CULTIVATION: 'CULTIVATION',
    LIVESTOCK: 'LIVESTOCK',
    AQUACULTURE: 'AQUACULTURE',
    CIRCULAR: 'CIRCULAR',
    INVENTORY: 'INVENTORY',
    ENERGY_WATER: 'ENERGY_WATER',
};
exports.BATCH_LIFECYCLE_STATUS = {
    DRAFT: 'DRAFT',
    PLANNED: 'PLANNED',
    ACTIVE: 'ACTIVE',
    ON_HOLD: 'ON_HOLD',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
};
exports.ZONE_DEFINITIONS = [
    {
        code: 'Z-01',
        name: 'Smart Micro-Greenhouse',
        areaSqm: 35.0,
        domain: exports.PRODUCTION_DOMAINS.CULTIVATION,
        colorHex: '#10B981',
        description: 'Climate-controlled nursery with vertical NFT and oyster mushroom chambers.',
    },
    {
        code: 'Z-02',
        name: 'Aquaponics & Bio-Pond',
        areaSqm: 25.0,
        domain: exports.PRODUCTION_DOMAINS.AQUACULTURE,
        colorHex: '#0284C7',
        description: 'Recirculating aquaculture with Nile tilapia, catfish, and nitrifying bio-filtration.',
    },
    {
        code: 'Z-03',
        name: 'Intensive Poultry & BSF Hub',
        areaSqm: 20.0,
        domain: exports.PRODUCTION_DOMAINS.LIVESTOCK,
        colorHex: '#F59E0B',
        description: 'Deep litter coop for Ayam KUB, Joper, and 5-tray Black Soldier Fly bioconversion.',
    },
    {
        code: 'Z-04',
        name: 'Permaculture Food Forest & Beds',
        areaSqm: 110.0,
        domain: exports.PRODUCTION_DOMAINS.CULTIVATION,
        colorHex: '#65A30D',
        description: 'Keyhole raised beds, California papaya, and dwarf Cavendish banana circles.',
    },
    {
        code: 'Z-05',
        name: 'Solar Array & Battery Hub',
        areaSqm: 30.0,
        domain: exports.PRODUCTION_DOMAINS.ENERGY_WATER,
        colorHex: '#D97706',
        description: '5.2 kWp bifacial rooftop array, 8 kW hybrid inverter, and 15.3 kWh LiFePO4 battery pack.',
    },
    {
        code: 'Z-06',
        name: 'Water Catchment & Filtration',
        areaSqm: 25.0,
        domain: exports.PRODUCTION_DOMAINS.ENERGY_WATER,
        colorHex: '#0D9488',
        description: '140 m² roof catchment with vortex pre-filter and 12,000 L gravity-fed storage.',
    },
    {
        code: 'Z-07',
        name: 'Eco-Living Quarters & Nursery',
        areaSqm: 55.0,
        domain: exports.PRODUCTION_DOMAINS.CULTIVATION,
        colorHex: '#8B5CF6',
        description: 'Passive solar homestead dwelling, seed vault, and central Home OS terminal.',
    },
];
exports.ALERT_THRESHOLDS = {
    WATER_QUALITY: {
        DO_MIN_MG_L: 5.0,
        PH_MIN: 6.5,
        PH_MAX: 8.0,
        AMMONIA_MAX_PPM: 0.5,
        NITRATE_MAX_PPM: 60.0,
    },
    ENERGY: {
        BATTERY_MIN_SOC: 20.0,
        BATTERY_DUMP_LOAD_SOC: 90.0,
        MAX_CELL_DELTA_V: 0.030,
    },
    WATER_STORAGE: {
        CRITICAL_LEVEL_LITERS: 2500,
        FULL_CAPACITY_LITERS: 12000,
    },
};
exports.STANDARD_MEASUREMENT_UNITS = [
    'kg',
    'g',
    'pcs',
    'liters',
    'birds',
    'head',
    'trays',
    'bags',
    'bundles',
    'm³',
    'kWh',
];
