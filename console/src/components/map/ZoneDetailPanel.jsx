import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import ZoneThumb from '../terra/ZoneThumb.jsx';
import StatusPill from '../terra/StatusPill.jsx';
import { getCategory } from '../../data/homestead/farm-zones.js';
import { masterPlanFacilities } from '../../data/homestead/master-plan.js';
import { PATHS } from '../../app/router/paths.js';

const MODULE_PATHS = {
  Cultivation: PATHS.MANAGEMENT.CULTIVATION,
  Livestock: PATHS.MANAGEMENT.LIVESTOCK,
  Aquaculture: PATHS.MANAGEMENT.AQUACULTURE,
  Circular: PATHS.MANAGEMENT.CIRCULAR,
  Inventory: PATHS.MANAGEMENT.INVENTORY,
  'Energy & Water': PATHS.MANAGEMENT.ENERGY_WATER,
};

/** Slide-in detail panel for one zone. Uses the master-plan facility record when the zone has one. */
export default function ZoneDetailPanel({ zone, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!zone) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zone, onClose]);

  if (!zone) return null;
  const cat = getCategory(zone.category);
  const facility = masterPlanFacilities.find((f) => f.id === zone.facilityId);

  return createPortal(
    <>
      <div className="fixed inset-0 z-[60] bg-black/20" onClick={onClose} aria-hidden="true" />
      <aside role="dialog" aria-label={`Detail zona ${zone.code}`} className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[400px] flex-col overflow-y-auto bg-white p-5 shadow-2xl">
        <div className="sticky top-0 z-10 -mx-5 -mt-5 mb-4 flex shrink-0 items-start justify-between gap-3 bg-white px-5 pb-3 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-leaf px-2 text-base font-extrabold text-white">{zone.code}</span>
            <div>
              <h2 className="text-lg font-extrabold leading-tight text-[#14281D]">{zone.name}</h2>
              <StatusPill tone="green" className="mt-1">{cat.emoji} {cat.label}</StatusPill>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#486253] hover:bg-[#EEF6EA]" aria-label="Tutup">
            <X className="h-5 w-5" />
          </button>
        </div>

        <ZoneThumb zone={zone} ratio={1.6} zoom={0.55} className="w-full shrink-0 rounded-2xl" />

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-[#F3FAF0] p-3"><dt className="text-xs font-semibold text-[#486253]">Luas</dt><dd className="font-extrabold text-[#14281D]">{zone.areaM2} m²</dd></div>
          <div className="rounded-2xl bg-[#F3FAF0] p-3"><dt className="text-xs font-semibold text-[#486253]">Ukuran</dt><dd className="font-extrabold text-[#14281D]">{zone.size}</dd></div>
          {facility?.status && (
            <div className="col-span-2 rounded-2xl bg-[#F3FAF0] p-3"><dt className="text-xs font-semibold text-[#486253]">Status</dt><dd className="font-extrabold text-[#14281D]">{facility.status}</dd></div>
          )}
        </dl>

        {facility ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-[#2B3A30]">{facility.description}</p>
            {facility.relatedResources?.length > 0 && (
              <div className="mt-4">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[#486253]">Sumber daya terkait</p>
                <div className="flex flex-wrap gap-1.5">
                  {facility.relatedResources.map((r) => <span key={r} className="rounded-full bg-[#EEF6EA] px-2.5 py-1 text-xs font-semibold text-[#2E7D1E]">{r}</span>)}
                </div>
              </div>
            )}
            {facility.relatedModules?.length > 0 && (
              <div className="mt-4">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-[#486253]">Buka modul</p>
                <div className="flex flex-wrap gap-1.5">
                  {facility.relatedModules.map((m) => (
                    <button key={m} type="button" onClick={() => navigate(MODULE_PATHS[m] || PATHS.MANAGEMENT.ROOT)} className="rounded-full border border-[#CFE6C3] bg-white px-3 py-1 text-xs font-bold text-leaf hover:bg-[#EEF6EA]">{m} →</button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="mt-4 rounded-2xl bg-[#FFF8E6] p-3 text-sm font-medium text-[#8A5A00]">Detail operasional zona ini belum tersedia.</p>
        )}
      </aside>
    </>,
    document.body
  );
}
