import type { Tone } from "./types";

// Personal details are placeholders until confirmed. TODO: real data
export const site = {
  name: "Samyak",
  brand: { user: "samyak", host: "dev" },
  role: "Junior Full-Stack Developer",
  jobTitle: "Full-Stack Developer",
  location: "Kathmandu, Nepal",
  city: "Kathmandu",
  country: "Nepal",
  url: "https://yourdomain.com",
  cv: { href: "/cv/samyak-cv.pdf", file: "samyak-cv.pdf", size: "180 KB", updated: "Updated October 2026 · 180 KB" },
};

export interface NavItem {
  /** Branch-style label in the header. */
  branch: string;
  /** Plain title used in the mobile menu and footer. */
  title: string;
  href: string;
  /** Home section this tab tracks, if any. */
  section?: string;
}

export const nav: NavItem[] = [
  { branch: "main", title: "Home", href: "/#main", section: "main" },
  { branch: "experience", title: "Experience", href: "/#experience", section: "experience" },
  { branch: "feature/projects", title: "Projects", href: "/projects" },
  { branch: "contact", title: "Contact", href: "/#contact", section: "contact" },
];

export const header = {
  command: "Run a command",
  /** Shortcut shown beside it; ⌘ on Apple keyboards. */
  commandKeys: { apple: "⌘ K", other: "Ctrl K" },
  cv: "Download CV",
  themeToLight: "Switch to light theme",
  themeToDark: "Switch to dark theme",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  openTerminal: "Open the terminal",
};

/** Screen-reader labels (doc/seo-accessibility.md). */
export const a11y = {
  home: (brand: string) => `${brand}, home`,
  sections: "Sections",
  menu: "Menu",
  breadcrumb: "Breadcrumb",
  introduction: "Introduction",
  backToTop: "Back to top",
  terminalOutput: "Terminal output",
  commands: "Commands",
  runCommand: (command: string) => `Run ${command}`,
  openProject: (title: string) => `Open ${title} project`,
  carousel: "carousel",
  slide: "slide",
  slideOf: (index: number, total: number) => `${index} of ${total}`,
  carouselDots: (index: number, total: number) => `Project ${index} of ${total}. Show the next one`,
};

/** Label on the custom cursor while it is over a project card. */
export const cursor = { open: "Open" };

export const mobileMenu = {
  theme: "Theme",
  dark: "Dark",
  light: "Light",
  tip: "Tip: the terminal on Home works here too. Type",
  tipKey: "/",
};

export const hero = {
  file: "README.md",
  fileMeta: "main · HEAD · updated 2 days ago",
  fileMetaMobile: "main · HEAD",
  badge: "Open to junior roles and freelance work",
  title: "Samyak builds fast web apps and dependable backends.",
  intro:
    "I design and build web applications end to end, from the interface people use to the API, database and server underneath. Most of my work is in TypeScript, NestJS and PostgreSQL.",
  introMobile:
    "I design and build web applications end to end, from the interface to the API, database and server underneath.",
  primary: { label: "Download CV", href: "/#cv" },
  secondary: { label: "View projects", href: "/#projects" },
  cue: "Scroll to open the terminal",
};

export const historyTerminal = {
  title: "~/samyak — zsh",
  historyCommand: "history | tail -6",
  history: [
    "git init portfolio",
    "npx create-next-app samyak-dev",
    "nest new api",
    "docker compose up -d",
    "rclone sync ./backups r2:site-backups",
    "git push origin main",
  ],
  logCommand: "git log --oneline -3",
  log: [
    { hash: "a3f9c21", message: "feat: role-based dispatch board" },
    { hash: "7be04d2", message: "chore: nightly backups to R2" },
    { hash: "19c5e80", message: "release: first client site live" },
  ],
  mobile: {
    historyCommand: "history | tail -4",
    /** Lines 3–6, numbered from 3. */
    historyStart: 3,
    history: [
      "nest new api",
      "docker compose up -d",
      "rclone sync ./backups r2:",
      "git push origin main",
    ],
    logCommand: "git log --oneline -2",
    log: [
      { hash: "a3f9c21", message: "feat: dispatch board" },
      { hash: "7be04d2", message: "chore: backups to R2" },
    ],
  },
};

export const stackSlider = { label: "Tools I work with" };

export const terminalSection = {
  id: "terminal",
  title: "Use the terminal",
  branch: "shell",
  tone: "green" satisfies Tone as Tone,
  hintsLabel: "New here? Try",
  cue: "Keep scrolling for skills, work and projects",
};

export const activityGraph = {
  id: "work",
  label: "Recent work",
  caption:
    "Six projects in the order I built them, oldest on the left. Hover a dot to see its command, click to open it.",
  captionMobile: "Recent work as a commit graph, newest first. Tap a project to open it.",
  head: "HEAD",
  headMobile: "HEAD · main",
  tooltipHint: "↵ or click to open",
};

