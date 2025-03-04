
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Absurd colors
        "absurd-dark": "#0a0a0a",
        "neon-blue": "#00aaff",
        "neon-pink": "#ff00aa",
        "neon-green": "#00ff88",
        "neon-purple": "#aa00ff",
        "neon-yellow": "#ffee00",
        "neon-orange": "#ff6600",
        "neon-red": "#ff0055",
        // Holographic colors
        "holo-blue": "#33C3F0",
        "holo-cyan": "#00FFFF",
        "holo-magenta": "#FF00FF",
        "holo-silver": "#F6F6F7",
        "holo-shimmer": "#F1F0FB",
        "holo-opal": "#9F9EA1",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "hologram-flicker": {
          "0%, 100%": { opacity: "1" },
          "33%": { opacity: "0.7" },
          "66%": { opacity: "0.9" },
        },
        "prism-rotate": {
          "0%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(180deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 6s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "hologram-flicker": "hologram-flicker 3s infinite",
        "prism-rotate": "prism-rotate 10s linear infinite",
      },
      backgroundImage: {
        "hologram-grid": "linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "hologram-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,255,255,0.1) 25%, rgba(255,0,255,0.1) 50%, rgba(0,255,255,0.1) 75%, rgba(255,255,255,0.05) 100%)",
      },
      backdropFilter: {
        "hologram": "blur(10px) saturate(180%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
