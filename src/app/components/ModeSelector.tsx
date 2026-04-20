"use client";

import clsx from "clsx";
import type { DeviceMode } from "@/lib/types";
import { ArrowDownLeft, ArrowUpRight, RefreshCcw } from "lucide-react";

const MODES: { value: DeviceMode; label: string; sub: string; icon: any }[] = [
  { 
    value: "ventilate", 
    label: "Heat Recovery", 
    sub: "Balanced Exchange", 
    icon: RefreshCcw 
  },
  { 
    value: "Supply", 
    label: "Fresh Air", 
    sub: "Intake Only", 
    icon: ArrowDownLeft 
  },
  { 
    value: "exhaust", 
    label: "Exhaust", 
    sub: "Extraction Only", 
    icon: ArrowUpRight 
  },
];

interface ModeSelectorProps {
  value: DeviceMode;
  onChange: (mode: DeviceMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ value, onChange, disabled }: ModeSelectorProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3 w-full",
        disabled && "opacity-30 pointer-events-none"
      )}
      role="group"
      aria-label="Operating mode"
    >
      {MODES.map((mode) => {
        const active = value === mode.value;
        const Icon = mode.icon;

        return (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            aria-pressed={active}
            className={clsx(
              "relative flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-500 overflow-hidden group",
              active
                ? [
                    "bg-[#1c1c1c] border-blue-500/30 text-white",
                    "shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)]",
                  ]
                : [
                    "bg-[#111111] border-white/5 text-neutral-500",
                    "hover:bg-[#151515] hover:border-white/10",
                  ]
            )}
          >
            {/* Background Active Accent */}
            <div className={clsx(
              "absolute left-0 top-0 bottom-0 w-1 transition-all duration-500",
              active ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" : "bg-transparent"
            )} />

            <div className="flex items-center gap-4 relative z-10">
              <div className={clsx(
                "p-3 rounded-xl transition-all duration-500",
                active ? "bg-blue-500/10 text-blue-400" : "bg-neutral-800 text-neutral-600 group-hover:text-neutral-400"
              )}>
                <Icon size={20} className={clsx(active && "animate-pulse")} />
              </div>
              
              <div className="text-left">
                <p className={clsx(
                  "text-sm font-medium tracking-tight transition-colors duration-500",
                  active ? "text-neutral-100" : "text-neutral-500"
                )}>
                  {mode.label}
                </p>
                <p className="text-[9px] font-bold tracking-[0.15em] text-neutral-600 uppercase">
                  {mode.sub}
                </p>
              </div>
            </div>

            {/* Radio-style indicator */}
            <div className={clsx(
              "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500",
              active ? "border-blue-500/50 bg-blue-500/10" : "border-neutral-800"
            )}>
              <div className={clsx(
                "w-2 h-2 rounded-full transition-all duration-500",
                active ? "bg-blue-400 scale-100 shadow-[0_0_8px_rgba(96,165,250,0.8)]" : "bg-transparent scale-50"
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}