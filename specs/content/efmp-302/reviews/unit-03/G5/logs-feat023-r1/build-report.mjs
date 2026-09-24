// G5 feat023-r1 report generator. Assembles agent-g5-efmp302-u3-feat023-r1.json
// with exact SHA-256 hashes over the saved evidence bytes.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const manifest = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G5/feat023-r1/manifest.json', 'utf8'));

const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03';
const EN = 'docs/semester-1/efmp-302/unit-03';

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      `Guide authority carries into the Urdu mirror: every guide leaf for 3.1-3.5 is taught in Urdu at the corresponding headings - ${UR}/topic-01.mdx ('مؤثر تدریس اور مؤثر استاد کی نئی تعریف', 'معلم کی افادیت کے اجزاء، اور ہر ایک کیا دکھا سکتا ہے اور کیا نہیں'), topic-02.mdx ('استاد کا تدریسی پیشے کی جانب رویہ', 'لباس اور آرائش بطور پیشہ ورانہ تاثر کے پہلو', 'مؤثر اساتذہ کی شخصی خصوصیات', 'شخصی خصوصیات کا معلم کی افادیت پر اثر'), topic-03.mdx ('شاگردوں، والدین، ساتھی اساتذہ اور برادری کے ساتھ مثبت تعلقات بنانا', 'پیشہ ورانہ رویہ برقرار رکھتے ہوئے تنازع کا انتظام'), topic-04.mdx ('جماعت میں زبانی ابلاغ', 'غیر زبانی ابلاغ: اس کی اقسام اور ان کا جماعتی استعمال'), topic-05.mdx ('استاد بطور سہولت کار اور بطور محقق', 'استاد بطور تبدیلی کا داعی اور بطور اخلاقی نمونہ', 'استاد بطور تاحیات سیکھنے والا') - and all six unit learning outcomes in ${UR}/index.mdx:44-56 are taught and assessed.`,
      `English dependency recorded as uncertain finding U-01: ADR-0019 blocks agent certification, so no accepted (signed) G3 evidence exists; the best available is the feat023 advisory chain (cycle-1 revise finding the b8f8ffe figure regression; cycle-2 PASS at specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json, all seven criteria). This run verified by digest (logs-feat023-r1/g3-dependency-check.log) that all 30 English-side inputs bound here - the 8 EN MDX files, _category_.json, course-overview.mdx and the 20 EN figure SVGs - are byte-identical to the G3 r2 binding, so no English bytes changed after that pass. The bound English inputs were used as the authoritative comparison base per the G-2026-65 course-wide pattern.`,
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      `Furlich (2016) scope verified faithful in Urdu: ${UR}/topic-04.mdx:117-124 carries the small-liberal-arts-university setting, the verbal-significant/non-verbal-not result ('زبانی فوری قربت کا محرک سے تعلق تو اہم پایا مگر غیر زبانی کا نہیں'), the no-sample-size/no-country instruction ('شائع شدہ خلاصہ نہ نمونے کی تعداد بتاتا ہے نہ ملک، چنانچہ دونوں کو غیر مذکور سمجھیے، چھوٹا یا امریکی نہیں'), neither study in a school/Pakistan/with children, best-available university evidence, and Class 7 magnitude claims unestablished; the Further reading annotation at :255-260 repeats all three elements; fig-U3-7.ur.svg's caption matches the English figure exactly.`,
      `The 93% caution and its practitioner's-heuristic replacement verified faithful: ${UR}/topic-04.mdx:126-140 (Mehrabian 1967 attitude experiments, 'اسے دہرائیے نہیں', the replacement claim descending from the same experiments, 'پیشہ ور کا قیاس... ثابت شدہ نہیں') and the unit summary at ${UR}/unit-assessment.mdx:44-46 and :200-206; MCQ 8's key annotation at :191-193 preserves the 'not disproved by Furlich' note ('وہ خالی نتیجہ فوری قربت اور محرک کے بارے میں تھا، ذرائع کے تضاد کے بارے میں نہیں').`,
      `Keelson (2024) scope verified faithful: 614 university students, Ghana, self-report questionnaire at ${UR}/topic-04.mdx:117-118 and the Further reading annotation at :261-264 (the English-side A-10 'Ghana from affiliation' caveat carries unchanged).`,
      `FAIL (finding B-02): ${UR}/topic-01.mdx:73-79 misreports the Taylor and Thion (2023) finding - 'inaccurate or merely implied definitions' is rendered 'غلط یا نہ صرف اشارہ شدہ تعریفیں' ('inaccurate or not-merely-implied'), inverting the cited finding; fig-U3-2.ur.svg renders the same finding correctly as 'غلط یا صرف اشارہ شدہ تعریفیں', proving the correct form was available.`,
      `FAIL (finding B-08): ${UR}/topic-03.mdx:205-209 garbles the goe2008 scope note's second half - 'which this topic's de-escalation sequence sets out as a reasoned default rather than a sourced finding' becomes 'جس کی ترتیب اس موضوع نے ایک منطقی ہے، کسی ماخذ سے حاصل کردہ دریافت کے طور پر نہیں' (the noun 'default' is dropped and the syntax breaks); the load-bearing first half ('یہ تنازع سنبھالنے پر بات نہیں کرتا') survives.`,
      `Unverifiable-source posture carried consistently: the Hurst/Reding, Brookfield and Suarez annotations are translated at ${UR}/topic-02.mdx:245-248 and topic-05.mdx:206-211, and the no-external-source sections (topic-03 conflict handling, topic-05 change/moral agent) carry no citation, exactly as sources/unit-03.md:41 asserts.`,
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      `All 13 sub-topics U3-01..U3-13 are taught in the Urdu mirror at headings matching coverage/unit-03.md's mappings (verified per topic file in the complete bilingual comparison); the five topics partition the checklist identically to the English.`,
      `Assessment coverage in Urdu matches the blueprint: MCQ 1-2/RRQ 1-2/ERQ 1 cover 3.1, MCQ 3-4/RRQ 3-4/ERQ 2 cover 3.2, MCQ 5-6/RRQ 5-6/ERQ 3 cover 3.3, MCQ 7-8/RRQ 7-8/ERQ 4 cover 3.4, MCQ 9-10/RRQ 9-10/ERQ 5 cover 3.5, verified against ${UR}/unit-assessment.mdx.`,
      `npm run check:depth-gate exit 0 (logs-feat023-r1/check-depth-gate.log): concept coverage, required blocks, formative floor, reading-minutes band and coverage-sources consistency over the bound inputs.`,
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `All 10 Urdu MCQs solved blind from Urdu alone before reading the supplied key: 1-ج, 2-الف, 3-ب, 4-د, 5-الف, 6-ج, 7-د, 8-ب, 9-الف, 10-د - identical to the supplied Urdu key (${UR}/unit-assessment.mdx:181-196) and to the English key (1-c, 2-a, 3-b, 4-d, 5-a, 6-c, 7-d, 8-b, 9-a, 10-d) with option order preserved (الف/ب/ج/د = a/b/c/d). No stem ambiguity introduced; no answer leaked by translation.`,
      `RRQ schemes match point-for-point and total 6+4+4+9+5+4+5+5+4+4 = 50 in both languages (${UR}/unit-assessment.mdx:200-242); the humour exception is preserved verbatim at :214-218 (full credit for 'aimed at a pupil' identified as inversion, 'اسے حد سے زیادتی نہ ہونے پر نمبر نہ کاٹیے').`,
      `ERQ rubrics match: five analytic rubrics, four criteria each at محدود/مناسب/مضبوط, the 10-cap for responses below Adequate on the analysis or evaluation criterion preserved at :246-247 and echoed in ${UR}/unit-teacher-notes.mdx:111-115; Bloom labels carried (یاد رکھنا/سمجھنا/اطلاق/تجزیہ/جائزہ/تخلیق) with no demand change (MCQ 9 remains genuine Apply; ERQ 4 remains تخلیق/Create).`,
      `Advisory surface nits recorded as finding A-U6 (MCQ 7 option الف stray 'میں' at :95; RRQ 6 stem agreement slip 'کسی حقائق میں' at :138) - neither changes answers, options, scoring or cognitive demand.`,
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      `render-inspect over the served two-locale build, Urdu route (logs-feat023-r1/render-inspect.log, renders-feat023-r1/render-inspect.json): desktop 1280x900, all 8 pages - no broken images, no missing alts, no skipped heading levels, no horizontal overflow; every figure served with a translated alt, light/dark pairs share an identical alt with exactly one displayed.`,
      `Narrow 360x780: document overflow 0px on all 8 pages; each figure is its own scroller (scroll 800-900 inside client 328) and the five ERQ rubric tables wrap within 328px (client=scroll=328, fits) - nothing unreachable; verified visually in renders-feat023-r1/p-narrow360-erq1-rubric-table.png and p-narrow360-mcq1-options.png.`,
      `A4 print 794px: clippedElems=0 on all 8 pages, every print figure fits, the full bank and the answers/marking guidance render unclipped (renders-feat023-r1/p-print-a4-mcq-key.png); print PDFs saved for all 8 pages.`,
      `Urdu figure geometry: node scripts/measure-figure-text.mjs exit 0 on all 20 Urdu variants (logs-feat023-r1/measure-figure-text.log); this run's own text-overlap instrument over the same 20 variants (logs-feat023-r1/fig-text-overlap-ur.log, negative-control validated) found zero real text-on-text overlaps - the single 1.2px bounding-box graze in fig-U3-4.ur.svg/.ur.dark.svg was resolved ink-free by pixel analysis (logs-feat023-r1/fig-U3-4-ur-ink-gap.log, ~2px clean gap at 1x).`,
      `Nastaliq legibility verified by reading rendered pages and close-ups (renders-feat023-r1/desktop-topic-04.png, p-urdu-close-topic01-goe.png, p-urdu-close-topic04-scope.png, p-urdu-close-mcq8.png).`,
    ],
  },
  {
    id: 'completeness',
    status: 'pass',
    evidence: [
      `Complete bilingual comparison across all eight file pairs (${EN}/ vs ${UR}/: index.mdx, topic-01..05.mdx, unit-assessment.mdx, unit-teacher-notes.mdx) - no omissions, no substantive additions, no heading-only stubs; the nine-part topic cycle, vignettes, activities, check-your-understanding, summaries, self-assessment checklists, practicum tasks, summative tasks, mini-rubrics and Further reading lists all have complete Urdu counterparts.`,
      `All 10 figures wired to .ur.svg variants in the Urdu topic files; all 20 Urdu figure variants committed and served - build/img/figures/efmp-302/unit-03/ hash-matches static/ 40/40 (logs-feat023-r1/site-build.log).`,
      `Translation-unit structural elements present: UR key_terms block in index.mdx:12-18, translation_status draft in all eight files matching the English, Further reading citations kept in English with translated annotations.`,
    ],
  },
  {
    id: 'semantics',
    status: 'fail',
    evidence: [
      `FAIL (finding B-01): ${UR}/topic-02.mdx:189-190 - the summary inverts the English and the Urdu body. EN topic-02.mdx:190-191 'enthusiasm more often follows competence than precedes it' is correctly rendered at ${UR}/topic-02.mdx:61-62 ('جوش، جہاں آتا ہے، عموماً مہارت کے پیچھے آتا ہے، آگے نہیں') but the summary says 'جوش عموماً مہارت کے آگے آتا ہے، پیچھے نہیں' (enthusiasm usually comes BEFORE competence, not after).`,
      `FAIL (finding B-03): ${UR}/topic-01.mdx:123-124 renders 'feels objective' (EN topic-01.mdx:120-121) as 'موضوعی لگتا ہے' - in standard Urdu academic usage موضوعی means subjective (معروضی = objective), so the sentence reads as 'a number that feels subjective and hides every judgement', inverting the passage's rhetoric.`,
      `FAIL (finding B-05): ${UR}/topic-05.mdx:80-83 flips the communication direction - EN 'a way of ensuring nobody listens to you for two years' becomes 'کسی کو آپ کو سنانے سے روکنے کا طریقہ' (stopping anyone from telling you); the assessment key renders the same point correctly at ${UR}/unit-assessment.mdx:240-241 ('تنقید نہ سنی جائے').`,
      `FAIL (finding B-06): ${UR}/topic-05.mdx:85-86 drops 'intended' - EN 'and that this happens whether or not it is intended' becomes the tautology 'اور یہ چاہے بھی ہو یا نہ ہو، ہوتی ہے'.`,
      `FAIL (finding B-07): ${UR}/topic-02.mdx:131-132 garbles EN 'every lesson is improvised' as 'ہر سبق مہارت سے ہوا ہوا ہے' (reads as 'every lesson is done with skill'), breaking the adaptability failure-mode sentence that RRQ 4 assesses.`,
      `Also failing under sources (finding B-02): ${UR}/topic-01.mdx:74-75 inverts the Taylor and Thion reported finding.`,
      `Verified faithful with no material divergence: all quantities, dates and comparisons (614, 93%, 1967, 2008/2016/2017/2022/2023/2024, first four seconds, four situations, three weeks, 25/30 minutes, 400-450 and 450-500 words, 10/20 cap, seven traits, five roles, four decision points, Class 5/6/7/8, sixty pupils, eleven years, four situations); negation and modal force in the epistemic-honesty passages (the Furlich scope paragraph, the 93% caution, the practitioner's-heuristic passage, Keelson scope) survive exactly; pronoun references resolve; instructional sequences (activity steps, de-escalation order, rubric progressions) are intact.`,
    ],
  },
  {
    id: 'terminology',
    status: 'fail',
    evidence: [
      `key_terms block bank-accepted: ${UR}/index.mdx:12-18 carries Teacher Effectiveness/معلم کی افادیت, Verbal Communication/زبانی ابلاغ, Non-verbal Communication/غیر زبانی ابلاغ - all three at specs/content/terminology.csv:111-113.`,
      `Bank terms honored in prose: Assessment/تشخیص, Attitude/رویہ, Personality/شخصیت, Self-Assessment/خود جائزہ (accepted pair), Rubric/معیارِ جانچ, Summative Assessment/مجموعی جائزہ (accepted pair), Motivation/محرک.`,
      `The 17 authored concept labels (specs/content/efmp-302/concepts/unit-03.md:17-36) confirmed fit for use: each matches the unit's own Urdu prose and figure labels (CON-3-2/3/4 definitions, CON-3-5/6, CON-3-7, CON-3-8, CON-3-9, CON-3-10, CON-3-11, CON-3-12, CON-3-13, CON-3-15, CON-3-17, CON-3-18, CON-3-19, CON-3-20); nuances flagged for the owner as finding A-U4 (moral agent -> اخلاقی نمونہ 'exemplar' and change agent -> تبدیلی کا داعی 'advocate'; CON-3-5 flattens 'processes' to عوامل).`,
      `FAIL (finding A-U2 items): 'high-stakes appraisal' rendered 'اعلیٰ دہشت کے جائزے' (${UR}/topic-01.mdx:125-126) - دہشت means terror, not stakes; 'professionalism' rendered 'پیشہ ورانہ رویہ' at the load-bearing sites (index.mdx:52, topic-03.mdx:3 and :78, topic-02.mdx:246) while the bank's draft term - spelled پیشہ وریت in the CSV but پیشہ واریت in the human-reviewed Unit 1 mirror this index also uses at index.mdx:60 - appears only there; 'mentor' rendered 'سرپرست' in the topic files but 'سربراہ استاد' (head teacher, wrong referent) in ${UR}/unit-teacher-notes.mdx:68.`,
    ],
  },
  {
    id: 'register',
    status: 'fail',
    evidence: [
      `The register is broadly academic-plain (درسی مگر عام فہم) and an entering B.Ed student can follow the unit, but the mirror carries a cluster of surface garbles that trip the reader - finding A-U1: index.mdx:30 'جتنا سنتا ہے' (for جتنا لگتا ہے); topic-02.mdx:127 'کوشائے' (کوشش) and :172 'غبط' (غائب); topic-03.mdx:166 'غرب مقصد' (خراب مقصد); topic-04.mdx:188 'دونوز' (دونوں) and :198 'پہچاننے یوگ' (پہچاننے کے قابل); topic-05.mdx:47 'سجھاتا' (سجاتا) and :171 'تبدیلا داعی' (تبدیلی کا داعی); unit-teacher-notes.mdx:54 'لے گا آئے گا' (لے کر آئے گا) and :66 'مشاہہ' (مشاہدہ).`,
      `Recurring grammar slips (finding A-U3): 'اوپر کا شکل' for feminine شکل (topic-01.mdx:97, topic-03.mdx:41 and :85, topic-04.mdx:80); 'کیا سبق کا کوئی منزل' (topic-01.mdx:105); 'اس کی میکانزم' (topic-02.mdx:240); 'کسی حقائق میں' (unit-assessment.mdx:138).`,
      `Calque-ish renderings a student must decode (finding A-U3): 'مقابلہ بازی تعریفیں/بیانات/تصورات' for competing definitions/accounts/conceptions (used consistently), 'کارآمد دوبارہ ترتیب' for useful reframing, 'مطالعہ کیس' for case study, 'پیداواری فریمنگ' for productive framing, 'صاف اور کھرا علاج' for frank treatment.`,
      `Embedded Latin words where the unit's own Urdu equivalents are used elsewhere (finding A-U3): 'conclusion' (topic-04.mdx:133) vs نتیجہ elsewhere; 'assignment' (topic-04.mdx:140, unit-teacher-notes.mdx:55); 'paraphrase' (topic-04.mdx:248); 'fail' (topic-01.mdx:35, topic-03.mdx:26) - comprehensible in Pakistani mixed usage but inconsistent.`,
    ],
  },
  {
    id: 'rtl',
    status: 'pass',
    evidence: [
      `fig-U3-6.ur.svg is geometrically mirrored for RTL: start box x=650 (right), decision boxes x=360, outcome boxes x=30 (left) versus the English 30/290/640 - the de-escalation flow reads right to left, per the style-guide v4.1 mirroring rule; all 29 text labels match the English content.`,
      `fig-U3-9.ur.svg stations reversed for RTL: 780/570/360/140 (منتقل کرنے والا transmitter at right, حال present at left) versus the English 120/330/540/760; the closing captions match, including the carried A-04 'تینوں' (three) count.`,
      `Bidi punctuation verified in rendered close-ups: 'Goe، Bell اور Little (2008)' with the Urdu comma and intact parenthesised year (renders-feat023-r1/p-urdu-close-topic01-goe.png); 'Furlich (2016)' and '614' inside RTL lines (p-urdu-close-topic04-scope.png); '93 فیصد' and 'Furlich' inside MCQ options (p-urdu-close-mcq8.png).`,
      `RTL table order correct at 360px - criterion column rightmost, cells wrapping within the viewport (renders-feat023-r1/p-narrow360-erq1-rubric-table.png); MCQ option markers الف/ب/ج/د hang correctly on the right (p-narrow360-mcq1-options.png); document overflow 0px on all 8 pages.`,
      `Nastaliq legible at 1280x900, 360x780 and in print media; nothing clipped at A4 (logs-feat023-r1/render-inspect.log sections A-D, zero defects).`,
    ],
  },
];

