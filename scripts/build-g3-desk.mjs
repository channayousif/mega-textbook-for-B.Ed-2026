#!/usr/bin/env node
/**
 * Writes `static/g3-desk.json`, the data behind `/app/admin/g3-signoff` (ADR-0032).
 *
 * One row per authored unit: its G3 state (certified, awaiting the owner, or
 * still in agent review), the latest agent G3 report's verdict, criteria and
 * findings, the unit's G3 tracker rows, and the digest of its review inputs.
 * The digest is what a ledger decision binds to; the crew's sync refuses to
 * sign a unit whose inputs changed after the owner decided.
 *
 * Reads `static/content-status.json`, so it runs after `report-content-status.mjs`
 * in prestart/prebuild. Public like every static file: it holds repository
 * data only, never ledger rows or user data.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';
import { walkUnits } from './lib/content-roots.mjs';
import { loadTracker } from './lib/tracker-rows.mjs';
import { inputManifest, dirtyInputs } from './lib/review-evidence.mjs';
import { deskUnit, manifestDigest, pickLatestReport } from './lib/g3-desk.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const pad = (n) => String(n).padStart(2, '0');
const readJson = (path) => JSON.parse(readFileSync(join(ROOT, path), 'utf8'));

function latestG3(course, unit) {
  const rel = `specs/content/${course.toLowerCase()}/reviews/unit-${pad(unit)}/G3`;
  const dir = join(ROOT, rel);
  if (!existsSync(dir)) return { report: null, path: null };
  const entries = readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => {
    try { return { file: `${rel}/${f}`, json: JSON.parse(readFileSync(join(dir, f), 'utf8')) }; } catch { return { file: `${rel}/${f}`, json: null }; }
  });
  const latest = pickLatestReport(entries);
  return latest ? { report: latest, path: latest.file } : { report: null, path: null };
}

function unitTitle(dir) {
  const file = join(dir, 'index.mdx');
  return existsSync(file) ? matter(readFileSync(file, 'utf8')).data.title ?? null : null;
}

const status = readJson('static/content-status.json');
const contentIndex = existsSync(join(ROOT, 'static/content-index.json')) ? readJson('static/content-index.json') : [];
const dirs = new Map(walkUnits(ROOT).map((u) => [`${u.courseCode}#${u.unitNo}`, u]));
let commit = null;
try { commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { /* not a checkout */ }

const units = [];
for (const c of status.courses) {
  const tracker = loadTracker(ROOT, c.course_code) ?? [];
  for (const u of c.units) {
    if (!u.authored) continue;
    const label = `Unit ${u.unit_no}`;
    const rows = tracker.filter((r) => r.unit === label && r.stage.startsWith('G3'));
    const { report, path } = latestG3(c.course_code, u.unit_no);
    const assessment = contentIndex.find((e) => e.course_code === c.course_code && e.unit_no === u.unit_no && e.kind === 'assessment');
    const dir = dirs.get(`${c.course_code}#${u.unit_no}`);
    let digest = null;
    let dirty = false;
    if (u.gates.G3 !== 'done') {
      try {
        digest = manifestDigest(inputManifest(ROOT, c.course_code, u.unit_no, 'G3'));
        dirty = commit ? dirtyInputs(ROOT, c.course_code, u.unit_no, 'G3').length > 0 : false;
      } catch (e) {
        // A unit whose inputs cannot be bound cannot be signed; show it, flagged.
        digest = null;
        dirty = true;
        process.stderr.write(`g3-desk: ${c.course_code} unit ${u.unit_no}: ${e.message}\n`);
      }
    }
    units.push(deskUnit({
      course: c.course_code, u, report, reportPath: path, rows, digest, dirty,
      index: {
        title: dir ? unitTitle(dir.unitDir) : null,
        permalink: assessment ? assessment.permalink.replace(/unit-assessment$/, '') : null,
      },
    }));
  }
}

const out = { generated_at: new Date().toISOString(), commit, units };
writeFileSync(join(ROOT, 'static/g3-desk.json'), `${JSON.stringify(out)}\n`);
const count = (s) => units.filter((x) => x.state === s).length;
process.stdout.write(`g3-desk: ${units.length} units (${count('awaiting')} awaiting sign-off, ${count('in_review')} in agent review, ${count('certified')} certified)\n`);
