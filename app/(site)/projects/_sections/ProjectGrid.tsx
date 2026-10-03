"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/content/ProjectCard";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/FilterChip";
import { projectFilters, projects } from "@/content/projects";
import { projectsPage } from "@/content/site";
import type { Project, ProjectType } from "@/content/types";

type Filter = ProjectType | "all";

// Newest first; projects from the same year keep their order in content.
const SORTED = [...projects].sort((a, b) => b.year - a.year);

// Every typed word must appear in the title, a tool, the category or the alias.
function matches(project: Project, terms: string[]): boolean {
  const haystack = [project.title, project.category, project.alias, ...project.stack].join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function ProjectGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const found = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return SORTED.filter((project) => matches(project, terms));
  }, [query]);

  const ofType = (type: Filter) => (type === "all" ? found : found.filter((project) => project.type === type));
  const visible = ofType(filter);

  const reset = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <>
      <div className="page-x flex flex-col gap-3 pb-5 tablet:gap-4 tablet:pb-8">
        <TerminalPrompt
          value={query}
          onChange={setQuery}
          label={projectsPage.searchLabel}
          placeholder={projectsPage.searchPlaceholder}
          placeholderMobile={projectsPage.searchPlaceholderMobile}
        />

        <div className="flex items-start gap-2 desktop:items-center max-tablet:-mr-(--page-x)">
          {/* Mobile: one row that swipes sideways and bleeds off the right edge.
              The padding keeps focus rings inside the scroll box. */}
          <div
            role="group"
            aria-label={projectsPage.filtersLabel}
            className="no-scrollbar flex min-w-0 gap-2 tablet:flex-wrap max-tablet:-my-1.5 max-tablet:-ml-1 max-tablet:overflow-x-auto max-tablet:py-1.5 max-tablet:pr-(--page-x) max-tablet:pl-1"
          >
            {projectFilters.map(({ type, label }) => (
              <FilterChip
                key={type}
                label={label}
                count={ofType(type).length}
                selected={type === filter}
                onClick={() => setFilter(type)}
                // Taller invisible hit area for thumbs.
                className="relative before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']"
              />
            ))}
          </div>
          <p className="t-body-sm ml-auto shrink-0 whitespace-nowrap text-dim max-desktop:mt-1.75 max-tablet:hidden">{projectsPage.sort}</p>
        </div>
      </div>

      <div className="page-x pb-16 tablet:pb-24">
        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-x-5 tablet:gap-y-6 desktop:grid-cols-3">
            {visible.map((project, index) => (
              <li key={project.slug}>
                <ProjectCard project={project} layout="grid" mobileSummary eager={index < 3} titleAs="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <div role="status" className="flex flex-col items-start gap-4 rounded-card border border-line bg-panel p-6 max-tablet:p-4.5">
            <p className="t-code flex gap-2 text-fg">
              <span aria-hidden="true" className="text-bad">
                ✗
              </span>
              {projectsPage.empty(query.trim())}
            </p>
            <Button variant="secondary" onClick={reset} fullWidth="mobile">
              {projectsPage.clear}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
