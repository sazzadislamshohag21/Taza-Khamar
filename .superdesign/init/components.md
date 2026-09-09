# Component inventory

## Codebase shape

This repository is a build-free static frontend. It has no React/Vue/Svelte component library and no shared component directory.

## Reusable UI patterns

The shared UI is expressed as semantic HTML in `index.html` and styled in `styles.css`:

- `button.button`: mango, plum, tomato, ghost, and large button variants.
- `article.product-card`: source/locality, product title, price, badge, image, and add control.
- `button.category-card`: category rail item with color surface and stock image.
- `form.location-form` / `form.newsletter-form`: labeled form controls with live status text.
- `header.site-header`: responsive brand, navigation, language toggle, basket link, and mobile menu.
- `footer.site-footer`: footer navigation, promise, and closing metadata.

No separate source component files exist. Use the corresponding HTML and CSS classes from `index.html` and `styles.css` as the source of truth.
