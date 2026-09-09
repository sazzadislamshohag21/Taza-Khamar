---
name: sazzad-style
description: Use when designing or implementing a Sazzad-style Bangladesh farm-to-fridge page, fresh-food marketplace flow, or bilingual editorial commerce experience.
---

# Sazzad Style

Sazzad is a warm, local, editorial food marketplace for Bangladesh. The visual system pairs rice-paper space with deep plum, mango orange, tomato red, leafy green, and small sky-blue moments. It should feel close, human, and a little playful without becoming rustic or visually noisy.

## Visual rules

- Canvas: `#F5F0E6`; ink: `#1D1A17`; plum: `#4C1D38`; plum dark: `#331226`; mango: `#F7A928`; tomato: `#E94B35`; leaf: `#3B6D45`; mint: `#C8DBBE`; sky: `#CFE2DF`; white: `#FFFDF8`.
- Display type: `Bricolage Grotesque`, weight 600–800, tight line-height and negative tracking. Body: `DM Sans`. Bangla: `Noto Sans Bengali` with a slightly gentler display scale.
- Use oversized headlines, hard-edged blocks, thin ink outlines, offset cards, sticker-like labels, irregular image crops, and generous cream breathing room. Prefer asymmetry over dense dashboards.
- Use real Bangladeshi farmers, fields, markets, fish, and produce as replaceable content assets. Every content image needs useful alt text; decorative images use empty alt text.

## Farm to fridge structure

For a homepage or discovery flow, keep this order unless the product brief says otherwise: location-led hero; shop by category; seasonal produce; local farmer network; product finder; trust reasons; four-step farm-to-fridge journey; customer stories; journal/tips; newsletter; closing CTA/footer.

The hero should always answer what Sazzad does, where it delivers, and what the next action is. A strong pattern is a plum panel with the headline on the left, layered farmer/produce photography on the right, a location input, and one mango CTA. Category content works best as a horizontal rail or snap row of large color cards. Product cards expose source, locality, item name, and price in that order.

## Bilingual behavior

English is the default. Add a visible English/Bangla toggle that changes copy without reloading. Store both values beside each meaningful label (`data-en` / `data-bn` or an equivalent content map), keep the document `lang` attribute current, translate validation messages, placeholders, finder questions, and result copy, and preserve icon/arrow children when replacing text. Do not translate farmer names, email addresses, prices, or locality names unless the brief explicitly asks for it.

## Motion, responsive behavior, and accessibility

- Use staggered hero entry, IntersectionObserver reveal states, subtle produce drift, slow category movement, hover lift, and gentle image zoom. Keep motion secondary to reading and shopping.
- Respect `prefers-reduced-motion: reduce` and reduced motion mode: remove autoplay, transforms, smooth scrolling, and nonessential animation; content and focus order must remain unchanged.
- Desktop favors a 12-column asymmetric grid; tablet collapses to six columns; mobile becomes one column with horizontal snap rows for long card groups. Keep the primary CTA visible on small screens and prevent decorative layers from causing horizontal page scroll.
- Use semantic headings, real buttons and forms, visible `:focus-visible` rings, keyboard-operable rails and finder controls, `aria-live` for location/newsletter/finder feedback, and sufficient contrast against each color block.

## Quick reference

| Need | Use |
|---|---|
| Primary action | Mango fill, ink text, square 2px radius |
| Dark action | Plum fill, cream text; tomato on hover |
| Section title | `clamp(42px, 6.3vw, 96px)` Bricolage Grotesque |
| Page rhythm | `clamp(76px, 10vw, 150px)` section spacing |
| Cards | 1px ink outline, white or color surface, `9px 9px 0` hover shadow |
| Location/finder | Keep the input or current question above the fold and provide inline status |

## Common mistakes

- Replacing the palette with generic green gradients or adding unapproved decorative colors.
- Using a generic grocery grid without farmer locality, provenance, or a clear farm-to-fridge journey.
- Letting Bangla toggle code overwrite nested emphasis or arrow elements.
- Hiding the location input, finder progress, error state, or focus ring behind motion.
- Treating the 48-hour promise as a guarantee on every route; keep delivery claims clearly prototype copy until backed by real operations.
