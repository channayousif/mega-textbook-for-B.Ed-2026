import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { generateKeyPairSync, sign } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { CRITERIA, COMMANDS, DRAFT_COMMANDS, inputManifest, dirtyInputs, skillDigest, digest, validateReport, acceptReport, acceptProvisionalReport, acceptGateEvidence, validateAgentTrackerRow } from '../../scripts/lib/review-evidence.mjs';

/** Entry validators the manifest binds, mirroring REVIEW_ENTRY_SCRIPTS. */
const REVIEW_SCRIPTS = ['scripts/validate-content.mjs', 'scripts/check-pipeline-gate.mjs', 'scripts/check-unit-depth.mjs',
  'scripts/check-figures.mjs', 'scripts/check-no-em-dash.mjs', 'scripts/check-no-answer-keys.mjs', 'scripts/check-docs-sync.mjs'];

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'review-evidence-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const key = publicKey.export({type:'spki', format:'pem'});
  const write = (p, content) => { mkdirSync(dirname(join(root, p)), {recursive:true}); writeFileSync(join(root, p), content); };
  const signed = (p, value) => { const raw = JSON.stringify(value, null, 2) + '\n'; write(p, raw); write(`${p}.sig`, sign(null, Buffer.from(raw), privateKey).toString('base64')); };
  const en = 'docs/semester-1/efmp-301/unit-01/index.mdx';
  const ur = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01/index.mdx';
  write(en, '---\ntranslation_status: draft\n---\nEnglish fixture.\n');
  write(ur, '---\ntranslation_status: draft\n---\nUrdu fixture.\n');
  write('docs/semester-1/efmp-301/course-overview.mdx', '---\nbilingual: true\n---\n');
  for (const path of ['specs/content/style-guide.md', 'specs/content/terminology.csv', '.specify/memory/constitution.md', 'specs/decisions/log.md', 'specs/content/efmp-301/content-spec.md', '.claude/skills/review-unit/SKILL.md', '.claude/skills/review-unit/references/g3.md', '.claude/skills/review-unit/references/g5.md', '.claude/agents/g3-reviewer.md', '.claude/agents/g5-reviewer.md']) write(path, `Synthetic test input ${path}\n`);
  write('specs/reviewers/qualification.json', '{"synthetic_fixture_only":true}\n');
  // Bound validators (each pulling one shared lib) plus a script the review never
  // cites, so the digest's narrowed scope is actually exercised.
  for (const path of REVIEW_SCRIPTS) write(path, `// synthetic ${path}\nimport { shared } from './lib/shared.mjs';\n`);
  write('scripts/lib/shared.mjs', 'export const shared = 1;\n');
  write('scripts/optimize-figure.mjs', '// unrelated to content review\n');
  // Commit, not just stage: `dirtyInputs` treats a staged-but-uncommitted change
  // as dirty, which is the whole point of the check.
  const git = (...args) => execFileSync('git', ['-C', root, '-c', 'user.email=fixture@example.invalid', '-c', 'user.name=fixture', ...args], {stdio:'ignore'});
  const track = () => { git('add', '-A'); git('commit', '-q', '--allow-empty', '-m', 'fixture'); };
  git('init', '-q');
  track();
  const registry = {schema_version:1, reviewers:[]};
  const reports = {};
  const make = (stage) => {
    const path = `specs/content/efmp-301/reviews/unit-01/${stage}/fixture.json`;
    const evidence = {};
    const commands = COMMANDS.map((name, i) => {
      const log_path = `specs/content/efmp-301/reviews/unit-01/${stage}/log-${i}.txt`;
      const data = 'Synthetic fixture command evidence, not a real content review.\n';
      write(log_path, data); evidence[log_path] = digest(data);
      return {name, exit_code:0, log_path};
    });
    const image = `specs/content/efmp-301/reviews/unit-01/${stage}/fixture.png`;
    write(image, 'synthetic test image bytes'); evidence[image] = digest('synthetic test image bytes');
    const report = {schema_version:1, course_code:'EFMP-301', unit_no:1, stage, disposition:'pass', reviewer_id:`agent:${stage.toLowerCase()}-fixture`, author_run_id:'author-fixture', reviewer_run_id:`review-${stage}`, model:'test-fixture-only', started_at:'2026-01-01T00:00:00Z', completed_at:'2026-01-01T00:00:01Z', skill_digest:skillDigest(root, stage), input_manifest:inputManifest(root,'EFMP-301',1,stage), criteria:CRITERIA[stage].map((id)=>({id,status:'pass',evidence:[`${en}#fixture`]})), commands, evidence_manifest:evidence, findings:[], ...(stage==='G5'?{g3_report:reports.G3.path}:{})};
    registry.reviewers.push({id:report.reviewer_id,enabled:true,stage,model:report.model,skill_digest:report.skill_digest,courses:['EFMP-301'],qualification:{owner:'synthetic-fixture',evidence_path:'specs/reviewers/qualification.json',evidence_sha256:digest(readFileSync(join(root,'specs/reviewers/qualification.json'))),blocking_false_passes:0,clean_passes:1,defective_cases:1}});
    signed('specs/reviewers/registry.json',registry); signed(path,report); reports[stage]={path,report};
    return reports[stage];
  };
  const g3 = make('G3');
  return {root,key,write,signed,track,registry,make,en,ur,...g3};
}

