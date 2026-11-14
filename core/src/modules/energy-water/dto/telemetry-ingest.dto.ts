import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class TelemetryIngestDto {
  @ApiProperty({ example: 'ESP32-ZONE-05-ENERGY', description: 'Originating microcontroller probe ID' })
  @IsString()
  @IsNotEmpty()
  sensorDeviceId: string;

  @ApiProperty({ example: 4.25, description: 'Current Solar PV Generation in Kilowatts (kW)' })
  @IsNumber()
  @Min(0)
  solarGenerationKw: number;

  @ApiProperty({ example: 850, description: 'Homestead AC Load Consumption in Watts (W)' })
  @IsNumber()
  @Min(0)
  inverterLoadWatts: number;

  @ApiProperty({ example: 88.5, description: 'LiFePO4 Battery State of Charge (SoC %)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  batterySoC: number;

  @ApiProperty({ example: 53.4, description: 'Battery Bank Voltage in Volts (V)', required: false })
  @IsNumber()
  @IsOptional()
  batteryVoltage?: number;

  @ApiProperty({ example: 28.5, description: 'Net Battery Pack Current in Amperes (A)', required: false })
  @IsNumber()
  @IsOptional()
  batteryCurrentAmps?: number;

  @ApiProperty({ example: 10400, description: 'Total Rainwater Storage Buffer in Liters (L)' })
  @IsNumber()
  @Min(0)
  cisternLevelLiters: number;

  @ApiProperty({ example: 6.8, description: 'Bio-pond Dissolved Oxygen in mg/L', required: false })
  @IsNumber()
  @IsOptional()
  dissolvedOxygenMgL?: number;

  @ApiProperty({ example: 7.2, description: 'Water pH reading', required: false })
  @IsNumber()
  @IsOptional()
  pH?: number;

  @ApiProperty({ example: 26.5, description: 'Water temperature in Celsius (°C)', required: false })
  @IsNumber()
  @IsOptional()
  waterTemperatureC?: number;

  @ApiProperty({ example: 780, description: 'Ambient Solar Irradiance in W/m²', required: false })
  @IsNumber()
  @IsOptional()
  ambientIrradianceWPerM2?: number;

  @ApiProperty({ example: '2026-11-13T15:00:00Z', description: 'Telemetry timestamp ISO8601', required: false })
  @IsString()
  @IsOptional()
  timestamp?: string;
}
