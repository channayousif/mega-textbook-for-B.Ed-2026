// FR-018 / ADR-0037: no content gate, nothing a content gate imports, and nothing the review-evidence
// binding walks may import scripts/media/. If it did, editing the shared media core would change the
// digest of every accepted review and make the whole corpus stale.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_GATES, FULL_GATES } from '../../scripts/lib/gates.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const rel = (abs) => relative(ROOT, abs).split('\\').join('/');

/** The entry scripts the review-evidence binding hashes, read from the source so the list cannot drift. */
function reviewEntryScripts() {
  const src = readFileSync(join(ROOT, 'scripts/lib/review-evidence.mjs'), 'utf8');
  const m = src.match(/REVIEW_ENTRY_SCRIPTS\s*=\s*\[([^\]]+)\]/);
  assert.ok(m, 'REVIEW_ENTRY_SCRIPTS not found in scripts/lib/review-evidence.mjs');
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}

/** Script files each gate's npm script runs (node <file> ...). */
function gateScripts() {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const files = new Set();
  for (const name of new Set([...CONTENT_GATES, ...FULL_GATES])) {
    const cmd = pkg.scripts?.[name] ?? '';
    for (const [, f] of cmd.matchAll(/(?:^|\s)((?:\.\/)?scripts\/[\w./-]+\.m?js)/g)) files.add(f.replace(/^\.\//, ''));
  }
  return [...files];
}

/** Local static and dynamic imports, walked the same way review-evidence.mjs walks them. */
function closure(entries) {
  const seen = new Set();
  const queue = entries.filter((p) => existsSync(join(ROOT, p)));
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const file = join(ROOT, path);
    for (const [, spec] of readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*\(?\s*['"](\.[^'"]+)['"]/g)) {
      const next = rel(resolve(dirname(file), spec));
      if (existsSync(join(ROOT, next))) queue.push(next);
    }
  }
  return [...seen];
}

const ENTRIES = [...new Set([...reviewEntryScripts(), ...gateScripts(), 'scripts/lib/gates.mjs',
  'scripts/review-evidence.mjs', 'scripts/lib/review-evidence.mjs'])];

test('the guard sees the real gate closure (sanity)', () => {
  const all = closure(ENTRIES);
  for (const must of ['scripts/check-figures.mjs', 'scripts/lib/review-evidence.mjs', 'scripts/lib/gates.mjs']) {
    assert.ok(all.includes(must), `${must} missing from the walked closure`);
  }
  assert.ok(all.length > 10, `closure suspiciously small (${all.length})`);
});

test('no content gate or review-evidence input imports scripts/media/', () => {
  const offenders = closure(ENTRIES).filter((p) => p.startsWith('scripts/media/'));
  assert.deepEqual(offenders, [], `content gates must not depend on the media core: ${offenders.join(', ')}`);
});
