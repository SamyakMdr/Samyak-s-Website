"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { terminalCopy } from "@/content/commands";
import { getProject, projectHref } from "@/content/projects";
import { a11y } from "@/content/site";
import { cn } from "@/lib/cn";
import type { OutputLine } from "@/lib/commands";
import type { TerminalEntry } from "./useTerminal";

type LineProps = {
  line: OutputLine;
  onRun: (command: string) => void;
  /** Spacing between the rows of one line, where the terminal has any. */
  rows?: string;
};

function Line({ line, onRun, rows }: LineProps) {
  const column = cn("flex flex-col", rows);

  switch (line.kind) {
    case "ok":
      return (
        <p className="flex gap-2">
          <span className="text-green-t">✓</span>
          <span>{line.text}</span>
        </p>
      );
    case "error":
      return (
        <p className="flex gap-2">
          <span className="text-bad">✗</span>
          <span>{line.text}</span>
        </p>
      );
    case "info":
      return <p className="text-dim">{line.text}</p>;
    case "suggest":
      return (
        <p className="flex gap-2 text-dim">
          <span>{terminalCopy.didYouMean}</span>
          <button type="button" onClick={() => onRun(line.command)} className="rounded-xs text-blue-t hover:underline">
            {line.command}
          </button>
          <span>?</span>
        </p>
      );
    case "pairs":
      return (
        <div className={column}>
          {line.rows.map((row) => (
            <p key={row.command} className="flex gap-2">
              <span className="text-blue-t">{row.command}</span>
              {row.description && <span className="text-dim">{row.description}</span>}
            </p>
          ))}
        </div>
      );
    case "keys":
      return (
        <div className={column}>
          {line.rows.map((row) => (
            <p key={row.label} className="flex gap-2">
              <span className="min-w-12 text-warn">{row.keys.join(" ")}</span>
              <span className="text-dim">{row.label}</span>
            </p>
          ))}
        </div>
      );
    case "log":
      return (
        <div className={column}>
          {line.rows.map((row) => (
            <p key={row.hash} className="flex gap-2">
              <span className="text-warn">{row.hash}</span>
              <span>{row.message}</span>
            </p>
          ))}
        </div>
      );
    case "branches":
      return (
        <div className={column}>
          {line.rows.map((row) => (
            <p key={row.name} className={row.current ? "text-green-t" : undefined}>
              <span className="whitespace-pre">{row.current ? "* " : "  "}</span>
              {row.name}
            </p>
          ))}
        </div>
      );
    case "json":
    case "text":
      // A blank line still takes a row (`| head` prints the lines one by one).
      return <pre className="font-mono whitespace-pre-wrap text-code-fg">{line.text || " "}</pre>;
    case "numbered":
      return (
        <div className={column}>
          {line.rows.map((row) => (
            <p key={row.n} className="flex gap-3 tablet:gap-3.5">
              <span className="whitespace-pre text-dim">{String(row.n).padStart(3, " ")}</span>
              <span>{row.text}</span>
            </p>
          ))}
        </div>
      );
    case "run":
      return (
        <div className={line.inline ? cn("flex flex-wrap gap-x-4", rows && "gap-y-[inherit]") : column}>
          {line.rows.map((row) => (
            <p key={row.label} className="flex min-w-0 gap-2">
              <button
                type="button"
                onClick={() => onRun(row.run)}
                aria-label={a11y.runCommand(row.run)}
                className={cn("shrink-0 rounded-xs hover:underline", row.folder && "text-blue-t")}
              >
                {row.label}
              </button>
              {row.description && <span className="truncate text-dim">{row.description}</span>}
            </p>
          ))}
        </div>
      );
    case "fields":
      return (
        <div className={column}>
          {line.rows.map((row) => (
            <p key={row.label} className="flex gap-2">
              <span className="w-[10ch] shrink-0 text-dim">{row.label}</span>
              {row.href ? (
                <a
                  href={row.href}
                  className="min-w-0 rounded-xs break-all text-blue-t hover:underline"
                  {...(row.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {row.value}
                </a>
              ) : (
                <span className="min-w-0">{row.value}</span>
              )}
            </p>
          ))}
        </div>
      );
    case "projects":
      return (
        <ul className="flex flex-col gap-1.5 py-1">
          {line.slugs.map((slug) => {
            const project = getProject(slug);
            if (!project) return null;
            return (
              <li key={slug}>
                <Link
                  href={projectHref(project)}
                  className="flex items-center gap-3 rounded-xs pr-2 hover:bg-panel"
                >
                  <Image
                    src={project.cover}
                    alt=""
                    width={72}
                    height={42}
                    sizes="72px"
                    loading="lazy"
                    className="h-10.5 w-18 shrink-0 rounded-xs border border-line object-cover"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-code-fg">{project.title}</span>
                    <span className="t-mono-sm text-dim">
                      {project.command} · {project.year}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      );
  }
}

type TerminalOutputProps = {
  entries: TerminalEntry[];
  onRun: (command: string) => void;
  /** The small terminals: a `$` prompt, and rows spaced like the lines already in the frame. */
  shell?: boolean;
  /** Added to each command and its result (the hero leaves a blank line under each). */
  entryClassName?: string;
};

// Commands and their results, oldest first: the newest sits just above the input.
export function TerminalOutput({ entries, onRun, shell = false, entryClassName }: TerminalOutputProps) {
  const reducedMotion = useReducedMotion();
  const rows = shell ? "gap-[inherit]" : undefined;

  return (
    <MotionProvider>
      {entries.map((entry) => (
        <m.div
          key={entry.id}
          initial={reducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className={cn("flex flex-col text-code-fg tablet:t-code max-tablet:t-code-m", rows, entryClassName)}
        >
          <p className={cn("flex", shell ? "gap-2" : "gap-2.5")}>
            <span className="text-green-t">{shell ? "$" : "❯"}</span>
            <span>{entry.command}</span>
          </p>
          {entry.lines.map((line, index) => (
            <Fragment key={index}>
              <Line line={line} onRun={onRun} rows={rows} />
            </Fragment>
          ))}
        </m.div>
      ))}
    </MotionProvider>
  );
}
