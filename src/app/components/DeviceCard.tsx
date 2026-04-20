"use client";

import clsx from "clsx";
import { PowerButton } from "./PowerButton";
import { ModeSelector } from "./ModeSelector";
import { FanSlider } from "./FanSlider";
import { StatusPanel } from "./StatusPanel";
import { useDevice } from "../hooks/useDevice";
import { Lightbulb, ShieldCheck, Wind, Zap } from "lucide-react"; 

function LoadingSkeleton() {
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center gap-6 animate-pulse bg-[#0a0a0a] rounded-[3rem] border border-white/5">
      <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
      <p className="text-xs text-neutral-600 tracking-[0.2em] uppercase">Initializing Core...</p>
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
    toggleLight,
  } = useDevice();

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-[650px]">
      
      {/* LEFT COLUMN: Environment & Analytics (3 Cols) */}
      <div className="md:col-span-3 flex flex-col gap-6">
        <div className="flex-1 bg-[#111111]/80 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-6">Environment</p>
            <div className="space-y-8">
              <div className="group">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Air Quality</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light text-neutral-200 tracking-tighter">24</span>
                  <span className="text-xs text-green-500 font-medium tracking-wide uppercase">Excellent</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Filter Life</p>
                <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-blue-500/50 w-[85%] rounded-full" />
                </div>
                <p className="text-[10px] text-neutral-500 mt-2">85% Remaining</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <StatusPanel state={state} syncing={syncing} error={error} />
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: Primary Control (6 Cols) */}
      <div className={clsx(
        "md:col-span-6 rounded-[3.5rem] border transition-all duration-1000 p-10 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl",
        state.power 
          ? "bg-[#141414] border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.05)]" 
          : "bg-[#0d0d0d] border-white/5"
      )}>
        {/* Dynamic Glow Effect */}
        <div className={clsx(
          "absolute inset-0 pointer-events-none transition-opacity duration-1000",
          state.power ? "opacity-30" : "opacity-0"
        )} style={{ background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%)' }} />

        {/* Branding */}
        <div className="relative z-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] text-neutral-600 uppercase mb-3">Residential Control</p>
          <h1 className="text-4xl font-serif italic text-neutral-100 tracking-tight">
            Xerovolt <span className="font-sans font-light text-blue-500 not-italic ml-1">ERV</span>
          </h1>
        </div>

        {/* The Power Hub */}
        <div className="relative z-10 scale-125 transform transition-transform active:scale-110">
          <PowerButton
            isOn={state.power}
            onClick={togglePower}
            disabled={syncing}
          />
        </div>

        {/* Large Scale Fan Control */}
        <div className="relative z-10 w-full max-w-md">
          <div className="flex justify-between items-center mb-4 px-2">
             <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">Flow Velocity</p>
             <Wind size={14} className={state.power ? "text-blue-400 animate-pulse" : "text-neutral-700"} />
          </div>
          <FanSlider
            value={state.fanSpeed as 1 | 2 | 3} 
            onChange={setFanSpeed}
            disabled={!state.power || syncing}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Modes & Systems (3 Cols) */}
      <div className="md:col-span-3 flex flex-col gap-6">
        {/* Mode Grid */}
        <div className="flex-1 bg-[#111111]/80 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-6">System Mode</p>
          <ModeSelector
            value={state.mode}
            onChange={setMode}
            disabled={!state.power || syncing}
          />
        </div>

        {/* Accessory Toggle */}
        <div className="bg-[#111111]/80 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-6 shadow-2xl">
           <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-4 px-2">Auxiliary</p>
           <button
            onClick={toggleLight}
            disabled={!state.power || syncing}
            className={clsx(
              "flex items-center justify-between w-full p-5 rounded-3xl border transition-all duration-500 group",
              state.light 
                ? "bg-yellow-400/5 border-yellow-400/20 text-yellow-200 shadow-[0_0_30px_rgba(234,179,8,0.05)]" 
                : "bg-white/[0.02] border-white/5 text-neutral-500 hover:bg-white/[0.05]"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={clsx(
                "p-2.5 rounded-xl transition-colors",
                state.light ? "bg-yellow-400/10" : "bg-neutral-800"
              )}>
                <Lightbulb size={20} className={state.light ? "text-yellow-400" : "text-neutral-600"} />
              </div>
              <div className="text-left">
                <span className="block text-sm font-medium">Internal Light</span>
                <span className="text-[9px] text-neutral-600 uppercase tracking-tighter">Cabinet LED</span>
              </div>
            </div>
            <div className={clsx(
              "w-1.5 h-1.5 rounded-full transition-all duration-500",
              state.light ? "bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,1)] scale-125" : "bg-neutral-800"
            )} />
          </button>
        </div>
      </div>
    </div>
  );
}