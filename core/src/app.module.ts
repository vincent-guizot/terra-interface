import { Module } from '@nestjs/common';
import { UniversalBatchModule } from './modules/universal-batch/universal-batch.module';
import { SpatialModule } from './modules/spatial/spatial.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CultivationModule } from './modules/cultivation/cultivation.module';
import { LivestockModule } from './modules/livestock/livestock.module';
import { AquacultureModule } from './modules/aquaculture/aquaculture.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UniversalBatchModule,
    SpatialModule,
    CatalogModule,
    CultivationModule,
    LivestockModule,
    AquacultureModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
