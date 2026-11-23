/**
 * Canonical dashboard data for the Terra console (Overview, Map, Production,
 * Resources, Activities, Intelligence). Values mirror the approved UI mockups.
 * Date-dependent parts (today's tasks, schedules, month labels) are derived in
 * dashboard.service.js, never stored here.
 */
import { HOMESTEAD_METADATA } from './homestead.constants.js';

export const FARM = {
  name: "Vincent's Farm",
  location: 'Jakarta, Indonesia',
  timeZone: 'Asia/Jakarta',
  areaM2: HOMESTEAD_METADATA.TOTAL_AREA_SQM,
  zoneCount: 12,
  steward: { name: 'Vincent', role: 'Homesteader' },
  weather: { tempC: 28, condition: 'Partly Cloudy' },
  systemStatus: 'System Online',
};

export const ZONE_CATEGORIES = [
  { id: 'habitat', label: 'Habitat', emoji: '🏠' },
  { id: 'livestock', label: 'Livestock', emoji: '🐔' },
  { id: 'cultivation', label: 'Cultivation', emoji: '🌱' },
  { id: 'aquaculture', label: 'Aquaculture', emoji: '🐟' },
  { id: 'circular', label: 'Waste / Circular', emoji: '♻️' },
  { id: 'utilities', label: 'Utilities', emoji: '📦' },
];

// rect = [x, y, width, height] hotspot in pixels of the master-plan image (895 × 974).
export const MASTER_PLAN_IMAGE = { src: '/images/farm-master-plan.jpg', width: 895, height: 974 };
export const ZONES = [
  { id: 'z1', code: '1', name: 'Rumah Tinggal (2 Lantai)', short: 'Main House', size: '8 × 9 m', areaM2: 72, category: 'habitat', facilityId: null, rect: [75, 460, 420, 190] },
  { id: 'z1a', code: '1A', name: 'Dapur & Akses Belakang', short: 'Dapur', size: '2 × 6 m', areaM2: 12, category: 'habitat', facilityId: null, rect: [475, 530, 200, 230] },
  { id: 'z1b', code: '1B', name: 'Carport', short: 'Carport', size: '3,5 × 5,5 m', areaM2: 19, category: 'utilities', facilityId: null, rect: [55, 680, 240, 160] },
  { id: 'z2a', code: '2A', name: 'KUB Layer', short: 'KUB Layer', size: '10–12 ekor', areaM2: 7, category: 'livestock', facilityId: 'fac-chk-01', rect: [190, 150, 185, 160] },
  { id: 'z2b', code: '2B', name: 'Cornish Cross', short: 'Cornish Cross', size: '± 6 ekor/batch', areaM2: 5, category: 'livestock', facilityId: 'fac-chk-01', rect: [380, 150, 160, 160] },
  { id: 'z3', code: '3', name: 'Kolam Ikan', short: 'Fish Pond', size: '3 × 4 m', areaM2: 12, category: 'aquaculture', facilityId: null, rect: [180, 325, 230, 150] },
  { id: 'z4', code: '4', name: 'Kandang Kambing & Domba', short: 'Goat & Sheep', size: '3,5 × 4 m', areaM2: 14, category: 'livestock', facilityId: 'fac-gt-01', rect: [580, 160, 285, 180] },
  { id: 'z5', code: '5', name: 'Kebun Sayur (Raised Bed)', short: 'Kebun Sayur', size: '4,5 × 4 m', areaM2: 18, category: 'cultivation', facilityId: 'fac-hyd-01', rect: [460, 345, 260, 175] },
  { id: 'z6', code: '6', name: 'Kebun TOGA', short: 'Kebun TOGA', size: '2 × 3 m', areaM2: 6, category: 'cultivation', facilityId: 'fac-tog-01', rect: [740, 375, 125, 170] },
  { id: 'z7', code: '7', name: 'Jamur Tiram', short: 'Jamur Tiram', size: '2 × 2,5 m', areaM2: 5, category: 'cultivation', facilityId: 'fac-msh-01', rect: [225, 50, 180, 105] },
  { id: 'z8', code: '8', name: 'Kompos & BSF (Maggot)', short: 'Kompos & BSF', size: '2 × 2,5 m', areaM2: 5, category: 'circular', facilityId: 'fac-bsf-01', rect: [465, 50, 145, 110] },
  { id: 'z9', code: '9', name: 'Gudang & Utilitas', short: 'Gudang', size: '2 × 2,5 m', areaM2: 5, category: 'utilities', facilityId: 'fac-gud-01', rect: [675, 50, 175, 110] },
];

