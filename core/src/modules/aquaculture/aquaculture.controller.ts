import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AquacultureService } from './aquaculture.service';
import { RecordWaterTestDto } from './dto/record-water-test.dto';
import { RecordFishFeedDto } from './dto/record-fish-feed.dto';

@ApiTags('Homestead Aquaculture')
@Controller('aquaculture')
export class AquacultureController {
  constructor(private readonly aquacultureService: AquacultureService) {}

  @Get('ponds')
  @ApiOperation({
    summary: 'Get bio-pond status and stocking metrics',
    description: 'Retrieves ponds in Zone 2: Tilapia IBC biofloc, Catfish tanks, and macrophyte basins.',
  })
  @ApiResponse({ status: 200, description: 'List of bio-ponds' })
  async getPonds() {
    return this.aquacultureService.getPonds();
  }

  @Get('water-quality')
  @ApiOperation({
    summary: 'Get water quality telemetry & test history',
    description: 'Returns DO (Dissolved Oxygen), pH, temp, ammonia, and nitrite readings.',
  })
  @ApiQuery({ name: 'pondId', required: false })
  @ApiResponse({ status: 200, description: 'Historical water quality logs' })
  async getWaterQuality(@Query('pondId') pondId?: string) {
    return this.aquacultureService.getWaterQuality(pondId);
  }

  @Post('water-test')
  @ApiOperation({
    summary: 'Record chemical reagent or optical probe water test',
    description: 'Logs water parameters and automatically generates alerts if DO < 5.0 mg/L or Ammonia > 0.5 ppm.',
  })
  @ApiResponse({ status: 201, description: 'Water test logged and evaluated' })
  async recordWaterTest(@Body() dto: RecordWaterTestDto) {
    return this.aquacultureService.recordWaterTest(dto);
  }

  @Post('feeding')
  @ApiOperation({
    summary: 'Record fish feeding event with ration and behavior',
  })
  @ApiResponse({ status: 201, description: 'Fish feeding event recorded' })
  async recordFeeding(@Body() dto: RecordFishFeedDto) {
    return this.aquacultureService.recordFeeding(dto);
  }

  @Get('feeding/history')
  @ApiOperation({ summary: 'Get fish feeding history' })
  @ApiResponse({ status: 200, description: 'Feeding logs' })
  async getFishFeedLogs() {
    return this.aquacultureService.getFishFeedLogs();
  }

  @Get('aeration/cycles')
  @ApiOperation({
    summary: 'Get automated aeration duty cycles and sludge purging protocols',
  })
  @ApiResponse({ status: 200, description: 'Aeration cycle parameters' })
  async getAerationSchedule() {
    return this.aquacultureService.getAerationSchedule();
  }
}
