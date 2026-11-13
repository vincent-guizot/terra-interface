import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LivestockService } from './livestock.service';
import { RecordEggHarvestDto } from './dto/record-egg-harvest.dto';
import { RecordLivestockFeedDto } from './dto/record-livestock-feed.dto';
import { RecordMortalityDto } from './dto/record-mortality.dto';

@ApiTags('Homestead Livestock')
@Controller('livestock')
export class LivestockController {
  constructor(private readonly livestockService: LivestockService) {}

  @Get('animals')
  @ApiOperation({
    summary: 'Get livestock inventory',
    description: 'Retrieves current flocks and herds in Zone 3 (Poultry & Small Ruminants Hub).',
  })
  @ApiQuery({ name: 'breed', required: false })
  @ApiQuery({ name: 'housingSystem', required: false })
  @ApiResponse({ status: 200, description: 'List of livestock cohorts' })
  async getAnimals(
    @Query('breed') breed?: string,
    @Query('housingSystem') housingSystem?: string,
  ) {
    return this.livestockService.getAnimals(breed, housingSystem);
  }

  @Post('egg-harvest')
  @ApiOperation({
    summary: 'Record daily egg collection and calculate Hen-Day Production %',
  })
  @ApiResponse({ status: 201, description: 'Egg harvest recorded and added to pantry' })
  async recordEggHarvest(@Body() dto: RecordEggHarvestDto) {
    return this.livestockService.recordEggHarvest(dto);
  }

  @Get('egg-harvest/history')
  @ApiOperation({ summary: 'Get historical egg harvest records' })
  @ApiResponse({ status: 200, description: 'Egg collection logs' })
  async getEggHarvestLogs() {
    return this.livestockService.getEggHarvestLogs();
  }

  @Post('feeding')
  @ApiOperation({
    summary: 'Record daily feed ration for poultry or ruminants',
  })
  @ApiResponse({ status: 201, description: 'Feed ration recorded' })
  async recordFeeding(@Body() dto: RecordLivestockFeedDto) {
    return this.livestockService.recordFeeding(dto);
  }

  @Get('feeding/history')
  @ApiOperation({ summary: 'Get feeding logs' })
  @ApiResponse({ status: 200, description: 'Historical feed ration records' })
  async getFeedingLogs() {
    return this.livestockService.getFeedingLogs();
  }

  @Post('mortality')
  @ApiOperation({
    summary: 'Record mortality event and decrement live batch population',
  })
  @ApiResponse({ status: 201, description: 'Mortality logged and population updated' })
  async recordMortality(@Body() dto: RecordMortalityDto) {
    return this.livestockService.recordMortality(dto);
  }

  @Get('benchmarks/growth')
  @ApiOperation({
    summary: 'Get meat bird and poultry growth benchmarks (FCR and target weights)',
  })
  @ApiResponse({ status: 200, description: 'Standard growth curves' })
  async getGrowthBenchmarks() {
    return this.livestockService.getGrowthBenchmarks();
  }

  @Get('grazing/paddocks')
  @ApiOperation({
    summary: 'Get rotational grazing paddock schedule and resting cycles',
  })
  @ApiResponse({ status: 200, description: 'Active rotational paddock plan' })
  async getPaddockPlan() {
    return this.livestockService.getPaddockPlan();
  }
}
