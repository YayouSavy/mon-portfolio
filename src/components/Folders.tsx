"use client";
// → Type : Client Component
// → Raison : état ouvert/fermé, hover Framer, animation de hauteur
import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle, { Outline } from "./SectionTitle";
import Trombone from "./props/Trombone";
import { PROJECTS, type Accent, type Project } from "../lib/data";
import { spring, springSmooth, viewport } from "../lib/motion";

/* Règle stroke de la DA + couleurs inversées pour le bouton "+" et le CTA */
const V: Record<
  Accent,
  { body: string; grain: string; stroke: string; inverse: string; light: boolean }
> = {
  lime:   { body: "bg-lime text-ink",     grain: "grain-strong",  stroke: "border-noir",  inverse: "bg-ink text-lime",     light: true },
  violet: { body: "bg-violet text-white", grain: "grain-overlay", stroke: "border-white", inverse: "bg-white text-violet", light: false },
  paper:  { body: "bg-paper text-ink",    grain: "grain-strong",  stroke: "border-noir",  inverse: "bg-ink text-paper",    light: true },
};

function Folder({ p, index, open, onToggle }: { p: Project; index: number; open: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false);
  const expanded = open || hovered; // hover = aperçu, clic = état persistant (tactile + clavier)
  const v = V[p.color];
  const panelId = `panel-${p.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...spring, delay: index * 0.1 }}
      className={`relative -mt-5 first:mt-0 max-md:-mt-3.5 ${expanded ? "z-10" : p.z}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) onToggle();
      }}
    >
      {/* Le soulèvement du dossier, en spring punchy */}
      <motion.div
        animate={{ y: expanded ? -12 : 0 }}
        transition={spring}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div className={`sheet relative ${v.light ? "light-surface" : ""}`} data-lift={expanded}>
          <Trombone className={p.clip} />

          {/* Onglet du dossier, décalé différemment sur chaque dossier */}
          <p
            className={`relative top-0.5 inline-flex items-center gap-2.5 rounded-t-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_70%)] px-[26px] pb-2.5 pt-3 font-accent text-[11px] uppercase tracking-[0.1em] ${v.body} ${p.tabMl}`}
          >
            {p.tab}
          </p>

          {/* Corps : texture renforcée = grain fort + sheen papier + liseré lumineux */}
          <div
            className={`relative overflow-hidden rounded-folder bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(0,0,0,0.05)_58%,rgba(0,0,0,0.09))] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.5)] ${v.body} ${v.grain}`}
          >
            <h3 className="m-0">
              <button
                aria-expanded={open}
                aria-controls={panelId}
                onClick={onToggle}
                className="relative z-[1] flex w-full items-center justify-between gap-6 p-6 text-left md:px-10 md:py-[30px]"
              >
                <span>
                  <span className="block font-display text-[clamp(26px,3.4vw,42px)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em]">
                    {p.title}
                  </span>
                  <span className="mt-2 block text-base font-medium opacity-80">{p.meta}</span>
                </span>
                <span
                  aria-hidden
                  className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full text-2xl font-semibold transition-transform duration-300 ease-spring ${v.inverse} ${expanded ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>

            {/* Le contenu n'existe pas tant qu'on ne va pas voir :
                hauteur animée par Framer (0 → auto), sans rebond pour éviter le clipping */}
            <motion.div
              id={panelId}
              initial={false}
              animate={{ height: expanded ? "auto" : 0 }}
              transition={springSmooth}
              className="relative z-[1] overflow-hidden"
            >
              <motion.div
                animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 18 }}
                transition={{ ...spring, delay: expanded ? 0.05 : 0 }}
                className="px-6 pb-8 md:px-10 md:pb-11"
              >
                <p className="mb-8 max-w-[62ch] text-lg leading-relaxed">{p.desc}</p>

                <div className={`mb-[30px] flex flex-wrap gap-6 border-y-[1.5px] py-[26px] md:gap-10 ${v.stroke}`}>
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-display text-[38px] font-extrabold leading-none tracking-[-0.02em]">{m.num}</p>
                      <p className="mt-1.5 max-w-[20ch] text-sm font-medium opacity-80">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div className="flex flex-wrap gap-2.5">
                    {p.chips.map((c) => (
                      <span key={c} className={`rounded-full border-2 px-4 py-2 font-accent text-[10px] uppercase tracking-[0.08em] ${v.stroke}`}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className={`rounded-full px-[26px] py-[15px] text-[15px] font-semibold transition-transform duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 ${v.inverse}`}
                  >
                    Ouvrir le dossier <span aria-hidden>↗</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Folders() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="projets" aria-label="Projets" className="border-t border-white/10 py-[clamp(72px,10vh,140px)]">
      <div className="mx-auto w-[min(1240px,100%-48px)]">
        <motion.header
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={spring}
          className="mb-16 max-w-[760px]"
        >
          <SectionTitle className="mb-[18px]">
            Les <Outline>dossiers</Outline>
          </SectionTitle>
          <p className="text-lg text-mist">
            Trois études de cas classées au coffre. Survolez ou touchez un dossier pour l&apos;ouvrir.
          </p>
        </motion.header>

        <div className="flex flex-col">
          {PROJECTS.map((p, i) => (
            <Folder
              key={p.id}
              p={p}
              index={i}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
