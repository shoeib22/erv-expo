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
        "flex flex-1 items-center justify-between p-4 rounded-2xl border transition-all duration-300",
        isOn 
          ? "bg-yellow-400/10 border-yellow-400/20 text-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
          : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10",
        disabled && "opacity-40 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-3">
        <Lightbulb size={18} className={isOn ? "text-yellow-400" : "text-gray-600"} />
        <span className="text-[10px] font-bold tracking-widest uppercase">Internal Light</span>
      </div>
      <div className={clsx(
        "w-2 h-2 rounded-full transition-all duration-500",
        isOn ? "bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" : "bg-gray-700"
      )} />
    </button>
  );
}