test('complete signed synthetic report can pass', (t) => {
  const f=fixture(t); assert.equal(acceptReport(f.root,f.path,{},f.key).stage,'G3');
});
test('content changes and added inputs invalidate evidence', (t) => {
  const f=fixture(t); f.write(f.en,'Changed content');
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/manifest/);
});
test('committed new file cannot escape manifest coverage', (t) => {
  const f=fixture(t); f.write('docs/semester-1/efmp-301/unit-01/topic-02.mdx','New prose'); f.track();
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/manifest/);
});
test('uncommitted working-tree file leaves the manifest reproducible', (t) => {
  const f=fixture(t); f.write('Scheme-and-Course-guides/unrelated-local.pdf','local scratch bytes');
  assert.doesNotThrow(()=>acceptReport(f.root,f.path,{},f.key));
  assert.deepEqual(dirtyInputs(f.root,'EFMP-301',1,'G3'),['Scheme-and-Course-guides/unrelated-local.pdf']);
  f.track();
  assert.deepEqual(dirtyInputs(f.root,'EFMP-301',1,'G3'),[]);
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/manifest/);
});
test('digest binds the cited validators and their imports, not all of scripts/', (t) => {
  const f=fixture(t);
  f.write('scripts/optimize-figure.mjs','// edited, still unrelated to review\n'); f.track();
  assert.doesNotThrow(()=>acceptReport(f.root,f.path,{},f.key));
  f.write('scripts/lib/shared.mjs','export const shared = 2;\n'); f.track();
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/manifest/);
});
test('a bound validator cannot be renamed out of the digest', (t) => {
  const f=fixture(t); rmSync(join(f.root,'scripts/check-figures.mjs')); f.track();
  assert.throws(()=>inputManifest(f.root,'EFMP-301',1,'G3'),/missing review script/);
});
test('manifest refuses a checkout git cannot enumerate', (t) => {
  const f=fixture(t); rmSync(join(f.root,'.git'),{recursive:true,force:true});
  assert.throws(()=>inputManifest(f.root,'EFMP-301',1,'G3'),/git checkout/);
});
test('exact lifecycle field is excluded but prose with same key is not', (t) => {
  const f=fixture(t); f.write(f.en,'---\ntranslation_status: reviewed\n---\nEnglish fixture.\n');
  assert.doesNotThrow(()=>acceptReport(f.root,f.path,{},f.key));
  f.write(f.en,'---\ntranslation_status: reviewed\n---\ntranslation_status: reviewed\n');
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/manifest/);
});
test('signature spoofing fails even with otherwise valid report', (t) => {
  const f=fixture(t); const other=generateKeyPairSync('ed25519');
  f.write(`${f.path}.sig`,sign(null,readFileSync(join(f.root,f.path)),other.privateKey).toString('base64'));
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/signature/);
});
test('unsigned or tampered registry cannot activate reviewer', (t) => {
  const f=fixture(t); f.write('specs/reviewers/registry.json',JSON.stringify(f.registry));
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/signature/);
});
test('revoked reviewer is rejected', (t) => {
  const f=fixture(t); f.registry.reviewers[0].enabled=false; f.signed('specs/reviewers/registry.json',f.registry);
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/qualified/);
});
test('missing trust root fails closed', (t) => {
  const f=fixture(t); assert.throws(()=>acceptReport(f.root,f.path,{},''),/not provisioned/);
});
test('changed qualification evidence is rejected', (t) => {
  const f=fixture(t); f.write('specs/reviewers/qualification.json','tampered');
  assert.throws(()=>acceptReport(f.root,f.path,{},f.key),/qualification evidence/);
});
test('same author/reviewer run cannot pass', (t) => {
  const f=fixture(t); f.report.reviewer_run_id=f.report.author_run_id;
  assert.throws(()=>validateReport(f.root,f.report),/collision/);
});
test('missing, duplicate and unverified criteria reject pass', (t) => {
  const f=fixture(t); const r=structuredClone(f.report); r.criteria.pop();
  assert.throws(()=>validateReport(f.root,r),/criteria/);
  const duplicate=structuredClone(f.report); duplicate.criteria[1].id=duplicate.criteria[0].id;
  assert.throws(()=>validateReport(f.root,duplicate),/criteria/);
  f.report.criteria[0].status='unverified';
  assert.throws(()=>validateReport(f.root,f.report),/unverified/);
});
test('skipped command and modified log reject pass', (t) => {
  const f=fixture(t); f.report.commands[0].exit_code=1;
  assert.throws(()=>validateReport(f.root,f.report),/command/);
  f.report.commands[0].exit_code=0; f.write(f.report.commands[0].log_path,'changed');
  assert.throws(()=>validateReport(f.root,f.report),/evidence file/);
});
test('unresolved uncertainty rejects pass but allows truthful escalation', (t) => {
  const f=fixture(t); f.report.findings.push({severity:'uncertain',message:'source unavailable',resolved:false});
  assert.throws(()=>validateReport(f.root,f.report),/unresolved/);
  f.report.disposition='escalate'; assert.doesNotThrow(()=>validateReport(f.root,f.report));
});
test('G5 requires current accepted G3, including English dependency', (t) => {
  const f=fixture(t); const g5=f.make('G5'); assert.doesNotThrow(()=>acceptReport(f.root,g5.path,{},f.key));
  f.registry.reviewers[0].enabled=false; f.signed('specs/reviewers/registry.json',f.registry);
  assert.throws(()=>acceptReport(f.root,g5.path,{},f.key),/qualified/);
});
test('English change invalidates G5', (t) => {
  const f=fixture(t); const g5=f.make('G5'); f.write(f.en,'changed English');
  assert.throws(()=>acceptReport(f.root,g5.path,{},f.key),/manifest/);
});
test('English-only course cannot produce G5 manifest', (t) => {
  const f=fixture(t); f.write('docs/semester-1/efmp-301/course-overview.mdx','---\nbilingual: false\n---');
  assert.throws(()=>inputManifest(f.root,'EFMP-301',1,'G5'),/inapplicable/);
});
test('arbitrary reviewer strings and agent draft certification are rejected', (t) => {
  const f=fixture(t);
  assert.doesNotThrow(()=>validateAgentTrackerRow(f.root,{reviewer:'YM',suggestion:''},'EFMP-301',1,'G3'));
  assert.throws(()=>validateAgentTrackerRow(f.root,{reviewer:'a bot',suggestion:''},'EFMP-301',1,'G3'),/initials/);
  assert.throws(()=>validateAgentTrackerRow(f.root,{reviewer:'agent:g3-fixture',suggestion:''},'EFMP-301',1,'G2'),/draft stage/);
  assert.throws(()=>validateAgentTrackerRow(f.root,{reviewer:'agent:g3-fixture',suggestion:''},'EFMP-301',1,'G3'),/evidence reference/);
});

