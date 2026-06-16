import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07070B",
        night: "#0B0A12",
        brand: {
          orange: "#F95710",
          yellow: "#FFF166",
          green: "#39FF55",
          cyan: "#08FFFF",
          blue: "#0D0DFF",
          purple: "#8F00FF",
          pink: "#FF64C4",
          red: "#CF1020",
          gray: "#919D9D",
          light: "#BFCED6",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        peyda: [
          "Peyda",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        poppins: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 80px rgba(143, 0, 255, 0.30)",
        "pink-glow": "0 0 72px rgba(255, 100, 196, 0.18)",
        "soft-purple": "0 24px 80px rgba(143, 0, 255, 0.22)",
      },
      backgroundImage: {
        "radial-purple":
          "radial-gradient(circle at 50% 0%, rgba(143, 0, 255, 0.34), transparent 42%)",
      },
    },
  },
  plugins: [],
};

export default config;
