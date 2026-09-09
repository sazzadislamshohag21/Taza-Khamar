# Shared layouts

## Site shell

- Source: `index.html`
- Layout: `header.site-header` at the top, `main#main-content` sections, and `footer.site-footer` at the bottom.
- The header uses `.container.header-inner`, a text-and-mark Sazzad brand, desktop anchor navigation, English/Bangla toggle, basket CTA, and an inert mobile navigation panel.
- The footer uses `.container.footer-top`, `.container.footer-grid`, and `.container.footer-bottom`.

## Source-of-truth markup

The full shared shell markup is in `index.html`. The new Shop All page should reuse the same brand mark, navigation labels, language toggle, basket treatment, footer columns, color tokens, and focus behavior rather than inventing a second shell.
