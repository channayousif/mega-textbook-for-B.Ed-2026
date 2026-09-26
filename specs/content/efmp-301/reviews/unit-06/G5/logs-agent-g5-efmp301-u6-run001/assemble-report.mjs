// Assemble the G5 run001 report for EFMP-301 Unit 6 from the verified manifest,
// the review findings and the on-disk evidence (hashed at assembly time).
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('specs/content/efmp-301/reviews/unit-06/G5/manifest.json', 'utf8'));
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-06';
const EN = 'docs/semester-1/efmp-301/unit-06';
const FIG = 'static/img/figures/efmp-301/unit-06';
const LOGS = 'specs/content/efmp-301/reviews/unit-06/G5/logs-agent-g5-efmp301-u6-run001';
const RENDERS = 'specs/content/efmp-301/reviews/unit-06/G5/renders-agent-g5-efmp301-u6-run001';

const evidence = {};
for (const dir of [LOGS, RENDERS]) {
  for (const f of readdirSync(dir).sort()) {
    evidence[`${dir}/${f}`] = createHash('sha256').update(readFileSync(`${dir}/${f}`)).digest('hex');
  }
}

const criteria = [
  {
    id: 'authority',
    status: 'unverified',
    evidence: [
      'Direct check performed and holds: the course guide (Scheme-and-Course-guides/extracted-text/1st 2026.txt, EFMP-301 Chapter 6 / Week 11) names Maslow, Herzberg, Self-Determination Theory, achievement motivation and the role of emotions in learning; all five are taught in Urdu at the mirrored headings (UR topic-01.mdx:46,54,64; topic-02.mdx:36,44,54) and the SLO clo_refs are unchanged in every UR file.',
      'Dependency NOT satisfied: the only G3 evidence is the advisory run001 report (disposition revise, one OPEN blocking finding) prepared against the PRE-repair English (manifest at cff48358, 2026-09-24 19:11); the English was repaired afterwards at commit 067c2ff2 (2026-09-25 08:48) and no round-2 G3 verified the repair. No accepted, signed G3 report exists for the current English inputs. Recorded as an uncertain finding for owner escalation (GQUR-300 PR #65 precedent), per the parent instruction; the full Urdu-vs-current-English comparison was nevertheless performed against the bound bytes.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'Both bound source excerpts support the translated claims: spielman2020.md:86-97 (definition, intrinsic/extrinsic, overjustification, Maslow "achieving one\'s full potential") and seifert2009.md:174-185 (SDT, mastery/failure-avoidant goals, locus/stability/controllability, situational vs personal interest).',
      'Citations retained inline in Urdu at UR topic-01.mdx:38,40,42,48 and topic-02.mdx:38,46,60; the Herzberg no-external-source disclosure is mirrored (UR topic-01.mdx:56 vs EN :96-98).',
      'The G3-round-1 repairs are correctly mirrored in Urdu: "achieving" -> "اپنی پوری صلاحیت حاصل کرنا" (UR topic-01.mdx:48, changed from "تک پہنچنا" in 067c2ff2), the two-Sindh-schools replacement (UR topic-01.mdx:60), and the teacher-notes practical-work rewording (UR unit-teacher-notes.mdx:59); verified against the 067c2ff2 diff.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'All 6 sub-topics of coverage/unit-06.md are taught in Urdu at the mirrored headings: U6-1 UR topic-01.mdx:36, U6-2 :46, U6-3 :54, U6-4 :64, U6-5 UR topic-02.mdx:36, U6-6 :54; reinforcement rows present (U6-1 at topic-02.mdx:36, U6-6 at :44, U6-4 at unit-assessment.mdx:24, U6-3 at unit-teacher-notes.mdx:36-41).',
      'All five files (index, topic-01, topic-02, unit-assessment, unit-teacher-notes) are complete translations with matching section structure; no heading-only stubs found in the EN/UR alignment.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'All 10 Urdu MCQs independently answered before reading the English key: derived key 1-b, 2-b, 3-b, 4-b, 5-b, 6-b, 7-a, 8-b, 9-b, 10-b matches the Urdu key (unit-assessment.mdx:121-130) and the English key exactly; option order preserved item-for-item; no translation leak found (distractors remain plausible in Urdu).',
      'RRQ meanings, model answers and mark allocations match (UR unit-assessment.mdx:136-145 vs EN :174-195); ERQ stems and all five rubric tables match row-for-row with identical marks (6/7/3/4, 6/6/4/4, 5/7/4/4, 6/6/4/4, 6/7/3/4) and identical Analyze/Create tags.',
      'Cognitive-demand tags preserved (یاد رکھنا/سمجھنا/لاگو کرنا/تجزیہ/تخلیق map to Remember/Understand/Apply/Analyze/Create) on every item.',
      'Caveat recorded under terminology: the Urdu item text uses حوصلہ/اندرونی/بیرونی حوصلہ where the bank and the English key intend محرک/باطنی/خارجی محرک; the answers still correspond one-to-one.',
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      'Production build exit 0; all five Urdu pages served (HTTP 200) and rendered at desktop 1280x900, narrow 360x780 and A4 print 794x1123: zero horizontal overflow at both widths, zero console errors, dir=rtl on every page (render-review.log).',
      'All four Urdu figures load with Urdu alt text (fig-U6-1/2/3/4 .ur.svg, naturalWidth>0); dark variants wired and displayed under [data-theme=dark] (check-dark-font.log); print emulation hides nav/sidebar, forces light figures with break-inside avoid (check-print.log).',
      'Noto Nastaliq Urdu webfont loads and applies to body, paragraphs, list items and table cells (check-fonts-detail.log). Site-wide pre-existing condition recorded as an advisory finding: h1/h2 resolve to the Latin system-ui stack (also on Units 3/5), so headings use a system Arabic-script fallback.',
    ],
  },
  {
    id: 'completeness',
    status: 'pass',
    evidence: [
      'Passage-by-passage alignment of all five file pairs found no omitted or added sections; activities, check-your-understanding, summaries, self-assessment checklists, practicum tasks, summative tasks, mini-rubrics, further reading and the full 10/10/5 bank with answers are all present in Urdu.',
      'No untranslated English prose found in the Urdu MDX files (Latin-script sweep excluding citations, component imports, SDT/ERQ/MCQ/RRQ abbreviations and figure paths returned nothing).',
      'Untranslated English DOES remain inside fig-U6-4.ur.svg (a figure label) - recorded under the rtl criterion, not completeness of the MDX mirrors.',
    ],
  },
  {
    id: 'semantics',
    status: 'fail',
    evidence: [
      'BLOCKING: UR topic-02.mdx:50 mistranslates the feedback example "your method missed the carrying - here is the fix" as "تمہارے طریقے نے قرض لینا چھوڑ دیا: یہ درست ہے" ("your method stopped taking a loan: this is correct"). "Carrying" (arithmetic carry) became "taking a loan" (قرض لینا), and "here is the fix" became "this is correct"; the example is meaningless in Urdu.',
      'Advisory drifts: "starved" rendered as "چھینا" (snatched) in UR topic-01.mdx:120 and unit-assessment.mdx:107 while the body and ERQ-1 rubric row correctly use "بھوکا رکھا"/"بھوک"; the unit summary drops "triage" (UR unit-assessment.mdx:24 vs EN :27); RRQ-10 model answer drops the "keep" element (unit-assessment.mdx:145); "high-stakes test" becomes "زیادہ نمبر والا امتحان" (high-marks exam) in fig-U6-4.ur.svg.',
      'Verified preserved: negation, modal force, quantities (two weeks, six weeks, 250-300 words, 10/10/5 items, marks), dates (October/December/January/Week 11), comparisons, causal claims and the approach/protect loop logic all match the English across both topics and the assessment.',
    ],
  },
  {
    id: 'terminology',
    status: 'fail',
    evidence: [
      'BLOCKING: core-term departures from the frozen bank. terminology.csv:8-10 banks Motivation=محرک, Intrinsic=باطنی محرک, Extrinsic=خارجی محرک; the Urdu prose uses حوصلہ/اندرونی حوصلہ/بیرونی حوصلہ throughout (index.mdx:2,31; topic-01.mdx:36-42,96; topic-02.mdx:2,36; unit-assessment.mdx:2,24,32). The unit\'s own teacher notes list the banked terms (UR unit-teacher-notes.mdx:55, mirroring EN :76-77) and the prose contradicts that line; the concept graph (concepts/unit-06.md:15) and fig-U6-2.ur.svg (title "تین محرک نظریوں کا موازنہ") use محرک. The prose itself even uses "اندرونی محرک" once for "intrinsic motive" (topic-01.mdx:42, teacher-notes.mdx:32), so the unit is internally inconsistent.',
      'BLOCKING: Anxiety banked as اضطراب (terminology.csv:56; used in fig-U6-4.ur.svg and concepts/unit-06.md:22) but the prose uses گھبراہٹ throughout topic-02 (lines 3,54,58,80,89,100) and the assessment (lines 80,102,144). Working Memory banked as the pair عامل یادداشت / فعال یادداشت (terminology.csv:98) but Unit 6 uses کام کرنے والی یادداشت (topic-02.mdx:58, unit-assessment.mdx:144).',
      'BLOCKING: the misspelling شاگرڈ (correct: شاگرد) appears 15 times: topic-01.mdx:28,42,50,108; topic-02.mdx:3,26,36,40(x2),70,89,100; unit-assessment.mdx:41,113,137; unit-teacher-notes.mdx:30 (known repo-wide defect family, repaired in sibling units).',
      'BLOCKING: UR index.mdx:12-14 key_terms declares en "Formative Assessment" / ur "صورت بہبود جائزہ": wrong flagship concept for this unit (siblings carry their own: U3 Behaviorism, U5 Individual Differences) and non-banked Urdu (bank: تشکیلی تشخیص). check:pipeline-gate\'s terminology conformance check (scripts/check-pipeline-gate.mjs:218-232) will fail on this entry once translation_status flips to reviewed.',
      'Known defect family: منی روبرک/روبرکس calque for the banked Rubric=معیارِ جانچ (terminology.csv:72) at topic-01.mdx:116, topic-02.mdx:108, unit-assessment.mdx:3,147; and صورت بہبود for formative in unit-teacher-notes.mdx:65.',
      'Figure/prose/concept-graph inconsistencies needing unification: self-actualization خود ارتقا (fig-U6-1.ur.svg) vs خود کی تکمیل (topic-01.mdx:48, unit-assessment.mdx:45-48); attribution نسبت دہی (fig-U6-3.ur.svg title, concepts/unit-06.md:21,32) vs اسناد (all prose); hygiene factors حفظانِ صحت عوامل (concepts/unit-06.md:18) vs صفائی عوامل (prose); goals مقاصد (concepts:20) vs ہدف (prose); overjustification حدِ جواز سے زیادہ کا اثر (concepts:16) vs حد سے زیادہ جواز کا اثر (prose).',
      'Word-choice errors: Maslow\'s "levels" rendered سطریں (lines) instead of سطحیں at topic-01.mdx:48,90,102; "aptitude" rendered رجحان (tendency) at topic-02.mdx:46.',
    ],
  },
  {
    id: 'register',
    status: 'fail',
    evidence: [
      'Garbled calques: "the unit\'s signature reframe" rendered "یونٹ کا دستخط بدلنا" ("changing the unit\'s signature", nonsense) at unit-teacher-notes.mdx:51; "aim at appearance" rendered "ظاہرے کا" (non-word) at topic-02.mdx:38 and "عدالت کی ظاہرے کی قیمت" at :42; "a comfortable building full of pupils with no reason to try" rendered "بے وجہ کوشش کے بغیر شاگردوں سے بھری آرام دہ عمارت" ("without unjustified effort") at topic-01.mdx:60.',
      'Informal loanwords in academic-plain register: لیور (lever, topic-02.mdx:58, unit-assessment.mdx:101,143), فٹ (fit, topic-02.mdx:58, unit-assessment.mdx:82,129,144), ڈیٹے (data, unit-teacher-notes.mdx:30), ٹاپر (topper, topic-01.mdx:26); the bulk of the prose does hold درسی مگر عام فہم register with natural sentence order.',
      'Minor grammar slips: "کام کی جگہ کی اطمینان" (should be کے اطمینان, topic-01.mdx:56), "بالغ ملازموں پر بنیا" (should be بنی, fig-U6-2.ur.svg), "ڈھونھنے" (should be ڈھونڈنے, unit-assessment.mdx:88), an empty <text> element in fig-U6-3.ur.svg.',
    ],
  },
  {
    id: 'rtl',
    status: 'fail',
    evidence: [
      'BLOCKING: fig-U6-3.ur.svg - both loop arrows strike through the explanation text. Paths "M 580 137H245" and "M 240 137H570" run at y=137 through the measured bbox of "محنت، قابلیت، قسمت، کام کی مشکل" (x 317.1-518.0, y 125.3-140.1); the second arrow also points rightward (explanation -> outcome), reversing the loop\'s reading direction. The English arrows sit correctly in the gaps (M200 137H245, M540 137H570). Browser-measured; see figure-geometry.log.',
      'BLOCKING: fig-U6-4.ur.svg and fig-U6-4.ur.dark.svg leave the curiosity row\'s teacher-move cell in untranslated English ("let questions live; do not answer / the ones nobody asked") - the pre-42ad6a8d English label, never translated; the .ur.svg variants predate that English fix and were not refreshed.',
      'BLOCKING: misplaced grid lines from incomplete RTL mirroring (only the first coordinate of each multi-segment path was mirrored). fig-U6-4.ur.svg grid "M 628 16V414M392 16V414M600 16V414" (English 152/392/600; correct mirror 628/388/180): the spurious x=600 divider strikes six cell texts of the "یہ تعلم کے ساتھ کیا کرتا ہے" column and the trigger/move column boundary (x~180) is missing. fig-U6-2.ur.svg grid "M 632 14V418M420 14V418M624 14V418" (English 148/420/624; correct mirror 632/360/156): doubled divider at 624/632 and the مثال/حد column boundary (x~156) missing; both lines also cross the footer caption (the English footer is likewise crossed - pre-existing, noted for the owner).',
      'BLOCKING: fig-U6-1.ur.svg - the rotated axis label "پہلے خسارے کی ضروریات، پھر نشوونما" kept the English x=-240/y=57/rotate(-90) placement (renders at the left edge, anchor ~(57,240)) while its arrow was mirrored to x=680; the label is detached from the arrow by ~620px (style-guide v4.1 requires translated rotated labels to carry across).',
      'Passing aspects: pages are dir=rtl with no overflow at 360px; MDX tables and prose order read correctly; Nastaliq renders in body text; print view correct (render-review.log, check-print.log).',
    ],
  },
];

