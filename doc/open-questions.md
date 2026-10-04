# Open questions, gaps and placeholders

Things the Figma file does not define, or that are still placeholders. Decide or replace
these before (or while) building. Nothing below should be guessed silently.

## Decisions needed

| # | Topic | What Figma shows | Suggested default |
|---|---|---|---|
| 1 | Tablet layout (768–1199) | Not designed | Desktop structure, side margin 40, intro stacked, project grids 2 columns, shortcuts card below the terminal |
| 2 | Mobile Home header + Back to Top | Not set as fixed in the latest Mobile / Home frame (other mobile frames are fixed) | Keep them fixed like the other pages |
| 3 | Other 11 project rooms | Only Helicopter booking is designed | Reuse the room template with each project's data |
| 4 | Room "Next project" button | Links to `/projects` in the prototype | Link to the next project's room |
| 5 | Teal scan-review colour | `#14B8A6` used without a token | Add `--p-scan` |
| 6 | Extra radii 6/10/14/16/20/24 | Used without tokens | Add tokens (see design-tokens.md) |
| 7 | Hero H1 54px, mobile room H1 34px | Local overrides, no style | Add `Display/Hero` (54) and `Mobile/Room` (34) text styles |
| 8 | Contact form delivery | Decided | Server Action + Gmail SMTP, Cloudflare Turnstile, Upstash rate limits |
| 9 | Analytics | Not specified | Privacy-friendly (Plausible / Vercel Analytics) |
| 10 | Favicon and social image | Not designed | `>_` mark; README hero crop for OG |
| 11 | Scroll library | Not specified | GSAP ScrollTrigger for the pinned intro (desktop only) |
| 12 | Content source | Static | Typed TS files now; MDX or a CMS later for project rooms |

## Placeholders to replace with real content

- **Brand logos** (24 slots): official SVGs for each tool and social network
- **Organisation logos** in Activities (3)
- **All images**: 12 project covers, 2 room screenshots, portrait (dummy JPGs)
- **Personal details**: surname, location (Kathmandu, Nepal is assumed), email, phone,
  website, social URLs
- **Experience**: company names, cities, dates, summaries, commit messages
- **Education**: school/university names, cities, years, summaries
- **Activities**: organisation names, roles, dates
- **Projects 7–12** (chat app, inventory API, shop admin, portfolio CMS, weather, expenses)
  are example projects
- **Outcome figures** in the room (3 roles, 40+ endpoints, < 1 s, 0 sheets)
- **CV PDF** (`samyak-cv.pdf`, "Updated October 2026 · 180 KB")
- **Live demo / GitHub links** for each project
- **Filter counts** on `/projects` (computed from data once real)

## Known differences between frames (follow the latest)

- Mobile / Home was edited by hand after generation (vertical graph line colours,
  project carousel). The Light mobile frame was rebuilt from it — treat Mobile / Home
  (dark) as the source of truth.
- "Home / Terminal in view" is the end state of the intro animation, not a separate page.
- Archive v1 (old design, popup palette, RBAC table, dispatch board) is **not** to be built.
