export const ecologicalLoops = [{
  id: 'bsf-protein',
  name: 'Chicken Waste → BSF Maggot Bioconversion',
  color: '#F59E0B',
  metric: '14.0 kg waste → 2.4 kg live protein',
  description: 'Poultry manure and spent deep-litter bedding are diverted to the BSF House -> Hermetia illucens larvae digest biomass in 12 days -> 42% crude protein prepupae returned to hens as live feed.',
  steps: ['Chicken Coop (Manure & Bedding)', 'BSF / Maggot House (5-Tray Trays)', 'Live Prepupae Harvest', 'High-Protein Hen Feed']
}, {
  id: 'compost-soil',
  name: 'BSF Frass & Manure → Thermophilic Composting',
  color: '#059669',
  metric: '98.2% biomass circular diversion',
  description: 'BSF insect frass and collected goat/sheep manure pellets are combined with biochar and Bokashi inoculant -> 55-65°C aerobic composting -> Cured humus applied to TOGA Garden and Perimeter Fruit Trees.',
  steps: ['BSF Frass + Ruminant Droppings', 'Hot Compost Pile (55-65°C)', '30-Day Curing Humus', 'TOGA & Perimeter Fruit Guilds']
}, {
  id: 'water-consumers',
  name: 'Rainwater Storage → Homestead Consumers',
  color: '#0284C7',
  metric: '10,400 L stored • 30.5 days autonomy',
  description: '140 m² roof catchment water diverted through vortex first-flush and sand/biochar filter -> 12,000 L cisterns -> Gravity-fed to Hydroponic Garden, Carport Greenhouse, TOGA drip lines, and Livestock drinkers.',
  steps: ['Roof Monsoon Catchment', 'Vortex First-Flush Diverter', 'Central HDPE Cisterns', 'Hydroponics, Greenhouse, TOGA & Animals']
}, {
  id: 'aqua-hydro',
  name: 'Aquaponics & Hydroponics Closed Loop',
  color: '#10B981',
  metric: '250 L/day recirculation • 97.4% recovery',
  description: 'Fish excrete ammonia in bio-ponds -> Moving bed bio-filter (MBBR) converts NH3 into NO3 nitrates -> Nitrified water feeds vertical NFT hydroponic channels -> Purified water returns to fish sump.',
  steps: ['Tilapia Bio-Ponds (Ammonia)', 'Kaldnes K1 Bio-Filter (NO3-)', 'A-Frame Vertical NFT Beds', 'Purified Return Sump']
}];
