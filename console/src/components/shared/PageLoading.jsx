import React from 'react';
import { Sprout } from 'lucide-react';

export default function PageLoading({ message = 'Loading Homestead Module...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200">
        <Sprout className="w-7 h-7 text-emerald-600 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </div>
      <p className="text-sm font-semibold text-[#14281D]">{message}</p>
      <p className="text-xs text-[#486253]">Vincent's Farm (300 m²)</p>
    </div>
  );
}
