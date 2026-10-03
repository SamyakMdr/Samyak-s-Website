# Content and data

All copy as it appears in Figma. Keep it in `content/*.ts` so pages, terminal and
search share one source. Items marked **(placeholder)** must be replaced with real data
(see `open-questions.md`).

## Types

```ts
export type Tone = "blue" | "green" | "violet" | "cyan" | "pink";
export type ProjectType = "web" | "backend" | "devops" | "ai" | "ui";

export interface Project {
  slug: string; title: string; summary: string;
  category: string;           // shown on the cover pill
  type: ProjectType;          // used by filters and /projects --type
  year: number;
  tone: Tone; branch: string; // BranchTag
  color: string;              // CSS var for graph/hover
  stack: TechName[];          // first 3 shown as logos on cards
  cover: string;              // /images/projects/<file>.jpg
  command: string;            // e.g. "/open heli"
  featured?: boolean;         // shown on Home (6)
  room?: ProjectRoom;         // only heli-booking designed
}
```

## Projects (order on `/projects`, newest first)

| # | slug | Title | Summary | Category | Type | Year | Tone / branch | Stack (first 3) | Cover | Featured |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `heli-booking` | Helicopter booking and operations system | Bookings, flight planning and dispatch in one place, with separate views for admins, dispatchers and clients. | Web app | web | 2026 | blue · `feature/heli-booking` | React, NestJS, PostgreSQL | cover-heli.jpg | ✓ |
| 2 | `mhn-platform` | Mountain Helicopters Nepal website | A fast marketing site that shows which ads bring in real enquiries. | Website | web | 2025 | violet · `feature/mhn-platform` | Next.js, Tailwind CSS, TypeScript | cover-mhn.jpg | ✓ |
| 3 | `nepali-voice` | Nepali voice inventory | Say a stock change in Nepali and the database updates itself. | AI / voice | ai | 2025 | green · `feature/nepali-voice` | Python, FastAPI, PostgreSQL | cover-voice.jpg | ✓ |
| 4 | `vps-backup` | Offsite VPS backups | Nightly database dumps and file uploads copied off the server to Cloudflare R2. | DevOps | devops | 2025 | cyan · `feature/vps-backup` | Ubuntu, Cloudflare, Docker | cover-backup.jpg | ✓ |
| 5 | `travelease-ui` | Travelease travel platform | A trip planner with a sidebar layout that adapts from desktop to phone. | UI design | ui | 2024 | pink · `feature/travelease-ui` | React, Tailwind CSS, Figma | cover-travel.jpg | ✓ |
| 6 | `scan-review-ui` | Lung scan review interface | A calm screen for reviewing scans and flagged regions. Interface demo only. | UI design | ui | 2024 | cyan · `feature/scan-review-ui` | React, Tailwind CSS, TypeScript | cover-lung.jpg | ✓ |
| 7 | `chat-app` (placeholder) | Real-time chat app | Rooms, typing indicators and message history over WebSockets. | Web app | web | 2024 | violet · `feature/chat-app` | React, NestJS, Redis | cover-chat.jpg | |
| 8 | `inventory-api` (placeholder) | Inventory REST API | A documented API for products, stock and suppliers, with tests. | Backend | backend | 2024 | green · `feature/inventory-api` | NestJS, PostgreSQL, Docker | cover-api.jpg | |
| 9 | `shop-admin` (placeholder) | E-commerce admin dashboard | Orders, products and sales charts for a small online store. | Web app | web | 2024 | blue · `feature/shop-admin` | Next.js, Prisma, PostgreSQL | cover-shop.jpg | |
| 10 | `portfolio-cms` (placeholder) | Portfolio CMS | A small headless CMS so project pages can be edited without code. | Backend | backend | 2023 | violet · `feature/portfolio-cms` | Next.js, Prisma, TypeScript | cover-cms.jpg | |
| 11 | `weather` (placeholder) | Weather dashboard | Current conditions and a seven-day forecast from a public weather API. | Web app | web | 2023 | cyan · `feature/weather` | React, TypeScript, Tailwind CSS | cover-weather.jpg | |
| 12 | `expenses` (placeholder) | Expense tracker | Track spending by category and see monthly totals at a glance. | Web app | web | 2023 | green · `feature/expenses` | React, Node.js, PostgreSQL | cover-expense.jpg | |

