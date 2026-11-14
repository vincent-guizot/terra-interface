import React from 'react';
import { cn } from '../../lib/utils';

export const buttonVariants = {
  variant: {
    default: 'bg-[#1B4332] text-white hover:bg-[#123124] shadow-sm',
    nature: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
    outline: 'border border-[#1B4332]/20 bg-white hover:bg-[#FAF9F5] text-[#1B4332]',
    secondary: 'bg-[#FAF9F5] text-[#1B4332] hover:bg-[#EBF8EE] border border-[#1B4332]/10',
    ghost: 'hover:bg-[#1B4332]/05 text-[#1B4332]',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  },
  size: {
    default: 'h-9 px-4 py-2 text-sm',
    sm: 'h-8 rounded-lg px-3 text-xs',
    lg: 'h-11 rounded-xl px-8 text-base',
    icon: 'h-9 w-9',
  },
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  disabled,
  children,
  ...props
}) {
  const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default;
  const sizeClass = buttonVariants.size[size] || buttonVariants.size.default;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50',
        variantClass,
        sizeClass,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
