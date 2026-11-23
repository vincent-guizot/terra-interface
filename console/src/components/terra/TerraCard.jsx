import React from 'react';
import { cn } from '../../lib/utils.js';

/** Standard white rounded card used across all pages. */
export default function TerraCard({ as: Tag = 'section', className, children, ...rest }) {
  return (
    <Tag
      className={cn(
        'rounded-md border border-[rgba(27,67,50,0.1)] bg-white/95 p-5 shadow-sm backdrop-blur-sm',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
