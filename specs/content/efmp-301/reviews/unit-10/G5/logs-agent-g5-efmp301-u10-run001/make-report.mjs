// Assembles the G5 run001 report for EFMP-301 Unit 10 from the review evidence.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash as ch } from 'node:crypto';
import { join } from 'node:path';

const ROOT = process.cwd();
const G5 = 'specs/content/efmp-301/reviews/unit-10/G5';
const LOGS = `${G5}/logs-agent-g5-efmp301-u10-run001`;
const RENDERS = `${G5}/renders-agent-g5-efmp301-u10-run001`;

const manifest = JSON.parse(readFileSync(`${G5}/manifest.json`, 'utf8'));

const sha = (p) => ch('sha256').update(readFileSync(join(ROOT, p))).digest('hex');

const criteria = [
  {
    id: 'authority',
    status: 'unverified',
    evidence: [
      'Guide chain inherited from the G3 advisory review and re-checked on the Urdu: the guide five-strategy list (Scheme-and-Course-guides/extracted-text/1st 2026.txt:1173-1180) is reproduced in Urdu at index.mdx:22, topic-01.mdx:36 and unit-teacher-notes.mdx:26 (لیکچر، متعاملانہ بحث، سوال جواب، مظاہرہ، کیس اسٹڈی تجزیہ); SLO refs and Week 15/Chapter 10 framing preserved (unit-teacher-notes.mdx:22); every outcome of the index (Urdu index.mdx:28-31) is taught and assessed in Urdu',
      'UNVERIFIED because the contract requires accepted, signed G3 evidence for the exact bound English inputs: the only G3 evidence is advisory run001 (disposition revise) against the PRE-repair English; 12 of 91 shared bound inputs changed in repair commit d837f4eb and no round-2 G3 review exists (g3-dependency-drift.log). Owner escalation per the GQUR-300 PR #65 precedent',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      'All three Seifert & Sutton quotations verified in Urdu against the bound excerpt (sources/texts/seifert2009.md:293-309): the someplace-else quote with the baseball-coach attribution (topic-02.mdx:28 vs excerpt:293-296), Mager\'s observable-behaviour wording (topic-02.mdx:38 vs excerpt:304-309), and the clarity-benefits passage (topic-02.mdx:44 vs excerpt:298-302); citations kept in Latin; no unverifiable sources declared',
      'FAIL locus: fig-U10-1.ur.svg and fig-U10-1.ur.dark.svg still claim guide provenance for the uses column - header "گائیڈ کا نام / لیا استعمال" and the same claim in the <desc> - after the G3 repair removed exactly this claim from the EN SVGs, the MDX alt text and the manifest alt column (repair commit d837f4eb touched no .ur.svg despite its message saying "All changes mirrored into Urdu"); the guide names only the five strategy names, never uses',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'All four sub-topics taught in Urdu at the mapped headings: U10-1 "تدریسی طریقے: ہر ایک کس کام کے لیے اچھا ہے" and U10-2 "حکمت عملی کا چناؤ: طریقے کو مقصد سے ملانا" (topic-01.mdx:34,52); U10-3 "تدریسی ڈیزائن: نتائج سے پیچھے کی طرف منصوبہ بندی" and U10-4 "استاد کی تاثیر: یہ کیا ہے اور کیسے بڑھتی ہے" (topic-02.mdx:34,48) - verified against coverage/unit-10.md rows, content not just headings',
      'Every sub-topic assessed in Urdu: U10-1 (MCQ 1-4, RRQ 1-2, ERQ 1), U10-2 (MCQ 5, RRQ 3-4, ERQ 1/4), U10-3 (MCQ 6-9, RRQ 5-8, ERQ 2/4/5), U10-4 (MCQ 10, RRQ 9-10, ERQ 3) in unit-assessment.mdx; reinforcement rows present (topic-02 inventory revisits methods; unit summary; teacher-notes practical work)',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      'All 10 Urdu MCQs independently derived from the Urdu teaching text before reading the Urdu key (blind-derivation.md): c,b,b,b,b,b,b,b,b,c - matching the Urdu key and the English key exactly, with identical option content and order; RRQ mark splits (2/2/1+1/2/2/2/2/2/1+1/2) and all five ERQ rubrics (6/7/3/4, 6/8/2/4, 6/8/2/4, 5/7/4/4, 8/5/3/4, each summing to 20) match; Bloom labels match per item; ERQ 5 keeps the named-Sindh-class requirement (سندھ کی ایک نامی جماعت)',
      'FAIL loci: ERQ 4 rubric row 1 (unit-assessment.mdx:182) renders "a promise about learning" as "تعلیم کا وعدہ" (a promise about teaching) where topic-02.mdx:46 and unit-teacher-notes.mdx:49 correctly use تعلم; ERQ 4 stem (unit-assessment.mdx:113) renders "the improviser" as the unintelligible coinage "مہاجنسی", obscuring the item\'s third demand',
    ],
  },
  {
    id: 'accessibility',
    status: 'fail',
    evidence: [
      'Rendered inspection of all five Urdu pages (render-review.log; desktop/narrow360 PNGs and render-inspect.json under renders-...): no document overflow at 360x780 on any page; every table fits without a scroller (client 328 === scroll 328, measured on the table element); figures fit; A4 print emulation 794px clips nothing and all print figures fit (w=762, right=778); heading order has no skipped levels; all figure imgs carry Urdu alt text',
      'FAIL loci: fig-U10-3.ur(.dark).svg check-label line "اُس نتیجے کے لیے کرتی ہے؟" is clipped 17.5px past the left viewBox edge and fig-U10-2.ur(.dark).svg "کی خدمت کرتا ہے؟" 2.5px past, measured with the production Nastaliq webfont (figure-geometry-ur.json); figure-label Nastaliq legibility could not be visually confirmed on this host (no system Nastaliq font; Read tool returns no image content for the PNGs), so figure conclusions rest on browser-measured geometry',
    ],
  },
  {
    id: 'completeness',
    status: 'pass',
    evidence: [
      'Passage-by-passage alignment of all five file pairs (index, topic-01, topic-02, unit-assessment, unit-teacher-notes): no omissions or additions found - every heading, outcome, prerequisite, activity step, check item, summary sentence, checklist item, practicum task, summative task, rubric row, MCQ/RRQ/ERQ item, model answer, misconception block and further-reading citation is present in Urdu; no heading-only stubs',
      'Quantities and proper nouns preserved throughout: ساٹھ شاگرد/ایک تختہ/چالیس منٹ (60/1/40), چھ میں سے پانچ (five of six), 250-300 الفاظ, پندرہ دن (fortnight, idiomatic), حیدرآباد/جماعت ششم/دسمبر/پیر/بدھ, اللہ دینو/دو اسکولوں/انعام چارٹ, ERQ 2/ERQ 5 references in teacher notes',
    ],
  },
  {
    id: 'semantics',
    status: 'fail',
    evidence: [
      'Negation, modal force, comparisons, causal claims and instructional sequences otherwise preserved: the forward check changes the activity never the outcome (topic-02.mdx:42, MCQ 9, RRQ 8); the misconception corrections keep their force (topic-01.mdx:50, topic-02.mdx:46); the three water-cycle purposes and their method match (topic-01.mdx:26-38, RRQ 4)',
      'FAIL loci: index.mdx:35 "the management of Unit 8" rendered as the unintelligible garble "یونٹ 8 کی کاؤنٹرائزنگ"; unit-assessment.mdx:182 "a promise about learning" as "تعلیم کا وعدہ" (teaching, not learning - the تعلم/تعلیم defect family); unit-assessment.mdx:113 "the improviser" as the coinage "مہاجنسی"; fig-U10-3/fig-U10-4 Urdu labels render "evidence" as شہادت (testimony) where the prose uses ثبوت; topic-02.mdx:50 "unsentimental" rendered "بے لگام" (unrestrained); unit-teacher-notes.mdx:30 "front matter" rendered as the garble "فرق میٹر"',
    ],
  },
  {
    id: 'terminology',
    status: 'fail',
    evidence: [
      'Bank departures requiring conform-or-rule escalation to the owner (style-guide.md ## Terminology bank; terminology.csv): Teacher Effectiveness banked معلم کی افادیت (row 111) vs استاد کی تاثیر used 12x - the Urdu teacher notes even print the banked term in the banked-terms list (unit-teacher-notes.mdx:55) while the body uses the other; Teaching Strategy banked حکمتِ تدریس (row 24) vs حکمت عملی 15x; Validity banked صداقت (row 79) vs درستگی 4x including RRQ 7 and its model answer; Group Work banked گروہی کام (row 70) vs گروپ کام 7x; Lesson Plan banked سبقی منصوبہ (row 25) vs سبق کا منصوبہ 3x; Self-Assessment banked خود جائزہ (row 102) vs خود جانچ 2x',
      'Conformant where it matters most: Rubric = معیارِ جانچ (row 72) used throughout; Summative Assessment = مجموعی جائزہ (accepted pair, row 21); formative = تشکیلی consistently; evidence in prose = ثبوت; learning = تعلم in prose (one slip in the ERQ 4 rubric); the mechanical defect families from sibling units (شاگرڈ، منی روبرک، صورت بہبود، شہادت in MDX prose) are clean',
      'Figure/prose drift: figures use الٹی ڈیزائن/الٹی منصوبہ بندی for backward design (fig-U10-3 title, fig-U10-4 row 1) where all prose uses پیچھے کی طرف; unit title "تدریسی عمل" drops the Learning half of "Teaching-Learning Process" (no banked entry; owner term decision)',
    ],
  },
  {
    id: 'register',
    status: 'fail',
    evidence: [
      'Overall register is academic-plain and readable: sentence order is natural, technical terms are glossed at first use, Pakistani/Sindh classroom grounding preserved (Hyderabad Class 6, kettle and cold plate, sealed jar, Sindh class in ERQ 5)',
      'FAIL loci (an entering B.Ed student cannot parse these): index.mdx:35 "کاؤنٹرائزنگ" (management); unit-teacher-notes.mdx:30 "فرق میٹر" (front matter); unit-assessment.mdx:113 "مہاجنسی" (the improviser); fig-U10-3 label typo "دکھائے گہ" for دکھائے گا; heavy coinage متعاملانہ بحث for interactive discussion (5x); awkward "لمبے جملوں والی زبانی" for "a recitation with longer sentences" (topic-01.mdx:42); agreement slip "رویے والی الفاظ" (topic-02.mdx:38)',
    ],
  },
  {
    id: 'rtl',
    status: 'fail',
    evidence: [
      'Page-level RTL is sound: dir=rtl rendering verified on all five pages at desktop/narrow/print (render-review.log); tables read right-to-left with correct column order; bidi punctuation and embedded Latin (citations, option letters a-d, ERQ/MCQ labels) render correctly; numerals Western as in the EN design',
      'FAIL loci in the mirrored SVGs: (1) fig-U10-2.ur(.dark).svg and fig-U10-3.ur(.dark).svg marker path "M 780 0L 770 5L 780 10z" inside marker viewBox "0 0 10 10" - path bbox x=770-780 is clipped to nothing, so all three arrows in each figure have invisible arrowheads (figure-geometry-ur.json markersInside=false); (2) fig-U10-1.ur(.dark).svg and fig-U10-4.ur(.dark).svg header band "M 768 70H768V74H12z" has a zero-length first segment and renders a wedge tapering to nothing at the left instead of the EN full-width band; (3) grid dividers ARE correctly mirrored (fig-U10-1: 672/418/204 = 780-108/362/576; fig-U10-4: 568/236 = 780-212/544) - the pre-flight re-mirroring worked; (4) check labels clipped past the left viewBox edge (fig-U10-3 -17.5px, fig-U10-2 -2.5px, real-font measurement); (5) fig-U10-4.ur(.dark).svg fifth row keeps the pre-repair merged name+description with an empty practice-name cell (measured clear of یونٹ 2 by 51.5px - structural divergence from the repaired EN, not a collision); (6) all four .ur.svg keep EN-derived 16-20px line spacing while measured Nastaliq bboxes are 29-31px tall, so every wrapped pair interleaves by 11-14px (22/9/9/7 pairs; the site\'s own Urdu standard is line-height 2.2, src/css/custom.css:50)',
    ],
  },
];

