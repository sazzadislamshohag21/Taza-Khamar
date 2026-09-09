# Page dependency trees

## / (Homepage)

Entry: `index.html`

Dependencies:

- `styles.css`
- `script.js`
- Google Fonts: Bricolage Grotesque, DM Sans, Noto Sans Bengali
- Remote stock assets from Unsplash and Pexels

Rendered sections: header, location hero, category rail, seasonal product grid, farmer network, finder, why cards, farm-to-fridge journey, testimonials, journal, newsletter, closing CTA, footer.

## /shop.html (Shop All Page)

Entry: `shop.html`

Dependencies to reuse:

- `shop.css` Shop All layout, product grid, category rail, basket panel, and mobile basket bar
- `shop.js` Shop All filtering, search, sorting, basket state, location status, and bilingual basket rendering
- `index.html` header and footer shell reference
- `styles.css` design tokens, buttons, category cards, product cards, form controls, responsive rules, and motion/accessibility patterns
- `script.js` language switching, mobile menu, image fallbacks, and shared form helpers
- `content-assets/manifest.md` remote stock asset guidance
