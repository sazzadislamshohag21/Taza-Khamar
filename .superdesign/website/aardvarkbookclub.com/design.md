---
version: "superdesign-alpha"
name: "Bindery Pop"
description: "A candy-bright, illustration-forward maximalism built on a warm-yellow field, blob-shaped section geometry, an oversized rounded display face, and a hot-pink CTA rationed to one action per screen."
colors:
  background: "#FFD24A"
  surface: "#FD48F2"
  surface-alt: "#1CE8ED"
  text-primary: "#000000"
  text-on-dark: "#FFFFFF"
  accent: "#FF008C"
  accent-warm: "#F9A220"
  footer-bg: "#3B308F"
  pale-yellow: "#FAED8F"
  wine: "#670A2E"
typography:
  display-lg:
    fontFamily: "Champ"
    fontSize: "160px"
    fontWeight: 700
    lineHeight: "0.8"
    letterSpacing: "-1.6px"
  headline-md:
    fontFamily: "Champ"
    fontSize: "104px"
    fontWeight: 700
    lineHeight: "0.8"
    letterSpacing: "-1px"
  body-md:
    fontFamily: "Degular"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "1.2"
  label-md:
    fontFamily: "Champ"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: "0.88"
  accent-hand:
    fontFamily: "Hello Organichand Webfont"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "1.2"
spacing:
  base: "8px"
  gap: "16px"
  section-padding: "32px"
rounded:
  control: "8px"
  card: "24px"
  card-lg: "32px"
  pill: "50px"
  chip: "50px"
components:
  button-primary:
    background: "#FF008C"
    text-color: "#FFFFFF"
    radius: "8px"
    height: "56px"
    hover-transform: "matrix(1.03617, 0, 0, 1.06223, 0, 0)"
  button-nav-cta:
    background: "#FAED8F"
    text-color: "#000000"
    radius: "32px"
    height: "56px"
    hover-transform: "matrix(1.05117, 0, 0, 1.08804, 0, 0)"
  button-icon-round:
    background: "#000000"
    text-color: "#FAED8F"
    radius: "50%"
    height: "48px"
    hover-transform: "matrix(1.0445, 0, 0, 1.07657, 0, 0)"
  button-secondary:
    background: "#F9A220"
    text-color: "#000000"
    radius: "8px"
    height: "56px"
  card-media-panel:
    background: "#1CE8ED"
    radius: "32px"
    padding: "0px"
  card-book-tile:
    background: "transparent"
    radius: "0px"
    padding: "12px 0px"
  card-taxonomy-panel:
    background: "#FD48F2"
    radius: "32px"
    padding: "0px"
---
# Bindery Pop
Source: https://www.aardvarkbookclub.com/

## Overview
This is illustration-led maximalism: a flat-color, hand-drawn aesthetic built on undulating blob-shaped section dividers, oversized rounded-sans display type, and a saturated candy palette (marigold yellow, hot pink, cyan, violet). It reads as playful/editorial rather than corporate-SaaS — closer to a zine or a kids'-product unboxing than a typical dark-glass tech landing page. The dominant field is warm yellow (`#FFD24A`/`#FAED8F`), not white or black; color is not rationed thin here, it is the substance of the page, applied in large flat panels (pink, cyan, violet) that behave like construction-paper cutouts stacked with soft drop shadows. Photographic book-cover renders (3D-tilted hardcovers) are the only "real" imagery; everything else is vector blob-work, hand-lettered accents, and chunky rounded type.

## Composition
The first screen is left-heavy: a giant three-line rounded display headline stacked flush-left over a short body paragraph and a single hot-pink CTA pill, while the right two-thirds carries a large angled 3D book-cover illustration floating over layered yellow/orange blob shapes, with a small hand-lettered callout badge pinned near the book. Below the fold the rhythm alternates between full-bleed colored panels (cyan, pink, yellow) that each cap in a large rounded-rectangle radius, and white "content sits here" mid-tone sections carrying dense rounded display headings ("Our August books"-scale) with a carousel row of angled book covers beneath. A large single-color panel (pink) dedicated entirely to a stacked list of oversized category words is a deliberate genre-listing interlude — density over restraint, favoring one big typographic gesture per panel instead of a busy multi-column layout. The page closes on a deep-violet full-width footer band with app-store badges, social icons, and an email-capture field, then a slim black legal strip.

