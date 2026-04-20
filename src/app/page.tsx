import { DeviceCard } from "./components/DeviceCard";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-12 overflow-hidden bg-[#050505]">
      
      {/* 1. Enhanced High-End Background */}
      {/* Subtle Grid - tighter for larger screens */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.8,
        }}
      />

      {/* Layered Ambient Glows for Depth */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* 2. Responsive Container */}
      {/* On iPad, we remove the "floating card" feel and expand.
          We use a max-width that fits iPad Pro 11" and 12.9" perfectly.
      */}
      <div className="relative z-10 w-full max-w-6xl h-full max-h-[800px] flex items-center justify-center">
        <div className="w-full h-full animate-in fade-in zoom-in-95 duration-1000">
          <DeviceCard />
        </div>
      </div>

      {/* 3. Refined Footer Branding */}
      <footer className="fixed bottom-8 w-full px-12 flex justify-between items-end pointer-events-none z-20">
        <div className="flex flex-col gap-1">
          <p className="text-[9px] tracking-[0.3em] text-neutral-700 uppercase font-bold">
            System Status
          </p>
          <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
            Connected · Secure Node
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-[9px] tracking-[0.3em] text-neutral-700 uppercase font-bold text-right">
            Xerovolt Control
          </p>
          <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
            v1.0.4-PRO
          </p>
        </div>
      </footer>

      {/* Vignette Overlay for focus */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"
      />
    </main>
  );
}