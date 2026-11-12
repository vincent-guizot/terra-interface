import { Module } from '@nestjs/common';
import { SpatialController } from './spatial.controller';
import { SpatialService } from './spatial.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [SpatialController],
  providers: [SpatialService, PrismaService],
  exports: [SpatialService],
})
export class SpatialModule {}
