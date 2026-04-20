"use client";

import clsx from "clsx";
import { Lightbulb } from "lucide-react";

interface LightButtonProps {
  isOn: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function LightButton({ isOn, onClick, disabled }: LightButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative group flex flex-col items-start justify-between w-full h-32 p-6 rounded-[2rem] border transition-all duration-700 ease-out",
        isOn 
          ? "bg-[#1c1910] border-yellow-500/30 text-yellow-200 shadow-[0_20px_50px_rgba(234,179,8,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)]" 
          : "bg-[#111111] border-white/5 text-neutral-500 hover:border-white/10 hover:bg-[#151515]",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      {/* Dynamic Light Beam Effect */}
      <div
        className={clsx(
          "absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[60px] rounded-full transition-opacity duration-1000 pointer-events-none",
          isOn ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="relative z-10 flex w-full justify-between items-start">
        <div className={clsx(
          "p-3 rounded-2xl transition-all duration-500",
          isOn ? "bg-yellow-400/20 shadow-lg shadow-yellow-400/10" : "bg-neutral-800"
        )}>
          <Lightbulb 
            size={22} 
            className={clsx(
              "transition-all duration-500",
              isOn ? "text-yellow-400 fill-yellow-400/20" : "text-neutral-600"
            )} 
          />
        </div>

        {/* Status Indicator Dot */}
        <div className={clsx(
          "w-1.5 h-1.5 rounded-full transition-all duration-700",
          isOn ? "bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,1)]" : "bg-neutral-800"
        )} />
      </div>

      <div className="relative z-10 text-left">
        <p className="text-[9px] font-bold tracking-[0.25em] text-neutral-600 uppercase mb-1">
          Accessory
        </p>
        <span className={clsx(
          "text-sm font-medium tracking-tight transition-colors duration-500",
          isOn ? "text-neutral-100" : "text-neutral-500"
        )}>
          Internal Light
        </span>
      </div>

      {/* Hidden bottom border glow on active */}
      <div className={clsx(
        "absolute bottom-0 left-8 right-8 h-px transition-all duration-700",
        isOn ? "bg-yellow-400/40 blur-[2px]" : "bg-transparent"
      )} />
    </button>
  );
}