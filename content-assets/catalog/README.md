# Storefront catalog

`products.json` contains all 3,386 unique product records from the completed Chaldal default-Dhaka export in `exports/chaldal/`. The `updated` field identifies its snapshot time. This is a static import, not a live inventory connection or a claim to cover every city or unavailable listing.

All 12 main departments and the source subcategory hierarchy are available in the shop. Product membership uses recursive category IDs, so a product can appear in multiple appropriate categories. Prices are BDT. Original images are linked from Chaldal's image host, with a local fallback for failed images. Descriptions are rendered as escaped text. No farm provenance is invented for imported products.

The shop shows 24 records per page, supports Bengali/English search, price sorting, descriptions, category browsing, and a local-storage basket. The basket is a local preview; this import does not add order submission or payment processing.

Browser integration checks: open `/test/catalog-browser.html` on the local server. This checks the snapshot count, all departments, pagination, filtering, basket arithmetic, search, sorting, language switching, and a 390-pixel layout. Use a fresh browser profile or empty preview basket for the deterministic basket count assertion.
