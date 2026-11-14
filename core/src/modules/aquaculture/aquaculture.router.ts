import { Router, Request, Response, NextFunction } from 'express';
import { AquacultureService } from './aquaculture.service';
import { TilapiaTelemetryService } from './tilapia-telemetry.service';
import { prisma } from '../../prisma/prisma.service';

export const aquacultureRouter = Router();
const telemetryService = new TilapiaTelemetryService();
const service = new AquacultureService(prisma, telemetryService);

aquacultureRouter.get('/ponds', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ponds = await service.getPonds();
    res.json(ponds);
  } catch (err) {
    next(err);
  }
});

aquacultureRouter.get('/water-quality', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quality = await service.getWaterQuality(req.query.pondId as string);
    res.json(quality);
  } catch (err) {
    next(err);
  }
});

aquacultureRouter.post('/water-test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordWaterTest(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

aquacultureRouter.post('/feeding', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordFeeding(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});
