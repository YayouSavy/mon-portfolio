// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import TableComparator from "./TableComparator";
import type { Lang } from "../../../lib/i18n";

const COPY = {
  fr: {
    eyebrow: "Design system × IA : le problème en une image",
    title: "Rendre explicites les règles implicites",
    scope:
      "Démonstration sur « Nimbus », un design system fictif que j'ai créé pour illustrer le principe sans divulguer celui de Thales.",
    rule: "Voir la règle telle que la machine la lit",
  },
  en: {
    eyebrow: "Design system × AI: the problem in one image",
    title: "Making implicit rules explicit",
    scope:
      "Demonstrated on « Nimbus », a fictional design system I created to illustrate the principle without disclosing the Thales one.",
    rule: "See the rule as the machine reads it",
  },
} as const;

/**
 * Réservé à la note de méthode /notes/design-system-ia.
 *
 * Comparateur avant/après interactif sur un design system fictif ("Nimbus"), pour montrer
 * concrètement ce que veut dire tenir un système sans reproduire quoi que ce soit du DS
 * Thales. Palette et tokens sont inventés et scopés en variables CSS locales (--nimbus-*),
 * sans rapport avec les tokens du portfolio.
 *
 * Le texte d'accroche vit désormais dans le chapô et la section « Le problème » de la page :
 * le composant ne garde que sa mention de périmètre et sa démonstration.
 */
export default function NimbusCaseNote({ lang = "fr" }: { lang?: Lang }) {
  const c = COPY[lang];

  return (
    <div
      style={
        {
          "--nimbus-primary": "#3654FF",
          "--nimbus-positive": "#1F9D55",
          "--nimbus-warning": "#C77800",
          "--nimbus-danger": "#D63A3A",
          "--nimbus-info": "#2A8FBD",
        } as React.CSSProperties
      }
      className="light-surface grain-multiply relative rounded-folder border-2 border-noir bg-paper p-7 text-ink shadow-paper md:p-9"
    >
      <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
        {c.eyebrow}
      </p>
      <h3 className="mb-3 text-[clamp(22px,2.6vw,30px)] font-extrabold uppercase tracking-[-0.01em]">
        {c.title}
      </h3>
      <p className="mb-6 max-w-[68ch] text-[13px] italic leading-relaxed opacity-60">
        {c.scope}
      </p>

      <TableComparator lang={lang} />

      <details className="mt-6 overflow-hidden rounded-folder border-2 border-noir bg-paper shadow-paper">
        <summary className="cursor-pointer list-none px-4 py-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-70 marker:content-none">
          {c.rule}
        </summary>
        <div className="border-t border-noir/15 bg-mist/60">
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-ink"><code>{`RULE action-hierarchy
  max_primary_per_view: 1        # une seule action attendue
  secondary: outline             # jamais seule, accompagne un primary
  tertiary: text-only            # faible emphase, non bloquante
  enforce: on_generate, on_review

RULE no-foreign-table
  forbid:
    - elevation > 0              # Nimbus est plat : bordures uniquement
    - color: outside(tokens)     # pas de bleu Material hors palette
    - avatar.shape: circle       # avatars carrés à coins arrondis
    - pagination: default        # utiliser le composant Nimbus
    - status: chip               # statut = badge point-coloré + libellé
  on_violation: block, explain`}</code></pre>
        </div>
      </details>
    </div>
  );
}
