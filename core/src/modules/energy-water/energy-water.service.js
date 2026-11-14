"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EnergyWaterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyWaterService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const battery_bms_service_1 = require("./battery-bms.service");
const autonomy_forecast_service_1 = require("./autonomy-forecast.service");
const cistern_levels_model_1 = require("./cistern-levels.model");
const prisma_service_1 = require("../../prisma/prisma.service");
let EnergyWaterService = EnergyWaterService_1 = class EnergyWaterService {
    constructor(prisma, bmsService, autonomyService) {
        this.prisma = prisma;
        this.bmsService = bmsService;
        this.autonomyService = autonomyService;
        this.logger = new common_1.Logger(EnergyWaterService_1.name);
        this.currentPolicy = {
            solarDumpMode: 'EVAPORATIVE_MISTING',
            rainwaterPriority: 'AQUAPONICS_FIRST',
            batteryFloorReservePercent: 20.0,
            stewardName: 'Vincent',
        };
        this.telemetrySubject = new rxjs_1.Subject();
        this.historicalBuffer = [];
        this.currentSnapshot = this.generateDiurnalReading(new Date());
        this.buildHistoricalBuffer();
    }
    onModuleInit() {
        this.logger.log('Microgrid & Energy-Water Telemetry Service initialized');
    }
    getLiveSnapshot() {
        return this.currentSnapshot;
    }
    getTelemetryStream() {
        return this.telemetrySubject.asObservable();
    }
    getDispatchPolicy() {
        return this.currentPolicy;
    }
    updateDispatchPolicy(dto) {
        this.currentPolicy = {
            ...this.currentPolicy,
            ...dto,
        };
        this.logger.log(`Dispatch policy updated: mode=${dto.solarDumpMode}, floor=${dto.batteryFloorReservePercent}%`);
        this.evaluateRulesAndAlerts(this.currentSnapshot);
        this.telemetrySubject.next({ data: this.currentSnapshot });
        return this.currentPolicy;
    }
    getHistoricalTelemetry(hours = 24) {
        return this.historicalBuffer.slice(-Math.min(hours, 24));
    }
    getDumpLoadStatus() {
        return this.currentSnapshot.dumpLoad;
    }
    async ingestTelemetry(dto) {
        const timestamp = dto.timestamp || new Date().toISOString();
        const batteryVoltage = dto.batteryVoltage || 51.2 + (dto.batterySoC - 50) * 0.04;
        const batteryCurrent = dto.batteryCurrentAmps ?? (dto.solarGenerationKw * 1000 - dto.inverterLoadWatts) / 51.2;
        const bmsEvaluation = this.bmsService.evaluatePackHealth({
            packVoltageV: batteryVoltage,
            packCurrentA: batteryCurrent,
            socPercent: dto.batterySoC,
            cellVoltagesV: new Array(16).fill(batteryVoltage / 16),
            maxCellDeltaV: 0.012,
            temperatureC: 28.5,
            cycleCount: 214,
        });
        const autonomyHrs = this.autonomyService.calculatePowerAutonomyHours(15.3, dto.batterySoC, Math.max(0.4, dto.inverterLoadWatts / 1000));
        const waterDays = this.autonomyService.calculateWaterAutonomyDays(dto.cisternLevelLiters, 450, 0);
        const totalCisternCapacity = 12000;
        const cisternPercent = Math.min(100, Math.round((dto.cisternLevelLiters / totalCisternCapacity) * 1000) / 10);
        const tanks = [
            {
                tankId: 'tnk-1',
                tankName: 'Cistern #1 (Clean Potable & Nursery)',
                capacityLiters: 4000,
                currentLiters: Math.round(dto.cisternLevelLiters * 0.38),
                percentFull: Math.round((dto.cisternLevelLiters * 0.38 / 4000) * 1000) / 10,
                tdsPpm: 36,
            },
            {
                tankId: 'tnk-2',
                tankName: 'Cistern #2 (Biochar Slow Sand Clarifier)',
                capacityLiters: 4000,
                currentLiters: Math.round(dto.cisternLevelLiters * 0.34),
                percentFull: Math.round((dto.cisternLevelLiters * 0.34 / 4000) * 1000) / 10,
                tdsPpm: 44,
            },
            {
                tankId: 'tnk-3',
                tankName: 'Cistern #3 (Gravity Header Supply)',
                capacityLiters: 4000,
                currentLiters: Math.round(dto.cisternLevelLiters * 0.28),
                percentFull: Math.round((dto.cisternLevelLiters * 0.28 / 4000) * 1000) / 10,
                tdsPpm: 40,
            },
        ];
        const snapshot = {
            timestamp,
            solarGenerationKw: dto.solarGenerationKw,
            inverterLoadWatts: dto.inverterLoadWatts,
            gridImportWatts: 0,
            batterySoC: dto.batterySoC,
            batteryVoltage: Math.round(batteryVoltage * 10) / 10,
            batteryCurrentAmps: Math.round(batteryCurrent * 10) / 10,
            batteryHealthStatus: bmsEvaluation.healthStatus,
            autonomyHours: autonomyHrs,
            cisternTotalLiters: dto.cisternLevelLiters,
            cisternCapacityLiters: totalCisternCapacity,
            cisternPercentFull: cisternPercent,
            waterAutonomyDays: waterDays,
            cisternTanks: tanks,
            dissolvedOxygenMgL: dto.dissolvedOxygenMgL ?? this.currentSnapshot.dissolvedOxygenMgL,
            pH: dto.pH ?? this.currentSnapshot.pH,
            waterTemperatureC: dto.waterTemperatureC ?? this.currentSnapshot.waterTemperatureC,
            ambientIrradianceWPerM2: dto.ambientIrradianceWPerM2 ?? Math.round((dto.solarGenerationKw / 5.2) * 1000),
            loadSheddingActive: false,
            dumpLoad: {
                isActive: false,
                targetAppliance: this.currentPolicy.solarDumpMode,
                excessSolarKw: 0,
                runtimeMinutes: 0,
                reason: 'Normal operation',
            },
            alerts: [],
        };
        this.evaluateRulesAndAlerts(snapshot);
        this.currentSnapshot = snapshot;
        try {
            const zone5 = await this.prisma.zone.findFirst({ where: { code: 'Z-05' } });
            if (zone5) {
                await this.prisma.telemetryReading.create({
                    data: {
                        zoneId: zone5.id,
                        metric: 'SOLAR_KW',
                        value: dto.solarGenerationKw,
                        unit: 'kW',
                    },
                });
            }
        }
        catch (err) {
        }
        this.telemetrySubject.next({ data: snapshot });
        return snapshot;
    }
    evaluateRulesAndAlerts(snapshot) {
        const alerts = [];
        if (snapshot.batterySoC < this.currentPolicy.batteryFloorReservePercent) {
            snapshot.loadSheddingActive = true;
            alerts.push({
                id: `alert-bat-low-${Date.now()}`,
                severity: 'CRITICAL',
                category: 'BATTERY',
                title: 'Critical Low Battery SoC (<20%)',
                message: `Battery level is at ${snapshot.batterySoC}%, below safe reserve floor (${this.currentPolicy.batteryFloorReservePercent}%). Non-essential homestead circuits shed.`,
                parameterValue: `${snapshot.batterySoC}% SoC`,
                timestamp: new Date().toISOString(),
                actionRequired: true,
            });
        }
        else {
            snapshot.loadSheddingActive = false;
        }
        const excessSolar = Math.max(0, snapshot.solarGenerationKw - snapshot.inverterLoadWatts / 1000);
        if (snapshot.batterySoC >= 95.0 && excessSolar >= 2.0) {
            snapshot.dumpLoad = {
                isActive: true,
                targetAppliance: this.currentPolicy.solarDumpMode,
                excessSolarKw: Math.round(excessSolar * 10) / 10,
                runtimeMinutes: 25,
                reason: `Excess solar generation (${Math.round(excessSolar * 10) / 10} kW) with full battery (95%+)`,
            };
            alerts.push({
                id: `alert-dump-active-${Date.now()}`,
                severity: 'INFO',
                category: 'SOLAR',
                title: 'Excess Solar Dump Load Active',
                message: `Directing ${snapshot.dumpLoad.excessSolarKw} kW surplus power to ${snapshot.dumpLoad.targetAppliance}.`,
                parameterValue: `${snapshot.dumpLoad.excessSolarKw} kW Surplus`,
                timestamp: new Date().toISOString(),
                actionRequired: false,
            });
        }
        else {
            snapshot.dumpLoad = {
                isActive: false,
                targetAppliance: this.currentPolicy.solarDumpMode,
                excessSolarKw: Math.round(excessSolar * 10) / 10,
                runtimeMinutes: 0,
                reason: 'Normal balance',
            };
        }
        if (snapshot.cisternTotalLiters < 2000) {
            alerts.push({
                id: `alert-water-low-${Date.now()}`,
                severity: 'WARNING',
                category: 'WATER',
                title: 'Low Rainwater Storage (< 2,000 L)',
                message: `Rainwater reserve at ${snapshot.cisternTotalLiters} L (< 16.7% capacity). Switch living soil beds to deep mulching conservation mode.`,
                parameterValue: `${snapshot.cisternTotalLiters} L`,
                timestamp: new Date().toISOString(),
                actionRequired: true,
            });
        }
        if (snapshot.dissolvedOxygenMgL < 5.0) {
            alerts.push({
                id: `alert-do-critical-${Date.now()}`,
                severity: 'CRITICAL',
                category: 'AQUACULTURE',
                title: 'Low Dissolved Oxygen Alert (< 5.0 mg/L)',
                message: `Zone 2 Bio-Pond DO dropped to ${snapshot.dissolvedOxygenMgL} mg/L. Venturi air injection pump triggered automatically.`,
                parameterValue: `${snapshot.dissolvedOxygenMgL} mg/L`,
                timestamp: new Date().toISOString(),
                actionRequired: true,
            });
        }
        snapshot.alerts = alerts;
    }
    generateDiurnalReading(now = new Date()) {
        const hour = now.getHours() + now.getMinutes() / 60;
        let solarKw = 0;
        if (hour >= 6.0 && hour <= 18.0) {
            const sunAngle = ((hour - 6.0) / 12.0) * Math.PI;
            solarKw = Math.round(Math.sin(sunAngle) * 4.9 * 100) / 100;
        }
        let loadW = 550;
        if (hour >= 7.0 && hour <= 16.0) {
            loadW = 850;
        }
        else if (hour > 16.0 && hour <= 21.0) {
            loadW = 1150;
        }
        let batterySoC = 88.0;
        if (hour < 6.0) {
            batterySoC = Math.max(62.0, 75.0 - hour * 2.2);
        }
        else if (hour <= 13.0) {
            batterySoC = Math.min(98.0, 62.0 + (hour - 6.0) * 5.1);
        }
        else if (hour <= 17.0) {
            batterySoC = 96.0;
        }
        else {
            batterySoC = Math.max(72.0, 96.0 - (hour - 17.0) * 4.0);
        }
        batterySoC = Math.round(batterySoC * 10) / 10;
        const batteryVoltage = Math.round((51.2 + (batterySoC - 50) * 0.04) * 10) / 10;
        const netPowerWatts = solarKw * 1000 - loadW;
        const batteryCurrent = Math.round((netPowerWatts / batteryVoltage) * 10) / 10;
        const cisternLiters = 10400;
        const snapshot = {
            timestamp: now.toISOString(),
            solarGenerationKw: solarKw,
            inverterLoadWatts: loadW,
            gridImportWatts: 0,
            batterySoC,
            batteryVoltage,
            batteryCurrentAmps: batteryCurrent,
            batteryHealthStatus: 'OPTIMAL',
            autonomyHours: Math.round(((batterySoC / 100) * 15.3 / (loadW / 1000)) * 10) / 10,
            cisternTotalLiters: cisternLiters,
            cisternCapacityLiters: 12000,
            cisternPercentFull: 86.7,
            waterAutonomyDays: 23.1,
            cisternTanks: cistern_levels_model_1.homesteadCisternConfig,
            dissolvedOxygenMgL: 6.8,
            pH: 7.2,
            waterTemperatureC: 26.5,
            ambientIrradianceWPerM2: Math.round((solarKw / 5.2) * 1000),
            loadSheddingActive: false,
            dumpLoad: {
                isActive: false,
                targetAppliance: this.currentPolicy.solarDumpMode,
                excessSolarKw: 0,
                runtimeMinutes: 0,
                reason: 'Normal balance',
            },
            alerts: [],
        };
        this.evaluateRulesAndAlerts(snapshot);
        return snapshot;
    }
    buildHistoricalBuffer() {
        this.historicalBuffer = [];
        const now = new Date();
        for (let i = 23; i >= 0; i--) {
            const pastTime = new Date(now.getTime() - i * 3600 * 1000);
            const hourVal = pastTime.getHours();
            let pastSolar = 0;
            if (hourVal >= 6 && hourVal <= 18) {
                pastSolar = Math.round(Math.sin(((hourVal - 6) / 12) * Math.PI) * 4.6 * 10) / 10;
            }
            const pastLoad = hourVal >= 17 && hourVal <= 21 ? 1.15 : hourVal >= 8 && hourVal <= 16 ? 0.85 : 0.52;
            const pastSoc = hourVal >= 12 && hourVal <= 16 ? 96 : hourVal < 6 ? 65 : 82;
            this.historicalBuffer.push({
                hour: `${pastTime.getHours().toString().padStart(2, '0')}:00`,
                solarKw: pastSolar,
                loadKw: pastLoad,
                batterySoC: pastSoc,
                cisternLiters: 10400 - i * 15,
            });
        }
    }
};
exports.EnergyWaterService = EnergyWaterService;
exports.EnergyWaterService = EnergyWaterService = EnergyWaterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        battery_bms_service_1.BatteryBmsService,
        autonomy_forecast_service_1.AutonomyForecastService])
], EnergyWaterService);
