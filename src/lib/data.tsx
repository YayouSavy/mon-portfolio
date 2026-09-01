import type { ReactNode } from "react";
import Link from "next/link";
import NimbusPatterns from "../components/visuals/nimbus/NimbusPatterns";
import DemoKitSalesMenu from "../components/visuals/demo-kit/DemoKitSalesMenu";
import PaperStat from "../components/case-study/PaperStat";
import TunnelInversion from "../components/visuals/demo-kit/TunnelInversion";

export type Accent = "lime" | "violet" | "paper" | "mist";

/* ---- Stickers compétences du hero : flottent autour de la photo en lg: (pos), rangée simple en dessous. ---- */
export type Tag = { label: string; color: Accent; pos: string };

export const TAGS: Tag[] = [
  { label: "Figma avancé",          color: "paper",  pos: "lg:top-[2%] lg:-left-14 lg:-rotate-[9deg]" },
  { label: "Design-to-code",        color: "violet", pos: "lg:top-[18%] lg:-right-8 lg:rotate-[8deg] xl:-right-10 2xl:-right-16" },
  { label: "Design system",         color: "lime",   pos: "lg:top-[46%] lg:-left-20 lg:rotate-[3deg]" },
  { label: "Recherche utilisateur", color: "paper",  pos: "lg:top-[68%] lg:-right-6 lg:-rotate-[10deg] xl:-right-8 2xl:-right-12" },
  { label: "Anglais C1",            color: "violet", pos: "lg:-bottom-8 lg:left-[14%] lg:rotate-[6deg]" },
  { label: "WCAG 2.2 · RGAA",       color: "lime",   pos: "lg:-bottom-10 lg:right-[16%] lg:-rotate-[5deg]" },
];

/* ---- Pastilles "hors des écrans" · About, sous la fiche identité ---- */
export const PERSONAL_TAGS: { label: string; color: Accent }[] = [
  { label: "Mode", color: "lime" },
  { label: "Design graphique", color: "violet" },
  { label: "Broderie", color: "lime" },
  { label: "Jeux vidéo", color: "violet" },
  { label: "Mangas", color: "lime" },
  { label: "Déco d'intérieur", color: "violet" },
  { label: "Couture", color: "lime" },
];

/* ---- Post-its chiffres · chacun pointe vers le dossier qui porte le chiffre ---- */
export type Stat = { num: string; label: string; color: Accent; rot: string; tape: "lime" | "paper"; projectId?: string };

export const STATS: Stat[] = [
  { num: "7 semaines", label: "supprimées du cycle : le prototype codé a remplacé la spécification", color: "lime",   rot: "-rotate-3", tape: "paper", projectId: "esim-simple" },
  { num: "95 %",  label: "d'adoption volontaire du portail interne Customer Services",         color: "paper",  rot: "rotate-2",  tape: "lime",  projectId: "customer-services" },
  { num: "8 / 10", label: "personnes ont téléchargé et activé une eSIM sans aide, en test guérilla",         color: "violet", rot: "-rotate-2", tape: "paper", projectId: "demo-kit" },
  { num: "3",     label: "web apps télécoms livrées, riches en données",                        color: "paper",  rot: "rotate-3",  tape: "lime" },
];

/* ---- Visuels de dossier : reconstitutions codées (pas de captures), NDA-safe ---- */
export type Visual =
  | { kind: "pipeline"; steps: string[]; highlight?: number }
  | { kind: "mockup"; density: "list" | "grid"; labels: string[] }
  | { kind: "journey"; stages: string[] }
  | { kind: "tokens" }
  | { kind: "beforeAfter"; from: string; to: string; curveTo: string }
  | { kind: "comingSoon" }
  | { kind: "photo"; src: string; alt: string }
  | { kind: "diagram"; src: string; alt: string; eyebrow?: string }
  | { kind: "pipelineLoop" }
  | { kind: "demoKitVideo" }
  | { kind: "nimbusPrefill" }
  | { kind: "contextSwitch" };

export type ProcessStep = { title: string; body: string; visual?: Visual };

