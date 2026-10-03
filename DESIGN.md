# Design Context

## Product

Samyak Manandhar's portfolio is a personal website for presenting projects, writing, and contact information. The first screen should feel direct and handcrafted, with enough restraint that future case studies can become the focus.

## Visual Direction

- Palette: paper `#f7f4ef`, ink `#161616`, ember `#c94f32`, moss `#2c5f4a`, warm white `#fffaf2`, muted text `#68625a`.
- Typography: Georgia for expressive display headings, system sans for body and navigation.
- Shape: small 8px cards for portfolio objects, circular monogram for the brand mark, pill buttons for primary commands.
- Signature: a compact status card with a hard offset shadow, acting like a pinned note beside the large editorial hero.

## Runtime Mapping

The visual tokens are defined as CSS custom properties in `app/globals.css`. Component styling in the starter page consumes those variables directly.
