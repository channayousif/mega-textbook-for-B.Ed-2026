// Report generator - GQUR-300 Unit 6 G3 run001. Assembles the contract JSON with
// computed evidence hashes and writes agent-g3-gqur300-u6-run001.json.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const L = 'specs/content/gqur-300/reviews/unit-06/G3/logs-agent-g3-gqur300-u6-run001';
const R = 'specs/content/gqur-300/reviews/unit-06/G3/renders-agent-g3-gqur300-u6-run001';

const prepared = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-06/G3/manifest.json', 'utf8'));

const evidence = {};
for (const f of readdirSync(L)) evidence[`${L}/${f}`] = sha(`${L}/${f}`);
for (const f of readdirSync(R)) evidence[`${R}/${f}`] = sha(`${R}/${f}`);

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 6,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:56f5b54',
  reviewer_run_id: 'agent-g3-gqur300-u6-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T00:26:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: prepared.skill_digest,
  input_manifest: prepared.input_manifest,
  rulings: { 'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f' },
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Guide leaves: Scheme-and-Course-guides/extracted-text/1st 2026.txt:629-636 - Unit 6 prescribes exactly four leaves: financial literacy (profit, loss, interest, budgeting); quantitative reasoning in media and advertisements; decision-making using quantitative data; interpreting quantitative information in education and society. The guide\'s teaching strategies, practical work and assessment criteria (lines 638-680) are course-general and are carried in unit-teacher-notes.mdx (Teaching strategies from the guide; Practical work).',
        'specs/content/gqur-300/content-spec.md ## Unit 6 (lines 488-556): status approved (front matter line 3); ### Sub-topic checklist U6-01..U6-06 maps the guide leaves with no additions or omissions (financial literacy split into profit-and-loss / interest / budgeting, exactly the guide\'s own parenthesis); ### Topic list assigns U6-01..03 to 6.1, U6-04 to 6.2, U6-05..06 to 6.3, matching the three topic files that exist; "Weeks 15-16 (derived)" is labelled derived in the spec itself (D-2026-0012).',
        'CLO trace: content-spec.md:492 "CLO refs: course outcomes 2, 4 and 5"; the unit\'s clo_refs (SLO:GQUR-300-2-2, SLO:GQUR-300-4-4, SLO:GQUR-300-5-5) follow the corpus convention verified across units 01-06 (outcome-anchored SLO IDs; no unit-01-style CLO/SLO mismatch here). course-overview.mdx:51-55 outcomes 2 (solve real-world quantitative problems), 4 (communicate mathematical ideas clearly) and 5 (interpret tables, graphs, and statistical information) are each served: outcome 2 by the ledger, interest, instalment and grant computations; outcome 4 by the honest-version rewrites and four-sentence decision presentations; outcome 5 by the indicator and chart reading.',
        'Assessment blueprint (content-spec.md:553-556) is met by the bank: 10/10/5; MCQ distribution 4/3/3 and RRQ 4/3/3 across topics 6.1/6.2/6.3 (>= 2 per topic floor met without the escape clause); MCQs Remember..Apply, RRQs Understand..Analyze, ERQs Analyze..Evaluate; ERQ rubrics 1-4 each carry an Analyze-or-higher criterion. No contradictory or missing G0/G1 authority was found, so no escalation is required.',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'VERIFIED - pbs. Bound excerpt specs/content/gqur-300/sources/texts/pbs.md read and compared with every use: literacy 10+ 57.54 percent (male 64.23, female 50.21) and out-of-school 5-16 46.29 percent match topic-02.mdx:54-55, topic-03.mdx:63-65 and 126-128, unit-assessment.mdx:30-31 and 132-135, and the fig-U6-6.svg labels; the "14-point male-female gap" checks (64.23 - 50.21 = 14.02). Live fetch of https://www.pbs.gov.pk/ this session confirms the excerpt\'s provenance note (7th Population and Housing Census 2023, 241.49 million total).',
        'VERIFIED - steen2001 at bibliographic level. Live fetch of https://archive.org/details/mathematicsdemoc0000unse confirms the work (Mathematics and Democracy: The Case for Quantitative Literacy, 2001, NCED Princeton, ed. Lynn Arthur Steen), the controlled-lending restriction and the unavailability, exactly as declared under ## Unverifiable sources in sources/unit-06.md:16-19 with attempt, date 2026-09-23 and owner ruling D-2026-0001; the limit is stated at the point of use in both Further reading blocks (topic-01.mdx:164, topic-02.mdx:134) and the prose use (topic-02.mdx:34-35) stays within the corpus\'s accepted paraphrase class (cf. unit-01 topic-01.mdx:45-49).',
        'VERIFIED at record level - mcclure2020 and tout2020: both ERIC records fetched live this session (EJ1480153: McClure, Numeracy 13(2), 2020; EJ1266633: Tout, International Review of Education 66, 183-209, 2020); citations match exactly; both bound excerpts honestly declare record-level summaries.',
        'FAILING - citation traceability: sources/unit-06.md:3-5 asserts "every key here is cited both in prose and in a per-topic ## Further reading section", but tout2020 is named nowhere in unit prose - only in topic-02.mdx:135-137 (Further reading). Its Supports cell (U6-04: "what counts as literate or numerate depends on the tasks asked; cross-comparing numbers without reading their construction misleads") is taught nowhere in topic-02. Same class as the unit-04 run001 blocking finding and unit-01 S2.',
        'FAILING - coverage grounding overstated for four rows of coverage/unit-06.md: U6-01/steen2001 (line 10) and U6-02/steen2001 (line 11) - the "Financial literacy: profit and loss" (topic-01.mdx:40-53) and "Financial literacy: interest" (topic-01.mdx:54-75) sections carry no Steen attribution; the only steen2001 prose citation is topic-02.mdx:34-35, a different topic file. U6-03/pbs (line 12) - the "Financial literacy: budgeting" section (topic-01.mdx:77-94) contains no PBS material or attribution (it uses a stipend example) although the Supports cell claims pbs is "behind the budget ... contexts". U6-05/mcclure2020 (line 15) - the "Decision-making using quantitative data" section (topic-03.mdx:41-56) carries no McClure attribution; the citation sits in U6-06\'s section (topic-03.mdx:68-70). Same class as unit-01 S1 / unit-03 F1 (blocking there). Repair: attribute in the named sections or correct the rows and Supports cells.',
        'Advisory items recorded under findings: pbs Kind "guide-required" mislabel (the guide\'s recommended books at 1st 2026.txt:651-656 and the spec\'s Guide-required block at content-spec.md:83-90 do not name PBS; it sits in Curated-supplementary at content-spec.md:102); mcclure2020 prose overstatement ("around exactly this skill", topic-03.mdx:68-70, beyond the ERIC record); sources/texts/pbs.md outside the manifest\'s bound set (digit-free key "pbs" matches no cited-keys pattern).',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'Every guide leaf has a taught passage: U6-01 profit and loss (topic-01.mdx:40-53, classroom situation 23-36 plus the ### section), U6-02 interest (topic-01.mdx:54-75), U6-03 budgeting (topic-01.mdx:77-94) - each with a Pakistan-grounded worked example (fair stall, savings account, stipend budget); U6-04 (topic-02.mdx:39-71: truncated axis, convenient base, missing comparison, hidden rate, five questions); U6-05 decision-making (topic-03.mdx:41-56, the two-school worked example); U6-06 interpreting indicators (topic-03.mdx:58-77 with the verified Sindh figures). Section names in coverage/unit-06.md match the ### headings exactly.',
        'Every sub-topic is assessed: U6-01 (MCQ-01, MCQ-02, RRQ-01, RRQ-04, ERQ-01, ERQ-04); U6-02 (MCQ-03, MCQ-07, RRQ-02, ERQ-01); U6-03 (MCQ-04, RRQ-03); U6-04 (MCQ-05, MCQ-06, RRQ-05, RRQ-07, ERQ-02); U6-05 (MCQ-10, RRQ-10, ERQ-03); U6-06 (MCQ-08, MCQ-09, RRQ-08, RRQ-09, ERQ-03).',
        'Concept graph present and consistent (specs/content/gqur-300/concepts/unit-06.md): 11 concepts for 6 sub-topics (within the v4.0 granularity guidance); prerequisites within-unit only; every SLO ref is one of the unit\'s clo_refs; all derived assessment IDs resolve to real bank items; authored Urdu labels are flagged for G5 as the contract requires.',
        'Reading minutes within the spec bands: topics 15/13/15 against 14-18/12-16/14-18 (content-spec.md:519-521); unit total within the 55-70 depth budget. check:depth-gate and check:concept-graph both exit 0 (the latter inside check:content, log check-content.txt).',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent solving of all 25 bank items, every worked example, every Check-your-understanding item and every rubric before reading the supplied answers (log assessment-independent-working.txt): 24 of 25 bank items agree with the supplied keys and model answers; derivations recorded in full.',
        'FAILING - ERQ-3 marking-guidance arithmetic: docs/semester-1/gqur-300/unit-06/topic-03.mdx:136-138 (mini-rubric: "two teachers cut the ratio for 100 pupils from 50 to about 33 (100/3)") and unit-assessment.mdx:201-204 (ERQ-3 rubric: "e.g. two teachers cut a 100-pupil school\'s ratio from 50 to about 33"). A 100-pupil school at a pupil-teacher ratio of 50 has 100/50 = 2 teachers; hiring two gives 4 teachers and a ratio of 100/4 = 25, not 33 (100/3 would require 3 teachers, i.e. a starting ratio of 100). The guidance marks a correct computation (25) as wrong and lends official support to an incorrect one.',
        'Otherwise verified correct: MCQ keys 1-10 and RRQ model answers 1-10 all match independent derivations (e.g. 7,200-5,600=1,600; 1,500/7,500=20 percent; 15,000x0.04x5=3,000; 24,000 paid, 4,000 = 20 percent; 225/300=75 and 54/60=90); distractors plausible and single-best-answer throughout; ERQ-1/2/4/5 rubric figures correct (36,000 vs 3,000; 104 grams; totals 6/6/6/7/8).',
        'Bloom demand classified from the thinking required: MCQ tags (3 Remember, 3 Understand, 4 Apply), RRQ tags (3 Understand, 4 Apply, 3 Analyze) and ERQ tags (3 Analyze, 2 Evaluate) all match both the actual demand and the spec bands; rubrics distinguish performance (ERQ-3\'s changing-evidence criterion, ERQ-4\'s 0-3 evaluation criterion support higher-order work).',
        'Advisory items recorded under findings: RRQ-9 model answer\'s "one class of 80 and three of 20" illustration averages 35, not the stated ratio 30 (unit-assessment.mdx:186-187); 7 of 10 MCQ correct options are "b" (unit-assessment.mdx:152-161).',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Rendered inspection over a fresh production build (npm run build exit 0 at worktree HEAD 37171b6; served read-only; driven with the repo\'s Playwright 1.61.1 - logs render-inspect.mjs, render-inspect-output.txt, render-figures-output.txt, serve.txt): all six unit pages inspected at 360x800, 1280x800 and A4 print emulation (794x1123, media print).',
        'Narrow view: no page-level horizontal overflow on any page; heading outlines ordered (single H1 then H2/H3); both figures per topic page load (rendered 328x198, loading="lazy") and carry the manifest alt text verbatim; the only unnamed link per page is the breadcrumb home icon with aria-label="Home page"; no empty-alt images. No HTML content tables exist (all tabular material is in the SVG figures), so the narrow-table reachability concern does not arise.',
        'Print (A4 emulation): no overflow on any page; figures render at 762px inside the 794px page, unclipped; the unit-assessment page including the bounded Answers and marking guidance section renders unclipped (full-page print screenshots saved for all six pages).',
        'Dark mode: with data-theme=dark the Figure component serves the committed .dark.svg variants (currentSrc confirmed for fig-U6-1/fig-U6-2), so both palette variants are wired; figures:variants:check exit 0.',
        'Figure text geometry (node scripts/measure-figure-text.mjs over all 12 unit-06 SVGs, exit 0): widest text ends at 768.4-769.2 inside the 780-unit viewBox, wordmark at 675.7 - no clipped or overprinting labels; the unit-01 run001 clipping defect class is absent. Figure instructional content verified from the SVG sources against the prose and the bound PBS excerpt (budget stages, worked rupee examples, 88/82 panels, five questions, decision loop, 57.54/46.29 indicators).',
        '28 PNG renders saved under renders-agent-g3-gqur300-u6-run001/; pixel statistics (channel stdev 26.9-61.1, full tonal range) confirm real drawn content. Inspection limitation recorded as a finding: this session\'s image-display channel returned no readable pixels to the reviewer, so pixel-level viewing rests on the DOM measurements, print overflow checks, pixel statistics, glyph geometry and the SVG source audit.',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'Register check across index.mdx, topic-01..03.mdx, unit-assessment.mdx, unit-teacher-notes.mdx: short sentences, active voice, one idea per paragraph; a fresh HSC/intermediate graduate can follow every explanation without prior specialist knowledge (financial terms are defined at first use in rupee contexts; no graduate-level jargon).',
        'Glossary wiring: the five glossed terms (Profit, Loss, Interest, Simple interest, Budget) all exist in glossary.json with definitions matching the unit\'s usage and are linked via <Glossary> at first use (topic-01.mdx:31, 42, 58-59, 79); index.mdx:61-62 tells the learner glossary terms are underlined.',
        'Consistency and mechanics: no em dash (check:no-em-dash exit 0); numeric ranges use the en dash/hyphen convention; units and number formats consistent (rupees with thousands separators, "percent" spelled out); prerequisite chain explicit (index.mdx:41-44; topic-01 ties back to Units 2-3, topic-02 to Unit 5, topic-03 to Unit 1); every page carries a description and required front matter (validate:content exit 0).',
        'Advisory item recorded under findings: topic-01.mdx:122-124 Summary lists the budget parts in an order that contradicts the unit\'s own rule (variable costs listed before savings).',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'Nine-part learning cycle present and correctly ordered in all three topics (check:depth-gate exit 0): real classroom situation (fair stall biryani ledger; 88-percent-dentists toothpaste advertisement; Naushahro Feroze school choice) -> explanation -> activity -> check your understanding (5 items each) -> summary -> self-assessment checklist (3 items each) -> practicum task -> summative task with mini-rubric -> further reading.',
        'Activities are feasible in the stated Pakistani/Sindhi classroom context with usable instructions, materials and timings: the fair stall audit (mock ledger per group of four, 25 minutes, recommendation step), the advertisement audit (five real-style advertisements displayed by the tutor, pairs, 25 minutes), the school choice panel (two-school dossier plus a group-varying extra fact, four-sentence recommendation, 25 minutes). Practicum tasks use the school canteen ledger, notice-board/newspaper advertisements and one real school decision.',
        'Misconceptions are named and corrected inside ## Explanation of every topic: "profit is whatever money comes in" (topic-01.mdx:90-94), "a budget restricts" (topic-01.mdx:92-94), "numbers in the media must be true" (topic-02.mdx:67-71), "the data decided" (topic-03.mdx:72-77); teacher notes give probing questions for each and carry the guide\'s real-life case-study, brainstorming and question-answer strategies.',
        'Progression and integration: the instalment example bridges 6.1 to 6.2 (topic-01.mdx:72-75, topic-02.mdx:62-65); the Unit 5 census reading returns in 6.2 and 6.3; the course closes with the Unit 1 self-assessment re-read (index.mdx:59-61, ERQ-5), which is metacognitively sound for a terminal unit.',
        'Advisory items recorded under findings: the spec\'s fourth planned misconception ("interest only ever helps the saver", content-spec.md:528-530) is addressed only implicitly (topic-01.mdx:70-72 "Borrowing flips the sign"); ERQ-04 is unmapped in the concept graph.',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'A1 ASSESSMENT / incorrect marking-guidance arithmetic in ERQ-3. docs/semester-1/gqur-300/unit-06/topic-03.mdx:136-138 (mini-rubric) and docs/semester-1/gqur-300/unit-06/unit-assessment.mdx:201-204 (ERQ-3 rubric) both state "two teachers cut the ratio for 100 pupils from 50 to about 33 (100/3)". A 100-pupil school at PTR 50 has 100/50 = 2 teachers; hiring two more gives 4 teachers and a ratio of 100/4 = 25. 100/3 = 33.3 would require 3 teachers after hiring (one new teacher) or a starting ratio of 100. A trainee who correctly computes 25 contradicts the marking guidance; a marker following it accepts or produces a wrong computation. Repair: change both places to "from 50 to 25 (100/4)" (or re-derive with a different pupil count, e.g. 200 pupils: 200/50 = 4 teachers, +2 = 6, 200/6 = about 33).',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'S1 SOURCES / citation-traceability claim false for tout2020. specs/content/gqur-300/sources/unit-06.md:3-5 asserts "every key here is cited both in prose and in a per-topic ## Further reading section", but tout2020 appears only in docs/semester-1/gqur-300/unit-06/topic-02.mdx:135-137 (Further reading) and is named nowhere in unit prose. Its Supports cell (U6-04: "what counts as literate or numerate depends on the tasks asked; cross-comparing numbers without reading their construction misleads") is taught nowhere in topic-02. The source itself is real and correctly cited (ERIC EJ1266633 verified live this review); the defect is that a bound source is declared to ground U6-04 while the unit never uses it. Repair: either add a prose use in topic-02 (e.g. one sentence in the Explanation on assessment frameworks shaping headline numbers, cited "(Tout, 2020)") or remove tout2020 from the sources table and the U6-04 coverage row and correct the header claim. Same class as the unit-04 run001 blocking finding.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'S2 SOURCES / coverage grounding overstated for four rows. specs/content/gqur-300/coverage/unit-06.md rows U6-01/steen2001 (line 10) and U6-02/steen2001 (line 11): the named sections "Financial literacy: profit and loss" (topic-01.mdx:40-53) and "Financial literacy: interest" (topic-01.mdx:54-75) carry no Steen attribution; the only steen2001 prose citation is topic-02.mdx:34-35, a different topic file, and the "citizenship case" is not what those arithmetic sections teach. Row U6-03/pbs (line 12): the "Financial literacy: budgeting" section (topic-01.mdx:77-94) uses a stipend example with no PBS material or attribution, although sources/unit-06.md:10 claims pbs is "behind the budget ... contexts". Row U6-05/mcclure2020 (line 15): the "Decision-making using quantitative data" section (topic-03.mdx:41-56) carries no McClure attribution; the citation sits in U6-06\'s section (topic-03.mdx:68-70). Repair (unit-01 S1 / unit-03 F1 precedent): attribute the source in the named section, or correct the coverage row and Supports cell to the section that actually uses the source.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'S3 SOURCES / pbs Kind mislabel. specs/content/gqur-300/sources/unit-06.md:10 marks pbs "guide-required", but the course guide\'s recommended books (1st 2026.txt:651-656) name only Steen, Grawe, the National Curriculum for Mathematics and the HEC NPST, and the spec\'s Guide-required block (content-spec.md:83-90) lists steen2001, grawe, ncm, npst2009; pbs sits in Curated-supplementary (content-spec.md:102). The sources-consulted contract defines guide-required as named in one of those two places. The three-value Kind vocabulary has no value for a curated supplementary primary-data source (unit-05\'s table repeats the same mislabel). Repair: relabel (e.g. open-access-substitute with a note, or extend the vocabulary) so the governance table does not overstate the source\'s authority status.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'S4 SOURCES / mcclure2020 prose overstatement. docs/semester-1/gqur-300/unit-06/topic-03.mdx:68-70: "McClure (2020) built a quantitative-literacy unit for high-school STEM teachers around exactly this skill: reading an indicator\'s construction before using it to argue." The ERIC record (EJ1480153, fetched live this review) supports a QL continuing-education unit for high-school STEM teachers, but its abstract names no indicator-construction skill; the excerpt is honestly record-level and the full text was not read. "Around exactly this skill" states more than the checked record supports (unit-03 F7 class). Repair: soften to what the record shows (a QL unit building teachers\' capacity to read and use quantitative information) or read the free full text and bind an excerpt.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'A2 ASSESSMENT / RRQ-9 model illustration does not reconcile. docs/semester-1/gqur-300/unit-06/unit-assessment.mdx:186-187: "a ratio of 30 can hide one class of 80 and three of 20 - the same average, opposite realities." One class of 80 and three of 20 is 140 pupils across 4 classes, averaging 35 per class, not 30; as a PTR, 140 pupils at ratio 30 implies 4.67 teachers. A trainee who checks the mean gets 35 and is left confused. Repair: use "one class of 80 and five of 20" (180 pupils, 6 classes, mean exactly 30) or drop the specific ratio. Note: fig-U6-6\'s wording ("a good average can hide a class of 80 and three of 20") asserts no ratio and is safe as written.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'A3 ASSESSMENT / MCQ key concentration. 7 of 10 MCQ correct options are "b" (unit-assessment.mdx:152-161; "c" at 3 and 7, "a" at 5, none "d"). All keys verified correct by independent solving, but a test-wise learner marking only "b" scores 7/10. Same class as unit-01 P1 (9/10) and unit-03 F4 (8/10), both advisory. Repair: redistribute correct options across a-d in a future revision.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'R1 READABILITY / budget-part order contradicts the unit\'s own rule in the topic-01 Summary. docs/semester-1/gqur-300/unit-06/topic-01.mdx:122-124: "A budget plans income, fixed costs, variable costs and savings (in that order, savings before spending)" - the list order puts variable costs before savings, contradicting the parenthetical, the bolded rule (topic-01.mdx:81-82), the worked example (fixed 12,000, savings 3,000, variable 10,000), MCQ-04, RRQ-3, fig-U6-1 (Income -> Fixed -> Savings -> Variable -> Review, verified by x-coordinates) and fig-U6-2\'s budget row. One-phrase repair: "income, fixed costs, savings and variable costs (in that order, savings before spending)".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'F1 FIGURES / manifest prompt order disagrees with the rendered figure. specs/content/gqur-300/figures/unit-06.md row fig-U6-1 lists the flowchart boxes as "income, fixed costs, variable costs, savings, and review", but the committed SVG renders Income -> Fixed -> Savings -> Variable -> Review (x = 30/185/340/495/650). The render is the pedagogically correct order (savings before variable spending); the prompt is the ADR-0024 handoff contract and both agents must preserve it unless a content correction is recorded. Repair: correct the manifest prompt to the rendered order (and note the correction), so a future regeneration does not silently reintroduce the wrong order.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'AU1 AUTHORITY / declared key terms partly untaught and unglossed. specs/content/gqur-300/content-spec.md:493 declares Unit 6 key terms "Profit, Loss, Interest, Budget, Markup, Discount, Claim, Evidence". Markup and Discount appear nowhere in the unit and are absent from glossary.json (183 entries); Evidence is used throughout topic-03 but is unglossed and absent from glossary.json; Claim is in glossary.json but never linked via <Glossary> in unit prose. The guide\'s own unit line does not require markup/discount, so this is a spec-vs-content gap, not a guide-coverage gap (unit-04 advisory class). Repair: teach markup/discount briefly (a discount is a percentage decrease on price; markup the reverse) and gloss them, or correct the spec\'s key-terms list; add Evidence to the glossary and link Claim.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'P1 PEDAGOGY / one planned misconception handled only implicitly. specs/content/gqur-300/content-spec.md:528-530 plans the misconception "interest only ever helps the saver" for Unit 6; topic-01 addresses it only implicitly ("Borrowing flips the sign ... the saver\'s reward or the borrower\'s cost", topic-01.mdx:70-72) while the other three planned misconceptions each get an explicit "A common misconception to correct" callout. Repair: name it in topic-01\'s misconception block (one sentence: interest is also the borrower\'s cost, which is why the instalment example matters).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'C1 CONCEPT GRAPH / ERQ-04 unmapped. specs/content/gqur-300/concepts/unit-06.md maps 24 of the 25 bank items; ERQ-04 (canteen ledger, profit with percentage plus evaluation of what the percentage adds) is mapped to no concept, though CON:GQUR-300-6-2 (profit and loss percent against costs) plausibly covers it. The contract requires only that mapped IDs exist (unit-04 advisory class). Repair: add ERQ-04 to CON:GQUR-300-6-2\'s assessment item IDs in a future revision.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'PR1 PROCESS / pbs excerpt outside the bound manifest. The manifest\'s cited-keys derivation (scripts/lib/review-evidence.mjs citedKeysFor) binds sources/texts/<key>.md only for keys matching a 4-digit-year pattern; the digit-free key "pbs" therefore binds no excerpt, so specs/content/gqur-300/sources/texts/pbs.md - the evidence for the unit\'s verified Sindh census figures - is not in the 97-input bound set (only mcclure2020.md and tout2020.md are bound). The excerpt was read and verified this review regardless (it is committed at HEAD), but a future reviewer could judge the census claims without the bundle binding their evidence. Same class as unit-03 run001 F9. Repair: extend the cited-keys derivation (or the key naming convention) so digit-free keys bind their excerpts.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'PR2 PROCESS / inspection limitation. This session\'s image-display channel returned no readable visual content to the reviewer for the saved PNG renders (two full-page thumbnails arrived at unreadable ~1:10 scale; element and slice reads returned nothing), and the MCP browser channels have no system Chrome at /opt/google/chrome/chrome (inspection therefore ran through a direct Playwright script over the cached Chromium). Pixel-level accessibility verification rests on DOM measurements (overflow, alt text, image loading, heading outlines, currentSrc), print-emulation overflow checks, pixel statistics over all 28 renders, offline SVG glyph geometry (measure-figure-text, exit 0) and the SVG source label audit; the renders are committed for re-verification by a session with a working display channel.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - INPUT BINDING VERIFIED. The prepared manifest (specs/content/gqur-300/reviews/unit-06/G3/manifest.json) was recomputed with inputManifest() from scripts/lib/review-evidence.mjs at worktree HEAD 37171b6: 97 inputs prepared, 97 recomputed, 0 digest mismatches, 0 files in only one set; skill_digest matches; dirtyInputs() empty (only untracked reviews/ evidence paths, excluded by design). No silent refresh was performed. Log: input-binding-verification.txt.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - INDEPENDENCE. This session did not author, translate or repair any reviewed byte. The unit and its governance tables were authored in commit 56f5b54 and are unchanged since; this reviewer session started fresh from the parent\'s handoff (author_run_id commit:56f5b54, reviewer_run_id agent-g3-gqur300-u6-run001, model LongCat-2.0). All 25 assessment items were solved with independent derivations before the supplied answers were read (log assessment-independent-working.txt). Unit text, source documents and figure labels were treated as data; no instruction embedded in reviewed material was executed.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - LIVE SOURCE VERIFICATION. All four cited keys resolved to real records matching their citations: ERIC EJ1480153 (McClure 2020, Numeracy 13(2)) and EJ1266633 (Tout 2020, IRE 66, 183-209) fetched live and compared field by field; archive.org locator for steen2001 fetched live (work, editor, year and controlled-lending status exactly as declared under D-2026-0001); pbs.gov.pk fetched live (7th census 2023, 241.49 million, matching the excerpt\'s provenance). The unit\'s Sindh figures (57.54, 46.29, 14-point gap) all match the bound excerpt. Log: source-verification.txt.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.txt` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.txt` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.txt` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.txt` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.txt` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.txt` },
    { name: 'render-review', exit_code: 0, log_path: `${L}/render-review.txt` },
    { name: 'check:content', exit_code: 0, log_path: `${L}/check-content.txt` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${L}/figures-variants-check.txt` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${L}/measure-figure-text.txt` },
    { name: 'build', exit_code: 0, log_path: `${L}/build.txt` },
    { name: 'input-binding-verification', exit_code: 0, log_path: `${L}/input-binding-verification.txt` },
    { name: 'assessment-independent-working', exit_code: 0, log_path: `${L}/assessment-independent-working.txt` },
    { name: 'source-verification', exit_code: 0, log_path: `${L}/source-verification.txt` },
  ],
  evidence_manifest: evidence,
};

writeFileSync('specs/content/gqur-300/reviews/unit-06/G3/agent-g3-gqur300-u6-run001.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written; evidence files:', Object.keys(evidence).length);
