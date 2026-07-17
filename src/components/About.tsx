"use client";
// → Type : Client Component
// → Raison : whileInView (révélations) + hover fiche
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle, { Accent } from "./SectionTitle";
import Tape from "./props/Tape";
import { ID_ROWS, STEPS } from "../lib/data";
import { spring, viewport } from "../lib/motion";

export default function About() {
  return (
    <section id="about" aria-label="À propos" className="py-[clamp(72px,10vh,140px)]">
      <div className="mx-auto grid w-[min(1240px,100%-48px)] items-start gap-[clamp(44px,5.5vw,88px)] lg:grid-cols-[1fr_1.05fr]">
        {/* ---- Texte + process ---- */}
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring}>
          <SectionTitle>
            About <Accent>me</Accent>
          </SectionTitle>

          <p className="mb-6 mt-7 max-w-[52ch] text-[19px] leading-relaxed">
            Depuis plus de 2 ans chez Thales, je couvre tout le cycle produit au sein
            d&apos;équipes agiles : recherche, cadrage, design system, prototypage codé et
            handoff développeurs. Je suis également{" "}
            <strong className="font-semibold text-white">référente accessibilité</strong> sur
            les interfaces livrées.
          </p>

          <span className="inline-flex -rotate-2 items-center gap-2.5 rounded-full border-2 border-noir bg-lime px-[22px] py-3 font-accent text-[11px] uppercase tracking-[0.08em] text-ink transition-transform duration-300 ease-spring hover:scale-[1.04] hover:!rotate-0">
            WCAG 2.2 · RGAA
          </span>

          <div className="mt-10 border-t border-white/15">
            {STEPS.map((s) => (
              <div
                key={s.title}
                className="group border-b border-white/15 px-2 py-6 transition-all duration-300 ease-spring hover:bg-white/[0.03] hover:pl-6"
              >
                <h3 className="mb-1.5 text-[23px] font-bold tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-lime">
                  {s.title}
                </h3>
                <p className="max-w-[56ch] text-[15.5px] text-mist">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---- La fiche : photo encadrée + scotch-étiquette ---- */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...spring, delay: 0.14 }}
          className="light-surface grain-multiply relative rotate-[1.4deg] rounded-folder bg-paper p-9 pb-8 text-ink shadow-paper transition-all duration-500 ease-spring hover:shadow-paper-lift hover:!rotate-0"
        >
          <div className="relative z-[1] mb-6 flex flex-col gap-7 sm:flex-row sm:items-start">
            <div className="relative w-[172px] shrink-0 -rotate-[2.5deg]">
              <div className="relative aspect-[1/1.05] overflow-hidden rounded-2xl border-[3px] border-noir bg-lime">
                <Image src="/portrait.png" alt="" fill sizes="172px" className="object-contain object-bottom" />
              </div>
              <Tape label="( about me )" className="-bottom-3 -left-4 -rotate-[8deg]" />
            </div>
            <div>
              <p className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.01em]">Illiana Savy</p>
              <p className="mt-2.5 font-accent text-[11px] uppercase tracking-[0.08em] text-violet">Product Designer</p>
            </div>
          </div>

          <dl className="relative z-[1]">
            {ID_ROWS.map((row) => (
              <div key={row.dt} className="grid gap-1.5 border-t border-noir/15 py-[15px] text-[15px] leading-relaxed md:grid-cols-[108px_1fr] md:gap-[18px]">
                <dt className="pt-1 font-accent text-[10px] uppercase tracking-[0.08em] opacity-75">{row.dt}</dt>
                <dd>
                  {row.lines.map((l) => (
                    <span key={l.text} className={`block ${l.muted ? "text-[13.5px] opacity-65" : ""}`}>
                      {l.text}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
