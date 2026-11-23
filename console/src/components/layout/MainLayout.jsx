import React from 'react';
import TopNavBar from '../navigation/TopNavBar.jsx';
import TiaAssistant from '../tia/TiaAssistant.jsx';
import { TiaProvider } from '../../context/TiaContext.jsx';
import { cn } from '../../lib/utils.js';

export default function MainLayout({ children, className = '' }) {
  return (
    <TiaProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#14281D]">
        {/* Horizontal Top Navigation */}
        <TopNavBar />

        {/* Main Page Canvas - Full Width */}
        <main className={cn('flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6', className)}>
          {children}
        </main>

        {/* Floating Tia AI Assistant */}
        <TiaAssistant />

        {/* Footer - Full Width */}
        <footer className="border-t border-[rgba(27,67,50,0.08)] bg-white/60 py-4 mt-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#748B7D] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#14281D]">TERRA INTERFACE</span>
              <span>— Personal Self-Sustaining Home Operating System</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Vincent's Farm 300 m² (West Java, ID)</span>
              <span>Ecosystem 94.2% Autonomous</span>
            </div>
          </div>
        </footer>
      </div>
    </TiaProvider>
  );
}
