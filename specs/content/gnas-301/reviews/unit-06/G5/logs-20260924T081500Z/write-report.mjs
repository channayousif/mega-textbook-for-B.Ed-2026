// Builds the G5 report for GNAS-301 Unit 6, run agent:g5-reviewer:gnas301-u6-run001.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ROOT = new URL('../../../../../../../../', import.meta.url).pathname;
const DIR = new URL('../', import.meta.url).pathname; // .../G5/
const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));

const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const evidence = {};
const addDir = (sub) => {
  for (const f of readdirSync(DIR + sub).sort()) {
    const p = DIR + sub + '/' + f;
    if (statSync(p).isFile()) evidence['specs/content/gnas-301/reviews/unit-06/G5/' + sub + '/' + f] = sha256(p);
  }
};
addDir('logs-20260924T081500Z');
addDir('renders-20260924T081500Z');

const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06';
const EN = 'docs/semester-1/gnas-301/unit-06';

const criteria = [
  { id: 'authority', status: 'fail', evidence: [
    'No accepted G3 evidence for the bound English inputs: G3 round-2 specs/content/gnas-301/reviews/unit-06/G3/round-02/agent-g3-gnas301-u6-run002.json (disposition revise, 4 unresolved blocking findings, completed 2026-09-24T01:15:48Z); its input_manifest digests for ' + EN + '/topic-05.mdx, topic-06.mdx and unit-assessment.mdx differ from this G5 manifest because the round-2 repairs were applied post-report (verified by digest comparison)',
    'ADR-0019 two-cycle limit reached; third G3 cycle owner-gated: G-2026-33, specs/gaps.md:940-947; tracker G3 row open (specs/content/gnas-301/tasks.md:54)',
    'Course-guide applicability itself verified for the Urdu: the approved guide (GNAS-401 excerpt, bound), SLO:GNAS-301-6-1/6-2 refs and the seven unit outcomes are all taught and assessed in the Urdu mirror (index.mdx outcomes; topic sections; unit-assessment bank)',
  ]},
  { id: 'sources', status: 'pass', evidence: [
    'All in-text citations present in the Urdu with the same claims: (Alibhatti et al., 2017) UR topic-01:42; (Anwar et al., 2026) UR topic-05:30; (Adnan et al., 2024) UR topic-06:32; (WHO, n.d./2023/2024) and (NASA, 2024) passim; Further-reading citations kept in English (correct bibliographic practice)',
    'Numeric claims verified against the bound excerpts: 3.6 billion susceptible and ~250,000 additional deaths/year 2030-2050 (specs/content/gnas-301/sources/texts/who-climate-2023.md Key facts; UR topic-06:32); 4.2 million premature deaths/year rendered 42 لاکھ correctly (who-air-2024.md:12; UR topic-05:34); "a crisis it did least to cause" (sources/texts/adnan2024.md:25-26; UR topic-06:32)',
    'One modal divergence on the WHO cutting-emissions claim recorded as blocking finding 6; the bound who-climate-2023 excerpt carries only Key facts and does not bind that sentence (carried bundle limitation, advisory 9)',
  ]},
  { id: 'coverage', status: 'pass', evidence: [
    'All 12 sub-topics U6-01..U6-12 (specs/content/gnas-301/coverage/unit-06.md) are taught in the Urdu mirror: U6-01/02 topic-01, U6-04/05 topic-02, U6-06/07/08/09 topic-03, U6-10 topic-04, U6-11 topic-05, U6-12 topic-06, each under the mirrored section heading',
    'All seven unit outcomes (EN index.mdx:30-39) are taught and assessed in Urdu (UR index.mdx:26-33; assessment bank covers 6.1-6.6 per the re-keyed blueprint distribution)',
    'Full passage-level comparison of all 9 EN/UR file pairs; no sub-topic, section or required element missing',
  ]},
  { id: 'assessment', status: 'pass', evidence: [
    'All 10 Urdu MCQs independently answered from the Urdu text before reading the key: answers 1b,2b,3b,4b,5b,6b,7b,8b,9c,10b all match the Urdu key (UR unit-assessment.mdx:123-132); option letters/order preserved (a-d, same order as EN); no Urdu wording reveals an answer',
    'RRQ 10/10 and ERQ 5/5 mirrored with identical mark allocations (RRQ marks 4,2,2,2,3,2,3,2,2,2; ERQ rubric point splits 3-3-2-2 / 3-3-2-2 / 3-3-2-2 / 2-2-3-1-2 / 3-3-2-1-1, totals 10 each)',
    'The post-G3-repair English state is faithfully mirrored: ERQ-04 now integrates 6.4 enhancement and 6.5 smog as one air story (EN unit-assessment.mdx:130-133, UR :112-115) and the re-keyed RRQ-08 is the 6.6 school mitigation/adaptation item (EN :114-115, UR :98-99)',
    'Bloom tags correspond item-for-item; cognitive demand preserved (no analysis item lowered to recall)',
  ]},
  { id: 'accessibility', status: 'pass', evidence: [
    'renders-20260924T081500Z/render-inspect.json: every figure <img> on the six topic pages loads (naturalWidth>0) with descriptive Urdu alt text and loading=lazy; zero failed requests; fresh page loads console-clean',
    'Narrow 360x640: document overflow 0 on all 9 pages; no figure beyond the viewport; no scrollable table',
    'A4 print emulation: navbar hidden, overflow 0, full bank and answers section present (print-a4-unit-assessment.png); dark mode switches light/dark figure variants correctly (render-review.log)',
  ]},
  { id: 'completeness', status: 'pass', evidence: [
    'Passage-level EN/UR comparison of all 9 file pairs (index, topic-01..06, unit-assessment, unit-teacher-notes): every section mirrored - classroom situation, Explanation with all subsections, both figures per topic with .ur.svg variants, Activity, Check your understanding, Summary, Self-assessment checklist, Practicum, Summative task with mini-rubric, Further reading',
    'No omissions or additions found; heading parity is exact and body content matches (no heading-only stubs)',
    'Unit summary, MCQ/RRQ/ERQ banks, answer key, model answers, mark schemes and all 5 ERQ rubrics present in Urdu',
  ]},
  { id: 'semantics', status: 'fail', evidence: [
    'Blocking finding 4: "per person" rendered فی کسان (per farmer) x3, UR topic-04:40,54,58',
    'Blocking finding 5: "a million-fold" rendered لاکھ گنا (100,000-fold), UR topic-01:32',
    'Blocking finding 6: modal hedge "able to result in very large gains" dropped on the WHO claim, UR topic-06:44',
    'Blocking finding 7: activity referent inverted (جوڑا "pair" for the spilled substance), UR topic-01:50',
    'Advisory 6: further wrong-word renderings with repairs (فصلوں کے حاشیے, سپرے کی ڈھلوان x2, فالج, سودے بازی, سانسی گئی دھند)',
    'Negation, percentages, dates, comparisons and causal claims otherwise preserved (4.2M->42 لاکھ, 250x, 20cm, ~1C, 3.6 ارب, 250,000, x1/x10/x100 magnification factors all verified)',
  ]},
  { id: 'terminology', status: 'fail', evidence: [
    'Blocking finding 2: all 12 .ur.svg figure variants use a different term set from the Urdu prose (details in finding) plus garbled labels (ناجائز بچہ, حلیہ مثال, کسانے سے, گیسے, دمہ عروج)',
    'Blocking finding 3: arsenic misspelled آرینک in 14 prose occurrences vs آرسینک in the figures',
    'Advisory 1: واقفیت (familiarity) for exposure/exposed in 21 occurrences across 5 files; a third variant رابطہ in fig-U6-3',
    'Advisory 2: specs/content/gnas-301/concepts/unit-06.md authored Urdu labels (G5-flag list, lines 29-46) match the figures, not the prose, for 6 of 12 concepts',
    'Advisory 3: Bloom Evaluate rendered تشخیص in 2 rubric contexts vs course-wide جانچیں; تشخیص is the banked term for Assessment (specs/content/terminology.csv:19)',
    'Advisory 4: carcinogen coined کینسر جن in topic-02 vs کینسر پیدا کرنے والے in the index; Advisory 5: بڑھوتری stem shared by three concepts',
    'The frozen bank (specs/content/terminology.csv, digest ad917e28...) contains no GNAS-301 domain terms; the unit\'s scientific vocabulary is unbanked and needs an owner decision per the concept-graph G5 flag',
  ]},
  { id: 'register', status: 'pass', evidence: [
    'Academic-plain Urdu (درسی مگر عام فہم) maintained across all 9 files; natural sentence order; an entering B.Ed student can follow the classroom stories, activities and instructions',
    'Banked terms honoured where they apply: Rubric معیارِ جانچ (all mini-rubrics and ERQ rubrics), Summative مجموعی جائزہ (UR unit-assessment:24), Group Work گروہی کام (UR teacher-notes:22), Teaching Strategies حکمتِ تدریس (UR teacher-notes:20), Self-Assessment خود جائزہ (checklist headings خود جائزہ فہرست)',
    'Register lapses are localized and recorded as advisory 6 (سودے بازی for negotiation, فریم کرنا calque, پارک ہوتا ہے calque, بے تکا for pedantry); none blocks comprehension',
  ]},
  { id: 'rtl', status: 'unverified', evidence: [
    'Verified programmatically in a real browser (render-review.log): <html dir="rtl" lang="ur"> on all 9 Urdu pages; Noto Nastaliq Urdu webfont served and loaded for page prose (document.fonts.check true; computed font-family "Noto Nastaliq Urdu", "Noto Naskh Arabic", ...); no overflow at 1280x800, 360x640 or 794x1123 print; dark and print passes clean',
    'Bidi/numerals: Western digits (250,000 / 3.6 / 2015 / 42 لاکھ) and Latin MCQ markers (a) b) c) d)) sit in RTL lines in correct logical order (render-inspect.json notes.numeralSamples; DOM sampling of the MCQ block)',
    'NOT verified: visual Nastaliq legibility/shaping judgement - this session cannot display PNG pixels (advisory 8); and the Urdu figure labels\' on-page font is a fallback, not Nastaliq, on clients without a locally installed Urdu font (advisory 7), so their rendered legibility is unverified',
  ]},
];

