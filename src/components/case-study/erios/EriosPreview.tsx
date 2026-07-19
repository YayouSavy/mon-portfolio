"use client";
// → Type : Client Component
// → Raison : navigation entre les 3 captures (state) + repli propre tant que les
// fichiers ne sont pas déposés dans public/erios/.
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

const SCREENS = [
  { src: "/erios/home.png", alt: "Accueil Erios : niveau, mini-jeux, quiz du jour" },
  { src: "/erios/profile.png", alt: "Profil Erios : badges, succès, textes à trou" },
  { src: "/erios/lesson.png", alt: "Fiche Erios sur le consentement" },
];

function Screen({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="grid h-full place-items-center gap-2 bg-[#FBF1E8] text-[#242F63]/50">
        <ImageOff aria-hidden size={22} strokeWidth={1.75} />
        <p className="text-xs">Capture à venir — dépose {src} dans public{src}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="280px"
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

/** Vraies captures d'écran d'Erios, feuilletables — pas de reconstitution. */
export default function EriosPreview() {
  const [index, setIndex] = useState(0);
  const screen = SCREENS[index];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + SCREENS.length) % SCREENS.length)}
          aria-label="Capture précédente"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-mist transition-colors hover:border-lime/50 hover:text-lime"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        <PhoneFrame>
          <div className="relative h-full w-full">
            <Screen key={screen.src} src={screen.src} alt={screen.alt} />
          </div>
        </PhoneFrame>

        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % SCREENS.length)}
          aria-label="Capture suivante"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-mist transition-colors hover:border-lime/50 hover:text-lime"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex gap-2">
        {SCREENS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Voir la capture ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-lime" : "w-2 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
