import { EventEmitter } from 'events';

export type DomainEventType =
  | 'HARVEST_COMPLETED'
  | 'TELEMETRY_THRESHOLD_EXCEEDED'
  | 'STOCK_OVERDRAFT_PREVENTED'
  | 'COMPOST_TURN_REQUIRED'
  | 'RECOMMENDATION_APPLIED';

export interface HarvestCompletedPayload {
  batchId: string;
  domain: string;
  productName: string;
  quantity: number;
  unit: string;
  stewardName: string;
  destination: string;
}

export interface TelemetryThresholdPayload {
  metric: 'BATTERY_SOC' | 'DISSOLVED_OXYGEN' | 'CISTERN_VOLUME' | 'SOLAR_SURPLUS';
  currentValue: number;
  threshold: number;
  severity: 'WARNING' | 'CRITICAL';
  actionTaken?: string;
}

export interface RecommendationAppliedPayload {
  id: string;
  category: string;
  title: string;
  notes?: string;
  stewardName: string;
}

export class DomainEventBus {
  private static instance: DomainEventBus;
  private emitter: EventEmitter;

  private constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(50);
  }

  static getInstance(): DomainEventBus {
    if (!DomainEventBus.instance) {
      DomainEventBus.instance = new DomainEventBus();
    }
    return DomainEventBus.instance;
  }

  emit(event: 'HARVEST_COMPLETED', payload: HarvestCompletedPayload): boolean;
  emit(event: 'TELEMETRY_THRESHOLD_EXCEEDED', payload: TelemetryThresholdPayload): boolean;
  emit(event: 'RECOMMENDATION_APPLIED', payload: RecommendationAppliedPayload): boolean;
  emit(event: DomainEventType, payload: any): boolean {
    return this.emitter.emit(event, {
      ...payload,
      _emittedAt: new Date().toISOString(),
    });
  }

  on(event: DomainEventType, listener: (payload: any) => void): this {
    this.emitter.on(event, listener);
    return this;
  }

  off(event: DomainEventType, listener: (payload: any) => void): this {
    this.emitter.off(event, listener);
    return this;
  }
}

export const domainEventBus = DomainEventBus.getInstance();
