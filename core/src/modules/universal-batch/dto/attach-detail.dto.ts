import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class AttachCultivationDetailDto {
  @ApiProperty({ example: 'NFT_SOLUTION', enum: ['NFT_SOLUTION', 'LIVING_SOIL', 'SAWDUST_BAGLOG', 'DWC'] })
  @IsString()
  @IsNotEmpty()
  growingMedium: string;

  @ApiPropertyOptional({ example: 'NATURAL_SUNLIGHT' })
  @IsOptional()
  @IsString()
  lightingType?: string;

  @ApiPropertyOptional({ example: 1.6, description: 'Target EC in mS/cm' })
  @IsOptional()
  @IsNumber()
  ecTarget?: number;

  @ApiPropertyOptional({ example: 6.2, description: 'Target pH' })
  @IsOptional()
  @IsNumber()
  phTarget?: number;

  @ApiPropertyOptional({ example: 4, description: 'Number of vertical NFT channels occupied' })
  @IsOptional()
  @IsNumber()
  trayCount?: number;

  @ApiPropertyOptional({ example: 'Channel-A1' })
  @IsOptional()
  @IsString()
  bedNumber?: string;
}

export class AttachLivestockDetailDto {
  @ApiProperty({ example: 'Ayam KUB' })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({ example: 'DEEP_LITTER_COOP', enum: ['DEEP_LITTER_COOP', 'MOBILE_TRACTOR', 'ELEVATED_SLAT'] })
  @IsString()
  @IsNotEmpty()
  housingSystem: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mortalityCount?: number;

  @ApiPropertyOptional({ example: 2.1, description: 'Feed Conversion Ratio target' })
  @IsOptional()
  @IsNumber()
  targetFcr?: number;
}

export class AttachAquacultureDetailDto {
  @ApiProperty({ example: 'Oreochromis niloticus (Tilapia)' })
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty({ example: 12.0, description: 'Tank volume in m³' })
  @IsNumber()
  @Min(0.1)
  pondVolumeM3: number;

  @ApiPropertyOptional({ example: 25.0, description: 'Max stocking density in kg/m³' })
  @IsOptional()
  @IsNumber()
  targetDensityKgM3?: number;

  @ApiPropertyOptional({ example: 'VENTURI_AND_DIFFUSER' })
  @IsOptional()
  @IsString()
  aerationType?: string;

  @ApiPropertyOptional({ example: 5.0, description: 'Minimum Dissolved Oxygen in mg/L' })
  @IsOptional()
  @IsNumber()
  dissolvedOxygenMin?: number;
}

export class AttachBsfDetailDto {
  @ApiProperty({ example: 'KITCHEN_SCRAPS', enum: ['KITCHEN_SCRAPS', 'POND_SEDIMENT', 'BREWER_GRAINS'] })
  @IsString()
  @IsNotEmpty()
  substrateType: string;

  @ApiProperty({ example: 45.0, description: 'Wet substrate weight in kg' })
  @IsNumber()
  @Min(0.5)
  substrateWeightKg: number;

  @ApiPropertyOptional({ example: 5, description: 'Stacked bioconversion trays' })
  @IsOptional()
  @IsNumber()
  trayCount?: number;
}

export class AttachCompostDetailDto {
  @ApiProperty({ example: 'Bay 1', enum: ['Bay 1', 'Bay 2', 'Bay 3'] })
  @IsString()
  @IsNotEmpty()
  bayNumber: string;

  @ApiPropertyOptional({ example: 30.0, description: 'Initial C:N ratio' })
  @IsOptional()
  @IsNumber()
  carbonNitrogenRatio?: number;

  @ApiPropertyOptional({ example: 10.0, description: 'Biochar inoculation percentage' })
  @IsOptional()
  @IsNumber()
  biocharPercent?: number;
}
