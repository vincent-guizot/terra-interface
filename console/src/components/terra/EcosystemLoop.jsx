import React from 'react';
import { resources } from '../../data/homestead/terra-data.js';

const EMOJI = { produksi: '🌱', konsumsi: '🏠', limbah: '🍂', daurulang: '🪱', kebun: '🥬' };
// pentagon layout (clockwise from top)
const POS = { produksi: [250, 20], konsumsi: [440, 100], limbah: [380, 210], daurulang: [120, 210], kebun: [60, 100] };
const ORDER = ['produksi', 'konsumsi', 'limbah', 'daurulang', 'kebun'];
const W = 170;
const H = 54;

/** Circular resource loop: Produksi → Konsumsi → Limbah → Daur Ulang → Kebun → Produksi. */
export default function EcosystemLoop({ className }) {
  const nodes = Object.fromEntries(resources.loop.map((n) => [n.id, n]));
  const centers = Object.fromEntries(ORDER.map((id) => [id, [POS[id][0] + W / 2, POS[id][1] + H / 2]]));
  const arrow = (a, b) => {
    const [x1, y1] = centers[a];
    const [x2, y2] = centers[b];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // pull the control point outward from the centre (310,160)
    const k = 0.32;
    const cx = mx + (mx - 310) * k;
    const cy = my + (my - 160) * k;
    // shorten ends so arrows stop at node edges
    const t = 0.3;
    const sx = x1 + (cx - x1) * t;
    const sy = y1 + (cy - y1) * t;
    const ex = x2 + (cx - x2) * t;
    const ey = y2 + (cy - y2) * t;
    return `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
  };

  return (
    <svg viewBox="0 0 620 300" className={className} role="img" aria-label="Siklus sumber daya Vincent's Farm">
      <defs>
        <marker id="el-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#5CB82B" />
        </marker>
        <filter id="el-shadow" x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1F5A14" floodOpacity="0.14" />
        </filter>
      </defs>

      {ORDER.map((id, i) => (
        <path key={id} d={arrow(id, ORDER[(i + 1) % ORDER.length])} fill="none" stroke="#5CB82B" strokeWidth="4" strokeLinecap="round" markerEnd="url(#el-arrow)" opacity="0.85" />
      ))}

      <rect x="262" y="118" width="96" height="96" rx="26" fill="#DDF2CE" />
      <text x="310" y="180" textAnchor="middle" fontSize="48">🏡</text>

      {ORDER.map((id) => {
        const [x, y] = POS[id];
        const n = nodes[id];
        return (
          <g key={id} transform={`translate(${x} ${y})`} filter="url(#el-shadow)">
            <rect width={W} height={H} rx="27" fill="#fff" stroke="#E3EBDD" />
            <text x="22" y="36" fontSize="24">{EMOJI[id]}</text>
            <text x="54" y="24" fontSize="14" fontWeight="800" fill="#14281D">{n.label}</text>
            <text x="54" y="40" fontSize="11.5" fontWeight="600" fill="#486253">({n.sub})</text>
          </g>
        );
      })}
    </svg>
  );
}
