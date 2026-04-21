"use client";

import { useRef } from "react";
import clsx from "clsx";
import { PowerButton } from "./PowerButton";
import { ModeSelector } from "./ModeSelector";
import { FanSlider } from "./FanSlider";
import { StatusPanel } from "./StatusPanel";
import { AnionButton } from "./AnionButton";
import { PowerfulButton } from "./PowerfulButton";
import { FreeCoolingButton } from "./FreeCoolingButton";
import { Co2Panel } from "./Co2Panel";
import { CountdownSelector } from "./CountdownSelector";
import { useDevice } from "../hooks/useDevice";
import { Lightbulb, Wind } from "lucide-react";

export function DeviceCard() {
  const {
    state,
    loading,
    error,
    syncing,
    togglePower,
    setMode,
    setFanSpeed,
    toggleLight,
    toggleAnion,
    togglePowerful,
    toggleFreeCooling,
    toggleCo2Switch,
    setCo2Threshold,
    setCountdown,
  } = useDevice();

  const co2Ref = useRef<HTMLDivElement>(null);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 bg-[#050505] text-white">

      {/* LEFT COLUMN — SYMMETRICAL STACK */}
      <div className="md:col-span-3 flex flex-col gap-4 overflow-hidden">
        
        {/* 1. TOP: CO2 Monitoring */}
        <div 
          ref={co2Ref}
          className="bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 shadow-xl"
        >
          <Co2Panel
            co2Value={state.co2Value}
            co2Threshold={state.co2Threshold}
            co2Switch={state.co2Switch}
            onToggleSwitch={toggleCo2Switch}
            onSetThreshold={setCo2Threshold}
            disabled={syncing}
          />
        </div>

        {/* 2. CENTER: Countdown Selector (The System Card) */}
        <div className="flex-1 bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 shadow-xl flex flex-col justify-center transition-all duration-500 hover:border-purple-500/20">
          <CountdownSelector
            value={state.countdownSet}
            minutesLeft={state.countdownLeft}
            onChange={setCountdown}
            disabled={!state.power || syncing}
          />
        </div>

        {/* 3. BOTTOM: System Status */}
        <div className="bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 shadow-xl">
          <StatusPanel state={state} syncing={syncing} error={error} />
        </div>

      </div>

      {/* CENTER COLUMN — POWER & FLOW */}
      <div className={clsx(
        "md:col-span-6 rounded-[3.5rem] border transition-all duration-1000 p-12 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl",
        state.power
          ? "bg-[#0d0d0d] border-white/10 shadow-[0_0_150px_rgba(37,99,235,0.08)]"
          : "bg-[#080808] border-white/5"
      )}>
        <div className={clsx(
          "absolute inset-0 pointer-events-none transition-opacity duration-1000",
          state.power ? "opacity-40" : "opacity-0"
        )} style={{ background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, transparent 75%)' }} />
        
        <div className="relative z-10 text-center">
          <p className="text-[11px] font-bold tracking-[0.5em] text-neutral-600 uppercase mb-4">Command Center</p>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cube-8c773.firebasestorage.app/o/Untitled%20design%20(6).png?alt=media&token=63348b0c-c48f-4d98-92ab-f1700dbe9b6a"
            alt="Xerovolt"
            className="h-10 w-auto mx-auto object-contain"
          />
        </div>

        <div className="relative z-10 scale-[1.4] transform transition-all duration-700">
          <PowerButton isOn={state.power} onClick={togglePower} disabled={syncing} />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="flex justify-between items-center mb-6 px-4">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold tracking-[0.3em] text-neutral-500 uppercase">Flow Dynamics</p>
              <p className="text-[10px] text-blue-500/60 font-medium uppercase tracking-widest">
                {state.power ? 'Active Ventilation' : 'Bypass Mode'}
              </p>
            </div>
            <Wind size={20} className={state.power ? "text-blue-500 animate-pulse" : "text-neutral-800"} />
          </div>
          <FanSlider
            value={state.fanSpeed as 1 | 2 | 3}
            onChange={setFanSpeed}
            disabled={!state.power || syncing}
            deviceState={state}
          />
        </div>
      </div>

      {/* RIGHT COLUMN — MODES & AUXILIARY */}
      <div className="md:col-span-3 flex flex-col gap-4">
        <div className="flex-1 bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-8">Cycle Selection</p>
          <ModeSelector
            value={state.mode}
            onChange={setMode}
            disabled={!state.power || syncing}
          />
        </div>

        <div className="bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-6 px-2">
            Auxiliary Systems
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={toggleLight}
              disabled={!state.power || syncing}
              className={clsx(
                "flex items-center justify-between w-full p-5 rounded-[2rem] border transition-all duration-700",
                state.light
                  ? "bg-yellow-500/5 border-yellow-500/20 text-yellow-200"
                  : "bg-white/[0.01] border-white/5 text-neutral-600"
              )}
            >
              <div className="flex items-center gap-4">
                <Lightbulb size={20} className={state.light ? "text-yellow-500" : "text-neutral-700"} />
                <span className="text-sm font-medium">Internal Light</span>
              </div>
              <div className={clsx("w-1.5 h-1.5 rounded-full", state.light ? "bg-yellow-500 animate-pulse" : "bg-neutral-800")} />
            </button>

            <AnionButton isOn={state.anion} onClick={toggleAnion} disabled={!state.power || syncing} />
            <PowerfulButton isOn={state.powerful} onClick={togglePowerful} disabled={!state.power || syncing} />
            <FreeCoolingButton isOn={state.freeCooling} onClick={toggleFreeCooling} disabled={!state.power || syncing} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-[#050505]">
      <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
      <p className="text-[10px] text-neutral-600 tracking-[0.3em] uppercase font-bold">System Booting...</p>
    </div>
  );
}