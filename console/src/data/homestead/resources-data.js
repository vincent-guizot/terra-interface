// Master Data for Vincent's Farm (300 m² Homestead, West Java, Indonesia)
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
    loads: [{
      name: "Pumps & Misting",
      power: "380 W",
      share: "28%"
    }, {
      name: "Cold Storage & Freeze",
      power: "320 W",
      share: "24%"
    }, {
      name: "Greenhouse Lighting & Fans",
      power: "290 W",
      share: "22%"
    }, {
      name: "Homestead Residence & Lab",
      power: "350 W",
      share: "26%"
    }]
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
    streams: [{
      name: "Rainwater Roof Catchment (140 m²)",
      level: "8,200 L stored",
      status: "Primary"
    }, {
      name: "Biochar Sand Filter Tank",
      level: "2,200 L clear",
      status: "Active"
    }, {
      name: "Backup Deep Well",
      level: "Standby 100%",
      status: "Ready"
    }]
  },
  foodReserves: {
    pantryStockWeeks: 12.5,
    totalItemsTracked: 48,
    categories: [{
      name: "Dehydrated Herbs & Teas",
      stock: "14 jars",
      status: "High"
    }, {
      name: "Frozen Clean Tilapia Fillets",
      stock: "22.5 kg",
      status: "High"
    }, {
      name: "Fermented Sauerkraut & Kimchi",
      stock: "18 jars",
      status: "Optimal"
    }, {
      name: "Root Tubers (Cassava/Sweet Potato)",
      stock: "45 kg",
      status: "Adequate"
    }, {
      name: "Heirloom Seed Vault",
      stock: "74 varieties",
      status: "Protected"
    }]
  },
  circularEcosystem: {
    compostMaturedKg: 480,
    biocharStoredKg: 95,
    bsfLarvaeYieldKgDay: 1.8,
    biogasDailyCubicMeters: 1.25,
    wasteDivertedRate: 98.2,
    cycles: [{
      source: "Chicken Manure & Bedding",
      destination: "Bokashi Composting Pile",
      rate: "12 kg/week"
    }, {
      source: "Fish Pond Effluent",
      destination: "Greens Grow Beds & Agroforestry",
      rate: "400 L/day"
    }, {
      source: "Kitchen & Garden Scraps",
      destination: "BSF Larvae & Worm Bins",
      rate: "4.5 kg/day"
    }, {
      source: "Pruning Wood & Husks",
      destination: "Biochar Pyrolysis Kiln",
      rate: "25 kg/month"
    }]
  }
};
