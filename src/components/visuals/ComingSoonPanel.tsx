// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import Tape from "../props/Tape";

/** Traitement volontairement sourd (flouté, mist) pour un dossier pas encore prêt à publier. */
export default function ComingSoonPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-folder border-2 border-noir/30 bg-mist p-5 text-ink shadow-paper md:p-7 ${className}`}>
      <Tape label="dossier en préparation" className="-top-[13px] left-1/2 -ml-[76px] -rotate-2" />
      <div aria-hidden className="flex flex-col gap-2.5 opacity-40 blur-[1.5px]">
        <span className="h-2.5 w-4/5 rounded-full bg-noir/25" />
        <span className="h-2.5 w-full rounded-full bg-noir/25" />
        <span className="h-2.5 w-3/5 rounded-full bg-noir/25" />
        <span className="h-2.5 w-2/3 rounded-full bg-noir/25" />
      </div>
      <p className="relative z-[1] mt-6 text-sm font-medium opacity-70">Contenu à venir.</p>
    </div>
  );
}
