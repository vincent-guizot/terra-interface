import React from 'react';
import { cn } from '../../lib/utils.js';

const TONES = {
  green: 'bg-[#E4F4DA] text-[#2E7D1E]',
  amber: 'bg-[#FFF1D6] text-[#B26A00]',
  blue: 'bg-[#E1F0FD] text-[#0A6CC4]',
  purple: 'bg-[#F0E6FA] text-[#7A3FB0]',
  orange: 'bg-[#FDEBDD] text-[#B5541A]',
  gray: 'bg-[#EEF0EC] text-[#486253]',
};

export default function StatusPill({ tone = 'green', icon: Icon, children, className }) {
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold', TONES[tone] || TONES.green, className)}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
