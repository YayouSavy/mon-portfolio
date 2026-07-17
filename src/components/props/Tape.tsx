// → Type : Server Component
// → Raison : décoratif pur, aucun état ni événement

const COLORS = {
  lime: "bg-lime/90",
  paper: "bg-paper/80",
} as const;

/**
 * Morceau de scotch. Sans label : simple bande 96x27.
 * Avec label : étiquette façon "( about me )" de la référence.
 * Positionne-le via className : "-top-[13px] left-1/2 -ml-12 -rotate-3"
 */
export default function Tape({
  color = "lime",
  label,
  className = "",
}: {
  color?: keyof typeof COLORS;
  label?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-[4] shadow-[0_2px_6px_rgba(0,0,0,0.3)] [clip-path:polygon(3%_0,100%_5%,97%_100%,0_95%)] ${COLORS[color]} ${
        label
          ? "flex h-[30px] items-center px-4 font-accent text-[10px] uppercase tracking-[0.08em] text-ink"
          : "h-[27px] w-24"
      } ${className}`}
    >
      {label}
      {/* grain papier, clippé par le clip-path du parent */}
      <span className="absolute inset-0 bg-[image:var(--grain)] opacity-40 mix-blend-multiply" />
    </span>
  );
}
