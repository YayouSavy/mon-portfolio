// → Type : Server Component
// → Raison : reconstitution décorative pure, aucun état
import type { ReactNode } from "react";
import { ChevronLeft, X, Upload, Plus } from "lucide-react";
import PhoneFrame from "../PhoneFrame";
import type { Lang } from "../../../lib/i18n";

/* Les libellés d'interface du produit mocké. Ce sont des libellés de produit, pas des
   annotations : ils suivent la langue de la page comme le reste du contenu. */
const COPY = {
  fr: {
    s1: "Réglages", s2: "Menu commercial", s3: "Branding",
    account: "Mon compte", profiles: "Mes profils eSIM", notifications: "Notifications",
    language: "Langue", help: "Aide et contact", admin: "Admin", signOut: "Déconnexion",
    adminNote: "Appui simple. Aucun geste caché : un libellé qui ne dit rien à un prospect.",
    demoMode: "Mode démonstration",
    activeConfig: "Configuration active",
    activeValue: "Nomad · Thème neutre · 2 raccourcis",
    before: "Avant le rendez-vous", during: "Pendant la démo",
    operator: "Opérateur", branding: "Branding", priceGrid: "Grille tarifaire",
    operatorValue: "Nomad ›", brandingValue: "Neutre ›", priceValue: "Standard ›",
    skipOnboarding: "Passer l'onboarding", skipIdentity: "Passer la vérification d'identité",
    resetTitle: "Réinitialiser la démonstration",
    resetBody: "Supprime les profils, commandes et le compte",
    logo: "Logo", logoFormats: "SVG ou PNG",
    primaryColor: "Couleur principale", preview: "Aperçu",
    choosePlan: "Choisir ce forfait",
    contrast: "Contraste 4.1:1, libellés basculés en foncé pour atteindre 4.5:1",
    saveLibrary: "Enregistrer dans la bibliothèque",
  },
  en: {
    s1: "Settings", s2: "Sales menu", s3: "Branding",
    account: "My account", profiles: "My eSIM profiles", notifications: "Notifications",
    language: "Language", help: "Help and contact", admin: "Admin", signOut: "Sign out",
    adminNote: "A single tap. No hidden gesture: a label that means nothing to a prospect.",
    demoMode: "Demo mode",
    activeConfig: "Active configuration",
    activeValue: "Nomad · Neutral theme · 2 shortcuts",
    before: "Before the meeting", during: "During the demo",
    operator: "Operator", branding: "Branding", priceGrid: "Price grid",
    operatorValue: "Nomad ›", brandingValue: "Neutral ›", priceValue: "Standard ›",
    skipOnboarding: "Skip onboarding", skipIdentity: "Skip identity verification",
    resetTitle: "Reset the demo",
    resetBody: "Deletes profiles, orders and the account",
    logo: "Logo", logoFormats: "SVG or PNG",
    primaryColor: "Primary colour", preview: "Preview",
    choosePlan: "Choose this plan",
    contrast: "Contrast 4.1:1, labels switched to dark to reach 4.5:1",
    saveLibrary: "Save to library",
  },
} as const;

/**
 * Demo Kit — couche commerciale (reconstitution neutre sur « Nomad », opérateur fictif).
 * Trois écrans : réglages avec l'entrée « Admin », menu commercial, personnalisation du branding.
 * Pas de geste caché : l'accès est une ligne de réglages comme une autre, en appui simple.
 * Couleurs en dur : ce sont celles du thème neutre du produit mocké, pas du site.
 */

