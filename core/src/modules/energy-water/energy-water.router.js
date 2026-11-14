"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.energyWaterRouter = void 0;
const express_1 = require("express");
const energy_water_service_1 = require("./energy-water.service");
const battery_bms_service_1 = require("./battery-bms.service");
const autonomy_forecast_service_1 = require("./autonomy-forecast.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.energyWaterRouter = (0, express_1.Router)();
const bmsService = new battery_bms_service_1.BatteryBmsService();
const autonomyService = new autonomy_forecast_service_1.AutonomyForecastService();
const service = new energy_water_service_1.EnergyWaterService(prisma_service_1.prisma, bmsService, autonomyService);
exports.energyWaterRouter.get('/telemetry/live', async (req, res, next) => {
    try {
        const snapshot = service.getLiveSnapshot();
        res.json(snapshot);
    }
    catch (err) {
        next(err);
    }
});
exports.energyWaterRouter.get('/telemetry/history', async (req, res, next) => {
    try {
        const hours = req.query.hours ? parseInt(req.query.hours, 10) : 24;
        const history = service.getHistoricalTelemetry(hours);
        res.json(history);
    }
    catch (err) {
        next(err);
    }
});
exports.energyWaterRouter.post('/telemetry/ingest', async (req, res, next) => {
    try {
        const result = await service.ingestTelemetry(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.energyWaterRouter.get('/policy', (req, res) => {
    const policy = service.getDispatchPolicy();
    res.json(policy);
});
exports.energyWaterRouter.post('/policy', (req, res) => {
    const updated = service.updateDispatchPolicy(req.body);
    res.json(updated);
});
exports.energyWaterRouter.get('/dump-load/status', (req, res) => {
    const status = service.getDumpLoadStatus();
    res.json(status);
});
exports.energyWaterRouter.get('/telemetry/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const initial = service.getLiveSnapshot();
    res.write(`data: ${JSON.stringify(initial)}\n\n`);
    const subscription = service.getTelemetryStream().subscribe({
        next: (data) => {
            res.write(`data: ${JSON.stringify(data.data)}\n\n`);
        },
        error: (err) => {
            console.error('[SSE Error]', err);
        },
    });
    req.on('close', () => {
        subscription.unsubscribe();
        res.end();
    });
});
