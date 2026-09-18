import { execFileSync } from 'node:child_process';
import { resolveUnit } from './content-roots.mjs';
import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFileSync, readdirSync, existsSync, lstatSync } from 'node:fs';
import { resolve, relative, join, dirname, sep, isAbsolute } from 'node:path';

// Spec 017 T017: the rubric moved to its own module so the browser certify
// form and this validator read one definition. Re-exported here because
// several scripts already import CRITERIA/COMMANDS from this file.
import { CRITERIA, COMMANDS, DRAFT_COMMANDS } from './review-criteria.mjs';
export { CRITERIA, COMMANDS, DRAFT_COMMANDS };

/**
 * The validators whose results a report cites, as entry points. Their local
 * import closure is walked and hashed; everything else under `scripts/` is not.
 *
 * WHY. Hashing all of `scripts/` bound every accepted report to files the
 * review never touches - a figure optimiser, a Supabase helper - so one
 * unrelated edit invalidated every outstanding report and re-blocked the
 * pipeline gate for every agent-certified unit. The closure keeps the binding
 * honest (a validator change still invalidates) without that blast radius.
 * A renamed or deleted entry point fails loudly rather than silently shrinking
 * the digest set.
 */
const REVIEW_ENTRY_SCRIPTS = ['scripts/validate-content.mjs', 'scripts/check-pipeline-gate.mjs', 'scripts/check-unit-depth.mjs',
  'scripts/check-figures.mjs', 'scripts/check-no-em-dash.mjs', 'scripts/check-no-answer-keys.mjs', 'scripts/check-docs-sync.mjs'];

const requireValue = (condition, message) => { if (!condition) throw new Error(message); };
export const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const sorted = (object) => JSON.stringify(Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b))));

export function safeFile(root, path) {
  requireValue(typeof path === 'string' && path.length > 0 && !isAbsolute(path) && !path.includes('\\'), 'invalid relative path');
  requireValue(path.split('/').every((part) => part && part !== '.' && part !== '..'), 'noncanonical relative path');
  const file = resolve(root, path);
  requireValue(!relative(resolve(root), file).startsWith('..'), 'path escapes repository');
  let cursor = resolve(root);
  for (const part of relative(cursor, file).split('/')) {
    cursor = join(cursor, part);
    if (existsSync(cursor)) requireValue(!lstatSync(cursor).isSymbolicLink(), 'symlink input rejected');
  }
  return file;
}

const git = (root, args, failure) => {
  try {
    return execFileSync('git', ['-C', resolve(root), ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    throw new Error(failure);
  }
};

/**
 * Committed paths only. The traversal used to read the working tree, so any
 * untracked file under a bound root entered the digest set and a report
 * prepared on one machine could never validate on another. Enumerating the
 * index makes the manifest a function of the commit, which is the only state
 * CI - the host that actually accepts evidence - ever sees. Contents are still
 * read from disk, so a local edit to a tracked file still fails validation.
 */
function tracked(root) {
  const out = git(root, ['ls-files', '-z', '--cached', '--full-name'], 'input manifest requires a git checkout: reviewed inputs must be committed');
  return out.split('\0').filter(Boolean).sort();
}

function walk(root, path, index) {
  safeFile(root, path);
  return index.filter((p) => p === path || p.startsWith(`${path}/`));
}

/** Entry validators plus every relative module they import, transitively. */
function reviewScripts(root) {
  const seen = new Set();
  const queue = [...REVIEW_ENTRY_SCRIPTS];
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    const file = safeFile(root, path);
    requireValue(existsSync(file), `missing review script: ${path}`);
    seen.add(path);
    for (const [, spec] of readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*\(?\s*['"](\.[^'"]+)['"]/g)) {
      queue.push(relative(resolve(root), resolve(dirname(file), spec)));
    }
  }
  return [...seen].sort();
}

// Only exact YAML frontmatter lifecycle lines are normalized. No body, prose or
// similarly named nested field is excluded. Tracker and report files are separate.
function normalized(path, bytes) {
  if (!path.endsWith('.mdx')) return bytes;
  const text = bytes.toString('utf8');
  const match = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!match) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + text.slice(match[0].length));
}

