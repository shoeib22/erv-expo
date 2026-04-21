"use client";

import clsx from "clsx";
import { Timer, PowerOff } from "lucide-react";

type CountdownValue = "cancel" | "1h" | "2h" | "3h" | "4h" | "5h" | "6h";

interface CountdownSelectorProps {
  value: CountdownValue;
  minutesLeft: number;
  onChange: (value: CountdownValue) => void;
  disabled?: boolean;
}

const OPTIONS: CountdownValue[] = ["cancel", "1h", "2h", "3h", "4h", "5h", "6h"];

export function CountdownSelector({
  value,
  minutesLeft,
  onChange,
  disabled,
}: CountdownSelectorProps) {
  const isActive = value !== "cancel";

  // Helper to calculate progress percentage for the bar
  const getProgress = () => {
    if (!isActive || minutesLeft <= 0) return 0;
    const totalMinutes = parseInt(value) * 60;
    return Math.min((minutesLeft / totalMinutes) * 100, 100);
  };

  return (
    <div className={clsx(
      "relative group transition-all duration-500",
      disabled && "opacity-20 pointer-events-none grayscale"
    )}>
      {/* Background Glow Effect */}
      <div className={clsx(
        "absolute -inset-2 bg-purple-500/5 blur-2xl rounded-full transition-opacity duration-1000",
        isActive ? "opacity-100" : "opacity-0"
      )} />

      <div className="relative space-y-6">
        {/* Header Section */}
        <div className="flex items-end justify-between px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className={clsx(
                "p-1.5 rounded-lg transition-colors",
                isActive ? "bg-purple-500/20 text-purple-400" : "bg-neutral-900 text-neutral-600"
              )}>
                <Timer size={14} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">
                Shutoff Timer
              </p>
            </div>
          </div>

          {isActive && (
            <div className="text-right">
              <span className="block text-xl font-mono font-light text-purple-400 tabular-nums">
                {Math.floor(minutesLeft / 60)}h {minutesLeft % 60}m
              </span>
              <span className="text-[8px] text-neutral-600 uppercase tracking-widest font-bold">Remaining</span>
            </div>
          )}
        </div>

        {/* Selection Track */}
        <div className="relative p-1.5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between gap-1">
          {OPTIONS.map((opt) => {
            const isSelected = value === opt;
            const isCancel = opt === "cancel";
            
            return (
              <button
                key={opt}
                onClick={() => onChange(opt)}
                className={clsx(
                  "relative flex-1 py-3 rounded-xl text-[10px] font-bold transition-all duration-500 overflow-hidden",
                  isSelected
                    ? isCancel 
                      ? "text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                      : "text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "text-neutral-600 hover:text-neutral-400 hover:bg-white/[0.03]"
                )}
              >
                {/* Active Indicator Background */}
                {isSelected && (
                  <div className={clsx(
                    "absolute inset-0 transition-all duration-500 animate-in fade-in zoom-in-95",
                    isCancel ? "bg-red-500/20" : "bg-purple-600"
                  )} />
                )}
                
                <span className="relative z-10 uppercase tracking-tighter">
                  {isCancel ? <PowerOff size={12} className="mx-auto" /> : opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimal Progress Line */}
        <div className="px-2">
          <div className="h-[2px] w-full bg-white/[0.03] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-400 transition-all duration-1000 ease-out"
              style={{ width: `${isActive ? getProgress() : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}