const findings = [
  { severity: 'blocking', resolved: false, message: 'No accepted G3 evidence exists for the English inputs bound to this G5 review. The last G3 review (specs/content/gnas-301/reviews/unit-06/G3/round-02/agent-g3-gnas301-u6-run002.json, completed 2026-09-24T01:15:48Z, disposition revise) left 4 blocking findings unresolved, and the author applied the full repair set afterwards, so 3 of the 9 bound English files differ from that report\'s inputs (' + EN + '/topic-05.mdx, topic-06.mdx, unit-assessment.mdx; digests verified against the round-2 report\'s input_manifest). The G5 rubric requires accepted G3 evidence for the exact English inputs bound here; a changed English digest invalidates the dependency. ADR-0019\'s two-cycle limit is exhausted and the third G3 cycle is owner-gated (G-2026-33, specs/gaps.md:940-947; tracker G3 row open). The Urdu-side findings in this report stand on their own evidence, but the English dependency cannot be accepted by this reviewer: the owner must accept the repaired English state on the two advisory reports or authorise a third G3 cycle before any G5 pass.' },
  { severity: 'blocking', resolved: false, message: 'Urdu figure labels diverge systematically from the Urdu prose for the same core concepts and carry garbled or wrong words, breaking the figure-text link across all 12 .ur.svg variants (static/img/figures/gnas-301/unit-06/). Prose vs figure: toxicology زہریات vs زہریلی مادوں کا علم (fig-U6-1); acute/chronic حاد/دائمی vs تیز رفتار/دیرینہ, genotoxic جین پر اثر vs جین زہریلہ, mutagen میوٹاجن vs تبدیل کرنے والا, teratogen ٹیراٹوجن vs جنین ہار (fig-U6-3); threshold آستانہ vs حد and dose-response خوراک-جواب vs خوراک-اثر (fig-U6-4); bio-magnification حیاتیاتی بڑھوتری vs حیاتیاتی افزائش and concentration ارتکاز vs حراستی (fig-U6-6); natural قدرتی vs قدری (fig-U6-2/7/8); deforestation جنگلات کی صفائی vs جنگلات کٹائی and layer تہہ vs پٹی (fig-U6-7); sulfurous smog سلفر والا سموگ vs سلفری سموگ and inversion انورجن vs الٹا دباؤ (fig-U6-9/10); health effects صحت پر اثرات vs صحتی اثرات (fig-U6-10/11); early warning ابتدائی انتباہ vs ابتدائی اطلاع (fig-U6-12). Garbled or wrong labels: ناجائز بچہ ("illegitimate child") for "the unborn child" (fig-U6-4 caption); حلیہ مثال ("attire example") for "pesticide example" (fig-U6-5); کسانے سے ("by fodder/squeezing") for "feeding (the crisis)" twice (fig-U6-12; the prose correctly says پالنا); گیسے (masculine plural) for feminine گیس (fig-U6-7/8); دمہ عروج (fig-U6-10); and خوراک labelling the ingestion door in fig-U6-5, colliding with the prose term for dose. Repair: regenerate the .ur.svg label sets from the Urdu prose terminology and align the concepts/unit-06.md Label UR column (which currently matches the figures, not the prose).' },
  { severity: 'blocking', resolved: false, message: 'Arsenic is misspelled آرینک in all 14 Urdu prose occurrences (' + UR + '/topic-01.mdx x5, topic-02.mdx x1, topic-03.mdx x5, unit-assessment.mdx x2, unit-teacher-notes.mdx x1) while the figure variants use the correct آرسینک (fig-U6-2, fig-U6-3). Arsenic in Sindh groundwater is the unit\'s signature Pakistan example (alibhatti2017), and the Further-reading citations spell it "arsenic" in English; the defective spelling breaks the link between prose, figures and citation. Repair: آرینک -> آرسینک throughout.' },
  { severity: 'blocking', resolved: false, message: '"Per person" is rendered فی کسان ("per farmer") in all three occurrences in ' + UR + '/topic-04.mdx:40,54,58 (EN ' + EN + '/topic-04.mdx:58 "emissions per person", :85 and :95 "per-person emissions"). Pakistan\'s per-capita emissions is the point of the climate-justice framing; "per farmer" changes the referent of a key quantitative concept. Repair: فی کسان -> فی کس (or فی فرد).' },
  { severity: 'blocking', resolved: false, message: 'Quantity error: EN ' + EN + '/topic-01.mdx:42 "the pesticide diluted a million-fold may not [harm]" is rendered "لاکھ گنا پتلا کی گئی کیڑے مار دوائی شاید نہ دے" (' + UR + '/topic-01.mdx:32). لاکھ گنا = 100,000-fold; a million-fold is دس لاکھ گنا. The Urdu understates the dilution by an order of magnitude. Repair: لاکھ گنا -> دس لاکھ گنا.' },
  { severity: 'blocking', resolved: false, message: 'Modal force is lost on the exact claim the G3 round-2 repair hedged: EN ' + EN + '/topic-06.mdx:82-83 (repaired state) "the WHO describes cutting emissions as able to result in very large gains for health (WHO, 2023)" is rendered "ڈبلیو ایچ او اخراج کم کرنے کو صحت کے لیے بہت بڑے فائدے دینے والا کام بتاتا ہے" (' + UR + '/topic-06.mdx:44) - an assertion ("work that gives very large benefits") with the "able to / can" hedge dropped. G3 round-2 blocking finding 3 required this claim to match the WHO fact sheet\'s hedged framing; the Urdu re-strengthens it. Repair: "...صحت کے لیے بہت بڑے فائدے دے سکتا ہے" or an equivalent "able to result in" rendering. Note: the bound who-climate-2023 excerpt carries only the Key-facts section and does not bind this sentence; the re-check rests on the G3 round-2 live fetch of the fact sheet.' },
  { severity: 'blocking', resolved: false, message: 'The Topic 6.1 activity instruction inverts its referent: EN ' + EN + '/topic-01.mdx:88-90 "decide which of the two your pair would rather have spilled in a classroom" is rendered "طے کریں کہ ان میں سے کون سا جوڑا جماعت میں گرنے پر پسند کرے گا" (' + UR + '/topic-01.mdx:50), which reads "decide which pair would prefer to fall in the classroom": جوڑا (the student pair) replaces the two substance cards as the thing spilled, garbling the instructional sequence of a core activity. Repair: "...ان میں سے کون سا مادہ ہے جو آپ کا جوڑا جماعت میں گرنے پر پسند کرے گا" or equivalent.' },
  { severity: 'advisory', resolved: false, message: 'واقفیت (familiarity) is used for exposure/exposed in 21 occurrences across 5 files (' + UR + '/topic-01 x3, topic-02 x10, topic-03 x3, topic-06 x1, unit-assessment x4), and the figures use a third term (رابطہ, fig-U6-3). Strongest instances: "for the exposed" -> "واقف لوگوں کے لیے" and "the exposed present" -> "واقف حال" (topic-06.mdx:36); "protect the exposed" -> "(واقف لوگوں کو بچائیں)" (unit-assessment.mdx:158). The word suggests knowing-about rather than being-exposed-to and misleads in dose and route contexts. Course-wide drift carried from the Units 1-4 G5 reviews; an owner decision on a banked Urdu term for exposure (e.g. تعریض / روبروسی) should precede mass repair.' },
  { severity: 'advisory', resolved: false, message: 'specs/content/gnas-301/concepts/unit-06.md authors 12 Urdu concept labels explicitly flagged there for G5 review (lines 29-46); six drift from the prose the student reads and instead match the figure labels: خوراک-اثر منحنی vs prose خوراک-جواب (CON:GNAS-301-6-4); ضرورت کا زینہ vs ضروریت کی سیڑھی (CON-5); حیاتیاتی جمع اور افزائش vs حیاتیاتی جمع اور حیاتیاتی بڑھوتری (CON-7); گرین ہاؤس میکانزم vs گرین ہاؤس کا طریقۂ کار (CON-8); زہریلی مادوں کے علم کے چار سوال vs زہریات کے چار سوال (CON-1); and کورس کا یکجہتی (CON-12) is gender-mismatched (یکجہتی is feminine: کورس کی یکجہتی). The unit needs one term set across prose, figures and concept graph.' },
  { severity: 'advisory', resolved: false, message: 'Bloom-tag Evaluate is rendered تشخیص in two rubric contexts - ' + UR + '/topic-03.mdx:94 "(Evaluate)" -> "(تشخیص)" and unit-assessment.mdx:172 ERQ-3 rubric "(0-2, Evaluate)" -> "(0-2، تشخیص)" - while the course-wide convention جانچیں is used everywhere else in this unit (topic-04.mdx:54; unit-assessment.mdx:108,111) and in Units 3-5. تشخیص is the banked term for Assessment (specs/content/terminology.csv:19), so the drift also collides two different concepts in a marking-guidance context. Also the "·" separator between criteria 2 and 3 of the ERQ-3 rubric is missing in unit-assessment.mdx:171 (EN unit-assessment.mdx:198-199 has it), rendering the criteria run-on.' },
  { severity: 'advisory', resolved: false, message: 'Carcinogen is coined کینسر جن in topic-02 (description :3, glossary link text :39, worked example :48, misconception :50, summary :65) while the index renders the same concept کینسر پیدا کرنے والے (index.mdx:28); standalone جن reads as "genie" in Urdu. Unify on one descriptive term (e.g. کینسر پیدا کرنے والے) or the standard transliteration کارسینوجن, and align the figure label (fig-U6-3 uses جین زہریلہ for genotoxic and its own carcinogen row).' },
  { severity: 'advisory', resolved: false, message: 'One Urdu stem بڑھوتری carries three distinct technical concepts: bio-magnification حیاتیاتی بڑھوتری (topic-03, index), greenhouse enhancement بڑھوتری (topic-04, index, unit-assessment summary), and the natural post-ice-age CO2 rises قدرتی بڑھوتری (topic-04.mdx:36). Context disambiguates within each topic, but the collision weakens the terminology set; consider a distinct term for bio-magnification (e.g. حیاتیاتی تکثیر/بلند ہونا) when the owner banks the unit\'s vocabulary.' },
  { severity: 'advisory', resolved: false, message: 'Localized wrong-word renderings, each with a precise repair (none blocking individually): "crop-residue" -> فصلوں کے حاشیے ("crops\' margins", ' + UR + '/topic-05.mdx:38; intended فصل کی پرالی / فصلوں کی باقیات - stubble burning is the nationally known پرالی جلانا); "spray drift" -> سپرے کی ڈھلوان ("spray slope", unit-assessment.mdx:95 and model answer :142; intended سپرے کا بہاؤ / اڑاؤ, though the parentheticals disambiguate); "paralysis" -> فالج (stroke, topic-06.mdx:44; intended جمود / بے عملی); "the mist breathed" -> سانسی گئی دھند (garbled, unit-assessment.mdx:143); "negotiation" -> سودے بازی (deal-making register, topic-04.mdx:40,58; مذاکرات is neutral); "integrated satellite-and-survey study" drops "integrated" (topic-05.mdx:30); heat-action plan rendered three ways (گرمی کے عمل کی پلانیں topic-06:36, گرمی کی پلان :40, گرمی کی پلانوں :48); filtration rendered چھانٹنے (topic-05:38) vs فلٹریشن (topic-05:57); "honest" -> دیانتدارانہ in fig-U6-10 vs prose ایماندار.' },
  { severity: 'advisory', resolved: false, message: 'Platform-level figure-font issue carried from the Unit 1 and Unit 4 G5 reviews and reconfirmed with this run\'s evidence: the .ur.svg figures reference font-family "Noto Nastaliq Urdu" but embed no @font-face (verified: no @font-face/@import/xlink in fig-U6-1.ur.svg and fig-U6-12.ur.svg), and as <img> content they cannot use the page\'s webfont. On clients without a locally installed Nastaliq font (this host has none; fc-list shows no Urdu-capable font) the Urdu figure labels render in a fallback font rather than Nastaliq. Page prose is unaffected (webfont loads; verified document.fonts.check in render-inspect.json). Needs a platform decision (e.g. inline the Urdu labels as page SVG text, or embed/subset the font in each .ur.svg).' },
  { severity: 'advisory', resolved: false, message: 'Visual legibility inspection limitation: this reviewer session\'s file tool returns no pixel content for PNG images, so no visual Nastaliq legibility/shaping judgement was made on the screenshots; the rtl criterion therefore rests on real-browser DOM/CSS measurements at desktop/narrow/print configurations plus direct analysis of the committed SVG sources (render-review.log). The 9 PNGs in renders-20260924T081500Z/ are saved as evidence for a human or qualified reviewer with pixel vision.' },
  { severity: 'advisory', resolved: false, message: 'Unresolved English-side G3 advisories are faithfully mirrored in the Urdu (preserved across attempts per the skill; these need English-side or owner action, not translation repair): MCQ answer-position skew (8 of 10 correct answers are option b; the Urdu key unit-assessment.mdx:123-132 mirrors 1b-10b exactly); the Karachi heat-plan efficacy claim "the measures that cut the 2015 toll in the calmer years since" (EN topic-06:61-62, UR topic-06:40) which G3 round-2 left beyond the bound sources; the glossary gaps for 5 of 15 key terms (Toxic substance, Dose-response, Greenhouse effect, Global warming, Climate change); fig-U6-3\'s manifest prompt saying "six rows" while listing seven effect classes (specs/content/gnas-301/figures/unit-06.md:15); and this G5 manifest still does not bind the who-chemical-safety, nasa-climate-evidence and un-paris excerpts although the unit cites all three keys (verified absent from the input_manifest; the citedKeys year-suffix limitation noted by G3 round-2 persists).' },
];

