// → Type : Server Component
// → Raison : pas d'état, le sous-menu Projets s'appuie sur <details> natif
import Link from "next/link";
import { getContent } from "../lib/content";
import { href, otherLangHref, type Lang, UI } from "../lib/i18n";

/**
 * `path` = le chemin de la page SANS préfixe de langue ("/", "/projets/demo-kit"…).
 * Il sert au sélecteur FR/EN : basculer doit amener sur la même page dans l'autre langue,
 * pas renvoyer à l'accueil.
 */
export default function Nav({ lang, path = "/" }: { lang: Lang; path?: string }) {
  const t = UI[lang];
  const { PROJECTS } = getContent(lang);
  const other: Lang = lang === "fr" ? "en" : "fr";

  return (
    <header className="sticky top-0 z-[100] border-b border-noir/10 bg-mist">
      {/* w-[min(1240px,100%-48px)] = le conteneur global du site */}
      <div className="mx-auto flex h-[84px] w-[min(1240px,100%-48px)] items-center justify-between gap-6">
        <Link href={href(lang, "/")} className="font-accent text-[15px] tracking-[0.08em] text-ink">
          ILLIANA SAVY
        </Link>

        {/* Ancres préfixées par la racine de langue : sans ça, depuis /projets/[slug] le lien
            pointe sur /projets/[slug]#about, où la section n'existe pas, et rien ne se passe. */}
        <nav aria-label={t.nav.mainNav} className="hidden items-center gap-9 text-[17px] font-medium md:flex">
          <Link href={`${href(lang, "/")}#about`} className="text-ink/70 transition-colors duration-300 hover:text-violet">
            {t.nav.about}
          </Link>

          {/* <details> natif = disclosure clavier/lecteur d'écran sans ARIA custom à maintenir */}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-ink/70 transition-colors duration-300 hover:text-violet [&::-webkit-details-marker]:hidden">
              {t.nav.projects}
              <span aria-hidden className="text-[10px] transition-transform duration-300 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="absolute left-1/2 top-full z-10 mt-3 w-[248px] -translate-x-1/2 rounded-folder border-2 border-noir/10 bg-paper p-2 shadow-paper">
              <Link
                href={`${href(lang, "/")}#projets`}
                className="block rounded-[14px] px-4 py-2.5 text-sm text-ink/70 transition-colors hover:bg-noir/5 hover:text-violet"
              >
                {t.nav.allProjects}
              </Link>
              <div className="my-1.5 border-t border-noir/10" />
              {PROJECTS.map((p) => (
                <Link
                  key={p.id}
                  href={href(lang, `/projets/${p.id}`)}
                  className="flex items-center justify-between gap-3 rounded-[14px] px-4 py-2.5 text-sm text-ink/70 transition-colors hover:bg-noir/5 hover:text-violet"
                >
                  {p.title}
                  {p.status === "soon" && (
                    <span className="text-[10px] uppercase tracking-[0.06em] opacity-50">{t.nav.soon}</span>
                  )}
                </Link>
              ))}
            </div>
          </details>

          {/* Note de méthode : hors grille projets, elle a besoin de sa propre entrée. */}
          <Link
            href={href(lang, "/notes/design-system-ia")}
            className="text-ink/70 transition-colors duration-300 hover:text-violet"
          >
            {t.nav.notes}
          </Link>

          <Link
            href={`${href(lang, "/")}#competences`}
            className="text-ink/70 transition-colors duration-300 hover:text-violet"
          >
            {t.nav.skills}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Sélecteur de langue : un vrai lien vers la même page dans l'autre arbre.
              La navigation recharge la page — les deux langues sont deux layouts racine,
              c'est le prix à payer pour un <html lang> correct de chaque côté. */}
          <div
            role="group"
            aria-label={t.nav.langGroup}
            className="hidden items-center gap-0.5 rounded-folder border-2 border-noir/15 p-1 font-accent text-[11px] tracking-[0.06em] md:flex"
          >
            <span aria-current="true" className="rounded-[10px] bg-noir/10 px-3 py-1.5 text-ink">
              {lang.toUpperCase()}
            </span>
            <Link
              href={otherLangHref(lang, path)}
              hrefLang={other}
              className="rounded-[10px] px-3 py-1.5 text-ink/60 transition-colors duration-300 hover:text-violet"
            >
              {other.toUpperCase()}
            </Link>
          </div>

          <Link
            href={`${href(lang, "/")}#contact`}
            className="rounded-folder bg-ink px-7 py-3.5 text-[15px] font-semibold text-paper transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95"
          >
            {t.nav.contact}
          </Link>

          {/* Même gabarit que le bouton Contact : px-7 py-3.5. Les deux se lisent comme une
              paire, une différence de 4px de haut se voit comme un défaut d'alignement. */}
          <a
            href={t.nav.cvFile}
            download={t.nav.cvFileName}
            className="hidden rounded-folder bg-lime px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 md:inline-block"
          >
            {t.nav.downloadCv}
          </a>
        </div>
      </div>
    </header>
  );
}
