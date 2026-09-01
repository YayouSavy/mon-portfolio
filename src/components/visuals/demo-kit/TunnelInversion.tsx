"use client";
// → Type : Client Component
// → Raison : étape active au clic (useState)

import { useState } from "react";
import type { Lang } from "../../../lib/i18n";

/**
 * Schéma d'inversion du tunnel d'achat — dossier Demo Kit.
 * Même vocabulaire visuel que « Pipeline design system → skills IA » : surface papier,
 * pills bordées noir, lime = étape inchangée, violet = étape déplacée.
 * Les écrans de vérification d'identité ne sont pas montrables : le schéma les remplace.
 */

type StepKey = "destination" | "forfait" | "identite" | "paiement" | "telechargement";

/* L'ordre des étapes et le fait qu'elles bougent sont structurels : ils ne dépendent pas
   de la langue. Seuls les libellés et les explications sont traduits. */
const MOVED: Record<StepKey, boolean> = {
  destination: false,
  forfait: false,
  identite: true,
  paiement: true,
  telechargement: false,
};

const ORDER_BEFORE: StepKey[] = ["destination", "forfait", "paiement", "identite", "telechargement"];
const ORDER_AFTER: StepKey[] = ["destination", "forfait", "identite", "paiement", "telechargement"];

type Copy = {
  eyebrow: string;
  hint: string;
  srSummary: string;
  before: { eyebrow: string; title: string };
  after: { eyebrow: string; title: string };
  tradeoffLead: string;
  tradeoff: string;
  legendUnchanged: string;
  legendMoved: string;
  labels: Record<StepKey, string>;
  details: Record<StepKey, string>;
};

const COPY: Record<Lang, Copy> = {
  fr: {
    eyebrow: "Décision clé · inversion du tunnel d'achat",
    hint: "Cliquez une étape pour voir ce qu'elle coûte et ce qu'elle rapporte.",
    srSummary:
      "Deux parcours comparés. Parcours d'origine, dans l'ordre : destination, forfait, paiement, vérification d'identité, téléchargement du profil. Parcours livré, dans l'ordre : destination, forfait, vérification d'identité, paiement, téléchargement du profil. Les étapes de paiement et de vérification d'identité ont été inversées.",
    before: { eyebrow: "Avant", title: "Parcours d'origine" },
    after: { eyebrow: "Après", title: "Parcours livré" },
    tradeoffLead: "Deux étapes inversées, rien d'autre :",
    tradeoff:
      "la même objection est revenue des six commerciaux et des tests guérilla. Payer sans savoir si la vérification aboutira est anxiogène.",
    legendUnchanged: "Étape inchangée",
    legendMoved: "Étape déplacée",
    labels: {
      destination: "Destination",
      forfait: "Forfait",
      identite: "Vérification d'identité",
      paiement: "Paiement",
      telechargement: "Téléchargement du profil",
    },
    details: {
      identite:
        "Étape la plus lourde du parcours. Placée avant le paiement, elle fait remonter les abandons dans le tunnel, sur un utilisateur qui n'a encore rien investi.",
      paiement:
        "Personne ne paie pour un service qu'il ne pourra peut-être pas activer. L'opérateur n'absorbe ni remboursement ni client perdu.",
      destination: "Point d'entrée inchangé : l'utilisateur choisit le pays de destination avant tout le reste.",
      forfait: "Sélection du volume de données et de la durée. Inchangée entre les deux versions.",
      telechargement: "Installation réelle du profil eSIM sur le téléphone. Inchangée entre les deux versions.",
    },
  },
  en: {
    eyebrow: "Key decision · inverting the purchase funnel",
    hint: "Click a step to see what it costs and what it returns.",
    srSummary:
      "Two journeys compared. Original journey, in order: destination, plan, payment, identity verification, profile download. Delivered journey, in order: destination, plan, identity verification, payment, profile download. The payment and identity verification steps have been swapped.",
    before: { eyebrow: "Before", title: "Original journey" },
    after: { eyebrow: "After", title: "Delivered journey" },
    tradeoffLead: "Two steps swapped, nothing else:",
    tradeoff:
      "the same objection came back from all six salespeople and from guerrilla testing. Paying without knowing whether verification will succeed is unsettling.",
    legendUnchanged: "Unchanged step",
    legendMoved: "Moved step",
    labels: {
      destination: "Destination",
      forfait: "Plan",
      identite: "Identity verification",
      paiement: "Payment",
      telechargement: "Profile download",
    },
    details: {
      identite:
        "The heaviest step in the journey. Placed before payment, it pushes drop-off further up the funnel, onto a user who hasn't yet invested anything.",
      paiement:
        "Nobody pays for a service they may not be able to activate. The operator absorbs neither a refund nor a lost client.",
      destination: "Unchanged entry point: the user picks the destination country before anything else.",
      forfait: "Choosing the data allowance and the duration. Unchanged between the two versions.",
      telechargement: "Actually installing the eSIM profile on the phone. Unchanged between the two versions.",
    },
  },
};

