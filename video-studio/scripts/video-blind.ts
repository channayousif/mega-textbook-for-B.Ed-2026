// VS-005 OV020: blind the bench clips for the owner's review, and unblind after scoring.
//   npm run video:blind              clips/ + inbox/ -> blind/<shot>-<letter>.<ext> + scorecard.csv
//   npm run video:blind -- --append  add clips not yet blinded, keeping ids and scores
//   npm run video:blind -- --unblind after scoring: reveal providers, write results-<date>.csv here
// Reference clips from the owner go in $MEDIA_ROOT/video-benchmark/inbox/ named like
// flow_S1_s1.mp4 (Flow/Veo) or puppet_S1_s1.mp4 (current Remotion render). Clips are shuffled
// within each shot so the owner compares the alternatives for one shot side by side.
// The key lives only in $MEDIA_ROOT (never in git).
import { randomInt } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { digestFile } from './lib/hash.ts';
import { mediaRoot } from './lib/paths.ts';
import { CLIP_RE, SPEC_DIR } from './lib/video-bench.ts';

const root = join(mediaRoot(), 'video-benchmark');
const keyPath = join(root, 'blind-key.json');
const cardPath = join(root, 'scorecard.csv');
const header = readFileSync(join(SPEC_DIR, 'scorecard.csv'), 'utf8').trim();
const cols = header.split(',');
type Key = Record<string, { provider: string; file: string }>;

if (process.argv.includes('--unblind')) {
  const key: Key = JSON.parse(readFileSync(keyPath, 'utf8'));
  const rows = readFileSync(cardPath, 'utf8').trim().split('\n');
  const out = [rows[0], ...rows.slice(1).map((line) => {
    const cells = line.split(',');
    const k = key[cells[0]];
    if (!k) throw new Error(`scorecard row ${cells[0]} is not in the blind key`);
    cells[cols.indexOf('provider')] = k.provider;
    cells[cols.indexOf('model')] = k.file;
    return cells.join(',');
  })];
  const day = new Date().toISOString().slice(0, 10);
  let dest = join(SPEC_DIR, `results-${day}.csv`);
  for (let n = 2; existsSync(dest); n++) dest = join(SPEC_DIR, `results-${day}-${n}.csv`);
  writeFileSync(dest, out.join('\n') + '\n');
  console.log(`video:blind: unblinded scorecard written to ${dest} (text only; commit it with a PHR)`);
  process.exit(0);
}

const sources = ['clips', 'inbox'].map((d) => join(root, d)).filter(existsSync);
const files = sources.flatMap((d) => readdirSync(d).filter((f) => CLIP_RE.test(f)).map((f) => join(d, f)));
if (!files.length) throw new Error(`no clips named <provider>_<shot>_s<seed>.mp4 in ${sources.join(', ') || root}`);
const blindDir = join(root, 'blind');
const append = process.argv.includes('--append') && existsSync(keyPath);
if (!append) rmSync(blindDir, { recursive: true, force: true });
mkdirSync(blindDir, { recursive: true });
const key: Key = append ? JSON.parse(readFileSync(keyPath, 'utf8')) : {};
const lines = append ? readFileSync(cardPath, 'utf8').trim().split('\n') : [header];
const done = new Set(Object.values(key).map((k) => k.file));
const name = (f: string) => f.split('/').pop()!;
const byShot = new Map<string, string[]>();
for (const f of files.filter((x) => !done.has(name(x)))) {
  const shot = CLIP_RE.exec(name(f))![2].toUpperCase();
  byShot.set(shot, [...(byShot.get(shot) ?? []), f]);
}
const letter = (n: number) => (n < 26 ? String.fromCharCode(97 + n) : `z${n - 25}`);
for (const shot of [...byShot.keys()].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))) {
  const mine = byShot.get(shot)!;
  for (let i = mine.length - 1; i > 0; i--) { const j = randomInt(i + 1); [mine[i], mine[j]] = [mine[j], mine[i]]; }
  const used = Object.keys(key).filter((id) => id.startsWith(`${shot}-`)).length;
  for (const [n, f] of mine.entries()) {
    const m = CLIP_RE.exec(name(f))!;
    const id = `${shot}-${letter(used + n)}`;
    copyFileSync(f, join(blindDir, `${id}${extname(f).toLowerCase()}`));
    key[id] = { provider: m[1], file: name(f) };
    const row = Object.fromEntries(cols.map((c) => [c, '']));
    Object.assign(row, { blind_id: id, shot, provider: 'hidden', model: 'hidden', seed: m[3], sha256: await digestFile(f), session_date: new Date().toISOString().slice(0, 10) });
    lines.push(cols.map((c) => row[c]).join(','));
  }
}
writeFileSync(keyPath, JSON.stringify(key, null, 2));
writeFileSync(cardPath, lines.join('\n') + '\n');
console.log(`video:blind: ${Object.keys(key).length} clips blinded into ${blindDir}`);
console.log(`Score motion, identity, cultural, artefacts and professional 1-5 in ${cardPath} (see specs/005-open-video-models/spec.md pass criteria), then run: npm run video:blind -- --unblind`);
