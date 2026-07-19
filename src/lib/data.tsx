import type { ReactNode } from "react";
import PlaceholderList from "../components/case-study/PlaceholderList";

export type Accent = "lime" | "violet" | "paper" | "mist";

/* ---- Stickers compétences du hero : flottent autour de la photo en lg: (pos), rangée simple en dessous. ---- */
export const TAGS: { label: string; color: Accent; pos: string }[] = [
  { label: "Figma avancé",          color: "paper",  pos: "lg:top-[2%] lg:-left-14 lg:-rotate-[9deg]" },
  { label: "Design-to-code",        color: "violet", pos: "lg:top-[18%] lg:-right-16 lg:rotate-[8deg]" },
  { label: "Design system",         color: "lime",   pos: "lg:top-[46%] lg:-left-20 lg:rotate-[3deg]" },
  { label: "Recherche utilisateur", color: "paper",  pos: "lg:top-[68%] lg:-right-12 lg:-rotate-[10deg]" },
  { label: "Anglais C1",            color: "violet", pos: "lg:-bottom-8 lg:left-[14%] lg:rotate-[6deg]" },
];

/* ---- Pastilles "hors des écrans" · About, sous la fiche identité ---- */
export const PERSONAL_TAGS: { label: string; color: Accent }[] = [
  { label: "Mode", color: "lime" },
  { label: "Design graphique", color: "violet" },
  { label: "Broderie", color: "lime" },
  { label: "Jeux vidéo", color: "violet" },
  { label: "Mangas", color: "lime" },
  { label: "Déco d'intérieur", color: "violet" },
];

