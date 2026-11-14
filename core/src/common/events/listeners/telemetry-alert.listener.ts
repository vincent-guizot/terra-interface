import { domainEventBus, TelemetryThresholdPayload } from '../domain-event-bus';

export interface TelemetryAlertRecord {
  id: string;
  metric: string;
  currentValue: number;
  threshold: number;
  severity: 'WARNING' | 'CRITICAL';
  actionTaken: string;
  timestamp: string;
}

export const telemetryAlertHistory: TelemetryAlertRecord[] = [];

export function registerTelemetryAlertListener(): void {
  domainEventBus.on('TELEMETRY_THRESHOLD_EXCEEDED', (payload: TelemetryThresholdPayload) => {
    const action = payload.actionTaken || (
      payload.severity === 'CRITICAL'
        ? 'AUTOMATED_SHUTDOWN_PROTECTION_ENGAGED'
        : 'DISPATCH_STEWARD_ALERT_NOTIFICATION'
    );

    const alertRecord: TelemetryAlertRecord = {
      id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      metric: payload.metric,
      currentValue: payload.currentValue,
      threshold: payload.threshold,
      severity: payload.severity,
      actionTaken: action,
      timestamp: new Date().toISOString(),
    };

    telemetryAlertHistory.unshift(alertRecord);
    if (telemetryAlertHistory.length > 100) {
      telemetryAlertHistory.pop();
    }

    console.warn(`[EventBus:TelemetryAlert] [${payload.severity}] ${payload.metric} reached ${payload.currentValue} (Threshold: ${payload.threshold}). Safety Action: ${action}`);
  });
}
