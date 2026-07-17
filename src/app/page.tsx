// → Type : Server Component
// → Raison : assemble les sections, aucune logique
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import StatsNotes from "../components/StatsNotes";
import About from "../components/About";
import Folders from "../components/Folders";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <StatsNotes />
        <About />
        <Folders />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
