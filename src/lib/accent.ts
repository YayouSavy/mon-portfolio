import type { Accent } from "./data";

/**
 * Rendu visuel partagé par couleur d'accent : dossiers (Folders), pile du Hero,
 * et page d'étude de cas. Un seul endroit à modifier pour que les trois restent alignés.
 * "mist" = 4ᵉ accent neutre, pour un dossier qui n'a pas besoin d'une couleur déjà prise.
 */
export const ACCENT_STYLES: Record<
  Accent,
  { body: string; grain: string; stroke: string; inverse: string; light: boolean }
> = {
  lime:   { body: "bg-lime text-ink",     grain: "grain-strong",  stroke: "border-noir",  inverse: "bg-ink text-lime",     light: true },
  violet: { body: "bg-violet text-white", grain: "grain-overlay", stroke: "border-white", inverse: "bg-white text-violet", light: false },
  paper:  { body: "bg-paper text-ink",    grain: "grain-strong",  stroke: "border-noir",  inverse: "bg-ink text-paper",    light: true },
  mist:   { body: "bg-mist text-ink",     grain: "grain-strong",  stroke: "border-noir",  inverse: "bg-ink text-mist",     light: true },
};
