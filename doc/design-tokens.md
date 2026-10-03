# Design tokens

Source: Figma variable collections **Theme** (modes: Dark, Light) and **Layout**
(mode: Value), 18 local text styles and 3 effect styles. Figma already stores the
CSS variable names (WEB code syntax), so use them exactly.

Theme switching: put `data-theme="dark"` or `data-theme="light"` on `<html>`.
**Dark is the default.** Respect `prefers-color-scheme` only when the visitor has
not chosen yet.

---

## 1. Colour tokens

| Figma variable | CSS variable | Dark | Light | Used for |
|---|---|---|---|---|
| color/bg | `--bg` | `#0D1117` | `#EFEFEA` | Page background |
| color/surface | `--panel` | `#161B22` | `#F8F8F5` | Cards, header, panels |
| color/surface-2 | `--panel-2` | `#1C2330` | `#E7E7E1` | File bars, chips, inner panels |
| color/surface-hover | `--panel-hover` | `#21283A` | `#DEDED7` | Secondary button hover |
| color/border | `--line` | `#30363D` | `#D5D5CC` | All 1px borders, dividers |
| color/text | `--fg` | `#E6EDF3` | `#16191D` | Main text |
| color/text-muted | `--dim` | `#8B949E` | `#565B63` | Secondary text |
| color/code-bg | `--code-bg` | `#010409` | `#0D1117` | Terminal background |
| color/code-text | `--code-fg` | `#E6EDF3` | `#E6EDF3` | Terminal text |
| color/accent/blue | `--blue` | `#3B82F6` | `#3B82F6` | Primary button, focus, active tab |
| color/accent/blue-text | `--blue-t` | `#60A5FA` | `#1D4ED8` | Blue text/links |
| color/accent/blue-hover | `--blue-hover` | `#2563EB` | `#2563EB` | Primary hover |
| color/accent/blue-pressed | `--blue-pressed` | `#1D4ED8` | `#1E40AF` | Primary pressed |
| color/accent/green | `--green` | `#10B981` | `#10B981` | Prompt, cursor block, experience |
| color/accent/green-text | `--green-t` | `#34D399` | `#047857` | Green text (`$`, `❯`, hashes) |
| color/accent/violet | `--violet` | `#8B5CF6` | `#8B5CF6` | Education, glow |
| color/accent/violet-text | `--violet-t` | `#A78BFA` | `#6D28D9` | Violet text |
| color/status/warn | `--warn` | `#FBBF24` | `#D97706` | Commit hashes, pending |
| color/status/bad | `--bad` | `#F87171` | `#DC2626` | Errors |
| color/focus-ring | `--focus` | `#60A5FA` | `#2563EB` | 2px focus ring |
| color/on-accent | `--on-accent` | `#FFFFFF` | `#FFFFFF` | Text on blue |

### Project colours (same in both modes)

| Variable | CSS | Value | Project |
|---|---|---|---|
| color/project/heli | `--p-heli` | `#3B82F6` | Helicopter booking |
| color/project/mhn | `--p-mhn` | `#8B5CF6` | Mountain Helicopters Nepal |
| color/project/voice | `--p-voice` | `#10B981` | Nepali voice inventory |
| color/project/backup | `--p-backup` | `#06B6D4` | Offsite VPS backups |
| color/project/travel | `--p-travel` | `#EC4899` | Travelease |

### Colours used in Figma that are NOT variables (add them as tokens)

| Suggested CSS | Value | Where |
|---|---|---|
| `--p-scan` | `#14B8A6` | Scan review dot on the commit graph |
| `--win-red` / `--win-yellow` / `--win-green` | `#F87171` / `#FBBF24` / `#34D399` (approx.) | Terminal window dots |
| Glow gradient | `#8B5CF6` (a .42) → `#EC4899` (a .16) → transparent | Glow / Right |

### Rule: terminals stay dark
Terminal windows (`History terminal`, `Interactive terminal`, CV terminal) are forced to
**Dark mode inside Light pages**. Implement with `data-theme="dark"` on the terminal wrapper.

### Tinted capsules
Branch tags, active nav tab, availability badge, status pills use the tone colour at
reduced opacity:

| Element | Fill | Border |
|---|---|---|
| Branch Tag | tone @ **12%** | tone @ **55%** |
| Nav Tab (Active) | `--blue` @ 12% | `--blue` 100% |
| Availability Badge | `--green` @ 12% | `--green` @ 40% |
| Status Pill | status colour @ 16% | none |
| Selected terminal-menu row / command | `--blue` @ 14% | none |
| Icon tiles (services, education) | accent @ 16% | none |

Use `color-mix(in srgb, var(--blue) 12%, transparent)`.