/* ---- Dossiers projets ---- */
export type Project = {
  id: string;
  status: "live" | "soon";
  color: Accent;
  tab: string;
  title: string;
  titleBadge?: { src: string; alt: string; width: number; height: number }; // badge/tampon à côté du H1 (ex. logo de prix)
  meta: string;
  metaSub?: string[];      // fragments de contexte alignés en ligne à la suite du sous-titre (ex. ["Thales", "Product Designer", "18 mois"])
  role: ReactNode;         // énoncé du rôle (ou résumé "TL;DR" pour un dossier à plusieurs chantiers), une seule fois, ici
  desc: ReactNode;         // teaser homepage (Folders fermé/survolé)
  context?: ReactNode;     // étude de cas : problème / contexte
  contextTitle?: string;   // titre de la section contexte, "Contexte" par défaut ("Le projet"/"Le problème" pour un dossier étendu)
  roleDetail?: ReactNode;  // section "Mon rôle" séparée, détaillée (dossier à plusieurs chantiers uniquement)
  extraSections?: { title: string; body: ReactNode; placement?: "afterRole" | "afterDecisions" }[]; // sections narratives additionnelles (ex. "La recherche"), placement par défaut "afterRole"
  craftProof?: ReactNode;  // preuve de craft codée, NDA-safe (ex. démo sur DS fictif)
  craftProofBeforeResults?: boolean; // place craftProof juste avant Résultats plutôt qu'après le contexte
  process?: ProcessStep[]; // étude de cas : 3 étapes avec visuel
  processIntro?: string;   // ligne de cadrage avant la grille Process (utile quand plusieurs chantiers cohabitent)
  coverPlacement?: "top" | "afterRole" | "hidden"; // "top" (défaut) juste sous l'en-tête ; "afterRole" après "Mon rôle" ; "hidden" ne l'affiche pas sur la page (garde `cover` pour la vignette d'accueil)
  coverTitle?: string;     // si défini, encapsule le visuel principal dans sa propre section titrée (H2 + intro)
  coverIntro?: ReactNode;  // paragraphe de cadrage sous `coverTitle`, avant le visuel
  decisions?: string[];    // arbitrages assumés, formulés en vrais trade-offs (X plutôt que Y)
  decisionHero?: { title: ReactNode; body: ReactNode }; // décision unique mise en avant, à la place de `decisions`
  decisionHeroes?: { title: ReactNode; body: ReactNode }[]; // plusieurs décisions détaillées, à la place de `decisions`/`decisionHero`
  decisionsIntro?: ReactNode; // cadrage narratif avant les décisions (ex. citations utilisateurs)
  decisionsTitle?: string; // titre de la section décisions, "Décisions & arbitrages" par défaut
  resultsIntro?: ReactNode; // qui profite des résultats, avant la grille de métriques
  resultsOutro?: ReactNode; // prose complémentaire après la grille de métriques
  resultsGroups?: { key: string; label: string; dot: string }[]; // définit les groupes de métriques (ordre + libellé + couleur) ; défaut : Produit/Système
  learnings?: ReactNode;   // ce que ça m'a appris
  ndaNote?: string;        // note de confidentialité, assumée
  cover: Visual;           // visuel principal, réutilisé en vignette ET en page
  peek?: boolean;          // vignette Polaroid qui dépasse de l'onglet (Folders) ; false = aucune vignette
  /* L'objet unique posé en tête de dossier. Il fait la transition entre l'accueil
     (un bureau : Polaroid, carte, tache de café) et le dossier (une page qu'on annote).
     Un seul par dossier, décoratif, jamais deux. */
  entryProp?: "screen" | "field" | "mobile";
  /* `note` = annotation manuscrite posée sur le papier À CÔTÉ de la fiche, jamais dedans.
     Elle n'existe que si elle apporte une condition, un coût ou une limite absents de la
     fiche et du corps de texte. Une note qui paraphrase la card la dévalue. */
  metrics: { num: string; label: string; group?: string; note?: string }[];
  chips: string[];
  z: string;      // empilement fermé
};

