// → Type : Server Component
// → Raison : chrome partagé des visuels de dossier (fiche papier + grain), aucun état
import type { ReactNode } from "react";

/**
 * Carte "fiche papier" commune aux visuels de dossier (PipelineDiagram, MockupAbstract,
 * JourneyMap, DSTokenSheet, BeforeAfterAdoption). Garde les 5 alignés visuellement.
 */
export default function VisualCard({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`light-surface grain-multiply relative overflow-hidden rounded-folder border-2 border-noir bg-paper p-5 text-ink shadow-paper md:p-7 ${className}`}
    >
      {eyebrow && (
        <p className="relative z-[1] mb-4 font-accent text-[10px] uppercase tracking-[0.1em] opacity-70">{eyebrow}</p>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
