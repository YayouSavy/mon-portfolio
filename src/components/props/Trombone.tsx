// → Type : Server Component
// → Raison : décoratif pur, aucun état ni événement
import { useId } from "react";

/**
 * Trombone métallique. Dégradé 100% palette : paper → mist → noir.
 * Positionne-le via className : "absolute -top-5 right-[16%] rotate-[10deg]"
 */
export default function Trombone({ className = "" }: { className?: string }) {
  const id = useId(); // évite les collisions d'id de dégradé entre instances

  return (
    <svg
      viewBox="0 0 30 68"
      aria-hidden="true"
      className={`pointer-events-none absolute z-[5] h-[66px] w-[30px] drop-shadow-[1.5px_2.5px_1px_rgba(0,0,0,0.4)] ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBFBFB" />
          <stop offset="48%" stopColor="#EFEFEF" />
          <stop offset="100%" stopColor="#131313" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M9 54 V15 a6.5 6.5 0 0 1 13 0 v37 a4.5 4.5 0 0 1 -9 0 V19"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="4.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
