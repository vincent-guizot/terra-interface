import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { UniversalBatchService, BatchStatus } from './universal-batch.service';

@Controller('batches')
export class UniversalBatchController {
  constructor(private readonly batchService: UniversalBatchService) {}

  @Get()
  async getBatches(@Query('domain') domain?: string, @Query('status') status?: string) {
    return this.batchService.findAll(domain, status);
  }

  @Get(':id')
  async getBatch(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Post()
  async createBatch(@Body() body: any) {
    return this.batchService.create(body);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BatchStatus,
    @Body('reason') reason?: string
  ) {
    return this.batchService.transitionStatus(id, status, reason);
  }

  @Post(':id/outputs')
  async recordOutput(@Param('id') id: string, @Body() body: any) {
    return this.batchService.addOutput(id, body);
  }
}
