import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @ApiProperty({ example: 'SKU-BIO-02', description: 'Unique Stock Keeping Unit' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 'Bokashi Bran Mother Culture', description: 'Item name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Biologicals', description: 'Item category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'loc-4', description: 'Storage Location UUID or code' })
  @IsString()
  @IsNotEmpty()
  locationId: string;

  @ApiProperty({ example: 'kg', description: 'Measurement unit' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ example: 5.0, description: 'Minimum reorder threshold' })
  @IsNumber()
  @Min(0)
  minThreshold: number;

  @ApiProperty({ example: 10.0, description: 'Initial stock quantity', required: false })
  @IsNumber()
  @IsOptional()
  initialStock?: number;
}
