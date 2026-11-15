export const initialLivestockData = {
  animals: [{
    id: 'ani-1',
    code: 'LIV-CK-01',
    breed: 'Ayam KUB (Kampung Unggul Balitnak)',
    species: 'Chicken',
    type: 'Dual Purpose (Egg & Meat)',
    population: 24,
    location: 'Chicken Coop',
    health: 'Excellent',
    dailyFeedKg: 2.8,
    eggDaily: 21
  }, {
    id: 'ani-2',
    code: 'LIV-CK-02',
    breed: 'Joper (Jawa Super)',
    species: 'Chicken',
    type: 'Intensive Free-Range Meat',
    population: 30,
    location: 'Chicken Coop (Run Bravo)',
    health: 'Healthy',
    dailyFeedKg: 3.5,
    eggDaily: 0
  }, {
    id: 'ani-3',
    code: 'LIV-CK-03',
    breed: 'Cornish Cross Broilers',
    species: 'Chicken',
    type: 'Fast Meat Bioconverter',
    population: 20,
    location: 'Chicken Coop (Mobile Tractor)',
    health: 'Good',
    dailyFeedKg: 3.2,
    eggDaily: 0
  }, {
    id: 'ani-4',
    code: 'LIV-GT-01',
    breed: 'Kambing Boer / PE Cross',
    species: 'Goat',
    type: 'Dairy & Forage Clearing',
    population: 4,
    location: 'Goat Barn (Elevated Slat)',
    health: 'Vibrant',
    dailyFeedKg: 12.0,
    eggDaily: 0
  }, {
    id: 'ani-5',
    code: 'LIV-SH-01',
    breed: 'Domba Garut Silangan',
    species: 'Sheep',
    type: 'Grassland Regenerator',
    population: 4,
    location: 'Sheep Barn (Elevated Slat)',
    health: 'Excellent',
    dailyFeedKg: 10.0,
    eggDaily: 0
  }],
  batches: [{
    id: 'bat-live-01',
    code: 'BAT-2026-LIV-01',
    name: 'KUB Layer Flock Season 2',
    breed: 'Ayam KUB',
    species: 'Chicken',
    status: 'Active',
    zone: 'Chicken Coop',
    startDate: '2026-05-10',
    expectedEndDate: '2027-05-10',
    actualEndDate: null,
    initialQuantity: 24,
    unit: 'birds',
    currentCount: 24,
    mortality: 0,
    harvests: [{
      id: 'h-l-1',
      date: '2026-11-12',
      product: 'Fresh Pastured Eggs',
      quantity: 21,
      unit: 'pcs',
      grade: 'Grade A',
      steward: 'Vincent'
    }, {
      id: 'h-l-2',
      date: '2026-11-11',
      product: 'Fresh Pastured Eggs',
      quantity: 22,
      unit: 'pcs',
      grade: 'Grade A',
      steward: 'Vincent'
    }, {
      id: 'h-l-3',
      date: '2026-11-10',
      product: 'Fresh Pastured Eggs',
      quantity: 20,
      unit: 'pcs',
      grade: 'Grade A',
      steward: 'Vincent'
    }],
    feedingRatio: '50% Fermented Grains + 35% Live BSF Prepupae + 15% Fresh Forage',
    vaccinationHistory: 'ND-IB administered at Week 4, Wormwood herbal dewormer active.',
    history: [{
      date: '2026-05-10',
      action: 'Point of Lay pullets housed in deep litter coop',
      user: 'Vincent'
    }, {
      date: '2026-08-01',
      action: 'Peak laying rate reached (91.6% hen-day egg production)',
      user: 'Vincent'
    }]
  }, {
    id: 'bat-live-02',
    code: 'BAT-2026-LIV-02',
    name: 'Joper Pastured Meat Cycle 4',
    breed: 'Ayam Joper',
    species: 'Chicken',
    status: 'Active',
    zone: 'Chicken Coop (Run Bravo)',
    startDate: '2026-10-01',
    expectedEndDate: '2026-12-05',
    actualEndDate: null,
    initialQuantity: 30,
    unit: 'birds',
    currentCount: 30,
    mortality: 0,
    harvests: [],
    feedingRatio: 'Formulated starter crumb + Azolla + BSF larvae',
    vaccinationHistory: 'Gumboro and ND Lasota completed.',
    history: [{
      date: '2026-10-01',
      action: 'Day-old chicks placed in brooding pen with heat lamp',
      user: 'Vincent'
    }, {
      date: '2026-10-21',
      action: 'Weaned from heat lamp into outdoor grazing tractor',
      user: 'Vincent'
    }]
  }]
};
