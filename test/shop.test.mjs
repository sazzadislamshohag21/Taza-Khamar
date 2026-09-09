import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../shop.html', import.meta.url), 'utf8').catch(() => '');
const script = await readFile(new URL('../shop.js', import.meta.url), 'utf8').catch(() => '');
const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');

function loadApi() {
  const context = { console };
  vm.createContext(context);
  vm.runInContext(script, context);
  return context.SazzadShop;
}

test('standalone Shop All page contains the browse and basket landmarks', () => {
  assert.match(html, /<title>URBOR — Shop all<\/title>/i);
  assert.match(html, /id="shop-products"/);
  assert.match(html, /id="shop-search"/);
  assert.match(html, /id="shop-basket-panel"/);
  assert.match(html, /id="shop-product-grid"/);
  assert.match(html, /id="catalog-departments"/);
  assert.match(html, /id="catalog-next"/);
  assert.match(script, /loadUrborCatalog/);
  assert.match(html, /catalog-loader\.js/);
  assert.equal((html.match(/data-shop-filter=/g) || []).length, 1);
  assert.equal((html.match(/data-en=/g) || []).length, (html.match(/data-bn=/g) || []).length);
  assert.match(home, /href="shop\.html"/);
});

test('Shop All helpers filter, search, sort, and calculate basket totals', () => {
  const api = loadApi();
  assert.ok(api, 'Shop All behavior module is present');
  const products = [
    { id: 'greens', name: 'Morning greens bundle', source: 'Rahman Family Farm', category: 'vegetables', price: 280 },
    { id: 'mangoes', name: 'Himsagar mangoes', source: 'Mitali Mango House', category: 'fruits', price: 420 },
    { id: 'fish', name: 'River fish box', source: 'Padma Catch', category: 'fish', price: 760 }
  ];

  assert.deepEqual(api.filterProducts('fish', products), [products[2]]);
  assert.deepEqual(api.searchProducts('mango', products), [products[1]]);
  assert.deepEqual(Array.from(api.sortProducts('price-low', products), (product) => product.id), ['greens', 'mangoes', 'fish']);
  assert.deepEqual(JSON.parse(JSON.stringify(api.calculateBasket({ greens: 2, mangoes: 1 }, products))), { count: 3, total: 980 });
});
