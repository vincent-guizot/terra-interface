// Canonical Master Plan & Ecosystem Data for Vincent's Farm (300 m², West Java, Indonesia)
// Source of Truth: Vincent's Farm 300 m² Master Plan (15.0m × 20.0m)

/**
 * Data Source Classification:
 * - LIVE: actual connected sensor or device telemetry
 * - MANUAL: manually entered records by steward/operator
 * - ESTIMATED: calculated or forecast algorithmic values
 * - DEMO: demonstration or simulated sample data
 */

export const MASTER_PLAN_SPECS = {
  name: "Vincent's Farm",
  totalAreaM2: 300.0,
  dimensions: "15.0m × 20.0m",
  orientation: "North-South Axial (Tropical Highland Monsoon)",
  location: "West Java, Indonesia (-6.9175° S, 107.6191° E)",
  established: "2024",
  steward: "Vincent",
  status: "Active Operational Master Plan",
};

/**
 * Canonical 10 Farm Buildings and Areas
 * Strictly adheres to approved Master Plan:
 * 1. Chicken Coop (Separate building)
 * 2. Goat Barn (Separate building)
 * 3. Sheep Barn (Separate building)
 * 4. BSF / Maggot House (Separate building/facility)
 * 5. Mushroom House (Integrated with Gudang & Utilitas)
 * 6. Gudang & Utilitas (2.0 × 2.5 m, 2 Levels, integrated with Mushroom House)
 * 7. Hydroponic / Vertical Garden
 * 8. Carport Rooftop Greenhouse
 * 9. TOGA Garden (Tanaman Obat Keluarga)
 * 10. Perimeter Fruit Trees
 */
