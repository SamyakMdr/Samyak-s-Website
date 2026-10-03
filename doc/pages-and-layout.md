# Pages and layout

Source: Figma page **Website**. Desktop frames are 1440 wide (content 1120, side margin
160). Mobile frames are 390 wide (content 350, side margin 20). Every page has a fixed
header (56px) and a fixed Back to Top button; the page body starts with 56px top padding.

## Routes

| Route | Figma frames | Notes |
|---|---|---|
| `/` | Home / Dark, Home / Terminal in view, Home / Light, Mobile / Home, Mobile / Home (Light) | "Terminal in view" is the end state of the sideways intro, not a page |
| `/projects` | Projects / Dark, Projects / Light, Mobile / Projects | 12 projects, search + filters |
| `/projects/[slug]` | Project / Helicopter booking, Mobile / Project room (Heli) | Template for every project (only `heli-booking` designed) |
| (overlay) | Mobile / Menu open | Not a route; state of the mobile header |

In-page anchors on `/`: `#main` (hero), `#terminal`, `#work` (activity graph), `#skills`,
`#experience`, `#projects`, `#education`, `#services`, `#cv`, `#contact`.

## Auto layout → CSS mapping

| Figma | CSS |
|---|---|
| Vertical auto layout | `display:flex; flex-direction:column; gap:<itemSpacing>` |
| Horizontal auto layout | `display:flex; gap:<itemSpacing>; align-items:<counterAxis>` |
| Wrap | `flex-wrap:wrap; row-gap:<counterAxisSpacing>` |
| Fill container | `flex:1 1 0; min-width:0` |
| Hug | `width:auto` |
| Absolute child | `position:absolute` inside a `position:relative` parent |
| Fixed children (header, back to top) | `position:fixed` |
| Frame scroll HORIZONTAL | `overflow-x:auto; scroll-snap-type:x mandatory` |
| Grid layout (mobile Activity graph, Stack slider) | CSS grid / flex column |

---

# `/` Home — desktop (1440)

Root: vertical, gap 0, padding-top 56. Order of sections:

### 1. Intro (sideways scroll) — `HorizontalIntro`
- Viewport strip **1440 × 844** (100vh minus header), clips content.
- Track (horizontal, gap 0) holds two panels of **1440 × 844** each:
  **Panel 1 / Hero** and **Panel 2 / Terminal**.
- Behaviour in `interactions.md` → "Sideways intro".
- Each panel has a **scroll cue** centred at the bottom (y = 844 − 44): mouse icon +
  Body/Small `--dim` text + progress dots (active 22 × 6 blue, inactive 8 × 6 `--line`,
  radius 3, gap 6).
  - Panel 1: "Scroll to open the terminal  →"
  - Panel 2: "Keep scrolling for skills, work and projects  ↓"

#### Panel 1 / Hero (`#main`)
Vertical, padding 24/160/72/160, content centred vertically.
**README card** (1120 wide): radius 18, bg `--panel`, 1px `--line`, shadow
`0 16px 40px rgba(0,0,0,.3)`, overflow hidden.
- File bar: padding 11 × 20, bg `--panel-2`, bottom border. Left: 8px blue dot +
  `README.md` (Mono/Label). Right: `main · HEAD · updated 2 days ago` (Mono/Small `--dim`).
- Body: horizontal, padding 48, gap 48, centred.
  - Left (fill), gap 22: Availability Badge · **H1** "Samyak builds fast web apps and
    dependable backends." (Space Grotesk 700 **54px**, Display/H1 metrics) · Designation
    row ("Junior Full-Stack Developer" Body/Strong · 4px dot · "Kathmandu, Nepal"
    Body/Default `--dim`) · intro (Body/Large `--dim`) · Actions (gap 12): Primary
    "Download CV" (icon) + Secondary "View projects".
  - Right: **HistoryTerminal** 470 wide.
- No stats in the hero.

#### Panel 2 / Terminal (`#terminal`)
Vertical, padding 24/160/56/160, gap 20, centred vertically.
- SectionHead: "Use the terminal" + BranchTag green `shell` (no intro line).
- Layout (horizontal, gap 24): **InteractiveTerminal** (fill, 503 tall) +
  **ShortcutsCard** (340 × 503, scrolls inside).
