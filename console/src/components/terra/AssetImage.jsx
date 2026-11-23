import React, { useState } from 'react';
import { cn } from '../../lib/utils.js';

/**
 * <img> that shows a soft placeholder while the artwork is not available.
 * fallback: emoji / short text / node displayed in the placeholder.
 */
export default function AssetImage({ src, alt = '', fallback = '🌿', className, imgClassName, ...rest }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex select-none items-center justify-center bg-gradient-to-br from-[#EAF6E3] to-[#D3EDC2] text-2xl',
          className
        )}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      className={cn(className, imgClassName)}
      {...rest}
    />
  );
}
