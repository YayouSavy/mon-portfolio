// → Type : Server Component
// → Raison : pas d'état — le sous-menu Projets s'appuie sur <details> natif
import Link from "next/link";
import { PROJECTS } from "../lib/data";

export default function Nav() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-noir/85 backdrop-blur-md">
      {/* w-[min(1240px,100%-48px)] = le conteneur global du site */}
      <div className="mx-auto flex h-[84px] w-[min(1240px,100%-48px)] items-center justify-between gap-6">
        <Link href="#" className="font-accent text-[15px] tracking-[0.08em] text-white">
          ILLIANA SAVY
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-9 text-[17px] font-medium md:flex">
          <Link href="#about" className="text-mist transition-colors duration-300 hover:text-lime">
            About me
          </Link>

          {/* <details> natif = disclosure clavier/lecteur d'écran sans ARIA custom à maintenir */}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-mist transition-colors duration-300 hover:text-lime [&::-webkit-details-marker]:hidden">
              Projets
              <span aria-hidden className="text-[10px] transition-transform duration-300 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="absolute left-1/2 top-full z-10 mt-3 w-[248px] -translate-x-1/2 rounded-folder border-2 border-white/10 bg-noir p-2 shadow-paper">
              <Link href="/#projets" className="block rounded-lg px-4 py-2.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-lime">
                Tous les dossiers
              </Link>
              <div className="my-1.5 border-t border-white/10" />
              {PROJECTS.map((p) => (
                <Link
                  key={p.id}
                  href={`/projets/${p.id}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-lime"
                >
                  {p.title}
                  {p.status === "soon" && <span className="text-[10px] uppercase tracking-[0.06em] opacity-50">Bientôt</span>}
                </Link>
              ))}
            </div>
          </details>

          <Link href="#competences" className="text-mist transition-colors duration-300 hover:text-lime">
            Compétences
          </Link>
        </nav>

        <Link
          href="#contact"
          className="rounded-full bg-lime px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#642AEE] active:scale-95"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
