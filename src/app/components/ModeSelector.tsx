"use client";

import clsx from "clsx";
import type { DeviceMode } from "@/lib/types";

const MODES: { value: DeviceMode; label: string }[] = [
  { value: "Supply", label: "Supply" },
  { value: "exhaust", label: "Exhaust" },
  { value: "ventilate", label: "Heat Recovery" },
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
        "relative flex bg-white/5 rounded-full p-1 gap-1 backdrop-blur-sm",
        "border border-white/5",
        "transition-opacity",
        disabled && "opacity-40 pointer-events-none"
      )}
      role="group"
      aria-label="Operating mode"
    >
      {MODES.map((mode) => {
        const active = value === mode.value;

        return (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            aria-pressed={active}
            className={clsx(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              active
                ? [
                    "bg-[#1f2430]",
                    "text-white",
                    "shadow-[0_4px_14px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]",
                  ]
                : [
                    "text-gray-400",
                    "hover:text-gray-200",
                    "hover:bg-white/5",
                  ]
            )}
            style={{ letterSpacing: "0.01em", minWidth: "60px" }}
          >
            {mode.label}

            {/* subtle glow when active */}
            {active && (
              <span className="absolute inset-0 rounded-full bg-blue-400/10 blur-md -z-10" />
            )}
          </button>
        );
      })}
    </div>
  );
}