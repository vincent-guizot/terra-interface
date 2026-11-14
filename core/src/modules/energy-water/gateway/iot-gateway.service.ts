import { ModbusPzemParser } from '../protocols/modbus-pzem.parser';
import { AtlasScientificParser } from '../protocols/atlas-scientific.parser';
import { energyWaterService, TelemetrySnapshot } from '../energy-water.service';
import { TelemetryIngestDto } from '../dto/telemetry-ingest.dto';

export interface IotGatewayStats {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  totalPackets: number;
  validPackets: number;
  corruptPackets: number;
  lastPacketTimestamp?: string;
  activeTopics: string[];
}

export class IotGatewayService {
  private static instance: IotGatewayService;
  private stats: IotGatewayStats = {
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

  static getInstance(): IotGatewayService {
    if (!IotGatewayService.instance) {
      IotGatewayService.instance = new IotGatewayService();
    }
    return IotGatewayService.instance;
  }

  getStats(): IotGatewayStats {
    return { ...this.stats };
  }

  async handleEdgeMessage(topic: string, rawPayload: string | Buffer): Promise<TelemetrySnapshot> {
    this.stats.totalPackets++;
    this.stats.lastPacketTimestamp = new Date().toISOString();

    const currentLive = energyWaterService.getLiveSnapshot();
    const payloadStr = typeof rawPayload === 'string' ? rawPayload : rawPayload.toString('utf-8');

    const ingestPayload: TelemetryIngestDto = {
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
          const reading = ModbusPzemParser.parseHexString(payloadStr);
          ingestPayload.solarGenerationKw = Math.round((reading.activePowerWatts / 1000) * 100) / 100;
        } else {
          // JSON payload fallback
          const json = JSON.parse(payloadStr);
          if (json.solarGenerationKw !== undefined) ingestPayload.solarGenerationKw = json.solarGenerationKw;
          if (json.inverterLoadWatts !== undefined) ingestPayload.inverterLoadWatts = json.inverterLoadWatts;
        }
      } else if (topic === 'homestead/zone2/water') {
        // Receives Atlas Scientific ASCII probe data
        const reading = AtlasScientificParser.parseCompositeString(payloadStr);
        if (reading.dissolvedOxygenMgL !== undefined) ingestPayload.dissolvedOxygenMgL = reading.dissolvedOxygenMgL;
        if (reading.pH !== undefined) ingestPayload.pH = reading.pH;
        if (reading.waterTemperatureC !== undefined) ingestPayload.waterTemperatureC = reading.waterTemperatureC;
      } else if (topic === 'homestead/zone5/bms') {
        const json = JSON.parse(payloadStr);
        if (json.batterySoC !== undefined) ingestPayload.batterySoC = json.batterySoC;
        if (json.batteryVoltage !== undefined) ingestPayload.batteryVoltage = json.batteryVoltage;
        if (json.batteryCurrentAmps !== undefined) ingestPayload.batteryCurrentAmps = json.batteryCurrentAmps;
      }

      const snapshot = await energyWaterService.ingestTelemetry(ingestPayload);
      this.stats.validPackets++;
      return snapshot;
    } catch (err: any) {
      this.stats.corruptPackets++;
      this.stats.status = this.stats.corruptPackets > 10 ? 'DEGRADED' : 'ONLINE';
      throw new Error(`IoT Gateway failed to process topic '${topic}': ${err.message}`);
    }
  }
}

export const iotGatewayService = IotGatewayService.getInstance();
