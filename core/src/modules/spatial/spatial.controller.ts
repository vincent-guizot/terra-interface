import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SpatialService } from './spatial.service';
import { ZoneResponseDto } from './dto/zone-response.dto';

@ApiTags('Homestead Spatial')
@Controller('homestead')
export class SpatialController {
  constructor(private readonly spatialService: SpatialService) {}

  @Get('canonical')
  @ApiOperation({
    summary: 'Get canonical homestead spatial master plan',
    description: "Returns Vincent's Farm 300 m² (15m x 20m) master footprint and all 7 canonical zones.",
  })
  @ApiResponse({ status: 200, description: 'Canonical spatial hierarchy' })
  async getCanonical() {
    return this.spatialService.getHomesteadCanonical();
  }

  @Get('zones')
  @ApiOperation({
    summary: 'List all 7 spatial zones',
    description: 'Retrieves sectors Z-01 through Z-07 with physical area, buildings, and facilities.',
  })
  @ApiResponse({ status: 200, description: 'List of zones', type: [ZoneResponseDto] })
  async getZones() {
    return this.spatialService.getZones();
  }

  @Get('zones/:code')
  @ApiOperation({ summary: 'Get zone detail by code (e.g., Z-01, Z-02)' })
  @ApiParam({ name: 'code', example: 'Z-01' })
  @ApiResponse({ status: 200, description: 'Zone details', type: ZoneResponseDto })
  async getZone(@Param('code') code: string) {
    return this.spatialService.getZoneByCode(code);
  }
}
