import type { Project, ProjectType } from "./types";

// Order = order on /projects (newest first). Copy is from doc/content.md.
// All covers and screenshots are dummy JPGs. TODO: real data
export const projects: Project[] = [
  {
    slug: "heli-booking",
    alias: "heli",
    title: "Helicopter booking and operations system",
    summary:
      "Bookings, flight planning and dispatch in one place, with separate views for admins, dispatchers and clients.",
    summaryMobile:
      "Bookings, flight planning and dispatch in one place, with separate views for each role.",
    category: "Web app",
    type: "web",
    year: 2026,
    tone: "blue",
    branch: "feature/heli-booking",
    color: "var(--p-heli)",
    stack: ["React", "NestJS", "PostgreSQL"],
    cover: "/images/projects/cover-heli.jpg",
    coverAlt: "Operations dashboard with bookings, readiness and a dispatch queue",
    command: "/open heli",
    featured: true,
    graphLabel: "Heli booking",
    links: { demo: "#", github: "#" }, // TODO: real data
    room: {
      lead: "A private system for a helicopter operator. Staff take bookings, plan payload and dispatch flights, and each role only sees what it needs.",
      facts: [
        { label: "Role", value: "Full-stack developer" },
        { label: "Timeline", value: "Jan – Jun 2026" },
        { label: "Team", value: "2 people" },
        { label: "Status", value: "In use, still improving", valueMobile: "In use" },
      ],
      stack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
      story: [
        {
          title: "The problem",
          body: "Bookings lived in spreadsheets and phone calls. Dispatchers re-typed passenger weights, and nobody could see at a glance which flights were ready.",
          bodyMobile:
            "Bookings lived in spreadsheets and phone calls, and nobody could see which flights were ready.",
        },
        {
          title: "What I built",
          body: "One shared system with three roles. Clients request seats, dispatchers plan payload and crew, and admins approve flights and manage users.",
          bodyMobile:
            "One shared system with three roles: clients request seats, dispatchers plan payload and crew, admins approve flights.",
        },
        {
          title: "What I learned",
          body: "Designing permissions first saved a lot of rework. Small things, like warning before a payload goes over the limit, mattered most to the team.",
          bodyMobile:
            "Designing permissions first saved a lot of rework. Small warnings, like payload over the limit, mattered most.",
        },
      ],
      // Order of the mobile swipe gallery; desktop shows the first two.
      screens: [
        {
          src: "/images/rooms/heli-booking/shot-heli-2.jpg",
          alt: "Dispatcher overview in light mode",
          caption: "Dispatcher overview in light mode",
          captionMobile: "Dispatcher overview",
        },
        {
          src: "/images/rooms/heli-booking/shot-heli-3.jpg",
          alt: "Booking flow on a phone",
          caption: "Booking flow on a phone",
          captionMobile: "Booking on a phone",
        },
        {
          src: "/images/projects/cover-heli.jpg",
          alt: "Operations dashboard with bookings, readiness and a dispatch queue",
          caption: "Operations dashboard",
          mobileOnly: true,
        },
      ],
      flow: {
        description:
          "A booking leaves the browser with a signed token, passes a role guard in the API and lands in PostgreSQL.",
        // One caption line per box, as drawn in Figma (doc/content.md lists two).
        nodes: [
          { title: "React frontend", text: "Booking forms, role-aware routes" },
          { title: "NestJS API", text: "JWT guard, role guard, validation" },
          { title: "PostgreSQL", text: "TypeORM entities, migrations" },
        ],
        labels: { request: ["HTTPS + JWT", "SQL"], response: ["JSON", "rows"] },
      },
      // Sample figures for the design. TODO: real data
      outcome: {
        stats: [
          { value: "3", label: "roles with their own views", labelMobile: "roles" },
          { value: "40+", label: "API endpoints with tests", labelMobile: "API endpoints" },
          { value: "< 1 s", label: "typical page load", labelMobile: "page load" },
          { value: "0", label: "paper booking sheets left", labelMobile: "paper sheets" },
        ],
        note: "Sample figures for the design. Replace with real numbers before publishing.",
        noteMobile: "Sample figures. Replace before publishing.",
      },
    },
  },
  {
    slug: "mhn-platform",
    alias: "mhn",
    title: "Mountain Helicopters Nepal website",
    summary: "A fast marketing site that shows which ads bring in real enquiries.",
    category: "Website",
    type: "web",
    year: 2025,
    tone: "violet",
    branch: "feature/mhn-platform",
    color: "var(--p-mhn)",
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    cover: "/images/projects/cover-mhn.jpg",
    coverAlt: "Mountain Helicopters Nepal home page with a Himalaya illustration",
    command: "/open mhn",
    featured: true,
    graphLabel: "MHN website",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "nepali-voice",
    alias: "voice",
    title: "Nepali voice inventory",
    summary: "Say a stock change in Nepali and the database updates itself.",
    category: "AI / voice",
    type: "ai",
    year: 2025,
    tone: "green",
    branch: "feature/nepali-voice",
    color: "var(--p-voice)",
    stack: ["Python", "FastAPI", "PostgreSQL"],
    cover: "/images/projects/cover-voice.jpg",
    coverAlt: "Audio waveform while listening to a Nepali command",
    command: "/open voice",
    featured: true,
    graphLabel: "Voice inventory",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "vps-backup",
    alias: "backup",
    title: "Offsite VPS backups",
    summary: "Nightly database dumps and file uploads copied off the server to Cloudflare R2.",
    category: "DevOps",
    type: "devops",
    year: 2025,
    tone: "cyan",
    branch: "feature/vps-backup",
    color: "var(--p-backup)",
    stack: ["Ubuntu", "Cloudflare", "Docker"],
    cover: "/images/projects/cover-backup.jpg",
    coverAlt: "Server rack sending backups to cloud storage",
    command: "/open backup",
    featured: true,
    graphLabel: "VPS backups",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "travelease-ui",
    alias: "travelease",
    title: "Travelease travel platform",
    summary: "A trip planner with a sidebar layout that adapts from desktop to phone.",
    category: "UI design",
    type: "ui",
    year: 2024,
    tone: "pink",
    branch: "feature/travelease-ui",
    color: "var(--p-travel)",
    stack: ["React", "Tailwind CSS", "Figma"],
    cover: "/images/projects/cover-travel.jpg",
    coverAlt: "Three phone screens of the Travelease trip planner",
    command: "/open travelease",
    featured: true,
    graphLabel: "Travelease",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "scan-review-ui",
    alias: "scan-review",
    title: "Lung scan review interface",
    summary: "A calm screen for reviewing scans and flagged regions. Interface demo only.",
    category: "UI design",
    type: "ui",
    year: 2024,
    tone: "cyan",
    branch: "feature/scan-review-ui",
    color: "var(--p-scan)",
    stack: ["React", "Tailwind CSS", "TypeScript"],
    cover: "/images/projects/cover-lung.jpg",
    coverAlt: "Scan review interface with a flagged region",
    command: "/open scan-review",
    featured: true,
    graphLabel: "Scan review",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  // Projects 7–12 are example projects. TODO: real data
  {
    slug: "chat-app",
    alias: "chat-app",
    title: "Real-time chat app",
    summary: "Rooms, typing indicators and message history over WebSockets.",
    category: "Web app",
    type: "web",
    year: 2024,
    tone: "violet",
    branch: "feature/chat-app",
    color: "var(--violet)",
    stack: ["React", "NestJS", "Redis"],
    cover: "/images/projects/cover-chat.jpg",
    coverAlt: "Chat dashboard",
    command: "/open chat-app",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "inventory-api",
    alias: "inventory-api",
    title: "Inventory REST API",
    summary: "A documented API for products, stock and suppliers, with tests.",
    category: "Backend",
    type: "backend",
    year: 2024,
    tone: "green",
    branch: "feature/inventory-api",
    color: "var(--green)",
    stack: ["NestJS", "PostgreSQL", "Docker"],
    cover: "/images/projects/cover-api.jpg",
    coverAlt: "Code editor showing the inventory API",
    command: "/open inventory-api",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "shop-admin",
    alias: "shop-admin",
    title: "E-commerce admin dashboard",
    summary: "Orders, products and sales charts for a small online store.",
    category: "Web app",
    type: "web",
    year: 2024,
    tone: "blue",
    branch: "feature/shop-admin",
    color: "var(--blue)",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    cover: "/images/projects/cover-shop.jpg",
    coverAlt: "Store admin dashboard with sales chart",
    command: "/open shop-admin",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "portfolio-cms",
    alias: "portfolio-cms",
    title: "Portfolio CMS",
    summary: "A small headless CMS so project pages can be edited without code.",
    category: "Backend",
    type: "backend",
    year: 2023,
    tone: "violet",
    branch: "feature/portfolio-cms",
    color: "var(--violet)",
    stack: ["Next.js", "Prisma", "TypeScript"],
    cover: "/images/projects/cover-cms.jpg",
    coverAlt: "Code editor showing the CMS schema",
    command: "/open portfolio-cms",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "weather",
    alias: "weather",
    title: "Weather dashboard",
    summary: "Current conditions and a seven-day forecast from a public weather API.",
    category: "Web app",
    type: "web",
    year: 2023,
    tone: "cyan",
    branch: "feature/weather",
    color: "var(--p-backup)",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    cover: "/images/projects/cover-weather.jpg",
    coverAlt: "Weather dashboard for Kathmandu",
    command: "/open weather",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
  {
    slug: "expenses",
    alias: "expenses",
    title: "Expense tracker",
    summary: "Track spending by category and see monthly totals at a glance.",
    category: "Web app",
    type: "web",
    year: 2023,
    tone: "green",
    branch: "feature/expenses",
    color: "var(--green)",
    stack: ["React", "Node.js", "PostgreSQL"],
    cover: "/images/projects/cover-expense.jpg",
    coverAlt: "Phone screens of the expense tracker",
    command: "/open expenses",
    links: { demo: "#", github: "#" }, // TODO: real data
  },
];

// Home shows six cards in this order (rows 776/326, 551/551, 326/776).
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

// Commit graph order, oldest → newest.
const GRAPH_ORDER = [
  "travelease-ui",
  "scan-review-ui",
  "nepali-voice",
  "vps-backup",
  "mhn-platform",
  "heli-booking",
] as const;

export const graphProjects: Project[] = GRAPH_ORDER.map((slug) => getProject(slug)!);

export const projectFilters: { type: ProjectType | "all"; label: string }[] = [
  { type: "all", label: "All" },
  { type: "web", label: "Web apps" },
  { type: "backend", label: "Backend and APIs" },
  { type: "devops", label: "DevOps" },
  { type: "ai", label: "AI and voice" },
  { type: "ui", label: "UI design" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Resolves a room slug or its short `/open` alias. */
export function findProject(name: string): Project | undefined {
  const key = name.trim().toLowerCase();
  return projects.find((p) => p.slug === key || p.alias === key);
}

export function projectHref(project: Project): string {
  return `/projects/${project.slug}`;
}

export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const index = projects.findIndex((p) => p.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count]!,
    next: projects[(index + 1) % count]!,
  };
}