/** The bound input roots for one unit and stage. Shared by hashing and cleanliness. */
function manifestRoots(root, course, unit, stage) {
  // Mirrors contracts/unit-frontmatter.schema.json, which permits the approved
  // scheme's pending placeholder codes (EFPC-4--, EFSP-5--) alongside final ones.
  requireValue(/^[A-Z]{2,4}-\d{3}(--)?$/.test(course) && Number.isInteger(unit) && unit > 0 && CRITERIA[stage], 'invalid unit or stage');
  const code = course.toLowerCase();
  const folder = `unit-${String(unit).padStart(2, '0')}`;
  // Feature 015 FR-003: resolve through content-roots so a unit in any track can
  // be prepared for review. Paths stay repository-relative, as the manifest needs.
  let record;
  try {
    record = resolveUnit(root, course, unit);
  } catch {
    requireValue(false, 'unit must resolve to exactly one English directory');
  }
  requireValue(existsSync(join(record.unitDir, 'index.mdx')), 'unit must resolve to exactly one English directory');
  const rel = (abs) => relative(resolve(root), abs).split(sep).join('/');
  const coursePath = rel(join(record.unitDir, '..'));
  const en = rel(record.unitDir);
  const ur = rel(record.urUnitDir);
  if (stage === 'G5') {
    requireValue(!/^bilingual:\s*false\s*$/m.test(readFileSync(join(root, coursePath, 'course-overview.mdx'), 'utf8')), 'G5 inapplicable for English-only course');
    requireValue(existsSync(join(root, ur, 'index.mdx')), 'Urdu unit missing');
  }
  for (const required of ['specs/content/style-guide.md', 'specs/content/terminology.csv',
    '.specify/memory/constitution.md', `specs/content/${code}/content-spec.md`, `${coursePath}/course-overview.mdx`,
    '.claude/skills/review-unit/SKILL.md']) requireValue(existsSync(safeFile(root, required)), `missing required input: ${required}`);
  return [en, `${coursePath}/course-overview.mdx`, `specs/content/${code}`,
    'specs/content/style-guide.md', 'specs/content/terminology.csv', '.specify/memory/constitution.md',
    'catalog/courses.json', 'contracts', 'specs/014-agent-review-governance/contracts', ...reviewScripts(root),
    '.claude/skills/review-unit', '.claude/agents',
    'Scheme-and-Course-guides', `.specify/Course_guides_and_Scheme`,
    `static/img/figures/${code}/${folder}`, ...(stage === 'G5' ? [ur] : [])];
}

const bound = (root, paths, index) => [...new Set(paths.flatMap((p) => walk(root, p, index)))]
  .filter((p) => !p.includes('/reviews/') && !p.endsWith('/tasks.md') && !p.includes('/.staging/'))
  .sort();

export function inputManifest(root, course, unit, stage) {
  const roots = manifestRoots(root, course, unit, stage);
  const paths = bound(root, roots, tracked(root));
  return Object.fromEntries(paths.map((p) => [p, digest(normalized(p, readFileSync(safeFile(root, p))))]));
}

/**
 * Working-tree changes under the bound roots. `prepare` refuses them: a
 * reviewer must be handed a committed state, because that is the state the
 * manifest describes and the only one another host can reproduce.
 */
export function dirtyInputs(root, course, unit, stage) {
  const roots = manifestRoots(root, course, unit, stage);
  const fields = git(root, ['status', '--porcelain', '-z', '--untracked-files=all'], 'cannot read git status for the bound inputs').split('\0');
  const changed = [];
  for (let i = 0; i < fields.length; i += 1) {
    const entry = fields[i];
    if (!entry) continue;
    const status = entry.slice(0, 2);
    changed.push(entry.slice(3));
    if (status[0] === 'R' || status[0] === 'C') i += 1; // rename/copy source follows in its own field
  }
  return bound(root, roots, changed.sort());
}

export function skillDigest(root, stage) {
  const paths = ['.claude/skills/review-unit/SKILL.md', `.claude/skills/review-unit/references/${stage.toLowerCase()}.md`, `.claude/agents/${stage.toLowerCase()}-reviewer.md`];
  return digest(paths.map((p) => `${p}\n${digest(readFileSync(safeFile(root, p)))}`).join('\n'));
}