const findings = [
  { severity: 'blocking', resolved: false, message: 'Figures/RTL: invisible arrowheads. fig-U10-2.ur.svg, fig-U10-2.ur.dark.svg, fig-U10-3.ur.svg and fig-U10-3.ur.dark.svg define marker id a10/a103 with viewBox "0 0 10 10" but path "M 780 0L 770 5L 780 10z" (browser-measured path bbox x=770 w=10, insideViewBox=false; figure-geometry-ur.json). The path was mirrored into 780-space inside the small marker viewport, so it is clipped away entirely: all three arrows in each figure render as bare lines with no heads, in light and dark. This is the known repo-wide marker-mirroring defect family; the pre-flight sweeps (72c14f85, 7da844e0) re-mirrored this unit\'s grids but not these markers. check:figures passes (it measures no marker geometry). Repair: restore the EN marker path "M0 0 L10 5 L0 10 z" (orient="auto" already handles direction) in all four files.' },
  { severity: 'blocking', resolved: false, message: 'Figures/RTL + semantics: the G3 round-1 figure repairs were not mirrored into the Urdu SVGs, although repair commit d837f4eb\'s message says "All changes mirrored into Urdu" (it touched no .ur.svg). (a) fig-U10-1.ur.svg/.ur.dark.svg still head the last column "گائیڈ کا نام / لیا استعمال" (guide-named use) and carry the same claim in <desc> - the exact guide-misattribution G3 blocking finding 3 repaired in the EN SVGs, the MDX alt text (now "ایک جماعتی استعمال") and the manifest alt column; the guide names only the five strategy names. (b) fig-U10-4.ur.svg/.ur.dark.svg\'s fifth row keeps the pre-repair structure: the practice-name cell is empty and the merged text "نشوونما کی نظر سے پڑھتی: یہ شاگرد کہاں ہے، اور اگلا مرحلہ کیا ہے" sits in the description column, where the repaired EN splits "reads developmentally" into the practice column and "where is this pupil, what is next" into the description. Measured with the production Nastaliq webfont the merged text spans x=292.7-557 and clears "یونٹ 2" (x=207.9-241.2) by 51.5px, so unlike the EN pre-repair state there is no overprint - the defect is structural parity, an empty practice cell. (c) fig-U10-3.ur.svg/.ur.dark.svg\'s check label still carries the full pre-repair question ("آگے کی جانچ: کیا یہ سرگرمی وہی شہادت پیدا اُس نتیجے کے لیے کرتی ہے؟") where the repaired EN was shortened to "check: does this produce it? for it?" - and the last line is 17.5px too wide for the space (see the clipping finding). Repair: mirror d837f4eb\'s SVG changes into all six .ur/.ur.dark files with Urdu labels.' },
  { severity: 'blocking', resolved: false, message: 'Figures/RTL: clipped check labels at the left viewBox edge, measured with the production Noto Nastaliq Urdu webfont (figure-geometry-ur.json): fig-U10-3.ur.svg/.ur.dark.svg line "اُس نتیجے کے لیے کرتی ہے؟" starts at x=-17.5 (clipped) and fig-U10-2.ur.svg/.ur.dark.svg line "کی خدمت کرتا ہے؟" at x=-2.5 (marginal clip). The labels are centre-anchored at x=40 with only 40px of left margin - enough for the EN lines, not for these Urdu lines in Nastaliq. The shared render-inspect geometry pass reports these files "clean" because it measures fallback-font metrics. Repair: shorten/re-wrap the label lines or move the anchor right.' },
  { severity: 'blocking', resolved: false, message: 'Figures/RTL: degenerate header separator band. fig-U10-1.ur.svg/.ur.dark.svg draw the header band as "M 768 70H768V74H12z" and fig-U10-4.ur.svg/.ur.dark.svg as "M 768 74H768V78H12z": the first H-segment is zero-length, so the path is the triangle (768,70)-(768,74)-(12,74), not the EN full-width rectangle "M12 70H768V74H12z". The band renders as a wedge that tapers to zero height at the left, degrading the header/body separator on all four table variants. Repair: use a full-width rectangle, e.g. "M12 70H768V74H12z" (the band needs no mirroring).' },
  { severity: 'blocking', resolved: false, message: 'Figures/terminology: "evidence" rendered شہادت (testimony) in the Urdu figures while the unit\'s prose consistently uses ثبوت - the known شہادت/ثبوت defect family residual. fig-U10-3.ur.svg/.ur.dark.svg: box 2 heading "شہادت", desc "دوسری شہادت", "شہادت پیدا کرنے کے لیے چنی جائے", check label "وہی شہادت پیدا"; fig-U10-4.ur.svg/.ur.dark.svg row 2 "شہادت، تشریح، عمل" for "elicits, interprets, acts". A student meeting شہادت in the diagram and ثبوت in the text meets two different words for the unit\'s central concept (and شہادت in an assessment context misleads toward testimony/witness). Repair: ثبوت throughout these labels.' },
  { severity: 'blocking', resolved: false, message: 'Assessment/semantics: ERQ 4 answer-key divergence. unit-assessment.mdx:182 (ERQ 4 rubric row 1) renders "What a backward plan is (a promise about learning)" as "پیچھے کی طرف کا منصوبہ کیا ہے (تعلیم کا وعدہ)" - a promise about TEACHING. The English key, topic-02.mdx:46 ("تعلم کے بارے میں وعدہ") and unit-teacher-notes.mdx:49 ("منصوبہ تعلم کا وعدہ ہے") all say learning (تعلم). This is the تعلم/تعلیم defect family inside a marking criterion: a marker following the Urdu rubric would accept "the plan is a promise about teaching", precisely the reading the unit\'s misconception block argues against. Repair: "تعلم کا وعدہ".' },
  { severity: 'blocking', resolved: false, message: 'Assessment/register: unintelligible coinage in ERQ 4\'s stem. unit-assessment.mdx:113 renders "what the script-follower and the improviser both miss" as "اسکرپٹ ماننے والا اور مہاجنسی دونوں کیا چھوڑ دیتے ہیں". "مہاجنسی" is not a recognizable Urdu word; an entering B.Ed student cannot recover the third demand of the item except from the rubric\'s "چھوڑنے والا" (row 3). Repair: a real Urdu rendering of the improviser, e.g. "فی البدیہہ کام کرنے والا" or the plan-abandoner phrasing the topic uses (topic-02.mdx:46 "منصوبہ چھوڑنے والا").' },
  { severity: 'blocking', resolved: false, message: 'Terminology bank departures on the unit\'s core terms - conform-or-rule escalation to the owner (style-guide.md ## Terminology bank: a conflict between a translator\'s term choice and the bank is resolved by the curriculum owner; same posture as the Unit 7/9 G5 round-1 blocking findings). Teacher Effectiveness is banked معلم کی افادیت (terminology.csv row 111) but the unit uses استاد کی تاثیر 12 times - and the Urdu teacher notes print the banked term in the banked-terms list (unit-teacher-notes.mdx:55) while every page of the body uses the other, so the unit contradicts its own terminology note. Teaching Strategy banked حکمتِ تدریس (row 24) vs حکمت عملی 15x; Validity banked صداقت (row 79) vs درستگی 4x, including RRQ 7\'s stem and model answer; Group Work banked گروہی کام (row 70) vs گروپ کام 7x; Lesson Plan banked سبقی منصوبہ (row 25) vs سبق کا منصوبہ 3x; Self-Assessment banked خود جائزہ (row 102) vs خود جانچ 2x. The bank is not changed by this review. Repair: either conform the Urdu to the bank or record the owner\'s ruling updating the bank.' },
  { severity: 'blocking', resolved: false, message: 'Semantics/register: garbled transliteration in the student-facing index. index.mdx:35 renders "the management of Unit 8" (prerequisite knowledge) as "یونٹ 8 کی کاؤنٹرائزنگ" - not an Urdu word and not decodable as "management"; the banked term for Classroom Management is جماعتی انتظام (terminology.csv row 26). The prerequisite chain (Units 1-9 meeting in the design of teaching) loses one of its five links for an Urdu reader. Repair: "یونٹ 8 کا جماعتی انتظام" (or the unit-8 phrasing the owner prefers).' },
  { severity: 'uncertain', resolved: false, message: 'G3 dependency not satisfied for the bound English inputs (owner escalation per the GQUR-300 PR #65 precedent). The only G3 evidence is advisory run001 (disposition revise, 4 blocking findings) reviewed against the PRE-repair English; 12 of 91 shared bound inputs genuinely changed in the G3 repair commit d837f4eb (EN topic-01/unit-assessment/unit-teacher-notes, concepts/unit-10.md, figures/unit-10.md, seifert2009.md, fig-U10-1/3/4 light+dark EN SVGs - g3-dependency-drift.log); no round-2 G3 review of the repaired English exists, and the report is unsigned under ADR-0019 advisory mode. The contract\'s accepted-signed-G3-for-current-inputs requirement therefore cannot be met; this review nevertheless performed the full comparison against the current bound English. The owner must either commission a fresh G3 round on the repaired English or record an explicit dependency ruling.' },
  { severity: 'advisory', resolved: false, message: 'Register repairs requested: "فرق میٹر" for "front matter" (unit-teacher-notes.mdx:30 - a garbled transliteration reading as "difference meter"; keep "front matter" in Latin or say "ابتدائی حصہ"); "بے لگام" for "unsentimental" (topic-02.mdx:50 - reads "unrestrained"; consider "بے لگام جذبات سے پاک" or "حقیقت پسندانہ"); "لمبے جملوں والی زبانی" for "a recitation with longer sentences" (topic-01.mdx:42; consider "لمبے جملوں والی رٹائی"); "رویے والی الفاظ" agreement slip (topic-02.mdx:38, should be "رویے والے الفاظ"); "متعاملانہ بحث" for interactive discussion (5x - heavy coinage; consider "باہمی بحث"); fig-U10-3 label typo "دکھائے گہ" for "دکھائے گا" (also in the dark variant).' },
  { severity: 'advisory', resolved: false, message: 'Figure/prose terminology drift and crowding: the figures use "الٹی ڈیزائن" / "الٹی منصوبہ بندی" for backward design (fig-U10-3 title/desc, fig-U10-4 row 1) while all prose uses "پیچھے کی طرف"; unify in the repair round. All four .ur.svg keep the EN-derived 16-20px line spacing while measured Nastaliq text bboxes are 29-31px tall, so every wrapped line pair\'s boxes interleave by 11-14px (22/9/9/7 pairs measured); the site\'s own Urdu standard is line-height 2.2 (src/css/custom.css:50). Ink collision could not be visually confirmed on this host (no system Nastaliq font; Read tool returns no image content for the PNGs), so this is recorded as crowding, not proven overprint - but the repair round should re-space Urdu figure text to the Nastaliq standard.' },
  { severity: 'advisory', resolved: false, message: 'Unit title under-translation: "Teaching-Learning Process" is rendered "تدریسی عمل" (the teaching process), dropping the Learning half of the guide\'s chapter name; no banked entry governs it. The Urdu mirrors the EN structure everywhere else. Owner term decision requested (e.g. "تدریس و تعلم کا عمل"); not blocking on its own.' },
  { severity: 'advisory', resolved: false, message: 'English-side/shared residuals for the owner, outside Urdu repair scope, faithfully mirrored by the Urdu (so they are not Urdu defects): (a) the d837f4eb repair commit message claims the index unit-assessment pointer was corrected to Topic 10.1 activity and the "a observation" grammar slip was fixed, but index.mdx and topic-02.mdx were not in that commit - index.mdx:56 still says "The unit assessment asks for one topic taught by three methods" (the three-method matching is topic-01\'s Activity) and topic-02.mdx:99 still reads "nameable in a observation"; the Urdu mirrors the pointer claim (index.mdx:44) while Urdu grammar has no a/an issue. (b) fig-U10-1.svg/.dark.svg internal <desc> still says "one use named in the course guide" though the visible header and MDX alt were repaired. (c) specs/content/efmp-301/figures/unit-10.md fig-U10-1 Prompt column still says "one guide-named use". (d) unit-teacher-notes.mdx EN description (line 3) still says "the practical work the course guide asks for" though the body attribution was repaired; the Urdu mirrors. These belong to the next G3 round or an owner sweep.' },
  { severity: 'advisory', resolved: false, message: 'Environment limitations recorded honestly: no system Arabic/Nastaliq font is installed on this review host (fc-list empty for nastaliq/naskh/arabic/urdu), and the Read tool returned no image content for the figure PNGs, so figure-label Nastaliq legibility could not be visually confirmed by eye; figure conclusions rest on browser-measured geometry with the production webfont injected (figure-geometry-ur.mjs + figure-geometry-ur.json, fontLoaded=true), the same basis as the sibling G5 runs. Page-level Urdu renders through the site webfont and is captured in the desktop/narrow PNGs. The shared render-inspect pass reports the Urdu SVGs "clean" only because it measures fallback-font metrics and checks neither marker paths nor the header band - the defects above are invisible to it. The Bash safety classifier flapped (transient automode-unavailable errors) during the session; affected commands were retried after read-only work, per the parent\'s operational note.' },
  { severity: 'advisory', resolved: true, message: 'Assessment equivalence verified (informational): all 10 Urdu MCQs were independently derived from the Urdu teaching text before reading the Urdu key (blind-derivation.md) and match the Urdu and English keys exactly (c,b,b,b,b,b,b,b,b,c); option order, RRQ mark schemes, all five 20-mark ERQ rubrics and Bloom labels match; ERQ 5 keeps the named-Sindh-class requirement; no item was lowered in cognitive demand and no answer is revealed by the translation.' },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
  { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
  { name: 'build', exit_code: 0, log_path: `${LOGS}/build.log` },
  { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.log` },
  { name: 'verify-manifest', exit_code: 0, log_path: `${LOGS}/verify-manifest.log` },
  { name: 'figure-geometry', exit_code: 0, log_path: `${LOGS}/figure-geometry-run.log` },
  { name: 'g3-dependency-drift', exit_code: 0, log_path: `${LOGS}/g3-dependency-drift.log` },
];

const evidence_manifest = {};
for (const f of readdirSync(join(ROOT, LOGS))) evidence_manifest[`${LOGS}/${f}`] = sha(`${LOGS}/${f}`);
for (const f of readdirSync(join(ROOT, RENDERS))) evidence_manifest[`${RENDERS}/${f}`] = sha(`${RENDERS}/${f}`);
evidence_manifest[`${G5}/summary-run001.txt`] = sha(`${G5}/summary-run001.txt`);

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 10,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:e8d035f3',
  reviewer_run_id: 'agent-g5-efmp301-u10-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-26T02:52:28Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-10/G3/agent-g3-efmp301-u10-run001.json',
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

writeFileSync(join(ROOT, `${G5}/agent-g5-efmp301-u10-run001.json`), JSON.stringify(report, null, 2) + '\n');
console.log('report written; evidence files:', Object.keys(evidence_manifest).length, 'criteria:', criteria.length, 'findings:', findings.length);
