// VS-003 V004: blind the takes for the owner's listening test, and unblind after scoring.
//   npm run voice:blind            # takes/ + inbox/ -> blind/<id>.<ext> + scorecard.csv (provider hidden)
//   npm run voice:blind -- --append   # add takes not yet blinded, keeping existing ids and scores
//   npm run voice:blind -- --unblind  # after scoring: reveal providers, copy results into the repo
// The key lives only in $MEDIA_ROOT (never in git) so nobody sees providers while scoring.
import { randomInt } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { digestFile } from './lib/hash.ts';
import { mediaRoot, VS_ROOT } from './lib/paths.ts';

const root = join(mediaRoot(), 'voice-benchmark');
const keyPath = join(root, 'blind-key.json');
const cardPath = join(root, 'scorecard.csv');
const SPEC = join(VS_ROOT, 'specs', '003-urdu-voice-benchmark');
const header = readFileSync(join(SPEC, 'scorecard.csv'), 'utf8').trim();
const cols = header.split(',');
const NAME_RE = /^([a-z0-9-]+)_(ustani|shagird)_take(\d+)\.(wav|mp3)$/i;

if (process.argv.includes('--unblind')) {
  const key: Record<string, { provider: string; file: string }> = JSON.parse(readFileSync(keyPath, 'utf8'));
  const rows = readFileSync(cardPath, 'utf8').trim().split('\n');
  const out = [rows[0], ...rows.slice(1).map((line) => {
    const cells = line.split(',');
    const k = key[cells[0]];
    cells[cols.indexOf('provider')] = k.provider;
    cells[cols.indexOf('model_or_voice')] = k.file;
    return cells.join(',');
  })];
  // Never overwrite an earlier round's results: a second unblind on the same day gets -2, -3, ...
  const day = new Date().toISOString().slice(0, 10);
  let dest = join(SPEC, `results-${day}.csv`);
  for (let n = 2; existsSync(dest); n++) dest = join(SPEC, `results-${day}-${n}.csv`);
  writeFileSync(dest, out.join('\n') + '\n');
  console.log(`voice:blind: unblinded scorecard written to ${dest} (text only; commit it with a PHR)`);
  process.exit(0);
}

const sources = ['takes', 'inbox'].map((d) => join(root, d)).filter(existsSync);
const files = sources.flatMap((d) => readdirSync(d).filter((f) => NAME_RE.test(f)).map((f) => join(d, f)));
if (!files.length) throw new Error(`no takes found in ${sources.join(', ') || root}`);
const blindDir = join(root, 'blind');
const append = process.argv.includes('--append') && existsSync(keyPath);
if (!append) rmSync(blindDir, { recursive: true, force: true });
mkdirSync(blindDir, { recursive: true });
const key: Record<string, { provider: string; file: string }> = append ? JSON.parse(readFileSync(keyPath, 'utf8')) : {};
const lines = append ? readFileSync(cardPath, 'utf8').trim().split('\n') : [header];
const done = new Set(Object.values(key).map((k) => k.file));
for (const character of ['ustani', 'shagird']) {
  const prefix = character === 'ustani' ? 'U' : 'B';
  const used = Object.keys(key).filter((id) => id.startsWith(prefix)).length;
  const mine = files.filter((f) => !done.has(f.split('/').pop()!) && NAME_RE.exec(f.split('/').pop()!)![2].toLowerCase() === character);
  for (let i = mine.length - 1; i > 0; i--) { const j = randomInt(i + 1); [mine[i], mine[j]] = [mine[j], mine[i]]; }
  for (const [n, f] of mine.entries()) {
    const m = NAME_RE.exec(f.split('/').pop()!)!;
    const id = `${prefix}${String(used + n + 1).padStart(2, '0')}`;
    copyFileSync(f, join(blindDir, `${id}${extname(f).toLowerCase()}`));
    key[id] = { provider: m[1], file: f.split('/').pop()! };
    const row = Object.fromEntries(cols.map((c) => [c, '']));
    Object.assign(row, { blind_id: id, provider: 'hidden', model_or_voice: 'hidden', take: m[3], sha256: await digestFile(f), session_date: new Date().toISOString().slice(0, 10) });
    lines.push(cols.map((c) => row[c]).join(','));
  }
}
writeFileSync(keyPath, JSON.stringify(key, null, 2));
writeFileSync(cardPath, lines.join('\n') + '\n');
console.log(`voice:blind: ${Object.keys(key).length} takes blinded into ${blindDir}`);
console.log(`Score each row 1-5 in ${cardPath} (U = Ustani lines, B = Bilal lines), then run: npm run voice:blind -- --unblind`);
