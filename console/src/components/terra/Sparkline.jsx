import React, { useId } from 'react';

/** Smooth area sparkline. data: number[]; color: stroke colour. */
export default function Sparkline({ data = [], color = '#2E9A1A', height = 44, className }) {
  const uid = useId().replace(/:/g, '');
  if (data.length < 2) return null;
  const W = 200;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, height - 4 - ((v - min) / span) * (height - 10)]);
  const line = pts.reduce((d, [x, y], i, a) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = a[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, '');
  const area = `${line} L${W},${height} L0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className={className} style={{ width: '100%', height }} aria-hidden="true">
      <defs>
        <linearGradient id={`sp-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${uid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
