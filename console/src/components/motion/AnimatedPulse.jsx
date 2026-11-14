import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedPulse({
  color = '#10B981',
  size = 10,
  label = '',
  className = '',
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
      className={className}
    >
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Animated Ripple Wave */}
        <motion.div
          animate={{
            scale: [1, 2.4, 2.8],
            opacity: [0.75, 0.25, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
        {/* Core Dot */}
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            zIndex: 1,
          }}
        />
      </div>
      {label && (
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B4332' }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default AnimatedPulse;
