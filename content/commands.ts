import { site } from "./site";
import type { ProjectType } from "./types";

// One registry shared by the terminal, the hint chips, the keyboard shortcuts
// and the header "Run a command" button (doc/interactions.md §1.1).
export type CommandId =
  | "projects"
  | "open"
  | "cv"
  | "experience"
  | "contact"
  | "home"
  | "theme"
  | "help"
  | "git-log"
  | "git-branch"
  | "skills"
  | "clear"
  | "cd"
  | "goto"
  | "ls"
  | "cat"
  | "pwd"
  | "whoami"
  | "echo"
  | "date"
  | "history";

export interface CommandSpec {
  id: CommandId;
  /** Canonical spelling, shown in help and used for completion. */
  name: string;
  /** Other spellings that run the same command. */
  aliases: string[];
  /** Takes an argument after the name (a project, a file, or flags). */
  takesArgument?: boolean;
}

export const commands: CommandSpec[] = [
  { id: "projects", name: "/projects", aliases: ["goto projects", "git checkout projects", "cd projects"], takesArgument: true },
  { id: "open", name: "/open", aliases: ["open"], takesArgument: true },
  { id: "cv", name: "/cv", aliases: ["download cv"], takesArgument: true },
  { id: "experience", name: "/experience", aliases: ["goto experience"] },
  { id: "git-log", name: "git log", aliases: [], takesArgument: true },
  { id: "contact", name: "/contact", aliases: ["goto contact"] },
  { id: "home", name: "goto home", aliases: ["cd ~", "/home", "/main"] },
  { id: "theme", name: "/theme", aliases: ["switch-theme"] },
  { id: "help", name: "/help", aliases: ["help", "?"] },
  { id: "git-branch", name: "git branch", aliases: [], takesArgument: true },
  { id: "skills", name: "cat skills.json", aliases: [] },
  { id: "clear", name: "clear", aliases: [] },
  // Plain shell commands, for visitors who type what they would in any terminal.
  // The longer spellings above ("cd projects", "goto home") still win.
  { id: "cd", name: "cd", aliases: [], takesArgument: true },
  { id: "goto", name: "goto", aliases: ["git checkout", "git switch"], takesArgument: true },
  { id: "ls", name: "ls", aliases: [], takesArgument: true },
  { id: "cat", name: "cat", aliases: [], takesArgument: true },
  { id: "pwd", name: "pwd", aliases: [] },
  { id: "whoami", name: "whoami", aliases: [] },
  { id: "echo", name: "echo", aliases: [], takesArgument: true },
  { id: "date", name: "date", aliases: [] },
  { id: "history", name: "history", aliases: [] },
];

export type FileId = "readme" | "skills" | "experience" | "education" | "services" | "contact" | "cv";

export interface FileSpec {
  /** Also the short name: `cat readme` reads README.md. */
  id: FileId;
  name: string;
  description: string;
}

// What `ls` lists and `cat` reads. Every file prints content the page already shows.
export const files: FileSpec[] = [
  { id: "readme", name: "README.md", description: "who I am" },
  { id: "skills", name: "skills.json", description: "my stack as JSON" },
  { id: "experience", name: "experience.log", description: "where I have worked" },
  { id: "education", name: "education.md", description: "where I studied" },
  { id: "services", name: "services.md", description: "how I can help" },
  { id: "contact", name: "contact.txt", description: "email, phone and website" },
  { id: "cv", name: site.cv.file, description: "my CV, try download cv" },
];

/** The one folder: a file per project. */
export const projectsFolder = {
  name: "projects",
  description: (count: number) => `${count} projects, one file each`,
};

export interface SlashItem {
  /** Text shown in the menu and typed into the input. */
  command: string;
  /** What running the row does when no argument was typed. */
  run: string;
  description: string;
  /** Label and description on the mobile terminal, where rows are tapped. */
  commandMobile?: string;
  descriptionMobile?: string;
  /** Not listed on the mobile terminal. */
  desktopOnly?: boolean;
  /** Crawlable link behind the row: typing is optional. */
  href?: string;
}

// Slash menu, in Figma order. Mobile lists six of these with shorter copy.
export const slashMenu: SlashItem[] = [
  {
    command: "/projects",
    run: "/projects",
    description: "Browse all 12 projects, filter with --type",
    descriptionMobile: "All 12 projects",
    href: "/projects",
  },
  {
    command: "/open <name>",
    commandMobile: "/open heli",
    run: "/open heli",
    description: "Open a project room, e.g. /open heli",
    descriptionMobile: "Helicopter booking",
    href: "/projects/heli-booking",
  },
  { command: "/cv", run: "/cv", description: "Download my CV as a PDF", descriptionMobile: "Download my CV", href: "/#cv" },
  {
    command: "/experience",
    run: "/experience",
    description: "Show my work history (same as git log)",
    descriptionMobile: "Work history",
    href: "/#experience",
  },
  { command: "/contact", run: "/contact", description: "Write me a message", href: "/#contact" },
  { command: "/theme", run: "/theme", description: "Switch light or dark", desktopOnly: true },
  { command: "/help", run: "/help", description: "Every command and shortcut", descriptionMobile: "Every command" },
];

