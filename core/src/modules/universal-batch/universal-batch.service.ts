import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export enum BatchStatus {
  DRAFT = 'DRAFT',
  PLANNED = 'PLANNED',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Injectable()
export class UniversalBatchService {
  constructor(private prisma: PrismaService) {}

  async findAll(domain?: string, status?: string) {
    const where: any = {};
    if (domain) where.domain = domain;
    if (status) where.status = status;

    return this.prisma.batch.findMany({
      where,
      include: {
        outputs: true,
        auditLogs: { orderBy: { timestamp: 'desc' } },
        zone: true,
        productionType: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        outputs: true,
        auditLogs: { orderBy: { timestamp: 'desc' } },
        records: true,
        zone: true,
      },
    });
    if (!batch) throw new NotFoundException(`Batch ${id} not found`);
    return batch;
  }

  async create(data: {
    batchCode: string;
    name: string;
    domain: string;
    zoneId: string;
    startDate: Date;
    expectedEndDate?: Date;
    initialQuantity: number;
    measurementUnit: string;
    notes?: string;
  }) {
    return this.prisma.batch.create({
      data: {
        ...data,
        status: BatchStatus.ACTIVE,
        currentQuantity: data.initialQuantity,
        auditLogs: {
          create: {
            action: 'Universal Batch Created',
            performedBy: 'Vincent',
            details: `Initial quantity: ${data.initialQuantity} ${data.measurementUnit}`,
          },
        },
      },
    });
  }

  async transitionStatus(id: string, newStatus: BatchStatus, reason?: string) {
    return this.prisma.batch.update({
      where: { id },
      data: {
        status: newStatus,
        auditLogs: {
          create: {
            action: `Lifecycle State Changed to ${newStatus}`,
            details: reason || 'Steward manual transition',
            performedBy: 'Vincent',
          },
        },
      },
    });
  }

  async addOutput(batchId: string, outputData: {
    productName: string;
    quantity: number;
    measurementUnit: string;
    qualityGrade?: string;
    destination?: string;
  }) {
    return this.prisma.batchOutput.create({
      data: {
        batchId,
        ...outputData,
        stewardName: 'Vincent',
      },
    });
  }
}
