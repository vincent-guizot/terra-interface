import { Module } from '@nestjs/common';
import { CircularController } from './circular.controller';
import { CircularService } from './circular.service';
import { MaggotHarvestService } from './maggot-harvest.service';
import { InventoryModule } from '../inventory/inventory.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [InventoryModule],
  controllers: [CircularController],
  providers: [CircularService, MaggotHarvestService, PrismaService],
  exports: [CircularService, MaggotHarvestService],
})
export class CircularModule {}
