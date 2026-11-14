/**
 * RS-485 Modbus RTU / TCP Frame Parser for PZEM-016 / PZEM-017 AC & DC Power Meters
 * Standard Modbus Function Code 0x04 (Read Input Registers)
 */

export interface ModbusPzemReading {
  voltageVolts: number;
  currentAmperes: number;
  activePowerWatts: number;
  energyWattHours: number;
  frequencyHz?: number;
  powerFactor?: number;
  alarmStatus?: boolean;
}

export class ModbusPzemParser {
  /**
   * Parse a Modbus RTU Response Buffer
   * [SlaveAddr(1B)] [FuncCode(1B)] [ByteCount(1B)] [Data(NB)] [CRC_Low(1B)] [CRC_High(1B)]
   *
   * PZEM-016 Input Registers:
   * 0x0000: Voltage (0.1V) - 2 bytes
   * 0x0001: Current low (0.001A) - 2 bytes
   * 0x0002: Current high - 2 bytes
   * 0x0003: Power low (0.1W) - 2 bytes
   * 0x0004: Power high - 2 bytes
   * 0x0005: Energy low (1Wh) - 2 bytes
   * 0x0006: Energy high - 2 bytes
   * 0x0007: Frequency (0.1Hz) - 2 bytes
   * 0x0008: Power Factor (0.01) - 2 bytes
   * 0x0009: Alarm status - 2 bytes
   */
  static parseRtuResponse(buffer: Buffer): ModbusPzemReading {
    if (buffer.length < 7) {
      throw new Error(`Modbus RTU frame too short: ${buffer.length} bytes received`);
    }

    const funcCode = buffer.readUInt8(1);
    if (funcCode !== 0x04) {
      throw new Error(`Unsupported Modbus function code 0x${funcCode.toString(16)}. Expected 0x04`);
    }

    const byteCount = buffer.readUInt8(2);
    if (buffer.length < 3 + byteCount + 2) {
      throw new Error(`Incomplete Modbus payload: expected ${byteCount} data bytes`);
    }

    // Offset 3 starts data registers
    const voltageRaw = buffer.readUInt16BE(3);
    const voltageVolts = Math.round((voltageRaw * 0.1) * 100) / 100;

    const currentLow = buffer.readUInt16BE(5);
    const currentHigh = buffer.readUInt16BE(7);
    const currentRaw = (currentHigh << 16) | currentLow;
    const currentAmperes = Math.round((currentRaw * 0.001) * 1000) / 1000;

    const powerLow = buffer.readUInt16BE(9);
    const powerHigh = buffer.readUInt16BE(11);
    const powerRaw = (powerHigh << 16) | powerLow;
    const activePowerWatts = Math.round((powerRaw * 0.1) * 10) / 10;

    const energyLow = buffer.readUInt16BE(13);
    const energyHigh = buffer.readUInt16BE(15);
    const energyWattHours = (energyHigh << 16) | energyLow;

    let frequencyHz: number | undefined;
    let powerFactor: number | undefined;
    let alarmStatus: boolean | undefined;

    if (byteCount >= 16) {
      frequencyHz = Math.round((buffer.readUInt16BE(17) * 0.1) * 10) / 10;
    }
    if (byteCount >= 18) {
      powerFactor = Math.round((buffer.readUInt16BE(19) * 0.01) * 100) / 100;
    }
    if (byteCount >= 20) {
      alarmStatus = buffer.readUInt16BE(21) === 0xffff;
    }

    return {
      voltageVolts,
      currentAmperes,
      activePowerWatts,
      energyWattHours,
      frequencyHz,
      powerFactor,
      alarmStatus,
    };
  }

  /**
   * Helper to parse from Hex string (e.g. "01041400dc00000064000003e8000001f400320050000037a1")
   */
  static parseHexString(hex: string): ModbusPzemReading {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '');
    const buffer = Buffer.from(cleanHex, 'hex');
    return this.parseRtuResponse(buffer);
  }
}
