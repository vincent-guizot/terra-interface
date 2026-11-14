"use strict";
/**
 * CRC-16 Modbus Polynomial (0xA001, Initial 0xFFFF)
 * Used to verify frame integrity over RS-485 serial communication bus.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crc16Validator = void 0;
class Crc16Validator {
    /**
     * Computes 16-bit Modbus CRC for a given byte buffer
     * Returns a 16-bit integer (low byte in bits 0-7, high byte in bits 8-15)
     */
    static compute(buffer, length) {
        const len = length !== undefined ? length : buffer.length;
        let crc = 0xffff;
        for (let pos = 0; pos < len; pos++) {
            crc ^= buffer[pos] & 0xff;
            for (let i = 8; i !== 0; i--) {
                if ((crc & 0x0001) !== 0) {
                    crc = (crc >> 1) ^ 0xa001;
                }
                else {
                    crc >>= 1;
                }
            }
        }
        return crc;
    }
    /**
     * Validates if the last 2 bytes of the buffer match the calculated CRC
     * (Modbus RTU stores CRC as [LowByte, HighByte] at the tail)
     */
    static validate(buffer) {
        if (buffer.length < 3)
            return false;
        const dataLength = buffer.length - 2;
        const computedCrc = this.compute(buffer, dataLength);
        const frameLowByte = buffer.readUInt8(dataLength);
        const frameHighByte = buffer.readUInt8(dataLength + 1);
        const frameCrc = frameLowByte | (frameHighByte << 8);
        return computedCrc === frameCrc;
    }
    /**
     * Appends calculated 2-byte CRC (LowByte then HighByte) to the data buffer
     */
    static appendCrc(dataBuffer) {
        const crc = this.compute(dataBuffer);
        const result = Buffer.alloc(dataBuffer.length + 2);
        dataBuffer.copy(result);
        result.writeUInt8(crc & 0xff, dataBuffer.length);
        result.writeUInt8((crc >> 8) & 0xff, dataBuffer.length + 1);
        return result;
    }
}
exports.Crc16Validator = Crc16Validator;
