import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IntelligenceService } from './intelligence.service';
import { AutonomyScoreResponseDto } from './dto/autonomy-response.dto';
import {
  QueryAssistantDto,
  AssistantQueryResponseDto,
} from './dto/query-assistant.dto';
import {
  DiagnosePlantDto,
  PlantDiagnosisResponseDto,
} from './dto/diagnose-plant.dto';
import { ApplyRecommendationDto } from './dto/apply-recommendation.dto';
import { ActionableRecommendation } from './recommendations.engine';
import { MicroclimateForecast } from './weather-forecast.dto';

@ApiTags('Intelligence Domain')
@Controller('intelligence')
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Get('autonomy')
  @ApiOperation({
    summary: 'Calculate food, water, and energy self-sufficiency scores',
    description: 'Computes real-time caloric, water, solar, and circularity indices along with composite homestead autonomy rating.',
  })
  @ApiResponse({ status: 200, type: AutonomyScoreResponseDto })
  async getAutonomyScores(): Promise<AutonomyScoreResponseDto> {
    return this.intelligenceService.getAutonomyScores();
  }

  @Get('insights')
  @ApiOperation({
    summary: 'Get active AI ecosystem recommendations',
    description: 'Retrieves all actionable insights and circular recommendations requiring steward attention.',
  })
  @ApiResponse({ status: 200, description: 'List of actionable recommendations' })
  async getInsights(): Promise<ActionableRecommendation[]> {
    return this.intelligenceService.getInsights();
  }

  @Post('insights/:id/apply')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Accept recommendation & schedule task',
    description: 'Marks an AI recommendation as APPLIED, triggering dynamic feedback loops and task automation.',
  })
  @ApiResponse({ status: 200, description: 'Recommendation successfully applied' })
  async applyRecommendation(
    @Param('id') id: string,
    @Body() dto: ApplyRecommendationDto
  ): Promise<ActionableRecommendation> {
    return this.intelligenceService.applyRecommendation(id, dto.notes);
  }

  @Post('insights/:id/dismiss')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Dismiss recommendation',
    description: 'Dismisses an AI recommendation from the active queue.',
  })
  @ApiResponse({ status: 200, description: 'Recommendation dismissed' })
  async dismissRecommendation(@Param('id') id: string): Promise<ActionableRecommendation> {
    return this.intelligenceService.dismissRecommendation(id);
  }

  @Post('diagnose')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Plant visual deficiency diagnosis engine',
    description: 'Diagnoses probable macro/micronutrient deficiencies based on leaf zone and chlorosis pattern with organic remedies.',
  })
  @ApiResponse({ status: 200, type: PlantDiagnosisResponseDto })
  async diagnosePlant(@Body() dto: DiagnosePlantDto): Promise<PlantDiagnosisResponseDto> {
    return this.intelligenceService.diagnosePlant(dto);
  }

  @Post('query')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Ask Terra AI Assistant',
    description: 'Consults the permaculture and closed-loop Home OS intelligence model regarding Vincent\'s Farm.',
  })
  @ApiResponse({ status: 200, type: AssistantQueryResponseDto })
  async processQuery(@Body() dto: QueryAssistantDto): Promise<AssistantQueryResponseDto> {
    return this.intelligenceService.processQuery(dto);
  }

  @Get('forecast')
  @ApiOperation({
    summary: 'Get West Java microclimate & rainwater catchment forecast',
    description: 'Computes estimated precipitation, roof catchment liters, and weather mitigation advisories.',
  })
  @ApiResponse({ status: 200, description: 'Microclimate weather forecast and catchment projection' })
  async getForecast(): Promise<MicroclimateForecast> {
    return this.intelligenceService.getForecast();
  }

  @Get('audit')
  @ApiOperation({
    summary: 'Export chat audit trail',
    description: 'Returns serialized JSON history of steward interactions and AI inferences.',
  })
  @ApiResponse({ status: 200, description: 'Serialized JSON chat audit history' })
  exportChatAudit(): string {
    return this.intelligenceService.exportChatAudit();
  }
}
