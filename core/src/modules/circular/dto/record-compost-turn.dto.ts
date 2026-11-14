import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RecordCompostTurnDto {
  @ApiProperty({ example: 'BAT-2026-CMP-12', description: 'Compost Batch Code' })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({ example: 'Bay 1', description: 'Compost Bay Identifier (Bay 1, Bay 2, Bay 3)' })
  @IsString()
  @IsNotEmpty()
  bayNumber: string;

  @ApiProperty({ example: 62.5, description: 'Core pile temperature in Celsius' })
  @IsNumber()
  coreTempC: number;

  @ApiProperty({ example: 46.0, description: 'Edge pile temperature in Celsius' })
  @IsNumber()
  edgeTempC: number;

  @ApiProperty({ example: 27.5, description: 'Ambient outdoor air temperature in Celsius' })
  @IsNumber()
  ambientTempC: number;

  @ApiProperty({ example: 3, description: 'Aerobic aeration turn iteration count' })
  @IsNumber()
  @Min(1)
  turnCount: number;

  @ApiProperty({ example: 55.0, description: 'Pile moisture percentage (target 50-60%)' })
  @IsNumber()
  moisturePercent: number;

  @ApiProperty({ example: 5.0, description: 'Activated biochar addition in kilograms', required: false })
  @IsNumber()
  @IsOptional()
  biocharAddedKg?: number;

  @ApiProperty({ example: 10.0, description: 'Water or compost tea added to hydrate pile in Liters', required: false })
  @IsNumber()
  @IsOptional()
  waterAddedLiters?: number;

  @ApiProperty({ example: 'Active thermophilic stage reached; pleasant earthy aroma', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
