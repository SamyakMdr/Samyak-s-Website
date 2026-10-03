import Link from "next/link";
import type { CSSProperties } from "react";
import { graphProjects, projectHref } from "@/content/projects";
import { a11y, activityGraph } from "@/content/site";
import { cn } from "@/lib/cn";
import { CommitDot } from "./CommitDot";

// Horizontal geometry from the Figma frame (1120 × 240): main line at y = 110,
// six branches that leave main 58px before their dot and return 58px after.
const H = { width: 1120, height: 240, mainY: 110, mainStart: 16, headX: 1100, reach: 58, up: 50, down: 172 };
const H_GREY_COMMITS = [30, 195, 365, 535, 705, 875, 1040];
const H_BRANCH_X = [110, 280, 450, 620, 790, 960];

function HorizontalGraph({ className }: { className?: string }) {
  const nodes = graphProjects.map((project, index) => {
    const above = index % 2 === 0;
    return { project, above, cx: H_BRANCH_X[index]!, lane: above ? H.up : H.down };
  });

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${H.width} / ${H.height}` }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${H.width} ${H.height}`}
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        <line x1={H.mainStart} y1={H.mainY} x2={H.headX} y2={H.mainY} stroke="var(--line)" strokeWidth={2} />
        {nodes.map(({ project, cx, lane }) => {
          const from = cx - H.reach;
          const to = cx + H.reach;
          return (
            <g key={project.slug}>
              <path
                d={`M ${from} ${H.mainY} C ${cx - 36} ${H.mainY} ${cx - 30} ${lane} ${cx} ${lane} C ${cx + 30} ${lane} ${cx + 36} ${H.mainY} ${to} ${H.mainY}`}
                stroke={project.color}
                strokeWidth={2}
              />
              <circle cx={from} cy={H.mainY} r={3.5} fill={project.color} />
              <circle cx={to} cy={H.mainY} r={3.5} fill={project.color} />
            </g>
          );
        })}
        {H_GREY_COMMITS.map((x) => (
          <circle key={x} cx={x} cy={H.mainY} r={5} fill="var(--bg)" stroke="var(--dim)" strokeWidth={2} />
        ))}
        <circle cx={H.headX} cy={H.mainY} r={16} stroke="var(--green)" strokeOpacity={0.35} strokeWidth={2} />
        <circle cx={H.headX} cy={H.mainY} r={7} fill="var(--green)" />
      </svg>

      <span
        className="t-mono-sm absolute -translate-x-1/2 text-fg"
        style={{ left: `${(H.headX / H.width) * 100}%`, top: `${(132 / H.height) * 100}%` }}
      >
        {activityGraph.head}
      </span>

      {nodes.map(({ project, above, cx, lane }) => (
        <CommitDot
          key={project.slug}
          project={project}
          labelPosition={above ? "above" : "below"}
          style={{ left: `${(cx / H.width) * 100}%`, top: `${(lane / H.height) * 100}%` }}
        />
      ))}
    </div>
  );
}

// Vertical geometry from the Mobile / Home frame: 56px rows, newest first. The
// frame was edited by hand: main is green, and three branches each span two
// rows, coloured blue, violet and cyan from the top.
const V = { row: 56, mainX: 14, laneX: 34, rail: 66, first: 30 };
const V_BRANCH_COLORS = ["var(--p-heli)", "var(--p-mhn)", "var(--p-backup)"];

function VerticalGraph({ className }: { className?: string }) {
  const rows = [...graphProjects].reverse();
  // HEAD sits 30px down; every other row is 56px tall with its dot centred.
  const height = V.first + rows.length * V.row + V.row / 2;
  const lastY = V.first + rows.length * V.row;

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <svg aria-hidden="true" width={V.rail} height={height} className="absolute top-0 left-0 overflow-visible" fill="none">
        <line x1={V.mainX} y1={V.first} x2={V.mainX} y2={lastY} stroke="var(--green)" strokeWidth={2} />
        {V_BRANCH_COLORS.map((color, index) => {
          const s = V.first + index * V.row * 2;
          const end = s + V.row * 2;
          return (
            <g key={color}>
              <path
                d={`M ${V.mainX} ${s} C ${V.mainX} ${s + 10} ${V.laneX} ${s + 7} ${V.laneX} ${s + 17} L ${V.laneX} ${end - 17} C ${V.laneX} ${end - 7} ${V.mainX} ${end - 10} ${V.mainX} ${end}`}
                stroke={color}
                strokeWidth={2}
              />
              <circle cx={V.laneX} cy={s + V.row} r={4} fill={color} stroke="var(--bg)" strokeWidth={2} />
              <circle cx={V.mainX} cy={end} r={3} fill="var(--green)" />
            </g>
          );
        })}
        <circle cx={V.mainX} cy={V.first} r={12} stroke="var(--green)" strokeOpacity={0.35} strokeWidth={2} />
        <circle cx={V.mainX} cy={V.first} r={6} fill="var(--green)" />
      </svg>

      <p
        className="t-mono-sm absolute flex items-center text-fg"
        style={{ left: V.rail, top: V.first - V.row / 2, height: V.row } as CSSProperties}
      >
        {activityGraph.headMobile}
      </p>

      <ul className="absolute inset-x-0" style={{ top: V.first + V.row / 2 }}>
        {rows.map((project) => (
          <li key={project.slug} style={{ height: V.row }}>
            <Link
              href={projectHref(project)}
              aria-label={a11y.openProject(project.graphLabel ?? project.title)}
              className="flex h-full items-center gap-3 rounded-sm"
              style={{ paddingLeft: V.rail }}
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="t-strong text-fg">{project.graphLabel}</span>
                <span className="t-mono-sm text-dim">{project.year}</span>
              </span>
              <span
                data-theme="dark"
                className="t-mono-sm shrink-0 rounded-xs border border-line bg-code-bg px-2 py-1 whitespace-nowrap text-code-fg"
              >
                {project.command}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CommitGraph({ orientation, className }: { orientation: "horizontal" | "vertical"; className?: string }) {
  return orientation === "horizontal" ? (
    <HorizontalGraph className={className} />
  ) : (
    <VerticalGraph className={className} />
  );
}
