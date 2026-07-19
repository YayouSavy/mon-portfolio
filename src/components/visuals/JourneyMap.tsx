// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import VisualCard from "./VisualCard";

/** Frise des étapes de recherche terrain, façon post-its reliés par un fil. */
export default function JourneyMap({ stages, className = "" }: { stages: string[]; className?: string }) {
  return (
    <VisualCard eyebrow="Parcours de recherche" className={className}>
      <ol className="flex flex-wrap gap-3">
        {stages.map((stage, i) => (
          <li key={stage} className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border-2 border-noir bg-lime px-4 py-2 text-xs font-semibold">
              <span aria-hidden className="text-[10px] opacity-75">
                {String(i + 1).padStart(2, "0")}
              </span>
              {stage}
            </span>
            {i < stages.length - 1 && <span aria-hidden className="h-px w-5 bg-noir/25" />}
          </li>
        ))}
      </ol>
    </VisualCard>
  );
}