const findings = [
  { severity: 'blocking', resolved: false, message: 'Terminology bank departures for the unit\'s core terms: prose uses حوصلہ/اندرونی حوصلہ/بیرونی حوصلہ for Motivation/Intrinsic/Extrinsic (bank: محرک/باطنی محرک/خارجی محرک, terminology.csv:8-10) and گھبراہٹ for Anxiety (bank: اضطراب, used by the unit\'s own fig-U6-4 and concept graph); Working Memory as کام کرنے والی یادداشت (bank pair: عامل یادداشت / فعال یادداشت). The teacher notes\' own banked-terms line (UR unit-teacher-notes.mdx:55) and the concept graph contradict the prose. Repair: conform the prose to the banked terms (or obtain an owner ruling and update the bank first - a bank conflict is owner-resolved per style-guide "Terminology bank").' },
  { severity: 'blocking', resolved: false, message: 'The misspelling شاگرڈ for شاگرد occurs 15 times across four student-facing files (topic-01.mdx:28,42,50,108; topic-02.mdx:3,26,36,40x2,70,89,100; unit-assessment.mdx:41,113,137; unit-teacher-notes.mdx:30). Known repo-wide defect family already repaired in sibling units; correct spelling شاگرد is used elsewhere in the same files.' },
  { severity: 'blocking', resolved: false, message: 'UR topic-02.mdx:50: the structured-experience feedback example "your method missed the carrying - here is the fix" is mistranslated as "تمہارے طریقے نے قرض لینا چھوڑ دیا: یہ درست ہے" (your method stopped taking a loan: this is correct). The arithmetic "carrying" became "taking a loan" and "here is the fix" became "this is correct"; the example must be retranslated (e.g. "تمہارے طریقے نے بقایا آگے لکھنا چھوڑ دیا تھا: یہاں اس کا حل ہے").' },
  { severity: 'blocking', resolved: false, message: 'fig-U6-3.ur.svg: both loop arrows (paths "M 580 137H245" and "M 240 137H570") strike through the label "محنت، قابلیت، قسمت، کام کی مشکل" (measured bbox x 317.1-518.0, y 125.3-140.1); the second arrow also points the wrong way (toward the outcome box). Correct mirrors of the English arrows are "M580 137H535" and "M240 137H210". Regenerate the variant with scripts/mirror-figure-rtl.mjs from the English geometry and re-translate labels.' },
  { severity: 'blocking', resolved: false, message: 'fig-U6-4.ur.svg and fig-U6-4.ur.dark.svg: the curiosity row\'s teacher-move cell is untranslated English ("let questions live; do not answer / the ones nobody asked"), left over from the pre-42ad6a8d English; the current English label reads "let questions live / the ones nobody asked". Translate the cell (e.g. "سوالوں کو زندہ رہنے دیں / جنہیں کسی نے نہیں پوچھا") and refresh both variants against the current English figure.' },
  { severity: 'blocking', resolved: false, message: 'fig-U6-2.ur.svg and fig-U6-4.ur.svg: grid lines misplaced by incomplete RTL mirroring (only the first M coordinate of each multi-segment path was mirrored). fig-U6-4: spurious divider x=600 strikes six cell texts of the "یہ تعلم کے ساتھ کیا کرتا ہے" column; the trigger/move column boundary (mirrored x~180) is missing. fig-U6-2: doubled divider at x=624/632; the مثال/حد column boundary (mirrored x~156) is missing. Correct mirrors: fig-U6-2 632/360/156, fig-U6-4 628/388/180.' },
  { severity: 'blocking', resolved: false, message: 'fig-U6-1.ur.svg: the rotated axis label "پہلے خسارے کی ضروریات، پھر نشوونما" retains the English placement (x=-240, y=57, rotate(-90); renders at the left edge) while its arrow was mirrored to x=680, leaving the label detached on the opposite side of the figure. Carry the rotated label across with the arrow per style-guide v4.1.' },
  { severity: 'blocking', resolved: false, message: 'UR index.mdx:12-14 key_terms block declares en "Formative Assessment" / ur "صورت بہبود جائزہ": the flagship concept is wrong for a Motivation unit (siblings carry their own: U3 Behaviorism, U5 Individual Differences; Unit 6\'s natural entry is Motivation/محرک) and the Urdu is not the banked term (bank: تشکیلی تشخیص). check:pipeline-gate (scripts/check-pipeline-gate.mjs:218-232) will fail this entry once translation_status becomes reviewed.' },
  { severity: 'uncertain', resolved: false, message: 'G3 dependency not satisfied: the contract requires an accepted, signed G3 report for the exact English inputs bound here. The available G3 (agent-g3-efmp301-u6-run001.json) is advisory, disposition revise with an OPEN blocking finding, and was prepared against the pre-repair English; the English was repaired at commit 067c2ff2 afterwards with no round-2 verification, and no signed/accepted G3 exists. Escalated to the owner per the GQUR-300 PR #65 precedent. The full Urdu-vs-current-English comparison was nevertheless performed against the bound bytes (all 108 manifest digests verified against the tree).' },
  { severity: 'advisory', resolved: false, message: 'Known defect family: منی روبرک (topic-01.mdx:116, topic-02.mdx:108) and روبرکس (unit-assessment.mdx:3 description, :147 heading) for the banked Rubric=معیارِ جانچ; صورت بہبود for formative (unit-teacher-notes.mdx:65, bank: تشکیلی). Replace with the banked terms.' },
  { severity: 'advisory', resolved: false, message: 'Unify figure/prose/concept-graph terminology: self-actualization خود ارتقا (fig-U6-1) vs خود کی تکمیل (prose, MCQ-3); attribution نسبت دہی (fig-U6-3, concept graph) vs اسناد (prose); hygiene حفظانِ صحت عوامل (concept graph) vs صفائی عوامل (prose); goals مقاصد (concept graph) vs ہدف (prose); overjustification حدِ جواز سے زیادہ کا اثر (concept graph) vs حد سے زیادہ جواز کا اثر (prose). The concept graph flags these authored labels for G5 review; whichever survives should be promoted into the bank and used consistently.' },
  { severity: 'advisory', resolved: false, message: 'Word-choice errors: Maslow\'s five "levels" rendered سطریں (lines) instead of سطحیں at topic-01.mdx:48,90,102; "aptitude" rendered رجحان (tendency) at topic-02.mdx:46 (use استعداد/صلاحیت).' },
  { severity: 'advisory', resolved: false, message: 'Register repairs: "یونٹ کا دستخط بدلنا" (unit-teacher-notes.mdx:51) is a garbled calque of "the unit\'s signature reframe" (suggest "یونٹ کی خاص نظر بدلنے والی بات"); "ظاہرے کا" (topic-02.mdx:38) and "عدالت کی ظاہرے کی قیمت" (:42) are non-words/garbled (suggest "دکھاوے کا" / "عدالت میں نظر آنے کی قیمت"); "بے وجہ کوشش کے بغیر شاگردوں سے بھری آرام دہ عمارت" (topic-01.mdx:60) garbles "pupils with no reason to try" (suggest "کوشش کا کوئی سبب نہ رکھنے والے شاگردوں سے بھری"); informal loanwords لیور/فٹ/ڈیٹے (suggest ذرائع/سمائے/ڈیٹا).' },
  { severity: 'advisory', resolved: false, message: 'Minor semantic drifts to align: "starved" as چھینا (snatched) at topic-01.mdx:120 and unit-assessment.mdx:107 (body and ERQ-1 rubric correctly use بھوکا رکھنا/بھوک); "triage" dropped from the unit summary (unit-assessment.mdx:24); RRQ-10 model answer drops the "keep" element (unit-assessment.mdx:145); fig-U6-4 "high-stakes test" as زیادہ نمبر والا امتحان (high-marks) and "موقوفی دلچسپی" (suspended) for situational interest (prose: صورتحال والی دلچسپی); "بنیا" grammar slip in fig-U6-2.ur.svg; empty <text> element in fig-U6-3.ur.svg; ڈھونھنے typo (unit-assessment.mdx:88).' },
  { severity: 'advisory', resolved: false, message: 'Out of unit scope, for the owner (platform): Urdu h1/h2 headings resolve to the Latin system-ui font stack on every Urdu page (verified on Units 3, 5, 6), so headings render in a system Arabic-script fallback while body text is Noto Nastaliq Urdu - mixed typography across all courses. Also pre-existing English-figure defects outside G5 scope: fig-U6-2.svg divider x=624 crosses the "midday meal" cell text and both English tables\' footer captions are crossed by their dividers (faint 25%-opacity lines).' },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
  { name: 'verify-manifest', exit_code: 0, log_path: `${LOGS}/verify-manifest.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${LOGS}/measure-figure-text.log` },
  { name: 'figure-geometry', exit_code: 0, log_path: `${LOGS}/figure-geometry.log` },
  { name: 'rotated-label', exit_code: 0, log_path: `${LOGS}/rotated-label.log` },
  { name: 'build', exit_code: 0, log_path: `${LOGS}/build.log` },
  { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.log` },
  { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
  { name: 'check-dark-font', exit_code: 0, log_path: `${LOGS}/check-dark-font.log` },
  { name: 'check-fonts-detail', exit_code: 0, log_path: `${LOGS}/check-fonts-detail.log` },
  { name: 'check-print', exit_code: 0, log_path: `${LOGS}/check-print.log` },
  { name: 'check-heading-font-other-courses', exit_code: 0, log_path: `${LOGS}/check-heading-font-other-courses.log` },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 6,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:585650d4',
  reviewer_run_id: 'agent-g5-efmp301-u6-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T23:05:00Z',
  completed_at: '2026-09-25T23:55:00Z',
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-06/G3/agent-g3-efmp301-u6-run001.json',
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
  notes: [
    'Advisory report under ADR-0019: certification is not provisioned; this report does not certify, sign, register or mark any gate done.',
    'The Urdu mirror was authored by the G4 run (PHR 0068, commit 585650d4) and its G3-repair mirror at commit 067c2ff2; this reviewer session neither authored nor translated the material.',
    'All 108 bound inputs verified against the prepared manifest with the evidence library\'s normalisation (verify-manifest.log): 108/108 match, 0 drifted.',
    'Render inspection ran on the production build served at http://localhost:3217 (2-core box, load checked before build; single build at a time), Chromium via playwright-core, desktop 1280x900, narrow 360x780, A4 print 794x1123, plus a [data-theme=dark] pass; 19 PNGs saved. In-session PNG viewing is blocked in this environment (as in prior rounds), so figure-defect conclusions rest on browser-measured geometry (figure-geometry.log, rotated-label.log) with the PNGs as human-viewable evidence.',
  ],
};

writeFileSync('specs/content/efmp-301/reviews/unit-06/G5/agent-g5-efmp301-u6-run001.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written:', Object.keys(evidence).length, 'evidence entries,', criteria.length, 'criteria,', findings.length, 'findings');
