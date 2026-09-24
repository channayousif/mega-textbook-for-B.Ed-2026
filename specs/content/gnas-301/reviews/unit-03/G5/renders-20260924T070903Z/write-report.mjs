// Builds the G5 run001 report JSON for GNAS-301 Unit 3 from the verified manifest
// and the hashed evidence set. Advisory report only; no signature, no acceptance.
import { readFileSync, writeFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('specs/content/gnas-301/reviews/unit-03/G5/manifest.json', 'utf8'));
const evidence = JSON.parse(readFileSync('/tmp/g5-u3-evidence.json', 'utf8'));
const L = 'specs/content/gnas-301/reviews/unit-03/G5/logs-20260924T070903Z';

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 3,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:019-author-gnas-301',
  reviewer_run_id: 'agent:g5-reviewer:gnas301-u3-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T07:05:00Z',
  completed_at: '2026-09-24T07:45:00Z',
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/gnas-301/reviews/unit-03/G3/round-02/agent-g3-gnas301-u3-run002.json',
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'i18n/ur/.../unit-03/index.mdx:22-31 - all six unit learning outcomes present, matching docs/semester-1/gnas-301/unit-03/index.mdx:29-34 one-for-one',
        'clo_refs SLO:GNAS-301-3-1 / SLO:GNAS-301-3-2 preserved verbatim in the frontmatter of all 7 Urdu files',
        'i18n/ur/.../unit-03/unit-teacher-notes.mdx:20-22 - course-guide teaching-strategy list rendered with the banked term حکمتِ تدریس (terminology.csv:24) and گروہی کام (terminology.csv:70)',
        'HSE field framing and hazard/risk distinction preserved: i18n/ur/.../unit-03/topic-03.mdx:26,30-32; topic-04.mdx:32',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'UR topic-01.mdx:40 (WHO 2024: 42 لاکھ = 4.2M premature deaths, 99 فیصد) verified against specs/content/gnas-301/sources/texts/who-air-2024.md:12-14',
        'UR topic-01.mdx:40 (WHO 2021 guidelines) against sources/texts/who-aqg-2021.md; UR topic-01.mdx:42 (Anwar et al. 2026; 2019 تا 2021; outdoor workers labourers/vendors/traffic police; smog critical for environment and public health) against sources/texts/anwar2026.md:3,14-26',
        'UR topic-02.mdx:36 (430 ملین including 34 ملین children, loud noise among causes, WHO 2026) against sources/texts/who-hearing-2026.md:11-21',
        'UR topic-03.mdx:46 and topic-04.mdx:36 (Abbasi et al. 2022: excavation, unsafe practices, missing/unused protection, faulty unmaintained machinery) against sources/texts/abbasi2022.md:19-27',
        'Further-reading lists present and equivalent in all four topics; WHO n.d. rendered بلا تاریخ (topic-03.mdx:32)',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All coverage rows of specs/content/gnas-301/coverage/unit-03.md (U3-01..U3-06) map to translated sections present in the Urdu mirror: topic-01.mdx:30, topic-02.mdx:30, topic-03.mdx:30 and :48, topic-04.mdx:30',
        'Every unit outcome is taught (four topic files) and assessed (unit-assessment.mdx 10/10/5 bank fully present, unit summary at :22)',
        'Structural parity verified: heading counts 5/11/11/12/11/10/6, list items 10/12/10/16/11/50/4, tables and checkboxes 6 and 4 per topic file - identical to the English',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'unit-assessment.mdx:28-87 - all 10 MCQs present with option order identical to the English (a-d); answer key :122-132 corresponds item-by-item (1-b, 2-c, 3-c, 4-a, 5-c, 6-d, 7-b, 8-a, 9-c, 10-c) with translated rationales',
        '10 RRQs (:91-104) and 5 ERQs (:108-116) preserve task meaning, constraints (word counts 160-200/150-180/170-200, at-least counts) and cognitive labels (یاد رکھیں/سمجھیں/لاگو کریں/تجزیہ کریں/تشخیص کریں mapping Remember/Understand/Apply/Analyze/Evaluate)',
        'Mark schemes preserved: نمبر (2)/(3)/(4)/(5) allocations identical; ERQ rubric bands 0-3/0-2 etc. with totals 10 each (:151-162)',
        'Topic check-your-understanding items 1-4 equivalent in all four topic files (topic-01.mdx:54-57, topic-02.mdx:52-55, topic-03.mdx:62-65, topic-04.mdx:56-59)',
        'No translation reveals an answer or lowers cognitive demand; distractor drift on MCQ-6/MCQ-10 recorded as advisory findings (keys unaffected)',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'renders-20260924T070903Z/render-inspect.json - 0 console errors, 0 broken images, 0 images without alt across all 7 Urdu pages at desktop 1280x900',
        'All 8 figure carriers load Urdu .ur.svg variants with Urdu alt text (altStartsWithUrdu true, altLen 70-123) and non-trivial rendered pixels (pixelStddev 18.4-23.5)',
        'Screenshots: desktop-*.png (7 + 2 fullpage), narrow360-*.png (7), printview-*.png (7), print-a4-*.pdf (7), dark-topic-01.png',
      ],
    },
    {
      id: 'completeness',
      status: 'pass',
      evidence: [
        'Full passage-level comparison of all 7 English/Urdu file pairs: every section present - real classroom situations, explanations, worked examples, misconceptions, activities, check-your-understanding, summaries, self-assessment checklists, practicum tasks, summative tasks with mini-rubrics, further reading, answers and marking guidance',
        'No heading-only stubs; no omitted normative clauses found beyond the advisory items (definition qualifier, distractors) recorded under semantics',
        'Glossary carriers 1/1/3/3/1/0/0 and Figure carriers 2 per topic match the English exactly',
        'One benign addition: topic-04.mdx:32 glosses خطرہ as (ہیزرڈ) once for disambiguation against رسک',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'BLOCKING: i18n/ur/.../unit-03/topic-02.mdx:63 reverses the comparison of docs/semester-1/gnas-301/unit-03/topic-02.mdx:103 (see findings)',
        'UR topic-01.mdx:32 drops "at levels" from the air-pollution definition (EN topic-01.mdx:37-38)',
        'UR unit-assessment.mdx:62 renders "pesticide spray drift" as ڈھلوان (slope); :87 renders "unmeasurable" as ناپیدا (not found)',
        'EN topic-04.mdx:51 vs :69 internal inconsistency (lower vs medium likelihood for the tank) is mirrored, not introduced, by UR topic-04.mdx:40 vs :46',
        'All other quantities, percentages, dates, dB values, word counts and causal claims verified equal passage-by-passage (42 لاکھ, 99 فیصد, 430/34 ملین, 30/60/85-95/110 dB, 72/88/16 dB, چالیس گنا, 20 فیصد/دوگنا/سو گنا, 2019-2021, 2022, 45 ڈگری)',
      ],
    },
    {
      id: 'terminology',
      status: 'pass',
      evidence: [
        'Banked terms respected: مجموعی جائزہ / مجموعی کام (Summative Assessment, terminology.csv:21), معیارِ جانچ including مختصر/تجزیاتی variants (Rubric, :72), حکمتِ تدریس (Teaching Strategy, :24), گروہی کام (Group Work, :70)',
        'خود جانچ کی فہرست matches the established GNAS-301 units 1-2 rendering of Self-assessment checklist',
        'Drift among unbanked domain terms recorded as advisory findings (inversion الٹ دباؤ/انورجن; particulate matter ذراتی مادہ/معلق ذرات; exposure رابطہ/واقفیت); no bank entry violated',
      ],
    },
    {
      id: 'register',
      status: 'pass',
      evidence: [
        'Academic-plain register broadly achieved across all 7 files: natural sentence order, gender-inclusive سکتا/سکتی self-checks, consistent transliteration policy for technical terms (پی پی ای, اے کیو آئی, ڈیسیبل, ایچ ایس ای)',
        'Enumerable register/grammar slips listed in an advisory finding with exact locators and repairs; none breaks comprehension',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'renders-20260924T070903Z/render-inspect.json - dir=rtl and lang=ur on all 7 pages; Noto Nastaliq Urdu applied (nastaliq=true on body and article prose)',
        'Bidi handling correct: Western digits throughout (no mixed Eastern digits), Latin embeds (dB, PM2.5, MCQs, option letters a-d, citation names) correctly embedded in RTL flow - visible in desktop-unit-assessment-fullpage.png and printview-unit-assessment.png',
        'Narrow 360px: no document overflow on any page; the one HTML table per topic fits (scrollWidth 328 = clientWidth 328, direction rtl); figures fit (right <= 344)',
        'A4 print: 0 clipped elements, navbar/sidebar hidden, visible figure variants fit (right 778 <= 794); printview-*.png and print-a4-*.pdf for all 7 pages',
        'Dark theme: .ur.dark.svg variants display under data-theme=dark while light variants hide (dark-check output, dark-topic-01.png)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Reversed comparison in the Topic 3.2 self-assessment checklist. EN docs/semester-1/gnas-301/unit-03/topic-02.mdx:103 reads "I can explain why 90 dB is far more than \'a bit louder\' than 70 dB." UR i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-02.mdx:63 reads "میں وضاحت کر سکتا/سکتی ہوں کہ 90 dB سے 70 dB کتنا زیادہ ہے۔" In Urdu comparative grammar "X سے Y ... زیادہ" asserts that Y exceeds X, so the line as written asks how much more 70 dB is than 90 dB - the inverse of the English. The "far more than \'a bit louder\'" force is also lost. Repair request: restore both direction and force, e.g. "میں وضاحت کر سکتا/سکتی ہوں کہ 90 dB، 70 dB سے \'تھوڑا زیادہ\' سے کہیں زیادہ بلند ہے" or an equivalent natural phrasing.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Terminology drift for "temperature inversion" inside the unit: UR topic-01.mdx:42 ("درجہ حرارت کا الٹ دباؤ") and :67 ("الٹ دباؤ") versus UR unit-assessment.mdx:22 ("انورجن میں پھنسا"), :91 ("درجہ حرارت کا انورجن") and :136 (model answer "انورجن"). Unit 6 has standardised on انورجن (e.g. i18n/ur/.../unit-06/topic-05.mdx:30). A student taught الٹ دباؤ in Topic 3.1 meets انورجن unexplained in the unit summary, RRQ-1 and its model answer. Repair request: unify on one rendering (the course-wide convention is انورجن; if adopted, add a first-use gloss in topic-01).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        '"Particulate matter" rendered two ways: ذراتی مادہ at UR topic-01.mdx:36 versus معلق ذرات at UR unit-assessment.mdx:22 (and ہوا میں معلق ذرات for "airborne particulates" at topic-03.mdx:32). Repair request: unify the pollutant-name rendering across the unit.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        '"Exposure" (health sense) rendered inconsistently: رابطہ at UR topic-02.mdx:32 ("مسلسل رابطہ") and :36 ("بلند شور کے رابطے") versus واقفیت at topic-03.mdx:42 and :50 and unit-assessment.mdx:130 ("ہٹانا سب کے لیے واقفیت ختم کرتا ہے") and :160. Neither is a standard medical-Urdu rendering on its own; pick one consistent treatment and apply it across the unit.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'MCQ-6 distractor "pesticide spray drift" (EN unit-assessment.mdx:75) is rendered "کیڑے مار سپرے کی ڈھلوان" at UR unit-assessment.mdx:62; ڈھلوان means slope/incline, not the airborne movement of spray. The answer key (d) is unaffected, but the distractor\'s meaning is lost. Suggested repair: "کیڑے مار سپرے کا ہوا میں اڑ کر پھیلنا".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'MCQ-10 distractor "unmeasurable" (EN unit-assessment.mdx:100) is rendered "ناپیدا" (not found / invisible) at UR unit-assessment.mdx:87; the intended meaning is "cannot be measured" (ناپذیرِ پیمائش). Key unaffected; repair the distractor wording.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'EN/UR reference divergence for Anwar et al. 2026: EN topic-01.mdx:146-148 lists four authors (Anwar, Younes, Afzal, Arshad) while UR topic-01.mdx:93 lists all ten. The bound source specs/content/gnas-301/sources/texts/anwar2026.md:3 with its Crossref-verification note (:7-9) confirms the ten-author list, so the Urdu matches the source and the English reference is the deficient one. Owner action: complete the English author list or add an "et al." marker; no Urdu change needed.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'English internal inconsistency mirrored into the Urdu: EN topic-04.mdx:51 says "the open tank scores lower likelihood" while EN :69 says "The tank: medium likelihood, highest severity"; the Urdu mirrors both (topic-04.mdx:40 "کم امکان" vs :46 "درمیانہ امکان"). Carried from the accepted English; flag for reconciliation at the next English revision rather than a unilateral Urdu change.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'The air-pollution definition drops the concentration qualifier: EN topic-01.mdx:37-38 "presence of substances in the air at levels that harm people, other living things or materials" vs UR topic-01.mdx:32 "ہوا میں ایسے مادوں کی موجودگی ہے جو انسانوں، دوسرے جانداروں یا چیزیں کو نقصان پہنچائیں", which reads as if any presence of a harmful substance is pollution. Repair request: restore the levels qualifier, e.g. "ایسی مقدار میں موجود ہوں کہ ...".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Register and grammar repair list (each verified against the English): (1) UR topic-02.mdx:24 "چیخنا چھوپ چکی ہیں" and "محسوس کرنا چھوپ چکے ہیں" should be چھوڑ (چھوپ means to hide; the same verb is spelled correctly at :26); (2) UR topic-01.mdx:40 "اموات کیں" should be "اموات کا سبب بنیں"; (3) UR topic-01.mdx:46 "صاف ہوا کا مطلب ہے جو ہوا نہ دکھے" is ungrammatical - compare the correct rendering at unit-teacher-notes.mdx:26 "جو نظر نہ آئے"; (4) UR index.mdx:20 "یونٹ 2 پانی اور کچرے کا پیچھا کرتا تھا" is a literal calque of "Unit 2 followed water and waste"; (5) UR index.mdx:46 "خطرے کی گنتی" for "risk scoring" (prefer خطرے کی اسکورنگ / نمرہ دہی, consistent with topic-04\'s نمبر دیں); (6) UR topic-04.mdx:40,46 and unit-assessment.mdx:146 "ابھی کام کریں" for "act now" (prefer فوری اقدام); (7) UR topic-04.mdx:46 and unit-assessment.mdx:116 "بجھی سیڑھی" for "unlit stair" (prefer جس سیڑھی پر روشنی نہ ہو); (8) UR topic-04.mdx:52 "تردید" for "cross-examination" (prefer سوالے جوابی); (9) UR topic-04.mdx:80 and unit-assessment.mdx:158 "نگرانی کی پلان" should be "نگرانی کا پلان"; (10) UR unit-teacher-notes.mdx:43 "آواز کی سروے" should be "آواز کا سروے"; (11) UR unit-assessment.mdx:146 "کونہ" should be کونا; (12) UR topic-02.mdx:44 "قلبی اثرات دستاویزی ہیں" for "cardiovascular effects are documented" (prefer ثابت شدہ); (13) number-style inconsistency: 42 لاکھ (topic-01.mdx:40,61; unit-assessment.mdx:22) versus 430 ملین / 34 ملین (topic-02.mdx:36) - values all correct, conventions mixed.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'G3 dependency technicalities for the owner: the cited G3 round-2 report (disposition pass) bound English unit inputs identical to this manifest - verified digest-by-digest for all 7 unit files plus course-overview, coverage, sources, figures and concepts. However (a) one G3-bound file, specs/content/gnas-301/sources/texts/anwar2026.md, had its Crossref-provenance note reworded after that report (commit ce23481, 2026-09-23 23:09), so the G3 report\'s full input manifest no longer machine-validates at HEAD (validate returns "stale or incomplete input manifest"); the substantive excerpt is unchanged and this review verified the Urdu Anwar claims against the current bound source directly; (b) the G3 report is unsigned, as is every report in the current activation-pending state (no protected signing host provisioned), so acceptance of this G5 remains subject to the trusted activation path per specs/014-agent-review-governance/contracts/review-evidence.md.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Platform observation carried forward from the Unit 1 G5 review: Urdu labels inside .ur.svg figures render in a system Naskh-style font rather than the page\'s self-hosted Noto Nastaliq Urdu webfont, because SVG text cannot load the page webfont. Labels are legible (verified in renders-20260924T070903Z/desktop-topic-01-fullpage.png and desktop-topic-04.png) but typographically inconsistent with the surrounding Nastaliq prose. Owner/platform-level item; not a unit-content defect.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.log` },
    { name: 'build', exit_code: 1, log_path: `${L}/build.log` },
    { name: 'build-retry', exit_code: 0, log_path: `${L}/build-retry.log` },
    {
      name: 'render-review',
      exit_code: 0,
      log_path: `${L}/render-review.log`,
    },
  ],
  evidence_manifest: evidence,
};

writeFileSync(
  'specs/content/gnas-301/reviews/unit-03/G5/agent-g5-gnas301-u3-run001.json',
  JSON.stringify(report, null, 2) + '\n',
);
console.log('report written; criteria:', report.criteria.map((c) => c.id + ':' + c.status).join(' '));
console.log('findings: blocking=' + report.findings.filter((f) => f.severity === 'blocking').length + ' advisory=' + report.findings.filter((f) => f.severity === 'advisory').length + ' uncertain=' + report.findings.filter((f) => f.severity === 'uncertain').length);
