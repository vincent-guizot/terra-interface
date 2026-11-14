"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUniversalBatches = seedUniversalBatches;
const client_1 = require("@prisma/client");
async function seedUniversalBatches(prisma, zones) {
    console.log('🔄 Seeding Universal Batches with Multi-Harvest Outputs & Audit Logs...');
    const zoneMap = {};
    zones.forEach((z) => { zoneMap[z.code] = z.id; });
    const batches = [
        {
            batchCode: 'BAT-2026-CUL-01',
            name: 'Spring Greenhouse Bok Choy NFT',
            domain: 'CULTIVATION',
            zoneCode: 'Z-01',
            status: client_1.BatchStatus.ACTIVE,
            startDate: new Date('2026-10-22'),
            expectedEndDate: new Date('2026-11-20'),
            initialQuantity: 120.0,
            currentQuantity: 95.0,
            measurementUnit: 'heads',
            notes: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected under insect screen.',
            outputs: [
                { productName: 'Bok Choy Grade A', quantity: 14.5, measurementUnit: 'kg', qualityGrade: 'Grade A', destination: 'Homestead Kitchen' },
                { productName: 'Bok Choy Grade A (Cut 2)', quantity: 12.0, measurementUnit: 'kg', qualityGrade: 'Grade A', destination: 'Cold Cellar Storage' },
            ],
            auditLogs: [
                { action: 'Universal Batch Created', details: 'Initial transplant of 120 heads into NFT gullies', performedBy: 'Vincent' },
                { action: 'First Cut Harvest Recorded', details: '14.5 kg harvested from channel Alpha', performedBy: 'Vincent' },
            ],
        },
        {
            batchCode: 'BAT-2026-AQU-01',
            name: 'Monosex Nile Tilapia Finishing Cohort',
            domain: 'AQUACULTURE',
            zoneCode: 'Z-02',
            status: client_1.BatchStatus.ACTIVE,
            startDate: new Date('2026-08-15'),
            expectedEndDate: new Date('2026-11-28'),
            initialQuantity: 450.0,
            currentQuantity: 442.0,
            measurementUnit: 'fingerlings',
            notes: '450g average target size. Fed 32% CP pellets and duckweed from nitrifying gravel bed.',
            outputs: [
                { productName: 'Nile Tilapia (Table Size)', quantity: 18.5, measurementUnit: 'kg', qualityGrade: 'Prime Table Size', destination: 'Homestead Freezer' },
            ],
            auditLogs: [
                { action: 'Batch Stocked', details: '450 graded fingerlings introduced into Pond Alpha', performedBy: 'Vincent' },
                { action: 'Sample Biometrics Taken', details: 'Average weight sampled at 440g with FCR 1.25', performedBy: 'Vincent' },
            ],
        },
        {
            batchCode: 'BAT-2026-LIV-01',
            name: 'Ayam KUB Layer Flock Season 2',
            domain: 'LIVESTOCK',
            zoneCode: 'Z-03',
            status: client_1.BatchStatus.ACTIVE,
            startDate: new Date('2026-05-10'),
            expectedEndDate: new Date('2027-05-10'),
            initialQuantity: 24.0,
            currentQuantity: 24.0,
            measurementUnit: 'birds',
            notes: 'Deep litter bedding coop supplemented with live BSF larvae daily.',
            outputs: [
                { productName: 'Fresh Pastured Eggs', quantity: 21.0, measurementUnit: 'pcs', qualityGrade: 'Grade A', destination: 'Daily Homestead Consumption' },
                { productName: 'Fresh Pastured Eggs', quantity: 22.0, measurementUnit: 'pcs', qualityGrade: 'Grade A', destination: 'Daily Homestead Consumption' },
            ],
            auditLogs: [
                { action: 'Flock Housed', details: '24 point-of-lay pullets installed in Zone 3 coop', performedBy: 'Vincent' },
            ],
        },
        {
            batchCode: 'BAT-2026-CMP-12',
            name: 'High-Nitrogen Bokashi Composting #12',
            domain: 'CIRCULAR',
            zoneCode: 'Z-04',
            status: client_1.BatchStatus.ACTIVE,
            startDate: new Date('2026-10-15'),
            expectedEndDate: new Date('2026-11-25'),
            initialQuantity: 250.0,
            currentQuantity: 190.0,
            measurementUnit: 'kg biomass',
            notes: '40% poultry litter, 30% bamboo foliage, 20% biochar, 10% EM4 Bokashi bran.',
            outputs: [
                { productName: 'Mature Bokashi Humus', quantity: 60.0, measurementUnit: 'kg', qualityGrade: 'Rich Living Compost', destination: 'Keyhole Raised Bed #1' },
            ],
            auditLogs: [
                { action: 'Pile Inoculated', details: 'EM4 anaerobic starter applied with moisture tuned to 55%', performedBy: 'Vincent' },
                { action: 'Thermophilic Turn', details: 'Core temperature reached 62°C', performedBy: 'Vincent' },
            ],
        },
    ];
    for (const b of batches) {
        const zoneId = zoneMap[b.zoneCode];
        if (zoneId) {
            await prisma.batch.upsert({
                where: { batchCode: b.batchCode },
                update: {
                    name: b.name,
                    domain: b.domain,
                    status: b.status,
                    currentQuantity: b.currentQuantity,
                    notes: b.notes,
                },
                create: {
                    batchCode: b.batchCode,
                    name: b.name,
                    domain: b.domain,
                    zoneId,
                    status: b.status,
                    startDate: b.startDate,
                    expectedEndDate: b.expectedEndDate,
                    initialQuantity: b.initialQuantity,
                    currentQuantity: b.currentQuantity,
                    measurementUnit: b.measurementUnit,
                    notes: b.notes,
                    outputs: {
                        create: b.outputs,
                    },
                    auditLogs: {
                        create: b.auditLogs,
                    },
                },
            });
        }
    }
}
