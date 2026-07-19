"use client";
// → Type : Client Component
// → Raison : whileInView + whileHover sur les pastilles
import { motion } from "framer-motion";
import Tape from "./props/Tape";
import { PERSONAL_TAGS, type Accent } from "../lib/data";

const PILL_STYLE: Record<Accent, string> = {
  paper: "bg-paper text-ink border-noir",
  lime: "bg-lime text-ink border-noir",
  violet: "bg-violet text-white border-white",
  mist: "bg-mist text-ink border-noir/30",
};

/** La touche perso sous la fiche identité : ce qu'il y a à côté du taf. */
export default function PersonalNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.28 }}
      className="light-surface grain-multiply relative rounded-folder bg-paper p-7 text-ink shadow-paper transition-all duration-500 ease-spring hover:shadow-paper-lift hover:!rotate-0"
    >
      <Tape label="( off duty )" className="-top-[13px] left-8 -rotate-[6deg]" />

      <h4 className="relative z-[1] mb-4 font-accent text-[11px] uppercase tracking-[0.08em] text-violet">
        Hors des écrans
      </h4>

      <ul className="relative z-[1] flex flex-wrap gap-2">
        {PERSONAL_TAGS.map((t, i) => (
          <motion.li
            key={t.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.32 + i * 0.05 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className={`rounded-full border-2 px-4 py-2 text-sm font-medium ${PILL_STYLE[t.color]}`}
          >
            {t.label}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
