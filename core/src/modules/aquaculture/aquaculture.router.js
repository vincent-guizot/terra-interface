"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aquacultureRouter = void 0;
const express_1 = require("express");
const aquaculture_service_1 = require("./aquaculture.service");
const tilapia_telemetry_service_1 = require("./tilapia-telemetry.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.aquacultureRouter = (0, express_1.Router)();
const telemetryService = new tilapia_telemetry_service_1.TilapiaTelemetryService();
const service = new aquaculture_service_1.AquacultureService(prisma_service_1.prisma, telemetryService);
exports.aquacultureRouter.get('/ponds', async (req, res, next) => {
    try {
        const ponds = await service.getPonds();
        res.json(ponds);
    }
    catch (err) {
        next(err);
    }
});
exports.aquacultureRouter.get('/water-quality', async (req, res, next) => {
    try {
        const quality = await service.getWaterQuality(req.query.pondId);
        res.json(quality);
    }
    catch (err) {
        next(err);
    }
});
exports.aquacultureRouter.post('/water-test', async (req, res, next) => {
    try {
        const result = await service.recordWaterTest(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.aquacultureRouter.post('/feeding', async (req, res, next) => {
    try {
        const result = await service.recordFeeding(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
