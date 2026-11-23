import React from 'react';

/** Simple bar chart. The last bar is highlighted with a value bubble. */
export default function BarChart({ labels = [], values = [], unit = '', className }) {
  const W = 640;
  const H = 280;
  const pad = { l: 44, r: 12, t: 38, b: 30 };
  const rawMax = Math.max(...values, 1);
  const step = rawMax > 200 ? 500 : rawMax > 60 ? 25 : 10;
  const max = Math.ceil(rawMax / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const bw = Math.min(54, (iw / values.length) * 0.55);
  const y = (v) => pad.t + ih - (v / max) * ih;
  const x = (i) => pad.l + (iw / values.length) * (i + 0.5);
  const last = values.length - 1;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`Grafik produksi (${unit})`}>
      <defs>
        <linearGradient id="bc-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B7E78A" />
          <stop offset="100%" stopColor="#D9F2BC" />
        </linearGradient>
        <linearGradient id="bc-gl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8BD450" />
          <stop offset="100%" stopColor="#C4EA9C" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#E4E9E0" strokeWidth="1" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#486253">{t}</text>
        </g>
      ))}
      {values.map((v, i) => (
        <g key={labels[i]}>
          <rect x={x(i) - bw / 2} y={y(v)} width={bw} height={pad.t + ih - y(v)} rx="8" fill={i === last ? 'url(#bc-gl)' : 'url(#bc-g)'} />
          <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="12.5" fill="#2B3A30">{labels[i]}</text>
        </g>
      ))}
      <g>
        <circle cx={x(last)} cy={y(values[last])} r="5" fill="#34B03A" stroke="#fff" strokeWidth="2" />
        <rect x={x(last) - 40} y={y(values[last]) - 34} width="80" height="24" rx="6" fill="#2E8F1D" />
        <text x={x(last)} y={y(values[last]) - 18} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{values[last]} {unit}</text>
      </g>
    </svg>
  );
}
