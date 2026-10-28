// Import one voice line into an episode (VS-003 V006). Validates the file, checks the character's
// voice card and consent scope (PI-08), normalises to PCM 48 kHz mono -16 LUFS under
// $MEDIA_ROOT/<id>/audio/<line>.wav and records hash provenance in episode.json. The entry is
// "pending": only the owner accepts assets, at the assets gate (PI-03).
//   npm run voice:import -- <episode-id> <line-id> <file> --character <ustani|shagird> --source <tool>
//     [--model <id>] [--take N] [--prompt "..."] [--reason "why this replaces the previous take"]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { readEpisode } from './lib/episode.ts';
import { assertEpisodeId, episodeDir, mediaRoot, VS_ROOT } from './lib/paths.ts';
import { assertValid } from './lib/schema.ts';
import { importVoiceLine } from './lib/voice-import.ts';

const argv = process.argv.slice(2);
const opt = (name: string) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : undefined; };
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--')));
const [id, lineId, file] = positional;
if (!id || !lineId || !file || !opt('character') || !opt('source')) {
  console.error('usage: npm run voice:import -- <episode-id> <line-id> <file> --character <ustani|shagird> --source <tool> [--model m] [--take N] [--prompt "..."] [--reason "..."]');
  process.exit(1);
}
assertEpisodeId(id);
const dir = episodeDir(id);
const scriptPath = join(dir, 'script.json');
try {
  const r = await importVoiceLine({
    episode: readEpisode(id),
    script: existsSync(scriptPath) ? JSON.parse(readFileSync(scriptPath, 'utf8')) : undefined,
    lineId, file: resolve(file), character: opt('character')!, sourceTool: opt('source')!,
    model: opt('model'), take: opt('take') ? Number(opt('take')) : undefined,
    prompt: opt('prompt'), reason: opt('reason'),
    mediaRoot: mediaRoot(), voicesDir: join(VS_ROOT, 'brand', 'voices'),
  });
  if (r.unchanged) {
    console.log(`voice:import: ${lineId} already holds these bytes (${r.entry.sha256.slice(0, 12)}…); nothing changed`);
  } else {
    assertValid('episode', r.episode);
    writeFileSync(join(dir, 'episode.json'), JSON.stringify(r.episode, null, 2) + '\n');
    console.log(`voice:import: ${lineId} ${r.entry.sha256.slice(0, 12)}… → ${r.entry.path} (pending owner review)`);
    if (r.superseded) console.log(`  replaces ${r.superseded.sha256.slice(0, 12)}… (kept, status rejected)`);
    console.log(`  consent ${r.entry.voice.consent_id}; episode status ${r.episode.status}`);
  }
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
