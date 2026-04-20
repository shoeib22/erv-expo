"use client";

import clsx from "clsx";
import { PowerButton } from "./PowerButton";
import { ModeSelector } from "./ModeSelector";
import { FanSlider } from "./FanSlider";
import { StatusPanel } from "./StatusPanel";
import { useDevice } from "../hooks/useDevice";
import { Lightbulb, Wind } from "lucide-react"; 

function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-[#050505]">
      <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
      <p className="text-[10px] text-neutral-600 tracking-[0.3em] uppercase">System Booting...</p>
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
    /* We changed min-h to screen and p-6 to fill the iPad display edge-to-edge */
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 bg-transparent">
      
      {/* LEFT COLUMN: Environment & Analytics (3 Cols) */}
      <div className="md:col-span-3 flex flex-col gap-4">
        <div className="flex-1 bg-[#111111]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between shadow-2xl">
          <div className="space-y-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-8">Atmosphere</p>
              <div className="group">
                <p className="text-[11px] text-neutral-600 uppercase tracking-widest mb-2 font-medium">Indoor Air Quality</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-7xl font-light text-neutral-200 tracking-tighter">24</span>
                  <span className="text-sm text-green-500 font-bold tracking-widest uppercase">PPM</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-neutral-600 uppercase tracking-widest mb-4 font-medium">Core Filter Integrity</p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600/60 w-[85%] rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Efficiency</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">85%</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5">
            <StatusPanel state={state} syncing={syncing} error={error} />
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: Primary Control (6 Cols) */}
      <div className={clsx(
        "md:col-span-6 rounded-[3.5rem] border transition-all duration-1000 p-12 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl",
        state.power 
          ? "bg-[#0d0d0d] border-white/10 shadow-[0_0_150px_rgba(37,99,235,0.08)]" 
          : "bg-[#080808] border-white/5"
      )}>
        {/* Expanded Dynamic Glow */}
        <div className={clsx(
          "absolute inset-0 pointer-events-none transition-opacity duration-1000",
          state.power ? "opacity-40" : "opacity-0"
        )} style={{ background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, transparent 75%)' }} />

        {/* Scaled Branding */}
        <div className="relative z-10 text-center">
          <p className="text-[11px] font-bold tracking-[0.5em] text-neutral-600 uppercase mb-4">Command Center</p>
          <h1 className="text-5xl font-serif italic text-neutral-100 tracking-tight">
            Xerovolt <span className="font-sans font-light text-blue-600 not-italic ml-2">ERV</span>
          </h1>
        </div>

        {/* Centered Hub - Scaled for large screen */}
        <div className="relative z-10 scale-[1.4] transform transition-all duration-700">
          <PowerButton
            isOn={state.power}
            onClick={togglePower}
            disabled={syncing}
          />
        </div>

        {/* Large Scale Fan Control */}
        <div className="relative z-10 w-full max-w-lg mb-4">
          <div className="flex justify-between items-center mb-6 px-4">
             <div className="flex flex-col gap-1">
                <p className="text-[11px] font-bold tracking-[0.3em] text-neutral-500 uppercase">Flow Dynamics</p>
                <p className="text-[10px] text-blue-500/60 font-medium uppercase tracking-widest">{state.power ? 'Active Ventilation' : 'Bypass Mode'}</p>
             </div>
             <Wind size={20} className={state.power ? "text-blue-500 animate-pulse" : "text-neutral-800"} />
          </div>
          <FanSlider
            value={state.fanSpeed as 1 | 2 | 3} 
            onChange={setFanSpeed}
            disabled={!state.power || syncing}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Modes & Systems (3 Cols) */}
      <div className="md:col-span-3 flex flex-col gap-4">
        {/* Mode Grid - Expanded padding */}
        <div className="flex-1 bg-[#111111]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl">
          <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-8">Cycle Selection</p>
          <ModeSelector
            value={state.mode}
            onChange={setMode}
            disabled={!state.power || syncing}
          />
        </div>

        {/* Accessory Toggle - Taller touch target */}
        <div className="bg-[#111111]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
           <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-6 px-2">Auxiliary Systems</p>
           <button
            onClick={toggleLight}
            disabled={!state.power || syncing}
            className={clsx(
              "flex items-center justify-between w-full p-6 rounded-[2rem] border transition-all duration-700 group",
              state.light 
                ? "bg-yellow-500/5 border-yellow-500/20 text-yellow-200 shadow-[0_0_40px_rgba(234,179,8,0.08)]" 
                : "bg-white/[0.01] border-white/5 text-neutral-600 hover:bg-white/[0.03]"
            )}
          >
            <div className="flex items-center gap-5">
              <div className={clsx(
                "p-3.5 rounded-2xl transition-all duration-500",
                state.light ? "bg-yellow-500/10 shadow-lg shadow-yellow-500/5" : "bg-neutral-900"
              )}>
                <Lightbulb size={24} className={state.light ? "text-yellow-500" : "text-neutral-700"} />
              </div>
              <div className="text-left">
                <span className={clsx(
                  "block text-base font-medium tracking-tight transition-colors duration-500",
                  state.light ? "text-neutral-100" : "text-neutral-500"
                )}>Internal Light</span>
                <span className="text-[9px] text-neutral-700 font-bold uppercase tracking-[0.2em]">Array Status: {state.light ? 'On' : 'Off'}</span>
              </div>
            </div>
            <div className={clsx(
              "w-2 h-2 rounded-full transition-all duration-700",
              state.light ? "bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,1)] scale-125" : "bg-neutral-800"
            )} />
          </button>
        </div>
      </div>
    </div>
  );
}