import { Controller, Get, Post, Body, Query, Sse, MessageEvent } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnergyWaterService, TelemetrySnapshot } from './energy-water.service';
import { TelemetryIngestDto } from './dto/telemetry-ingest.dto';
import { DispatchPolicyDto } from './dto/dispatch-policy.dto';

@ApiTags('Microgrid & Resource Telemetry')
@Controller('microgrid')
export class EnergyWaterController {
  constructor(private readonly energyWaterService: EnergyWaterService) {}

  @Get('telemetry/live')
  @ApiOperation({
    summary: 'Get live homestead microgrid & water telemetry snapshot',
    description: 'Returns real-time solar generation, inverter load, LiFePO4 battery SoC, cistern levels, and active alerts.',
  })
  @ApiResponse({ status: 200, description: 'Live telemetry snapshot' })
  getLiveTelemetry(): TelemetrySnapshot {
    return this.energyWaterService.getLiveSnapshot();
  }

  @Sse('telemetry/stream')
  @ApiOperation({
    summary: 'Real-time Server-Sent Events (SSE) telemetry stream',
    description: 'Pushes live telemetry updates to the Console UI whenever new readings arrive or conditions change.',
  })
  streamTelemetry(): Observable<MessageEvent> {
    return this.energyWaterService.getTelemetryStream().pipe(
      map((event) => ({
        data: event.data,
      } as MessageEvent)),
    );
  }

  @Post('telemetry/ingest')
  @ApiOperation({
    summary: 'Ingest IoT microcontroller sensor telemetry (ESP32 Gateway)',
    description: 'Accepts multivariate telemetry packets from Zone 2 & Zone 5 probes, evaluates protection invariants, and emits updates.',
  })
  @ApiResponse({ status: 201, description: 'Telemetry ingested successfully and alerts evaluated' })
  async ingestTelemetry(@Body() dto: TelemetryIngestDto): Promise<TelemetrySnapshot> {
    return this.energyWaterService.ingestTelemetry(dto);
  }

  @Get('telemetry/history')
  @ApiOperation({
    summary: 'Get historical hourly generation, consumption, and storage metrics',
  })
  @ApiQuery({ name: 'hours', required: false, type: Number, description: 'Hours of history (1-24)' })
  @ApiResponse({ status: 200, description: 'Hourly telemetry data points' })
  getHistoricalTelemetry(@Query('hours') hours?: number) {
    return this.energyWaterService.getHistoricalTelemetry(hours ? Number(hours) : 24);
  }

  @Get('policy')
  @ApiOperation({ summary: 'Get current homestead resource dispatch policy' })
  @ApiResponse({ status: 200, description: 'Active dispatch policy' })
  getDispatchPolicy(): DispatchPolicyDto {
    return this.energyWaterService.getDispatchPolicy();
  }

  @Post('policy')
  @ApiOperation({
    summary: 'Update resource dispatch policy',
    description: 'Configure solar excess dump mode, rainwater priority routing, and battery safety floor reserve.',
  })
  @ApiResponse({ status: 200, description: 'Updated dispatch policy' })
  updateDispatchPolicy(@Body() dto: DispatchPolicyDto): DispatchPolicyDto {
    return this.energyWaterService.updateDispatchPolicy(dto);
  }

  @Get('dump-load/status')
  @ApiOperation({ summary: 'Get current status of automated excess solar dump loads' })
  @ApiResponse({ status: 200, description: 'Dump load operating status' })
  getDumpLoadStatus() {
    return this.energyWaterService.getDumpLoadStatus();
  }
}