export const masterPlanFacilities = [
  {
    id: 'fac-gud-01',
    code: 'FAC-GUD-01',
    name: 'Gudang & Utilitas',
    category: 'Utility & Storage',
    location: 'East Utility Wing (Integrated with Mushroom House)',
    area: '5.0 m² Footprint (2.0m × 2.5m, 2 Levels = 10.0 m² Floor Space)',
    dimensions: {
      widthM: 2.0,
      lengthM: 2.5,
      levels: 2,
      totalFloorM2: 10.0,
      verified: true,
      note: 'Canonical dimensions: 2.0 × 2.5 m with two full levels'
    },
    buildingType: 'Permanent 2-Level Utility & Operations Structure',
    description: 'Two-level central homestead utility core. Level 1 houses tool depot, equipment storage, input materials, water manifold valves, and off-grid inverter/battery telemetry. Level 2 houses climate-controlled seed vault and clean utility staging. Structurally integrated with the Mushroom House.',
    status: 'Operational',
    color: '#4B5563',
    icon: 'Warehouse',
    relatedResources: ['Central Tool Inventory', '74-Variety Heirloom Seed Vault', '8kW Hybrid Inverter & BMS', 'Irrigation Header Manifold'],
    relatedModules: ['Inventory', 'Energy & Water', 'Cultivation'],
    dataSource: 'LIVE',
    lastUpdated: '10 min ago (BMS RS485 Link)',
    metrics: {
      level1Use: 'Farm Tools, Inverter & Irrigation Valves',
      level2Use: 'Seed Vault & Clean Utility Hub',
      electricalLoad: '420 W standby',
      floorSpace: '10.0 m² total (2 storeys)',
    },
    missingPlanDetails: [
      'Exact structural connection and interior access passage between Gudang and Mushroom House.',
      'Final rainwater downspout routing from Gudang roof to Cistern #1 intake.'
    ],
    // Isometric canvas coordinates on 900x520 viewport (rhombus origin translate(450, 80))
    isometric: {
      x: 180,
      y: 130,
      pinX: 185,
      pinY: 120,
    }
  },
  {
    id: 'fac-msh-01',
    code: 'FAC-MSH-01',
    name: 'Mushroom House',
    category: 'Cultivation',
    location: 'East Utility Wing (Directly integrated with Gudang & Utilitas)',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Structurally integrated with Gudang & Utilitas building'
    },
    buildingType: 'Insulated Climate-Controlled Fungi Fruiting Room',
    description: 'Light-attenuated high-humidity fruiting room engineered specifically for Pleurotus ostreatus (Grey Oyster Mushroom) and gourmet fungi. Equipped with ultrasonic humidity misting lines, inline RH/temp sensors, and automated HEPA cross-ventilation. Physically adjoins the Gudang & Utilitas structure.',
    status: 'Optimal',
    color: '#10B981',
    icon: 'Spa',
    relatedResources: ['Grey Oyster Sawdust Baglogs (50 bags)', 'Misting Water Reservoir', 'HEPA Intake Filter'],
    relatedModules: ['Cultivation', 'Inventory'],
    dataSource: 'LIVE',
    lastUpdated: '3 min ago (Sensor Bus #4)',
    metrics: {
      temp: '24.2°C',
      humidity: '88% RH',
      co2: '720 ppm',
      activeSpecies: 'Grey Oyster Mushroom (Fruiting Flush #2)',
      projectedYield: '4.8 kg this flush'
    },
    missingPlanDetails: [
      'Exact footprint dimensions (length × width) on master architectural drawing.',
      'Total baglog rack capacity and vertical tier spacing.'
    ],
    isometric: {
      x: 235,
      y: 165,
      pinX: 240,
      pinY: 155,
    }
  },
  {
    id: 'fac-chk-01',
    code: 'FAC-CHK-01',
    name: 'Chicken Coop',
    category: 'Livestock',
    location: 'North-East Livestock Quarter (Standalone Poultry)',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Standalone poultry facility, separated from goat and sheep barns'
    },
    buildingType: 'Elevated Deep-Litter Poultry House & Predator-Proof Run',
    description: 'Dedicated poultry housing separate from ruminant barns. Features elevated perch roosts, roll-out egg nesting boxes, solar-timed predator door, and deep-litter carbonaceous bedding (sawdust and pine shavings). Manure and spent litter are directly routed to the BSF House and thermophilic composting.',
    status: 'Active',
    color: '#F59E0B',
    icon: 'Egg',
    relatedResources: ['Ayam KUB Layer Flock (24 hens)', 'Joper Meat Flock (30 birds)', 'Poultry Mash & Fermented Grains', 'Nipple Drinker Manifold'],
    relatedModules: ['Livestock', 'Circular'],
    dataSource: 'MANUAL',
    lastUpdated: 'Today, 07:30 AM (Steward Morning Run)',
    metrics: {
      flockSize: '24 KUB Layers + 30 Joper Meat',
      eggYield: '21 Eggs/day (91.3% Hen-Day)',
      feedIntake: '6.3 kg/day total',
      beddingCondition: 'Dry Carbon Deep Litter'
    },
    missingPlanDetails: [
      'Exact coop footprint dimensions and external perimeter run boundaries.',
      'Mobile chicken tractor rotation staging corridor location.'
    ],
    isometric: {
      x: 130,
      y: 245,
      pinX: 135,
      pinY: 235,
    }
  },
  {
    id: 'fac-gt-01',
    code: 'FAC-GT-01',
    name: 'Goat Barn',
    category: 'Livestock',
    location: 'North Livestock Sector (Standalone, separate from sheep and chickens)',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Standalone ruminant shelter, separate from Sheep Barn'
    },
    buildingType: 'Elevated Slatted-Floor Goat Barn',
    description: 'Dedicated small ruminant barn housing dairy and clearing goats (Kambing Boer / PE Cross). Elevated hardwood slatted floor allows manure pellets to drop into collection trays beneath, maintaining hygienic, dry hoof conditions and preventing parasitic foot rot. Kept strictly distinct from Sheep Barn.',
    status: 'Active',
    color: '#D97706',
    icon: 'Pets',
    relatedResources: ['Boer / PE Cross Goat Herd (4 head)', 'Elevated Hay Manger', 'Mineral Salt Block', 'Fresh Indigofera & Napier Forage'],
    relatedModules: ['Livestock', 'Circular'],
    dataSource: 'MANUAL',
    lastUpdated: 'Today, 08:15 AM (Morning Feed)',
    metrics: {
      herdSize: '4 Head (Boer / PE Cross)',
      forageConsumption: '12.0 kg/day fresh cut & carry',
      healthCondition: 'Vibrant / Active',
      manureYieldEst: '4.5 kg/day dry pellets'
    },
    missingPlanDetails: [
      'Partitioning between adult doe stalls and kid nursery pen.',
      'Clearance height beneath slatted floor for mechanical manure scraper.'
    ],
    isometric: {
      x: -30,
      y: 95,
      pinX: -25,
      pinY: 85,
    }
  },
  {
    id: 'fac-shp-01',
    code: 'FAC-SHP-01',
    name: 'Sheep Barn',
    category: 'Livestock',
    location: 'North-West Livestock Sector (Standalone, separate from goat barn)',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Standalone sheep barn, separate from Goat Barn'
    },
    buildingType: 'Elevated Slatted-Floor Sheep Housing',
    description: 'Dedicated housing for sheep flock (Domba Garut Silangan), separate from the Goat Barn to accommodate specialized dietary partitioning, lower browse requirements, and flock grazing routines. Raised slatted floor with external feed troughs and automatic float-valve drinkers.',
    status: 'Active',
    color: '#B45309',
    icon: 'Pets',
    relatedResources: ['Domba Garut Sheep Flock (4 head)', 'Grass Hay Racks', 'Automatic Water Trough', 'Perimeter Grazing Corrals'],
    relatedModules: ['Livestock', 'Circular'],
    dataSource: 'MANUAL',
    lastUpdated: 'Today, 08:20 AM (Morning Feed)',
    metrics: {
      flockSize: '4 Head (Domba Garut)',
      forageIntake: '10.0 kg/day field grass',
      healthCondition: 'Excellent',
      woolLitterYield: 'Periodic shearing / bedding'
    },
    missingPlanDetails: [
      'Exact separation buffer distance between Goat Barn and Sheep Barn.',
      'Fence gate latch geometry connecting to perimeter rotation lanes.'
    ],
    isometric: {
      x: -140,
      y: 120,
      pinX: -135,
      pinY: 110,
    }
  },
  {
    id: 'fac-bsf-01',
    code: 'FAC-BSF-01',
    name: 'BSF / Maggot House',
    category: 'Circular Bioconversion',
    location: 'Central Circular Hub (Adjacent to Livestock Quarter)',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Dedicated insect bioconversion facility'
    },
    buildingType: 'Ventilated Screened Insect Bioconversion Shelter',
    description: 'Engineered Black Soldier Fly (Hermetia illucens) bioconversion facility. Houses stacked 5-tray nursery larvae bins and an adult mating love cage with solar attractant lighting. Rapidly digests chicken manure, animal bedding, and kitchen scraps into high-protein prepupae (42% crude protein) and nutrient-rich insect frass.',
    status: 'Active',
    color: '#059669',
    icon: 'Loop',
    relatedResources: ['Stacked 5-Tray BSF Unit', 'Adult Mating Cage', 'Larval Substrate Trays', 'Frass Mechanical Sifter'],
    relatedModules: ['Circular', 'Livestock', 'Inventory'],
    dataSource: 'MANUAL',
    lastUpdated: 'Today, 09:10 AM (Prepupae Sift)',
    metrics: {
      activeBatches: 'BAT-2026-BSF-08',
      organicScrapIntake: '15.0 kg/batch',
      maggotYield: '2.4 kg live prepupae (42% CP)',
      frassYield: '4.8 kg organic fertilizer',
      conversionEfficiency: '16.0% biomass to insect protein'
    },
    missingPlanDetails: [
      'Exact shelter footprint dimensions on site plan.',
      'Screen mesh micron specification and floor leachate drain trap slope.'
    ],
    isometric: {
      x: 210,
      y: 270,
      pinX: 215,
      pinY: 260,
    }
  },
  {
    id: 'fac-hyd-01',
    code: 'FAC-HYD-01',
    name: 'Hydroponic / Vertical Garden',
    category: 'Cultivation',
    location: 'Central Cultivation Court',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Multi-tier vertical A-frame NFT installation'
    },
    buildingType: 'A-Frame Vertical NFT & Closed-Loop Hydroponic System',
    description: 'Intensive vertical production system featuring multi-tier NFT (Nutrient Film Technique) food-grade channels. Produces high-density leafy greens (Bok Choy, Tuscan Kale, Water Spinach, Romanesco, Herbs) with automated EC/pH dosing, root oxygenation, and rainwater recirculation.',
    status: 'Optimal',
    color: '#10B981',
    icon: 'Grass',
    relatedResources: ['4x Multi-tier NFT A-Frames', 'Automated EC/pH Dosing Pump', 'Recirculating Sump Basin', 'Rockwool Seedling Plugs'],
    relatedModules: ['Cultivation', 'Energy & Water'],
    dataSource: 'LIVE',
    lastUpdated: '1 min ago (Inline EC/pH Sensor)',
    metrics: {
      ec: '1.6 mS/cm',
      ph: '6.2 pH',
      waterTemp: '24.8°C',
      activePlantCount: '480 Positions',
      projectedHarvest: '14.5 kg/week greens'
    },
    missingPlanDetails: [
      'Total linear meterage of NFT channels and spacing between A-frames.',
      'Shade cloth retraction cable geometry and percentage shading (50% vs 65%).'
    ],
    isometric: {
      x: -180,
      y: 210,
      pinX: -175,
      pinY: 200,
    }
  },
  {
    id: 'fac-crg-01',
    code: 'FAC-CRG-01',
    name: 'Carport Rooftop Greenhouse',
    category: 'Cultivation',
    location: 'South Entry / Carport Upper Deck',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Elevated greenhouse erected above the carport entrance'
    },
    buildingType: 'Lightweight Polycarbonate Rooftop Greenhouse',
    description: 'Elevated greenhouse erected directly on top of the South carport structure. Maximizes direct solar irradiance for seedling propagation, delicate microgreens, and climate-shielded experimental crops. Features roll-up side ventilation, capillary germination benches, and overhead rainwater foggers.',
    status: 'Optimal',
    color: '#0284C7',
    icon: 'Agriculture',
    relatedResources: ['Capillary Germination Benches', 'Seedling Heat Mats', 'Bifacial Solar Canopy (Above)', 'Misting Micro-Nozzles'],
    relatedModules: ['Cultivation', 'Energy & Water'],
    dataSource: 'LIVE',
    lastUpdated: '4 min ago (Microclimate Station #2)',
    metrics: {
      temp: '27.4°C',
      humidity: '72% RH',
      solarIrradiance: '840 W/m²',
      nurseryFlats: '48 Germination Trays'
    },
    missingPlanDetails: [
      'Carport structural deck live-load bearing capacity certification (kg/m²).',
      'Exterior stairway placement and safety railing layout.'
    ],
    isometric: {
      x: -70,
      y: 330,
      pinX: -65,
      pinY: 320,
    }
  },
  {
    id: 'fac-tog-01',
    code: 'FAC-TOG-01',
    name: 'TOGA Garden',
    category: 'Agroforestry & Medicinal',
    location: 'South-Central Sunny Herb Sector',
    area: 'TBD (Pending on-site CAD measurement)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Raised medicinal herb garden beds'
    },
    buildingType: 'Biochar Living-Soil Raised Medicinal Herb Sanctuary',
    description: 'Tanaman Obat Keluarga (TOGA) — traditional family medicinal plant garden. Deeply amended living soil beds infused with 15% activated biochar and cured Bokashi compost. Cultivates Jahe Merah (red ginger), Kunyit (turmeric), Temulawak, Serai (lemongrass), Kumis Kucing, and aromatic culinary herbs for natural homestead health.',
    status: 'Thriving',
    color: '#65A30D',
    icon: 'Yard',
    relatedResources: ['Living Soil Beds with 15% Biochar', 'Heritage Medicinal Rhizomes', 'Gravity Micro-Drip Line', 'Sugarcane Mulch Layer'],
    relatedModules: ['Cultivation', 'Circular'],
    dataSource: 'MANUAL',
    lastUpdated: 'Today, 09:00 AM (Soil Tensiometer Check)',
    metrics: {
      soilMoisture: '36%',
      organicMatter: '9.4%',
      primaryCrops: 'Jahe Merah, Kunyit, Serai, Kumis Kucing',
      bedCount: '4 Keyhole Raised Beds'
    },
    missingPlanDetails: [
      'Geometric layout of raised bed edging (bamboo vs river stone vs masonry).',
      'Pathway widths between beds for wheelbarrow clearance.'
    ],
    isometric: {
      x: 75,
      y: 340,
      pinX: 80,
      pinY: 330,
    }
  },
  {
    id: 'fac-pft-01',
    code: 'FAC-PFT-01',
    name: 'Perimeter Fruit Trees',
    category: 'Agroforestry & Ecosystem',
    location: 'Outer Boundary Buffer (North, West & East Borders)',
    area: 'TBD (Linear border planting along 15m × 20m perimeter)',
    dimensions: {
      widthM: null,
      lengthM: null,
      levels: 1,
      verified: false,
      note: 'Multi-strata perimeter fruit guild'
    },
    buildingType: 'Multi-Strata Agroforestry Border Guild & Swale Buffer',
    description: 'Multi-layered perennial fruit and agroforestry border lining the homestead perimeter. Includes California Dwarf Papaya, Dwarf Cavendish Banana circles, Calamansi / Lime citrus shrubs, and vetiver grass swales. Serves as privacy hedge, windbreak, soil builder, and ongoing fruit harvest buffer.',
    status: 'Thriving',
    color: '#4D7C0F',
    icon: 'Park',
    relatedResources: ['8x California Dwarf Papaya', '4x Cavendish Banana Circles', '6x Calamansi Citrus', 'Vetiver Infiltration Swales'],
    relatedModules: ['Cultivation', 'Circular', 'Energy & Water'],
    dataSource: 'MANUAL',
    lastUpdated: 'Yesterday, 04:30 PM (Irrigation Inspection)',
    metrics: {
      treeInventory: '8 Papaya, 4 Banana Circles, 6 Citrus',
      canopyCoverage: 'Homestead Perimeter Boundary',
      mulchDepth: '10 cm Woodchip & Compost',
      irrigationMethod: 'Greywater Swales & Overflow Drip'
    },
    missingPlanDetails: [
      'Exact boundary setback distances from neighbor perimeter walls.',
      'Individual tree stem GPS coordinates along North and West swale paths.'
    ],
    isometric: {
      x: -290,
      y: 220,
      pinX: -285,
      pinY: 210,
    }
  }
];

