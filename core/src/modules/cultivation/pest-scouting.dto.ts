import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class PestScoutingDto {
  @ApiProperty({ description: 'Homestead Zone code or ID where pest was observed', example: 'Z-01' })
  @IsString()
  @IsNotEmpty()
  zoneId: string;

  @ApiProperty({
    description: 'Identified pest or plant pathogen',
    example: 'Aphids',
    enum: ['Aphids', 'Whiteflies', 'Spider Mites', 'Fungus Gnats', 'Powdery Mildew', 'Caterpillars'],
  })
  @IsString()
  @IsIn(['Aphids', 'Whiteflies', 'Spider Mites', 'Fungus Gnats', 'Powdery Mildew', 'Caterpillars'])
  identifiedPest: string;

  @ApiProperty({
    description: 'Infestation severity level',
    example: 'Low',
    enum: ['Low', 'Moderate', 'Severe'],
  })
  @IsString()
  @IsIn(['Low', 'Moderate', 'Severe'])
  infestationLevel: string;

  @ApiProperty({ description: 'Specific plants or benches affected', example: 'NFT Gully 2 - Bok Choy' })
  @IsString()
  @IsNotEmpty()
  affectedArea: string;

  @ApiProperty({ description: 'Organic recipe or biological control recommendation', example: 'Neem Oil Emulsion spray at dusk', required: false })
  @IsOptional()
  @IsString()
  recommendedBioControl?: string;

  @ApiProperty({ description: 'Scouting observations and environmental notes', example: 'Cluster on underside of younger foliage', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export const organicPestFormulas: Record<string, { recipe: string; targets: string[]; instructions: string }> = {
  neemOilEmulsion: {
    recipe: '5ml Cold-pressed Neem Oil + 2ml Pure Castile Soap per 1L Rainwater',
    targets: ['Aphids', 'Whiteflies', 'Spider Mites'],
    instructions: 'Emulsify oil and soap in warm water first, spray at dusk on foliage underside every 3 days until resolved.',
  },
  horsetailDecoction: {
    recipe: '50g Dried Equisetum arvense boiled in 1L Water for 30 min (Anti-fungal silica)',
    targets: ['Powdery Mildew', 'Damping Off', 'Leaf Spot'],
    instructions: 'Strain and dilute 1:5 with rainwater, spray early morning as prophylactic cell wall strengthener.',
  },
  garlicChiliExtract: {
    recipe: '3 cloves Garlic + 2 Hot Birdseye Chillies steeped in 1L warm water + 1ml dish soap',
    targets: ['Caterpillars', 'Grasshoppers', 'Beetles'],
    instructions: 'Steep 24 hours, strain through cheesecloth. Spray heavily on perimeter foliage.',
  },
  yellowStickyTraps: {
    recipe: 'Cadmium-free yellow card coated with non-drying petroleum jelly/entomological glue',
    targets: ['Fungus Gnats', 'Whiteflies', 'Leafminers'],
    instructions: 'Place 10cm above plant canopy at high-density points.',
  },
};
