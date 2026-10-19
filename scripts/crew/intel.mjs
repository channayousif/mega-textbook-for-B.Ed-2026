/**
 * Reusable-intelligence extraction, harvest side (ops/crew/README.md, "Intelligence").
 *
 * The crew forgets what it learns. On 2026-10-19 the same failure ("static/content-status.json is
 * missing") recurred 25 times before a person found it, 12 retries were "exited without
 * committing", and the same handoff notes were written again and again. The raw material is all on
 * disk: board history and feedback, CREW-HANDOFF notes, worker logs, cron.log, PHR reflections and
 * G3/G5 findings. Every 12 hours the harvest turns what is new into signals, folds each into a
 * cluster by its normalised signature, and flags clusters that keep recurring. A daily model job
 * (intel_distill) judges what the hot clusters mean; the weekly maintenance survey promotes the
 * strongest into skills, gates and rules, and the clusters measure whether that worked.
 *
 * Pure functions only, so tests/crew/ can exercise them without the dispatcher or the disk.
 */

/** A cluster is hot when it grows this much in one harvest, or reaches this total. */
export const HOT_PER_HARVEST = 3;
export const HOT_TOTAL = 5;
const MAX_EVIDENCE = 5;
const MAX_SIG = 160;

/**
 * The shape of a message with its particulars masked, so two occurrences of the same problem in
 * different units, files or runs share one signature.
 */
