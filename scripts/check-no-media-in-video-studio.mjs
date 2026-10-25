#!/usr/bin/env node
/**
 * Guard: fail if git tracks a media file (or any large file) under video-studio/.
 *
 * Owner rule (2026-10-25), video-studio constitution XIII, ADR-0031: output videos and all
 * other media never enter the repo, which is public. `.gitignore` alone is not enough - an
 * agent's `git add -f`, or a crew worker committing with `git add -A` after someone edits the
 * ignore file, would publish a render, a narrator recording or a consent scan. This reads git's
 * index, so it checks what would actually be committed, not what happens to be on disk.
 *
 * Exit 1 on any hit. Run via `npm run check:no-media`.
 *
 * Usage:
 *   node scripts/check-no-media-in-video-studio.mjs [--root <dir>]
 */

import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { extname, join } from 'node:path';

const SCOPE = 'video-studio';
const MEDIA_EXTENSIONS = new Set([
  '.mp4', '.mov', '.mkv', '.webm', '.avi',
  '.wav', '.mp3', '.m4a', '.aac', '.flac', '.ogg',
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.psd',
  '.srt', '.vtt',
]);
const MAX_BYTES = 1024 * 1024; // text artefacts here are small; anything bigger is suspect
// Text files that must never be committed either (personal data, credentials).
const FORBIDDEN_PATHS = [/^video-studio\/brand\/consents\/(?!README\.md$)/, /(^|\/)kaggle\.json$/];

const args = process.argv.slice(2);
const rootIdx = args.indexOf('--root');
const root = rootIdx >= 0 ? args[rootIdx + 1] : process.cwd();

const tracked = execFileSync('git', ['ls-files', '-z', '--', SCOPE], { cwd: root, encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);

const hits = [];
for (const path of tracked) {
  if (MEDIA_EXTENSIONS.has(extname(path).toLowerCase())) hits.push(`${path}: media file`);
  else if (FORBIDDEN_PATHS.some((re) => re.test(path))) hits.push(`${path}: personal data or credential`);
  else {
    let size = 0;
    try {
      size = statSync(join(root, path)).size;
    } catch {
      continue; // staged deletion - nothing on disk to publish
    }
    if (size > MAX_BYTES) hits.push(`${path}: ${size} bytes (over ${MAX_BYTES})`);
  }
}

if (hits.length) {
  console.error(`check:no-media - ${hits.length} file(s) under ${SCOPE}/ must not be in git:\n`);
  for (const h of hits) console.error(`  ${h}`);
  console.error('\nMedia lives under $MEDIA_ROOT outside the working tree (video-studio/CLAUDE.md).'
    + '\nRemove with `git rm --cached <path>` and keep the file in $MEDIA_ROOT.');
  process.exit(1);
}
console.log(`check:no-media - OK (${tracked.length} tracked file(s) under ${SCOPE}/, no media)`);
