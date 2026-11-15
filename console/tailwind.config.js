/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
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
        border: "hsl(var(--border, 145 25% 85%))",
        input: "hsl(var(--input, 145 25% 90%))",
        ring: "hsl(var(--ring, 160 84% 39%))",
        background: "hsl(var(--background, 45 29% 97%))",
        foreground: "hsl(var(--foreground, 150 35% 12%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 153 60% 19%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
          emerald: "#10B981",
          forest: "#1B4332",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 135 25% 94%))",
          foreground: "hsl(var(--secondary-foreground, 153 60% 19%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 45 20% 94%))",
          foreground: "hsl(var(--muted-foreground, 145 15% 35%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 84 81% 44%))",
          foreground: "hsl(var(--accent-foreground, 153 60% 19%))",
          lime: "#84CC16",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 150 35% 12%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 150 35% 12%))",
        },
        nature: {
          bg: "#FAF9F5",
          cream: "#F5EFEB",
          botanical: "#EDF4EE",
          forest: {
            DEFAULT: "#1B4332",
            dark: "#0F291E",
            light: "#2D6A4F",
            subtle: "#D8F3DC",
          },
          emerald: {
            DEFAULT: "#10B981",
            dark: "#059669",
            light: "#34D399",
            subtle: "#D1FAE5",
          },
          lime: {
            DEFAULT: "#84CC16",
            dark: "#65A30D",
            light: "#A3E635",
            subtle: "#ECFCCB",
          },
          amber: {
            DEFAULT: "#F59E0B",
            subtle: "#FEF3C7",
          },
          sky: {
            DEFAULT: "#0284C7",
            subtle: "#E0F2FE",
          },
          terra: {
            DEFAULT: "#C26747",
            subtle: "#FCECE6",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius, 1rem)",
        md: "calc(var(--radius, 1rem) - 2px)",
        sm: "calc(var(--radius, 1rem) - 4px)",
        nature: "1rem",
        "nature-lg": "1.5rem",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(27, 67, 50, 0.05)",
        card: "0 12px 32px -10px rgba(27, 67, 50, 0.06), 0 2px 6px rgba(27, 67, 50, 0.02)",
        "card-hover":
          "0 20px 40px -12px rgba(27, 67, 50, 0.12), 0 4px 12px rgba(27, 67, 50, 0.04)",
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
    },
  },
  plugins: [],
};
