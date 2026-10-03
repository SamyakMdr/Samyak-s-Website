import type { Metadata } from "next";
import { JsonLd } from "@/components/layout/JsonLd";
import { seo } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ProjectGrid } from "./_sections/ProjectGrid";
import { ProjectsHeader } from "./_sections/ProjectsHeader";

export const metadata: Metadata = pageMetadata({ ...seo.projects, path: "/projects" });

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-(--header-h)">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: seo.breadcrumbs.home, path: "/" },
          { name: seo.breadcrumbs.projects, path: "/projects" },
        ])}
      />
      <ProjectsHeader />
      <ProjectGrid />
    </main>
  );
}