export default function TunnelInversion({ className = "", lang = "fr" }: { className?: string; lang?: Lang }) {
  const [active, setActive] = useState<StepKey>("identite");
  const c = COPY[lang];

  const flows = [
    { id: "avant", ...c.before, order: ORDER_BEFORE, muted: true },
    { id: "apres", ...c.after, order: ORDER_AFTER, muted: false },
  ];

  return (
    <div
      className={`light-surface grain-multiply relative rounded-folder border-2 border-noir bg-mist p-5 text-ink shadow-paper md:p-7 ${className}`}
    >
      <p className="relative z-[1] mb-4 font-accent text-[10px] uppercase tracking-[0.1em] opacity-70">{c.eyebrow}</p>

      <div className="relative z-[1]">
        <p className="mb-6 text-[13px] font-medium opacity-60">{c.hint}</p>

        <p className="sr-only">{c.srSummary}</p>

        <div className="flex flex-col gap-8">
          {flows.map((flow) => (
            <section key={flow.id} aria-label={flow.title}>
              <p className="mb-3 flex items-baseline gap-2">
                <span className="font-accent text-[9px] uppercase tracking-[0.08em] opacity-60">{flow.eyebrow}</span>
                <span className={`text-sm font-bold ${flow.muted ? "opacity-50 line-through" : ""}`}>
                  {flow.title}
                </span>
              </p>

              <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {flow.order.map((key, i) => {
                  const isActive = active === key;
                  const highlight = MOVED[key] && !flow.muted;

                  return (
                    <li key={key} className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActive(key)}
                        className={[
                          "whitespace-nowrap rounded-full border-2 border-noir px-3 py-1.5 text-[12px] font-semibold",
                          "transition-all duration-300 ease-spring sm:px-4 sm:py-2 sm:text-[14px]",
                          highlight ? "bg-violet text-white" : "bg-lime/90 text-ink",
                          flow.muted ? "opacity-45" : "",
                          isActive && !flow.muted ? "scale-105 shadow-paper" : "hover:opacity-100",
                        ].join(" ")}
                      >
                        {c.labels[key]}
                      </button>

                      {i < flow.order.length - 1 && (
                        <span
                          aria-hidden
                          className={`text-base leading-none ${flow.muted ? "opacity-25" : "opacity-40"}`}
                        >
                          →
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        {/* ---- Note d'arbitrage ---- */}
        <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-dashed border-violet/50 bg-paper/60 p-4">
          <span aria-hidden className="mt-0.5 text-base leading-none text-violet">
            ⇄
          </span>
          <p className="text-[13px] font-medium leading-relaxed opacity-80">
            <strong className="text-ink">{c.tradeoffLead}</strong> {c.tradeoff}
          </p>
        </div>

        {/* ---- Légende couleur ---- */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-noir/15 pt-4 text-[13px] font-medium opacity-75">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-lime" /> {c.legendUnchanged}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-violet" /> {c.legendMoved}
          </span>
        </div>

        {/* ---- Détail de l'étape active ---- */}
        <div className="mt-5 rounded-[14px] border border-noir/15 bg-paper/70 p-4">
          <p className="mb-1.5 text-sm font-bold">{c.labels[active]}</p>
          <p className="text-[13px] leading-relaxed opacity-80">{c.details[active]}</p>
        </div>
      </div>
    </div>
  );
}
