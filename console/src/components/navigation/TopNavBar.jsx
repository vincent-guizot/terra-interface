import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Sprout,
  MapPin,
  TrendingUp,
  Layers,
  CheckCircle2,
  Cpu,
  SlidersHorizontal,
  ChevronDown,
  Sun,
  Zap,
  Search,
  Bell,
  User,
  Menu,
  X,
  Wheat,
  Fish,
  RotateCw,
  Archive,
  Droplets,
  Settings,
} from 'lucide-react';
import { Button } from '../ui/button.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.jsx';
import { Badge } from '../ui/badge.jsx';
import { PATHS } from '../../router/paths.js';

export default function TopNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', path: PATHS.HOME, icon: Sprout },
    { name: 'Map', path: PATHS.MAP, icon: MapPin },
    { name: 'Production', path: PATHS.PRODUCTION, icon: TrendingUp },
    { name: 'Resources', path: PATHS.RESOURCES, icon: Layers },
    { name: 'Activities', path: PATHS.ACTIVITIES, icon: CheckCircle2 },
    { name: 'Intelligence', path: PATHS.INTELLIGENCE, icon: Cpu },
  ];

  const managementSubmodules = [
    {
      name: 'Cultivation',
      path: PATHS.MANAGEMENT.CULTIVATION,
      desc: 'Crops, Batches & Harvests',
      icon: Wheat,
    },
    {
      name: 'Livestock',
      path: PATHS.MANAGEMENT.LIVESTOCK,
      desc: 'Chickens, Boer Goats & Sheep',
      icon: Sprout,
    },
    {
      name: 'Aquaculture',
      path: PATHS.MANAGEMENT.AQUACULTURE,
      desc: 'Tilapia, Bio-Ponds & Water',
      icon: Fish,
    },
    {
      name: 'Circular',
      path: PATHS.MANAGEMENT.CIRCULAR,
      desc: 'BSF Maggots & Bokashi Compost',
      icon: RotateCw,
    },
    {
      name: 'Inventory',
      path: PATHS.MANAGEMENT.INVENTORY,
      desc: 'Warehouse Stock & Ledger',
      icon: Archive,
    },
    {
      name: 'Energy & Water',
      path: PATHS.MANAGEMENT.ENERGY_WATER,
      desc: 'Solar Microgrid & Cisterns',
      icon: Droplets,
    },
    {
      name: 'Catalog & Configuration',
      path: PATHS.MANAGEMENT.CATALOG,
      desc: 'Custom Types, Units & Settings',
      icon: Settings,
    },
  ];

  const isManagementActive = location.pathname.startsWith('/management') || location.pathname.startsWith('/operations');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(27,67,50,0.08)] bg-[#FAF9F5]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => navigate(PATHS.HOME)}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#059669] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Sprout className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-[#14281D]">TERRA</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                HOME OS
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#486253]">Vincent's Farm • 300 m² (ID)</p>
          </div>
        </div>

        {/* Central Horizontal Navigation (7 items) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EDF4EE]/80 p-1.5 rounded-2xl border border-[rgba(27,67,50,0.08)] shadow-sm">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === PATHS.HOME
              ? location.pathname === '/' || location.pathname === '/overview'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive: isMatch }) => {
                  const active = item.path === PATHS.HOME
                    ? (location.pathname === '/' || location.pathname === '/overview')
                    : isMatch;
                  return `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-white text-[#1B4332] shadow-sm border border-[rgba(27,67,50,0.08)]'
                      : 'text-[#486253] hover:text-[#1B4332] hover:bg-white/50'
                  }`;
                }}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-[#6A8774]'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* 7th Navigation Item: Management with Dropdown Submenu */}
          <DropdownMenu>
            <div className="flex items-center">
              <NavLink
                to={PATHS.MANAGEMENT.ROOT}
                className={`flex items-center gap-1.5 pl-3.5 pr-1.5 py-1.5 rounded-l-xl text-xs font-semibold transition-all ${
                  isManagementActive
                    ? 'bg-white text-[#1B4332] shadow-sm border-l border-y border-[rgba(27,67,50,0.08)]'
                    : 'text-[#486253] hover:text-[#1B4332] hover:bg-white/50'
                }`}
              >
                <SlidersHorizontal className={`w-3.5 h-3.5 ${isManagementActive ? 'text-emerald-600' : 'text-[#6A8774]'}`} />
                <span>Management</span>
              </NavLink>
              <DropdownMenuTrigger asChild>
                <button
                  className={`p-1.5 rounded-r-xl text-xs font-semibold transition-all ${
                    isManagementActive
                      ? 'bg-white text-emerald-600 shadow-sm border-r border-y border-[rgba(27,67,50,0.08)]'
                      : 'text-[#486253] hover:text-[#1B4332] hover:bg-white/50'
                  }`}
                  aria-label="Management Submenu"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent align="end" className="w-72 p-2">
              <DropdownMenuLabel className="flex items-center justify-between text-xs font-bold text-[#14281D]">
                <span>Management Modules</span>
                <Badge variant="secondary" className="text-[10px]">7 Domains</Badge>
              </DropdownMenuLabel>
              <p className="px-3 pb-2 text-[11px] text-[#486253]">
                Contextual operations embedded within each module.
              </p>
              <DropdownMenuSeparator />
              {managementSubmodules.map((sub) => {
                const SubIcon = sub.icon;
                return (
                  <DropdownMenuItem
                    key={sub.name}
                    onClick={() => navigate(sub.path)}
                    className="flex items-start gap-2.5 p-2 rounded-xl cursor-pointer hover:bg-[#EDF4EE]"
                  >
                    <div className="p-1.5 rounded-lg bg-[#EDF4EE] text-emerald-700 mt-0.5">
                      <SubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#14281D]">{sub.name}</p>
                      <p className="text-[11px] text-[#486253]">{sub.desc}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(PATHS.MANAGEMENT.ROOT)}
                className="justify-center font-bold text-xs text-emerald-700 py-2 hover:bg-emerald-50 rounded-xl"
              >
                Open All Management Modules →
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Accessories (Weather, Power, Profile) */}
        <div className="flex items-center gap-2">
          {/* Weather & Power Pill */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-white border border-[rgba(27,67,50,0.08)] shadow-sm text-xs font-semibold text-[#1B4332]">
            <div className="flex items-center gap-1.5 text-amber-600">
              <Sun className="w-4 h-4" />
              <span>28°C</span>
            </div>
            <div className="w-px h-3.5 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Zap className="w-4 h-4" />
              <span>4.8 kW</span>
            </div>
          </div>

          {/* Quick Search */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(PATHS.MAP)}
            className="rounded-2xl border-[rgba(27,67,50,0.1)] text-[#486253] hover:text-[#1B4332]"
            title="Search Facilities & Batches"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-2xl border-[rgba(27,67,50,0.1)] text-[#486253] hover:text-[#1B4332]"
            title="Operational Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1 cursor-pointer">
            <div className="w-9 h-9 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              V
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-[#14281D] leading-tight">Vincent</p>
              <p className="text-[10px] text-[#486253]">Steward</p>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#1B4332] hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-[#FAF9F5] p-4 space-y-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-semibold text-[#14281D] hover:bg-emerald-50"
            >
              <item.icon className="w-4 h-4 text-emerald-600" />
              <span>{item.name}</span>
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs font-bold text-[#486253] uppercase px-2 mb-1">Management</p>
            {managementSubmodules.map((sub) => (
              <NavLink
                key={sub.name}
                to={sub.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-[#14281D] hover:bg-emerald-50"
              >
                <sub.icon className="w-3.5 h-3.5 text-emerald-600" />
                <span>{sub.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
