// Single source for the dashboard values shown in the UI mockups.
// Labels keep the mockup language (Indonesian where the mockup uses it).
// Values here are demo/seed data until the pages are wired to the API.
import { FARM_IMAGE } from './farm-zones.js';

export const farm = {
  name: "Vincent's Farm",
  location: 'Jakarta, Indonesia',
  areaM2: FARM_IMAGE.totalAreaM2,
  zoneCount: 12,
  steward: { name: 'Vincent', role: 'Homesteader' },
  weather: { tempC: 28, condition: 'Partly Cloudy' },
  systemStatus: 'System Online',
};

export const overview = {
  greeting: 'Good Morning, Vincent!',
  selfSufficiency: { value: 72, label: 'Overall' },
  quickActions: [
    { id: 'record-eggs', label: 'Record Eggs', icon: 'egg' },
    { id: 'record-harvest', label: 'Record Harvest', icon: 'sprout' },
    { id: 'water-check', label: 'Water Check', icon: 'droplet' },
    { id: 'create-task', label: 'Create Task', icon: 'clipboard' },
  ],
  stats: [
    { id: 'food', title: 'Food Production', caption: 'This Month', value: '34.8 kg', delta: '+18%', tone: 'green', series: [8, 14, 11, 18, 15, 22, 19, 26, 24, 30] },
    { id: 'energy', title: 'Energy', caption: 'Generated This Month', value: '12.4 kWh', delta: '+14%', tone: 'amber', series: [10, 13, 12, 16, 14, 18, 17, 21, 20, 24] },
    { id: 'water', title: 'Water', caption: 'Reservoir', value: '3,250 L', badge: '65%', tone: 'blue', series: [14, 16, 15, 19, 17, 20, 18, 22, 21, 23] },
  ],
  flowNodes: [
    { id: 'livestock', label: 'Livestock', sub: 'Chicken, Goat, Sheep' },
    { id: 'waste', label: 'Waste', sub: 'Organic Waste' },
    { id: 'circular', label: 'Circular System', sub: 'Compost & BSF' },
    { id: 'cultivation', label: 'Cultivation', sub: 'Garden & Greenhouse' },
    { id: 'energy', label: 'Energy', sub: 'Solar' },
    { id: 'home', label: 'Home', sub: 'Consumption' },
    { id: 'water', label: 'Water System', sub: 'Rain, Storage, Reuse' },
    { id: 'aquaculture', label: 'Aquaculture', sub: 'Fish Pond' },
  ],
};

export const mapFlow = {
  categories: [
    { id: 'all', label: 'All Resources' },
    { id: 'energy', label: 'Energy' },
    { id: 'water', label: 'Water' },
    { id: 'food', label: 'Food' },
    { id: 'waste', label: 'Waste / Circular' },
  ],
  highlights: [
    { id: 'energy', label: 'Energy', value: 76, tone: 'amber' },
    { id: 'water', label: 'Water', value: 65, tone: 'blue' },
    { id: 'food', label: 'Food', value: 78, tone: 'green' },
    { id: 'circular', label: 'Circular', value: 80, tone: 'green' },
  ],
  keyFlows: [
    { id: 'kf1', category: 'energy', title: 'Gudang & Utilitas → Rumah', desc: 'Pasokan energi untuk kebutuhan rumah' },
    { id: 'kf2', category: 'waste', title: 'Kandang Ayam & Kambing → Kompos / BSF', desc: 'Limbah organik menjadi pupuk' },
    { id: 'kf3', category: 'food', title: 'Kompos / BSF → Kebun Sayur', desc: 'Pupuk untuk produksi tanaman' },
    { id: 'kf4', category: 'water', title: 'Kolam Ikan → Kebun Sayur & TOGA', desc: 'Pasokan air budidaya & perikanan' },
  ],
  legend: [
    { id: 'energy', label: 'Energy Flow', color: '#F5B301' },
    { id: 'water', label: 'Water Flow', color: '#1C8FE8' },
    { id: 'food', label: 'Food / Nutrient Flow', color: '#4CAF2A' },
    { id: 'waste', label: 'Waste Flow', color: '#A8531A' },
  ],
};