## Colors
`#FFD24A` (marigold) and its lighter twin `#FAED8F` (pale yellow) are the page's true background — they dominate the visible field (pixel field shows yellow-family hues at roughly 6–11% each, plus white sections at ~40%), acting as the connective tissue between illustrated panels. `#FFFFFF` white governs the mid-page content bands (declared area ~72%, though visually it reads as breathing room around denser colored blocks rather than the "mood" of the page). `#FD48F2` bright pink and `#1CE8ED` cyan are full-panel surface colors used for entire sections (the taxonomy panel, a media card), not tints — they behave as alternElanate page backgrounds, each panel capped with a large `32px`-class rounded corner. `#FF008C` hot pink is the rationed action color: it appears only on the primary CTA pills (hero, add-to-box) and nowhere else, so it always signals "press this." `#000000` is both the primary text ink on light panels and the fill for icon-button chips and one dark stat card. `#3B308F` violet is reserved for the footer only. `#670A2E` wine and `#F9A220` amber sit as minor accent/token colors (secondary nav button, category badge). Nothing is left neutral/gray — this system has no gray scale; contrast is built from hue and value swings between saturated flats, not from a desaturated ramp.

## Typography
Two families carry the entire system. **Champ**, a bold rounded-sans display face, is used at extreme sizes for every headline: `160px/700, lh 0.8, ls -1.6px` for the hero display line, `104px/700, lh 0.8` for mid-page section headlines, and `40px/700, lh 0.88` for card-level labels and pricing/category words — the same face simply steps down in size rather than switching weight. **Degular**, a semibold humanist sans, carries all body copy at `24px/600, lh 1.2` (hero paragraph) down to `20px/600` at typical reading density, in white on dark panels and black on light ones. A third face, **Hello Organichand Webfont**, is the signature accent: a script/hand-lettered face used sparingly for small callout notes (a shipping badge, a "Why [x]?" arc label) — it never carries body copy, only 2–6 word decorative asides, and its curved/arced placement (following a circle) is part of its character.

## Layout
Content is capped by a `1314px` max-width container. Section-to-section spacing is generous and irregular — panels are joined by wave/blob SVG transitions rather than hard-edged breaks, so there is no strict vertical grid; the spacing scale (`7px, 8px, 12px, 16px, 24px, 32px`) governs internal component gaps rather than macro rhythm. The book-carousel/category rows use a single-row horizontal arrangement (a scrolling-rail pattern) rather than a wrapping grid — measured row maps show groups like `[43/45 | 40/46 | 40]` percentage widths, i.e., an asymmetric row of unevenly-sized tiles (roughly 2 wide + 2-narrower + 1), and a simpler stacked pair `[100 | 50]` for two-item groupings elsewhere. The genre-listing panel is a single full-width stack of one word per line (not a grid at all) — `rows [100 | 100 | 100]` confirms each row spans the full container, reinforcing it as a typographic list, not a card grid. Corner radii scale by panel size: small chips/badges use `50px`-class pill rounding, mid cards use `16–24px`, and full-bleed color panels/hero illustration frames use `32px`, giving every surface a soft, blob-echoing corner regardless of size.

