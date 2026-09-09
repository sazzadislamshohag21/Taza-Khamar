#!/usr/bin/env python3
"""Export Chaldal's public default-Dhaka grocery catalog. Standard library only."""
import csv
import json
import re
import subprocess
import time
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'exports' / 'chaldal'


def fetch(url, body=None):
    args = ['curl', '-L', '--compressed', '-sS', '--fail', '--max-time', '60', url]
    if body is not None:
        args += ['-H', 'Content-Type: application/json', '--data-binary', '@-']
    for attempt in range(3):
        result = subprocess.run(args, input=json.dumps(body) if body else None,
                                text=True, capture_output=True)
        if result.returncode == 0:
            return result.stdout
        time.sleep(2 ** (attempt + 1))
    raise RuntimeError(f'Fetch failed: {url}: {result.stderr}')


def save(name, value):
    path = OUT / name
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')
    temporary.replace(path)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    started = datetime.now(timezone.utc).isoformat()
    html = fetch('https://chaldal.com/')
    state = json.loads(re.search(r'window.__serviceState\s*=\s*(.*?)</script>', html).group(1))
    logic = state['LogicService']
    # Reuse the storefront's public search credential; never print or persist it.
    key = re.search(r'apiKey.*?([a-f0-9]{60,})', logic['clientLogic']['SearchRequest']).group(1)
    constants = next(x for x in logic['globalConstants'] if x and x['StoreId'] == 1)
    endpoint = constants['ChaldalCatalogIndexName'] + '/searchOld'
    categories = state['CategoryService']['categories']['1']
    routes = state['RouterService']['categoryRoutes']['1']
    save('categories.json', [{**c, 'url': 'https://chaldal.com/' + routes.get(str(c['Id']), '')} for c in categories])
    names = {c['Id']: c['Name'] for c in categories}
    sitemap = fetch('https://chaldal.com/sitemap.xml')
    urls = [node.text for node in ET.fromstring(sitemap).iter() if node.tag.endswith('}loc')]
    save('sitemap-urls.json', urls)
    body = dict(apiKey=key, storeId=1, warehouseId=8, pageSize=100,
                currentPageIndex=0, metropolitanAreaId=1, query='', productVariantId=-1,
                bundleId={'case': 'None'}, canSeeOutOfStock='false', filters=[],
                maxOutOfStockCount={'case': 'Some', 'fields': [5]},
                shouldShowAlternateProductsForAllOutOfStock={'case': 'Some', 'fields': [True]},
                customerGuid={'case': 'None'})
    products = {}
    pages = []
    page_index = 0
    while True:
        body['currentPageIndex'] = page_index
        page = json.loads(fetch(endpoint, body))
        if not isinstance(page.get('hits'), list) or 'nbPages' not in page:
            raise RuntimeError('Unexpected search response; no successful export claimed')
        if page['page'] != page_index + 1:
            raise RuntimeError('Unexpected pagination response')
        pages.append({k: v for k, v in page.items() if k != 'hits'})
        for p in page['hits']:
            products[(str(p['objectID']), p.get('catalogItemType', 'Grocery'))] = p
        save('products-raw.json', list(products.values()))
        print(f'Page {page_index + 1}/{page["nbPages"]}: {len(products)} unique products', flush=True)
        page_index += 1
        if page_index >= page['nbPages']:
            break
        if not page['hits']:
            raise RuntimeError('Empty page before reported last page')
        time.sleep(0.5)
    rows = []
    for p in products.values():
        rows.append(dict(id=p['objectID'], name=p['name'], name_bn=p.get('bengaliName'),
                         size=p.get('subText'), price_bdt=p.get('price'), mrp_bdt=p.get('mrp'),
                         corporate_price_bdt=p.get('corpPrice'),
                         categories=[names.get(c, str(c)) for c in p.get('categories', [])],
                         category_ids=p.get('categories', []), manufacturer_ids=p.get('manufacturers', []),
                         description=p.get('longDesc'), short_description=p.get('shortDesc'),
                         image_urls=p.get('picturesUrls', []), offer_image_urls=p.get('offerPicturesUrls', []),
                         url='https://chaldal.com/' + p['slug'], country=p.get('countryOriginCode'),
                         sale_blocked=bool(p.get('blockSale')),
                         availability=p.get('productAvailabilityForSelectedWarehouse', []),
                         catalog_item_type=p.get('catalogItemType'), fetched_at_utc=started))
    rows.sort(key=lambda p: (p['name'].casefold(), str(p['id'])))
    save('products.json', rows)
    with (OUT / 'products.csv').open('w', encoding='utf-8-sig', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0]))
        writer.writeheader()
        for row in rows:
            values = {k: json.dumps(v, ensure_ascii=False) if isinstance(v, (list, dict)) else v
                      for k, v in row.items()}
            # Keep externally supplied text from becoming a spreadsheet formula.
            writer.writerow({k: "'" + v if isinstance(v, str) and v.startswith(('=', '+', '-', '@')) else v
                             for k, v in values.items()})
    exported_urls = {p['url'] for p in rows}
    category_urls = {'https://chaldal.com/' + slug for slug in routes.values()}
    unmatched = [url for url in urls if url not in exported_urls and url not in category_urls]
    save('sitemap-unmatched-urls.json', unmatched)
    save('coverage.json', dict(started_at_utc=started, finished_at_utc=datetime.now(timezone.utc).isoformat(),
         source='https://chaldal.com/', endpoint=endpoint, city='Dhaka', warehouse_id=8,
         unique_products=len(rows), reported_matches=pages[0]['nbHits'], pages=pages,
         sitemap_urls=len(urls), unmatched_sitemap_urls=len(unmatched),
         scope='All pages of the public default-Dhaka grocery search; not all sitemap product pages or all cities.',
         limitations=['Inventory and prices can change during export.',
                      'Out-of-stock and other-location products may be absent.',
                      'Unmatched sitemap URLs include products and non-product pages.',
                      'Images are preserved as source URLs, not downloaded files.']))
    print(f'Export complete: {len(rows)} unique products in {OUT}', flush=True)


if __name__ == '__main__':
    main()
