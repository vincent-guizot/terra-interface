import { ApiProperty } from '@nestjs/swagger';

export class EquipmentDto {
  @ApiProperty({ example: 'eq-1' })
  id: string;

  @ApiProperty({ example: 'Resun LP-100 Air Pump' })
  name: string;

  @ApiProperty({ example: 100.0 })
  ratedPowerWatt: number;

  @ApiProperty({ example: 'OPERATIONAL' })
  status: string;
}

export class FacilityDto {
  @ApiProperty({ example: 'fac-1' })
  id: string;

  @ApiProperty({ example: 'Bio-Pond Alpha' })
  name: string;

  @ApiProperty({ example: 'BIO_POND' })
  type: string;

  @ApiProperty({ type: [EquipmentDto], required: false })
  equipment?: EquipmentDto[];
}

export class BuildingDto {
  @ApiProperty({ example: 'bld-1' })
  id: string;

  @ApiProperty({ example: 'Polycarbonate Greenhouse' })
  name: string;

  @ApiProperty({ example: 29.25 })
  footprintSqm: number;
}

export class ZoneResponseDto {
  @ApiProperty({ example: 'z-1' })
  id: string;

  @ApiProperty({ example: 'Z-01' })
  code: string;

  @ApiProperty({ example: 'Smart Micro-Greenhouse' })
  name: string;

  @ApiProperty({ example: 35.0 })
  areaSqm: number;

  @ApiProperty({ example: 'CULTIVATION' })
  type: string;

  @ApiProperty({ example: '#10B981' })
  colorHex: string;

  @ApiProperty({ type: [BuildingDto], required: false })
  buildings?: BuildingDto[];

  @ApiProperty({ type: [FacilityDto], required: false })
  facilities?: FacilityDto[];
}
