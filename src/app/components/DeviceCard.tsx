"use client";

import clsx from "clsx";
import { PowerButton } from "./PowerButton";
import { ModeSelector } from "./ModeSelector";
import { FanSlider } from "./FanSlider";
import { StatusPanel } from "./StatusPanel";
import { useDevice } from "../hooks/useDevice";

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center gap-6 py-16 animate-fade-in">
      <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-400 animate-spin" />
      
      <div className="w-full flex flex-col gap-3 px-4">
        <div className="h-3 w-24 bg-white/10 rounded-full animate-pulse" />
        <div className="h-5 w-40 bg-white/10 rounded-full animate-pulse" />
      </div>

      <p className="text-xs text-gray-500 tracking-wide">
        Connecting to device…
      </p>
    </div>
  );
}

export function DeviceCard() {
  const {
    state,
    loading,
    error,
    syncing,
    togglePower,
    setMode,
    setFanSpeed,
  } = useDevice();

  if (loading) return <LoadingSkeleton />;

  return (
    <div
      className={clsx(
        "relative w-full max-w-sm flex flex-col items-center gap-8",
        "bg-[#171a21] rounded-[2.5rem] px-8 py-9",
        "border border-white/5",
        "shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.03)]",
        "animate-slide-up"
      )}
    >
      {/* Top glow */}
      <div
        className={clsx(
          "absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full transition-all duration-1000",
          state.power
            ? "opacity-100 bg-blue-400/60 blur-md"
            : "opacity-0"
        )}
      />

      {/* Header */}
      <div className="w-full flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-500">
            Energy Recovery
          </p>
          <h1 className="text-xl font-semibold text-gray-100 mt-0.5 tracking-tight">
            Xerovolt <span className="text-blue-400 font-light">ERV</span>
          </h1>
        </div>

        {/* Status pill */}
        <div
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500",
            state.power
              ? "bg-blue-500/10 text-blue-300"
              : "bg-white/5 text-gray-500"
          )}
        >
          <span
            className={clsx(
              "w-2 h-2 rounded-full transition-all duration-500",
              state.power
                ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                : "bg-gray-600"
            )}
          />
          {state.power ? "Active" : "Standby"}
        </div>
      </div>

      {/* Power */}
      <div className="my-2">
        <PowerButton
          isOn={state.power}
          onClick={togglePower}
          disabled={syncing}
        />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/5" />

      {/* Mode */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-500">
          Mode
        </p>
        <ModeSelector
          value={state.mode}
          onChange={setMode}
          disabled={!state.power || syncing}
        />
      </div>

      {/* Fan */}
      <div className="w-full">
        <FanSlider
          value={state.fanSpeed}
          onChange={setFanSpeed}
          disabled={!state.power || syncing}
        />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/5" />

      {/* Status */}
      <StatusPanel state={state} syncing={syncing} error={error} />

      {/* Footer */}
      <p className="text-[10px] text-gray-600 tracking-widest uppercase select-none">
        Xerovolt · Smart Air
      </p>
    </div>
  );
}