"use client";
// → Type : Client Component
// → Raison : 4 démos interactives (état local par pattern)
import { useState } from "react";
import type { ReactNode } from "react";
import type { Lang } from "../../../lib/i18n";

type PatternId = "prefill" | "reorder" | "tracking" | "inbox";

const PATTERNS: { id: PatternId; n: string }[] = [
  { id: "prefill", n: "01" },
  { id: "reorder", n: "02" },
  { id: "tracking", n: "03" },
  { id: "inbox", n: "04" },
];

/* ============================================================
   Tous les libellés d'interface de la démo Nimbus, par langue.
   Ce sont des libellés de produit, pas des annotations : ils suivent la langue de la page.
   ============================================================ */
const COPY = {
  fr: {
    eyebrow: "Nimbus · design system fictif",
    defaultTitle: "Le système propose, la personne garde la main",
    defaultIntro: "Quatre patterns, un même principe. ",
    scope:
      "Reconstructions neutres : le contexte, les clients et le système de design sont inventés. Aucune interface ni règle métier réelle n'y figure.",
    tabs: { prefill: "Pré-remplissage assisté", reorder: "Re-commande", tracking: "Suivi client", inbox: "Alertes et messages" },
    captions: {
      prefill:
        "La lecture du document renseigne une partie des champs seulement, et signale lesquels. Ce qu'elle a proposé reste à vérifier, ce qu'elle n'a pas trouvé reste à saisir : la personne sait toujours d'où vient chaque valeur.",
      reorder:
        "Le point de départ n'est pas un formulaire vide mais une commande déjà passée, en cours ou archivée, dont on reprend tout ou partie des lignes.",
      tracking:
        "Le suivi remonte automatiquement des systèmes de production, mais reste corrigeable. Notifier le client d'une correction est une décision, pas un automatisme.",
      inbox: "Ce qui exige une action est séparé de ce qui informe. La distinction est structurelle, pas cosmétique.",
    },
    prefill: {
      docLabel: "Bon de commande client",
      fileName: "commande-meridian-mars.pdf",
      read: "Lire le document",
      restart: "Recommencer",
      summary: (filled: number, total: number) =>
        `Le document a renseigné ${filled} champs sur ${total}. Il ne contenait ni incoterm, ni adresse de livraison, ni conditions de paiement.`,
      step: "Étape 1 sur 4 · Informations générales",
      counts: (pending: number, empty: number) => `${pending} à vérifier · ${empty} à saisir`,
      toFill: "À renseigner",
      verify: "Vérifier",
      verified: "Vérifié",
      srcAi: "Proposé d'après le document",
      srcChecked: "Confirmé par vous",
      srcEmpty: "Absent du document",
      srcDefault: "Valeur par défaut",
      footerPending: "Les champs proposés restent signalés tant qu'ils n'ont pas été vérifiés.",
      footerDone: "Tous les champs proposés ont été vérifiés.",
      nextStep: "Étape suivante",
      fields: [
        "Référence client",
        "Client",
        "Date de réception",
        "Devise",
        "Type de commande",
        "Conditions de paiement",
        "Incoterm",
        "Adresse de livraison",
      ],
      orderType: "Standard",
    },
    reorder: {
      intro:
        "La plupart des commandes reprennent une commande passée. Le parcours part de l'historique plutôt que d'un formulaire vide, y compris pour les commandes clôturées d'il y a plusieurs années.",
      sources: { encours: "Commandes en cours", archives: "Archives" },
      headOrder: "Commande",
      headClient: "Client",
      headDate: "Date",
      headStatus: "Statut",
      expand: "Déplier",
      collapse: "Replier",
      reorder: "Re-commander",
      done: (n: number) => `Commande créée à partir de ${n} ligne${n > 1 ? "s" : ""}, prête à être ajustée.`,
      empty: "Aucune ligne reprenable sur cette commande.",
      statuses: { saved: "Enregistrée", preparing: "En préparation", closed: "Clôturée", cancelled: "Annulée" },
      lines: {
        L1: "Carte SIM prépayée, format 2FF",
        L2: "Carte SIM prépayée, format 3FF",
        L3: "Personnalisation graphique",
        A1: "Carte SIM, format 2FF",
        A2: "Découpe personnalisée",
      },
    },
    tracking: {
      tabTeam: "Vue équipe",
      tabClient: "Ce que reçoit le client",
      intro:
        "Les jalons remontent des systèmes de production. Quand la réalité diffère de ce qui a été remonté, l'équipe corrige, et décide si le client doit en être informé.",
      correct: "Corriger",
      dateLabel: "Date remontée par la production",
      correctNotify: "Corriger et informer le client",
      correctSilent: "Corriger sans notifier",
      cancel: "Annuler",
      correctedFlag: "Corrigé manuellement · ",
      notified: "Client informé",
      internal: "Jalon interne, pas de message client",
      clientOutro:
        "Le client reçoit ce qui le concerne, pas l'état du système. Les jalons internes ne déclenchent aucun message.",
      pending: "En attente",
      steps: {
        s1: "Commande enregistrée",
        s2: "Production lancée",
        s3: "Contrôle qualité",
        s4: "Expédition",
        s5: "Livraison confirmée",
      },
      messages: {
        s1: "Nous avons bien reçu votre commande PO-48120-C.",
        s2: "Votre commande est entrée en production.",
        correction: "Correction : la date d'expédition de votre commande a été mise à jour.",
      },
    },
    inbox: {
      intro:
        "Un système qui automatise beaucoup produit beaucoup de bruit. Ce qui exige une action est séparé de ce qui informe, pour qu'un échec ne se perde jamais dans une pile de confirmations.",
      tabAlerts: "À traiter",
      tabMessages: "Informations",
      handle: "Traiter",
      markRead: "Marquer comme lu",
      emptyAlerts: "Rien à traiter.",
      emptyMessages: "Tout est lu.",
      yesterday: "Hier",
      srcProduction: "Production",
      srcBilling: "Facturation",
      alerts: {
        a1: "Référence article introuvable sur la ligne 3 de PO-48120-C.",
        a2: "Création de commande refusée : commercial rattaché non valide.",
        a3: "Contrôle export bloqué sur PO-48007-B.",
      },
      messages: {
        m1: "Commande PO-48120-C créée.",
        m2: "Facture émise pour PO-48007-B.",
        m3: "Commande PO-47990-A expédiée.",
      },
    },
  },
  en: {
    eyebrow: "Nimbus · fictional design system",
    defaultTitle: "The system proposes, the person keeps control",
    defaultIntro: "Four patterns, one principle. ",
    scope:
      "Neutral reconstructions: the context, the clients and the design system are invented. No real interface or business rule appears here.",
    tabs: { prefill: "Assisted pre-filling", reorder: "Re-order", tracking: "Client tracking", inbox: "Alerts and messages" },
    captions: {
      prefill:
        "Reading the document fills in only some of the fields, and flags which ones. What it proposed still needs checking, what it didn't find still needs entering: the person always knows where each value came from.",
      reorder:
        "The starting point isn't an empty form but an order already placed, in progress or archived, from which all or some lines are picked up.",
      tracking:
        "Tracking comes up automatically from the production systems, but stays correctable. Notifying the client of a correction is a decision, not an automatism.",
      inbox: "What requires an action is separated from what informs. The distinction is structural, not cosmetic.",
    },
    prefill: {
      docLabel: "Client purchase order",
      fileName: "order-meridian-march.pdf",
      read: "Read the document",
      restart: "Start over",
      summary: (filled: number, total: number) =>
        `The document filled in ${filled} of ${total} fields. It contained no incoterm, no delivery address and no payment terms.`,
      step: "Step 1 of 4 · General information",
      counts: (pending: number, empty: number) => `${pending} to check · ${empty} to enter`,
      toFill: "To be entered",
      verify: "Check",
      verified: "Checked",
      srcAi: "Proposed from the document",
      srcChecked: "Confirmed by you",
      srcEmpty: "Absent from the document",
      srcDefault: "Default value",
      footerPending: "Proposed fields stay flagged until they have been checked.",
      footerDone: "Every proposed field has been checked.",
      nextStep: "Next step",
      fields: [
        "Client reference",
        "Client",
        "Date received",
        "Currency",
        "Order type",
        "Payment terms",
        "Incoterm",
        "Delivery address",
      ],
      orderType: "Standard",
    },
    reorder: {
      intro:
        "Most orders repeat a past one. The journey starts from history rather than from a blank form, including for orders closed several years ago.",
      sources: { encours: "Orders in progress", archives: "Archive" },
      headOrder: "Order",
      headClient: "Client",
      headDate: "Date",
      headStatus: "Status",
      expand: "Expand",
      collapse: "Collapse",
      reorder: "Re-order",
      done: (n: number) => `Order created from ${n} line${n > 1 ? "s" : ""}, ready to be adjusted.`,
      empty: "No reusable line on this order.",
      statuses: { saved: "Saved", preparing: "In preparation", closed: "Closed", cancelled: "Cancelled" },
      lines: {
        L1: "Prepaid SIM card, 2FF format",
        L2: "Prepaid SIM card, 3FF format",
        L3: "Graphic customisation",
        A1: "SIM card, 2FF format",
        A2: "Custom cut",
      },
    },
    tracking: {
      tabTeam: "Team view",
      tabClient: "What the client receives",
      intro:
        "Milestones come up from the production systems. When reality differs from what was reported, the team corrects it, and decides whether the client should be told.",
      correct: "Correct",
      dateLabel: "Date reported by production",
      correctNotify: "Correct and inform the client",
      correctSilent: "Correct without notifying",
      cancel: "Cancel",
      correctedFlag: "Corrected manually · ",
      notified: "Client informed",
      internal: "Internal milestone, no client message",
      clientOutro:
        "The client receives what concerns them, not the state of the system. Internal milestones trigger no message.",
      pending: "Pending",
      steps: {
        s1: "Order saved",
        s2: "Production started",
        s3: "Quality control",
        s4: "Shipping",
        s5: "Delivery confirmed",
      },
      messages: {
        s1: "We have received your order PO-48120-C.",
        s2: "Your order has entered production.",
        correction: "Correction: the shipping date for your order has been updated.",
      },
    },
    inbox: {
      intro:
        "A system that automates a lot produces a lot of noise. What requires an action is separated from what informs, so a failure never gets lost in a pile of confirmations.",
      tabAlerts: "To handle",
      tabMessages: "Information",
      handle: "Handle",
      markRead: "Mark as read",
      emptyAlerts: "Nothing to handle.",
      emptyMessages: "Everything is read.",
      yesterday: "Yesterday",
      srcProduction: "Production",
      srcBilling: "Billing",
      alerts: {
        a1: "Item reference not found on line 3 of PO-48120-C.",
        a2: "Order creation refused: linked salesperson not valid.",
        a3: "Export control blocked on PO-48007-B.",
      },
      messages: {
        m1: "Order PO-48120-C created.",
        m2: "Invoice issued for PO-48007-B.",
        m3: "Order PO-47990-A shipped.",
      },
    },
  },
} as const;