---

## 2. Typography

Fonts: **Space Grotesk** (headings, numbers), **IBM Plex Sans** (body, buttons, forms),
**IBM Plex Mono** (terminal, branch names, code), **Noto Sans Devanagari** (Nepali text).

| Figma style | Family / weight | Size (px) | Line height | Letter spacing |
|---|---|---|---|---|
| Display/H1 | Space Grotesk 700 | 60 | 1.04 | -0.025em |
| Heading/H2 | Space Grotesk 700 | 38 | 1.12 | -0.015em |
| Heading/H3 | Space Grotesk 700 | 20 | 1.28 | -0.005em |
| Heading/H4 | Space Grotesk 500 | 16 | 1.30 | -0.002em |
| Display/Stat | Space Grotesk 700 | 36 | 1.00 | -0.015em |
| Body/Large | IBM Plex Sans 400 | 18 | 1.60 | 0 |
| Body/Default | IBM Plex Sans 400 | 16 | 1.60 | 0 |
| Body/Small | IBM Plex Sans 400 | 14 | 1.55 | 0 |
| Body/Caption | IBM Plex Sans 400 | 12.5 | 1.50 | 0 |
| Body/Strong | IBM Plex Sans 600 | 16 | 1.50 | 0 |
| Button/Label | IBM Plex Sans 600 | 15 | 1.00 | 0 |
| Button/Small | IBM Plex Sans 600 | 13 | 1.00 | 0 |
| Mono/Label | IBM Plex Mono 500 | 13 | 1.40 | 0 |
| Mono/Small | IBM Plex Mono 500 | 12 | 1.40 | 0 |
| Mono/Code | IBM Plex Mono 400 | 13.5 | 1.70 | 0 |
| Mobile/Display | Space Grotesk 700 | 38 | 1.08 | -0.02em |
| Mobile/H2 | Space Grotesk 700 | 28 | 1.15 | -0.01em |
| Mobile/Lead | IBM Plex Sans 400 | 16 | 1.58 | 0 |

Weights to load: Space Grotesk 500/700 · IBM Plex Sans 400/600 · IBM Plex Mono 400/500 ·
Noto Sans Devanagari 600.

Local overrides found on frames (not styles):
- Desktop hero H1 = **54px** (Display/H1 metrics otherwise)
- Mobile project-room H1 = **34px** (Mobile/Display metrics otherwise)
- Mobile timeline role = 18px (H3 metrics)

Responsive mapping: Display/H1 → Mobile/Display, Heading/H2 → Mobile/H2,
Body/Large → Mobile/Lead below the mobile breakpoint.

---

## 3. Spacing

Layout tokens (Figma `space/*`): `4, 8, 12, 16, 20, 24, 32, 48, 64, 84`.

Values actually used on screens:

| Use | Desktop | Mobile |
|---|---|---|
| Page side margin | **160** (content 1120) | **20** (content 350) |
| Header height | 56 | 56 |
| Page top padding (under fixed header) | 56 | 56 |
| Section top padding | **112** | **72** |
| Contact bottom padding | 120 | 96 |
| Section head → content gap | 32 | 20 |
| Section head: H2 → intro line | 12 | — |
| Card grid gap | 18 (home) / 20–24 (projects page) | 16 |
| Two-column gap | 40 (experience/education), 24 (contact, terminal) | stacked |
| Card padding | 24 | 18 |
| Project card inner padding | 14 (feature) / body 18 | 14 |
| Button padding | 12 × 18 (mobile 14 × 18, full width) | |
| Footer padding | 64 top / 40 bottom | 40 / 96 |

---

## 4. Radius

Tokens: `--radius-sm 8`, `--radius-md 12`, `--radius-lg 18`, `--radius-full 999`.

Also used (add as tokens): **6** (thumbs, menu rows), **10** (buttons, logo tiles,
icon buttons, inputs), **14** (terminal windows, mobile panels), **16** (cards, panels),
**20** (cover image in room), **24** (CV band).

---

## 5. Borders

- Default: `1px solid var(--line)`
- Focus: `outline: 2px solid var(--focus); outline-offset: 2px` (Figma: 2px stroke outside)
- Hint Chip: `1px dashed var(--line)` with dash 4 / gap 3
- Header: bottom border only
- Timeline rail: 2px `--line`; commit dot ring 3px (`--green` current / `--dim` older /
  `--violet` education)
- Terminal input box: `1px solid var(--green)` @ 60%
- Welcome box: `1px solid var(--violet)` @ 70%

---

## 6. Shadows and effects

