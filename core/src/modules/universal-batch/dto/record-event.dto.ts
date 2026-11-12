import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RecordBatchEventDto {
  @ApiProperty({
    example: 'OBSERVATION',
    enum: ['FEEDING', 'OBSERVATION', 'TREATMENT', 'MORTALITY', 'WATER_TEST', 'PRUNING', 'EC_CALIBRATION'],
  })
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @ApiProperty({
    example: { note: 'Leaves showing deep emerald green, no signs of tip burn', ec: 1.62, ph: 6.1 },
    description: 'Dynamic event payload payload structured as JSON',
  })
  data: Record<string, any>;

  @ApiPropertyOptional({ example: 'Vincent' })
  @IsOptional()
  @IsString()
  recordedBy?: string;
}
