"use client";
// → Type : Client Component
// → Raison : état ouvert/fermé, hover Framer, animation de hauteur
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import SectionTitle from "./SectionTitle";
import VisualRenderer from "./visuals/VisualRenderer";
import FolderShape from "./FolderShape";
import { useFolderOpen } from "./FolderTransition";
import { ACCENT_STYLES } from "../lib/accent";
import { getContent } from "../lib/content";
import { href as langHref, type Lang, UI } from "../lib/i18n";
import type { Project } from "../lib/data";
import { spring, springSmooth, viewport } from "../lib/motion";

/* Léger effet collage sur les dossiers fermés, neutralisé dès qu'un dossier s'ouvre */
const REST_ROTATE = [-0.6, 0.5, -0.4, 0.6];

/* Hauteur du header sticky (84px) + un peu d'air : position de repos de l'en-tête
   d'un dossier quand on le ramène dans le champ après fermeture. */
const NAV_OFFSET = 100;

/* Vignette qui dépasse de l'onglet : posée comme un Polaroid sur le dossier
   (bord papier, pas un prolongement du dossier). Vraie image quand le dossier
   en a une, sinon un aplat de la couleur d'accent.
   Repli auto si l'image manque encore. */
function FolderPeek({ p, lifted, align }: { p: Project; lifted: boolean; align: "left" | "right" }) {
  const [imgFailed, setImgFailed] = useState(false);
  const v = ACCENT_STYLES[p.color];
  const cover = p.cover;
  const side = align === "left" ? "left-4" : "right-4";
  const base = `absolute -top-7 ${side} h-20 w-[74px] -rotate-[6deg] overflow-hidden rounded-[14px] border-[3px] border-noir bg-paper opacity-95 shadow-paper transition-opacity duration-300 ${lifted ? "opacity-0" : ""}`;

  if (p.peek === false) return null;

  return (
    <div aria-hidden className={`${base} grain-soft`}>
      {cover.kind === "photo" && !imgFailed ? (
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="74px"
          className="object-cover object-top"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className={`h-full w-full ${v.body}`} />
      )}
    </div>
  );
}

