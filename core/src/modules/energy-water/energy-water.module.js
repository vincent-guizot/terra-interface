"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyWaterModule = void 0;
const common_1 = require("@nestjs/common");
const energy_water_controller_1 = require("./energy-water.controller");
const energy_water_service_1 = require("./energy-water.service");
const battery_bms_service_1 = require("./battery-bms.service");
const autonomy_forecast_service_1 = require("./autonomy-forecast.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let EnergyWaterModule = class EnergyWaterModule {
};
exports.EnergyWaterModule = EnergyWaterModule;
exports.EnergyWaterModule = EnergyWaterModule = __decorate([
    (0, common_1.Module)({
        controllers: [energy_water_controller_1.EnergyWaterController],
        providers: [
            energy_water_service_1.EnergyWaterService,
            battery_bms_service_1.BatteryBmsService,
            autonomy_forecast_service_1.AutonomyForecastService,
            prisma_service_1.PrismaService,
        ],
        exports: [energy_water_service_1.EnergyWaterService, battery_bms_service_1.BatteryBmsService, autonomy_forecast_service_1.AutonomyForecastService],
    })
], EnergyWaterModule);
