// Builds agent-g5-gqur300-u1-run001.json from the review evidence collected in this session.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { rulingDigest } from '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183/scripts/lib/review-evidence.mjs';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const g5Dir = `${root}/specs/content/gqur-300/reviews/unit-01/G5`;
const logs = `${g5Dir}/logs-agent-g5-gqur300-u1-run001`;
const renders = `${g5Dir}/renders-agent-g5-gqur300-u1-run001`;

const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const rel = (p) => p.slice(root.length + 1);

const bundle = JSON.parse(readFileSync(`${g5Dir}/manifest.json`, 'utf8'));

// ---------- evidence manifest ----------
const evidence = [];
const push = (abs) => { if (existsSync(abs)) evidence.push(abs); else console.error(`MISSING EVIDENCE: ${abs}`); };
for (const f of readdirSync(logs)) push(join(logs, f));
for (const f of readdirSync(renders)) if (!f.startsWith('crops')) push(join(renders, f));
const cropsDir = join(renders, 'crops');
const citedCrops = [
  't01-top-figure1.png', 't01-mid-figure2-activity.png', 't01-checkunderstanding-summary.png',
  't02-mid-figure4-worked.png', 'ua-erq-rubrics.png',
  'zoom-figU1-2-ur.png', 'zoom-figU1-4-ur.png', 'zoom-figU1-6-ur.png',
  'zoom-t02-activity-tutors.png', 'zoom-ua-mcq-options.png', 'zoom-ua-rrq-numbers.png',
  'ur-badge.png', 'ur-h1.png', 'print-a4-unit-assessment-top.png',
  'narrow-fig-topic-01-1.png', 'narrow-fig-topic-01-2.png', 'narrow-fig-topic-02-1.png',
  'narrow-fig-topic-02-2.png', 'narrow-fig-topic-03-1.png', 'narrow-fig-topic-03-2.png',
];
for (const c of citedCrops) push(join(cropsDir, c));

const evidence_manifest = Object.fromEntries(evidence.map((p) => [rel(p), digest(p)]));

// ---------- commands ----------
const commands = [
  { name: 'verify-input-manifest', exit_code: 0, log_path: rel(join(logs, 'verify-inputs.log')) },
  { name: 'validate:content', exit_code: 0, log_path: rel(join(logs, 'validate:content.log')) },
  { name: 'check:depth-gate', exit_code: 0, log_path: rel(join(logs, 'check:depth-gate.log')) },
  { name: 'check:figures', exit_code: 0, log_path: rel(join(logs, 'check:figures.log')) },
  { name: 'check:no-em-dash', exit_code: 0, log_path: rel(join(logs, 'check:no-em-dash.log')) },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: rel(join(logs, 'check:no-answer-keys.log')) },
  { name: 'check:docs-sync', exit_code: 0, log_path: rel(join(logs, 'check:docs-sync.log')) },
  { name: 'site-build', exit_code: 0, log_path: rel(join(logs, 'site-build.log')) },
  { name: 'render-inspect', exit_code: 0, log_path: rel(join(renders, 'render-inspect.log')) },
  { name: 'element-shots', exit_code: 0, log_path: rel(join(logs, 'element-shots.log')) },
  { name: 'render-review', exit_code: 0, log_path: rel(join(logs, 'render-review.log')) },
];

