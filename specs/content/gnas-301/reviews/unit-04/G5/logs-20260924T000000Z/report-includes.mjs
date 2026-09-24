// G5 report generator for GNAS-301 Unit 4, run agent-g5-gnas301-u4-run001.
// Assembles the findings report per specs/014-agent-review-governance/contracts/review-evidence.md
// and hashes the exact evidence bytes. Run: node specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/report-includes.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ROOT = new URL('../../../../../../../', import.meta.url).pathname;
const DIR = new URL('.', import.meta.url).pathname; // logs dir
const RENDERS = new URL('../renders-20260924T023500Z/', import.meta.url).pathname;
const OUT = `${ROOT}specs/content/gnas-301/reviews/unit-04/G5/agent-g5-gnas301-u4-run001.json`;

const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const rel = (p) => p.slice(ROOT.length);

const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));

const evidence = {};
const addEvidence = (abs) => { evidence[rel(abs)] = digest(abs); };
for (const f of readdirSync(DIR)) {
  const p = `${DIR}${f}`;
  if (statSync(p).isFile() && f !== 'report-includes.mjs') addEvidence(p);
}
for (const f of readdirSync(RENDERS)) addEvidence(`${RENDERS}${f}`);

const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04';
const EN = 'docs/semester-1/gnas-301/unit-04';
const FIG = 'static/img/figures/gnas-301/unit-04';

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gnas-301/content-spec.md ## Unit 4 (SLO:GNAS-301-4-1..4-3, sub-topics U4-01..U4-15) remains the approved authority; UR index.mdx:23-34 carries the same eight learning outcomes and SLO refs as EN index.mdx:26-39',
      `${UR}/topic-01.mdx .. topic-07.mdx: every EN ### sub-topic heading has its Urdu counterpart (heading counts 12/11/12/12/12/12/13 match EN exactly), so the guide-derived topic list 8.1-8.3, 9.1-9.4, 10.1-10.8 is taught in Urdu`,
      'specs/content/gnas-301/coverage/unit-04.md rows U4-01..U4-15 verified present in the Urdu topic files by full passage comparison',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gnas-301/sources/unit-04.md rows verified against Urdu in-text citations: khan2024 (UR topic-01.mdx:24, topic-04.mdx:51), nafees2019 (UR topic-01.mdx:34, topic-07.mdx:35), abbasi2022 (UR topic-01.mdx:35, topic-03.mdx:36), who-occupational-health (UR topic-01.mdx:37), who-mental-health-work (UR topic-07.mdx:37), who-hearing-2026 (UR topic-07.mdx:36) - each at the same claim position as its EN counterpart',
      'specs/content/gnas-301/sources/texts/khan2024.md and nafees2019.md bound abstracts support the Urdu-mirrored claims (respiratory disease and lost work days in 11 Faisalabad mills; high prevalence incl. byssinosis)',
      `Further-reading lists match EN item-for-item in all seven Urdu topics (5/3/3/3/3/3/4 items); citations kept in Roman script with translated annotations`,
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'All 15 sub-topics U4-01..U4-15 taught in Urdu (heading parity exact across index + 7 topics; see completeness evidence)',
      'All three SLOs assessed in Urdu: UR unit-assessment.mdx MCQs 1-10, RRQs 1-10, ERQs 1-5 cover the same per-topic spread as EN (MCQ-01/RRQ-01/ERQ-01 for 4.1; MCQ-03/RRQ-03 for 4.2; MCQ-04/RRQ-04/ERQ-02 for 4.3-4.4; MCQ-05..07/RRQ-05..07/ERQ-03 for 4.5; MCQ-08/RRQ-08/ERQ-04 for 4.6; MCQ-09,10/RRQ-09,10/ERQ-05 for 4.7)',
      'specs/content/gnas-301/concepts/unit-04.md concept-to-assessment mapping holds in the Urdu bank (same item numbering, no prose IDs authored)',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${UR}/unit-assessment.mdx:29-92 MCQs independently answered from the Urdu text before reading the key: answers b,b,b,b,b,c,b,b,c,d - identical to EN unit-assessment.mdx:149-161, with option order a-d preserved item-for-item and no Urdu wording that reveals an answer or changes cognitive demand (Bloom tags یاد رکھیں/سمجھیں/لاگو کریں/تجزیہ کریں mirror Remember/Understand/Apply/Analyze)`,
      'RRQs 1-10 and ERQs 1-5 preserve EN task meaning, constraints (word counts 150-200/160-200/170-200), mark schemes (نمبر (2)/(3)/(4) totals) and rubric weights (0-2/0-3/0-4 bands, کل 10)',
      'ERQ-4/ERQ-5 Create-level plan tasks keep the six-step and tool-naming requirements intact',
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      'renders-20260924T023500Z/render-inspect.json: all 14 figure imgs on the 10 Urdu pages load (0 broken), all carry Urdu alt text (altLen 40-120), pixelStddev 16-24 (non-blank renders)',
      'No document overflow-x at 1280 or 360 on any of the 10 pages; the one prose table per topic measures dir=rtl, fits clientWidth (scrollWidth 328 <= 328) with last column reachable',
      'A4 print emulation (794px): navbar and sidebar hidden, 0 clipped elements, visible .ur.svg figures fit (right edge 778 <= 794); the allFiguresFit=false flags in the JSON are the intentionally hidden dark-variant imgs (left=right=0)',
      'Zero browser console errors / page errors across all 30 page loads',
    ],
  },
  {
    id: 'completeness',
    status: 'pass',
    evidence: [
      'All 10 mirror files present (index, topic-01..07, unit-assessment, unit-teacher-notes); no heading-only stubs found in full passage comparison',
      'Structural parity exact: headings 5/12/11/12/12/12/12/13/10/6, self-assessment checkboxes 4 per topic, ordered lists (6 plan steps + 4 CYU per topic; 10+10+5 bank items), 5-row mini-rubric tables, blockquote content matched (Urdu quotes are single-line, same content)',
      'No omissions or additions versus EN found in the passage comparison; the Unit 1 G5 defect class (extra further-reading item) is absent - all lists match item-for-item',
    ],
  },
  {
    id: 'semantics',
    status: 'fail',
    evidence: [
      `${UR}/topic-03.mdx:24,26,44,46,58 renders "foreman" as فرمان (decree) - the topic's central character is unreadable as a person; ${FIG}/fig-U4-5.ur.svg itself uses the correct فورمین`,
      `${UR}/topic-01.mdx:47 inverts the near-miss example: EN topic-01.mdx:72-74 "a cotton bale falling short of a walkway" becomes روئی کا گٹھا جو راستے کے پاس گرنا چاہیے تھا (a bale that should have fallen)`,
      `${UR}/topic-05.mdx:24,38 renders "spanner" as پانا (betel leaf; correct: پانچا); ${UR}/topic-04.mdx:47 carries the non-word خرید (purchase) for "travels worst"; ${FIG}/fig-U4-13.ur.svg caption renders "quiet exposures" as خاموش رابطے (quiet contacts)`,
    ],
  },
  {
    id: 'terminology',
    status: 'fail',
    evidence: [
      `Figure labels diverge from prose for core concepts: PDCA act ${FIG}/fig-U4-3.ur.svg + fig-U4-14.ur.svg اقدام vs prose اصلاح (UR topic-02.mdx:39,60; topic-05.mdx:66; unit-assessment.mdx:23); near-miss fig-U4-10.ur.svg + fig-U4-14.ur.svg بچے (ہوئے) واقعات vs prose بچتی نظر (~20 uses); OHS professional fig-U4-8.ur.svg پروفیشنل vs prose پیشہ ور; plan fig-U4-11/14.ur.svg پلان vs prose منصوبہ; heat/dust fig-U4-13.ur.svg حرارت/دھول vs prose گرمی/گرد`,
      `Garbled figure words: ${FIG}/fig-U4-3.ur.svg caption اگلکسر (extinguisher); fig-U4-5.ur.svg + fig-U4-9.ur.svg انعامت (انعامات); fig-U4-14.ur.svg پرچھ (پرچہ) and حلیہ مثال (the phrase Unit 1 G5 round 1 repaired in prose to حل شدہ مثال); fig-U4-3.ur.svg بھاگنے والے for lagging indicators vs prose پیچھے رہنے والے`,
      'specs/content/gnas-301/concepts/unit-04.md authored Label UR set (all 12 flagged there for G5) drifts from prose: نقشے vs خاکہ, زینہ vs سیڑھی, ادارے کا ماحول vs تنظیمی ماحول, خاموش خطرے vs خاموش واقفیت',
      'Bank compliance verified good where banked: Rubric معیارِ جانچ in all 8 files (terminology.csv:72), Summative مجموعی جائزہ/مجموعی کام family (no Unit-1-style تشکیلی inversion), Group Work گروہی کام and Teaching strategies حکمتِ تدریس (terminology.csv:70,24); drift remains on bare Assessment جائزہ (title یونٹ 4 کا جائزہ), Self-assessment خود جانچ vs banked خود جائزہ (terminology.csv:102)',
    ],
  },
  {
    id: 'register',
    status: 'pass',
    evidence: [
      'Overall register is academic-plain and readable for an entering B.Ed student; gender-inclusive سکتا/سکتی used consistently in self-assessment checklists; English technical terms transliterated consistently (او ایس ایچ، ایچ ایس ای، پی ڈی سی اے، آئی ایل او، آئی ایس او)',
      'Localized calques and grammar slips enumerated as advisory findings for repair: فرش for the factory floor (UR topic-02.mdx:37, topic-04.mdx:43,47), metaphorical floor as فرش (topic-03.mdx:48,63; topic-06.mdx:32,66), موسم for safety climate (topic-05.mdx:36,46), کھسکتا دے (topic-02.mdx:24), جو کہہ رہی ہو کہے (topic-03.mdx:44), رکھتا ہی کیوں (topic-05.mdx:24), پہلی سبق (unit-teacher-notes.mdx:19)',
    ],
  },
  {
    id: 'rtl',
    status: 'unverified',
    evidence: [
      'Programmatic RTL checks passed on all 10 rendered pages (renders-20260924T023500Z/render-inspect.json): html dir=rtl, computed body font "Noto Nastaliq Urdu" (self-hosted webfont), tables dir=rtl and fitting, no overflow-x at 360px, no print clipping, .ur.svg variants wired',
      'Visual Nastaliq legibility, shaping and bidi punctuation could not be inspected: this reviewer session cannot display images (Read tool returns no visual content for PNG/JPG; Playwright and Chrome DevTools MCP browsers unavailable - no Chrome binary), and a fresh inspection subagent confirmed the same limitation on the saved PNGs',
      '30 PNGs (desktop 1280x900, narrow 360x780, print view 794x1123) and 10 A4 PDFs are saved under renders-20260924T023500Z/ for human visual inspection; figure .ur.svg labels render in a Naskh-style fallback (FreeSerif) on hosts without a system Nastaliq font because SVG-as-img cannot load the page webfont (carried Unit 1 G5 platform finding, confirmed here: fc-list shows no system Urdu font)',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    resolved: false,
    message:
      'No accepted G3 evidence exists for the English inputs bound to this G5 review. The last G3 review (specs/content/gnas-301/reviews/unit-04/G3/round-02/agent-g3-gnas301-u4-run002.json, disposition revise, completed 2026-09-24T01:04Z) exited with 2 unresolved blocking findings (phantom abbasi2022 support for U4-08/U4-09 and phantom who-mental-health-work for U4-10). The repairs were applied post-report: specs/content/gnas-301/sources/unit-04.md and specs/content/gnas-301/coverage/unit-04.md digests differ between the G3 round-02 manifest and this G5 manifest (all 10 English MDX files are unchanged), so the repaired governance state has never been reviewed by a fresh reviewer. The tracker row stays open (specs/content/gnas-301/tasks.md:40, G3 en-review not done) and ADR-0019 reserves a third cycle to the owner (specs/gaps.md G-2026-31, status open). The G5 rubric requires accepted G3 evidence for the exact English inputs bound to this review, and the report contract requires g3_report to be an accepted G3 report for the current English inputs; neither exists. Escalation needed: the curriculum owner must either accept the repaired English state on the two advisory reports or authorise a third G3 cycle, before a G5 pass can be considered. The Urdu-side findings below stand on their own evidence for the eventual re-review.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'UR topic-03.mdx:24,26,44,46,58 renders "foreman" as فرمان (decree/edict) in all five occurrences; the workshop foreman is the central character of the topic narrative, its worked example and MCQ/CYU items, and as written the passages read "the decree still has the guard off the lathe". The Urdu figure variant static/img/figures/gnas-301/unit-04/fig-U4-5.ur.svg uses the correct transliteration فورمین in its own caption, so the prose and the figure disagree. Repair: replace فرمان with فورمین throughout UR topic-03.mdx.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'UR topic-01.mdx:47 inverts the modal force of the worked example\'s near-miss: EN topic-01.mdx:72-74 "The near-miss he does not report, a cotton bale falling short of a walkway" is rendered "وہ بچتی ہوئی نظر جو وہ رپورٹ نہیں کرتے، روئی کا گٹھا جو راستے کے پاس گرنا چاہیے تھا" - گرنا چاہیے تھا means "should have fallen", the opposite of "nearly fell on the walkway", so the defining example of the near-miss grade is broken. Repair: e.g. "روئی کا گٹھا جو بال بال راستے پر گرنے سے بچا" (a bale that just missed the walkway).',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'UR topic-05.mdx:24 and :38 render "spanner" as پانا (betel leaf) in "گرا ہوا پانا" (a dropped betel leaf); the intended word is پانچا (wrench). The dropped spanner is one of the two named base-of-pyramid examples in both the classroom situation and the incident-pyramid bullet, so the hazard example reads as nonsense in a factory context. Repair: "گرا ہوا پانچا" in both places.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'UR topic-04.mdx:47 garbles the Communicator role: EN topic-04.mdx:69-70 "carries the floor\'s knowledge upward, which is the direction it travels worst" is rendered "فرش کا علم اوپر لے جاتا ہے، جو سمت سب سے خرید سفر کرتی ہے" where خرید (purchase) is a non-word in this position (intended:worst/hardest). One of the six role-web definitions is unreadable. Repair: e.g. "جو سمت سب سے مشکل سفر کرتی ہے".',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'Urdu figure labels diverge systematically from the Urdu prose for the same core concepts and carry garbled words, breaking the figure-text link that Constitution Art. III.10 relies on (2 figures per topic). Divergences: PDCA act stage اقدام in fig-U4-3.ur.svg and fig-U4-14.ur.svg vs اصلاح in all prose (UR topic-02.mdx:39,60; topic-05.mdx:66; topic-07.mdx:57; unit-assessment.mdx:23) - even the fig-U4-3 alt text in UR topic-02.mdx:34 says اصلاح while the figure caption says اقدام; near-miss بچے واقعات/بچے ہوئے واقعات in fig-U4-10.ur.svg and fig-U4-14.ur.svg vs prose بچتی نظر; OHS professional پروفیشنل in fig-U4-8.ur.svg vs prose پیشہ ور (and communicator رابطہ کار vs prose ابلاغ کار); plan پلان in fig-U4-11/14.ur.svg vs prose منصوبہ; heat/dust حرارت/دھول in fig-U4-13.ur.svg vs prose گرمی/گرد; portrait نقشہ in fig-U4-1/2.ur.svg vs prose خاکہ; safety-climate حفاظتی ماحول سروے in fig-U4-10.ur.svg vs prose حفاظتی موسم کے سروے. Garbled words inside figures: اگلکسر (extinguisher, fig-U4-3.ur.svg caption), انعامت for انعامات (fig-U4-5.ur.svg, fig-U4-9.ur.svg), پرچھ for پرچہ and حلیہ مثال for worked example (fig-U4-14.ur.svg - the exact phrase Unit 1 G5 round 1 had repaired in prose to حل شدہ مثال), خاموش رابطے for quiet exposures (fig-U4-13.ur.svg caption), بھاگنے والے for lagging indicators (fig-U4-3.ur.svg). Repair: regenerate the 14 .ur.svg label sets against the prose terminology and fix the garbled words.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'واقفیت (familiarity) is used for "exposure/exposed" throughout the unit (UR topic-01.mdx:24,36; topic-03.mdx:36; topic-04.mdx:53; topic-07.mdx:24,26,32,34,44,54,57,59,77,88,94,100; unit-assessment.mdx:23,121,142,157,169; unit-teacher-notes.mdx:19) - in standard Urdu it means acquaintance, so "بغیر حفاظت کیڑے مار ادویات کی واقفیت" reads closest to "familiarity with pesticides" and "اپنی واقفیتوں کا ماحول" to "an environment of familiarities". The convention is course-wide (units 3, 5, 6 use it too), so this is an owner adjudication, not a unit-local fix: either bank واقفیت for exposure or adopt a precise term (تعرض or a descriptive phrase) course-wide. Terminology bank is read-only for this review.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'بچتی نظر is the coined prose term for "near-miss" (33 occurrences across 8 files, e.g. UR topic-01.mdx:43,47,66,71; topic-02.mdx:38,45; topic-05.mdx:24,38,40,48,50,62,66,73,77; unit-assessment.mdx:23,57,63,82,132,135,143,146,153). It is not a standard Urdu safety term and is opaque on first reading (نظر = sight/glance); the figures coin different variants (بچتی نظر کی کتاب in prose vs بچے واقعات کی کتاب in fig-U4-14.ur.svg). Owner adjudication requested (e.g. قریبی حادثہ or بال بال بچنے والا واقعہ); do not change the bank to secure a pass.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'specs/content/gnas-301/concepts/unit-04.md authors 12 Urdu concept labels explicitly flagged there for G5 review; six drift from the prose the students read: شعبوں کے خطرے کے نقشے vs prose خاکہ (portrait), قوانین کا زینہ vs prose سیڑھی (regulatory ladder), پروفیشنل کا کردار جال vs prose او ایچ ایس پیشہ ور...جالا, ادارے کا ماحول vs prose تنظیمی ماحول (organizational environment), ایچ ایس ای پلان کے مرحلے vs prose ایچ ایس ای منصوبہ, خاموش خطرے اور اوزار vs prose خاموش واقفیت. Align the Label UR column with the prose terms (or vice versa via owner ruling) so the concept graph cross-references cleanly.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Localized calques and imprecise renderings (repair list, none blocking individually): فرش for the factory floor as agent ("جو فرش واقعی بولتا ہے" UR topic-02.mdx:37; "فرش بولتا ہے" topic-04.mdx:43; "فرش کا علم" topic-04.mdx:47 - the floor does not speak; use فرش پر کام کرنے والے); metaphorical floor (minimum standard) as فرش (UR topic-03.mdx:48,63; topic-06.mdx:32,66 - use کم از کم معیار); حفاظتی موسم کے سروے for safety-climate survey (UR topic-05.mdx:36 - فضا is the usual register); "بے رخی کے بغیر ہنستے ہیں" for "laughs without unkindness" (UR topic-04.mdx:24 - بے مہری); قریبی سنجیدہ خطرے for "imminent serious danger" (UR topic-04.mdx:30 - قریبی = nearby); "کراچی کی لہروں" for "Karachi\'s heatwaves" (UR topic-07.mdx:34 - bare لہروں reads as sea waves; needs گرمی کی لہروں); کروڑوں for "hundreds of millions" (UR topic-07.mdx:36 - imprecise magnitude for the WHO 430-million figure); "سواری کی گرائی" for "the ride\'s anchorage" (UR topic-06.mdx:49 - names falling, not anchoring); "جنریٹر ہوا کے رخ نیچے" for "generator sited downwind" (UR topic-06.mdx:49); "تار کی بو" for "a smell of tar" (UR topic-07.mdx:24 - تار is wire; تارکول); grammar slips: کھسکتا دے (topic-02.mdx:24), جو کہہ رہی ہو کہے (topic-03.mdx:44), رکھتا ہی کیوں (topic-05.mdx:24), پہلی سبق (unit-teacher-notes.mdx:19), جو یہ موضوع سہارا دیتا ہے (topic-02.mdx:77), چھوڑی (topic-06.mdx:55).',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Lower-stakes terminology drift from the frozen bank (course-wide conventions carried from units 1-3, recorded for the owner): bare Assessment as جائزہ in the unit-assessment title "یونٹ 4 کا جائزہ" (bank terminology.csv:19 Assessment = تشخیص, جائزه accepted only inside the banked summative compounds; the heading مجموعی جائزہ IS the banked compound and is correct); Self-assessment checklist as خود جانچ کی فہرست vs banked خود جائزہ/خود تشخیصی (terminology.csv:102); Summative task as مجموعی کام (a course-wide coinage beside the banked مجموعی جائزہ); learning outcomes as تعلیمی نتائج vs banked نتیجہ ہائے تعلم (terminology.csv:27); Bloom tag (Evaluate) rendered تشخیص (UR topic-02.mdx:85, topic-03.mdx:88, unit-assessment.mdx:114,116) which collides with the banked Assessment term. Positive: Rubric معیارِ جانچ (all 8 files), Group Work گروہی کام and Teaching strategies حکمتِ تدریس (unit-teacher-notes.mdx:21,23) are bank-correct, and the Unit 1 formative/summative inversion is absent.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Unresolved G3 round-2 advisories are mirrored faithfully in the Urdu (English-side repairs, preserved across attempts per the skill): MCQ key skew (7 of 10 keys are b; the Urdu preserves the identical keys and option order, so the skew is inherited, UR unit-assessment.mdx:127-137); "the Karachi fire\'s factories" plural (EN topic-04.mdx:74 -> UR topic-04.mdx:49 فیکٹریوں); bare plain-text further-reading URLs; topic-03 citation scoping. Also carried: sources/texts/abbasi2022.md and sources/texts/who-hearing-2026.md "What this supports" sections remain scoped to GNAS-301 Unit 3 only and were not extended for the Unit 4 citations that sources/unit-04.md now records (the underlying abstracts do support the Unit 4 claims; this is a governance-note gap, not a support failure).',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Platform-level figure-font issue (carried from Unit 1 G5 round 1, reconfirmed in this environment): .ur.svg figure labels are delivered via <img> and cannot load the page\'s self-hosted Noto Nastaliq Urdu webfont (src/css/custom.css:46); on hosts without a system Nastaliq font the labels render in a Naskh-style fallback - this host has only FreeSerif/Unifont for Urdu (fc-list), so the figure typography differs from the Nastaliq body text on default student/teacher machines. Legible but inconsistent; owner decision needed (e.g. inline SVG, embedded font, or accepted fallback).',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Visual legibility inspection limitation: this reviewer session could not display images (Read tool returns no visual content for PNG/JPG; both Playwright and Chrome DevTools MCP browsers are unavailable - no Chrome binary on this host), and a fresh inspection subagent confirmed the same limitation on the saved PNGs. Render evidence is therefore programmatic (dir=rtl, computed font Noto Nastaliq Urdu, .ur.svg figures loaded with Urdu alt text, no overflow at 360px, no print clipping, zero console errors - renders-20260924T023500Z/render-inspect.json) plus 30 PNGs and 10 A4 PDFs saved for human visual inspection. Nastaliq legibility, shaping and bidi punctuation remain visually unverified in this run; a re-review with working visual inspection is required before any pass (consistent with the G-2026-34 plan for Unit 2 round 2).',
  },
];

