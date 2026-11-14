"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularModule = void 0;
const common_1 = require("@nestjs/common");
const circular_controller_1 = require("./circular.controller");
const circular_service_1 = require("./circular.service");
const maggot_harvest_service_1 = require("./maggot-harvest.service");
const inventory_module_1 = require("../inventory/inventory.module");
const prisma_service_1 = require("../../prisma/prisma.service");
let CircularModule = class CircularModule {
};
exports.CircularModule = CircularModule;
exports.CircularModule = CircularModule = __decorate([
    (0, common_1.Module)({
        imports: [inventory_module_1.InventoryModule],
        controllers: [circular_controller_1.CircularController],
        providers: [circular_service_1.CircularService, maggot_harvest_service_1.MaggotHarvestService, prisma_service_1.PrismaService],
        exports: [circular_service_1.CircularService, maggot_harvest_service_1.MaggotHarvestService],
    })
], CircularModule);
