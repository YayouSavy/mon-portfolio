"use client";
// → Type : Client Component
// → Raison : whileInView (pop des post-its)
import { motion } from "framer-motion";
import Tape from "./props/Tape";
import { STATS, type Accent } from "../lib/data";
import { springBouncy, viewport } from "../lib/motion";

const NOTE: Record<Accent, string> = {
  lime: "bg-lime text-ink border-noir",
  paper: "bg-paper text-ink border-noir",
  violet: "bg-violet text-white border-white",
};

export default function StatsNotes() {
  return (
    <section aria-label="Résultats clés" className="py-[clamp(64px,9vh,110px)]">
      <div className="mx-auto grid w-[min(1240px,100%-48px)] grid-cols-2 gap-5 md:grid-cols-4 md:gap-[clamp(20px,2.6vw,34px)]">
        {STATS.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 34, scale: 0.82 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewport}
            transition={{ ...springBouncy, delay: i * 0.09 }}
            className={`relative flex min-h-[170px] flex-col justify-end gap-2.5 rounded-folder border-2 p-6 shadow-paper transition-all duration-300 ease-spring hover:-translate-y-2 hover:!rotate-0 hover:shadow-paper-lift md:aspect-square md:p-[30px] ${s.rot} ${NOTE[s.color]} ${s.color === "violet" ? "grain-overlay" : "grain-multiply"}`}
          >
            <Tape color={s.tape} className="-top-[13px] left-1/2 -ml-12 -rotate-3" />
            <p className="font-display text-[clamp(40px,3.8vw,58px)] font-extrabold leading-none tracking-[-0.02em]">
              {s.num}
            </p>
            <p className="text-[14.5px] font-medium leading-snug opacity-90">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
