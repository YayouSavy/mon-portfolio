// → Type : Server Component
// → Raison : generateStaticParams/generateMetadata + lookup data, aucune interactivité ici
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../../../components/Nav";
import Contact from "../../../../../components/Contact";
import CaseStudyView from "../../../../../components/case-study/CaseStudyView";
import { getContent } from "../../../../../lib/content";

const LANG = "en" as const;

export function generateStaticParams() {
  return getContent(LANG).PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getContent(LANG).PROJECTS.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} · Illiana Savy, Product Designer`,
    description: project.meta,
    alternates: {
      canonical: `/en/projets/${slug}`,
      languages: { fr: `/projets/${slug}`, en: `/en/projets/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { PROJECTS } = getContent(LANG);
  const index = PROJECTS.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <Nav lang={LANG} path={`/projets/${slug}`} />
      <main id="main">
        <CaseStudyView project={project} prev={prev} next={next} lang={LANG} />
        <Contact lang={LANG} />
      </main>
    </>
  );
}
