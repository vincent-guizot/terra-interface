import React from 'react';
import { cn } from '../../lib/utils.js';

/** Page title block: green icon tile + title + subtitle, optional right-side slot. */
export default function PageHeader({ icon: Icon, title, subtitle, children, className }) {
  return (
    <div className={cn('mb-5 flex flex-wrap items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E4F4DA] text-leaf shadow-sm">
            <Icon className="h-7 w-7" strokeWidth={1.8} />
          </div>
        )}
        <div>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-[#14281D]">{title}</h1>
          {subtitle && <p className="text-sm font-medium text-[#486253]">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
