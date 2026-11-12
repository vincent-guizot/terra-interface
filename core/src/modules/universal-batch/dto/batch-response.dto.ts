import { ApiProperty } from '@nestjs/swagger';

export class BatchOutputResponseDto {
  @ApiProperty({ example: 'out-uuid-1' })
  id: string;

  @ApiProperty({ example: 'Fresh Bok Choy Grade A' })
  productName: string;

  @ApiProperty({ example: 14.5 })
  quantity: number;

  @ApiProperty({ example: 'kg' })
  measurementUnit: string;

  @ApiProperty({ example: 'Grade A' })
  qualityGrade: string;

  @ApiProperty({ example: '2026-11-12T07:15:00.000Z' })
  harvestDate: Date;
}

export class BatchAuditLogResponseDto {
  @ApiProperty({ example: 'audit-uuid-1' })
  id: string;

  @ApiProperty({ example: 'First Cut Harvest Recorded' })
  action: string;

  @ApiProperty({ example: 'Vincent' })
  performedBy: string;

  @ApiProperty({ example: '2026-11-12T07:15:00.000Z' })
  timestamp: Date;
}

export class BatchResponseDto {
  @ApiProperty({ example: 'batch-uuid-101' })
  id: string;

  @ApiProperty({ example: 'BAT-2026-CUL-01' })
  batchCode: string;

  @ApiProperty({ example: 'Spring Greenhouse Bok Choy NFT' })
  name: string;

  @ApiProperty({ example: 'CULTIVATION' })
  domain: string;

  @ApiProperty({ example: 'ACTIVE' })
  status: string;

  @ApiProperty({ example: 120.0 })
  initialQuantity: number;

  @ApiProperty({ example: 95.0 })
  currentQuantity: number;

  @ApiProperty({ example: 'heads' })
  measurementUnit: string;

  @ApiProperty({ type: [BatchOutputResponseDto] })
  outputs: BatchOutputResponseDto[];

  @ApiProperty({ type: [BatchAuditLogResponseDto] })
  auditLogs: BatchAuditLogResponseDto[];
}
