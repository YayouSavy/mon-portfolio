"use client";
// → Type : Client Component (Context)
// → Raison : anime "le dossier s'ouvre" (un panneau plein écran, couleur du dossier,
// révélé par clip-path) avant la navigation vers la page projet, puis le révèle.
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
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
const COVER_MS = 340;
const PAINT_BUFFER_MS = 140;
const REVEAL_MS = 300;

const FolderTransitionContext = createContext<((color: Accent, href: string) => void) | null>(null);

/** À appeler depuis le clic d'un dossier : `openFolder(p.color, "/projets/" + p.id)`. */
export function useFolderOpen() {
  const ctx = useContext(FolderTransitionContext);
  if (!ctx) throw new Error("useFolderOpen doit être utilisé dans FolderTransitionProvider");
  return ctx;
}

export default function FolderTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [color, setColor] = useState<Accent>("lime");
  const phaseRef = useRef<Phase>("idle");

  const openFolder = useCallback(
    (c: Accent, href: string) => {
      if (phaseRef.current !== "idle") return; // ignore un second clic pendant une transition

      if (shouldReduceMotion) {
        router.push(href);
        return;
      }

      phaseRef.current = "covering";
      setColor(c);
      setPhase("covering");

      window.setTimeout(() => {
        router.push(href);
        window.setTimeout(() => {
          phaseRef.current = "revealing";
          setPhase("revealing");
          window.setTimeout(() => {
            phaseRef.current = "idle";
            setPhase("idle");
          }, REVEAL_MS);
        }, PAINT_BUFFER_MS);
      }, COVER_MS);
    },
    [router, shouldReduceMotion]
  );

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
