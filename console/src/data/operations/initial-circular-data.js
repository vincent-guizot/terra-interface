export const initialCircularData = {
  wasteRecords: [{
    id: 'wst-1',
    date: '2026-11-12',
    source: 'Kitchen & Meal Prep',
    type: 'Organic Food Scraps',
    weightKg: 2.8,
    routedTo: 'BSF Bioconversion Bin 3'
  }, {
    id: 'wst-2',
    date: '2026-11-11',
    source: 'Zone 1 Greenhouse Trimming',
    type: 'Crop Residue & Roots',
    weightKg: 4.2,
    routedTo: 'Bokashi Pile #12'
  }, {
    id: 'wst-3',
    date: '2026-11-10',
    source: 'Zone 3 Poultry Deep Litter',
    type: 'Manure & Wood shavings',
    weightKg: 14.0,
    routedTo: 'Hot Compost Windrow'
  }, {
    id: 'wst-4',
    date: '2026-11-09',
    source: 'Swirl Filter Basin',
    type: 'Fish Mineral Sludge',
    weightKg: 8.5,
    routedTo: 'Banana Circle Mulch'
  }],
  bsfBatches: [{
    id: 'bat-bsf-01',
    code: 'BAT-2026-BSF-08',
    name: 'Autumn Biomass Bioconversion Tray #3',
    status: 'Active',
    zone: 'BSF / Maggot House',
    startDate: '2026-11-04',
    expectedEndDate: '2026-11-18',
    initialQuantity: 15.0,
    // kg waste
    unit: 'kg waste',
    larvaeYieldKg: 2.4,
    frassYieldKg: 4.8,
    feedConversionEfficiency: '16.0% biomass to live insect protein',
    history: [{
      date: '2026-11-04',
      action: 'Inoculated 10g 5-DOL (day-old-larvae) into 15kg shredded scraps',
      user: 'Vincent'
    }, {
      date: '2026-11-11',
      action: 'Peak feeding activity observed. Temp 36°C in substrate.',
      user: 'Vincent'
    }]
  }],
  compostBatches: [{
    id: 'bat-cmp-01',
    code: 'BAT-2026-CMP-12',
    name: 'High-Nitrogen Bokashi Ferment #12',
    status: 'Active',
    zone: 'Zone 4: Composting Bay',
    startDate: '2026-10-15',
    expectedEndDate: '2026-11-25',
    initialQuantity: 250,
    unit: 'kg biomass',
    temperatureC: 58.5,
    maturityStage: 'Thermophilic Breakdown (Day 28 of 40)',
    maturityIndex: 82,
    // %
    moisturePercent: 52,
    recipe: '40% Poultry litter + 30% Bamboo leaves + 20% Biochar (quenched) + 10% EM4 Bokashi bran',
    harvests: [{
      id: 'h-cmp-1',
      date: '2026-11-02',
      quantity: 60,
      unit: 'kg',
      destination: 'Keyhole Raised Bed #1',
      steward: 'Vincent'
    }],
    history: [{
      date: '2026-10-15',
      action: 'Layered and inoculated with EM4 lactic acid bacteria',
      user: 'Vincent'
    }, {
      date: '2026-10-22',
      action: 'Turned pile. Core temp reached 62°C (pathogen pasteurization)',
      user: 'Vincent'
    }]
  }]
};
