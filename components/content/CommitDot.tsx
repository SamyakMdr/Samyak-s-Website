import Link from "next/link";
import type { CSSProperties } from "react";
import { projectHref } from "@/content/projects";
import { activityGraph } from "@/content/site";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

type CommitDotProps = {
  project: Project;
  /** Where the label sits relative to the dot. */
  labelPosition: "above" | "below";
  className?: string;
  style?: CSSProperties;
};

// 160 × 112 node, dot centred at (80, 60). Hover and keyboard focus grow the dot
// 14 → 18px and the halo 28 → 40px (transform only) and show the command tooltip.
export function CommitDot({ project, labelPosition, className, style }: CommitDotProps) {
  const above = labelPosition === "above";

  return (
    <Link
      href={projectHref(project)}
      aria-label={`Open ${project.title} project`}
      data-cursor="link"
      style={{ "--project": project.color, ...style } as CSSProperties}
      className={cn("group/dot absolute -mt-15 -ml-20 block h-28 w-40 rounded-md", className)}
    >
      <span
        aria-hidden="true"
        className="absolute top-11.5 left-16.5 size-7 rounded-full bg-(--project) opacity-16 transition-[transform,opacity] duration-(--dur-fast) ease-out group-hover/dot:scale-[1.4286] group-hover/dot:opacity-28 group-focus-visible/dot:scale-[1.4286] group-focus-visible/dot:opacity-28"
      />
      <span
        aria-hidden="true"
        className="absolute top-13.25 left-18.25 size-3.5 rounded-full border-2 border-bg bg-(--project) transition-transform duration-(--dur-fast) ease-out group-hover/dot:scale-[1.2857] group-focus-visible/dot:scale-[1.2857]"
      />

      <span
        className={cn(
          "absolute inset-x-0 flex flex-col items-center text-center transition-transform duration-(--dur-fast) ease-out",
          above ? "top-2.5 group-hover/dot:-translate-y-0.5 group-focus-visible/dot:-translate-y-0.5" : "top-19.5",
        )}
      >
        <span className="t-mono-sm text-dim transition-colors duration-(--dur-fast) group-hover/dot:text-fg group-focus-visible/dot:text-fg">
          {project.graphLabel}
        </span>
        <span className="t-mono-xs text-dim">{project.year}</span>
      </span>

      <span
        role="tooltip"
        data-theme="dark"
        className={cn(
          "pointer-events-none absolute left-1/2 z-10 flex -translate-x-1/2 translate-y-1 flex-col items-start gap-0.5 rounded-sm border border-line bg-code-bg px-3 py-2 whitespace-nowrap opacity-0 shadow-tooltip",
          "transition-[transform,opacity] duration-(--dur-fast) ease-out",
          "group-hover/dot:translate-y-0 group-hover/dot:opacity-100 group-focus-visible/dot:translate-y-0 group-focus-visible/dot:opacity-100",
          above ? "-top-13.75" : "-top-6.75",
        )}
      >
        <span className="t-mono-label flex items-start gap-1.5">
          <span className="text-green-t">❯</span>
          <span className="text-code-fg">{project.command}</span>
        </span>
        <span className="t-caption text-dim">{activityGraph.tooltipHint}</span>
      </span>
    </Link>
  );
}