/* ---- Post-its chiffres · chacun pointe vers le dossier qui porte le chiffre ---- */
export const STATS: { num: string; label: string; color: Accent; rot: string; tape: "lime" | "paper"; projectId?: string }[] = [
  { num: "6 → 2", label: "mois de cycle de conception, grâce à un agent IA de design-to-code", color: "lime",   rot: "-rotate-3", tape: "paper", projectId: "design-system-ia" },
  { num: "95 %",  label: "d'adoption en 2 mois sur l'outil interne Customer Services",         color: "paper",  rot: "rotate-2",  tape: "lime",  projectId: "customer-services" },
  { num: "100+",  label: "entretiens, tests et ateliers de co-conception menés",               color: "violet", rot: "-rotate-2", tape: "paper", projectId: "esim-boost" },
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
  | { kind: "photo"; src: string; alt: string };

export type ProcessStep = { title: string; body: string; visual: Visual };

/* ---- Dossiers projets ---- */
export type Project = {
  id: string;
  status: "live" | "soon" | "preview"; // preview = contenu réel, mise en page allégée (ex. projet en évolution)
  color: Accent;
  tab: string;
  title: string;
  meta: string;
  role: string;            // énoncé précis du rôle — une seule fois, ici
  desc: ReactNode;         // teaser homepage (Folders fermé/survolé)
  context?: string;        // étude de cas : problème / contexte
  process?: ProcessStep[]; // étude de cas : 3 étapes avec visuel
  decisions?: string[];    // arbitrages assumés
  learnings?: string;      // ce que ça m'a appris
  ndaNote?: string;        // note de confidentialité, assumée
  cover: Visual;           // visuel principal — réutilisé en vignette ET en page
  placeholders?: { label: string; body?: ReactNode }[]; // sections riches, rédigées ou à rédiger plus tard
  metrics: { num: string; label: string }[];
  chips: string[];
  tabMl: string;  // décalage de l'onglet
  z: string;      // empilement fermé
};

export const PROJECTS: Project[] = [
  {
    id: "esim-boost",
    status: "live",
    color: "lime",
    tab: "Dossier 01 · Web app télécoms",
    title: "eSIM Boost",
    meta: "Sélectionnée au Best of Thales Design",
    role: "Seule designer produit, au sein d'une équipe de production composée d'un Product Manager, d'un PLM et de développeurs — de la recherche jusqu'à la delivery.",
    desc: (
      <>
        Web app de gestion eSIM, conçue de la discovery à la delivery en tant que{" "}
        <strong>seule designer</strong> d&apos;une équipe agile (PM, PLM, développeurs).
        Interfaces denses en données, pensées et validées avec les utilisateurs terrain.
      </>
    ),
    context:
      "Thales avait besoin d'une web app pour gérer le cycle de vie des eSIM (provisioning, activation, suivi, support). Les interfaces existantes étaient pensées pour des experts métier, pas pour la densité réelle du terrain — et sans designer senior pour doubler le poste.",
    process: [
      {
        title: "Recherche terrain",
        body: "100+ entretiens, tests utilisateurs et ateliers de co-conception avec les équipes terrain, pour ancrer chaque écran dans des cas d'usage réels plutôt que dans des suppositions.",
        visual: { kind: "journey", stages: ["Entretiens terrain", "Tests utilisateurs", "Atelier co-conception", "Synthèse"] },
      },
      {
        title: "Interfaces data-dense",
        body: "Tableaux, statuts eSIM et actions groupées redessinés pour rester lisibles à haute densité d'information, testés en conditions réelles avec les équipes terrain.",
        visual: { kind: "mockup", density: "grid", labels: ["Statut", "Opérateur", "Profil", "Action"] },
      },
      {
        title: "Design system & accessibilité",
        body: "Composants documentés et conformité WCAG 2.2 garantie dès la livraison, pour un handoff direct aux développeurs sans aller-retour qualité.",
        visual: { kind: "tokens" },
      },
    ],
    decisions: [
      "Prioriser la densité d'info utile plutôt que l'épure visuelle — les équipes terrain traitent des dizaines d'eSIM en simultané.",
      "Documenter le design system en parallèle du produit plutôt qu'après coup, pour tenir le rythme agile sans dette.",
      "Valider chaque itération majeure par du test utilisateur plutôt que par la seule revue interne.",
    ],
    learnings:
      "Concevoir seule pour une équipe de production m'a appris à documenter aussi précisément qu'un design system l'exige — ce qui a rendu possible la conversion en skills IA du dossier Design-to-code.",
    ndaNote: "Visuels reconstitués génériquement : données, statuts et libellés sont fictifs, pour respecter la confidentialité Thales.",
    cover: { kind: "mockup", density: "grid", labels: ["eSIM #A104", "Statut", "Ligne", "Action"] },
    metrics: [
      { num: "100+", label: "entretiens, tests et ateliers de co-conception" },
      { num: "Best of", label: "Thales Design, sélection interne" },
      { num: "WCAG 2.2", label: "conformité garantie à la livraison" },
    ],
    chips: ["Recherche", "UI data-dense", "Télécoms"],
    tabMl: "ml-5 md:ml-8",
    z: "z-[1]",
  },
  {
    id: "design-system-ia",
    status: "live",
    color: "paper",
    tab: "Dossier 02 · Design-to-code",
    title: "Design system × Agent IA",
    meta: "Le cycle de conception divisé par 3",
    role: "Seule designer à l'origine du design system, de sa gouvernance et de sa conversion en règles exploitables par un agent IA.",
    desc: (
      <>
        Création, documentation et gouvernance du design system, puis conversion de ses
        règles en <strong>skills exploitables par des agents IA</strong> : prototypes codés
        en React / Next.js, branchés aux API réelles.
      </>
    ),
    context:
      "Le cycle conception → livraison prenait jusqu'à 6 mois sur certains projets : trop d'allers-retours entre maquette, spec et code. Hypothèse : si le design system est assez rigoureux, ses règles peuvent devenir des skills qu'un agent IA sait appliquer pour générer un premier prototype codé fiable.",
    process: [
      {
        title: "Design system",
        body: "Création, documentation et gouvernance des composants, tokens et règles d'usage — la fondation sans laquelle rien n'est automatisable.",
        visual: { kind: "tokens" },
      },
      {
        title: "Conversion en skills IA",
        body: "Traduction des règles du design system en prompts et skills structurés, exploitables par un agent IA de génération de code.",
        visual: { kind: "pipeline", steps: ["Design system", "Skills IA", "Agent IA", "Proto codé"], highlight: 1 },
      },
      {
        title: "Prototype codé",
        body: "Génération de prototypes React / Next.js branchés aux API réelles, prêts pour revue développeurs plutôt que pour une simple démo visuelle.",
        visual: { kind: "mockup", density: "list", labels: ["Composant", "Props", "État", "API"] },
      },
    ],
    decisions: [
      "Investir du temps dans la rigueur du design system avant de toucher à l'IA — un skill ne vaut que ce que vaut la règle qu'il encode.",
      "Brancher les prototypes aux API réelles plutôt qu'à des données statiques, pour que la revue développeurs porte sur du vrai comportement.",
      "Garder un contrôle humain sur chaque sortie de l'agent avant intégration — l'IA accélère le premier jet, pas la validation.",
    ],
    learnings:
      "Le design-to-code ne remplace pas le jugement design : il déplace l'effort vers l'amont (rigueur du système) et libère du temps en aval (delivery).",
    ndaNote: "Le pipeline ci-contre est montré dans sa structure ; les règles et prompts précis restent internes à Thales.",
    cover: { kind: "pipeline", steps: ["Design system", "Skills IA", "Agent IA", "Proto codé"] },
    metrics: [
      { num: "6 → 2", label: "mois de cycle de conception" },
      { num: "React", label: "prototypes Next.js branchés aux API" },
      { num: "Skills IA", label: "règles du DS converties en prompts" },
    ],
    chips: ["Design system", "Design-to-code", "IA"],
    tabMl: "ml-5 md:ml-[18%] lg:ml-[26%]",
    z: "z-[2]",
  },
  {
    id: "customer-services",
    status: "live",
    color: "violet",
    tab: "Dossier 03 · Outil interne",
    title: "Customer Services",
    meta: "Prix d'excellence interne Thales",
    role: "Seule designer produit sur la refonte, en binôme rapproché avec les équipes Customer Services et un PM.",
    desc: (
      <>
        Outil interne conçu <strong>de bout en bout</strong> : fonctionnalités repensées
        grâce à la recherche utilisateur, traitement des commandes accéléré, et une
        adoption record par les équipes Customer Services.
      </>
    ),
    context:
      "L'outil interne de traitement des commandes était lent et peu adopté : contournements, tickets support récurrents, formation lourde à chaque arrivée. Objectif : une refonte capable de changer réellement les habitudes de travail, pas juste un rafraîchissement visuel.",
    process: [
      {
        title: "Diagnostic terrain",
        body: "Observation et entretiens avec les équipes Customer Services pour cartographier les points de friction réels du traitement de commandes, au-delà des tickets remontés.",
        visual: { kind: "journey", stages: ["Observation terrain", "Entretiens", "Cartographie des frictions"] },
      },
      {
        title: "Refonte des parcours clés",
        body: "Fonctionnalités et parcours repensés autour des tâches à plus forte friction, validés par itérations avec les utilisateurs finaux.",
        visual: { kind: "mockup", density: "list", labels: ["Commande", "Statut", "Étape", "Action"] },
      },
      {
        title: "Adoption & impact",
        body: "Accompagnement du déploiement ; suivi de l'adoption réelle plutôt que de la seule mise en prod.",
        visual: { kind: "beforeAfter", from: "Formation lourde", to: "Adoption spontanée", curveTo: "95 %" },
      },
    ],
    decisions: [
      "Prioriser les parcours à plus fort volume plutôt que l'exhaustivité fonctionnelle, pour un impact mesurable vite.",
      "Mesurer le succès par l'adoption réelle des équipes, pas par la livraison des écrans.",
    ],
    learnings: "Un outil interne ne se juge pas à sa livraison mais à son adoption.",
    ndaNote: "Écrans reconstitués génériquement : parcours et libellés sont fictifs, pour respecter la confidentialité Thales.",
    cover: { kind: "beforeAfter", from: "Traitement manuel, 12 étapes", to: "Parcours guidé, 4 étapes", curveTo: "95 %" },
    metrics: [
      { num: "95 %", label: "d'adoption en 2 mois" },
      { num: "1 prix", label: "d'excellence interne" },
      { num: "Commandes", label: "traitement nettement accéléré" },
    ],
    chips: ["Discovery", "Product design", "Outil métier"],
    tabMl: "ml-5 md:ml-[36%] lg:ml-[52%]",
    z: "z-[3]",
  },
  {
    id: "erios",
    status: "preview",
    color: "mist",
    tab: "Dossier 04 · Application mobile",
    title: "Erios",
    meta: "Projet de Master · Application mobile",
    role: "",
    desc: (
      <>
        Application mobile d&apos;éducation sexuelle pour les 15-18 ans, conçue par une équipe de{" "}
        <strong>11 étudiants</strong> en Master — recherche terrain, chatbot IA et contenus pensés
        pour lever les tabous.
      </>
    ),
    cover: { kind: "photo", src: "/erios/home.png", alt: "Écran d'accueil de l'application Erios" },
    placeholders: [
      {
        label: "La demande",
        body: (
          <>
            <p className="mb-4">
              Erios est un projet de start-up porté par 11 étudiants en Master Information-Communication
              et Création Numérique. La demande initiale répondait à un constat : le manque criant
              d&apos;éducation sexuelle complète et fiable pour les adolescents français, aggravé par le
              non-respect de l&apos;obligation légale de trois séances annuelles d&apos;éducation
              sexuelle à l&apos;école (seulement 13 % des séances prévues sont réellement dispensées) et
              par un tabou persistant qui empêche les jeunes de poser librement leurs questions, que ce
              soit en classe ou en famille.
            </p>
            <p className="mb-3">L&apos;objectif fixé était de concevoir une application mobile capable de :</p>
            <PlaceholderList
              items={[
                "Fournir une information fiable, complète et adaptée à l'âge des adolescents (15-18 ans)",
                "Couvrir des thématiques souvent négligées par l'école (psycho-émotionnel, consentement, identités de genre, orientations sexuelles)",
                "Créer un espace anonyme et sans jugement pour permettre aux jeunes de poser toutes leurs questions",
              ]}
            />
          </>
        ),
      },
      {
        label: "La recherche menée",
        body: (
          <>
            <p className="mb-3">
              L&apos;équipe a mené une enquête quantitative auprès de 35 répondants (principalement des
              femmes de 16-18 ans, profils sociaux variés) pour valider ses hypothèses. Les résultats ont
              confirmé plusieurs constats clés :
            </p>
            <PlaceholderList
              items={[
                "17,1 % des répondants n'ont jamais eu de cours d'éducation sexuelle",
                "76 % jugent l'éducation sexuelle à l'école insuffisante (étude OpinionWay / La Maison des Femmes)",
                "Plus de la moitié des jeunes n'osent pas poser toutes leurs questions en cours",
                "45,7 % ne peuvent pas parler de sexualité avec leur famille",
                "Seulement 14,3 % feraient entièrement confiance à une IA pour des questions intimes — un point critique qui a orienté la stratégie produit (nécessité d'une mascotte pour humaniser le chatbot)",
              ]}
            />
            <p className="mt-4">
              Cette recherche a été complétée par une analyse concurrentielle (Hello Clito, Tumeplay,
              Sacha, Chababi Jouwa, etc.), une étude SWOT, un benchmark sectoriel et la construction de 4
              personas (Léo, Heidi, Tom, Fara) représentant la diversité des profils et besoins ciblés.
            </p>
          </>
        ),
      },
      {
        label: "Les itérations",
        body: (
          <>
            <p className="mb-3">
              Le projet a connu plusieurs évolutions majeures suite aux retours obtenus (enseignants,
              jury, utilisateurs) :
            </p>
            <PlaceholderList
              items={[
                "Changement de nom : « Sexploration » → « Érios » (acronyme Éducation, Respect, Intimité, Ouverture, Sexualité), jugé plus neutre, inclusif et professionnel, sur recommandation de professeurs",
                "Recentrage de la cible : passage d'un public large à une cible précise de 15-18 ans, permettant un contenu plus ciblé (quiz, jeux adaptés)",
                "Refonte de la partie marketing de la note d'intention suite aux retours qualité",
                "Ajustement de l'équipe après le départ d'un membre du pôle marketing",
                "Méthodologie Agile appliquée tout au long du projet (sprints de 2 semaines, priorisation MoSCoW, communication via WhatsApp par pôles) pour intégrer rapidement les retours utilisateurs et jury",
              ]}
            />
          </>
        ),
      },
      {
        label: "La présentation du produit final",
        body: (
          <>
            <p className="mb-3">
              Erios est une application mobile (iOS/Android, développée en React Native) et un site
              vitrine (HTML/CSS/JS) dédiés à l&apos;éducation sexuelle des adolescents de 15 à 18 ans.
            </p>
            <p className="mb-3">Fonctionnalités clés :</p>
            <PlaceholderList
              items={[
                "Éri, un chatbot IA (basé sur le modèle Phi2 via Ollama) incarné par une mascotte, disponible 24/7, anonyme et non-jugeant, entraîné sur des données validées par des professionnels de santé",
                "Contenus éducatifs sous forme d'articles, infographies et vidéos couvrant biologie, contraception, orientation sexuelle, identité de genre, relations, bien-être, droits et législation",
                "Jeux et quiz interactifs (textes à trous, histoires immersives) avec système de gamification (badges, niveaux, progression)",
                "Carte interactive pour localiser les services de santé sexuelle à proximité",
                "Ressources dédiées aux victimes de violences ou harcèlement",
              ]}
            />
          </>
        ),
      },
    ],
    metrics: [
      { num: "35", label: "répondants à l'enquête quantitative" },
      { num: "11", label: "étudiant·e·s dans l'équipe projet" },
      { num: "4", label: "personas construits pour cadrer les besoins" },
    ],
    chips: ["Projet d'équipe", "App mobile", "Éducation"],
    tabMl: "ml-5 md:ml-[54%] lg:ml-[76%]",
    z: "z-[4]",
  },
];

/* ---- About me ---- */
export const STEPS: { title: string; desc: string }[] = [
  { title: "Recherche utilisateur", desc: "Entretiens, tests et ateliers de co-conception pour ancrer chaque décision dans le terrain." },
  { title: "Discovery et cadrage", desc: "Validation d'hypothèses avec PM et PLM avant d'investir une seule maquette." },
  { title: "Design system", desc: "Création, documentation, gouvernance, puis conversion des règles en skills pour agents IA." },
  { title: "Prototype codé et delivery", desc: "Prototypes React / Next.js branchés aux API, livrés accessibles et prêts pour les développeurs." },
];

export const ID_ROWS: { dt: string; lines: { text: string; muted?: boolean }[] }[] = [
  { dt: "Base", lines: [{ text: "La Ciotat · France" }] },
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
      { text: "Product Designer · Thales, via Groupe SII · 2024 → aujourd'hui" },
      { text: "stage, puis alternance, puis CDI", muted: true },
      { text: "Community Manager · F&C SAS · 2023" },
    ],
  },
];

/* ---- Fiches compétences ---- */
export const SKILL_CARDS: { kicker: string; title: string; color: Accent; rot: string; tape: "lime" | "paper"; pills: string[] }[] = [
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
  },
];
