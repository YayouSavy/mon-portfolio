// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import VisualCard from "./VisualCard";

const SWATCHES = [
  { label: "Accent 1", className: "bg-lime" },
  { label: "Accent 2", className: "bg-violet" },
  { label: "Neutre clair", className: "bg-paper border border-noir/15" },
  { label: "Neutre foncé", className: "bg-noir" },
];

const SPACING = [4, 8, 12, 16, 24];

/** Mini fiche de tokens : couleurs, échelle typo, échelle d'espacement (libellés génériques). */
export default function DSTokenSheet({ className = "" }: { className?: string }) {
  return (
    <VisualCard eyebrow="Fiche tokens" className={className}>
      <div className="mb-5 flex gap-2.5">
        {SWATCHES.map((s) => (
          <span key={s.label} className="flex flex-col items-center gap-1.5">
            <span aria-hidden className={`h-9 w-9 rounded-full ${s.className}`} />
            <span className="text-[9px] font-medium opacity-70">{s.label}</span>
          </span>
        ))}
      </div>

      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.08em] opacity-70">Échelle typographique</p>
      <div aria-hidden className="mb-5 flex items-baseline gap-3">
        <span className="text-lg font-extrabold">Aa</span>
        <span className="text-2xl font-extrabold">Aa</span>
        <span className="text-3xl font-extrabold">Aa</span>
      </div>

      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.08em] opacity-70">Espacements</p>
      <div aria-hidden className="flex items-end gap-1.5">
        {SPACING.map((h) => (
          <span key={h} className="w-3 rounded-t-sm bg-noir/15" style={{ height: h }} />
        ))}
      </div>
    </VisualCard>
  );
}
