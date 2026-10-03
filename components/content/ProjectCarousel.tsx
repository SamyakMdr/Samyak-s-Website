"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

// Mobile Home projects: 320px cards, 16px gap, snap, tappable pagination dots.
export function ProjectCarousel({ projects, label, className }: { projects: Project[]; label: string; className?: string }) {
  const [viewport, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div className={cn("flex flex-col gap-6", className)} role="group" aria-roledescription="carousel" aria-label={label}>
      {/* Bleeds to the screen edge so the next card peeks in, as in the frame. */}
      <div ref={viewport} data-lenis-prevent className="-mx-(--page-x) overflow-hidden px-(--page-x)">
        <ul className="flex touch-pan-y gap-4">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className="w-80 shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}`}
            >
              <ProjectCard project={project} layout="feature" mobileSummary />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => embla?.scrollTo(index)}
            aria-label={`Show project ${index + 1}: ${project.title}`}
            aria-current={index === selected}
            className={cn(
              // 8px dot with a larger invisible hit area for thumbs.
              "relative size-2 rounded-full transition-colors duration-(--dur-ui) before:absolute before:-inset-2.5 before:content-['']",
              index === selected ? "bg-blue" : "bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}
