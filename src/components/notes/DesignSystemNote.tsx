// → Type : Server Component
// → Raison : contenu statique, aucune interactivité à ce niveau
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Nav from "../Nav";
import Contact from "../Contact";
import NimbusCaseNote from "../visuals/nimbus/NimbusCaseNote";
import PipelineLoopDiagram from "../visuals/PipelineLoopDiagram";
import { href, type Lang } from "../../lib/i18n";

/* ---- Gabarit note de méthode ----
   Un seul conteneur centré, celui des dossiers. Le texte courant vit en colonne étroite
   calée à gauche ; les fiches, elles, prennent toute la largeur ou se rangent deux par
   deux. Rien ne flotte entre les deux : soit la pleine largeur, soit une paire.
   C'est ce contraste, plus l'absence de bloc d'entrée, qui distingue la page d'un dossier. */

function Prose({ children }: { children: ReactNode }) {
  return <div className="flex max-w-[680px] flex-col gap-5">{children}</div>;
}

function H2({ children }: { children: string }) {
  return (
    <h2 className="mb-6 font-display text-[clamp(26px,3.2vw,36px)] font-extrabold uppercase tracking-[-0.01em] text-ink">
      {children}
    </h2>
  );
}

/* Fiche papier de la page dossier, reprise ici : les blocs de raisonnement ne sont plus
   de la prose au fil de l'eau, ils se lisent comme des constats posés. */
function Card({ children }: { children: ReactNode }) {
  return (
    <div className="light-surface grain-multiply relative flex h-full flex-col gap-4 rounded-folder border-2 border-noir bg-paper p-7 text-lg leading-relaxed text-ink shadow-paper md:p-8">
      {children}
    </div>
  );
}

/** Deux fiches côte à côte dès qu'il y a la place, empilées en dessous. */
function CardPair({ children }: { children: ReactNode }) {
  return <div className="grid items-stretch gap-5 md:grid-cols-2">{children}</div>;
}

/* Mention de périmètre : même traitement partout, sous la démonstration concernée. */
function ScopeNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-[68ch] text-[13px] italic leading-relaxed text-ink/60">{children}</p>;
}

type NoteCopy = {
  back: string;
  eyebrow: string;
  title: string;
  lede: string;
  problemTitle: string;
  /** Deux constats : ils se rangent côte à côte. */
  problem: [string, string];
  pipelineTitle: string;
  pipeline: string;
  scope: string;
  producedTitle: string;
  produced: string;
  limitTitle: string;
  limit: [string, string];
  outroEyebrow: string;
};

const COPY: Record<Lang, NoteCopy> = {
  fr: {
    back: "Retour à l'accueil",
    eyebrow: "Note de méthode",
    title: "Apprendre à une IA un design system qu'elle n'a jamais lu",
    lede: "Un design system, c'est l'ensemble des règles qui font que tous les écrans se ressemblent. Un humain les devine. Une IA, non.",
    problemTitle: "Le problème",
    problem: [
      "En prototypant directement en code avec l'IA, un problème est apparu très vite : elle écrivait du code hors design system. Une table importée de Material ici, un bleu absent de la palette là. Non parce qu'elle concevait mal, mais parce que les règles du système n'étaient écrites nulle part. Elles vivaient dans la tête des designers.",
      "Demandez une table à un assistant : il produit une table générique, correcte en soi, mais pleine de conventions que le système interdit. Mon travail a consisté à écrire ces règles pour qu'il les respecte.",
    ],
    pipelineTitle: "Le pipeline",
    pipeline:
      "Écrire les règles ne suffit pas : il faut d'abord décider lesquelles font autorité. La documentation existante suffisait à des designers humains, mais laissait trop de choses implicites pour un agent. Chaque zone de silence devait être tranchée avant d'être encodée.",
    scope: "La structure du pipeline est réelle ; les règles et prompts précis des skills restent internes à Thales.",
    producedTitle: "Ce que ça a produit",
    produced:
      "Les skills, des fichiers de règles que l'IA lit avant de générer du code, font gagner environ quatre heures par cycle d'idéation, mesurées sur quatre projets. Une première équipe les a adoptés, et l'extension à d'autres est prévue. Un développeur a rejoint la version destinée aux devs ; nous la maintenons à deux.",
    limitTitle: "La limite",
    limit: [
      "On ne peut encoder que les règles qui existent déjà. Partout où le design system était silencieux, l'IA continuait de produire des choix par défaut qu'il fallait arbitrer à la main.",
      "Le chantier suivant n'est donc pas d'écrire plus de skills. C'est de combler les angles morts du système lui-même, et le passage par l'IA a eu ce mérite inattendu : il a rendu visible tout ce que le design system ne disait pas.",
    ],
    outroEyebrow: "Ce chantier est né pendant la conception de",
  },
  en: {
    back: "Back to home",
    eyebrow: "Method note",
    title: "Teaching an AI a design system it has never read",
    lede: "A design system is the set of rules that make every screen look like it belongs. A human infers them. An AI does not.",
    problemTitle: "The problem",
    problem: [
      "Prototyping directly in code with AI, a problem surfaced almost immediately: it wrote code outside the design system. A table imported from Material here, a blue that isn't in the palette there. Not because it designed badly, but because the system's rules were written down nowhere. They lived in the designers' heads.",
      "Ask an assistant for a table: it produces a generic one, sound in itself, but full of conventions the system forbids. My work was to write those rules down so it would respect them.",
    ],
    pipelineTitle: "The pipeline",
    pipeline:
      "Writing the rules down isn't enough: you first have to decide which ones carry authority. The existing documentation was sufficient for human designers, but left too much implicit for an agent. Every silent area had to be settled before it could be encoded.",
    scope: "The structure of the pipeline is real; the precise rules and prompts of the skills remain internal to Thales.",
    producedTitle: "What it produced",
    produced:
      "The skills — rule files the AI reads before generating code — save roughly four hours per ideation cycle, measured across four projects. A first team has adopted them, and extending to others is planned. A developer joined the version aimed at developers; the two of us maintain it.",
    limitTitle: "The limit",
    limit: [
      "You can only encode rules that already exist. Wherever the design system was silent, the AI kept producing defaults that had to be settled by hand.",
      "So the next piece of work isn't writing more skills. It's filling the blind spots in the system itself — and going through an AI had this unexpected merit: it made visible everything the design system wasn't saying.",
    ],
    outroEyebrow: "This effort came out of designing",
  },
};

