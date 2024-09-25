import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Using the CSS variable
        foreground: "rgb(from var(--foreground) r g b / <alpha-value>)",
        background: "rgb(from var(--background) r g b / <alpha-value>)",
        primary: "rgb(from var(--primary) r g b / <alpha-value>)",
        secondary: "rgb(from var(--secondary) r g b / <alpha-value>)",
        accent: "rgb(from var(--accent) r g b / <alpha-value>)",
      },
      fontFamily: {
        "sf-pro": ['"SF Pro Display"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
