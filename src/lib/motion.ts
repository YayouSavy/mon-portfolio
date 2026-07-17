import type { Transition } from "framer-motion";

/** Le ressort "punchy" de la DA : overshoot léger, retour rapide. */
export const spring: Transition = { type: "spring", stiffness: 420, damping: 26, mass: 0.9 };

/** Plus rebondissant : entrée de la photo, post-its, bulle. */
export const springBouncy: Transition = { type: "spring", stiffness: 380, damping: 17 };

/** Sans rebond : hauteur des dossiers (évite tout clipping). */
export const springSmooth: Transition = { type: "spring", stiffness: 300, damping: 34 };

/** Déclenchement whileInView : une seule fois, à 25% de visibilité. */
export const viewport = { once: true, amount: 0.25 } as const;
