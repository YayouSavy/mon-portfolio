"use client";
// → Type : Client Component
// → Raison : Framer Motion (whileInView) sur les sections de la page dossier
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Tape from "../props/Tape";
import VisualRenderer from "../visuals/VisualRenderer";
import { ACCENT_STYLES } from "../../lib/accent";
import type { Project } from "../../lib/data";
import { spring, viewport } from "../../lib/motion";

const ROT = ["-rotate-1", "rotate-1", "-rotate-[0.6deg]"];

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-display text-[clamp(28px,3.6vw,40px)] font-extrabold uppercase tracking-[-0.01em] text-white">
      {children}
    </h2>
  );
}

export default function CaseStudyView({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const v = ACCENT_STYLES[project.color];

  if (project.status === "soon") {
    return (
      <section aria-label={project.title} className="relative overflow-hidden py-[clamp(72px,10vh,140px)]">
        <div className="relative mx-auto w-[min(880px,100%-48px)]">
          <Link href="/#projets" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-lime">
            <ArrowLeft aria-hidden size={16} strokeWidth={2.5} /> Retour aux dossiers
          </Link>

          <p className="mb-4 font-accent text-[11px] uppercase tracking-[0.1em] text-mist/70">{project.tab}</p>
          <h1 className="mb-4 font-display text-[clamp(44px,7vw,84px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white">
            {project.title}
          </h1>
          <p className="mb-10 max-w-[54ch] text-xl leading-relaxed text-mist">{project.desc}</p>

          <VisualRenderer visual={project.cover} className="max-w-[520px]" />

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/#projets"
              className="rounded-full bg-lime px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95"
            >
              Voir les dossiers publiés
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border-2 border-lime px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-lime/10 active:scale-95"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <article className="relative overflow-hidden pb-[clamp(72px,10vh,140px)] pt-[clamp(48px,7vh,88px)]">
      <div aria-hidden className="pointer-events-none absolute -left-[300px] -top-[300px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(221,250,108,0.1)_0%,transparent_62%)] blur-[90px]" />

      <div className="relative mx-auto w-[min(1080px,100%-48px)]">
        <Link href="/#projets" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-lime">
          <ArrowLeft aria-hidden size={16} strokeWidth={2.5} /> Retour aux dossiers
        </Link>

        {/* ---- En-tête ---- */}
        <motion.header initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="max-w-[820px]">
          <p className="mb-4 font-accent text-[11px] uppercase tracking-[0.1em] text-mist/70">{project.tab}</p>
          <h1 className="mb-3 font-display text-[clamp(44px,7vw,84px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white">
            {project.title}
          </h1>
          <p className="mb-6 text-lg text-lime">{project.meta}</p>
          <p className="mb-7 max-w-[64ch] border-l-2 border-lime py-1 pl-5 text-xl leading-relaxed text-white">{project.role}</p>
          <div className="flex flex-wrap gap-2.5">
            {project.chips.map((c) => (
              <span key={c} className="rounded-full border-2 border-white/25 px-4 py-2 font-accent text-[10px] uppercase tracking-[0.08em] text-mist">
                {c}
              </span>
            ))}
          </div>
        </motion.header>

        {/* ---- Visuel principal ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...spring, delay: 0.08 }}
          className="relative mt-12 max-w-[640px]"
        >
          <VisualRenderer visual={project.cover} />
          {project.ndaNote && <p className="mt-3 max-w-[56ch] text-sm text-mist/60">{project.ndaNote}</p>}
        </motion.div>

        {/* ---- Contexte ---- */}
        {project.context && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20 max-w-[70ch]">
            <H2>Contexte</H2>
            <p className="text-lg leading-relaxed text-mist">{project.context}</p>
          </motion.section>
        )}

        {/* ---- Process ---- */}
        {project.process && (
          <section className="mt-20">
            <H2>Process</H2>
            <div className="grid gap-10 md:grid-cols-3">
              {project.process.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ ...spring, delay: i * 0.1 }}
                >
                  <div className={ROT[i % ROT.length]}>
                    <VisualRenderer visual={step.visual} />
                  </div>
                  <h3 className="mb-2 mt-5 text-xl font-bold tracking-[-0.01em] text-white">
                    {String(i + 1).padStart(2, "0")} · {step.title}
                  </h3>
                  <p className="text-[15.5px] leading-relaxed text-mist">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ---- Arbitrages ---- */}
        {project.decisions && project.decisions.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20 max-w-[70ch]">
            <H2>Arbitrages</H2>
            <ul className="flex flex-col gap-4">
              {project.decisions.map((d) => (
                <li key={d} className="flex gap-3 text-lg leading-relaxed text-mist">
                  <span aria-hidden className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-lime" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* ---- Résultats ---- */}
        {project.metrics.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>Résultats</H2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {project.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`light-surface grain-multiply relative rounded-folder border-2 p-6 shadow-paper ${ROT[i % ROT.length]} ${v.body} ${v.stroke}`}
                >
                  <Tape color={project.color === "violet" ? "paper" : "lime"} className="-top-[13px] left-1/2 -ml-12 -rotate-3" />
                  <p className="relative z-[1] font-display text-[clamp(30px,3vw,42px)] font-extrabold leading-none tracking-[-0.02em]">{m.num}</p>
                  <p className="relative z-[1] mt-2 text-sm font-medium opacity-80">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ---- Apprentissages ---- */}
        {project.learnings && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20 max-w-[70ch]">
            <H2>Ce que ça m&apos;a appris</H2>
            <p className="text-lg leading-relaxed text-mist">{project.learnings}</p>
          </motion.section>
        )}

        {/* ---- Navigation dossier précédent / suivant ---- */}
        <nav aria-label="Dossiers" className="mt-24 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
          <Link href={`/projets/${prev.id}`} className="group rounded-folder border border-white/10 p-6 transition-colors duration-300 hover:border-lime/50">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-mist/60">Dossier précédent</span>
            <span className="block text-xl font-bold text-white transition-colors group-hover:text-lime">{prev.title}</span>
          </Link>
          <Link href={`/projets/${next.id}`} className="group rounded-folder border border-white/10 p-6 text-right transition-colors duration-300 hover:border-lime/50">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-mist/60">Dossier suivant</span>
            <span className="block text-xl font-bold text-white transition-colors group-hover:text-lime">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
