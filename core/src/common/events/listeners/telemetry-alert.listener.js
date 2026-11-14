"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telemetryAlertHistory = void 0;
exports.registerTelemetryAlertListener = registerTelemetryAlertListener;
const domain_event_bus_1 = require("../domain-event-bus");
exports.telemetryAlertHistory = [];
function registerTelemetryAlertListener() {
    domain_event_bus_1.domainEventBus.on('TELEMETRY_THRESHOLD_EXCEEDED', (payload) => {
        const action = payload.actionTaken || (payload.severity === 'CRITICAL'
            ? 'AUTOMATED_SHUTDOWN_PROTECTION_ENGAGED'
            : 'DISPATCH_STEWARD_ALERT_NOTIFICATION');
        const alertRecord = {
            id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            metric: payload.metric,
            currentValue: payload.currentValue,
            threshold: payload.threshold,
            severity: payload.severity,
            actionTaken: action,
            timestamp: new Date().toISOString(),
        };
        exports.telemetryAlertHistory.unshift(alertRecord);
        if (exports.telemetryAlertHistory.length > 100) {
            exports.telemetryAlertHistory.pop();
        }
        console.warn(`[EventBus:TelemetryAlert] [${payload.severity}] ${payload.metric} reached ${payload.currentValue} (Threshold: ${payload.threshold}). Safety Action: ${action}`);
    });
}
