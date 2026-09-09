# Extractable components

This is a static HTML/CSS/JS prototype with no framework components or import graph. No Superdesign DraftComponents are required for the new page.

## Layout patterns

- `SiteHeader` — source `index.html`; category `layout`; responsive brand/nav/language/basket shell. Active navigation is represented by the current document link.
- `SiteFooter` — source `index.html`; category `layout`; footer navigation, promise, social links, and legal row.

## Basic patterns

- `ProductCard` — source `index.html`; category `basic`; product source/locality, image, title, price, badge, and add control are hardcoded per card.
- `CategoryCard` — source `index.html`; category `basic`; category name, color treatment, icon, and stock image are hardcoded per category.
- `FilterChip` — source `index.html`; category `basic`; filter label and category value are hardcoded per chip.
