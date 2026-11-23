import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, CalendarClock, CheckCheck, Sprout } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx';
import { useNotifications } from '../../hooks/useDashboard.js';
import { cn } from '../../lib/utils.js';

const TYPE_ICON = { reminder: CalendarClock, harvest: Sprout, alert: AlertTriangle, info: Bell };
const SEVERITY_TONE = { info: 'bg-[#E4F4DA] text-leaf', warning: 'bg-[#FFF1D6] text-[#D98B00]', critical: 'bg-[#FDE3E1] text-[#C62828]' };

export default function NotificationBell() {
  const navigate = useNavigate();
  const { items, unreadCount, isError, markRead, markAllRead } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-[#2B3A30] transition-colors hover:bg-[#EEF6EA]"
          aria-label={unreadCount ? `Notifikasi, ${unreadCount} belum dibaca` : 'Notifikasi'}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-extrabold leading-none text-white ring-2 ring-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[22rem] p-2">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <span className="text-sm font-extrabold text-[#14281D]">Notifikasi & Pengingat</span>
          <button type="button" disabled={!unreadCount} onClick={() => markAllRead()} className="flex items-center gap-1 text-xs font-bold text-leaf disabled:opacity-40">
            <CheckCheck className="h-3.5 w-3.5" /> Tandai semua dibaca
          </button>
        </div>
        {isError && <p className="px-2 py-4 text-center text-sm font-medium text-[#486253]">Notifikasi tidak dapat dimuat.</p>}
        {!isError && items.length === 0 && <p className="px-2 py-6 text-center text-sm font-medium text-[#486253]">Tidak ada notifikasi.</p>}
        <ul className="max-h-96 overflow-y-auto">
          {items.map((n) => {
            const Icon = TYPE_ICON[n.type] || Bell;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => { if (!n.read) markRead(n.id); if (n.link) navigate(n.link); }}
                  className={cn('flex w-full items-start gap-3 rounded-xl p-2 text-left hover:bg-[#EEF6EA]', !n.read && 'bg-[#F6FAF3]')}
                >
                  <span className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', SEVERITY_TONE[n.severity])}><Icon className="h-4 w-4" /></span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className={cn('block text-sm text-[#14281D]', n.read ? 'font-semibold' : 'font-extrabold')}>{n.title}</span>
                    <span className="block text-xs font-medium text-[#486253]">{n.message}</span>
                  </span>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-leaf" aria-label="Belum dibaca" />}
                </button>
              </li>
            );
          })}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