## Components
- **Navbar**: edge-to-edge square bar, full viewport width (0px insets), 106px tall, sticky, transparent background, 0px corner radius on all four corners (a flat full-width bar, not inset or capsule). Contains a logo lockup at left, then a 4-item horizontal text nav, then a filled pale-yellow rounded-rect CTA pill (`#FAED8F` bg, `#000000` text, `32px` radius, `56px` height) paired with a small circular black icon-button (`#000000` bg, `#FAED8F` icon, `50%` radius, `48px` height) immediately beside it, plus two circular social icon buttons at far right. No secondary outline button is present in the bar.
- **Hero primary CTA**: a solid hot-pink pill/rectangle beneath the hero paragraph — `#FF008C` fill, white text, `8px` radius (a slightly-rounded rectangle, not a full pill), `56px` height, paired with a small circular arrow-icon button of matching pink. This is the single most emphasized control on the first screen; the nav's pale-yellow and black-circle buttons are navbar utilities, not the hero primary.
- **Hero illustration panel**: one large angled 3D book-cover render occupying the right ~55% of the hero, layered over undulating yellow/orange blob shapes; a small circular hand-lettered badge is pinned near its spine.
- **Media/carousel card family (book tiles)**: appears in the "seasonal books" band and repeats lower on the page; arranged in an asymmetric single row (percentage widths `43/45 | 40/46 | 40`), transparent background, `0px` radius, `12px 0px` padding — each tile is a bare angled book-cover image with an optional small pill badge (e.g., an "edition" tag) overlaid near its top corner; no visible card chrome.
- **Full-panel media card**: one large rounded-rect panel (`#1CE8ED` cyan fill, `32px`-class radius) with a single centered angled book illustration covering a small fraction of the panel, floating in generous negative space — used as a standalone showcase unit, not a grid.
- **Taxonomy/category panel**: one full-bleed pink (`#FD48F2`) rounded panel containing a small label line followed by a stacked list of large Champ-face category words, each row spanning 100% width — a typographic list rather than a card grid.
- **Feature/expandable row group**: three stacked full-width rows (`rows [100|100|100]`), transparent background, each combining a heading, a small icon, an expandable disclosure affordance, and body text — an accordion-style FAQ or feature-explainer list.
- **Highlight/quote card**: dark (near-black) rounded card containing a small teal pill eyebrow, a large Champ headline, a short Degular body paragraph, and a hot-pink "add" CTA pill with arrow icon — paired beside a pale-yellow sticky-note-style panel of hand-set attribution text and small decorative sparkle glyphs.
- **Footer**: full-width `#3B308F` violet band with app-store/play-store badge buttons at left, circular social icons beneath them, an email-input field plus a small pink "Subscribe" pill-button pairing at right, and a 12-link legal/nav cluster; caps in a slim black bottom strip carrying copyright and credit text.

## Graphics & Effects
Two `canvas` elements are live-rendered surfaces (likely an interactive 3D/tilting book render in the hero and elsewhere) — substitute a static angled book-cover photo/illustration at matching scale and rotation when rebuilding. The dominant graphic device across the whole page is flat vector blob-shapes: layered, softly-undulating organic curves in tonal yellow/orange pairs forming the background terrain of the hero and section transitions — these are decorative full-bleed background shapes, not gradients, and should be built as layered SVG blobs, not CSS gradients (no gradient strings were captured; all sampled colors are flat fills). A single measured shadow, `rgb(255, 255, 255) 0px 0px 0px 4px`, is a white ring/outline effect — likely a focus or active-state halo around circular icon buttons or badges, not a drop shadow implying elevation. Small hand-drawn sparkle glyphs appear as decorative accents beside quote/highlight cards, reinforcing the illustrated, non-photographic texture of the system. No grain, noise, or photographic scrim layers are present — every surface is flat, clean vector color.

## Motion
Interactive elements scale up on hover via transform matrices rather than simple `scale()` calls — buttons grow roughly 3–8% on both axes (`matrix(1.03617,0,0,1.06223,0,0)` on the primary CTA, `matrix(1.0445,0,0,1.07657,0,0)` on icon buttons, `matrix(1.05117,0,0,1.08804,0,0)` on the nav CTA pill), each riding `transform 0.15s cubic-bezier(0.59, 1, 0.88, 1.01)` — a fast, slightly overshooting snap rather than a linear ease. A secondary `scale 0.15s cubic-bezier(0.4, 0, 0.2, 1)` and a plain `opacity 0.2s ease` handle simpler fades/presses. Translate/rotate/transform are grouped under the same 0.15s overshoot curve, implying floating illustration elements (the angled books, blobs) receive small idle rotation/translation drifts on the same timing family. A `spin` keyframe drives loading or decorative rotation. GSAP with ScrollTrigger and Lenis smooth-scrolling govern scroll-linked reveals and the eased scroll feel — expect section panels and carousel rows to animate in as they cross the viewport rather than appearing statically.

## Guardrails
- Never desaturate the palette toward gray or neutral — every surface is a flat saturated hue; there is no gray-scale structural color in this system.
- Never render the hero background as a single full-bleed gradient — it is a yellow flat-color field with layered vector blob shapes, not a mesh gradient.
- Keep the hot-pink `#FF008C` reserved for primary action buttons only; do not reuse it for headings, panels, or decorative fills.
- Do not shrink Champ display type to conventional heading sizes (32–48px) — its identity depends on extreme scale (104–160px) with tight line-height near 0.8.
- Do not turn the navbar into a centered/inset capsule — it is a flat, edge-to-edge, square-cornered, sticky bar at full viewport width.
- Preserve the hand-lettered script accent as short, curved, decorative captions only — never set body or heading copy in it.