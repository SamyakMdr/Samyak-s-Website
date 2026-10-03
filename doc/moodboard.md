# Moodboard: design intent

Source: Figma page **Moodboard** (rebuilt from the final design). Use this file to make
judgement calls the specs don't cover. If an implementation choice fights these ideas,
the ideas win.

## One-line summary
A developer portfolio that feels like a workspace. The **README** is the welcome, the
**terminal** is the remote control, **git** is the map, and **colour only shows up where
you can interact**.

## Keywords
README first screen · A terminal you can type in · Git as the map · Sideways intro, then
straight down · Quiet buttons · Colour on interaction · Real images, not stock ·
Off-white light mode · Mobile first-class

## The design, in pieces (protect these)

| Idea | What it means in the build |
|---|---|
| README hero | The first screen is a file you'd open in an editor: `README.md` file bar, intro on the left, real shell history on the right. No big stats, no photo. |
| Terminal you can type in | Type `/` for commands. Results print above the input like a real CLI. Shortcuts card beside it at the same height. |
| Git as the map | Six projects as short branches off `main`, oldest → newest. Hover shows the command; click opens it. Sections are branches (`feature/projects`), contact is a pull request. |
| Two-way stack slider | Logos drift in opposite directions and swap as the page scrolls past. |
| Experience as commits, with a glow | Green timeline for work, violet for education. A soft violet → pink light comes in from the right. |
| Image-led project cards | Wide and narrow cards in alternating rows, each with a real cover image. |
| Off-white light mode | Same layout and components on a soft `#EFEFEA`, never bright white. Terminals stay dark. |
| Mobile, one column | Terminal under the hero, graph turns vertical, commands shown inline, projects as a swipe carousel. |

## Colour
- **Dark (default):** Midnight `#0D1117` background, Panel `#161B22`, Panel 2 `#1C2330`,
  Line `#30363D`, Text `#E6EDF3`, Muted `#8B949E`.
- **Light:** Off-white `#EFEFEA`, Panel `#F8F8F5`, Panel 2 `#E7E7E1`, Line `#D5D5CC`,
  Ink `#16191D`, Muted `#565B63`.
- **Accents:** Electric blue `#3B82F6` (primary, focus), Emerald `#10B981` (prompt,
  success, experience), Violet `#8B5CF6` (education, glow), Pink `#EC4899` (glow,
  Travelease), Cyan `#06B6D4` (backups), Teal `#14B8A6` (scan review).
- **Glow:** violet → pink radial light from the right edge, behind content.

## Type
- **Space Grotesk** — headings and numbers (tight negative tracking)
- **IBM Plex Sans** — reading, buttons, forms
- **IBM Plex Mono** — terminal, branch names, code, commit hashes
- **Noto Sans Devanagari** — Nepali text (e.g. `चिनी २ केजी थप्नुहोस्`)

## Motion and behaviour
- **Sideways intro:** the first scroll slides the hero left and brings the terminal in
  from the right; then the page scrolls down normally.
- **Stack slider:** two rows drift in opposite directions and swap when you pass the
  middle of the screen; pauses on hover.
- **Commit graph:** dots grow and show their command on hover; click opens the room.
- **Cursor and glow:** a ring cursor that becomes "Open" over cards; soft glows behind
  Experience and Contact.
- One orchestrated motion moment (the intro) beats many small effects. No fade-in on
  every section.

## Principles
1. **Git is the map.** Sections are branches, projects are feature branches, contact is
   a pull request.
2. **Typing is optional.** Every command also has a normal link or button.
3. **Quiet until used.** Solid buttons, plain copy, colour only where you can click,
   hover or focus.
4. **Humble and searchable.** Plain words, one H1 per page, clear titles and alt text.

## Things to avoid (from the review rounds)
- Glowing gradient "vibe-coded" buttons (removed in v2)
- Popup command palette (removed; the terminal is inline)
- Stats in the hero (removed)
- Bright white light mode (replaced by off-white)
- Fake brand logos drawn from shapes (use official SVGs)
- Boastful copy ("passionate", "rockstar", "10x")
