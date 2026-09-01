"use client";
// → Type : Client Component
// → Raison : nœud actif au clic/survol + connecteurs mesurés en pixels réels (ResizeObserver)
import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VisualCard from "./VisualCard";
import type { Lang } from "../../lib/i18n";

type Tone = "internal" | "client";
type ArtifactKind = "docStack" | "docPair" | "skillCard" | "browserWindow" | "feedbackBubble";

type NodeId = "doc" | "gov" | "skills" | "proto" | "demo";
type NodeDef = { id: NodeId; tone: Tone; artifact: ArtifactKind };

/** Colonne vertébrale linéaire : 5 étapes, dans l'ordre, sans croisement.
    La structure ne dépend pas de la langue ; libellés et décisions sont dans COPY. */
const NODES: NodeDef[] = [
  { id: "doc", tone: "internal", artifact: "docStack" },
  { id: "gov", tone: "internal", artifact: "docPair" },
  { id: "skills", tone: "internal", artifact: "skillCard" },
  { id: "proto", tone: "client", artifact: "browserWindow" },
  { id: "demo", tone: "client", artifact: "feedbackBubble" },
];

const COPY = {
  fr: {
    eyebrow: "Pipeline design system → skills IA",
    hint: "Cliquez une étape pour voir sa décision clé.",
    summaryLead: "Pipeline en cinq étapes, dans l'ordre : ",
    summaryTail:
      ". Un arc de retour réinjecte ensuite les apprentissages des démonstrations clients vers la gouvernance et la traduction en skills, dans une boucle d'amélioration continue.",
    loopLead: "Amélioration itérative :",
    loop: "apprentissages réinjectés vers la Gouvernance et la Traduction en skills.",
    legendSystem: "Système (doc, gouvernance, skills)",
    legendProduct: "Produit (build & démo client)",
    tone: { internal: "Système", client: "Produit" },
    labels: {
      doc: "Documentation existante",
      gov: "Gouvernance",
      skills: "Traduction en skills",
      proto: "Prototypes codés",
      demo: "Démonstrations clients",
    },
    decisions: {
      doc: "Le point de départ : une documentation qui suffisait aux designers humains, mais laissait trop de règles implicites pour un agent IA.",
      gov: "Deux référentiels complets plutôt qu'un seul : un pour les designers, un pour les développeurs, chacun à son niveau d'abstraction.",
      skills: "Trois skills plutôt qu'une version unique : chaque audience (designers, vibe-codeurs, développeurs) a besoin de garde-fous différents.",
      proto: "Prototypes codés plutôt que maquettes statiques : la seule façon d'itérer sur des cas concrets et de les présenter aux clients.",
      demo: "Testé directement auprès de clients grands comptes plutôt qu'en interne : le retour terrain referme la boucle.",
    },
  },
  en: {
    eyebrow: "Design system → AI skills pipeline",
    hint: "Click a step to see its key decision.",
    summaryLead: "A five-step pipeline, in order: ",
    summaryTail:
      ". A return arc then feeds what was learned in the client demos back into governance and the translation into skills, in a continuous improvement loop.",
    loopLead: "Iterative improvement:",
    loop: "learnings fed back into Governance and Translation into skills.",
    legendSystem: "System (docs, governance, skills)",
    legendProduct: "Product (build & client demo)",
    tone: { internal: "System", client: "Product" },
    labels: {
      doc: "Existing documentation",
      gov: "Governance",
      skills: "Translation into skills",
      proto: "Coded prototypes",
      demo: "Client demos",
    },
    decisions: {
      doc: "The starting point: documentation that was sufficient for human designers, but left too many rules implicit for an AI agent.",
      gov: "Two complete reference sets rather than one: one for designers, one for developers, each at its own level of abstraction.",
      skills: "Three skills rather than a single version: each audience (designers, vibe-coders, developers) needs different guardrails.",
      proto: "Coded prototypes rather than static mockups: the only way to iterate on concrete cases and present them to clients.",
      demo: "Tested directly with major-account clients rather than internally: field feedback closes the loop.",
    },
  },
} as const;

/** Boîte réelle d'un nœud : centre + dimensions, pour tracer les connecteurs bord à bord. */
type Box = { x: number; y: number; w: number; h: number };
type Geo = { width: number; height: number; boxes: Box[] };

/**
 * Point d'intersection entre le bord de la boîte et la direction unitaire (ux, uy),
 * repoussé de `pad`. Évite que la flèche disparaisse sous la bulle cible.
 */
function edgePoint(box: Box, ux: number, uy: number, pad: number) {
  const tx = ux !== 0 ? box.w / 2 / Math.abs(ux) : Infinity;
  const ty = uy !== 0 ? box.h / 2 / Math.abs(uy) : Infinity;
  const t = Math.min(tx, ty) + pad;
  return { x: box.x + ux * t, y: box.y + uy * t };
}