// ---- Art. VII.7 provisional publication + G2 gate evidence (ADR-0025) ----
//
// The whole point of this tier is that it drops the trust root and NOTHING else.
// These cases exist to keep that honest: every check `acceptReport` makes that is
// not the signature must still bite here, or "provisional" quietly becomes
// "unchecked".

/** An unsigned copy of the fixture's passing G3 report, with optional overrides. */
function unsigned(f, overrides = {}, path = 'specs/content/efmp-301/reviews/unit-01/G3/unsigned.json') {
  const report = { ...f.report, ...overrides };
  f.write(path, `${JSON.stringify(report, null, 2)}\n`);
  f.track();
  return path;
}

test('provisional acceptance takes an unsigned passing report', (t) => {
  const f = fixture(t);
  const path = unsigned(f);
  const got = acceptProvisionalReport(f.root, path, { course_code: 'EFMP-301', unit_no: 1, stage: 'G3' });
  assert.equal(got.disposition, 'pass');
  // and the signed path still refuses it, because there is no signature
  assert.throws(() => acceptReport(f.root, path, {}, f.key), /signature|ENOENT/);
});

test('provisional acceptance refuses a verdict that is not a pass', (t) => {
  const f = fixture(t);
  for (const disposition of ['revise', 'escalate']) {
    const path = unsigned(f, { disposition }, `specs/content/efmp-301/reviews/unit-01/G3/u-${disposition}.json`);
    assert.throws(() => acceptProvisionalReport(f.root, path), /does not pass/);
  }
});

