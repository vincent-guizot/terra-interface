import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

/** Renders loading / error placeholders; returns null-safe children when data is ready. */
export default function DataState({ isLoading, error, onRetry, children }) {
  if (isLoading) {
    return (
      <div role="status" className="flex min-h-[50vh] items-center justify-center gap-3 text-[#486253]">
        <Loader2 className="h-5 w-5 animate-spin" /> <span className="font-semibold">Memuat data…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div role="alert" className="mx-auto mt-16 max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#E3EBDD]">
        <h2 className="text-lg font-extrabold text-[#14281D]">Data tidak dapat dimuat</h2>
        <p className="mt-2 text-sm font-medium text-[#486253]">{error.message}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-leaf px-5 py-2.5 text-sm font-bold text-white">
            <RefreshCw className="h-4 w-4" /> Coba lagi
          </button>
        )}
      </div>
    );
  }
  return children;
}
