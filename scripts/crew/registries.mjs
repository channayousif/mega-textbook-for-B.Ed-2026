/**
 * Guard for the shared registries every course appends to. Merging main into a job branch
 * conflicts in these files more than anywhere else, and a worker's resolution broke them
 * twice: an invalid glossary.json reached main (2026-10-17), and a decision-log merge on
 * #164 dropped D-2026-0067's heading and duplicated two decision IDs (2026-10-19).
 *
 * Each check compares the branch's file with the same file at the branch's merge base with
 * main, so a branch that is only behind main is not blamed for main's newer entries. It
 * looks for damage, not for edits: a corrected glossary definition or a gap's status update
 * passes; a lost entry, a new duplicate ID or broken JSON does not. The decision log is the
 * exception: decisions are records, so every line the base has must still be there.
 *
 * Pure functions only, so tests/crew/ can exercise them without git.
 */
export const REGISTRIES = ['glossary.json', 'specs/decisions/log.md', 'specs/gaps.md', 'specs/content/terminology.csv'];

const dupes = (items) => {
  const seen = new Set();
  const twice = new Set();
  for (const x of items) (seen.has(x) ? twice : seen).add(x);
  return twice;
};
/** Duplicates the branch has that the base did not already have. */
const newDupes = (base, branch) => [...dupes(branch)].filter((x) => !dupes(base).has(x));
const missing = (base, branch) => {
  const have = new Set(branch);
  return [...new Set(base)].filter((x) => !have.has(x));
};
const list = (xs, n = 5) => `${xs.slice(0, n).join(', ')}${xs.length > n ? ` and ${xs.length - n} more` : ''}`;

function glossaryTerms(text) {
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('glossary.json is not a JSON array');
  return data.map((e) => String(e?.term ?? '').trim().toLowerCase());
}

const headingIds = (text, re) => [...text.matchAll(re)].map((m) => m[1]);
const DECISION = /^#{1,6}\s*(D-\d{4}-\d{4})\b/gm;
const GAP = /^#{1,6}\s*(G-\d{4}-\d+)\b/gm;

/** The first cell of each CSV data row (quote-aware), lower-cased: terminology.csv's term_en. */
function termColumn(text) {
  return text.split(/\r?\n/).slice(1).filter((l) => l.trim()).map((line) => {
    let cell = '';
    let quoted = false;
    for (const c of line) {
      if (c === '"') quoted = !quoted;
      else if (c === ',' && !quoted) break;
      else cell += c;
    }
    return cell.trim().toLowerCase();
  }).filter(Boolean);
}

/**
 * Problems in one registry, as readable lines ([] when it is sound).
 * `base` is the text at the merge base (null when the file is new), `branch` the text now
 * (null when the branch deleted it).
 */
export function registryProblems(path, base, branch) {
  if (base === null) return [];
  if (branch === null) return [`${path} was deleted`];
  if (base === branch) return [];
  const out = [];
  if (path === 'glossary.json') {
    let now;
    try { now = glossaryTerms(branch); } catch (e) { return [`glossary.json is not valid: ${e.message}`]; }
    const was = glossaryTerms(base);
    const lost = missing(was, now);
    if (lost.length) out.push(`glossary.json lost ${lost.length} term(s) main has: ${list(lost)}`);
    const twice = newDupes(was, now);
    if (twice.length) out.push(`glossary.json has duplicate term(s): ${list(twice)}`);
  } else if (path === 'specs/decisions/log.md') {
    const was = base.split('\n');
    const lines = new Set(branch.split('\n'));
    const gone = was.filter((l) => l.trim() && !lines.has(l));
    if (gone.length) out.push(`specs/decisions/log.md removed or changed ${gone.length} line(s) main has (the log is append-only), first: "${gone[0].slice(0, 100)}"`);
    const twice = newDupes(headingIds(base, DECISION), headingIds(branch, DECISION));
    if (twice.length) out.push(`specs/decisions/log.md has duplicate decision ID(s): ${list(twice)}`);
  } else if (path === 'specs/gaps.md') {
    const was = headingIds(base, GAP);
    const now = headingIds(branch, GAP);
    const lost = missing(was, now);
    if (lost.length) out.push(`specs/gaps.md lost gap(s) main has: ${list(lost)}`);
    const twice = newDupes(was, now);
    if (twice.length) out.push(`specs/gaps.md has duplicate gap ID(s): ${list(twice)}`);
  } else if (path === 'specs/content/terminology.csv') {
    const was = termColumn(base);
    const now = termColumn(branch);
    const lost = missing(was, now);
    if (lost.length) out.push(`specs/content/terminology.csv lost term(s) main has: ${list(lost)}`);
    const twice = newDupes(was, now);
    if (twice.length) out.push(`specs/content/terminology.csv has duplicate term(s): ${list(twice)}`);
  }
  return out;
}

/**
 * Three-way merge of glossary.json for the hourly batch. Every unit appends its terms at the
 * end of the array, so two concurrent branches always conflict there, and a merge-fix job
 * cannot win the race against the next batch (GSOS-301 U6 spent five fixes, 2026-10-23).
 * `ours` is main's side and keeps its entries and order; a term only `theirs` changed since
 * `base` takes their edit; terms only `theirs` added follow, in their order. A term main
 * removed stays removed. Returns the merged text, or null when any side is not a JSON array.
 */
export function mergeGlossary(base, ours, theirs) {
  let b, o, t;
  try {
    [b, o, t] = [base ?? '[]', ours, theirs].map((x) => JSON.parse(x));
  } catch { return null; }
  if (![b, o, t].every(Array.isArray)) return null;
  const key = (e) => String(e?.term ?? '').trim().toLowerCase();
  const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);
  const byKey = (xs) => new Map(xs.map((e) => [key(e), e]));
  const was = byKey(b);
  const their = byKey(t);
  const merged = o.map((e) => {
    const k = key(e);
    const x = their.get(k);
    return x && was.has(k) && same(e, was.get(k)) && !same(x, e) ? x : e;
  });
  const have = new Set(o.map(key));
  for (const e of t) if (!have.has(key(e)) && !was.has(key(e))) { merged.push(e); have.add(key(e)); }
  return `${JSON.stringify(merged, null, 2)}\n`;
}
