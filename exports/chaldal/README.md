# Chaldal catalog export

Source: https://chaldal.com/ and the public search endpoint used by its storefront.

This snapshot covers the **default Dhaka grocery catalog (warehouse 8)**. It does not claim to contain every product ever listed, every sitemap product, or stock from every city. See `coverage.json` for exact counts, timestamps, pagination, and limitations.

- `products.csv`: spreadsheet export with UTF-8 BOM for Bengali text. Lists and availability records are JSON within cells. Formula-like text is escaped for spreadsheet safety.
- `products.json`: normalized product records, including names, size, BDT prices, descriptions, category names and IDs, manufacturer IDs, image links, source links, origin, and availability records.
- `products-raw.json`: all original fields from each returned product record, including dimensions, related variants, and flags.
- `categories.json`: category metadata and hierarchy from the grocery storefront.
- `sitemap-urls.json`: complete URL index from the public sitemap, including non-product URLs.
- `sitemap-unmatched-urls.json`: sitemap URLs absent from the export and known category routes. These are discovery candidates, not confirmed missing products.
- `coverage.json`: crawl scope and result counts.

Image files are not downloaded. Availability records describe the default warehouse and may include future delivery windows; they are not a simple in-stock guarantee. Manufacturer IDs are retained as IDs because this response does not provide their names. Prices and stock can change while the export is running.

Refresh from the project root with:

```sh
python3 scripts/export_chaldal.py
```

The script uses Python's standard library and `curl`. It requests one page at a time with a pause between pages and bounded retries. It reads the storefront's public search configuration afresh and does not require login. A successful run replaces the exports; if a refresh fails, `products-raw.json` may contain only the pages fetched so far, while the last completed normalized export and coverage remain unchanged.
