// → Type : Server Component
// → Raison : objet décoratif, aucun état

/**
 * L'objet posé en tête de dossier.
 *
 * L'accueil est un bureau : Polaroid, carte de designer, tache de café. Le dossier est
 * une page qu'on annote. Un objet, un seul, fait la transition entre les deux métaphores
 * sans réimporter tout le bureau dans l'étude de cas.
 *
 * Purement décoratif : aria-hidden, aucune information n'y est portée.
 */
const PROPS = {
  /* eSIM Simple — l'écran : le produit a été prototypé en code, pas en maquette. */
  screen: (
    <svg viewBox="0 0 84 72" className="h-full w-full" fill="none">
      <rect x="3" y="4" width="78" height="56" rx="7" className="fill-paper stroke-noir" strokeWidth="3" />
      <path d="M3 18h78" className="stroke-noir" strokeWidth="3" />
      <circle cx="12" cy="11" r="2.4" className="fill-noir" />
      <circle cx="21" cy="11" r="2.4" className="fill-noir" />
      <path d="M28 32l-7 7 7 7M56 32l7 7-7 7M47 29l-10 21" className="stroke-noir" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 60v6M53 60v6M26 68h32" className="stroke-noir" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  /* Customer Services Portal — le carnet d'entretiens : 26 head CS, deux ateliers. */
  field: (
    <svg viewBox="0 0 72 84" className="h-full w-full" fill="none">
      <rect x="4" y="10" width="64" height="70" rx="6" className="fill-paper stroke-noir" strokeWidth="3" />
      <path d="M18 24h36M18 36h36M18 48h24M18 60h30" className="stroke-noir" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M20 4v12M36 4v12M52 4v12" className="stroke-noir" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="10" r="4" className="fill-lime stroke-noir" strokeWidth="2.5" />
      <circle cx="36" cy="10" r="4" className="fill-lime stroke-noir" strokeWidth="2.5" />
      <circle cx="52" cy="10" r="4" className="fill-lime stroke-noir" strokeWidth="2.5" />
    </svg>
  ),
  /* Demo Kit — le téléphone : l'outil vit dans la poche d'un commercial en déplacement. */
  mobile: (
    <svg viewBox="0 0 60 84" className="h-full w-full" fill="none">
      <rect x="4" y="4" width="52" height="76" rx="10" className="fill-paper stroke-noir" strokeWidth="3" />
      <rect x="11" y="16" width="38" height="46" rx="4" className="fill-lime stroke-noir" strokeWidth="2.5" />
      <path d="M24 10h12" className="stroke-noir" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="71" r="4" className="stroke-noir" strokeWidth="2.5" />
    </svg>
  ),
} as const;

export type CaseStudyPropKind = keyof typeof PROPS;

export default function CaseStudyProp({ kind }: { kind: CaseStudyPropKind }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-0 -top-2 hidden h-[72px] w-[72px] -rotate-[7deg] select-none opacity-90 drop-shadow-[0_3px_0_rgba(0,0,0,0.12)] sm:block"
    >
      {PROPS[kind]}
    </span>
  );
}
