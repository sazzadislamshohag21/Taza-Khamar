# Sazzad design system

## Product context

Sazzad is a Bangladesh farm-to-fridge marketplace connecting households with nearby farmers, fishers, and food makers. English is the default language with a visible English/Bangla toggle. The new Shop All page is a dedicated browsing destination for seasonal produce, fish, meat, dairy, eggs, rice, honey, and pantry goods.

## Visual language

- Canvas: `#F5F0E6` rice-paper cream; ink: `#1D1A17`.
- Brand colors: plum `#4C1D38`, plum dark `#331226`, mango `#F7A928`, tomato `#E94B35`, leaf `#3B6D45`, mint `#C8DBBE`, sky `#CFE2DF`, white `#FFFDF8`.
- Display: `Bricolage Grotesque`, 600–800, tight line-height and negative tracking.
- Body: `DM Sans`; Bangla: `Noto Sans Bengali`.
- Components use 1px ink outlines, 2px corners, offset hard-edged shadows (`9px 9px 0`), sticker labels, irregular crops, and generous cream space.

## Shop All direction

Create a separate `shop.html` page using the existing header/footer pattern. The page should have a plum location-led hero, a horizontal category rail, filter chips, an asymmetric product grid, visible farmer/locality provenance, seasonal badges, price and add controls, plus a compact basket summary. Use remote Unsplash stock images with useful alt text for content photos; decorative image backdrops use `alt=""` and `aria-hidden="true"`.

## Responsive and accessibility

Use a 12-column desktop layout, six-column tablet collapse, and one-column mobile layout with horizontal snap rails for long card groups. Keep the primary shop CTA and filter controls discoverable on mobile. Preserve visible `:focus-visible` rings, semantic headings, keyboard-operable controls, current language behavior, lazy image loading, and `prefers-reduced-motion: reduce` support.

## Motion

Use subtle reveal, hover lift, image zoom, and gentle category drift only where it supports browsing. Disable nonessential transforms, autoplay, smooth scrolling, and animation under reduced motion.
