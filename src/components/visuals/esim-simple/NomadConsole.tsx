"use client";
// → Type : Client Component
// → Raison : bascule de contexte, tri, recherche, pagination, modales, persistance

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import s from "./NomadConsole.module.css";
import type { Lang } from "../../../lib/i18n";

/**
 * eSIM Simple — reconstruction neutre du prototype, sur « Nomad », opérateur inventé.
 *
 * Le point de la démonstration est le sélecteur du header : un seul passage d'une face à
 * l'autre, sans déconnexion. Fidèle à ce qui a été conçu, donc sans indicateur de contexte
 * textuel permanent : le contexte se lit à la couleur du side panel, au contenu de la
 * navigation, à l'identité du header et au fil d'ariane. L'état coché du menu ne compte pas,
 * il disparaît à la fermeture, et le case study assume cette limite.
 *
 * Aucune donnée, marque, couleur ou terminologie réelles.
 */

type Mode = "bo" | "cl";
type Status = "a" | "w" | "d";
type Row = { id: number; p: string; c: string; sites: string[]; date: string; st: Status };

const PARTNERS = [
  "Meridian Telecom",
  "Altiva Mobile",
  "Corvus Wireless",
  "Nordveil Telecom",
  "Solaris Mobile",
  "Kestrel Connect",
  "Baltia Telecom",
  "Verano Móvil",
];

const INITIAL_ROWS: Row[] = [
  { id: 1, p: "Meridian Telecom", c: "MER-4471", sites: ["LYN", "PRT", "HMB"], date: "2026-02-14", st: "a" },
  { id: 2, p: "Altiva Mobile", c: "ALT-2210", sites: ["LYN", "SEV"], date: "2026-01-20", st: "a" },
  { id: 3, p: "Corvus Wireless", c: "COR-8834", sites: ["PRT", "HMB", "GDN"], date: "2026-03-03", st: "w" },
  { id: 4, p: "Nordveil Telecom", c: "NRD-1052", sites: ["SEV", "GDN"], date: "2025-12-28", st: "a" },
  { id: 5, p: "Solaris Mobile", c: "SOL-6690", sites: ["LYN"], date: "2026-03-11", st: "d" },
  { id: 6, p: "Kestrel Connect", c: "KES-3318", sites: ["HMB", "PRT", "SEV"], date: "2026-02-07", st: "a" },
  { id: 7, p: "Baltia Telecom", c: "BAL-7725", sites: ["GDN"], date: "2026-01-19", st: "w" },
  { id: 8, p: "Verano Móvil", c: "VER-5093", sites: ["LYN", "PRT"], date: "2026-02-28", st: "a" },
];

/* Les forfaits : prix et couverture sont des données de démonstration, seuls le nom du
   forfait et l'unité de zone changent de langue. */
const PLAN_KEYS = ["eu30", "euPlus", "americas", "apac", "worldLite", "worldPlus"] as const;
const PLAN_DATA: Record<(typeof PLAN_KEYS)[number], { countries: string; g: string; pr: string }> = {
  eu30: { countries: "34", g: "20", pr: "12,90 €" },
  euPlus: { countries: "41", g: "50", pr: "24,90 €" },
  americas: { countries: "18", g: "15", pr: "19,90 €" },
  apac: { countries: "22", g: "10", pr: "22,50 €" },
  worldLite: { countries: "87", g: "5", pr: "29,90 €" },
  worldPlus: { countries: "87", g: "30", pr: "59,90 €" },
};

const STATUS_CLS: Record<Status, string> = { a: s.sa, w: s.sw, d: s.sd };

const NAV_ACTIVE: Record<Mode, number> = { bo: 1, cl: 0 };

/* Libellés d'interface du produit mocké : ce sont des libellés de produit, ils suivent
   la langue de la page comme le reste du contenu. */
