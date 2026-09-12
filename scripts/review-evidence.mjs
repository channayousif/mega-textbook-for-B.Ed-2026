#!/usr/bin/env node
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { inputManifest, dirtyInputs, skillDigest, CRITERIA, validateReport, acceptReport } from './lib/review-evidence.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');
const [command, ...args] = process.argv.slice(2);
try {
  if (command === 'prepare') {
    const [course, unit, stage, output] = args;
    if (!output) throw new Error('prepare needs course unit G3|G5 output-dir');
    // A manifest describes a commit. Preparing one over a dirty tree produces a
    // bundle no other host - CI included - can reproduce, so refuse it here
    // rather than let the reviewer discover it at acceptance time.
    const dirty = dirtyInputs(root, course, Number(unit), stage);
    if (dirty.length) {
      throw new Error(`bound inputs are not committed; commit, stash or ignore them first:\n  ${dirty.join('\n  ')}`);
    }
    const manifest = inputManifest(root, course, Number(unit), stage);
    mkdirSync(resolve(output), { recursive: true });
    writeFileSync(join(resolve(output), 'manifest.json'), JSON.stringify({schema_version: 1, course_code: course, unit_no: Number(unit), stage, skill_digest: skillDigest(root, stage), input_manifest: manifest, required_criteria: CRITERIA[stage]}, null, 2) + '\n', { flag: 'wx' });
    console.log(`Prepared ${Object.keys(manifest).length} inputs. Give the bundle to a fresh reviewer.`);
  } else if (command === 'validate') {
    const report = validateReport(root, JSON.parse(readFileSync(args[0], 'utf8')));
    console.log(`Report structurally valid: ${report.disposition}. This does not authorize gate completion.`);
  } else if (command === 'accept') {
    const report = acceptReport(root, args[0]);
    console.log(`Signed evidence accepted: ${report.stage} ${report.course_code} unit ${report.unit_no}. Gate writer may reference this report; no files were changed.`);
  } else {
    throw new Error('Usage: node scripts/review-evidence.mjs prepare COURSE UNIT G3|G5 OUTPUT | validate REPORT | accept REPORT');
  }
} catch (error) {
  console.error(`Review evidence rejected: ${error.message}`);
  process.exitCode = 1;
}
