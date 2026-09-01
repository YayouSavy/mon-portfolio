// → Type : Server Component
// → Raison : affichage pur
import type { ReactNode } from "react";

export default function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(40px,6.4vw,88px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

/** Mot accentué en violet plein (contraste AA sur fond clair). */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-violet">{children}</span>;
}

/** Mot en contour violet (signature de la section Dossiers). */
export function Outline({ children }: { children: ReactNode }) {
  return <span className="text-transparent [-webkit-text-stroke:2px_#642AEE]">{children}</span>;
}