Commit graph order (oldest → newest): travelease (2024), scan review (2024), voice
(2025), backups (2025), MHN (2025), heli (2026). Graph labels: "Travelease", "Scan review",
"Voice inventory", "VPS backups", "MHN website", "Heli booking". Commands:
`/open travelease`, `/open scan-review`, `/open voice`, `/open backup`, `/open mhn`, `/open heli`.

Filter counts on `/projects` (from Figma): All 12 · Web apps 6 · Backend and APIs 2 ·
DevOps 1 · AI and voice 1 · UI design 2. Default sort: newest first.

Mobile card summaries are slightly shorter (e.g. heli: "Bookings, flight planning and
dispatch in one place, with separate views for each role.").

## Project room: `heli-booking`

- Breadcrumb `~/ projects / heli-booking` · BranchTag blue `feature/heli-booking`
- H1: Helicopter booking and operations system
- Lead: A private system for a helicopter operator. Staff take bookings, plan payload
  and dispatch flights, and each role only sees what it needs.
- Buttons: View live demo · Read the code on GitHub
- Facts: Role = Full-stack developer · Timeline = Jan – Jun 2026 · Team = 2 people ·
  Status = In use, still improving (mobile: In use) · Stack = React, TypeScript, NestJS,
  PostgreSQL, Docker
- Cover: cover-heli.jpg
- Story:
  - **The problem** — Bookings lived in spreadsheets and phone calls. Dispatchers re-typed
    passenger weights, and nobody could see at a glance which flights were ready.
  - **What I built** — One shared system with three roles. Clients request seats,
    dispatchers plan payload and crew, and admins approve flights and manage users.
  - **What I learned** — Designing permissions first saved a lot of rework. Small
    things, like warning before a payload goes over the limit, mattered most to the team.
- Screens: shot-heli-2.jpg "Dispatcher overview in light mode" · shot-heli-3.jpg
  "Booking flow on a phone" (mobile adds cover-heli.jpg "Operations dashboard")
- How a request moves: "A booking leaves the browser with a signed token, passes a role
  guard in the API and lands in PostgreSQL." Boxes: React frontend (Booking forms,
  role-aware routes; Dispatch board) → NestJS API (JWT guard, role guard; DTO
  validation, services) → PostgreSQL (TypeORM entities; Migrations). Labels: HTTPS + JWT,
  JSON, SQL, rows.
- Outcome (placeholder figures): 3 roles with their own views · 40+ API endpoints with
  tests · < 1 s typical page load · 0 paper booking sheets left. Note: "Sample figures for
  the design. Replace with real numbers before publishing."
- Next project: Mountain Helicopters Nepal website (cover-mhn.jpg).

## Hero

- Badge: Open to junior roles and freelance work
- H1: Samyak builds fast web apps and dependable backends.
- Designation: Junior Full-Stack Developer · Kathmandu, Nepal (placeholder location)
- Intro (desktop): I design and build web applications end to end, from the interface
  people use to the API, database and server underneath. Most of my work is in
  TypeScript, NestJS and PostgreSQL.
- Intro (mobile): I design and build web applications end to end, from the interface to
  the API, database and server underneath.
- Buttons: Download CV · View projects

### History terminal (desktop)
```
$ history | tail -6
  1  git init portfolio
  2  npx create-next-app samyak-dev
  3  nest new api
  4  docker compose up -d
  5  rclone sync ./backups r2:site-backups
  6  git push origin main

$ git log --oneline -3
a3f9c21 feat: role-based dispatch board
7be04d2 chore: nightly backups to R2
19c5e80 release: first client site live

$ █
```
Mobile: `history | tail -4` (lines 3–6, line 5 shortened to `rclone sync ./backups r2:`)
and `git log --oneline -2` (`feat: dispatch board`, `chore: backups to R2`).

## Terminal section
- H2: Use the terminal · tag green `shell`
- Hints: New here? Try → goto projects · download cv · open heli · goto contact ·
  switch-theme · help

## Skills (groups)

| Group | Description | Tools |
|---|---|---|
| Frontend | Interfaces that load fast and work on any screen size. | React, Next.js, TypeScript, Tailwind CSS, JavaScript, Figma |
| Backend | APIs with clear rules for who can do what. | NestJS, Node.js, FastAPI, Python |
| Databases | Data models, migrations and queries that stay quick. | PostgreSQL, Prisma, TypeORM, Redis |
| DevOps and tools | Servers, deployments and backups I can rely on. | Docker, Ubuntu, Nginx, Cloudflare, Git, GitHub |

