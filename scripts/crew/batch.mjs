/**
 * Hourly batch PRs (owner, 2026-10-19). One PR per finished job meant a push to main
 * every few minutes. Each push queues a full CI run (rls and e2e share one database
 * and run one at a time), and scripts/deploy-prod.sh deploys only main's head once
 * ITS run passes, so the head moved on before any run finished and production
 * stopped deploying. Finished jobs now wait as `ready`, and at most once an hour,
 * with no batch PR already open, the crew merges them into one batch branch and
 * opens one PR for all of them.
 *
 * Pure functions only, so tests/crew/ can exercise them without running the dispatcher.
 */

export const BATCH_EVERY_MIN = Number(process.env.CREW_BATCH_EVERY_MIN || 60);
const FIX_STATUSES = ['queued', 'running'];

/** True when a batch may be opened now: none open and the last one at least `everyMin` ago. */
export function batchDue(board, nowMs = Date.now(), everyMin = BATCH_EVERY_MIN) {
  if (board.jobs.some((j) => j.stage === 'batch' && ['pr_open', 'gate_red'].includes(j.status))) return false;
  if (!board.lastBatchAt) return true;
  return nowMs - Date.parse(board.lastBatchAt) >= everyMin * 60e3;
}

/** Ready jobs to try in the next batch, oldest first; a job with a fix still running waits. */
export function batchCandidates(jobs) {
  const fixing = new Set(jobs.filter((x) => x.parent && FIX_STATUSES.includes(x.status)).map((x) => x.parent));
  return jobs
    .filter((j) => j.status === 'ready' && !fixing.has(j.id))
    .sort((a, b) => String(a.readyAt || a.createdAt).localeCompare(String(b.readyAt || b.createdAt)));
}

/** `batch-YYYYMMDD-HHMM` in UTC. */
export function batchId(iso) {
  return `batch-${iso.slice(0, 10).replace(/-/g, '')}-${iso.slice(11, 16).replace(':', '')}`;
}

export function batchTitle(members, iso) {
  const courses = [...new Set(members.map((j) => j.course))].sort();
  const shown = courses.length > 4 ? `${courses.slice(0, 4).join(', ')} +${courses.length - 4}` : courses.join(', ');
  return `crew: batch ${iso.slice(0, 16).replace('T', ' ')}Z, ${members.length} job${members.length === 1 ? '' : 's'} (${shown})`;
}

