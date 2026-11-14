import { Crc16Validator } from '../src/modules/energy-water/protocols/crc16.validator';
import { ModbusPzemParser } from '../src/modules/energy-water/protocols/modbus-pzem.parser';
import { AtlasScientificParser } from '../src/modules/energy-water/protocols/atlas-scientific.parser';
import { iotGatewayService } from '../src/modules/energy-water/gateway/iot-gateway.service';

async function testIotGatewayInvariants() {
  console.log('🧪 Running IoT Gateway & Probe Protocol Invariant Tests...');

  // =========================================================================
  // 1. Modbus CRC-16 Calculation & Frame Verification
  // =========================================================================
  // Construct raw payload for PZEM-016 (23 bytes without CRC)
  const data = Buffer.alloc(23);
  data.writeUInt8(0x01, 0); // Slave Addr
  data.writeUInt8(0x04, 1); // Func 0x04 (Read Input Registers)
  data.writeUInt8(20, 2);   // 20 data bytes (10 registers)

  // Reg 0: Voltage 230.0V (value 2300)
  data.writeUInt16BE(2300, 3);
  // Reg 1 & 2: Current 5.200A (value 5200)
  data.writeUInt16BE(5200, 5);
  data.writeUInt16BE(0, 7);
  // Reg 3 & 4: Power 1196.0W (value 11960)
  data.writeUInt16BE(11960, 9);
  data.writeUInt16BE(0, 11);
  // Reg 5 & 6: Energy 35000 Wh
  data.writeUInt16BE(35000, 13);
  data.writeUInt16BE(0, 15);
  // Reg 7: Frequency 50.0 Hz (value 500)
  data.writeUInt16BE(500, 17);
  // Reg 8: Power Factor 0.98 (value 98)
  data.writeUInt16BE(98, 19);
  // Reg 9: Alarm status 0
  data.writeUInt16BE(0, 21);

  // Append CRC-16
  const validFrame = Crc16Validator.appendCrc(data);
  if (!Crc16Validator.validate(validFrame)) {
    throw new Error('CRC-16 self-validation failed on generated Modbus frame');
  }
  console.log('  ✔ CRC-16 Modbus polynomial (0xA001) checksum validation verified');

  // Corrupt a byte and verify validation fails
  const corruptFrame = Buffer.from(validFrame);
  corruptFrame[4] = corruptFrame[4] ^ 0xff; // flip bits
  if (Crc16Validator.validate(corruptFrame)) {
    throw new Error('Corrupt frame unexpectedly passed CRC check');
  }
  console.log('  ✔ Corrupt frame rejection via CRC-16 verified');

  // =========================================================================
  // 2. Modbus PZEM Frame Parser Invariants
  // =========================================================================
  const reading = ModbusPzemParser.parseRtuResponse(validFrame);
  if (reading.voltageVolts !== 230.0) {
    throw new Error(`Voltage mismatch: expected 230.0V, got ${reading.voltageVolts}`);
  }
  if (reading.currentAmperes !== 5.2) {
    throw new Error(`Current mismatch: expected 5.2A, got ${reading.currentAmperes}`);
  }
  if (reading.activePowerWatts !== 1196.0) {
    throw new Error(`Power mismatch: expected 1196.0W, got ${reading.activePowerWatts}`);
  }
  if (reading.frequencyHz !== 50.0 || reading.powerFactor !== 0.98) {
    throw new Error(`Frequency/PF mismatch: ${reading.frequencyHz}Hz, PF: ${reading.powerFactor}`);
  }
  console.log(`  ✔ PZEM Modbus RTU telemetry parsed accurately (${reading.voltageVolts}V, ${reading.currentAmperes}A, ${reading.activePowerWatts}W, PF ${reading.powerFactor})`);

  // Verify parser rejects corrupt frame
  let rejected = false;
  try {
    ModbusPzemParser.parseRtuResponse(corruptFrame);
  } catch (err) {
    rejected = true;
  }
  if (!rejected) {
    throw new Error('Expected ModbusPzemParser to reject corrupt CRC frame');
  }
  console.log('  ✔ Parser integrity guard successfully aborted corrupt frame processing');

  // =========================================================================
  // 3. Atlas Scientific ASCII Probe Parser Invariants
  // =========================================================================
  const doResult = AtlasScientificParser.parseDissolvedOxygen('6.85, 94.2');
  if (doResult.mgL !== 6.85 || doResult.saturationPercent !== 94.2) {
    throw new Error(`EZO-DO parse failed: got ${JSON.stringify(doResult)}`);
  }

  const phResult = AtlasScientificParser.parsePh('7.28');
  if (phResult !== 7.28) {
    throw new Error(`EZO-pH parse failed: got ${phResult}`);
  }

  const composite = AtlasScientificParser.parseCompositeString('DO:7.10, PH:7.35, TEMP:26.8');
  if (composite.dissolvedOxygenMgL !== 7.1 || composite.pH !== 7.35 || composite.waterTemperatureC !== 26.8) {
    throw new Error(`Composite parsing failed: got ${JSON.stringify(composite)}`);
  }
  console.log(`  ✔ Atlas Scientific ASCII probe parsed (DO: ${composite.dissolvedOxygenMgL} mg/L, pH: ${composite.pH}, Temp: ${composite.waterTemperatureC}°C)`);

  // =========================================================================
  // 4. Edge IoT Gateway Telemetry Ingestion Invariants
  // =========================================================================
  // Ingest Modbus frame over solar topic
  const hexString = validFrame.toString('hex');
  const solarSnapshot = await iotGatewayService.handleEdgeMessage('homestead/zone5/solar', hexString);
  if (solarSnapshot.solarGenerationKw !== 1.2) {
    throw new Error(`Expected 1.2 kW solar from 1196W frame, got ${solarSnapshot.solarGenerationKw}`);
  }

  // Ingest Water Quality probe data
  const waterSnapshot = await iotGatewayService.handleEdgeMessage('homestead/zone2/water', 'DO:7.10, PH:7.35, TEMP:26.8');
  if (waterSnapshot.dissolvedOxygenMgL !== 7.1 || waterSnapshot.pH !== 7.35) {
    throw new Error(`Water snapshot not updated correctly: DO=${waterSnapshot.dissolvedOxygenMgL}, pH=${waterSnapshot.pH}`);
  }

  const stats = iotGatewayService.getStats();
  if (stats.validPackets < 2 || stats.status !== 'ONLINE') {
    throw new Error(`Gateway stats mismatch: ${JSON.stringify(stats)}`);
  }
  console.log(`  ✔ End-to-end IoT Gateway ingestion verified (Total: ${stats.totalPackets}, Valid: ${stats.validPackets})`);

  console.log('\n✨ All IoT Gateway & Probe Protocol Invariant Tests Passed Successfully!\n');
}

testIotGatewayInvariants().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
