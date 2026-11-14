import { Router, Request, Response, NextFunction } from 'express';
import { IntelligenceService } from './intelligence.service';
import { prisma } from '../../prisma/prisma.service';

export const intelligenceRouter = Router();
const service = new IntelligenceService(prisma);

intelligenceRouter.get('/autonomy', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const autonomy = await service.getAutonomyScores();
    res.json(autonomy);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.get('/insights', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const insights = await service.getInsights();
    res.json(insights);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.post('/insights/:id/apply', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.applyRecommendation(req.params.id, req.body?.notes);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.post('/insights/:id/dismiss', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.dismissRecommendation(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.post('/diagnose', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diagnosis = await service.diagnosePlant(req.body);
    res.json(diagnosis);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.post('/query', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await service.processQuery(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.get('/forecast', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const forecast = await service.getForecast();
    res.json(forecast);
  } catch (err) {
    next(err);
  }
});

intelligenceRouter.get('/audit', (req: Request, res: Response) => {
  const audit = service.exportChatAudit();
  res.setHeader('Content-Type', 'application/json');
  res.send(audit);
});
