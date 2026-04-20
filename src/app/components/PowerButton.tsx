"use client";

import { useCallback } from "react";
import clsx from "clsx";

interface PowerButtonProps {
  isOn: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function PowerButton({ isOn, onClick, disabled }: PowerButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled) onClick();
  }, [disabled, onClick]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer breathing ring */}
      {isOn && (
        <span
          className="absolute inset-0 rounded-full animate-breathe"
          style={{
            boxShadow: "0 0 0 0 rgba(96,165,250,0.4)",
          }}
        />
      )}

      {/* Glow halo */}
      <span
        className={clsx(
          "absolute rounded-full transition-all duration-700",
          isOn ? "opacity-100 scale-110" : "opacity-0 scale-95"
        )}
        style={{
          width: "170px",
          height: "170px",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Main button */}
      <button
        onClick={handleClick}
        disabled={disabled}
        aria-label={isOn ? "Turn device off" : "Turn device on"}
        className={clsx(
          "relative flex items-center justify-center rounded-full transition-all duration-500 select-none",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer active:scale-95",
          isOn
            ? [
                "bg-[#1c2230]",
                "border border-blue-400/40",
                "shadow-[0_0_40px_rgba(96,165,250,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]",
              ]
            : [
                "bg-[#141821]",
                "border border-white/10",
                "shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.03)]",
              ]
        )}
        style={{ width: "128px", height: "128px" }}
      >
        {/* Inner soft glow when ON */}
        {isOn && (
          <span className="absolute inset-0 rounded-full bg-blue-400/10 blur-md" />
        )}

        {/* Power icon */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none" 
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          className={clsx(
            "relative transition-all duration-500",
            isOn ? "stroke-blue-400" : "stroke-gray-500"
          )}
        >
          <path d="M12 2v7" />
          <path d="M4.22 4.22A9.5 9.5 0 1 0 19.78 4.22" />
        </svg>
      </button>
    </div>
  );
}