export const initialEnergyWaterData = {
  energy: {
    pvArray: {
      capacityKwp: 5.2,
      panelsCount: 10,
      brand: 'Tier 1 Bifacial Half-Cell 520W',
      string1V: 242,
      string2V: 238,
      todayYieldKwh: 24.6,
      peakKw: 5.1
    },
    inverter: {
      model: '8kW High-Frequency Pure Sine Hybrid',
      efficiency: '97.8%',
      mode: 'Solar Priority & Battery Buffer',
      currentLoadW: 1340
    },
    battery: {
      capacityKwh: 15.3,
      chemistry: 'LiFePO4 (16S 100Ah)',
      voltageV: 53.2,
      socPercent: 91,
      cycleCount: 184,
      temperatureC: 28.5,
      healthPercent: 99.4
    },
    hourlyGeneration: [{
      hour: '06:00',
      kw: 0.2
    }, {
      hour: '08:00',
      kw: 1.8
    }, {
      hour: '10:00',
      kw: 4.2
    }, {
      hour: '12:00',
      kw: 4.8
    }, {
      hour: '14:00',
      kw: 4.1
    }, {
      hour: '16:00',
      kw: 1.9
    }, {
      hour: '18:00',
      kw: 0.1
    }]
  },
  water: {
    sources: [{
      name: 'Monsoon Rooftop Rain Catchment',
      yieldThisMonthL: 8200,
      quality: '42 ppm TDS • Filtered',
      status: 'Primary Active'
    }, {
      name: 'Deep Well Backup Aquifer',
      pumpKw: 0.75,
      capacityLh: 1200,
      status: 'Standby 100%'
    }, {
      name: 'Aquaponics Bio-Recirculation',
      recoveryRate: '97.4%',
      volumeCirculatedDayL: 2800,
      status: 'Continuous'
    }],
    storageTanks: [{
      id: 'tnk-1',
      name: 'Cistern #1 (Primary Clean)',
      currentL: 3800,
      totalL: 4000,
      pct: 95,
      destination: 'Homestead & Micro-drip'
    }, {
      id: 'tnk-2',
      name: 'Cistern #2 (Biochar Settling)',
      currentL: 3600,
      totalL: 4000,
      pct: 90,
      destination: 'Greenhouse Misting'
    }, {
      id: 'tnk-3',
      name: 'Cistern #3 (Gravity Header Tank)',
      currentL: 3000,
      totalL: 4000,
      pct: 75,
      destination: 'Emergency Buffer'
    }],
    dailyConsumption: [{
      category: 'Greenhouse & Drip Irrigation',
      volumeL: 140,
      share: '41%'
    }, {
      category: 'Pond Water Exchange & Filter Flush',
      volumeL: 90,
      share: '26%'
    }, {
      category: 'Livestock & Poultry Drinking',
      volumeL: 40,
      share: '12%'
    }, {
      category: 'Homestead Residence Living',
      volumeL: 70,
      share: '21%'
    }]
  }
};
