"use client";

import clsx from "clsx";
import { Snowflake } from "lucide-react";

interface FreeCoolingButtonProps {
  isOn: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function FreeCoolingButton({ isOn, onClick, disabled }: FreeCoolingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-between w-full p-6 rounded-[2rem] border transition-all duration-700 group",
        isOn
          ? "bg-sky-500/5 border-sky-500/20 text-sky-200 shadow-[0_0_40px_rgba(14,165,233,0.08)]"
          : "bg-white/[0.01] border-white/5 text-neutral-600 hover:bg-white/[0.03]"
      )}
    >
      <div className="flex items-center gap-5">
        <div className={clsx(
          "p-3.5 rounded-2xl transition-all duration-500",
          isOn ? "bg-sky-500/10 shadow-lg shadow-sky-500/5" : "bg-neutral-900"
        )}>
          <Snowflake
            size={24}
            className={clsx(
              "transition-all duration-500",
              isOn ? "text-sky-400" : "text-neutral-700"
            )}
          />
        </div>
        <div className="text-left">
          <span className={clsx(
            "block text-base font-medium tracking-tight transition-colors duration-500",
            isOn ? "text-neutral-100" : "text-neutral-500"
          )}>
            Free Cooling
          </span>
          <span className="text-[9px] text-neutral-700 font-bold uppercase tracking-[0.2em]">
            Bypass: {isOn ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <div className={clsx(
        "w-2 h-2 rounded-full transition-all duration-700",
        isOn
          ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,1)] scale-125"
          : "bg-neutral-800"
      )} />
    </button>
  );
}