import React from 'react';
import { Box, Chip, Tooltip, Typography } from '@mui/material';
import { Sensors, Edit, TrendingUp, Science } from '@mui/icons-material';

/**
 * DataSourceBadge
 * Distinctly labels data sources according to Homestead Operating System integrity standards:
 * - LIVE: actual connected sensor or device telemetry
 * - MANUAL: manually entered records by steward
 * - ESTIMATED: calculated or forecast algorithmic values
 * - DEMO: demonstration or sample simulated data
 */
export default function DataSourceBadge({
  source = 'DEMO',
  lastUpdated = null,
  size = 'small',
  showIcon = true,
  sx = {}
}) {
  const normSource = String(source || 'DEMO').toUpperCase();

  const configs = {
    LIVE: {
      label: 'LIVE',
      color: '#065F46',
      bg: 'rgba(16, 185, 129, 0.14)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      icon: <Sensors sx={{ fontSize: '0.85rem !important', color: '#10B981' }} />,
      tooltip: 'LIVE: Actual connected hardware sensor, RS485 bus, or IoT device telemetry',
      dotColor: '#10B981',
      isPulsing: true,
    },
    MANUAL: {
      label: 'MANUAL',
      color: '#0369A1',
      bg: 'rgba(2, 132, 199, 0.12)',
      borderColor: 'rgba(2, 132, 199, 0.3)',
      icon: <Edit sx={{ fontSize: '0.85rem !important', color: '#0284C7' }} />,
      tooltip: 'MANUAL: Recorded manually by homestead steward (Vincent)',
      dotColor: '#0284C7',
      isPulsing: false,
    },
    ESTIMATED: {
      label: 'ESTIMATED',
      color: '#92400E',
      bg: 'rgba(245, 158, 11, 0.14)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      icon: <TrendingUp sx={{ fontSize: '0.85rem !important', color: '#D97706' }} />,
      tooltip: 'ESTIMATED: Algorithmic prediction, forecast, or calculated metric',
      dotColor: '#D97706',
      isPulsing: false,
    },
    DEMO: {
      label: 'DEMO',
      color: '#5B21B6',
      bg: 'rgba(139, 92, 246, 0.12)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      icon: <Science sx={{ fontSize: '0.85rem !important', color: '#8B5CF6' }} />,
      tooltip: 'DEMO: Demonstration or simulated synthetic sample data',
      dotColor: '#8B5CF6',
      isPulsing: false,
    },
  };

  const current = configs[normSource] || configs.DEMO;

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
            {current.tooltip}
          </Typography>
          {lastUpdated && (
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.9, mt: 0.5 }}>
              Last updated: {lastUpdated}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.6,
          px: size === 'small' ? 1 : 1.4,
          py: size === 'small' ? 0.3 : 0.5,
          borderRadius: 2,
          bgcolor: current.bg,
          border: `1px solid ${current.borderColor}`,
          color: current.color,
          fontSize: size === 'small' ? '0.68rem' : '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          lineHeight: 1,
          userSelect: 'none',
          cursor: 'help',
          ...sx,
        }}
      >
        {/* Pulsing live dot or status icon */}
        {current.isPulsing ? (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: current.dotColor,
              boxShadow: `0 0 0 2px ${current.bg}`,
              animation: 'terraPulse 1.8s infinite',
              '@keyframes terraPulse': {
                '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
                '70%': { transform: 'scale(1)', boxShadow: '0 0 0 5px rgba(16, 185, 129, 0)' },
                '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
              },
            }}
          />
        ) : (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: current.dotColor,
            }}
          />
        )}

        <span>{current.label}</span>

        {lastUpdated && (
          <Typography
            component="span"
            sx={{
              fontSize: '0.62rem',
              fontWeight: 600,
              opacity: 0.8,
              ml: 0.2,
              borderLeft: `1px solid ${current.borderColor}`,
              pl: 0.6,
            }}
          >
            {lastUpdated}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
}

export { DataSourceBadge };
