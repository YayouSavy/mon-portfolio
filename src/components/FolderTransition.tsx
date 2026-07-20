"use client";
// → Type : Client Component (Context)
// → Raison : anime "le dossier s'ouvre" (un panneau plein écran, couleur du dossier,
// révélé par clip-path) avant la navigation vers la page projet, puis le révèle.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { Accent } from "../lib/data";

type Phase = "idle" | "covering" | "revealing";

const COVER_BG: Record<Accent, string> = {
  lime: "bg-lime",
  violet: "bg-violet",
  paper: "bg-paper",
  mist: "bg-mist",
};

/* --ease-soft de la DA (globals.css), en tableau pour Framer */
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;
const COVER_MS = 340; // durée de la fermeture du cache
const PAINT_BUFFER_MS = 90; // petite marge après que l'URL a changé, pour laisser la page peindre
const REVEAL_MS = 300; // durée de l'ouverture
const SAFETY_MS = 2500; // filet : révèle quoi qu'il arrive si la navigation traîne (ex. compilation à froid en dev)

const FolderTransitionContext = createContext<((color: Accent, href: string) => void) | null>(null);

/** À appeler depuis le clic d'un dossier : `openFolder(p.color, "/projets/" + p.id)`. */
export function useFolderOpen() {
  const ctx = useContext(FolderTransitionContext);
  if (!ctx) throw new Error("useFolderOpen doit être utilisé dans FolderTransitionProvider");
  return ctx;
}

export default function FolderTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [color, setColor] = useState<Accent>("lime");

  const phaseRef = useRef<Phase>("idle");
  const targetPathRef = useRef<string | null>(null);
  const coverReadyRef = useRef(false); // le cache a fini de couvrir l'écran
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const reveal = useCallback(() => {
    if (phaseRef.current !== "covering") return; // déjà révélé, ou jamais parti
    phaseRef.current = "revealing";
    setPhase("revealing");
    timersRef.current.push(
      window.setTimeout(() => {
        phaseRef.current = "idle";
        targetPathRef.current = null;
        setPhase("idle");
      }, REVEAL_MS)
    );
  }, []);

  const openFolder = useCallback(
    (c: Accent, href: string) => {
      if (phaseRef.current !== "idle") return; // ignore un second clic pendant une transition

      if (shouldReduceMotion) {
        router.push(href);
        return;
      }

      clearTimers();
      phaseRef.current = "covering";
      coverReadyRef.current = false;
      targetPathRef.current = href.split(/[?#]/)[0];
      setColor(c);
      setPhase("covering");

      // On ne navigue qu'une fois le cache refermé : la page qui arrive dessous
      // ne doit jamais être visible avant que l'écran soit plein.
      timersRef.current.push(
        window.setTimeout(() => {
          coverReadyRef.current = true;
          router.push(href);
        }, COVER_MS)
      );

      // Filet de sécurité : si la navigation n'aboutit jamais (ex. compilation
      // à froid très lente en dev), on révèle quand même plutôt que de rester bloqué.
      timersRef.current.push(window.setTimeout(reveal, COVER_MS + SAFETY_MS));
    },
    [router, shouldReduceMotion, reveal, clearTimers]
  );

  // Le vrai signal de "la page est arrivée" : le pathname a changé pour de bon,
  // pas un délai deviné à l'avance (qui casse dès que le rendu de la page prend
  // plus de temps que prévu (build de dev à froid, page plus lourde, etc.).
  useEffect(() => {
    if (phaseRef.current === "covering" && coverReadyRef.current && pathname === targetPathRef.current) {
      timersRef.current.push(window.setTimeout(reveal, PAINT_BUFFER_MS));
    }
  }, [pathname, reveal]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <FolderTransitionContext.Provider value={openFolder}>
      {children}
      <motion.div
        aria-hidden
        className={`light-surface grain-strong pointer-events-none fixed inset-0 z-[200] ${COVER_BG[color]}`}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{
          clipPath:
            phase === "covering"
              ? "inset(0% 0 0 0)"
              : phase === "revealing"
                ? "inset(0 0 100% 0)"
                : "inset(100% 0 0 0)",
        }}
        transition={{ duration: phase === "revealing" ? REVEAL_MS / 1000 : COVER_MS / 1000, ease: EASE_SOFT }}
      />
    </FolderTransitionContext.Provider>
  );
}
