import { DeviceCard } from "./components/DeviceCard";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050505]">
      
      {/* 1. Background System Architecture */}
      {/* Subtle Grid - Fixed to fill screen */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #121212 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Deep Ambient Immersion */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.02) 0%, transparent 80%)
          `,
        }}
      />

      {/* 2. Full-Screen Dashboard View */}
      {/* Removed all max-width/height and padding to allow DeviceCard 
          to occupy every pixel of the iPad screen.
      */}
      <div className="relative z-10 w-full h-full">
        <div className="w-full h-full animate-in fade-in duration-700">
          <DeviceCard />
        </div>
      </div>

      {/* 3. System Overlay Branding */}
      {/* Pinned to the very bottom, appearing like a hardware status bar */}
      <footer className="fixed bottom-6 w-full px-8 flex justify-between items-end pointer-events-none z-20 opacity-60">
        <div className="flex flex-col gap-0.5">
          <p className="text-[8px] tracking-[0.4em] text-neutral-600 uppercase font-black">
            System Interface
          </p>
          <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest">
            Node Connected
          </p>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <p className="text-[8px] tracking-[0.4em] text-neutral-600 uppercase font-black text-right">
            Xerovolt Engineering
          </p>
          <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest">
            v1.0.4-PRO
          </p>
        </div>
      </footer>

      {/* Global Vignette - binds the three columns together */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
      />
    </main>
  );
}