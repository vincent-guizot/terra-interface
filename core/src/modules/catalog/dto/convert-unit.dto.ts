import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class ConvertUnitDto {
  @ApiProperty({ example: 10.0 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 'kg' })
  @IsString()
  @IsNotEmpty()
  sourceUnit: string;

  @ApiProperty({ example: 'g' })
  @IsString()
  @IsNotEmpty()
  targetUnit: string;

  @ApiPropertyOptional({ example: 1.05, description: 'Required when converting between Mass (kg) and Volume (L)' })
  @IsOptional()
  @IsNumber()
  densityKgPerL?: number;
}
