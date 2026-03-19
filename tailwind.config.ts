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
        primary: "#00A63E",
        secondary: "#042A8F",
        background: "#FFFFFF",
        foreground: "#000000",
        muted: "#F8FAFC",
        mutedForeground: "#042A8F",
        border: "#D1D5DB",
        ring: "#042A8F",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
