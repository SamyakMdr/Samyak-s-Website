# Samyak's Website: build docs

Everything needed to build the portfolio in **Next.js** from the Figma file
**"Samyak's Website"** (Website folder):
https://www.figma.com/design/9xosKxYBtgMeiTSAFT0qet

All values in these docs were read directly from the Figma file (variables, text
styles, effect styles, components and frames). Where Figma does not define
something, it is listed in `open-questions.md` instead of being guessed.

## Read in this order

| # | File | What it covers |
|---|------|----------------|
| 1 | `instructions.md` | Step-by-step build guide: setup, folder structure, build order, QA checklist |
| 2 | `design-tokens.md` | Colours (dark + light), typography, spacing, radius, borders, shadows, motion; ready-to-paste CSS |
| 3 | `components.md` | Every reusable component: props, variants, states, sizes |
| 4 | `pages-and-layout.md` | Routes, every page section by section, desktop (1440) and mobile (390) layouts |
| 5 | `interactions.md` | Terminal commands, keyboard shortcuts, sideways intro, slider, graph, cursor, theme, menu, link map |
| 6 | `content.md` | All copy and data (projects, experience, education, skills, contact…) as typed data |
| 7 | `assets.md` | Images, icons (SVG source), brand logo slots, fonts, how to export from Figma |
| 8 | `moodboard.md` | Design intent: the ideas to protect while building |
| 9 | `seo-accessibility.md` | Titles, meta, headings, structured data, alt text, a11y rules |
| 10 | `open-questions.md` | Gaps, placeholders and decisions still to make |

## Figma file map

| Figma page | Use it for |
|---|---|
| Moodboard | Design intent (`moodboard.md`) |
| Components | Component specs and the live tokens board (`components.md`, `design-tokens.md`) |
| Assets | The 15 dummy JPG images (`assets.md`) |
| Website | All screens to build (`pages-and-layout.md`) plus behaviour notes |
| Archive v1 | Old version. **Do not build.** |

## Stack assumed by these docs

- Next.js (App Router) + TypeScript
- Tailwind CSS (tokens are plain CSS variables, so the docs also work with CSS Modules)
- `next/font` for self-hosted fonts, `next/image` for images
- Optional: GSAP + ScrollTrigger (or Framer Motion) for the pinned sideways intro

If you choose a different stack, only `instructions.md` sections 1–2 change.
