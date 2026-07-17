"use client";
// → Type : Client Component
// → Raison : whileInView (pop de la bulle)
import { motion } from "framer-motion";
import { FileDown, Mail, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle, { Accent } from "./SectionTitle";
import { spring, springBouncy, viewport } from "../lib/motion";

/* Lucide ne fournit plus les icônes de marques : LinkedIn passe en monogramme "in" */
type ContactLink = {
  href: string;
  label: string;
  Icon?: LucideIcon;
  text?: string;
  external?: boolean;
  download?: boolean;
};

const LINKS: ContactLink[] = [
  { href: "https://www.linkedin.com/", label: "LinkedIn", text: "in", external: true },
  { href: "mailto:savyilliana@gmail.com", label: "Écrire un e-mail", Icon: Mail },
  { href: "tel:+33750483351", label: "Appeler", Icon: Phone },
  { href: "/Savy_Illiana_CV.pdf", label: "Télécharger le CV", Icon: FileDown, download: true },
];

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-[clamp(88px,13vh,170px)]">
      {/* Glow violet remontant du bas */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[560px] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(100,42,238,0.36)_0%,transparent_62%)] blur-[80px]"
      />

      <div className="relative mx-auto w-[min(1240px,100%-48px)] text-center">
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring}>
          <SectionTitle className="mb-6 text-[clamp(42px,7vw,104px)]">
            Un produit <Accent>à concevoir ?</Accent>
          </SectionTitle>
          <p className="mx-auto mb-[52px] max-w-[46ch] text-xl text-mist">
            Discutons recherche, design system ou design-to-code. Réponse rapide, promis.
          </p>
        </motion.div>

        {/* Bulle façon "partager" : queue en clip-path, grain, boutons ronds */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.82 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewport}
          transition={{ ...springBouncy, delay: 0.15 }}
          className="light-surface grain-multiply relative inline-block -rotate-2 rounded-[26px] bg-lime px-9 pb-[30px] pt-[26px] text-ink shadow-paper transition-all duration-300 ease-spring before:absolute before:-bottom-[17px] before:left-[58px] before:h-5 before:w-[34px] before:bg-lime before:content-[''] before:[clip-path:polygon(0_0,100%_0,26%_100%)] hover:shadow-paper-lift hover:!rotate-0"
        >
          <p className="mb-[18px] font-accent text-xs uppercase tracking-[0.09em]">Me retrouver ici</p>
          <div className="relative z-[1] flex justify-center gap-3.5">
            {LINKS.map(({ href, label, Icon, text, external, download }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
                {...(download ? { download: true } : {})}
                className="grid h-[50px] w-[50px] place-items-center rounded-full bg-noir text-white transition-all duration-300 ease-spring hover:-rotate-6 hover:-translate-y-1 hover:bg-violet"
              >
                {Icon ? <Icon size={21} strokeWidth={2} aria-hidden /> : <span aria-hidden className="text-[15px] font-extrabold lowercase">{text}</span>}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative mt-[clamp(80px,11vh,140px)] border-t border-white/10 py-7">
        <div className="mx-auto flex w-[min(1240px,100%-48px)] flex-wrap items-center justify-between gap-4 text-sm text-mist">
          <p>© 2026 Illiana Savy · Product Designer</p>
          <div className="flex flex-wrap gap-7">
            <a href="mailto:savyilliana@gmail.com" className="transition-colors duration-300 hover:text-lime">savyilliana@gmail.com</a>
            <a href="tel:+33750483351" className="transition-colors duration-300 hover:text-lime">07 50 48 33 51</a>
            <a href="#main" className="transition-colors duration-300 hover:text-lime">Retour en haut</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
