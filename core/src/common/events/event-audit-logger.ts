import { domainEventBus, DomainEventType } from './domain-event-bus';

export interface EventAuditEntry {
  id: string;
  eventType: DomainEventType;
  payload: any;
  timestamp: string;
}

export class EventAuditLogger {
  private static instance: EventAuditLogger;
  private auditHistory: EventAuditEntry[] = [];
  private readonly maxEntries = 500;

  private constructor() {
    this.attachSubscribers();
  }

  static getInstance(): EventAuditLogger {
    if (!EventAuditLogger.instance) {
      EventAuditLogger.instance = new EventAuditLogger();
    }
    return EventAuditLogger.instance;
  }

  private attachSubscribers(): void {
    const events: DomainEventType[] = [
      'HARVEST_COMPLETED',
      'TELEMETRY_THRESHOLD_EXCEEDED',
      'STOCK_OVERDRAFT_PREVENTED',
      'COMPOST_TURN_REQUIRED',
      'RECOMMENDATION_APPLIED',
    ];

    events.forEach((eventType) => {
      domainEventBus.on(eventType, (payload: any) => {
        this.auditHistory.unshift({
          id: `evt-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          eventType,
          payload,
          timestamp: new Date().toISOString(),
        });

        if (this.auditHistory.length > this.maxEntries) {
          this.auditHistory.pop();
        }
      });
    });
  }

  getAuditLog(limit: number = 50): EventAuditEntry[] {
    return this.auditHistory.slice(0, limit);
  }

  clearAuditLog(): void {
    this.auditHistory = [];
  }
}

export const eventAuditLogger = EventAuditLogger.getInstance();
