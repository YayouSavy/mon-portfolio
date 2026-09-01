// → Type : Server Component
// → Raison : décoratif pur, aucun état
import type { ReactNode } from "react";

/**
 * Marqueur visuel pour un blanc encore à combler dans une étude de cas (donnée réelle
 * manquante : durée, métrique, contenu à rédiger). Volontairement voyant, pour qu'un blanc
 * ne se glisse pas en prod sans qu'on l'ait vu.
 */
export default function Placeholder({ children, block = false }: { children: ReactNode; block?: boolean }) {
  if (block) {
    return (
      <p className="rounded-[14px] border border-dashed border-violet/40 bg-violet/5 px-3 py-2 text-[13px] italic leading-relaxed text-ink/55">
        {children}
      </p>
    );
  }
  return <span className="whitespace-nowrap rounded bg-violet/10 px-1 py-0.5 italic text-ink/55">[{children}]</span>;
}
