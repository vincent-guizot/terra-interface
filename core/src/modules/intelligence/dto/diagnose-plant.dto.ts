import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DiagnosePlantDto {
  @ApiProperty({
    example: 'Lower Old Leaves',
    enum: ['Lower Old Leaves', 'Upper Young Leaves', 'Entire Plant'],
    description: 'Plant canopy zone where chlorosis or deficiency symptom is observed',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Lower Old Leaves', 'Upper Young Leaves', 'Entire Plant'])
  leafZone: 'Lower Old Leaves' | 'Upper Young Leaves' | 'Entire Plant';

  @ApiProperty({
    example: 'Interveinal Yellowing',
    enum: ['Interveinal Yellowing', 'Marginal Scorching', 'Uniform Pale Yellow'],
    description: 'Specific chlorosis pattern observed on the foliage',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Interveinal Yellowing', 'Marginal Scorching', 'Uniform Pale Yellow'])
  chlorosisType: 'Interveinal Yellowing' | 'Marginal Scorching' | 'Uniform Pale Yellow';

  @ApiPropertyOptional({
    example: 'Indeterminate Tomatoes',
    description: 'Crop variety or species under inspection',
  })
  @IsString()
  @IsOptional()
  cropType?: string;
}

export class PlantDiagnosisResponseDto {
  @ApiProperty({ example: 'Magnesium (Mg)' })
  probableDeficiency: string;

  @ApiProperty({ example: 'Foliar spray of 1% Epsom salt (magnesium sulfate) or fermented banana stem juice.' })
  organicHomesteadRemedy: string;

  @ApiProperty({ example: 'High' })
  urgency: 'Immediate' | 'Suggested' | 'Informational';

  @ApiProperty({ example: 'Zone 4: Permaculture Beds' })
  recommendedTargetZone: string;
}
