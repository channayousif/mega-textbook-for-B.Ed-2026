#!/usr/bin/env node
/**
 * Runs a gate tier from scripts/lib/gates.mjs in order (Spec 013, FR-013).
 *
 * Runs ALL of them and reports every failure. It used to stop at the first, which
 * is the right shape for a short chain and the wrong one at corpus scale: with
 * `check:pipeline-gate` second in the tier, a single unit with a stale manifest
 * anywhere in the repository meant the other eight gates never ran for anybody, so
 * an author fixing one unit could not see whether their own figures, depth or Bloom
 * tags were sound. One failure hid eight answers.
 *
 * `--bail` restores the old behaviour for a fast local loop.
 *
 * Usage: node scripts/run-gates.mjs [content|full] [--bail]
 *
 * Exists so that "run the gates" is ONE command with ONE definition, instead of
 * four hand-maintained npm-script chains that had already drifted apart.
 */
import { spawnSync } from 'node:child_process';
import { CONTENT_GATES, FULL_GATES } from './lib/gates.mjs';

const args = process.argv.slice(2);
const bail = args.includes('--bail');
const tier = args.includes('full') ? 'full' : 'content';
const gates = tier === 'full' ? FULL_GATES : CONTENT_GATES;

console.log(`Running ${gates.length} ${tier} gates\n`);
const failures = [];
for (const gate of gates) {
  process.stdout.write(`  ${gate.padEnd(24)}`);
  const started = Date.now();
  const res = spawnSync('npm', ['run', '-s', gate], { stdio: 'pipe', encoding: 'utf8' });
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  if (res.status === 0) {
    console.log(`PASS  ${secs}s`);
    continue;
  }
  console.log(`FAIL  ${secs}s`);
  failures.push({ gate, out: (res.stdout || '') + (res.stderr || '') });
  if (bail) break;
}

if (failures.length) {
  for (const { gate, out } of failures) {
    console.error(`\n${'='.repeat(60)}\n${gate}\n${'='.repeat(60)}`);
    process.stderr.write(out);
  }
  const names = failures.map((f) => f.gate).join(', ');
  console.error(bail
    ? `\n${names} failed. Fix it and re-run; later gates did not run.`
    : `\n${failures.length} of ${gates.length} ${tier} gates failed: ${names}.`);
  process.exit(1);
}
console.log(`\nAll ${tier} gates passed.`);
