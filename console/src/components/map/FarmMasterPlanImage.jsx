import React, { useState } from 'react';
import { FARM_IMAGE, farmZones } from '../../data/homestead/farm-zones.js';
import { cn } from '../../lib/utils.js';

const pct = (value, total) => `${(value / total) * 100}%`;

/**
 * Master-plan picture with clickable zone hotspots.
 * Props: activeZoneId, onSelectZone(zoneId), className, children (overlay, rendered below hotspots)
 */
export default function FarmMasterPlanImage({ activeZoneId, onSelectZone, className, children }) {
  const [hoverId, setHoverId] = useState(null);
  const { src, width, height } = FARM_IMAGE;

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-[rgba(27,67,50,0.1)] bg-[#EDF4EE] shadow-card',
        className
      )}
      style={{ aspectRatio: `${width} / ${height}`, containerType: 'inline-size' }}
    >
      <img
        src={src}
        alt="Master plan Vincent's Farm"
        className="absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
      />

      {children}

      {farmZones.map((zone) => {
        const [x, y, w, h] = zone.rect;
        const active = zone.id === activeZoneId;
        const hover = zone.id === hoverId;
        return (
          <button
            key={zone.id}
            type="button"
            aria-label={`Zona ${zone.code}: ${zone.name}, ${zone.size}`}
            aria-pressed={active}
            onClick={() => onSelectZone?.(zone.id)}
            onMouseEnter={() => setHoverId(zone.id)}
            onMouseLeave={() => setHoverId(null)}
            onFocus={() => setHoverId(zone.id)}
            onBlur={() => setHoverId(null)}
            className={cn(
              'absolute rounded-2xl border-2 transition-all duration-200 focus-visible:outline-none',
              active
                ? 'border-emerald-400 bg-emerald-300/20 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]'
                : hover
                  ? 'border-white/90 bg-white/15'
                  : 'border-transparent'
            )}
            style={{ left: pct(x, width), top: pct(y, height), width: pct(w, width), height: pct(h, height) }}
          />
        );
      })}
    </div>
  );
}
