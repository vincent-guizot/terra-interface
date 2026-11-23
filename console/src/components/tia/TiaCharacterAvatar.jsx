import React, { useState } from 'react';

/**
 * =========================================================================
 * ASSET CONFIGURATION SLOT: TIA CHARACTER ASSETS
 * =========================================================================
 * Masukkan path gambar aset karakter Tia di sini ketika gambar sudah siap.
 * Format yang didukung: PNG, SVG, WebP, atau GIF transparan.
 * 
 * Contoh penggunaan:
 * export const TIA_CUSTOM_ASSETS = {
 *   idle: '/assets/tia/tia-idle.png',
 *   thinking: '/assets/tia/tia-thinking.png',
 *   happy: '/assets/tia/tia-happy.png',
 *   alert: '/assets/tia/tia-alert.png',
 * };
 */
export const TIA_CUSTOM_ASSETS = {
  idle: null,
  thinking: null,
  happy: null,
  alert: null,
};

const SIZE_MAP = {
  xs: 24,
  sm: 36,
  md: 48,
  lg: 72,
  xl: 108,
};

/**
 * TiaCharacterAvatar
 * Menampilkan avatar/karakter Tia dengan fallback SVG eco-bot interaktif
 * saat aset grafis eksternal belum tersedia.
 */
