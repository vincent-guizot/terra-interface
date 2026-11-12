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
import {
  AttachCultivationDetailDto,
  AttachLivestockDetailDto,
  AttachAquacultureDetailDto,
  AttachBsfDetailDto,
  AttachCompostDetailDto,
} from './dto/attach-detail.dto';
import { RecordBatchEventDto } from './dto/record-event.dto';

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
  @ApiOperation({ summary: 'Get batch details by ID', description: 'Includes complete output records, events, and audit trail' })
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

  // 1-to-1 Domain Detail Routes
  @Post(':id/detail/cultivation')
  @ApiOperation({ summary: 'Attach or update cultivation detail (NFT, medium, EC/pH targets)' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: AttachCultivationDetailDto })
  @ApiResponse({ status: 201, description: 'Cultivation detail saved' })
  async attachCultivation(
    @Param('id') id: string,
    @Body() dto: AttachCultivationDetailDto
  ) {
    return this.batchService.attachCultivationDetail(id, dto);
  }

  @Post(':id/detail/livestock')
  @ApiOperation({ summary: 'Attach or update livestock detail (breed, housing, target FCR)' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: AttachLivestockDetailDto })
  @ApiResponse({ status: 201, description: 'Livestock detail saved' })
  async attachLivestock(
    @Param('id') id: string,
    @Body() dto: AttachLivestockDetailDto
  ) {
    return this.batchService.attachLivestockDetail(id, dto);
  }

  @Post(':id/detail/aquaculture')
  @ApiOperation({ summary: 'Attach or update aquaculture detail (species, volume, target density)' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: AttachAquacultureDetailDto })
  @ApiResponse({ status: 201, description: 'Aquaculture detail saved' })
  async attachAquaculture(
    @Param('id') id: string,
    @Body() dto: AttachAquacultureDetailDto
  ) {
    return this.batchService.attachAquacultureDetail(id, dto);
  }

  @Post(':id/detail/bsf')
  @ApiOperation({ summary: 'Attach or update BSF detail (substrate, weight, tray count)' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: AttachBsfDetailDto })
  @ApiResponse({ status: 201, description: 'BSF detail saved' })
  async attachBsf(
    @Param('id') id: string,
    @Body() dto: AttachBsfDetailDto
  ) {
    return this.batchService.attachBsfDetail(id, dto);
  }

  @Post(':id/detail/compost')
  @ApiOperation({ summary: 'Attach or update compost detail (bay number, C:N ratio, biochar %)' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: AttachCompostDetailDto })
  @ApiResponse({ status: 201, description: 'Compost detail saved' })
  async attachCompost(
    @Param('id') id: string,
    @Body() dto: AttachCompostDetailDto
  ) {
    return this.batchService.attachCompostDetail(id, dto);
  }

  // Typed Batch Events & History Routes
  @Post(':id/events')
  @ApiOperation({ summary: 'Record a typed observation, feeding, or calibration event' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiBody({ type: RecordBatchEventDto })
  @ApiResponse({ status: 201, description: 'Event recorded' })
  async recordEvent(
    @Param('id') id: string,
    @Body() dto: RecordBatchEventDto
  ) {
    return this.batchService.recordEvent(id, dto);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'List chronological events for batch' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiResponse({ status: 200, description: 'List of events' })
  async getEvents(@Param('id') id: string) {
    return this.batchService.getEvents(id);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Get lifecycle status transition audit trail' })
  @ApiParam({ name: 'id', description: 'Batch UUID' })
  @ApiResponse({ status: 200, description: 'List of status changes' })
  async getStatusHistory(@Param('id') id: string) {
    return this.batchService.getStatusHistory(id);
  }
}
