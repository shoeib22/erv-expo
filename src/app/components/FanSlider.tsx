"use client";

import { useState } from "react";
import clsx from "clsx";
import { Wind } from "lucide-react";

interface FanSliderProps {
  value: 1 | 2 | 3;
  onChange: (value: 1 | 2 | 3) => void;
  disabled?: boolean;
}

const LEVELS = [
  { id: 1, label: "Quiet", desc: "Low Flow" },
  { id: 2, label: "Normal", desc: "Balanced" },
  { id: 3, label: "Boost", desc: "High Flow" },
] as const;

export function FanSlider({ value, onChange, disabled }: FanSliderProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={clsx("w-full select-none", disabled && "opacity-30 pointer-events-none")}>
      {/* Header with improved typography */}
      <div className="flex items-end justify-between mb-6 px-1">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-600 uppercase">
            Ventilation
          </p>
          <p className="text-sm font-medium text-neutral-400">
            {LEVELS.find((l) => l.id === value)?.desc}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-600 uppercase text-right">
            Level
          </p>
          <span className="text-2xl font-light text-blue-500 tabular-nums leading-none">
            0{value}
          </span>
        </div>
      </div>

      {/* Segmented Controller Container */}
      <div className="relative flex items-stretch gap-2 h-24 p-2 bg-black/40 rounded-[2rem] border border-white/5 shadow-inner">
        {/* Sliding Backdrop (Indicator) */}
        <div 
          className="absolute top-2 bottom-2 bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl"
          style={{
            left: `calc(${(value - 1) * 33.33}% + 8px)`,
            width: `calc(33.33% - 16px)`,
          }}
        >
          {/* Subtle Glow beneath the active segment */}
          <div className="absolute inset-x-4 bottom-0 h-px bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </div>

        {LEVELS.map((level) => (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            onMouseEnter={() => setHovered(level.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative z-10 flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300"
          >
            <span className={clsx(
              "text-[10px] font-bold tracking-widest uppercase transition-colors duration-500",
              value === level.id ? "text-blue-400" : "text-neutral-600"
            )}>
              {level.label}
            </span>
            
            {/* Visual Bars - tactile feedback */}
            <div className="flex gap-1 mt-1">
              {[...Array(level.id)].map((_, i) => (
                <div 
                  key={i} 
                  className={clsx(
                    "w-1 h-3 rounded-full transition-all duration-700",
                    value === level.id 
                      ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" 
                      : "bg-neutral-800"
                  )} 
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Status Bar - Bottom */}
      <div className="mt-6 flex items-center gap-4 px-2">
        <div className="flex-1 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600/40 transition-all duration-1000 ease-out"
            style={{ width: `${(value / 3) * 100}%` }}
          />
        </div>
        <Wind 
          size={16} 
          className={clsx(
            "transition-all duration-500",
            value === 3 ? "text-blue-400 rotate-180 scale-125" : "text-neutral-700",
            value > 0 && "animate-pulse"
          )} 
        />
      </div>
    </div>
  );
}