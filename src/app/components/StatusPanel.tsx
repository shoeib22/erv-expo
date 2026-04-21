"use client";

import clsx from "clsx";
import type { DeviceState } from "@/lib/types";

interface StatusPanelProps {
  state: DeviceState;
  syncing: boolean;
  error: string | null;
}

export function StatusPanel({ state, syncing, error }: StatusPanelProps) {
  const items = [
    {
      label: "Power",
      value: state.power ? "On" : "Off",
      accent: state.power,
      color: "blue",
    },
    {
      label: "Mode",
      value: state.mode.charAt(0).toUpperCase() + state.mode.slice(1),
      accent: false,
      color: null,
    },
    {
      label: "Fan",
      value: `L${state.fanSpeed}`,
      accent: false,
      color: null,
    },
    {
      label: "Light",
      value: state.light ? "On" : "Off",
      accent: state.light,
      color: "yellow",
    },
    {
      label: "Anion",
      value: state.anion ? "On" : "Off",
      accent: state.anion,
      color: "teal",
    },
    {
      label: "Turbo",
      value: state.powerful ? "On" : "Off",
      accent: state.powerful,
      color: "orange",
    },
    {
      label: "Cool",
      value: state.freeCooling ? "On" : "Off",
      accent: state.freeCooling,
      color: "sky",
    },
  ];

  const accentClass: Record<string, string> = {
    blue:   "text-blue-400",
    yellow: "text-yellow-400",
    teal:   "text-teal-400",
    orange: "text-orange-400",
    sky:    "text-sky-400",   // ← was missing
  };

  return (
    <div className="w-full">
      {/* 3+3 grid — 7 items fills two rows with last row having 1 empty cell */}
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={clsx(
              "flex flex-col items-center gap-1 py-3 px-2 rounded-2xl relative overflow-hidden",
              "bg-white/5 border border-white/5",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
              "transition-all duration-300"
            )}
          >
            <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-600">
              {item.label}
            </span>
            <span className={clsx(
              "text-xs font-medium transition-colors duration-300",
              item.accent && item.color
                ? accentClass[item.color]
                : "text-neutral-400"
            )}>
              {item.value}
            </span>
            {/* Active dot */}
            {item.accent && (
              <span className={clsx(
                "absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                item.color === "blue"   && "bg-blue-400   shadow-[0_0_6px_rgba(96,165,250,0.8)]",
                item.color === "yellow" && "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]",
                item.color === "teal"   && "bg-teal-400   shadow-[0_0_6px_rgba(45,212,191,0.8)]",
                item.color === "orange" && "bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.8)]",
                item.color === "sky"    && "bg-sky-400    shadow-[0_0_6px_rgba(56,189,248,0.8)]",  // ← was missing
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Sync / error footer */}
      <div className="mt-3 h-5 flex items-center justify-center">
        {error ? (
          <p className="text-xs text-red-400 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
            {error}
          </p>
        ) : syncing ? (
          <p className="text-xs text-neutral-400 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Syncing…
          </p>
        ) : (
          <p className="text-xs text-neutral-500 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            Live
          </p>
        )}
      </div>
    </div>
  );
}