"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterEcologicalRules = void 0;
exports.masterEcologicalRules = [
    {
        id: 'eco-rule-01',
        domain: 'Nitrogen Cycling',
        triggerCondition: 'Pond nitrate concentration > 40 ppm',
        inference: 'Vegetative nitrogen uptake in NFT beds is lagging behind fish bioconversion.',
        recommendedAction: 'Divert 20% more effluent stream to fast-growing kangkung and watercress gravel beds.',
    },
    {
        id: 'eco-rule-02',
        domain: 'Solar Optimization',
        triggerCondition: 'Battery SoC > 90% between 11:00 and 14:00',
        inference: 'Solar generation exceeds absorption headroom by ~4 kWh.',
        recommendedAction: 'Auto-activate mushroom dehydrator and pump water to elevated header tank.',
    }
];
