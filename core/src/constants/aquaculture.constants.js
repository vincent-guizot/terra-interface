export const CANONICAL_PONDS = [{
  id: 'pnd-01',
  pondCode: 'PND-01',
  name: 'Tilapia IBC Bio-Floc Tank Alpha',
  species: 'Oreochromis niloticus (Nile Tilapia)',
  volumeLiters: 4000,
  currentStockCount: 442,
  averageWeightGrams: 440,
  totalBiomassKg: 194.5,
  stockingDensityKgM3: 48.6,
  waterQuality: {
    dissolvedOxygenMgL: 6.2,
    pH: 7.2,
    waterTempC: 26.5,
    ammoniaPpm: 0.15,
    status: 'OPTIMAL'
  },
  feedingProtocol: '32% CP Floating Pellets + 30% Duckweed biomass supplement'
}, {
  id: 'pnd-02',
  pondCode: 'PND-02',
  name: 'Catfish High-Density Tarpaulin Tank',
  species: 'Clarias gariepinus (African Catfish)',
  volumeLiters: 2500,
  currentStockCount: 300,
  averageWeightGrams: 280,
  totalBiomassKg: 84.0,
  stockingDensityKgM3: 33.6,
  waterQuality: {
    dissolvedOxygenMgL: 5.4,
    pH: 6.9,
    waterTempC: 27.8,
    ammoniaPpm: 0.35,
    status: 'OPTIMAL'
  },
  feedingProtocol: 'Night feeding ration + BSF prepupae live feed'
}, {
  id: 'pnd-03',
  pondCode: 'PND-03',
  name: 'Duckweed & Azolla Biomass Basin',
  species: 'Lemna minor & Azolla pinnata',
  volumeLiters: 1000,
  currentStockCount: 0,
  averageWeightGrams: 0,
  totalBiomassKg: 15.0,
  stockingDensityKgM3: 15.0,
  waterQuality: {
    dissolvedOxygenMgL: 7.8,
    pH: 6.8,
    waterTempC: 25.0,
    ammoniaPpm: 0.05,
    status: 'OPTIMAL'
  },
  feedingProtocol: 'Fed by aquaponic nitrifying overflow, harvested daily for chicken/fish feed'
}];
