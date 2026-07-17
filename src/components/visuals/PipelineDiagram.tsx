// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import VisualCard from "./VisualCard";

/**
 * Le "hero visual" du dossier Design-to-code : DS → Skills IA → Agent IA → Proto codé.
 * Les libellés sont du vrai texte (lisible en lecteur d'écran) ; seuls les connecteurs
 * et le badge numéroté sont décoratifs.
 */
export default function PipelineDiagram({
  steps,
  highlight,
  className = "",
}: {
  steps: string[];
  highlight?: number;
  className?: string;
}) {
  return (
    <VisualCard eyebrow="Pipeline design-to-code" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-4">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full border-2 border-noir px-4 py-2.5 text-sm font-semibold ${
                i === highlight ? "bg-violet text-white" : "bg-white/70"
              }`}
            >
              <span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-noir text-[11px] font-bold text-lime">
                {i + 1}
              </span>
              {step}
            </span>
            {i < steps.length - 1 && <span aria-hidden className="text-lg opacity-50">→</span>}
          </li>
        ))}
      </ol>
    </VisualCard>
  );
}
