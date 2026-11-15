export const initialAquacultureData = {
  ponds: [{
    id: 'pnd-1',
    name: 'Circular Bio-Pond Alpha',
    volumeM3: 8.0,
    species: 'Nile Tilapia (450 pcs)',
    tempC: 25.1,
    ph: 7.1,
    doMgL: 6.8,
    ammoniaPpm: 0.15,
    status: 'Optimal'
  }, {
    id: 'pnd-2',
    name: 'Catfish Sump Basin Beta',
    volumeM3: 4.0,
    species: 'African Walking Catfish (120 pcs)',
    tempC: 25.8,
    ph: 6.9,
    doMgL: 5.4,
    ammoniaPpm: 0.25,
    status: 'Healthy'
  }],
  batches: [{
    id: 'bat-aqua-01',
    code: 'BAT-2026-AQU-01',
    name: 'Monosex Nile Tilapia Finish Batch',
    pondId: 'pnd-1',
    pondName: 'Pond Alpha',
    species: 'Nile Tilapia (Oreochromis niloticus)',
    status: 'Active',
    zone: 'Zone 2: Aquaponics',
    startDate: '2026-08-15',
    expectedEndDate: '2026-11-28',
    actualEndDate: null,
    initialQuantity: 450,
    unit: 'fingerlings',
    currentCount: 442,
    survivalRate: 98.2,
    avgWeightG: 450,
    harvests: [{
      id: 'h-a-1',
      date: '2026-11-05',
      quantity: 18.5,
      unit: 'kg',
      avgWeightG: 440,
      grade: 'Prime Table Size',
      steward: 'Vincent'
    }],
    waterQualityLog: {
      ph: 7.1,
      do: 6.8,
      temp: 25.1,
      nitrate: 42,
      ammonia: 0.15
    },
    feedingSchedule: '450g daily (70% 32% CP Pellets + 30% Duckweed from biofilter)',
    history: [{
      date: '2026-08-15',
      action: 'Stocked 450 graded fingerlings (20g avg)',
      user: 'Vincent'
    }, {
      date: '2026-10-01',
      action: 'Sampled average weight: 260g. FCR calculated at 1.22',
      user: 'Vincent'
    }, {
      date: '2026-11-05',
      action: 'Selective pre-harvest: 18.5 kg harvested for homestead freezer',
      user: 'Vincent'
    }]
  }]
};