export function validateReport(root, report) {
  requireValue(report?.schema_version === 1 && CRITERIA[report.stage], 'unsupported report schema/stage');
  requireValue(['pass', 'revise', 'escalate'].includes(report.disposition), 'invalid disposition');
  for (const key of ['reviewer_id', 'author_run_id', 'reviewer_run_id', 'model', 'started_at', 'completed_at']) requireValue(typeof report[key] === 'string' && report[key].trim(), `missing ${key}`);
  requireValue(/^agent:[a-z0-9-]+$/.test(report.reviewer_id), 'invalid agent identity');
  requireValue(report.author_run_id !== report.reviewer_run_id, 'author/reviewer identity collision');
  const started = Date.parse(report.started_at), completed = Date.parse(report.completed_at);
  requireValue(Number.isFinite(started) && Number.isFinite(completed) && completed >= started && completed <= Date.now() + 300000, 'invalid report timestamps');
  requireValue(report.skill_digest === skillDigest(root, report.stage), 'reviewer skill changed');
  requireValue(sorted(report.input_manifest ?? {}) === sorted(inputManifest(root, report.course_code, report.unit_no, report.stage)), 'stale or incomplete input manifest');
  requireValue(Array.isArray(report.criteria) && report.criteria.length === CRITERIA[report.stage].length, 'missing or extra criteria');
  const ids = report.criteria.map((c) => c.id);
  requireValue(new Set(ids).size === ids.length && CRITERIA[report.stage].every((id) => ids.includes(id)), 'duplicate or unknown criteria');
  requireValue(Array.isArray(report.findings) && report.findings.every((f) => ['blocking', 'uncertain', 'advisory'].includes(f.severity) && typeof f.message === 'string' && f.message.trim() && typeof f.resolved === 'boolean'), 'invalid findings');
  for (const c of report.criteria) {
    requireValue(['pass', 'fail', 'unverified'].includes(c.status) && Array.isArray(c.evidence), 'invalid criterion');
    if (c.status === 'pass') requireValue(c.evidence.length > 0 && c.evidence.every((e) => typeof e === 'string' && e.trim()), 'pass requires evidence locators');
  }
  requireValue(report.evidence_manifest && typeof report.evidence_manifest === 'object' && !Array.isArray(report.evidence_manifest), 'missing evidence manifest');
  const prefix = `specs/content/${report.course_code.toLowerCase()}/reviews/unit-${String(report.unit_no).padStart(2, '0')}/`;
  for (const [p, hash] of Object.entries(report.evidence_manifest)) {
    requireValue(p.startsWith(prefix), 'evidence outside unit review directory');
    requireValue(digest(readFileSync(safeFile(root, p))) === hash, 'evidence file changed');
  }
  requireValue(Array.isArray(report.commands) && report.commands.every((c) => typeof c.name === 'string' && Number.isInteger(c.exit_code) && typeof c.log_path === 'string'), 'invalid command records');
  if (report.disposition === 'pass') {
    requireValue(report.criteria.every((c) => c.status === 'pass'), 'pass has failed/unverified criterion');
    requireValue(!report.findings.some((f) => f.severity !== 'advisory' && !f.resolved), 'pass has unresolved findings');
    requireValue(new Set(report.commands.map((c) => c.name)).size === report.commands.length, 'duplicate commands');
    for (const name of COMMANDS) {
      const command = report.commands.find((c) => c.name === name);
      requireValue(command && command.exit_code === 0 && report.evidence_manifest[command.log_path], `missing successful command/log: ${name}`);
    }
    requireValue(Object.keys(report.evidence_manifest).some((p) => /\.(png|webp|jpg)$/.test(p)), 'rendered evidence missing');
  }
  return report;
}

function signedJson(root, path, publicKey) {
  requireValue(typeof publicKey === 'string' && publicKey.includes('BEGIN PUBLIC KEY'), 'CONTENT_REVIEW_PUBLIC_KEY is not provisioned');
  requireValue(createPublicKey(publicKey).asymmetricKeyType === 'ed25519', 'trust root must be Ed25519');
  const raw = readFileSync(safeFile(root, path));
  const signature = readFileSync(safeFile(root, `${path}.sig`), 'utf8').trim();
  requireValue(verify(null, raw, publicKey, Buffer.from(signature, 'base64')), 'invalid detached signature');
  return JSON.parse(raw);
}

