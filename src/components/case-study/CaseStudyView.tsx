"use client";
// → Type : Client Component
// → Raison : Framer Motion (whileInView) sur les sections de la page dossier
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Tape from "../props/Tape";
import CaseStudyProp from "./CaseStudyProp";
import VisualRenderer from "../visuals/VisualRenderer";
import type { Project } from "../../lib/data";
import { href, type Lang, UI } from "../../lib/i18n";
import { spring, viewport } from "../../lib/motion";
import { statNumClass } from "../../lib/stat";

const ROT = ["-rotate-1", "rotate-1", "-rotate-[0.6deg]"];

const DEFAULT_RESULT_GROUPS = [
  { key: "produit", label: "Le produit", dot: "bg-violet" },
  { key: "systeme", label: "Le système", dot: "bg-lime" },
];

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-display text-[clamp(28px,3.6vw,40px)] font-extrabold uppercase tracking-[-0.01em] text-ink">
      {children}
    </h2>
  );
}

/**
 * Fiche papier scotchée, calée sur les post-its chiffres de l'accueil (StatsNotes).
 * Fond beige quel que soit le dossier : les chiffres forment une même série d'un projet
 * à l'autre, et le beige évite le contraste limite du violet sous le label en opacity-90.
 *
 * `m.note` = annotation manuscrite. Elle est rendue HORS de la card, sur le fond papier :
 * la card porte le chiffre, la page porte l'annotation. Elle suit la card dans le DOM,
 * donc un lecteur d'écran la lit juste après.
 */
function MetricCard({ m, i, noteId, alt }: { m: Project["metrics"][number]; i: number; noteId: string; alt: boolean }) {
  return (
    <div>
      <div
        aria-describedby={m.note ? noteId : undefined}
        className={`light-surface grain-multiply relative flex min-h-[140px] flex-col justify-center gap-2 rounded-folder border-2 border-noir bg-beige p-5 text-ink shadow-paper md:p-6 ${
          ROT[i % ROT.length]
        }`}
      >
        <Tape color="lime" className="-top-[13px] left-1/2 -ml-12 -rotate-3" />
        <p className={`relative z-[1] ${statNumClass(m.num)} font-extrabold leading-none tracking-[-0.02em] [text-wrap:balance]`}>
          {m.num}
        </p>
        <p className="relative z-[1] text-[14.5px] font-medium leading-snug opacity-90">{m.label}</p>
      </div>
      {m.note && (
        <p id={noteId} className={`note-marge ${alt ? "is-alt" : ""}`}>
          {m.note}
        </p>
      )}
    </div>
  );
}