export const production = {
  summary: { kinds: 6, totalKg: 138.4, deltaPct: 18, caption: 'Total hasil produksi bulan ini.' },
  items: [
    { id: 'telur', title: 'Telur', value: '24', unit: 'butir', delta: 20, tone: 'green', asset: 'telur', series: [10, 12, 11, 15, 14, 18, 20, 24] },
    { id: 'dagingAyam', title: 'Daging Ayam', value: '3.6', unit: 'kg', delta: 12, tone: 'amber', asset: 'dagingAyam', series: [8, 9, 9, 11, 10, 12, 12, 14] },
    { id: 'sayuran', title: 'Sayuran', value: '42.8', unit: 'kg', delta: 25, tone: 'green', asset: 'sayuran', series: [12, 14, 13, 18, 17, 22, 25, 30] },
    { id: 'ikan', title: 'Ikan', value: '12.4', unit: 'kg', delta: 10, tone: 'blue', asset: 'ikan', series: [6, 8, 7, 10, 9, 12, 11, 14] },
    { id: 'jamur', title: 'Jamur', value: '7.2', unit: 'kg', delta: 30, tone: 'purple', asset: 'jamur', series: [4, 5, 5, 7, 8, 9, 10, 12] },
    { id: 'buah', title: 'Buah', value: '68.4', unit: 'kg', delta: 15, tone: 'red', asset: 'buah', series: [14, 16, 15, 19, 20, 22, 21, 26] },
  ],
  trend: {
    unit: 'kg',
    weekly: { labels: ['W-5', 'W-4', 'W-3', 'W-2', 'W-1', 'Ini'], values: [26, 29, 31.5, 33, 35, 36.4] },
    monthly: { labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], values: [58, 70, 82, 104, 117, 138.4] },
    yearly: { labels: ['2022', '2023', '2024', '2025', '2026'], values: [520, 760, 1020, 1240, 1480] },
  },
  harvestSchedule: [
    { id: 'h1', name: 'Selada', date: '12 Nov', status: 'Panen', asset: 'selada' },
    { id: 'h2', name: 'Jamur', date: '14 Nov', status: 'Panen', asset: 'jamur' },
    { id: 'h3', name: 'Ikan', date: '16 Nov', status: 'Panen Parsial', asset: 'ikan' },
    { id: 'h4', name: 'Jambu', date: '18 Nov', status: 'Panen', asset: 'jambu' },
  ],
};

export const resources = {
  cards: [
    { id: 'energy', title: 'Energy', subtitle: 'Listrik dari Solar Panel', value: '12.4 kWh', pct: 76, tone: 'amber' },
    { id: 'water', title: 'Water', subtitle: 'Persediaan & Penggunaan Air', value: '3,250 L', pct: 65, tone: 'blue' },
    { id: 'food', title: 'Food', subtitle: 'Hasil Produksi Pangan', value: '138.4 kg', pct: 78, tone: 'green' },
    { id: 'circular', title: 'Circular', subtitle: 'Daur Ulang & Pemanfaatan', value: '80%', pct: 80, tone: 'green' },
  ],
  loop: [
    { id: 'produksi', label: 'Produksi', sub: 'Pangan & Protein' },
    { id: 'konsumsi', label: 'Konsumsi', sub: 'Rumah Tangga' },
    { id: 'limbah', label: 'Limbah Organik', sub: 'Sisa Pakan & Dapur' },
    { id: 'daurulang', label: 'Daur Ulang', sub: 'Kompos / BSF' },
    { id: 'kebun', label: 'Kebun', sub: 'Pupuk & Nutrisi' },
  ],
  trend: {
    months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    energy: [60, 64, 66, 70, 74, 76],
    water: [48, 52, 56, 60, 63, 65],
    food: [22, 30, 28, 36, 40, 44],
  },
  health: { value: 76, label: 'Status Baik' },
};

