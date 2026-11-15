import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import PageLoading from '../components/shared/PageLoading.jsx';
import { routes } from './routes.js';
import { PATHS } from './paths.js';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
      <div className="p-8 rounded-3xl bg-white border border-[rgba(27,67,50,0.1)] shadow-card max-w-md w-full">
        <h2 className="text-5xl font-black text-[#1B4332] mb-2">404</h2>
        <p className="text-base font-semibold text-[#14281D] mb-1">Page Not Found in Terra Interface</p>
        <p className="text-xs text-[#5A7565] mb-6">
          The requested route is outside Vincent's Farm 300 m² boundaries.
        </p>
        <a
          href={PATHS.HOME}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-[#1B4332] text-white text-sm font-bold shadow-sm hover:bg-[#2D6A4F] transition-all"
        >
          Return to Overview
        </a>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoading message="Loading Homestead View..." />}>
        <Routes>
          {routes.map((route, idx) => (
            <Route
              key={route.path || idx}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
