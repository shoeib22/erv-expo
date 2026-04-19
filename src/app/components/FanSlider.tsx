"use client";

import { useState, useCallback } from "react";
import clsx from "clsx";

interface FanSliderProps {
  value: number; // 0–3
  onChange: (value: number) => void;
  disabled?: boolean;
}

const LABELS = ["Off", "Low", "Medium", "High"];

export function FanSlider({ value, onChange, disabled }: FanSliderProps) {
  const [dragging, setDragging] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  // Convert 0–3 → %
  const percent = (value / 3) * 100;

  return (
    <div className={clsx("w-full", disabled && "opacity-40 pointer-events-none")}>
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 tracking-widest uppercase">
          Fan Speed
        </span>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-light text-gray-100 tabular-nums">
            {value}
          </span>
          <span className="text-sm text-gray-400">
            · {LABELS[value]}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative w-full h-10 flex items-center">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/10">
          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)] transition-all duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="relative w-full appearance-none bg-transparent cursor-pointer"
        />
      </div>

      {/* Discrete ticks */}
      <div className="flex justify-between mt-2 px-1">
        {LABELS.map((label, i) => (
          <span
            key={i}
            className={clsx(
              "text-[10px] transition-colors",
              value === i ? "text-blue-400" : "text-gray-500"
            )}
          >
            {label}
          </span>
        ))}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: ${dragging ? "24px" : "20px"};
          height: ${dragging ? "24px" : "20px"};
          border-radius: 50%;
          background: #1c2230;
          border: 2px solid rgba(96, 165, 250, 0.7);
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.6),
            0 0 12px rgba(96, 165, 250, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1c2230;
          border: 2px solid rgba(96, 165, 250, 0.7);
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.6),
            0 0 12px rgba(96, 165, 250, 0.6);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}