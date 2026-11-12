import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RecordBatchOutputDto {
  @ApiProperty({
    example: 'Fresh Bok Choy Grade A',
    description: 'Name of the harvested or produced output',
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    example: 14.5,
    description: 'Weight or quantity harvested',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'kg',
    description: 'Measurement unit',
  })
  @IsString()
  @IsNotEmpty()
  measurementUnit: string;

  @ApiPropertyOptional({
    example: 'Grade A',
    description: 'Quality grade assessment',
  })
  @IsOptional()
  @IsString()
  qualityGrade?: string;

  @ApiPropertyOptional({
    example: 'Homestead Pantry / Cold Cellar',
    description: 'Storage location or destination',
  })
  @IsOptional()
  @IsString()
  destination?: string;
}
