// → Type : Server Component
// → Raison : pas d'état, juste des ancres
import Link from "next/link";

const LINKS = [
  { href: "#about", label: "About me" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-noir/85 backdrop-blur-md">
      {/* w-[min(1240px,100%-48px)] = le conteneur global du site */}
      <div className="mx-auto flex h-[84px] w-[min(1240px,100%-48px)] items-center justify-between gap-6">
        <Link href="#" className="font-accent text-[15px] tracking-[0.08em] text-white">
          ILLIANA SAVY
        </Link>

        <nav aria-label="Navigation principale" className="hidden gap-9 text-[17px] font-medium md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-mist transition-colors duration-300 hover:text-lime">
              {l.label}
            </Link>
          ))}
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
