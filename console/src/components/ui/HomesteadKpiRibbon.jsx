import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Sun, BatteryCharging, Droplets, RefreshCw } from 'lucide-react';

export function HomesteadKpiRibbon({
  solarKw = 4.8,
  batteryPercent = 91,
  cisternLiters = 6850,
  circularityScore = 96.6,
  className = '',
}) {
  const kpis = [
    {
      label: 'Solar Harvest',
      value: `${solarKw} kW`,
      sub: 'Peak Diurnal',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      badge: 'Active',
      badgeVariant: 'warning',
    },
    {
      label: 'Battery Storage',
      value: `${batteryPercent}%`,
      sub: '15.3 kWh LiFePO4',
      icon: <BatteryCharging className="w-4 h-4 text-emerald-600" />,
      badge: '91% SoC',
      badgeVariant: 'success',
    },
    {
      label: 'Water Buffer',
      value: `${cisternLiters.toLocaleString()} L`,
      sub: '20.1 Days Autonomy',
      icon: <Droplets className="w-4 h-4 text-sky-600" />,
      badge: '4 Tanks',
      badgeVariant: 'sky',
    },
    {
      label: 'Closed-Loop Bio',
      value: `${circularityScore}%`,
      sub: '14.0 kg/d Diverted',
      icon: <RefreshCw className="w-4 h-4 text-emerald-700" />,
      badge: 'BSF + Bokashi',
      badgeVariant: 'success',
    },
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 ${className}`}>
      {kpis.map((kpi, idx) => (
        <Card key={idx} className="border-[#1B4332]/10 bg-white/95 backdrop-blur shadow-sm hover:shadow transition-all">
          <CardContent className="p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#5A7565] flex items-center gap-1.5">
                {kpi.icon}
                {kpi.label}
              </span>
              <Badge variant={kpi.badgeVariant} className="text-[10px] px-2 py-0">
                {kpi.badge}
              </Badge>
            </div>
            <div className="mt-0.5">
              <div className="text-xl font-extrabold text-[#1B4332] tracking-tight">{kpi.value}</div>
              <div className="text-[11px] text-[#748B7D] font-medium">{kpi.sub}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default HomesteadKpiRibbon;
