"use strict";

import * as events_1 from "events";
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
      _emittedAt: new Date().toISOString()
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
export { DomainEventBus };
export const domainEventBus = DomainEventBus.getInstance();