export const PROJECTS: Project[] = [
  {
    id: "esim-simple",
    status: "live",
    color: "paper",
    tab: "Design-to-code",
    title: "eSIM Simple",
    meta: "Concevoir et coder un produit de bout en bout avec l'IA, du premier écran au frontend livré.",
    metaSub: ["Thales", "Product Designer", "6 mois"],
    role: (
      <>
        <p className="mb-4">Un prototype conçu pour être montré, et écrit pour être gardé.</p>
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>
              <strong>Le produit :</strong>{" "}
              un espace de gestion de commandes eSIM à deux faces, back-office opérateur et espace client, conçu et
              codé en 2 mois. Sept semaines supprimées du cycle, et un frontend qui part en production tel quel.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span>
              <strong>La validation :</strong>{" "}
              pas de recherche amont : cinq démonstrations, dont deux devant de vrais clients, et une décision
              d&apos;industrialisation à la clé.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-noir/40" />
            <span>
              <strong>Mon rôle :</strong>{" "}
              Product Designer, seule designer, dans une équipe de six : un PM, un architecte, un Scrum Master, deux
              développeurs.
            </span>
          </li>
        </ul>
      </>
    ),
    desc: (
      <>
        Un espace de gestion de commandes eSIM à deux faces,{" "}
        <strong>conçu et codé de bout en bout avec l&apos;IA</strong>{" "}
        : sept semaines supprimées du cycle, et un frontend repris tel quel en production.
      </>
    ),
    contextTitle: "Le projet",
    context: (
      <>
        <p>
          eSIM Simple n&apos;a pas commencé comme un projet. Pour tester une nouvelle direction d&apos;interface,
          j&apos;avais développé un petit prototype en React. Le PM y a vu autre chose qu&apos;une expérimentation,
          et la hiérarchie nous a confié un mandat plus large : mener un produit de bout en bout en nous appuyant
          sur l&apos;IA à chaque étape, de l&apos;idéation au développement. Des consultants dédiés nous ont aidés
          à mettre en place les outils.
        </p>
        <p>
          Le produit : un espace de gestion de commandes eSIM. Deux publics dès le cadrage, et ce n&apos;était pas
          un détail d&apos;implémentation. Le back-office opérateur et l&apos;espace client partagent les mêmes
          objets — des comptes, des lots de profils, des commandes — mais pas les mêmes droits, ni les mêmes
          priorités de lecture. Concevoir les deux séparément aurait produit deux produits ; les concevoir ensemble
          a produit un seul système avec deux points de vue.
        </p>
        <p>
          Restait à décider comment le construire. Une maquette aurait suffi à illustrer des écrans, pas à répondre
          à la question posée : est-ce que ça tient quand on manipule de vraies données ? Un catalogue de profils,
          ce sont des centaines de lignes, des états qui se contredisent, des cas limites qu&apos;on ne dessine
          jamais dans une maquette. J&apos;ai continué en code — et le prototype a fini par servir trois usages à
          la fois : tester en environnement réel, donner quelque chose à montrer et à faire commenter, et donner
          aux développeurs une base sur laquelle s&apos;appuyer.
        </p>
      </>
    ),
    roleDetail: (
      <>
        <p>
          Product Designer, seule designer, dans une équipe de six : un PM, un architecte, un Scrum Master, deux
          développeurs.
        </p>
        <p>
          Idéation, architecture de l&apos;information, conception des écrans, prototypage directement en code,
          jusqu&apos;au frontend livré.
        </p>
      </>
    ),
    extraSections: [
      {
        title: "La validation",
        body: (
          <>
            <p>
              Ce projet n&apos;a pas donné lieu à une phase de recherche utilisateur : le besoin était cadré en
              amont, et la question posée était ailleurs. Le produit tient-il quand on le manipule ?
            </p>
            <p>
              Le PM a porté seul les cinq démonstrations : devant les équipes commerciales, devant la hiérarchie,
              et deux fois devant de vrais clients. Le prototype n&apos;a jamais été distribué au-delà : il
              n&apos;avait pas à l&apos;être. Il devait tenir devant les bonnes personnes, et décider de la suite.
            </p>
            <p>C&apos;est ce qu&apos;il a fait. Le produit est aujourd&apos;hui en cours de déploiement.</p>
          </>
        ),
      },
      {
        title: "Deux autres décisions",
        placement: "afterDecisions",
        body: (
          <>
            <div>
              <p className="mb-2 font-bold text-ink">Écrire un prototype livrable plutôt qu&apos;un prototype jetable.</p>
              <p className="mb-3">
                Un prototype de démonstration n&apos;a besoin de tenir que le temps d&apos;un rendez-vous. Le mien a
                été écrit comme s&apos;il devait survivre : composants du design system, états d&apos;erreur gérés,
                responsive, accessibilité tenue.
              </p>
              <p className="mb-3">
                Le coût : du temps passé sur des choses qu&apos;aucune démonstration ne rend visibles, et
                l&apos;effort de cadrer l&apos;IA pour qu&apos;elle produise du code structuré plutôt que du code
                qui affiche.
              </p>
              <p className="mb-3">
                Le gain, d&apos;abord en temps. Le prototype a tenu lieu de spécification au moment de la
                livraison. Cinq semaines de handoff et deux semaines d&apos;idéation ont disparu du cycle, et
                l&apos;effet s&apos;est propagé au-delà de mon périmètre : rien à traduire, donc rien à
                interpréter, pas d&apos;écart entre l&apos;intention et l&apos;implémentation à recetter, et un
                guide utilisateur rédigé devant un produit qu&apos;on manipule au lieu de le décrire.
              </p>
              <p>
                Le gain, ensuite en fidélité, et c&apos;est le plus important. Sur une maquette, la contrainte
                technique se découvre à la livraison, et c&apos;est le design qui plie pour s&apos;y adapter. En
                prototypant en code, elle se découvre pendant la conception, quand il est encore possible
                d&apos;arbitrer. Le produit qui part en production ressemble à ce qui a été conçu, pas à ce
                qu&apos;il en restait après négociation.
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-ink">
                Un sélecteur de contexte dans le header plutôt que deux applications.
              </p>
              <p className="mb-3">
                Le produit a deux faces : un back-office pour l&apos;opérateur, un espace pour le client final. Le
                besoin est apparu à l&apos;usage : chaque démonstration devait montrer les deux dans la même
                séance, quel que soit l&apos;auditoire.
              </p>
              <p className="mb-3">
                Le vrai utilisateur de cette fonction n&apos;est donc ni l&apos;opérateur ni son client, c&apos;est
                la personne qui démontre. En production, chacun aurait son propre compte et le passage d&apos;une
                face à l&apos;autre n&apos;existerait pas. Mais en démonstration, se déconnecter et se reconnecter
                devant une salle coûte trente secondes et un écran de login : le fil est rompu. J&apos;ai placé la
                bascule sur l&apos;avatar du header.
              </p>
              <p className="mb-3">
                Le coût : deux contextes cohabitent dans une seule application, et rien n&apos;empêche d&apos;agir
                dans le mauvais périmètre. La couleur du side panel, claire côté back-office et sombre côté client,
                est aujourd&apos;hui le seul signal permanent, et c&apos;est insuffisant pour un produit de gestion
                de commandes. En production, ce serait une affaire de comptes et de rôles, pas un bouton.
              </p>
              <p>
                Le gain : on passe d&apos;une face à l&apos;autre sans rupture, et le pattern — un sélecteur de
                compte sur l&apos;avatar — est assez banal dans les produits B2B pour ne pas trahir la
                démonstration. Une audience qui le voit voit une fonctionnalité, pas une maquette. C&apos;est
                l&apos;inverse exact du bouton de réinitialisation de Demo Kit, qu&apos;il fallait cacher.
                Accessoirement, une seule base de code à maintenir pour les développeurs.
              </p>
            </div>
          </>
        ),
      },
    ],
    decisionsTitle: "La décision clé",
    decisionHero: {
      title: "Prototyper en code, pas en Figma.",
      body: (
        <>
          <p>
            Une maquette ne se branche pas à de vraies données. En prototypant en code, j&apos;ai pu itérer sur des
            cas réels plutôt que sur des états idéaux, et manipuler le produit au lieu de le décrire.
          </p>
          <p>
            Le coût de ce parti pris : beaucoup plus d&apos;effort en amont pour cadrer l&apos;IA, qui produisait
            spontanément du code hors design system — une table importée de Material ici, un bleu absent de la
            palette là. Les règles du système n&apos;étaient écrites nulle part ; elles vivaient dans la tête des
            designers. J&apos;ai ouvert un chantier parallèle pour les encoder.{" "}
            <Link
              href="/notes/design-system-ia"
              className="font-semibold text-violet underline decoration-violet/40 underline-offset-4 transition-colors hover:decoration-violet"
            >
              Apprendre à une IA un design system qu&apos;elle n&apos;a jamais lu
            </Link>
            .
          </p>
          <p>Le gain : sept semaines de cycle en moins, et un produit qui ressemble à ce qui a été conçu.</p>
        </>
      ),
    },
    resultsGroups: [{ key: "produit", label: "Ce que le prototype a produit", dot: "bg-lime" }],
    resultsOutro: (
      <p>
        <strong>Le statut.</strong> Le produit est en cours de déploiement et sera commercialisé. Pas encore de
        données d&apos;usage réel.
      </p>
    ),
    learnings: (
      <>
        <p>
          Le design-to-code ne fait pas gagner du temps partout : il le déplace. En amont, il en coûte, il faut
          écrire les règles que l&apos;IA doit suivre, et découvrir en chemin toutes celles que personne
          n&apos;avait jamais eu besoin de formuler. En aval, il en rend beaucoup : là où se trouvait le handoff,
          il n&apos;y a plus rien à traduire.
        </p>
        <p>
          Sa limite est exactement à l&apos;endroit de son coût. On ne peut encoder que les règles qui existent
          déjà. Partout où le design system était silencieux, l&apos;IA produisait des choix par défaut qu&apos;il
          fallait arbitrer à la main, un par un. Et un prototype écrit pour durer ne décide pas seul de son
          industrialisation, mais il enlève la principale raison de ne pas le faire.
        </p>
      </>
    ),
    ndaNote: "Reconstruction neutre sur « Nomad », opérateur inventé : aucune donnée, aucune marque ni aucune interface réelles.",
    cover: { kind: "contextSwitch" },
    peek: false,
    entryProp: "screen", // le produit a été prototypé en code, pas en maquette
    metrics: [
      { num: "7 semaines", label: "supprimées du cycle : 5 de handoff, 2 d'idéation.", group: "produit", note: "avec des consultants dédiés pour installer les outils" },
      { num: "Zéro handoff", label: "le frontend écrit pendant les démonstrations est celui qui part en production.", group: "produit" },
      { num: "5", label: "démonstrations, dont deux devant de vrais clients, à l'origine de la décision d'industrialiser.", group: "produit", note: "portées par le PM seul, jamais distribué au-delà" },
    ],
    chips: ["Design-to-code", "Gestion de commandes B2B", "IA"],
    z: "z-[1]",
  },
  {
    id: "demo-kit",
    status: "live",
    color: "lime",
    tab: "Outil de démo",
    title: "Demo Kit",
    meta: "Rejouer un parcours d'achat eSIM en conditions réelles, sur le téléphone d'un commercial.",
    metaSub: ["Thales", "Product Designer", "8 mois, de la demande initiale à la livraison développement"],
    role: (
      <>
        <p className="mb-4">
          Un outil de démonstration où chaque fonction qui sert le vendeur menace la crédibilité de la
          démonstration.
        </p>
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>
              <strong>Le produit :</strong>{" "}
              le parcours d&apos;achat et d&apos;activation d&apos;un profil eSIM rejoué de bout en bout,
              vérification d&apos;identité et téléchargement réels inclus, rebrandable avant chaque rendez-vous.
              Sélectionné pour représenter ma branche au Best of Thales Design.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span>
              <strong>La recherche :</strong>{" "}
              6 commerciaux interrogés puis re-sollicités pour tester, 10 tests guérilla, une inversion du tunnel
              d&apos;achat.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-noir/40" />
            <span>
              <strong>Mon rôle :</strong>{" "}
              Product Designer, seule designer, en binôme avec un développeur.
            </span>
          </li>
        </ul>
      </>
    ),
    desc: (
      <>
        Le parcours d&apos;achat et d&apos;activation d&apos;une eSIM rejoué{" "}
        <strong>de bout en bout, sur le téléphone d&apos;un commercial</strong>{" "}
        : vérification d&apos;identité et téléchargement réels inclus, rebrandable aux couleurs du prospect avant
        chaque rendez-vous.
      </>
    ),
    contextTitle: "Le projet",
    context: (
      <>
        <p>
          Les équipes commerciales vendent des solutions eSIM à des opérateurs télécoms. Pour montrer à quoi
          ressemble le produit, elles disposaient de slides et de captures d&apos;écran. Le prospect devait
          imaginer le parcours au lieu de le voir.
        </p>
        <p>
          L&apos;application le rejoue en conditions réelles, sur le téléphone personnel du commercial : choix de la
          destination, sélection du forfait, vérification d&apos;identité, paiement, téléchargement d&apos;un vrai
          profil eSIM. Elle se rebrande aux couleurs du prospect avant le rendez-vous.
        </p>
        <p>
          Le sujet n&apos;était pas le parcours d&apos;achat, qui existait déjà. Il tenait dans une contradiction :
          deux utilisateurs regardent le même écran. Le commercial a besoin de contrôle, pour sauter des étapes
          quand le temps manque, repartir de zéro entre deux rendez-vous, changer un prix afin de coller au
          catalogue du prospect. Le prospect, lui, ne doit rien voir de tout cela. À l&apos;instant où il aperçoit un bouton de
          réinitialisation, il ne regarde plus un produit, il regarde une maquette.
        </p>
      </>
    ),
    roleDetail: (
      <>
        <p>Product Designer, seule designer, en binôme avec un développeur.</p>
        <p>
          Recherche et synthèse, schéma d&apos;architecture fonctionnelle validé avec le PM avant les premières
          maquettes, conception des écrans et du système de branding, prototype et tests, textes écrits avec le
          marketing, handoff et suivi jusqu&apos;à la mise en œuvre.
        </p>
      </>
    ),
    extraSections: [
      {
        title: "La recherche",
        body: (
          <>
            <p>
              Six commerciaux, une consigne : raconter leur dernier rendez-vous client minute par minute, plutôt que
              décrire les fonctionnalités qu&apos;ils voudraient.
            </p>
            <p>
              Ce que le terrain a rendu visible ne figurait dans aucune spécification. Ils enchaînent plusieurs
              rendez-vous dans la journée, donc il faut une remise à zéro complète en quelques secondes. Ils se
              déplacent chez des opérateurs concurrents, donc le branding doit changer avant chaque rendez-vous.
              Leur temps de parole varie d&apos;un client à l&apos;autre, donc les étapes longues doivent pouvoir
              être sautées.
            </p>
            <p>
              Aucune fonction de la couche vendeur ne vient d&apos;une intuition. Chacune répond à une contrainte
              observée, et c&apos;est ce qui a permis de trancher le périmètre avec le PM : ce qui ne se rattachait
              à aucun besoin observé n&apos;entrait pas dans la première version.
            </p>
            {/* Parti pris de protocole, pas un résultat : il conclut la section recherche. */}
            <PaperStat
              num="6"
              label="commerciaux interrogés en amont, puis re-sollicités pour tester le prototype : les mêmes personnes en entrée et en sortie de conception"
            />
          </>
        ),
      },
      {
        title: "Deux autres décisions",
        placement: "afterDecisions",
        body: (
          <>
            <div>
              <p className="mb-2 font-bold text-ink">Un menu de pilotage rangé là où le prospect ne va pas.</p>
              <p className="mb-3">
                Les fonctions de pilotage sont regroupées dans un écran unique, accessible depuis les réglages de
                l&apos;application, sous le libellé « Admin ». Le pattern est celui des outils internes : pas de
                porte dérobée, mais un emplacement que rien n&apos;annonce dans le parcours d&apos;achat, et un
                libellé qui ne dit rien à un prospect regardant l&apos;écran par-dessus l&apos;épaule du commercial.
              </p>
              <p className="mb-3">
                Le choix inverse existait : dissimuler complètement l&apos;accès derrière un geste secret. Je
                l&apos;ai écarté. Un commercial qui ne retrouve pas sa remise à zéro devant un client perd plus que
                ce que la dissimulation lui fait gagner. La fiabilité d&apos;accès l&apos;emporte sur le camouflage,
                et le risque résiduel est un libellé technique dans une liste de réglages.
              </p>
              <p>
                L&apos;écran sépare ce qui se prépare avant le rendez-vous (opérateur, couleurs, logo) de ce qui se
                règle pendant (passer l&apos;onboarding, passer la vérification d&apos;identité) et de ce qui est
                destructif, la réinitialisation, isolée en bas. L&apos;opérateur et le thème actifs restent affichés
                en permanence : le pire scénario de ce produit est un commercial qui démarre une démonstration aux
                couleurs du concurrent qu&apos;il a vu la veille.
              </p>
              {/* Schéma 02 — collé au paragraphe qu'il illustre. */}
              <figure className="mt-6">
                <figcaption className="repere-marge mb-4 flex items-center gap-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
                  {/* Le repère porte le numéro : il n'est pas décoratif, il reste lu. */}
                  <span className="repere">02</span>
                  Menu commercial, arborescence
                </figcaption>
                <DemoKitSalesMenu part="menu" />
              </figure>
            </div>
            <div>
              <p className="mb-2 font-bold text-ink">Un thème neutre, conçu pour être remplacé.</p>
              <p className="mb-3">
                Le thème sombre n&apos;appartient à aucun opérateur : c&apos;est la base par défaut. Le thème clair
                est la démonstration de ce que devient l&apos;application habillée aux couleurs d&apos;un client.
                Chaque composant devait supporter un changement de couleur primaire et de logo sans qu&apos;aucun
                écran ne casse, ni en mise en page ni en contraste.
              </p>
              <p>
                Trois variables seulement sont exposées : logo, couleur primaire, nom de l&apos;opérateur. Sous
                4.5:1, les libellés posés sur la couleur primaire basculent automatiquement en foncé. Le commercial
                ne peut pas produire un écran non conforme.
              </p>
              {/* Schéma 03 — séparé du 02 : il illustre le thème, pas l'arborescence. */}
              <figure className="mt-6">
                <figcaption className="repere-marge mb-4 flex items-center gap-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
                  <span className="repere">03</span>
                  Panneau Branding et garde-fou de contraste
                </figcaption>
                <DemoKitSalesMenu part="branding" />
              </figure>
            </div>
          </>
        ),
      },
    ],
    decisionsTitle: "La décision clé",
    decisionHero: {
      title: "Vérifier l'identité, puis faire payer.",
      body: (
        <>
          <p>
            Dans le parcours d&apos;origine, l&apos;utilisateur payait, puis vérifiait son identité. La même
            objection est revenue des commerciaux et des tests, formulée presque à l&apos;identique : payer sans
            savoir si la vérification aboutira est anxiogène. Le risque perçu est asymétrique, puisque
            l&apos;argent est parti alors que le service n&apos;est pas garanti. Sur un produit acheté en mobilité,
            souvent juste avant un départ, l&apos;hésitation suffit à faire abandonner.
          </p>
          <p>J&apos;ai inversé les deux étapes.</p>

          {/* Schéma 01 — le lecteur voit la décision avant d'en lire l'arbitrage. */}
          <figure className="my-2">
            <figcaption className="repere-marge mb-4 flex items-center gap-3 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
              <span className="repere">01</span>
              Inversion du tunnel d&apos;achat
            </figcaption>
            <TunnelInversion />
            <figcaption className="mt-3 max-w-[62ch] text-sm font-medium leading-relaxed text-ink/70">
              Les écrans de vérification d&apos;identité appartiennent à Thales et ne sont pas montrables. La
              décision est restituée sous forme de schéma.
            </figcaption>
          </figure>

          <p>
            Le coût de ce parti pris : l&apos;étape la plus lourde du parcours passe avant le paiement, sur un
            utilisateur qui n&apos;a encore rien investi. Les abandons remontent dans le tunnel. Le gain : personne
            ne paie pour un service qu&apos;il ne pourra peut-être pas activer, et l&apos;opérateur n&apos;a pas à
            absorber derrière un remboursement et un client perdu.
          </p>
        </>
      ),
    },
    resultsGroups: [{ key: "valide", label: "Ce qui a été validé", dot: "bg-lime" }],
    resultsOutro: (
      <p>
        <strong>Le statut.</strong> En cours de développement. L&apos;application n&apos;est pas encore déployée
        auprès des équipes commerciales : aucune donnée d&apos;usage réel à ce jour.
      </p>
    ),
    learnings: (
      <>
        <p>
          La recherche cartographie les utilisateurs, pas la plateforme. Mes six entretiens ont décrit le métier
          commercial avec précision, et n&apos;ont rien dit de ce que le système d&apos;exploitation impose ni de ce
          qui arrive à l&apos;application une fois qu&apos;elle a réellement téléchargé trois profils. Trois des
          fonctions les plus structurantes du produit (l&apos;autorisation de localisation, le changement de
          profil, la bibliothèque de branding) sont nées du handoff, soulevées par le développeur.
        </p>
        <p>
          Ce projet a déplacé pour moi le moment où la technique entre dans la conception. Elle n&apos;arrive pas à
          la livraison : elle appartient au cadrage.
        </p>
      </>
    ),
    cover: { kind: "demoKitVideo" },
    peek: false,
    entryProp: "mobile", // l'outil vit dans la poche d'un commercial en déplacement
    metrics: [
      {
        num: "8 / 10",
        label:
          "personnes ont téléchargé et activé un profil eSIM sans aide, en test guérilla auprès de personnes découvrant l'eSIM",
        group: "valide",
        note: "des inconnus, pas les commerciaux",
      },
      {
        num: "6",
        label:
          "commerciaux interrogés en amont, puis re-sollicités pour tester le prototype : les mêmes personnes en entrée et en sortie de conception",
        group: "valide",
      },
    ],
    chips: ["Recherche utilisateur", "Outil interne", "Mobile · Theming"],
    z: "z-[2]",
  },
  {
    id: "customer-services",
    status: "live",
    color: "violet",
    tab: "Outil interne",
    title: "Customer Services Portal",
    titleBadge: { src: "/Rubber.png", alt: "Badge « Operations Excellence Awards »", width: 609, height: 609 },
    meta: "Repenser la création de commande dans un environnement B2B télécoms.",
    metaSub: ["Thales", "Product Designer", "18 mois"],
    role: (
      <>
        <p className="mb-4">
          Un outil de gestion de commandes conçu avec les équipes support, adopté sans que personne n&apos;y soit
          obligé.
        </p>
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>
              <strong>Le produit :</strong>{" "}
              quatre outils remplacés par un, la quasi-totalité des commandes basculée en 6 mois, Prix Or du
              programme d&apos;excellence opérationnelle du groupe.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            <span>
              <strong>La recherche :</strong>{" "}
              26 head CS interrogées, deux ateliers en présentiel, un insight que personne n&apos;avait vu en huit
              ans.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-noir/40" />
            <span>
              <strong>Mon rôle :</strong>{" "}
              Product Designer, en binôme avec une UX Researcher, dans une équipe de dix. 18 mois.
            </span>
          </li>
        </ul>
      </>
    ),
    /* Le pattern 01 doit être visible dès l'en-tête : c'est la preuve visuelle d'entrée,
       sans quoi la page enchaîne plusieurs écrans de prose avant le premier visuel. */
    coverPlacement: "top",
    desc: (
      <>
        Portail interne conçu <strong>de bout en bout</strong>{" "}
        pour repenser la création de commande en environnement B2B télécoms : IA de contrôle documentaire, bascule
        volontaire de 5 % à 95 % des commandes, Prix Or d&apos;excellence opérationnelle du groupe.
      </>
    ),
    contextTitle: "Le projet",
    context: (
      <>
        <p>
          Créer une commande de cartes SIM impliquait quatre outils&nbsp;: un tableur pour le suivi, un traitement de
          texte pour les documents, une messagerie pour le client, un ERP pour le système. Aucun n&apos;était
          connecté. Ressaisie manuelle à chaque étape, aucune vue consolidée.
        </p>
        <p>
          L&apos;effet en cascade se voyait ailleurs&nbsp;: les commerciaux appelaient les CS pour obtenir un statut
          ou corriger une erreur. Les CS passaient une partie de leur journée à répondre à des questions dont la
          réponse existait déjà, quelque part.
        </p>
        <p>
          Le sujet était identifié depuis huit ans. Ce qui manquait n&apos;était pas la volonté, mais une
          compréhension du travail réel assez fine pour ne pas livrer un outil de plus.
        </p>
      </>
    ),
    roleDetail: (
      <>
        <p>
          Product Designer, en binôme avec une UX Researcher, dans une équipe de dix (PM, PO, PLM, 5 développeurs).
        </p>
        <p>
          Elle a piloté le protocole de recherche et l&apos;analyse. J&apos;ai co-animé les entretiens et les
          ateliers, traduit les insights en partis pris de conception, produit l&apos;ensemble des écrans et du
          handoff, et travaillé au quotidien avec la tech.
        </p>
      </>
    ),
    extraSections: [
      {
        title: "La recherche",
        body: (
          <>
            <p>
              26 head Customer Services à l&apos;échelle mondiale. Deux ateliers en présentiel&nbsp;: reconstituer la
              façon dont une commande se crée réellement, puis leur faire décrire l&apos;outil qu&apos;elles
              voudraient.
            </p>
            <p>
              La difficulté n&apos;était pas de les faire parler, mais de les amener à formuler ce qu&apos;elles
              faisaient sans y penser. L&apos;habitude rend un geste évident au point de le rendre indescriptible.
              C&apos;est ce que le dispositif de recherche est allé chercher.
            </p>
            <p>
              Trois demandes sont revenues systématiquement&nbsp;: remplir les commandes automatiquement, ne plus
              avoir à écrire aux clients à chaque étape, garder une vue d&apos;ensemble sur les commandes en cours.
              Une quatrième n&apos;était attendue par personne&nbsp;: les CS voulaient un canal pour se transmettre
              des dossiers entre elles, sans passer par l&apos;e-mail. Un besoin qui n&apos;apparaissait dans aucune
              procédure, parce qu&apos;il n&apos;en relevait pas.
            </p>
            <p>
              Elles ne demandaient pas des fonctionnalités, elles décrivaient des irritants sous forme de solutions.
              Mon travail a consisté à remonter de la demande au problème, puis à concevoir la réponse, y compris
              quand elle ne ressemblait pas à la demande.
            </p>
            <PaperStat
              num="26"
              label="head Customer Services interrogées à l'échelle mondiale, et deux ateliers en présentiel"
              note="le sujet était identifié depuis huit ans"
              noteId="note-csp-26"
            />
          </>
        ),
      },
      {
        title: "Deux autres décisions",
        placement: "afterDecisions",
        body: (
          <>
            <div>
              <p className="mb-2 font-bold text-ink">Trois versions pour un seul parcours.</p>
              <p>
                Créer une commande n&apos;est pas un formulaire&nbsp;: c&apos;est un arbre de cas dont chaque branche
                existe parce qu&apos;un client réel l&apos;a exigée un jour. Les deux premières versions ont échoué
                en test, les utilisatrices ne retrouvaient pas leur cas, ou perdaient le fil. Nous cherchions le
                problème dans l&apos;interface&nbsp;; il était en amont. Nous avions modélisé le processus depuis le
                seul point de vue des CS, sans les contraintes portées par les autres parties prenantes. La troisième
                version est partie d&apos;un atelier réunissant CS et stakeholders. C&apos;est celle qui a tenu.
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-ink">Rendre l&apos;information consultable plutôt que demandée.</p>
              <p>
                Le portail est connecté à l&apos;ERP et aux systèmes de la chaîne de production&nbsp;: le statut
                d&apos;une commande physique devient consultable en autonomie, et chaque jalon franchi déclenche une
                notification au client. Les CS ne relaient plus une information que le système connaît déjà.
              </p>
            </div>
            <p>
              Le canal interne repéré en recherche a été livré en bêta après le cœur du produit, un arbitrage
              assumé&nbsp;: il ne conditionnait pas la bascule.
            </p>
          </>
        ),
      },
    ],
    decisionsTitle: "La décision clé",
    decisionHero: {
      title: "L'IA propose, la CS décide.",
      body: (
        <>
          <p>
            La demande était un remplissage automatique. Le problème réel&nbsp;: la ressaisie de bons de commande
            reçus en PDF ou en papier, lente et source d&apos;erreurs qui remontaient jusqu&apos;aux commerciaux.
          </p>
          <p>
            En 2024, intégrer un modèle de lecture de documents dans un outil interne était coûteux et contesté. Nous
            l&apos;avons défendu comme réponse au premier poste de perte de temps identifié en recherche, pas comme
            un gadget.
          </p>
          <p>
            Le parti pris a été de refuser l&apos;automatisation opaque. L&apos;IA pré-remplit, et chaque champ
            qu&apos;elle a rempli s&apos;affiche en rouge&nbsp;: le système signale explicitement ce qu&apos;il a
            supposé. La CS conserve la validation de bout en bout. Sur un bon de commande télécom, une erreur non
            détectée coûte plus cher que le temps gagné.
          </p>
          <p>
            Le coût de ce parti pris&nbsp;: la CS relit tout. Le gain&nbsp;: elle n&apos;a plus rien à retaper, et
            l&apos;IA vérifie en plus la complétude du bon de commande client, un usage que personne n&apos;avait
            demandé.
          </p>
          <p className="italic text-ink/60">
            Démonstration reconstruite sur « Nimbus », un design system fictif, pour illustrer le pattern sans
            divulguer les interfaces Thales.
          </p>
        </>
      ),
    },
    /* Le pattern 01 étant remonté en visuel d'entrée, ce groupe se resserre sur les trois autres. */
    craftProof: (
      <NimbusPatterns
        patterns={["reorder", "tracking", "inbox"]}
        intro="Trois patterns, un même principe. "
      />
    ),
    craftProofBeforeResults: true,
    resultsGroups: [
      { key: "adoption", label: "L'adoption", dot: "bg-violet" },
      { key: "reconnaissance", label: "La reconnaissance", dot: "bg-lime" },
    ],
    learnings: (
      <p>
        Concevoir une interface métier pour un domaine qu&apos;on ne connaît pas ne s&apos;improvise pas. Nous
        n&apos;y sommes pas arrivés en nous mettant à la place des Customer Services, mais en construisant un
        dispositif pour aller chercher ce qu&apos;elles savaient&nbsp;: des entretiens, des ateliers, plusieurs
        cycles de co-conception avant que le parcours de commande tienne. Le designer n&apos;est pas celui qui
        devine le besoin, c&apos;est l&apos;outil qui permet aux utilisateurs de le formuler et de le rendre
        concret.
      </p>
    ),
    /* Le pattern 01 en visuel d'entrée : il montre en trois secondes ce que fait le produit
       et le parti pris qui le distingue. Les trois autres restent groupés plus bas. */
    cover: { kind: "nimbusPrefill" },
    peek: false,
    entryProp: "field", // 26 entretiens et deux ateliers : le dossier vient du terrain
    metrics: [
      { num: "5 % → 95 %", label: "des commandes basculées vers le portail en 6 mois, sans obligation d'usage : l'ancien système est resté disponible", group: "adoption", note: "et l'ancien système est resté ouvert tout du long" },
      { num: "4 → 1", label: "outils remplacés par un point d'entrée unique", group: "adoption" },
      { num: "~50 %", label: "de la charge quotidienne des CS désormais traitée dans le portail", group: "adoption" },
      { num: "Prix Or", label: "programme d'excellence opérationnelle du groupe, parmi plusieurs dizaines de candidatures internes", group: "reconnaissance" },
      { num: "2", label: "lignes produit étudient l'adoption de la solution pour leurs propres équipes", group: "reconnaissance", note: "elles étudient l'adoption, elles n'ont pas basculé" },
    ],
    chips: ["Recherche utilisateur", "B2B complexe", "IA"],
    z: "z-[3]",
  },
];