export const projectsSection = {
  id: "projects",
  title: "Selected projects",
  branch: "feature/projects",
  tone: "blue" satisfies Tone as Tone,
  intro: "Six recent builds. Open one to see screenshots, the architecture and what I learned.",
  introMobile: "Six recent builds. Tap one to open it.",
  viewAll: "View all 12 projects",
  openRoom: "Open room",
};

export const projectsPage = {
  breadcrumb: ["home", "projects"],
  title: "All projects",
  intro: "Twelve builds across web apps, APIs, DevOps and interface design. Filter by type or search by tool.",
  introMobile: "Twelve builds across web apps, APIs, DevOps and interface design.",
  searchPlaceholder: "filter by name or tool, e.g. nestjs",
  searchPlaceholderMobile: "filter, e.g. nestjs",
  searchLabel: "Filter projects",
  filtersLabel: "Project type",
  sort: "Sort: newest first",
  // Not in Figma: shown when the search and type filter match nothing.
  empty: (query: string) => (query ? `no projects match ${query}` : "no projects of this type yet"),
  clear: "Clear filters",
};

// Project room template (Figma: Project / Helicopter booking).
export const room = {
  breadcrumb: "projects",
  previous: "← Previous",
  next: "Next →",
  close: "Close",
  closeKey: "(Esc)",
  demo: "View live demo",
  github: "Read the code on GitHub",
  stack: "Stack",
  // Fact labels for projects without their own room content yet. Not in Figma.
  year: "Year",
  type: "Type",
  /** Visually hidden heading above the three story columns (keeps the outline H1 → H2 → H3). */
  story: "Story",
  screens: "Screens",
  flow: "How a request moves",
  outcome: "Outcome",
  nextProject: "Next project",
  openNext: "Open room →",
};

export const cvBand = {
  id: "cv",
  title: "Get my CV",
  text: "A two-page PDF with my experience, projects, skills and education. You can also type download cv in the terminal.",
  textMobile: "A two-page PDF with my experience, projects, skills and education.",
  primary: "Download PDF",
  secondary: "View it online",
  terminal: [
    { prompt: "$", text: "download cv --format pdf", tone: "command" },
    { prompt: "→", text: "preparing samyak-cv.pdf", tone: "info" },
    { prompt: "✓", text: "saved · 2 pages · 180 KB", tone: "success" },
  ] as const,
  terminalMobile: [
    { prompt: "$", text: "download cv", tone: "command" },
    { prompt: "✓", text: "samyak-cv.pdf · 180 KB", tone: "success" },
  ] as const,
};

export const footer = {
  description:
    "Full-stack developer in Kathmandu, Nepal. Building web apps, APIs and the servers they run on.",
  descriptionMobile: "Full-stack developer in Kathmandu, Nepal.",
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Experience", href: "/#experience" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Projects",
      /** Hidden on mobile, which shows two columns. */
      desktopOnly: true,
      links: [
        { label: "Helicopter booking", href: "/projects/heli-booking" },
        { label: "Mountain Helicopters Nepal", href: "/projects/mhn-platform" },
        { label: "Nepali voice inventory", href: "/projects/nepali-voice" },
        { label: "All projects", href: "/projects" },
      ],
    },
    {
      title: "Elsewhere",
      links: [
        { label: "GitHub", href: "#" }, // TODO: real data
        { label: "LinkedIn", href: "#" }, // TODO: real data
        { label: "Email", href: "mailto:hello@yourdomain.com" }, // TODO: real data
        { label: "Download CV", href: "/#cv" },
      ],
    },
  ],
  copyright: "© 2026 Samyak. Designed and built by me.",
  backToTop: "Back to top ↑",
};

export const seo = {
  home: {
    title: "Samyak | Full-Stack Developer in Kathmandu, Nepal",
    description:
      "Full-stack developer building fast web apps and dependable backends with TypeScript, NestJS and PostgreSQL. View projects or download my CV.",
  },
  projects: {
    title: "Projects by Samyak | Web Apps, APIs and DevOps",
    description:
      "Twelve builds across web apps, APIs, DevOps and interface design, with screenshots and the stack behind each one.",
  },
  rooms: {
    "heli-booking": {
      title: "Helicopter Booking System | Samyak",
      description:
        "A private booking and dispatch system for a helicopter operator, built with React, NestJS and PostgreSQL.",
    },
  } as Record<string, { title: string; description: string }>,
  ogImage: "/og/og-default.png",
  ogImageAlt: "README.md card: Samyak builds fast web apps and dependable backends.",
  /** Names used in breadcrumb structured data. */
  breadcrumbs: { home: "Home", projects: "Projects" },
};
