// → Type : Server Component
// → Raison : décoratif pur, aucun état
import VisualCard from "./VisualCard";

/** Vrai schéma (SVG fourni), encadré comme les autres visuels de dossier, jamais recadré. */
export default function DiagramVisual({
  src,
  alt,
  eyebrow,
  className = "",
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <VisualCard eyebrow={eyebrow} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG local, pas d'optimisation next/image nécessaire */}
      <img src={src} alt={alt} className="h-auto w-full" />
    </VisualCard>
  );
}