const TONE_DOT: Record<Tone, string> = { internal: "bg-lime", client: "bg-violet" };
const TONE_RING: Record<Tone, string> = { internal: "border-noir bg-lime/90", client: "border-noir bg-violet text-white" };


function ArtifactPreview({ kind }: { kind: ArtifactKind }) {
  switch (kind) {
    case "docStack":
      return (
        <div aria-hidden className="relative h-14 w-16">
          <span className="absolute left-0 top-3 h-10 w-12 rotate-[-6deg] rounded-md border-2 border-noir bg-mist" />
          <span className="absolute left-2 top-1 h-10 w-12 rotate-[3deg] rounded-md border-2 border-noir bg-paper" />
        </div>
      );
    case "docPair":
      return (
        <div aria-hidden className="flex h-14 items-end gap-2">
          <span className="flex h-12 w-9 flex-col gap-1 rounded-md border-2 border-noir bg-paper p-1.5">
            <span className="h-1.5 w-full rounded-full bg-noir/20" />
            <span className="h-1.5 w-3/4 rounded-full bg-noir/20" />
            <span className="h-1.5 w-full rounded-full bg-noir/20" />
          </span>
          <span className="flex h-14 w-9 flex-col gap-1 rounded-md border-2 border-noir bg-lime/40 p-1.5">
            <span className="h-1.5 w-full rounded-full bg-ink/30" />
            <span className="h-1.5 w-2/3 rounded-full bg-ink/30" />
            <span className="h-1.5 w-full rounded-full bg-ink/30" />
            <span className="h-1.5 w-1/2 rounded-full bg-ink/30" />
          </span>
        </div>
      );
    case "skillCard":
      return (
        <div aria-hidden className="h-14 w-24 rounded-md border-2 border-noir bg-paper p-2">
          <span className="mb-1.5 block h-1.5 w-2/3 rounded-full bg-violet/60" />
          <div className="flex flex-col gap-1">
            {[0.9, 0.7, 0.85, 0.5].map((w, i) => (
              <span key={i} className="h-1 rounded-full bg-noir/15" style={{ width: `${w * 100}%` }} />
            ))}
          </div>
        </div>
      );
    case "browserWindow":
      return (
        <div aria-hidden className="h-14 w-24 overflow-hidden rounded-md border-2 border-noir bg-paper">
          <div className="flex gap-1 border-b-2 border-noir bg-mist px-1.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-noir/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-noir/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-noir/25" />
          </div>
          <div className="flex flex-col gap-1 p-1.5">
            <span className="h-1.5 w-2/3 rounded-full bg-violet/40" />
            <span className="h-1 w-full rounded-full bg-noir/10" />
            <span className="h-1 w-4/5 rounded-full bg-noir/10" />
          </div>
        </div>
      );
    case "feedbackBubble":
      return (
        <div aria-hidden className="flex h-14 w-24 items-center justify-center gap-1.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-noir bg-paper text-[9px] font-bold">DS</span>
          <span className="text-base opacity-40">→</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-violet text-[9px] font-bold text-white">✓</span>
        </div>
      );
  }
}

/**
 * Schéma en colonne vertébrale : 5 étapes reliées par des flèches droites, sans croisement.
 * Un unique arc de retour boucle de la dernière étape vers Gouvernance, libellé explicitement.
 * Les connecteurs sont mesurés en pixels réels (pas de viewBox étiré) pour rester nets à
 * n'importe quelle largeur de conteneur. Chaque nœud reste cliquable : révèle sa décision
 * clé + un artefact abstrait, NDA-safe.
 */
