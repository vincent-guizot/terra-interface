import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, IsString } from 'class-validator';

export class RecordEggHarvestDto {
  @ApiProperty({ description: 'Batch code or ID of the layer flock', example: 'BAT-2026-LIV-01' })
  @IsString()
  batchCode: string;

  @ApiProperty({ description: 'Total eggs collected today', example: 21 })
  @IsNumber()
  @Min(0)
  eggsCollected: number;

  @ApiProperty({ description: 'Count of Grade A table eggs', example: 19, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gradeACount?: number;

  @ApiProperty({ description: 'Count of cracked or broken eggs', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  crackedCount?: number;

  @ApiProperty({ description: 'Average egg weight in grams', example: 45.2, required: false })
  @IsOptional()
  @IsNumber()
  averageEggWeightGrams?: number;

  @ApiProperty({ description: 'Flock size (total active hens)', example: 24, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  totalHens?: number;

  @ApiProperty({ description: 'Steward notes', example: 'Clean shells, strong calcium luster', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
