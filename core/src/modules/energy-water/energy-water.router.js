import { Router } from 'express';
import energyWaterController from './energy-water.controller.js';
const router = Router();
router.get('/live', energyWaterController.getLiveSnapshot);
router.get('/historical', energyWaterController.getHistorical);
router.get('/policy', energyWaterController.getDispatchPolicy);
router.put('/policy', energyWaterController.updateDispatchPolicy);
router.get('/dump-load', energyWaterController.getDumpLoadStatus);
router.post('/ingest', energyWaterController.ingestTelemetry);
router.get('/stream', energyWaterController.streamTelemetry);
router.get('/', energyWaterController.getLiveSnapshot);
"use strict";
import * as energy_water_service_1 from './energy-water.service.js';
import * as iot_gateway_service_1 from './gateway/iot-gateway.service.js';
const service = energy_water_service_1.default;
router.get('/gateway/status', (req, res) => {
  res.json(iot_gateway_service_1.iotGatewayService.getStats());
});
router.post('/gateway/ingest', async (req, res, next) => {
  try {
    const {
      topic,
      payload
    } = req.body;
    if (!topic || payload === undefined) {
      return res.status(400).json({
        error: "Missing required fields 'topic' or 'payload'"
      });
    }
    const snapshot = await iot_gateway_service_1.iotGatewayService.handleEdgeMessage(topic, payload);
    res.status(201).json(snapshot);
  } catch (err) {
    next(err);
  }
});
router.get('/telemetry/live', async (req, res, next) => {
  try {
    const snapshot = service.getLiveSnapshot();
    res.json(snapshot);
  } catch (err) {
    next(err);
  }
});
router.get('/telemetry/history', async (req, res, next) => {
  try {
    const hours = req.query.hours ? parseInt(req.query.hours, 10) : 24;
    const history = service.getHistoricalTelemetry(hours);
    res.json(history);
  } catch (err) {
    next(err);
  }
});
router.post('/telemetry/ingest', async (req, res, next) => {
  try {
    const result = await service.ingestTelemetry(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});
router.post('/policy', (req, res) => {
  const updated = service.updateDispatchPolicy(req.body);
  res.json(updated);
});
router.get('/dump-load/status', (req, res) => {
  const status = service.getDumpLoadStatus();
  res.json(status);
});
// Server-Sent Events (SSE) Stream
router.get('/telemetry/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // Send initial snapshot immediately
  const initial = service.getLiveSnapshot();
  res.write(`data: ${JSON.stringify(initial)}\n\n`);
  const subscription = service.getTelemetryStream().subscribe({
    next: data => {
      res.write(`data: ${JSON.stringify(data.data)}\n\n`);
    },
    error: err => {
      console.error('[SSE Error]', err);
    }
  });
  req.on('close', () => {
    subscription.unsubscribe();
    res.end();
  });
});
export default router;