export function acceptReport(root, path, expected = {}, publicKey = process.env.CONTENT_REVIEW_PUBLIC_KEY) {
  const report = validateReport(root, signedJson(root, path, publicKey));
  requireValue(report.disposition === 'pass', 'report does not pass');
  for (const key of ['course_code', 'unit_no', 'stage', 'reviewer_id']) if (expected[key] !== undefined) requireValue(report[key] === expected[key], `report ${key} mismatch`);
  const registry = signedJson(root, 'specs/reviewers/registry.json', publicKey);
  requireValue(registry.schema_version === 1 && Array.isArray(registry.reviewers), 'invalid reviewer registry');
  const reviewer = registry.reviewers.find((r) => r.id === report.reviewer_id);
  requireValue(reviewer?.enabled === true && reviewer.stage === report.stage && reviewer.model === report.model && reviewer.skill_digest === report.skill_digest && reviewer.courses?.includes(report.course_code), 'reviewer not qualified/enabled for configuration and scope');
  const qualification = reviewer.qualification;
  requireValue(qualification?.owner && qualification.evidence_path && qualification.evidence_sha256 && qualification.blocking_false_passes === 0 && Number.isInteger(qualification.clean_passes) && qualification.clean_passes > 0 && Number.isInteger(qualification.defective_cases) && qualification.defective_cases > 0, 'qualification results missing');
  requireValue(digest(readFileSync(safeFile(root, qualification.evidence_path))) === qualification.evidence_sha256, 'qualification evidence changed');
  if (report.stage === 'G5') {
    requireValue(typeof report.g3_report === 'string', 'G5 requires G3 report');
    acceptReport(root, report.g3_report, { course_code: report.course_code, unit_no: report.unit_no, stage: 'G3' }, publicKey);
  }
  return report;
}

/**
 * Art. VII.7 provisional acceptance: everything the signed path demands EXCEPT
 * the trust root. Deliberately a separate function rather than a flag on
 * `acceptReport`, so the signed path keeps its exact strictness and the
 * `missing trust root fails closed` mutation test still binds.
 *
 * What it still requires: full schema validation, a `pass` disposition (which
 * transitively forces every criterion passed, no unresolved blocking or
 * uncertain finding, all seven COMMANDS at exit 0 and a real render), a fresh
 * input manifest and a matching skill digest.
 *
 * What it drops: the detached signature, the registry entry and the
 * qualification record. That gap IS the difference between provisional and
 * certified, and the "Final Review Pending" banner is what discloses it.
 */
export function acceptProvisionalReport(root, path, expected = {}) {
  const report = validateReport(root, JSON.parse(readFileSync(safeFile(root, path))));
  requireValue(report.disposition === 'pass', 'report does not pass');
  for (const key of ['course_code', 'unit_no', 'stage', 'reviewer_id']) if (expected[key] !== undefined) requireValue(report[key] === expected[key], `report ${key} mismatch`);
  // Independence is the whole basis for trusting a reviewer that no registry has
  // qualified. `validateReport` only checks these are non-empty and differ, which
  // a placeholder satisfies - the reports on disk today carry
  // "UNSUPPLIED-parent-did-not-provide-author-run-identity". A stub where the
  // author identity belongs means nobody established independence, so it cannot
  // carry a provisional publication.
  for (const key of ['author_run_id', 'reviewer_run_id']) {
    requireValue(!/UNSUPPLIED|UNKNOWN|TODO|PLACEHOLDER|^n\/a$/i.test(report[key]), `${key} is a placeholder, not a real run identity`);
  }
  if (report.stage === 'G5') {
    requireValue(typeof report.g3_report === 'string', 'G5 requires G3 report');
    acceptProvisionalReport(root, report.g3_report, { course_code: report.course_code, unit_no: report.unit_no, stage: 'G3' });
  }
  return report;
}