Intro: "The tools I reach for most, grouped by where they sit in a project." (mobile: "The tools I reach for most.")

## Experience (newest first) — placeholders

| Role | Dates | Company line | Summary | Hash · commit |
|---|---|---|---|---|
| Junior Full-Stack Developer (current) | Jan 2025 – Present | Company name · City, Country · Full-time | Building internal tools and client web apps with Next.js, NestJS and PostgreSQL. Leading the role-based booking system from database design to deployment. | a3f9c21 · feat: role-based dispatch board |
| Full-Stack Developer Intern | Jun 2024 – Dec 2024 | Company name · City, Country · Internship | Worked on REST APIs and admin dashboards. Set up nightly database backups to Cloudflare R2 for the team's servers. | 7be04d2 · chore: nightly backups to R2 |
| Freelance Web Developer | 2023 – 2024 | Self-employed · Remote | Built and launched small business websites. Handled hosting, DNS and basic SEO for each client. | 19c5e80 · release: first client site live |

Intro: "Where I've worked and what I shipped, newest first."
CV card: "The full picture" / "My CV has every role, project and course in one place, on
two pages." / Download CV (PDF) / "Updated October 2026 · 180 KB".

## Education — placeholders

| Degree | Years | School line | Summary | Hash · commit |
|---|---|---|---|---|
| Bachelor's degree in Computer Science | 2021 – 2025 | University or college name · City, Country | Core subjects in data structures, databases, networks and software engineering. Final-year project on a web-based booking system. | e41b7a0 · learn: final-year project shipped |
| Higher secondary education (+2), Science | 2019 – 2021 | School or college name · City, Country | Science stream with mathematics and computer science, where I wrote my first programs. | 0c93f2d · learn: hello world in C |

Intro: "Formal study, plus the courses that filled the gaps." (mobile: "Formal study, plus what I do outside class.")

### Activities and roles — placeholders
"What I do outside work and class."
| Role | Organisation | Dates | Logo |
|---|---|---|---|
| Creative Hub Director | Organisation or club name | 2024 – Present | CH (placeholder) |
| Hackathon team lead | Event name | 2024 | HX |
| Volunteer web developer | Community or NGO name | 2023 – 2024 | VW |

## Services
Intro: "If one of these sounds like your project, I'd be glad to talk."
| Title | Text | Icon / colour |
|---|---|---|
| Web apps and websites | From a single landing page to a full dashboard, built responsive and quick to load. | monitor · blue |
| APIs and backends | REST APIs with sign-in, roles and a well-structured PostgreSQL database. | code · green |
| Deployment and upkeep | Server setup, domains, SSL and automatic backups so the site keeps running. | server · violet |

## CV
"Get my CV" / "A two-page PDF with my experience, projects, skills and education. You can
also type download cv in the terminal." / Download PDF · View it online.
File: `public/cv/samyak-cv.pdf` (placeholder, 2 pages, ~180 KB).

## Contact — placeholders
- H2: Let's work together · tag green `contact`
- Intro: Send a message the way you'd open a pull request, or reach me directly. I usually reply within a day.
- Card: Samyak · Junior Full-Stack Developer · avatar (portrait.jpg)
- Email: hello@yourdomain.com · Phone: +977 98XX XXX XXX · Based in: Kathmandu, Nepal ·
  Website: yourdomain.com
- Find me online: GitHub, LinkedIn, X, Instagram, WhatsApp (URLs needed)
- Badge: Available for new projects
- Form: Your name (Full name) · Assignee (your email) (you@example.com) · Title (What's
  this about?) · Description (Tell me about the project, the role or your question.) ·
  Submit PR · "Runs a few quick checks, then sends."

## Footer
- `samyak@dev` — "Full-stack developer in Kathmandu, Nepal. Building web apps, APIs and
  the servers they run on."
- Pages: Home, Projects, Experience, Contact
- Projects: Helicopter booking, Mountain Helicopters Nepal, Nepali voice inventory, All projects
- Elsewhere: GitHub, LinkedIn, Email, Download CV
- "© 2026 Samyak. Designed and built by me." · "Back to top ↑"
