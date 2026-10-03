"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { terminalCopy } from "@/content/commands";
import { getProject, projectHref } from "@/content/projects";
import type { OutputLine } from "@/lib/commands";
import type { TerminalEntry } from "./useTerminal";

function Line({ line, onRun }: { line: OutputLine; onRun: (command: string) => void }) {
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          {line.rows.map((row) => (
            <p key={row.name} className={row.current ? "text-green-t" : undefined}>
              <span className="whitespace-pre">{row.current ? "* " : "  "}</span>
              {row.name}
            </p>
          ))}
        </div>
      );
    case "json":
      return <pre className="font-mono whitespace-pre-wrap text-code-fg">{line.text}</pre>;
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

// Commands and their results, oldest first: the newest sits just above the input.
export function TerminalOutput({ entries, onRun }: { entries: TerminalEntry[]; onRun: (command: string) => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {entries.map((entry) => (
        <motion.div
          key={entry.id}
          initial={reducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="flex flex-col text-code-fg tablet:t-code max-tablet:t-code-m"
        >
          <p className="flex gap-2.5">
            <span className="text-green-t">❯</span>
            <span>{entry.command}</span>
          </p>
          {entry.lines.map((line, index) => (
            <Fragment key={index}>
              <Line line={line} onRun={onRun} />
            </Fragment>
          ))}
        </motion.div>
      ))}
    </>
  );
}
