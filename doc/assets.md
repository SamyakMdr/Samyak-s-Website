# Assets

Everything visual that the build needs, where it lives in Figma, and the files included
in this package (`assets/`). Copy `assets/` into your Next.js `public/` folder:

```
public/
  images/projects/cover-<slug>.webp    (one cover per project)
  images/rooms/<slug>/shot-{1,2}.webp  (two room screenshots per project)
  images/people/samyak-portrait.jpg           (avatar)
  icons/*.svg                          (UI icons, or inline them as React components)
  cv/samyak-cv.pdf                     (add the real CV)
  og/og-default.png                    (add: social share image, 1200 × 630)
```

---

## 1. Images

Real screenshots, exported as WebP (quality 82) at their original size, about 1920 × 1080.
`<slug>` is the project slug in `content/projects.ts`.

| File                           | Ratio | Used on                                             |
| ------------------------------ | ----- | --------------------------------------------------- |
| projects/cover-<slug>.webp     | 16:9  | Project cards, room cover, mobile gallery, terminal |
| rooms/<slug>/shot-1.webp       | 16:9  | Room gallery, first screenshot                      |
| rooms/<slug>/shot-2.webp       | 16:9  | Room gallery, second screenshot                     |
| people/samyak-portrait.jpg     | 1:1   | Contact avatar (56 desktop / 48 mobile)             |

Alt text and captions live next to each path in `content/projects.ts`.

Display sizes in the design (use `next/image` with `sizes`):

- Feature card cover: 748 × 300 (wide), 523 × 260 (half), 298 × 220 (narrow); mobile 292 × ~190
- Grid card cover: 360 × 208 (full bleed)
- Room cover: 1120 × 600 (mobile 350 × 200)
- Room gallery: 540 × 304 (mobile 310 × 175)
- Terminal rich-output thumb: 72 × 42 · Next-project thumb: 200 × 112

Recommended real-asset export: 2× the display size, WebP/AVIF via `next/image`,
16:10 or 16:9 screenshots.

If you prefer to export from Figma instead of using the included files: select the
`img/<name>` rectangle on the Assets page → Export → JPG 2×.

---

## 2. Icons (SVG, included in `assets/icons/`)

All icons use `currentColor` so they inherit the text colour.

| File                                                 | Size in design      | Where                                                |
| ---------------------------------------------------- | ------------------- | ---------------------------------------------------- |
| git-branch.svg                                       | 12–18               | Branch Tag, Nav Tab, mobile menu rows                |
| arrow-right.svg                                      | 16                  | "Open room →"                                        |
| arrow-up.svg                                         | 20                  | Back to Top                                          |
| download.svg                                         | 16                  | Download CV buttons                                  |
| sun.svg / moon.svg                                   | 16                  | Theme toggle (sun shown in dark mode, moon in light) |
| mouse.svg                                            | 18 × 26             | Scroll cue under the intro panels                    |
| mail.svg, phone.svg, location.svg, globe.svg         | 18 in a 40px tile   | Contact Rows                                         |
| service-web.svg, service-api.svg, service-server.svg | 22 in a 44px tile   | Services                                             |
| menu.svg, close.svg, terminal.svg                    | 18 in a 40px button | Mobile header and menu                               |
| graduation.svg                                       | 22                  | Education Card (not used on current pages)           |

Text glyphs used as icons (keep as text): `❯` prompt, `$`, `✻`, `✓`, `✗`, `→`, `↓`, `↵`, `↑`.

---

## 3. Brand logo slots

Figma: **Components → 08 Brand logo slots** (`Logo/<Name>`, 40 × 40, radius 10).
Currently a coloured tile with a monogram. **Replace each with the official logo SVG**
from the brand's press/brand page (or the Simple Icons project). Follow each brand's
usage guidelines. Logos are used as-is, not redrawn.

Suggested component: `<TechLogo name="React" size={32} />` that renders
`/logos/<slug>.svg`, falling back to the monogram tile until the file exists.

| Name         | Monogram | Tile colour | Monogram colour | Used in                 |
| ------------ | -------- | ----------- | --------------- | ----------------------- |
| TypeScript   | TS       | #3178C6     | #FFFFFF         | stack, skills, cards    |
| JavaScript   | JS       | #F7DF1E     | #1B1B1B         | skills                  |
| React        | Re       | #149ECA     | #FFFFFF         | stack, skills, cards    |
| Next.js      | N        | #111111     | #FFFFFF         | stack, skills, cards    |
| NestJS       | Ne       | #E0234E     | #FFFFFF         | stack, skills, cards    |
| Node.js      | No       | #5FA04E     | #FFFFFF         | stack, skills, cards    |
| PostgreSQL   | Pg       | #4169E1     | #FFFFFF         | stack, skills, cards    |
| TypeORM      | Or       | #FE0803     | #FFFFFF         | slider, skills          |
| Prisma       | Pr       | #2D3748     | #FFFFFF         | slider, skills, cards   |
| Tailwind CSS | Tw       | #06B6D4     | #FFFFFF         | slider, skills, cards   |
| Docker       | Dk       | #2496ED     | #FFFFFF         | slider, skills, cards   |
| Ubuntu       | Ub       | #E95420     | #FFFFFF         | slider, skills, cards   |
| Git          | Gi       | #F05032     | #FFFFFF         | slider, skills          |
| GitHub       | GH       | #181717     | #FFFFFF         | slider, skills, socials |
| Figma        | Fi       | #F24E1E     | #FFFFFF         | slider, skills, cards   |
| Python       | Py       | #3776AB     | #FFD43B         | slider, skills, cards   |
| FastAPI      | Fa       | #009688     | #FFFFFF         | slider, skills, cards   |
| Cloudflare   | Cf       | #F38020     | #FFFFFF         | slider, skills, cards   |
| Nginx        | Nx       | #009639     | #FFFFFF         | slider, skills          |
| Redis        | Rd       | #DC382D     | #FFFFFF         | slider, skills, cards   |
| LinkedIn     | in       | #0A66C2     | #FFFFFF         | socials                 |
| X            | X        | #000000     | #FFFFFF         | socials                 |
| Instagram    | Ig       | #E4405F     | #FFFFFF         | socials                 |
| WhatsApp     | Wa       | #25D366     | #FFFFFF         | socials                 |

Tile: 1px inner border white @ 12%. Sizes used: 40 (slots, socials), 32 (stack chip),
30 (room facts), 28 (mobile facts), 26 (card stacks, overlapping −6 with 2px ring), 24 (mobile cards).

Organisation logos (Activities): 44px tile, radius 12 — add each organisation's logo.

---

## 4. Fonts

| Family               | Weights  | Source                                                    |
| -------------------- | -------- | --------------------------------------------------------- |
| Space Grotesk        | 500, 700 | Google Fonts via `next/font/google`                       |
| IBM Plex Sans        | 400, 600 | Google Fonts via `next/font/google`                       |
| IBM Plex Mono        | 400, 500 | Google Fonts via `next/font/google`                       |
| Noto Sans Devanagari | 600      | Google Fonts via `next/font/google` (subset `devanagari`) |

Use `display: "swap"` and expose CSS variables (`--font-display`, `--font-sans`,
`--font-mono`, `--font-deva`).

---

## 5. Other files to add

- `public/cv/samyak-cv.pdf` — the real CV (design says 2 pages, ~180 KB)
- `public/favicon.ico` + `app/icon.svg` — not designed (suggest a `>_` mark in `--green`)
- `public/og/og-default.png` (1200 × 630) — not designed (suggest the README hero crop)
- `public/logos/*.svg` — official brand logos (section 3)
