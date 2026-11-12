import { Module } from '@nestjs/common';
import { UniversalBatchModule } from './modules/universal-batch/universal-batch.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UniversalBatchModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
