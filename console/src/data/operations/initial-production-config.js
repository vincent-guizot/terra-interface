export const initialProductionConfig = {
  types: [{
    id: 'type-crops',
    name: 'Vegetables & Leafy Greens',
    domain: 'Cultivation',
    defaultUnit: 'kg',
    icon: 'Grass'
  }, {
    id: 'type-fungi',
    name: 'Gourmet Mushrooms & Fungi',
    domain: 'Cultivation',
    defaultUnit: 'kg',
    icon: 'Spa'
  }, {
    id: 'type-poultry-eggs',
    name: 'Poultry Egg Production',
    domain: 'Livestock',
    defaultUnit: 'pcs',
    icon: 'Egg'
  }, {
    id: 'type-poultry-meat',
    name: 'Pastured Meat Birds',
    domain: 'Livestock',
    defaultUnit: 'birds',
    icon: 'Pets'
  }, {
    id: 'type-ruminants',
    name: 'Small Ruminants (Goat/Sheep)',
    domain: 'Livestock',
    defaultUnit: 'head',
    icon: 'Pets'
  }, {
    id: 'type-finfish',
    name: 'Freshwater Aquaculture',
    domain: 'Aquaculture',
    defaultUnit: 'kg',
    icon: 'SetMeal'
  }, {
    id: 'type-bsf',
    name: 'BSF Bioconversion Protein',
    domain: 'Circular',
    defaultUnit: 'kg',
    icon: 'Loop'
  }, {
    id: 'type-compost',
    name: 'Bokashi & Biochar Compost',
    domain: 'Circular',
    defaultUnit: 'kg',
    icon: 'Yard'
  }],
  measurementUnits: ['kg', 'g', 'pcs', 'liters', 'birds', 'head', 'trays', 'bags', 'bundles', 'm³', 'kWh'],
  customFields: [{
    id: 'cf-protein',
    name: 'Crude Protein (%)',
    appliesTo: ['Livestock', 'Circular'],
    type: 'number'
  }, {
    id: 'cf-brix',
    name: 'Brix Sugar Rating (°Bx)',
    appliesTo: ['Cultivation'],
    type: 'number'
  }, {
    id: 'cf-moisture',
    name: 'Substrate Moisture (%)',
    appliesTo: ['Cultivation', 'Circular'],
    type: 'number'
  }, {
    id: 'cf-fcr',
    name: 'Feed Conversion Ratio (FCR)',
    appliesTo: ['Aquaculture', 'Livestock'],
    type: 'number'
  }]
};