export default function DesignSystemNote({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <>
      <Nav lang={lang} path="/notes/design-system-ia" />
      <main id="main">
        <article className="mx-auto w-[min(1080px,100%-48px)] pb-[clamp(72px,10vh,140px)] pt-[clamp(48px,7vh,88px)]">
          {/* ---- En-tête : pas de méta projet, pas de tags, pas de synthèse ---- */}
          <header>
            <Link
              href={href(lang, "/")}
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-violet"
            >
              <ArrowLeft aria-hidden size={16} strokeWidth={2.5} /> {c.back}
            </Link>

            <p className="mb-4 block w-fit rounded-full bg-noir/10 px-3.5 py-1 font-accent text-[11px] uppercase tracking-[0.1em] text-ink">
              {c.eyebrow}
            </p>

            <h1 className="mb-6 max-w-[820px] text-[clamp(34px,5vw,58px)] font-extrabold uppercase leading-[1] tracking-[-0.02em] text-ink">
              {c.title}
            </h1>

            {/* Chapô : sa propre fiche, pleine largeur. Le filet violet reste, c'est ce qui
                le distingue des fiches de raisonnement qui suivent. */}
            <div className="light-surface grain-multiply relative rounded-folder border-2 border-noir bg-paper p-7 shadow-paper md:p-8">
              <p className="border-l-2 border-violet pl-5 text-[clamp(19px,2.2vw,23px)] font-medium leading-relaxed text-ink">
                {c.lede}
              </p>
            </div>
          </header>

          <section className="mt-16">
            <H2>{c.problemTitle}</H2>
            <CardPair>
              <Card>
                <p>{c.problem[0]}</p>
              </Card>
              <Card>
                <p>{c.problem[1]}</p>
              </Card>
            </CardPair>
          </section>

          {/* ---- La démonstration : le cœur de la page, juste après le problème ---- */}
          <section className="mt-12">
            <NimbusCaseNote lang={lang} />
          </section>

          <section className="mt-16">
            <H2>{c.pipelineTitle}</H2>
            <Card>
              <p>{c.pipeline}</p>
            </Card>
          </section>

          <div className="mt-8">
            <PipelineLoopDiagram lang={lang} />
            <ScopeNote>{c.scope}</ScopeNote>
          </div>

          <section className="mt-16">
            <H2>{c.producedTitle}</H2>
            <Card>
              <p>{c.produced}</p>
            </Card>
          </section>

          <section className="mt-16">
            <H2>{c.limitTitle}</H2>
            <CardPair>
              <Card>
                <p>{c.limit[0]}</p>
              </Card>
              <Card>
                <p>{c.limit[1]}</p>
              </Card>
            </CardPair>
          </section>

          {/* ---- Renvoi de fin ---- */}
          <div className="mt-16">
            <Prose>
              <Link
                href={href(lang, "/projets/esim-simple")}
                className="group light-surface grain-multiply relative flex items-center justify-between gap-5 rounded-folder border-2 border-noir bg-paper p-6 text-ink shadow-paper transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-paper-lift"
              >
                <span className="relative z-[1]">
                  <span className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">
                    {c.outroEyebrow}
                  </span>
                  <span className="block text-xl font-bold tracking-[-0.01em] transition-colors group-hover:text-violet">
                    eSIM Simple
                  </span>
                </span>
                <ArrowUpRight aria-hidden size={22} strokeWidth={2.5} className="relative z-[1] shrink-0" />
              </Link>
            </Prose>
          </div>
        </article>
        <Contact lang={lang} />
      </main>
    </>
  );
}