export const hints: string[] = [
  "goto projects",
  "download cv",
  "open heli",
  "goto contact",
  "switch-theme",
  "help",
];

export const projectTypeFlags: Record<ProjectType, string> = {
  web: "web",
  backend: "backend",
  devops: "devops",
  ai: "ai",
  ui: "ui",
};

export interface ShortcutSpec {
  /** Keys pressed in sequence, e.g. ["g", "p"]. */
  keys: string[];
  label: string;
  /** Command this shortcut runs. */
  run: string;
  /** Prints output, so it runs in the terminal where the result can be read. */
  inTerminal?: boolean;
}

// Keyboard shortcuts card (and the global key handler).
export const shortcuts: ShortcutSpec[] = [
  { keys: ["/"], label: "Focus the terminal", run: "focus" },
  { keys: ["g", "h"], label: "Go home", run: "goto home" },
  { keys: ["g", "p"], label: "Go to projects", run: "goto projects" },
  { keys: ["g", "e"], label: "Go to experience", run: "goto experience" },
  { keys: ["g", "c"], label: "Go to contact", run: "goto contact" },
  { keys: ["d"], label: "Download CV", run: "download cv" },
  { keys: ["t"], label: "Switch theme", run: "switch-theme" },
  { keys: ["?"], label: "Show all shortcuts", run: "help", inTerminal: true },
];

export const gitCommands: { command: string; description: string }[] = [
  { command: "git log", description: "work history" },
  { command: "git branch", description: "list every section" },
  { command: "git checkout projects", description: "go to projects" },
  { command: "cat skills.json", description: "my stack as JSON" },
];

// Sections printed by `git branch`.
export const branches: { name: string; current?: boolean }[] = [
  { name: "main", current: true },
  { name: "shell" },
  { name: "skills" },
  { name: "experience" },
  { name: "feature/projects" },
  { name: "education" },
  { name: "services" },
  { name: "contact" },
];

// All terminal copy lives here so components stay free of strings.
export const terminalCopy = {
  title: "samyak.sh — interactive — 96×28",
  titleMobile: "samyak.sh",
  welcome: "Welcome to samyak.sh",
  welcomeHint: "Type / for commands · ↑ for history · Tab to complete · ? for shortcuts",
  welcomeHintMobile: "Type / for commands, or tap one below.",
  cwd: "cwd: ~/home",
  inputLabel: "Type a command",
  statusLeft: "? for shortcuts",
  statusRight: "↑↓ history · Tab complete · Esc clear",
  statusMobile: "Tap a command, or type and press Go",
  go: "Go",
  completeHint: "Tab to complete · ↵ to run",
  shortcutsTitle: "Keyboard shortcuts",
  shortcutsText: "Work anywhere on the page, not just in the terminal.",
  shortcutsThen: "then",
  gitTitle: "Git commands work too",
  opening: (path: string) => `opening ${path} …`,
  notFound: (name: string) => `no page called ${name}`,
  didYouMean: "did you mean",
  cvSaved: "samyak-cv.pdf · 180 KB",
  themeSwitched: (theme: string) => `theme set to ${theme}`,
  noProjects: (type: string) => `no projects of type ${type}`,
  unknownType: (type: string) => `unknown type ${type}, try web, backend, devops, ai or ui`,
  missingProject: "which project? try open heli",
  // Help output, as drawn on the "Terminal and hint states" board.
  help: [
    { command: "goto <page>", description: "home, projects, contact" },
    { command: "open <project>", description: "heli, mhn, voice" },
    { command: "download cv" },
    { command: "switch-theme" },
  ] as { command: string; description?: string }[],
  // More help rows: the shell commands.
  shell: [
    { command: "ls [folder]", description: "what is here, -l for details" },
    { command: "cat <file>", description: "read a file, e.g. cat README.md" },
    { command: "cd <page>", description: "same as goto" },
    { command: "history", description: "what has been typed" },
    { command: "whoami, pwd, date, echo" },
    { command: "… | head, tail, grep, wc -l", description: "trim what a command prints" },
  ] as { command: string; description?: string }[],
  idleHint: "type help, or try goto projects",
  noFile: (name: string) => `no file called ${name}`,
  commandNotFound: (name: string) => `command not found: ${name}`,
  isFolder: (name: string) => `${name} is a folder, try ls ${name}`,
  isPdf: (name: string) => `${name} is a PDF, try download cv`,
  missingFile: "which file? try cat README.md",
  missingPlace: "where to? try goto projects",
  openRoom: "see the project room",
  hintToast: {
    text: "Tip: this site has a terminal. Type",
    command: "help",
    or: "or press",
    dismiss: "Got it",
  },
};
