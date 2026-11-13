import { Module } from '@nestjs/common';
import { CultivationController } from './cultivation.controller';
import { CultivationService } from './cultivation.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CultivationController],
  providers: [CultivationService, PrismaService],
  exports: [CultivationService],
})
export class CultivationModule {}