// ---------- findings ----------
const EN = 'docs/semester-1/gqur-300/unit-01';
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01';
const findings = [
  {
    severity: 'blocking', resolved: false,
    message: `[semantics/sources/coverage] Fabricated source passage. EN ${EN}/topic-02.mdx:55-59 says Gula and Lovric (2025) argue numeracy tasks are their own category of mathematics task, distinct from word problems and mathematical modelling, and quotes "inspire[s] transfer between concrete and abstract thinking spaces". UR ${UR}/topic-02.mdx:54-56 instead claims they build their university numeracy course on number-meaning and reasonableness checks before every technique, and adds "یہی وہ معیار ہے جو یہ کورس آپ سے رکھے گا" with no EN counterpart. The bound source summary (specs/content/gqur-300/sources/texts/gula2025.md:14-22) supports only the EN claim, so the Urdu attributes an unsupported claim to a real citation and drops the direct quotation; coverage row U1-02 (specs/content/gqur-300/coverage/unit-01.md:15, bound to gula2025) is no longer grounded in the Urdu text. Repair: translate the EN passage faithfully, quotation included.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[semantics] Weekday changed. EN ${EN}/topic-03.mdx:28 "Three teachers are on leave every Friday" and :29 "(every class gets its math period on Friday)" vs UR ${UR}/topic-03.mdx:27-28 "ہر جمعرات کو تین اساتذہ رخصت پر ہوتے ہیں" and :29 "ہر کلاس کو جمعرات کو" - جمعرات is Thursday, جمعہ is Friday. A factual divergence between the two locales in the opening scenario. Repair: جمعہ in both places.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[semantics] Wrong word: "تعذیر" (punishment) used for "reconstruction" (intended تعمیر / تشکیلِ نو). Three occurrences: UR ${UR}/topic-03.mdx:127 "کیا وہ آپ کی تعذیر سے اتفاق کرتے ہیں" for EN ${EN}/topic-03.mdx:130-131 "whether they agree with your reconstruction"; UR ${UR}/unit-assessment.mdx:222 "اسپورٹس ڈے کی تعذیر" for EN ${EN}/unit-assessment.mdx:234 "Sports-day reconstruction" (ERQ-4 rubric heading); UR ${UR}/unit-assessment.mdx:222 "چار مرحلوں کی تعذیر" for EN :234 "Four-step reconstruction". Visually confirmed in the rendered page (crops/ua-erq-rubrics.png).`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[semantics] Meaning reversal. EN ${EN}/topic-03.mdx:87-88 "Asking 'what is asked, what is given?' is usually enough to unstick them" vs UR ${UR}/topic-03.mdx:86 "یہ پوچھنا کہ ... عام طور پر پھنسانے کے لیے کافی ہے" - پھسانے کے لیے means "to trap/stick them", the opposite of unsticking. Repair: پھنسے سے نکالنے کے لیے (or انہیں کھولنے کے لیے).`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[semantics] Quantity changed in an instructional example. EN ${EN}/topic-02.mdx:49-50 "a third as many pupils needs a third as many worksheets" vs UR ${UR}/topic-02.mdx:49-50 "آدھے طلبہ کو آدھی ورک شیٹیں چاہیے" (half). The proportional-relation example diverges from the English base. Repair: ایک تہائی طلبہ کو ایک تہائی ورک شیٹیں.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[semantics] Instructional sequence reversed. EN ${EN}/topic-02.mdx:93-94 "Your tutor will show five quick prompts one at a time, for exactly one minute each" vs UR ${UR}/topic-02.mdx:87 "tutors ایک ساتھ پانچ مختصر اشارے دکھائیں گے" - ایک ساتھ means together/simultaneously, contradicting "one at a time"; the timing structure of the activity changes. Repair: ایک ایک کر کے (or پہلے ایک، پھر اگلا).`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[semantics/sources] PISA definition truncated. EN ${EN}/topic-01.mdx:50-52 "defines mathematical literacy as a person's capacity to reason mathematically and to formulate, employ, and interpret mathematics in real-world situations" vs UR ${UR}/topic-01.mdx:48-50, which drops "to reason mathematically" and "a person's": the Urdu renders only the formulate/employ/interpret half of the OECD definition. Repair: include ریاضی کے طور پر استدلال کرنے اور ... کی صلاحیت.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[assessment] Formative item changed. EN ${EN}/topic-02.mdx:102-103 (Check your understanding 1) asks for "the difference between an estimate and an approximation" (two-way) vs UR ${UR}/topic-02.mdx:95-96 "اندازہ، تخمینہ اور تقریب میں کیا فرق" (guess + estimate + approximation, three-way). The three-way comparison is the EN self-assessment item (${EN}/topic-02.mdx:120), not this item; the Urdu task differs from the English base in scope and demand. Repair: two-way (تخمینے اور تقریب کا فرق) at CYU-1.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[assessment/semantics] "Evidence" loosened to "a thing" in the workbook-claim task. EN ${EN}/topic-03.mdx:139-140 and ${EN}/unit-assessment.mdx:141-142 "(c) states what evidence would be needed before crediting the workbooks" vs UR ${UR}/topic-03.mdx:135 and ${UR}/unit-assessment.mdx:134-135 "بتائے کہ ورک بک کو سہرا دینے سے پہلے کس شے کی ضروری ہے" ("what thing is needed") - شے replaces شواہد/ثبوت, weakening the evidence-standard demand in the item text the student reads (the rubric still demands شواہد), and "کی ضروری ہے" is ungrammatical (ضرورت). Repair: کس شواہد کی ضرورت ہے.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[completeness] Missing key_terms block. UR ${UR}/index.mdx frontmatter (lines 1-13) has no key_terms list, although the G4 translation contract includes the UR key_terms block that scripts/check-pipeline-gate.mjs reads at translation_status: reviewed (FR-016c; see i18n/ur/.../efmp-301/unit-01/index.mdx:12 and efmp-302/unit-01/index.mdx:12 for the convention). Because none of this unit's terms are banked, an absent block silently bypasses the terminology conformance check when the unit is flipped to reviewed; a present block would correctly fail until the terms are banked - the intended signal. Repair: add key_terms for the unit's core terms.`,
  },
  {
    severity: 'blocking', resolved: false,
    message: `[completeness/authority] clo_refs divergence between locales. EN ${EN}/index.mdx:6-8 and ${EN}/unit-teacher-notes.mdx:6-8 cite SLO:GQUR-300-1-1 and SLO:GQUR-300-3-3; UR ${UR}/index.mdx:6-9 and ${UR}/unit-teacher-notes.mdx:6-9 add SLO:GQUR-300-2-2. specs/content/gqur-300/content-spec.md Unit 1 ("CLO refs: course outcomes 1, 2 and 3") supports the Urdu set, so the English frontmatter appears stale relative to the repaired spec (G3 finding A1 lineage). The four files must be reconciled to the spec in both locales (topic and assessment frontmatter already agree).`,
  },
  {
    severity: 'uncertain', resolved: false,
    message: `[authority] G3 dependency unmet. No accepted G3 evidence exists in the registry (ADR-0019: agent certification blocked, G3 advisory). The best-available English review, specs/content/gqur-300/reviews/unit-01/G3/agent-g3-gqur300-u1-run001.json (disposition revise, author_run_id commit:694c29f), predates commit 93e6321 which changed the bound English inputs (topic-01/02/03, unit-assessment: NPST disclosure, Gula and Steen passages, MCQ redistribution, grammar fix), so no accepted or even advisory G3 verdict covers the exact English bytes bound here. This review proceeded per the parent's direction with the bound English inputs as the comparison base and the advisory G3 report as context. A fresh G3 pass over the current English inputs (or owner acceptance of the advisory chain) is required before G5 for this unit can be more than advisory.`,
  },
  {
    severity: 'uncertain', resolved: false,
    message: `[terminology] Unbanked course terms need owner decisions. None of the unit's core terms exist in specs/content/terminology.csv (the bank is education-psychology only); concepts/unit-01.md:31-48 lists 12 authored Urdu labels that carry an explicit G5-review flag, and the estimation-strategy names (گروہ بندی grouping, گول کرنا rounding, سابقہ ہندسے front-end digits, آسان اعداد compatible numbers, مقدارِ رتبہ order-of-magnitude) are also authored. Internal consistency was verified across prose, figures and the assessment bank for مقداری استدلال، عددیت، عددی شعور، تخمینہ، تقریب، منطقی استدلال، نمونہ، اگر-تو، استنباط، حذف. I found no misleading calque among these coinages and propose banking them as-is, except آسان اعداد (literally "easy numbers"; a more standard rendering of compatible numbers might be ہم آہنگ اعداد) - owner to decide. Per the concept-graph contract, surviving terms should be promoted into terminology.csv; the bank has not been edited by this review.`,
  },
  {
    severity: 'uncertain', resolved: false,
    message: `[terminology] Banked-term drift needs owner resolution (style guide: conflicts between translator choice and the bank are resolved by the curriculum owner). (a) Rubric rendered ربرک/ربرکس (topic-01:129, topic-02:132, unit-assessment:137+; notes:74) vs banked معیارِ جانچ (terminology.csv:72, adopted as the prose term 2026-09-14). (b) Assessment rendered جائزہ throughout (unit titles, headings) vs banked تشخیص (terminology.csv:19), while Evaluate is rendered تشخیص (unit-assessment:143) - a crossed mapping. (c) Self-assessment rendered خود جانچ (topic files, "خود جانچ کی فہرست") vs banked خود جائزہ / خود تشخیصی (terminology.csv:102). (d) Group Work rendered گروپ کام (teacher-notes:66) vs banked گروہی کام (terminology.csv:70). (e) Teaching Strategy rendered تدریسی حکمت عملی (teacher-notes:29) vs banked حکمتِ تدریس (terminology.csv:24). (f) تقریب doubles as the technical "approximation" and the everyday "function/ceremony" (اسکول کی تقریب, topic-02:70) within one topic - inherent to Urdu, noted for the owner. Summative Assessment -> مجموعی جائزہ matches the banked accepted pair (terminology.csv:21) and is conformant.`,
  },
  {
    severity: 'uncertain', resolved: false,
    message: `[register] Reader-gender policy needs an owner ruling. The Urdu prose addresses the reader exclusively in the feminine (index.mdx:23-24 "استعمال کریں گی", topic-01:112-114 "میں ... کر سکتی ہوں", teacher-notes:45-46 "چاہتی ہو؟"), while the SVG figure labels use the masculine generic (fig-U1-4.ur.svg "آپ کیا کرتے ہیں") and the English is neutral. B.Ed cohorts include male trainees. Either convention may be defensible, but the prose/figure inconsistency is objective and the choice is a policy decision for the owner, not a translator.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[register] Untranslated English left in Urdu prose: "tutors" at ${UR}/topic-01.mdx:86, topic-02.mdx:87 and :90, topic-03.mdx:93, and unit-teacher-notes.mdx:10 (blooms_summary) - EN is "Your tutor" (singular; the possessive is also dropped, and the verb is pluralized); "brain storming" at unit-teacher-notes.mdx:32 and :39. Visually confirmed in the render (crops/zoom-t02-activity-tutors.png). Suggest ٹیوٹر (transliterated, matching the course's transliteration style) or استادِ رہنما, and restoring آپ کے.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[register] "اساتاد" at ${UR}/index.mdx:10 (blooms_summary) is a misspelling of اساتذہ.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[register] Grammar slips, each a one-word or one-inflection repair: topic-03.mdx:64 "پوری معاشرے" -> پورے معاشرے; topic-03.mdx:135 and unit-assessment.mdx:135 "کی ضروری ہے" -> کی ضرورت ہے; index.mdx:3 and topic-01.mdx:107 "ملتی ہے" for masculine استدلال -> ملتا ہے (topic-01:107 also has a plural subject: "اساتذہ اسے مسلسل ملتی ہے" -> اساتذہ کو یہ مسلسل ملتا ہے); topic-01.mdx:71 "معیارات کا دستاویز" -> معیارات کی دستاویز; topic-03.mdx:40 (figure alt) "ہر ایک کی ایک جملے میں وضاحت" -> ہر ایک کے لیے ایک جملے میں وضاحت; unit-assessment.mdx:198 "ٹینک ٹیک رہا ہو" -> ٹپک رہا ہو (leak); unit-assessment.mdx:97 "احتیاطی کو قاعدے سے ضروری ہیں" -> احتیاطی بینچ قاعدے کے مطابق درکار ہیں; topic-02.mdx:97 "طریقہ نام کریں" -> طریقے کا نام بتائیں; unit-assessment.mdx:103 "اس اگر-تو نتیجے کی انحصار کرنے والی دو باتیں" -> جس پر یہ نتیجہ انحصار کرتا ہے وہ دو باتیں.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[register] Misleading calques/idioms: "بجٹ کھانا" for "spending a budget" (topic-01.mdx:66 and :107) - in Pakistani usage کھانا with money reads as consuming/embezzling; prefer بجٹ خرچ کرنا or بجٹ کا استعمال. "ڈوبتے طالبِ علم کی پہچان" for "spotting a pupil who is falling behind" (topic-01.mdx:66) - ڈوبتا suggests literal drowning; prefer پیچھے رہنے والا / کمزور. "کنٹرولڈ لینڈنگ" for "controlled-lending" (topic-01.mdx:140-141, topic-03.mdx:149-150) - lending and landing transliterate identically, so it reads as "controlled landing"; prefer a gloss such as محدود ادھار داری پر مبندی یا کنٹرولڈ لینڈنگ (ادھار کی محدود دستیابی).`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[rtl/terminology] Figure-label defects, verified in the rendered SVGs: fig-U1-4.ur.svg grouping example contains the meaningless connector "گنٹھے" ("فی حصہ تقریباً 40 طلبہ گنٹھے 20 حصے، یعنی تقریباً 800") where the EN has "times 20" - use ضرب or در (crop: zoom-figU1-4-ur.png). fig-U1-6.ur.svg renders "shelf" as تختہ while topic-03.mdx:55 prose uses شیلف; its if-then description drops EN "that must hold"; "let it predict the next" is rendered "اگلی جانچ کریں" (check, not predict); and it uses بچے where the prose uses طلبہ (crop: zoom-figU1-6-ur.png).`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[completeness] Small omissions: topic-01 EN:133 "(about half a page)" dropped at UR:125; topic-03 EN:31 "for a games-plus-math activity" dropped at UR:31; topic-01 EN:28 "a simple question" -> UR:28 "سوال" (سادہ dropped); teacher-notes EN:24-25 "across the three weeks the content-spec allows" -> UR:25 "جو رہنما کی اجازت دیتی ہے" (the three-week duration is dropped and content-spec becomes "guide"); teacher-notes EN:3 description drops the qualifier "for quantitative reasoning, estimation and problem solving"; topic-02 EN:145-146 rubric names three example factors (prize quality tiers, transport cost, number of prize categories) vs UR:135-136 two; unit-assessment EN:192 RRQ-5 model "(348 to 350)" dropped at UR:182; index EN:23 "solve problems in checkable steps" -> UR:24 adds "نامعلوم" (unfamiliar), a small addition.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[semantics] Minor sense shifts that do not reverse meaning but should be tightened at the human pass: topic-01 EN:67 "often without noticing" -> UR:63 "اکثر بغیر سمجھے" (without understanding); topic-01 EN:80-81 "A teacher who reasons that way" -> UR:75-76 "یہ رویہ اپناتی ہے" (adopts this attitude); topic-01 EN:32-33 "She judged what the numbers meant" -> UR:32-33 "انہوں نے فیصلہ کیا" (decided); topic-03 EN:82-84 "each correctly mapped to her actions" -> UR (unit-assessment):222 "درست جگہ پر" (in the right place); unit-assessment EN:222 "a respectful, plain note" -> UR:210 "معقول، سادہ نوٹ" (reasonable); topic-02 EN:72-75 the second Gula and Lovric sentence is relocated to the end of the misconception paragraph (UR:81-83) instead of following the table paragraph.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[assessment] ERQ-2 item drops the estimation verb: EN unit-assessment.mdx:135-136 "Estimate whether the plan fits the budget" -> UR:128 "بتائیں منصوبہ بجٹ میں فٹ ہے یا نہیں" (tell whether). Scoring is unaffected (the rubric demands a named strategy, which the UR keeps), but the item verb should mirror the EN (تخمینہ لگا کر بتائیں).`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[sources] Citation-format divergence: UR topic-02.mdx:141-143 gives the full Gula and Lovric citation (volume 25(1), pages 171-184, DOI) while EN topic-02.mdx:152-154 gives the ERIC URL only; specs/content/gqur-300/sources/unit-01.md:13 carries both. Both are accurate; the locales should match - bringing the EN up to the fuller form is the better direction.`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[rtl] The dense SVG tables (fig-U1-2/4/6) scale to 328 CSS px at the 360px viewport, so their 12-13px SVG labels render at roughly 5.5 CSS px on screen. Geometry is identical to the English variants, so this is not an Urdu regression, but it limits the usefulness of the tables on phones in both locales; recorded for the owner (crops: narrow-fig-topic-02-2.png, narrow-fig-topic-03-2.png).`,
  },
  {
    severity: 'advisory', resolved: false,
    message: `[register] The Bloom's-level tags (Remember/Understand/Apply/Analyze/Evaluate) and bank labels (MCQ/RRQ/ERQ) are kept in English inside the Urdu files, consistently in both topics and assessment, and render correctly. A defensible convention, but worth an explicit owner note for the entering-student register.`,
  },
];

