import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'Leafy Greens' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CULTIVATION', enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'] })
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiPropertyOptional({ example: 'Grass' })
  @IsOptional()
  @IsString()
  icon?: string;
}

export class CreateProductDefinitionDto {
  @ApiProperty({ example: 'Bok Choy White Stem' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'SKU-CUL-BOK-01' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 'cat-uuid-1' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ example: 'unit-uuid-kg' })
  @IsOptional()
  @IsString()
  defaultUnitId?: string;

  @ApiPropertyOptional({ example: 1.05, description: 'Required for Mass <-> Volume conversion' })
  @IsOptional()
  @IsNumber()
  densityKgPerL?: number;
}
