import { StackSlider } from "@/components/content/StackSlider";
import { ActivityGraph } from "./_sections/ActivityGraph";
import { Contact } from "./_sections/Contact";
import { CVBand } from "./_sections/CVBand";
import { Education } from "./_sections/Education";
import { Experience } from "./_sections/Experience";
import { Hero } from "./_sections/Hero";
import { HorizontalIntro } from "./_sections/HorizontalIntro";
import { Projects } from "./_sections/Projects";
import { Services } from "./_sections/Services";
import { Skills } from "./_sections/Skills";
import { TerminalSection } from "./_sections/TerminalSection";

// Sections in Figma order. The hero panel inside the intro carries id="main".
export default function HomePage() {
  return (
    <main className="pt-(--header-h)">
      <HorizontalIntro hero={<Hero />} terminal={<TerminalSection />} />
      <ActivityGraph />
      <StackSlider />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Services />
      <CVBand />
      <Contact />
    </main>
  );
}
