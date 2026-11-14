"use strict";
/**
 * Atlas Scientific EZO UART/I2C ASCII Telemetry Parser
 * Supports EZO-DO (Dissolved Oxygen), EZO-pH, EZO-RTD (Temperature), and EZO-EC (Conductivity)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtlasScientificParser = void 0;
class AtlasScientificParser {
    /**
     * Parse Dissolved Oxygen string response (e.g., "6.85" or "6.85, 94.2")
     */
    static parseDissolvedOxygen(raw) {
        const trimmed = raw.trim();
        const parts = trimmed.split(',').map((p) => p.trim());
        const mgL = parseFloat(parts[0]);
        if (isNaN(mgL)) {
            throw new Error(`Invalid Atlas EZO-DO response: '${raw}'`);
        }
        const saturationPercent = parts.length > 1 ? parseFloat(parts[1]) : undefined;
        return {
            mgL: Math.round(mgL * 100) / 100,
            saturationPercent: saturationPercent !== undefined && !isNaN(saturationPercent)
                ? Math.round(saturationPercent * 10) / 10
                : undefined,
        };
    }
    /**
     * Parse pH string response (e.g., "7.24" or "?OK\r7.24")
     */
    static parsePh(raw) {
        const cleaned = raw.replace(/[^\d.]/g, '');
        const ph = parseFloat(cleaned);
        if (isNaN(ph)) {
            throw new Error(`Invalid Atlas EZO-pH response: '${raw}'`);
        }
        return Math.round(ph * 100) / 100;
    }
    /**
     * Parse RTD Temperature string response (e.g., "26.4")
     */
    static parseTemperature(raw) {
        const cleaned = raw.replace(/[^\d.-]/g, '');
        const temp = parseFloat(cleaned);
        if (isNaN(temp)) {
            throw new Error(`Invalid Atlas EZO-RTD response: '${raw}'`);
        }
        return Math.round(temp * 10) / 10;
    }
    /**
     * Parse multi-parameter string (e.g. from an edge aggregator payload):
     * e.g. "DO:6.85,PH:7.22,TEMP:26.5" or JSON payload
     */
    static parseCompositeString(raw) {
        const result = { rawAscii: raw };
        // Try parsing JSON format first
        if (raw.trim().startsWith('{')) {
            try {
                const json = JSON.parse(raw);
                if (json.do !== undefined || json.dissolvedOxygen !== undefined) {
                    result.dissolvedOxygenMgL = parseFloat(json.do ?? json.dissolvedOxygen);
                }
                if (json.ph !== undefined) {
                    result.pH = parseFloat(json.ph);
                }
                if (json.temp !== undefined || json.temperature !== undefined) {
                    result.waterTemperatureC = parseFloat(json.temp ?? json.temperature);
                }
                if (json.ec !== undefined) {
                    result.electricalConductivityMicroSiemens = parseFloat(json.ec);
                }
                return result;
            }
            catch (err) {
                // Fall back to key-value string parsing
            }
        }
        const segments = raw.split(/[,;\n]/);
        for (const segment of segments) {
            const [key, val] = segment.split(/[:=]/).map((s) => s.trim().toUpperCase());
            if (!val)
                continue;
            const numVal = parseFloat(val);
            if (isNaN(numVal))
                continue;
            if (key === 'DO' || key === 'O2') {
                result.dissolvedOxygenMgL = Math.round(numVal * 100) / 100;
            }
            else if (key === 'PH') {
                result.pH = Math.round(numVal * 100) / 100;
            }
            else if (key === 'TEMP' || key === 'RTD') {
                result.waterTemperatureC = Math.round(numVal * 10) / 10;
            }
            else if (key === 'EC') {
                result.electricalConductivityMicroSiemens = Math.round(numVal);
            }
            else if (key === 'TDS') {
                result.totalDissolvedSolidsPpm = Math.round(numVal);
            }
        }
        return result;
    }
}
exports.AtlasScientificParser = AtlasScientificParser;
