import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RecordCompostHarvestDto {
  @ApiProperty({ example: 'BAT-2026-CMP-12', description: 'Compost Batch Code' })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({ example: 'Bay 1', description: 'Compost Bay Identifier' })
  @IsString()
  @IsNotEmpty()
  bayNumber: string;

  @ApiProperty({ example: 120.0, description: 'Cured mature humus compost yield in kilograms' })
  @IsNumber()
  @Min(0.1)
  curedHumusKg: number;

  @ApiProperty({ example: 96.0, description: 'Solvita / Soluble maturity score index (0-100%)', required: false })
  @IsNumber()
  @IsOptional()
  curedMaturityScore?: number;

  @ApiProperty({
    example: 'Zone 4 Permaculture Raised Beds',
    description: 'Target application destination',
    required: false,
  })
  @IsString()
  @IsOptional()
  destination?: string;

  @ApiProperty({ example: 'Dark brown, rich crumbly humus with zero foul odors', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
