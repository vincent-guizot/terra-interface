import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CultivationService {
  constructor(private prisma: PrismaService) {}

  calculateNutrientDosing(ecTarget: number, currentEc: number, reservoirLiters: number) {
    const ecDeficit = Math.max(0, ecTarget - currentEc);
    // Standard A/B nutrient concentrate ratio: 5mL per 10L per 0.1 mS/cm EC increase
    const concentrateMl = (ecDeficit / 0.1) * (reservoirLiters / 10) * 5;
    return {
      solutionAPumpMl: Math.round(concentrateMl),
      solutionBPumpMl: Math.round(concentrateMl),
      targetEc: ecTarget,
      currentEc,
      status: ecDeficit > 0.3 ? 'CORRECTION_REQUIRED' : 'BALANCED',
    };
  }
}
