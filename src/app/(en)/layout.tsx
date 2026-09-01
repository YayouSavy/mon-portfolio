import type { Metadata } from "next";
import RootShell from "../../components/RootShell";

export const metadata: Metadata = {
  title: "Illiana Savy · Product Designer",
  description:
    "Product Designer at Thales. Data-heavy web applications, from user research through to delivery. Design-to-code, design systems, WCAG 2.2 accessibility.",
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
