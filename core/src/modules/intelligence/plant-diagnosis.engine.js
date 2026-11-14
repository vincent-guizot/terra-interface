"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deficiencyRemedies = void 0;
exports.diagnoseVisualDeficiency = diagnoseVisualDeficiency;
exports.deficiencyRemedies = {
    lower_interveinal: {
        leafZone: 'Lower Old Leaves',
        chlorosisType: 'Interveinal Yellowing',
        probableDeficiency: 'Magnesium (Mg)',
        organicHomesteadRemedy: 'Foliar spray of 1% Epsom salt (magnesium sulfate) or fermented banana stem juice (FPJ).',
        urgency: 'Suggested',
    },
    lower_marginal: {
        leafZone: 'Lower Old Leaves',
        chlorosisType: 'Marginal Scorching',
        probableDeficiency: 'Potassium (K)',
        organicHomesteadRemedy: 'Apply hardwood biochar ash leachate or fermented comfrey leaf extract around root zone.',
        urgency: 'Immediate',
    },
    lower_uniform: {
        leafZone: 'Lower Old Leaves',
        chlorosisType: 'Uniform Pale Yellow',
        probableDeficiency: 'Nitrogen (N)',
        organicHomesteadRemedy: 'Drench root zone with diluted aquaponic pond effluent (1:5) or aerated vermicompost tea.',
        urgency: 'Immediate',
    },
    upper_interveinal: {
        leafZone: 'Upper Young Leaves',
        chlorosisType: 'Interveinal Yellowing',
        probableDeficiency: 'Iron (Fe)',
        organicHomesteadRemedy: 'Apply chelated iron (DTPA/EDDHA) or iron-rich stinging nettle ferment foliar spray.',
        urgency: 'Suggested',
    },
    upper_marginal: {
        leafZone: 'Upper Young Leaves',
        chlorosisType: 'Marginal Scorching',
        probableDeficiency: 'Calcium (Ca)',
        organicHomesteadRemedy: 'Foliar application of Water-Soluble Calcium (WCA made from toasted eggshells + brown rice vinegar).',
        urgency: 'Immediate',
    },
    upper_uniform: {
        leafZone: 'Upper Young Leaves',
        chlorosisType: 'Uniform Pale Yellow',
        probableDeficiency: 'Iron (Fe)',
        organicHomesteadRemedy: 'Check rhizosphere pH (likely > 7.5 lockup). Acidify root drench with diluted bokashi tea.',
        urgency: 'Suggested',
    },
    entire_uniform: {
        leafZone: 'Entire Plant',
        chlorosisType: 'Uniform Pale Yellow',
        probableDeficiency: 'Nitrogen (N)',
        organicHomesteadRemedy: 'Immediate nitrogen boost: Top-dress with mature bokashi humus and blood meal / fish hydrolysate.',
        urgency: 'Immediate',
    },
    entire_interveinal: {
        leafZone: 'Entire Plant',
        chlorosisType: 'Interveinal Yellowing',
        probableDeficiency: 'Magnesium (Mg)',
        organicHomesteadRemedy: 'Drench soil with Epsom salt (15g/10L) and foliar spray at sundown.',
        urgency: 'Immediate',
    },
    entire_marginal: {
        leafZone: 'Entire Plant',
        chlorosisType: 'Marginal Scorching',
        probableDeficiency: 'Potassium (K)',
        organicHomesteadRemedy: 'Mulch heavily with comfrey chop-and-drop and drench with fermented fruit juice (FFJ).',
        urgency: 'Immediate',
    },
};
function diagnoseVisualDeficiency(leafZone, chlorosisType) {
    const zoneKey = leafZone === 'Lower Old Leaves' ? 'lower' : leafZone === 'Upper Young Leaves' ? 'upper' : 'entire';
    const typeKey = chlorosisType === 'Interveinal Yellowing'
        ? 'interveinal'
        : chlorosisType === 'Marginal Scorching'
            ? 'marginal'
            : 'uniform';
    const lookupKey = `${zoneKey}_${typeKey}`;
    return (exports.deficiencyRemedies[lookupKey] || {
        leafZone,
        chlorosisType,
        probableDeficiency: 'Nitrogen (N)',
        organicHomesteadRemedy: 'Apply balanced aerated compost tea and verify root oxygenation.',
        urgency: 'Suggested',
    });
}
