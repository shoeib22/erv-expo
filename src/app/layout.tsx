import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xerovolt ERV",
  description: "Advanced Energy Recovery Controller",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 3,
  maximumScale: 3,
  userScalable: false,
  themeColor: "#050505", // Matches the new dark background
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Added Playfair Display for that "Old Money" serif touch in headings if needed */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-[#050505] text-neutral-200 min-h-screen selection:bg-blue-500/30 overflow-hidden"
        suppressHydrationWarning
      >
        {/* Subtle noise texture overlay for a premium physical feel */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }}
        />
        
        {children}
      </body>
    </html>
  );
}