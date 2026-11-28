#!/usr/bin/env node
// Stage 1 of a content pack: read a topic page into topic.json (Feature 038).
//
//   node scripts/media/pack/intake.mjs <course> <unit> <topic> [--print]
//
// Reads the topic MDX through content-roots (both tracks), the unit's learning outcomes, the topic's
// section headings and its further-reading list, and writes specs/studio/packs/<course>/unit-NN/
// topic-NN/topic.json. Every later stage (angle, script, metadata) cites what is in this file, so a
// claim that is not traceable to it or to a listed source does not go into a pack (FR-011).
// Do not import this file from any content gate.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveUnit } from '../../lib/content-roots.mjs';
import { ROOT, pad2, specDir, parseTopic } from './paths.mjs';

/** Front matter as a flat object (strings and string lists only). */
export function frontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {}; let listKey = null;
  for (const line of m[1].split('\n')) {
    const item = line.match(/^\s+-\s+"?(.*?)"?\s*$/);
    if (item && listKey) { out[listKey].push(item[1]); continue; }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const v = kv[2].trim().replace(/^"(.*)"$/, '$1');
    if (v === '') { listKey = kv[1]; out[listKey] = []; } else { listKey = null; out[kv[1]] = v; }
  }
  return out;
}

/** The list items under a `## <heading>` section, joined across wrapped lines. */
export function sectionList(md, heading) {
  const re = new RegExp(`^## ${heading}\\s*$`, 'mi');
  const start = md.search(re);
  if (start < 0) return [];
  const body = md.slice(start).split('\n').slice(1);
  const end = body.findIndex((l) => /^## /.test(l));
  const items = []; let cur = null;
  for (const l of body.slice(0, end < 0 ? undefined : end)) {
    if (/^- /.test(l)) { if (cur) items.push(cur); cur = l.slice(2).trim(); }
    else if (cur && /^\s+\S/.test(l)) cur += ` ${l.trim()}`;
    else if (cur && !l.trim()) { items.push(cur); cur = null; }
  }
  if (cur) items.push(cur);
  return items.map((s) => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim());
}

export const headings = (md) => [...md.matchAll(/^(##|###) (.+)$/gm)].map((m) => ({ level: m[1].length, text: m[2].trim() }));

export function intake(course, unit, topic, root = ROOT) {
  const u = resolveUnit(root, course, unit);
  const file = join(u.unitDir, `topic-${pad2(topic)}.mdx`);
  if (!existsSync(file)) throw new Error(`no topic file ${relative(root, file)}`);
  const md = readFileSync(file, 'utf8');
  const fm = frontMatter(md);
  const index = join(u.unitDir, 'index.mdx');
  const outcomes = existsSync(index) ? sectionList(readFileSync(index, 'utf8'), 'Unit learning outcomes') : [];
  return {
    course, unit, topic, track: (u.track?.contentRoot ?? relative(root, u.unitDir).split('/')[0]) === 'licence' ? 'licence' : 'bed',
    label: fm.topic_label ?? `${unit}.${topic}`,
    title: String(fm.title ?? '').replace(/^Topic [\d.]+ - /, ''),
    description: fm.description ?? '',
    blooms_summary: fm.blooms_summary ?? '',
    clo_refs: fm.clo_refs ?? [],
    unit_outcomes: outcomes,
    sections: headings(md),
    sources: sectionList(md, 'Further reading'),
    source_file: relative(root, file),
    translation_status: fm.translation_status ?? null,
    read_at: new Date().toISOString(),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const print = a.includes('--print');
  try {
    const { course, unit, topic } = parseTopic(a.filter((x) => x !== '--print'));
    const t = intake(course, unit, topic);
    const json = `${JSON.stringify(t, null, 2)}\n`;
    if (print) process.stdout.write(json);
    else { const dir = specDir(course, unit, topic); mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, 'topic.json'), json); console.log(`wrote ${relative(ROOT, join(dir, 'topic.json'))}: "${t.title}", ${t.sections.length} sections, ${t.sources.length} sources`); }
  } catch (e) { console.error(`intake: ${e.message}`); process.exit(1); }
}
