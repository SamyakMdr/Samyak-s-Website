# Components

Source: Figma page **Components** (sections 01–09). Each entry lists the Figma name,
the suggested React component, props, variants and exact sizes. Sizes are the Figma
defaults; components hug their content unless a width is given.

Legend: **Reusable** = shared in `components/`. **Page** = lives with its page in
`app/(site)/…/_sections`.

---

## 02 Actions and controls

### Button (Reusable) → `<Button>`
Figma: component set `Button` (15 variants).

| Prop | Type | Figma |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | Style |
| `icon` | `"download" \| undefined` | Show icon (download arrow, 16px, left) |
| `children` | label | Label (Button/Label 15/600) |
| `href` / `onClick` | | renders `<a>` or `<button>` |
| `fullWidth` | boolean | mobile buttons are full width, padding 14 × 18, label centred |
| `size` | `"md" \| "sm"` | sm = header Download CV, padding 8 × 14 |

Base: radius 10, padding 12 × 18, gap 8, height ≈ 39–41.

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Default | bg `--blue`, text `--on-accent` | bg `--panel`, 1px `--line`, text `--fg` | transparent, text `--dim` |
| Hover | bg `--blue-hover` | bg `--panel-hover` | bg `--panel-2`, text `--fg` |
| Pressed | bg `--blue-pressed` + inset shadow `0 2px 4px rgba(0,0,0,.25)` | bg `--panel-2` | bg `--panel-hover` |
| Focus | 2px `--focus` ring outside | same | same |
| Disabled | bg `--line`, text `--dim` | opacity .55 | opacity .55 |

### Filter Chip (Reusable) → `<FilterChip label count selected onClick>`
Pill, radius 999, padding 8 × 14, gap 8. Default: bg `--panel`, 1px `--line`, label
`--fg` (Button/Small), count `--dim` (Mono/Small). Selected: bg `--fg`, text `--bg`.

### Hint Chip (Reusable) → `<HintChip command onRun>`
Radius 8, padding 6 × 10, gap 6, bg `--panel-2`, **1px dashed** `--line` (4/3).
Content: `>` in `--green-t` + command in `--fg`, both Mono/Small.
Behaviour: click fills the terminal with the command and runs it.

### Kbd (Reusable) → `<Kbd>K</Kbd>`
Radius 8, padding 3 × 6, bg `--panel-2`, border 1px (bottom 2px) `--line`,
IBM Plex Mono 500 11px, `--dim`.

### Back to Top (Reusable) → `<BackToTop>`
48px circle. Default: bg `--panel`, 1px `--line`, arrow-up icon `--fg`.
Hover: bg `--blue`, icon white. Shadow `--shadow-float`.
Fixed: bottom/right **24px** desktop, **16px** mobile. Appears after the first screen.
`aria-label="Back to top"`.

### Availability Badge (Reusable) → `<AvailabilityBadge>`
Pill, padding 6/12/6/10, gap 8, 8px green dot + Body/Small text. Fill green 12%,
border green 40%. Copy: "Open to junior roles and freelance work" (hero) /
"Available for new projects" (contact).

### Status Pill (Reusable)
Variants Ready (green) / Pending (warn) / Over (bad). Radius 999, padding 3 × 9,
Mono/Small, fill = colour @ 16%, text = colour. (Only used in the v1 dispatch board;
keep for future rooms.)

---

## 03 Navigation

### Site Header (Reusable) → `<SiteHeader>`
Desktop: 1440 × 56, padding 0 × 160, gap 14, fixed top, bg `--bg` @ 72% +
`backdrop-filter: blur(14px)`, bottom border 1px `--line`.
Children, left → right:
1. Brand `samyak@dev` (Heading/H4; the `@` in `--green-t`), links to `/`
2. Nav: 4 × `NavTab` — `main`, `experience`, `feature/projects`, `contact`
3. Spacer
4. "Run a command" button (bg `--panel`, 1px `--line`, radius 10, Body/Small `--dim`) + `<Kbd>Ctrl K</Kbd>` (show `⌘ K` on Mac). **Now focuses the terminal** (no popup).
5. Download CV — `Button primary sm icon="download"`
6. Theme toggle — 34 × 34, radius 10, bg `--panel`, 1px `--line`, sun icon 16px

