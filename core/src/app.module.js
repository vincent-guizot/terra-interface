"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const universal_batch_module_1 = require("./modules/universal-batch/universal-batch.module");
const spatial_module_1 = require("./modules/spatial/spatial.module");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const cultivation_module_1 = require("./modules/cultivation/cultivation.module");
const livestock_module_1 = require("./modules/livestock/livestock.module");
const aquaculture_module_1 = require("./modules/aquaculture/aquaculture.module");
const circular_module_1 = require("./modules/circular/circular.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const energy_water_module_1 = require("./modules/energy-water/energy-water.module");
const intelligence_module_1 = require("./modules/intelligence/intelligence.module");
const prisma_service_1 = require("./prisma/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            universal_batch_module_1.UniversalBatchModule,
            spatial_module_1.SpatialModule,
            catalog_module_1.CatalogModule,
            cultivation_module_1.CultivationModule,
            livestock_module_1.LivestockModule,
            aquaculture_module_1.AquacultureModule,
            circular_module_1.CircularModule,
            inventory_module_1.InventoryModule,
            energy_water_module_1.EnergyWaterModule,
            intelligence_module_1.IntelligenceModule,
        ],
        controllers: [],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
