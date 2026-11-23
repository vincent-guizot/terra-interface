import React from 'react';

function smooth(points) {
  return points.reduce((d, [x, y], i, a) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = a[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, '');
}

/** Multi-series smooth area chart on a 0–100% scale. series: [{ key, color, values }] */
export default function TrendChart({ labels = [], series = [], className }) {
  const W = 700;
  const H = 260;
  const pad = { l: 46, r: 22, t: 14, b: 30 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const x = (i) => pad.l + (iw / (labels.length - 1)) * i;
  const y = (v) => pad.t + ih - (v / 100) * ih;
  const ticks = [0, 20, 40, 60, 80, 100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Tren sumber daya">
      <defs>
        {series.map((s) => (
          <linearGradient key={s.key} id={`tc-${s.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.04" />
          </linearGradient>
        ))}
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#E4E9E0" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#486253">{t}%</text>
        </g>
      ))}
      {series.map((s) => {
        const pts = s.values.map((v, i) => [x(i), y(v)]);
        const line = smooth(pts);
        return (
          <g key={s.key}>
            <path d={`${line} L${x(s.values.length - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={`url(#tc-${s.key})`} />
            <path d={line} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="5" fill={s.color} stroke="#fff" strokeWidth="2" />
          </g>
        );
      })}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={H - 8} textAnchor="middle" fontSize="12.5" fill="#2B3A30">{l}</text>
      ))}
    </svg>
  );
}
