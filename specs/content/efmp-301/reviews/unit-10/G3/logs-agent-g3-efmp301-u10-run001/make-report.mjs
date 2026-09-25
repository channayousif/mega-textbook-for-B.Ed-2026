// G3 report generator - EFMP-301 Unit 10 run001. Binds the CURRENT recomputed
// input manifest (drift recorded in manifest-verify.log and finding 9) and hashes
// the exact saved evidence bytes.
import { inputManifest, skillDigest, digest } from '../../../../../../../scripts/lib/review-evidence.mjs';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIR = 'specs/content/efmp-301/reviews/unit-10/G3';
const LOGS = `${DIR}/logs-agent-g3-efmp301-u10-run001`;
const RENDERS = `${DIR}/renders-agent-g3-efmp301-u10-run001`;

const evidence = {};
const add = (p) => { evidence[p] = digest(readFileSync(join(ROOT, p))); };
for (const f of readdirSync(join(ROOT, LOGS)).sort()) add(`${LOGS}/${f}`);
for (const f of readdirSync(join(ROOT, RENDERS)).sort()) add(`${RENDERS}/${f}`);
add(`${DIR}/summary-run001.txt`);

const log = (name) => `${LOGS}/${name}`;

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 10,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:0d8f9067',
  reviewer_run_id: 'g3-review:efmp-301-u10:20260925',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T15:15:59Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: skillDigest(ROOT, 'G3'),
  input_manifest: inputManifest(ROOT, 'EFMP-301', 10, 'G3'),
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'Guide chain verified: Week 15 Chapter 10 bullets "Teaching methods and strategies / Instructional design / Teacher effectiveness" (Scheme-and-Course-guides/extracted-text/1st 2026.txt:1154-1160) map one-to-one onto the four sub-topics (specs/content/efmp-301/content-spec.md:1145-1156); every coverage/unit-10.md row was verified against the actual teaching headings in topic-01.mdx:44-103 and topic-02.mdx:44-107',
        'Guide five-strategy list verified verbatim (1st 2026.txt:1173-1180: lectures, interactive discussions, question-answer session, demonstration, case study analysis) against topic-01.mdx:46-49 and unit-teacher-notes.mdx:29-30; the unit teaches a sixth method (group work) beyond the guide list, honestly framed as an addition grounded in seifert2009 cooperative learning',
        'SLO traces verified: SLO:EFMP-301-10-1 and -10-2 -> guide CLO 3 "Apply psychological principles to classroom instruction and management" (content-spec.md:1135-1137 against 1st 2026.txt:1037); topic clo_refs are correct subsets; intake approved under D-2026-0043/D-2026-0044 (specs/content/efmp-301/intake-2/evaluation.md) with content-spec status: approved',
        'FAIL loci: unit-teacher-notes.mdx:83-86 attributes a chapter-specific practical task to the guide (the guide Practical Work list at 1st 2026.txt:1182-1191 is course-generic and names no chapter task); fig-U10-1 column header "one guide-named use" and alt text "one use named in the course guide" claim guide provenance for uses the guide never names (see findings 2 and 3)',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'All three Seifert & Sutton quotations verified verbatim against the bound excerpt: the Casey Stengel "someplace else" quote opening the planning chapter (sources/texts/seifert2009.md:295-298 vs topic-02.mdx:36-38, baseball-manager attribution accurate); Mager\'s three features with the "behavior that can in fact be observed" and "not something a student thinks or feels" wording (excerpt:306-311 vs topic-02.mdx:50-58); the clarity-benefits passage (excerpt:300-304 vs topic-02.mdx:72-76)',
        'Guide-required source verified: the guide lists the seifert2009 URL itself as recommended book 2 (1st 2026.txt:1193-1202); sources/unit-10.md declares retrieval 2026-09-24 with the bound excerpt; no unverifiable sources declared and none needed',
        'FAIL loci: fig-U10-1 (static/img/figures/efmp-301/unit-10/fig-U10-1.svg; figures/unit-10.md row 1; topic-01.mdx:40) misattributes its example uses to the course guide - the guide names only the five strategy names, never uses (finding 3); the method characterisations for demonstration/discussion/question-answer/case study (topic-01.mdx:56-79) and the choosing-frame constraint material (topic-01.mdx:89-103) rest on passages consistent with seifert2009 Chapters 9-10 but not quoted in the bound excerpt, and sources/unit-10.md:15 "U10-2 (the choosing frame: goals, conditions, fit)" slightly overstates the bound support (finding 8, advisory)',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All four sub-topics taught at the mapped headings: U10-1 and U10-2 in topic-01.mdx ("Teaching methods: what each is good for" :44-85; "Choosing strategies: matching method to purpose" :87-103); U10-3 and U10-4 in topic-02.mdx ("Instructional design: planning backward from outcomes" :44-77; "Teacher effectiveness: what it is and how it grows" :87-107) - headings and content verified, not just the coverage-matrix mapping',
        'Every sub-topic is also assessed: U10-1 (MCQ 1-4, RRQ 1-2, ERQ 1), U10-2 (MCQ 5, RRQ 3-4, ERQ 1), U10-3 (MCQ 6-9, RRQ 5-8, ERQ 2/4/5), U10-4 (MCQ 10, RRQ 9-10, ERQ 3) in unit-assessment.mdx; concept-graph linkage (concepts/unit-10.md) verified consistent by check:concept-graph',
        'Reinforcement rows verified present (topic-02.mdx:44-77 revisits the method catalogue inside design; unit-assessment.mdx:22-29 unit summary; unit-teacher-notes.mdx:81-90 practical work); reading budget 72 min equals the spec target (index 4 + topics 18+18 + assessment 24 + notes 8; content-spec.md:1168-1169)',
        'Advisory note: two of the spec\'s five planned misconceptions ("instructional design means filling in a form"; "experience alone makes an effective teacher", content-spec.md:1175-1177) are addressed only implicitly (by the promise-not-script and growable-repertoire passages); the two delivered misconception blocks satisfy the style-guide requirement',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent solve of all 25 items before comparison (logs-agent-g3-efmp301-u10-run001/blind-derivation.md): all 10 MCQ keys agree (c,b,b,b,b,b,b,b,b,c); all 10 RRQ model answers and all 5 ERQ rubrics agree with the reviewer\'s derived answers; each ERQ rubric sums to 20 and carries at least one Analyze-or-higher row; MCQ topic spread is 5/5 as promised and the MCQ Bloom band Remember..Apply is satisfied',
        'FAIL loci: RRQ topic spread is 4/6 (topic 10.1 = RRQ 1-4, topic 10.2 = RRQ 5-10, unit-assessment.mdx:104-118) against the blueprint\'s promised 5/5 (content-spec.md:1210); ERQ distribution is 1/3/1 (10.1 = ERQ 1; 10.2 = ERQ 2-4; integrative = ERQ 5, unit-assessment.mdx:120-144) against the promised "two per topic plus one integrative" (content-spec.md:1212-1215); no RRQ reaches the promised band\'s Analyze level (9 Understand + 1 Apply); ERQ 5 drops the blueprint\'s "for a named Sindh class" requirement (finding 1); MCQ key clustering b x 8 / c x 2, a and d never correct (finding 6, advisory)',
      ],
    },
    {
      id: 'accessibility',
      status: 'fail',
      evidence: [
        'Rendered inspection of all five pages at 1280x800, 360x640 narrow and A4 print emulation 794x1123 media=print, from the worktree-local build served on port 3210 (logs-agent-g3-efmp301-u10-run001/render-review.log; 15 PNGs and render-audit.json under renders-agent-g3-efmp301-u10-run001/): no document overflow or unreachable content anywhere; every table measured on the table element itself (clientWidth 328 === scrollWidth 328 at 360px, rightmost cell right edge 344 < 360, so no scroll is needed and the absent tabindex/role/aria-label hydration attributes are moot); figures render 703x424 desktop / 328x198 narrow with alt text and lazy loading; dark variants swap under [data-theme=dark]; answers, rubrics, MCQ options and figures are not clipped in narrow or print views',
        'FAIL locus: fig-U10-4\'s last table row is misaligned and overprinted - the fifth practice name is missing from the "observable practice" column and its merged name+description text (bbox 224-677.6 x 402.9-417.1) collides with "Unit 2" (537.3-574.7) by 37.4 x 14.2 px in both light and dark variants (logs: fig-u10-4-overprint.log; renders: figure-fig-U10-4-light.png, figure-fig-U10-4-lastrow-zoom.png) - a text-on-text overprint class that neither check:figures nor measure-figure-text detects (finding 4)',
        'Advisory: fig-U10-3\'s check label was clipped by the 42ad6a8d overflow repair to "check: does this produce it for it?", losing the referents the manifest row specifies (finding 5); Further Reading uses the bare open.umn.edu URL as link text (topic-01.mdx:176-178, topic-02.mdx:180-182), link purpose recoverable from the citation context',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'HSC/intermediate level maintained: every technical term is defined or glossed at first use in plain language (teaching method as tool known by its job, topic-01.mdx:44-45; instructional design as deciding before teaching what success looks like, topic-02.mdx:46-48; Mager\'s test taught through a pass/fail pair, topic-02.mdx:54-56); concrete Pakistani classroom grounding throughout (Hyderabad Class 6 sections, sixty pupils/one blackboard/forty minutes, sealed-jar fortnight investigation)',
        'Nine-part cycle complete and ordered in both topics (verified heading sequences); unit-level apparatus (outcomes, prerequisites, "In this unit" links, how-to-use) present in index.mdx; est_reading_minutes consistent with the delivered text',
        'Advisory slips recorded (finding 7): topic-02.mdx:99 "nameable in a observation" (grammar); unit-teacher-notes.mdx:44 "waiting fifteen units" (course has 12 units; Week 15 conflation); index.mdx:56-58 says "The unit assessment asks for one topic taught by three methods" when that three-method matching is topic-01\'s Activity, not the unit assessment bank',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'Progression classroom-situation -> explanation -> activity -> retrieval -> reflection -> assessment verified in both topics: water-cycle and two-trainees openers (topic-01.mdx:26-38, topic-02.mdx:26-38); misconception blocks named and corrected (topic-01.mdx:80-85 "one method is best"; topic-02.mdx:79-85 "a lesson plan is a script"); five Bloom-labelled retrieval items per topic; four-item self-assessment checklists; practicum transfer tasks (topic-01.mdx:150-154, topic-02.mdx:154-158)',
        'Activities feasible in the stated Sindhi classroom context with usable instructions and no exotic materials: "One topic, three methods" (small groups, 25 min, any class/subject); "Two teachers, one inventory" (pairs, 20 min, remembered teachers); teacher-notes week sequencing table (unit-teacher-notes.mdx:47-55) with a concrete cut-if-a-session-is-lost priority',
        'Integration is the unit\'s explicit design and is delivered honestly: methods tied back to Units 3/4/6/8 (topic-01.mdx:52-78), design tied to Units 2/9 (topic-02.mdx:56-64), effectiveness built as an inventory of practices each attributed to its source unit (topic-02.mdx:93-99, fig-U10-4); mini-rubrics and ERQ rubrics demand Analyze-or-higher work with evidence-over-affection criteria',
        'Advisory: fig-U10-3\'s shortened check label weakens the figure\'s standalone statement of the forward check (finding 5); RRQ 2\'s model answer adds "time" as a demonstration cost beyond the taught passage (blind-derivation.md note)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'Assessment blueprint violation: the approved blueprint (specs/content/efmp-301/content-spec.md:1208-1215) promises RRQ spread 5/5 across topics 10.1/10.2 and ERQs "two per topic plus one integrative", but the delivered bank maps RRQ 4/6 (topic 10.1 = RRQ 1-4, topic 10.2 = RRQ 5-10, unit-assessment.mdx:104-118) and ERQ 1/3/1 (10.1 = ERQ 1; 10.2 = ERQ 2-4; integrative = ERQ 5, unit-assessment.mdx:120-144). No RRQ reaches the promised Understand-to-Analyze band\'s Analyze level (9 Understand + 1 Apply), and ERQ 5 drops the blueprint\'s "for a named Sindh class" requirement (asks only for "a real topic"). Repair: redistribute one RRQ and one ERQ onto topic-10.1 material (or have the owner amend the blueprint), raise at least one RRQ to genuine Analyze demand, and restore the named-class requirement in ERQ 5.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Guide misattribution (teacher notes): docs/semester-1/efmp-301/unit-10/unit-teacher-notes.mdx:83-86 presents the backward-lesson-plan assignment as "The guide\'s practical component for this chapter". The guide\'s Practical Work list (Scheme-and-Course-guides/extracted-text/1st 2026.txt:1182-1191, EFMP-301 block) is course-generic (hands-on computer exercises, individual assignments, group assignments, presentations, internet-research tasks) and names no chapter-specific task; the specific task is authored. Same defect class as Unit 2\'s round-1 blocking finding. Repair: reword to present the task as the unit\'s own practical work aligned with the guide\'s generic "Individual Assignments" component, and align the "guide\'s practical-work list behind the teacher notes" phrasing at specs/content/efmp-301/sources/unit-10.md:21.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Guide misattribution (fig-U10-1): the SVG column header "one guide-named use" and the alt text "one use named in the course guide" (static/img/figures/efmp-301/unit-10/fig-U10-1.svg; specs/content/efmp-301/figures/unit-10.md row 1; topic-01.mdx:40) claim the course guide names a use for each method. The guide names only the five strategy names (1st 2026.txt:1173-1180), never uses; the delivered uses are this course\'s own material ("introducing a new unit\'s map", "the kettle and the cold plate", "the two-schools case of Unit 7"), and the sixth row (group work) is not on the guide\'s list at all, so the header fails under either reading. Repair: reword the column header (e.g. "one use in this course") and the alt text, updating the figure-manifest row consistently.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Figure text-overprint and column misalignment (fig-U10-4): the fifth practice\'s name ("reads pupils developmentally") is missing from the "observable practice" column; name and description are merged into a single text at x=224 (the "what it looks like" column) whose bbox (224-677.6, y 402.9-417.1) collides with "Unit 2" (537.3-574.7, same baseline) by 37.4 x 14.2 px, in both static/img/figures/efmp-301/unit-10/fig-U10-4.svg and the derived .dark.svg (logs-agent-g3-efmp301-u10-run001/fig-u10-4-overprint.log; renders figure-fig-U10-4-light.png and figure-fig-U10-4-lastrow-zoom.png). check:figures and measure-figure-text both pass this file (no viewBox overflow, no wordmark hit) - text-on-text overprint is invisible to both tools. Repair: split the row into name (column 1) plus wrapped description (column 2) with "Unit 2" clear of the text, then re-run measure-figure-text.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'fig-U10-3\'s label-overflow repair (commit 42ad6a8d) clipped the check annotation to "check: does this produce it for it?" (static/img/figures/efmp-301/unit-10/fig-U10-3.svg), losing the referents the figure-manifest row specifies ("the forward check: does this activity produce that evidence for that outcome?"). The meaning remains recoverable from the three labelled boxes, the arrow and the bottom caption, so advisory; repair requested (e.g. "check: does the activity produce the evidence?" or a restructured label area).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'MCQ key clustering: option b is the key in 8 of 10 items and c in 2; options a and d are never correct (unit-assessment.mdx:148-160). Not a rubric violation; consider spreading the key across options in the repair cycle.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Prose slips: topic-02.mdx:99 "nameable in a observation" (should be "an observation"); unit-teacher-notes.mdx:44 "waiting fifteen units" (the course has 12 units and this is Unit 10; conflated with the guide\'s Week 15 slot named at :22); index.mdx:56-58 "The unit assessment asks for one topic taught by three methods" (the three-method matching is topic-01\'s Activity at topic-01.mdx:107-119, not the unit-assessment bank; ERQ 1 asks for a first-lesson defence).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Cited-but-unbound passages: the demonstration/discussion/question-answer/case-study characterisations (topic-01.mdx:56-79) and the choosing-frame constraint material (topic-01.mdx:89-103) are consistent with seifert2009\'s Chapters 9-10 but are not quoted in the bound excerpt (sources/texts/seifert2009.md:293-322); sources/unit-10.md:15\'s "U10-2 (the choosing frame: goals, conditions, fit)" slightly overstates what the bound excerpt carries for U10-2. Consider binding the supporting passages or softening the registry wording.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Input drift, recorded per the parent\'s run instruction: the prepared manifest (specs/content/efmp-301/reviews/unit-10/G3/manifest.json, commit 6d6236d7) is stale against the reviewed HEAD - five bound inputs changed after preparation, all from sibling repair commits: seifert2009.md (+130 additive excerpt lines for Units 2-4 at 8c15c7c9; this unit\'s own excerpt section verified byte-identical) and fig-U10-2/fig-U10-3 light+dark label-overflow fixes at 42ad6a8d. HEAD moved again during the review (4dbe708a -> 53b051ea) with no further bound-input change (93/93 paths, skill_digest unchanged; logs-agent-g3-efmp301-u10-run001/manifest-verify.log). This report binds the recomputed manifest at 53b051ea, so its findings describe exactly the bytes the manifest hashes; the renders were built at 4dbe708a whose bound inputs are identical. The parent should prepare a fresh manifest for the repair round. Under the skill\'s strictest reading a mismatched digest alone is escalation-worthy; it is recorded advisory here because the drift is fully explained, benign in direction, and the parent\'s instructions directed re-verification and recording.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Glossary component imported but never used (topic-01.mdx:17, topic-02.mdx:17); sibling units link banked key terms at first definition (e.g. unit-09/topic-01.mdx:43 <Glossary term="Assessment" />), and the topic-cycle contract shows the pattern (specs/008-rich-unit-pedagogy/contracts/topic-cycle.md:60). Unit 10\'s banked terms (Teaching Strategy, Lesson Plan, Teacher Effectiveness, Pedagogy) receive no glossary link. Terminology banking itself is G4/G5 scope: terminology.csv is not G3-bound (the four teacher-notes claims were spot-checked and are accurate), so no criterion rests on it.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: log('validate-content.log') },
    { name: 'check:depth-gate', exit_code: 0, log_path: log('check-depth-gate.log') },
    { name: 'check:figures', exit_code: 0, log_path: log('check-figures.log') },
    { name: 'check:no-em-dash', exit_code: 0, log_path: log('check-no-em-dash.log') },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: log('check-no-answer-keys.log') },
    { name: 'check:docs-sync', exit_code: 0, log_path: log('check-docs-sync.log') },
    { name: 'render-review', exit_code: 0, log_path: log('render-review.log') },
    { name: 'check:concept-graph', exit_code: 0, log_path: log('check-concept-graph.log') },
    { name: 'check:bloom-bands', exit_code: 0, log_path: log('check-bloom-bands.log') },
    { name: 'check:source-floor', exit_code: 0, log_path: log('check-source-floor.log') },
    { name: 'figures:variants:check', exit_code: 0, log_path: log('figures-variants-check.log') },
    { name: 'measure-figure-text', exit_code: 0, log_path: log('measure-figure-text.log') },
    { name: 'build', exit_code: 0, log_path: log('build.log') },
    { name: 'manifest-verify', exit_code: 0, log_path: log('manifest-verify.log') },
  ],
  evidence_manifest: evidence,
};

writeFileSync(join(ROOT, DIR, 'agent-g3-efmp301-u10-run001.json'), JSON.stringify(report, null, 2) + '\n');
console.log('report written:', `${DIR}/agent-g3-efmp301-u10-run001.json`);
console.log('criteria:', report.criteria.map((c) => `${c.id}=${c.status}`).join(' '));
console.log('findings:', report.findings.filter((f) => f.severity === 'blocking').length, 'blocking /', report.findings.length, 'total');
console.log('evidence files:', Object.keys(evidence).length);