const commands = [
  { name: 'manifest-verify', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/01-manifest-verification.txt' },
  { name: 'validate:content', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/02-validate-content.txt' },
  { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/02-check-depth-gate.txt' },
  { name: 'check:figures', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/02-check-figures.txt' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/02-check-no-em-dash.txt' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/02-check-no-answer-keys.txt' },
  { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/02-check-docs-sync.txt' },
  { name: 'site-build', exit_code: 1, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/03-build.txt' },
  { name: 'site-build-isolated', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/03-build-retry.txt' },
  { name: 'render-review', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-04/G5/logs-20260924T000000Z/04-render-inspect.txt' },
];

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 4,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:019-author-gnas-301',
  reviewer_run_id: 'agent:g5-reviewer:gnas301-u4-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T07:05:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  g3_report:
    'specs/content/gnas-301/reviews/unit-04/G3/round-02/agent-g3-gnas301-u4-run002.json (NOT accepted: disposition revise with 2 unresolved blocking findings; its bound sources/unit-04.md and coverage/unit-04.md digests differ from this G5 manifest because the round-2 repairs were applied post-report - see blocking finding 1)',
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
  notes:
    'Advisory report under ADR-0019; not certification. The first site-build attempt (npm run build) failed with exit 1 on ENOENT build/__server/server.bundle.js - a build-directory race with a concurrent session building in the same worktree (verified: a second docusaurus build process was running in this worktree during the attempt; both webpack compilations succeeded). The isolated retry (npx docusaurus build --out-dir build/g5-u4) exited 0 and is the render input. Rendered input identity: worktree HEAD d9a616f, manifest verified with 157/157 digest matches before review; Urdu pages served from build/g5-u4 via python3 http.server on 127.0.0.1:4621; Playwright chromium headless, viewports 1280x900 / 360x780 / 794x1123 print-emulated.',
};

writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', OUT);
console.log('evidence files:', Object.keys(evidence).length);
console.log('findings:', findings.filter((f) => f.severity === 'blocking').length, 'blocking,',
  findings.filter((f) => f.severity === 'advisory').length, 'advisory');
