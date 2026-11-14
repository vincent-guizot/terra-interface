import { Router, Request, Response } from 'express';
import { eventAuditLogger } from './event-audit-logger';
import { telemetryAlertHistory } from './listeners/telemetry-alert.listener';

export const eventsRouter = Router();

eventsRouter.get('/audit', (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
  const logs = eventAuditLogger.getAuditLog(limit);
  res.json({
    total: logs.length,
    events: logs,
  });
});

eventsRouter.get('/alerts', (req: Request, res: Response) => {
  res.json({
    total: telemetryAlertHistory.length,
    alerts: telemetryAlertHistory,
  });
});
