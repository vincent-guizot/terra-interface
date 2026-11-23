import React from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';

/** Static period pill used in page headers ("This Month"). */
export default function PeriodSelect({ label = 'This Month' }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-[#14281D] shadow-sm ring-1 ring-[#E3EBDD]">
      <CalendarDays className="h-4 w-4 text-[#486253]" />
      {label}
      <ChevronDown className="h-4 w-4 text-[#486253]" />
    </span>
  );
}
