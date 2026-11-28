#!/usr/bin/env node
// Rank Short candidates from a long-form lesson (Feature 038, spec FR-005).
//
//   node scripts/media/pack/highlights.mjs <words.json> [--script script.md] [--top 8] [--out highlights.json]
//
// Two sources: blocks the script tagged `[SHORT-CANDIDATE] <hook>` (planned Shorts, located in the
// transcript by their opening words), and sentence windows of 20-60 s from the transcript itself.
// Each candidate is scored on hook strength, standalone clarity and length, and written unapproved:
// the owner approves Shorts on the admin page before any is rendered. Heuristics only; a Claude pass
// can re-rank later through the crew. Do not import this file from any content gate.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const LIMITS = { min: 20, max: 60, ideal: [25, 45] };
const HOOK = /^(why|what|how|stop|imagine|here'?s|myth|did you know|most teachers|the (one|biggest|real)|never|always|quick (quiz|question)|ever|three|two|five|\d+)/i;
const DANGLING = /^(so|and|but|then|also|right|okay|ok|well|now|this|that|these|those|it|they|he|she|which|because|as i said|like we said)\b/i;
/** True when a word ends a sentence; abbreviations such as "Ms." or "e.g." do not. */
export const endsSentence = (w) => /[.?!]["')\]]?$/.test(w) && !/^(mr|ms|mrs|dr|prof|st|vs|etc|e\.g|i\.e|b\.?ed|m\.?ed|no)\.$/i.test(w.replace(/["'()]/g, '')) && !/^[A-Z]\.$/.test(w);
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9؀-ۿ' ]+/g, ' ').replace(/\s+/g, ' ').trim();

/** Sentences from word timings: [{ start, end, text }]. */
export function sentences(words) {
  const out = []; let cur = null;
  for (const w of words) {
    if (!w.word) continue;
    if (!cur) cur = { start: w.start, end: w.end, text: w.word };
    else { cur.text += ` ${w.word}`; cur.end = w.end; }
    if (endsSentence(w.word)) { out.push(cur); cur = null; }
  }
  if (cur) out.push(cur);
  return out;
}

/** Score one candidate; returns { score, reasons }. */
export function score(text, duration) {
  const reasons = []; let s = 0;
  const first = text.trim();
  if (HOOK.test(first)) { s += 3; reasons.push('opens with a hook'); }
  if (/\?/.test(first.split(/[.?!]/)[0] + (first.match(/[.?!]/)?.[0] ?? ''))) { s += 2; reasons.push('opens with a question'); }
  if (DANGLING.test(first)) { s -= 3; reasons.push('opens mid-thought'); }
  if (/\b(for example|imagine|in a class|your students|a teacher)\b/i.test(text)) { s += 1; reasons.push('has a classroom example'); }
  if (/\b(mistake|instead|myth|actually|wrong)\b/i.test(text)) { s += 1; reasons.push('corrects a misconception'); }
  if (duration >= LIMITS.ideal[0] && duration <= LIMITS.ideal[1]) { s += 2; reasons.push('ideal length'); }
  else if (duration >= LIMITS.min && duration <= LIMITS.max) s += 1;
  else { s -= 5; reasons.push('outside 20-60 s'); }
  if (/[.?!]["')\]]?$/.test(text.trim())) { s += 1; reasons.push('ends on a full sentence'); }
  return { score: s, reasons };
}

/** Sentence windows 20-60 s long, starting at every sentence. */
export function windows(sents) {
  const out = [];
  for (let i = 0; i < sents.length; i++) {
    let text = '';
    for (let j = i; j < sents.length; j++) {
      text = text ? `${text} ${sents[j].text}` : sents[j].text;
      const d = sents[j].end - sents[i].start;
      if (d > LIMITS.max) break;
      if (d >= LIMITS.min) out.push({ start: sents[i].start, end: sents[j].end, text });
    }
  }
  return out;
}

/** `[SHORT-CANDIDATE] hook` blocks from a script: [{ hook, opening, heading }]. */
export function scriptCandidates(md) {
  const out = []; let heading = '';
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^#{2,3}\s+(.+)/);
    if (h) heading = h[1].trim();
    const m = lines[i].match(/\[SHORT-CANDIDATE\]\s*(.*)/);
    if (!m) continue;
    const body = lines.slice(i + 1).find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('[') && !l.startsWith('>'));
    out.push({ hook: m[1].replace(/^hook:\s*/i, '').trim(), opening: (body ?? '').replace(/^[-*]\s*|^\*\*[^*]+\*\*:?\s*/g, '').trim(), heading });
  }
  return out;
}

/** Time of the best match for `phrase` (its first 6 words) in the word stream, or null. */
export function locate(words, phrase) {
  const target = norm(phrase).split(' ').slice(0, 6);
  if (target.length < 3) return null;
  const stream = words.map((w) => norm(w.word));
  let best = { hits: 0, i: -1 };
  for (let i = 0; i + target.length <= stream.length; i++) {
    let hits = 0;
    for (let k = 0; k < target.length; k++) if (stream[i + k] === target[k]) hits++;
    if (hits > best.hits) best = { hits, i };
  }
  return best.hits >= Math.ceil(target.length * 0.6) ? words[best.i].start : null;
}

export function findHighlights(words, { script = '', top = 8 } = {}) {
  const sents = sentences(words);
  const picked = [];
  // Planned Shorts first: start at the block's opening, end at the sentence nearest 45 s later.
  for (const c of scriptCandidates(script)) {
    const t = c.opening ? locate(words, c.opening) : null;
    if (t === null) { picked.push({ source: 'script', hook: c.hook, heading: c.heading, start: null, end: null, duration: null, score: 0, reasons: ['not found in the transcript; place by hand'], text: '' }); continue; }
    const i = sents.findIndex((s) => s.start >= t - 0.5);
    let j = i;
    while (j + 1 < sents.length && sents[j + 1].end - sents[i].start <= LIMITS.ideal[1]) j++;
    const text = sents.slice(i, j + 1).map((s) => s.text).join(' ');
    const d = sents[j].end - sents[i].start;
    const sc = score(text, d);
    picked.push({ source: 'script', hook: c.hook, heading: c.heading, start: sents[i].start, end: sents[j].end, duration: +d.toFixed(2), score: sc.score + 3, reasons: ['planned in the script', ...sc.reasons], text });
  }
  // Transcript windows, best first, not overlapping anything already picked.
  const overlaps = (a, b) => a.start !== null && b.start !== null && a.start < b.end && b.start < a.end;
  const ranked = windows(sents).map((w) => { const d = w.end - w.start; return { source: 'transcript', hook: w.text.split(/(?<=[.?!])\s/)[0], start: w.start, end: w.end, duration: +d.toFixed(2), ...score(w.text, d), text: w.text }; })
    .sort((a, b) => b.score - a.score || a.start - b.start);
  for (const w of ranked) {
    if (picked.length >= top) break;
    if (!picked.some((p) => overlaps(p, w))) picked.push(w);
  }
  return picked.slice(0, Math.max(top, picked.filter((p) => p.source === 'script').length))
    .map((p, n) => ({ id: `short-${String(n + 1).padStart(2, '0')}`, approved: false, ...p }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const scriptPath = opt('--script'); const out = opt('--out'); const top = Number(opt('--top') ?? 8);
  if (!a[0]) { console.error('usage: highlights.mjs <words.json> [--script script.md] [--top 8] [--out highlights.json]'); process.exit(2); }
  const { words } = JSON.parse(readFileSync(resolve(a[0]), 'utf8'));
  const list = findHighlights(words, { script: scriptPath ? readFileSync(resolve(scriptPath), 'utf8') : '', top });
  const json = `${JSON.stringify({ generated_at: new Date().toISOString(), candidates: list }, null, 2)}\n`;
  if (out) writeFileSync(resolve(out), json); else process.stdout.write(json);
  if (out) console.log(`wrote ${out}: ${list.length} candidates (all unapproved)`);
}