// ---------- criteria ----------
const criteria = [
  {
    id: 'authority', status: 'fail',
    evidence: [
      'Bundle verified: all 117 bound inputs recomputed identical to specs/content/gqur-300/reviews/unit-01/G5/manifest.json (logs-agent-g5-gqur300-u1-run001/verify-inputs.log).',
      'G3 dependency unmet: no accepted G3 evidence in the registry (ADR-0019); advisory G3 run001 (disposition revise) reviewed commit 694c29f, English inputs changed at 93e6321 after that report (git diff 694c29f..HEAD on docs/semester-1/gqur-300/unit-01/).',
      'Course/unit identity consistent across locales: GQUR-300 unit 1, same topics and outcomes taught in Urdu (all sections present).',
      'clo_refs divergence: EN index.mdx:6-8 and unit-teacher-notes.mdx:6-8 vs UR index.mdx:6-9 and unit-teacher-notes.mdx:6-9 (UR adds SLO:GQUR-300-2-2); specs/content/gqur-300/content-spec.md Unit 1 assigns outcomes 1, 2 and 3.',
    ],
  },
  {
    id: 'sources', status: 'fail',
    evidence: [
      `UR ${UR}/topic-02.mdx:54-56 attributes a claim to Gula and Lovric (2025) that the bound source summary does not support and drops the direct quotation (EN ${EN}/topic-02.mdx:55-59; specs/content/gqur-300/sources/texts/gula2025.md:14-22).`,
      'Unverifiable-source disclosures preserved in Urdu: npst2009 point-of-use limit (topic-01 UR:71-72 vs EN:74-75, D-2026-0001) and steen2001 controlled-lending note (topic-01 UR:140-141 vs EN:149-150; topic-03 UR:149-150 vs EN:152-155).',
      `Citation divergence: UR topic-02.mdx:141-143 (DOI, volume, pages) vs EN topic-02.mdx:152-154 (ERIC URL); sources/unit-01.md:13 carries both.`,
      'Ruling D-2026-0001 cited and bound (rulings map in this report).',
    ],
  },
  {
    id: 'coverage', status: 'fail',
    evidence: [
      'All five sub-topics U1-01..U1-05 (specs/content/gqur-300/coverage/unit-01.md:9-18) are taught in Urdu: topic-01 sections The nature / The importance; topic-02 Numeracy and number sense / Estimation and approximation; topic-03 Logical reasoning / Problem-solving strategies - every EN section has a UR counterpart (section-by-section comparison of all six file pairs).',
      'All 25 assessment items exist in Urdu with the same 10/10/5 structure and per-topic distribution.',
      'Coverage grounding broken in Urdu for U1-02: the gula2025-supported claim (numeracy tasks as their own category) is absent from the Urdu passage, so coverage row (U1-02, gula2025) is ungrounded in the mirror.',
    ],
  },
  {
    id: 'assessment', status: 'fail',
    evidence: [
      'Independent solving: all 25 Urdu items answered by the reviewer before reading the supplied answers; all 10 MCQ keys match the English key (c,a,b,d,c,a,b,d,c,a); option sets and option order mirror the post-repair English (verified against git diff 694c29f..HEAD which redistributed the options).',
      'Marks and rubric weights mirror the EN: RRQ (2,2,2,2,2,4,2,3,2,2); ERQ totals 8,8,8,8,10 with the same criterion splits (unit-assessment UR:166-230 vs EN:173-244).',
      'No item lowered to recall and no answer leaked by the translation; the answers section is separate and the no-answer-keys gate passes.',
      'Defects: topic-02 CYU-1 is three-way in Urdu vs two-way in English; the workbook-claim task (c) renders "evidence" as "thing" in both topic-03 and the assessment; ERQ-2 drops the "estimate" verb.',
    ],
  },
  {
    id: 'accessibility', status: 'pass',
    evidence: [
      'render-inspect (exit 0): 6/6 Urdu pages HTTP 200 on the production build; heading trees complete with no skipped levels; every figure img served with non-empty Urdu alt matching the manifest; dark variants display:none in light mode; no broken images (renders-agent-g5-gqur300-u1-run001/render-inspect.log).',
      'A4 print: zero clipped elements on all six pages; figures render at 762px (right edge 778 < 794); the answers and marking-guidance sections render in print with Urdu headings.',
      'SVG geometry: 12/12 Urdu variants (fig-U1-1..6 .ur and .ur.dark) clean - no text past the viewBox, no wordmark overprint; the G3-era clipping defect is repaired in these variants.',
      'Visual inspection of desktop, narrow and print renders by the reviewer (crops/ cited in findings; logs-agent-g5-gqur300-u1-run001/render-review.log).',
    ],
  },
  {
    id: 'completeness', status: 'fail',
    evidence: [
      'Full bilingual comparison of all six file pairs (index, topic-01..03, unit-assessment, unit-teacher-notes): every EN section, activity, checklist, practicum task, summative task, mini-rubric and further-reading entry has a UR counterpart; no heading-only stubs.',
      'Missing: key_terms frontmatter block in the UR index (present in the EFMP-301/302 Urdu indexes; read by check-pipeline-gate at reviewed status).',
      'clo_refs divergence on index and unit-teacher-notes (UR adds SLO:GQUR-300-2-2).',
      'Omissions listed in the advisory findings (half-page length guidance, games-plus-math activity, three-week schedule, rubric example, model-answer parenthetical, description qualifiers).',
    ],
  },
  {
    id: 'semantics', status: 'fail',
    evidence: [
      'Blocking divergences with paired locators: fabricated Gula and Lovric passage (topic-02); Friday rendered as Thursday (topic-03, twice); تعذیر (punishment) for reconstruction (topic-03:127, unit-assessment:222 twice); "unstick" reversed to پھنسانے "trap" (topic-03:86); "a third" changed to "half" (topic-02:49-50); "one at a time" reversed to ایک ساتھ "together" (topic-02:87); PISA definition dropped "to reason mathematically" (topic-01:48-50); "evidence" rendered "thing" (topic-03:135, unit-assessment:134-135).',
      'Negation, modal force, percentages and quantities otherwise preserved: "probably not quantitative reasoning" keeps شاید; 10 percent / 200 not 2,000 kept; 90 percent Monday/Tuesday kept; 63<80, 240/15=16, 500/100=5 days, 240/4=60->62, 348x2=696->70, 100x250=25,000 all kept.',
      'Minor sense shifts catalogued in the advisory findings.',
    ],
  },
  {
    id: 'terminology', status: 'fail',
    evidence: [
      'specs/content/terminology.csv contains no GQUR-300 term; concepts/unit-01.md:31-48 lists 12 authored Urdu labels flagged for G5 review; the strategy names are also authored.',
      'Internal consistency verified across prose, figures and the assessment bank for the core coinages (مقداری استدلال، عددیت، عددی شعور، تخمینہ، تقریب، منطقی استدلال، نمونہ، اگر-تو، استنباط، حذف، گروہ بندی، گول کرنا).',
      'Banked-term drift: Rubric -> ربرک (bank: معیارِ جانچ, terminology.csv:72); Assessment -> جائزہ (bank: تشخیص, :19) with Evaluate -> تشخیص crossing the mapping; Self-assessment -> خود جانچ (bank: خود جائزہ/خود تشخیصی, :102); Group Work -> گروپ کام (bank: گروہی کام, :70); Teaching Strategy -> تدریسی حکمت عملی (bank: حکمتِ تدریس, :24). Summative Assessment -> مجموعی جائزہ is conformant (:21).',
      'Figure/prose inconsistency: shelf as تختہ (fig-U1-6.ur.svg) vs شیلف (topic-03:55); meaningless connector گنٹھے in fig-U1-4.ur.svg.',
    ],
  },
  {
    id: 'register', status: 'fail',
    evidence: [
      'Overall register is academic-plain and readable for an entering B.Ed student (درسی مگر عام فہم): sentence length and vocabulary checked across all six files; no literary/archaic diction.',
      'Untranslated English in prose: "tutors" (5 occurrences) and "brain storming" (2), visually confirmed in the render.',
      'Misspelling اساتاد (index.mdx:10); grammar slips catalogued with one-word repairs; misleading calques بجٹ کھانا / ڈوبتے طالبِ علم / کنٹرولڈ لینڈنگ.',
      'Feminine-only reader address in prose vs masculine-generic figure labels - owner ruling requested.',
    ],
  },
  {
    id: 'rtl', status: 'pass',
    evidence: [
      'Production build with the Urdu locale (site-build.log exit 0, build/ur generated); render-inspect served the production build (the dev server renders one locale per process and is refused by the tool).',
      'RTL verified visually on all six pages: dir=rtl layout, correct Nastaliq shaping, correct bidi for Western numerals (18,400/16,000; 47 ضرب 52 = 2,500; 63/80; 348/2/10) and embedded Latin (MCQ markers, Bloom tags, the untranslated words noted as findings).',
      'All six .ur.svg variants are horizontally mirrored per style-guide v4.1: x-coordinates reflected about the viewBox centre (EN vs UR coordinate comparison for all six figures), text anchors swapped, and table column order reads correctly right-to-left (fig-U1-2 and fig-U1-4 verified in rendered crops).',
      'Narrow 360px: no horizontal overflow on any page; every figure fits its 328px container; A4 print clean on all six pages.',
      'Advisory: dense SVG table labels are proportionally very small at 360px (same geometry as EN).',
    ],
  },
];

