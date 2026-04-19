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
    },
    {
      label: "Mode",
      value: state.mode.charAt(0).toUpperCase() + state.mode.slice(1),
      accent: false,
    },
    {
      label: "Fan",
      value: `${state.fanSpeed}%`,
      accent: false,
    },
  ];

  return (
    <div className="w-full">
      {/* Status row */}
      <div className="flex items-center justify-between gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={clsx(
              "flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-2xl",
              "bg-white/5 border border-white/5",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
              "transition-all duration-300"
            )}
          >
            <span className="text-[10px] font-medium tracking-widest uppercase text-gray-500">
              {item.label}
            </span>

            <span
              className={clsx(
                "text-sm font-medium transition-colors",
                item.accent
                  ? "text-blue-400"
                  : "text-gray-200"
              )}
            >
              {item.value}
            </span>

            {/* subtle accent glow for Power */}
            {item.accent && (
              <span className="absolute inset-0 rounded-2xl bg-blue-400/5 blur-md -z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Sync / error status */}
      <div className="mt-3 h-5 flex items-center justify-center">
        {error ? (
          <p className="text-xs text-red-400 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
            {error}
          </p>
        ) : syncing ? (
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Syncing…
          </p>
        ) : (
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            Live
          </p>
        )}
      </div>
    </div>
  );
}