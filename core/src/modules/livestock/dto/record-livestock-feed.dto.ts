import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class RecordLivestockFeedDto {
  @ApiProperty({ description: 'Batch code or animal group ID', example: 'BAT-2026-LIV-01' })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({ description: 'Feed type or formulation name', example: 'BSF Live Prepupae + Bran Mash' })
  @IsString()
  @IsNotEmpty()
  feedType: string;

  @ApiProperty({ description: 'Quantity fed in kg', example: 2.8 })
  @IsNumber()
  @Min(0.01)
  quantityKg: number;

  @ApiProperty({ description: 'Portion of feed supplied from on-farm circular resources in % (0 - 100)', example: 65, required: false })
  @IsOptional()
  @IsNumber()
  circularPortionPercent?: number;

  @ApiProperty({ description: 'Feeding time of day', example: 'Morning Ration (07:30)', required: false })
  @IsOptional()
  @IsString()
  feedTime?: string;

  @ApiProperty({ description: 'Steward observations during feeding', example: 'High flock appetite, empty troughs in 12 mins', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