### Site Header / Mobile (Reusable) → `<SiteHeader variant="mobile">`
390 × 56, padding 0 × 20, gap 8, bg `--bg` @ 80% + blur. Brand · spacer ·
Terminal button (40 × 40, radius 10, `>_` icon) · Menu button (40 × 40, hamburger).

### Nav Tab (Reusable) → `<NavTab label active href>`
Pill, padding 6 × 12, gap 6, git-branch icon 14px + Mono/Label.
Default: no fill, text/icon `--dim`. Active: fill blue 12%, 1px `--blue`, text `--fg`.
Active = the section currently in view (IntersectionObserver).

### Branch Tag (Reusable) → `<BranchTag tone label>`
Tones: `blue | green | violet | cyan | pink` (cyan = `--p-backup`, pink = `--p-travel`).
Pill, padding 4 × 10, gap 6, git-branch icon 12px in tone colour, label Mono/Small `--fg`.
Fill tone @ 12%, border tone @ 55%.

### Cursor (Reusable, desktop pointer only) → `<CustomCursor>`
Variants (72 × 72 canvas):
- Default: 32px ring (1.5px `--fg` @ 60%) + 6px green dot
- Link: 44px ring blue @ 20% fill + 1.5px blue stroke + 6px blue dot
- Card: 72px blue disc @ 90% with "Open" (Button/Small, white)
- Text: 3 × 26 green caret (inside terminals)
Hidden on touch and with reduced motion. Ring follows with 80ms easing.

### Mobile Menu (Page/Reusable) → `<MobileMenu>`
Full screen 390 × 844, bg `--bg`. Header (brand + close 40 × 40). Body padding 24/20:
4 rows (Home/main, Experience/experience, Projects/feature/projects, Contact/contact),
each: padding 16 × 14, radius 12, git icon + title (Heading/H3) + branch (Mono/Small)
+ "→"; current row fill blue 12% + 1px blue. Footer: Download CV (primary, full width),
Theme row (Dark/Light segmented control), social logos, tip "the terminal on Home works
here too. Type /". Slides in from the right; closes with X or Esc.

---

## 04 Cards and content

### Project Card / Feature (Reusable) → `<ProjectCard layout="feature">`
Landing page card (v1 layout). Radius 18, padding 14/14/16/14, gap 14, bg `--panel`,
1px `--line`.
- Cover: inset image, radius 12, 1px border, height **300** (wide 776), **260** (551),
  **220** (narrow 326 and default), 190–ish in the mobile carousel (card 320 wide)
- Category pill on cover (top-left 14/14): bg `#0D1117` @ 80%, IBM Plex Mono 500 12 white
- Body (padding 4): Title (H3), Summary (Body/Small `--dim`), Meta row (BranchTag +
  spacer + 3 overlapping logo slots 26px, gap -6, 2px ring `--panel`), divider,
  footer: Year (Mono/Small `--dim`) + "Open room →" (Button/Small `--blue-t`)
- Hover: lift 2px, border = project colour, cursor "Open"; the hero card shows a
  gradient border (violet → blue) + violet glow.

### Project Card (Reusable) → `<ProjectCard layout="grid">`
Projects page and mobile list. Radius 16, no padding, `overflow:hidden`.
Cover full-bleed 208px tall, then body padding 16/18/18/18 with the same contents.

Props for both:
```ts
type ProjectCardProps = { project: Project; layout: "feature" | "grid"; width?: "wide"|"half"|"narrow" }
```