/**
 * Canonical Ecological Resource Flows of Vincent's Farm
 * Strictly models approved closed-loop relationships:
 * - Chicken waste → BSF processing → maggot production and residue.
 * - BSF residue → compost processing.
 * - Compost → soil and garden cultivation.
 * - Organic waste → composting / circular processing.
 * - Water storage → irrigation and other relevant water consumers.
 * - Aquaculture and hydroponics connected only according to actual approved system.
 *
 * Distinguishes:
 * - PLANNED: scheduled operational flows
 * - ACTUAL: measured and logged real transfers
 * - ESTIMATED: calculated stoichiometric / engineering flows
 */
export const masterPlanResourceFlows = [
  {
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
  },
  {
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
  },
  {
    id: 'flow-bsf-frass',
    name: 'BSF Frass Fertilizer Inoculant',
    source: 'BSF / Maggot House',
    sourceId: 'fac-bsf-01',
    destination: 'Compost Processing Bay',
    destinationId: 'fac-circular-hub',
    flowType: 'ACTUAL',
    material: 'Digested Insect Frass Residue',
    quantity: 4.8,
    unit: 'kg',
    timestamp: '2026-11-15 09:30',
    status: 'Active',
    category: 'Nutrient Cycling',
    description: 'Decomposed insect frass and shed pupal exuviae transferred from BSF rearing trays to hot thermophilic composting windrow.',
    verification: 'Logged into Circular batch BAT-2026-BSF-08'
  },
  {
    id: 'flow-ruminant-manure',
    name: 'Goat & Sheep Manure Composting Transfer',
    source: 'Goat Barn & Sheep Barn',
    sourceId: 'fac-gt-01',
    destination: 'Compost Processing Bay',
    destinationId: 'fac-circular-hub',
    flowType: 'ACTUAL',
    material: 'Dry Ruminant Manure Pellets',
    quantity: 8.0,
    unit: 'kg',
    timestamp: '2026-11-15 08:45',
    status: 'Active',
    category: 'Soil Amendment',
    description: 'Manure pellets swept from underneath elevated slatted floors of Goat and Sheep Barns, combined with straw for aerobic hot composting.',
    verification: 'Measured into Compost Pile #12'
  },
  {
    id: 'flow-compost-toga',
    name: 'Cured Humus Soil Amendment for TOGA',
    source: 'Compost Processing Bay',
    sourceId: 'fac-circular-hub',
    destination: 'TOGA Garden',
    destinationId: 'fac-tog-01',
    flowType: 'PLANNED',
    material: 'Cured Thermophilic Bokashi Compost',
    quantity: 25.0,
    unit: 'kg',
    timestamp: 'Scheduled 2026-11-18',
    status: 'Scheduled',
    category: 'Soil Regeneration',
    description: 'Microbially inoculated compost humus top-dressed around Jahe Merah, Kunyit, and medicinal herb rhizomes to retain monsoon moisture.',
    verification: 'Scheduled in Activities task calendar'
  },
  {
    id: 'flow-compost-trees',
    name: 'Biochar-Compost Mulch for Perimeter Guilds',
    source: 'Compost Processing Bay',
    sourceId: 'fac-circular-hub',
    destination: 'Perimeter Fruit Trees',
    destinationId: 'fac-pft-01',
    flowType: 'PLANNED',
    material: 'Thermophilic Biochar-Compost Mulch',
    quantity: 40.0,
    unit: 'kg',
    timestamp: 'Scheduled 2026-11-20',
    status: 'Scheduled',
    category: 'Agroforestry Soil',
    description: 'Thick organic compost and biochar dressing applied inside banana swale circles and around California papaya trunks.',
    verification: 'Scheduled in Homestead Monthly Plan'
  },
  {
    id: 'flow-scraps-bsf',
    name: 'Kitchen & Trimmings Organic Scrap Intake',
    source: 'Domestic Kitchen & Crop Trimmings',
    sourceId: 'fac-kitchen',
    destination: 'BSF / Maggot House',
    destinationId: 'fac-bsf-01',
    flowType: 'ACTUAL',
    material: 'Organic Kitchen Scraps & Cull Biomass',
    quantity: 2.8,
    unit: 'kg',
    timestamp: '2026-11-15 07:45',
    status: 'Active',
    category: 'Waste Diversion',
    description: 'Daily domestic vegetable cuttings, fruit rinds, and non-fibrous culinary scraps loaded into BSF active feeding drawer.',
    verification: 'Weighed on kitchen food scale'
  },
  {
    id: 'flow-water-hydro',
    name: 'Filtered Rainwater NFT Top-up',
    source: 'Water Storage Cisterns',
    sourceId: 'fac-cisterns',
    destination: 'Hydroponic / Vertical Garden',
    destinationId: 'fac-hyd-01',
    flowType: 'ESTIMATED',
    material: 'Slow-Sand Filtered Rainwater',
    quantity: 65.0,
    unit: 'L/day',
    timestamp: 'Automated Daily Cycle',
    status: 'Active',
    category: 'Water Microgrid',
    description: 'Gravity-fed rainwater from central cistern manifold topping up the vertical hydroponic nutrient tank after plant transpiration losses.',
    verification: 'Calculated from float valve differential'
  },
  {
    id: 'flow-water-greenhouse',
    name: 'Carport Greenhouse Seedling Misting',
    source: 'Water Storage Cisterns',
    sourceId: 'fac-cisterns',
    destination: 'Carport Rooftop Greenhouse',
    destinationId: 'fac-crg-01',
    flowType: 'ESTIMATED',
    material: 'Clean Rainwater Misting Supply',
    quantity: 35.0,
    unit: 'L/day',
    timestamp: 'Automated 11:30 & 14:00',
    status: 'Active',
    category: 'Water Microgrid',
    description: 'Automated solar pump pressurizes rooftop micro-foggers to maintain nursery seedling flats humidity under midday solar exposure.',
    verification: 'Calculated from 2x 10-min pump duty cycles'
  },
  {
    id: 'flow-water-toga',
    name: 'TOGA Gravity Drip Irrigation',
    source: 'Water Storage Cisterns',
    sourceId: 'fac-cisterns',
    destination: 'TOGA Garden',
    destinationId: 'fac-tog-01',
    flowType: 'PLANNED',
    material: 'Gravity Micro-Drip Water',
    quantity: 45.0,
    unit: 'L/cycle',
    timestamp: 'Scheduled 16:30 Daily',
    status: 'Scheduled',
    category: 'Water Microgrid',
    description: 'Pressure-compensating gravity drip lines delivering targeted hydration to raised medicinal herb root zones.',
    verification: 'Automated solenoid valve schedule'
  },
  {
    id: 'flow-water-livestock',
    name: 'Livestock Automated Drinking Water',
    source: 'Water Storage Cisterns',
    sourceId: 'fac-cisterns',
    destination: 'Chicken Coop, Goat Barn & Sheep Barn',
    destinationId: 'fac-livestock-hub',
    flowType: 'ESTIMATED',
    material: 'UV-Purified Drinking Water',
    quantity: 40.0,
    unit: 'L/day',
    timestamp: 'Continuous Float Feed',
    status: 'Active',
    category: 'Water Microgrid',
    description: 'Continuous fresh water supply delivered via gravity pipeline to poultry nipple drinkers and ruminant float-valve troughs.',
    verification: 'Estimated from flock & herd standard consumption'
  },
  {
    id: 'flow-aqua-hydro-loop',
    name: 'Aquaponic Nitrification & Plant Uptake Loop',
    source: 'Aquaculture Bio-Ponds',
    sourceId: 'fac-aqua-ponds',
    destination: 'Hydroponic / Vertical Garden',
    destinationId: 'fac-hyd-01',
    flowType: 'ESTIMATED',
    material: 'Nitrified Bio-Effluent (Ammonia -> Nitrate)',
    quantity: 250.0,
    unit: 'L/day',
    timestamp: 'Recirculating Continuous',
    status: 'Active',
    category: 'Aquaponics Closed Loop',
    description: 'Fish biological waste converted into plant-available nitrates via Kaldnes K1 bio-filter media, piped to vertical NFT channels for biological uptake, with clean water returning to fish sump.',
    verification: 'Continuous sub-metered pump flow rate (10.4 L/hr recirc)'
  }
];