const COPY = {
  fr: {
    consoleName: "Nomad Console",
    switchContext: (role: string) => `Changer de contexte, actuellement ${role}`,
    ctxMenu: "Contexte affiché",
    ctxBo: ["Back-office", "Comptes partenaires, lots, production"] as const,
    ctxCl: ["Espace client", "Ce que voit un partenaire connecté"] as const,
    ctxFoot: "Le contexte reste actif d'une session à l'autre.",
    noteBo: "Prototype de démonstration. Partenaires, codes et sites sont fictifs, ",
    noteBoEnd: " est un opérateur inventé.",
    noteCl:
      "Même application, même code. Seul le contexte affiché change, c'est ce que voit un partenaire connecté à son espace.",
    accounts: "Comptes partenaires",
    search: "Rechercher un partenaire, un code, un site…",
    thSites: "Sites",
    thStatus: "Statut",
    thCreated: "Créé le",
    thActions: "Actions",
    myPlans: "Mes forfaits",
    catalogue: "Catalogue Meridian Telecom · 6 forfaits actifs",
    order: "Commander",
    days: " · 30 jours",
    gb: "Go",
    countriesUnit: "pays",
    delTitle: "Supprimer le compte",
    delBody: ["Supprimer le compte ", " ? Les lots rattachés resteront consultables, mais aucune nouvelle commande ne pourra être créée."] as const,
    createTitle: "Créer un compte partenaire",
    close: "Fermer",
    fPartner: "Partenaire",
    fPartnerPlaceholder: "Choisir un partenaire",
    fCode: "Code partenaire",
    fCodePlaceholder: "Ex. MER-4471",
    fCodeHint: "Identifiant unique communiqué par le partenaire.",
    fFile: "Fichier de configuration",
    dropHere: "Glissez le fichier ici",
    browse: "Parcourir",
    fileFormat: "Format .xml",
    removeFile: "Retirer le fichier",
    fComment: "Commentaire",
    fCommentPlaceholder: "Information utile pour l'équipe",
    optional: " — facultatif",
    cancel: "Annuler",
    status: { a: "Actif", w: "En attente", d: "Brouillon" },
    nav: {
      bo: ["Tableau de bord", "Comptes partenaires", "Commandes", "Production"],
      cl: ["Mes forfaits", "Mes commandes", "Facturation", "Assistance"],
    },
    roleBo: "Opérations Nomad",
    crumbBo: ["Nomad", "Comptes partenaires"] as [string, string],
    crumbCl: ["Meridian Telecom", "Mes forfaits"] as [string, string],
    plans: {
      eu30: "Europe 30 jours",
      euPlus: "Europe étendu",
      americas: "Amériques",
      apac: "Asie-Pacifique",
      worldLite: "Monde essentiel",
      worldPlus: "Monde intensif",
    },
  },
  en: {
    consoleName: "Nomad Console",
    switchContext: (role: string) => `Switch context, currently ${role}`,
    ctxMenu: "Context shown",
    ctxBo: ["Back-office", "Partner accounts, batches, production"] as const,
    ctxCl: ["Client area", "What a signed-in partner sees"] as const,
    ctxFoot: "The context stays active from one session to the next.",
    noteBo: "Demonstration prototype. Partners, codes and sites are fictional, ",
    noteBoEnd: " is an invented operator.",
    noteCl:
      "Same application, same code. Only the context shown changes — this is what a partner signed in to their area sees.",
    accounts: "Partner accounts",
    search: "Search a partner, a code, a site…",
    thSites: "Sites",
    thStatus: "Status",
    thCreated: "Created",
    thActions: "Actions",
    myPlans: "My plans",
    catalogue: "Meridian Telecom catalogue · 6 active plans",
    order: "Order",
    days: " · 30 days",
    gb: "GB",
    countriesUnit: "countries",
    delTitle: "Delete the account",
    delBody: ["Delete the account ", "? The linked batches will remain consultable, but no new order can be created."] as const,
    createTitle: "Create a partner account",
    close: "Close",
    fPartner: "Partner",
    fPartnerPlaceholder: "Choose a partner",
    fCode: "Partner code",
    fCodePlaceholder: "e.g. MER-4471",
    fCodeHint: "Unique identifier provided by the partner.",
    fFile: "Configuration file",
    dropHere: "Drop the file here",
    browse: "Browse",
    fileFormat: ".xml format",
    removeFile: "Remove the file",
    fComment: "Comment",
    fCommentPlaceholder: "Useful information for the team",
    optional: " — optional",
    cancel: "Cancel",
    status: { a: "Active", w: "Pending", d: "Draft" },
    nav: {
      bo: ["Dashboard", "Partner accounts", "Orders", "Production"],
      cl: ["My plans", "My orders", "Billing", "Support"],
    },
    roleBo: "Nomad Operations",
    crumbBo: ["Nomad", "Partner accounts"] as [string, string],
    crumbCl: ["Meridian Telecom", "My plans"] as [string, string],
    plans: {
      eu30: "Europe 30 days",
      euPlus: "Europe extended",
      americas: "Americas",
      apac: "Asia-Pacific",
      worldLite: "World essential",
      worldPlus: "World intensive",
    },
  },
} as const;

