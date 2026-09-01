"use client";
// → Type : Client Component
// → Raison : mesure la taille réelle (ResizeObserver) pour dessiner un <path> SVG exact
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { Accent } from "../lib/data";

const FILL: Record<Accent, string> = {
  lime: "var(--color-lime)",
  violet: "var(--color-violet)",
  paper: "var(--color-paper)",
  mist: "var(--color-mist)",
};

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect;
      setSize({ width: box.width, height: box.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
}

/**
 * Silhouette "onglet + corps" en un seul <path> : coins arrondis uniquement sur
 * les angles extérieurs convexes, jonction interne onglet/corps volontairement droite.
 */
function folderPath(w: number, h: number, tabX: number, tabW: number, tabH: number, radius: number) {
  if (w < 2 || h < 2) return "";
  const r = Math.max(0, Math.min(radius, tabH - 1, tabW / 2 - 1, h - tabH - 1, w / 2 - 1));
  return [
    `M ${tabX + r} 0`,
    `L ${tabX + tabW - r} 0`,
    `A ${r} ${r} 0 0 1 ${tabX + tabW} ${r}`,
    `L ${tabX + tabW} ${tabH}`,
    `L ${w - r} ${tabH}`,
    `A ${r} ${r} 0 0 1 ${w} ${tabH + r}`,
    `L ${w} ${h - r}`,
    `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
    `L ${r} ${h}`,
    `A ${r} ${r} 0 0 1 0 ${h - r}`,
    `L 0 ${tabH + r}`,
    `A ${r} ${r} 0 0 1 ${r} ${tabH}`,
    `L ${tabX} ${tabH}`,
    `L ${tabX} ${r}`,
    `A ${r} ${r} 0 0 1 ${tabX + r} 0`,
    "Z",
  ].join(" ");
}

export default function FolderShape({
  fill,
  tabAlign,
  tabHeight = 46,
  tabLabel,
  tabTextClassName = "text-ink",
  className = "",
  children,
}: {
  fill: Accent;
  tabAlign: "left" | "right";
  tabHeight?: number;
  tabLabel: ReactNode;
  tabTextClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  const [ref, { width, height }] = useElementSize<HTMLDivElement>();

  const inset = Math.min(40, Math.max(20, width * 0.045));
  const tabWidth = Math.min(260, Math.max(150, width * 0.32));
  const tabX = tabAlign === "left" ? inset : Math.max(inset, width - tabWidth - inset);
  const ready = width > 0 && height > 0;
  const d = ready ? folderPath(width, height, tabX, tabWidth, tabHeight, 22) : "";

  return (
    <div ref={ref} className={`relative ${className}`}>
      {ready && (
        <>
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.45)) drop-shadow(0 16px 24px rgba(0,0,0,0.35))" }}
          >
            <path d={d} style={{ fill: FILL[fill] }} stroke="var(--color-noir)" strokeWidth={2.5} />
          </svg>
          {/* Grain papier discret, même texture SVG que le reste du site, clippé à la silhouette exacte */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: "var(--grain)", opacity: 0.5, mixBlendMode: "multiply", clipPath: `path("${d}")` }}
          />
        </>
      )}

      {ready && (
        <p
          className={`absolute top-0 flex items-center px-6 font-accent text-[11px] uppercase tracking-[0.1em] ${tabTextClassName}`}
          style={{ left: tabX, width: tabWidth, height: tabHeight }}
        >
          {tabLabel}
        </p>
      )}

      <div style={{ paddingTop: tabHeight }}>{children}</div>
    </div>
  );
}
