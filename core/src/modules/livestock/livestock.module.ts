import { Module } from '@nestjs/common';
import { LivestockController } from './livestock.controller';
import { LivestockService } from './livestock.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [LivestockController],
  providers: [LivestockService, PrismaService],
  exports: [LivestockService],
})
export class LivestockModule {}