// ---------- report ----------
const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 1,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:ea3877dd44663172464b6d30b231bdb594338dc9',
  reviewer_run_id: 'agent-g5-gqur300-u1-run001',
  model: 'longcat-2.0',
  started_at: '2026-09-24T02:32:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: bundle.skill_digest,
  g3_report: 'specs/content/gqur-300/reviews/unit-01/G3/agent-g3-gqur300-u1-run001.json',
  rulings: { 'D-2026-0001': rulingDigest(root, 'D-2026-0001') },
  input_manifest: bundle.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
  summary: [
    'Advisory G5 Urdu review of GQUR-300 Unit 1 (Foundations of Quantitative Reasoning) at commit ea3877d; ADVISORY ONLY under ADR-0019 - no tracker row, sign-off or status change follows from this report.',
    'All 117 bound inputs verified against the prepared manifest. The six-file Urdu mirror is structurally complete (every English section has an Urdu counterpart), the assessment bank is equivalent (all 25 items independently solved; 10/10 MCQ keys match; marks and rubric weights mirror), the .ur.svg variants are correctly mirrored for RTL, and everything renders cleanly at desktop, 360px and A4 print on the production build. All six deterministic gates pass; note the EN-UR structural parity gate is dormant while translation_status is draft.',
    'Disposition revise. Blocking findings: a fabricated Gula and Lovric passage in topic-02 (unsupported attribution, quotation dropped); Friday rendered as Thursday in topic-03; "تعذیر" (punishment) for "reconstruction" in three places; "unstick them" reversed to "trap them"; a changed example quantity (a third -> half); the activity instruction "one at a time" reversed to "together"; the PISA definition losing "to reason mathematically"; a changed formative item (two-way -> three-way comparison); "evidence" loosened to "thing" in the workbook-claim task; a missing key_terms block in the Urdu index; and a clo_refs divergence between the locales (index and teacher notes).',
    'Terminology: no GQUR-300 term is banked; the unit\'s coinages are internally consistent and proposed for banking, with banked-term drift (Rubric, Assessment, Self-assessment, Group Work, Teaching Strategy) and two figure-label defects flagged for the owner. Register: academic-plain overall, but with untranslated English words, one misspelling, grammar slips and misleading calques catalogued for the mandatory human pass before reviewed status.',
    'Dependency: no accepted G3 evidence exists; the advisory G3 run001 (revise) predates the current English bytes, which include its repairs (commit 93e6321). The bound English inputs were used as the comparison base per the parent\'s direction; a fresh G3 pass over the current English inputs is required before G5 can be more than advisory.',
  ].join(' '),
  notes: 'Severity vocabulary follows the evidence contract (blocking/uncertain/advisory); "blocking" here means must-repair-before-pass. Findings are advisory under ADR-0019 and no acceptance, tracker, translation_status or terminology-bank change has been performed by this review.',
};

const outPath = `${g5Dir}/agent-g5-gqur300-u1-run001.json`;
writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${rel(outPath)}`);
console.log(`criteria: ${criteria.map((c) => `${c.id}=${c.status}`).join(', ')}`);
console.log(`findings: ${findings.length} (${findings.filter((f) => f.severity === 'blocking').length} blocking, ${findings.filter((f) => f.severity === 'uncertain').length} uncertain, ${findings.filter((f) => f.severity === 'advisory').length} advisory)`);
console.log(`evidence files: ${Object.keys(evidence_manifest).length}`);
