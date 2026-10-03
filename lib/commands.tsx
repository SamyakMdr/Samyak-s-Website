"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  branches,
  commands,
  gitCommands,
  shortcuts,
  terminalCopy,
  type CommandSpec,
  type ShortcutSpec,
} from "@/content/commands";
import { experience } from "@/content/experience";
import { findProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import type { ProjectType } from "@/content/types";
import { cvReady } from "./cv";
import { requestAnchor, scrollToId, scrollToTop } from "./scroll";

export type OutputLine =
  | { kind: "ok" | "error" | "info"; text: string }
  | { kind: "suggest"; command: string }
  | { kind: "pairs"; rows: { command: string; description?: string }[] }
  | { kind: "keys"; rows: ShortcutSpec[] }
  | { kind: "projects"; slugs: string[] }
  | { kind: "log"; rows: { hash: string; message: string }[] }
  | { kind: "branches"; rows: { name: string; current?: boolean }[] }
  | { kind: "json"; text: string };

export interface CommandResult {
  lines: OutputLine[];
  /** `clear` empties the output instead of adding to it. */
  clear?: boolean;
}

export interface TerminalApi {
  focus(): void;
  /** Types the command into the terminal and runs it there. */
  submit(command: string): void;
}

interface CommandsContextValue {
  run(input: string): CommandResult;
  /** Runs in the terminal when it is on screen, silently otherwise. */
  runInTerminal(command: string): void;
  focusTerminal(): void;
  registerTerminal(api: TerminalApi): () => void;
  /** True once the visitor has used the terminal (dismisses the hint toast). */
  terminalUsed: boolean;
  noteTerminalUse(): void;
}

const CommandsContext = createContext<CommandsContextValue | null>(null);

export const HINT_STORAGE_KEY = "terminal-hint-seen";

const PROJECT_TYPES: ProjectType[] = ["web", "backend", "devops", "ai", "ui"];
const PAGES = ["home", "projects", "experience", "contact"];

// Longest names first so "git checkout projects" wins over shorter prefixes.
const LOOKUP = commands
  .flatMap((spec) => [spec.name, ...spec.aliases].map((name) => ({ name: name.toLowerCase(), spec })))
  .sort((a, b) => b.name.length - a.name.length);

/** Every spelling worth suggesting or completing, in a sensible order. */
export const COMPLETIONS: string[] = [
  ...PAGES.map((page) => `goto ${page}`),
  ...projects.map((project) => `open ${project.alias}`),
  "download cv",
  "switch-theme",
  "help",
  "clear",
  ...gitCommands.map((item) => item.command),
  ...commands.map((spec) => spec.name),
  ...projects.map((project) => `/open ${project.alias}`),
  ...PROJECT_TYPES.map((type) => `/projects --type ${type}`),
];

function normalise(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

function resolve(raw: string): { spec: CommandSpec; arg: string } | null {
  const lower = normalise(raw).toLowerCase();
  // A leading slash is optional either way: "/help" = "help", "/goto home" = "goto home".
  const forms = [lower, lower.startsWith("/") ? lower.slice(1) : `/${lower}`];
  for (const form of forms) {
    for (const { name, spec } of LOOKUP) {
      if (form === name) return { spec, arg: "" };
      if (spec.takesArgument && form.startsWith(`${name} `)) {
        return { spec, arg: form.slice(name.length + 1) };
      }
    }
  }
  return null;
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]!;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j]!;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length]!;
}

function closest(input: string, pool: string[]): string | null {
  let best: { value: string; score: number } | null = null;
  for (const value of pool) {
    const score = distance(input, value);
    if (!best || score < best.score) best = { value, score };
  }
  return best && best.score <= Math.max(2, Math.floor(input.length / 3)) ? best.value : null;
}

