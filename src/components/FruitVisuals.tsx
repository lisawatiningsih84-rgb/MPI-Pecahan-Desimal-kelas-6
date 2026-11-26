import React, { useState } from 'react';
import type { FruitTheme } from '../utils/decimalQuiz';

interface FruitIconProps {
  fruit: FruitTheme;
  className?: string;
}

export const FruitIcon: React.FC<FruitIconProps> = ({ fruit, className = 'w-10 h-10' }) => {
  switch (fruit) {
    case 'jeruk':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <circle cx="32" cy="34" r="24" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
          <circle cx="32" cy="34" r="19" fill="#FDBA74" />
          <path d="M32 15v38M13 34h38M18.5 20.5l27 27M45.5 20.5l-27 27" stroke="#FFF7ED" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 10c4-5 11-5 14-2-3 4-9 6-14 2z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
        </svg>
      );
    case 'anggur':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M32 14v-6c0-2 3-3 5-2" stroke="#15803D" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M32 12c-5-4-11-3-13 1 4 3 9 3 13-1z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="7.5" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="40" cy="24" r="7.5" fill="#A855F7" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="32" cy="26" r="7.5" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="22" cy="36" r="7.5" fill="#A855F7" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="32" cy="38" r="7.5" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="42" cy="36" r="7.5" fill="#7E22CE" stroke="#581C87" strokeWidth="2" />
          <circle cx="32" cy="50" r="7.5" fill="#9333EA" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="29" cy="23" r="2" fill="#E9D5FF" />
          <circle cx="38" cy="34" r="2" fill="#E9D5FF" />
        </svg>
      );
    case 'apel':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M32 18V10" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M33 14c5-5 12-4 14 0-4 4-10 4-14 0z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
          <path
            d="M32 20c-8-5-20 0-20 14 0 12 8 22 15 22 3 0 4-1.5 5-1.5s2 1.5 5 1.5c7 0 15-10 15-22 0-14-12-19-20-14z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="2.5"
          />
          <ellipse cx="22" cy="30" rx="3" ry="6" transform="rotate(-20 22 30)" fill="#FCA5A5" opacity="0.7" />
        </svg>
      );
    case 'semangka':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M8 24a24 24 0 0 0 48 0Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path d="M12 24a20 20 0 0 0 40 0Z" fill="#ECFCCB" />
          <path d="M15 24a17 17 0 0 0 34 0Z" fill="#F43F5E" />
          <circle cx="25" cy="30" r="1.8" fill="#1E1B4B" />
          <circle cx="32" cy="35" r="1.8" fill="#1E1B4B" />
          <circle cx="39" cy="30" r="1.8" fill="#1E1B4B" />
          <circle cx="28" cy="27" r="1.5" fill="#1E1B4B" />
          <circle cx="36" cy="27" r="1.5" fill="#1E1B4B" />
        </svg>
      );
    case 'stroberi':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path
            d="M32 56C20 56 13 40 15 28c1.5-8 8-12 17-12s15.5 4 17 12c2 12-5 28-17 28z"
            fill="#E11D48"
            stroke="#9F1239"
            strokeWidth="2.5"
          />
          <path d="M20 18l6-6 6 5 6-5 6 6-7 3-5-2-5 2z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="25" cy="30" r="1.6" fill="#FDE047" />
          <circle cx="32" cy="27" r="1.6" fill="#FDE047" />
          <circle cx="39" cy="30" r="1.6" fill="#FDE047" />
          <circle cx="28" cy="38" r="1.6" fill="#FDE047" />
          <circle cx="36" cy="38" r="1.6" fill="#FDE047" />
          <circle cx="32" cy="46" r="1.6" fill="#FDE047" />
        </svg>
      );
    case 'pisang':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path
            d="M46 12c2 14-5 32-28 38-4 1-7-2-4-5 11-9 21-20 24-34 1-3 7-2 8 1z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M42 10l4 2" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'mangga':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M34 12c5-4 11-3 13 1-4 3-9 3-13-1z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <path
            d="M34 14c12 0 18 11 15 23-3 11-14 19-25 18-9-1-12-8-9-15 3-7 8-12 11-18 2-4 4-8 8-8z"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="2.5"
          />
          <ellipse cx="38" cy="26" rx="3" ry="6" transform="rotate(15 38 26)" fill="#FDE68A" opacity="0.7" />
        </svg>
      );
  }
};

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackFruit: FruitTheme;
  fallbackTitle: string;
  className?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackFruit,
  fallbackTitle,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet-100 to-purple-50 text-violet-900 p-6 ${className}`}
      >
        <FruitIcon fruit={fallbackFruit} className="w-16 h-16" />
        <span className="text-sm font-semibold text-center">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export type WheelFruit = 'jeruk' | 'semangka' | 'anggur';

interface InteractiveFruitWheelProps {
  slicesFilled: number;
  fruit: WheelFruit;
  onSelectCount: (count: number) => void;
}

const WHEEL_COLORS: Record<WheelFruit, { active: string; empty: string; rind: string; stroke: string }> = {
  jeruk: {
    active: '#FB923C',
    empty: '#FFF7ED',
    rind: '#EA580C',
    stroke: '#C2410C',
  },
  semangka: {
    active: '#F43F5E',
    empty: '#FFF1F2',
    rind: '#16A34A',
    stroke: '#9F1239',
  },
  anggur: {
    active: '#8B5CF6',
    empty: '#F5F3FF',
    rind: '#5B21B6',
    stroke: '#4C1D95',
  },
};

function describeWedge(cx: number, cy: number, r: number, startAngleDeg: number, endAngleDeg: number): string {
  const startRad = ((startAngleDeg - 90) * Math.PI) / 180;
  const endRad = ((endAngleDeg - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

export const InteractiveFruitWheel: React.FC<InteractiveFruitWheelProps> = ({
  slicesFilled,
  fruit,
  onSelectCount,
}) => {
  const palette = WHEEL_COLORS[fruit];
  const totalSlices = 10;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 240 240"
        className="w-56 h-56 md:w-64 md:h-64 select-none drop-shadow-sm"
        role="img"
        aria-label={`Diagram buah dibagi 10 bagian, ${slicesFilled} bagian terisi`}
      >
        <circle cx="120" cy="120" r="110" fill={palette.rind} />
        <circle cx="120" cy="120" r="100" fill="#FFFFFF" />
        {Array.from({ length: totalSlices }, (_, index) => {
          const startAngle = index * 36;
          const endAngle = (index + 1) * 36;
          const isFilled = index < slicesFilled;
          const midRad = (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
          const labelX = 120 + 62 * Math.cos(midRad);
          const labelY = 120 + 62 * Math.sin(midRad);
          const targetCount = index + 1 === slicesFilled ? index : index + 1;

          return (
            <g
              key={index}
              onClick={() => onSelectCount(targetCount)}
              className="cursor-pointer transition-opacity hover:opacity-90"
            >
              <path
                d={describeWedge(120, 120, 96, startAngle, endAngle)}
                fill={isFilled ? palette.active : palette.empty}
                stroke={palette.stroke}
                strokeWidth="2.5"
              />
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={isFilled ? '#FFFFFF' : '#4C1D95'}
              >
                {index + 1}
              </text>
            </g>
          );
        })}
        <circle cx="120" cy="120" r="18" fill="#FFFFFF" stroke={palette.stroke} strokeWidth="2" />
        <text
          x="120"
          y="124"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#1E1B4B"
          className="font-mono"
        >
          {slicesFilled}/10
        </text>
      </svg>

      {/* Accessible slice selector row */}
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih jumlah potongan buah">
        <button
          type="button"
          onClick={() => onSelectCount(0)}
          className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            slicesFilled === 0
              ? 'bg-violet-700 text-white border-violet-700'
              : 'bg-white text-violet-900 border-violet-200 hover:bg-violet-50'
          }`}
        >
          0
        </button>
        {Array.from({ length: 10 }, (_, idx) => {
          const val = idx + 1;
          const active = val <= slicesFilled;
          return (
            <button
              key={val}
              type="button"
              onClick={() => onSelectCount(val)}
              aria-label={`Pilih ${val} dari 10 potongan`}
              aria-pressed={slicesFilled === val}
              className={`w-8 h-8 text-xs font-semibold rounded-lg border transition-colors tabular-nums cursor-pointer ${
                active
                  ? 'bg-violet-600 text-white border-violet-600 hover:bg-violet-700'
                  : 'bg-white text-violet-900 border-violet-200 hover:bg-violet-50'
              }`}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
};
