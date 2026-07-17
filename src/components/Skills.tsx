"use client";
// → Type : Client Component
// → Raison : whileInView (pop des fiches)
import { motion } from "framer-motion";
import SectionTitle, { Accent as AccentWord } from "./SectionTitle";
import Tape from "./props/Tape";
import { SKILL_CARDS, type Accent } from "../lib/data";
import { spring, springBouncy, viewport } from "../lib/motion";

const CARD: Record<Accent, string> = {
  paper: "bg-paper text-ink border-noir",
  lime: "bg-lime text-ink border-noir",
  violet: "bg-violet text-white border-white",
  mist: "bg-mist text-ink border-noir/30",
};

export default function Skills() {
  return (
    <section id="competences" aria-label="Compétences" className="border-t border-white/10 py-[clamp(72px,10vh,140px)]">
      <div className="mx-auto w-[min(1240px,100%-48px)]">
        <motion.header
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={spring}
          className="mb-14"
        >
          <SectionTitle>
            Compé<AccentWord>tences</AccentWord>
          </SectionTitle>
        </motion.header>

        <div className="mx-auto grid max-w-[640px] items-start gap-[clamp(22px,2.8vw,36px)] lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {SKILL_CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 34, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewport}
              transition={{ ...springBouncy, delay: i * 0.11 }}
              className={`relative rounded-folder border-2 px-[30px] pb-[34px] pt-11 shadow-paper transition-all duration-300 ease-spring hover:-translate-y-2 hover:!rotate-0 hover:shadow-paper-lift ${c.rot} ${CARD[c.color]} ${c.color === "violet" ? "grain-overlay" : "grain-multiply"} ${c.color !== "violet" ? "light-surface" : ""}`}
            >
              <Tape color={c.tape} className="-top-[13px] left-[30px] -rotate-[4deg]" />
              <p className="font-accent text-[10px] uppercase tracking-[0.1em] opacity-70">{c.kicker}</p>
              <h3 className="mb-[22px] mt-2 text-[27px] font-extrabold tracking-[-0.01em]">{c.title}</h3>
              <ul className="relative z-[1] flex flex-wrap gap-2.5">
                {c.pills.map((pill) => (
                  <li
                    key={pill}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-transform duration-300 ease-spring hover:-translate-y-0.5 hover:-rotate-1 ${c.color === "violet" ? "border-white" : "border-noir"}`}
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
