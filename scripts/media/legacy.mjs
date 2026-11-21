// Read-only views of the existing media records in the shared vocabulary (Feature 030, FR-003, T008).
// Nothing here writes: teaser ledger, Notebook Studio ledgers and manifests, and figure manifests keep
// their own formats and history. Do not import this file from any content gate (FR-018).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** Teaser ledger (specs/studio/teasers/media-teasers.json) state -> shared state. */
export const TEASER_MAP = {
  planned: 'planned', scripted: 'scripted', 'script-approved': 'approved', 'clips-generated': 'generated',
  'clips-qa': 'checked', assembled: 'assembled', 'qa-pass': 'assembled', 'uploaded-private': 'uploaded-private',
  'qa3-pass': 'uploaded-private', approved: 'owner-approved', public: 'public',
};

/** Notebook Studio media ledger (media-unit-NN.json) state -> shared state. */
export const MEDIA_MAP = {
  planned: 'planned', generated: 'generated', downloaded: 'generated', 'qa1-pass': 'checked', encoded: 'assembled',
  'qa2-pass': 'assembled', 'uploaded-private': 'uploaded-private', 'qa3-pass': 'uploaded-private',
  approved: 'owner-approved', public: 'public', placed: 'placed',
};

/** Studio manifest (unit-NN.json) artifact status -> shared state. */
export const MANIFEST_MAP = { planned: 'planned', generated: 'generated', reviewed: 'checked', placed: 'placed' };

/** Figure manifest Status column -> shared state (lifecycle prompt-only -> generated -> placed). */
export const FIGURE_MAP = { 'prompt-only': 'planned', generated: 'generated', placed: 'placed' };

const MANIFEST_KIND = { audio: 'audio.brief', video: 'video.overview', poster: 'doc.poster', mindmap: 'doc.mindmap',
  brief: 'doc.brief', studyguide: 'doc.studyguide', slides: 'doc.slides' };
const SCHEMATIC = new Set(['table', 'concept-map', 'flowchart', 'timeline', 'diagram']);

const mapState = (map, s, where) => {
  const m = map[s];
  if (!m) throw new Error(`${where}: unknown state "${s}"`);
  return m;
};
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const dirs = (p) => (existsSync(p) ? readdirSync(p).filter((d) => statSync(join(p, d)).isDirectory()) : []);

export function teaserJobs(root = ROOT) {
  const p = join(root, 'specs/studio/teasers/media-teasers.json');
  if (!existsSync(p)) return [];
  return readJson(p).items.map((i) => ({
    source: 'teaser-ledger', key: i.key, kind: 'video.teaser', scope: { course: i.id?.toUpperCase(), locale: i.locale },
    state: mapState(TEASER_MAP, i.state, i.key), legacy_state: i.state, youtube_id: i.youtube_id ?? null,
    blocked: i.blocked ?? null, takes: (i.clips ?? []).length,
  }));
}

export function notebookJobs(root = ROOT) {
  const base = join(root, 'specs/studio');
  const out = [];
  for (const course of dirs(base).filter((d) => !['teasers', 'prompts', 'recipes'].includes(d))) {
    for (const f of readdirSync(join(base, course))) {
      const p = join(base, course, f);
      let m;
      if ((m = f.match(/^media-unit-(\d{2})\.json$/))) {
        for (const i of readJson(p).items) {
          out.push({ source: `${course}/${f}`, key: `${course}-u${m[1]}-${i.key}`,
            kind: i.kind === 'audio' ? (i.part > 1 ? 'audio.deeper' : 'audio.brief') : 'video.overview',
            scope: { course: course.toUpperCase(), unit: Number(m[1]), topic: i.topic, locale: i.locale },
            state: mapState(MEDIA_MAP, i.state, `${course}/${f} ${i.key}`), legacy_state: i.state,
            youtube_id: i.youtube_id ?? null, blocked: i.blocked ?? null });
        }
      } else if ((m = f.match(/^unit-(\d{2})\.json$/))) {
        for (const a of readJson(p).artifacts ?? []) {
          // Audio and video manifest rows mirror the media ledger; count them there, not twice.
          if (a.kind === 'audio' || a.kind === 'video') continue;
          out.push({ source: `${course}/${f}`, key: `${course}-u${m[1]}-t${a.topic}-${a.locale}-${a.kind}`,
            kind: MANIFEST_KIND[a.kind], scope: { course: course.toUpperCase(), unit: Number(m[1]), topic: a.topic, locale: a.locale },
            state: mapState(MANIFEST_MAP, a.status, `${course}/${f} ${a.kind}`), legacy_state: a.status });
        }
      }
    }
  }
  return out;
}

/** Rows of every `specs/content/<course>/figures/unit-NN.md` table (Figure ID, Kind, Status columns). */
export function figureJobs(root = ROOT) {
  const base = join(root, 'specs/content');
  const out = [];
  for (const course of dirs(base)) {
    const fd = join(base, course, 'figures');
    if (!existsSync(fd)) continue;
    for (const f of readdirSync(fd).filter((x) => /^unit-\d{2}\.md$/.test(x))) {
      const lines = readFileSync(join(fd, f), 'utf8').split('\n').filter((l) => l.startsWith('|'));
      const head = lines[0]?.split('|').map((c) => c.trim().toLowerCase());
      if (!head) continue;
      const col = (n) => head.indexOf(n);
      const [iId, iKind, iStatus] = [col('figure id'), col('kind'), col('status')];
      if (iId < 0 || iStatus < 0) continue;
      for (const l of lines.slice(2)) {
        const c = l.split('|').map((x) => x.trim());
        const status = c[iStatus]?.replace(/`/g, '');
        if (!c[iId] || !FIGURE_MAP[status]) continue;
        const kind = (c[iKind] ?? '').toLowerCase();
        out.push({ source: `${course}/figures/${f}`, key: `${course}-${c[iId]}`,
          kind: SCHEMATIC.has(kind) ? 'image.schematic' : 'image.illustration',
          scope: { course: course.toUpperCase(), unit: Number(f.slice(5, 7)) }, state: FIGURE_MAP[status], legacy_state: status });
      }
    }
  }
  return out;
}

/** Every media job the repository records, in the shared vocabulary. */
export const allJobs = (root = ROOT) => [...teaserJobs(root), ...notebookJobs(root), ...figureJobs(root)];