/**
 * List of Master Plan Details Requiring Clarification
 * Documented explicitly so assumptions are not fabricated.
 */
export const MASTER_PLAN_CLARIFICATIONS_NEEDED = [
  {
    id: 'clarify-01',
    facility: 'Gudang & Utilitas & Mushroom House',
    item: 'Structural Integration Interface',
    status: 'Pending Structural Survey',
    description: 'Exact physical connection details between Gudang & Utilitas (2 × 2.5 m, 2 levels) and the Mushroom House (shared masonry wall vs timber partition; direct interior door access vs separate exterior entrances).'
  },
  {
    id: 'clarify-02',
    facility: 'Chicken Coop, Goat Barn & Sheep Barn',
    item: 'Exact Footprint Dimensions & Setbacks',
    status: 'Pending CAD Dimensions',
    description: 'While canonical master plan specifies that Chicken Coop, Goat Barn, and Sheep Barn are three distinct standalone structures, their exact length × width boundary dimensions and inter-barn separation buffers are not yet dimensioned in the repository.'
  },
  {
    id: 'clarify-03',
    facility: 'Carport Rooftop Greenhouse',
    item: 'Deck Load Capacity & Access Geometry',
    status: 'Pending Engineering Review',
    description: 'Exact structural live-load rating of the carport roof deck supporting the greenhouse, and the designated location of stairs/access ladders from ground level.'
  },
  {
    id: 'clarify-04',
    facility: 'TOGA Garden & Perimeter Fruit Trees',
    item: 'Bed Boundary Geometry & Perimeter Setback',
    status: 'Pending Landscape Survey',
    description: 'Geometric specifications of TOGA raised bed masonry/bamboo edges, and precise boundary setback distances for perimeter fruit tree swales relative to property lines.'
  },
  {
    id: 'clarify-05',
    facility: 'BSF / Maggot House',
    item: 'Footprint & Drainage Slope',
    status: 'Pending Facility Drawing',
    description: 'Exact shelter footprint dimensions, tray orientation relative to prevailing breezes, and leachate collection drainage trench slopes.'
  }
];
