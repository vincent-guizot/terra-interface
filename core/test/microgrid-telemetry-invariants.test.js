"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const energy_water_service_1 = require("../src/modules/energy-water/energy-water.service");
const battery_bms_service_1 = require("../src/modules/energy-water/battery-bms.service");
const autonomy_forecast_service_1 = require("../src/modules/energy-water/autonomy-forecast.service");
async function testMicrogridTelemetryInvariants() {
    console.log('🧪 Running Microgrid Telemetry & Protection Rules Invariant Tests...');
    const mockPrisma = {
        zone: { findFirst: async () => ({ id: 'zone-05-id' }) },
        telemetryReading: { create: async () => null },
    };
    const bmsService = new battery_bms_service_1.BatteryBmsService();
    const autonomyService = new autonomy_forecast_service_1.AutonomyForecastService();
    const service = new energy_water_service_1.EnergyWaterService(mockPrisma, bmsService, autonomyService);
    const normalPacket = await service.ingestTelemetry({
        sensorDeviceId: 'ESP32-ZONE-05-ENERGY',
        solarGenerationKw: 3.8,
        inverterLoadWatts: 850,
        batterySoC: 75.0,
        batteryVoltage: 52.5,
        cisternLevelLiters: 9500,
        dissolvedOxygenMgL: 6.8,
        pH: 7.2,
        waterTemperatureC: 26.5,
    });
    if (normalPacket.solarGenerationKw !== 3.8 || normalPacket.batterySoC !== 75.0) {
        throw new Error('Telemetry ingestion snapshot mismatch');
    }
    if (normalPacket.loadSheddingActive !== false) {
        throw new Error('Load shedding should be inactive under normal conditions');
    }
    console.log('  ✔ Telemetry ingestion and multivariate snapshot verified');
    const lowBatteryPacket = await service.ingestTelemetry({
        sensorDeviceId: 'ESP32-ZONE-05-ENERGY',
        solarGenerationKw: 0.0,
        inverterLoadWatts: 700,
        batterySoC: 17.5,
        batteryVoltage: 48.2,
        cisternLevelLiters: 8000,
        dissolvedOxygenMgL: 6.5,
    });
    if (!lowBatteryPacket.loadSheddingActive) {
        throw new Error('Load shedding should be active when battery SoC is 17.5% (<20%)');
    }
    const batAlert = lowBatteryPacket.alerts.find((a) => a.category === 'BATTERY' && a.severity === 'CRITICAL');
    if (!batAlert) {
        throw new Error('Expected critical low battery alert');
    }
    console.log('  ✔ Invariant 1: Battery SoC < 20% triggers Critical Alert & Load Shedding');
    const surplusPacket = await service.ingestTelemetry({
        sensorDeviceId: 'ESP32-ZONE-05-ENERGY',
        solarGenerationKw: 4.8,
        inverterLoadWatts: 800,
        batterySoC: 96.5,
        batteryVoltage: 54.2,
        cisternLevelLiters: 9000,
        dissolvedOxygenMgL: 6.5,
    });
    if (!surplusPacket.dumpLoad.isActive) {
        throw new Error('Dump load should be active when battery is 96.5% and solar surplus is 4.0 kW');
    }
    if (surplusPacket.dumpLoad.targetAppliance !== 'EVAPORATIVE_MISTING') {
        throw new Error(`Expected EVAPORATIVE_MISTING dump target, got ${surplusPacket.dumpLoad.targetAppliance}`);
    }
    console.log('  ✔ Invariant 2: Solar surplus (4.0 kW) & full battery triggers Dump Load activation');
    const lowWaterPacket = await service.ingestTelemetry({
        sensorDeviceId: 'ESP32-ZONE-06-CISTERN',
        solarGenerationKw: 2.0,
        inverterLoadWatts: 800,
        batterySoC: 80.0,
        cisternLevelLiters: 1650,
        dissolvedOxygenMgL: 6.5,
    });
    const waterAlert = lowWaterPacket.alerts.find((a) => a.category === 'WATER');
    if (!waterAlert || waterAlert.severity !== 'WARNING') {
        throw new Error('Expected WARNING alert for low rainwater cistern (< 2,000 L)');
    }
    console.log('  ✔ Invariant 3: Low cistern volume (< 2,000 L) triggers Water Warning');
    const lowDoPacket = await service.ingestTelemetry({
        sensorDeviceId: 'ESP32-ZONE-02-AQUA',
        solarGenerationKw: 2.0,
        inverterLoadWatts: 800,
        batterySoC: 80.0,
        cisternLevelLiters: 8000,
        dissolvedOxygenMgL: 4.3,
    });
    const doAlert = lowDoPacket.alerts.find((a) => a.category === 'AQUACULTURE' && a.severity === 'CRITICAL');
    if (!doAlert) {
        throw new Error('Expected CRITICAL alert for low DO in bio-ponds (< 5.0 mg/L)');
    }
    console.log('  ✔ Invariant 4: Aquaponics DO < 5.0 mg/L triggers Emergency Aerator Alert');
    const noonDate = new Date('2026-11-13T12:00:00');
    const midnightDate = new Date('2026-11-13T00:30:00');
    const noonReading = service.generateDiurnalReading(noonDate);
    const midnightReading = service.generateDiurnalReading(midnightDate);
    if (noonReading.solarGenerationKw < 4.0) {
        throw new Error(`Expected midday solar peak >= 4.0 kW, got ${noonReading.solarGenerationKw} kW`);
    }
    if (midnightReading.solarGenerationKw !== 0.0) {
        throw new Error(`Expected midnight solar 0 kW, got ${midnightReading.solarGenerationKw} kW`);
    }
    console.log(`  ✔ Diurnal Solar Generator verified: Midday peak ${noonReading.solarGenerationKw} kW, Midnight ${midnightReading.solarGenerationKw} kW`);
    service.updateDispatchPolicy({
        solarDumpMode: 'POND_CASCADE_AERATOR',
        rainwaterPriority: 'LIVING_SOIL_FIRST',
        batteryFloorReservePercent: 25.0,
    });
    const updatedPolicy = service.getDispatchPolicy();
    if (updatedPolicy.solarDumpMode !== 'POND_CASCADE_AERATOR' || updatedPolicy.batteryFloorReservePercent !== 25.0) {
        throw new Error('Dispatch policy update failed');
    }
    console.log('  ✔ Dispatch policy customization & dynamic thresholding verified');
    console.log('🎉 All Microgrid Telemetry & Protection Rules Invariant Tests Passed Successfully!');
}
testMicrogridTelemetryInvariants();
