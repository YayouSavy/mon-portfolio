"use client";
// → Type : Client Component
// → Raison : whileInView (pop des post-its) + navigation vers le dossier concerné
import Link from "next/link";
import { motion } from "framer-motion";
import Tape from "./props/Tape";
import { getContent } from "../lib/content";
import { href, type Lang, UI } from "../lib/i18n";
import type { Accent } from "../lib/data";
import { springBouncy, viewport } from "../lib/motion";
import { statNumClass } from "../lib/stat";

const NOTE: Record<Accent, string> = {
  lime: "bg-lime text-ink border-noir",
  paper: "bg-paper text-ink border-noir",
  violet: "bg-violet text-white border-white",
  mist: "bg-mist text-ink border-noir/30",
};

const MotionLink = motion.create(Link);

export default function StatsNotes({ lang }: { lang: Lang }) {
  const t = UI[lang].home;
  const { STATS, PROJECTS } = getContent(lang);

  return (
    <section aria-label={t.statsAria} className="py-[clamp(64px,9vh,110px)]">
      <div className="mx-auto grid w-[min(1240px,100%-48px)] grid-cols-2 gap-5 md:grid-cols-4 md:gap-[clamp(20px,2.6vw,34px)]">
        {STATS.map((s, i) => {
          const project = s.projectId ? PROJECTS.find((p) => p.id === s.projectId) : undefined;
          const target = project ? href(lang, `/projets/${project.id}`) : "#projets";
          const label = `${s.num} : ${s.label} (${project ? t.seeCase(project.title) : t.seeAllCases})`;

          return (
            <MotionLink
              key={s.num}
              href={target}
              aria-label={label}
              initial={{ opacity: 0, y: 34, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewport}
              transition={{ ...springBouncy, delay: i * 0.09 }}
              /* Pas d'aspect-square : à quatre colonnes il forçait des carrés de ~287 px
                 pour un chiffre et deux lignes. La hauteur suit le contenu, avec un
                 plancher qui garde les quatre post-its alignés. */
              className={`relative flex min-h-[132px] flex-col justify-center gap-2 rounded-folder border-2 p-5 shadow-paper transition-all duration-300 ease-spring hover:-translate-y-2 hover:!rotate-0 hover:shadow-paper-lift md:p-6 ${s.rot} ${NOTE[s.color]} ${s.color === "violet" ? "grain-overlay" : "grain-multiply"}`}
            >
              <Tape color={s.tape} className="-top-[13px] left-1/2 -ml-12 -rotate-3" />
              <p className={`${statNumClass(s.num)} font-extrabold leading-none tracking-[-0.02em] [text-wrap:balance]`}>
                {s.num}
              </p>
              <p className="text-[14.5px] font-medium leading-snug opacity-90">{s.label}</p>
            </MotionLink>
          );
        })}
      </div>
    </section>
  );
}
