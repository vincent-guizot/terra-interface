import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[#1B4332] text-white hover:bg-[#2D6A4F]',
        secondary:
          'border-transparent bg-[#EDF4EE] text-[#1B4332] hover:bg-[#D8F3DC]',
        destructive:
          'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline:
          'border-[rgba(27,67,50,0.18)] text-[#1B4332] bg-white',
        live:
          'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold',
        manual:
          'border-sky-300 bg-sky-50 text-sky-800 font-bold',
        estimated:
          'border-amber-300 bg-amber-50 text-amber-800 font-bold',
        demo:
          'border-purple-300 bg-purple-50 text-purple-800 font-bold',
        lime:
          'border-lime-300 bg-lime-50 text-lime-800 font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
