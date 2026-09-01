// → Type : Server Component
// → Raison : assemble les sections, aucune logique
import Nav from "../../components/Nav";
import Hero from "../../components/Hero";
import StatsNotes from "../../components/StatsNotes";
import About from "../../components/About";
import Folders from "../../components/Folders";
import Skills from "../../components/Skills";
import Contact from "../../components/Contact";

export default function Home() {
  return (
    <>
      <Nav lang="fr" />
      <main id="main">
        <Hero lang="fr" />
        <StatsNotes lang="fr" />
        <About lang="fr" />
        <Folders lang="fr" />
        <Skills lang="fr" />
        <Contact lang="fr" />
      </main>
    </>
  );
}
