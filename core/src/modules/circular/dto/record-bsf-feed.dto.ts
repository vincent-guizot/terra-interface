import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RecordBsfFeedDto {
  @ApiProperty({ example: 'BAT-2026-BSF-08', description: 'BSF Batch Code' })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({ example: 'tray-01', description: 'Target Tray Identifier' })
  @IsString()
  @IsNotEmpty()
  trayId: string;

  @ApiProperty({
    example: 'Kitchen Veg Scraps + Brewery Spent Grain',
    description: 'Substrate biomass composition',
  })
  @IsString()
  @IsNotEmpty()
  organicScrapType: string;

  @ApiProperty({ example: 4.5, description: 'Feed biomass weight in kilograms' })
  @IsNumber()
  @Min(0.1)
  feedWeightKg: number;

  @ApiProperty({ example: 68.0, description: 'Substrate moisture percentage (50-75%)', required: false })
  @IsNumber()
  @IsOptional()
  moisturePercent?: number;

  @ApiProperty({ example: 35.5, description: 'Bed temperature in Celsius', required: false })
  @IsNumber()
  @IsOptional()
  temperatureC?: number;

  @ApiProperty({ example: 'High moisture pre-fermented vegetable pulp', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