### Stack Chip (Reusable) → `<StackChip tech>`
Radius 12, padding 6/14/6/6, gap 10, bg `--panel` (`--panel-2` inside skill groups),
1px `--line`. Logo slot 32px + name (Body/Strong).

### Logo Slot (Reusable) → `<TechLogo name size>`
40 × 40 default, radius 10, brand colour fill, monogram (Space Grotesk 700 15) until the
official SVG is added. See `assets.md` for colours and sources.

### Stat (Reusable)
Value (Display/Stat) + label (Body/Small `--dim`), gap 4. Used in the project room.

### Contact Row (Reusable) → `<ContactRow icon label value href>`
Icon: `mail | phone | location | website`. 40px tile (radius 10, `--panel-2`, 1px
`--line`, 18px icon) + label (Body/Caption `--dim`) + value (Body/Strong). Gap 14.

### Activity Row (Reusable) → `<ActivityRow role org dates logo>`
Row padding 14 × 0, bottom border 1px (none on the last row). Text column (Role Body/Strong,
Org Body/Small `--dim`, Dates Mono/Small `--dim`) + 44px org-logo tile (radius 12,
`--panel-2`, 1px `--line`).

### Section Head (Reusable) → `<SectionHead title tone branch intro?>`
H2 (desktop Heading/H2, mobile Mobile/H2) + BranchTag in one row (gap 14, wraps on
mobile) + optional intro (Body/Large 640 max / mobile Body/Default). Gap 12.

### Glow (Reusable) → `<Glow side="right">`
Absolute, behind content. Desktop ellipse 960 × min(640, 90% section height) at
`right:-400px`; radial gradient violet (.42) → pink (.16) @45% → transparent;
`filter: blur(60px)`. Mobile 520 × 520, blur 50. Light mode opacity .6.
Used in **Experience** and **Contact**; section has `overflow:hidden`.

### Service card (Page)
Panel (radius 18 desktop / 16 mobile, padding 24 / 18), 44px icon tile (accent @ 16%),
title H3, description Body/Small `--dim`.

### Education Card — **not used** on current pages (education is a timeline).

---

## 05 Terminal

### TerminalWindow (Reusable) → `<TerminalWindow title>`
Frame: radius 14–16, bg `--code-bg`, 1px `--line`, `overflow:hidden`, forced dark.
Bar: padding 10 × 14, bg `--panel`, three 10px dots (red/yellow/green), spacer, title
Mono/Small `--dim`.

### Terminal / History (Reusable) → `<HistoryTerminal>`
470 wide in the hero, title `~/samyak — zsh`. Output padding 16/18/18/18, gap 6,
Mono/Code. Content in `content.md` (history + git log). Ends with `$` + blinking 8 × 17
green block. Mobile: shorter (tail -4, -2 commits). The prompt is live (`<TerminalShell>`,
also used by the CV band terminal): see `interactions.md §1.2b`.

### Terminal / Interactive (Reusable) → `<InteractiveTerminal>`
Fills the left column (≈ 820 wide, **503 tall** desktop). Title
`samyak.sh — interactive — 96×28`. Screen padding 20/22/18/22, gap 16:
1. Welcome box: 1px violet @ 70%, radius 10, padding 12 × 16: `✻ Welcome to samyak.sh` /
   `Type / for commands · ↑ for history · Tab to complete · ? for shortcuts` / `cwd: ~/home`
2. Output log (commands + results print here, newest just above the input)
3. Input box: 1px green @ 60%, radius 10, padding 12 × 14: `❯` + text + caret
4. Slash menu: rows padding 6 × 10, radius 6, command (Mono/Label, 150px column) +
   description (Mono/Small `--dim`); highlighted row bg `--panel`, command `--blue-t`
5. Status line: `? for shortcuts` … `↑↓ history · Tab complete · Esc clear`
Mobile: 350 wide, welcome text "Type / for commands, or tap one below.", status
"Tap a command, or type and press Go".

