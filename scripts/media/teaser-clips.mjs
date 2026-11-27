#!/usr/bin/env node
// Generate, record and pre-check the Veo shots of one approved teaser (Feature 030, T030/T033).
//
//   node scripts/media/teaser-clips.mjs <id> [--shots 2,4]
//
// Without --shots: every shot that has no take yet. With --shots: a new take of each listed shot
// (a retake; the ledger allows two retakes per shot). Each shot goes through the clip producers
// (gflow.video, then manual.flow) with lost-clip recovery, is recorded in the teaser ledger under its
// lock, and gets QG1 (media-qa.mjs) and the QG2 transcript match (qg2.mjs) as suggestions; the
// reviewer looks at the frame strips and records each verdict with `teaser.mjs clipqa`.
//
// Refuses unless the ledger shows the owner's script approval for the current script file (FR-012).
// Exit: 0 every requested shot has a new take; 1 some shot failed; 3 clip quota out; 4 no producer
// reachable; 5 held for the owner. Lines starting `MEDIA-HOLD:` tell the crew why it stopped.
import { spawnSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { produce } from './producers/index.mjs';
import { gflowVideo, gflow2Video } from './producers/gflow-video.mjs';
import { manualFlow } from './producers/manual-flow.mjs';
import { recipeFor } from './recipes.mjs';
import { qg2 } from './qg2.mjs';
import { update } from './ledger.mjs';
import { loadScript, scriptSha, ledgerPath, loadLedger, recordClip } from '../notebook-studio/teaser.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const EXIT = { quota: 3, unavailable: 4, held: 5 };

/** Shots to make: the requested retakes, or every shot without a take. */
export function shotsToMake(item, requested) {
  if (requested?.length) return requested;
  return [1, 2, 3, 4, 5].filter((n) => !item.clips.some((c) => c.shot === n));
}

/** Clip ids already recorded anywhere in the teaser ledger: never adopt one twice. */
export const claimedIds = (ledger) => new Set(ledger.items.flatMap((i) => (i.clips ?? []).flatMap((c) => [c.artifact_id, c.media_id].filter(Boolean))));

export async function makeClips(id, { shots, impls, log = console.log, root = ROOT, qa = true } = {}) {
  const key = `${id}-ur`;
  const script = loadScript(id, root);
  const recipe = recipeFor(script, root);
  const sha = scriptSha(id, root);
  const L0 = loadLedger(root);
  const item = L0.items.find((i) => i.key === key);
  if (!item) throw new Error(`no ledger item ${key}`);
  if (!['script-approved', 'clips-generated'].includes(item.state)) throw new Error(`${key} is ${item.state}: clips need the owner's script approval first`);
  if (item.gates?.script?.by !== 'owner' || item.script_sha256 !== sha) throw new Error(`${key}: the owner approved a different script (or none); no credits are spent`);
  const outDir = join(homedir(), 'studio-media', 'teasers', id, 'ur');
  const job = { key, script, recipe, locale: 'ur', outDir };
  impls ??= { 'gflow.video': gflowVideo(), 'gflow2.video': gflow2Video(), 'manual.flow': manualFlow() };
  const made = [];
  for (const n of shotsToMake(item, shots)) {
    const L = loadLedger(root);
    const take = L.items.find((i) => i.key === key).clips.filter((c) => c.shot === n).length + 1;
    const r = await produce('clip', job, n, { impls, ctx: { claimed: claimedIds(L), take } });
    if (r.status !== 'ok') {
      log(`shot ${n}: ${r.status} (${r.producer ?? r.tried?.map((t) => `${t.producer} ${t.status}`).join(', ')}): ${r.reason}`);
      if (r.status === 'failed') { made.push({ shot: n, status: 'failed', reason: r.reason }); continue; }
      log(`MEDIA-HOLD: ${r.status}${r.resetAt ? ` until ${r.resetAt}` : ''} - ${r.reason}`);
      return { made, stop: r.status, resetAt: r.resetAt };
    }
    const rec = update(ledgerPath(root), (Lw) => {
      const dup = Lw.items.flatMap((i) => i.clips ?? []).find((c) => r.sha256 && c.sha256 === r.sha256);
      if (dup) throw new Error(`shot ${n}: the file is identical to an earlier take (${dup.artifact_id}); not recorded`);
      return recordClip(Lw, key, n, { artifact_id: r.mediaId ?? `${key}-s${n}-t${take}`, media_id: r.mediaId, model: r.model, credits: r.credits ?? 0,
        file: r.file.replace(homedir(), '~'), sha256: r.sha256, source: r.source, producer: r.producer }, new Date(), { currentSha: sha });
    });
    const out = { shot: n, take: rec.take, status: 'ok', source: r.source, file: r.file };
    if (qa) {
      const q1 = spawnSync(join(root, 'scripts/heavy.sh'), ['node', join(root, 'scripts/notebook-studio/media-qa.mjs'), r.file, '--kind', 'clip'], { encoding: 'utf8' });
      out.qg1 = q1.status === 0 ? 'pass' : `fail: ${(q1.stdout || q1.stderr).trim().split('\n').slice(-3).join(' | ')}`;
      try {
        const q2 = qg2(r.file, script.locales.ur.narration[n - 1]);
        Object.assign(out, { qg2_score: q2.score, qg2_suggested: q2.suggested, heard: q2.heard, missing: q2.missing, strip: q2.strip });
      } catch (e) { out.qg2 = `not run: ${e.message}`; }
      update(ledgerPath(root), (Lw) => {
        const c = Lw.items.find((i) => i.key === key).clips.find((x) => x.shot === n && x.take === rec.take);
        c.precheck = { qg1: out.qg1, qg2_score: out.qg2_score, qg2_suggested: out.qg2_suggested, heard: out.heard, missing: out.missing, strip: out.strip?.replace(homedir(), '~') };
      });
    }
    log(`shot ${n} take ${rec.take}: ${r.source}, ${out.qg1 ?? ''} QG2 ${out.qg2_score ?? '-'} (${out.qg2_suggested ?? '-'})`);
    made.push(out);
  }
  return { made, stop: null };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const si = a.indexOf('--shots');
  const shots = si >= 0 ? a.splice(si, 2)[1].split(',').map(Number) : undefined;
  if (!a[0]) { console.error('usage: teaser-clips.mjs <id> [--shots 2,4]'); process.exit(2); }
  makeClips(a[0], { shots }).then((r) => {
    console.log(JSON.stringify(r.made, null, 1));
    process.exit(r.stop ? EXIT[r.stop] : r.made.some((m) => m.status === 'failed') ? 1 : 0);
  }).catch((e) => { console.error(e.message); process.exit(1); });
}
