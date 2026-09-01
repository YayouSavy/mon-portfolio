"use client";
// → Type : Client Component
// → Raison : whileInView (révélations) + hover fiche
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle, { Accent } from "./SectionTitle";
import PersonalNote from "./PersonalNote";
import { getContent } from "../lib/content";
import { type Lang, UI } from "../lib/i18n";
import { spring, springBouncy, viewport } from "../lib/motion";

export default function About({ lang }: { lang: Lang }) {
  const t = UI[lang].home;
  const { ID_ROWS, ABOUT_TEXT } = getContent(lang);

  // scroll-mt = hauteur du header sticky (84px), sinon l'ancre atterrit dessous
  return (
    <section id="about" aria-label={t.aboutAria} className="scroll-mt-[84px] py-[clamp(72px,10vh,140px)]">
      <div className="mx-auto grid w-[min(1240px,100%-48px)] items-start gap-[clamp(44px,5.5vw,88px)] lg:grid-cols-[1.5fr_1fr]">
        {/* ---- Texte + process ---- */}
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring}>
          <SectionTitle>
            About <Accent>me</Accent>
          </SectionTitle>

          <div className="relative mt-7 origin-top-left lg:scale-125 lg:-translate-x-28">
            {/* Même échelle typo que la card du Hero ("Spécialisée dans les systèmes…").
                Le conteneur est en lg:scale-125 : text-base compense l'agrandissement optique. */}
            <p className="light-surface grain-multiply relative max-w-[1000px] rounded-folder border-2 border-noir bg-paper p-7 text-base leading-relaxed text-ink shadow-paper md:p-9">
              {ABOUT_TEXT}
            </p>

            {/* ---- Carte ID : plus grande, calée sous la note (derrière, qui dépasse en bas), déplaçable ----
                drag pilote son propre style transform, donc le décalage/rotation se règle via
                les valeurs de motion (x/y/rotate), pas des classes Tailwind translate/rotate.
                -z-10 la fait passer derrière la note (élément statique, empile au-dessus par défaut). */}
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.15}
              whileDrag={{ scale: 1.12, zIndex: 30, cursor: "grabbing" }}
              initial={{ opacity: 0, scale: 0.85, rotate: -8, x: 15, y: 124 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6, x: 15, y: 124 }}
              viewport={viewport}
              transition={{ ...springBouncy, delay: 0.4 }}
              className="absolute -bottom-16 left-0 -z-10 w-[62%] max-w-[440px] cursor-grab"
            >
              <Image
                src="/ID.png"
                alt="Carte d'identité d'Illiana Savy, Product Designer"
                width={897}
                height={568}
                draggable={false}
                className="h-auto w-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ---- Colonne droite : fiche identité + touche perso ---- */}
        <div className="relative flex flex-col gap-6">
          {/* ---- La fiche : liste CV (formation / expérience / langues) ---- */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ ...spring, delay: 0.14 }}
            className="light-surface grain-multiply relative rotate-[1.4deg] rounded-folder border-2 border-noir bg-mist p-9 pb-8 text-ink shadow-paper transition-all duration-500 ease-spring hover:shadow-paper-lift hover:!rotate-0"
          >
            <dl className="relative z-[1]">
              {ID_ROWS.map((row, i) => (
                <div key={row.dt} className={`grid gap-1.5 py-[15px] text-[18px] leading-relaxed md:grid-cols-[108px_1fr] md:gap-[18px] ${i !== 0 ? "border-t border-noir/15" : ""}`}>
                  <dt className="pt-1 font-accent text-[12px] uppercase tracking-[0.08em] text-[#30380D]">{row.dt}</dt>
                  <dd>
                    {row.lines.map((l) =>
                      /* Les précisions de contexte ne sont plus du petit texte gris :
                         elles passent en tag vert/noir, comme partout ailleurs sur le site. */
                      l.muted ? (
                        <span key={l.text} className="mb-1.5 mt-1 block">
                          <span className="inline-flex rounded-full border-2 border-noir bg-lime px-3.5 py-1.5 font-accent text-[10px] uppercase leading-tight tracking-[0.08em] text-ink">
                            {l.node ?? l.text}
                          </span>
                        </span>
                      ) : (
                        <span key={l.text} className="block font-medium text-[#141414]">
                          {l.node ?? l.text}
                        </span>
                      ),
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <PersonalNote lang={lang} />
        </div>
      </div>
    </section>
  );
}
