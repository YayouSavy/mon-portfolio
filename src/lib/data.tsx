import type { ReactNode } from "react";

export type Accent = "lime" | "violet" | "paper";

/* ---- Stickers compétences du hero (positions desktop en lg:) ---- */
export const TAGS: { label: string; color: Accent; pos: string }[] = [
  { label: "Figma avancé",          color: "paper",  pos: "lg:top-[6%] lg:-left-8 lg:-rotate-[7deg]" },
  { label: "Design-to-code",        color: "violet", pos: "lg:top-[26%] lg:-right-7 lg:rotate-[5deg]" },
  { label: "Design system",         color: "lime",   pos: "lg:top-[55%] lg:-left-11 lg:-rotate-[4deg]" },
  { label: "Recherche utilisateur", color: "paper",  pos: "lg:bottom-[14%] lg:-right-9 lg:rotate-[6deg]" },
  { label: "Anglais C1",            color: "violet", pos: "lg:-bottom-4 lg:left-[22%] lg:-rotate-[5deg]" },
];

/* ---- Post-its chiffres ---- */
export const STATS: { num: string; label: string; color: Accent; rot: string; tape: "lime" | "paper" }[] = [
  { num: "6 → 2", label: "mois de cycle de conception, grâce à un agent IA de design-to-code", color: "lime",   rot: "-rotate-3", tape: "paper" },
  { num: "95 %",  label: "d'adoption en 2 mois sur l'outil interne Customer Services",         color: "paper",  rot: "rotate-2",  tape: "lime" },
  { num: "100+",  label: "entretiens, tests et ateliers de co-conception menés",               color: "violet", rot: "-rotate-2", tape: "paper" },
  { num: "3",     label: "web apps télécoms livrées, riches en données",                        color: "paper",  rot: "rotate-3",  tape: "lime" },
];

/* ---- Dossiers projets ---- */
export type Project = {
  id: string;
  color: Accent;
  tab: string;
  title: string;
  meta: string;
  desc: ReactNode;
  metrics: { num: string; label: string }[];
  chips: string[];
  clip: string;   // position du trombone
  tabMl: string;  // décalage de l'onglet
  z: string;      // empilement fermé
};

export const PROJECTS: Project[] = [
  {
    id: "esim-boost",
    color: "lime",
    tab: "Dossier 01 · Web app télécoms",
    title: "eSIM Boost",
    meta: "Sélectionnée au Best of Thales Design",
    desc: (
      <>
        Web app de gestion eSIM, conçue de la discovery à la delivery en tant que{" "}
        <strong>seule designer</strong> d&apos;une équipe agile (PM, PLM, développeurs).
        Interfaces denses en données, pensées et validées avec les utilisateurs terrain.
      </>
    ),
    metrics: [
      { num: "100+", label: "entretiens, tests et ateliers de co-conception" },
      { num: "Best of", label: "Thales Design, sélection interne" },
      { num: "WCAG 2.2", label: "conformité garantie à la livraison" },
    ],
    chips: ["Recherche", "UI data-dense", "Télécoms"],
    clip: "-top-5 right-[16%] rotate-[10deg]",
    tabMl: "ml-5 md:ml-8",
    z: "z-[1]",
  },
  {
    id: "customer-services",
    color: "violet",
    tab: "Dossier 02 · Outil interne",
    title: "Customer Services",
    meta: "Prix d'excellence interne Thales",
    desc: (
      <>
        Outil interne conçu <strong>de bout en bout</strong> : fonctionnalités repensées
        grâce à la recherche utilisateur, traitement des commandes accéléré, et une
        adoption record par les équipes Customer Services.
      </>
    ),
    metrics: [
      { num: "95 %", label: "d'adoption en 2 mois" },
      { num: "1 prix", label: "d'excellence interne" },
      { num: "Commandes", label: "traitement nettement accéléré" },
    ],
    chips: ["Discovery", "Product design", "Outil métier"],
    clip: "-top-[18px] left-[12%] -rotate-[12deg]",
    tabMl: "ml-5 md:ml-[22%] lg:ml-[36%]",
    z: "z-[2]",
  },
  {
    id: "design-system-ia",
    color: "paper",
    tab: "Dossier 03 · Design-to-code",
    title: "Design system × Agent IA",
    meta: "Le cycle de conception divisé par 3",
    desc: (
      <>
        Création, documentation et gouvernance du design system, puis conversion de ses
        règles en <strong>skills exploitables par des agents IA</strong> : prototypes codés
        en React / Next.js, branchés aux API réelles.
      </>
    ),
    metrics: [
      { num: "6 → 2", label: "mois de cycle de conception" },
      { num: "React", label: "prototypes Next.js branchés aux API" },
      { num: "Skills IA", label: "règles du DS converties en prompts" },
    ],
    chips: ["Design system", "Design-to-code", "IA"],
    clip: "-top-[19px] right-[40%] rotate-[6deg]",
    tabMl: "ml-5 md:ml-[44%] lg:ml-[64%]",
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
