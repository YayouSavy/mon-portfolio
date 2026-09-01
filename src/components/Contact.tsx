"use client";
// → Type : Client Component
// → Raison : whileInView (entrée du bloc CTA)
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { type Lang, UI } from "../lib/i18n";
import { spring, viewport } from "../lib/motion";

export default function Contact({ lang }: { lang: Lang }) {
  const t = UI[lang].contact;
  return (
    <footer id="contact" className="scroll-mt-[84px] pt-[clamp(88px,13vh,170px)]">
      <div className="relative mx-auto w-[min(1240px,100%-48px)] text-center">
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={spring}>
          <SectionTitle className="mb-6 text-[clamp(42px,7vw,104px)]">
            {t.title}
          </SectionTitle>
          <p className="mb-8 text-[18px] opacity-90">
            {t.subtitle}
          </p>
          <a
            href="mailto:savyilliana@gmail.com"
            className="inline-flex items-center gap-2 rounded-folder border-2 border-ink bg-lime px-9 py-[19px] text-[17px] font-semibold text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#642AEE] active:scale-95"
          >
            {t.cta}
          </a>
        </motion.div>
      </div>

      <div className="relative mt-[clamp(80px,11vh,140px)] border-t-2 border-noir/15 bg-mist py-7">
        <div className="mx-auto flex w-[min(1240px,100%-48px)] flex-wrap items-center justify-between gap-4 text-sm font-medium text-ink">
          <p>{t.footerRole}</p>
          <div className="flex flex-wrap gap-7">
            <a href="mailto:savyilliana@gmail.com" className="transition-colors duration-300 hover:text-violet">savyilliana@gmail.com</a>
            <a href="tel:+33750483351" className="transition-colors duration-300 hover:text-violet">07 50 48 33 51</a>
            <a href="#main" className="transition-colors duration-300 hover:text-violet">{t.backToTop}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
