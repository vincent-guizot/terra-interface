import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UniversalBatchService, BatchStatus } from './universal-batch.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { TransitionBatchStatusDto } from './dto/transition-status.dto';
import { RecordBatchOutputDto } from './dto/record-output.dto';
import { BatchResponseDto } from './dto/batch-response.dto';

@ApiTags('Universal Batches')
@Controller('batches')
export class UniversalBatchController {
  constructor(private readonly batchService: UniversalBatchService) {}

  @Get()
  @ApiOperation({
    summary: 'List all universal batches',
    description: 'Fetch batches across cultivation, livestock, aquaculture, and circular domains with optional filters.',
  })
  @ApiQuery({ name: 'domain', required: false, enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'] })
  @ApiQuery({ name: 'status', required: false, enum: BatchStatus })
  @ApiResponse({ status: 200, description: 'List of batches with outputs and audit logs', type: [BatchResponseDto] })
  async getBatches(
    @Query('domain') domain?: string,
    @Query('status') status?: string
  ) {
    return this.batchService.findAll(domain, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get batch details by ID', description: 'Includes complete output records and audit trail' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiResponse({ status: 200, description: 'Batch details', type: BatchResponseDto })
  @ApiResponse({ status: 404, description: 'Batch not found' })
  async getBatch(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Register a new universal batch',
    description: 'Creates a batch in PLANNED or ACTIVE lifecycle state and logs initialization audit event.',
  })
  @ApiBody({ type: CreateBatchDto })
  @ApiResponse({ status: 201, description: 'Batch successfully registered', type: BatchResponseDto })
  async createBatch(@Body() body: CreateBatchDto) {
    return this.batchService.create({
      ...body,
      startDate: new Date(body.startDate),
      expectedEndDate: body.expectedEndDate ? new Date(body.expectedEndDate) : undefined,
    });
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Transition universal batch lifecycle status',
    description: 'Enforces state machine: Draft -> Planned -> Active -> On Hold -> Completed / Cancelled with mandatory audit logging.',
  })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: TransitionBatchStatusDto })
  @ApiResponse({ status: 200, description: 'Batch status updated successfully' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: TransitionBatchStatusDto
  ) {
    return this.batchService.transitionStatus(id, dto.status, dto.reason);
  }

  @Post(':id/outputs')
  @ApiOperation({
    summary: 'Record harvest or output yield for batch',
    description: 'Supports multiple harvests per batch (e.g. daily egg gathering, cut-and-come-again greens, flushes).',
  })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: RecordBatchOutputDto })
  @ApiResponse({ status: 201, description: 'Harvest record successfully logged' })
  async recordOutput(
    @Param('id') id: string,
    @Body() body: RecordBatchOutputDto
  ) {
    return this.batchService.addOutput(id, body);
  }
}
