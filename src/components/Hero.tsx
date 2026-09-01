"use client";
// → Type : Client Component
// → Raison : Framer Motion (stagger, entrée de la photo, flottement)
import Image from "next/image";
import { motion } from "framer-motion";
import Tape from "./props/Tape";
import { getContent } from "../lib/content";
import { type Lang, UI } from "../lib/i18n";
import type { Accent } from "../lib/data";
import { spring, springBouncy } from "../lib/motion";

/* Règle stroke de la DA : surfaces claires → stroke noir, violettes → stroke blanc */
const TAG_STYLE: Record<Accent, string> = {
  paper: "bg-paper text-ink border-noir",
  lime: "bg-lime text-ink border-noir",
  violet: "bg-violet text-white border-white",
  mist: "bg-mist text-ink border-noir/30",
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring },
};
const line = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: spring },
};

export default function Hero({ lang }: { lang: Lang }) {
  const t = UI[lang].home;
  const { TAGS, HERO_TEXT } = getContent(lang);

  return (
    <section aria-label={t.heroAria} className="relative py-[clamp(64px,9vh,110px)]">
      <div className="relative mx-auto grid w-[min(1240px,100%-48px)] items-center gap-[clamp(40px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- Colonne texte : NOM en très gros, rôle en dessous ---- */}
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09 } } }}>
          <div className="mt-16">
            <h1 className="mb-5 text-[clamp(60px,10.5vw,150px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink">
              {/* text-[clamp(...)] = taille fluide. Monte le 150px si tu veux encore plus gros */}
              <span className="block overflow-hidden">
                <motion.span variants={line} className="block">Illiana</motion.span>
              </span>{" "}
              <span className="block overflow-hidden">
                <motion.span variants={line} className="block">Savy</motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springBouncy, delay: 0.5 }}
              className="mb-7 inline-block w-[260px] sm:w-[320px]"
            >
              <Image src="/product-designer-tag.png" alt="Product Designer" width={548} height={130} className="h-auto w-full" />
            </motion.div>
          </div>

          <motion.div variants={item} className="mb-9 w-full max-w-[700px] lg:w-[700px]">
            <p className="light-surface grain-multiply relative rounded-folder border-2 border-noir bg-paper p-6 text-lg leading-relaxed text-ink shadow-paper md:p-8">
              {HERO_TEXT}
            </p>
          </motion.div>
        </motion.div>

        {/* ---- Colonne photo : détourée sur aplat violet + pastilles compétences flottantes ---- */}
        <div className="group relative mx-auto w-full max-w-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 52, rotate: -6, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ ...springBouncy, delay: 0.15 }}
          >
            {/* La rotation de repos (-2°) est en CSS pour ne pas entrer en
                conflit avec les transforms Framer du parent */}
            <div className="-rotate-2 transition-transform duration-500 ease-spring group-hover:rotate-0 group-hover:scale-[1.02]">
              <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}>
                <Image
                  src="/portrait.png"
                  alt="Portrait d'Illiana Savy, Product Designer"
                  width={822}
                  height={868}
                  priority
                  quality={95}
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="h-auto w-full"
                  style={{ filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.45)) drop-shadow(0 16px 28px rgba(0,0,0,0.35))" }}
                />
              </motion.div>

              <Tape color="paper" className="-left-6 -top-1 -rotate-[36deg]" />
              <Tape color="paper" className="-bottom-1 -right-6 -rotate-[36deg]" />
            </div>
          </motion.div>

          {/* Pastilles : inline sur mobile, épinglées autour de la photo en lg
              (lg:contents = les enfants se positionnent par rapport à la photo) */}
          <div className="mt-6 flex flex-wrap gap-3.5 lg:contents">
            {TAGS.map((t, i) => (
              <motion.span
                key={t.label}
                drag
                dragMomentum={false}
                dragElastic={0.15}
                whileDrag={{ scale: 1.12, zIndex: 30, cursor: "grabbing" }}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...springBouncy, delay: 0.55 + i * 0.08 }}
                className={`relative z-[6] inline-flex cursor-grab whitespace-nowrap rounded-full border-2 px-4 py-2 font-accent text-[11px] uppercase tracking-[0.06em] transition-transform duration-300 ease-spring hover:scale-110 active:cursor-grabbing group-hover:!rotate-0 lg:absolute ${TAG_STYLE[t.color]} ${t.pos}`}
              >
                {t.label}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 rounded-full bg-[image:var(--grain)] opacity-30 ${t.color === "violet" ? "mix-blend-overlay" : "mix-blend-multiply"}`}
                />
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