const findings = [
  { severity: 'blocking', resolved: false, message: `B-01 (semantics). ${UR}/topic-02.mdx:189-190 - the topic summary inverts the claim it summarises. EN topic-02.mdx:190-191: 'enthusiasm more often follows competence than precedes it'; the Urdu body renders this correctly at ${UR}/topic-02.mdx:61-62 ('جوش، جہاں آتا ہے، عموماً مہارت کے پیچھے آتا ہے، آگے نہیں') but the summary reads 'جوش عموماً مہارت کے آگے آتا ہے، پیچھے نہیں' - enthusiasm usually comes BEFORE competence, not after. A student revising from the summary learns the opposite of the topic. REPAIR: swap to 'مہارت کے پیچھے آتا ہے، آگے نہیں' (and mirror the same fix in the built page).` },
  { severity: 'blocking', resolved: false, message: `B-02 (sources/semantics). ${UR}/topic-01.mdx:74-75 misreports the cited Taylor and Thion (2023) finding. EN topic-01.mdx:72-74: 'many papers using inaccurate or merely implied definitions'; the Urdu renders 'جو غلط یا نہ صرف اشارہ شدہ تعریفیں استعمال کرتے تھے' - 'نہ صرف' means 'not only', so the sentence says the papers used definitions that were inaccurate or NOT merely implied, inverting the finding. fig-U3-2.ur.svg renders the same finding correctly ('غلط یا صرف اشارہ شدہ تعریفیں استعمال کرتے ہیں'), proving the correct form was available. REPAIR: delete the stray 'نہ' (or rephrase as 'محض مضمر تعریفیں').` },
  { severity: 'blocking', resolved: false, message: `B-03 (semantics). ${UR}/topic-01.mdx:123-124 renders 'feels objective' as 'موضوعی لگتا ہے'. In standard Urdu academic usage موضوعی means subjective (معروض / معروضی = object / objective), so the sentence as written says the aggregate number 'feels subjective' while hiding every judgement - inverting the passage's rhetoric (the number deceptively feels objective). Even under the looser colloquial usage where موضوعی is sometimes misread as objective, the word choice is ambiguous at exactly the point the sentence depends on. REPAIR: 'معروضی لگتا ہے' (or 'ایسا لگتا ہے جیسے پرکھا ہوا ہو').` },
  { severity: 'blocking', resolved: false, message: `B-04 (semantics/instructional sequence). ${UR}/unit-teacher-notes.mdx:65 renders 'Three practicum tasks in this unit involve observing a serving teacher' as 'تین پریکٹیکم سرگرمیاں کسی فرضی استاد کے مشاہدے سے جڑی ہیں' - فرضی means fictional/imaginary, so the notes tell the teacher the tasks involve observing a hypothetical teacher, contradicting the correctly-translated tasks themselves (topic-01.mdx:195 'آپ کے پریکٹیکم اسکول کے اساتذہ کا اصل میں جائزہ کیسے لیا جاتا ہے'). REPAIR: 'کسی زیرِ خدمت استاد کے مشاہدے'.` },
  { severity: 'blocking', resolved: false, message: `B-05 (semantics). ${UR}/topic-05.mdx:82 flips the communication direction in the change-agent failure mode. EN topic-05.mdx:83-84: 'it is a way of ensuring nobody listens to you for two years'; the Urdu reads 'یہ دو سال تک کسی کو آپ کو سنانے سے روکنے کا طریقہ ہے' - سنانا is the causative 'to tell', so as written it says a way of stopping anyone from TELLING you (if سنانے is a slip for سننے the meaning is right, but the committed text is the causative). The assessment key renders the same point correctly at ${UR}/unit-assessment.mdx:240-241 ('تنقید لے کر آنا یقینی بناتا ہے کہ تنقید نہ سنی جائے'), so the unit contradicts itself. REPAIR: 'کسی کا آپ کو سننا بند کرنے کا طریقہ' (or fix سنانے to سننے).` },
  { severity: 'blocking', resolved: false, message: `B-06 (semantics). ${UR}/topic-05.mdx:85-86 drops the intention clause from the moral-agent definition. EN topic-05.mdx:87-88: 'teaching forms people, and that this happens whether or not it is intended'; the Urdu reads 'تدریس لوگوں کو ڈھالتی ہے، اور یہ چاہے بھی ہو یا نہ ہو، ہوتی ہے' - the ارادہ (intention) concept is missing and the clause becomes the tautology 'whether it happens or not, it happens'. The unintended-formation point is what the role's deliberateness (شعور/چننا) is contrasted against. REPAIR: 'چاہے ارادہ ہو یا نہ ہو، یہ ہوتی ہے'.` },
  { severity: 'blocking', resolved: false, message: `B-07 (semantics). ${UR}/topic-02.mdx:131-132 garbles the adaptability failure mode. EN topic-02.mdx:131-132: 'a class that never experiences a sequence because every lesson is improvised'; the Urdu reads 'ایسی جماعت جو کبھی کوئی ترتیب نہیں دیکھتی کیونکہ ہر سبق مہارت سے ہوا ہوا ہے' - 'مہارت سے ہوا ہوا' reads as 'done with skill', so the causal link (no sequence BECAUSE lessons are unplanned) breaks. This is assessed content (RRQ 4; the trait list). REPAIR: 'کیونکہ ہر سبق بغیر تیاری کیے اسی وقت بنایا جاتا ہے' or similar rendering of 'improvised'.` },
  { severity: 'blocking', resolved: false, message: `B-08 (sources). ${UR}/topic-03.mdx:207-208 garbles the goe2008 scope note's epistemic status. EN topic-03.mdx:208-211: 'It does not address conflict handling, which this topic's de-escalation sequence sets out as a reasoned default rather than a sourced finding'; the Urdu renders the second half as 'جس کی ترتیب اس موضوع نے ایک منطقی ہے، کسی ماخذ سے حاصل کردہ دریافت کے طور پر نہیں' - the noun 'default' is dropped, 'ایک منطقی ہے' dangles, and the sentence is ungrammatical. The 'not a sourced finding' hedge survives only as a fragment. REPAIR: restore the full contrast, e.g. 'جس کی ترتیب یہ موضوع ایک منطقی طور پر منتخب کردہ ابتدائی راستہ کے طور پر دیتا ہے، کسی ماخذ سے حاصل کردہ دریافت کے طور پر نہیں'.` },
  { severity: 'uncertain', resolved: false, message: `U-01 (authority; the G3 dependency, G-2026-65 pattern). The G5 rubric requires accepted G3 evidence for the exact English inputs, but ADR-0019 blocks agent certification, so no signed G3 evidence exists in specs/reviewers/registry.json. The best available G3 evidence is the feat023 advisory chain: cycle 1 (agent-g3-efmp302-u3-feat023-r1.json) found the course-wide b8f8ffe figure regression, and cycle 2 (agent-g3-efmp302-u3-feat023-r2.json, cited as this report's g3_report) passed all seven criteria after the 69bae9e revert, with the repair verified four independent ways. This run verified by digest (logs-feat023-r1/g3-dependency-check.log) that all 30 English-side inputs bound to this G5 review are byte-identical to the G3 r2 binding - unlike Unit 2, no English bytes changed after that pass - so the advisory pass covers the exact English comparison base used here. Proceeded with the bound English inputs as the authoritative comparison base and recorded the dependency rather than aborting, per the course-wide G-2026-65 pattern. OWNER DECISION NEEDED (per G-2026-65): accept the advisory chain as sufficient for the G5 stage, or commission fresh G3 passes over the current English inputs, before any G5 tracker row is treated as more than advisory.` },
  { severity: 'advisory', resolved: false, message: `A-U1 (register). Typo/garble cluster, each tripping a reader at an otherwise clean passage - index.mdx:30 'جتنا سنتا ہے' (جتنا لگتا ہے, 'than it sounds'); topic-02.mdx:127 'کوشائے' (کوشش); topic-02.mdx:172 'غبط' (غائب); topic-03.mdx:166 'غرب مقصد' (خراب مقصد); topic-04.mdx:188 'دونوز' (دونوں); topic-04.mdx:198 'پہچاننے یوگ' (پہچاننے کے قابل); topic-05.mdx:47 'سجھاتا' (سجاتا - the summary at topic-05.mdx:152 spells it correctly); topic-05.mdx:171 'تبدیلا داعی' (تبدیلی کا داعی); unit-teacher-notes.mdx:54 'لے گا آئے گا' (لے کر آئے گا); unit-teacher-notes.mdx:66 'مشاہہ' (مشاہدہ). REPAIR: fix each word; all are single-word corrections.` },
  { severity: 'advisory', resolved: false, message: `A-U2 (terminology). Drift and calque items for the repair cycle: (a) 'high-stakes appraisal' -> 'اعلیٰ دہشت کے جائزے' (topic-01.mdx:125-126) - دہشت means terror; use 'زیادہ داؤ کے جائزے' or 'بھاری نتائج والے جائزے'. (b) 'professionalism' -> 'پیشہ ورانہ رویہ' at index.mdx:52, topic-03.mdx:3 and :78, topic-02.mdx:246, while the bank draft term (پیشہ وریت in the CSV; پیشہ واریت as used by the human-reviewed Unit 1 mirror and at index.mdx:60) appears only once - align on one form; the bank spelling itself should be reconciled with Unit 1's پیشہ واریت at its scheduled human review. (c) 'mentor' -> 'سرپرست' in the topic files but 'سربراہ استاد' (head teacher) at unit-teacher-notes.mdx:68 - wrong referent; use 'سرپرست استاد' consistently. (d) 'بے ترتیب' is overloaded for unbalanced (topic-02), unpredictable (topic-03) and inconsistent handling (topic-03) - consider غیر متوازن/غیر متوقع/غیر یکساں. (e) 'self-report' -> 'خودنمائی' (topic-04.mdx:117, :264) reads as 'showing off'; 'خود اطلاتی' is the standard research term. (f) 'evidence' -> 'شہادت' throughout - consistent but legal-flavoured; شواہد is the usual research register (owner preference).` },
  { severity: 'advisory', resolved: false, message: `A-U3 (register). Grammar slips and calque-ish phrasings: 'اوپر کا شکل' for feminine شکل (topic-01.mdx:97, topic-03.mdx:41 and :85, topic-04.mdx:80 - 'اوپر کی شکل'); 'کیا سبق کا کوئی منزل' (topic-01.mdx:105 - کی منزل); 'اس کی میکانزم' (topic-02.mdx:240 - اس کا میکانزم); 'کسی حقائق میں' (unit-assessment.mdx:138 - کسی حقیقت میں); 'مقابلہ بازی' for 'competing' (consistent but a calque - متضاد/متنازع would read more naturally); 'کارآمد دوبارہ ترتیب' for 'useful reframing'; 'مطالعہ کیس' for 'case study' (کیس اسٹڈی is the common Pakistani form); 'پیداواری فریمنگ' for 'productive framing'; 'صاف اور کھرا علاج' for 'frank treatment'; 'تاثر' for 'feedback' at topic-03.mdx:53 (رائے/بازگشت); 'پس منظر کا فائدہ' for 'benefit of hindsight' at topic-02.mdx:241; embedded Latin 'conclusion'/'assignment'/'paraphrase'/'fail' where the unit's own Urdu equivalents (نتیجہ، کام، خلاصہ، ناکام) are used elsewhere. None blocks comprehension; all are one-phrase repairs.` },
  { severity: 'advisory', resolved: false, message: `A-U4 (terminology, owner decision). The 17 authored concept labels are confirmed fit for use (each matches the unit's own prose, figures and assessment), with two nuances the owner should weigh before promoting them into terminology.csv per concepts/unit-03.md:38-45: (a) 'moral agent' -> 'اخلاقی نمونہ' (moral exemplar) - the English distinguishes the Unit 2 ground (a teacher IS an ethical model) from the role (agent: recognises formation and chooses deliberately); the Urdu uses one term for both, flattening the passive-model/active-agent distinction, though the definitions carry the content. (b) 'change agent' -> 'تبدیلی کا داعی' (advocate of change) - an agent effects change, a داعی calls for it; the definition ('اپنے کمرے سے باہر کچھ بہتر کرتا ہے') supplies the acting sense. Also CON-3-5 'Within-classroom processes' -> 'جماعت کے اندر کے عوامل' uses the same word as CON-3-6 'factors beyond the classroom', while fig-U3-2's own caption uses عملوں (processes) - consider 'جماعت کے اندر کے عمل'.` },
  { severity: 'advisory', resolved: false, message: `A-U5 (carried English-side advisories, faithfully mirrored). The G3 feat023-r2 carried advisories now affect the Urdu reader identically because the Urdu mirrors the English faithfully at each site: A-02 (fig-U3-3's resilience overdone cell 'جو بتانا چاہیے تھا اسے سہتا ہے' diverges from the prose's stubbornness failure mode that RRQ 4 scores); A-03 (fig-U3-5's link labels give instances where the prose and RRQ 5 require purposes - only the pupils link matches); A-04 (fig-U3-9's closing caption count 'تینوں' fits no counting of the timeline); A-06 (MCQ option-length cue - the key is the longest option on items 5-8, visible in the Urdu MCQ 8 close-up); A-09 (Hurst/Reding and Brookfield point-of-use attributions beyond the bound excerpts, and U3-11's nominal grounding); A-10 (Keelson 'Ghana' from affiliation); A-11 (the Goe reuse-direction paraphrase, in the same sentence as the دہشت term); A-13 ('immediacy' -> 'فوری قربت' has no glossary entry); A-N3 (bare-URL link text on the Further reading lists). None is a translation defect; listed so the Urdu repair cycle can consider them with the English.` },
  { severity: 'advisory', resolved: false, message: `A-U6 (assessment surface nits, no effect on answers or scoring): MCQ 7 option الف carries a stray 'میں' ('الف) میں زیادہ وقت لیتا ہے', unit-assessment.mdx:95); RRQ 6 stem has the agreement slip 'کسی حقائق میں' (:138); MCQ 10's key annotation renders 'skipped transmission, not surpassed it' as 'اسے پار کر لیا ہے' (:195-196), which is comprehensible but looser than the English contrast.` },
  { severity: 'advisory', resolved: false, message: `A-U7 (figures, no repair required). fig-U3-4.ur.svg and fig-U3-4.ur.dark.svg have a marginal 1.2px bounding-box graze between the left-side annotation header 'طرزِ عمل' and its own 'پیغام: میرے پاس آنا محفوظ ہے' line; pixel-level analysis (logs-feat023-r1/fig-U3-4-ur-ink-gap.log) shows a clean ~2px ink-free gap at 1x, so the glyphs do not touch. The English original at the same 16px baseline pitch measured clean; the Urdu Nastaliq line boxes are simply taller. Recorded for the figure author in case the annotation stack is revisited.` },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/validate-content.log' },
  { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/check-depth-gate.log' },
  { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/check-figures.log' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/check-no-em-dash.log' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/check-no-answer-keys.log' },
  { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/check-docs-sync.log' },
  { name: 'site-build', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/site-build.log' },
  { name: 'render-review', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/render-inspect.log' },
  { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/measure-figure-text.log' },
  { name: 'fig-text-overlap-ur', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/fig-text-overlap-ur.log' },
  { name: 'verify-inputs', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/verify-inputs.log' },
  { name: 'g3-dependency-check', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/g3-dependency-check.log' },
  { name: 'targeted-shots', exit_code: 1, log_path: 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/targeted-shots.log' },
];

const evidenceManifest = {};
const addDir = (dir) => {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    if (f.isDirectory()) continue;
    const rel = `${dir}/${f.name}`;
    evidenceManifest[rel] = digest(rel);
  }
};
addDir('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1');
addDir('specs/content/efmp-302/reviews/unit-03/G5/renders-feat023-r1');

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 3,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:86ce1dd',
  reviewer_run_id: 'agent-g5-efmp302-u3-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T20:16:08Z',
  completed_at: '2026-09-24T21:14:56Z',
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json',
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidenceManifest,
  summary: `Fresh G5 Urdu review of EFMP-302 Unit 3 under feature 023, cycle 1, binding current bytes at commit 86ce1dd against the prepared feat023-r1 manifest (all 140 inputs digest-verified via the contract library recompute). Disposition revise. Six of ten criteria pass: authority (all guide leaves and outcomes taught and assessed in Urdu; the English comparison base verified byte-identical to the advisory G3 cycle-2 pass by digest, with the missing accepted-G3 dependency recorded as uncertain finding U-01 in the G-2026-65 pattern), coverage, assessment (all 10 Urdu MCQs solved blind and matching the English key with option order preserved; RRQ schemes 50/50 with the humour exception intact; ERQ 10-cap preserved; no leaks), accessibility, completeness and rtl (flowchart geometrically mirrored right-to-left, timeline stations reversed, bidi punctuation and RTL table order verified in rendered close-ups, Nastaliq legible, narrow and print clean). Four criteria fail on actionable Urdu defects: semantics (B-01 the topic-02 summary inverts the enthusiasm/competence order against both the English and the Urdu body; B-03 objective rendered موضوعی which standardly means subjective; B-05 the nobody-listens-to-you direction flipped; B-06 the whether-or-not-intended clause collapsed to a tautology; B-07 improvised garbled as done-with-skill), sources (B-02 the Taylor and Thion finding inverted by a stray نہ, with fig-U3-2 proving the correct rendering; B-08 the goe2008 scope note garbled), terminology (high-stakes rendered as terror; professionalism rendered two ways against the bank draft term; mentor given a head-teacher referent in the teacher notes) and register (a ten-instance typo/garble cluster plus recurring grammar slips and calques). The epistemic-honesty passages the submission depends on - the Furlich scope paragraph, the 93% caution, the practitioner's-heuristic replacement and the Keelson scope - all survive translation exactly, in prose, figures and the assessment key. All six deterministic gates, measure-figure-text and the render inspection exit 0; this run's own text-overlap instrument over the 20 Urdu figure variants, validated by a synthetic negative control, found zero real overlaps (one marginal bbox graze in fig-U3-4 proven ink-free by pixel analysis). Advisory only: no signing, no registry or tracker change, translation_status stays draft; the row remains the parent and owner action.`,
};

const out = 'specs/content/efmp-302/reviews/unit-03/G5/agent-g5-efmp302-u3-feat023-r1.json';
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${out}`);
console.log(`criteria: ${criteria.map((c) => `${c.id}=${c.status}`).join(', ')}`);
console.log(`findings: ${findings.filter((f) => f.severity === 'blocking').length} blocking, ${findings.filter((f) => f.severity === 'uncertain').length} uncertain, ${findings.filter((f) => f.severity === 'advisory').length} advisory`);
console.log(`evidence files: ${Object.keys(evidenceManifest).length}`);