- Hints row (gap 8): "New here? Try" (Body/Small `--dim`) + HintChips:
  `goto projects`, `download cv`, `open heli`, `goto contact`, `switch-theme`, `help`.

### 2. Activity graph — "Recent work" (`#work`)
Vertical, padding 0/160/40/160, gap 10.
- Caption (Body/Small `--dim`): "Six projects in the order I built them, oldest on the
  left. Hover a dot to see its command, click to open it."
- **CommitGraph horizontal**, 1120 × 240:
  - Main line y=110 from x=16 to 1100, 2px `#30363D`
  - Grey commits (r5, fill `--bg`, 2px `--dim`) at x = 30, 195, 365, 535, 705, 875, 1040
  - HEAD at x=1100: 7px green dot + 16px ring (green @35%), label "HEAD" below (Mono/Small)
  - 6 branches, each leaves main at cx−58, curves to the lane, returns at cx+58
    (path `M cx-58 110 C cx-36 110 cx-30 lane cx lane C cx+30 lane cx+36 110 cx+58 110`,
    2px project colour, 3.5px merge dots at both ends)

| Order | Project | cx | Lane (y) | Label | Colour |
|---|---|---|---|---|---|
| 1 | Travelease (2024) | 110 | up 50 | above | `#EC4899` |
| 2 | Scan review (2024) | 280 | down 172 | below | `#14B8A6` |
| 3 | Voice inventory (2025) | 450 | up 50 | above | `#10B981` |
| 4 | VPS backups (2025) | 620 | down 172 | below | `#06B6D4` |
| 5 | MHN website (2025) | 790 | up 50 | above | `#8B5CF6` |
| 6 | Heli booking (2026) | 960 | down 172 | below | `#3B82F6` |

  Each project node is a **CommitDot** (hover tooltip with `/open <slug>`).

### 3. Stack slider
Full bleed, bg `--panel`, top/bottom 1px `--line`, padding 28 × 0, gap 14.
Two rows (46px tall) of **StackChips** (bg `--panel-2`, gap 12), duplicated for a
seamless loop. 160px fades at both edges (`--panel` → transparent).
- Row 1 (moves →): TypeScript, React, Next.js, NestJS, Node.js, PostgreSQL, Prisma,
  Tailwind CSS, Docker, Git, GitHub, Ubuntu
- Row 2 (moves ←): Python, FastAPI, Redis, TypeORM, Nginx, Cloudflare, Figma,
  JavaScript, Docker, PostgreSQL, Next.js, NestJS

### 4. Skills (`#skills`)
Section padding 112/160/0/160, gap 32. SectionHead "Skills" + violet `skills` + intro.
2 × 2 grid (gap 20) of group cards (padding 24, radius 18, `--panel`, gap 12):
title H3 · description Body/Small `--dim` · StackChips wrap (gap 10, padding-top 6).

### 5. Experience (`#experience`)
Padding 112/160/0/160, gap 32, **Glow right** behind. SectionHead "Experience" +
green `experience` + intro. Layout gap 40: Timeline (720, 3 TimelineItems, green) +
CV card (360, padding 24, radius 18, gap 14: "The full picture" H3, text, Secondary
"Download CV (PDF)" full width with icon, "Updated October 2026 · 180 KB" Mono/Small).

### 6. Projects (`#projects`)
Padding 112/160/0/160, gap 32. Head row: SectionHead "Selected projects" + blue
`feature/projects` + intro (fill) and Secondary "View all 12 projects" (bottom aligned).
Grid (gap 18), cards stretch to the tallest in a row:

| Row | Left | Right |
|---|---|---|
| 1 | heli **776** (cover 300) | mhn **326** (cover 220) |
| 2 | voice **551** (cover 260) | backup **551** (cover 260) |
| 3 | travel **326** (cover 220) | lung **776** (cover 300) |

Use `ProjectCard layout="feature"`.

### 7. Education (`#education`)
Padding 112/160/0/160, gap 32. SectionHead "Education and learning" + violet
`education` + intro. Layout gap 40: Education timeline (fill, 2 TimelineItems
**violet**) + **Activities** box (400, padding 20/24/8/24, radius 16): "Activities and
roles" (H4) + "What I do outside work and class." + 3 ActivityRows.

