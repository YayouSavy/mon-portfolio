"use client";
// → Type : Client Component
// → Raison : toggle IA/corrigée + repères avec info-bulle (hover/focus/clic, état local)
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VisualCard from "../VisualCard";
import type { Lang } from "../../../lib/i18n";

type StatusKey = "active" | "pending" | "error";

/* Données de démonstration : la structure de la table ne change pas d'une langue à
   l'autre, seuls le libellé de ligne et celui du statut sont traduits. */
const ROWS: { id: string; ref: string; status: StatusKey }[] = [
  { id: "r1", ref: "04-A", status: "active" },
  { id: "r2", ref: "12-C", status: "pending" },
  { id: "r3", ref: "07-B", status: "error" },
];

const STATUS_NIMBUS: Record<StatusKey, string> = {
  active: "bg-[var(--nimbus-positive)]",
  pending: "bg-[var(--nimbus-warning)]",
  error: "bg-[var(--nimbus-danger)]",
};

type DiffId = "shadow" | "avatar" | "status" | "pagination";

const DIFF_NUMBERS: { id: DiffId; n: number }[] = [
  { id: "shadow", n: 1 },
  { id: "avatar", n: 2 },
  { id: "status", n: 3 },
  { id: "pagination", n: 4 },
];

const COPY = {
  fr: {
    eyebrow: "Nimbus · avant / après",
    title: "Quand l'IA attrape le défaut générique",
    intro:
      "Demandez une table à un assistant : il produit une table « Material » générique, hors du système. Basculez pour comparer, et survolez (ou touchez) un repère numéroté pour savoir pourquoi.",
    tablistLabel: "Version de la table",
    tabAi: "Produite par l'IA",
    tabFixed: "Corrigée · Nimbus",
    aiEyebrow: "Import IA · Material · hors système",
    fixedEyebrow: "Corrigé · Nimbus",
    prev: "Précédent",
    next: "Suivant",
    result: "Résultat : le code généré passe le contrôle du système sans reprise manuelle.",
    rowPrefix: "Ligne",
    diffPrefix: "Différence",
    status: { active: "Actif", pending: "En attente", error: "Erreur" },
    hints: {
      shadow: "Une ombre portée : le système n'en met pas.",
      avatar: "Des avatars ronds : le système les veut carrés. Et un bleu qui n'existe pas dans la palette.",
      status: "Un statut en pastille au lieu du badge maison.",
      pagination: "Une pagination générique au lieu de celle du système.",
    },
  },
  en: {
    eyebrow: "Nimbus · before / after",
    title: "When the AI reaches for the generic default",
    intro:
      "Ask an assistant for a table and you get a generic « Material » table, outside the system. Toggle to compare, and hover (or tap) a numbered marker to see why.",
    tablistLabel: "Table version",
    tabAi: "AI-generated",
    tabFixed: "Corrected · Nimbus",
    aiEyebrow: "AI import · Material · outside the system",
    fixedEyebrow: "Corrected · Nimbus",
    prev: "Previous",
    next: "Next",
    result: "Result: the generated code passes the system's check with no manual rework.",
    rowPrefix: "Row",
    diffPrefix: "Difference",
    status: { active: "Active", pending: "Pending", error: "Error" },
    hints: {
      shadow: "A drop shadow: the system doesn't use them.",
      avatar: "Round avatars: the system wants them square. And a blue that doesn't exist in the palette.",
      status: "A status pill instead of the house badge.",
      pagination: "Generic pagination instead of the system's own.",
    },
  },
} as const;

/**
 * Repère + info-bulle WAI-ARIA (role="tooltip" + aria-describedby) : visible au survol,
 * au focus clavier et au tap (mobile), fermable via Échap (WCAG 1.4.13 — dismissible,
 * hoverable, persistant). La bulle reste montée dans le DOM (juste animée en opacité) pour
 * que les lecteurs d'écran l'annoncent au focus, indépendamment de sa visibilité à l'écran.
 */
function DiffMarker({
  diff,
  hint,
  label,
  active,
  onOpen,
  onClose,
  className = "",
  align = "center",
}: {
  diff: { id: DiffId; n: number };
  hint: string;
  label: string;
  active: boolean;
  onOpen: (id: DiffId) => void;
  onClose: (id: DiffId) => void;
  className?: string;
  align?: "center" | "right";
}) {
  const tooltipId = `diff-tooltip-${diff.id}`;

  return (
    <span className={`absolute z-[2] ${className}`}>
      <button
        type="button"
        onClick={() => onOpen(diff.id)}
        onMouseEnter={() => onOpen(diff.id)}
        onMouseLeave={() => onClose(diff.id)}
        onFocus={() => onOpen(diff.id)}
        onBlur={() => onClose(diff.id)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose(diff.id);
        }}
        aria-describedby={tooltipId}
        aria-label={label}
        className={`grid h-7 w-7 place-items-center rounded-full border-2 border-noir text-[11px] font-bold shadow-paper transition-all duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
          active ? "scale-125 bg-violet text-white ring-4 ring-violet/30" : "bg-lime text-ink hover:scale-125 hover:bg-violet hover:text-white hover:ring-4 hover:ring-violet/30"
        }`}
      >
        {diff.n}
      </button>

      <motion.span
        role="tooltip"
        id={tooltipId}
        initial={false}
        animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 4, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        style={{ pointerEvents: active ? "auto" : "none" }}
        onMouseEnter={() => onOpen(diff.id)}
        onMouseLeave={() => onClose(diff.id)}
        className={`absolute bottom-full z-[4] mb-2 w-max max-w-[180px] rounded-lg border-2 border-noir bg-noir px-2.5 py-1.5 text-[11px] font-medium leading-snug text-paper shadow-paper ${
          align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"
        }`}
      >
        {hint}
        <span
          aria-hidden
          className={`absolute top-full h-2 w-2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-noir bg-noir ${
            align === "right" ? "right-2.5" : "left-1/2 -translate-x-1/2"
          }`}
        />
      </motion.span>
    </span>
  );
}