export function batchBody(members, { left = [], supersedes = [] } = {}) {
  const rows = members.map((j) => `| \`${j.id}\` | ${j.stage} | ${j.worker || ''} | ${(j.summary || '').replace(/\|/g, '/').replace(/\n/g, ' ')} |`);
  return [
    `One crew batch: ${members.length} finished job${members.length === 1 ? '' : 's'}, merged together onto main's head. \`npm run check:content\` passed on the combined branch; CI builds the site. The crew auto-merges this PR when CI is green.`,
    '',
    '| Job | Stage | Worker | Summary |',
    '|---|---|---|---|',
    ...rows,
    ...(left.length ? ['', `Left for the next batch (a merge fix is queued): ${left.map((j) => `\`${j.id}\``).join(', ')}.`] : []),
    ...(supersedes.length ? ['', `Supersedes ${supersedes.map((n) => `#${n}`).join(', ')}.`] : []),
    '',
    '🤖 Generated with [Claude Code](https://claude.com/claude-code)',
  ].join('\n');
}

/**
 * Build the exclusion reason for a job that could not join the hourly batch.
 * Starts with "<branch> conflicts with main" and lists at most five of the
 * unmerged paths, with a count of the rest.
 */
export function exclusionReason(branch, paths) {
  const base = `${branch} conflicts with main`;
  if (!paths.length) return `${base}.`;
  const shown = paths.slice(0, 5);
  const rest = paths.length - shown.length;
  const list = rest ? `${shown.join(', ')} and ${rest} more` : shown.join(', ');
  return `${base} (${list}).`;
}

/**
 * Three-way merge for an append-only file such as a course tracker
 * (specs/content/<course>/tasks.md, W44 M1). Concurrent unit jobs each add their own rows at
 * the same place, which git reports as a conflict although neither side removed anything.
 * When both `ours` and `theirs` only insert whole lines relative to `base`, the result is base
 * with both sides' insertions, ours before theirs at a shared point (an identical insertion on
 * both sides is kept once). Returns null when a stage is missing or either side changes or
 * deletes a base line, so the caller falls back to a merge fix. Base lines are matched in
 * order, first occurrence first.
 */
export function mergeAppendOnly(base, ours, theirs) {
  if (typeof base !== 'string' || typeof ours !== 'string' || typeof theirs !== 'string') return null;
  const b = base.split('\n');
  const inserts = (side) => {
    const s = side.split('\n');
    const gaps = b.map(() => []).concat([[]]);
    let i = 0;
    for (const line of s) {
      if (i < b.length && line === b[i]) i += 1;
      else gaps[i].push(line);
    }
    return i === b.length ? gaps : null;
  };
  const o = inserts(ours);
  const t = inserts(theirs);
  if (!o || !t) return null;
  const sameInsert = (a, b) => a.length === b.length && a.every((line, k) => line === b[k]);
  const out = [];
  for (let i = 0; i <= b.length; i += 1) {
    out.push(...o[i]);
    if (!sameInsert(o[i], t[i])) out.push(...t[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out.join('\n');
}

/**
 * Split one tracker into lines and tag each table row that belongs to a table whose header has
 * "Unit" and "Stage" columns with a key: Unit, Stage and the occurrence number of that pair in
 * the file (a revision row for an existing pair is occurrence 2). Jobs often append rows after a
 * blank line below the table; such headerless rows use the columns of the last header above them.
 * Every other line, including a table's header and separator rows, is a plain line.
 */
function trackerLines(text) {
  const lines = text.split('\n');
  const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const isRow = (line) => line.trim().startsWith('|');
  const isSeparator = (line) => isRow(line) && cells(line).every((c) => /^:?-+:?$/.test(c));
  const seen = new Map();
  const out = [];
  let cols = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!isRow(line)) { out.push({ line }); continue; }
    if (i + 1 < lines.length && isSeparator(lines[i + 1]) && !isSeparator(line) && (i === 0 || !isRow(lines[i - 1]))) {
      const head = cells(line).map((c) => c.toLowerCase());
      cols = { unit: head.indexOf('unit'), stage: head.indexOf('stage') };
      out.push({ line });
      continue;
    }
    if (!cols || cols.unit < 0 || cols.stage < 0 || isSeparator(line)) { out.push({ line }); continue; }
    const c = cells(line);
    const pair = `${c[cols.unit] ?? ''}\u0000${c[cols.stage] ?? ''}`;
    const n = (seen.get(pair) || 0) + 1;
    seen.set(pair, n);
    out.push({ line, key: `${pair}\u0000${n}` });
  }
  return out;
}

/**
 * Three-way merge for a course tracker (specs/content/<course>/tasks.md, W45 M2) that keys table
 * rows by Unit, Stage and occurrence number, because unit jobs rewrite their own rows in place
 * (G2 evidence, G3 notes) and mergeAppendOnly rejects any change to a base line.
 * - A keyed row changed or removed on one side only takes that side; changed the same way on
 *   both sides is kept once; changed differently on both sides returns null.
 * - New keyed rows (a key not in base) from both sides are kept, ours first, after the last row
 *   of their table; an identical new row on both sides is kept once.
 * - Every other line (prose, headings, table headers) merges only when both sides purely insert
 *   lines, as in mergeAppendOnly (an insertion that starts the other side's is kept once); any
 *   other change returns null.
 * Returns null when a stage is missing, so the caller falls back to a merge fix.
 */
export function mergeTrackerRows(base, ours, theirs) {
  if (typeof base !== 'string' || typeof ours !== 'string' || typeof theirs !== 'string') return null;
  const docs = [base, ours, theirs].map(trackerLines);
  // Plain lines of each side, and for every keyed row the index of the plain line before it.
  const split = (doc) => {
    const plain = [];
    const rows = [];
    for (const item of doc) {
      if (item.key) rows.push({ ...item, anchor: plain.length - 1 });
      else plain.push(item.line);
    }
    return { plain, rows };
  };
  const [b, o, t] = docs.map(split);
  // Match each side's plain lines to base in order; anything unmatched is an insertion.
  const inserts = (side) => {
    const gaps = b.plain.map(() => []).concat([[]]);
    const at = [];
    let i = 0;
    for (const line of side.plain) {
      if (i < b.plain.length && line === b.plain[i]) { at.push({ base: i }); i += 1; }
      else { at.push({ gap: i, k: gaps[i].length }); gaps[i].push(line); }
    }
    return i === b.plain.length ? { gaps, at } : null;
  };
  const oi = inserts(o);
  const ti = inserts(t);
  if (!oi || !ti) return null;
  const isPrefix = (x, y) => x.length <= y.length && x.every((line, k) => line === y[k]);
  // Merged plain lines, with the merged index of every base, ours and theirs plain line. When one
  // side's insertion at a point starts the other's (both carry the same earlier append), the
  // longer one is kept once instead of repeating the shared lines.
  const plain = [];
  const baseAt = [];
  const oursGap = [];
  const theirsGap = [];
  for (let i = 0; i <= b.plain.length; i += 1) {
    const [og, tg] = [oi.gaps[i], ti.gaps[i]];
    if (isPrefix(tg, og)) {
      oursGap[i] = og.map((line) => plain.push(line) - 1);
      theirsGap[i] = oursGap[i].slice(0, tg.length);
    } else if (isPrefix(og, tg)) {
      theirsGap[i] = tg.map((line) => plain.push(line) - 1);
      oursGap[i] = theirsGap[i].slice(0, og.length);
    } else {
      oursGap[i] = og.map((line) => plain.push(line) - 1);
      theirsGap[i] = tg.map((line) => plain.push(line) - 1);
    }
    if (i < b.plain.length) baseAt[i] = plain.push(b.plain[i]) - 1;
  }
  const mapAnchor = (side, gaps, anchor) => {
    if (anchor < 0) return -1;
    const a = side.at[anchor];
    return 'base' in a ? baseAt[a.base] : gaps[a.gap][a.k];
  };
  // Resolve base rows, then collect each side's new rows; group rows by merged anchor.
  const oRows = new Map(o.rows.map((r) => [r.key, r]));
  const tRows = new Map(t.rows.map((r) => [r.key, r]));
  const after = new Map();
  const put = (anchor, line) => { if (!after.has(anchor)) after.set(anchor, []); after.get(anchor).push(line); };
  const baseKeys = new Set();
  for (const r of b.rows) {
    baseKeys.add(r.key);
    const ol = oRows.get(r.key)?.line ?? null;
    const tl = tRows.get(r.key)?.line ?? null;
    let line;
    if (ol === tl) line = ol;
    else if (ol === r.line) line = tl;
    else if (tl === r.line) line = ol;
    else return null;
    if (line !== null) put(baseAt[r.anchor] ?? -1, line);
  }
  const oursNew = new Map();
  for (const r of o.rows) {
    if (baseKeys.has(r.key)) continue;
    oursNew.set(r.key, r.line);
    put(mapAnchor(oi, oursGap, r.anchor), r.line);
  }
  for (const r of t.rows) {
    if (baseKeys.has(r.key) || oursNew.get(r.key) === r.line) continue;
    put(mapAnchor(ti, theirsGap, r.anchor), r.line);
  }
  const out = [...(after.get(-1) || [])];
  plain.forEach((line, i) => out.push(line, ...(after.get(i) || [])));
  return out.join('\n');
}