### Keyboard Shortcuts Card (Reusable, desktop only) → `<ShortcutsCard>`
340 × **503** (same height as the terminal), padding 20/22, gap 9, radius 16,
`overflow-y:auto` with a 4px scrollbar (track `--panel-2`, thumb `--dim`).
Content in `interactions.md`.

### Terminal Prompt (Reusable) → `<TerminalPrompt placeholder>`
Single-line search box used on `/projects`: radius 12, padding 11 × 14, gap 10,
bg `--code-bg`, 1px `--line`, `samyak@dev:~$` (Mono/Code `--green-t`) + 9 × 18 green block +
input (placeholder "filter by name or tool, e.g. nestjs").

### Input Field (Reusable) → `<Field label placeholder state>`
Label Mono/Label `--fg`, gap 6. Box radius 12, padding 10 × 12, bg `--bg`.
Default 1px `--line` · Focus 2px `--blue` · Error 2px `--bad` + message Body/Caption `--bad`
("Add a title so I know what this is about."). Textarea height 140 desktop / 120 mobile.

---

## 06 Timeline and graph

### Timeline Item (Reusable) → `<TimelineItem tone="green|violet" current last compact>`
Desktop 720 wide (education 680). Row gap 18.
- Rail: 14px dot (3px ring: `--green` current, `--dim` older; education `--violet` first)
  + 2px `--line` line (hidden on the last item)
- Content (padding-bottom 32, gap 8): Top row = Role (H3) + spacer + Dates pill
  (Mono/Small `--dim`, bg `--panel-2`, radius 999, padding 4 × 10); Company (Body/Small
  `--blue-t`, violet-t for education); Summary (Body/Default `--dim`); commit meta
  (hash Mono/Small `--green-t`/`--violet-t` + message Mono/Small `--dim`)
- `compact` (mobile, 350): role on its own line (18px), dates pill below, gap 14.

### Commit Dot (Reusable) → `<CommitDot project labelPosition>`
160 × 112 node. Dot 14px (hover 18) project colour + 2px `--bg` ring; halo 28px @16%
(hover 40px @28%). Label + year centred below (or above). Hover shows tooltip:
`❯ /open <slug>` + "↵ or click to open" (bg `--code-bg`, 1px `--line`, radius 8,
padding 8 × 12). Click → project room.

### CommitGraph (Reusable) → `<CommitGraph orientation="horizontal|vertical">`
See `pages-and-layout.md` → Activity graph for geometry.

---

## 07–08 Helpers

- `Glow` (above) · `SectionHead` (above) · `TechLogo` (logo slots)

## Deprecated — do not build
Project Card (v1), Card Art/*, Tech Chip, Milestone Bar, Command Item, Education Card,
the popup command palette (Archive v1).

---

## Suggested folder structure

```
components/
  ui/        Button, FilterChip, HintChip, Kbd, BranchTag, NavTab, StatusPill,
             AvailabilityBadge, BackToTop, ThemeToggle, TechLogo, Field
  layout/    SiteHeader, MobileMenu, Footer, SectionHead, Glow, CustomCursor
  terminal/  TerminalWindow, HistoryTerminal, InteractiveTerminal, TerminalShell,
             ShortcutsCard, TerminalPrompt, commands.ts, useTerminal.ts
  content/   ProjectCard, ProjectCarousel, StackChip, StackSlider, Stat,
             ContactRow, ActivityRow, TimelineItem, CommitGraph, CommitDot
app/(site)/
  page.tsx + _sections/ (HorizontalIntro, Hero, TerminalSection, ActivityGraph,
             Skills, Experience, Projects, Education, Services, CVBand, Contact)
  projects/page.tsx + _sections/ (ProjectsHeader, ProjectGrid)
  projects/[slug]/page.tsx + _sections/ (RoomBar, Intro, Facts, Story, Gallery,
             RequestFlow, Outcome, NextProject)
```
