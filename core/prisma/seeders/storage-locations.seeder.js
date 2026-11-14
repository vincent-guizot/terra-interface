"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedStorageAndInventory = seedStorageAndInventory;
async function seedStorageAndInventory(prisma, homesteadId) {
    console.log('📦 Seeding Storage Locations and Master Inventory Catalog...');
    const locations = [
        { name: 'Homestead Tool & Feed Shed A', type: 'Dry Ambient (26°C)', capacityInfo: 'Dry goods, feeds, tools' },
        { name: 'Eco-Living Cold Cellar', type: 'Refrigerated Cold Store (4°C)', capacityInfo: '800 L storage' },
        { name: 'Seed Preservation Vault', type: 'Airtight Desiccated (16°C)', capacityInfo: '120 Glass heirloom jars' },
        { name: 'Biological Inoculant Rack', type: 'Shaded Ambient (22°C)', capacityInfo: 'Microbial cultures' },
    ];
    const seededLocations = {};
    for (const loc of locations) {
        let sl = await prisma.storageLocation.findFirst({
            where: { name: loc.name, homesteadId },
        });
        if (!sl) {
            sl = await prisma.storageLocation.create({
                data: {
                    name: loc.name,
                    type: loc.type,
                    capacityInfo: loc.capacityInfo,
                    homesteadId,
                },
            });
        }
        seededLocations[loc.name] = sl.id;
    }
    const items = [
        { sku: 'SKU-FEE-01', name: 'High-Protein Aquaculture Pellets (32% CP)', category: 'Feed & Nutrition', location: 'Homestead Tool & Feed Shed A', inStock: 75.0, unit: 'kg', minThreshold: 25.0 },
        { sku: 'SKU-SEE-01', name: 'Heirloom Lacinato Kale Seeds', category: 'Seed Bank', location: 'Seed Preservation Vault', inStock: 12.0, unit: 'packs', minThreshold: 3.0 },
        { sku: 'SKU-BIO-01', name: 'EM4 Microbial Inoculant Culture', category: 'Biologicals', location: 'Biological Inoculant Rack', inStock: 6.0, unit: 'liters', minThreshold: 2.0 },
        { sku: 'SKU-MIN-01', name: 'Agricultural Horticultural Lime (CaCO3)', category: 'Soil & Water Amendments', location: 'Homestead Tool & Feed Shed A', inStock: 40.0, unit: 'kg', minThreshold: 15.0 },
        { sku: 'SKU-FOO-01', name: 'Frozen Nile Tilapia Clean Fillets', category: 'Homestead Food Pantry', location: 'Eco-Living Cold Cellar', inStock: 22.5, unit: 'kg', minThreshold: 10.0 },
    ];
    for (const item of items) {
        const locId = seededLocations[item.location];
        if (locId) {
            await prisma.inventoryItem.upsert({
                where: { sku: item.sku },
                update: {
                    name: item.name,
                    category: item.category,
                    inStock: item.inStock,
                    unit: item.unit,
                    minThreshold: item.minThreshold,
                    locationId: locId,
                },
                create: {
                    sku: item.sku,
                    name: item.name,
                    category: item.category,
                    inStock: item.inStock,
                    unit: item.unit,
                    minThreshold: item.minThreshold,
                    locationId: locId,
                    homesteadId,
                },
            });
        }
    }
}
