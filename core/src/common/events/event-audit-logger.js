"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventAuditLogger = exports.EventAuditLogger = void 0;
const domain_event_bus_1 = require("./domain-event-bus");
class EventAuditLogger {
    constructor() {
        this.auditHistory = [];
        this.maxEntries = 500;
        this.attachSubscribers();
    }
    static getInstance() {
        if (!EventAuditLogger.instance) {
            EventAuditLogger.instance = new EventAuditLogger();
        }
        return EventAuditLogger.instance;
    }
    attachSubscribers() {
        const events = [
            'HARVEST_COMPLETED',
            'TELEMETRY_THRESHOLD_EXCEEDED',
            'STOCK_OVERDRAFT_PREVENTED',
            'COMPOST_TURN_REQUIRED',
            'RECOMMENDATION_APPLIED',
        ];
        events.forEach((eventType) => {
            domain_event_bus_1.domainEventBus.on(eventType, (payload) => {
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
    getAuditLog(limit = 50) {
        return this.auditHistory.slice(0, limit);
    }
    clearAuditLog() {
        this.auditHistory = [];
    }
}
exports.EventAuditLogger = EventAuditLogger;
exports.eventAuditLogger = EventAuditLogger.getInstance();
