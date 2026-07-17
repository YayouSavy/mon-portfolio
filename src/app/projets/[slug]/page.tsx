// → Type : Server Component
// → Raison : generateStaticParams/generateMetadata + lookup data, aucune interactivité ici
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/Nav";
import Contact from "../../../components/Contact";
import CaseStudyView from "../../../components/case-study/CaseStudyView";
import { PROJECTS } from "../../../lib/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} · Illiana Savy, Product Designer`,
    description: project.context ?? project.meta,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <Nav />
      <main id="main">
        <CaseStudyView project={project} prev={prev} next={next} />
        <Contact />
      </main>
    </>
  );
}
