// → Type : Server Component
// → Raison : enveloppe statique, aucune interactivité
import type { ReactNode } from "react";
import { Krona_One, Architects_Daughter } from "next/font/google";
import MotionProvider from "./MotionProvider";
import FolderTransitionProvider from "./FolderTransition";
import { type Lang, UI } from "../lib/i18n";
import "../app/globals.css";

/* Typo des <h2> (font-display) : @font-face base64 dans app/font-display.css.
   Volontairement pas next/font/local, qui ajoutait un fallback métrique local(Arial)
   masquant les échecs de chargement. Le reste du site est en font-body. */
const krona = Krona_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-krona",
  display: "swap",
});

/* Manuscrite des annotations : notes de marge (bleu stylo) et repères de schéma (rouge). */
const hand = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

/**
 * L'enveloppe <html>/<body>, partagée par les deux layouts racine.
 *
 * Le site a deux arbres racine — app/(fr) et app/(en) — pour que chacun porte son propre
 * attribut lang. C'est le seul moyen d'avoir « / » en français, « /en » en anglais, deux
 * URLs indexables, et un lang correct des deux côtés : Next n'autorise qu'un seul <html>
 * par arbre, et un layout imbriqué ne peut pas le redéclarer.
 *
 * Contrepartie assumée : passer d'un arbre à l'autre recharge la page. Le sélecteur FR/EN
 * est de toute façon une navigation entre deux arbres.
 */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    /* Les variables next/font sont portées par <html>, pas par <body> : une custom property
       est substituée sur l'élément qui la déclare, et globals.css consomme --font-krona et
       --font-hand depuis :root. Posées sur <body>, elles seraient invalides au niveau de
       :root et --font-accent / --hand tomberaient silencieusement dans le vide. */
    <html lang={lang} className={`${krona.variable} ${hand.variable} scroll-smooth`} suppressHydrationWarning>
      {/* overflow-x-clip et non -hidden : "hidden" fait du <body> un conteneur de
          défilement, ce qui casse le scroll vers les ancres (#about, #contact…).
          "clip" coupe le débordement horizontal sans créer de scroll container. */}
      <body className="overflow-x-clip font-body text-lg text-ink/80 antialiased">
        <a href="#about" className="skip-link">
          {UI[lang].skipLink}
        </a>
        <MotionProvider>
          <FolderTransitionProvider>{children}</FolderTransitionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