export const ZONE_FLOWS = [
  { id: 'f-energy-1', category: 'energy', from: 'z9', to: 'z1', via: [0, 40] },
  { id: 'f-water-1', category: 'water', from: 'z3', to: 'z5', via: [0, -40] },
  { id: 'f-water-2', category: 'water', from: 'z3', to: 'z6', via: [60, 90] },
  { id: 'f-food-1', category: 'food', from: 'z8', to: 'z5', via: [60, 30] },
  { id: 'f-food-2', category: 'food', from: 'z8', to: 'z3', via: [-40, 40] },
  { id: 'f-food-3', category: 'food', from: 'z5', to: 'z1a', via: [30, 30] },
  { id: 'f-waste-1', category: 'waste', from: 'z2a', to: 'z8', via: [0, -60] },
  { id: 'f-waste-2', category: 'waste', from: 'z4', to: 'z8', via: [0, -50] },
  { id: 'f-waste-3', category: 'waste', from: 'z1a', to: 'z8', via: [180, -140] },
];

export const MAP_PANEL = {
  flowCategories: [
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

export const OVERVIEW = {
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

export const PRODUCTION = {
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
    monthlyValues: [58, 70, 82, 104, 117, 138.4],
    yearly: { labels: ['2022', '2023', '2024', '2025', '2026'], values: [520, 760, 1020, 1240, 1480] },
  },
  // dayOffset = days from today
  harvestSchedule: [
    { id: 'h1', name: 'Selada', dayOffset: 1, status: 'Panen', asset: 'selada' },
    { id: 'h2', name: 'Jamur', dayOffset: 3, status: 'Panen', asset: 'jamur' },
    { id: 'h3', name: 'Ikan', dayOffset: 5, status: 'Panen Parsial', asset: 'ikan' },
    { id: 'h4', name: 'Jambu', dayOffset: 7, status: 'Panen', asset: 'jambu' },
  ],
};

export const RESOURCES = {
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
  trend: { energy: [60, 64, 66, 70, 74, 76], water: [48, 52, 56, 60, 63, 65], food: [22, 30, 28, 36, 40, 44] },
  health: { value: 76, label: 'Status Baik' },
};

// Demo seed for "today"; `done` mirrors the mockup state (2 of 5 completed).
export const DAILY_TASKS = [
  { id: 't1', title: 'Beri pakan ayam', time: '07:00', done: true, icon: 'chicken' },
  { id: 't2', title: 'Cek & siram tanaman', time: '08:00', done: true, icon: 'sprout' },
  { id: 't3', title: 'Cek kualitas air kolam', time: '10:00', done: false, icon: 'droplet' },
  { id: 't4', title: 'Kelola kompos / BSF', time: '14:00', done: false, icon: 'recycle' },
  { id: 't5', title: 'Cek pertumbuhan jamur', time: '16:00', done: false, icon: 'mushroom' },
];

export const ACTIVITIES = {
  weeklyPlan: [
    { id: 'w1', title: 'Perawatan Kebun & Panen Selektif', tag: 'Kebun', tone: 'green' },
    { id: 'w2', title: 'Pembersihan Kandang', tag: 'Ternak', tone: 'orange' },
    { id: 'w3', title: 'Perawatan Sistem Air', tag: 'Air', tone: 'blue' },
    { id: 'w4', title: 'Pengolahan Kompos', tag: 'Sirkular', tone: 'purple' },
  ],
  // dayOffset = days before today
  recent: [
    { id: 'r1', title: 'Panen Telur', detail: '24 butir', dayOffset: 1, asset: 'telur' },
    { id: 'r2', title: 'Panen Sayuran', detail: '5.2 kg', dayOffset: 2, asset: 'sayuran' },
    { id: 'r3', title: 'Produksi Kompos', detail: '12 kg', dayOffset: 3, asset: 'kompos' },
    { id: 'r4', title: 'Monitoring Ikan', detail: 'Kondisi Baik', dayOffset: 4, asset: 'ikan' },
  ],
  quickActions: [
    { id: 'add', label: 'Tambah Kegiatan', icon: 'plus' },
    { id: 'schedule', label: 'Buat Jadwal', icon: 'calendar' },
    { id: 'log', label: 'Catat Hasil', icon: 'clipboard' },
    { id: 'report', label: 'Lihat Laporan', icon: 'chart' },
  ],
};

export const INTELLIGENCE = {
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
    { id: 'rec1', title: 'Optimalisasi Produksi Sayuran', desc: 'Tingkatkan pencahayaan greenhouse 10–15% untuk hasil panen yang lebih maksimal.', emoji: '🌿' },
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
