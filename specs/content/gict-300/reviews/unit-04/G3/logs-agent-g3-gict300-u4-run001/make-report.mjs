// Report generator for GICT-300 Unit 4 G3 run 001 (agent:g3-reviewer).
// Reads the prepared manifest verbatim, hashes the saved evidence bytes and
// writes the contract report. Run from the repository root of the worktree.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { rulingDigest, skillDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const LOGS = 'specs/content/gict-300/reviews/unit-04/G3/logs-agent-g3-gict300-u4-run001';
const RENDERS = `${LOGS}/renders`;
const OUT = 'specs/content/gict-300/reviews/unit-04/G3/agent-g3-gict300-u4-run001.json';

const prepared = JSON.parse(readFileSync('specs/content/gict-300/reviews/unit-04/G3/manifest.json', 'utf8'));

const evidence = {};
for (const name of readdirSync(LOGS)) {
  if (name === 'make-report.mjs' || name === 'renders') continue;
  evidence[`${LOGS}/${name}`] = sha(join(LOGS, name));
}
for (const name of readdirSync(RENDERS)) evidence[`${RENDERS}/${name}`] = sha(join(RENDERS, name));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/checkdepth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/checkfigures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/checkno-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/checkno-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/checkdocs-sync.log` },
  { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
  { name: 'check:concept-graph', exit_code: 0, log_path: `${LOGS}/checkconcept-graph.log` },
  { name: 'check:bloom-bands', exit_code: 0, log_path: `${LOGS}/checkbloom-bands.log` },
  { name: 'check:source-floor', exit_code: 0, log_path: `${LOGS}/checksource-floor.log` },
  { name: 'check:content-status', exit_code: 0, log_path: `${LOGS}/checkcontent-status.log` },
  { name: 'check:pipeline-gate', exit_code: 1, log_path: `${LOGS}/checkpipeline-gate.log` },
  { name: 'build', exit_code: 0, log_path: `${LOGS}/build.log` },
];

const findings = [
  { severity: 'blocking', resolved: false, message: 'Assessment blueprint violation: RRQ per-topic distribution. docs/semester-1/gict-300/unit-04/unit-assessment.mdx ### Restricted-response questions (RRQs), items 1-10 (lines 105-119): topic 4.1 receives five items (1, 2, 3, 4, 10), topic 4.2 one (5), topic 4.3 four (6, 7, 8, 9) and topic 4.4 zero. The approved blueprint (specs/content/gict-300/content-spec.md ## Unit 4, "Unit-end assessment blueprint", lines 327-331: "RRQs (10): Understand to Analyze; >= 2 per topic") and the file\'s own front matter (blooms_summary, line 8: "at least two MCQs and two RRQs per topic") both require at least two RRQs per topic. No RRQ addresses personal data, the four data questions, child consent or collect-the-minimum (sub-topic U4-06), and only one addresses the digital footprint (U4-03). The deterministic depth gate counts items per band but not per topic, so this passed G2. Repair: redistribute the RRQ bank so every topic has at least two items.' },
  { severity: 'blocking', resolved: false, message: 'Citation beyond the bound source. docs/semester-1/gict-300/unit-04/topic-01.mdx lines 46-47: "the famous \'I Love You\' virus of May 2000 spread purely through an email attachment and hit tens of thousands of computers (Bourgeois et al., 2019)". The bound excerpt (specs/content/gict-300/sources/texts/bourgeois2019.md, ## Chapter 6 - Information Systems Security) records only that "the I Love You virus of May 2000 spread through an email attachment"; the "tens of thousands of computers" magnitude appears nowhere in the bound text yet is attributed to a named academic source. Repair: remove the magnitude claim or extend the bound excerpt with the source passage that carries it.' },
  { severity: 'blocking', resolved: false, message: 'Sources-file support mapping not carried by the bound excerpt. specs/content/gict-300/sources/unit-04.md line 19 maps bourgeois2019 to "footprint framing (U4-03)" and "data protection framing (U4-06)", but the bound excerpt (sources/texts/bourgeois2019.md) contains no digital-footprint or data-protection content in any chapter summary (chapter 6 covers the CIA triad, passwords, threat families and backups only). As a result sub-topics U4-03 and U4-06 have no verifiable bound-source support: their coverage-matrix primaries (specs/content/gict-300/coverage/unit-04.md lines 12 and 15: ncaStaysafe for U4-03, ncsp2021 for U4-06) are declared unretrievable under D-2026-0001, and the ncaStaysafe declaration (sources/unit-04.md lines 40-44) mitigates only its habits role ("the habits it supports are the same habits the bound bourgeois2019 chapter 6 excerpt independently carries") while the table assigns it U4-03 as primary source. The declaration therefore understates what is left unchecked for the role the table assigns it. Repair: correct the Supports mapping, or bind excerpt passages that actually carry the claimed framing, and align each declaration with the role its key is assigned.' },
  { severity: 'blocking', resolved: false, message: 'Unused registry-verified source and inaccurate sources-file preamble. specs/content/gict-300/sources/unit-04.md lines 3-5 states "every key here is cited both in prose and in a per-topic ## Further reading section", but erendorYildirim2022 appears only in topic-01\'s Further reading (docs/semester-1/gict-300/unit-04/topic-01.mdx line 160); no prose passage in the unit or the teacher notes cites Erendor and Yildirim (2022), although the bound excerpt (sources/texts/erendorYildirim2022.md) claims use for "U4-01, U4-02 framing; Unit 4 teacher notes" and the sources table declares it supports "weak awareness despite heavy technology use; education measurably matters (U4-01 framing)". The declared support is never drawn on anywhere in the unit. laudonLaudon and stairReynolds are likewise Further-reading-only, which is the sanctioned title-level pattern for guide-required print monographs (content-spec.md ## Reading list), so the preamble sentence is wrong as written for three of the table\'s keys. Repair: cite the study in the prose it is meant to support, or correct its row and the preamble claim.' },
  { severity: 'blocking', resolved: false, message: 'MCQ answer-position pattern. docs/semester-1/gict-300/unit-04/unit-assessment.mdx ### Multiple-choice questions (MCQs), items 1-10 with key at lines 143-153: the independently verified key is b, b, c, b, c, b, b, b, b, b - eight of ten correct options are "b" and no correct option is "a" or "d". A learner answering "b" throughout scores 8/10 without knowing the content, which materially weakens the bank as a summative instrument. Repair: redistribute correct options across the four positions when the bank is next edited.' },
  { severity: 'advisory', resolved: false, message: 'RRQ-10 model answer wording. docs/semester-1/gict-300/unit-04/unit-assessment.mdx lines 185-188: "the offline or cloud copy the family needed is in the same locked box as the machine" - "the family" does not fit the school scenario the question describes, and the sentence conflates the remedy (a copy kept elsewhere) with the defect (the only backup co-located with the machine). The substantive analysis (ransomware encrypts both together) is correct.' },
  { severity: 'advisory', resolved: false, message: 'Concept-graph assessment-item mappings are semantically wrong or strained. specs/content/gict-300/concepts/unit-04.md: RRQ-04 (the "my data is not worth stealing" misconception from topic 4.1) is mapped to CON:GICT-300-4-8 "Footprint audit"; RRQ-10 (backup co-location, topic 4.1 defences) is mapped to CON:GICT-300-4-13 "Personal data and sensitivity"; RRQ-03 (phishing tells) is mapped to CON:GICT-300-4-4 "CIA triad". check:concept-graph validates structure, not the correctness of these mappings, so it passes. These rows feed G5 and later assessment alignment and should be corrected.' },
  { severity: 'advisory', resolved: false, message: 'Spec figure plan vs delivered figure for fig-U4-7. specs/content/gict-300/content-spec.md ## Unit 4 figure plan (line 323) describes fig-U4-7 as "where your file goes when you save it to the cloud (4.3)", but the delivered figure (specs/content/gict-300/figures/unit-04.md row fig-U4-7; docs/semester-1/gict-300/unit-04/topic-04.mdx line 33) is a pupil-record data-protection diagram placed in topic 4.4. The spec\'s own topic list (line 307) also assigns fig-U4-7 to 4.4, so the approved spec is internally inconsistent, and sub-topic U4-05 (cloud computing basics) is left without the planned visual. The delivered set still satisfies every gate and the visual-density standard.' },
  { severity: 'advisory', resolved: false, message: 'Reading-list unit mapping inconsistency. specs/content/gict-300/content-spec.md ## Reading list (line 465) assigns stairReynolds to units "1, 2, 6", while the Unit 4 subsection (line 315) and specs/content/gict-300/sources/unit-04.md (line 33) map stairReynolds to U4-06. One of the two locations in the approved spec is stale.' },
  { severity: 'advisory', resolved: false, message: 'PECA 2016 claim rests on no bound source. docs/semester-1/gict-300/unit-04/topic-04.mdx lines 60-63 states the Prevention of Electronic Crimes Act 2016 "criminalises unauthorised access to and copying of data" without citation. The claim is accurate public law (PECA 2016 sections 3-4) and is anchored in the approved spec (content-spec.md line 502, "Standards & frameworks anchors"), but sources/unit-04.md line 26 attributes the "PECA 2016 backdrop" to ncsp2021, whose D-2026-0001 declaration covers only the policy\'s named priorities, not another statute\'s provisions.' },
  { severity: 'advisory', resolved: false, message: 'Manifest under-binding of camelCase source keys (tooling observation for the owner). The ADR-0027 citation scoping in scripts/lib/review-evidence.mjs (citedKeysFor) matches only all-lowercase or hyphenated keys, so specs/content/gict-300/sources/texts/nistCloud2011.md and sources/texts/erendorYildirim2022.md are NOT digest-bound in this review\'s manifest although coverage/unit-04.md and sources/unit-04.md cite both keys; only bourgeois2019.md is bound. This review read and verified both files at HEAD 6361ad6 (nistCloud2011.md sha256 5e1b79f72539e0652cd1ed00fb8e70b442d67e5a3e30f8ed4f51eef100097de6, erendorYildirim2022.md sha256 5b0fc2174562a5bc3f63868dfde0e17aecc97b51bb783b39340fb01339095523), so the freshness guarantee of this report simply does not extend to them.' },
  { severity: 'advisory', resolved: false, message: 'Bare-URL link text in Further reading sections (11 links across topic-01.mdx to topic-04.mdx). render-inspect flags these as advisory: screen readers announce the raw URL. Established corpus pattern, recorded for a future pass.' },
  { severity: 'advisory', resolved: false, message: 'Out-of-scope process note: G2 gate evidence for GICT-300 units 1-6 is stale at HEAD. check:pipeline-gate exits 1 with "G2 en-draft: stale or incomplete input manifest" for all six units because the G2 manifests were generated at commit 3e27a05 and docs/semester-1/gict-300/course-overview.mdx (a bound input) was rewritten in 6361ad6 afterwards. All eight draft gates themselves pass at HEAD (this review ran them; see command logs). Not a unit-04 content defect; the parent should refresh the G2 evidence.' },
  { severity: 'advisory', resolved: false, message: 'Bundle label discrepancy in the handoff: the parent stated the manifest was "prepared at commit d7377ac", but the bound docs/semester-1/gict-300/course-overview.mdx digest (5c615399...) matches 6361ad6; the d7377ac version of that file hashes to bffad37c.... The bundle is self-consistent with HEAD 6361ad6 (all 101 digests re-verified twice during this review, including after a mid-review capacity directive), so only the label was off.' },
  { severity: 'advisory', resolved: false, message: 'ERQ integrative-item composition differs from the spec wording. The approved blueprint (content-spec.md lines 329-331) asks for "one integrative item producing a data-protection plan for a school"; the delivered bank has the data-protection plan as the per-topic ERQ-04 (topic 4.4) and an integrative evaluation essay as ERQ-5. Substantively both elements exist; compositionally the integrative slot is not the data-protection plan.' },
];

const criteria = [
  { id: 'authority', status: 'pass', evidence: [
    'Scheme-and-Course-guides/extracted-text/1st 2026.txt lines 469-479: guide Unit 4 "Cyber security and Data Protection" with five leaf bullets, each mapped and taught',
    'specs/content/gict-300/content-spec.md ## Unit 4 sub-topic checklist lines 289-298 (U4-01..U4-06; guide bullet 1 split into U4-01/U4-02, both within the bullet) and topic list lines 300-309; spec status approved, D-2026-0030',
    'specs/content/gict-300/coverage/unit-04.md rows U4-01..U4-06 each verified against the named ### section in docs/semester-1/gict-300/unit-04/topic-01.mdx (lines 38, 65), topic-02.mdx (line 36), topic-03.mdx (lines 35, 63), topic-04.mdx (line 37)',
    'Course outcome 5 (guide line 406) carried as SLO:GICT-300-4-5 in the clo_refs of all seven unit files; PECA/NCSP context anchored at content-spec.md line 502',
  ]},
  { id: 'sources', status: 'fail', evidence: [
    'Verified against bound excerpt specs/content/gict-300/sources/texts/bourgeois2019.md ## Chapter 6: CIA triad integrity quote (topic-01.mdx line 71-72), phishing quote (line 52-53), pretexting quote (line 57-58), common-passwords and 12-character guidance (topic-03.mdx lines 38-42), backup same-location note (topic-01.mdx lines 80-82) - all supported',
    'Verified against sources/texts/nistCloud2011.md: NIST SP 800-145 definition quote and the five essential characteristics (topic-03.mdx lines 66-73) - supported verbatim',
    'Declared-unretrievable keys (D-2026-0001) ncaStaysafe, ncsp2021, laudonLaudon, stairReynolds: declarations present with attempts, date and owner authorisation (sources/unit-04.md lines 35-57); prose use of ncaStaysafe (topic-01.mdx lines 85-87) and ncsp2021 (topic-01.mdx line 83-85, topic-04.mdx lines 60-65) stays within the declared limits',
    'FAIL per blocking findings: "tens of thousands of computers" attributed to Bourgeois beyond the bound excerpt (topic-01.mdx lines 46-47); sources table maps bourgeois2019 to footprint/data-protection framing absent from the bound excerpt, leaving U4-03/U4-06 without verifiable bound support; erendorYildirim2022 declared as U4-01 framing support but never cited in prose; preamble "cited both in prose" claim false for three keys',
  ]},
  { id: 'coverage', status: 'pass', evidence: [
    'All six sub-topics taught with substantive sections (see authority locators) and assessed: MCQs per topic 3/2/3/2, ERQs one per topic plus integrative; RRQ distribution defective (see assessment finding)',
    'All four spec-listed misconceptions addressed: topic-01.mdx lines 89-94 ("my data is not worth stealing", "antivirus alone"), topic-03.mdx lines 37-44 (reuse), topic-03.mdx line 65 + teacher notes item 3 ("cloud is a place in the sky"); teacher notes lines 27-41 probe all five',
    'Key terms (Malware, Phishing, Digital footprint, Authentication, Cloud computing, Data protection per content-spec.md line 277) all defined and Glossary-linked; glossary references resolve (validate:content T018, exit 0)',
    'Reading minutes 4+14+12+14+12+21+7 = 84, within the 65-95 depth budget (content-spec.md line 309); check:depth-gate exit 0',
  ]},
  { id: 'assessment', status: 'fail', evidence: [
    'Independent solve of all 25 items before reading the supplied answers: derived MCQ key 1-b, 2-b, 3-c, 4-b, 5-c, 6-b, 7-b, 8-b, 9-b, 10-b matches the supplied key (unit-assessment.mdx lines 143-153) on all ten items; no key conflicts',
    'RRQ model answers and ERQ rubrics checked item by item: substantively correct, mark totals sum to 10 on every rubric (lines 155-209), Bloom tags defensible against the thinking required',
    'FAIL per blocking findings: RRQ per-topic distribution 5/1/4/0 violates the approved ">= 2 per topic" blueprint (content-spec.md lines 327-331) and the file\'s own blooms_summary claim (unit-assessment.mdx line 8); MCQ answer positions 8x"b"/2x"c" with no "a" or "d" key',
    'Advisory: RRQ-10 model answer "the family" wording (lines 185-188); concept-graph item mappings RRQ-04/RRQ-10/RRQ-03 wrong or strained (concepts/unit-04.md lines 24, 29, 20)',
  ]},
  { id: 'accessibility', status: 'pass', evidence: [
    'render-review (node scripts/render-inspect.mjs GICT-300 4, chromium 149.0.7827.0 over npm run serve on the rebuilt site, exit 0, defects 0): desktop 1280x900 - no skipped heading levels on all 7 pages, 0 missing alt, 0 broken images; narrow 360x780 - docHorizontalOverflow 0px on all pages, all 8 figures client=scroll=328 with no spill; A4 print 794px - 0 clipped elements, all print figures fit (w=762 right=778), answers headings render in print; SVG geometry clean on all 16 light/dark variants (no viewBox overflow, no wordmark overprint)',
    'Screenshots inspected directly: renders/desktop-topic-01.png, renders/narrow360-topic-03.png, renders/desktop-unit-assessment.png - figures render with meaning matching their alt text, answers section fully visible',
    'Advisory: 11 bare-URL link texts in Further reading sections',
  ]},
  { id: 'readability', status: 'pass', evidence: [
    'HSC/intermediate register verified across all seven files: concrete classroom situations open each topic (topic-01.mdx lines 24-32 Karachi head teacher; topic-02.mdx lines 24-30 B.Ed trainee; topic-03.mdx lines 24-29 school office; topic-04.mdx lines 24-31 Hyderabad vendor), short sentences, one idea per paragraph',
    'Technical terms defined at first use via Glossary (Malware, Phishing, Social engineering, CIA triad, Digital footprint, Password manager, Authentication, MFA, Personal data, Sensitive personal data, Data protection, Consent); no register breaks found',
    'check:no-em-dash exit 0; Pakistani/Sindh localisation throughout (Karachi, Hyderabad, practicum-school tasks in every topic)',
  ]},
  { id: 'pedagogy', status: 'pass', evidence: [
    'Nine-part cycle present and ordered in all four topic files (situation, explanation, activity, check your understanding, summary, self-assessment checklist, practicum, summative task, further reading); check:depth-gate exit 0 plus manual read',
    'Activities feasible in low-resource Pakistani classrooms with usable instructions and materials: Spot the phish (topic-01.mdx lines 96-108, printed/projected messages), three-question audit (topic-02.mdx lines 71-83, paper-based, privacy-respecting), password workshop (topic-03.mdx lines 84-97, methods not secrets), vendor role-play (topic-04.mdx lines 74-85)',
    'Retrieval practice (4 check-your-understanding items per topic, Bloom-tagged), metacognition (3-item self-assessment checklists), misconception probes (teacher notes lines 27-41), every summative task carries a 10-mark guide with an explicit Analyse criterion',
    'Teacher notes map the guide\'s teaching strategies and practical-work list to the unit (lines 64-89) and sequence the topics with triage advice (lines 19-25)',
  ]},
];

const report = {
  schema_version: 1,
  course_code: 'GICT-300',
  unit_no: 4,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: '020-author-gict-300/phr-0036/commit-702fb1d (authoring session per history/prompts/gict-300/0036-author-units-2-6.green.prompt.md; unit 04 authored in commit 702fb1d)',
  reviewer_run_id: 'agent-g3-gict300-u4-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-23T17:33:51Z',
  completed_at: new Date().toISOString(),
  skill_digest: prepared.skill_digest,
  input_manifest: prepared.input_manifest,
  rulings: {
    'D-2026-0001': rulingDigest(process.cwd(), 'D-2026-0001'),
    'D-2026-0030': rulingDigest(process.cwd(), 'D-2026-0030'),
  },
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
};

if (report.skill_digest !== skillDigest(process.cwd(), 'G3')) throw new Error('skill digest mismatch');
writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${OUT}`);
console.log(`criteria: ${criteria.map((c) => `${c.id}=${c.status}`).join(' ')}`);
console.log(`findings: ${findings.filter((f) => f.severity === 'blocking').length} blocking, ${findings.filter((f) => f.severity === 'advisory').length} advisory`);
console.log(`evidence files: ${Object.keys(evidence).length}`);
