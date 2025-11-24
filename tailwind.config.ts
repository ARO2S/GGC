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
        garden: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#faf8f5',
          100: '#f5f1e8',
          200: '#e8dfc9',
          300: '#d9c9a3',
          400: '#c7ae7d',
          500: '#b69560',
          600: '#a07d4d',
          700: '#856642',
          800: '#6e5439',
          900: '#5c4630',
          950: '#312418',
        },
      },
    },
  },
  plugins: [],
};
export default config;

