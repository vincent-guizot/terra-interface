import { Router, Request, Response, NextFunction } from 'express';
import { SpatialService } from './spatial.service';
import { prisma } from '../../prisma/prisma.service';

export const spatialRouter = Router();
const service = new SpatialService(prisma);

spatialRouter.get('/zones', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zones = await service.getZones();
    res.json(zones);
  } catch (err) {
    next(err);
  }
});

spatialRouter.get('/zones/:code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zone = await service.getZoneByCode(req.params.code);
    res.json(zone);
  } catch (err) {
    next(err);
  }
});

spatialRouter.get('/canonical', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const canonical = await service.getHomesteadCanonical();
    res.json(canonical);
  } catch (err) {
    next(err);
  }
});
