// → Type : Server Component
// → Raison : fiche décorative, aucun état
import Tape from "../props/Tape";

/**
 * Fiche papier chiffrée, à poser dans une section de prose.
 * Même vocabulaire que les cartes de la section Résultats (beige, scotch, rotation),
 * mais utilisable au fil du texte quand le chiffre appartient au récit plutôt qu'au
 * bilan : un parti pris de protocole, pas un résultat.
 *
 * `note` = annotation manuscrite. Elle sort de la fiche et se pose sur le fond papier,
 * juste en dessous : on annote la page, on n'écrit pas sur l'objet posé dessus.
 */
export default function PaperStat({
  num,
  label,
  note,
  noteId,
  className = "",
}: {
  num: string;
  label: string;
  note?: string;
  /** Identifiant de la note, pour relier la fiche à son annotation. */
  noteId?: string;
  className?: string;
}) {
  return (
    <div className={`mt-2 max-w-[420px] ${className}`}>
      <div
        aria-describedby={note ? noteId : undefined}
        className="light-surface grain-multiply relative flex -rotate-1 flex-col gap-2 rounded-folder border-2 border-noir bg-beige p-6 text-ink shadow-paper"
      >
        <Tape color="lime" className="-top-[13px] left-1/2 -ml-12 -rotate-3" />
        <p className="relative z-[1] text-[clamp(30px,2.8vw,42px)] font-extrabold leading-none tracking-[-0.02em]">{num}</p>
        <p className="relative z-[1] text-[14.5px] font-medium leading-snug opacity-90">{label}</p>
      </div>
      {note && (
        <p id={noteId} className="note-marge">
          {note}
        </p>
      )}
    </div>
  );
}
