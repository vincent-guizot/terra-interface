import React from 'react';
import { FARM_IMAGE } from '../../data/homestead/farm-zones.js';
import { cn } from '../../lib/utils.js';

/** Frame for the (portrait) master-plan image: a blurred copy fills the free space around it. */
export default function FarmImageStage({ className, stageRef, children }) {
  return (
    <div ref={stageRef} className={cn('relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#EAF3E6]', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-125 bg-cover bg-center opacity-60 blur-2xl"
        style={{ backgroundImage: `url(${FARM_IMAGE.src})` }}
      />
      {children}
    </div>
  );
}
