"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iotGatewayService = exports.IotGatewayService = void 0;
const modbus_pzem_parser_1 = require("../protocols/modbus-pzem.parser");
const atlas_scientific_parser_1 = require("../protocols/atlas-scientific.parser");
const energy_water_service_1 = require("../energy-water.service");
class IotGatewayService {
    constructor() {
        this.stats = {
            status: 'ONLINE',
            totalPackets: 0,
            validPackets: 0,
            corruptPackets: 0,
            activeTopics: [
                'homestead/zone2/water',
                'homestead/zone5/solar',
                'homestead/zone5/bms',
            ],
        };
    }
    static getInstance() {
        if (!IotGatewayService.instance) {
            IotGatewayService.instance = new IotGatewayService();
        }
        return IotGatewayService.instance;
    }
    getStats() {
        return { ...this.stats };
    }
    async handleEdgeMessage(topic, rawPayload) {
        this.stats.totalPackets++;
        this.stats.lastPacketTimestamp = new Date().toISOString();
        const currentLive = energy_water_service_1.energyWaterService.getLiveSnapshot();
        const payloadStr = typeof rawPayload === 'string' ? rawPayload : rawPayload.toString('utf-8');
        const ingestPayload = {
            sensorDeviceId: `EDGE-MQTT-${topic.replace(/\//g, '-').toUpperCase()}`,
            solarGenerationKw: currentLive.solarGenerationKw,
            inverterLoadWatts: currentLive.inverterLoadWatts,
            batterySoC: currentLive.batterySoC,
            batteryVoltage: currentLive.batteryVoltage,
            batteryCurrentAmps: currentLive.batteryCurrentAmps,
            cisternLevelLiters: currentLive.cisternTotalLiters,
            dissolvedOxygenMgL: currentLive.dissolvedOxygenMgL,
            pH: currentLive.pH,
            waterTemperatureC: currentLive.waterTemperatureC,
            ambientIrradianceWPerM2: currentLive.ambientIrradianceWPerM2,
        };
        try {
            if (topic === 'homestead/zone5/solar') {
                // May receive Modbus RTU hex frame from PZEM-016
                if (/^[0-9a-fA-F\s]+$/.test(payloadStr.trim()) && payloadStr.trim().length >= 14) {
                    const reading = modbus_pzem_parser_1.ModbusPzemParser.parseHexString(payloadStr);
                    ingestPayload.solarGenerationKw = Math.round((reading.activePowerWatts / 1000) * 100) / 100;
                }
                else {
                    // JSON payload fallback
                    const json = JSON.parse(payloadStr);
                    if (json.solarGenerationKw !== undefined)
                        ingestPayload.solarGenerationKw = json.solarGenerationKw;
                    if (json.inverterLoadWatts !== undefined)
                        ingestPayload.inverterLoadWatts = json.inverterLoadWatts;
                }
            }
            else if (topic === 'homestead/zone2/water') {
                // Receives Atlas Scientific ASCII probe data
                const reading = atlas_scientific_parser_1.AtlasScientificParser.parseCompositeString(payloadStr);
                if (reading.dissolvedOxygenMgL !== undefined)
                    ingestPayload.dissolvedOxygenMgL = reading.dissolvedOxygenMgL;
                if (reading.pH !== undefined)
                    ingestPayload.pH = reading.pH;
                if (reading.waterTemperatureC !== undefined)
                    ingestPayload.waterTemperatureC = reading.waterTemperatureC;
            }
            else if (topic === 'homestead/zone5/bms') {
                const json = JSON.parse(payloadStr);
                if (json.batterySoC !== undefined)
                    ingestPayload.batterySoC = json.batterySoC;
                if (json.batteryVoltage !== undefined)
                    ingestPayload.batteryVoltage = json.batteryVoltage;
                if (json.batteryCurrentAmps !== undefined)
                    ingestPayload.batteryCurrentAmps = json.batteryCurrentAmps;
            }
            const snapshot = await energy_water_service_1.energyWaterService.ingestTelemetry(ingestPayload);
            this.stats.validPackets++;
            return snapshot;
        }
        catch (err) {
            this.stats.corruptPackets++;
            this.stats.status = this.stats.corruptPackets > 10 ? 'DEGRADED' : 'ONLINE';
            throw new Error(`IoT Gateway failed to process topic '${topic}': ${err.message}`);
        }
    }
}
exports.IotGatewayService = IotGatewayService;
exports.iotGatewayService = IotGatewayService.getInstance();