function Folder({ p, index, open, onToggle, lang }: { p: Project; index: number; open: boolean; onToggle: () => void; lang: Lang }) {
  const t = UI[lang].home;
  const [hovered, setHovered] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  /* Le survol soulève le dossier, il ne le déplie plus. Déplier au survol faisait
     grandir la page sous le curseur : on descendait lire, la souris sortait du cadre,
     le panneau se refermait d'un coup et on se retrouvait bien plus bas qu'à l'entrée.
     L'ouverture est désormais un acte : clic, Entrée, ou Espace. */
  const lifted = open || hovered;
  const v = ACCENT_STYLES[p.color];
  const panelId = `panel-${p.id}`;
  const openFolder = useFolderOpen();
  const href = langHref(lang, `/projets/${p.id}`);

  /* À la fermeture, tout ce qui suivait le panneau remonte. Si l'en-tête du dossier est
     déjà passé sous la nav, on le ramène à sa place : sinon on rend la main quelque part
     plus bas dans la page, sans repère. */
  const toggle = () => {
    if (open && articleRef.current) {
      const { top } = articleRef.current.getBoundingClientRect();
      if (top < NAV_OFFSET) {
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: window.scrollY + top - NAV_OFFSET, behavior: smooth ? "smooth" : "auto" });
      }
    }
    onToggle();
  };
  const tabAlign: "left" | "right" = index % 2 === 0 ? "left" : "right";
  const textClass = v.light ? "text-ink" : "text-white";

  return (
    <motion.article
      ref={articleRef}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...spring, delay: index * 0.1 }}
      className={`relative -mt-6 first:mt-0 max-md:-mt-4 ${lifted ? "z-10" : p.z}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) toggle();
      }}
    >
      <FolderPeek p={p} lifted={lifted} align={tabAlign} />

      {/* Le soulèvement du dossier, en spring punchy + léger collage au repos */}
      <motion.div
        animate={{ y: lifted ? -12 : 0, rotate: lifted ? 0 : REST_ROTATE[index % REST_ROTATE.length] }}
        transition={spring}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative"
      >
        <FolderShape fill={p.color} tabAlign={tabAlign} tabLabel={p.tab} tabTextClassName={textClass}>
          <div className={textClass}>
            <h3 className="m-0">
              <button
                aria-expanded={open}
                aria-controls={panelId}
                onClick={toggle}
                className="relative z-[1] flex w-full items-center justify-between gap-6 p-6 text-left md:px-10 md:py-[30px]"
              >
                <span>
                  <span className="block text-[clamp(26px,3.4vw,42px)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em]">
                    {p.title}
                  </span>
                  <span className="mt-2 block text-base font-medium opacity-80">{p.meta}</span>
                </span>
                <span
                  aria-hidden
                  className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full transition-transform duration-300 ease-spring ${v.inverse} ${open ? "rotate-45" : ""}`}
                >
                  <Plus size={22} strokeWidth={2.5} />
                </span>
              </button>
            </h3>

            {/* Le contenu n'existe pas tant qu'on ne va pas voir :
                hauteur animée par Framer (0 → auto), sans rebond pour éviter le clipping */}
            <motion.div
              id={panelId}
              initial={false}
              animate={{ height: open ? "auto" : 0 }}
              transition={springSmooth}
              className="relative z-[1] overflow-hidden"
            >
              <motion.div
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 18 }}
                transition={{ ...spring, delay: open ? 0.05 : 0 }}
                className="px-6 pb-8 md:px-10 md:pb-11"
              >
                {/* Le schéma pipeline se lit de gauche à droite et le bloc vidéo porte son
                    propre texte : dans une colonne de 380px ils seraient illisibles. Ils
                    prennent donc toute la largeur, sous le teaser. */}
                {["pipelineLoop", "demoKitVideo", "nimbusPrefill", "contextSwitch"].includes(p.cover.kind) ? (
                  <div className="mb-8 flex flex-col gap-8">
                    <p className="max-w-[62ch] text-lg leading-relaxed">{p.desc}</p>
                    <VisualRenderer visual={p.cover} lang={lang} />
                  </div>
                ) : (
                  <div className="mb-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <p className="max-w-[62ch] text-lg leading-relaxed">{p.desc}</p>
                    <VisualRenderer visual={p.cover} className="max-w-[380px] lg:ml-auto" lang={lang} />
                  </div>
                )}

                {p.metrics.length > 0 && (
                  <div className={`mb-[30px] flex flex-wrap gap-6 border-y-[1.5px] py-[26px] md:gap-10 ${v.stroke}`}>
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-[38px] font-extrabold leading-none tracking-[-0.02em]">{m.num}</p>
                        <p className="mt-1.5 max-w-[20ch] text-sm font-medium opacity-80">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div className="flex flex-wrap gap-2.5">
                    {p.chips.map((c) => (
                      <span key={c} className={`rounded-full border-2 px-4 py-2 font-accent text-[10px] uppercase tracking-[0.08em] ${v.stroke}`}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={href}
                    onClick={(e) => {
                      // Modificateurs / clic milieu → laisser le navigateur ouvrir un nouvel onglet normalement
                      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      openFolder(p.color, href);
                    }}
                    className={`inline-flex items-center gap-2 rounded-folder px-[26px] py-[15px] text-[15px] font-semibold transition-transform duration-300 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 ${v.inverse}`}
                  >
                    {p.status === "soon" ? t.seeProgress : t.openFolder}
                    <ArrowUpRight aria-hidden size={18} strokeWidth={2.5} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </FolderShape>
      </motion.div>
    </motion.article>
  );
}

export default function Folders({ lang }: { lang: Lang }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const t = UI[lang].home;
  const { PROJECTS } = getContent(lang);

  return (
    <section id="projets" aria-label={t.projectsAria} className="relative scroll-mt-[84px] py-[clamp(72px,10vh,140px)]">
      {/* top fixe (px) plutôt que top-1/2 : le conteneur des dossiers grandit quand un
          dossier s'ouvre (hauteur animée), donc un ancrage en % de la hauteur de la
          section la ferait glisser à chaque ouverture/fermeture. */}
      <Image
        src="/Coffee Stains-29.png"
        alt=""
        aria-hidden="true"
        width={500}
        height={500}
        className="pointer-events-none absolute -right-12 top-[283px] w-[220px] -translate-y-1/2 opacity-80 lg:w-[320px]"
      />

      <div className="mx-auto w-[min(1240px,100%-48px)]">
        <motion.header
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={spring}
          className="mb-16 max-w-[760px]"
        >
          <SectionTitle className="mb-[18px] text-ink">
            {t.projectsTitle}
          </SectionTitle>
        </motion.header>

        <div className="flex flex-col">
          {PROJECTS.map((p, i) => (
            <Folder
              key={p.id}
              p={p}
              index={i}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
