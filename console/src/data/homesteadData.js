// Master Data for Vincent's Farm (300 m² Homestead, West Java, Indonesia)
import {
  masterPlanFacilities,
  masterPlanResourceFlows,
  MASTER_PLAN_SPECS,
  MASTER_PLAN_CLARIFICATIONS_NEEDED
} from './masterPlanData.js';

export {
  masterPlanFacilities,
  masterPlanResourceFlows,
  MASTER_PLAN_SPECS,
  MASTER_PLAN_CLARIFICATIONS_NEEDED
};

export const homesteadProfile = {
  name: "Vincent's Farm",
  size: "300 m²",
  dimensions: "15.0m × 20.0m Master Plan",
  location: "West Java, Indonesia (Tropical Microclimate)",
  established: "2024",
  steward: "Vincent",
  vision: "Your Home. Your Resources. Your Ecosystem.",
  overallAutonomy: 94.2,
  metrics: {
    foodAutonomy: 86.4,
    foodDataSource: 'MANUAL',
    energyIndependence: 100.0,
    energyDataSource: 'LIVE',
    waterSelfSufficiency: 92.5,
    waterDataSource: 'LIVE',
    circularWasteDiverted: 98.2,
    circularDataSource: 'ESTIMATED',
  },
  weather: {
    temp: 28,
    condition: "Tropical Sun / Gentle Breeze",
    humidity: 74,
    uvIndex: 7,
    solarIrradiance: 840, // W/m2
    rainForecast: "Light evening shower expected (4mm at 17:30)",
    dataSource: 'LIVE',
    lastUpdated: '10 min ago',
  }
};

// Canonical Homestead Facilities (Vincent's Farm 300 m² Master Plan)
export const homesteadZones = masterPlanFacilities;


