// → Type : Server Component
// → Raison : affichage pur, réutilisé pour les listes à puce des sections de dossier
export default function PlaceholderList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
