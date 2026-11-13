import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CultivationService } from './cultivation.service';
import { NutrientDosingDto } from './dto/nutrient-dosing.dto';
import { CreateCropVarietyDto } from './dto/create-crop-variety.dto';
import { PestScoutingDto } from './pest-scouting.dto';

@ApiTags('Homestead Cultivation')
@Controller('cultivation')
export class CultivationController {
  constructor(private readonly cultivationService: CultivationService) {}

  @Get('catalog')
  @ApiOperation({
    summary: 'Get crop variety catalog',
    description: 'Retrieves plant and mushroom cultivars with optimal EC, pH, and days to maturity.',
  })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category (Leafy Greens, Herbs, Fruiting Vegetables, Fungi, Microgreens)' })
  @ApiResponse({ status: 200, description: 'List of crop varieties' })
  async getCatalog(@Query('category') category?: string) {
    return this.cultivationService.getCatalog(category);
  }

  @Post('catalog')
  @ApiOperation({ summary: 'Register a new crop or cultivar variety' })
  @ApiResponse({ status: 201, description: 'Crop variety registered successfully' })
  async createCropVariety(@Body() dto: CreateCropVarietyDto) {
    return this.cultivationService.createCropVariety(dto);
  }

  @Get('batches/active')
  @ApiOperation({
    summary: 'Get all active cultivation batches',
    description: 'Returns active hydroponic, substrate, and raised bed batches in Zone 1 and Zone 4.',
  })
  @ApiResponse({ status: 200, description: 'List of active cultivation batches' })
  async getActiveBatches() {
    return this.cultivationService.getActiveBatches();
  }

  @Post('nutrient-dosing')
  @ApiOperation({
    summary: 'Calculate A/B nutrient concentrate and pH dosing',
    description: 'Calculates concentrate injections in mL based on current EC deficit, target EC, and reservoir volume.',
  })
  @ApiResponse({ status: 200, description: 'Nutrient pump dosing calculations' })
  async calculateNutrientDosing(@Body() dto: NutrientDosingDto) {
    return this.cultivationService.calculateNutrientDosing(dto);
  }

  @Get('microgreens/calibration')
  @ApiOperation({
    summary: 'Get microgreen yield and seeding calibration models',
    description: 'Provides seeding densities in grams per tray, blackout days, and fresh weight multipliers.',
  })
  @ApiResponse({ status: 200, description: 'Microgreen calibrations' })
  async getMicrogreensCalibration() {
    return this.cultivationService.getMicrogreenCalibration();
  }

  @Post('pest-scouting')
  @ApiOperation({
    summary: 'Log pest scouting observation and receive organic biocontrol recipe',
  })
  @ApiResponse({ status: 201, description: 'Observation recorded with treatment recipe' })
  async recordPestScouting(@Body() dto: PestScoutingDto) {
    return this.cultivationService.recordPestScouting(dto);
  }

  @Get('pest-scouting/history')
  @ApiOperation({ summary: 'Get pest scouting observation history' })
  @ApiResponse({ status: 200, description: 'Historical scouting records' })
  async getScoutingHistory() {
    return this.cultivationService.getScoutingHistory();
  }

  @Get('pest-scouting/recipes')
  @ApiOperation({
    summary: 'List organic biocontrol recipes',
    description: 'Recipes for Neem oil emulsion, Horsetail decoction, Garlic-chili extract, and mechanical traps.',
  })
  @ApiResponse({ status: 200, description: 'Organic biopesticide recipes' })
  async getOrganicPestRecipes() {
    return this.cultivationService.getOrganicPestRecipes();
  }
}
