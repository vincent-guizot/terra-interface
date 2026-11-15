const eventsRouter = (0, express_1.Router)();
"use strict";
import * as express_1 from "express";
import * as event_audit_logger_1 from "./event-audit-logger.js";
import * as telemetry_alert_listener_1 from "./listeners/telemetry-alert.listener.js";
eventsRouter.get('/audit', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;
  const logs = event_audit_logger_1.eventAuditLogger.getAuditLog(limit);
  res.json({
    total: logs.length,
    events: logs
  });
});
eventsRouter.get('/alerts', (req, res) => {
  res.json({
    total: telemetry_alert_listener_1.telemetryAlertHistory.length,
    alerts: telemetry_alert_listener_1.telemetryAlertHistory
  });
});
export { eventsRouter };
