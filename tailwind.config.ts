import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        calm: {
          50: "#f6faf8",
          100: "#edf6f2",
          200: "#d5e8df",
          500: "#4d8f76",
          600: "#3f7762",
          700: "#2f5d4d"
        }
      }
    }
  },
  plugins: []
};

export default config;
