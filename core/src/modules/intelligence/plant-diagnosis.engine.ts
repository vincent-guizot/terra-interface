export interface VisualDeficiencySymptom {
  leafZone: 'Lower Old Leaves' | 'Upper Young Leaves' | 'Entire Plant';
  chlorosisType: 'Interveinal Yellowing' | 'Marginal Scorching' | 'Uniform Pale Yellow';
  probableDeficiency: 'Nitrogen (N)' | 'Iron (Fe)' | 'Potassium (K)' | 'Magnesium (Mg)' | 'Calcium (Ca)';
  organicHomesteadRemedy: string;
}

export const deficiencyRemedies: Record<string, VisualDeficiencySymptom> = {
  lower_interveinal: {
    leafZone: 'Lower Old Leaves',
    chlorosisType: 'Interveinal Yellowing',
    probableDeficiency: 'Magnesium (Mg)',
    organicHomesteadRemedy: 'Foliar spray of 1% Epsom salt (magnesium sulfate) or fermented banana stem juice.',
  },
  upper_interveinal: {
    leafZone: 'Upper Young Leaves',
    chlorosisType: 'Interveinal Yellowing',
    probableDeficiency: 'Iron (Fe)',
    organicHomesteadRemedy: 'Apply chelated iron or biochar-infused compost tea around root zone.',
  },
};
