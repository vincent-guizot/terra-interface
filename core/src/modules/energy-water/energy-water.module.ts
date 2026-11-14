import { Module } from '@nestjs/common';
import { EnergyWaterController } from './energy-water.controller';
import { EnergyWaterService } from './energy-water.service';
import { BatteryBmsService } from './battery-bms.service';
import { AutonomyForecastService } from './autonomy-forecast.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EnergyWaterController],
  providers: [
    EnergyWaterService,
    BatteryBmsService,
    AutonomyForecastService,
    PrismaService,
  ],
  exports: [EnergyWaterService, BatteryBmsService, AutonomyForecastService],
})
export class EnergyWaterModule {}
