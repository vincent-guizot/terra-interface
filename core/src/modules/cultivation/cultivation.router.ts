import { Router, Request, Response, NextFunction } from 'express';
import { CultivationService } from './cultivation.service';
import { prisma } from '../../prisma/prisma.service';

export const cultivationRouter = Router();
const service = new CultivationService(prisma);

cultivationRouter.get('/catalog', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const catalog = await service.getCatalog(req.query.category as string);
    res.json(catalog);
  } catch (err) {
    next(err);
  }
});

cultivationRouter.post('/catalog', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const variety = await service.createCropVariety(req.body);
    res.status(201).json(variety);
  } catch (err) {
    next(err);
  }
});

cultivationRouter.get('/batches/active', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const batches = await service.getActiveBatches();
    res.json(batches);
  } catch (err) {
    next(err);
  }
});

cultivationRouter.post('/nutrient-dosing', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dosing = await service.calculateNutrientDosing(req.body);
    res.json(dosing);
  } catch (err) {
    next(err);
  }
});
