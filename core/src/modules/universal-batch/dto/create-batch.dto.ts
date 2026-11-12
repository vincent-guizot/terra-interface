import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBatchDto {
  @ApiProperty({
    example: 'BAT-2026-CUL-01',
    description: 'Unique structured batch code',
  })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({
    example: 'Spring Greenhouse Bok Choy NFT',
    description: 'Operational title of the batch',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'CULTIVATION',
    enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'],
    description: 'Biological production domain',
  })
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty({
    example: 'uuid-zone-1',
    description: 'Assigned 300 m² zone ID',
  })
  @IsString()
  @IsNotEmpty()
  zoneId: string;

  @ApiProperty({
    example: '2026-11-12T08:00:00.000Z',
    description: 'Start or transplanting date',
  })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({
    example: '2026-12-20T17:00:00.000Z',
    description: 'Projected completion or final harvest date',
  })
  @IsOptional()
  @IsDateString()
  expectedEndDate?: string;

  @ApiProperty({
    example: 120,
    description: 'Initial quantity placed into production',
  })
  @IsNumber()
  initialQuantity: number;

  @ApiProperty({
    example: 'heads',
    description: 'Measurement unit (kg, pcs, heads, fingerlings, birds)',
  })
  @IsString()
  @IsNotEmpty()
  measurementUnit: string;

  @ApiPropertyOptional({
    example: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected.',
    description: 'Steward notes and operational parameters',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
