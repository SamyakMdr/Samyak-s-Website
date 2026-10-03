# Interactions and behaviour

Source: prototype links (93 reactions), the yellow notes beside the frames, the
"Terminal and hint states" board and component descriptions.

Golden rule from the moodboard: **typing is optional**. Every command also exists as a
normal link or button. Nothing breaks if the terminal is never used.

---

## 1. Terminal

### 1.1 Command registry (one shared list for terminal, hints and shortcuts)

| Command | Aliases | Action |
|---|---|---|
| `/projects` | `goto projects`, `git checkout projects`, `cd projects` | Go to `/projects`. `--type <web\|backend\|devops\|ai\|ui>` prints matching projects inline |
| `/open <slug>` | `open <slug>` | Go to `/projects/<slug>` (`heli`, `mhn`, `voice`, `backup`, `travelease`, `scan-review`, …) |
| `/cv` | `download cv` | Download `samyak-cv.pdf`, print `✓ samyak-cv.pdf · 180 KB` |
| `/experience` | `goto experience`, `git log` | Scroll to `#experience`; `git log` also prints the commit list |
| `/contact` | `goto contact` | Scroll to `#contact` |
| `goto home` | `cd ~`, `/home` | Scroll to top / go to `/` |
| `/theme` | `switch-theme` | Toggle light/dark |
| `/help` | `help`, `?` | Print every command and shortcut |
| `git branch` | | Print the sections as branches |
| `cat skills.json` | | Print the stack as JSON |
| `clear` | | Clear the output |

Slash menu (shown when the input starts with `/`), in this order:
`/projects` · `/open <name>` · `/cv` · `/experience` · `/contact` · `/theme` · `/help`.
Mobile list: `/projects`, `/open heli`, `/cv`, `/experience`, `/contact`, `/help`.

### 1.2 Keys inside the terminal
↑ ↓ move in the menu / history · Tab completes · ↵ runs · Esc clears / closes the menu.
Output: each command and its result is appended **just above the input**; older lines
scroll up. Keep history in `sessionStorage`.

### 1.3 States (Figma board "Terminal and hint states")
1. **Idle (first visit):** `samyak@dev:~$ █` + `type help, or try goto projects`
2. **Typing with a suggestion:** typed text + grey completion (`goto pro` + `jects`) +
   `Tab to complete · ↵ to run`
3. **Success:** `✓ opening ~/projects …`
4. **Not found, with a fix:** `✗ no page called projcts` + `did you mean goto projects ?`
5. **help:** lists `goto <page>`, `open <project>`, `download cv`, `switch-theme`
6. **download cv:** `✓ samyak-cv.pdf · 180 KB`

### 1.4 First-visit hint
Toast at bottom-left, once, a few seconds after the first load:
"Tip: this site has a terminal. Type `help` or press `Ctrl K`" + Ghost "Got it".
Dismiss on Got it, Esc, or any terminal use. Remember in `localStorage`.

### 1.5 Hint chips
Click fills the input with the command and runs it.

---

## 2. Keyboard shortcuts (desktop, anywhere on the page)

| Keys | Action |
|---|---|
| `/` | Focus the terminal (on Home it scrolls to `#terminal`) |
| `g` then `h` | Go home |
| `g` then `p` | Go to projects |
| `g` then `e` | Go to experience |
| `g` then `c` | Go to contact |
| `d` | Download CV |
| `t` | Switch theme |
| `?` | Show all shortcuts |
| `Ctrl/⌘ K` | Focus the terminal (no popup) |
| `Esc` | Close menu / clear input / close project room |

Ignore shortcuts while typing in an input/textarea (except Esc).
"Git commands work too" list on the card: `git log` (work history), `git branch` (list
every section), `git checkout projects` (go to projects), `cat skills.json` (my stack as JSON).

---

## 3. Sideways intro (desktop only)

1. Screen 1 = Hero panel. The first scroll down slides the track left; the terminal
   comes in from the right.
2. The intro is **pinned** while this happens: about one viewport of scrolling moves the
   track 1440px (100vw) to the left (GSAP ScrollTrigger `pin + scrub`, or CSS
   `position:sticky` + `translateX` driven by scroll progress).
3. When the terminal is fully in view, the pin releases and the page scrolls down normally.
4. Scrolling back up reverses it.
5. Progress dots show 1 of 2 / 2 of 2. Arrow keys (↓ →), Space and clicking the scroll
   cue do the same as the wheel; ↑ ← go back.