export default function TiaCharacterAvatar({
  mood = 'idle', // 'idle' | 'thinking' | 'happy' | 'alert'
  size = 'md',
  animate = true,
  className = '',
  customSrc = null,
}) {
  const [imageError, setImageError] = useState(false);
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || SIZE_MAP.md;

  const resolvedAssetSrc = customSrc || TIA_CUSTOM_ASSETS[mood] || TIA_CUSTOM_ASSETS.idle;

  // Mood color schemes
  const moodColors = {
    idle: {
      primary: '#144E36',
      accent: '#10B981',
      glow: 'rgba(16, 185, 129, 0.35)',
      leaf: '#34D399',
    },
    thinking: {
      primary: '#1E3A8A',
      accent: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.45)',
      leaf: '#60A5FA',
    },
    happy: {
      primary: '#144E36',
      accent: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.4)',
      leaf: '#10B981',
    },
    alert: {
      primary: '#7C2D12',
      accent: '#F97316',
      glow: 'rgba(249, 115, 22, 0.45)',
      leaf: '#FB923C',
    },
  };

  const currentTheme = moodColors[mood] || moodColors.idle;

  // Jika aset gambar kustom disediakan dan tidak error, tampilkan gambar
  if (resolvedAssetSrc && !imageError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <img
          src={resolvedAssetSrc}
          alt={`Tia AI - ${mood}`}
          className={`w-full h-full object-contain ${animate ? 'animate-bounce-subtle' : ''}`}
          onError={() => setImageError(true)}
        />
        {/* Mood indicator dot */}
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
          style={{ backgroundColor: currentTheme.accent }}
        />
      </div>
    );
  }

  // Fallback: High-fidelity Vector Botanical Eco-Bot Mascot (Tia)
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
      title={`Tia (Terra Interface AI) • Status: ${mood.toUpperCase()}`}
    >
      <svg
        viewBox="0 0 100 100"
        width={pixelSize}
        height={pixelSize}
        className={`${animate && mood === 'thinking' ? 'animate-pulse' : ''}`}
        style={{
          filter: `drop-shadow(0 4px 8px ${currentTheme.glow})`,
          transition: 'all 0.3s ease',
        }}
      >
        <defs>
          <linearGradient id="tiaHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>

          <linearGradient id="tiaVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>

          <linearGradient id="tiaLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={currentTheme.leaf} />
            <stop offset="100%" stopColor={currentTheme.accent} />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Antenna & Sprout Leaf --- */}
        {/* Antenna Stem */}
        <path
          d="M 50,30 Q 50,16 46,12"
          fill="none"
          stroke={currentTheme.primary}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Sprout Leaf (Botanical Symbol) */}
        <path
          d="M 46,12 C 40,6 34,14 46,12 C 54,10 56,4 46,12"
          fill="url(#tiaLeafGrad)"
          stroke="#065F46"
          strokeWidth="1"
        />
        {/* Antenna Signal Tip Glow */}
        <circle
          cx="46"
          cy="12"
          r="3"
          fill={currentTheme.accent}
          filter="url(#softGlow)"
        />

        {/* --- Outer Ear Pods (Headset / Comm Nodes) --- */}
        <rect
          x="14"
          y="42"
          width="8"
          height="18"
          rx="4"
          fill={currentTheme.primary}
        />
        <circle cx="18" cy="51" r="2" fill={currentTheme.accent} />

        <rect
          x="78"
          y="42"
          width="8"
          height="18"
          rx="4"
          fill={currentTheme.primary}
        />
        <circle cx="82" cy="51" r="2" fill={currentTheme.accent} />

        {/* --- Main Bot Head --- */}
        <rect
          x="20"
          y="26"
          width="60"
          height="50"
          rx="22"
          fill="url(#tiaHeadGrad)"
          stroke={currentTheme.primary}
          strokeWidth="2.5"
        />

        {/* --- Digital Visor Display --- */}
        <rect
          x="26"
          y="34"
          width="48"
          height="30"
          rx="12"
          fill="url(#tiaVisorGrad)"
        />

        {/* --- Expressive Eyes based on Mood --- */}
        {mood === 'idle' && (
          <g fill={currentTheme.accent}>
            {/* Friendly Round Digital Eyes */}
            <ellipse cx="40" cy="48" rx="4.5" ry="5.5" />
            <ellipse cx="60" cy="48" rx="4.5" ry="5.5" />
            {/* Eye Highlight */}
            <circle cx="42" cy="46" r="1.5" fill="#FFFFFF" />
            <circle cx="62" cy="46" r="1.5" fill="#FFFFFF" />
            {/* Soft digital smile curve */}
            <path
              d="M 47,56 Q 50,58 53,56"
              fill="none"
              stroke={currentTheme.accent}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {mood === 'happy' && (
          <g stroke={currentTheme.accent} strokeWidth="3" strokeLinecap="round" fill="none">
            {/* Joyful Happy Arched Eyes ^^ */}
            <path d="M 36,50 Q 40,43 44,50" />
            <path d="M 56,50 Q 60,43 64,50" />
            {/* Rosy Cheeks */}
            <circle cx="34" cy="54" r="2.5" fill="rgba(244, 114, 182, 0.6)" stroke="none" />
            <circle cx="66" cy="54" r="2.5" fill="rgba(244, 114, 182, 0.6)" stroke="none" />
            {/* Happy Smile */}
            <path d="M 46,55 Q 50,60 54,55" strokeWidth="2" />
          </g>
        )}

        {mood === 'thinking' && (
          <g fill={currentTheme.accent}>
            {/* Scanning / Processing Data Wave Eyes */}
            <rect x="34" y="46" width="12" height="4" rx="2" />
            <rect x="54" y="46" width="12" height="4" rx="2" />
            {/* Data Stream Blinks */}
            <circle cx="40" cy="55" r="1.5" opacity="0.8" />
            <circle cx="50" cy="55" r="1.5" opacity="0.9" />
            <circle cx="60" cy="55" r="1.5" opacity="0.8" />
          </g>
        )}

        {mood === 'alert' && (
          <g stroke={currentTheme.accent} strokeWidth="3" strokeLinecap="round" fill="none">
            {/* Alert / Attention Eyes */}
            <circle cx="40" cy="48" r="4.5" fill={currentTheme.accent} stroke="none" />
            <circle cx="60" cy="48" r="4.5" fill={currentTheme.accent} stroke="none" />
            <circle cx="40" cy="48" r="1.8" fill="#FFFFFF" stroke="none" />
            <circle cx="60" cy="48" r="1.8" fill="#FFFFFF" stroke="none" />
            {/* Small O Mouth */}
            <circle cx="50" cy="57" r="2" fill="none" stroke={currentTheme.accent} strokeWidth="1.5" />
          </g>
        )}

        {/* --- Ecological Core Collar Badge (Bottom) --- */}
        <g transform="translate(42, 73)">
          <rect
            x="0"
            y="0"
            width="16"
            height="10"
            rx="5"
            fill={currentTheme.primary}
            stroke="#FFFFFF"
            strokeWidth="1"
          />
          <circle cx="8" cy="5" r="2.5" fill={currentTheme.accent} filter="url(#softGlow)" />
        </g>
      </svg>

      {/* Status indicator pulse ring */}
      <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <span
          className="relative inline-flex rounded-full h-3 w-3 border-2 border-white"
          style={{ backgroundColor: currentTheme.accent }}
        />
      </span>
    </div>
  );
}