export default function CaseStudyView({
  project,
  prev,
  next,
  lang,
}: {
  project: Project;
  prev: Project;
  next: Project;
  lang: Lang;
}) {
  const t = UI[lang].caseStudy;
  const home = href(lang, "/");
  if (project.status === "soon") {
    return (
      <section aria-label={project.title} className="relative overflow-hidden py-[clamp(72px,10vh,140px)]">
        <div className="relative mx-auto w-[min(880px,100%-48px)]">
          <Link href={`${home}#projets`} className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-violet">
            <ArrowLeft aria-hidden size={16} strokeWidth={2.5} /> {t.back}
          </Link>

          {/* block w-fit et non inline-block : deux inline-block consécutifs se placent
              côte à côte, le tab se retrouvait à côté du titre au lieu d'être dessus. */}
          <p className="mb-4 block w-fit rounded-full bg-noir/10 px-3.5 py-1 font-accent text-[11px] uppercase tracking-[0.1em] text-ink">{project.tab}</p>
          <h1 className="mb-4 text-[clamp(44px,7vw,84px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
            {project.title}
          </h1>
          <p className="mb-10 max-w-[54ch] text-xl font-medium leading-relaxed text-ink/85">{project.desc}</p>

          <VisualRenderer visual={project.cover} className="max-w-[520px]" lang={lang} />

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={`${home}#projets`}
              className="rounded-folder bg-lime px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95"
            >
              {t.seePublished}
            </Link>
            <Link
              href={`${home}#contact`}
              className="rounded-folder bg-ink px-7 py-3.5 text-[15px] font-semibold text-paper transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95"
            >
              {t.contactMe}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* Rang de chaque note DANS LA SÉRIE DES NOTES du dossier : c'est lui qui fait alterner
     le signe de la rotation. Se caler sur l'index de la card ne marcherait pas, deux notes
     pouvant tomber sur deux cellules de même parité. */
  const noteRank = new Map(project.metrics.filter((m) => m.note).map((m, i) => [m.label, i]));

  const coverVisual = (
    <>
      <VisualRenderer visual={project.cover} lang={lang} />
      {project.ndaNote && <p className="mt-3 max-w-[56ch] text-sm font-medium text-ink/70">{project.ndaNote}</p>}
    </>
  );

  const coverBlock = project.coverTitle ? (
    <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
      <H2>{project.coverTitle}</H2>
      {project.coverIntro && (
        <div className="mb-8 flex max-w-[70ch] flex-col gap-4 text-lg leading-relaxed text-ink/85">{project.coverIntro}</div>
      )}
      <div className="relative w-full">{coverVisual}</div>
    </motion.section>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...spring, delay: 0.08 }}
      className="relative mt-12 w-full"
    >
      {coverVisual}
    </motion.div>
  );

  return (
    <article className="pb-[clamp(72px,10vh,140px)] pt-[clamp(48px,7vh,88px)]">

      <div className="relative mx-auto w-[min(1080px,100%-48px)]">
        {/* Un seul objet posé, en tête, près du bloc d'entrée. Voir CaseStudyProp. */}
        {project.entryProp && <CaseStudyProp kind={project.entryProp} />}

        <Link href={`${home}#projets`} className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-violet">
          <ArrowLeft aria-hidden size={16} strokeWidth={2.5} /> {t.back}
        </Link>

        {/* ---- En-tête ---- */}
        <motion.header initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="max-w-[820px]">
          {/* block w-fit et non inline-block : deux inline-block consécutifs se placent
              côte à côte, le tab se retrouvait à côté du titre au lieu d'être dessus. */}
          <p className="mb-4 block w-fit rounded-full bg-noir/10 px-3.5 py-1 font-accent text-[11px] uppercase tracking-[0.1em] text-ink">{project.tab}</p>
          <div className="relative mb-3 inline-block">
            {project.titleBadge && (
              <Image
                aria-hidden
                src={project.titleBadge.src}
                alt=""
                width={project.titleBadge.width}
                height={project.titleBadge.height}
                className="pointer-events-none absolute -right-14 -top-8 z-[1] w-32 -rotate-6 select-none sm:-right-16 sm:w-44"
              />
            )}
            <h1 className="relative text-[clamp(44px,7vw,84px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
              {project.title}
            </h1>
          </div>
          <p className="text-lg font-bold text-violet">{project.meta}</p>
          {project.metaSub && (
            /* Contexte de mission en tags vert/noir : même vocabulaire que les pastilles
               du hero et les chips, plutôt qu'une ligne de petit texte gris. */
            <ul className="mt-3.5 flex list-none flex-wrap gap-2.5">
              {project.metaSub.map((s) => (
                <li
                  key={s}
                  className="rounded-full border-2 border-noir bg-lime px-4 py-2 font-accent text-[10px] uppercase tracking-[0.08em] text-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </motion.header>

        {/* ---- Résumé + chips (hors du header : peut prendre toute la largeur sans forcer le titre à s'élargir) ---- */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ ...spring, delay: 0.04 }} className="mt-7 w-full">
          <div className="light-surface grain-multiply relative mb-7 w-full rounded-folder border-2 border-noir bg-paper py-5 pl-6 pr-6 text-lg leading-relaxed text-ink shadow-paper">{project.role}</div>
          <div className="flex flex-wrap gap-2.5">
            {project.chips.map((c) => (
              <span key={c} className="rounded-full border-2 border-noir bg-paper px-4 py-2 font-accent text-[10px] uppercase tracking-[0.08em] text-ink">
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ---- Visuel principal ---- */}
        {(!project.coverPlacement || project.coverPlacement === "top") && coverBlock}

        {/* ---- Contexte / Le projet / Le problème ---- */}
        {project.context && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{project.contextTitle ?? t.context}</H2>
            <div className="light-surface grain-multiply relative flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">{project.context}</div>
          </motion.section>
        )}

        {/* ---- Mon rôle (détaillé, dossiers à plusieurs chantiers) ---- */}
        {project.roleDetail && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{t.role}</H2>
            <div className="light-surface grain-multiply relative flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">{project.roleDetail}</div>
          </motion.section>
        )}

        {/* ---- Sections narratives additionnelles (ex. "La recherche") ---- */}
        {project.extraSections?.filter((s) => (s.placement ?? "afterRole") === "afterRole").map((s) => (
          <motion.section key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{s.title}</H2>
            <div className="light-surface grain-multiply relative flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">{s.body}</div>
          </motion.section>
        ))}

        {project.coverPlacement === "afterRole" && coverBlock}

        {/* ---- Preuve de craft (NDA-safe) ---- */}
        {project.craftProof && !project.craftProofBeforeResults && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            {project.craftProof}
          </motion.section>
        )}

        {/* ---- Process ---- */}
        {project.process && (
          <section className="mt-20">
            <H2>{t.process}</H2>
            {project.processIntro && <p className="mb-8 max-w-[70ch] text-lg leading-relaxed text-ink/85">{project.processIntro}</p>}
            <div className="grid gap-10 md:grid-cols-3">
              {project.process.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ ...spring, delay: i * 0.1 }}
                >
                  {step.visual && (
                    <div className={ROT[i % ROT.length]}>
                      <VisualRenderer visual={step.visual} lang={lang} />
                    </div>
                  )}
                  <h3 className="mb-2 mt-5 text-xl font-bold tracking-[-0.01em] text-ink">
                    {String(i + 1).padStart(2, "0")} · {step.title}
                  </h3>
                  <p className="text-[15.5px] font-medium leading-relaxed text-ink/85">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ---- Arbitrages / décision(s) clé(s) ---- */}
        {(project.decisionHeroes?.length || project.decisionHero || (project.decisions && project.decisions.length > 0)) && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{project.decisionsTitle ?? t.decisions}</H2>
            {project.decisionsIntro && (
              <div className="light-surface grain-multiply relative mb-7 flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">
                {project.decisionsIntro}
              </div>
            )}
            {project.decisionHeroes?.length ? (
              <div className="flex flex-col gap-7">
                {project.decisionHeroes.map((d, i) => (
                  <div key={i} className="light-surface grain-multiply relative w-full rounded-folder border-2 border-noir bg-paper p-7 shadow-paper md:p-8">
                    <p className="mb-3 text-lg font-bold text-ink">{d.title}</p>
                    <div className="flex flex-col gap-3 text-lg leading-relaxed text-ink/85">{d.body}</div>
                  </div>
                ))}
              </div>
            ) : project.decisionHero ? (
              <div className="light-surface grain-multiply relative w-full rounded-folder border-2 border-noir bg-paper p-7 shadow-paper md:p-8">
                <p className="mb-3 text-lg font-bold text-ink">{project.decisionHero.title}</p>
                <div className="flex flex-col gap-3 text-lg leading-relaxed text-ink/85">{project.decisionHero.body}</div>
              </div>
            ) : (
              <ul className="light-surface grain-multiply relative flex w-full flex-col gap-5 rounded-folder border-2 border-noir bg-paper p-7 shadow-paper md:p-8">
                {project.decisions!.map((d) => (
                  <li key={d} className="flex gap-3 text-lg leading-relaxed text-ink">
                    <span aria-hidden className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-violet" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        )}

        {project.extraSections?.filter((s) => s.placement === "afterDecisions").map((s) => (
          <motion.section key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{s.title}</H2>
            <div className="light-surface grain-multiply relative flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">{s.body}</div>
          </motion.section>
        ))}

        {/* ---- Preuve de craft (NDA-safe), placée juste avant les résultats ---- */}
        {project.craftProof && project.craftProofBeforeResults && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            {project.craftProof}
          </motion.section>
        )}

        {/* ---- Résultats ---- */}
        {project.metrics.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{t.results}</H2>
            {project.resultsIntro && (
              <div className="mb-7 flex max-w-[70ch] flex-col gap-4 text-lg leading-relaxed text-ink/85">{project.resultsIntro}</div>
            )}
            {project.metrics.some((m) => m.group) ? (
              <div className="flex flex-col gap-10">
                {(project.resultsGroups ?? DEFAULT_RESULT_GROUPS).map((g) => {
                  const groupMetrics = project.metrics.filter((m) => m.group === g.key);
                  if (groupMetrics.length === 0) return null;
                  return (
                    <div key={g.key}>
                      <p className="mb-4 flex items-center gap-2 font-accent text-[15px] font-bold uppercase tracking-[0.05em] text-ink">
                        <span aria-hidden className={`h-3 w-3 rounded-full ${g.dot}`} />
                        {g.label}
                      </p>
                      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                        {groupMetrics.map((m, i) => (
                          <MetricCard key={m.label} m={m} i={i} noteId={`note-${project.id}-${g.key}-${i}`} alt={(noteRank.get(m.label) ?? 0) % 2 === 1} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {project.metrics.map((m, i) => (
                  <MetricCard key={m.label} m={m} i={i} noteId={`note-${project.id}-${i}`} alt={(noteRank.get(m.label) ?? 0) % 2 === 1} />
                ))}
              </div>
            )}
            {project.resultsOutro && (
              /* « Le statut » n'est pas une note de bas de section : c'est une conclusion.
                 Même fiche papier que Contexte, Mon rôle et Ce que j'en retiens. */
              <div className="light-surface grain-multiply relative mt-10 flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">
                {project.resultsOutro}
              </div>
            )}
          </motion.section>
        )}

        {/* ---- Apprentissages ---- */}
        {project.learnings && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring} className="mt-20">
            <H2>{t.learnings}</H2>
            <div className="light-surface grain-multiply relative flex w-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">{project.learnings}</div>
          </motion.section>
        )}

        {/* ---- Navigation dossier précédent / suivant ---- */}
        <nav aria-label={t.navAria} className="mt-24 grid gap-4 border-t-2 border-noir/15 pt-10 sm:grid-cols-2">
          <Link href={href(lang, `/projets/${prev.id}`)} className="group rounded-folder border-2 border-noir/15 bg-paper/70 p-6 shadow-paper transition-colors duration-300 hover:border-violet">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink/70">{t.prev}</span>
            <span className="block text-xl font-bold text-ink transition-colors group-hover:text-violet">{prev.title}</span>
          </Link>
          <Link href={href(lang, `/projets/${next.id}`)} className="group rounded-folder border-2 border-noir/15 bg-paper/70 p-6 text-right shadow-paper transition-colors duration-300 hover:border-violet">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-ink/70">{t.next}</span>
            <span className="block text-xl font-bold text-ink transition-colors group-hover:text-violet">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
