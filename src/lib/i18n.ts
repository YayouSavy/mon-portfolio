/**
 * Deux langues, deux arbres racine (app/(fr) et app/(en)), deux jeux d'URL.
 *
 * Ce module ne porte que le « chrome » : navigation, libellés de section, boutons,
 * textes d'accessibilité. Le contenu éditorial — dossiers, chiffres, fiches — vit dans
 * lib/data.tsx (français) et lib/data.en.tsx (anglais), assemblés par lib/content.ts.
 */

export type Lang = "fr" | "en";

export const LANGS: Lang[] = ["fr", "en"];

/**
 * Préfixe d'URL de la langue. Le français est à la racine : c'est la version d'origine,
 * et lui donner un préfixe ferait de « / » une redirection permanente vers « /fr ».
 */
export function href(lang: Lang, path: string): string {
  const clean = path === "/" ? "" : path;
  return lang === "en" ? `/en${clean}` || "/en" : clean || "/";
}

/** La même page dans l'autre langue, pour le sélecteur FR/EN. */
export function otherLangHref(lang: Lang, path: string): string {
  return href(lang === "fr" ? "en" : "fr", path);
}

type Dict = {
  skipLink: string;
  nav: {
    about: string;
    projects: string;
    allProjects: string;
    soon: string;
    notes: string;
    skills: string;
    contact: string;
    downloadCv: string;
    cvFile: string;
    cvFileName: string;
    langGroup: string;
    mainNav: string;
  };
  home: {
    heroAria: string;
    statsAria: string;
    aboutAria: string;
    projectsAria: string;
    projectsTitle: string;
    skillsAria: string;
    skillsTitleA: string;
    skillsTitleB: string;
    openFolder: string;
    seeProgress: string;
    seeCase: (title: string) => string;
    seeAllCases: string;
    offDuty: string;
    awayFromScreens: string;
  };
  caseStudy: {
    back: string;
    context: string;
    role: string;
    process: string;
    decisions: string;
    results: string;
    learnings: string;
    navAria: string;
    prev: string;
    next: string;
    seePublished: string;
    contactMe: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
    footerRole: string;
    backToTop: string;
  };
};

export const UI: Record<Lang, Dict> = {
  fr: {
    skipLink: "Aller au contenu",
    nav: {
      about: "About me",
      projects: "Projets",
      allProjects: "Tous les dossiers",
      soon: "Bientôt",
      notes: "Notes",
      skills: "Compétences",
      contact: "Contact",
      downloadCv: "Télécharger le CV",
      cvFile: "/CV%20Illiana%20Savy%20FR.pdf",
      cvFileName: "CV Illiana Savy FR.pdf",
      langGroup: "Langue du site",
      mainNav: "Navigation principale",
    },
    home: {
      heroAria: "Introduction",
      statsAria: "Résultats clés",
      aboutAria: "À propos",
      projectsAria: "Projets",
      projectsTitle: "Les projets",
      skillsAria: "Compétences",
      skillsTitleA: "Compé",
      skillsTitleB: "tences",
      openFolder: "Ouvrir le dossier",
      seeProgress: "Voir l'avancement",
      seeCase: (title) => `voir le dossier ${title}`,
      seeAllCases: "voir les dossiers",
      offDuty: "( off duty )",
      awayFromScreens: "Hors des écrans",
    },
    caseStudy: {
      back: "Retour aux dossiers",
      context: "Contexte",
      role: "Mon rôle",
      process: "Process",
      decisions: "Décisions & arbitrages",
      results: "Résultats",
      learnings: "Ce que j'en retiens",
      navAria: "Dossiers",
      prev: "Dossier précédent",
      next: "Dossier suivant",
      seePublished: "Voir les dossiers publiés",
      contactMe: "Me contacter",
    },
    contact: {
      title: "Vous recrutez un product designer ?",
      subtitle: "Recherche utilisateur · Design system · Design-to-code",
      cta: "M'écrire →",
      footerRole: "© 2026 Illiana Savy · Product Designer",
      backToTop: "Retour en haut",
    },
  },
  en: {
    skipLink: "Skip to content",
    nav: {
      about: "About me",
      projects: "Projects",
      allProjects: "All cases",
      soon: "Soon",
      notes: "Notes",
      skills: "Skills",
      contact: "Contact",
      downloadCv: "Download CV",
      cvFile: "/CV%20Illiana%20Savy%20FR.pdf",
      cvFileName: "CV Illiana Savy.pdf",
      langGroup: "Site language",
      mainNav: "Main navigation",
    },
    home: {
      heroAria: "Introduction",
      statsAria: "Key results",
      aboutAria: "About",
      projectsAria: "Projects",
      projectsTitle: "The projects",
      skillsAria: "Skills",
      skillsTitleA: "Skil",
      skillsTitleB: "ls",
      openFolder: "Open the case",
      seeProgress: "See the progress",
      seeCase: (title) => `see the ${title} case`,
      seeAllCases: "see the cases",
      offDuty: "( off duty )",
      awayFromScreens: "Away from screens",
    },
    caseStudy: {
      back: "Back to the cases",
      context: "Context",
      role: "My role",
      process: "Process",
      decisions: "Decisions & trade-offs",
      results: "Results",
      learnings: "What I take from it",
      navAria: "Cases",
      prev: "Previous case",
      next: "Next case",
      seePublished: "See the published cases",
      contactMe: "Get in touch",
    },
    contact: {
      title: "Hiring a product designer?",
      subtitle: "User research · Design systems · Design-to-code",
      cta: "Get in touch →",
      footerRole: "© 2026 Illiana Savy · Product Designer",
      backToTop: "Back to top",
    },
  },
};
