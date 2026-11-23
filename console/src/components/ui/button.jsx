import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#144E36] text-white shadow-sm hover:bg-[#0F291E] active:scale-[0.98]',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98]',
        outline:
          'border border-[rgba(27,67,50,0.15)] bg-white text-[#1B4332] hover:bg-[#EDF4EE] hover:text-[#0F291E]',
        secondary:
          'bg-[#EDF4EE] text-[#1B4332] hover:bg-[#D8F3DC]',
        ghost:
          'text-[#2D6A4F] hover:bg-[#EDF4EE] hover:text-[#1B4332]',
        link:
          'text-[#10B981] underline-offset-4 hover:underline',
        emerald:
          'bg-[#10B981] text-white shadow-sm hover:bg-[#059669] active:scale-[0.98]',
        nature:
          'bg-[#144E36] text-white shadow-sm hover:bg-[#0F291E]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-6 text-base',
        icon: 'h-9 w-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