const commands = [
  { name: 'manifest-verify', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/01-manifest-verification.txt' },
  { name: 'validate:content', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/02-validate-content.txt' },
  { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/03-check-depth-gate.txt' },
  { name: 'check:figures', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/04-check-figures.txt' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/05-check-no-em-dash.txt' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/06-check-no-answer-keys.txt' },
  { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/07-check-docs-sync.txt' },
  { name: 'build-content-index', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/08-build-content-index.txt' },
  { name: 'site-build', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/09-site-build.txt' },
  { name: 'render-review', exit_code: 0, log_path: 'specs/content/gnas-301/reviews/unit-06/G5/logs-20260924T081500Z/render-review.log' },
];

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 6,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:019-author-gnas-301',
  reviewer_run_id: 'agent:g5-reviewer:gnas301-u6-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T08:14:26Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  g3_report: 'specs/content/gnas-301/reviews/unit-06/G3/round-02/agent-g3-gnas301-u6-run002.json (NOT accepted: disposition revise with 4 unresolved blocking findings; its bound English inputs differ from this G5 manifest in topic-05.mdx, topic-06.mdx and unit-assessment.mdx because the round-2 repairs were applied post-report; two-cycle limit reached, third cycle owner-gated G-2026-33 - see blocking finding 1)',
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
  notes: 'Advisory report under ADR-0019; not certification, and no tracker row, registry entry or acceptance is claimed. Independence: this reviewer session authored and translated none of the reviewed bytes; the worktree was clean at HEAD b80bcc9 (the manifest binding commit) and the manifest was verified 149/149 digest matches before review (01-manifest-verification.txt). Rendered input identity: build/g5-u6 from HEAD b80bcc9 via npx docusaurus build --out-dir build/g5-u6 (exit 0), served by python3 http.server on 127.0.0.1:4631; Playwright bundled Chromium headless at 1280x800, 360x640 and 794x1123 print-emulated, plus a data-theme=dark pass; see render-review.log for the full record including the corrected index-page URL and the console-listener artifact. Load was checked before every build-heavy step (5.51 and 3.57 one-minute averages; capacity threshold 8 never reached). The disposition is escalate: the G3 dependency is owner-gated (G-2026-33) and cannot be accepted by this reviewer, and the Urdu carries 7 blocking content defects (findings 2-7 are actionable repairs for the author; finding 1 requires the owner). Per the course-wide G-2026-34 rule, the Urdu-side findings stand on their own evidence for the next repair round.',
};

const out = DIR + 'agent-g5-gnas301-u6-run001.json';
writeFileSync(out, JSON.stringify(report, null, 1) + '\n');
console.log('wrote ' + out + ' with ' + findings.length + ' findings, ' + Object.keys(evidence).length + ' evidence files');
