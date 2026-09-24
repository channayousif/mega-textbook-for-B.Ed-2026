/** Builds the G3 run001 report for GQUR-300 Unit 3 with real evidence hashes. */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const dir = 'specs/content/gqur-300/reviews/unit-03/G3';
const digest = (p) => createHash('sha256').update(readFileSync(`${root}/${p}`)).digest('hex');

const manifest = JSON.parse(readFileSync(`${root}/${dir}/manifest.json`, 'utf8'));

const evidence = {};
for (const f of readdirSync(`${root}/${dir}/logs-run001`)) evidence[`${dir}/logs-run001/${f}`] = digest(`${dir}/logs-run001/${f}`);
for (const f of readdirSync(`${root}/${dir}/renders-run001`)) evidence[`${dir}/renders-run001/${f}`] = digest(`${dir}/renders-run001/${f}`);

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 3,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:93e6321',
  reviewer_run_id: 'agent-g3-gqur300-u3-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-23T22:55:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  rulings: { 'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f' },
  summary: 'G3 English review of GQUR-300 Unit 3 (Algebraic Reasoning), first attempt. Inputs verified against the prepared manifest (96 inputs, 0 digest mismatches). All 11 content gates pass on a clean build; all 25 assessment items independently solved - 24 of 25 supplied answers verified correct. Disposition revise on three blocking defects: (F1) the coverage matrix and sources table claim openstax-prealgebra grounds U3-03 Linear inequalities (its only source row) and U3-04 Patterns and sequences, but Prealgebra 2e contains no inequalities or patterns content (verified against the book\'s own ToC and the recorded excerpt); (F2) RRQ-8\'s mark scheme awards "check assigned to solve" while Topic 3.3\'s own worked example performs the substitution check under "Decide and check"; (F3) the fare-desk activity example "200 rupees for a 4-km trip on the 50-plus-25 rate" is arithmetically inconsistent (50 + 25 x 4 = 150). Eight further advisory findings recorded, including the review-host image-display limitation (visual criteria verified programmatically over the live rendered build).',
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Guide verified: Scheme-and-Course-guides/extracted-text/1st 2026.txt:591-596 lists Unit 3\'s four leaf sub-topics (variables and algebraic expressions; linear equations and inequalities; patterns and sequences; use of algebra in problem solving); each is taught in a named section (topic-01.mdx ### Patterns and sequences and ### Variables and algebraic expressions; topic-02.mdx ### Linear equations and ### Linear inequalities; topic-03.mdx ### Use of algebra in problem solving) and each is assessed (U3-01/U3-04 -> MCQ-01..04, RRQ-01..03, ERQ-1; U3-02/U3-03 -> MCQ-05..07, RRQ-04..07, ERQ-2/ERQ-4; U3-05 -> MCQ-08..10, RRQ-08..10, ERQ-3/ERQ-5; see logs-run001/independent-assessment-derivation.md).',
        'specs/content/gqur-300/content-spec.md ## Unit 3 (lines 285-351): ### Sub-topic checklist U3-01..U3-05 forms a total, disjoint partition across the ### Topic list; CLO refs "course outcomes 1 and 2" match the unit front matter (SLO:GQUR-300-1-1, SLO:GQUR-300-2-2) on all six unit files and concepts/unit-03.md. The course-wide SLO scheme\'s second number repeats the course outcome (verified across all six units\' clo_refs); course-overview.mdx:57-58\'s "(course outcome, then unit)" parenthetical misdescribes it (advisory finding).',
        'Guide teaching strategies and practical work (1st 2026.txt:638-666) are reflected: brainstorming and question-answer modes in unit-teacher-notes.mdx ## Teaching strategies from the guide; pair/group activities in all three topics; group assignment (rate-card wall), individual assignment (practicum collection) and presentations (clinic defences) in unit-teacher-notes.mdx ## Practical work; the practicum artefacts feed ERQ-5 as the index promises (index.mdx ## How to use this unit).',
        'Weeks 7-9 are labelled derived, not guide-determined (content-spec.md:287 per D-2026-0012; the guide carries no week table) - no scope invented from silent authority.',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'Bound excerpt sources/texts/gula2025.md (ERIC record level) supports the prose attribution at topic-01.mdx:49-54 ("transfer between concrete and abstract thinking spaces"); ERIC EJ1489427 fetched live this review confirms the phrase, the citation (Gula and Lovric, 2025, Canadian Journal of Science, Mathematics and Technology Education, 25(1), 171-184) and that the record mentions no matchsticks.',
        'NCC claim (topic-01.mdx:52-54, curriculum spans Grades 1-12, cited NCC, n.d.) supported at record level by sources/texts/ncm.md; ncc.gov.pk URL resolves HTTP 200 (checked this review).',
        'OpenStax prose claim (topic-03.mdx:65-67, algebra chapters built on translation from "the language of algebra" to applied problems) supported at structure level by sources/texts/openstax-prealgebra.md (Ch. 2 The Language of Algebra; Ch. 8 Solving Linear Equations); openstax.org resolves HTTP 200.',
        'FAIL (blocking finding F1): coverage/unit-03.md row "U3-03 | topic-02.mdx | Linear inequalities | openstax-prealgebra" (the sub-topic\'s ONLY source row) and row "U3-04 | topic-01.mdx | Patterns and sequences | openstax-prealgebra", together with the sources/unit-03.md Supports cell claiming openstax-prealgebra backs "U3-01, U3-02, U3-03, U3-04, U3-05": Prealgebra 2e contains no inequalities and no patterns/sequences content. Verified this review against the book\'s own table of contents (openstax.org/books/prealgebra-2e/pages/preface: 11 chapters - Whole Numbers; The Language of Algebra; Integers; Fractions; Decimals; Percents; The Properties of Real Numbers; Solving Linear Equations; Math Models and Geometry; Polynomials; Graphs - none on inequalities or patterns) and consistent with the recorded excerpt, which documents only language of algebra, linear equations and math models. The grounding claim for U3-03 is false (no source covers the sub-topic\'s only row) and for U3-04 unsupported.',
        'sources/unit-03.md declares "## Unverifiable sources: None for this unit" while each excerpt honestly discloses its record/structure-level provenance; judged under D-2026-0001 (ruling digest recorded). Two Supports-cell overstatements remain (advisory finding F7): gula2025\'s cell claims "the move from matchsticks to the rule 2t + 1" which the ERIC record does not document (the matchstick mapping is the unit\'s own application; the prose itself attributes only the transfer phrase, so the prose is not at fault), and "Both keys have bound excerpts" understates - there are three keys.',
        'Binding observation (advisory finding F9): this unit\'s manifest binds only sources/texts/gula2025.md; ncm.md and openstax-prealgebra.md are outside the bound set because the cited-key derivation requires a 4-digit year in the key. Both were read and verified this review with that disclosed; edits to them would not invalidate this report.',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All five checklist IDs (content-spec.md ### Sub-topic checklist) have coverage rows (specs/content/gqur-300/coverage/unit-03.md) whose named sections exist and genuinely cover them: U3-01 -> topic-01.mdx ### Variables and algebraic expressions (lines 56-81, definitions, vocabulary table, van worked example); U3-04 -> topic-01.mdx ### Patterns and sequences (lines 39-54, growth types and the 2t+1 rule); U3-02 -> topic-02.mdx ### Linear equations (lines 39-63, balance model, worked example, misconception); U3-03 -> topic-02.mdx ### Linear inequalities (lines 65-83, range claim, sign flip, budget example); U3-05 -> topic-03.mdx ### Use of algebra in problem solving (lines 40-67, translation loop, five patterns, worked example).',
        'The coverage partition matches the ### Topic list (U3-01/U3-04 in 3.1; U3-02/U3-03 in 3.2; U3-05 in 3.3); every topic file is referenced by at least one row; check:depth-gate exit 0 confirms the structural invariants.',
        'Every sub-topic is also assessed (mapping in logs-run001/independent-assessment-derivation.md), so coverage is not heading-only.',
        'The Source-column defect for U3-03/U3-04 (openstax-prealgebra does not cover those topics) is filed under sources (F1); the taught passages themselves cover every sub-topic.',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'All 25 items independently solved before comparison; derivations and comparison in logs-run001/independent-assessment-derivation.md. MCQ key 10/10 correct (verified by computation, not by reading the key first): item-by-item arithmetic in the derivation log. RRQ models correct except RRQ-8\'s criterion conflict. ERQ rubric arithmetic verified: ERQ-1 (2n+11; 41 m at n=15; n<=29.5 -> 29 with 2(29)+11=69<=70); ERQ-2 (p<=100; 8,000+120x100=20,000 exact; 101 -> 20,120); ERQ-3 (4,250 vs 4,950, A cheaper by 700; break-even n=80); ERQ-4 (45b<=1,700 -> b<=37.8 -> 37; 1,665 vs 1,710; leftover 1,700-45b=35); ERQ-5 open with a sound rubric. Mark totals recomputed (7/7/7/8/10) and consistent.',
        'FAIL (blocking finding F2): unit-assessment.mdx RRQ-8 model answer (lines 180-182) awards a mark for "check assigned to solve", but topic-03.mdx:53-59 performs the substitution check under step 4 "Decide and check". A trainee who follows the unit\'s own worked example answers "decide" and loses 1 of 3 marks; the mark scheme and the worked example must be aligned (fig-U3-3 and fig-U3-5 support the "solve" reading, so the worked example\'s step-4 label is the odd one out).',
        'Blueprint satisfied (content-spec.md:348-351): exactly 10/10/5 per band; >= 2 MCQ and >= 2 RRQ per topic (MCQ 4/3/3, RRQ 3/4/3 across topics 3.1/3.2/3.3); MCQs Remember->Apply, RRQs Understand->Analyze, ERQs Analyze->Evaluate with Analyze-tagged rubrics; check:bloom-bands exit 0. Distractors checked: plausible error options, no ambiguous stems, exactly one defensible answer per MCQ.',
        'Advisory findings: F4 - 8 of 10 MCQ correct options are "b" (MCQ-1 and MCQ-6 are "a"; none at "c" or "d"), so a test-wise learner marking only b scores 8/10 (same class as the Unit 1 run001 P1 finding); F5 - MCQ-1 is tagged Remember while the identical task in topic-01.mdx CYU-1 (line 93) is tagged Apply, and the thinking actually required (apply the growth rule four times) is Apply.',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Rendered inspection over the clean production build, all six unit-03 pages at 1280x800 and 360x740 (logs-run001/render-review.txt, render-geometry.txt, dom-inspection.txt; 32 artifacts in renders-run001/): no page-level horizontal overflow at 360px, no non-scrollable element past the viewport, and no HTML content tables on any page (all tabular content is SVG figures scaling 703px -> 328px), so the narrow-table reachability concern is satisfied trivially.',
        'All six figures load in the light theme (complete and naturalWidth > 0) with non-empty alt text carried verbatim from the figure manifest; the dark variants swap in under html[data-theme=dark] via static CSS (both display states verified; works without JavaScript); every figure carries a figcaption credit.',
        'Print A4 (794x1123 print-media emulation plus true page.pdf at A4, printBackground): no img/figure/table/pre/code element clipped past the page box on any of the six pages; PDFs saved for all pages including the full answers section.',
        'Heading structure: exactly one h1 per page and no skipped levels (12/12/11/10/8 headings across the six pages); all in-article links descriptive (no "click here"-class link text); no em dash (check:no-em-dash exit 0).',
        'Figure glyph geometry: node scripts/measure-figure-text.mjs over all 12 committed unit-03 SVGs (light and dark) exit 0 - widest text ends at 768.4/776.2 inside the 780-wide viewBox with no wordmark overprint (logs-run001/measure-figure-text.txt).',
        'Figure instructional content extracted from the rendered pages matches each figure\'s alt text and the unit\'s prose (dom-inspection.txt: fig-U3-1 stages 1-4 with 3/5/7/9 sticks and "sticks = 2 x triangles + 1"; fig-U3-3 four balance-method steps on the 60+15k=195 thread; fig-U3-5 translate/solve/interpret/decide; fig-U3-6 five translation patterns).',
        'Recorded limitation (advisory finding F10): the review host could not display images to the reviewer this session (image reads returned no visual content, including for a minimal test PNG; the MCP browser channels also had no system Chrome). Visual criteria were therefore verified as programmatic measurements over the live rendered build, with the saved renders as the inspection record; this is disclosed rather than claimed as eyed inspection.',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'HSC/intermediate register held across all six files (Constitution Art. III.1 / style-guide ## EN readability rules): short sentences, active voice, one idea per paragraph; every technical term is defined at first use and marked with <Glossary>; all 8 marked terms exist in glossary.json (Pattern, Sequence, Variable, Algebraic expression, Coefficient, Linear equation, Balance model, Linear inequality).',
        'No em dash anywhere in the unit (check:no-em-dash exit 0); est_reading_minutes sum across the six files is 5+15+15+15+12+6 = 68, inside the 55-70 depth budget (content-spec.md:319).',
        'Inequality notation renders correctly on the built pages ("<=", ">=", "<" all verified in the rendered article text, including the one raw "p < -6" at unit-assessment.mdx:174 and the "&lt;=" entities elsewhere); no broken MDX from angle brackets (clean build exit 0, unlike the Unit 3 state the Unit 1 run001 review found).',
        'Advisory finding F11: "x" is used as a multiplication sign in prose and figures ("2 x 12 + 1", "2 x triangles + 1") while MCQ-6 uses x as a variable ("5x - 7 > 18"); a fresher meeting algebra for the first time can confuse the two. Consistent letter variables (t, k, m, b, s, p, n, g) are used everywhere else.',
      ],
    },
    {
      id: 'pedagogy',
      status: 'fail',
      evidence: [
        'The nine-part topic cycle is present and correctly ordered in all three topics (check:depth-gate exit 0): classroom situation -> explanation with worked example and misconception -> activity -> check your understanding (5 items each, retrieval-style) -> summary -> self-assessment checklist (3 "I can" statements each) -> practicum task -> summative task with mini-rubric -> further reading.',
        'The progression is sound and explicit: patterns (Topic 3.1) -> variables/expressions (3.1) -> equations as balance (3.2) -> inequalities as ranges (3.2) -> translate-solve-interpret-decide loop (3.3), built on Unit 1\'s four-step strategy and Unit 2\'s operations (index.mdx ## Prerequisite knowledge; topic-03.mdx:47-48).',
        'All three spec-listed misconceptions (content-spec.md:324-326) are taught and corrected in prose - letter-as-thing-to-solve-for (topic-01.mdx:77-81), equals-sign-as-answer-next (topic-02.mdx:59-63), inequalities-behave-like-equations (topic-02.mdx:69-76, the number-line turn-around) - plus a fourth (algebra separate from real maths, topic-03.mdx:61-67), and all four are probed again in unit-teacher-notes.mdx ## Common misconceptions to probe.',
        'FAIL (blocking finding F3): the fare-desk activity\'s model example is arithmetically inconsistent - topic-02.mdx:87-89 gives "200 rupees for a 4-km trip on the 50-plus-25 rate", but 50 + 25 x 4 = 150, not 200 - in an activity whose stated point is that the writing pair verifies the check. Repair: "150 rupees for a 4-km trip" or "200 rupees for a 6-km trip".',
        'Activities are otherwise feasible in the stated Pakistani/Sindhi classroom context with ordinary materials and time bounds (Rule detective, ~25 min, matchsticks/dot arrays/tile borders; fare desk, ~20 min; rate card clinic, ~25 min, real cards), and the three practicum artefacts feed ERQ-5 as promised (unit-teacher-notes.mdx ## Practicum links). Advisory finding F6: the tutor problem (250 + 400s = 2,650) appears three times (topic-02.mdx CYU-2, topic-03.mdx worked example, topic-03.mdx CYU-2), reducing practice value.',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'F1 SOURCES / coverage grounding. coverage/unit-03.md row "U3-03 | topic-02.mdx | Linear inequalities | openstax-prealgebra" (the sub-topic\'s only source row) and row "U3-04 | topic-01.mdx | Patterns and sequences | openstax-prealgebra", plus the sources/unit-03.md Supports cell claiming openstax-prealgebra backs U3-01..U3-05, assert grounding the source does not provide: OpenStax Prealgebra 2e has no inequalities and no patterns/sequences content (verified this review against the book\'s own ToC at openstax.org/books/prealgebra-2e/pages/preface - 11 chapters, none on either topic - and consistent with the recorded structure-level excerpt sources/texts/openstax-prealgebra.md, which documents only the language of algebra, solving linear equations and math models). U3-03\'s only coverage row is therefore a false grounding claim. Repair: ground Linear inequalities in a source that actually covers it (e.g. a verified open-access inequalities chapter) or record a no-external-source row with the gaps.md escalation the style guide requires; drop or correct the U3-04 openstax row (ncm and gula2025 rows already document U3-04); correct the Supports cell.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'F2 ASSESSMENT / conflicting marking criteria. unit-assessment.mdx:180-182 (RRQ-8 model answer) awards 1 of 3 marks for "check assigned to solve" ("the substitution check belongs to the solve move (it proves the solution)"), but topic-03.mdx:53-59, the unit\'s own worked example for the same loop, performs the substitution check under step 4 "Decide and check". A trainee who learned from the worked example answers "decide" and loses the mark. fig-U3-3 (check as the 4th step of the balance method) and fig-U3-5 (solve = use the balance method) support the "solve" reading, so the worked example\'s step-4 label is the outlier. Repair: relabel the worked example\'s step 4 (e.g. "Decide", with the check folded into step 2\'s method) or widen the mark scheme to accept the taught formulation.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'F3 PEDAGOGY / arithmetic inconsistency in an activity example. topic-02.mdx:87-89 (Activity: The fare desk): the model fare-card situation "200 rupees for a 4-km trip on the 50-plus-25 rate" is internally inconsistent - 50 + 25 x 4 = 150, not 200 - in an activity whose explicit point is that "the writing pair verifies the check". A trainee copying the example produces a card whose check fails. Repair: change to "150 rupees for a 4-km trip" or "200 rupees for a 6-km trip".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F4 ASSESSMENT / MCQ key concentration. 8 of 10 MCQ correct options are "b" (unit-assessment.mdx:152-161; MCQ-1 and MCQ-6 are "a"; none is "c" or "d"). All keys verified correct against independent solving, but a test-wise learner marking only b scores 8/10. Redistribute correct options across a-d at the next bank revision (same class as the Unit 1 run001 P1 finding).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F5 ASSESSMENT / Bloom tag inconsistency. MCQ-1 (unit-assessment.mdx:36) is tagged Remember, but the identical task in topic-01.mdx:93 (CYU-1) is tagged Apply, and the thinking actually required - applying the growth rule four times to generate terms - is Apply, not recall. Align the tags (the bank summary "MCQs at Remember, Understand and Apply" still holds either way if another item carries Remember).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F6 PEDAGOGY / repeated problem. The tutor problem (250 + 400s = 2,650) appears three times: topic-02.mdx:96-98 (CYU-2), topic-03.mdx:53-59 (worked example) and topic-03.mdx:82-83 (CYU-2, verbatim). The repetition reduces practice value and makes two check-your-understanding items predictable from the worked example. Vary one instance\'s numbers or context.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F7 SOURCES / Supports-cell precision. sources/unit-03.md:11 claims gula2025 supports "the move from matchsticks to the rule 2t + 1", but the ERIC record (verified live this review) mentions no matchsticks - the matchstick mapping is the unit\'s own application of the transfer idea (the prose at topic-01.mdx:49-54 attributes only the transfer phrase, so the prose is not at fault). Also sources/unit-03.md:15 says "Both keys have bound excerpts" where the table carries three keys. Tighten both wordings to what the record-level evidence documents.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F8 AUTHORITY / SLO scheme description. course-overview.mdx:57-58 describes the reference scheme as "SLO:GQUR-300-1-1 through SLO:GQUR-300-5-5 (course outcome, then unit)", but in every unit\'s front matter the second number repeats the course outcome (e.g. unit-02 cites SLO:GQUR-300-1-1 for outcome 1; unit-03 cites SLO:GQUR-300-1-1 and SLO:GQUR-300-2-2 for outcomes 1 and 2 per content-spec.md:289). The substance is correct; the parenthetical misdescribes the scheme and would read as "outcome 1 of unit 1" for a Unit 2 citation. Fix the parenthetical (course-level file, not unit-03 specific).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F9 PROCESS / manifest binding gap for two source excerpts. This unit\'s prepared manifest binds only sources/texts/gula2025.md; sources/texts/ncm.md and sources/texts/openstax-prealgebra.md are outside the bound set because the cited-key derivation in scripts/lib/review-evidence.mjs (citedKeysFor) only recognises keys containing a 4-digit year, and "ncm"/"openstax-prealgebra" have none. Both excerpts were nevertheless read and verified by this review (disclosed here and in the sources criterion); the observation is that a later edit to either excerpt would not invalidate this report, which is broader binding than ADR-0027\'s "binds to a unit iff that unit cites <key>" intent. Machinery observation for the owner, not a unit-03 content defect.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F10 ACCESSIBILITY / review-host inspection limitation. The review host could not display images to the reviewer this session (image reads returned no visual content, including for a minimal valid test PNG; the MCP browser channels additionally had no system Chrome at /opt/google/chrome/chrome). Visual and accessibility criteria were therefore verified programmatically over the live rendered production build (real Chromium: geometry, computed styles, image load state, alt attributes, heading structure, link text, overflow, print clipping, dark-variant switching, SVG label extraction) with 32 render artifacts saved and hashed as the inspection record. Disclosed per the contract; a later human audit can eye the saved renders.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F11 READABILITY / multiplication sign. "x" is used as a multiplication sign in prose and figures ("2 x 12 + 1" at unit-assessment.mdx:153, "2 x triangles + 1" in fig-U3-1, "60 + 15 x 9" at topic-02.mdx:55) while MCQ-6 (unit-assessment.mdx:66) uses x as a variable ("5x - 7 > 18"). For a fresher meeting algebra for the first time the two uses can collide. Consider the multiplication dot or explicit wording in a later revision; not a correctness defect.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - INPUT BINDING VERIFIED. The prepared manifest (specs/content/gqur-300/reviews/unit-03/G3/manifest.json) was recomputed with inputManifest() from scripts/lib/review-evidence.mjs: 96 inputs, 0 missing, 0 extra, 0 digest mismatches; skill_digest matches. The worktree is clean at commit c79c453 (only the two review manifests under reviews/ are untracked, and reviews/ is excluded from binding). Unit 3 English bytes were authored at commit fe83157 and last modified by the repair commit 93e6321 (author_run_id records the latter).',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - INDEPENDENCE. This session did not author or translate any reviewed byte: the unit was authored in commit fe83157 and repaired in 93e6321 by other sessions; this reviewer session started fresh from the parent\'s handoff. The assessment questions were solved with independent derivations for all 25 items (logs-run001/independent-assessment-derivation.md) before comparison with the supplied answers; because unit-assessment.mdx carries questions and answers in one file, the derivation log discloses that the comparison could not be sequenced blind and records the independent computation for every item instead. No bank item was rewritten.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - LIVE SOURCE VERIFICATION. All three cited sources verified this review beyond URL resolution: ERIC EJ1489427 fetched and matches the gula2025 citation (authors, journal, volume/issue, pages, year) and the quoted "transfer between concrete and abstract thinking spaces" phrase (no matchsticks in the record); the OpenStax Prealgebra 2e preface ToC fetched (11 chapters, none on inequalities or patterns - the basis of finding F1); ncc.gov.pk, openstax.org and the DOI all resolve HTTP 200. The first build attempt over a stale build/ directory failed (site-build.txt, exit 1, ur-locale search-index ENOENT) and a clean rebuild succeeded (site-build-clean.txt, exit 0) - recorded as the stale-build trap the G3 rubric warns about, not a content defect.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs-run001/validate-content.txt` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs-run001/check-depth-gate.txt` },
    { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs-run001/check-figures.txt` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs-run001/check-no-em-dash.txt` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs-run001/check-no-answer-keys.txt` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs-run001/check-docs-sync.txt` },
    { name: 'check:content', exit_code: 0, log_path: `${dir}/logs-run001/check-content.txt` },
    { name: 'site-build', exit_code: 0, log_path: `${dir}/logs-run001/site-build-clean.txt` },
    { name: 'site-build-stale-attempt', exit_code: 1, log_path: `${dir}/logs-run001/site-build.txt` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs-run001/measure-figure-text.txt` },
    { name: 'render-review', exit_code: 0, log_path: `${dir}/logs-run001/render-review.txt` },
    { name: 'dom-inspection', exit_code: 0, log_path: `${dir}/logs-run001/dom-inspection.txt` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(`${root}/${dir}/agent-g3-gqur300-u3-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('report written:', `${dir}/agent-g3-gqur300-u3-run001.json`);
console.log('evidence files:', Object.keys(evidence).length);
console.log('renders:', Object.keys(evidence).filter((p) => /\.(png|webp|jpg)$/.test(p)).length);
