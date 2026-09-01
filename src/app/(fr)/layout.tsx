import type { Metadata } from "next";
import RootShell from "../../components/RootShell";

export const metadata: Metadata = {
  title: "Illiana Savy · Product Designer",
  description:
    "Product Designer chez Thales. Applications web riches en données, de la recherche utilisateur à la delivery. Design-to-code, design system, accessibilité WCAG 2.2.",
  alternates: { canonical: "/", languages: { fr: "/", en: "/en" } },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
