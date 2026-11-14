import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes with clsx and twMerge for shadcn/ui
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