export function normalise(text) {
  return String(text || '')
    .replace(/\u2014/g, ' - ')
    .replace(/`[^`]*`/g, '<code>')
    .replace(/https?:\/\/\S+/g, '<url>')
    .replace(/\b[0-9a-f]{7,40}\b/g, '<sha>')
    .replace(/(?:[\w.@-]*\/)+[\w.@-]+/g, '<path>')
    .replace(/\b[A-Z]{2,5}-\d{3}\b/g, '<course>')
    .replace(/\d+/g, 'N')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .slice(0, MAX_SIG);
}

const signal = (kind, text, source, at) => {
  const sig = normalise(text);
  return sig.length >= 8 ? { kind, sig, text: String(text).trim().slice(0, 300), source, at } : null;
};

const FAILURE_EVENT = /attempt \d+ failed|second failure|failed \d+ times|left out of the batch|reap failed|launch failed|could not join|still red|still conflicts/i;

/** The line of a failure's feedback that names the problem. */
export function feedbackHead(feedback) {
  const lines = String(feedback || '').split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.find((l) => /^[✗-]\s|error|exited|conflict|without committing|fails|invalid|missing|stale/i.test(l) && !/finding\(s\) that main does not have:$/.test(l)) || lines[0] || '';
}

/** Failure events and handoff notes recorded on board jobs after `since` (ISO). */
export function boardSignals(jobs, since) {
  const out = [];
  for (const j of jobs) {
    for (const h of j.history || []) {
      const at = h.slice(0, 24);
      if (at <= since || !FAILURE_EVENT.test(h)) continue;
      const head = feedbackHead(j.feedback);
      out.push(signal('failure', head || h.slice(25), `job:${j.id}`, at));
    }
    if (j.handoffAt && j.handoffAt > since) for (const n of j.handoff || []) out.push(signal('handoff', n, `job:${j.id}`, j.handoffAt));
  }
  return out.filter(Boolean);
}

// A line reporting an error, not source code or a document a worker printed while reading files
// (a first harvest on 2026-10-19 found `console.error(...)`, `} catch (error) {`, Markdown bullets and
// table rows among the "errors").
const LOG_ERROR = /^(\[?(error|fatal|err!)\]?[:\s]|✗|\w*Error\b|npm (err|error)|.{0,60}\b(failed|rejected|denied|ENOENT|EACCES|timed out)\b)/i;
const LOG_NOISE = /^(at |\d+\s*\||[{}[\]],?$|[*|#>$-]|\/\/)|console\.|=>|[{;]\s*$|\bcatch\s*\(|DeprecationWarning|ExperimentalWarning|\b0 (errors|failed)\b/;

/** Error-looking lines from one worker log (at most `max`, de-duplicated by signature). */
export function logSignals(text, source, at, max = 5) {
  const seen = new Set();
  const out = [];
  for (const raw of String(text || '').split('\n')) {
    const line = raw.replace(/\u001b\[[0-9;]*m/g, '').trim();
    if (line.length > 400 || !LOG_ERROR.test(line) || LOG_NOISE.test(line)) continue;
    const s = signal('log-error', line, source, at);
    if (!s || seen.has(s.sig)) continue;
    seen.add(s.sig);
    out.push(s);
    if (out.length >= max) break;
  }
  return out;
}

/** Errors in cron.log text (the tick's own output). */
export function cronSignals(text, at) {
  return String(text || '').split('\n')
    .filter((l) => /^\S.*(Error|error:|failed)/.test(l) && !/^\s+at /.test(l))
    .map((l) => signal('cron', l, 'cron.log', at)).filter(Boolean);
}

const PHR_FIELDS = /^\s*-\s*(Reflection|Failure modes observed|Next experiment[^:]*):\s*(.+)$/gim;
const EMPTY = /^(none|n\/a|-|null|nothing)\b/i;

/** Lessons a PHR records about itself: reflection, failure modes, next experiment. */
export function phrSignals(text, source, at) {
  const out = [];
  for (const m of String(text || '').matchAll(PHR_FIELDS)) {
    const value = m[2].trim();
    if (!value || EMPTY.test(value) || /^\d+ earlier attempt/i.test(value)) continue;
    out.push(signal('phr', `${m[1].toLowerCase()}: ${value}`, source, at));
  }
  return out.filter(Boolean);
}

/** Open findings of a G3/G5 report, by the clause that names the defect. */
export function reviewSignals(report, source, at) {
  return (report?.findings || [])
    .filter((f) => f && f.resolved !== true && f.message)
    .map((f) => signal('review', String(f.message).split(/[:.]\s/)[0], source, at))
    .filter(Boolean);
}

/**
 * Fold signals into the cluster map (mutates and returns it). Each cluster counts per harvest
 * slot so growth and the effect of an adopted fix can be measured. `slot` is the slot name, or a
 * function of the signal, so a back-filled signal is counted when it happened, not when it was read.
 */
export function foldSignals(clusters, signals, slot) {
  for (const s of signals) {
    const key = `${s.kind}:${s.sig}`;
    const at = typeof slot === 'function' ? slot(s) : slot;
    const c = clusters[key] ||= { kind: s.kind, sig: s.sig, example: s.text, count: 0, first: s.at, last: s.at, evidence: [], slots: {} };
    c.count += 1;
    if (s.at < c.first) c.first = s.at;
    if (s.at > c.last) c.last = s.at;
    c.slots[at] = (c.slots[at] || 0) + 1;
    if (!c.evidence.includes(s.source) && c.evidence.length < MAX_EVIDENCE) c.evidence.push(s.source);
  }
  return clusters;
}

/** Clusters that are hot in this slot and have not been announced yet. */
export function newlyHot(clusters, slot) {
  return Object.values(clusters).filter((c) => !c.alertedAt && ((c.slots[slot] || 0) >= HOT_PER_HARVEST || c.count >= HOT_TOTAL));
}

/** What the daily distill job is given: clusters that grew in the given slots, largest first. */
export function distillDigest(clusters, slots, max = 40) {
  const grew = Object.values(clusters)
    .map((c) => ({ c, recent: slots.reduce((n, s) => n + (c.slots[s] || 0), 0) }))
    .filter((x) => x.recent > 0)
    .sort((a, b) => b.recent - a.recent || b.c.count - a.c.count)
    .slice(0, max);
  if (!grew.length) return '';
  return grew.map(({ c, recent }) => `- [${c.kind}] x${recent} recent, ${c.count} total, since ${c.first.slice(0, 10)}: ${c.sig}\n  example: ${c.example.replace(/\n/g, ' ').slice(0, 200)}\n  evidence: ${c.evidence.slice(0, 3).join(', ')}`).join('\n');
}

/**
 * The adopted items of specs/intelligence/registry.md: a Markdown table whose header has at
 * least `id`; `signature` (a cluster's normalised signature, as `crew intel status` prints it)
 * and `adopted` (the harvest slot it took effect, YYYY-MM-DD-HH) let the harvest measure it.
 */
export function parseRegistry(markdown) {
  const rows = String(markdown || '').split('\n').filter((l) => /^\s*\|/.test(l));
  const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim().replace(/^`|`$/g, ''));
  const headerAt = rows.findIndex((l) => /\|\s*id\s*\|/i.test(l));
  if (headerAt < 0) return [];
  const head = cells(rows[headerAt]).map((h) => h.toLowerCase().replace(/[^a-z]/g, ''));
  return rows.slice(headerAt + 1)
    .filter((l) => !/^\s*\|[\s:|-]+\|\s*$/.test(l))
    .map((l) => Object.fromEntries(cells(l).map((v, i) => [head[i], v])))
    .filter((r) => /^I-\d+$/.test(r.id || ''));
}

/**
 * Did an adopted fix work? Compares the cluster's rate (signals per harvest) over the same number
 * of harvests before and after `adoptedSlot`. Slots sort as strings (YYYY-MM-DD-HH).
 */
export function effect(cluster, adoptedSlot, allSlots) {
  const before = allSlots.filter((s) => s < adoptedSlot);
  const after = allSlots.filter((s) => s >= adoptedSlot);
  const n = Math.min(before.length, after.length);
  if (!cluster || n === 0) return 'too early';
  const rate = (slots) => slots.reduce((sum, s) => sum + (cluster.slots[s] || 0), 0) / slots.length;
  const b = rate(before.slice(-n));
  const a = rate(after.slice(0, n));
  if (b === 0 && a === 0) return 'no signal';
  if (a <= b * 0.5) return 'worked';
  if (a >= b * 1.5) return 'worse';
  return 'no change';
}
