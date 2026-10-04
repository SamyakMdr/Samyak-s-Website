import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { projectHref } from "@/content/projects";
import { room } from "@/content/site";
import type { Project } from "@/content/types";

// Links to the next project's own room (open-questions #4), not back to the list.
export function NextProject({ project }: { project: Project }) {
  return (
    <section
      aria-label={room.nextProject}
      className="flex flex-col gap-3 rounded-win border border-line bg-panel p-4 tablet:flex-row tablet:items-center tablet:gap-6 tablet:rounded-lg tablet:p-5"
    >
      <div className="relative h-37.5 shrink-0 overflow-hidden rounded-btn tablet:h-28 tablet:w-50 tablet:rounded-md">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(min-width: 768px) 200px, calc(100vw - 74px)"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 tablet:gap-1.5">
        <p className="t-body-sm text-dim">{room.nextProject}</p>
        <h2 className="t-h3 text-fg">{project.title}</h2>
      </div>
      <Button href={projectHref(project)} variant="secondary" fullWidth="mobile">
        {room.openNext}
      </Button>
    </section>
  );
}
