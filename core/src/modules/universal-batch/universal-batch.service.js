"use strict";

import { VALID_TRANSITIONS } from "../../constants/universal-batch.constants.js";
import * as common_1 from "../../common/errors/http-exceptions.js";
import * as client_1 from "@prisma/client";
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
  async create(data = {}) {
    const { initialQuantity = 1 } = data;
    const measurementUnit = typeof data.measurementUnit === 'string' ? data.measurementUnit.trim() : '';
    if (!Number.isFinite(initialQuantity) || initialQuantity <= 0 || !measurementUnit ||
        typeof data.name !== 'string' || !data.name.trim()) {
      throw new common_1.BadRequestException('Provide a batch name, positive initial quantity, and measurement unit.');
    }
    return this.prisma.batch.create({
      data: {
        batchCode: data.batchCode,
        name: data.name,
        domain: data.domain,
        zoneId: data.zoneId,
        productDefinitionId: data.productDefinitionId,
        startDate: data.startDate,
        expectedEndDate: data.expectedEndDate,
        initialQuantity,
        currentQuantity: initialQuantity,
        measurementUnit,
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
            details: `Initial quantity: ${initialQuantity} ${measurementUnit}`
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
    const { requestId, itemId, productName, quantity, measurementUnit, qualityGrade = 'Grade A',
      destination = 'Homestead Pantry', notes } = outputData;
    if (!Number.isFinite(quantity) || quantity <= 0 || !measurementUnit ||
        (!itemId && !productName) || (requestId !== undefined && !/^[a-f0-9-]{36}$/i.test(requestId))) {
      throw new common_1.BadRequestException('Provide an inventory item, positive quantity, unit and valid request ID.');
    }
    const batch = await this.findOne(batchId);
    const matches = await this.prisma.inventoryItem.findMany({ where: {
      homesteadId: batch.zone.homesteadId, unit: measurementUnit,
      ...(itemId ? { id: itemId } : { name: { equals: productName, mode: 'insensitive' } })
    }, take: 2 });
    if (matches.length !== 1) throw new common_1.BadRequestException('Select a matching inventory item and unit for this farm.');
    const item = matches[0];
    try {
      return await this.prisma.$transaction(async tx => {
        const output = await tx.batchOutput.create({ data: {
          id: requestId, batchId, productName: item.name, quantity, measurementUnit, qualityGrade, destination, notes
        } });
        await tx.stockMovement.create({ data: {
          itemId: item.id, type: 'HARVEST_IN', quantityDelta: quantity, unit: measurementUnit,
          referenceBatchCode: batch.batchCode, batchOutputId: output.id, stewardName: 'Vincent'
        } });
        await tx.inventoryItem.update({ where: { id: item.id }, data: { inStock: { increment: quantity } } });
        await tx.batchHistory.create({ data: {
          batchId, action: 'Harvest Output Recorded: ' + quantity + ' ' + measurementUnit,
          details: item.name + ' -> ' + destination, performedBy: 'Vincent'
        } });
        return output;
      });
    } catch (error) {
      if (!requestId || error.code !== 'P2002') throw error;
      const previous = await this.prisma.batchOutput.findUnique({ where: { id: requestId }, include: { stockMovement: true } });
      if (previous?.batchId === batchId && previous.stockMovement?.itemId === item.id &&
          previous.quantity === quantity && previous.measurementUnit === measurementUnit &&
          previous.qualityGrade === qualityGrade && previous.destination === destination && previous.notes === (notes ?? null)) {
        const { stockMovement, ...output } = previous;
        return output;
      }
      throw new common_1.BadRequestException('Request ID already used for a different harvest.');
    }
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
