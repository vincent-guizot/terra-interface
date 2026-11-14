export interface ActionableRecommendation {
  id: string;
  category: 'Irrigation' | 'Soil' | 'Livestock Feed' | 'Energy Storage' | 'Circular' | 'Microclimate';
  priority: 'Immediate' | 'Suggested' | 'Informational';
  actionTitle: string;
  targetZone: string;
  expectedBenefit: string;
  automatedDispatchable: boolean;
  status: 'PENDING' | 'APPLIED' | 'DISMISSED';
  createdAt: string;
}

export const defaultRecommendationsQueue: ActionableRecommendation[] = [
  {
    id: 'rec-01',
    category: 'Soil',
    priority: 'Immediate',
    actionTitle: 'Inoculate Keyhole Bed #2 with bush beans post-harvest',
    targetZone: 'Zone 4: Permaculture Beds',
    expectedBenefit: 'Natural biological nitrogen fixation +30g N/m² for succeeding brassica crops',
    automatedDispatchable: false,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec-02',
    category: 'Energy Storage',
    priority: 'Suggested',
    actionTitle: 'Pre-cool mushroom storage chamber with solar surplus',
    targetZone: 'Zone 7: Eco-Living Quarters & Lab',
    expectedBenefit: 'Shifts 1.2 kWh of nighttime grid load to daytime solar peak',
    automatedDispatchable: true,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec-03',
    category: 'Livestock Feed',
    priority: 'Suggested',
    actionTitle: 'Supplement Layer Flock with 2.5 kg live BSF prepupae',
    targetZone: 'Zone 3: Micro-Livestock Haven',
    expectedBenefit: 'Boosts crude protein intake to 42% and elevates eggshell calcium assimilation',
    automatedDispatchable: false,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec-04',
    category: 'Circular',
    priority: 'Immediate',
    actionTitle: 'Aerate Bokashi Pile #1: Turn thermophilic core',
    targetZone: 'Zone 6: Circular Biomass & Energy Hub',
    expectedBenefit: 'Prevents anaerobic thermal stall; ensures weed seed destruction at 62°C',
    automatedDispatchable: false,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec-05',
    category: 'Irrigation',
    priority: 'Informational',
    actionTitle: 'Backwash vortex rainwater pre-filter before monsoon downpour',
    targetZone: 'Zone 5: Water Harvesting Spine',
    expectedBenefit: 'Maximizes clean rainwater catchment yield (estimated +2,140 L today)',
    automatedDispatchable: false,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
];