function notFound(raw: string, pool: string[] = COMPLETIONS): CommandResult {
  const input = normalise(raw).toLowerCase();
  const name = input.split(" ").pop() ?? input;
  const suggestion = closest(input.replace(/^\//, ""), pool);
  const lines: OutputLine[] = [{ kind: "error", text: terminalCopy.notFound(name) }];
  if (suggestion) lines.push({ kind: "suggest", command: suggestion });
  return { lines };
}

function downloadFile(href: string, file: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = file;
  document.body.append(link);
  link.click();
  link.remove();
}

export function CommandProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const terminal = useRef<TerminalApi | null>(null);
  const focusOnMount = useRef(false);
  const [terminalUsed, setTerminalUsed] = useState(false);

  // Latest route and theme for `run`, which stays referentially stable.
  const live = useRef({ pathname, resolvedTheme });
  useEffect(() => {
    live.current = { pathname, resolvedTheme };
  }, [pathname, resolvedTheme]);

  const noteTerminalUse = useCallback(() => {
    setTerminalUsed(true);
    try {
      window.localStorage.setItem(HINT_STORAGE_KEY, "1");
    } catch {
      // Storage can be unavailable (private mode); the hint simply shows again.
    }
  }, []);

  const goToSection = useCallback(
    (id: string) => {
      if (live.current.pathname === "/") {
        scrollToId(id);
      } else {
        router.push(`/#${id}`);
        // The Home sections do not exist yet; replay the jump once they do.
        window.setTimeout(() => requestAnchor(id), 0);
      }
    },
    [router],
  );

  const run = useCallback(
    (raw: string): CommandResult => {
      const input = normalise(raw);
      if (!input) return { lines: [] };
      const match = resolve(input);
      if (!match) return notFound(input);
      const { spec, arg } = match;

      switch (spec.id) {
        case "projects": {
          const flag = arg.match(/^--type[= ]\s*(\S+)$/);
          if (!arg) {
            router.push("/projects");
            return { lines: [{ kind: "ok", text: terminalCopy.opening("~/projects") }] };
          }
          const type = flag?.[1] as ProjectType | undefined;
          if (!type || !PROJECT_TYPES.includes(type)) {
            return { lines: [{ kind: "error", text: terminalCopy.unknownType(flag?.[1] ?? arg) }] };
          }
          const slugs = projects.filter((project) => project.type === type).map((project) => project.slug);
          return { lines: [{ kind: "projects", slugs }] };
        }
        case "open": {
          if (!arg) return { lines: [{ kind: "info", text: terminalCopy.missingProject }] };
          const project = findProject(arg);
          if (!project) {
            return notFound(`open ${arg}`, projects.map((item) => `open ${item.alias}`));
          }
          router.push(`/projects/${project.slug}`);
          return { lines: [{ kind: "ok", text: terminalCopy.opening(`~/projects/${project.slug}`) }] };
        }
        case "cv": {
          if (!cvReady) {
            goToSection("cv");
            return { lines: [{ kind: "error", text: terminalCopy.noFile(site.cv.file) }] };
          }
          downloadFile(site.cv.href, site.cv.file);
          return { lines: [{ kind: "ok", text: terminalCopy.cvSaved }] };
        }
        case "experience":
          goToSection("experience");
          return { lines: [{ kind: "ok", text: terminalCopy.opening("~/experience") }] };
        case "git-log":
          goToSection("experience");
          return {
            lines: [{ kind: "log", rows: experience.map((item) => ({ hash: item.hash, message: item.commit })) }],
          };
        case "contact":
          goToSection("contact");
          return { lines: [{ kind: "ok", text: terminalCopy.opening("~/contact") }] };
        case "home":
          if (live.current.pathname === "/") scrollToTop();
          else router.push("/");
          return { lines: [{ kind: "ok", text: terminalCopy.opening("~/home") }] };
        case "theme": {
          const next = live.current.resolvedTheme === "light" ? "dark" : "light";
          setTheme(next);
          return { lines: [{ kind: "ok", text: terminalCopy.themeSwitched(next) }] };
        }
        case "help":
          return {
            lines: [
              { kind: "pairs", rows: [...terminalCopy.help, ...gitCommands] },
              { kind: "keys", rows: shortcuts },
            ],
          };
        case "git-branch":
          return { lines: [{ kind: "branches", rows: branches }] };
        case "skills": {
          const stack = Object.fromEntries(
            skillGroups.map((group) => [group.title.toLowerCase().replace(/ and | /g, "_"), group.tools]),
          );
          return { lines: [{ kind: "json", text: JSON.stringify(stack, null, 2) }] };
        }
        case "clear":
          return { lines: [], clear: true };
      }
    },
    [router, setTheme, goToSection],
  );

  const focusTerminal = useCallback(() => {
    noteTerminalUse();
    if (live.current.pathname === "/") {
      scrollToId("terminal");
      terminal.current?.focus();
    } else {
      focusOnMount.current = true;
      router.push("/#terminal");
    }
  }, [router, noteTerminalUse]);

  const registerTerminal = useCallback((api: TerminalApi) => {
    terminal.current = api;
    if (focusOnMount.current) {
      focusOnMount.current = false;
      requestAnchor("terminal");
      api.focus();
    }
    return () => {
      if (terminal.current === api) terminal.current = null;
    };
  }, []);

  const runInTerminal = useCallback(
    (command: string) => {
      noteTerminalUse();
      if (terminal.current) terminal.current.submit(command);
      else run(command);
    },
    [run, noteTerminalUse],
  );

  const value = useMemo(
    () => ({ run, runInTerminal, focusTerminal, registerTerminal, terminalUsed, noteTerminalUse }),
    [run, runInTerminal, focusTerminal, registerTerminal, terminalUsed, noteTerminalUse],
  );

  return <CommandsContext.Provider value={value}>{children}</CommandsContext.Provider>;
}

export function useCommands(): CommandsContextValue {
  const context = useContext(CommandsContext);
  if (!context) throw new Error("useCommands must be used inside <CommandProvider>");
  return context;
}
