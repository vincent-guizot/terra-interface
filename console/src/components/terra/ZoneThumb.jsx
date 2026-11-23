import React from 'react';
import { FARM_IMAGE } from '../../data/homestead/farm-zones.js';
import { cn } from '../../lib/utils.js';

/**
 * Thumbnail of one zone, cropped out of the master-plan image
 * (no separate artwork needed). ratio = container width / height; zoom < 1 shows more surroundings.
 */
export default function ZoneThumb({ zone, ratio = 1.3, zoom = 1, className }) {
  const { src, width: W, height: H } = FARM_IMAGE;
  const [x, y, w, h] = zone.rect;
  const cx = x + w / 2;
  const cy = y + h / 2;
  // container is `ratio` wide and 1 high (relative units); scale so the zone covers it
  const s = Math.max(ratio / w, 1 / h) * zoom;
  const posX = (ratio / 2 - cx * s) / (ratio - W * s);
  const posY = (0.5 - cy * s) / (1 - H * s);
  return (
    <div
      role="img"
      aria-label={zone.name}
      className={cn('overflow-hidden bg-[#EAF6E3] bg-no-repeat', className)}
      style={{
        aspectRatio: String(ratio),
        backgroundImage: `url(${src})`,
        backgroundSize: `${((W * s) / ratio) * 100}% auto`,
        backgroundPosition: `${Math.max(0, Math.min(1, posX)) * 100}% ${Math.max(0, Math.min(1, posY)) * 100}%`,
      }}
    />
  );
}