type Copy = (typeof COPY)[Lang];

const PER_PAGE = 5;
const STORAGE_KEY = "nomad.ctx";

/* ---- Persistance du contexte ----
   localStorage est un système externe : on le lit via useSyncExternalStore plutôt que
   par un setState dans un effet. Le snapshot serveur vaut toujours "bo", donc le rendu
   initial est stable et l'hydratation ne diverge pas ; la valeur stockée s'applique juste
   après, côté client. C'était le comportement du produit réel : le commercial retrouve la
   démonstration là où il l'avait laissée. */
const ctxListeners = new Set<() => void>();
let ctxCache: Mode | null = null;

function readCtx(): Mode {
  if (ctxCache) return ctxCache;
  try {
    ctxCache = window.localStorage.getItem(STORAGE_KEY) === "cl" ? "cl" : "bo";
  } catch {
    ctxCache = "bo";
  }
  return ctxCache;
}
function writeCtx(next: Mode) {
  ctxCache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* sans persistance, la démonstration reste fonctionnelle */
  }
  ctxListeners.forEach((l) => l());
}
function subscribeCtx(l: () => void) {
  ctxListeners.add(l);
  return () => {
    ctxListeners.delete(l);
  };
}

const fdate = (iso: string) =>
  new Date(iso + "T00:00").toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

