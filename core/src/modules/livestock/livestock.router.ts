import { Router, Request, Response, NextFunction } from 'express';
import { LivestockService } from './livestock.service';
import { prisma } from '../../prisma/prisma.service';

export const livestockRouter = Router();
const service = new LivestockService(prisma);

livestockRouter.get('/animals', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animals = await service.getAnimals(req.query.breed as string, req.query.housingSystem as string);
    res.json(animals);
  } catch (err) {
    next(err);
  }
});

livestockRouter.post('/egg-harvest', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordEggHarvest(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

livestockRouter.get('/egg-harvest/history', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await service.getEggHarvestLogs();
    res.json(history);
  } catch (err) {
    next(err);
  }
});

livestockRouter.post('/feeding', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordFeeding(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

livestockRouter.post('/mortality', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordMortality(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});