6. **Mobile, tablet and reduced motion:** no sideways move; the panels stack.
7. Both panels fit one 1440 × 900 screen (844px under the header).

---

## 4. Stack slider
Row 1 slides left→right, row 2 right→left, ≈ 30px/s, infinite (duplicate the list).
When the section scrolls past the middle of the viewport, both rows **swap direction**.
Pause on hover. Swipe to scroll by hand on mobile. Stop completely with reduced motion.

## 5. Commit graph
Desktop: hover a dot → it grows (14 → 18px, halo 28 → 40px) and shows the tooltip
`❯ /open <slug>` / "↵ or click to open" (150ms). Click → project room. Keyboard: dots
are focusable buttons; focus shows the same tooltip.
Mobile: no hover; command chip is always visible; tap the row.

## 6. Cards
Project cards: hover lifts 2px, border becomes the project colour, cursor turns into the
"Open" disc. Whole card is a link. Feature card in the hero row shows the gradient border
+ violet glow on hover.

## 7. Custom cursor (desktop pointer only)
Default ring + green dot; Link (over links/buttons); Card ("Open" over project cards);
Text (green caret inside terminals). Ring follows with 80ms easing. Disabled on touch
(`(pointer: coarse)`) and with `prefers-reduced-motion`.

## 8. Header
- Active nav tab = section in view (IntersectionObserver); `feature/projects` active on
  `/projects` and rooms.
- "Run a command": Home → scroll to and focus the terminal; other pages → go to `/`
  and focus it.
- Download CV → `/cv/samyak-cv.pdf` (or scroll to `#cv`).
- Theme toggle → saves to `localStorage`, sets `data-theme` before paint (inline script
  in `<head>` to avoid a flash).

## 9. Mobile menu
Menu button → full-screen menu slides in from the right (300ms ease-out). Close with X,
Esc or a link. Trap focus while open; lock body scroll. Terminal button in the header →
scroll to `#terminal` (other pages: go to `/#terminal`).

## 10. Mobile carousel (Home projects)
Horizontal scroll with `scroll-snap`, card width 320, gap 16, 6 pagination dots (active
dot follows the visible card). Swipe; dots are tappable.

## 11. Back to top
Hidden on the first screen, fades in after. Smooth scroll to top (instant with reduced
motion). On Home desktop it also returns the intro to the hero panel.

## 12. Contact form ("pull request")
Fields: Your name, Assignee (your email), Title, Description. Validation: required name,
valid email, title, description; error style = Input Field Error. Submit PR → short
"checks" sequence (validating fields, scanning for spam, sending) then success message.
Send via a Next.js Route Handler or Server Action (email service of your choice).

## 13. Prototype link map (source of truth for navigation)

| From | Element | To |
|---|---|---|
| Home | Hero "Download CV" / header CV | `#cv` |
| Home | Hero "View projects" | `#projects` |
| Home | Scroll cue / ↓ → Space | Sideways step to terminal |
| Home | Slash rows `/projects`, `/open heli`, `/cv`, `/experience`, `/contact` | `/projects`, `/projects/heli-booking`, `#cv`, `#experience`, `#contact` |
| Home | Hints `goto projects`, `download cv`, `open heli`, `goto contact` | `/projects`, `#cv`, room, `#contact` |
| Home | Commit dots | Heli → room; others → `/projects` (until their rooms exist) |
| Home | Feature cards | Heli → room; others → `/projects` |
| Home | "View all 12 projects" | `/projects` |
| Home | Tabs main / experience / feature/projects / contact | `#main`, `#experience`, `/projects`, `#contact` |
| Home | Keys P / D / C / `/` | `/projects`, `#cv`, `#contact`, terminal |
| Projects | Heli card | room |
| Projects / Room | Tab main, header command | `/` |
| Room | Close | Back |
| Room | Next project "Open room →" | `/projects` (should be the next project room) |
| Mobile | Menu button | Menu (slide in) |
| Mobile | Terminal button | `#terminal` |
| Mobile menu | Home / Experience / Projects / Contact / Download CV | `/`, `/#experience`, `/projects`, `/#contact`, CV |

## 14. Reduced motion
`@media (prefers-reduced-motion: reduce)`: no sideways intro (stack), no slider motion,
no cursor, no blink, instant scrolling, no card lift.
