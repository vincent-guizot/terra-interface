"use strict";

import * as common_1 from "../../common/errors/http-exceptions.js";
import * as client_1 from "@prisma/client";
const VALID_TRANSITIONS = {
  [client_1.BatchStatus.DRAFT]: [client_1.BatchStatus.PLANNED, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.PLANNED]: [client_1.BatchStatus.ACTIVE, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.ACTIVE]: [client_1.BatchStatus.ON_HOLD, client_1.BatchStatus.COMPLETED, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.ON_HOLD]: [client_1.BatchStatus.ACTIVE, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.COMPLETED]: [],
  [client_1.BatchStatus.CANCELLED]: []
};
let UniversalBatchService = class UniversalBatchService {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async findAll(domain, status) {
    const where = {};
    if (domain) where.domain = domain;
    if (status) where.status = status;
    return this.prisma.batch.findMany({
      where,
      include: {
        outputs: true,
        events: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 10
        },
        statusHistory: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        auditLogs: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        cultivationDetail: true,
        livestockDetail: true,
        aquacultureDetail: true,
        bsfDetail: true,
        compostDetail: true,
        zone: true,
        productDefinition: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
  async findOne(id) {
    const batch = await this.prisma.batch.findUnique({
      where: {
        id
      },
      include: {
        outputs: true,
        events: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        statusHistory: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        auditLogs: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        cultivationDetail: true,
        livestockDetail: true,
        aquacultureDetail: true,
        bsfDetail: true,
        compostDetail: true,
        records: true,
        zone: true,
        productDefinition: true
      }
    });
    if (!batch) throw new common_1.NotFoundException(`Universal Batch ${id} not found`);
    return batch;
  }
  async create(data) {
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
        status: client_1.BatchStatus.ACTIVE,
        notes: data.notes,
        statusHistory: {
          create: {
            fromStatus: client_1.BatchStatus.PLANNED,
            toStatus: client_1.BatchStatus.ACTIVE,
            reason: 'Universal Batch initialized as Active',
            changedBy: 'Vincent'
          }
        },
        auditLogs: {
          create: {
            action: 'Universal Batch Created',
            performedBy: 'Vincent',
            details: `Initial quantity: ${data.initialQuantity} ${data.measurementUnit}`
          }
        }
      },
      include: {
        zone: true,
        productDefinition: true
      }
    });
  }
  async transitionStatus(id, newStatus, reason) {
    const batch = await this.findOne(id);
    const legalTargets = VALID_TRANSITIONS[batch.status] || [];
    if (!legalTargets.includes(newStatus)) {
      throw new common_1.BadRequestException(`Illegal lifecycle state transition from '${batch.status}' to '${newStatus}'. Allowed: [${legalTargets.join(', ')}]`);
    }
    if ((newStatus === client_1.BatchStatus.ON_HOLD || newStatus === client_1.BatchStatus.CANCELLED) && !reason) {
      throw new common_1.BadRequestException(`Transition to ${newStatus} requires a mandatory explanation reason.`);
    }
    return this.prisma.$transaction(async tx => {
      if (batch.status === client_1.BatchStatus.PLANNED && newStatus === client_1.BatchStatus.ACTIVE && batch.productDefinitionId) {
        const inventoryItem = await tx.inventoryItem.findFirst({
          where: {
            productDefId: batch.productDefinitionId
          }
        });
        if (inventoryItem) {
          await tx.stockMovement.create({
            data: {
              itemId: inventoryItem.id,
              type: client_1.StockMovementType.BATCH_CONSUME_OUT,
              quantityDelta: -Math.abs(batch.initialQuantity),
              unit: batch.measurementUnit,
              referenceBatchCode: batch.batchCode,
              stewardName: 'Vincent',
              notes: `Automated deduction upon batch activation: ${batch.batchCode}`
            }
          });
          await tx.inventoryItem.update({
            where: {
              id: inventoryItem.id
            },
            data: {
              inStock: {
                decrement: Math.abs(batch.initialQuantity)
              }
            }
          });
        }
      }
      const updated = await tx.batch.update({
        where: {
          id
        },
        data: {
          status: newStatus,
          actualEndDate: newStatus === client_1.BatchStatus.COMPLETED ? new Date() : undefined,
          statusHistory: {
            create: {
              fromStatus: batch.status,
              toStatus: newStatus,
              reason: reason || `Steward transitioned state from ${batch.status} to ${newStatus}`,
              changedBy: 'Vincent'
            }
          },
          auditLogs: {
            create: {
              action: `Status transitioned to ${newStatus}`,
              details: reason || 'Manual transition confirmed',
              performedBy: 'Vincent'
            }
          }
        },
        include: {
          statusHistory: true,
          auditLogs: true
        }
      });
      return updated;
    });
  }
  async addOutput(batchId, outputData) {
    const batch = await this.findOne(batchId);
    return this.prisma.$transaction(async tx => {
      const output = await tx.batchOutput.create({
        data: {
          batchId,
          ...outputData,
          stewardName: 'Vincent'
        }
      });
      await tx.batchHistory.create({
        data: {
          batchId,
          action: `Harvest Output Recorded: ${outputData.quantity} ${outputData.measurementUnit}`,
          details: `Product: ${outputData.productName} (${outputData.qualityGrade || 'Standard'}) -> ${outputData.destination || 'Homestead Pantry'}`,
          performedBy: 'Vincent'
        }
      });
      const matchingItem = await tx.inventoryItem.findFirst({
        where: {
          OR: [{
            name: {
              contains: outputData.productName,
              mode: 'insensitive'
            }
          }, ...(batch.productDefinitionId ? [{
            productDefId: batch.productDefinitionId
          }] : [])]
        }
      });
      if (matchingItem) {
        await tx.stockMovement.create({
          data: {
            itemId: matchingItem.id,
            type: client_1.StockMovementType.HARVEST_IN,
            quantityDelta: Math.abs(outputData.quantity),
            unit: outputData.measurementUnit,
            referenceBatchCode: batch.batchCode,
            batchOutputId: output.id,
            stewardName: 'Vincent',
            notes: `Auto intake from harvest output of ${batch.batchCode} (${outputData.qualityGrade || 'Grade A'})`
          }
        });
        await tx.inventoryItem.update({
          where: {
            id: matchingItem.id
          },
          data: {
            inStock: {
              increment: Math.abs(outputData.quantity)
            }
          }
        });
      }
      return output;
    });
  }
  async attachCultivationDetail(batchId, dto) {
    await this.findOne(batchId);
    return this.prisma.cultivationBatchDetail.upsert({
      where: {
        batchId
      },
      update: dto,
      create: {
        batchId,
        ...dto
      }
    });
  }
  async attachLivestockDetail(batchId, dto) {
    await this.findOne(batchId);
    return this.prisma.livestockBatchDetail.upsert({
      where: {
        batchId
      },
      update: dto,
      create: {
        batchId,
        ...dto
      }
    });
  }
  async attachAquacultureDetail(batchId, dto) {
    await this.findOne(batchId);
    return this.prisma.aquacultureBatchDetail.upsert({
      where: {
        batchId
      },
      update: dto,
      create: {
        batchId,
        ...dto
      }
    });
  }
  async attachBsfDetail(batchId, dto) {
    await this.findOne(batchId);
    return this.prisma.bsfBatchDetail.upsert({
      where: {
        batchId
      },
      update: dto,
      create: {
        batchId,
        ...dto
      }
    });
  }
  async attachCompostDetail(batchId, dto) {
    await this.findOne(batchId);
    return this.prisma.compostBatchDetail.upsert({
      where: {
        batchId
      },
      update: dto,
      create: {
        batchId,
        ...dto
      }
    });
  }
  async recordEvent(batchId, dto) {
    await this.findOne(batchId);
    return this.prisma.batchEvent.create({
      data: {
        batchId,
        eventType: dto.eventType,
        data: dto.data,
        recordedBy: dto.recordedBy || 'Vincent'
      }
    });
  }
  async getEvents(batchId) {
    await this.findOne(batchId);
    return this.prisma.batchEvent.findMany({
      where: {
        batchId
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
  }
  async getStatusHistory(batchId) {
    await this.findOne(batchId);
    return this.prisma.batchStatusHistory.findMany({
      where: {
        batchId
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
  }
};
export const BatchStatus = client_1.BatchStatus;
export { UniversalBatchService };