### 8. Services (`#services`)
Padding 112/160/0/160, gap 32. SectionHead "How I can help" + blue `services` + intro.
3 equal cards, gap 20.

### 9. CV (`#cv`)
Padding 112/160/0/160. Band: padding 48, radius 24, gap 48, `--panel`, 1px `--line`.
Left (fill, gap 16): H2 "Get my CV" · Body/Large · Primary "Download PDF" (icon) + Ghost
"View it online". Right: terminal 480 wide (Mono/Code):
`$ download cv --format pdf` / `→ preparing samyak-cv.pdf` / `✓ saved · 2 pages · 180 KB` / `$ █`.

### 10. Contact (`#contact`)
Padding 112/160/**120**/160, gap 32, **Glow right** behind. SectionHead "Let's work
together" + green `contact` + intro. Layout gap 24:
- Contact card (380, padding 24, radius 18, gap 18): 56px avatar + name (H3) + title;
  4 ContactRows (Email, Phone, Based in, Website); divider; "Find me online" (H4);
  social logos (GitHub, LinkedIn, X, Instagram, WhatsApp; gap 10); Availability Badge.
- PR form (fill, radius 18, overflow hidden): head (padding 14 × 20, bg `--panel-2`):
  BranchTag green `contact/your-message` · "wants to merge into" · BranchTag blue `main`.
  Fields (padding 24, gap 16): row [Your name | Assignee (your email)], Title,
  Description (textarea 140), actions: Primary "Submit PR" + "Runs a few quick checks,
  then sends." (Body/Small `--dim`).

### 11. Footer
Padding 64/160/40/160, gap 40, top border. Row gap 64: brand column (fill: `samyak@dev`
H3 + one-line description, 320 max) · Pages · Projects · Elsewhere (each H4 + links
Body/Small `--dim`, gap 10). Bottom row: "© 2026 Samyak. Designed and built by me." +
"Back to top ↑" (Body/Caption `--dim`).

### Fixed / floating
- SiteHeader (top), BackToTop (bottom-right 24), CustomCursor.

---

# `/` Home — mobile (390)

Root vertical, padding-top 56. Margin 20. No sideways intro.

| Section | Layout |
|---|---|
| Hero | padding 20/20/12/20. README card 350, radius 16: file bar (`README.md` · `main · HEAD`), body padding 24/20/22/20, gap 18: badge, H1 (Mobile/Display 38), designation (two lines), intro (Mobile/Lead), two **full-width** buttons (gap 10), HistoryTerminal (350, shorter) |
| Terminal | padding 48/20/0/20, gap 16: SectionHead (Mobile/H2), InteractiveTerminal 350 (6 slash commands, see interactions), Hints row wraps (gap 8) |
| (spacer 24) | |
| Activity graph | caption + **vertical CommitGraph** (see below) |
| (spacer 24) | |
| Stack slider | 2 rows × 6 chips, padding 21 × 0 |
| Skills | padding 72/20/0/20, gap 20; 4 stacked group cards (padding 18) |
| Experience | 3 TimelineItem **compact** + CV card; Glow 520 × 520 |
| Projects | SectionHead + intro + **ProjectCarousel** (cards 320 wide, gap 16, swipe, pagination 6 dots 8px, gap 8) + "View all 12 projects" (full width) |
| Education | 2 compact violet timeline items + Activities box |
| Services | 3 stacked cards (padding 18) |
| CV | band padding 22, gap 14: H2, text, mini terminal, full-width Download PDF |
| Contact | padding bottom 96; contact card (3 rows: email, phone, location) + socials; PR form stacked (Name, Email, Title, Description 120) + full-width Submit PR; Glow |
| Footer | padding 40/20/96/20, 2 link columns (Pages, Elsewhere) |

**Vertical CommitGraph (mobile):** list, newest first: HEAD · main (ring), Heli booking,
MHN website, VPS backups, Voice inventory, Scan review, Travelease. Each row 56 tall:
52px rail (2px line + branch curve to a 12px dot in the project colour) + name
(Body/Strong) + year (Mono/Small) + command chip (`/open heli`, bg `--code-bg`, radius 6,
padding 4 × 8). Tap → project. (The latest Figma version was edited by hand: the line is
coloured per segment; follow the frame.)

