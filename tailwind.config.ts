// ============================================================
// ⚠️ Tailwind v3 UNIQUEMENT.
// En v4 (create-next-app@latest), ce fichier est ignoré : les
// tokens vivent dans le bloc @theme de globals.css et tu peux
// supprimer ce fichier. Garde-le seulement si ton globals.css
// utilise les directives "@tailwind base/components/utilities".
// ============================================================
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#131313",
        ink: "#30380D",
        lime: "#DDFA6C",
        violet: "#642AEE",
        paper: "#FBFBFB",
        mist: "#EFEFEF",
      },
      borderRadius: {
        folder: "24px", // le radius signature de la DA
      },
      boxShadow: {
        paper: "0 2px 0 rgba(0,0,0,0.45), 0 16px 28px -8px rgba(0,0,0,0.55)",
        "paper-lift": "0 4px 0 rgba(0,0,0,0.4), 0 28px 44px -10px rgba(0,0,0,0.6)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)", // punchy, léger overshoot
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        accent: ["var(--font-krona)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