export const productionData = {
  summary: {
    monthlyTotalKg: 168.4,
    monthlyGoalKg: 180.0,
    targetProgress: 93.5,
    categoriesCount: 5,
    activeBatches: 18,
    estimatedSavingsIdr: "Rp 7.850.000",
  },
  categories: [
    {
      id: "cat-crops",
      name: "Crops & Greens",
      icon: "Eco",
      color: "#10B981",
      currentMonthKg: 78.5,
      activeArea: "145 m²",
      trend: "+14%",
      topItems: ["Tuscan Kale", "Bok Choy", "Kangkung", "Cherry Tomatoes", "Red Birds-Eye Chili"],
      harvestCycleDays: 28,
    },
    {
      id: "cat-aqua",
      name: "Aquaculture",
      icon: "SetMeal",
      color: "#0284C7",
      currentMonthKg: 34.0,
      activeArea: "25 m²",
      trend: "+8%",
      topItems: ["Nile Tilapia (450g avg)", "African Walking Catfish"],
      harvestCycleDays: 120,
    },
    {
      id: "cat-poultry",
      name: "Poultry & Eggs",
      icon: "Egg",
      color: "#F59E0B",
      currentMonthKg: 28.2, // ~470 eggs + meat cull
      activeArea: "20 m²",
      trend: "+5%",
      topItems: ["Free-range Brown Eggs", "Heirloom Ayam Kampung Eggs"],
      harvestCycleDays: 1,
    },
    {
      id: "cat-orchard",
      name: "Fruit Agroforestry",
      icon: "Park",
      color: "#84CC16",
      currentMonthKg: 18.2,
      activeArea: "60 m² (intercropped)",
      trend: "+22%",
      topItems: ["Papaya California", "Cavendish Bananas", "Kaffir Lime", "Guava Crystal"],
      harvestCycleDays: 60,
    },
    {
      id: "cat-microgreens",
      name: "Microgreens & Fungi",
      icon: "Grass",
      color: "#6366F1",
      currentMonthKg: 9.5,
      activeArea: "15 m² vertical",
      trend: "+19%",
      topItems: ["Grey Oyster Mushroom", "Sunflower Shoots", "Radish Microgreens"],
      harvestCycleDays: 10,
    }
  ],
  activeBatches: [
    {
      id: "batch-101",
      code: "B-24-TIL",
      crop: "Nile Tilapia (Pond Alpha)",
      category: "Aquaculture",
      stage: "Finishing (450g)",
      progress: 85,
      plantedDate: "2026-08-15",
      estimatedHarvest: "2026-11-28",
      targetYield: "45.0 kg",
      zone: "Zone 2: Aquaponics",
      status: "On Track"
    },
    {
      id: "batch-102",
      code: "B-88-BOK",
      crop: "Bok Choy & Choy Sum NFT",
      category: "Crops & Greens",
      stage: "Pre-Harvest",
      progress: 92,
      plantedDate: "2026-10-22",
      estimatedHarvest: "2026-11-16",
      targetYield: "14.5 kg",
      zone: "Zone 1: Micro-Greenhouse",
      status: "Ready Soon"
    },
    {
      id: "batch-103",
      code: "B-42-OYS",
      crop: "Grey Oyster Mushrooms (Fruiting)",
      category: "Microgreens & Fungi",
      stage: "Flush #2 Pinning",
      progress: 75,
      plantedDate: "2026-10-28",
      estimatedHarvest: "2026-11-14",
      targetYield: "6.8 kg",
      zone: "Zone 1: Micro-Greenhouse",
      status: "Peak Vigour"
    },
    {
      id: "batch-104",
      code: "B-15-TOM",
      crop: "Sweet Cherry Tomatoes (Indeterminate)",
      category: "Crops & Greens",
      stage: "Ripening Clusters",
      progress: 68,
      plantedDate: "2026-09-10",
      estimatedHarvest: "2026-11-20",
      targetYield: "22.0 kg",
      zone: "Zone 4: Permaculture Beds",
      status: "Optimal"
    },
    {
      id: "batch-105",
      code: "B-09-PAP",
      crop: "California Papaya Guild",
      category: "Fruit Agroforestry",
      stage: "Continuous Fruiting",
      progress: 100,
      plantedDate: "2025-11-01",
      estimatedHarvest: "Weekly",
      targetYield: "8.0 kg/week",
      zone: "Zone 4: Permaculture Beds",
      status: "Perennial"
    }
  ],
  recentHarvests: [
    { id: "h-1", date: "Today, 07:15", item: "Pasture Raised Eggs", qty: "21 pcs (1.3 kg)", zone: "Zone 3", steward: "Vincent", quality: "Grade A" },
    { id: "h-2", date: "Yesterday", item: "Sunflower & Pea Microgreens", qty: "1.8 kg", zone: "Zone 1", steward: "Vincent", quality: "Premium" },
    { id: "h-3", date: "Nov 10", item: "Water Spinach (Kangkung)", qty: "6.4 kg", zone: "Zone 2 (Aquaponic filter)", steward: "Vincent", quality: "Grade A" },
    { id: "h-4", date: "Nov 08", item: "African Catfish (Selected)", qty: "8.2 kg", zone: "Zone 2", steward: "Vincent", quality: "Prime" },
    { id: "h-5", date: "Nov 06", item: "Red Bird's Eye Chilies", qty: "3.1 kg", zone: "Zone 4", steward: "Vincent", quality: "Grade A" }
  ]
};

export const resourcesData = {
  energy: {
    generationCurrentKw: 4.8,
    peakTodayKw: 5.1,
    dailyTotalKwh: 24.6,
    monthTotalKwh: 682,
    solarArrayCapacityKwp: 5.2,
    batterySoC: 91,
    batteryVoltage: "53.2 V",
    batteryCapacityKwh: 15.3,
    autonomyHoursRemaining: 18.4,
    status: "100% Solar Powered",
    loads: [
      { name: "Pumps & Misting", power: "380 W", share: "28%" },
      { name: "Cold Storage & Freeze", power: "320 W", share: "24%" },
      { name: "Greenhouse Lighting & Fans", power: "290 W", share: "22%" },
      { name: "Homestead Residence & Lab", power: "350 W", share: "26%" }
    ]
  },
  water: {
    cisternTotalLiters: 12000,
    cisternCurrentLiters: 10400,
    percentFull: 86.6,
    rainwaterCapturedThisMonthL: 8200,
    dailyConsumptionL: 340,
    aquaponicsRecycledL: 2800,
    recirculationEfficiency: 97.4,
    tdsPpm: 42,
    phLevel: 7.0,
    daysOfAutonomyLeft: 30.5,
    streams: [
      { name: "Rainwater Roof Catchment (140 m²)", level: "8,200 L stored", status: "Primary" },
      { name: "Biochar Sand Filter Tank", level: "2,200 L clear", status: "Active" },
      { name: "Backup Deep Well", level: "Standby 100%", status: "Ready" }
    ]
  },
  foodReserves: {
    pantryStockWeeks: 12.5,
    totalItemsTracked: 48,
    categories: [
      { name: "Dehydrated Herbs & Teas", stock: "14 jars", status: "High" },
      { name: "Frozen Clean Tilapia Fillets", stock: "22.5 kg", status: "High" },
      { name: "Fermented Sauerkraut & Kimchi", stock: "18 jars", status: "Optimal" },
      { name: "Root Tubers (Cassava/Sweet Potato)", stock: "45 kg", status: "Adequate" },
      { name: "Heirloom Seed Vault", stock: "74 varieties", status: "Protected" }
    ]
  },
  circularEcosystem: {
    compostMaturedKg: 480,
    biocharStoredKg: 95,
    bsfLarvaeYieldKgDay: 1.8,
    biogasDailyCubicMeters: 1.25,
    wasteDivertedRate: 98.2,
    cycles: [
      { source: "Chicken Manure & Bedding", destination: "Bokashi Composting Pile", rate: "12 kg/week" },
      { source: "Fish Pond Effluent", destination: "Greens Grow Beds & Agroforestry", rate: "400 L/day" },
      { source: "Kitchen & Garden Scraps", destination: "BSF Larvae & Worm Bins", rate: "4.5 kg/day" },
      { source: "Pruning Wood & Husks", destination: "Biochar Pyrolysis Kiln", rate: "25 kg/month" }
    ]
  }
};

