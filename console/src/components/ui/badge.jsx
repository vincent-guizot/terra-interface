import React from 'react';
import { cn } from '../../lib/utils';

export const badgeVariants = {
  default: 'border-transparent bg-[#1B4332] text-white',
  success: 'border-transparent bg-emerald-100 text-emerald-800 font-bold',
  warning: 'border-transparent bg-amber-100 text-amber-800 font-bold',
  sky: 'border-transparent bg-sky-100 text-sky-800 font-bold',
  destructive: 'border-transparent bg-red-100 text-red-800 font-bold',
  outline: 'border border-[#1B4332]/20 text-[#1B4332]',
};

export function Badge({ className, variant = 'default', ...props }) {
  const variantClass = badgeVariants[variant] || badgeVariants.default;
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variantClass,
        className
      )}
      {...props}
    />
  );
}

export default Badge;
