import type { Metadata } from "next";
import { StackSlider } from "@/components/content/StackSlider";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { JsonLd } from "@/components/layout/JsonLd";
import { seo } from "@/content/site";
import { pageMetadata, personJsonLd } from "@/lib/seo";
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

export const metadata: Metadata = pageMetadata({ ...seo.home, path: "/" });

// Sections in Figma order. From Skills down they fade in on scroll (<ScrollReveal>).
// The hero panel inside the intro carries id="main".
export default function HomePage() {
  return (
    <main className="pt-(--header-h)">
      <JsonLd data={personJsonLd()} />
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
      <ScrollReveal />
    </main>
  );
}
