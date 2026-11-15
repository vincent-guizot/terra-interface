export const initialCultivationData = {
  catalog: [{
    id: 'plt-1',
    name: 'Tuscan Lacinato Kale',
    variety: 'Nero di Toscana',
    category: 'Leafy Greens',
    daysToMaturity: 55,
    harvestType: 'Continuous Pick',
    spacing: '30 cm'
  }, {
    id: 'plt-2',
    name: 'Bok Choy White Stem',
    variety: 'F1 Hybrid Shanghai',
    category: 'Brassica',
    daysToMaturity: 30,
    harvestType: 'Single Cut',
    spacing: '15 cm'
  }, {
    id: 'plt-3',
    name: 'Grey Oyster Mushroom',
    variety: 'Pleurotus ostreatus',
    category: 'Fungi',
    daysToMaturity: 18,
    harvestType: 'Multi Flush (3x)',
    spacing: 'Vertical Rack'
  }, {
    id: 'plt-4',
    name: 'California Dwarf Papaya',
    variety: 'Carica papaya',
    category: 'Fruit Tree',
    daysToMaturity: 240,
    harvestType: 'Continuous Perennial',
    spacing: '2.5 m'
  }, {
    id: 'plt-5',
    name: 'Sweet Cherry Tomato',
    variety: 'Sweet Million F1',
    category: 'Solanaceae',
    daysToMaturity: 65,
    harvestType: 'Cluster Harvest',
    spacing: '45 cm Trellis'
  }],
  batches: [{
    id: 'bat-cult-01',
    code: 'BAT-2026-CUL-01',
    name: 'Spring Greenhouse Bok Choy NFT',
    plantId: 'plt-2',
    plantName: 'Bok Choy White Stem',
    status: 'Active',
    // Draft | Planned | Active | On Hold | Completed | Cancelled
    zone: 'Hydroponic / Vertical Garden',
    startDate: '2026-10-22',
    expectedEndDate: '2026-11-20',
    actualEndDate: null,
    initialQuantity: 120,
    unit: 'heads',
    harvests: [{
      id: 'h-c-1',
      date: '2026-11-08',
      quantity: 14.5,
      unit: 'kg',
      grade: 'Grade A',
      steward: 'Vincent'
    }, {
      id: 'h-c-2',
      date: '2026-11-12',
      quantity: 12.0,
      unit: 'kg',
      grade: 'Grade A',
      steward: 'Vincent'
    }],
    healthScore: 98,
    notes: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected under insect screen.',
    history: [{
      date: '2026-10-22 08:00',
      action: 'Batch Created & Seedlings Transplanted',
      user: 'Vincent'
    }, {
      date: '2026-11-01 10:30',
      action: 'EC calibrated to 1.6 mS/cm, pH adjusted to 6.2',
      user: 'Vincent'
    }, {
      date: '2026-11-08 07:15',
      action: 'First Cut Harvest: 14.5 kg logged',
      user: 'Vincent'
    }]
  }, {
    id: 'bat-cult-02',
    code: 'BAT-2026-CUL-02',
    name: 'Zone 4 Heirloom Tomato Trellis',
    plantId: 'plt-5',
    plantName: 'Sweet Cherry Tomato',
    status: 'Active',
    zone: 'TOGA Garden & Food Border',
    startDate: '2026-09-10',
    expectedEndDate: '2026-12-15',
    actualEndDate: null,
    initialQuantity: 24,
    unit: 'vines',
    harvests: [{
      id: 'h-c-3',
      date: '2026-11-02',
      quantity: 6.8,
      unit: 'kg',
      grade: 'Grade A',
      steward: 'Vincent'
    }],
    healthScore: 92,
    notes: 'Biochar-rich keyhole bed #2 with companion basil and marigolds for biological pest deterrence.',
    history: [{
      date: '2026-09-10',
      action: 'Transplanted from nursery pots to Keyhole bed #2',
      user: 'Vincent'
    }, {
      date: '2026-10-14',
      action: 'Bamboo trellis lines tied, suckers pruned',
      user: 'Vincent'
    }]
  }, {
    id: 'bat-cult-03',
    code: 'BAT-2026-CUL-03',
    name: 'Oyster Mushroom Fruiting Chamber #2',
    plantId: 'plt-3',
    plantName: 'Grey Oyster Mushroom',
    status: 'Active',
    zone: 'Mushroom House (Integrated with Gudang)',
    startDate: '2026-10-28',
    expectedEndDate: '2026-11-30',
    actualEndDate: null,
    initialQuantity: 50,
    unit: 'sawdust bags',
    harvests: [{
      id: 'h-c-4',
      date: '2026-11-09',
      quantity: 4.8,
      unit: 'kg',
      grade: 'Prime',
      steward: 'Vincent'
    }],
    healthScore: 99,
    notes: 'Maintained at 88% RH via ultrasonic mister. Pinheads forming on 95% of bags.',
    history: [{
      date: '2026-10-28',
      action: 'Fully colonized bag logs transferred to fruiting chamber',
      user: 'Vincent'
    }]
  }]
};
