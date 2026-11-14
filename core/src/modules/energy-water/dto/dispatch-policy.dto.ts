import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class DispatchPolicyDto {
  @ApiProperty({
    example: 'EVAPORATIVE_MISTING',
    description: 'Solar excess dump load dispatch target',
    enum: ['EVAPORATIVE_MISTING', 'WATER_HEATER', 'POND_CASCADE_AERATOR', 'BATTERY_STORAGE_ONLY'],
  })
  @IsString()
  @IsNotEmpty()
  solarDumpMode: string;

  @ApiProperty({
    example: 'AQUAPONICS_FIRST',
    description: 'Rainwater routing priority allocation',
    enum: ['AQUAPONICS_FIRST', 'LIVING_SOIL_FIRST', 'DOMESTIC_FIRST', 'BALANCED'],
  })
  @IsString()
  @IsNotEmpty()
  rainwaterPriority: string;

  @ApiProperty({
    example: 20.0,
    description: 'Minimum Battery SoC reserve floor percentage for non-essential load shedding',
  })
  @IsNumber()
  @Min(10)
  @Max(50)
  batteryFloorReservePercent: number;

  @ApiProperty({ example: 'Vincent', description: 'Steward applying the dispatch policy', required: false })
  @IsString()
  @IsOptional()
  stewardName?: string;
}
