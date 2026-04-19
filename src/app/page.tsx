import { DeviceCard } from "./components/DeviceCard";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#0a0a0a]">

      {/* Background texture — subtle dot grid (Darkened) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #262626 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />

      {/* Soft radial ambient — Deep Blue Glow */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Bottom vignette — Darker fade */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, transparent 100%)",
        }}
      />

      {/* Device card */}
      <div className="relative z-10 w-full flex justify-center">
        <DeviceCard />
      </div>

      {/* Version watermark — Muted for dark mode */}
      <p className="fixed bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-neutral-600 uppercase font-medium select-none z-10">
        Expo Demo · v1.0
      </p>
    </main>
  );
}