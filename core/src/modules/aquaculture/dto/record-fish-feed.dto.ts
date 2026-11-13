import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class RecordFishFeedDto {
  @ApiProperty({ description: 'Bio-Pond identifier or code', example: 'PND-01' })
  @IsString()
  @IsNotEmpty()
  pondId: string;

  @ApiProperty({ description: 'Feed type or formulation name', example: 'Duckweed (Fresh Lemna minor) + 32% CP Pellets' })
  @IsString()
  @IsNotEmpty()
  feedType: string;

  @ApiProperty({ description: 'Amount fed in grams', example: 650 })
  @IsNumber()
  @Min(1)
  amountGrams: number;

  @ApiProperty({ description: 'Observed feeding response', example: 'Aggressive / Surface Voracious', required: false })
  @IsOptional()
  @IsString()
  feedingBehavior?: string;

  @ApiProperty({ description: 'Water temperature during feeding in Celsius', example: 27.0, required: false })
  @IsOptional()
  @IsNumber()
  waterTemperatureC?: number;

  @ApiProperty({ description: 'Notes on feed consumption or unconsumed residues', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
