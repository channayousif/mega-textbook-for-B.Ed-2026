// Assembles the G5 report for GNAS-301 Unit 1, run agent:g5-reviewer:gnas301-u1-run001.
// Binds the prepared manifest's input digests (the state actually reviewed) and hashes
// the saved evidence bytes. Content of findings/criteria authored by the reviewer.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const ROOT = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-a8eefd2fc607a93b9';
const G5 = path.join(ROOT, 'specs/content/gnas-301/reviews/unit-01/G5');
const LOGS = path.join(G5, 'logs-20260924T043310Z');
const RENDERS = path.join(G5, 'renders-20260924T043310Z');
const manifest = JSON.parse(readFileSync(path.join(G5, 'manifest.json'), 'utf8'));

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const evidence = {};
for (const dir of [LOGS, RENDERS]) {
  for (const name of readdirSync(dir)) {
    const abs = path.join(dir, name);
    if (statSync(abs).isFile()) evidence[path.relative(ROOT, abs)] = sha(abs);
  }
}

const EN = 'docs/semester-1/gnas-301/unit-01';
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01';

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 1,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:019-author-gnas-301',
  reviewer_run_id: 'agent:g5-reviewer:gnas301-u1-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T04:15:00Z',
  completed_at: '2026-09-24T06:45:00Z',
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/gnas-301/reviews/unit-01/G3/round-02/20260923T214406Z-g3-attempt-02.json',
  rulings: { 'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f' },
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'specs/content/gnas-301/tasks.md:19 - Unit 1 G3 en-review row is not done: advisory rounds 1-2 both revise, round-2 blocking finding repaired post-report, two-cycle limit reached, third cycle owner-gated (G-2026-24)',
        'specs/content/gnas-301/reviews/unit-01/G3/round-02/20260923T214406Z-g3-attempt-02.json - last G3 report, disposition revise, 1 unresolved blocking finding (mangrove ranking excerpt) + 6 unresolved advisories; completed 2026-09-23T21:44:06Z',
        'Digest comparison: the G3 round-02 manifest bound EN topic-01 54d7b6d0..., topic-02 b43ff8da..., topic-03 986d142d..., topic-04 51d424f4..., unit-teacher-notes cdddd010...; this G5 manifest binds 956f576d..., da443cdb..., 24851ea6..., 33cf6d91..., e3f4ceab... - 5 of 7 English files changed after the last G3 report (round-2 repairs committed bee775c post-report, never re-reviewed at G3)',
        'specs/gaps.md G-2026-24 (Unit 1 G3 two-cycle limit, owner-gated third cycle) and G-2026-28 (parallel Unit 2 G5 stale-dependency escalation explicitly extending the same dependency question to Units 1, 4, 5 and 6)',
        'Course identity itself verified: catalog/courses.json GNAS-301 entry and docs/semester-1/gnas-301/course-overview.mdx are not bilingual:false, so G5 is applicable; Urdu unit exists in full',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        '99 per cent claim: UR topic-01.mdx:38 "99 فیصد" matches EN topic-01.mdx:55-57 and bound excerpt specs/content/gnas-301/sources/texts/who-air-2024.md:14',
        '3.6 billion susceptibility: UR topic-02.mdx:46 "3.6 ارب" matches EN topic-02.mdx:76-78 and who-climate-2023.md:13',
        'One million species and 35 per cent wetlands and the services list: UR topic-03.mdx:36,40 match EN topic-03.mdx:60-62,70-72 and who-biodiversity-2025.md:13-18',
        'Over 2 billion water-stressed: UR topic-03.mdx:57 "2 ارب سے زیادہ" matches EN topic-03.mdx:112-114 and who-water-2023.md:14 (correctly bound to who-water-2023, not who-climate-2023)',
        'Fifth-largest mangrove forest: UR topic-03.mdx:34 matches EN topic-03.mdx:51-53 and abbas2012.md:22-23 (excerpt sentence bound at the current commit; note this binding was the G3 round-2 blocking repair applied post-report without G3 re-review)',
        'UN Decade revive/urgency and 2021-2030 frame: UR topic-02.mdx:40 and topic-03.mdx:42 match un-restoration-2021.md:11,13',
        'Archer Indus sustainability framing: UR topic-03.mdx:51 matches archer2010.md:16-18',
        'Unverifiable print sources (haines-frumkin, clark-henderson) cited by reference only in both locales and declared under specs/content/gnas-301/sources/unit-01.md "Unverifiable sources" with owner ruling D-2026-0001 - does not block per the G3/G5 unavailable-source rule',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 7 English files have complete Urdu mirrors with matching section structure: index (5 sections), topic-01..04 (each: classroom situation, explanation with subsections, activity, check understanding, summary, self-assessment, practicum, summative task + mini-rubric, further reading), unit-assessment (unit summary, 10 MCQ + 10 RRQ + 5 ERQ bank, answers and marking guidance with all model answers and mark schemes), unit-teacher-notes (5 sections)',
        'All 7 unit learning outcomes (EN index.mdx:31-39 = UR index.mdx:29-35) are taught across topics 1.1-1.4 and assessed in the mirrored 10/10/5 bank',
        'All 8 figure carriers mirrored with .ur.svg variants, 2 per topic, alt text translated (figure manifest specs/content/gnas-301/figures/unit-01.md all placed)',
        'Minor deviations recorded as advisory findings: one further-reading addition (UR topic-01.mdx:105) and omissions listed under completeness',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'MCQ equivalence verified: all 10 items present, option order preserved (a/b/c/d mapped to الف/ب/ج/د), independently answered from the Urdu before reading the key: 1-ب 2-ج 3-الف 4-د 5-ج 6-ب 7-ب 8-د 9-الف 10-الف, matching the supplied key at UR unit-assessment.mdx:113-122 and EN :148-163; no answer leaked by translation; cognitive labels preserved',
        'RRQ/ERQ equivalence verified: all 10 RRQs and 5 ERQs mirrored with same constraints (word counts 150-200/180-220, sentence limits) and Bloom labels; RRQ model answers and mark schemes mirrored with identical mark allocations; ERQ analytic rubrics mirrored with identical point splits (0-3/0-2/0-3/0-2 etc., totals 10 each)',
        'FAIL cause: the topic-01 summative task instruction is inverted in Urdu - EN topic-01.mdx:153 "explain what the colleague is missing" is rendered UR topic-01.mdx:91 as "وضاحت کریں کہ ساتھی کیا نظر رکھ رہا ہے" (explain what the colleague is keeping an eye on) - a changed task meaning (blocking finding)',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Alt text present and translated on all 8 Urdu figure carriers (UR topic-01.mdx:36,53; topic-02.mdx:36,50; topic-03.mdx:38,53; topic-04.mdx:36,44)',
        'Heading hierarchy mirrors English exactly in all 7 files; semantic headings h1/h2/h3 verified in renders',
        'renders-20260924T043310Z/render-inspect.json: dir=rtl and lang=ur on all 7 pages, zero horizontal overflow at 1280px and 360px, no clipped elements detected, markdown tables render direction rtl with 5 rows',
        'renders-20260924T043310Z/font-bidi-check.json: Noto Nastaliq Urdu webfont loaded (document.fonts check true) for page prose; bidi handling of embedded numerals (99 فیصد) and transliterations (اے کیو آئی، ڈبلیو ایچ او) verified in rendered prose',
        'A4 print views captured with print media emulation (print-a4-topic-01.png, print-a4-unit-assessment.png, print-a4-unit-teacher-notes.png); print stylesheet preserves RTL and Nastaliq line-height (src/css/custom.css:415-455) and prints the light figure variant',
      ],
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        'Addition: UR topic-01.mdx:105 adds a WHO Ambient air pollution (2024) further-reading item that EN topic-01.mdx:165-170 does not carry (EN has 2 items, UR has 3)',
        'Omission of normative force: EN index.mdx:43-44 "No prior biology or geography beyond HSC is assumed, and none may be assumed" - UR index.mdx:39 drops "and none may be assumed"',
        'Further-reading descriptive clauses dropped: EN topic-02.mdx:163-166 and topic-03.mdx:190-191 annotation clauses absent from UR topic-02.mdx:99-100 and topic-03.mdx:102; EN topic-04.mdx:142-143 "everyone plays a part" framing note absent from UR topic-04.mdx:93',
        'Citation title shortened: UR topic-03.mdx:105 Archer entry drops "under changing climatic and socio economic conditions" from the article title that EN topic-03.mdx:186-188 carries',
        'No heading-only stubs found; all sections carry full parallel prose; teacher notes substantively complete (line-count difference is paragraph packing, verified section by section)',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'BLOCKING: topic-01 summative task instruction inverted - EN topic-01.mdx:153 "explain what the colleague is missing" vs UR topic-01.mdx:91 "کیا نظر رکھ رہا ہے" (what the colleague is watching); نظر رکھنا means to keep watch, not to overlook',
        'canal rendered as drain: EN topic-01.mdx:54-55 "explain why a canal smells" vs UR topic-01.mdx:38 "نالی کیوں بدبو دیتا ہے" - نالی is a drain/gutter, the canal is نہر (the translator renders EN "drain" correctly as نالی at topic-04.mdx:46, so the referent changed here)',
        'wading in the shallows rendered as walking at a height: EN topic-03.mdx:25-26 vs UR topic-03.mdx:24 "پرندوں کو اونچائی میں چلتے" - should be e.g. اتھلے پانی میں چلتے ہوئے',
        'culture rendered as سباق (lesson/race): EN topic-04.mdx:78-79 vs UR topic-04.mdx:48 "وہ سباق جو ڈھیر برداشت کرتا ہے" - should be ثقافت',
        'the Indus rendered as سندھ (the province) at UR topic-01.mdx:99, topic-03.mdx:48,51, unit-assessment.mdx:139, unit-teacher-notes.mdx:35 - should be دریائے سندھ',
        'Negation, modal force, quantities, percentages, dates and causal chains otherwise preserved in paired passage comparison across all 7 files (e.g. "may" not strengthened; 99 فیصد، 3.6 ارب، دس لاکھ، 35 فیصد، 2 ارب، 1970، 2021-2030 all intact); epistemic hedging in the UN Decade sentence preserved (ضرورت آج پہلے سے کسی وقت زیادہ ہے)',
      ],
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'BLOCKING: summative/formative inversion against the frozen bank - specs/content/terminology.csv:20-21 banks Formative Assessment = تشکیلی تشخیص and Summative Assessment = مجموعی جائزہ / جامع تشخیص, but the bound Urdu used the تشکیلی family for summative: "## تشکیلی جائزہ" (UR unit-assessment.mdx:24), "## تشکیلی کام" (UR topic-01.mdx:87, topic-02.mdx:82, topic-03.mdx:85, topic-04.mdx:76), "تشکیلی کاموں" (UR index.mdx:50) - mislabels the summative bank as formative for a B.Ed audience',
        'biodiversity typo: UR topic-03.mdx:36 "حیاتیاتی تنور" (tandoor) for حیاتیاتی تنوع, which topic-02.mdx:46 and the assessment summary use correctly',
        'restoration typo: UR topic-03.mdx:42 "بحالت وہ دوبارہ بناتی ہے" - بحالت is not a standalone word; بحالی is used correctly elsewhere in the same file and in topic-02',
        'bank drift (lower stakes): Rubric rendered as روبرک (UR topic-01.mdx:93 etc.) vs bank معیارِ جانچ (terminology.csv:72); bare Assessment as جائزہ vs bank تشخیص (terminology.csv:19); Teaching strategies as تدریسی حکمتِ عملی (UR unit-teacher-notes.mdx:20) vs bank حکمتِ تدریس (terminology.csv:24); group work as گروپ ورک (UR unit-teacher-notes.mdx:22) vs bank گروہی کام (terminology.csv:70)',
        'Fifth action-path step label inconsistent: دوسروں کو راستہ دکھائیں in the list and summary but bare راستہ in the worked example and rubric (UR topic-04.mdx:46,87), which reads as "path" rather than the influence step',
        'Authored concept labels reviewed per concepts/unit-01.md:30-45: all ten (ماحولیاتی سائنس، قدرتی ماحول، زمین کے چار کرے، انسانی سرگرمیوں کا ماحول سے تعلق، عالمی/علاقائی/مقامی مسائل، ماحولیاتی نظام، ماحولیاتی نظام کی خدمات، قابلِ/ناقابلِ تجدید وسائل، استعمال اور تجدید کی شرح، فرد کے عمل کا راستہ) are consistent with the unit prose and fit academic-plain register; none is banked; owner may bank them after resolution',
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'Garbled label "ایک حلیہ مثال" for "A worked example" at UR topic-01.mdx:57, topic-02.mdx:38 (ایک مکمل حلیہ مثال), topic-03.mdx:55, unit-teacher-notes.mdx:18 (حلیہ مثالوں) - حلیہ means adornment/description of appearance; should be حل شدہ مثال',
        'Wrong verb سرانا for "trace": UR topic-01.mdx:81 "چار کروں میں سرا سکتا/سکتی ہوں", topic-01.mdx:98 "کروں میں سر کر کے", unit-assessment.mdx:91 "چار کروں میں ... سر کریں" - likely intended سراغ لگا سکتا / گزار کر',
        'Broken grammar: UR topic-04.mdx:46 "راضی ہو کر فرق گنتی ہے" (should be فرق گنتی کرتی ہے); topic-02.mdx:24 "فصل تکهوں میں کھڑی ہے" (should be ٹکڑوں); topic-04.mdx:32 "خائم کیے بغیر" (should be ختم); unit-teacher-notes.mdx:28 "جس لفظ پر آنہ ہے" (should be آنا)',
        'Gender/agreement slips: UR topic-01.mdx:63 "ایک ایسی جواب" (جواب is masculine), topic-01.mdx:85 "کوئی جیتا چیز" (چیز is feminine), unit-teacher-notes.mdx:26 "پانی کا ٹینکی" (ٹینکی is feminine), topic-02.mdx:40 "ماحولیاتی بحالی کا دہائی" (دہائی is feminine)',
        'Register otherwise holds: the large majority of the prose is natural academic-plain Urdu suitable for an entering B.Ed student; technical terms are transliterated consistently (اے کیو آئی، ڈبلیو ایچ او، ری سائیکل)',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'renders-20260924T043310Z/render-inspect.json: dir=rtl, lang=ur, main direction rtl on all 7 Urdu pages; zero horizontal overflow at 1280px and 360px; no clipped elements; markdown tables render rtl',
        'Figure RTL mirroring verified arithmetically from the committed SVG sources: fig-U1-1.ur.svg x-coordinates are reflections about the 390 viewBox centre (EN 205/239/416 to UR 575/541/364) with text-anchor start swapped to end and y unchanged; fig-U1-7.ur.svg loop-back arrow reversed (EN M 712...L 88 to UR M 68...L 692) with the first step rightmost, per style-guide v4.1',
        'All 8 Urdu figure carriers reference .ur.svg variants (2 per topic); imgs loaded in renders (render-inspect.json imgs loaded counts)',
        'renders-20260924T043310Z/font-bidi-check.json: figure labels render real Arabic glyphs, not tofu (7.3 px/char with the Nastaliq stack vs 14.7 px/char guaranteed-tofu control); page prose uses the loaded Noto Nastaliq Urdu webfont',
        'Advisory platform finding recorded: SVGs are delivered via <img> (src/components/Figure.tsx:76-92, deliberate for image search), so .ur.svg labels cannot use the page webfont; on hosts without a system Nastaliq font they render in a Naskh-style fallback (FreeSerif on this render host) - legible but not Nastaliq, varying by visitor device',
        'Rendered input identity: scratch-copy build whose 131 manifest-bound inputs were verified byte-identical to the worktree (only two out-of-scope syntax patches, disclosed in logs-20260924T043310Z/build-scratch-copy.log); headless Chromium (Playwright bundled chromium), viewports 1280x800, 360x800 and 794x1123 print-emulated',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message:
        'No accepted G3 evidence exists for the English inputs bound to this G5 review. The last G3 review (specs/content/gnas-301/reviews/unit-01/G3/round-02/20260923T214406Z-g3-attempt-02.json, disposition revise, 1 unresolved blocking + 6 unresolved advisory findings) bound English digests that differ from this manifest for 5 of 7 files (topic-01, topic-02, topic-03, topic-04, unit-teacher-notes); the round-2 repairs were applied post-report in commit bee775c without G3 re-review. The tracker G3 row is not done (two-cycle limit; third cycle owner-gated as G-2026-24), and G-2026-28 already extends the same stale-dependency question to Unit 1. Per the G5 rubric a changed English digest invalidates the dependency, so this review cannot bind to accepted G3 evidence: escalate to the curriculum owner to either accept the current English state or authorise a fresh G3 round, then prepare a fresh G5 manifest for a fresh reviewer.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Topic-01 summative task instruction is inverted in Urdu. EN topic-01.mdx:153 asks the student to "explain what the colleague is missing"; UR topic-01.mdx:91 reads "وضاحت کریں کہ ساتھی کیا نظر رکھ رہا ہے" (explain what the colleague is keeping an eye on). نظر رکھنا means to watch/monitor, never to overlook, so the Urdu sets a different (near-opposite) task. Repair: e.g. "وضاحت کریں کہ ساتھی کیا نہیں دیکھ رہا" or "کیا چھوڑ رہا ہے". Still present at HEAD b6ee961 after the concurrent repair commit 7b5513d.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Summative/formative terminology inverted against the frozen bank. terminology.csv:20-21 banks Formative Assessment = تشکیلی تشخیص and Summative Assessment = مجموعی جائزہ / جامع تشخیص, but the bound Urdu used the تشکیلی family for summative throughout: "## تشکیلی جائزہ" (UR unit-assessment.mdx:24), "## تشکیلی کام" (UR topic-01.mdx:87, topic-02.mdx:82, topic-03.mdx:85, topic-04.mdx:76) and "تشکیلی کاموں" (UR index.mdx:50). For B.Ed students, whose professional vocabulary separates تشکیلی (formative) from مجموعی/اختتامی (summative), this mislabels the unit summative bank as formative. Repair per bank: مجموعی جائزہ / جامع تشخیص. NOTE: concurrent commit 7b5513d (mid-review, after this review read the bound bytes) replaced these with مجموعی forms; that repair is observed but not verified by this reviewer and requires a fresh manifest and fresh G5 round.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'The Urdu site does not build at the bound commit: npm run build at HEAD 64ae260 exits 1 on two committed Urdu defects outside this unit bound inputs - i18n/ur/.../gnas-301/unit-02/topic-03.mdx:15 imports @site/src/components/PrintOut (nonexistent; should be PrintHandout) and i18n/ur/.../gnas-301/unit-06/topic-06.mdx:36 carries two </Gloss> closing tags where </Glossary> is required (log: logs-20260924T043310Z/build-failed-at-head.log). Whole-site SSG is impossible as committed, so the Urdu Unit-1 pages cannot be rendered or published from the repository state without repairing those files. This review renders were produced from a scratch copy with only those two out-of-scope patches, with all 131 bound inputs verified byte-identical (logs-20260924T043310Z/build-scratch-copy.log). NOTE: concurrent commit 7b5513d repaired both defects; observed but not re-verified by a full build at HEAD by this reviewer.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Bound inputs were modified during this review by a concurrent session in the same worktree: all 7 Urdu unit-01 files were edited (uncommitted) while the review was in progress and then committed as 7b5513d "apply G5 Unit 2 round-1 Urdu repairs and systematic register fixes", followed by b6ee961 (G-2026-28 gap record). The prepared manifest therefore no longer matches repository HEAD (all 7 Urdu unit-01 digests differ), so this report cannot pass scripts/review-evidence.mjs validate against the current tree, and the reviewed state is superseded. Per the review contract a repaired unit requires the parent to prepare a new manifest and a fresh reviewer to recheck it; unchanged-input retries are prohibited. This report documents the manifest-bound state; the next G5 round must bind the repaired bytes.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        '"Canal" mistranslated as drain: EN topic-01.mdx:54-55 "explain why a canal smells" vs UR topic-01.mdx:38 "نالی کیوں بدبو دیتا ہے". نالی is a drain/gutter; the intended referent (irrigation/city canal) is نہر, which the same translation uses correctly at topic-02.mdx:38 (نہری آبپاشی). Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        '"Wading in the shallows" mistranslated: EN topic-03.mdx:25-26 vs UR topic-03.mdx:24 "پرندوں کو اونچائی میں چلتے" (birds walking at a height). Should be e.g. "اتھلے پانی میں چلتے ہوئے". Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        '"Culture" mistranslated as سباق (lesson/race): EN topic-04.mdx:78-79 "the culture that tolerates a heap or refuses it is made of individuals" vs UR topic-04.mdx:48 "وہ سباق جو ڈھیر برداشت کرتا ہے یا اس سے انکار کرتا ہے". Should be ثقافت (or معاشرتی رویہ). Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Biodiversity typo produces a wrong word: UR topic-03.mdx:36 "حیاتیاتی تنور" (biological tandoor/oven) in the WHO services sentence; the correct حیاتیاتی تنوع is used at topic-02.mdx:46 and unit-assessment.mdx:22. Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Restoration rendered once as the non-word "بحالت": UR topic-03.mdx:42 "بحالت وہ دوبارہ بناتی ہے جو کھو چکا تھا"; بحالی is used correctly in the same file summary (topic-03.mdx:72) and in topic-02.mdx:40. Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Recurring garbled or wrong words and grammar (register): "ایک حلیہ مثال" for "A worked example" (UR topic-01.mdx:57, topic-02.mdx:38, topic-03.mdx:55, unit-teacher-notes.mdx:18; should be حل شدہ مثال - the concurrent commit 7b5513d replaced these, unverified); سرانا for "trace" (UR topic-01.mdx:81,98; unit-assessment.mdx:91; should be سراغ لگانا / گزارنا); "فرق گنتی ہے" broken grammar (UR topic-04.mdx:46); "تکهوں" for ٹکڑوں (UR topic-02.mdx:24); "خائم" for ختم (UR topic-04.mdx:32); "آنہ" for آنا (UR unit-teacher-notes.mdx:28); gender slips "ایک ایسی جواب" (UR topic-01.mdx:63), "کوئی جیتا چیز" (UR topic-01.mdx:85), "پانی کا ٹینکی" (UR unit-teacher-notes.mdx:26), "ماحولیاتی بحالی کا دہائی" (UR topic-02.mdx:40). All except the حلیہ cluster remain at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Urdu topic-01 adds a further-reading item absent from the English: UR topic-01.mdx:105 adds the WHO Ambient air pollution (2024) fact sheet link; EN topic-01.mdx:165-170 lists two items (WHO Biodiversity 2025; Haines and Frumkin). The added source is bound for the unit (who-air-2024), but the mirror should match the accepted English list; either add it to the English list via the author cycle or remove it from the Urdu. Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Omissions relative to the English: UR index.mdx:39 drops the normative clause "and none may be assumed" from the prerequisite note (EN index.mdx:43-44); further-reading annotation clauses are dropped (EN topic-02.mdx:163-166 and topic-03.mdx:190-191 vs UR topic-02.mdx:99-100 and topic-03.mdx:102); the UN Decade "everyone plays a part" framing note is dropped (EN topic-04.mdx:142-143 vs UR topic-04.mdx:93); the Archer citation title is shortened (UR topic-03.mdx:105 drops "under changing climatic and socio economic conditions", EN topic-03.mdx:186-188). Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Lower-stakes terminology drift from the frozen bank: Rubric as روبرک (UR topic-01.mdx:93, unit-assessment.mdx:137-143) vs bank معیارِ جانچ (terminology.csv:72); bare Assessment as جائزہ vs bank تشخیص (terminology.csv:19; the bank accepts جائزہ only inside the banked summative compounds); Teaching strategies as تدریسی حکمتِ عملی (UR unit-teacher-notes.mdx:20) vs bank حکمتِ تدریس (terminology.csv:24); group work as گروپ ورک (UR unit-teacher-notes.mdx:22) vs bank گروہی کام (terminology.csv:70). The fifth action-path step is also labelled inconsistently (دوسروں کو راستہ دکھائیں in list/summary vs bare راستہ in UR topic-04.mdx:46,87). Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'The Indus (river/system) is rendered as bare سندھ (the province) in enumerations: UR topic-01.mdx:99 "(شہری ہوا، سندھ، تھر)", topic-03.mdx:48 "سندھ کے نظام کا پانی", topic-03.mdx:51 "سندھ کا نظام", unit-assessment.mdx:139, unit-teacher-notes.mdx:35 "سندھ کے پانی کا دباؤ". Use دریائے سندھ / دریائے سندھ کا نظام to keep the river referent. Still present at HEAD b6ee961.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Platform-level RTL typography observation for the owner: Urdu labels inside .ur.svg figures cannot use the page self-hosted Noto Nastaliq Urdu webfont because figures are delivered via <img> (src/components/Figure.tsx, deliberate for image-search findability) and SVG-as-image cannot load page fonts. On hosts without a system Nastaliq font the labels render in a Naskh-style fallback (FreeSerif on this render host; verified real glyphs, not tofu: 7.3 px/char vs 14.7 px/char tofu control, renders-20260924T043310Z/font-bidi-check.json), so figure labels and Nastaliq prose visually diverge by visitor device. Consider embedding/subsetting the Nastaliq font in .ur.svg variants or an Urdu-specific inline delivery. Not a unit-content defect; recorded for an owner decision.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/validate-content.log' },
    { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-depth-gate.log' },
    { name: 'check:figures', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-figures.log' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-no-em-dash.log' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-no-answer-keys.log' },
    { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-docs-sync.log' },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-pipeline-gate.log' },
    { name: 'check:concept-graph', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-concept-graph.log' },
    { name: 'check:bloom-bands', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-bloom-bands.log' },
    { name: 'check:source-floor', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/check-source-floor.log' },
    { name: 'build', exit_code: 1, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/build-failed-at-head.log' },
    { name: 'build-scratch-copy', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/build-scratch-copy.log' },
    { name: 'render-review', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-01/G5/logs-20260924T043310Z/render-review.log' },
  ],
  evidence_manifest: evidence,
};

const out = path.join(G5, 'agent-g5-gnas301-u1-run001.json');
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out);
console.log('criteria:', report.criteria.map((c) => c.id + ':' + c.status).join(' '));
console.log('findings:', report.findings.filter((f) => f.severity === 'blocking').length, 'blocking,',
  report.findings.filter((f) => f.severity === 'advisory').length, 'advisory');
console.log('evidence files:', Object.keys(evidence).length);
