import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BatchStatus } from '@prisma/client';
import {
  AttachCultivationDetailDto,
  AttachLivestockDetailDto,
  AttachAquacultureDetailDto,
  AttachBsfDetailDto,
  AttachCompostDetailDto,
} from './dto/attach-detail.dto';
import { RecordBatchEventDto } from './dto/record-event.dto';

export { BatchStatus };

@Injectable()
export class UniversalBatchService {
  constructor(private prisma: PrismaService) {}

  async findAll(domain?: string, status?: string) {
    const where: any = {};
    if (domain) where.domain = domain;
    if (status) where.status = status as BatchStatus;

    return this.prisma.batch.findMany({
      where,
      include: {
        outputs: true,
        events: { orderBy: { timestamp: 'desc' }, take: 10 },
        statusHistory: { orderBy: { timestamp: 'desc' } },
        auditLogs: { orderBy: { timestamp: 'desc' } },
        cultivationDetail: true,
        livestockDetail: true,
        aquacultureDetail: true,
        bsfDetail: true,
        compostDetail: true,
        zone: true,
        productDefinition: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        outputs: true,
        events: { orderBy: { timestamp: 'desc' } },
        statusHistory: { orderBy: { timestamp: 'desc' } },
        auditLogs: { orderBy: { timestamp: 'desc' } },
        cultivationDetail: true,
        livestockDetail: true,
        aquacultureDetail: true,
        bsfDetail: true,
        compostDetail: true,
        records: true,
        zone: true,
        productDefinition: true,
      },
    });
    if (!batch) throw new NotFoundException(`Universal Batch ${id} not found`);
    return batch;
  }

  async create(data: {
    batchCode: string;
    name: string;
    domain: string;
    zoneId: string;
    productDefinitionId?: string;
    startDate: Date;
    expectedEndDate?: Date;
    initialQuantity: number;
    measurementUnit: string;
    notes?: string;
  }) {
    return this.prisma.batch.create({
      data: {
        batchCode: data.batchCode,
        name: data.name,
        domain: data.domain,
        zoneId: data.zoneId,
        productDefinitionId: data.productDefinitionId,
        startDate: data.startDate,
        expectedEndDate: data.expectedEndDate,
        initialQuantity: data.initialQuantity,
        currentQuantity: data.initialQuantity,
        measurementUnit: data.measurementUnit,
        status: BatchStatus.ACTIVE,
        notes: data.notes,
        statusHistory: {
          create: {
            fromStatus: BatchStatus.PLANNED,
            toStatus: BatchStatus.ACTIVE,
            reason: 'Universal Batch initialized as Active',
            changedBy: 'Vincent',
          },
        },
        auditLogs: {
          create: {
            action: 'Universal Batch Created',
            performedBy: 'Vincent',
            details: `Initial quantity: ${data.initialQuantity} ${data.measurementUnit}`,
          },
        },
      },
      include: {
        zone: true,
        productDefinition: true,
      },
    });
  }

  async transitionStatus(id: string, newStatus: BatchStatus, reason?: string) {
    const batch = await this.findOne(id);

    // Enforce lifecycle state machine invariants
    if (batch.status === BatchStatus.COMPLETED) {
      throw new BadRequestException('A completed batch is immutable and cannot be transitioned.');
    }
    if (batch.status === BatchStatus.CANCELLED) {
      throw new BadRequestException('A cancelled batch cannot be transitioned.');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.batch.update({
        where: { id },
        data: {
          status: newStatus,
          actualEndDate: newStatus === BatchStatus.COMPLETED ? new Date() : undefined,
          statusHistory: {
            create: {
              fromStatus: batch.status,
              toStatus: newStatus,
              reason: reason || `Steward transitioned state from ${batch.status} to ${newStatus}`,
              changedBy: 'Vincent',
            },
          },
          auditLogs: {
            create: {
              action: `Status transitioned to ${newStatus}`,
              details: reason || 'Manual transition confirmed',
              performedBy: 'Vincent',
            },
          },
        },
        include: {
          statusHistory: true,
          auditLogs: true,
        },
      });

      return updated;
    });
  }

  async addOutput(batchId: string, outputData: {
    productName: string;
    quantity: number;
    measurementUnit: string;
    qualityGrade?: string;
    destination?: string;
  }) {
    await this.findOne(batchId);

    return this.prisma.$transaction(async (tx) => {
      const output = await tx.batchOutput.create({
        data: {
          batchId,
          ...outputData,
          stewardName: 'Vincent',
        },
      });

      await tx.batchHistory.create({
        data: {
          batchId,
          action: `Harvest Output Recorded: ${outputData.quantity} ${outputData.measurementUnit}`,
          details: `Product: ${outputData.productName} (${outputData.qualityGrade || 'Standard'}) -> ${outputData.destination || 'Homestead Pantry'}`,
          performedBy: 'Vincent',
        },
      });

      return output;
    });
  }

  // 1-to-1 Domain Detail Attachments
  async attachCultivationDetail(batchId: string, dto: AttachCultivationDetailDto) {
    await this.findOne(batchId);
    return this.prisma.cultivationBatchDetail.upsert({
      where: { batchId },
      update: dto,
      create: { batchId, ...dto },
    });
  }

  async attachLivestockDetail(batchId: string, dto: AttachLivestockDetailDto) {
    await this.findOne(batchId);
    return this.prisma.livestockBatchDetail.upsert({
      where: { batchId },
      update: dto,
      create: { batchId, ...dto },
    });
  }

  async attachAquacultureDetail(batchId: string, dto: AttachAquacultureDetailDto) {
    await this.findOne(batchId);
    return this.prisma.aquacultureBatchDetail.upsert({
      where: { batchId },
      update: dto,
      create: { batchId, ...dto },
    });
  }

  async attachBsfDetail(batchId: string, dto: AttachBsfDetailDto) {
    await this.findOne(batchId);
    return this.prisma.bsfBatchDetail.upsert({
      where: { batchId },
      update: dto,
      create: { batchId, ...dto },
    });
  }

  async attachCompostDetail(batchId: string, dto: AttachCompostDetailDto) {
    await this.findOne(batchId);
    return this.prisma.compostBatchDetail.upsert({
      where: { batchId },
      update: dto,
      create: { batchId, ...dto },
    });
  }

  // Typed Batch Events
  async recordEvent(batchId: string, dto: RecordBatchEventDto) {
    await this.findOne(batchId);
    return this.prisma.batchEvent.create({
      data: {
        batchId,
        eventType: dto.eventType,
        data: dto.data,
        recordedBy: dto.recordedBy || 'Vincent',
      },
    });
  }

  async getEvents(batchId: string) {
    await this.findOne(batchId);
    return this.prisma.batchEvent.findMany({
      where: { batchId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async getStatusHistory(batchId: string) {
    await this.findOne(batchId);
    return this.prisma.batchStatusHistory.findMany({
      where: { batchId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
