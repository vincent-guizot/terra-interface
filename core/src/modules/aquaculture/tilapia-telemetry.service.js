"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilapiaTelemetryService = void 0;
const common_1 = require("@nestjs/common");
let TilapiaTelemetryService = class TilapiaTelemetryService {
    evaluateWaterQuality(reading) {
        const alerts = [];
        if (reading.dissolvedOxygenMgL < 5.0) {
            alerts.push('CRITICAL: Dissolved oxygen below 5.0 mg/L. Auto-activating secondary aerator pump.');
        }
        if (reading.pH < 6.5 || reading.pH > 8.0) {
            alerts.push(`WARNING: pH out of optimal bounds (${reading.pH}). Buffer with agricultural lime or biochar.`);
        }
        if (reading.ammoniaPpm > 0.5) {
            alerts.push(`ELEVATED: Ammonia at ${reading.ammoniaPpm} ppm. Increase nitrifying filter flow.`);
        }
        return {
            status: alerts.length === 0 ? 'OPTIMAL' : 'ATTENTION_REQUIRED',
            alerts,
            evaluatedAt: new Date(),
        };
    }
};
exports.TilapiaTelemetryService = TilapiaTelemetryService;
exports.TilapiaTelemetryService = TilapiaTelemetryService = __decorate([
    (0, common_1.Injectable)()
], TilapiaTelemetryService);
