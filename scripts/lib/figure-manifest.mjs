/**
 * Figure-manifest table parser and per-row production-status summary, extracted
 * (behavior-preserving) out of `check-figures.mjs` (Spec 010 T003, research.md R9).
 *
 * `report-content-status.mjs` (Story 4, FR-033) imports this module rather than
 * re-parsing a manifest itself, so its counts can never drift from the gate's own
 * reading of the same file.
 */
import { readFileSync, existsSync } from 'node:fs';

export const STATUS_ENUM = new Set(['prompt-only', 'generated', 'placed']);
export const KIND_ENUM = new Set(['diagram', 'illustration']);

/** Column-aware manifest table parse — supports both the Spec 008 v1 and Spec 009 v2 header shapes. */
export function parseManifest(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().startsWith('|'));
  let header = null;
  const rows = [];
  for (const line of lines) {
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue; // separator
    if (!header) {
      if (/^figure id$/i.test(cells[0])) { header = cells.map((c) => c.toLowerCase()); }
      continue;
    }
    rows.push(cells);
  }
  if (!header) return null;
  const ix = (name) => header.indexOf(name);
  const iId = ix('figure id');
  const iTopic = ix('topic');
  const iKind = ix('kind'); // -1 for v1
  const iPrompt = ix('prompt');
  const iAlt = ix('alt text');
  const iSrc = ix('src'); // -1 for v1
  const iStatus = ix('status');
  const out = [];
  for (const cells of rows) {
    if (cells.length < header.length - 1) continue; // malformed short row
    out.push({
      id: cells[iId] ?? '',
      topic: cells[iTopic] ?? '',
      kind: iKind >= 0 ? (cells[iKind] ?? '') : '',
      prompt: cells[iPrompt] ?? '',
      alt: cells[iAlt] ?? '',
      src: iSrc >= 0 ? (cells[iSrc] ?? '') : '',
      status: cells[iStatus] ?? '',
      hasKindCol: iKind >= 0,
      hasSrcCol: iSrc >= 0,
    });
  }
  return out;
}

/** Reads and parses a manifest file, or `null` if it doesn't exist or has no parseable header. */
export function readManifest(manifestFile) {
  if (!existsSync(manifestFile)) return null;
  return parseManifest(readFileSync(manifestFile, 'utf8'));
}

/**
 * Summarizes a manifest's rows into production-state counts plus a "still pending" list
 * (any row not yet `placed`) — the exact shape `report-content-status.mjs` writes per unit
 * (data-model.md's "Content-status snapshot"). `rows` may be `null` (no manifest at all),
 * which summarizes to all-zero counts and an empty pending list — never an error (US4 AS2).
 */
export function figureStatusFor(rows) {
  const counts = { prompt_only: 0, generated: 0, placed: 0 };
  const pending = [];
  for (const r of rows ?? []) {
    if (r.status === 'prompt-only') counts.prompt_only++;
    else if (r.status === 'generated') counts.generated++;
    else if (r.status === 'placed') counts.placed++;
    else continue; // unrecognized status — the gate is the source of truth for validity
    if (r.status !== 'placed') pending.push({ figure_id: r.id, topic: r.topic });
  }
  return { counts, pending };
}
