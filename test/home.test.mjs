import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

function loadApi() {
  const context = { console };
  vm.createContext(context);
  vm.runInContext(script, context);
  return context.Sazzad;
}

test('homepage includes the farm-to-fridge discovery landmarks', () => {
  for (const landmark of [
    'From Bangladeshi farmers to your family table',
    'Shop by category',
    'Meet the people',
    'A little help choosing',
    'Why Sazzad',
    'From farm to fridge',
    'Stories from the',
    'The Sazzad journal',
    'Get the good stuff'
  ]) {
    assert.match(html, new RegExp(landmark, 'i'));
  }
  assert.match(html, /aria-label="Switch language"/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.equal((html.match(/data-en=/g) || []).length, (html.match(/data-bn=/g) || []).length);
  assert.match(script, /root\.lang/);
});

test('public helpers validate, filter, and finish the prototype flows', () => {
  const api = loadApi();
  assert.equal(api.validateEmail('hello@sazzad.bd'), true);
  assert.equal(api.validateEmail('not-an-email'), false);
  assert.equal(api.getLocationMessage('1207'), 'Great news — Sazzad delivers to 1207.');
  assert.equal(api.getLocationMessage(''), 'Enter your area or postcode to see what is fresh near you.');

  const products = [
    { name: 'Kacha morich', category: 'vegetables' },
    { name: 'Rupchanda', category: 'fish' },
    { name: 'Mangoes', category: 'fruits' }
  ];
  assert.deepEqual(api.filterProducts('fish', products), [products[1]]);
  assert.equal(api.filterProducts('all', products).length, 3);
  assert.equal(api.getFinderResult({ household: 'family', rhythm: 'weekly', taste: 'all' }).title, 'A weekly box for the whole table');
});

test('shop category cards use decorative stock imagery without duplicating labels', () => {
  const categoryCards = [...html.matchAll(/<button class="category-card[\s\S]*?<\/button>/g)];

  assert.equal(categoryCards.length, 9);
  for (const card of categoryCards) {
    assert.match(card[0], /<img[^>]+src="https:\/\/images\.unsplash\.com\//);
    assert.match(card[0], /<img[^>]+alt=""[^>]+aria-hidden="true"/);
  }
});

test('why and journey sections use decorative stock imagery', () => {
  const whyCards = [...html.matchAll(/<article class="why-card[\s\S]*?<\/article>/g)];
  const journeySteps = [...html.matchAll(/<article class="journey-step[\s\S]*?<\/article>/g)];

  assert.equal(whyCards.length, 3);
  assert.equal(journeySteps.length, 4);
  for (const card of [...whyCards, ...journeySteps]) {
    assert.match(card[0], /<img[^>]+src="https:\/\/images\.unsplash\.com\//);
    assert.match(card[0], /<img[^>]+alt=""[^>]+aria-hidden="true"/);
  }
});

test('customer stories use stock portrait imagery for their avatars', () => {
  const avatars = [...html.matchAll(/<span class="story-avatar[\s\S]*?<\/span>/g)];

  assert.equal(avatars.length, 3);
  for (const avatar of avatars) {
    assert.match(avatar[0], /<img[^>]+src="https:\/\/images\.unsplash\.com\//);
    assert.match(avatar[0], /<img[^>]+alt=""[^>]+aria-hidden="true"/);
  }
});
