import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class RecordMaggotHarvestDto {
  @ApiProperty({ example: 'BAT-2026-BSF-08', description: 'BSF Batch Code' })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({ example: 'tray-01', description: 'Harvested Tray Identifier' })
  @IsString()
  @IsNotEmpty()
  trayId: string;

  @ApiProperty({ example: 2.4, description: 'Live 5-instar prepupae weight in kilograms' })
  @IsNumber()
  @Min(0.01)
  prepupaeYieldKg: number;

  @ApiProperty({ example: 4.8, description: 'Insect frass biofertilizer weight in kilograms' })
  @IsNumber()
  @Min(0)
  frassYieldKg: number;

  @ApiProperty({ example: 1.5, description: 'Live prepupae allocated to Zone 3 poultry', required: false })
  @IsNumber()
  @IsOptional()
  allocatedToPoultryKg?: number;

  @ApiProperty({ example: 0.9, description: 'Live prepupae allocated to Zone 2 bio-ponds', required: false })
  @IsNumber()
  @IsOptional()
  allocatedToTilapiaKg?: number;

  @ApiProperty({ example: 0.0, description: 'Prepupae dried or stored for pantry buffer', required: false })
  @IsNumber()
  @IsOptional()
  allocatedToStorageKg?: number;

  @ApiProperty({ example: 'Optimal dark prepupae crawl-off harvested at peak protein', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
