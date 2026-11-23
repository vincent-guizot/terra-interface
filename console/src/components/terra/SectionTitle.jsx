import React from 'react';
import { cn } from '../../lib/utils.js';

/** Card heading: green icon + title (+ optional subtitle and right action). */
export default function SectionTitle({ icon: Icon, title, subtitle, action, className }) {
  return (
    <div className={cn('mb-3 flex items-start justify-between gap-3', className)}>
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="h-6 w-6 shrink-0 text-leaf" strokeWidth={1.9} />}
        <div>
          <h2 className="text-lg font-extrabold leading-tight text-[#14281D]">{title}</h2>
          {subtitle && <p className="text-xs font-medium text-[#486253]">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
