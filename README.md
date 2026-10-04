# Samyak's Portfolio

A Next.js portfolio site for Samyak Manandhar, built from the Figma file "Samyak's
Website" and the specs in [`doc/`](doc/README.md).

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The UI kit (tokens and every shared component) is at
`/dev/ui` in development.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route types, then `tsc --noEmit` |
| `npm run test:visual` | Playwright screenshots of every route at 1440 × 900 and 390 × 844, in both themes, saved to `test-results/screens/` |

## Where things live

```
app/
  (site)/            Home, /projects and /projects/[slug], with their sections
  actions/contact.ts Server Action behind the contact form
  dev/ui/            UI kit (development only)
components/          ui · layout · terminal · content · icons · providers
content/             All copy and data as typed files
lib/                 Command registry, scrolling, motion loaders, SEO helpers
public/              Images, CV, logos, social image
doc/                 Design specs the site was built from
```

Copy never lives in components: change text, projects, links and contact details in
`content/`. Placeholders are marked `TODO: real data`.

## Environment variables

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` sets the public origin;
the rest configure the contact form, which emails each message to
`CONTACT_TO_EMAIL` through Gmail SMTP (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) and sends
the visitor an automatic reply. Bots are stopped by Cloudflare Turnstile
(`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`), a honeypot field and rate
limits kept in Upstash Redis (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).
The reply's text is `contactEmails` in `content/contact.ts`.

## Files to add

- `public/cv/samyak-cv.pdf`: the CV. Until it exists, `download cv` in the terminal
  reports that the file is missing and the download buttons lead to a 404.
  Restart the server after adding it, since it is detected at startup.
- `public/logos/<slug>.svg`: official brand logos, already in place for every tool
  in `content/tech.ts`. To add a tool, add its entry there, put the SVG in
  `public/logos/` and set `logo: true`; without it the monogram tile is shown.
  A mark whose colour only suits one theme also gets a `<slug>-dark.svg` for dark
  surfaces (`darkLogo: true`).
