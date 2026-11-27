#!/usr/bin/env node
// Text drafts on Workers AI (Feature 037, D-2026-0103): YouTube descriptions, social captions and
// first drafts of alt text, from facts the caller gives. The output is always a DRAFT that Claude or
// the owner checks and edits; this script writes nothing to content, ledgers or manifests.
//
//   node scripts/media/cfai-text.mjs youtube|caption|alt --context "<facts>" [--file facts.txt] [--json]
//
// Uses the free Workers AI allowance through producers/cfai.mjs (cap and ledger there).
// Do not import this file from any content gate (FR-018).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete, TEXT_MODEL, CfaiError } from './producers/cfai.mjs';

const HOUSE = 'You write for textbook.com.pk, a free bilingual (English and Urdu) teacher-education textbook for B.Ed students in Pakistan. Write plain, warm, accurate English. Use only the facts given; never invent numbers, names, dates or claims. No emojis. Never use the long dash character; use commas or a spaced hyphen instead.';

export const KINDS = {
  youtube: { maxTokens: 600, ask: 'Write a YouTube description of two or three short sentences for this video, saying who it is for and what it covers, then a final line with the exact page address given (or textbook.com.pk). No hashtags.' },
  caption: { maxTokens: 400, ask: 'Write one social media caption of at most 40 words announcing this, then up to two relevant hashtags on a new line.' },
  alt: { maxTokens: 400, ask: 'Write alt text for this illustration in one or two sentences (at most 45 words): describe who is in the scene and what is happening, as a screen-reader user needs it. Do not start with "Image of" and add no interpretation that is not in the description.' },
};

/** The messages for one draft. */
export function draftMessages(kind, context) {
  const k = KINDS[kind];
  if (!k) throw new Error(`unknown kind ${kind}; use ${Object.keys(KINDS).join(', ')}`);
  return [{ role: 'system', content: HOUSE }, { role: 'user', content: `${k.ask}\n\nFacts:\n${context.trim()}` }];
}

/** Long dashes the house style forbids, replaced so a careless draft cannot carry one forward. */
export const cleanDashes = (t) => t.replace(/\s*[\u2014\u2015\u2E3A\u2E3B]\s*/g, ' - ');

/** An empty reply means the budget ran out, so it retries once with double the budget. */
export async function draft(kind, context, opts = {}) {
  const messages = draftMessages(kind, context);
  let text = await complete(messages, { maxTokens: KINDS[kind].maxTokens, ...opts });
  if (!text) text = await complete(messages, { maxTokens: KINDS[kind].maxTokens * 2, ...opts });
  if (!text) throw new Error('Workers AI returned an empty draft twice');
  return cleanDashes(text);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const asJson = a.includes('--json');
  const file = opt('--file');
  const context = opt('--context') ?? (file ? readFileSync(resolve(file), 'utf8') : '');
  const kind = a.filter((x) => x !== '--json')[0];
  if (!KINDS[kind] || !context.trim()) { console.error(`usage: cfai-text.mjs ${Object.keys(KINDS).join('|')} --context "<facts>" [--file f] [--json]`); process.exit(2); }
  try {
    const text = await draft(kind, context);
    if (asJson) console.log(JSON.stringify({ kind, model: TEXT_MODEL, draft: true, text }));
    else console.log(`DRAFT (Workers AI ${TEXT_MODEL}; check and edit before use)\n\n${text}`);
  } catch (e) {
    console.error(`cfai-text: ${e instanceof CfaiError ? `${e.status}: ` : ''}${e.message}`);
    process.exit(e instanceof CfaiError && e.status === 'quota' ? 3 : 1);
  }
}