export default function PipelineLoopDiagram({ className = "", lang = "fr" }: { className?: string; lang?: Lang }) {
  const [activeId, setActiveId] = useState<NodeId>("doc");
  const active = NODES.find((n) => n.id === activeId)!;
  const c = COPY[lang];

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const boxes = rowRefs.current.map((row) => {
        if (!row) return { x: 0, y: 0, w: 0, h: 0 };
        const r = row.getBoundingClientRect();
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
          w: r.width,
          h: r.height,
        };
      });
      setGeo({ width: containerRect.width, height: containerRect.height, boxes });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    // les items sont eux-mêmes mesurés (pas une grille supposée) : la rangée horizontale
    // reste juste même quand la liste passe à la ligne sur petit écran.
    return () => ro.disconnect();
  }, []);

  const pipelineSummary = c.summaryLead + NODES.map((n) => c.labels[n.id]).join(", ") + c.summaryTail;

  return (
    <VisualCard eyebrow={c.eyebrow} className={className}>
      <p className="mb-4 text-[13px] font-medium opacity-60">{c.hint}</p>
      <p className="sr-only">{pipelineSummary}</p>

      {/* pb réservé à l'arc de retour, qui passe désormais sous la rangée à toutes les tailles */}
      <div ref={containerRef} className="relative w-full pb-20">
        {geo && (
          <svg
            aria-hidden
            width={geo.width}
            height={geo.height}
            viewBox={`0 0 ${geo.width} ${geo.height}`}
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#131313" />
              </marker>
              <marker id="arrow-return" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#7C3AED" />
              </marker>
            </defs>

            {/* ---- Flèches entre étapes consécutives : de gauche à droite, bord à bord ----
                 Le tracé suit l'axe X tant que les deux nœuds sont sur la même rangée ; s'ils
                 passent à la ligne, il suit simplement la direction réelle entre les deux. */}
            {geo.boxes.slice(0, -1).map((a, i) => {
              const b = geo.boxes[i + 1];
              const vx = b.x - a.x;
              const vy = b.y - a.y;
              const len = Math.hypot(vx, vy) || 1;
              const ux = vx / len;
              const uy = vy / len;
              const from = edgePoint(a, ux, uy, 4);
              const to = edgePoint(b, -ux, -uy, 8);
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#131313"
                  strokeOpacity={0.35}
                  strokeWidth={2}
                  markerEnd="url(#arrow)"
                />
              );
            })}

            {/* ---- Arc de retour unique : Démonstrations clients → Gouvernance ----
                 Il sort sous la dernière bulle, longe la rangée par en dessous (droite → gauche)
                 et remonte dans Gouvernance. Le creux est calculé sous la bulle la plus basse. */}
            {(() => {
              const last = geo.boxes[4];
              const gov = geo.boxes[1];
              // Même rangée : l'arc passe dessous. Rangée cassée par le wrap (petit écran) :
              // il contourne par la gauche, sinon il traverserait les bulles intermédiaires.
              const sameRow = Math.abs(last.y - gov.y) < 8;
              const d = sameRow
                ? (() => {
                    const dip = Math.max(last.y + last.h / 2, gov.y + gov.h / 2) + 56;
                    const sx = last.x;
                    const sy = last.y + last.h / 2 + 4;
                    const ex = gov.x;
                    const ey = gov.y + gov.h / 2 + 8;
                    return `M ${sx} ${sy} C ${sx} ${dip}, ${ex} ${dip}, ${ex} ${ey}`;
                  })()
                : (() => {
                    const bend = geo.width * 0.32;
                    const sx = last.x - last.w / 2 - 4;
                    const ex = gov.x - gov.w / 2 - 8;
                    return `M ${sx} ${last.y} C ${sx - bend} ${last.y}, ${ex - bend} ${gov.y}, ${ex} ${gov.y}`;
                  })();
              return (
                <path
                  d={d}
                  fill="none"
                  stroke="#7C3AED"
                  strokeOpacity={0.55}
                  strokeWidth={2}
                  strokeDasharray="7 6"
                  markerEnd="url(#arrow-return)"
                />
              );
            })()}
          </svg>
        )}

        {/* Rangée horizontale à toutes les tailles ; wrap uniquement quand la place manque. */}
        <ol className="relative flex flex-row flex-wrap items-center justify-center gap-x-7 gap-y-12 sm:gap-x-9 sm:gap-y-14">
          {NODES.map((n, i) => (
            <li
              key={n.id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex h-16 items-center justify-center sm:h-[72px]"
            >
              <button
                type="button"
                onClick={() => setActiveId(n.id)}
                onMouseEnter={() => setActiveId(n.id)}
                aria-pressed={activeId === n.id}
                className={`whitespace-nowrap rounded-full border-2 px-5 py-2.5 text-[14px] font-semibold transition-all duration-300 ease-spring sm:px-6 sm:py-3 sm:text-[16px] ${
                  activeId === n.id ? `scale-110 shadow-paper ${TONE_RING[n.tone]}` : `${TONE_RING[n.tone]} opacity-80 hover:opacity-100`
                }`}
              >
                {c.labels[n.id]}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* ---- Note de l'arc de retour ---- */}
      <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-dashed border-violet/50 bg-mist/50 p-4">
        <span aria-hidden className="mt-0.5 text-base leading-none text-violet">↺</span>
        <p className="text-[13px] font-medium leading-relaxed opacity-80">
          <strong className="text-ink">{c.loopLead}</strong> {c.loop}
        </p>
      </div>

      {/* ---- Légende couleur ---- */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-noir/15 pt-4 text-[13px] font-medium opacity-75">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-lime" /> {c.legendSystem}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-violet" /> {c.legendProduct}
        </span>
      </div>

      {/* ---- Détail du nœud actif ---- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-5 flex flex-col gap-4 rounded-[14px] border border-noir/15 bg-mist/60 p-4 sm:flex-row sm:items-center"
        >
          <div className="flex shrink-0 items-center justify-center rounded-[14px] border border-noir/15 bg-paper/70 p-2">
            <ArtifactPreview kind={active.artifact} />
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 font-accent text-[9px] uppercase tracking-[0.08em] opacity-60">
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[active.tone]}`} />
              {c.tone[active.tone]}
            </p>
            <p className="mb-1.5 text-sm font-bold">{c.labels[active.id]}</p>
            <p className="text-[13px] leading-relaxed opacity-80">{c.decisions[active.id]}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </VisualCard>
  );
}