type Copy = (typeof COPY)[Lang];

/* ---------- primitives ---------- */

function Label({ children }: { children: ReactNode }) {
  return <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-stone-500">{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-sm border border-stone-300 bg-white ${className}`}>{children}</div>;
}

function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "quiet";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed";
  const styles: Record<string, string> = {
    primary: "bg-emerald-900 text-emerald-50 hover:bg-emerald-800",
    ghost: "border border-stone-300 text-stone-800 hover:bg-stone-100",
    quiet: "text-stone-600 hover:text-stone-900 underline underline-offset-4",
  };
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

function Tabs({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-stone-300">
      {items.map((it) => (
        <button
          type="button"
          key={it.id}
          onClick={() => onChange(it.id)}
          className={`-mb-px border-b-2 px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 ${
            value === it.id
              ? "border-emerald-900 font-medium text-emerald-900"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- 01 · pré-remplissage assisté ---------- */

type FieldSrc = "ai" | "default" | "empty" | "checked";
type Field = { i: number; v: string; src: FieldSrc };

/* Les valeurs sont des données de démonstration ; le nom du champ vient de COPY par index. */
const INITIAL_FIELDS: Field[] = [
  { i: 0, v: "PO-48120-C", src: "ai" },
  { i: 1, v: "Meridian Telecom", src: "ai" },
  { i: 2, v: "12/03/2025", src: "ai" },
  { i: 3, v: "EUR", src: "ai" },
  { i: 4, v: "", src: "default" },
  { i: 5, v: "", src: "empty" },
  { i: 6, v: "", src: "empty" },
  { i: 7, v: "", src: "empty" },
];

function Prefill({ c }: { c: Copy }) {
  const [read, setRead] = useState(false);
  const [fields, setFields] = useState<Field[]>(INITIAL_FIELDS);
  const t = c.prefill;
  const pending = fields.filter((f) => f.src === "ai").length;
  const empty = fields.filter((f) => f.src === "empty").length;

  const verify = (i: number) => setFields((fs) => fs.map((f) => (f.i === i ? { ...f, src: "checked" as const } : f)));
  const reset = () => {
    setRead(false);
    setFields(INITIAL_FIELDS);
  };

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <Label>{t.docLabel}</Label>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-sm border border-dashed border-stone-300 px-4 py-3">
            <span className="font-mono text-xs text-stone-500">PDF</span>
            <span className="text-sm text-stone-800">{t.fileName}</span>
          </div>
          {!read ? (
            <Btn onClick={() => setRead(true)}>{t.read}</Btn>
          ) : (
            <Btn variant="quiet" onClick={reset}>
              {t.restart}
            </Btn>
          )}
        </div>
      </Card>

      {read && (
        <>
          <div className="border-l-2 border-stone-400 bg-white px-4 py-3">
            <p className="text-sm text-stone-800">{t.summary(pending, fields.length)}</p>
          </div>

          <Card>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200 px-5 py-3">
              <Label>{t.step}</Label>
              <span className="font-mono text-xs text-stone-600">{t.counts(pending, empty)}</span>
            </div>

            <div className="grid gap-px bg-stone-200 sm:grid-cols-2">
              {fields.map((f) => {
                const isAi = f.src === "ai";
                const isEmpty = f.src === "empty";
                const value = f.src === "default" ? t.orderType : f.v;
                return (
                  <div key={f.i} className={`bg-white px-5 py-4 ${isAi ? "border-l-2 border-red-700" : ""}`}>
                    <Label>{t.fields[f.i]}</Label>
                    <div className="mt-1.5 flex items-center justify-between gap-3">
                      {isEmpty ? (
                        <input
                          placeholder={t.toFill}
                          className="w-full rounded-sm border border-stone-300 px-3 py-1.5 font-mono text-sm placeholder:text-stone-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900"
                        />
                      ) : (
                        <span className={`font-mono text-sm ${isAi ? "text-red-800" : "text-stone-900"}`}>{value}</span>
                      )}
                      {isAi && (
                        <button
                          type="button"
                          onClick={() => verify(f.i)}
                          className="shrink-0 rounded-sm px-2 py-1 text-xs font-medium text-red-800 underline underline-offset-4 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                        >
                          {t.verify}
                        </button>
                      )}
                      {f.src === "checked" && <span className="shrink-0 text-xs text-emerald-800">{t.verified}</span>}
                    </div>
                    <span className="mt-1 block text-[11px] text-stone-500">
                      {isAi ? t.srcAi : f.src === "checked" ? t.srcChecked : isEmpty ? t.srcEmpty : t.srcDefault}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 px-5 py-4">
              <span className="text-sm text-stone-600">{pending > 0 ? t.footerPending : t.footerDone}</span>
              <Btn>{t.nextStep}</Btn>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

/* ---------- 02 · re-commande ---------- */

type LineId = "L1" | "L2" | "L3" | "A1" | "A2";
type StatusId = "saved" | "preparing" | "closed" | "cancelled";
type OrderLine = { id: LineId; ref: string; qty: string; price: string };
type Order = { id: string; customer: string; date: string; status: StatusId; lines: OrderLine[] };

const SOURCE_IDS = ["encours", "archives"] as const;

const DATA: Record<string, Order[]> = {
  encours: [
    {
      id: "CMD-1042",
      customer: "Meridian Telecom",
      date: "22/02/2025",
      status: "saved",
      lines: [
        { id: "L1", ref: "SIM-ENP-4408", qty: "1 000", price: "0,06 €" },
        { id: "L2", ref: "SIM-ENP-4409", qty: "1 000", price: "0,06 €" },
        { id: "L3", ref: "SRV-INT-0021", qty: "1", price: "200,00 €" },
      ],
    },
    { id: "CMD-1039", customer: "Calder Mobile", date: "18/02/2025", status: "preparing", lines: [] },
  ],
  archives: [
    {
      id: "CMD-0417",
      customer: "Northvale Connect",
      date: "09/06/2019",
      status: "closed",
      lines: [
        { id: "A1", ref: "SIM-ENP-2210", qty: "5 000", price: "0,07 €" },
        { id: "A2", ref: "SRV-INT-0008", qty: "1", price: "180,00 €" },
      ],
    },
    { id: "CMD-0388", customer: "Arcadia Wireless", date: "14/01/2019", status: "cancelled", lines: [] },
  ],
};

function Reorder({ c }: { c: Copy }) {
  const [source, setSource] = useState<string>("encours");
  const [open, setOpen] = useState<string | null>("CMD-1042");
  const [picked, setPicked] = useState<LineId[]>([]);
  const [done, setDone] = useState(false);
  const t = c.reorder;

  const toggle = (id: LineId) => {
    setDone(false);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const switchSource = (s: string) => {
    setSource(s);
    setOpen(DATA[s][0].id);
    setPicked([]);
    setDone(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600">{t.intro}</p>

      <Tabs
        items={SOURCE_IDS.map((id) => ({ id, label: t.sources[id] }))}
        value={source}
        onChange={switchSource}
      />

      <Card>
        <div className="hidden grid-cols-[1fr_1.4fr_1fr_1fr_auto] gap-4 border-b border-stone-200 px-5 py-3 sm:grid">
          <Label>{t.headOrder}</Label>
          <Label>{t.headClient}</Label>
          <Label>{t.headDate}</Label>
          <Label>{t.headStatus}</Label>
          <span />
        </div>

        {DATA[source].map((o) => {
          const isOpen = open === o.id;
          return (
            <div key={o.id} className="border-b border-stone-200 last:border-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : o.id)}
                className="grid w-full grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 text-left hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 sm:grid-cols-[1fr_1.4fr_1fr_1fr_auto]"
              >
                <span className="font-mono text-sm text-stone-900">{o.id}</span>
                <span className="hidden text-sm text-stone-800 sm:block">{o.customer}</span>
                <span className="hidden font-mono text-sm text-stone-600 sm:block">{o.date}</span>
                <span className="hidden text-xs text-stone-600 sm:block">{t.statuses[o.status]}</span>
                <span className="text-xs text-stone-500">{isOpen ? t.collapse : t.expand}</span>
              </button>

              {isOpen && o.lines.length > 0 && (
                <div className="bg-stone-50 px-5 pb-5">
                  <div className="divide-y divide-stone-200 border-y border-stone-200">
                    {o.lines.map((l) => (
                      <label key={l.id} className="flex cursor-pointer items-center gap-4 py-3 text-sm">
                        <input
                          type="checkbox"
                          checked={picked.includes(l.id)}
                          onChange={() => toggle(l.id)}
                          className="h-4 w-4 accent-emerald-900"
                        />
                        <span className="font-mono text-xs text-stone-500">{l.ref}</span>
                        <span className="flex-1 text-stone-800">{t.lines[l.id]}</span>
                        <span className="font-mono text-xs text-stone-600">{l.qty}</span>
                        <span className="hidden font-mono text-xs text-stone-600 sm:block">{l.price}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
                    {done && <span className="text-sm text-emerald-800">{t.done(picked.length)}</span>}
                    <Btn disabled={picked.length === 0} onClick={() => setDone(true)}>
                      {t.reorder}
                      {picked.length > 0 ? ` (${picked.length})` : ""}
                    </Btn>
                  </div>
                </div>
              )}

              {isOpen && o.lines.length === 0 && <p className="bg-stone-50 px-5 pb-5 text-sm text-stone-500">{t.empty}</p>}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* ---------- 03 · suivi client ---------- */

type StepState = "done" | "current" | "todo";
type StepId = "s1" | "s2" | "s3" | "s4" | "s5";
type MsgId = "s1" | "s2" | "correction";
type Step = { id: StepId; d: string; state: StepState; notified: boolean; msg?: MsgId; corrected?: boolean };

const INITIAL_STEPS: Step[] = [
  { id: "s1", d: "22/02 · 09:14", state: "done", notified: true, msg: "s1" },
  { id: "s2", d: "24/02 · 11:02", state: "done", notified: true, msg: "s2" },
  { id: "s3", d: "28/02 · 16:40", state: "done", notified: false },
  { id: "s4", d: "", state: "current", notified: false },
  { id: "s5", d: "·", state: "todo", notified: false },
];

function Tracking({ c }: { c: Copy }) {
  const [view, setView] = useState("interne");
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [editing, setEditing] = useState<StepId | null>(null);
  const [draft, setDraft] = useState("");
  const t = c.tracking;

  /* L'étape « Expédition » n'a pas de date : son libellé « En attente » est traduisible,
     donc il ne peut pas vivre dans la donnée initiale. */
  const dateOf = (st: Step) => (st.d === "" ? t.pending : st.d);

  const startEdit = (st: Step) => {
    setEditing(st.id);
    setDraft(dateOf(st));
  };

  const save = (renotify: boolean) => {
    setSteps((ss) =>
      ss.map((s) =>
        s.id === editing
          ? {
              ...s,
              d: draft,
              corrected: true,
              notified: renotify ? true : s.notified,
              msg: renotify ? ("correction" as const) : s.msg,
            }
          : s,
      ),
    );
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <Tabs
        items={[
          { id: "interne", label: t.tabTeam },
          { id: "client", label: t.tabClient },
        ]}
        value={view}
        onChange={setView}
      />

      {view === "interne" ? (
        <Card className="p-5">
          <p className="mb-5 text-sm text-stone-600">{t.intro}</p>

          <ol>
            {steps.map((st, i) => (
              <li key={st.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      st.state === "done" ? "bg-emerald-900" : st.state === "current" ? "bg-white ring-2 ring-emerald-900" : "bg-stone-300"
                    }`}
                  />
                  {i < steps.length - 1 && (
                    <span aria-hidden className={`w-px flex-1 ${st.state === "done" ? "bg-emerald-900" : "bg-stone-300"}`} />
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className={`text-sm ${st.state === "todo" ? "text-stone-400" : "font-medium text-stone-900"}`}>
                      {t.steps[st.id]}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-stone-500">{dateOf(st)}</span>
                      {editing !== st.id && (
                        <button
                          type="button"
                          onClick={() => startEdit(st)}
                          className="rounded-sm px-1 text-xs text-stone-600 underline underline-offset-4 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900"
                        >
                          {t.correct}
                        </button>
                      )}
                    </span>
                  </div>

                  {editing === st.id && (
                    <div className="mt-3 rounded-sm border border-stone-300 bg-stone-50 p-4">
                      <Label>{t.dateLabel}</Label>
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="mt-2 w-full rounded-sm border border-stone-300 bg-white px-3 py-2 font-mono text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900"
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Btn onClick={() => save(true)}>{t.correctNotify}</Btn>
                        <Btn variant="ghost" onClick={() => save(false)}>
                          {t.correctSilent}
                        </Btn>
                        <Btn variant="quiet" onClick={() => setEditing(null)}>
                          {t.cancel}
                        </Btn>
                      </div>
                    </div>
                  )}

                  <span className="mt-1 block text-[11px] text-stone-500">
                    {st.corrected && t.correctedFlag}
                    {st.notified ? t.notified : t.internal}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      ) : (
        <div className="space-y-3">
          {steps
            .filter((s) => s.notified)
            .map((s) => (
              <Card key={s.id} className="p-5">
                <Label>{dateOf(s)}</Label>
                <p className="mt-2 text-sm text-stone-900">{s.msg ? t.messages[s.msg] : null}</p>
              </Card>
            ))}
          <p className="text-sm text-stone-600">{t.clientOutro}</p>
        </div>
      )}
    </div>
  );
}

/* ---------- 04 · alertes et messages ---------- */

type AlertId = "a1" | "a2" | "a3";
type MessageId = "m1" | "m2" | "m3";
type InboxItem = { id: AlertId | MessageId; t: string; src: "srcProduction" | "srcBilling" };

const INBOX: { alerts: InboxItem[]; messages: InboxItem[] } = {
  alerts: [
    { id: "a1", t: "16:32", src: "srcProduction" },
    { id: "a2", t: "09:28", src: "srcBilling" },
    { id: "a3", t: "", src: "srcProduction" },
  ],
  messages: [
    { id: "m1", t: "16:32", src: "srcProduction" },
    { id: "m2", t: "09:28", src: "srcBilling" },
    { id: "m3", t: "", src: "srcProduction" },
  ],
};

function Inbox({ c }: { c: Copy }) {
  const [tab, setTab] = useState<"alerts" | "messages">("alerts");
  const [read, setRead] = useState<string[]>([]);
  const t = c.inbox;
  const items = INBOX[tab];
  const unread = items.filter((i) => !read.includes(i.id));

  /* Le troisième élément n'a pas d'heure : c'est « Hier », donc traduisible. */
  const timeOf = (it: InboxItem) => (it.t === "" ? t.yesterday : it.t);
  const bodyOf = (it: InboxItem) =>
    it.id.startsWith("a") ? t.alerts[it.id as AlertId] : t.messages[it.id as MessageId];

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600">{t.intro}</p>

      <Tabs
        items={[
          { id: "alerts", label: `${t.tabAlerts} (${INBOX.alerts.filter((i) => !read.includes(i.id)).length})` },
          { id: "messages", label: `${t.tabMessages} (${INBOX.messages.filter((i) => !read.includes(i.id)).length})` },
        ]}
        value={tab}
        onChange={(id) => setTab(id as "alerts" | "messages")}
      />

      <Card>
        {items.map((it) => {
          const isRead = read.includes(it.id);
          return (
            <div
              key={it.id}
              className={`flex items-start gap-4 border-b border-stone-200 px-5 py-4 last:border-0 ${isRead ? "opacity-50" : ""} ${
                tab === "alerts" && !isRead ? "border-l-2 border-l-red-700" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-xs text-stone-500">{timeOf(it)}</span>
                  <span className="text-xs text-stone-500">{t[it.src]}</span>
                </div>
                <p className={`mt-1 text-sm ${isRead ? "text-stone-600" : "font-medium text-stone-900"}`}>{bodyOf(it)}</p>
              </div>
              {!isRead && (
                <button
                  type="button"
                  onClick={() => setRead((r) => [...r, it.id])}
                  className="shrink-0 text-xs text-stone-600 underline underline-offset-4 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900"
                >
                  {tab === "alerts" ? t.handle : t.markRead}
                </button>
              )}
            </div>
          );
        })}

        {unread.length === 0 && (
          <p className="px-5 py-6 text-sm text-stone-500">{tab === "alerts" ? t.emptyAlerts : t.emptyMessages}</p>
        )}
      </Card>
    </div>
  );
}

/* ---------- shell ---------- */

/**
 * Nimbus — démonstrations de patterns : reconstructions neutres sur un design system fictif.
 * Palette volontairement distincte du portfolio (stone/emerald) pour marquer qu'il s'agit d'un
 * système différent. Aucune interface, donnée ou règle métier réelle n'y figure.
 */
export default function NimbusPatterns({
  patterns,
  title,
  intro,
  className = "",
  lang = "fr",
}: {
  /** Sous-ensemble de patterns à montrer, dans l'ordre. Tous par défaut. */
  patterns?: PatternId[];
  title?: string;
  intro?: ReactNode;
  className?: string;
  lang?: Lang;
}) {
  const c = COPY[lang];
  const shown = PATTERNS.filter((p) => !patterns || patterns.includes(p.id)).sort(
    (a, b) => (patterns ? patterns.indexOf(a.id) - patterns.indexOf(b.id) : 0)
  );
  const [tab, setTab] = useState<PatternId>(shown[0].id);

  return (
    <div
      className={`light-surface grain-multiply relative rounded-folder border-2 border-noir bg-paper p-7 text-ink shadow-paper md:p-9 ${className}`}
    >
      <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.1em] opacity-60">{c.eyebrow}</p>
      <h3 className="mb-3 text-[clamp(22px,2.6vw,30px)] font-extrabold uppercase tracking-[-0.01em]">
        {title ?? c.defaultTitle}
      </h3>
      <p className="mb-6 max-w-[68ch] text-[15.5px] leading-relaxed opacity-85">
        {intro ?? c.defaultIntro}
        {c.scope}
      </p>

      <div className="rounded-lg bg-stone-100 p-5 sm:p-8">
        {/* Un seul pattern : la barre d'onglets n'a plus rien à arbitrer, on la masque. */}
        <nav className={`mb-6 flex flex-wrap gap-2 ${shown.length < 2 ? "hidden" : ""}`}>
          {shown.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setTab(p.id)}
              className={`flex items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 ${
                tab === p.id ? "border-emerald-900 bg-emerald-900 text-emerald-50" : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              <span className="font-mono text-[11px] opacity-70">{p.n}</span>
              {c.tabs[p.id]}
            </button>
          ))}
        </nav>

        <p className="mb-5 border-l-2 border-stone-400 pl-4 text-sm leading-relaxed text-stone-700">{c.captions[tab]}</p>

        {tab === "prefill" && <Prefill c={c} />}
        {tab === "reorder" && <Reorder c={c} />}
        {tab === "tracking" && <Tracking c={c} />}
        {tab === "inbox" && <Inbox c={c} />}
      </div>
    </div>
  );
}
