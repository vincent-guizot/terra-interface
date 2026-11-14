"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.energyWaterRouter = void 0;
const express_1 = require("express");
const energy_water_service_1 = require("./energy-water.service");
const iot_gateway_service_1 = require("./gateway/iot-gateway.service");
exports.energyWaterRouter = (0, express_1.Router)();
const service = energy_water_service_1.energyWaterService;
exports.energyWaterRouter.get('/gateway/status', (req, res) => {
    res.json(iot_gateway_service_1.iotGatewayService.getStats());
});
exports.energyWaterRouter.post('/gateway/ingest', async (req, res, next) => {
    try {
        const { topic, payload } = req.body;
        if (!topic || payload === undefined) {
            return res.status(400).json({ error: "Missing required fields 'topic' or 'payload'" });
        }
        const snapshot = await iot_gateway_service_1.iotGatewayService.handleEdgeMessage(topic, payload);
        res.status(201).json(snapshot);
    }
    catch (err) {
        next(err);
    }
});
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
// Server-Sent Events (SSE) Stream
exports.energyWaterRouter.get('/telemetry/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // Send initial snapshot immediately
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
