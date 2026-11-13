import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class RecordMortalityDto {
  @ApiProperty({ description: 'Batch code of animal group', example: 'BAT-2026-LIV-01' })
  @IsString()
  @IsNotEmpty()
  batchCode: string;

  @ApiProperty({ description: 'Number of head lost', example: 1 })
  @IsNumber()
  @Min(1)
  count: number;

  @ApiProperty({ description: 'Suspected cause of mortality', example: 'Heat stress / Egg bound' })
  @IsString()
  @IsNotEmpty()
  suspectedCause: string;

  @ApiProperty({ description: 'Disposal method', example: 'Bokashi Deep Pit / Pyrolysis Inoculation', required: false })
  @IsOptional()
  @IsString()
  disposalMethod?: string;

  @ApiProperty({ description: 'Steward autopsy notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
