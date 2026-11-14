import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryAssistantDto {
  @ApiProperty({
    example: 'How is the nitrogen balance in Pond Alpha and NFT beds?',
    description: 'Natural language steward query regarding homestead operations or permaculture biology',
  })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiPropertyOptional({
    example: 'vincent-session-01',
    description: 'Optional conversation session identifier for audit trail',
  })
  @IsString()
  @IsOptional()
  sessionId?: string;

  @ApiPropertyOptional({
    example: 'Cultivation & Aquaculture',
    description: 'Optional operational context focus',
  })
  @IsString()
  @IsOptional()
  context?: string;
}

export class AssistantQueryResponseDto {
  @ApiProperty({ example: 'Nutrient loop status: Zone 2 biofilter is converting 94% of ammonia into nitrates...' })
  reply: string;

  @ApiProperty({ example: 'Nitrogen Cycling' })
  intentCategory: string;

  @ApiProperty({ example: ['Zone 2: Aquaponics Greenhouse', 'Zone 4: Permaculture Beds'] })
  relatedZones: string[];

  @ApiProperty({ example: 0.94 })
  confidenceScore: number;

  @ApiProperty({ example: '2026-11-14T07:00:00.000Z' })
  timestamp: string;
}