export default function NomadConsole({ className = "", lang = "fr" }: { className?: string; lang?: Lang }) {
  const c = COPY[lang];
  const mode = useSyncExternalStore(subscribeCtx, readCtx, () => "bo" as Mode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"p" | "c" | "sites" | "date">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const whoRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const switchMode = useCallback((next: Mode) => {
    writeCtx(next);
    setPage(1);
    setQuery("");
    setMenuOpen(false);
    whoRef.current?.focus();
  }, []);

  // Échap ferme la couche ouverte la plus haute ; clic extérieur ferme le menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (createOpen) setCreateOpen(false);
      else if (toDelete) setToDelete(null);
      else if (menuOpen) {
        setMenuOpen(false);
        whoRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen, createOpen, toDelete]);

  const filtered = rows.filter((r) => {
    const t = query.trim().toLowerCase();
    if (!t) return true;
    return r.p.toLowerCase().includes(t) || r.c.toLowerCase().includes(t) || r.sites.join(" ").toLowerCase().includes(t);
  });
  const sorted = [...filtered].sort((a, b) => {
    const c =
      sortKey === "sites" ? a.sites.length - b.sites.length : String(a[sortKey]).localeCompare(String(b[sortKey]));
    return sortDir === "asc" ? c : -c;
  });
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageRows = sorted.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const sort = (k: typeof sortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
    setPage(1);
  };
  const arrow = (k: typeof sortKey) => (
    <span className={s.ar} aria-hidden>
      {sortKey !== k ? "↕" : sortDir === "asc" ? "↑" : "↓"}
    </span>
  );
  const sortState = (k: typeof sortKey): "ascending" | "descending" | "none" =>
    sortKey !== k ? "none" : sortDir === "asc" ? "ascending" : "descending";

  /* L'identité affichée : le nom et les initiales sont des données de démonstration,
     le rôle et le fil d'Ariane suivent la langue. */
  const id =
    mode === "bo"
      ? { name: "Camille Marchand", role: c.roleBo, initials: "CM", crumb: c.crumbBo }
      : { name: "Camille Marchand", role: "Meridian Telecom", initials: "MT", crumb: c.crumbCl };

  return (
    <div
      className={`light-surface grain-multiply relative rounded-folder border-2 border-noir bg-paper p-5 text-ink shadow-paper md:p-7 ${className}`}
    >
      <div className="relative z-[1]">
        <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">Nomad · opérateur fictif</p>
        <h3 className="mb-3 max-w-[26ch] text-[clamp(22px,2.6vw,30px)] font-extrabold uppercase tracking-[-0.01em]">
          Deux faces, une seule application
        </h3>
        <p className="mb-5 text-[15.5px] leading-relaxed opacity-85">
          Le produit sert deux publics qui ne doivent jamais voir la même chose : l&apos;équipe de
          l&apos;opérateur, qui gère les comptes partenaires et les commandes, et le partenaire lui-même, qui
          consulte son catalogue de profils. Un sélecteur placé sur l&apos;avatar du header fait passer de l&apos;un
          à l&apos;autre, sans déconnexion, sans écran de login, sans rupture au milieu d&apos;une démonstration.
        </p>

        <div ref={rootRef} className={`${s.root} ${mode === "cl" ? s.dark : ""}`}>
          <div className={s.app}>
            <aside className={s.side}>
              <div className={s.brand}>
                <span className={s.mark} aria-hidden>
                  N
                </span>
                <b>Nomad Console</b>
              </div>
              <nav className={s.nav} aria-label="Navigation du prototype">
                {c.nav[mode].map((label, i) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={i === NAV_ACTIVE[mode] ? s.on : ""}
                    aria-current={i === NAV_ACTIVE[mode] ? "page" : undefined}
                  >
                    <span className={s.d} aria-hidden />
                    {label}
                  </a>
                ))}
              </nav>
            </aside>

            <div className={s.main}>
              <header className={s.top}>
                <div className={s.crumb}>
                  {id.crumb[0]} / <b>{id.crumb[1]}</b>
                </div>

                <button
                  ref={whoRef}
                  type="button"
                  className={s.who}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((v) => !v);
                  }}
                >
                  <span className={s.av} aria-hidden>
                    {id.initials}
                  </span>
                  <span className={s.txt}>
                    <span className={s.n}>{id.name}</span>
                    <span className={s.r}>{id.role}</span>
                  </span>
                  <span className={s.cv} aria-hidden>
                    ▾
                  </span>
                  <span className="sr-only">{c.switchContext(id.role)}</span>
                </button>

                {menuOpen && (
                  <div className={s.menu} role="menu" aria-label={c.ctxMenu} onClick={(e) => e.stopPropagation()}>
                    <div className={s.mh}>{c.ctxMenu}</div>
                    {(
                      [
                        ["bo", c.ctxBo[0], c.ctxBo[1]],
                        ["cl", c.ctxCl[0], c.ctxCl[1]],
                      ] as const
                    ).map(([key, title, desc]) => (
                      <button
                        key={key}
                        type="button"
                        role="menuitemradio"
                        aria-checked={mode === key}
                        className={`${s.opt} ${mode === key ? s.optOn : ""}`}
                        onClick={() => switchMode(key)}
                      >
                        <span className={s.tick} aria-hidden>
                          {mode === key ? "✓" : ""}
                        </span>
                        <span>
                          <span className={s.t}>{title}</span>
                          <span className={s.s}>{desc}</span>
                        </span>
                      </button>
                    ))}
                    <div className={s.mfoot}>{c.ctxFoot}</div>
                  </div>
                )}
              </header>

              <div className={s.body}>
                {mode === "bo" ? (
                  <>
                    <p className={s.note}>
                      {c.noteBo}
                      <b>Nomad</b>
                      {c.noteBoEnd}
                    </p>

                    <div className={`${s.card} ${s.head}`}>
                      <div>
                        <h3>{c.accounts}</h3>
                        <div className={s.sub}>{rows.length} comptes · 5 sites de production</div>
                      </div>
                      <button type="button" className={`${s.btn} ${s.p}`} onClick={() => setCreateOpen(true)}>
                        + Créer un compte
                      </button>
                    </div>

                    <div className={s.card}>
                      <div className={s.bar}>
                        <label className="sr-only" htmlFor="nomad-q">
                          Rechercher un compte partenaire
                        </label>
                        <input
                          id="nomad-q"
                          className={s.fld}
                          style={{ maxWidth: 340 }}
                          placeholder={c.search}
                          value={query}
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1);
                          }}
                        />
                      </div>

                      <table className={s.tbl}>
                        <thead>
                          <tr>
                            <th className={s.s} aria-sort={sortState("p")}>
                              <button type="button" className={s.g} onClick={() => sort("p")}>
                                Partenaire {arrow("p")}
                              </button>
                            </th>
                            <th className={s.s} aria-sort={sortState("c")}>
                              <button type="button" className={s.g} onClick={() => sort("c")}>
                                Code {arrow("c")}
                              </button>
                            </th>
                            <th className={`${s.s} ${s.h}`} aria-sort={sortState("sites")}>
                              <button type="button" className={s.g} onClick={() => sort("sites")}>
                                {c.thSites} {arrow("sites")}
                              </button>
                            </th>
                            <th className={s.h}>{c.thStatus}</th>
                            <th className={s.s} aria-sort={sortState("date")}>
                              <button type="button" className={s.g} onClick={() => sort("date")}>
                                {c.thCreated} {arrow("date")}
                              </button>
                            </th>
                            <th style={{ textAlign: "right" }}>{c.thActions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageRows.length ? (
                            pageRows.map((r) => (
                              <tr key={r.id}>
                                <td style={{ fontWeight: 550 }}>{r.p}</td>
                                <td className={s.mono}>{r.c}</td>
                                <td className={s.h}>
                                  {r.sites.map((x) => (
                                    <span key={x} className={s.pill}>
                                      {x}
                                    </span>
                                  ))}
                                </td>
                                <td className={s.h}>
                                  <span className={`${s.st} ${STATUS_CLS[r.st]}`}>
                                    <i aria-hidden />
                                    {c.status[r.st]}
                                  </span>
                                </td>
                                <td style={{ color: "var(--ink-2)" }}>{fdate(r.date)}</td>
                                <td>
                                  <div className={s.act}>
                                    <button type="button" className={s.ib} aria-label={`Ouvrir la fiche de ${r.p}`}>
                                      <span aria-hidden>👁</span>
                                    </button>
                                    <button
                                      type="button"
                                      className={`${s.ib} ${s.rm}`}
                                      aria-label={`Supprimer ${r.p}`}
                                      onClick={() => setToDelete(r)}
                                    >
                                      <span aria-hidden>🗑</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6}>
                                <div className={s.empty}>
                                  Aucun compte ne correspond à « {query} ».
                                  <br />
                                  Essayez un autre terme ou créez un compte.
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      <div className={s.pg}>
                        <span>
                          {sorted.length} compte{sorted.length > 1 ? "s" : ""}
                        </span>
                        <div className={s.nb}>
                          <button type="button" className={s.pgb} disabled={current === 1} onClick={() => setPage(1)} aria-label="Première page">
                            «
                          </button>
                          <button type="button" className={s.pgb} disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Page précédente">
                            ‹
                          </button>
                          <span style={{ padding: "0 9px" }}>
                            {current} / {totalPages}
                          </span>
                          <button type="button" className={s.pgb} disabled={current === totalPages} onClick={() => setPage(current + 1)} aria-label="Page suivante">
                            ›
                          </button>
                          <button type="button" className={s.pgb} disabled={current === totalPages} onClick={() => setPage(totalPages)} aria-label="Dernière page">
                            »
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className={s.note}>
                      {c.noteCl}
                    </p>
                    <div className={`${s.card} ${s.head}`}>
                      <div>
                        <h3>{c.myPlans}</h3>
                        <div className={s.sub}>{c.catalogue}</div>
                      </div>
                      <button type="button" className={`${s.btn} ${s.p}`}>
                        {c.order}
                      </button>
                    </div>
                    <div className={s.cat}>
                      {PLAN_KEYS.map((key) => {
                        const plan = PLAN_DATA[key];
                        return (
                          <div key={key} className={s.plan}>
                            <h4>{c.plans[key]}</h4>
                            <div className={s.z}>{`${plan.countries} ${c.countriesUnit}`}</div>
                            <div className={s.gb}>
                              {plan.g}
                              <small>{c.gb}</small>
                            </div>
                            <div className={s.pr}>
                              {plan.pr}
                              {c.days}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {createOpen && <CreateDialog c={c} onClose={() => setCreateOpen(false)} onCreate={(r) => { setRows((v) => [r, ...v]); setPage(1); setCreateOpen(false); }} />}

          {toDelete && (
            <div className={s.ov} role="presentation" onClick={() => setToDelete(null)}>
              <div className={`${s.mod} ${s.sm}`} role="alertdialog" aria-modal="true" aria-labelledby="nomad-del" onClick={(e) => e.stopPropagation()}>
                <div className={s.mtop}>
                  <b id="nomad-del">{c.delTitle}</b>
                  <button type="button" className={`${s.btn} ${s.g}`} onClick={() => setToDelete(null)} aria-label={c.close}>
                    ✕
                  </button>
                </div>
                <div className={s.mbody}>
                  <p style={{ margin: 0, fontSize: "13.5px" }}>
                    {c.delBody[0]}
                    <strong>{toDelete.p}</strong>
                    {c.delBody[1]}
                  </p>
                </div>
                <div className={s.mbot}>
                  <button type="button" className={`${s.btn} ${s.g}`} onClick={() => setToDelete(null)}>
                    Annuler
                  </button>
                  <button
                    type="button"
                    className={`${s.btn} ${s.d}`}
                    onClick={() => {
                      setRows((v) => v.filter((r) => r.id !== toDelete.id));
                      setToDelete(null);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-3 max-w-[68ch] text-[13px] italic leading-relaxed opacity-60">
          Cliquez ou touchez l&apos;avatar pour basculer. Reconstruction neutre sur « Nomad », un opérateur
          inventé : aucune donnée, aucune marque ni aucune interface réelles n&apos;y figurent.
        </p>
      </div>
    </div>
  );
}

/* ---- Création d'un compte : validation des trois champs requis ---- */
function CreateDialog({ c, onClose, onCreate }: { c: Copy; onClose: () => void; onCreate: (r: Row) => void }) {
  const [partner, setPartner] = useState("");
  const [code, setCode] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ready = Boolean(partner && code.trim() && file);

  return (
    <div className={s.ov} role="presentation" onClick={onClose}>
      <div className={s.mod} role="dialog" aria-modal="true" aria-labelledby="nomad-create" onClick={(e) => e.stopPropagation()}>
        <div className={s.mtop}>
          <b id="nomad-create">{c.createTitle}</b>
          <button type="button" className={`${s.btn} ${s.g}`} onClick={onClose} aria-label={c.close}>
            ✕
          </button>
        </div>

        <div className={s.mbody}>
          <div>
            <label className={s.lb} htmlFor="nomad-f1">
              {c.fPartner}<em aria-hidden>*</em>
            </label>
            <select id="nomad-f1" className={s.fld} value={partner} onChange={(e) => setPartner(e.target.value)} required>
              <option value="">{c.fPartnerPlaceholder}</option>
              {PARTNERS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={s.lb} htmlFor="nomad-f2">
              {c.fCode}<em aria-hidden>*</em>
            </label>
            <input id="nomad-f2" className={s.fld} placeholder={c.fCodePlaceholder} value={code} onChange={(e) => setCode(e.target.value)} required />
            <div className={s.hint}>{c.fCodeHint}</div>
          </div>

          <div>
            <span className={s.lb}>
              {c.fFile}<em aria-hidden>*</em>
            </span>
            <div
              className={`${s.drop} ${over ? s.over : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                const f = e.dataTransfer.files[0];
                if (f) setFile(f.name);
              }}
            >
              {file ? (
                <div className={s.file}>
                  <span aria-hidden>📄</span>
                  <span>{file}</span>
                  <button type="button" className={`${s.btn} ${s.g}`} style={{ padding: "2px 7px" }} onClick={() => setFile(null)} aria-label={c.removeFile}>
                    ✕
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 9 }}>{c.dropHere}</div>
                  <button type="button" className={`${s.btn} ${s.o}`} onClick={() => inputRef.current?.click()}>
                    {c.browse}
                  </button>
                  <div className={s.hint}>{c.fileFormat}</div>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".xml"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFile(f.name);
              }}
            />
          </div>

          <div>
            <label className={s.lb} htmlFor="nomad-f3">
              {c.fComment}
            </label>
            <textarea
              id="nomad-f3"
              className={s.fld}
              rows={2}
              maxLength={100}
              placeholder={c.fCommentPlaceholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className={s.hint}>
              {comment.length}/100
              {c.optional}
            </div>
          </div>
        </div>

        <div className={s.mbot}>
          <button type="button" className={`${s.btn} ${s.g}`} onClick={onClose}>
            {c.cancel}
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.p}`}
            disabled={!ready}
            onClick={() =>
              onCreate({
                id: Date.now(),
                p: partner,
                c: code.trim().toUpperCase(),
                sites: ["LYN"],
                date: new Date().toISOString().slice(0, 10),
                st: "d",
              })
            }
          >
            Créer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
