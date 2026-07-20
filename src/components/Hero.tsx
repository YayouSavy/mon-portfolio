"use client";
// → Type : Client Component
// → Raison : Framer Motion (stagger, entrée de la photo, flottement)
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Tape from "./props/Tape";
import { TAGS, type Accent } from "../lib/data";
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

export default function Hero() {
  return (
    <section aria-label="Introduction" className="relative py-[clamp(64px,9vh,110px)]">
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
            Je conçois des applications métier complexes, de la recherche utilisateur à la
            delivery.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <a
              href="#projets"
              className="group/cta flex items-center gap-3 rounded-full bg-lime py-[19px] pl-8 pr-[26px] text-[17px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#642AEE] active:scale-95"
            >
              Voir mes projets
              <span aria-hidden className="grid h-[30px] w-[30px] place-items-center rounded-full bg-noir text-lime transition-transform duration-300 ease-spring group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">
                <ArrowUpRight size={16} strokeWidth={2.5} />
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
        </motion.div>

        {/* ---- Colonne photo : détourée sur aplat violet + pastilles compétences flottantes ---- */}
        <div className="group relative mx-auto w-full max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 52, rotate: -6, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ ...springBouncy, delay: 0.15 }}
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
                      quality={95}
                      sizes="(min-width: 1024px) 520px, 90vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </motion.div>

              <Tape className="-left-[22px] -top-1.5 -rotate-[38deg]" />
              <Tape color="paper" className="-bottom-1 -right-6 -rotate-[36deg]" />
            </div>
          </motion.div>

          {/* Pastilles : inline sur mobile, épinglées autour de la photo en lg
              (lg:contents = les enfants se positionnent par rapport à la photo) */}
          <div className="mt-6 flex flex-wrap gap-3.5 lg:contents">
            {TAGS.map((t, i) => (
              <motion.span
                key={t.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...springBouncy, delay: 0.55 + i * 0.08 }}
                className={`relative z-[6] inline-flex whitespace-nowrap rounded-full border-2 px-8 py-4 font-accent text-[15px] uppercase tracking-[0.06em] transition-transform duration-300 ease-spring hover:scale-110 group-hover:!rotate-0 lg:absolute ${TAG_STYLE[t.color]} ${t.pos}`}
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