Mobile header + Back to Top (bottom/right 16). **Note:** in the latest Mobile / Home
frame these two are not set as fixed — see `open-questions.md`.

---

# `/projects` — desktop

- Page head: padding 72/160/32/160, gap 16. Breadcrumb `~/ home / projects`
  (Mono/Label; `home` in `--blue-t`) · **H1 "All projects"** (Display/H1) · intro
  (Body/Large `--dim`, 640).
- Toolbar: padding 0/160/32/160, gap 16. TerminalPrompt (full width, placeholder
  "filter by name or tool, e.g. nestjs") · Filters row: FilterChips All 12 (selected),
  Web apps 6, Backend and APIs 2, DevOps 1, AI and voice 1, UI design 2 · spacer ·
  "Sort: newest first" (Body/Small `--dim`).
- Grid: 3 columns (360 each), column gap 20, row gap 24, padding-bottom 96.
  `ProjectCard layout="grid"`, 12 cards, order in `content.md`.
- Footer (same as Home). Header: `feature/projects` tab active.

# `/projects` — mobile
Page head padding 32/20/20/20 (H1 Mobile/Display), toolbar (prompt 350, **filter chips
scroll horizontally**), list of 12 cards (gap 16), footer.

---

# `/projects/[slug]` — desktop (template from "Project / Helicopter booking")

Content: padding 40/160/96/160, gap 56.
1. **Room bar**: breadcrumb `~/ projects / heli-booking` · spacer · Ghost "← Previous" ·
   Ghost "Next →" · Secondary "Close  (Esc)".
2. **Intro** (gap 56): left (fill, gap 18): BranchTag · H1 (Display/H1, 640 max) · lead
   (Body/Large, 600) · Primary "View live demo" + Secondary "Read the code on GitHub".
   Right: Project facts card (380, radius 16, padding 8 × 22): rows Role, Timeline,
   Team, Status (label Body/Small `--dim`, value Body/Strong, row padding 12, bottom
   border) + Stack row (5 logo slots 30px).
3. **Cover image** 1120 × 600, radius 20, 1px border.
4. **Story**: 3 columns gap 40 — "The problem", "What I built", "What I learned"
   (H3 + Body/Default `--dim`).
5. **Gallery**: H2 "Screens" + 2 images 540 × 304 (radius 16) with captions.
6. **How a request moves** panel (padding 18, radius 16): title H4, description, diagram
   1080 × 220: three boxes 280 × 120 (radius 14, `--panel-2`, 1.5px `--line`) at x 10,
   400, 790 — React frontend / NestJS API / PostgreSQL, arrows with labels "HTTPS + JWT",
   "JSON", "SQL", "rows" and moving packet dots (blue → , green ←).
7. **Outcome**: H2 + 4 stat boxes (padding 22, radius 16) + note "Sample figures…".
8. **Next project**: row (padding 20, radius 18): 200 × 112 thumb + "Next project" /
   title + Secondary "Open room →".

Removed on purpose: "Who can do what" table and "Dispatch board".

# `/projects/[slug]` — mobile
Content padding 20/20/96/20, gap 36: room bar (breadcrumb + Close), intro (H1 34px,
full-width buttons), cover 350 × 200, facts card, 3 story blocks, gallery (**swipe**,
310 × 175 images), vertical request-flow (3 stacked boxes with "HTTPS + JWT ↓", "SQL ↓"),
outcome 2 × 2, next project card.

---

# Responsive behaviour (summary)

| Feature | Desktop | Mobile |
|---|---|---|
| Intro | Hero + terminal side by side, pinned sideways scroll | Stacked, no sideways move |
| Shortcuts card | Shown | Hidden |
| Commit graph | Horizontal, hover tooltips | Vertical, commands inline, tap |
| Home projects | 3-row varied grid | Swipe carousel + dots |
| Projects page | 3-column grid | 1 column, chips swipe |
| Room gallery | 2 columns | Swipe |
| Buttons | Inline | Full width, ≥ 44px tall |
| Header | Tabs + command + CV + theme | Brand + terminal + menu |
| Cursor | Custom | Native (hidden) |
| Light/dark | Both | Both |

**Tablet (768–1199): not in Figma.** Suggested: desktop structure with side margin 40,
intro stacked (no sideways), project grids 2 columns, shortcuts card below the terminal.
Confirm before building.
