"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProductionTypes = seedProductionTypes;
async function seedProductionTypes(prisma, homesteadId) {
    console.log('🌾 Seeding Configurable Production Types & Custom Field Schemas...');
    const types = [
        {
            name: 'Hydroponic Leafy Greens & Brassicas',
            domain: 'CULTIVATION',
            defaultUnit: 'kg',
            customFields: [
                { fieldName: 'Electrical Conductivity (EC mS/cm)', fieldType: 'NUMBER', isRequired: true },
                { fieldName: 'Solution pH', fieldType: 'NUMBER', isRequired: true },
            ],
        },
        {
            name: 'Gourmet Mushrooms & Fungi',
            domain: 'CULTIVATION',
            defaultUnit: 'kg',
            customFields: [
                { fieldName: 'Substrate Moisture %', fieldType: 'NUMBER', isRequired: true },
                { fieldName: 'Flush Number', fieldType: 'NUMBER', isRequired: false },
            ],
        },
        {
            name: 'Pastured Dual-Purpose Poultry',
            domain: 'LIVESTOCK',
            defaultUnit: 'pcs',
            customFields: [
                { fieldName: 'Hen-Day Production %', fieldType: 'NUMBER', isRequired: true },
                { fieldName: 'Average Egg Weight (g)', fieldType: 'NUMBER', isRequired: false },
            ],
        },
        {
            name: 'Recirculating Aquaculture Finfish',
            domain: 'AQUACULTURE',
            defaultUnit: 'kg',
            customFields: [
                { fieldName: 'Average Body Weight (g)', fieldType: 'NUMBER', isRequired: true },
                { fieldName: 'Feed Conversion Ratio (FCR)', fieldType: 'NUMBER', isRequired: false },
            ],
        },
        {
            name: 'Black Soldier Fly Insect Protein',
            domain: 'CIRCULAR',
            defaultUnit: 'kg',
            customFields: [
                { fieldName: 'Bioconversion Efficiency %', fieldType: 'NUMBER', isRequired: true },
                { fieldName: 'Crude Protein %', fieldType: 'NUMBER', isRequired: false },
            ],
        },
        {
            name: 'Thermophilic Bokashi Compost',
            domain: 'CIRCULAR',
            defaultUnit: 'kg',
            customFields: [
                { fieldName: 'Peak Core Temperature (°C)', fieldType: 'NUMBER', isRequired: true },
                { fieldName: 'Maturity Solvita Index', fieldType: 'NUMBER', isRequired: false },
            ],
        },
    ];
    const seededTypes = [];
    for (const t of types) {
        let pType = await prisma.productionType.findFirst({
            where: { name: t.name, homesteadId },
        });
        if (!pType) {
            pType = await prisma.productionType.create({
                data: {
                    name: t.name,
                    domain: t.domain,
                    defaultUnit: t.defaultUnit,
                    homesteadId,
                    customFields: {
                        create: t.customFields,
                    },
                },
            });
        }
        seededTypes.push(pType);
    }
    return seededTypes;
}
