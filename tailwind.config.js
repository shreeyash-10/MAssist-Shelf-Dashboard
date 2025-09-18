import plugin from "tailwindcss/plugin";

const brandColor = (token) => `var(--color-${token})`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: brandColor("brand-50"),
          100: brandColor("brand-100"),
          200: brandColor("brand-200"),
          300: brandColor("brand-300"),
          400: brandColor("brand-400"),
          500: brandColor("brand-500"),
          600: brandColor("brand-600"),
          700: brandColor("brand-700"),
          800: brandColor("brand-800"),
          900: brandColor("brand-900"),
          950: brandColor("brand-950"),
          mint: brandColor("brand-mint"),
          jade: brandColor("brand-jade"),
          aqua: brandColor("brand-aqua"),
        },
        surface: {
          ink: brandColor("ink"),
          coal: brandColor("coal"),
          slate: brandColor("slate"),
          fog: brandColor("fog"),
          mist: brandColor("mist"),
          snow: brandColor("snow"),
        },
      },
      fontFamily: {
        display: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
        body: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      boxShadow: {
        glass: "var(--shadow-glass)",
      },
      backdropBlur: {
        glass: "var(--backdrop-glass)",
      },
      backgroundImage: {
        "brand-surface": "var(--grad-surface)",
        "brand-stripe": "var(--grad-stripe)",
        "brand-glow": "var(--grad-glow)",
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.4s ease forwards",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities(
        {
          ".brand-gradient": {
            backgroundImage: "var(--grad-surface)",
          },
          ".section-pad": {
            paddingBlock: "clamp(56px, 9vw, 112px)",
          },
          ".content-auto": {
            contentVisibility: "auto",
          },
          ".focus-ring": {
            outline: "2px solid var(--color-brand-mint)",
            outlineOffset: "2px",
          },
          ".grid-auto-fit": {
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          },
        },
        { variants: ["responsive"] }
      );

      addComponents({
        ".glass": {
          backgroundColor: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-glass)",
          backdropFilter: "var(--backdrop-glass)",
        },
        ".pill": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          paddingInline: "14px",
          paddingBlock: "8px",
          borderRadius: "9999px",
          backgroundColor: "var(--pill-bg)",
          border: "1px solid var(--pill-border)",
          color: "var(--pill-text)",
          transition: "background-color 250ms ease, color 250ms ease, border-color 250ms ease",
        },
      });
    }),
  ],
};
