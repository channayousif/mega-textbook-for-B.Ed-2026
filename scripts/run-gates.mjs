#!/usr/bin/env node
/**
 * Runs a gate tier from scripts/lib/gates.mjs in order, stopping at the first
 * failure (Spec 013, FR-013).
 *
 * Usage: node scripts/run-gates.mjs [content|full]
 *
 * Exists so that "run the gates" is ONE command with ONE definition, instead of
 * four hand-maintained npm-script chains that had already drifted apart.
 */
import { spawnSync } from 'node:child_process';
import { CONTENT_GATES, FULL_GATES } from './lib/gates.mjs';

const tier = process.argv[2] === 'full' ? 'full' : 'content';
const gates = tier === 'full' ? FULL_GATES : CONTENT_GATES;

console.log(`Running ${gates.length} ${tier} gates\n`);
let failed = null;
for (const gate of gates) {
  process.stdout.write(`  ${gate.padEnd(24)}`);
  const started = Date.now();
  const res = spawnSync('npm', ['run', '-s', gate], { stdio: 'pipe', encoding: 'utf8' });
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  if (res.status === 0) {
    console.log(`PASS  ${secs}s`);
  } else {
    console.log(`FAIL  ${secs}s\n`);
    process.stdout.write(res.stdout || '');
    process.stderr.write(res.stderr || '');
    failed = gate;
    break;
  }
}

if (failed) {
  console.error(`\n${failed} failed. Fix it and re-run; later gates did not run.`);
  process.exit(1);
}
console.log(`\nAll ${tier} gates passed.`);
