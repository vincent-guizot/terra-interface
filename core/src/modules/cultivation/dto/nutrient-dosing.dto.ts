import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class NutrientDosingDto {
  @ApiProperty({ description: 'Target Electrical Conductivity in mS/cm', example: 1.8 })
  @IsNumber()
  @Min(0.1)
  ecTarget: number;

  @ApiProperty({ description: 'Current measured Electrical Conductivity in mS/cm', example: 1.2 })
  @IsNumber()
  @Min(0)
  currentEc: number;

  @ApiProperty({ description: 'Total reservoir nutrient solution volume in Liters', example: 200 })
  @IsNumber()
  @Min(1)
  reservoirLiters: number;

  @ApiProperty({ description: 'Target solution pH', example: 6.0, required: false })
  @IsOptional()
  @IsNumber()
  targetPh?: number;

  @ApiProperty({ description: 'Current measured pH', example: 6.8, required: false })
  @IsOptional()
  @IsNumber()
  currentPh?: number;
}
