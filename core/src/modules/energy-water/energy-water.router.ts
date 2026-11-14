import { Router, Request, Response, NextFunction } from 'express';
import { EnergyWaterService } from './energy-water.service';
import { BatteryBmsService } from './battery-bms.service';
import { AutonomyForecastService } from './autonomy-forecast.service';
import { prisma } from '../../prisma/prisma.service';

export const energyWaterRouter = Router();
const bmsService = new BatteryBmsService();
const autonomyService = new AutonomyForecastService();
const service = new EnergyWaterService(prisma, bmsService, autonomyService);

energyWaterRouter.get('/telemetry/live', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snapshot = service.getLiveSnapshot();
    res.json(snapshot);
  } catch (err) {
    next(err);
  }
});

energyWaterRouter.get('/telemetry/history', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hours = req.query.hours ? parseInt(req.query.hours as string, 10) : 24;
    const history = service.getHistoricalTelemetry(hours);
    res.json(history);
  } catch (err) {
    next(err);
  }
});

energyWaterRouter.post('/telemetry/ingest', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.ingestTelemetry(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

energyWaterRouter.get('/policy', (req: Request, res: Response) => {
  const policy = service.getDispatchPolicy();
  res.json(policy);
});

energyWaterRouter.post('/policy', (req: Request, res: Response) => {
  const updated = service.updateDispatchPolicy(req.body);
  res.json(updated);
});

energyWaterRouter.get('/dump-load/status', (req: Request, res: Response) => {
  const status = service.getDumpLoadStatus();
  res.json(status);
});

// Server-Sent Events (SSE) Stream
energyWaterRouter.get('/telemetry/stream', (req: Request, res: Response) => {
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
