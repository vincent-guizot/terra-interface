import React from 'react';
import { FARM_IMAGE, FLOW_COLORS, getZoneById, zoneCenter, zoneFlows } from '../../data/homestead/farm-zones.js';

const ICON = { energy: '⚡', water: '💧', food: '🌿', waste: '♻️' };

/** Animated flow arrows drawn between zones, in image pixel space. category: 'all' | energy | water | food | waste */
export default function ResourceFlowOverlay({ category = 'all' }) {
  const { width, height } = FARM_IMAGE;
  const flows = zoneFlows.filter((f) => category === 'all' || f.category === category);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width={width} height={height} fill="rgba(255,255,255,0.18)" />
      <defs>
        {Object.entries(FLOW_COLORS).map(([k, c]) => (
          <marker key={k} id={`rf-${k}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={c} />
          </marker>
        ))}
      </defs>
      {flows.map((f) => {
        const a = getZoneById(f.from);
        const b = getZoneById(f.to);
        if (!a || !b) return null;
        const [x1, y1] = zoneCenter(a);
        const [x2, y2] = zoneCenter(b);
        const cx = (x1 + x2) / 2 + f.via[0];
        const cy = (y1 + y2) / 2 + f.via[1];
        const mx = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
        const my = 0.25 * y1 + 0.5 * cy + 0.25 * y2;
        const color = FLOW_COLORS[f.category];
        const d = `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
        return (
          <g key={f.id}>
            <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
            <path d={d} fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round" className="flow-dash" markerEnd={`url(#rf-${f.category})`} />
            <circle cx={mx} cy={my} r="13" fill="#FFFFFF" stroke={color} strokeWidth="2.5" />
            <text x={mx} y={my + 5} textAnchor="middle" fontSize="13">{ICON[f.category]}</text>
          </g>
        );
      })}
    </svg>
  );
}
