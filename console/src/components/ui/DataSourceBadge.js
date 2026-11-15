import React from 'react';
import { Radio, Pencil, TrendingUp, FlaskConical } from 'lucide-react';
import { Badge } from './badge.jsx';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip.jsx';
import { DATA_SOURCES } from '@/data/ui/data-sources';
import { cn } from '@/lib/utils';

const icons = { radio: Radio, edit: Pencil, trend: TrendingUp, flask: FlaskConical };

export default function DataSourceBadge({ source = 'DEMO', lastUpdated = null, size = 'small', showIcon = true, className, ...props }) {
  const config = DATA_SOURCES[String(source).toUpperCase()] || DATA_SOURCES.DEMO;
  const Icon = icons[config.icon];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0} className={cn('inline-flex items-center gap-1.5 cursor-help rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)} {...props}>
          <Badge variant={config.variant} className={cn(size === 'small' ? 'text-[11px]' : 'text-xs')}>
            {showIcon && <Icon aria-hidden="true" className={cn('size-3', config.label === 'LIVE' && 'animate-pulse')} />}
            {config.label}
            {lastUpdated && <span className="ml-1 border-l pl-1.5 font-normal opacity-80">{lastUpdated}</span>}
          </Badge>
        </span>
      </TooltipTrigger>
      <TooltipContent>{config.description}{lastUpdated ? ` · Last updated: ${lastUpdated}` : ''}</TooltipContent>
    </Tooltip>
  );
}
export { DataSourceBadge };
