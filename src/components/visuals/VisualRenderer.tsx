// → Type : Server Component
// → Raison : aiguillage pur data → composant, aucun état
import type { Visual } from "../../lib/data";
import type { Lang } from "../../lib/i18n";
import PipelineDiagram from "./PipelineDiagram";
import MockupAbstract from "./MockupAbstract";
import JourneyMap from "./JourneyMap";
import DSTokenSheet from "./DSTokenSheet";
import BeforeAfterAdoption from "./BeforeAfterAdoption";
import ComingSoonPanel from "./ComingSoonPanel";
import PhotoVisual from "./PhotoVisual";
import DiagramVisual from "./DiagramVisual";
import PipelineLoopDiagram from "./PipelineLoopDiagram";
import DemoKitProcessVideo from "./demo-kit/DemoKitProcessVideo";
import NimbusPatterns from "./nimbus/NimbusPatterns";
import NomadConsole from "./esim-simple/NomadConsole";

/** Un seul point d'entrée pour rendre un `Visual` (utilisé par Folders, Hero et la page dossier). */
export default function VisualRenderer({
  visual,
  className = "",
  lang = "fr",
}: {
  visual: Visual;
  className?: string;
  lang?: Lang;
}) {
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
    case "diagram":
      return <DiagramVisual src={visual.src} alt={visual.alt} eyebrow={visual.eyebrow} className={className} />;
    case "pipelineLoop":
      return <PipelineLoopDiagram className={className} lang={lang} />;
    case "demoKitVideo":
      return <DemoKitProcessVideo className={className} lang={lang} />;
    case "contextSwitch":
      return <NomadConsole className={className} lang={lang} />;
    case "nimbusPrefill":
      return (
        <NimbusPatterns
          className={className}
          lang={lang}
          patterns={["prefill"]}
          title={lang === "en" ? "The AI pre-fills, the CS validates" : "L'IA pré-remplit, la CS valide"}
          intro={
            lang === "en"
              ? "The pattern that sets the product apart: every field the system fills appears in red, and nothing is validated without being read. "
              : "Le pattern qui distingue le produit : chaque champ rempli par le système s'affiche en rouge, et rien n'est validé sans relecture. "
          }
        />
      );
  }
}
