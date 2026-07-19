// → Type : Server Component
// → Raison : chrome décoratif pur, l'état interactif vit dans EriosPreview
import type { ReactNode } from "react";

/** Coque de téléphone générique — contenu scrollable à l'intérieur. */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[300px] max-w-full">
      <div className="relative overflow-hidden rounded-[2.75rem] border-[10px] border-noir bg-noir shadow-paper-lift">
        <div aria-hidden className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-noir" />
        <div className="relative h-[640px] overflow-y-auto overscroll-contain rounded-[2rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-white/40"
        />
      </div>
    </div>
  );
}
