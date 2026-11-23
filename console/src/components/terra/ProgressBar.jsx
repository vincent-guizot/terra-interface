import React from 'react';
import { cn } from '../../lib/utils.js';

const TONES = {
  green: 'from-[#5CC42B] to-[#2E9A1A]',
  blue: 'from-[#38A9F5] to-[#0A74D6]',
  amber: 'from-[#FFD23F] to-[#F5A300]',
};

export default function ProgressBar({ value = 0, tone = 'green', className, trackClassName }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-[#E6E9E4]', trackClassName)}
    >
      <div className={cn('h-full rounded-full bg-gradient-to-r', TONES[tone] || TONES.green, className)} style={{ width: `${pct}%` }} />
    </div>
  );
}
