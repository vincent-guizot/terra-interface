import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StockMovementType } from '@prisma/client';

export class RecordStockMovementDto {
  @ApiProperty({ example: 'inv-1', description: 'Internal inventory item ID', required: false })
  @IsString()
  @IsOptional()
  itemId?: string;

  @ApiProperty({ example: 'SKU-FEE-01', description: 'Item SKU identifier', required: false })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({
    enum: StockMovementType,
    example: StockMovementType.FEEDING_OUT,
    description: 'Immutable ledger movement classification',
  })
  @IsEnum(StockMovementType)
  @IsNotEmpty()
  type: StockMovementType;

  @ApiProperty({
    example: -2.5,
    description: 'Signed quantity delta (+ for additions, - for deductions)',
  })
  @IsNumber()
  @IsNotEmpty()
  quantityDelta: number;

  @ApiProperty({ example: 'kg', description: 'Unit of measurement' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ example: 'BAT-2026-LIV-01', description: 'Associated batch code', required: false })
  @IsString()
  @IsOptional()
  referenceBatchCode?: string;

  @ApiProperty({ example: 'Vincent', description: 'Steward responsible for the transaction', required: false })
  @IsString()
  @IsOptional()
  stewardName?: string;

  @ApiProperty({ example: 'Afternoon feeding ration dispensed to poultry coop', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
