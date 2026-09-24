// Report builder - GQUR-300 Unit 4 G5 run001. Assembles the contract report
// with evidence hashes computed from the actual saved bytes.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = '.';
const DIR = 'specs/content/gqur-300/reviews/unit-04/G5';
const LOGS = `${DIR}/logs-agent-g5-gqur300-u4-run001`;
const RENDERS = `${DIR}/renders-agent-g5-gqur300-u4-run001`;
const manifest = JSON.parse(readFileSync(`${DIR}/manifest.json`, 'utf8'));

const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const evidence = {};
for (const dir of [LOGS, RENDERS]) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isFile()) evidence[p] = digest(p);
  }
}

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 4,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:59faad3f68b3760c693379e66dfbc5273f28bd37',
  reviewer_run_id: 'agent-g5-gqur300-u4-run001',
  model: 'longcat-2.0',
  started_at: '2026-09-24T04:05:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/gqur-300/reviews/unit-04/G3/agent-g3-gqur300-u4-run001.json',
  rulings: {},
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority', status: 'fail',
      evidence: [
        'No accepted G3 evidence exists for this unit (ADR-0019; specs/reviewers/registry.json has no enabled reviewers); the best-available English review is the advisory G3 run001 at specs/content/gqur-300/reviews/unit-04/G3/agent-g3-gqur300-u4-run001.json (disposition revise, author_run_id commit:93e6321)',
        'English digest changed since that advisory: docs/semester-1/gqur-300/unit-04/topic-01.mdx, topic-02.mdx and unit-assessment.mdx differ from the G3 report input manifest (author repairs at 78f0366); the exact English inputs bound in this manifest (verified 115/115, manifest-verify-normalized.log) are the authoritative comparison base',
        'Newest deterministic gate evidence for the repaired English: specs/content/gqur-300/reviews/unit-04/G2/20260924T011729574Z-gates.json (commit 78f0366), all eight commands exit 0',
        'Course is bilingual (course-overview.mdx not bilingual:false), GQUR-300 resolves in catalog/courses.json, the Urdu unit exists, and clo_refs are identical across locales (SLO:GQUR-300-2-2, SLO:GQUR-300-4-4) in all six file pairs',
      ],
    },
    {
      id: 'sources', status: 'pass',
      evidence: [
        'UR Further reading entries match the EN citations in all three topics (Marecek et al. Prealgebra 2e Ch. 1/9, NCC Mathematics guidelines, Gula & Lovric 2025 with volume/pages/DOI)',
        'specs/content/gqur-300/sources/unit-04.md: all three keys (ncm, openstax-prealgebra, gula2025) carry bound excerpts; no unverifiable sources',
        'The Gula and Lovric supporting claim retains its meaning in UR topic-03.mdx:46-48 (quality numeracy task; movement between the concrete situation and the abstract computation and back), with the numeracy-term drift and the weakened verb recorded as findings',
      ],
    },
    {
      id: 'coverage', status: 'pass',
      evidence: [
        'All four sub-topics (U4-01 to U4-04) from specs/content/gqur-300/content-spec.md ## Unit 4 are taught and assessed in the Urdu mirror; every EN section is present in the UR file across all six pairs (bilingual-comparison.txt)',
        'All six figures are wired to .ur.svg variants with translated alt text; the unit outcomes are restated in the UR index; the UR index carries the required key_terms block (12 terms)',
      ],
    },
    {
      id: 'assessment', status: 'fail',
      evidence: [
        'All 25 bank items plus keys were independently answered from the Urdu text and compared: option order (a-d), numbers, marks and totals are identical to the English bank; no item is lowered to recall and no bank item leaks its answer (assessment-independent-working.txt)',
        'BLOCKING divergence in the formative twin: UR topic-03.mdx:81-82 closes the open EN prompt (topic-03.mdx:83-84) to "why the answer goes up", leaking the rounding direction and contradicting the item arithmetic (8 x 2.5 = 20 sq m at 1 L per 10 sq m = exactly 2 L)',
        'ERQ-4 G3-repaired re-measure analysis correctly mirrored in the Urdu rubric (unit-assessment.mdx:190-195 UR vs 204-210 EN): tile area constant at 580 sq m, store size not position sets the open area, skirting is the quantity to re-measure',
      ],
    },
    {
      id: 'accessibility', status: 'pass',
      evidence: [
        'check:figures exit 0; every figure carries descriptive alt text in Urdu; no colour-only meaning (labels plus shapes); TranslationStatusBadge renders the draft notice on all six UR pages',
        'Inspection limitation recorded as an advisory finding: image display unavailable this session; verification rests on DOM measurement, font-aware SVG geometry and pixel scans (render-review.txt)',
      ],
    },
    {
      id: 'completeness', status: 'pass',
      evidence: [
        'No missing sections and no heading-only stubs; the only additions are the required UR key_terms block and one clarifying object in topic-03.mdx:47 (bilingual-comparison.txt)',
        'Course-wide Urdu sweep classes verified holding in Unit 4: zero ربرک, zero گروپ کام compound, خود جائزہ everywhere, ٹیوٹر transliteration applied, معیارِ جانچ for every rubric surface, حکمتِ تدریس heading, key_terms present (bilingual-comparison.txt)',
        'Unit 4 topic-01 metric-conversion material is the original of the passage Unit 2 Urdu had wrongly copied (Unit 2 G5 F1/F2); here it matches its own English and sits where it belongs',
        'Small omissions recorded as advisory findings (ERQ-4 "adds or subtracts a few metres"; fig-U4-4 header "classroom"; index hover/tap wording)',
        'Note: check:pipeline-gate exits 0 but its EN-UR structural parity checks are dormant at translation_status: draft (scripts/check-pipeline-gate.mjs:211 applies UR checks only when reviewed); the manual bilingual comparison in bilingual-comparison.txt is the parity evidence for this review',
      ],
    },
    {
      id: 'semantics', status: 'fail',
      evidence: [
        'Quantities, comparisons, causal claims, examples, pronoun references and instructional sequences verified aligned across all six file pairs (bilingual-comparison.txt); the material divergences are the findings below',
        'BLOCKING: "opposite sides equal" garbled to "سامنے کی باتیں برابر" in UR topic-02.mdx:68-69 and in the fig-U4-2.ur.svg / .ur.dark.svg labels (EN topic-02.mdx:71-72)',
        'BLOCKING: "prefix" rendered "لاحقہ" (suffix) in UR topic-01.mdx:38, contradicting the same file frontmatter "سابقے" (EN topic-01.mdx:39-40)',
        'Advisory divergences: "odd-shaped" as "غیر ہندسی"; "accepting" as "مانگ لینا"; teacher-notes attribution and transfer-term drift',
      ],
    },
    {
      id: 'terminology', status: 'fail',
      evidence: [
        'Banked terms used correctly where banked: Rubric -> معیارِ جانچ (all rubric surfaces), Group Work -> گروہی کام, Self-Assessment -> خود جائزہ, Teaching Strategy -> حکمتِ تدریس; محیط for circumference and تمام اعداد for whole numbers are consistent with the reviewed course conventions (Unit 2, Unit 6)',
        'UNCERTAIN: Perimeter rendered three ways (اطراف کی پیمائش in key_terms and concepts/unit-04.md; bare اطراف in roughly twenty prose and assessment places; اطراف (پیریمیٹر) in fig-U4-3.ur.svg) while اطراف also carries "sides" in the shape definitions (UR topic-02.mdx:69; fig-U4-2.ur.svg triangle label)',
        'UNCERTAIN: core math terms unbanked in specs/content/terminology.csv; numeracy drifts between عددیت (this unit) and عددی خواندگی (unit-06); two of the concept graph authored labels are defective (CON:GQUR-300-4-2, CON:GQUR-300-4-10)',
      ],
    },
    {
      id: 'register', status: 'pass',
      evidence: [
        'Academic-plain register holds overall; the feminine reader address is consistent with the course-wide convention in units 1-6',
        'Advisory one-word slips recorded as findings: اندازا -> اندازہ, کے/کی agreement, ممکن -> ممکنہ, بچائیں for "Defend", پای -> پائی, خانہ -> خلا, سرکلر -> گول (3x)',
        'Bloom tags and MCQ/RRQ/ERQ labels kept in Latin, matching every other unit (accepted course-wide convention noted by the Unit 1/2 G5 reviews)',
      ],
    },
    {
      id: 'rtl', status: 'fail',
      evidence: [
        'All six pages render with dir=rtl lang=ur at desktop 1280, narrow 360 and A4 print 794 widths; the Noto Nastaliq Urdu webfont is loaded and is the computed prose font; no horizontal overflow anywhere (render-inspection.json, render-inspect-views.txt)',
        'All six .ur.svg variants (and their dark twins) are horizontally mirrored per style guide v4.1: panels reflected about the viewBox centre, text-anchor start/end swapped, watermark repositioned; verified by coordinate comparison of each EN/UR pair',
        'BLOCKING: fig-U4-6.ur.svg and fig-U4-6.ur.dark.svg clip two method-column labels at the viewBox left edge under real Nastaliq metrics (figure-nastaliq-geometry.txt, pixel-clip-analysis.txt)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking', resolved: false,
      message: '[semantics] Rectangle defining property garbled: EN docs/semester-1/gqur-300/unit-04/topic-02.mdx:71-72 "four right angles and opposite sides equal" is rendered "مستطیل کے چار قائمہ زاویے اور سامنے کی باتیں برابر ہوتی ہیں" (UR i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/topic-02.mdx:68-69). "سامنے کی باتیں" ("the facing talks/things") is not recoverable as "opposite sides" (standard: مقابل اضلاع برابر ہوتے ہیں), and the same defective label "سامنے کی باتیں برابر" is carried in static/img/figures/gqur-300/unit-04/fig-U4-2.ur.svg and fig-U4-2.ur.dark.svg (EN label "opposite sides equal" in fig-U4-2.svg). This is SLO:GQUR-300-4-4 taught content. Repair in both the prose and both figure variants.',
    },
    {
      severity: 'blocking', resolved: false,
      message: '[semantics/terminology] "prefix" mistranslated as "لاحقہ" (suffix): EN docs/semester-1/gqur-300/unit-04/topic-01.mdx:39-40 "The metric system builds every unit from a base unit and a prefix" -> UR topic-01.mdx:38 "میٹرک نظام ہر اکائی کو ایک بنیادی اکائی اور ایک لاحقے سے بناتا ہے". kilo-, centi- and milli- are prefixes (سابقہ); the same file frontmatter (UR topic-01.mdx:10 blooms_summary) correctly says "سابقے", so the page contradicts itself with a false definitional claim about how metric units are formed. One-word repair: لاحقے -> سابقہ.',
    },
    {
      severity: 'blocking', resolved: false,
      message: '[assessment] Formative item demand changed and direction leaked: EN docs/semester-1/gqur-300/unit-04/topic-03.mdx:83-84 (Check your understanding 2) "Compute the litres to buy, and state why the answer rounds the way it does" -> UR topic-03.mdx:81-82 "خریدنے کے لیے لیٹر نکالیں، اور بتائیں کہ جواب اس لیے اوپر جاتا ہے" ("state why the answer goes up"). The English leaves the rounding direction open; the Urdu asserts "up", which both leaks the expected answer and is false for this item (8 m x 2.5 m = 20 sq m at 1 litre per 10 sq m = exactly 2 litres, no rounding). The parallel bank item keeps the open phrasing correctly (UR unit-assessment.mdx:105-106 "جواب کیوں اس طرح گول ہوتا ہے" vs EN unit-assessment.mdx:108-109). Repair: mirror the bank item phrasing.',
    },
    {
      severity: 'blocking', resolved: false,
      message: '[rtl] Clipped figure text in the Urdu variants of fig-U4-6: static/img/figures/gqur-300/unit-04/fig-U4-6.ur.svg and fig-U4-6.ur.dark.svg (identical strings and anchors). The "فارمولا یا طریقہ" column labels "کتابیں ضرب جلد کی موٹائی، پھر شیلف لمبائی پر تقسیم" (books x spine width, then divide by shelf length) and "لمبائی ضرب چوڑائی ضرب اونچائی، پھر 1,000 سے" (length x width x height, then by 1,000) are text-anchor="end" at x=208 but measure 236px and 224px wide in real Nastaliq, so they start at x=-22.7 and x=-16.4, outside the 0..780 viewBox. A canvas pixel scan confirms glyph ink cut at the left edge (y-band 291-297, the shelf row). The clipped edge removes the sentence-final operation words (تقسیم / سے 1,000), i.e. the divide and x-1,000 steps; the English originals fit inside the canvas. Same defect class as Unit 2 G5 finding F5. Repair: shorten the labels, reduce their font size, or re-anchor/widen the column in both variants.',
    },
    {
      severity: 'uncertain', resolved: false,
      message: '[authority] G3 dependency unmet and the English digest changed since the advisory review: no accepted G3 evidence exists (ADR-0019; specs/reviewers/registry.json has no enabled reviewers). The best-available G3 report (specs/content/gqur-300/reviews/unit-04/G3/agent-g3-gqur300-u4-run001.json, disposition revise, author_run_id commit:93e6321) predates the author repairs at 78f0366: the digests of docs/semester-1/gqur-300/unit-04/topic-01.mdx, topic-02.mdx and unit-assessment.mdx bound here differ from that report input manifest. The exact English inputs bound in this manifest are the authoritative comparison base (115/115 digests verified); the G3 advisory findings were not re-verified against the repaired English by any accepted review. Recorded as a dependency finding per the review contract, not an abort.',
    },
    {
      severity: 'uncertain', resolved: false,
      message: '[terminology] Perimeter rendered inconsistently and colliding with "sides": the UR index key_terms bank Perimeter as "اطراف کی پیمائش" (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/index.mdx:23-24) and specs/content/gqur-300/concepts/unit-04.md CON:GQUR-300-4-5 uses the full form, but the prose and assessment items use bare "اطراف" for perimeter in roughly twenty places (UR topic-02.mdx:51-52; unit-assessment.mdx:53, 83-87, 101, 132) while the same word also means "sides" in the shape definitions (UR topic-02.mdx:69 "تمام اطراف برابر" for the square; fig-U4-2.ur.svg triangle label "تین اطراف"), and fig-U4-3.ur.svg adds a third surface "اطراف (پیریمیٹر)". The sides/perimeter polysemy muddies the unit central boundary-vs-cover distinction. Needs an owner ruling (e.g. perimeter = اطراف کی پیمائش everywhere, sides = اضلاع) and a consistent repair; the bank is not edited from this review.',
    },
    {
      severity: 'uncertain', resolved: false,
      message: '[terminology] Unbanked math terms and cross-unit drift need owner decisions: none of the unit core terms (Unit of measurement, Perimeter, Area, Volume, Rectangle, Triangle, Circle, Radius, Kilogram, Centimetre, Millilitre) exist in specs/content/terminology.csv; "numeracy" is rendered "عددیت" in UR topic-03.mdx:46 but "عددی خواندگی" in i18n/ur/.../gqur-300/unit-06/topic-01.mdx:51,73 and unit-06/topic-02.mdx:33. Of the concept graph authored Urdu labels flagged for G5 review (specs/content/gqur-300/concepts/unit-04.md:31-48), ten are confirmed and two are defective: CON:GQUR-300-4-2 "میٹری سیڑھیاں دہریں دس سے چڑھتی ہیں" (garbled; the topic-01 prose correctly says "دس کی طاقتوں سے") and CON:GQUR-300-4-10 "چار مرحلوں والی پیمائشی کام" (gender agreement: والی -> والا, as in the prose). Propose banking the confirmed labels and repairing the two defective ones.',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[semantics] "odd-shaped staff room" rendered "غیر ہندسی اسٹاف روم" ("non-geometric staff room"), self-contradictory with "made of two rectangles": UR topic-02.mdx:86 and unit-teacher-notes.mdx:53 vs EN topic-02.mdx:89-90 and unit-teacher-notes.mdx:55-56. Repair: "غیر معمولی شکل کا" or "بے ترتیب شکل کا".',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[semantics] "accepting an impossible answer because the calculator said so" rendered "ناممکن جواب مانگ لینا" ("demanding an impossible answer"): UR topic-03.mdx:65 vs EN topic-03.mdx:66. مانگ لینا (demand) should be منا لینا (accept). Gist survives; one-word repair.',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[semantics] Teacher-notes drift: (a) "the two weeks the content-spec allows" attributed to "رہنما" (the guide) at UR unit-teacher-notes.mdx:24 vs EN :24-25; (b) "the unit\'s central transfer" becomes "یونٹ کا مرکزی سبق" ("central lesson") at UR unit-teacher-notes.mdx:67 vs EN :69, dropping the banked transfer concept (Transfer of Learning = تعلم کی منتقلی); topic-03 similarly weakens "it forces the transfer" to "لے جاتا ہے" (UR topic-03.mdx:46-48 vs EN :46-48), adding "سیکھنے والے کو" as the object.',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[completeness] Small omissions: (a) the ERQ-4 rubric drops "adds or subtracts a few metres" - UR unit-assessment.mdx:190-191 "اسٹور کے کٹاؤ کا اثر" vs EN :204-205; (b) fig-U4-4.ur.svg example-column header "حل شدہ مثال" drops "classroom" (EN "Worked classroom example"); (c) index "hover or tap them" rendered as "ان پر جائیں" - UR index.mdx:83-84 vs EN index.mdx:58-59 (same class as Unit 2 G5 finding F17).',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[register] One-word grammar and wording slips: "اندازا" -> اندازہ (UR topic-03.mdx:94, unit-assessment.mdx:28); "کتابوں کے عطیہ مہم" -> کتابوں کی عطیہ مہم (UR topic-03.mdx:27, ezafe agreement); "دو ممکن مطلب" / "ممکن اکائیاں" -> ممکنہ (UR topic-01.mdx:87, unit-assessment.mdx:100,156); "ترجیحی ترتیب دو جملوں میں بچائیں" reads "save the priority order"; prefer جوڑیں or پیش کریں for "Defend" (UR topic-02.mdx:88); "پای" -> پائی for pi (UR topic-02.mdx:73-75, unit-assessment.mdx:97,104,162); "خانہ" -> خلا for "amount of space" in the volume definition (UR topic-02.mdx:41); "سرکلر" transliterated where topic-01 uses گول for "round" (UR topic-02.mdx:97, topic-03.mdx:72, unit-assessment.mdx:104; prefer گول).',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[rtl] English-side figure label spills observed during render inspection (no Urdu impact; G3/owner territory): fig-U4-5.svg "estimate with round numbers:" starts 18px left of its panel box (bbox x=566.6 vs panel x=585); fig-U4-6.svg "length x width x height x 1,000" extends 26px past the table border (ends at 775.8 vs border 750). Both stay inside the canvas.',
    },
    {
      severity: 'advisory', resolved: false,
      message: '[accessibility] Inspection limitation: this session image-display tool returns no output for PNG files (the same limitation recorded by G3 run001 and the Unit 1/2 G5 runs), so pixel-level Nastaliq legibility was verified by font-aware geometry measurement (real webfont with standalone-<img> anchor semantics) and canvas pixel scans rather than eyeballing; the saved PNGs remain evidence for human inspection. Figure labels on student devices render in the OS Urdu font (the Figure component embeds SVGs via <img>, which cannot use the page Nastaliq webfont); on-page prose is webfont-served and verified loaded on all six pages.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.txt` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.txt` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.txt` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.txt` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.txt` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.txt` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${LOGS}/check-concept-graph.txt` },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: `${LOGS}/check-pipeline-gate.txt` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build.txt` },
    { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.txt` },
    { name: 'manifest-verify', exit_code: 0, log_path: `${LOGS}/manifest-verify-normalized.log` },
    { name: 'render-inspect', exit_code: 0, log_path: `${LOGS}/render-inspect.txt` },
    { name: 'render-inspect-views', exit_code: 0, log_path: `${LOGS}/render-inspect-views.txt` },
    { name: 'figure-nastaliq-geometry', exit_code: 0, log_path: `${LOGS}/figure-nastaliq-geometry.txt` },
    { name: 'figure-nastaliq-shots', exit_code: 0, log_path: `${LOGS}/figure-nastaliq-shots.txt` },
    { name: 'pixel-clip-analysis', exit_code: 0, log_path: `${LOGS}/pixel-clip-analysis.txt` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.txt` },
  ],
  evidence_manifest: evidence,
};

const out = `${DIR}/agent-g5-gqur300-u4-run001.json`;
writeFileSync(out, JSON.stringify(report, null, 1) + '\n');
console.log('wrote', out);
console.log('criteria:', report.criteria.map((c) => `${c.id}:${c.status}`).join(' '));
console.log('findings:', report.findings.map((f) => f.severity).join(', '));
console.log('evidence files:', Object.keys(evidence).length);
