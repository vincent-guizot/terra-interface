// Master Data for Vincent's Farm (300 m² Homestead, West Java, Indonesia)
export const productionData = {
  summary: {
    monthlyTotalKg: 168.4,
    monthlyGoalKg: 180.0,
    targetProgress: 93.5,
    categoriesCount: 5,
    activeBatches: 18,
    estimatedSavingsIdr: "Rp 7.850.000"
  },
  categories: [{
    id: "cat-crops",
    name: "Crops & Greens",
    icon: "Eco",
    color: "#10B981",
    currentMonthKg: 78.5,
    activeArea: "145 m²",
    trend: "+14%",
    topItems: ["Tuscan Kale", "Bok Choy", "Kangkung", "Cherry Tomatoes", "Red Birds-Eye Chili"],
    harvestCycleDays: 28
  }, {
    id: "cat-aqua",
    name: "Aquaculture",
    icon: "SetMeal",
    color: "#0284C7",
    currentMonthKg: 34.0,
    activeArea: "25 m²",
    trend: "+8%",
    topItems: ["Nile Tilapia (450g avg)", "African Walking Catfish"],
    harvestCycleDays: 120
  }, {
    id: "cat-poultry",
    name: "Poultry & Eggs",
    icon: "Egg",
    color: "#F59E0B",
    currentMonthKg: 28.2,
    // ~470 eggs + meat cull
    activeArea: "20 m²",
    trend: "+5%",
    topItems: ["Free-range Brown Eggs", "Heirloom Ayam Kampung Eggs"],
    harvestCycleDays: 1
  }, {
    id: "cat-orchard",
    name: "Fruit Agroforestry",
    icon: "Park",
    color: "#84CC16",
    currentMonthKg: 18.2,
    activeArea: "60 m² (intercropped)",
    trend: "+22%",
    topItems: ["Papaya California", "Cavendish Bananas", "Kaffir Lime", "Guava Crystal"],
    harvestCycleDays: 60
  }, {
    id: "cat-microgreens",
    name: "Microgreens & Fungi",
    icon: "Grass",
    color: "#6366F1",
    currentMonthKg: 9.5,
    activeArea: "15 m² vertical",
    trend: "+19%",
    topItems: ["Grey Oyster Mushroom", "Sunflower Shoots", "Radish Microgreens"],
    harvestCycleDays: 10
  }],
  activeBatches: [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }],
  recentHarvests: [{
    id: "h-1",
    date: "Today, 07:15",
    item: "Pasture Raised Eggs",
    qty: "21 pcs (1.3 kg)",
    zone: "Zone 3",
    steward: "Vincent",
    quality: "Grade A"
  }, {
    id: "h-2",
    date: "Yesterday",
    item: "Sunflower & Pea Microgreens",
    qty: "1.8 kg",
    zone: "Zone 1",
    steward: "Vincent",
    quality: "Premium"
  }, {
    id: "h-3",
    date: "Nov 10",
    item: "Water Spinach (Kangkung)",
    qty: "6.4 kg",
    zone: "Zone 2 (Aquaponic filter)",
    steward: "Vincent",
    quality: "Grade A"
  }, {
    id: "h-4",
    date: "Nov 08",
    item: "African Catfish (Selected)",
    qty: "8.2 kg",
    zone: "Zone 2",
    steward: "Vincent",
    quality: "Prime"
  }, {
    id: "h-5",
    date: "Nov 06",
    item: "Red Bird's Eye Chilies",
    qty: "3.1 kg",
    zone: "Zone 4",
    steward: "Vincent",
    quality: "Grade A"
  }]
};