/**
 * G2 draft-stage evidence: deterministic gate exit codes, no reviewer identity.
 *
 * "Does a draft exist at standard" is machine-checkable, so it is answered by
 * `DRAFT_COMMANDS` all exiting 0 over a manifest bound to the unit's current
 * bytes. Any edit to the unit changes the manifest and re-opens G2 by itself,
 * which is the same freshness property Art. VII.4 requires of review acceptance.
 */
export function acceptGateEvidence(root, path, course, unit) {
  const evidence = JSON.parse(readFileSync(safeFile(root, path)));
  requireValue(evidence?.schema_version === 1 && evidence.stage === 'G2', 'unsupported gate evidence schema/stage');
  requireValue(evidence.course_code === course && evidence.unit_no === unit, 'gate evidence unit mismatch');
  // Bound with the G3 input set on purpose. G2 and G3 review the same English
  // bytes, and `manifestRoots` keys its validation off CRITERIA, which has no
  // G2 entry - a stage of its own would mean a second definition of the same
  // bound set, free to drift from the one a review actually uses.
  requireValue(sorted(evidence.input_manifest ?? {}) === sorted(inputManifest(root, course, unit, 'G3')), 'stale or incomplete input manifest');
  requireValue(evidence.evidence_manifest && typeof evidence.evidence_manifest === 'object' && !Array.isArray(evidence.evidence_manifest), 'missing evidence manifest');
  const prefix = `specs/content/${course.toLowerCase()}/reviews/unit-${String(unit).padStart(2, '0')}/`;
  for (const [p, hash] of Object.entries(evidence.evidence_manifest)) {
    requireValue(p.startsWith(prefix), 'evidence outside unit review directory');
    requireValue(digest(readFileSync(safeFile(root, p))) === hash, 'evidence file changed');
  }
  requireValue(Array.isArray(evidence.commands) && evidence.commands.every((c) => typeof c.name === 'string' && Number.isInteger(c.exit_code) && typeof c.log_path === 'string'), 'invalid command records');
  requireValue(new Set(evidence.commands.map((c) => c.name)).size === evidence.commands.length, 'duplicate commands');
  for (const name of DRAFT_COMMANDS) {
    const command = evidence.commands.find((c) => c.name === name);
    requireValue(command && command.exit_code === 0 && evidence.evidence_manifest[command.log_path], `missing successful command/log: ${name}`);
  }
  return evidence;
}

export function validateAgentTrackerRow(root, row, course, unit, stage) {
  // `auto:` MUST be tested before the initials branch. A bare token like `GATES`
  // is five uppercase letters, so it would satisfy /^[A-Z]{1,5}$/ and be waved
  // through as a human reviewer with no evidence checked at all.
  if (row.reviewer.startsWith('auto:')) {
    requireValue(row.reviewer === 'auto:gates', 'unknown automated reviewer token');
    requireValue(!['G3', 'G5'].includes(stage), 'a review stage needs a reviewer, not gate evidence');
    const match = /^gates:([^\s]+\.json)$/.exec(row.suggestion);
    requireValue(match, 'automated row needs gates:<manifest.json> evidence reference');
    const prefix = `specs/content/${course.toLowerCase()}/reviews/unit-${String(unit).padStart(2, '0')}/G2/`;
    requireValue(match[1].startsWith(prefix), 'gate evidence path must match unit and stage');
    acceptGateEvidence(root, match[1], course, unit);
    return;
  }
  if (!row.reviewer.startsWith('agent:')) {
    requireValue(/^[A-Z]{1,5}$/.test(row.reviewer), 'reviewer must be human initials or explicit agent identity');
    return;
  }
  requireValue(['G3', 'G5'].includes(stage), 'agent review identity cannot certify a draft stage');
  const match = /^(review|provisional):([^\s]+\.json)$/.exec(row.suggestion);
  requireValue(match, 'agent row needs review:<report.json> evidence reference');
  const prefix = `specs/content/${course.toLowerCase()}/reviews/unit-${String(unit).padStart(2, '0')}/${stage}/`;
  requireValue(match[2].startsWith(prefix), 'report path must match unit and stage');
  const expected = { course_code: course, unit_no: unit, stage, reviewer_id: row.reviewer };
  if (match[1] === 'provisional') acceptProvisionalReport(root, match[2], expected);
  else acceptReport(root, match[2], expected);
}
