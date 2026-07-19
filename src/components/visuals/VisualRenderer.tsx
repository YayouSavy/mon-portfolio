// → Type : Server Component
// → Raison : aiguillage pur data → composant, aucun état
import type { Visual } from "../../lib/data";
import PipelineDiagram from "./PipelineDiagram";
import MockupAbstract from "./MockupAbstract";
import JourneyMap from "./JourneyMap";
import DSTokenSheet from "./DSTokenSheet";
import BeforeAfterAdoption from "./BeforeAfterAdoption";
import ComingSoonPanel from "./ComingSoonPanel";
import PhotoVisual from "./PhotoVisual";

/** Un seul point d'entrée pour rendre un `Visual` — utilisé par Folders, Hero et la page dossier. */
export default function VisualRenderer({ visual, className = "" }: { visual: Visual; className?: string }) {
  switch (visual.kind) {
    case "pipeline":
      return <PipelineDiagram steps={visual.steps} highlight={visual.highlight} className={className} />;
    case "mockup":
      return <MockupAbstract density={visual.density} labels={visual.labels} className={className} />;
    case "journey":
      return <JourneyMap stages={visual.stages} className={className} />;
    case "tokens":
      return <DSTokenSheet className={className} />;
    case "beforeAfter":
      return <BeforeAfterAdoption from={visual.from} to={visual.to} curveTo={visual.curveTo} className={className} />;
    case "comingSoon":
      return <ComingSoonPanel className={className} />;
    case "photo":
      return <PhotoVisual src={visual.src} alt={visual.alt} className={className} />;
  }
}
