// → Type : Server Component
// → Raison : lecteur vidéo natif + texte, aucun état React

import type { Lang } from "../../../lib/i18n";

/* Chemin encodé : le dossier et le fichier contiennent des espaces. */
const VIDEO = "/esim%20boost/VIDEO%20Process%201.mp4";

const COPY = {
  fr: {
    eyebrow: "Nomad · opérateur fictif",
    title: "Le parcours d'achat sur « Nomad », un opérateur inventé",
    intro:
      "Aucune marque, aucun client ni aucune interface réels n'y figurent. Les écrans de configuration réservés aux commerciaux ne sont pas montrables : ils sont restitués sous forme de schéma, dans la section « Deux autres décisions ».",
    cutLead: "La vérification d'identité est coupée du montage.",
    cut:
      "Cette brique appartient à Thales et ne peut pas être diffusée. Elle s'intercale entre le forfait et le paiement, à l'emplacement décidé en section « La décision clé ».",
    fallback:
      "Votre navigateur ne peut pas lire cette vidéo. Elle montre le parcours d'achat et d'activation d'un profil eSIM, de la destination au téléchargement.",
    caption: "Parcours complet, du choix de la destination au téléchargement du profil.",
  },
  en: {
    eyebrow: "Nomad · fictional operator",
    title: "The purchase journey on « Nomad », an invented operator",
    intro:
      "No real brand, client or interface appears here. The configuration screens reserved for salespeople can't be shown: they are rendered as diagrams, in the « Two more decisions » section.",
    cutLead: "Identity verification is cut from this recording.",
    cut:
      "That component belongs to Thales and can't be published. It sits between the plan and the payment, at the position decided in « The key decision ».",
    fallback:
      "Your browser can't play this video. It shows the purchase and activation journey for an eSIM profile, from destination to download.",
    caption: "Full journey, from choosing a destination to downloading the profile.",
  },
} as const;

/**
 * Démonstration filmée du parcours d'achat, sous son texte de cadrage.
 * Remplace l'ancienne maquette abstraite et la liste de visuels à venir.
 * La vérification d'identité est coupée du montage : elle appartient à Thales.
 *
 * Lecture automatique en boucle, sans son. Les contrôles restent affichés :
 * une vidéo qui démarre seule et dure plus de 5 s doit pouvoir être mise en
 * pause par l'utilisateur (WCAG 2.2.2).
 */
export default function DemoKitProcessVideo({ className = "", lang = "fr" }: { className?: string; lang?: Lang }) {
  const c = COPY[lang];

  return (
    <div
      className={`light-surface grain-multiply relative rounded-folder border-2 border-noir bg-paper p-5 text-ink shadow-paper md:p-7 ${className}`}
    >
      {/* items-start et non items-center : la colonne texte reste calée en haut,
          sinon elle flotte au milieu d'une vidéo bien plus haute qu'elle. */}
      <div className="relative z-[1] grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)] md:gap-10">
        <div>
        {/* ---- Le texte de cadrage ---- */}
        <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
          {c.eyebrow}
        </p>
        <h3 className="mb-3 max-w-[24ch] text-[clamp(22px,2.6vw,30px)] font-extrabold uppercase tracking-[-0.01em]">
          {c.title}
        </h3>
        <p className="mb-4 max-w-[68ch] text-[15.5px] leading-relaxed opacity-85">
          {c.intro}
        </p>
        <p className="flex max-w-[68ch] items-start gap-3 rounded-[14px] border border-dashed border-violet/50 bg-mist/50 p-4 text-[13px] font-medium leading-relaxed opacity-80">
          <span aria-hidden className="mt-0.5 text-base leading-none text-violet">
            ✂
          </span>
          <span>
            <strong className="text-ink">{c.cutLead}</strong> {c.cut}
          </span>
        </p>
        </div>

        {/* ---- La démo filmée, à droite du texte ---- */}
        <figure className="md:sticky md:top-28">
          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[2.25rem] border-[8px] border-noir bg-noir shadow-paper-lift md:mx-0">
            <video
              className="block h-auto w-full"
              width={372}
              height={840}
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source src={VIDEO} type="video/mp4" />
              {c.fallback}
            </video>
          </div>
          <figcaption className="mt-3 text-center text-[13px] font-medium leading-relaxed opacity-60 md:text-left">
            {c.caption}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
