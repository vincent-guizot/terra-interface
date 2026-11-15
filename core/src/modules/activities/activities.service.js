import { CANONICAL_ACTIVITIES } from "../../constants/activities.constants.js";
export { CANONICAL_ACTIVITIES };
export class ActivitiesService {
  constructor() {
    this.tasks = [...CANONICAL_ACTIVITIES];
  }
  async getActivitiesSummary() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const efficiency = total > 0 ? `${Math.round(completed / total * 100)}%` : '100%';
    return {
      homestead: "Vincent's Farm (300 m² Master Plan)",
      todaySummary: {
        total,
        completed,
        pending,
        efficiency
      },
      tasks: this.tasks,
      calculatedAt: new Date().toISOString()
    };
  }
  async getTasks(domain, completed) {
    let result = [...this.tasks];
    if (domain) {
      result = result.filter(t => t.domain.toLowerCase() === domain.toLowerCase());
    }
    if (completed !== undefined) {
      const isCompleted = completed === 'true' || completed === true;
      result = result.filter(t => t.completed === isCompleted);
    }
    return result;
  }
  async getTaskById(id) {
    return this.tasks.find(t => t.id === id) || null;
  }
  async createTask(dto) {
    const newTask = {
      id: `act-${Date.now()}`,
      time: dto.time || new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      title: dto.title,
      zone: dto.zone || 'Zone 1: General',
      domain: dto.domain || 'General',
      priority: dto.priority || 'Medium',
      duration: dto.duration || '15 min',
      completed: false,
      notes: dto.notes || ''
    };
    this.tasks.push(newTask);
    return newTask;
  }
  async toggleTaskCompleted(id) {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error(`Task '${id}' not found`);
    }
    task.completed = !task.completed;
    return task;
  }
}
export default new ActivitiesService();