export const activitiesData = {
  todaySummary: {
    total: 8,
    completed: 5,
    pending: 3,
    efficiency: "88%",
  },
  todayTasks: [
    {
      id: "act-1",
      time: "06:30 AM",
      title: "Morning Aquaculture Feeding & DO Check",
      zone: "Zone 2: Aquaponics",
      domain: "Aquaculture",
      priority: "High",
      duration: "15 min",
      completed: true,
      notes: "Fed 450g pellets + fresh duckweed. Fish appetite active, DO 6.8 mg/L."
    },
    {
      id: "act-2",
      time: "07:15 AM",
      title: "Poultry Morning Release & Egg Collection",
      zone: "Zone 3: Poultry Hub",
      domain: "Livestock",
      priority: "High",
      duration: "20 min",
      completed: true,
      notes: "Gathered 21 clean eggs. Water nipple system refilled."
    },
    {
      id: "act-3",
      time: "08:30 AM",
      title: "Greenhouse Microgreen Mist Cycle Inspection",
      zone: "Zone 1: Micro-Greenhouse",
      domain: "Cultivation",
      priority: "Medium",
      duration: "15 min",
      completed: true,
      notes: "Inspected oyster mushroom bag humidity. Pinheads developing uniformly."
    },
    {
      id: "act-4",
      time: "10:30 AM",
      title: "Inverter Telemetry & Solar Battery Top-off Check",
      zone: "Zone 5: Solar Array",
      domain: "Infrastructure",
      priority: "Low",
      duration: "10 min",
      completed: true,
      notes: "Battery reached 90% at 10:15 AM. Diverting surplus to irrigation pump."
    },
    {
      id: "act-5",
      time: "11:45 AM",
      title: "Mid-day Permaculture Zone 4 Drip Verification",
      zone: "Zone 4: Permaculture Beds",
      domain: "Cultivation",
      priority: "Medium",
      duration: "15 min",
      completed: true,
      notes: "Soil moisture at 38% under heavy woodchip mulch. Drip lines flowing clear."
    },
    {
      id: "act-6",
      time: "03:30 PM",
      title: "BSF Larvae Harvesting for Evening Poultry Snack",
      zone: "Zone 3: Poultry Hub",
      domain: "Livestock",
      priority: "High",
      duration: "20 min",
      completed: false,
      notes: "Sift 1.5kg prepupae from Tray 3 into feed bucket."
    },
    {
      id: "act-7",
      time: "04:45 PM",
      title: "Bokashi Compost Pile Aeration & Temperature Log",
      zone: "Zone 4: Permaculture Beds",
      domain: "Regenerative",
      priority: "Medium",
      duration: "25 min",
      completed: false,
      notes: "Check probe temp (expecting 55°C - 62°C) and turn pile edge inward."
    },
    {
      id: "act-8",
      time: "05:45 PM",
      title: "Evening Fish Feeding & Settling Basin Purge",
      zone: "Zone 2: Aquaponics",
      domain: "Aquaculture",
      priority: "High",
      duration: "20 min",
      completed: false,
      notes: "Drain 20L bottom solids from swirl separator into banana circle bed."
    }
  ],
  weeklyChoreSchedule: [
    { day: "Monday", focus: "Seed Nursery & Succession Sowing", tasksCount: 4, leader: "Vincent" },
    { day: "Tuesday", focus: "Comprehensive Water Lab & Mineral Dosing", tasksCount: 3, leader: "Vincent" },
    { day: "Wednesday", focus: "Coop Deep Litter Stirring & Biochar Addition", tasksCount: 3, leader: "Vincent" },
    { day: "Thursday", focus: "Agroforestry Pruning & Mulch Layering", tasksCount: 5, leader: "Vincent" },
    { day: "Friday", focus: "Solar PV Panel Rinse & Filter Backwash", tasksCount: 4, leader: "Vincent" },
    { day: "Saturday", focus: "Major Harvest & Produce Conditioning", tasksCount: 6, leader: "Vincent" },
    { day: "Sunday", focus: "Homestead System Audit & Terra AI Calibration", tasksCount: 2, leader: "Vincent" }
  ]
};

