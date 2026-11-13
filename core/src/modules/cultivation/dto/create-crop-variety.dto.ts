import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCropVarietyDto {
  @ApiProperty({ description: 'Common plant variety name', example: 'Butterhead Lettuce (Rex)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Category (Leafy Greens, Herbs, Fruiting Vegetables, Microgreens, Fungi)', example: 'Leafy Greens' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Scientific / botanical name', example: 'Lactuca sativa var. capitata', required: false })
  @IsOptional()
  @IsString()
  scientificName?: string;

  @ApiProperty({ description: 'Target minimum EC in mS/cm', example: 1.2, required: false })
  @IsOptional()
  @IsNumber()
  targetEcMin?: number;

  @ApiProperty({ description: 'Target maximum EC in mS/cm', example: 1.8, required: false })
  @IsOptional()
  @IsNumber()
  targetEcMax?: number;

  @ApiProperty({ description: 'Target minimum pH', example: 5.8, required: false })
  @IsOptional()
  @IsNumber()
  targetPhMin?: number;

  @ApiProperty({ description: 'Target maximum pH', example: 6.5, required: false })
  @IsOptional()
  @IsNumber()
  targetPhMax?: number;

  @ApiProperty({ description: 'Days to harvest maturity from transplant', example: 35, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  daysToMaturity?: number;

  @ApiProperty({ description: 'Recommended growing medium/system', example: 'NFT_SOLUTION', required: false })
  @IsOptional()
  @IsString()
  growingMethod?: string;
}
