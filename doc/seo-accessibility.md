# SEO and accessibility

Source: Figma board **SEO and accessibility notes** (Website page) plus component
descriptions. Wording here is a suggestion; final copy is the owner's.

## Page titles and meta descriptions

| Route | `<title>` | Meta description (≤ ~155 chars) |
|---|---|---|
| `/` | Samyak \| Full-Stack Developer in Kathmandu, Nepal | Full-stack developer building fast web apps and dependable backends with TypeScript, NestJS and PostgreSQL. View projects or download my CV. |
| `/projects` | Projects by Samyak \| Web Apps, APIs and DevOps | Twelve builds across web apps, APIs, DevOps and interface design, with screenshots and the stack behind each one. |
| `/projects/heli-booking` | Helicopter Booking System \| Samyak | A private booking and dispatch system for a helicopter operator, built with React, NestJS and PostgreSQL. |
| `/projects/[slug]` | `<Project title> \| Samyak` | Project summary |

Use the Next.js Metadata API (`export const metadata` / `generateMetadata`). Add
`openGraph` + `twitter` with `og-default.png` (1200 × 630) and per-project cover images.

## Heading outline
- **One H1 per page:** hero line on Home; "All projects" on `/projects`; project title in a room.
- Section titles are **H2** (Use the terminal, Skills, Experience, Selected projects,
  Education and learning, How I can help, Get my CV, Let's work together, Screens, Outcome).
- Card, group, role and story titles are **H3**; small panel titles **H4**.
- The terminal, branch tags and commit hashes are decoration, **not headings**.

## URLs
`/`, `/projects`, `/projects/heli-booking`, `/projects/mhn-platform`, … — short, lowercase,
hyphenated. Terminal commands map to these same URLs, so every page is reachable by
normal links (crawlable `<a href>`).

## Structured data (JSON-LD)
- Home: `Person` — name, jobTitle "Full-Stack Developer", address (city, country),
  url, image, `sameAs` (GitHub, LinkedIn, X, Instagram).
- Project rooms: `CreativeWork` (or `SoftwareSourceCode`) — name, description, image,
  dateCreated, author → Person.
- `BreadcrumbList` on `/projects` and rooms (matches the `~/ projects / slug` breadcrumb).

## Images
- Alt text says what the image shows (see `assets.md`), e.g. "Dispatcher dashboard
  showing four flights and their payload status".
- `next/image` with width/height, `sizes`, WebP/AVIF, lazy below the fold; hero has no
  images (fast LCP).

## Performance
- Self-host fonts with `next/font` (`display: swap`), subset Latin + Devanagari only
  where Nepali text appears.
- Target LCP < 2.5 s on mobile. Load GSAP (or the scroll library) only on Home and only
  on desktop.
- `sitemap.ts` and `robots.ts` in `app/`.

## Accessibility rules
- Every command also has a visible button or link.
- Focus ring: 2px `--focus` (outline-offset 2px) on all interactive elements.
- Custom cursor, ticker/slider and sideways intro switch off with
  `prefers-reduced-motion`.
- Text contrast meets **WCAG AA** in both themes (light mode uses darker accent text:
  `--blue-t #1D4ED8`, `--green-t #047857`, `--violet-t #6D28D9`).
- Terminal: the input has a visible label (visually hidden) "Type a command"; results
  region uses `aria-live="polite"`; slash menu uses `role="listbox"` with
  `aria-activedescendant`.
- Commit dots and cards are real links/buttons with accessible names
  ("Open Helicopter booking project").
- Mobile menu: `aria-expanded` on the button, focus trap, Esc closes, body scroll locked.
- Back to Top: `aria-label="Back to top"`.
- Theme toggle: `aria-pressed` / label "Switch to light theme".
- Tap targets ≥ 44px on mobile (buttons are full width).
- Keyboard shortcuts are ignored while typing in inputs; `?` lists them.
- Form: labels tied to inputs, errors announced, `autocomplete` on name/email.
