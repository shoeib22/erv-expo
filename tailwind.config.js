/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        erv: {
          bg: "#F7F7F5",
          card: "#FFFFFF",
          blue: "#3B82F6",
          "blue-soft": "#DBEAFE",
          "blue-glow": "rgba(59, 130, 246, 0.3)",
          muted: "#9CA3AF",
          border: "#E5E5E3",
          text: "#1A1A1A",
          subtext: "#6B7280",
        },
      },
      animation: {
        breathe: "breathe 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { boxShadow: "0 0 20px 4px rgba(59, 130, 246, 0.2)" },
          "50%": { boxShadow: "0 0 40px 12px rgba(59, 130, 246, 0.45)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
