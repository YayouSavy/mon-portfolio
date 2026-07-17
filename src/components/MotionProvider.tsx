"use client";
// → Type : Client Component
// → Raison : MotionConfig doit vivre côté client
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" : si l'OS demande "réduire les animations",
 * Framer Motion neutralise tous les transforms automatiquement.
 * Indispensable pour une référente accessibilité.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
