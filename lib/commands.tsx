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
  files,
  gitCommands,
  projectsFolder,
  shortcuts,
  terminalCopy,
  type CommandSpec,
  type FileSpec,
  type ShortcutSpec,
} from "@/content/commands";
import { contactCard, socials } from "@/content/contact";
import { education } from "@/content/education";
import { experience, type TimelineEntry } from "@/content/experience";
import { findProject, projects } from "@/content/projects";
import { services } from "@/content/services";
import { hero, historyTerminal, site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import type { Project, ProjectType } from "@/content/types";
import { cvReady } from "./cv";
import { requestAnchor, scrollToId, scrollToTop } from "./scroll";
import { readHistory } from "./shellHistory";

export type OutputLine =
  | { kind: "ok" | "error" | "info"; text: string }
  | { kind: "suggest"; command: string }
  | { kind: "pairs"; rows: { command: string; description?: string }[] }
  | { kind: "keys"; rows: ShortcutSpec[] }
  | { kind: "projects"; slugs: string[] }
  | { kind: "log"; rows: { hash: string; message: string }[] }
  | { kind: "branches"; rows: { name: string; current?: boolean }[] }
  | { kind: "json" | "text"; text: string }
  | { kind: "numbered"; rows: { n: number; text: string }[] }
  /** Rows that run a command when clicked: `ls` prints its files this way. */
  | { kind: "run"; inline?: boolean; rows: { label: string; run: string; description?: string; folder?: boolean }[] }
  | { kind: "fields"; rows: { label: string; value: string; href?: string }[] };

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

const PROJECT_TYPES: ProjectType[] = ["web", "backend", "devops", "ai", "mobile", "ui"];
const PAGES = ["home", "projects", "experience", "contact"];
// Home sections that `cd`, `goto` and `git checkout` scroll to, by id.
const SECTIONS = ["skills", "experience", "education", "services", "contact", "cv", "terminal"];
// Other names for a place: shell spellings and the branches `git branch` prints.
const PLACE_ALIASES: Record<string, string> = {
  "": "home",
  "~": "home",
  "..": "home",
  main: "home",
  shell: "terminal",
  "feature/projects": "projects",
};
// "main" is the navbar's name for Home, so both spellings are offered.
const PLACES = ["projects", "home", "main", ...SECTIONS];
// What `git checkout` and `git switch` complete to: the branches `git branch` prints.
const BRANCHES = branches.map((branch) => branch.name);

// Longest names first so "git checkout projects" wins over shorter prefixes.
const LOOKUP = commands
  .flatMap((spec) => [spec.name, ...spec.aliases].map((name) => ({ name: name.toLowerCase(), spec })))
  .sort((a, b) => b.name.length - a.name.length);

// The CV is only a file once the PDF is in public/ (see lib/cv.ts).
const FILES = files.filter((file) => file.id !== "cv" || cvReady);

// First words that are commands: a slip after one is a wrong page, not a wrong command.
const VERBS = new Set(LOOKUP.map(({ name }) => name.replace(/^\//, "").split(" ")[0]));

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
  // Shell spellings come last, so the suggestions above stay as they were.
  ...PLACES.flatMap((place) => [`cd ${place}`, `goto ${place}`]),
  ...BRANCHES.flatMap((branch) => [`git checkout ${branch}`, `git switch ${branch}`]),
  `ls ${projectsFolder.name}`,
  "ls -l",
  ...FILES.map((file) => `cat ${file.name.toLowerCase()}`),
  ...projects.map((project) => `cat ${projectsFolder.name}/${project.alias}.md`),
  "git log --oneline",
];

function normalise(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

function resolve(raw: string): { spec: CommandSpec; name: string; arg: string } | null {
  const lower = normalise(raw).toLowerCase();
  // A leading slash is optional either way: "/help" = "help", "/goto home" = "goto home".
  const forms = [lower, lower.startsWith("/") ? lower.slice(1) : `/${lower}`];
  for (const form of forms) {
    for (const { name, spec } of LOOKUP) {
      if (form === name) return { spec, name, arg: "" };
      if (spec.takesArgument && form.startsWith(`${name} `)) {
        return { spec, name, arg: form.slice(name.length + 1) };
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
    // Two-letter commands are within two edits of anything short; a suggestion
    // has to share something with what was typed.
    if (score >= Math.max(input.length, value.length)) continue;
    if (!best || score < best.score) best = { value, score };
  }
  return best && best.score <= Math.max(2, Math.floor(input.length / 3)) ? best.value : null;
}

function notFound(raw: string, pool: string[] = COMPLETIONS): CommandResult {
  const input = normalise(raw).toLowerCase();
  const verb = input.replace(/^\//, "").split(" ")[0] ?? input;
  const text = VERBS.has(verb)
    ? terminalCopy.notFound(input.split(" ").pop() ?? input)
    : terminalCopy.commandNotFound(verb);
  const suggestion = closest(input.replace(/^\//, ""), pool);
  const lines: OutputLine[] = [{ kind: "error", text }];
  if (suggestion) lines.push({ kind: "suggest", command: suggestion });
  return { lines };
}

const opening = (path: string): CommandResult => ({ lines: [{ kind: "ok", text: terminalCopy.opening(path) }] });

/** "~/projects/" and "./projects" are the same place as "projects". */
function trimPath(path: string): string {
  return path.replace(/^(~\/|\.\/|\/)/, "").replace(/\/$/, "");
}

/** A project named the way `ls projects` lists it, or by its alias or slug. */
function projectFile(path: string): Project | undefined {
  return findProject(path.replace(`${projectsFolder.name}/`, "").replace(/\.md$/, ""));
}

function skillsJson(): string {
  const stack = Object.fromEntries(
    skillGroups.map((group) => [group.title.toLowerCase().replace(/ and | /g, "_"), group.tools]),
  );
  return JSON.stringify(stack, null, 2);
}

const timeline = (entries: TimelineEntry[]): string =>
  entries.map((entry) => `${entry.title} · ${entry.dates}\n${entry.place}\n${entry.summary}`).join("\n\n");

/** What `cat` prints for each file `ls` lists. */
function readFile(file: FileSpec): OutputLine[] {
  switch (file.id) {
    case "readme":
      return [{ kind: "text", text: `# ${hero.title}\n${site.role} · ${site.location}\n\n${hero.intro}` }];
    case "skills":
      return [{ kind: "json", text: skillsJson() }];
    case "experience":
      return [{ kind: "text", text: timeline(experience) }];
    case "education":
      return [{ kind: "text", text: timeline(education) }];
    case "services":
      return [{ kind: "text", text: services.map((service) => `${service.title}\n${service.text}`).join("\n\n") }];
    case "contact":
      return [
        {
          kind: "fields",
          rows: [
            ...contactCard.details.map(({ label, value, href }) => ({ label, value, href })),
            // Profiles without a real address yet are left out.
            ...socials
              .filter((social) => /^https?:/.test(social.href))
              .map((social) => ({ label: social.name, value: social.href.replace(/^https?:\/\//, ""), href: social.href })),
          ],
        },
      ];
    case "cv":
      return [{ kind: "info", text: terminalCopy.isPdf(file.name) }];
  }
}

function readProject(project: Project): OutputLine[] {
  const facts = [project.category, project.year, project.stack.join(", ")].join(" · ");
  return [
    { kind: "text", text: `# ${project.title}\n${facts}\n\n${project.summary}` },
    { kind: "run", rows: [{ label: `open ${project.alias}`, run: `open ${project.alias}`, description: terminalCopy.openRoom }] },
  ];
}

function cat(arg: string): CommandResult {
  if (!arg) return { lines: [{ kind: "info", text: terminalCopy.missingFile }] };
  const lines = arg.split(" ").flatMap((raw): OutputLine[] => {
    const path = trimPath(raw);
    if (path === projectsFolder.name) return [{ kind: "error", text: terminalCopy.isFolder(path) }];
    const file = FILES.find((item) => item.id === path || item.name.toLowerCase() === path);
    if (file) return readFile(file);
    const project = projectFile(path);
    return project ? readProject(project) : [{ kind: "error", text: terminalCopy.noFile(raw) }];
  });
  return { lines };
}

function ls(arg: string): CommandResult {
  const words = arg.split(" ").filter(Boolean);
  const long = words.some((word) => /^-[a-z]*l/.test(word));
  const target = words.find((word) => !word.startsWith("-")) ?? "";
  const path = trimPath(target);
  const inline = !long;

  if (path === projectsFolder.name) {
    const rows = projects.map((project) => ({
      label: `${project.alias}.md`,
      run: `cat ${projectsFolder.name}/${project.alias}.md`,
      description: long ? project.title : undefined,
    }));
    return { lines: [{ kind: "run", inline, rows }] };
  }

  const listed = FILES.map((file) => ({
    label: file.name,
    run: file.id === "cv" ? "download cv" : `cat ${file.name}`,
    description: long ? file.description : undefined,
  }));
  if (path === "" || path === "~" || path === "." || path === "home") {
    const folder = {
      label: `${projectsFolder.name}/`,
      run: `ls ${projectsFolder.name}`,
      description: long ? projectsFolder.description(projects.length) : undefined,
      folder: true,
    };
    return { lines: [{ kind: "run", inline, rows: [folder, ...listed] }] };
  }

  // `ls README.md` names the file, as a shell would.
  const row = listed.find((item) => item.label.toLowerCase() === path);
  return { lines: [row ? { kind: "run", inline, rows: [row] } : { kind: "error", text: terminalCopy.noFile(target) }] };
}

/** Every command so far: the ones on the hero terminal, then this session's. */
function history(): CommandResult {
  const shown = window.matchMedia("(min-width: 768px)").matches ? historyTerminal : historyTerminal.mobile;
  const typed = [...historyTerminal.history, shown.historyCommand, shown.logCommand, ...readHistory()];
  return { lines: [{ kind: "numbered", rows: typed.map((text, index) => ({ n: index + 1, text })) }] };
}

// Row fields that are not printed, so `| grep` leaves them alone.
const UNPRINTED = new Set(["run", "href"]);

/** One printed row per entry, with the text `| grep` matches against. */
function printedRows(line: OutputLine): { line: OutputLine; text: string }[] {
  if ("rows" in line) {
    return line.rows.map((row) => ({
      line: { ...line, rows: [row] } as OutputLine,
      text: Object.entries(row)
        .filter(([key, value]) => !UNPRINTED.has(key) && typeof value !== "boolean")
        .flatMap(([, value]) => value)
        .join(" "),
    }));
  }
  if (line.kind === "projects") return line.slugs.map((slug) => ({ line: { kind: "projects", slugs: [slug] }, text: slug }));
  if (line.kind === "suggest") return [{ line, text: line.command }];
  return line.text.split("\n").map((text) => ({ line: { ...line, text }, text }));
}

/** `| head`, `| tail`, `| grep` and `| wc -l`, applied to what the command before printed. */
function pipe(result: CommandResult, filter: string): CommandResult {
  const [name = "", ...args] = filter.split(" ");
  const rows = result.lines.flatMap(printedRows);
  const count = Number(args.join(" ").match(/\d+/)?.[0] ?? 10);
  switch (name.toLowerCase()) {
    case "head":
      return { lines: rows.slice(0, count).map((row) => row.line) };
    case "tail":
      return { lines: rows.slice(Math.max(rows.length - count, 0)).map((row) => row.line) };
    case "grep": {
      const term = args
        .filter((word) => !word.startsWith("-"))
        .join(" ")
        .replace(/^["']|["']$/g, "")
        .toLowerCase();
      return { lines: rows.filter((row) => row.text.toLowerCase().includes(term)).map((row) => row.line) };
    }
    case "wc":
      return { lines: [{ kind: "text", text: String(rows.length) }] };
    default:
      return notFound(filter);
  }
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

  const goHome = useCallback((): CommandResult => {
    if (live.current.pathname === "/") scrollToTop();
    else router.push("/");
    return opening("~/home");
  }, [router]);

  /** `cd`, `goto` and `git checkout` with any page, section, branch or project. */
  const goTo = useCallback(
    (verb: string, arg: string): CommandResult => {
      const path = trimPath(arg);
      const place = PLACE_ALIASES[path] ?? path;
      if (place === "home") return goHome();
      if (place === "projects") {
        router.push("/projects");
        return opening("~/projects");
      }
      if (SECTIONS.includes(place)) {
        goToSection(place);
        return opening(`~/${place}`);
      }
      const project = projectFile(place);
      if (project) {
        router.push(`/projects/${project.slug}`);
        return opening(`~/projects/${project.slug}`);
      }
      return notFound(`${verb} ${arg}`, PLACES.map((item) => `${verb} ${item}`));
    },
    [router, goHome, goToSection],
  );

  const execute = useCallback(
    (input: string): CommandResult => {
      const match = resolve(input);
      if (!match) return notFound(input);
      const { spec, name, arg } = match;

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
        case "git-log": {
          // Bare `git log` also shows the section. With flags (--oneline -3) it
          // is being read in the terminal, so the page stays where it is.
          if (!arg) goToSection("experience");
          const limit = Number(arg.match(/(?:^| )-(?:n ?)?(\d+)/)?.[1] ?? experience.length);
          const rows = experience.slice(0, limit).map((item) => ({ hash: item.hash, message: item.commit }));
          return { lines: [{ kind: "log", rows }] };
        }
        case "contact":
          goToSection("contact");
          return { lines: [{ kind: "ok", text: terminalCopy.opening("~/contact") }] };
        case "home":
          return goHome();
        case "cd":
          return goTo(name, arg);
        case "goto":
          return arg ? goTo(name, arg) : { lines: [{ kind: "info", text: terminalCopy.missingPlace }] };
        case "theme": {
          const next = live.current.resolvedTheme === "light" ? "dark" : "light";
          setTheme(next);
          return { lines: [{ kind: "ok", text: terminalCopy.themeSwitched(next) }] };
        }
        case "help":
          return {
            lines: [
              { kind: "pairs", rows: [...terminalCopy.help, ...terminalCopy.shell, ...gitCommands] },
              { kind: "keys", rows: shortcuts },
            ],
          };
        case "git-branch":
          return { lines: [{ kind: "branches", rows: branches }] };
        case "skills":
          return { lines: [{ kind: "json", text: skillsJson() }] };
        case "clear":
          return { lines: [], clear: true };
        case "ls":
          return ls(arg);
        case "cat":
          return cat(arg);
        case "pwd": {
          const { pathname } = live.current;
          return { lines: [{ kind: "text", text: `/home/${site.brand.user}${pathname === "/" ? "/home" : pathname}` }] };
        }
        case "whoami":
          return {
            lines: [
              { kind: "text", text: site.brand.user },
              { kind: "info", text: `${site.role} · ${site.location}` },
            ],
          };
        case "echo":
          // The argument as it was typed: matching a command lower-cases it.
          return { lines: [{ kind: "text", text: arg ? input.slice(-arg.length) : "" }] };
        case "date":
          return { lines: [{ kind: "text", text: new Date().toString() }] };
        case "history":
          return history();
      }
    },
    [router, setTheme, goToSection, goHome, goTo],
  );

  const run = useCallback(
    (raw: string): CommandResult => {
      const [first = "", ...filters] = normalise(raw).split(/\s*\|\s*/);
      if (!first) return { lines: [] };
      return filters.reduce(pipe, execute(first));
    },
    [execute],
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
