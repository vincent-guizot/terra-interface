// Master Data for Vincent's Farm (300 m² Homestead, West Java, Indonesia)
export const activitiesData = {
  todaySummary: {
    total: 8,
    completed: 5,
    pending: 3,
    efficiency: "88%"
  },
  todayTasks: [{
    id: "act-1",
    time: "06:30 AM",
    title: "Morning Aquaculture Feeding & DO Check",
    zone: "Zone 2: Aquaponics",
    domain: "Aquaculture",
    priority: "High",
    duration: "15 min",
    completed: true,
    notes: "Fed 450g pellets + fresh duckweed. Fish appetite active, DO 6.8 mg/L."
  }, {
    id: "act-2",
    time: "07:15 AM",
    title: "Poultry Morning Release & Egg Collection",
    zone: "Zone 3: Poultry Hub",
    domain: "Livestock",
    priority: "High",
    duration: "20 min",
    completed: true,
    notes: "Gathered 21 clean eggs. Water nipple system refilled."
  }, {
    id: "act-3",
    time: "08:30 AM",
    title: "Greenhouse Microgreen Mist Cycle Inspection",
    zone: "Zone 1: Micro-Greenhouse",
    domain: "Cultivation",
    priority: "Medium",
    duration: "15 min",
    completed: true,
    notes: "Inspected oyster mushroom bag humidity. Pinheads developing uniformly."
  }, {
    id: "act-4",
    time: "10:30 AM",
    title: "Inverter Telemetry & Solar Battery Top-off Check",
    zone: "Zone 5: Solar Array",
    domain: "Infrastructure",
    priority: "Low",
    duration: "10 min",
    completed: true,
    notes: "Battery reached 90% at 10:15 AM. Diverting surplus to irrigation pump."
  }, {
    id: "act-5",
    time: "11:45 AM",
    title: "Mid-day Permaculture Zone 4 Drip Verification",
    zone: "Zone 4: Permaculture Beds",
    domain: "Cultivation",
    priority: "Medium",
    duration: "15 min",
    completed: true,
    notes: "Soil moisture at 38% under heavy woodchip mulch. Drip lines flowing clear."
  }, {
    id: "act-6",
    time: "03:30 PM",
    title: "BSF Larvae Harvesting for Evening Poultry Snack",
    zone: "Zone 3: Poultry Hub",
    domain: "Livestock",
    priority: "High",
    duration: "20 min",
    completed: false,
    notes: "Sift 1.5kg prepupae from Tray 3 into feed bucket."
  }, {
    id: "act-7",
    time: "04:45 PM",
    title: "Bokashi Compost Pile Aeration & Temperature Log",
    zone: "Zone 4: Permaculture Beds",
    domain: "Regenerative",
    priority: "Medium",
    duration: "25 min",
    completed: false,
    notes: "Check probe temp (expecting 55°C - 62°C) and turn pile edge inward."
  }, {
    id: "act-8",
    time: "05:45 PM",
    title: "Evening Fish Feeding & Settling Basin Purge",
    zone: "Zone 2: Aquaponics",
    domain: "Aquaculture",
    priority: "High",
    duration: "20 min",
    completed: false,
    notes: "Drain 20L bottom solids from swirl separator into banana circle bed."
  }],
  weeklyChoreSchedule: [{
    day: "Monday",
    focus: "Seed Nursery & Succession Sowing",
    tasksCount: 4,
    leader: "Vincent"
  }, {
    day: "Tuesday",
    focus: "Comprehensive Water Lab & Mineral Dosing",
    tasksCount: 3,
    leader: "Vincent"
  }, {
    day: "Wednesday",
    focus: "Coop Deep Litter Stirring & Biochar Addition",
    tasksCount: 3,
    leader: "Vincent"
  }, {
    day: "Thursday",
    focus: "Agroforestry Pruning & Mulch Layering",
    tasksCount: 5,
    leader: "Vincent"
  }, {
    day: "Friday",
    focus: "Solar PV Panel Rinse & Filter Backwash",
    tasksCount: 4,
    leader: "Vincent"
  }, {
    day: "Saturday",
    focus: "Major Harvest & Produce Conditioning",
    tasksCount: 6,
    leader: "Vincent"
  }, {
    day: "Sunday",
    focus: "Homestead System Audit & Terra AI Calibration",
    tasksCount: 2,
    leader: "Vincent"
  }]
};
