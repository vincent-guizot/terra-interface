import React from 'react';
import { overview } from '../../data/homestead/terra-data.js';

const NODE_W = 210;
const NODE_H = 58;
const EMOJI = { livestock: '🐔', waste: '🧺', circular: '♻️', cultivation: '🌱', energy: '☀️', home: '🏠', water: '💧', aquaculture: '🐟' };
const POS = {
  livestock: [20, 50], waste: [20, 170], circular: [20, 290],
  energy: [285, 10], cultivation: [285, 372],
  home: [550, 50], water: [550, 170], aquaculture: [550, 290],
};
const COLORS = { amber: '#F5B301', orange: '#E08A1E', brown: '#A8531A', tan: '#C9A77A', green: '#4CAF2A', blue: '#1C8FE8' };

// [path, colour, doubleArrow?]
const ARROWS = [
  ['M230 79 C300 79 320 150 352 172', 'orange'],
  ['M125 108 L125 170', 'brown'],
  ['M125 228 L125 290', 'brown'],
  ['M230 199 L318 218', 'tan'],
  ['M230 319 C265 319 270 400 285 400', 'green'],
  ['M495 400 C570 400 600 372 645 350', 'green'],
  ['M655 228 L655 290', 'blue', true],
  ['M495 38 C535 38 535 70 550 80', 'amber'],
  ['M390 68 L390 142', 'amber'],
  ['M442 168 C490 130 520 105 550 96', 'amber'],
  ['M550 199 L470 218', 'blue'],
  ['M452 266 C500 300 520 318 550 318', 'blue'],
  ['M390 305 L390 372', 'green'],
];

export default function EcosystemFlowDiagram({ className }) {
  const nodes = overview.flowNodes;
  return (
    <svg viewBox="0 0 780 440" className={className} role="img" aria-label="Ecosystem Flow Vincent's Farm">
      <defs>
        {Object.entries(COLORS).map(([k, c]) => (
          <marker key={k} id={`ef-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={c} />
          </marker>
        ))}
        <radialGradient id="ef-center" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4F4DA" />
        </radialGradient>
        <filter id="ef-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1F5A14" floodOpacity="0.14" />
        </filter>
      </defs>

      {ARROWS.map(([d, tone, both], i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={COLORS[tone]}
          strokeWidth="3.5"
          strokeLinecap="round"
          markerEnd={`url(#ef-${tone})`}
          markerStart={both ? `url(#ef-${tone})` : undefined}
          opacity="0.9"
        />
      ))}

      <circle cx="390" cy="225" r="84" fill="url(#ef-center)" stroke="#8AD36A" strokeWidth="3" filter="url(#ef-shadow)" />
      <text x="390" y="212" textAnchor="middle" fontSize="40">🏡</text>
      <text x="390" y="246" textAnchor="middle" fontSize="16" fontWeight="800" fill="#14281D">Vincent's Farm</text>
      <text x="390" y="266" textAnchor="middle" fontSize="13" fontWeight="600" fill="#486253">Ecosystem</text>

      {nodes.map((n) => {
        const [x, y] = POS[n.id] || [0, 0];
        return (
          <g key={n.id} transform={`translate(${x} ${y})`} filter="url(#ef-shadow)">
            <rect width={NODE_W} height={NODE_H} rx="16" fill="#FFFFFF" stroke="#E3EBDD" />
            <text x="16" y="38" fontSize="28">{EMOJI[n.id]}</text>
            <text x="58" y="26" fontSize="15" fontWeight="800" fill="#14281D">{n.label}</text>
            <text x="58" y="44" fontSize="12" fontWeight="600" fill="#486253">{n.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
