"use client";

import { useState } from "react";
import clsx from "clsx";
import { Wind } from "lucide-react";

interface Co2PanelProps {
  co2Value: number;
  co2Threshold: number;
  co2Switch: boolean;
  onToggleSwitch: () => void;
  onSetThreshold: (value: number) => void;
  disabled?: boolean;
}

function getCo2Status(ppm: number, threshold: number) {
  if (ppm < 800)  return { label: "Good",     color: "text-green-400",  bar: "bg-green-500/50"  };
  if (ppm < threshold) return { label: "Fair", color: "text-yellow-400", bar: "bg-yellow-500/50" };
  return               { label: "Alert",       color: "text-red-400",    bar: "bg-red-500/60"    };
}

export function Co2Panel({
  co2Value,
  co2Threshold,
  co2Switch,
  onToggleSwitch,
  onSetThreshold,
  disabled,
}: Co2PanelProps) {
  const [localThreshold, setLocalThreshold] = useState(co2Threshold);
  const status = getCo2Status(co2Value, co2Threshold);
  const pct = Math.min(100, (co2Value / 2500) * 100);

  return (
    <div className="space-y-8">
      {/* Live CO2 reading */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-8">
          Atmosphere
        </p>
        <p className="text-[11px] text-neutral-600 uppercase tracking-widest mb-2 font-medium">
          CO₂ Concentration
        </p>
        <div className="flex items-baseline gap-3">
          <span className={clsx(
            "text-7xl font-light tracking-tighter transition-colors duration-1000",
            status.color
          )}>
            {co2Value}
          </span>
          <span className={clsx("text-sm font-bold tracking-widest uppercase", status.color)}>
            PPM
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={clsx("h-full rounded-full transition-all duration-1000", status.bar)}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={clsx("text-[10px] font-bold uppercase tracking-widest", status.color)}>
            {status.label}
          </span>
        </div>
      </div>

      {/* CO2 Monitor toggle */}
      <div>
        <p className="text-[11px] text-neutral-600 uppercase tracking-widest mb-3 font-medium">
          CO₂ Monitor
        </p>
        <button
          onClick={onToggleSwitch}
          disabled={disabled}
          className={clsx(
            "flex items-center justify-between w-full p-4 rounded-2xl border transition-all duration-500",
            co2Switch
              ? "bg-green-500/5 border-green-500/20"
              : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
          )}
        >
          <div className="flex items-center gap-3">
            <Wind
              size={16}
              className={co2Switch ? "text-green-400" : "text-neutral-700"}
            />
            <span className={clsx(
              "text-xs font-medium uppercase tracking-widest",
              co2Switch ? "text-green-300" : "text-neutral-500"
            )}>
              {co2Switch ? "Monitoring Active" : "Monitor Off"}
            </span>
          </div>
          <div className={clsx(
            "w-1.5 h-1.5 rounded-full transition-all duration-500",
            co2Switch
              ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
              : "bg-neutral-700"
          )} />
        </button>
      </div>

      {/* Threshold setter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] text-neutral-600 uppercase tracking-widest font-medium">
            Alert Threshold
          </p>
          <span className="text-sm font-light text-yellow-400 tabular-nums">
            {localThreshold} <span className="text-[10px] text-neutral-600">PPM</span>
          </span>
        </div>
        <input
          type="range"
          min={400}
          max={2000}
          step={50}
          value={localThreshold}
          disabled={disabled}
          onChange={(e) => setLocalThreshold(Number(e.target.value))}
          onMouseUp={() => onSetThreshold(localThreshold)}
          onTouchEnd={() => onSetThreshold(localThreshold)}
          className="w-full accent-yellow-500 disabled:opacity-30"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-neutral-700 font-bold uppercase tracking-widest">400</span>
          <span className="text-[9px] text-neutral-700 font-bold uppercase tracking-widest">2000</span>
        </div>
      </div>
    </div>
  );
}