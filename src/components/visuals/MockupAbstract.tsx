// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import VisualCard from "./VisualCard";

/**
 * Reconstitution générique d'une UI dense (eSIM Boost) ou d'un composant codé
 * (Design-to-code) : structure réelle, données et libellés fictifs — NDA-safe.
 */
export default function MockupAbstract({
  density,
  labels,
  className = "",
}: {
  density: "list" | "grid";
  labels: string[];
  className?: string;
}) {
  return (
    <VisualCard className={className}>
      <div aria-hidden className="mb-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-noir/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-noir/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-noir/20" />
      </div>

      {density === "grid" ? (
        <div>
          <div className="mb-2.5 grid grid-cols-4 gap-2">
            {labels.map((l) => (
              <p key={l} className="truncate font-accent text-[9px] uppercase tracking-[0.06em] opacity-70">
                {l}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, row) => (
              <div key={row} className="grid grid-cols-4 gap-2">
                {labels.map((_, col) => (
                  <span key={col} aria-hidden className={`h-3 rounded-full bg-noir/10 ${col === 0 ? "w-4/5" : ""}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, row) => (
            <li key={row} className="flex items-center gap-3 border-b border-noir/10 pb-3 last:border-0 last:pb-0">
              <span aria-hidden className="h-8 w-8 shrink-0 rounded-lg bg-noir/10" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{labels[row % labels.length]}</span>
                <span aria-hidden className="mt-1.5 block h-2 w-2/3 rounded-full bg-noir/10" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </VisualCard>
  );
}
