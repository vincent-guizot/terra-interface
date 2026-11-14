"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spatialRouter = void 0;
const express_1 = require("express");
const spatial_service_1 = require("./spatial.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.spatialRouter = (0, express_1.Router)();
const service = new spatial_service_1.SpatialService(prisma_service_1.prisma);
exports.spatialRouter.get('/zones', async (req, res, next) => {
    try {
        const zones = await service.getZones();
        res.json(zones);
    }
    catch (err) {
        next(err);
    }
});
exports.spatialRouter.get('/zones/:code', async (req, res, next) => {
    try {
        const zone = await service.getZoneByCode(req.params.code);
        res.json(zone);
    }
    catch (err) {
        next(err);
    }
});
exports.spatialRouter.get('/canonical', async (req, res, next) => {
    try {
        const canonical = await service.getHomesteadCanonical();
        res.json(canonical);
    }
    catch (err) {
        next(err);
    }
});
