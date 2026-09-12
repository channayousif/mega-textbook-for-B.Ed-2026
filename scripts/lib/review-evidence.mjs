import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFileSync, readdirSync, existsSync, lstatSync } from 'node:fs';
import { resolve, relative, join, isAbsolute } from 'node:path';

export const CRITERIA = {
  G3: ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'readability', 'pedagogy'],
  G5: ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'completeness', 'semantics', 'terminology', 'register', 'rtl'],
};
export const COMMANDS = ['validate:content', 'check:depth-gate', 'check:figures', 'check:no-em-dash', 'check:no-answer-keys', 'check:docs-sync', 'render-review'];
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

function walk(root, path) {
  const full = safeFile(root, path);
  if (!existsSync(full)) return [];
  if (lstatSync(full).isDirectory()) return readdirSync(full).sort().flatMap((name) => walk(root, `${path}/${name}`));
  return [path];
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

export function inputManifest(root, course, unit, stage) {
  requireValue(/^[A-Z]{2,4}-\d{3}(--)?$/.test(course) && Number.isInteger(unit) && unit > 0 && CRITERIA[stage], 'invalid unit or stage');
  const code = course.toLowerCase();
  const folder = `unit-${String(unit).padStart(2, '0')}`;
  const semesters = existsSync(join(root, 'docs')) ? readdirSync(join(root, 'docs')).filter((p) => /^semester-\d+$/.test(p)) : [];
  const matches = semesters.filter((p) => existsSync(join(root, 'docs', p, code, folder, 'index.mdx')));
  requireValue(matches.length === 1, 'unit must resolve to exactly one English directory');
  const coursePath = `docs/${matches[0]}/${code}`;
  const en = `${coursePath}/${folder}`;
  const ur = `i18n/ur/docusaurus-plugin-content-docs/current/${matches[0]}/${code}/${folder}`;
  if (stage === 'G5') {
    requireValue(!/^bilingual:\s*false\s*$/m.test(readFileSync(join(root, coursePath, 'course-overview.mdx'), 'utf8')), 'G5 inapplicable for English-only course');
    requireValue(existsSync(join(root, ur, 'index.mdx')), 'Urdu unit missing');
  }
  const roots = [en, `${coursePath}/course-overview.mdx`, `specs/content/${code}`,
    'specs/content/style-guide.md', 'specs/content/terminology.csv', '.specify/memory/constitution.md',
    'catalog/courses.json', 'contracts', 'specs/014-agent-review-governance/contracts', 'scripts', '.claude/skills/review-unit', '.claude/agents',
    'Scheme-and-Course-guides', `.specify/Course_guides_and_Scheme`,
    `static/img/figures/${code}/${folder}`, ...(stage === 'G5' ? [ur] : [])];
  for (const required of ['specs/content/style-guide.md', 'specs/content/terminology.csv',
    '.specify/memory/constitution.md', `specs/content/${code}/content-spec.md`, `${coursePath}/course-overview.mdx`,
    '.claude/skills/review-unit/SKILL.md']) requireValue(existsSync(safeFile(root, required)), `missing required input: ${required}`);
  const paths = [...new Set(roots.flatMap((p) => walk(root, p)))].filter((p) => !p.includes('/reviews/') && !p.endsWith('/tasks.md') && !p.includes('/.staging/'));
  return Object.fromEntries(paths.sort().map((p) => [p, digest(normalized(p, readFileSync(safeFile(root, p))))]));
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

export function validateAgentTrackerRow(root, row, course, unit, stage) {
  if (!row.reviewer.startsWith('agent:')) {
    requireValue(/^[A-Z]{1,5}$/.test(row.reviewer), 'reviewer must be human initials or explicit agent identity');
    return;
  }
  requireValue(['G3', 'G5'].includes(stage), 'agent review identity cannot certify a draft stage');
  const match = /^review:([^\s]+\.json)$/.exec(row.suggestion);
  requireValue(match, 'agent row needs review:<report.json> evidence reference');
  const prefix = `specs/content/${course.toLowerCase()}/reviews/unit-${String(unit).padStart(2, '0')}/${stage}/`;
  requireValue(match[1].startsWith(prefix), 'report path must match unit and stage');
  acceptReport(root, match[1], { course_code: course, unit_no: unit, stage, reviewer_id: row.reviewer });
}
