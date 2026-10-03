import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { BranchTag } from "@/components/ui/BranchTag";
import { TechLogo } from "@/components/ui/TechLogo";
import { projectHref } from "@/content/projects";
import { projectsSection } from "@/content/site";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  /** feature = Home (inset cover) · grid = /projects and mobile lists (full-bleed cover). */
  layout: "feature" | "grid";
  /** Column width on Home, used for the image `sizes` hint. */
  width?: "wide" | "half" | "narrow";
  /** The first Home card gets the gradient border and violet glow on hover. */
  highlight?: boolean;
  /** Cards above the fold load eagerly instead of lazily. */
  eager?: boolean;
  /** Use the shorter mobile summary where Figma defines one. */
  mobileSummary?: boolean;
  className?: string;
};

const SIZES = {
  wide: "(min-width: 1200px) 748px, (min-width: 768px) 50vw, 292px",
  half: "(min-width: 1200px) 523px, (min-width: 768px) 50vw, 292px",
  narrow: "(min-width: 1200px) 298px, (min-width: 768px) 50vw, 292px",
  grid: "(min-width: 1200px) 360px, (min-width: 768px) 50vw, 350px",
} as const;

export function ProjectCard({
  project,
  layout,
  width = "narrow",
  highlight = false,
  eager = false,
  mobileSummary = false,
  className,
}: ProjectCardProps) {
  const feature = layout === "feature";

  return (
    <Link
      href={projectHref(project)}
      aria-label={`Open ${project.title} project`}
      data-cursor="card"
      style={{ "--project": project.color } as CSSProperties}
      className={cn(
        "group/card relative flex h-full flex-col border border-line bg-panel text-left",
        "transition-[transform,border-color,box-shadow] duration-(--dur-ui) ease-ui",
        "hover:border-(--project) focus-visible:border-(--project) motion-safe:hover:-translate-y-0.5",
        feature ? "gap-3.5 rounded-lg px-3.5 pt-3.5 pb-4" : "overflow-hidden rounded-card",
        highlight && "card-highlight",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          feature ? "h-55 rounded-md border border-line" : "h-52",
        )}
      >
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes={feature ? SIZES[width] : SIZES.grid}
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
        <span className="t-mono-sm absolute top-3.25 left-3.25 rounded-full bg-cover-pill/80 px-2.5 py-1 leading-[normal] whitespace-nowrap text-on-accent">
          {project.category}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col gap-2.5", feature ? "px-1 pt-1" : "px-4.5 pt-4 pb-4.5")}>
        <h3 className="t-h3 text-fg">{project.title}</h3>
        <p className="t-body-sm text-dim">
          {mobileSummary && project.summaryMobile ? (
            <>
              <span className="tablet:hidden">{project.summaryMobile}</span>
              <span className="max-tablet:hidden">{project.summary}</span>
            </>
          ) : (
            project.summary
          )}
        </p>

        <div className="flex items-center gap-2">
          <BranchTag tone={project.tone} label={project.branch} className="min-w-0" />
          <span className="ml-auto flex shrink-0 items-start">
            {project.stack.slice(0, 3).map((name, index) => (
              <TechLogo
                key={name}
                name={name}
                size={26}
                ring
                labelled
                className={cn(index < 2 && "-mr-1.5")}
              />
            ))}
          </span>
        </div>

        {/* Cards stretch to the tallest in their row; the content stays at the top, as in Figma. */}
        <span aria-hidden="true" className="h-px shrink-0 bg-line" />

        <div className="flex items-center justify-between">
          <span className="t-mono-sm text-dim">{project.year}</span>
          <span className="t-btn-sm flex items-center gap-1.5 text-blue-t">
            {projectsSection.openRoom}
            <ArrowRightIcon size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
