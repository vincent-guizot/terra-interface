export const deficiencyRemedies = {
  lower_interveinal: {
    leafZone: 'Lower Old Leaves',
    chlorosisType: 'Interveinal Yellowing',
    probableDeficiency: 'Magnesium (Mg)',
    organicHomesteadRemedy: 'Foliar spray of 1% Epsom salt (magnesium sulfate) or fermented banana stem juice (FPJ).',
    urgency: 'Suggested'
  },
  lower_marginal: {
    leafZone: 'Lower Old Leaves',
    chlorosisType: 'Marginal Scorching',
    probableDeficiency: 'Potassium (K)',
    organicHomesteadRemedy: 'Apply hardwood biochar ash leachate or fermented comfrey leaf extract around root zone.',
    urgency: 'Immediate'
  },
  lower_uniform: {
    leafZone: 'Lower Old Leaves',
    chlorosisType: 'Uniform Pale Yellow',
    probableDeficiency: 'Nitrogen (N)',
    organicHomesteadRemedy: 'Drench root zone with diluted aquaponic pond effluent (1:5) or aerated vermicompost tea.',
    urgency: 'Immediate'
  },
  upper_interveinal: {
    leafZone: 'Upper Young Leaves',
    chlorosisType: 'Interveinal Yellowing',
    probableDeficiency: 'Iron (Fe)',
    organicHomesteadRemedy: 'Apply chelated iron (DTPA/EDDHA) or iron-rich stinging nettle ferment foliar spray.',
    urgency: 'Suggested'
  },
  upper_marginal: {
    leafZone: 'Upper Young Leaves',
    chlorosisType: 'Marginal Scorching',
    probableDeficiency: 'Calcium (Ca)',
    organicHomesteadRemedy: 'Foliar application of Water-Soluble Calcium (WCA made from toasted eggshells + brown rice vinegar).',
    urgency: 'Immediate'
  },
  upper_uniform: {
    leafZone: 'Upper Young Leaves',
    chlorosisType: 'Uniform Pale Yellow',
    probableDeficiency: 'Sulfur (S) or Iron (Fe)',
    organicHomesteadRemedy: 'Rhizosphere check. Drench root zone with aerated compost tea.',
    urgency: 'Suggested'
  },
  entire_uniform: {
    leafZone: 'Entire Plant',
    chlorosisType: 'Uniform Pale Yellow',
    probableDeficiency: 'Nitrogen (N)',
    differentialDiagnosis: 'Root hypoxia',
    organicHomesteadRemedy: 'Verify root oxygenation and drainage; supplement with fish amino acid ferment (FAA).',
    urgency: 'Immediate'
  }
};
export function diagnoseVisualDeficiency(leafZone, chlorosisType) {
  const key = `${leafZone.toLowerCase().includes('lower') ? 'lower' : leafZone.toLowerCase().includes('upper') ? 'upper' : 'entire'}_${chlorosisType.toLowerCase().includes('interveinal') ? 'interveinal' : chlorosisType.toLowerCase().includes('marginal') ? 'marginal' : 'uniform'}`;
  return deficiencyRemedies[key] || deficiencyRemedies.lower_uniform;
}
export default {
  deficiencyRemedies,
  diagnoseVisualDeficiency
};
