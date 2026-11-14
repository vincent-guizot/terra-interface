"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryBmsService = void 0;
const common_1 = require("@nestjs/common");
let BatteryBmsService = class BatteryBmsService {
    evaluatePackHealth(telemetry) {
        const isImbalanced = telemetry.maxCellDeltaV > 0.030;
        return {
            healthStatus: isImbalanced ? 'ACTIVE_BALANCING_TRIGGERED' : 'OPTIMAL',
            estimatedAutonomyHours: Math.round((telemetry.socPercent / 100) * 15.3 / 0.85 * 10) / 10,
            timestamp: new Date(),
        };
    }
};
exports.BatteryBmsService = BatteryBmsService;
exports.BatteryBmsService = BatteryBmsService = __decorate([
    (0, common_1.Injectable)()
], BatteryBmsService);