/* ---- About me ---- */
export const STEPS: { title: string; desc: string }[] = [
  { title: "Recherche utilisateur", desc: "Entretiens, tests et ateliers de co-conception pour ancrer chaque décision dans le terrain." },
  { title: "Discovery et cadrage", desc: "Validation d'hypothèses avec PM et PLM avant d'investir une seule maquette." },
  { title: "Design system", desc: "Création, documentation, gouvernance, puis conversion des règles en skills pour agents IA." },
  { title: "Prototype codé et delivery", desc: "Prototypes React / Next.js branchés aux API, livrés accessibles et prêts pour les développeurs." },
];

/* `text` reste la source de vérité (clé React + version texte pur).
   `node` est optionnel : même contenu, avec les mots-clés isolés en gras. */
export type IdRow = { dt: string; lines: { text: string; node?: ReactNode; muted?: boolean }[] };

export const ID_ROWS: IdRow[] = [
  {
    dt: "Formation",
    lines: [
      { text: "Master Design d'interface et d'expérience · Ingémédia, Toulon · 2025" },
      { text: "en alternance chez Thales", muted: true },
      { text: "Licence Information & Communication · Avignon · 2023" },
    ],
  },
  {
    dt: "Expérience",
    lines: [
      {
        text: "Product Designer · Thales, via Groupe SII · avril 2024 → aujourd'hui",
        node: (
          <>
            <strong className="font-bold">Product Designer</strong> ·{" "}
            <strong className="font-bold">Thales</strong>, via{" "}
            <strong className="font-bold">Groupe SII</strong> · avril 2024 → aujourd&apos;hui
          </>
        ),
      },
      { text: "stage, puis alternance, puis CDI", muted: true },
      { text: "Community Manager · F&C SAS · avril à juillet 2023" },
    ],
  },
  {
    dt: "Langues",
    lines: [{ text: "Français (langue maternelle) · Anglais (C1)" }],
  },
];

