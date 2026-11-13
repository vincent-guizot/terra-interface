import { Module } from '@nestjs/common';
import { AquacultureController } from './aquaculture.controller';
import { AquacultureService } from './aquaculture.service';
import { TilapiaTelemetryService } from './tilapia-telemetry.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AquacultureController],
  providers: [AquacultureService, TilapiaTelemetryService, PrismaService],
  exports: [AquacultureService, TilapiaTelemetryService],
})
export class AquacultureModule {}
