// → Type : Server Component
// → Raison : assemble les sections, aucune logique
import Nav from "../../../components/Nav";
import Hero from "../../../components/Hero";
import StatsNotes from "../../../components/StatsNotes";
import About from "../../../components/About";
import Folders from "../../../components/Folders";
import Skills from "../../../components/Skills";
import Contact from "../../../components/Contact";

export default function HomeEn() {
  return (
    <>
      <Nav lang="en" />
      <main id="main">
        <Hero lang="en" />
        <StatsNotes lang="en" />
        <About lang="en" />
        <Folders lang="en" />
        <Skills lang="en" />
        <Contact lang="en" />
      </main>
    </>
  );
}
