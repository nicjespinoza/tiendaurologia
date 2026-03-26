import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/(public)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/(admin)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A5C82",
        "primary-dark": "#073F5A",
        "primary-light": "#6DB8D4",
        secondary: "#E8712E",
        "secondary-dark": "#C75F22",
        accent: "#78B943",
        background: "#FFFFFF",
        foreground: "#1A2332",
        muted: "#F0F6FA",
        "muted-dark": "#D8E8F0",
        mutedForeground: "#5A6B7D",
        border: "#D1DDE6",
        ring: "#0A5C82",
        "navy": "#0B2545",
        "teal": "#1B8AAF",
        "light-blue": "#E1F0F8",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "slide-in-left": "slideInLeft 0.6s ease-out both",
        "slide-in-right": "slideInRight 0.6s ease-out both",
        "pulse-slow": "pulseSlow 1.4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