export const intelligenceData = {
  circScore: 94.2,
  insights: [
    {
      id: "ins-1",
      category: "Resource Synergy",
      title: "Surplus Solar Window Approaching (11:30 - 14:00)",
      body: "Predicted solar generation will exceed storage capacity by 4.2 kWh today. Terra OS recommends auto-triggering the deep well water pump to top off Cistern #3 and running the food dehydrator for sliced oyster mushrooms.",
      severity: "Positive Opportunity",
      badgeColor: "#10B981",
      actionText: "Auto-Dispatch Solar Surplus"
    },
    {
      id: "ins-2",
      category: "Biological Balance",
      title: "Nitrate Accumulation in Pond Alpha (44 ppm)",
      body: "Nitrifying bio-filter efficiency is high, but vegetative uptake is trailing slightly. Recommended action: Increase recirculation diverter valve to the Kangkung and Mint gravel beds by 20% to achieve equilibrium.",
      severity: "Optimization",
      badgeColor: "#0284C7",
      actionText: "Divert Effluent to Grow Beds"
    },
    {
      id: "ins-3",
      category: "Microclimate & Pests",
      title: "Monsoon Moisture Advisory (88% RH Forecast)",
      body: "High ambient humidity forecast for next 48h. To prevent powdery mildew on indeterminant tomatoes in Zone 4, schedule organic neem oil & horsetail decoction spray before 16:00.",
      severity: "Preventative",
      badgeColor: "#F59E0B",
      actionText: "Schedule Organic Foliar Spray"
    }
  ],
  predictions: [
    { metric: "Weekly Harvest Projection", value: "32.4 kg", confidence: "94%", change: "+11% vs last week" },
    { metric: "Solar Autonomy Next 7 Days", value: "100%", confidence: "98%", change: "Zero grid dependency" },
    { metric: "Water Reserve Longevity", value: "30.5 Days", confidence: "91%", change: "Stable reserve" },
    { metric: "Tilapia Weight Gain Rate", value: "+38g / week", confidence: "89%", change: "Optimal FCR 1.25" }
  ],
  recommendations: [
    {
      title: "Crop Rotation in Keyhole Bed #2",
      zone: "Zone 4",
      impact: "High",
      reason: "Following heavy feeder brassicas, sow bush beans (Phaseolus vulgaris) to fix nitrogen and restore soil biology without chemical inputs."
    },
    {
      title: "Supplemental Calcium via Eggshell Vinegar",
      zone: "Zone 1 & 4",
      impact: "Medium",
      reason: "Apply fermented water-soluble calcium (WCA) derived from homestead eggshells to blossom-end of tomatoes to avoid blossom-end rot."
    },
    {
      title: "Adjust Brooder Ventilation Louver",
      zone: "Zone 3",
      impact: "Low",
      reason: "Evening temps dropping to 22°C; reduce airflow by 15% between 22:00 and 05:00 to keep pullets stress-free."
    }
  ],
  quickPrompts: [
    "How is the closed-loop nutrient cycle performing today?",
    "What is the best harvest date for Tilapia Batch B-24?",
    "How can I maximize solar energy utilization before the afternoon rain?",
    "Explain the nitrogen flow from fish waste to lettuce beds."
  ]
};