test('provisional acceptance refuses placeholder run identities', (t) => {
  const f = fixture(t);
  const path = unsigned(f, { author_run_id: 'UNSUPPLIED-parent-did-not-provide-author-run-identity' });
  // `validateReport` is happy - it only checks non-empty and distinct - so this
  // case is the reason the extra check exists. Independence is the entire basis
  // for trusting a reviewer no registry has qualified.
  assert.doesNotThrow(() => validateReport(f.root, JSON.parse(readFileSync(join(f.root, path)))));
  assert.throws(() => acceptProvisionalReport(f.root, path), /placeholder/);
});

test('provisional acceptance goes stale when the reviewed content changes', (t) => {
  const f = fixture(t);
  const path = unsigned(f);
  f.write(f.en, '---\ntranslation_status: draft\n---\nEnglish fixture, edited after review.\n');
  f.track();
  assert.throws(() => acceptProvisionalReport(f.root, path), /manifest/);
});

/** Deterministic G2 evidence over DRAFT_COMMANDS, with optional damage. */
function gateEvidence(f, { drop = null, tamper = false } = {}) {
  const evidence = {};
  const commands = [];
  for (const name of DRAFT_COMMANDS) {
    if (name === drop) continue;
    const log_path = `specs/content/efmp-301/reviews/unit-01/G2/${name.replace(/:/g, '-')}.txt`;
    const data = `$ npm run ${name}\nexit_code=0\n`;
    f.write(log_path, data);
    evidence[log_path] = digest(data);
    commands.push({ name, exit_code: 0, log_path });
  }
  const path = 'specs/content/efmp-301/reviews/unit-01/G2/gates.json';
  f.write(path, `${JSON.stringify({ schema_version: 1, course_code: 'EFMP-301', unit_no: 1, stage: 'G2',
    input_manifest: inputManifest(f.root, 'EFMP-301', 1, 'G3'), commands, evidence_manifest: evidence }, null, 2)}\n`);
  if (tamper) f.write(commands[0].log_path, 'rewritten after the manifest was built\n');
  f.track();
  return path;
}

test('G2 gate evidence needs every draft command to have actually passed', (t) => {
  const f = fixture(t);
  assert.doesNotThrow(() => acceptGateEvidence(f.root, gateEvidence(f), 'EFMP-301', 1));
  assert.throws(() => acceptGateEvidence(f.root, gateEvidence(f, { drop: 'check:depth-gate' }), 'EFMP-301', 1),
    /missing successful command\/log: check:depth-gate/);
  assert.throws(() => acceptGateEvidence(f.root, gateEvidence(f, { tamper: true }), 'EFMP-301', 1),
    /evidence file changed/);
});

test('tracker routes each reference form to the matching evidence check', (t) => {
  const f = fixture(t);
  const provisionalPath = unsigned(f);
  const gatesPath = gateEvidence(f);
  const row = (reviewer, suggestion) => ({ reviewer, suggestion });

  // provisional: on G3 accepts the unsigned report
  assert.doesNotThrow(() => validateAgentTrackerRow(f.root, row('agent:g3-fixture', `provisional:${provisionalPath}`), 'EFMP-301', 1, 'G3'));
  // auto:gates closes a draft stage, and ONLY a draft stage
  assert.doesNotThrow(() => validateAgentTrackerRow(f.root, row('auto:gates', `gates:${gatesPath}`), 'EFMP-301', 1, 'G2'));
  assert.throws(() => validateAgentTrackerRow(f.root, row('auto:gates', `gates:${gatesPath}`), 'EFMP-301', 1, 'G3'),
    /needs a reviewer/);
  // an agent identity still cannot certify a draft stage
  assert.throws(() => validateAgentTrackerRow(f.root, row('agent:g3-fixture', `provisional:${provisionalPath}`), 'EFMP-301', 1, 'G2'),
    /draft stage/);
  // a bare token is not the automated identity; only the explicit `auto:` form is
  assert.throws(() => validateAgentTrackerRow(f.root, row('gates', `gates:${gatesPath}`), 'EFMP-301', 1, 'G2'), /initials/);
  assert.throws(() => validateAgentTrackerRow(f.root, row('auto:anything', `gates:${gatesPath}`), 'EFMP-301', 1, 'G2'), /unknown automated/);
  // and a provisional reference still may not point outside the unit and stage
  assert.throws(() => validateAgentTrackerRow(f.root, row('agent:g3-fixture', `provisional:${provisionalPath}`), 'EFMP-301', 2, 'G3'), /path must match/);
});
