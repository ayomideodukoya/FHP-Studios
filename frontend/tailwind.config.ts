import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fhp: {
          blue: {
            DEFAULT: '#293897',
            light: '#7985D1',
            dark: '#1e2a73'
          },
          yellow: {
            DEFAULT: '#F8DE7D',
            light: '#fcf3cf',
            dark: '#d6b84f'
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-clash-display)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
