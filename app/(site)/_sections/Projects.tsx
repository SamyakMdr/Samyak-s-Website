import { ProjectCard } from "@/components/content/ProjectCard";
import { ProjectCarousel } from "@/components/content/ProjectCarousel";
import { SectionHead } from "@/components/layout/SectionHead";
import { Button } from "@/components/ui/Button";
import { featuredProjects } from "@/content/projects";
import { projectsSection } from "@/content/site";
import { cn } from "@/lib/cn";

// Desktop rows alternate wide and narrow cards: 776/326, 551/551, 326/776.
// Tablet (not designed) uses two equal columns.
const ROWS = [
  { columns: "desktop:grid-cols-[776fr_326fr]", widths: ["wide", "narrow"] },
  { columns: "desktop:grid-cols-2", widths: ["half", "half"] },
  { columns: "desktop:grid-cols-[326fr_776fr]", widths: ["narrow", "wide"] },
] as const;

export function Projects() {
  return (
    <section
      id={projectsSection.id}
      aria-labelledby="projects-title"
      className="page-x section-top flex flex-col gap-5 tablet:gap-8"
    >
      <div className="flex items-end gap-6">
        <SectionHead
          title={projectsSection.title}
          tone={projectsSection.tone}
          branch={projectsSection.branch}
          intro={projectsSection.intro}
          introMobile={projectsSection.introMobile}
          titleId="projects-title"
          className="min-w-0 flex-1"
        />
        <Button href="/projects" variant="secondary" className="max-tablet:hidden">
          {projectsSection.viewAll}
        </Button>
      </div>

      <div className="flex flex-col gap-4.5 max-tablet:hidden">
        {ROWS.map((row, rowIndex) => (
          <ul key={row.columns + rowIndex} className={cn("grid grid-cols-2 gap-4.5", row.columns)}>
            {featuredProjects.slice(rowIndex * 2, rowIndex * 2 + 2).map((project, index) => (
              <li key={project.slug} className="min-w-0">
                <ProjectCard
                  project={project}
                  layout="feature"
                  width={row.widths[index]}
                  highlight
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="flex flex-col gap-5 tablet:hidden">
        <ProjectCarousel
          label={projectsSection.title}
          slides={featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} layout="feature" highlight mobileSummary />
          ))}
        />
        <Button href="/projects" variant="secondary" fullWidth className="py-3.5">
          {projectsSection.viewAll}
        </Button>
      </div>
    </section>
  );
}