export const activities = {
  dateLabel: 'Selasa, 11 Nov 2026',
  monthLabel: 'Nov 2026',
  tasks: [
    { id: 't1', title: 'Beri pakan ayam', time: '07:00', done: true, icon: 'chicken' },
    { id: 't2', title: 'Cek & siram tanaman', time: '08:00', done: true, icon: 'sprout' },
    { id: 't3', title: 'Cek kualitas air kolam', time: '10:00', done: false, icon: 'droplet' },
    { id: 't4', title: 'Kelola kompos / BSF', time: '14:00', done: false, icon: 'recycle' },
    { id: 't5', title: 'Cek pertumbuhan jamur', time: '16:00', done: false, icon: 'mushroom' },
  ],
  progressPct: 40,
  week: [
    { id: 'd1', day: 'Sen', date: '9 Nov' },
    { id: 'd2', day: 'Sel', date: '11 Nov', today: true },
    { id: 'd3', day: 'Rab', date: '12 Nov' },
    { id: 'd4', day: 'Kam', date: '13 Nov' },
    { id: 'd5', day: 'Jum', date: '14 Nov' },
    { id: 'd6', day: 'Sab', date: '15 Nov' },
    { id: 'd7', day: 'Min', date: '16 Nov' },
  ],
  weeklyPlan: [
    { id: 'w1', title: 'Perawatan Kebun & Panen Selektif', tag: 'Kebun', tone: 'green' },
    { id: 'w2', title: 'Pembersihan Kandang', tag: 'Ternak', tone: 'orange' },
    { id: 'w3', title: 'Perawatan Sistem Air', tag: 'Air', tone: 'blue' },
    { id: 'w4', title: 'Pengolahan Kompos', tag: 'Sirkular', tone: 'purple' },
  ],
  recent: [
    { id: 'r1', title: 'Panen Telur', meta: '10 Nov • 24 butir', asset: 'telur' },
    { id: 'r2', title: 'Panen Sayuran', meta: '9 Nov • 5.2 kg', asset: 'sayuran' },
    { id: 'r3', title: 'Produksi Kompos', meta: '8 Nov • 12 kg', asset: 'kompos' },
    { id: 'r4', title: 'Monitoring Ikan', meta: '7 Nov • Kondisi Baik', asset: 'ikan' },
  ],
  quickActions: [
    { id: 'add', label: 'Tambah Kegiatan', icon: 'plus' },
    { id: 'schedule', label: 'Buat Jadwal', icon: 'calendar' },
    { id: 'log', label: 'Catat Hasil', icon: 'clipboard' },
    { id: 'report', label: 'Lihat Laporan', icon: 'chart' },
  ],
};

export const intelligence = {
  insights: [
    { id: 'i1', title: 'Produksi Sayuran Naik', desc: '+18% dibanding bulan lalu.', icon: 'chart', tone: 'green' },
    { id: 'i2', title: 'Konsumsi Air Stabil', desc: 'Masih dalam batas normal.', icon: 'droplet', tone: 'blue' },
    { id: 'i3', title: 'Efisiensi Energi Baik', desc: 'Pemanfaatan solar mencapai 76%.', icon: 'bolt', tone: 'amber' },
  ],
  keyMetrics: [
    { id: 'energi', label: 'Energi', value: '76%', pct: 76, tone: 'green' },
    { id: 'air', label: 'Air', value: '65%', pct: 65, tone: 'blue' },
    { id: 'produksi', label: 'Produksi', value: '+18%', pct: 70, tone: 'green' },
    { id: 'sirkular', label: 'Sirkular', value: '80%', pct: 80, tone: 'green' },
  ],
  predictions: [
    { id: 'p1', title: 'Panen Sayuran', value: '± 3 hari lagi', asset: 'sayuran' },
    { id: 'p2', title: 'Produksi Telur', value: '± 24 butir / hari', asset: 'telur' },
  ],
  recommendations: [
    {
      id: 'rec1',
      title: 'Optimalisasi Produksi Sayuran',
      desc: 'Tingkatkan pencahayaan greenhouse 10–15% untuk hasil panen yang lebih maksimal.',
      emoji: '🌿',
    },
    { id: 'rec2', title: 'Jadwalkan Pengurasan Kolam', desc: 'Kualitas air kolam stabil; atur pergantian 20% air minggu ini agar ikan tetap sehat.', emoji: '🐟' },
    { id: 'rec3', title: 'Tambah Pakan BSF untuk Ayam', desc: 'Gunakan maggot BSF sebagai pakan tambahan untuk menekan biaya pakan dan menjaga produksi telur.', emoji: '🪱' },
  ],
  heroBubbles: [
    { zone: 'z9', icon: 'bolt', tone: 'amber' },
    { zone: 'z3', icon: 'droplet', tone: 'blue' },
    { zone: 'z5', icon: 'sprout', tone: 'green' },
    { zone: 'z2a', icon: 'egg', tone: 'orange' },
    { zone: 'z8', icon: 'recycle', tone: 'green' },
  ],
  ecosystemHealth: { value: 87, label: 'Sangat Baik' },
  assistant: {
    greeting: 'Halo Vincent! 👋\nAda yang ingin kamu ketahui tentang farm hari ini?',
    prompts: ['Evaluasi produksi bulan ini', 'Rencana panen minggu depan', 'Tips meningkatkan efisiensi'],
    placeholder: 'Tanyakan sesuatu...',
  },
};
