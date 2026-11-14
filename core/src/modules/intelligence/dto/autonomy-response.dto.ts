import { ApiProperty } from '@nestjs/swagger';

export class AutonomyMetricsBreakdownDto {
  @ApiProperty({ example: 4200, description: 'Current daily calorie harvest rate (kcal/day)' })
  dailyCaloriesProduced: number;

  @ApiProperty({ example: 5000, description: 'Homestead target daily calorie requirement (kcal/day)' })
  dailyCalorieTarget: number;

  @ApiProperty({ example: 6850, description: 'Current rainwater storage across 4 cisterns (L)' })
  cisternStorageLiters: number;

  @ApiProperty({ example: 20.1, description: 'Days of water autonomy remaining' })
  waterAutonomyDays: number;

  @ApiProperty({ example: 22.4, description: 'Daily solar PV energy yield (kWh)' })
  solarDailyGenerationKwh: number;

  @ApiProperty({ example: 18.4, description: 'Hours of battery autonomy at current homestead load' })
  batteryAutonomyHours: number;

  @ApiProperty({ example: 96.6, description: 'Percentage of organic waste diverted from landfill (%)' })
  wasteDivertedPercent: number;
}

export class AutonomyScoreResponseDto {
  @ApiProperty({ example: 91.8, description: 'Composite homestead autonomy index (0 - 100)' })
  overallAutonomyScore: number;

  @ApiProperty({ example: 84.0, description: 'Food / Caloric self-sufficiency index (%)' })
  foodScore: number;

  @ApiProperty({ example: 94.5, description: 'Water self-sufficiency index (%)' })
  waterScore: number;

  @ApiProperty({ example: 96.8, description: 'Microgrid electrical self-sufficiency index (%)' })
  energyScore: number;

  @ApiProperty({ example: 96.6, description: 'Closed-loop biological circularity index (%)' })
  circularityScore: number;

  @ApiProperty({ example: 'EXCELLENT', enum: ['EXCELLENT', 'GOOD', 'MODERATE', 'CRITICAL'] })
  rating: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'CRITICAL';

  @ApiProperty({ description: 'Detailed biological and physical telemetry metrics' })
  metrics: AutonomyMetricsBreakdownDto;

  @ApiProperty({ example: '2026-11-14T07:00:00.000Z' })
  calculatedAt: string;
}
