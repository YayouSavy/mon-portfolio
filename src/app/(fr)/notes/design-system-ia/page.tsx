// → Type : Server Component
// → Raison : métadonnées + rendu statique, le contenu vit dans le composant partagé
import type { Metadata } from "next";
import DesignSystemNote from "../../../../components/notes/DesignSystemNote";

export const metadata: Metadata = {
  title: "Apprendre à une IA un design system qu'elle n'a jamais lu · Illiana Savy",
  description:
    "Note de méthode : encoder les règles implicites d'un design system pour qu'un agent IA les respecte, et ce que ce passage rend visible sur le système lui-même.",
  alternates: {
    canonical: "/notes/design-system-ia",
    languages: { fr: "/notes/design-system-ia", en: "/en/notes/design-system-ia" },
  },
};

export default function DesignSystemNotePage() {
  return <DesignSystemNote lang="fr" />;
}
