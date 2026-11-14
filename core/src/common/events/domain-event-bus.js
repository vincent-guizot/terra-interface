"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainEventBus = exports.DomainEventBus = void 0;
const events_1 = require("events");
class DomainEventBus {
    constructor() {
        this.emitter = new events_1.EventEmitter();
        this.emitter.setMaxListeners(50);
    }
    static getInstance() {
        if (!DomainEventBus.instance) {
            DomainEventBus.instance = new DomainEventBus();
        }
        return DomainEventBus.instance;
    }
    emit(event, payload) {
        return this.emitter.emit(event, {
            ...payload,
            _emittedAt: new Date().toISOString(),
        });
    }
    on(event, listener) {
        this.emitter.on(event, listener);
        return this;
    }
    off(event, listener) {
        this.emitter.off(event, listener);
        return this;
    }
}
exports.DomainEventBus = DomainEventBus;
exports.domainEventBus = DomainEventBus.getInstance();