/* ---- Fiches compétences ---- */
export type SkillCard = {
  kicker: string; title: string; color: Accent; rot: string; tape: "lime" | "paper";
  pills: string[]; image: string; imageWidth: number; imageHeight: number;
};

export const SKILL_CARDS: SkillCard[] = [
  {
    kicker: "Fiche 01",
    title: "Design & Méthodologie",
    color: "paper",
    rot: "-rotate-[1.5deg]",
    tape: "lime",
    pills: [
      "Recherche utilisateur", "Entretiens & tests", "Ateliers de co-design",
      "Discovery & cadrage", "Design system", "Documentation & gouvernance",
      "Accessibilité WCAG 2.2 · RGAA", "Handoff développeurs", "Méthodes agiles",
    ],
    image: "/Design & Méthodologie.png",
    imageWidth: 698,
    imageHeight: 830,
  },
  {
    kicker: "Fiche 02",
    title: "Technique & IA",
    color: "violet",
    rot: "rotate-[1.6deg]",
    tape: "paper",
    pills: [
      "Design-to-code", "Prototypes codés", "Branchés aux API",
      "Prompts & skills IA", "React", "Next.js", "Tailwind CSS",
    ],
    image: "/Technique & IA.png",
    imageWidth: 619,
    imageHeight: 830,
  },
  {
    kicker: "Fiche 03",
    title: "Outils",
    color: "lime",
    rot: "-rotate-[1.2deg]",
    tape: "paper",
    pills: [
      "Figma avancé", "Variables & modes", "Tokens & librairies partagées",
      "FigJam", "Condens", "Illustrator", "Photoshop", "VS Code", "Cursor",
    ],
    image: "/Outils.png",
    imageWidth: 619,
    imageHeight: 830,
  },
];

/* ---- Textes d'accroche, sortis des composants pour être traduisibles ---- */
export const HERO_TEXT =
  "Spécialisée dans les systèmes à forte complexité, j'assure le pont entre l'analyse des besoins métiers et la livraison technique des interfaces.";

export const ABOUT_TEXT =
  "Je conçois des applications pour des environnements exigeants, intervenant souvent comme unique designer au sein d'équipes techniques (Product Managers, architectes, développeurs). J'ancre chaque décision de conception dans la recherche utilisateur, et je la documente avec la même rigueur que le code qui l'entoure, y compris lorsque cette documentation s'adresse à des agents IA.";
