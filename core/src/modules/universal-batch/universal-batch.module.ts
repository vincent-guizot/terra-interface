import { Module } from '@nestjs/common';
import { UniversalBatchController } from './universal-batch.controller';
import { UniversalBatchService } from './universal-batch.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UniversalBatchController],
  providers: [UniversalBatchService, PrismaService],
  exports: [UniversalBatchService],
})
export class UniversalBatchModule {}