| Figma effect style | CSS |
|---|---|
| Elevation/Card | `0 12px 32px rgba(0,0,0,.35)` |
| Glow/Blue | `0 6px 28px rgba(59,130,246,.45)` |
| Glow/Violet | `0 0 24px 2px rgba(139,92,246,.50)` |

Local effects used on frames:

| Element | CSS |
|---|---|
| README card | `0 16px 40px rgba(0,0,0,.30)` |
| Hover card glow (feature card) | `0 0 24px 2px rgba(139,92,246,.35)` + gradient border |
| Back to Top | `0 8px 20px rgba(0,0,0,.25)` |
| Commit tooltip | `0 8px 20px rgba(0,0,0,.40)` |
| Header | `backdrop-filter: blur(14px)`, background `--bg` @ 72% (mobile 80%) |
| Section glow | radial gradient + `filter: blur(60px)` (mobile 50px), light mode opacity .6 |

---

## 7. Motion tokens (from notes and component descriptions)

| Token | Value |
|---|---|
| Button / chip transitions | 150–200ms ease-out |
| Hover tooltip (commit dot) | 150ms ease-out |
| Page/link transition | 250ms dissolve |
| Sideways intro | scroll-scrubbed, ≈ one viewport of scroll for 1440px of travel |
| Terminal cursor blink | 1.05s, `steps(1)` |
| Cursor ring follow | 80ms easing |
| Stack slider | ≈ 30px/s per row |
| Reduced motion | disable slider, sideways intro, cursor, blink |

---

## 8. Breakpoints

Figma has **desktop 1440** and **mobile 390** only. Suggested (confirm in `open-questions.md`):

| Name | Width | Layout |
|---|---|---|
| mobile | < 768 | Mobile frames |
| tablet | 768–1199 | Desktop structure, side margin 40, grids 2 columns (not designed) |
| desktop | ≥ 1200 | Desktop frames, content max-width 1120 |

---

## 9. Ready-to-paste CSS

```css
/* app/globals.css */
:root, [data-theme="dark"] {
  --bg:#0D1117; --panel:#161B22; --panel-2:#1C2330; --panel-hover:#21283A;
  --line:#30363D; --fg:#E6EDF3; --dim:#8B949E;
  --code-bg:#010409; --code-fg:#E6EDF3;
  --blue:#3B82F6; --blue-t:#60A5FA; --blue-hover:#2563EB; --blue-pressed:#1D4ED8;
  --green:#10B981; --green-t:#34D399; --violet:#8B5CF6; --violet-t:#A78BFA;
  --warn:#FBBF24; --bad:#F87171; --focus:#60A5FA; --on-accent:#FFFFFF;
  --glow-opacity:1;
}
[data-theme="light"] {
  --bg:#EFEFEA; --panel:#F8F8F5; --panel-2:#E7E7E1; --panel-hover:#DEDED7;
  --line:#D5D5CC; --fg:#16191D; --dim:#565B63;
  --code-bg:#0D1117; --code-fg:#E6EDF3;
  --blue-t:#1D4ED8; --blue-pressed:#1E40AF;
  --green-t:#047857; --violet-t:#6D28D9;
  --warn:#D97706; --bad:#DC2626; --focus:#2563EB;
  --glow-opacity:.6;
}
:root {
  --p-heli:#3B82F6; --p-mhn:#8B5CF6; --p-voice:#10B981; --p-backup:#06B6D4;
  --p-travel:#EC4899; --p-scan:#14B8A6;
  --space-4:4px; --space-8:8px; --space-12:12px; --space-16:16px; --space-20:20px;
  --space-24:24px; --space-32:32px; --space-48:48px; --space-64:64px; --space-84:84px;
  --radius-xs:6px; --radius-sm:8px; --radius-btn:10px; --radius-md:12px; --radius-win:14px;
  --radius-card:16px; --radius-lg:18px; --radius-xl:20px; --radius-2xl:24px; --radius-full:999px;
  --shadow-card:0 12px 32px rgba(0,0,0,.35);
  --shadow-readme:0 16px 40px rgba(0,0,0,.30);
  --shadow-float:0 8px 20px rgba(0,0,0,.25);
  --glow-blue:0 6px 28px rgba(59,130,246,.45);
  --glow-violet:0 0 24px 2px rgba(139,92,246,.50);
  --page-x:160px; --section-top:112px; --content:1120px;
}
@media (max-width:767px){ :root{ --page-x:20px; --section-top:72px; } }
```

Tailwind (v4 `@theme` or v3 `theme.extend`): map `colors.bg = "var(--bg)"` etc. for every
variable above, and add font families `display` (Space Grotesk), `sans` (IBM Plex Sans),
`mono` (IBM Plex Mono), `deva` (Noto Sans Devanagari).
