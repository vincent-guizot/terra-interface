import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ApplyRecommendationDto {
  @ApiPropertyOptional({
    example: 'Scheduled for tomorrow morning after egg collection',
    description: 'Optional execution notes or steward override comments',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