function Screen({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-center font-accent text-[10px] uppercase tracking-[0.1em] text-ink/50">
        {step} · {title}
      </p>
      <PhoneFrame>
        <div className="flex min-h-[560px] flex-col bg-[#0E0E10] p-3">{children}</div>
      </PhoneFrame>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1.5 text-[10px] text-[#6E6E76]">{children}</p>;
}

function Row({ label, value, last }: { label: string; value?: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-2.5 py-2.5 ${last ? "" : "border-b border-[#2A2A2E]"}`}>
      <span className="max-w-[60%] text-[11px] leading-snug text-[#E8E8EA]">{label}</span>
      {value && <span className="text-[11px] text-[#8E8E96]">{value}</span>}
    </div>
  );
}

function Toggle() {
  return (
    <span className="inline-flex h-4 w-7 shrink-0 items-center justify-end rounded-full bg-[#4A9E7A] px-0.5" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#F5F5F5]" />
    </span>
  );
}

const SWATCHES = ["#7F77DD", "#185FA5", "#993C1D", "#3B6D11"];
const ACTIVE = "#185FA5";

/**
 * `part` sépare les deux schémas : l'arborescence du menu (écrans 1 et 2) accompagne le
 * paragraphe sur l'emplacement du pilotage, le panneau Branding (écran 3) celui sur le
 * thème neutre. Les afficher ensemble faisait arriver le branding deux paragraphes trop tôt.
 */
export default function DemoKitSalesMenu({
  part = "all",
  lang = "fr",
}: {
  part?: "menu" | "branding" | "all";
  lang?: Lang;
}) {
  const c = COPY[lang];

  if (part === "branding") {
    return (
      <div className="grid grid-cols-1 sm:max-w-[260px]">
        <BrandingScreen lang={lang} />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-8 ${part === "menu" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
      {/* 1 — Réglages : l'entrée « Admin », groupée à part, en appui simple */}
      <Screen step="1" title={c.s1}>
        <div className="mb-3.5 flex items-center gap-1.5">
          <ChevronLeft aria-hidden size={15} strokeWidth={2} className="text-[#F5F5F5]" />
          <span className="text-[13px] text-[#F5F5F5]">{c.s1}</span>
        </div>
        <div className="overflow-hidden rounded-[10px] bg-[#1A1A1D]">
          <Row label={c.account} />
          <Row label={c.profiles} />
          <Row label={c.notifications} />
          <Row label={c.language} />
          <Row label={c.help} last />
        </div>

        {/* Groupe isolé : l'emplacement fait le travail, pas le geste. */}
        <div className="mt-3.5 overflow-hidden rounded-[10px] bg-[#1A1A1D]">
          <Row label={c.admin} value="›" last />
        </div>
        <p className="mt-2 text-[11px] leading-snug text-[#6E6E76]">{c.adminNote}</p>

        <div className="mt-auto pt-3.5">
          <div className="flex items-center justify-between rounded-[10px] bg-[#1A1A1D] px-2.5 py-2.5">
            <span className="text-[11px] text-[#E8E8EA]">{c.signOut}</span>
          </div>
        </div>
      </Screen>

      {/* 2 — Menu commercial : trois groupes + état actif */}
      <Screen step="2" title={c.s2}>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] text-[#F5F5F5]">{c.demoMode}</span>
          <X aria-hidden size={15} strokeWidth={2} className="text-[#A0A0A6]" />
        </div>

        <div className="mb-3.5 rounded-[10px] border border-[#2F5646] bg-[#1E2A24] px-2.5 py-2.5">
          <p className="mb-0.5 text-[10px] text-[#7FC0A4]">{c.activeConfig}</p>
          <p className="text-[11px] leading-snug text-[#DCEFE6]">{c.activeValue}</p>
        </div>

        <SectionLabel>{c.before}</SectionLabel>
        <div className="mb-3.5 overflow-hidden rounded-[10px] bg-[#1A1A1D]">
          <Row label={c.operator} value={c.operatorValue} />
          <Row label={c.branding} value={c.brandingValue} />
          <Row label={c.priceGrid} value={c.priceValue} last />
        </div>

        <SectionLabel>{c.during}</SectionLabel>
        <div className="mb-3.5 overflow-hidden rounded-[10px] bg-[#1A1A1D]">
          <div className="flex items-center justify-between border-b border-[#2A2A2E] px-2.5 py-2.5">
            <span className="text-[11px] text-[#E8E8EA]">{c.skipOnboarding}</span>
            <Toggle />
          </div>
          <div className="flex items-center justify-between px-2.5 py-2.5">
            <span className="max-w-[60%] text-[11px] leading-snug text-[#E8E8EA]">{c.skipIdentity}</span>
            <Toggle />
          </div>
        </div>

        <div className="rounded-[10px] border border-[#5A2B2E] bg-[#2A1618] px-2.5 py-2.5">
          <p className="mb-0.5 text-[11px] text-[#F0A9A9]">{c.resetTitle}</p>
          <p className="text-[10px] leading-snug text-[#A87A7C]">{c.resetBody}</p>
        </div>
      </Screen>

      {part === "all" && <BrandingScreen lang={lang} />}
    </div>
  );
}

/* 3 — Branding : aperçu en direct + garde-fou de contraste */
function BrandingScreen({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
      <Screen step="3" title={c.s3}>
        <div className="mb-3.5 flex items-center gap-1.5">
          <ChevronLeft aria-hidden size={15} strokeWidth={2} className="text-[#F5F5F5]" />
          <span className="text-[13px] text-[#F5F5F5]">{c.s3}</span>
        </div>

        <SectionLabel>{c.logo}</SectionLabel>
        <div className="mb-3.5 rounded-[10px] border border-dashed border-[#3A3A40] bg-[#1A1A1D] p-3.5 text-center">
          <Upload aria-hidden size={18} strokeWidth={1.6} className="mx-auto text-[#8E8E96]" />
          <p className="mt-1 text-[10px] text-[#8E8E96]">{c.logoFormats}</p>
        </div>

        <SectionLabel>{c.primaryColor}</SectionLabel>
        <div className="mb-3.5 flex gap-1.5">
          {SWATCHES.map((hex) => (
            <span
              key={hex}
              style={{ background: hex }}
              className={`h-6 w-6 rounded-md ${hex === ACTIVE ? "outline outline-2 outline-offset-1 outline-[#F5F5F5]" : ""}`}
            />
          ))}
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#3A3A40] bg-[#1A1A1D]">
            <Plus aria-hidden size={12} strokeWidth={2} className="text-[#8E8E96]" />
          </span>
        </div>

        <SectionLabel>{c.preview}</SectionLabel>
        <div className="mb-3 rounded-[10px] bg-[#1A1A1D] p-2.5">
          <div className="mb-2 h-1.5 w-[55%] rounded-full bg-[#3A3A40]" />
          <div className="mb-3 h-1.5 w-[35%] rounded-full bg-[#3A3A40]" />
          <div style={{ background: ACTIVE }} className="rounded-lg py-1.5 text-center text-[11px] text-white">
            {c.choosePlan}
          </div>
        </div>

        <div className="mb-3 rounded-[10px] border border-[#5A4A1E] bg-[#2A2213] px-2.5 py-2.5">
          <p className="text-[10px] leading-relaxed text-[#E0B65C]">
            {c.contrast}
          </p>
        </div>

        <div className="rounded-lg border border-[#3A3A40] py-2 text-center text-[11px] text-[#E8E8EA]">
          {c.saveLibrary}
        </div>
      </Screen>
  );
}
