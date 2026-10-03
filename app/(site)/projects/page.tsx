import type { Metadata } from "next";
import { seo } from "@/content/site";
import { ProjectGrid } from "./_sections/ProjectGrid";
import { ProjectsHeader } from "./_sections/ProjectsHeader";

export const metadata: Metadata = {
  title: seo.projects.title,
  description: seo.projects.description,
};

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-(--header-h)">
      <ProjectsHeader />
      <ProjectGrid />
    </main>
  );
}
