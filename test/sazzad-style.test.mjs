import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const skill = await readFile(new URL('../.codex/skills/sazzad-style/SKILL.md', import.meta.url), 'utf8');

test('Sazzad style skill documents the reusable visual and content rules', () => {
  assert.match(skill, /^name: sazzad-style/m);
  assert.match(skill, /^description: Use when/m);
  for (const requiredTerm of ['Bricolage Grotesque', 'Noto Sans Bengali', 'Farm to fridge', 'reduced motion', 'location', 'finder', 'focus']) {
    assert.match(skill, new RegExp(requiredTerm, 'i'));
  }
});