/** Démo Nimbus (fictive) : comparateur avant/après réellement interactif, pas deux captures côte à côte. */
export default function TableComparator({ className = "", lang = "fr" }: { className?: string; lang?: Lang }) {
  const [mode, setMode] = useState<"ai" | "fixed">("ai");
  const [activeId, setActiveId] = useState<DiffId | null>(null);
  const c = COPY[lang];

  const open = (id: DiffId) => setActiveId(id);
  const close = (id: DiffId) => setActiveId((current) => (current === id ? null : current));

  /* Un repère, ses textes déjà résolus dans la langue courante. */
  const marker = (i: number) => {
    const diff = DIFF_NUMBERS[i];
    return { diff, hint: c.hints[diff.id], label: `${c.diffPrefix} ${diff.n}` };
  };

  return (
    <VisualCard eyebrow={c.eyebrow} className={className}>
      <h4 className="mb-2 text-lg font-bold tracking-[-0.01em]">{c.title}</h4>
      <p className="mb-5 text-[14.5px] leading-relaxed opacity-80">{c.intro}</p>

      <div role="tablist" aria-label={c.tablistLabel} className="mb-5 inline-flex rounded-full border-2 border-noir bg-mist p-1">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "ai"}
          onClick={() => setMode("ai")}
          className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
            mode === "ai" ? "bg-noir text-paper" : "text-ink/70 hover:text-ink"
          }`}
        >
          {c.tabAi}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "fixed"}
          onClick={() => setMode("fixed")}
          className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
            mode === "fixed" ? "bg-violet text-white" : "text-ink/70 hover:text-ink"
          }`}
        >
          {c.tabFixed}
        </button>
      </div>

      <div className="relative min-h-[220px]">
      <AnimatePresence mode="wait">
      {mode === "ai" ? (
        <motion.div key="ai" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
          <p className="mb-2.5 font-accent text-[9px] uppercase tracking-[0.08em] opacity-60">{c.aiEyebrow}</p>
          <div className="relative rounded-xl bg-white p-3 pt-6 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.25)] ring-2 ring-[var(--nimbus-danger)]/40">
            <DiffMarker {...marker(0)} active={activeId === "shadow"} onOpen={open} onClose={close} className="-right-2 -top-2" align="right" />
            <ul className="flex flex-col gap-2.5">
              {ROWS.map((r, i) => (
                <li key={r.id} className="flex items-center gap-2.5">
                  <span className="relative shrink-0">
                    <span aria-hidden className="h-7 w-7 rounded-full bg-[#4285F4]/20 ring-2 ring-[var(--nimbus-danger)]/40" />
                    {i === 0 && <DiffMarker {...marker(1)} active={activeId === "avatar"} onOpen={open} onClose={close} className="-right-1.5 -top-1.5" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{`${c.rowPrefix} ${r.ref}`}</span>
                  <span className="relative shrink-0 rounded-full bg-[#4285F4]/15 px-2.5 py-1 text-[10px] font-semibold text-[#4285F4] ring-2 ring-[var(--nimbus-danger)]/40">
                    {c.status[r.status]}
                    {i === 0 && <DiffMarker {...marker(2)} active={activeId === "status"} onOpen={open} onClose={close} className="-right-1.5 -top-1.5" align="right" />}
                  </span>
                </li>
              ))}
            </ul>
            <div className="relative mt-3 flex justify-center gap-1.5 border-t border-noir/10 pt-2.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-noir/20" />
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-noir/20" />
              <DiffMarker {...marker(3)} active={activeId === "pagination"} onOpen={open} onClose={close} className="-top-1.5 right-1/2 -mr-8" />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div key="fixed" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
          <p className="mb-2.5 font-accent text-[9px] uppercase tracking-[0.08em] text-violet opacity-90">{c.fixedEyebrow}</p>
          <div className="rounded-xl border-2 border-noir bg-paper p-3">
            <ul className="flex flex-col gap-2.5">
              {ROWS.map((r) => (
                <li key={r.id} className="flex items-center gap-2.5 border-b border-noir/10 pb-2.5 last:border-0 last:pb-0">
                  <span aria-hidden className="h-7 w-7 shrink-0 rounded-md bg-noir/10" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{`${c.rowPrefix} ${r.ref}`}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold">
                    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${STATUS_NIMBUS[r.status]}`} />
                    {c.status[r.status]}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-center gap-3 border-t border-noir/10 pt-2.5 text-[10px] font-semibold text-ink/60">
              <span>{c.prev}</span>
              <span className="rounded-md border border-noir/20 px-1.5 py-0.5 text-ink">1 / 3</span>
              <span>{c.next}</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-noir/15 bg-mist/60 p-3 text-[13px] leading-relaxed">
            <p className="flex items-center gap-2 font-semibold">
              <span aria-hidden className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[var(--nimbus-positive)] text-[9px] text-white">✓</span>
              {c.result}
            </p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      </div>
    </VisualCard>
  );
}
