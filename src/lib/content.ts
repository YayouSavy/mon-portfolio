/**
 * Point d'entrée unique du contenu éditorial, par langue.
 *
 * Les composants n'importent plus lib/data directement : ils reçoivent `lang` et
 * appellent getContent(lang). Le français reste la source d'origine, l'anglais en est
 * le miroir — voir lib/data.en.tsx.
 */
import type { Lang } from "./i18n";
import * as fr from "./data";
import * as en from "./data.en";

export type Content = {
  PROJECTS: typeof fr.PROJECTS;
  TAGS: typeof fr.TAGS;
  STATS: typeof fr.STATS;
  PERSONAL_TAGS: typeof fr.PERSONAL_TAGS;
  ID_ROWS: typeof fr.ID_ROWS;
  SKILL_CARDS: typeof fr.SKILL_CARDS;
  HERO_TEXT: string;
  ABOUT_TEXT: string;
};

const CONTENT: Record<Lang, Content> = {
  fr: {
    PROJECTS: fr.PROJECTS,
    TAGS: fr.TAGS,
    STATS: fr.STATS,
    PERSONAL_TAGS: fr.PERSONAL_TAGS,
    ID_ROWS: fr.ID_ROWS,
    SKILL_CARDS: fr.SKILL_CARDS,
    HERO_TEXT: fr.HERO_TEXT,
    ABOUT_TEXT: fr.ABOUT_TEXT,
  },
  en: {
    PROJECTS: en.PROJECTS,
    TAGS: en.TAGS,
    STATS: en.STATS,
    PERSONAL_TAGS: en.PERSONAL_TAGS,
    ID_ROWS: en.ID_ROWS,
    SKILL_CARDS: en.SKILL_CARDS,
    HERO_TEXT: en.HERO_TEXT,
    ABOUT_TEXT: en.ABOUT_TEXT,
  },
};

export function getContent(lang: Lang): Content {
  return CONTENT[lang];
}
