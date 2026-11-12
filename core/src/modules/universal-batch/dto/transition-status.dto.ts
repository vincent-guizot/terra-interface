import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BatchStatus } from '../universal-batch.service';

export class TransitionBatchStatusDto {
  @ApiProperty({
    enum: BatchStatus,
    example: BatchStatus.COMPLETED,
    description: 'New universal lifecycle state (DRAFT -> PLANNED -> ACTIVE -> ON_HOLD -> COMPLETED / CANCELLED)',
  })
  @IsEnum(BatchStatus)
  status: BatchStatus;

  @ApiPropertyOptional({
    example: 'Final selective harvest concluded. Yield target achieved at 94.5%.',
    description: 'Reason for the state transition for audit logging',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
