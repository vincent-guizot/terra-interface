"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaggotHarvestService = void 0;
const common_1 = require("@nestjs/common");
let MaggotHarvestService = class MaggotHarvestService {
    logDailyHarvest(trayId, yieldKg, frassKg) {
        const poultryShare = Math.round(yieldKg * 0.65 * 100) / 100;
        const tilapiaShare = Math.round((yieldKg - poultryShare) * 100) / 100;
        return {
            harvestDate: new Date().toISOString().split('T')[0],
            trayId,
            freshPrepupaeKg: yieldKg,
            crudeProteinPercent: 42.4,
            allocatedToPoultryKg: poultryShare,
            allocatedToTilapiaKg: tilapiaShare,
            dryResidueFrassKg: frassKg,
        };
    }
};
exports.MaggotHarvestService = MaggotHarvestService;
exports.MaggotHarvestService = MaggotHarvestService = __decorate([
    (0, common_1.Injectable)()
], MaggotHarvestService);
