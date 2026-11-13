import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class RecordWaterTestDto {
  @ApiProperty({ description: 'Bio-Pond identifier or code', example: 'PND-01' })
  @IsString()
  @IsNotEmpty()
  pondId: string;

  @ApiProperty({ description: 'Dissolved Oxygen in mg/L (Alert if < 5.0)', example: 6.2 })
  @IsNumber()
  @Min(0)
  dissolvedOxygenMgL: number;

  @ApiProperty({ description: 'Water pH (Optimal 6.5 - 8.0)', example: 7.2 })
  @IsNumber()
  @Min(0)
  pH: number;

  @ApiProperty({ description: 'Water temperature in Celsius', example: 26.5 })
  @IsNumber()
  waterTempC: number;

  @ApiProperty({ description: 'Total Ammonia Nitrogen (TAN / NH3) in ppm (Alert if > 0.5)', example: 0.15 })
  @IsNumber()
  @Min(0)
  ammoniaPpm: number;

  @ApiProperty({ description: 'Nitrite (NO2-) in ppm (Alert if > 0.2)', example: 0.05, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  nitritePpm?: number;

  @ApiProperty({ description: 'Nitrate (NO3-) in ppm', example: 25.0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  nitratePpm?: number;

  @ApiProperty({ description: 'Observations or physical water clarity notes', example: 'Water green with rich micro-algae, no surface piping observed', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
