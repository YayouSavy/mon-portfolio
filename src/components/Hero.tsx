"use client";
// → Type : Client Component
// → Raison : Framer Motion (stagger, entrée de la photo, flottement)
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Tape from "./props/Tape";
import Trombone from "./props/Trombone";
import { ACCENT_STYLES } from "../lib/accent";
import { TAGS, PROJECTS, type Accent } from "../lib/data";
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

/* La pile derrière la couverture, dans l'ordre où on veut les voir dépasser */
const BACKGROUND_TABS = PROJECTS.filter((p) => p.id !== "esim-boost");
const TAB_TILT = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1.5deg]"];

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:240px_100%] py-[clamp(64px,9vh,110px)]"
    >
      {/* Glows néon lime + violet */}
      <div aria-hidden className="pointer-events-none absolute -left-[340px] -top-[440px] h-[860px] w-[860px] rounded-full bg-[radial-gradient(circle,rgba(221,250,108,0.16)_0%,transparent_62%)] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[420px] -right-[360px] h-[980px] w-[980px] rounded-full bg-[radial-gradient(circle,rgba(100,42,238,0.34)_0%,transparent_62%)] blur-[90px]" />

      <div className="relative mx-auto grid w-[min(1240px,100%-48px)] items-center gap-[clamp(40px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- Colonne texte : NOM en très gros, rôle en dessous ---- */}
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09 } } }}>
          <h1 className="mb-5 font-display text-[clamp(60px,10.5vw,150px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-white">
            {/* text-[clamp(...)] = taille fluide. Monte le 150px si tu veux encore plus gros */}
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">Illiana</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block text-lime">Savy</motion.span>
            </span>
          </h1>

          <motion.p variants={item} className="mb-7 font-accent text-[15px] uppercase tracking-[0.14em] text-lime">
            Product Designer
          </motion.p>

          <motion.p variants={item} className="mb-9 max-w-[540px] text-xl leading-normal text-mist">
            Je conçois des applications web <strong className="font-semibold text-white">B2B</strong> riches en
            données, de la recherche utilisateur à la delivery.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <a
              href="#projets"
              className="group/cta flex items-center gap-3 rounded-full bg-lime py-[19px] pl-8 pr-[26px] text-[17px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#642AEE] active:scale-95"
            >
              Voir mes projets
              <span aria-hidden className="grid h-[30px] w-[30px] place-items-center rounded-full bg-noir text-[15px] text-lime transition-transform duration-300 ease-spring group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">
                ↗
              </span>
            </a>
            <a
              href="/Savy_Illiana_CV.pdf"
              download
              className="rounded-full border-2 border-lime px-[30px] py-[17px] text-[17px] font-semibold text-white transition-colors duration-300 hover:bg-lime/10 active:scale-95"
            >
              Télécharger le CV
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2.5">
            {TAGS.map((t) => (
              <span
                key={t.label}
                className={`relative inline-flex items-center rounded-full border-2 px-4 py-2 font-accent text-[11px] uppercase tracking-[0.06em] ${TAG_STYLE[t.color]}`}
              >
                {t.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- Colonne visuelle : pile de dossiers façon bureau, portrait épinglé dessus ----
            Le portrait garde son cadre existant ; la nouveauté est la pile de dossiers qui
            dépasse derrière, et l'étiquette du bas qui pointe vers le dossier phare. */}
        <div className="group relative mx-auto w-full max-w-[480px]">
          {/* Onglets des 3 autres dossiers qui dépassent derrière la couverture.
              aria-hidden : simple teaser redondant, les mêmes titres sont décrits en entier
              juste après dans #projets — pas besoin de les faire annoncer deux fois. */}
          <div aria-hidden className="absolute inset-x-8 -top-9 z-0 flex justify-between gap-3">
            {BACKGROUND_TABS.map((p, i) => {
              const v = ACCENT_STYLES[p.color];
              return (
                <div
                  key={p.id}
                  className={`h-14 flex-1 rounded-t-xl border-2 border-b-0 px-3 pt-2.5 ${v.body} ${v.stroke} ${v.grain} ${TAB_TILT[i % TAB_TILT.length]}`}
                >
                  <span className="block truncate font-accent text-[9px] uppercase tracking-[0.08em]">{p.title}</span>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 52, rotate: -6, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ ...springBouncy, delay: 0.15 }}
            className="relative z-[1]"
          >
            {/* La rotation de repos (-2°) est en CSS pour ne pas entrer en
                conflit avec les transforms Framer du parent */}
            <div className="-rotate-2 transition-transform duration-500 ease-spring group-hover:rotate-0 group-hover:scale-[1.02]">
              <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}>
                <div className="relative overflow-hidden rounded-[28px] border-[10px] border-paper shadow-paper transition-shadow duration-500 group-hover:shadow-paper-lift">
                  <div className="grain-soft relative aspect-[4/4.3] bg-violet">
                    {/* halo doux derrière le visage, comme sur le CV */}
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.16),transparent_58%)]" />
                    <Image
                      src="/portrait.png"
                      alt="Portrait d'Illiana Savy, Product Designer"
                      fill
                      priority
                      sizes="(min-width: 1024px) 460px, 90vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </motion.div>

              <Tape className="-left-[22px] -top-1.5 -rotate-[38deg]" />
              <Tape color="paper" className="-bottom-1 -right-6 -rotate-[36deg]" />
              <Trombone className="-top-6 right-[18%] rotate-[9deg]" />
            </div>

            {/* Étiquette dossier du bas : pointe vers le dossier phare, pas un vague survol */}
            <Link
              href="/projets/esim-boost"
              className="light-surface grain-multiply relative z-[1] mt-5 flex items-center justify-between gap-3 rounded-folder border-2 border-noir bg-lime px-6 py-4 font-accent text-[11px] uppercase tracking-[0.08em] text-ink shadow-paper transition-transform duration-300 ease-spring hover:-translate-y-0.5"
            >
              Dossier 01 · eSIM Boost
              <span aria-hidden>↗</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
