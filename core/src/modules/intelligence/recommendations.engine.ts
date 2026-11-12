export interface ActionableRecommendation {
  id: string;
  category: 'Irrigation' | 'Soil' | 'Livestock Feed' | 'Energy Storage';
  priority: 'Immediate' | 'Suggested' | 'Informational';
  actionTitle: string;
  targetZone: string;
  expectedBenefit: string;
  automatedDispatchable: boolean;
}

export const activeRecommendationsQueue: ActionableRecommendation[] = [
  {
    id: 'rec-01',
    category: 'Soil',
    priority: 'Immediate',
    actionTitle: 'Inoculate Keyhole Bed #2 with bush beans post-harvest',
    targetZone: 'Zone 4: Permaculture Beds',
    expectedBenefit: 'Natural biological nitrogen fixation +30g N/m2 for succeeding crop',
    automatedDispatchable: false,
  },
  {
    id: 'rec-02',
    category: 'Energy Storage',
    priority: 'Suggested',
    actionTitle: 'Pre-cool mushroom storage chamber with solar surplus',
    targetZone: 'Zone 7: Eco-Living Quarters & Lab',
    expectedBenefit: 'Shifts 1.2 kWh of nighttime grid load to daytime solar peak',
    automatedDispatchable: true,
  }
];
