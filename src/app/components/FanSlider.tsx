"use client";

import { useState, useCallback } from "react";
import clsx from "clsx";

interface FanSliderProps {
  // Matching the strict type from our hook
  value: 1 | 2 | 3; 
  onChange: (value: 1 | 2 | 3) => void;
  disabled?: boolean;
}

// Removing "Off" as the hardware power button handles that
const LABELS = {
  1: "Low",
  2: "Medium",
  3: "High"
};

export function FanSlider({ value, onChange, disabled }: FanSliderProps) {
  const [dragging, setDragging] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Force the number into the literal type 1 | 2 | 3
      const val = Number(e.target.value) as 1 | 2 | 3;
      onChange(val);
    },
    [onChange]
  );

  // Adjusted Percent Calculation for 1-3 range
  // Level 1 = 0%, Level 2 = 50%, Level 3 = 100%
  const percent = ((value - 1) / 2) * 100;

  return (
    <div className={clsx("w-full", disabled && "opacity-40 pointer-events-none")}>
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] font-semibold text-gray-500 tracking-[0.18em] uppercase">
          Fan Speed
        </span>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-light text-gray-100 tabular-nums">
            {value}
          </span>
          <span className="text-sm text-gray-400">
            · {LABELS[value as keyof typeof LABELS]}
          </span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-10 flex items-center group">
        {/* Track Background */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/5 overflow-hidden">
          {/* Progress Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-blue-400 transition-all duration-300 ease-out"
            style={{ 
              width: `${percent}%`,
              boxShadow: '0 0 15px rgba(96, 165, 250, 0.4)'
            }}
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="relative w-full appearance-none bg-transparent cursor-pointer z-10"
        />
      </div>

      {/* Discrete Labels */}
      <div className="flex justify-between mt-2 px-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={clsx(
              "text-[9px] font-bold tracking-widest uppercase transition-colors duration-300",
              value === i ? "text-blue-400" : "text-gray-600"
            )}
          >
            {LABELS[i as keyof typeof LABELS]}
          </span>
        ))}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: ${dragging ? "24px" : "20px"};
          height: ${dragging ? "24px" : "20px"};
          border-radius: 50%;
          background: #171a21;
          border: 2px solid #60a5fa;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(96, 165, 250, 0.3);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #171a21;
          border: 2px solid #60a5fa;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}