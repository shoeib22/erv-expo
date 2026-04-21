"use client";

import { useState } from "react";
import clsx from "clsx";
import { Wind, Zap, Sparkles } from "lucide-react";
import type { DeviceState } from "@/lib/types";

interface FanSliderProps {
  value: 1 | 2 | 3;
  onChange: (value: 1 | 2 | 3) => void;
  disabled?: boolean;
  // Pass full state so slider can reflect auxiliary context
  deviceState?: Pick<DeviceState, "anion" | "powerful" | "light">;
}

const LEVELS = [
  { id: 1, label: "Quiet",  desc: "Low Flow"  },
  { id: 2, label: "Normal", desc: "Balanced"  },
  { id: 3, label: "Boost",  desc: "High Flow" },
] as const;

export function FanSlider({ value, onChange, disabled, deviceState }: FanSliderProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const turboActive  = deviceState?.powerful ?? false;
  const anionActive  = deviceState?.anion    ?? false;
  const lightActive  = deviceState?.light    ?? false;

  // Active auxiliary indicators shown below the slider
  const activeAux = [
    turboActive && { label: "Turbo",  icon: Zap,      color: "text-orange-400" },
    anionActive && { label: "Anion",  icon: Sparkles,  color: "text-teal-400"   },
    lightActive && { label: "Light",  icon: Wind,      color: "text-yellow-400" },
  ].filter(Boolean) as { label: string; icon: React.ElementType; color: string }[];

  return (
    <div className={clsx("w-full select-none", disabled && "opacity-30 pointer-events-none")}>
      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-1">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-600 uppercase">
            Ventilation
          </p>
          <p className="text-sm font-medium text-neutral-400">
            {turboActive ? "Turbo Override" : LEVELS.find((l) => l.id === value)?.desc}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-600 uppercase text-right">
            Level
          </p>
          <span className={clsx(
            "text-2xl font-light tabular-nums leading-none transition-colors duration-500",
            turboActive ? "text-orange-400" : "text-blue-500"
          )}>
            0{value}
          </span>
        </div>
      </div>

      {/* Segmented Controller */}
      <div className={clsx(
        "relative flex items-stretch gap-2 h-24 p-2 rounded-[2rem] border shadow-inner transition-all duration-700",
        turboActive
          ? "bg-orange-950/20 border-orange-500/10"
          : "bg-black/40 border-white/5"
      )}>
        {/* Sliding backdrop */}
        <div
          className={clsx(
            "absolute top-2 bottom-2 border rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl",
            turboActive
              ? "bg-gradient-to-b from-orange-500/10 to-transparent border-orange-500/20"
              : "bg-gradient-to-b from-white/[0.08] to-transparent border-white/10"
          )}
          style={{
            left:  `calc(${(value - 1) * 33.33}% + 8px)`,
            width: `calc(33.33% - 16px)`,
          }}
        >
          <div className={clsx(
            "absolute inset-x-4 bottom-0 h-px shadow-[0_0_15px]",
            turboActive
              ? "bg-orange-500 shadow-orange-500/80"
              : "bg-blue-500   shadow-blue-500/80"
          )} />
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
              value === level.id
                ? turboActive ? "text-orange-400" : "text-blue-400"
                : "text-neutral-600"
            )}>
              {level.label}
            </span>
            <div className="flex gap-1 mt-1">
              {[...Array(level.id)].map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "w-1 h-3 rounded-full transition-all duration-700",
                    value === level.id
                      ? turboActive
                        ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                        : "bg-blue-500   shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                      : "bg-neutral-800"
                  )}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Progress bar + auxiliary indicators */}
      <div className="mt-4 flex items-center gap-4 px-2">
        <div className="flex-1 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-full transition-all duration-1000 ease-out",
              turboActive ? "bg-orange-600/60" : "bg-blue-600/40"
            )}
            style={{ width: `${(value / 3) * 100}%` }}
          />
        </div>
        <Wind
          size={16}
          className={clsx(
            "transition-all duration-500",
            value === 3 ? "text-blue-400 scale-125" : "text-neutral-700",
            value > 0 && "animate-pulse"
          )}
        />
      </div>

      {/* Auxiliary system pills */}
      {activeAux.length > 0 && (
        <div className="mt-4 flex items-center gap-2 px-1 flex-wrap">
          {activeAux.map(({ label, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5"
            >
              <Icon size={10} className={color} />
              <span className={clsx("text-[9px] font-bold uppercase tracking-widest", color)}>
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}