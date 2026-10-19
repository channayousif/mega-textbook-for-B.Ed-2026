import type { PluginOptions } from '@docusaurus/plugin-content-docs';
import catalog from './catalog/courses.json';

/**
 * Sidebar labels for the textbook docs, derived from data instead of hand-kept
 * `_category_.json` labels and `i18n/ur/.../current.json` keys (owner report,
 * 2026-10-17: units without "Unit N", the course overview listed last, Urdu
 * labels half in English, Semester 2 inconsistent).
 *
 *   Semester   "Semester 2"                   / "سمسٹر 2"
 *   Course     "EFMP-304 · <catalog title>"   / "EFMP-304 · <catalog title_ur>"
 *   Unit       "Unit 3 · <unit index title>"  / "یونٹ 3 · <Urdu index title>"
 *   Topic      "Topic 3.2 · <topic title>"    / "موضوع 3.2 · <Urdu topic title>"
 *   Overview first in each course; unit assessment and teacher notes get fixed labels.
 *
 * On the Urdu site a page with no Urdu file falls back to English. Its label stays
 * wholly English (never half-translated) and carries `sidebar-item--en`, which
 * src/css/custom.css renders left-to-right with an "EN" marker.
 */
type Item = Record<string, any>;
type SidebarItemsGeneratorOption = PluginOptions['sidebarItemsGenerator'];

const courses = new Map<string, { title_en: string; title_ur?: string }>(
  [...catalog.semesters, ...((catalog as any).tracks ?? [])]
    .flatMap((s: any) => s.courses ?? [])
    .map((c: any) => [c.code.toLowerCase(), c]),
);

const LABELS = {
  en: { semester: 'Semester', unit: 'Unit', topic: 'Topic', overview: 'Course overview', review: 'Course review', assessment: 'Unit assessment', notes: 'Teacher notes' },
  ur: { semester: 'سمسٹر', unit: 'یونٹ', topic: 'موضوع', overview: 'کورس کا تعارف', review: 'کورس کا اعادہ', assessment: 'یونٹ کا جائزہ', notes: 'اساتذہ کے لیے نوٹس' },
};

/** "Topic 2.1 - Water on Earth" / "موضوع 2.1 - ..." -> ["2.1", "Water on Earth"]. */
function splitNumbered(title: string): [string | null, string] {
  const m = title.match(/^\s*(?:Topic|موضوع|Unit|یونٹ)?\s*(\d+(?:\.\d+)?)\s*[-–·:]\s*(.+)$/);
  return m ? [m[1], m[2].trim()] : [null, title.trim()];
}

/** Every doc id under a category, to find which folder it stands for. */
function docIds(item: Item): string[] {
  if (item.type === 'doc') return [item.id];
  if (item.type !== 'category') return [];
  return [...(item.link?.type === 'doc' ? [item.link.id] : []), ...item.items.flatMap(docIds)];
}

/** The folder a category stands for: its depth's prefix of any doc path under it. */
function dirOf(item: Item, depth: number): string {
  const id = docIds(item)[0];
  return id ? id.split('/').slice(0, depth + 1).join('/') : '';
}

const ORDER = (it: Item): number => {
  const id = it.type === 'doc' ? it.id : '';
  if (id.endsWith('/course-overview')) return 0;
  if (id.endsWith('/course-review')) return 2;
  return 1;
};

export const textbookSidebarItems: SidebarItemsGeneratorOption = async ({ defaultSidebarItemsGenerator, ...args }) => {
  const items = (await defaultSidebarItemsGenerator(args)) as Item[];
  const ur = (process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en') === 'ur';
  const L = ur ? LABELS.ur : LABELS.en;
  const docs = new Map(args.docs.map((d) => [d.id, d]));
  // A doc read from docs/ on the Urdu build is the English fallback, not a translation.
  const isEnglish = (id: string) => ur && !String(docs.get(id)?.source ?? '').startsWith('@site/i18n/');
  const en = (it: Item, english: boolean) =>
    english ? { ...it, className: [it.className, 'sidebar-item--en'].filter(Boolean).join(' ') } : it;

  const docLabel = (it: Item): Item => {
    const base = it.id.split('/').at(-1);
    const english = isEnglish(it.id);
    const W = english ? LABELS.en : L;
    if (base === 'course-overview') return en({ ...it, label: W.overview }, english);
    if (base === 'course-review') return en({ ...it, label: W.review }, english);
    if (base === 'unit-assessment') return en({ ...it, label: W.assessment }, english);
    if (base === 'unit-teacher-notes') return en({ ...it, label: W.notes }, english);
    if (/^topic-\d+$/.test(base)) {
      const [num, title] = splitNumbered(docs.get(it.id)?.title ?? it.label ?? base);
      return en({ ...it, label: num ? `${W.topic} ${num} · ${title}` : title }, english);
    }
    return it;
  };

  const walk = (it: Item, depth = 0): Item => {
    if (it.type === 'doc') return docLabel(it);
    if (it.type !== 'category') return it;
    const children = it.items.map((c: Item) => walk(c, depth + 1)).sort((a: Item, b: Item) => ORDER(a) - ORDER(b));
    const dir = dirOf(it, depth);
    const leaf = dir.split('/').at(-1) ?? '';
    let label = it.label;
    let english = false;
    let m: RegExpMatchArray | null;
    if ((m = leaf.match(/^semester-(\d+)$/))) label = `${L.semester} ${Number(m[1])}`;
    else if (courses.has(leaf)) {
      const c = courses.get(leaf)!;
      label = `${leaf.toUpperCase()} · ${(ur && c.title_ur) || c.title_en}`;
    } else if ((m = leaf.match(/^unit-(\d+)$/))) {
      const indexId = it.link?.type === 'doc' ? it.link.id : `${dir}/index`;
      english = isEnglish(indexId);
      const W = english ? LABELS.en : L;
      const [, title] = splitNumbered(docs.get(indexId)?.title ?? it.label);
      label = `${W.unit} ${Number(m[1])} · ${title}`;
    }
    // The folder path is a stable, unique translation key (labels can repeat across courses).
    return en({ ...it, label, key: dir || it.key, items: children }, english);
  };

  return items.map((it) => walk(it)) as Awaited<ReturnType<typeof defaultSidebarItemsGenerator>>;
};
