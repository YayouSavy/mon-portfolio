// → Type : Server Component
// → Raison : décoratif/informatif pur, aucun état
import VisualCard from "./VisualCard";

/** Histoire d'impact Customer Services : avant/après + courbe d'adoption. */
export default function BeforeAfterAdoption({
  from,
  to,
  curveTo,
  className = "",
}: {
  from: string;
  to: string;
  curveTo: string;
  className?: string;
}) {
  return (
    <VisualCard className={className}>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.1em] opacity-50">Avant</p>
          <p className="mb-3 text-sm font-semibold">{from}</p>
          <div aria-hidden className="flex flex-col gap-1.5">
            <span className="h-2 w-full rounded-full bg-noir/15" />
            <span className="h-2 w-4/5 rounded-full bg-noir/15" />
            <span className="h-2 w-full rounded-full bg-noir/15" />
            <span className="h-2 w-3/5 rounded-full bg-noir/15" />
          </div>
        </div>
        <div className="border-l border-noir/15 pl-4">
          <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.1em] text-violet">Après</p>
          <p className="mb-3 text-sm font-semibold">{to}</p>
          <div aria-hidden className="flex flex-col gap-1.5">
            <span className="h-2 w-3/5 rounded-full bg-violet/30" />
            <span className="h-2 w-2/5 rounded-full bg-violet/30" />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-noir/15 pt-4">
        <svg aria-hidden viewBox="0 0 120 40" className="h-10 w-24">
          <path
            d="M2 34 C 30 34, 40 30, 55 22 S 90 6, 118 4"
            fill="none"
            stroke="#642AEE"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-right">
          <span className="block text-2xl font-extrabold leading-none">{curveTo}</span>
          <span className="block text-[10px] font-medium opacity-70">d&apos;adoption</span>
        </p>
      </div>
    </VisualCard>
  );
}
