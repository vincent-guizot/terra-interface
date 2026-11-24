import prisma from '../../prisma/prisma.service.js';
import { AppError } from '../../middlewares/errorHandler.js';
import { farmNow } from '../dashboard/dashboard.service.js';
export { CANONICAL_ACTIVITIES } from '../../constants/activities.constants.js';

const present = row => ({
  ...row.details, id: row.id, title: row.title, domain: row.domain, priority: row.priority,
  time: farmNow(row.dueDate).time, completed: row.status === 'COMPLETED'
});

export class ActivitiesService {
  async getTasks(domain, completed) {
    const start = new Date(farmNow().date + 'T00:00:00+07:00');
    const rows = await prisma.workOrder.findMany({
      where: {
        dueDate: { gte: start, lt: new Date(start.getTime() + 86400000) },
        ...(domain && { domain: { equals: domain, mode: 'insensitive' } }),
        ...(completed !== undefined && { status: String(completed) === 'true' ? 'COMPLETED' : { not: 'COMPLETED' } })
      }, orderBy: [{ dueDate: 'asc' }, { id: 'asc' }]
    });
    return rows.map(present);
  }

  async getActivitiesSummary() {
    const tasks = await this.getTasks();
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    return { homestead: "Vincent's Farm (300 m² Master Plan)", tasks,
      todaySummary: { total, completed, pending: total - completed, efficiency: Math.round(completed * 100 / (total || 1)) + '%' },
      calculatedAt: new Date().toISOString() };
  }

  async getTaskById(id) {
    const row = await prisma.workOrder.findUnique({ where: { id } });
    return row && present(row);
  }

  async createTask(dto) {
    const now = farmNow();
    const time = dto?.time ?? now.time;
    if (typeof dto?.title !== 'string' || !dto.title.trim() || typeof time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      throw new AppError('Provide a title and a valid 24-hour time', 400, 'VALIDATION_ERROR');
    }
    const row = await prisma.workOrder.create({ data: {
      title: dto.title.trim(), domain: dto.domain || 'General', priority: dto.priority || 'Medium',
      dueDate: new Date(now.date + 'T' + time + ':00+07:00'),
      details: { zone: dto.zone || '', duration: dto.duration || '', notes: dto.notes || '' }
    } });
    return present(row);
  }

  async toggleTaskCompleted(id) {
    const rows = await prisma.$queryRaw`UPDATE "WorkOrder"
      SET status = CASE WHEN status = 'COMPLETED' THEN 'PENDING' ELSE 'COMPLETED' END,
          "completedAt" = CASE WHEN status = 'COMPLETED' THEN NULL ELSE CURRENT_TIMESTAMP END
      WHERE id = ${id} RETURNING *`;
    if (!rows.length) throw new AppError('Task not found', 404, 'NOT_FOUND');
    return present(rows[0]);
  }
}
export default new ActivitiesService();
