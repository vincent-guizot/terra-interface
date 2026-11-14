import { Module } from '@nestjs/common';
import { UniversalBatchModule } from './modules/universal-batch/universal-batch.module';
import { SpatialModule } from './modules/spatial/spatial.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CultivationModule } from './modules/cultivation/cultivation.module';
import { LivestockModule } from './modules/livestock/livestock.module';
import { AquacultureModule } from './modules/aquaculture/aquaculture.module';
import { CircularModule } from './modules/circular/circular.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { EnergyWaterModule } from './modules/energy-water/energy-water.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UniversalBatchModule,
    SpatialModule,
    CatalogModule,
    CultivationModule,
    LivestockModule,
    AquacultureModule,
    CircularModule,
    InventoryModule,
    EnergyWaterModule,
    IntelligenceModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
