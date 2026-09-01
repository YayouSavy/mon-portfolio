"use client";
// → Type : Client Component
// → Raison : whileInView (pop des fiches)
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle, { Accent as AccentWord } from "./SectionTitle";
import Tape from "./props/Tape";
import { getContent } from "../lib/content";
import { type Lang, UI } from "../lib/i18n";
import { spring, springBouncy, viewport } from "../lib/motion";

export default function Skills({ lang }: { lang: Lang }) {
  const t = UI[lang].home;
  const { SKILL_CARDS } = getContent(lang);

  return (
    <section id="competences" aria-label={t.skillsAria} className="scroll-mt-[84px] py-[clamp(72px,10vh,140px)]">
      <div className="mx-auto w-[min(1240px,100%-48px)]">
        <motion.header
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={spring}
          className="mb-14"
        >
          <SectionTitle>
            {t.skillsTitleA}
            <AccentWord>{t.skillsTitleB}</AccentWord>
          </SectionTitle>
        </motion.header>

        <div className="mx-auto grid max-w-[640px] items-start gap-[clamp(22px,2.8vw,36px)] lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {SKILL_CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 34, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewport}
              transition={{ ...springBouncy, delay: i * 0.11 }}
              className="relative"
            >
              <Tape color={c.tape} className="-top-[3px] left-1/2 -translate-x-1/2 -rotate-[4deg]" />
              <Image
                src={c.image}
                alt={c.pills.filter((pill) => pill !== "Tokens & librairies partagées" && pill !== "Shared tokens & libraries").join(", ")}
                width={c.imageWidth}
                height={c.imageHeight}
                className={`relative z-[1] h-auto w-full transition-all duration-300 ease-spring hover:-translate-y-2 hover:!rotate-0 ${c.rot}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
