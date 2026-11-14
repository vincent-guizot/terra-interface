"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRouter = void 0;
const express_1 = require("express");
const event_audit_logger_1 = require("./event-audit-logger");
const telemetry_alert_listener_1 = require("./listeners/telemetry-alert.listener");
exports.eventsRouter = (0, express_1.Router)();
exports.eventsRouter.get('/audit', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;
    const logs = event_audit_logger_1.eventAuditLogger.getAuditLog(limit);
    res.json({
        total: logs.length,
        events: logs,
    });
});
exports.eventsRouter.get('/alerts', (req, res) => {
    res.json({
        total: telemetry_alert_listener_1.telemetryAlertHistory.length,
        alerts: telemetry_alert_listener_1.telemetryAlertHistory,
    });
});
