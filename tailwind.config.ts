const { fontFamily } = require("tailwindcss/defaultTheme")
import type { Config } from "tailwindcss"

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
        border: "#aaaaaa",
        input: "#000",
        ring: "#fff",
        background: "#F3F4F6",
        foreground: "#212636",
        primary: {
          DEFAULT: "#635BFF",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#2D3338",
          foreground: "#fff",
          hover :"#E4E9F4"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#fff",
          foreground: "#aaa",
        },
        accent: {
          DEFAULT: "#121621",
          foreground: "#15B79F",
        },
        popover: {
          DEFAULT: "#fff",
          foreground: "#111",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#232323",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config