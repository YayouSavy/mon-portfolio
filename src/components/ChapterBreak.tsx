"use client";
// → Type : Client Component
// → Raison : whileInView (cohérent avec le reste du site)
import { motion } from "framer-motion";
import { spring, viewport } from "../lib/motion";

/**
 * Rupture de rythme full-bleed entre About et Folders : la seule section claire
 * du site, façon bandeau d'onglet. Annonce honnêtement ce que les dossiers livrent.
 */
export default function ChapterBreak() {
  return (
    <section className="light-surface grain-strong relative overflow-hidden bg-lime py-[clamp(56px,9vh,120px)] text-ink">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={spring}
        className="relative z-[1] mx-auto w-[min(1240px,100%-48px)]"
      >
        <p className="max-w-[20ch] font-display text-[clamp(32px,5vw,64px)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
          Chaque dossier ci-dessous couvre la recherche, les arbitrages et les résultats — pas un teaser.
        </p>
      </motion.div>
    </section>
  );
}
