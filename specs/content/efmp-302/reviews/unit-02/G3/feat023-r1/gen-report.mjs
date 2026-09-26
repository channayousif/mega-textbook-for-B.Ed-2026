import { readFileSync, writeFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-02/G3/feat023-r1/manifest.json', 'utf8'));

// evidence hashes from the sha256sum output captured in evidence-hashes.txt
const evidence = {};
for (const line of readFileSync('specs/content/efmp-302/reviews/unit-02/G3/feat023-r1/evidence-hashes.txt', 'utf8').trim().split('\n')) {
  const m = /^([0-9a-f]{64})\s+(.+)$/.exec(line);
  if (m) evidence[m[2]] = m[1];
}

const L = 'specs/content/efmp-302/reviews/unit-02/G3/logs-feat023-r1';

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 2,
  stage: 'G3',
  disposition: 'pass',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:ef454f9',
  reviewer_run_id: 'agent-g3-efmp302-u2-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T12:54:38Z',
  completed_at: '2026-09-24T13:20:49Z',
  skill_digest: manifest.skill_digest,
  rulings: { 'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f' },
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt:799-815 - guide Unit 2 outline: 2.1 meaning and significance of professional ethics; 2.2 conduct toward students, practice and performance, parents and community, colleagues, plus local and international codes (UNESCO, NACTE); 2.3 Rest four-component model, four-step Empathy/Context/Reflect/Action framework, reflective decision making, classroom dilemmas (grading, confidentiality, social media, equity)',
        'specs/content/efmp-302/content-spec.md ## Unit 2 - approved unit-spec: 14-row sub-topic checklist explicitly declared an expansion of the guide leaf bullets with a Guide ref column; G1 partition of guide 2.3 across topics 2.3/2.4 recorded as confirmed by the curriculum owner 2026-09-15; SLO refs EFMP-302-2-1/2-2 trace to guide CLOs 3 and 6',
        'docs/semester-1/efmp-302/unit-02/index.mdx:67-73 - learner-facing disclosure that the guide has three sections and Topic 2.4 is the second half of guide 2.3, not a fourth guide section',
        'specs/content/efmp-302/coverage/unit-02.md - all 14 U2-NN rows map to an exact topic file plus ### heading; every heading verified present in the named topic file',
        'No guide sub-topic silently added or dropped; the one guide reference that could not be verified (NACTE guidelines) is declared in topic-02.mdx:127-132 and escalated in the sources register rather than filled with invented content'
      ]
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'specs/content/efmp-302/sources/unit-02.md ## Unverifiable sources - all four (npst-pakistan-2009, unesco-teacher-ethics, carr2000, icka2024) declared with retrieval attempts, per-host failure detail, date 2026-09-19 and owner ruling D-2026-0001; declaration judged honest and complete',
        'docs/semester-1/efmp-302/unit-02/topic-01.mdx:105-112 - Carr (2000) claim immediately disclosed as uncorroborated (print-only, could not be obtained, argument reported not read); :134-141 - Icka and Kochoska (2024) likewise disclosed unretrieved',
        'docs/semester-1/efmp-302/unit-02/topic-02.mdx:114-132 - UNESCO framework and NPST 2009 presented, then both disclosed as unreachable from the authoring host with the Standard 9 attribution explicitly flagged uncorroborated; NACTE guidelines declared unverifiable with referral to tutor and source register rather than a guess',
        'specs/content/efmp-302/sources/texts/bebeau1999.md - bound OpenAlex record summary supports the four component names in order and their attribution; checked against topic-03.mdx:44-87, where the diagnostic table is explicitly labelled the unit gloss, not a quotation from the paper',
        'specs/content/efmp-302/sources/texts/ehrich2011.md - bound excerpt (five-part model, competing forces, strategies) checked against topic-03.mdx:113-115 (conceptual model illustrated by constructed scenarios; first move is recognising the dilemma and naming the forces) and topic-04.mdx:48-52 (model built around competing forces; the four-interest sorting is presented as this unit own re-organisation, not Ehrich)',
        'docs/semester-1/efmp-302/unit-02/topic-03.mdx:97-99 - four-step framework taught as guide-given with no verifiable source, matching the no-external-source row in the sources register and the specs/gaps.md escalation'
      ]
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 14 sub-topics taught and verified against actual headings: topic-01.mdx ### at lines 45, 83, 114, 143 (U2-01..U2-04); topic-02.mdx lines 47, 62, 79, 94, 108 (U2-05..U2-09); topic-03.mdx lines 44, 89, 124 (U2-10..U2-12); topic-04.mdx lines 63, 101 (U2-13, U2-14)',
        'Guide leaf bullet to assessment: 2.1 -> MCQ 1-3, RRQ 1-3, ERQ 1; 2.2 conduct domains -> MCQ 4-5, RRQ 4-5, ERQ 2; 2.2 local/international codes -> MCQ 6, RRQ 6; 2.3 Rest -> MCQ 7-8, RRQ 7-8, ERQ 3 and 5; 2.3 four-step framework -> ERQ 4 and 5; 2.3 classroom dilemmas -> MCQ 9-10, RRQ 9-10, ERQ 4-5 (docs/semester-1/efmp-302/unit-02/unit-assessment.mdx:52-182)',
        'docs/semester-1/efmp-302/unit-02/unit-assessment.mdx - approved 10/10/5 blueprint satisfied: 10 MCQ (3/3/2/2 per topic), 10 RRQ (3/3/2/2 per topic), 5 ERQ (one per topic plus integrative ERQ 5 requiring both models)',
        'docs/semester-1/efmp-302/unit-02/index.mdx:29-43 - all five unit learning outcomes carry summative items in the bank',
        'Limitation recorded as advisory finding: U2-12 (Reflective Decision Making, guide 2.3 leaf bullet 3) is taught (topic-03.mdx:124-144) and formatively assessed (topic-03.mdx:175, decision-log practicum :201-211) but has no direct summative item in the 10/10/5 bank'
      ]
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'Independent solve of all 10 MCQs (unit-assessment.mdx:52-120) before comparison with the supplied key (:186-204): all ten keys confirmed (1b, 2c, 3b, 4b, 5c, 6c, 7a, 8c, 9b, 10b); no ambiguous stems found; MCQ 8 character-vs-motivation correctly disambiguated by the stem phrase intends to act, matching topic-03.mdx:65-67 and the activity-2 case at :153-155',
        'Distractors checked and functional: MCQ 1 (law applies to all, codes are written), MCQ 3 (subject knowledge common to doctor-patient too), MCQ 9 (temptation vs dilemma per topic-04.mdx:43-48)',
        'RRQs 1-10 each carry a point-by-point mark scheme (unit-assessment.mdx:206-251); RRQ 7 remedies verified against the topic-03.mdx diagnostic table at :74-79',
        'ERQs 1-5 each carry a four-criterion analytic rubric out of 20 with an analysis-floor cap of 10 (unit-assessment.mdx:253-302); ERQ 5 is the required integrative item working a fresh dilemma through both models and comparing their guidance',
        'Bloom labels checked against thinking actually required: MCQ 2 and 8 (Apply - classify described cases), RRQ 2/6/8 (Analyze - relational and argument analysis), ERQ 3 (Create - propose measures), ERQ 1/4/5 (Evaluate - defend against strongest objection); no verb-label mismatches found',
        'logs-feat023-r1/check-depth-gate.log exit 0 - formative floor and reading-minutes band (143 of 120-160) verified'
      ]
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'logs-feat023-r1/render-review.log section A (desktop 1280x900, all 7 pages): no skipped heading levels, no missing alt text, no broken or unserved images, no bare-URL or vague links, no horizontal overflow; all 8 figures carry descriptive alt and lazy loading, dark variants correctly hidden',
        'logs-feat023-r1/render-review.log section B (narrow 360x780): document horizontal overflow 0px on every page; the Rest diagnostic table (topic-03) and all five ERQ rubric tables measured as their own scroll containers with tabindex=0 and aria-label Scrollable table, scroll sideways to see all columns; figures scroll via the FIGURE.figure container - the table element itself was measured, not the wrapper',
        'logs-feat023-r1/render-review.log section C (A4 print 794px): clippedElems=0 on all 7 pages, all 8 figures fit inside the printable width, answers and marking guidance present in print',
        'Visual close inspection of renders-feat023-r1/desktop-topic-01.png, desktop-topic-02.png, desktop-index.png (reading order, figure labels), narrow360-topic-03.png with crop-band-mid.png (Rest table at 360px), narrow360-unit-assessment.png with crop-ua-rubric1.png and crop-ua-rubric2.png (ERQ rubrics at 360px), pt04-p2.png, pt04-p3.png, pua-p1.png (A4 print pages): figure captions (figure N labels plus in-SVG titles) recoverable, nothing clipped',
        'logs-feat023-r1/measure-figure-text.log - all 32 committed SVG variants (8 figures x light/dark/ur/ur-dark): no text past the viewBox, no wordmark overprint; render-review.log section D confirms the same geometry in-browser'
      ]
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'docs/semester-1/efmp-302/unit-02/index.mdx:50-52 - no prior philosophy or ethics assumed; every technical term defined where it first appears',
        'Glossary definitions at first use: topic-01.mdx:47 (Professional Ethics), topic-02.mdx:42 (Code of Ethical Conduct), topic-03.mdx:126 (Reflective Decision Making), topic-04.mdx:43 (Ethical Dilemma); bank entries match (specs/content/terminology.csv:107-110)',
        'Four concrete worked situations carried through explanation, activity and assessment: Miss Rabia (topic-01.mdx:26-41), Mr Aslam (topic-02.mdx:26-38), Mr Khalid and Miss Nadia (topic-03.mdx:27-40), Miss Farah (topic-04.mdx:26-37 and the fig-U2-8 walkthrough at :89-99)',
        'Prose stays at HSC/intermediate register: abstract ideas (power asymmetry, Rest components, mark-vs-response) each anchored to a named classroom case before being generalised; objection-handling passages (topic-01.mdx:71-81) model the register expected of trainees',
        'Reading budget: est_reading_minutes 8+26+24+24+23+28+10 = 143, inside the approved 120-160 band (content-spec.md ## Unit 2 depth budget)'
      ]
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'Nine-part learning cycle complete in all four topic files (real classroom situation, explanation, activity, check your understanding, summary, self-assessment checklist, practicum task, summative task, further reading); confirmed by reading and by check:depth-gate exit 0',
        'Activities are low-resource, timed and group-based: topic-01.mdx:163-180 (groups of 3, 20 min, no materials), topic-02.mdx:153-165 (groups of 4, 25 min), topic-03.mdx:146-164 (pairs, 25 min), topic-04.mdx:137-152 (groups of 3, 30 min) - all feasible in Pakistani/Sindhi government and small private school classrooms',
        'Misconceptions named and countered inside the topics (topic-01.mdx:71-81 ethics cannot be taught, not in the code so allowed; topic-03.mdx:85-87 knowing right is enough; topic-04.mdx:103-107 confidentiality means never telling) and anticipated with handling guidance in unit-teacher-notes.mdx:33-54',
        'Safety of real-case activities handled: anonymity rules, opt-out to hypothetical cases with no explanation required, safeguarding disclosure escalation (unit-teacher-notes.mdx:56-71); practicum tasks carry their own privacy cautions (topic-01.mdx:230, topic-03.mdx:211, topic-04.mdx:201)',
        'Progression from situation to explanation to activity to retrieval to reflection to assessment holds in every topic; Topic 2.4 explicitly applies the Topic 2.3 models (topic-04.mdx:89-99) and the index states the dependency (index.mdx:76-79)'
      ]
    }
  ],
  findings: [
    {
      severity: 'advisory',
      resolved: false,
      message: 'MCQ 6 and its answer key (docs/semester-1/efmp-302/unit-02/unit-assessment.mdx:86-91 and :196-197) state the NPST Standard 9 attribution as settled fact, while the taught passage (topic-02.mdx:121-125) discloses that the attribution is uncorroborated against the primary document. A learner or marker reading only the answer key would not see the caveat the unit itself teaches. Suggested repair: carry one caveat clause into the MCQ 6 answer-key note. Does not block: the taught passage discloses, the sources register declares npst-pakistan-2009 unverifiable under D-2026-0001, and the item tests what the unit teaches.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'U2-12 Reflective Decision Making (guide 2.3 leaf bullet 3) is taught (topic-03.mdx:124-144) and formatively assessed (topic-03.mdx:175; decision-log practicum :201-211), but the 10/10/5 summative bank contains no direct item on it; the concept graph maps it to MCQ-09 and ERQ-05 (specs/content/efmp-302/concepts/unit-02.md CON:EFMP-302-2-18), which engage it only obliquely (MCQ 9 tests dilemma-vs-temptation; ERQ 5 requires model comparison). The same applies, more weakly since the guide marks them as examples, to social media among the 2.4 dilemma types (formatively assessed at topic-04.mdx:162-163 only). The approved blueprint requires >= 2 items per topic, not per sub-topic, so this is not a blueprint breach. Suggested repair at next revision: one RRQ distinguishing structured reflection from merely thinking about the day, and/or one MCQ on loop closure.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'specs/content/efmp-302/figures/unit-02.md:17-21 states there are no .ur.svg variants and no Urdu mirror on disk at all, deliberately; at HEAD both exist (commit 7a828f9, 2026-09-20, G4 translation, with .ur.svg/.ur.dark.svg committed under static/img/figures/efmp-302/unit-02/). The manifest table itself (8 placed English figures) remains accurate and check:figures passes; only the prose note is stale. Suggested repair: update the note to record that the G4 translation and translated-label variants have since landed.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'bebeau1999 full text remains unread (SAGE 403); the bound evidence is an OpenAlex record summary supporting the four component names, their order and attribution, while the unit central claim that failing any one component prevents ethical action (topic-03.mdx:46-48) and the per-stage failure characterisation rest on record-level support plus the unit own labelled gloss. The sources register declares exactly this boundary and marks it for checking before certification (specs/content/efmp-302/sources/unit-02.md ## Source gaps). Recorded here so the limitation stays visible across attempts; it does not fail sources because the declaration is honest and complete and the prose attributes the model to Rest rather than quoting the unread text.'
    }
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.log` },
    { name: 'site-build', exit_code: 0, log_path: `${L}/site-build.log` },
    { name: 'render-review', exit_code: 0, log_path: `${L}/render-review.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${L}/measure-figure-text.log` }
  ],
  evidence_manifest: evidence
};

writeFileSync('specs/content/efmp-302/reviews/unit-02/G3/agent-g3-efmp302-u2-feat023-r1.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written; criteria:', report.criteria.length, 'findings:', report.findings.length, 'commands:', report.commands.length, 'evidence files:', Object.keys(evidence).length, 'input paths:', Object.keys(report.input_manifest).length);
