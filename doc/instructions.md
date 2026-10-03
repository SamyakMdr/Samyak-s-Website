# Build instructions (Next.js)

A step-by-step guide to turn the Figma design into a Next.js site. Follow the phases in
order; each phase ends with a check against the Figma frames.

Figma: https://www.figma.com/design/9xosKxYBtgMeiTSAFT0qet
Reference docs: `design-tokens.md`, `components.md`, `pages-and-layout.md`,
`interactions.md`, `content.md`, `assets.md`, `seo-accessibility.md`, `open-questions.md`.

---

## Phase 0 — Setup

```bash
npx create-next-app@latest samyak-dev --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
cd samyak-dev
npm i clsx
npm i gsap            # optional: pinned sideways intro (desktop)
```

Recommended structure:

```
src/
  app/
    layout.tsx            fonts, theme script, SiteHeader, Footer, BackToTop, Cursor
    globals.css           tokens from design-tokens.md
    page.tsx              Home
    projects/page.tsx     All projects
    projects/[slug]/page.tsx   Project room (generateStaticParams from content)
    sitemap.ts  robots.ts
    api/contact/route.ts  (or a Server Action)
  components/ ui | layout | terminal | content      (see components.md)
  sections/home | projects | room                   (page-specific sections)
  content/ projects.ts experience.ts education.ts activities.ts skills.ts
           services.ts contact.ts commands.ts site.ts
  lib/ theme.ts useInView.ts useReducedMotion.ts useShortcuts.ts
public/ images/ icons/ logos/ cv/ og/            (copy from assets/)
```

## Phase 1 — Foundations

1. Paste the CSS from `design-tokens.md §9` into `globals.css`.
2. Map tokens in Tailwind (colors → `var(--…)`, radius, shadows, fonts).
3. Fonts with `next/font/google`: Space Grotesk (500, 700), IBM Plex Sans (400, 600),
   IBM Plex Mono (400, 500), Noto Sans Devanagari (600). Expose CSS variables.
4. Create text-style utilities for all 18 Figma styles (e.g. `.t-h1`, `.t-h2`,
   `.t-body-lg`, `.t-mono-label` …) with the mobile mapping from `design-tokens.md §2`.
5. Theme: inline script in `<head>` reads `localStorage.theme` (fallback: dark) and sets
   `data-theme` before paint. `ThemeToggle` updates it.
6. Layout container: `max-width: 1120px; padding-inline: var(--page-x)`.

✅ Check: compare the Components → 01 Foundations tokens board in both modes.

## Phase 2 — Assets
Copy `assets/` into `public/`. Inline the SVG icons as React components (or use them via
`<img>`). Build `TechLogo` with the monogram fallback until official logos are added.

## Phase 3 — Shared components (in this order)
1. `Button` (3 styles × 5 states, icon, full width) · `Kbd` · `BranchTag` · `NavTab` ·
   `FilterChip` · `HintChip` · `AvailabilityBadge` · `StatusPill` · `TechLogo`
2. `SectionHead` · `Glow` · `Field` (default/focus/error, textarea)
3. `TerminalWindow` → `HistoryTerminal` · `ShortcutsCard` · `TerminalPrompt`
4. `StackChip` · `Stat` · `ContactRow` · `ActivityRow`
5. `TimelineItem` (green/violet, current, last, compact)
6. `ProjectCard` (feature + grid) · `ProjectCarousel`
7. `CommitDot` · `CommitGraph` (horizontal + vertical)
8. `SiteHeader` (desktop + mobile) · `MobileMenu` · `Footer` · `BackToTop` · `CustomCursor`

Build each with every variant shown in Figma (`components.md`). A simple `/dev/ui` page
listing them helps visual QA.

✅ Check: side by side with the Components page sections 02–07.

## Phase 4 — Content
Create typed data files from `content.md`. Mark placeholders with a `// TODO real data`
comment. `generateStaticParams` for rooms comes from `projects.ts`.

## Phase 5 — Home, static first
Build sections in Figma order with no motion: Hero panel, Terminal panel (as a normal
stacked section for now), Activity graph, Stack slider (static), Skills, Experience,
Projects (feature grid), Education, Services, CV, Contact, Footer.
Mobile: README card, stacked terminal, vertical graph, carousel, compact timelines.

✅ Check at 1440 and 390 against Home / Dark, Home / Light, Mobile / Home.

## Phase 6 — Terminal and shortcuts
1. `commands.ts` registry (`interactions.md §1.1`) used by the terminal, hint chips,
   shortcuts and the header button.
2. `InteractiveTerminal`: input, slash menu (filter + ↑↓ + Tab + ↵ + Esc), output log
   above the input, history in `sessionStorage`, not-found suggestion, rich output
   (project rows with thumbnails).
3. `useShortcuts`: `/`, `g h|p|e|c`, `d`, `t`, `?`, `Ctrl/⌘ K`, `Esc` (ignored while typing).
4. First-visit hint toast.

✅ Check: every state on the "Terminal and hint states" board.

## Phase 7 — Motion
1. Sideways intro (desktop ≥ 1200 only, no reduced motion): pin + scrub, progress dots,
   keys ↓ → Space / ↑ ←, back-to-top resets it.
2. Stack slider: two infinite rows in opposite directions, swap at viewport middle,
   pause on hover.
3. Commit graph hover tooltip; card hover lift + project-colour border; feature-card glow.
4. Custom cursor (pointer: fine only).
5. Mobile: carousel snap + dots, menu slide-in, filter chips swipe.
6. Reduced motion fallbacks for all of the above.

## Phase 8 — Projects page and rooms
`/projects`: page head, TerminalPrompt search (filters by title, tool, category),
filter chips with live counts, sort newest first, 3-col grid / 1-col mobile.
`/projects/[slug]`: room bar (Previous / Next / Close + Esc), intro + facts, cover,
story, gallery (swipe on mobile), request-flow diagram, outcome, next project.

## Phase 9 — Contact
PR form with validation, Server Action / route handler, "checks" sequence, success and
error states (Input Field Error variant).

## Phase 10 — SEO and accessibility
Metadata per route, JSON-LD (Person, CreativeWork, BreadcrumbList), sitemap, robots,
alt text, focus rings, aria for terminal/menu/toggle (`seo-accessibility.md`).

## Phase 11 — QA checklist
- [ ] 1440 and 390 match Figma (spacing, sizes, radii, colours) in **both themes**
- [ ] Terminals stay dark in light mode; capsules show the git icon in both themes
- [ ] Header margins = page margins (160 desktop / 20 mobile)
- [ ] Every prototype link in `interactions.md §13` works
- [ ] Keyboard only: all features reachable, focus visible, Esc behaviour
- [ ] Reduced motion: intro stacks, slider still, no cursor
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] No placeholder content left (`open-questions.md` list)

## Conventions
- Components never hard-code colours; only CSS variables.
- Copy lives in `content/`, not in components.
- One H1 per page; headings follow `seo-accessibility.md`.
- Do not build anything from Archive v1 or the "Deprecated" component section.
