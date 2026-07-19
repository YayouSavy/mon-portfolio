"use client";
// → Type : Client Component
// → Raison : navigation entre écrans (state), reconstitution codée du produit —
// pas des captures d'écran, la palette et les illustrations réelles restent chez Erios.
import { useState } from "react";
import {
  Search,
  Play,
  Trophy,
  Star,
  Home,
  Folder,
  Gamepad2,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Gift,
  Layers,
  ShieldCheck,
  Smile,
} from "lucide-react";
import PhoneFrame from "./PhoneFrame";

type Screen = "home" | "profile" | "lesson";

const GAMES = [
  { label: "Jeu 1", Icon: Sparkles, bg: "bg-[#F7C9DA]" },
  { label: "Jeu 2", Icon: BookOpen, bg: "bg-[#CFE3F7]" },
  { label: "Jeu 3", Icon: Layers, bg: "bg-[#D9CFF2]" },
  { label: "Jeu 4", Icon: Gift, bg: "bg-[#F9D9B8]" },
];

function Avatar({ size = 44 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border-2 border-[#242F63] bg-[#3A4A9E] text-white"
      style={{ width: size, height: size }}
    >
      <Smile size={size * 0.55} strokeWidth={2} />
    </span>
  );
}

function NavBar({ screen, onNavigate }: { screen: Screen; onNavigate: (s: Screen) => void }) {
  const items: { key: Screen; Icon: typeof Home }[] = [
    { key: "profile", Icon: Folder },
    { key: "home", Icon: Home },
    { key: "lesson", Icon: Gamepad2 },
  ];
  return (
    <nav aria-label="Navigation Erios" className="sticky bottom-0 flex items-center justify-around bg-[#242F63] py-3.5">
      {items.map(({ key, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onNavigate(key)}
          aria-current={screen === key ? "page" : undefined}
          aria-label={key}
          className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
            screen === key ? "bg-white text-[#242F63]" : "text-white/70 hover:text-white"
          }`}
        >
          <Icon size={20} strokeWidth={2.4} />
        </button>
      ))}
    </nav>
  );
}

function HomeScreen({ onOpenLesson }: { onOpenLesson: () => void }) {
  return (
    <div className="flex min-h-full flex-col bg-[#FBF1E8] px-4 pb-4 pt-5 text-[#242F63]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <p className="mb-1 text-center text-xs font-bold">Niveau 6</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F0D7D2]">
            <div className="h-full w-2/5 rounded-full bg-[#EA5B47]" />
          </div>
        </div>
        <Avatar />
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#242F63]/50">
        <Search size={14} strokeWidth={2.5} />
        Recherche
      </div>

      <div className="mb-5 grid grid-cols-4 gap-2.5">
        {GAMES.map(({ label, Icon, bg }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl ${bg}`}>
              <Icon size={22} strokeWidth={2} className="text-[#242F63]" />
            </div>
            <p className="text-[9px] font-semibold">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-2xl bg-[#FBDFE4] p-4">
        <p className="mb-2.5 text-center text-sm font-bold">Une vidéo pour toi !</p>
        <div className="grid h-24 place-items-center rounded-xl bg-[#CFE3F7]">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#242F63] text-white">
            <Play size={16} strokeWidth={2.5} fill="currentColor" />
          </span>
        </div>
      </div>

      <div className="mb-5 rounded-2xl bg-[#FBDFE4] p-4">
        <p className="mb-2 text-center text-sm font-bold">Quiz du jour</p>
        <p className="mb-3 text-center text-[11px] opacity-80">Le consentement et les relations saines</p>
        <button
          type="button"
          onClick={onOpenLesson}
          className="w-full rounded-full bg-[#EA5B47] py-2.5 text-xs font-bold uppercase tracking-[0.04em] text-white transition-transform active:scale-95"
        >
          Commencer le quizz
        </button>
      </div>
    </div>
  );
}

function ProfileScreen() {
  const badges = [ShieldCheck, ShieldCheck, ShieldCheck];
  const texts = [
    { title: "Incollable sur les lubrifiants", body: "Améliore tes connaissances sur quels lubrifiants choisir en fonction de l'activité !" },
    { title: "Faire sa première fois", body: "Apprends les bons gestes et comportements à avoir pour une première fois saine et réussie !" },
  ];
  return (
    <div className="flex min-h-full flex-col bg-[#FBF1E8] px-4 pb-4 pt-6 text-[#242F63]">
      <div className="mb-5 flex items-center gap-3.5">
        <Avatar size={56} />
        <div>
          <p className="text-lg font-extrabold leading-none">Jean</p>
          <p className="mt-1 text-xs opacity-70">Niveau 6</p>
          <div className="mt-1.5 flex gap-1">
            {badges.map((Icon, i) => (
              <Icon key={i} size={14} strokeWidth={2} className="text-[#3A4A9E]" />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-around rounded-2xl bg-[#FBDFE4] py-3.5">
        <div className="flex items-center gap-2 text-center">
          <Trophy size={18} strokeWidth={2} />
          <p className="text-[10px] font-semibold leading-tight">
            Mini-jeux
            <br />
            10 / 100
          </p>
        </div>
        <div className="h-8 w-px bg-[#242F63]/15" />
        <div className="flex items-center gap-2 text-center">
          <Star size={18} strokeWidth={2} />
          <p className="text-[10px] font-semibold leading-tight">
            Succès
            <br />
            50 / 100
          </p>
        </div>
      </div>

      <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.05em] underline decoration-2 underline-offset-4">
        Textes à trou
      </p>

      <div className="flex flex-col gap-3">
        {texts.map((t) => (
          <div key={t.title} className="rounded-2xl bg-[#FBDFE4] p-4">
            <p className="mb-1.5 text-[13px] font-bold leading-snug">{t.title}</p>
            <p className="mb-3 text-[10.5px] leading-snug opacity-75">{t.body}</p>
            <button className="rounded-full bg-[#EA5B47] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-white">
              Jouer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonScreen({ onBack }: { onBack: () => void }) {
  const cards = [
    { label: "Jouer", Icon: Gamepad2 },
    { label: "Vidéos", Icon: Play },
  ];
  return (
    <div className="flex min-h-full flex-col bg-[#FBF1E8] px-4 pb-4 pt-6 text-[#242F63]">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Retour"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/70"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
        </button>
        <Avatar size={36} />
      </div>

      <p className="mb-2 text-2xl font-extrabold uppercase leading-[1.05]">Le consentement</p>
      <p className="mb-4 text-[11px] opacity-75">Ici tu apprendras tout ce qu&apos;il y a à savoir sur le consentement !</p>

      <div className="mb-4 rounded-2xl bg-[#CFE3F7] p-4">
        <p className="mb-2 text-xs font-bold">Lire</p>
        <p className="mb-3 text-[10.5px] opacity-75">Pour apprendre simplement ce qu&apos;est le consentement.</p>
        <button className="rounded-full bg-[#EA5B47] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-white">
          Commencer
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ label, Icon }) => (
          <div key={label} className="rounded-2xl bg-[#CFE3F7] p-3.5">
            <Icon size={18} strokeWidth={2} className="mb-2" />
            <p className="mb-2 text-xs font-bold">{label}</p>
            <button className="rounded-full bg-[#EA5B47] px-3 py-1 text-[9px] font-bold uppercase text-white">Voir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reconstitution codée et interactive d'Erios — pas des captures, mêmes palette et structure. */
export default function EriosPreview() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame>
        <div className="flex min-h-full flex-col">
          <div className="flex-1">
            {screen === "home" && <HomeScreen onOpenLesson={() => setScreen("lesson")} />}
            {screen === "profile" && <ProfileScreen />}
            {screen === "lesson" && <LessonScreen onBack={() => setScreen("home")} />}
          </div>
          {screen !== "lesson" && <NavBar screen={screen} onNavigate={setScreen} />}
        </div>
      </PhoneFrame>
      <p className="max-w-[280px] text-center text-xs text-mist/60">
        Reconstitution codée, interactive — touche les icônes en bas pour naviguer entre les écrans.
      </p>
    </div>
  );
}
