import React from 'react';
import { motion } from 'framer-motion';

export function MotionCard({
  children,
  className = '',
  hoverScale = 1.015,
  hoverY = -4,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        boxShadow: '0 16px 36px -12px rgba(27, 67, 50, 0.12)',
      }}
      whileTap={{ scale: 0.985 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default MotionCard;
