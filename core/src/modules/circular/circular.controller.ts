import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CircularService } from './circular.service';
import { RecordBsfFeedDto } from './dto/record-bsf-feed.dto';
import { RecordMaggotHarvestDto } from './dto/record-maggot-harvest.dto';
import { RecordCompostTurnDto } from './dto/record-compost-turn.dto';
import { RecordCompostHarvestDto } from './dto/record-compost-harvest.dto';

@ApiTags('Circular Systems & Bioconversion')
@Controller('circular')
export class CircularController {
  constructor(private readonly circularService: CircularService) {}

  @Get('overview')
  @ApiOperation({
    summary: 'Get circular systems overview and homestead closed-loop score',
    description: 'Calculates biomass recycling, insect bioconversion metrics, and total closed-loop percentage.',
  })
  @ApiResponse({ status: 200, description: 'Circular systems overview' })
  async getCircularOverview() {
    return this.circularService.getCircularOverview();
  }

  @Get('bsf/trays')
  @ApiOperation({ summary: 'Get active BSF bioconversion trays and prepupae readiness' })
  @ApiResponse({ status: 200, description: 'List of active BSF stacked trays' })
  async getBsfTrays() {
    return this.circularService.getBsfTrays();
  }

  @Post('bsf/feed')
  @ApiOperation({ summary: 'Record organic food scrap or substrate input into BSF tray' })
  @ApiResponse({ status: 201, description: 'BSF feeding recorded' })
  async recordBsfFeed(@Body() dto: RecordBsfFeedDto) {
    return this.circularService.recordBsfFeed(dto);
  }

  @Post('bsf/harvest')
  @ApiOperation({
    summary: 'Record live maggot prepupae crawl-off and frass bio-fertilizer harvest',
    description: 'Logs prepupae yield, calculates crude protein (42.4%), routes to livestock/fish, and creates inventory harvest movements.',
  })
  @ApiResponse({ status: 201, description: 'Maggot harvest recorded and added to inventory' })
  async recordMaggotHarvest(@Body() dto: RecordMaggotHarvestDto) {
    return this.circularService.recordMaggotHarvest(dto);
  }

  @Get('compost/batches')
  @ApiOperation({ summary: 'Get Bokashi and hot aerobic composting batches and maturity indices' })
  @ApiResponse({ status: 200, description: 'List of compost bay statuses' })
  async getCompostBatches() {
    return this.circularService.getCompostBatches();
  }

  @Post('compost/turn')
  @ApiOperation({
    summary: 'Log aerobic compost turning and temperature probe readings',
    description: 'Records core/edge temperatures, checks thermophilic pasteurization stage (55-65°C), and logs biochar activation additions.',
  })
  @ApiResponse({ status: 201, description: 'Compost turn and temperature recorded' })
  async recordCompostTurn(@Body() dto: RecordCompostTurnDto) {
    return this.circularService.recordCompostTurn(dto);
  }

  @Post('compost/harvest')
  @ApiOperation({ summary: 'Record mature humus harvest from compost bay into inventory' })
  @ApiResponse({ status: 201, description: 'Compost harvest recorded' })
  async recordCompostHarvest(@Body() dto: RecordCompostHarvestDto) {
    return this.circularService.recordCompostHarvest(dto);
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Get homestead circularity index score and waste diversion statistics' })
  @ApiResponse({ status: 200, description: 'Circularity metrics' })
  getCircularityMetrics() {
    return this.circularService.getCircularityMetrics();
  }

  @Get('biochar/standards')
  @ApiOperation({ summary: 'Get biochar quench and nutrient charging standards' })
  @ApiResponse({ status: 200, description: 'Biochar activation standards' })
  getBiocharStandards() {
    return this.circularService.getBiocharQuenchBatch();
  }
}
