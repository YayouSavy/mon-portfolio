// → Type : Server Component
// → Raison : métadonnées + rendu statique, le contenu vit dans le composant partagé
import type { Metadata } from "next";
import DesignSystemNote from "../../../../../components/notes/DesignSystemNote";

export const metadata: Metadata = {
  title: "Teaching an AI a design system it has never read · Illiana Savy",
  description:
    "Method note: encoding the implicit rules of a design system so an AI agent respects them, and what that surfaced about the system itself.",
  alternates: {
    canonical: "/en/notes/design-system-ia",
    languages: { fr: "/notes/design-system-ia", en: "/en/notes/design-system-ia" },
  },
};

export default function DesignSystemNotePageEn() {
  return <DesignSystemNote lang="en" />;
}
