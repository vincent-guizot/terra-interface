export const CANONICAL_ACTIVITIES = [{
  id: 'act-1',
  time: '06:30 AM',
  title: 'Morning Aquaculture Feeding & DO Check',
  zone: 'Zone 2: Aquaponics',
  domain: 'Aquaculture',
  priority: 'High',
  duration: '15 min',
  completed: true,
  notes: 'Fed 450g pellets + fresh duckweed. Fish appetite active, DO 6.8 mg/L.'
}, {
  id: 'act-2',
  time: '07:15 AM',
  title: 'Poultry Morning Release & Egg Collection',
  zone: 'Zone 3: Poultry Hub',
  domain: 'Livestock',
  priority: 'High',
  duration: '20 min',
  completed: true,
  notes: 'Gathered 21 clean eggs. Water nipple system refilled.'
}, {
  id: 'act-3',
  time: '08:30 AM',
  title: 'Greenhouse Microgreen Mist Cycle Inspection',
  zone: 'Zone 1: Micro-Greenhouse',
  domain: 'Cultivation',
  priority: 'Medium',
  duration: '15 min',
  completed: true,
  notes: 'Inspected oyster mushroom bag humidity. Pinheads developing uniformly.'
}, {
  id: 'act-4',
  time: '10:30 AM',
  title: 'Inverter Telemetry & Solar Battery Top-off Check',
  zone: 'Zone 5: Solar Array',
  domain: 'Infrastructure',
  priority: 'Low',
  duration: '10 min',
  completed: true,
  notes: 'System charging at 4.6 kW. Battery SoC at 88%. BMS balanced.'
}, {
  id: 'act-5',
  time: '12:00 PM',
  title: 'BSF Larvae Rearing Tray Feeding & Rotation',
  zone: 'Zone 6: Circular Biomass',
  domain: 'Circular',
  priority: 'Medium',
  duration: '25 min',
  completed: true,
  notes: 'Loaded 4.2 kg kitchen scraps into Tray #4. Harvested 1.8 kg prepupae for poultry feed.'
}, {
  id: 'act-6',
  time: '03:30 PM',
  title: 'Bokashi Compost Moisture & Thermophilic Probe Check',
  zone: 'Zone 6: Circular Biomass',
  domain: 'Circular',
  priority: 'Medium',
  duration: '15 min',
  completed: false,
  notes: 'Target core temperature > 55°C. Aerate pile if below threshold.'
}, {
  id: 'act-7',
  time: '05:00 PM',
  title: 'Evening Crop Harvest (Kale, Bok Choy, Herbs)',
  zone: 'Zone 4: Permaculture Beds',
  domain: 'Cultivation',
  priority: 'High',
  duration: '30 min',
  completed: false,
  notes: 'Harvest 2.5 kg greens for dinner & neighbor sharing.'
}, {
  id: 'act-8',
  time: '06:00 PM',
  title: 'Coop Lockup & Evening Predator Inspection',
  zone: 'Zone 3: Poultry Hub',
  domain: 'Livestock',
  priority: 'High',
  duration: '10 min',
  completed: false,
  notes: 'Ensure automated door closed, feed secured from rodents.'
}];
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
