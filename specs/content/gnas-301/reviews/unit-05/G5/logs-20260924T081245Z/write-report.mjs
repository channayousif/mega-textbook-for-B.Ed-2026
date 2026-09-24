// Assemble the G5 review report for GNAS-301 Unit 5 (run agent-g5-gnas301-u5-run001).
// Reads the prepared manifest (input digests, skill digest) and the computed
// evidence hashes; findings and criteria evidence are the reviewer's own.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync('specs/content/gnas-301/reviews/unit-05/G5/manifest.json', 'utf8'));
// Re-hash evidence here (excluding validate-report.txt, which records report-validation
// attempts after the report bytes exist and is not a review command log).
const evidence = {};
for (const dir of ['specs/content/gnas-301/reviews/unit-05/G5/logs-20260924T081245Z', 'specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z']) {
  for (const f of readdirSync(dir)) {
    const p = `${dir}/${f}`;
    if (p.endsWith('validate-report.txt')) continue;
    if (statSync(p).isFile()) evidence[p] = createHash('sha256').update(readFileSync(p)).digest('hex');
  }
}
const L = 'specs/content/gnas-301/reviews/unit-05/G5/logs-20260924T081245Z';
const R = 'specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z';
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-05';
const EN = 'docs/semester-1/gnas-301/unit-05';

const findings = [
  {
    severity: 'blocking',
    resolved: false,
    message:
      'No accepted G3 evidence exists for the English inputs bound to this review. Both G3 rounds ended in disposition revise ' +
      '(specs/content/gnas-301/reviews/unit-05/G3/20260924T001055Z-g3-attempt-01.json, 5 blocking findings; ' +
      'specs/content/gnas-301/reviews/unit-05/G3/round-02/agent-g3-gnas301-u5-run002.json, 5 blocking findings: the 5.1 RRQ deficit, ' +
      'the PM2.5 claims, the fig-U5-3 arrows, the coverage U5-07 cell, the alibhatti2017 author list). The author applied the full ' +
      'repair set post-report and this G5 manifest binds the repaired state at b80bcc9, where 5 of 7 English unit files ' +
      `(${EN}/topic-01.mdx..topic-04.mdx, unit-assessment.mdx) carry digests different from the G3 round-2 manifest. The G5 rubric ` +
      'requires accepted G3 evidence for the exact English inputs; a changed English digest invalidates the dependency. The third ' +
      'G3 cycle is owner-gated (specs/gaps.md G-2026-32, open; the same dependency question is already recorded for Units 1, 2, 4, 5, 6 ' +
      'in G-2026-24/31/32/33/34). The Urdu-side findings below stand on their own evidence and are preserved for the repair cycle; ' +
      'the dependency itself needs the curriculum owner to accept the repaired English state or authorise a third G3 cycle.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'Input drift during review: the bound Urdu inputs changed while this review was in progress, in two waves. (1) A sibling G5 session (Unit 6 round 1) committed f5da152 ("apply G5 Unit 6 round-1 Urdu repairs", 2026-09-24 04:00:59 -0500) in this shared worktree, which also applied the arsenic spelling fix ' +
      `آرینک -> آرسینک to ${UR}/topic-01.mdx, topic-04.mdx, unit-assessment.mdx and unit-teacher-notes.mdx, moving HEAD from the bound commit b80bcc9 to 063a2fc. ` +
      '(2) While this report was being finalized (~04:10 -0500 onward), additional UNCOMMITTED working-tree edits appeared, applying this report\'s own findings to unit-05 (fig-U5-1 y="130"/"150" in all four variants; موسم/موسمی -> موسمیاتی and کثیر الفریقی -> کثیر الجہتی in the .ur.svg labels; زیرِ تربیت for trainee; غیر دلکش for unglamorous; گرنے والا مادہ for spill; and others) plus sibling repairs in units 03/04; at 04:12 -0500 the recomputed manifest differed from the bound one in 22 digests (6 Urdu MDX + 16 figure SVGs) and the count was still growing. ' +
      'Every piece of evidence in this report predates all of this ' +
      '(manifest verified 03:13 -0500 with 0 problems; EN/UR passage reads 03:14-03:25; build 03:30; all renders and probes 03:31-03:55 against that build; the first edit landed 03:53:43), so all findings describe the bound b80bcc9 bytes and none of the new repairs is verified here. ' +
      'Per the skill, a mismatched digest requires escalation and the manifest is not silently refreshed: report validation against the current tree correctly rejects with "stale or incomplete input manifest" (validate-report.txt; a labelled diagnostic confirming every other contract check passes is in validate-report-diagnostic.txt). ' +
      'The parent must let the repairs land, prepare a fresh manifest at the repaired commit, and launch a fresh reviewer session to recheck; this drift does not change the validity of the other findings. Full timeline: logs-20260924T081245Z/input-drift.txt.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      `Negation reversed in the quoted misconception. EN ${EN}/topic-04.mdx:104 "International agreements are toothless talk shops" and ` +
      `EN ${EN}/unit-teacher-notes.mdx:41 "MEAs are toothless talk shops" are rendered "بین الاقوامی معاہدے دانت والی بات کرنے والی جگہیں ہیں" ` +
      `(${UR}/topic-04.mdx:60) and "ایم ای اے دانت والی بات کرنے والی جگہیں ہیں" (${UR}/unit-teacher-notes.mdx:29). "دانت والی" means ` +
      '"possessing teeth", the opposite of "toothless", so the quoted claim reads as "agreements are toothed talk shops"; the refutation ' +
      'that follows ("An MEA has no police, which is a real limit...") no longer answers the quoted claim coherently. Repair: "بے دانت" ' +
      'with a natural rendering of "talk shops" (e.g. "بے دانت باتوں کی محفلیں") in both files.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      '"Climate" is rendered as موسم/موسمی (season/seasonal) in the marking guidance and both governance figures, misnaming the subject ' +
      `of two MEAs and SDG 13. ${UR}/unit-assessment.mdx:152-153 gives the RRQ-10 model answers "ریو 1992 (موسم اور حیاتیاتی تنوع کنونشن)" and ` +
      '"پیرس 2015 (موسم)" (EN :180-181 "climate and biodiversity conventions" / "climate"); static/img/figures/gnas-301/unit-05/fig-U5-7.ur.svg ' +
      'labels Rio 1992 "موسم + حیاتیاتی تنوع کنونشن" and Paris 2015 "موسمی معاہدہ" (seasonal agreement); fig-U5-8.ur.svg labels ' +
      '"ایس ڈی جی 13 موسم" and "فوری موسمی کارروائی" (urgent seasonal action) for SDG 13 Climate Action. The unit prose itself uses the correct ' +
      `موسمیاتی (${UR}/topic-04.mdx:43,46,56), so a student meets two different words for climate, one of them wrong. Repair: موسمیاتی in all five loci.`,
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'The unit core concept "detoxification" is rendered "صاف کرنا" (to clean) throughout the Urdu prose while the Urdu figure variants and ' +
      'the concept graph use the transliteration "ڈی ٹاکسیفیکیشن", with no bridge between them. Prose loci: ' +
      `${UR}/index.mdx:9,27,28; ${UR}/topic-02.mdx:2,3,30,38,43,45,63; ${UR}/topic-03.mdx (title, :30,41,45,47,62); ${UR}/unit-assessment.mdx:22,70,100. ` +
      'Figure/concept loci: fig-U5-3.ur.svg ("ڈی ٹاکسیفیکیشن (عام)"), fig-U5-4.ur.svg (title), fig-U5-5.ur.svg, fig-U5-6.ur.svg; ' +
      'specs/content/gnas-301/concepts/unit-05.md:19-20,36-37. A reader who cannot read English cannot know the two are the same term; ' +
      '"صاف کرنا" also collides with the marketing "cleanse" vocabulary the topic argues against ("جگر صاف" tea, ' +
      `${UR}/topic-03.mdx:24,47) and with waste treatment (فضلہ صاف کرنا, ${UR}/topic-02.mdx:26). Same defect class as Unit 4 G5 blocking ` +
      'finding 6. Repair: adopt one term (ڈی ٹاکسیفیکیشن or زہر ربائی) across prose, figures and the concept graph, or gloss the plain ' +
      'verb with the technical term at first use.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'fig-U5-1.ur.svg carries invalid y attributes: all 10 second-line stage labels use y="130+0" or y="130+20" (literal arithmetic strings, ' +
      'not SVG lengths). Chromium parses no y value for them (text.y.baseVal empty; see ' +
      `${R}/check-y-attr.txt) and renders them at y=0, clipped at the figure top edge, so the five stage panels show only their headings ` +
      `(${R}/ur-figure-measurements.json: 10 clipped texts at y=-12 and 5 overlapping pairs). The identical defect exists in all four variants ` +
      '(fig-U5-1.svg, .dark.svg, .ur.svg, .ur.dark.svg), so it originates in the English figure and was not caught by G3 rounds 1-2; the Urdu ' +
      'variant is equally unusable. Repair: y="130" / y="150" in all four files.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      'Platform RTL alignment defect, production-confirmed. The Urdu build stylesheet contains ' +
      '"html[dir=rtl] .markdown{line-height:2.2;text-align:left}" (build/ur/assets/css/styles.161fd4ec.css; the same rule is live at ' +
      'textbook.com.pk, fetched 2026-09-24) because Docusaurus\'s RTL CSS pass flips the manually authored text-align:right in ' +
      'src/css/custom.css:49-52. Rendered Urdu headings and short/last lines anchor to the physical left edge (measured: first h2 text at ' +
      'elemLeft with ~196px empty to its right; synthetic probe left-anchored; CDP matched rules show the flipped declaration), inverting the ' +
      'intended RTL typography on every Urdu page site-wide. Not a translation defect of this unit; needs a platform fix (logical property ' +
      `text-align:start, or exclusion from the RTL flip) and a rebuild. Evidence: ${R}/rtl-alignment-defect.txt.`,
  },
  {
    severity: 'blocking',
    resolved: false,
    message:
      `EN ${EN}/topic-02.mdx:111-112 "note the door of absorption a spill would use" is rendered "وہ جذب کا دروازہ نوٹ کریں جو کوئی اخراج استعمال کرے گا" ` +
      `(${UR}/topic-02.mdx:74): "spill" becomes "اخراج", which is this unit's own stage-4 term for "excretion" (${UR}/topic-02.mdx:39 "اخراج یا ذخیرہ"), ` +
      'so the practicum instruction reads "note the absorption door that an excretion would use" - a confusing technical statement that collides ' +
      'with the journey vocabulary the students just learned. Repair: render "spill" as "انڈیلنے/بہنے والا کیمیکل".',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      '"واقفیت" (acquaintance/familiarity) is the prose term for "exposure/exposed" (e.g. "کون واقف ہے" for "who is exposed" and "بار بار واقفیت" for ' +
      `"repeated exposure": ${UR}/topic-03.mdx:41; ${UR}/topic-04.mdx:33,93; ${UR}/unit-assessment.mdx:38,117,130,147). In standard Urdu it means ` +
      'familiarity, and fig-U5-5.ur.svg instead uses "رابطہ" for the same concept, so the term is both misleading and internally inconsistent. ' +
      'Same class as Unit 4 G5 advisory finding 7 (advisory there too). Owner term decision needed (e.g. تعریض or a glossed loanword); the bank ' +
      'is not edited from here.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      '"Trainee teacher" is rendered "تربیت یافتہ استاد" (trained teacher), reversing the actor\'s status: ' +
      `${UR}/topic-03.mdx:24 (with the internally contradictory "تربیت یافتہ نے ابھی سیکھا ہے" - a trained teacher who has just learned), ` +
      `${UR}/topic-04.mdx:25,56,72 ("تربیت یافتہ کے سوال"). The B.Ed audience identification (a trainee applying fresh learning) is lost. ` +
      'Repair: "زیرِ تربیت استاد".',
  },
  {
    severity: 'advisory',
    resolved: true,
    message:
      'Arsenic is misspelled "آرینک" 12 times in the bound bytes of this unit (' +
      `${UR}/topic-01.mdx:44,59,63; ${UR}/topic-04.mdx:33,58,93; ${UR}/unit-assessment.mdx:40,117,126,171; ${UR}/unit-teacher-notes.mdx:18). ` +
      'The standard spelling is "آرسینک", which GNAS-301 Unit 2 already uses (i18n/ur/.../unit-02/topic-02.mdx:41), so the course was internally ' +
      'inconsistent as well. RESOLVED OUTSIDE THIS REVIEW: the sibling session\'s commit f5da152 applied "آرسینک" to all 12 occurrences in the four ' +
      'affected files mid-review (see blocking finding 2 / input-drift.txt); verified by grep (no آرینک remains in unit-05) and by the b80bcc9..HEAD diff, ' +
      'which contains no other unit-05 change. To be re-verified in the next round\'s fresh bundle; the bound bytes this report reviews still carry the misspelling.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Bloom tag "Evaluate" is split across the unit: item tags use "جانچیں" (' +
      `${UR}/unit-assessment.mdx:114-118; ${UR}/topic-03.mdx:58) but rubric rows use "تشخیص" (${UR}/topic-03.mdx:87; ${UR}/topic-04.mdx:100; ` +
      `${UR}/unit-assessment.mdx:165-172), and "تشخیص" is the banked term for Assessment (specs/content/terminology.csv:19), creating a vocabulary ` +
      'collision; the same split exists in Unit 4, so it is course-wide. Relatedly, bare "Assessment" in the page title "یونٹ 5 کا جائزہ" drifts ' +
      'from the banked تشخیص (جائزہ is accepted inside the banked summative compounds, which "مجموعی جائزہ" at :24 correctly is).',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Further prose/figure terminology drift on core terms (repair list for the owner): multilateral "کثیر الجہتی" (prose) vs "کثیر الفریقی" ' +
      '(fig-U5-7.ur.svg; concepts/unit-05.md:22,39); concentration "ارتکاز" (prose) vs "حراستی" (fig-U5-1.ur.svg); targets/indicators ' +
      '"ہدف/اشاریے" (prose) vs "نشان/پیمانہ" (fig-U5-8.ur.svg); organophosphate "آرگنو فاسفیٹ" (prose) vs "نامیاتی فاسفیٹ" (fig-U5-4.ur.svg); ' +
      'worked example "حل شدہ مثال" (prose) vs "حلیہ مثال" (fig-U5-1.ur.svg; حلیہ means disguise); handle "ہینڈل" (prose) vs "دستہ" (fig-U5-5.ur.svg); ' +
      'risk "رسک" (prose) vs "خطرے" (concepts/unit-05.md:21) while the prose reserves "خطرہ" for hazard; sprayer "سپرے والا" vs "چھڑکنے والا"; ' +
      'natural "قدرتی" (prose) vs "قدری" (fig-U5-5/6.ur.svg titles; concepts :20,37 - قدری is not the standard word for natural).',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'fig-U5-4.ur.svg geometry: the detoxification row\'s example cell "CO صاف ہوا میں سانس سے باہر" overlaps the risk label "وقت لیتا ہے" by ' +
      '43x17px and the cell carries a duplicated leftover fragment "صاف ہوا میں" (EN has two lines "CO breathed back out" / "in clean air"); ' +
      'slight overlap also between "ایک نامیاتی فاسفیٹ بدل کر" and "نقصان لیبل سے آگے" (11x16). The EN variant has its own header overlap ' +
      '("One worked example" over "The risk", 40x18px) - noted for the owner as an English-side defect. See ' +
      `${R}/ur-figure-measurements.json and en-figure-measurements.json.`,
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Register/calque repair list (localized and recoverable; none individually blocking): "بے نم والا" for "unglamorous" ' +
      `(${UR}/topic-03.mdx:41,62 - not an Urdu word; use غیر دلکش/سادہ); "سطر" for "journey" in the topic-02 activity (${UR}/topic-02.mdx:49 - ` +
      'سطر is a line of text; use سفر/نقشہ); "قطرے" for "queue" (' +
      `${UR}/unit-teacher-notes.mdx:27 - drops; use قطار); "پابندی یا پابندی" for "bans or restricts" (${UR}/topic-04.mdx:44 - "ban or ban"); ` +
      `garbled Minamata sentence (${UR}/topic-04.mdx:45 "جس کا زہر دنیا کو یہ لفظ سکھا گیا"); "کے خلاف رپورٹ" for "report against commitments" ` +
      `reads adversarially (${UR}/topic-04.mdx:37,56; ${UR}/unit-assessment.mdx:149); MCQ-1 option c "air sacs" rendered "ہوا کی نالیوں" (airways) ` +
      `(${UR}/unit-assessment.mdx:31 - distractor stays wrong, no key change); "along the Indus" dropped from the Alibhatti sentence (${UR}/topic-01.mdx:44); ` +
      `PM2.5 appositive grammar (${UR}/topic-01.mdx:39); "بھرتا ہے" for "shuffles" (${UR}/topic-04.mdx:64); "حقیقی والا" colloquialism ` +
      `(${UR}/topic-03.mdx:26); "طلبے" for طلبہ (${UR}/unit-teacher-notes.mdx:18); "جماعتی صورتحال" for "classroom situation" (all topic files; ` +
      'consider کلاس روم کی صورتحال); "زہری عنصر" for "toxic agent" - عنصر primarily denotes a chemical element while CO/SO2 are compounds ' +
      `(${UR}/topic-01.mdx passim); "فی ایک ایک جملہ" (${UR}/topic-02.mdx:54; ${UR}/topic-03.mdx:55); "دیرپان" for دیرپا (${UR}/topic-04.mdx:44); ` +
      'figure-label grammar (fig-U5-1.ur.svg "خون کی دریا" -> کے دریا and "بند سیڑھیاں میں" -> بند سیڑھیوں میں; fig-U5-2.ur.svg "دھوپ ... بناتا ہے" -> ' +
      `بناتی ہے; ${UR}/unit-assessment.mdx:94 "کون سا مرحلے نے" -> کس مرحلے نے).`,
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Platform figure-font limitation (carried from Unit 1/4 G5 reviews, reconfirmed here): .ur.svg labels are delivered via <img> and cannot ' +
      'load the page\'s self-hosted Noto Nastaliq Urdu webfont (src/css/custom.css:46); on hosts without a system Nastaliq font they render in a ' +
      'Naskh-style fallback (this host has only FreeSerif/Unifont for Arabic script per fc-list). Figure typography therefore cannot be ' +
      'Nastaliq-verified in this environment; page prose (non-img) does load the webfont correctly.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Visual inspection limitation: this reviewer session cannot display images (the Read tool returns no visual content for PNGs; both MCP ' +
      'browsers fail with "Could not find Google Chrome executable"). Render evidence is therefore programmatic (dir/lang, font loading, label ' +
      'geometry measurement, print emulation) plus 20 saved PNGs under ' +
      `${R} for human visual confirmation of Nastaliq legibility, shaping and bidi punctuation.`,
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'React hydration errors #418/#423 appear on the Urdu pages\' console (render-inspect.json desktopConsoleErrors); the same errors appear on ' +
      'the English pages (the G3 round-2 render baseline had the identical #418 set), so this is a platform issue, not a translation defect.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'glossary.json (repo root, 187 entries with Urdu definitions) is rendered into the Urdu pages\' Glossary tooltips but is not bound in the ' +
      'G5 input manifest. Its Urdu definitions were observed during rendering and are consistent with the unit\'s usage (e.g. the Detoxification ' +
      'entry\'s Urdu definition matches the ڈی ٹاکسیفیکیشن rendering used by the figures, not the prose\'s صاف کرنا). Request the parent bind it ' +
      'in future G5 bundles so tooltip content is inside the reviewed closure.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      'Unresolved G3 advisories mirrored faithfully in the Urdu (English-side defects, preserved across attempts per the skill): MCQ key clusters ' +
      'on option b (6 of 10; the Urdu preserves identical keys and option order, ' +
      `${UR}/unit-assessment.mdx:124-133); "this course lives inside half of them" for 7 of 17 SDGs rendered "ان میں سے آدھے کے اندر جیتا ہے" ` +
      `(${UR}/topic-04.mdx:50); the summative/formative near-duplicate items and U5-06's single integrative summative item carry over unchanged.`,
  },
];

const criteria = [
  {
    id: 'authority',
    status: 'fail',
    evidence: [
      'Content-side authority verified: specs/content/gnas-301/content-spec.md ## Unit 5 (SLO:GNAS-301-5-1..5-2, sub-topics U5-01..U5-07) remains the approved authority; ' +
        `${UR}/index.mdx:22-32 carries all seven unit learning outcomes one-for-one against ${EN}/index.mdx:26-38; clo_refs preserved verbatim in the frontmatter of all 7 Urdu files.`,
      'English dependency NOT satisfied (decisive for this criterion): G3 round 1 (reviews/unit-05/G3/20260924T001055Z-g3-attempt-01.json) and round 2 ' +
        '(reviews/unit-05/G3/round-02/agent-g3-gnas301-u5-run002.json) both ended disposition revise with unresolved blocking findings; 5 of 7 English unit files ' +
        'differ between the G3 round-2 manifest and this G5 manifest because the round-2 repairs were applied post-report; the third cycle is owner-gated ' +
        '(specs/gaps.md G-2026-32, open). See blocking finding 1. Additionally, the bound Urdu inputs drifted mid-review in two waves (sibling commit f5da152, then uncommitted repairs applying this report\'s findings; see blocking finding 2 and logs-20260924T081245Z/input-drift.txt), so the report no longer validates against the current tree.',
      'Grading note: the Unit 4 G5 report graded authority pass with the same dependency failure carried as a blocking finding; this review grades fail because ' +
        'the G5 rubric makes accepted G3 evidence for the exact bound English inputs a hard requirement of the G5 authority check.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'All in-text citation keys preserved with supporting meaning in the Urdu: (ڈبلیو ایچ او، 2021) topic-01:36; (ڈبلیو ایچ او، 2024) topic-01:39; ' +
        '(البھٹی وغیرہ، 2017) topic-01:44 and topic-04:58; (گوارڈنز اور کاسٹرو-جمیز، 2013) topic-04:44; (ڈبلیو ایچ او، بلا تاریخ) topic-02:43; ' +
        '(اقوام متحدہ، بلا تاریخ) topic-04:46; (اقوام متحدہ، 2015) topic-04:50.',
      'specs/content/gnas-301/sources/unit-05.md verified: two registry-verified open-access sources (guardans2013 Crossref-verified, alibhatti2017 DOAJ-verified) ' +
        'plus publisher-fetched WHO/UN pages; the two print monographs (haines-frumkin, park-park) are declared under ## Unverifiable sources with attempts, dates and ' +
        'owner rulings (D-2026-0001, confirmed in G-2026-23/D-2026-0021), which per the G3 reference does not by itself block.',
      'The 4.2 million premature-deaths figure is correctly localized as 42 لاکھ (topic-01:39); Further reading entries are kept in English with translated ' +
        'annotations in all four topics (topic-01:93-96; topic-02:93-95; topic-03:92-94; topic-04:106-110).',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'All 7 sub-topics U5-01..U5-07 (specs/content/gnas-301/coverage/unit-05.md) are taught in Urdu under matching headings: topic-01 (فضا کے عوامل کے زہری اثرات), ' +
        'topic-02 (جذب شدہ زہروں اور زینو بائیوٹکس کی منزل، بشمول صاف کرنا اور بائیو ایکٹیویشن), topic-03 (قدرتی صاف کرنے کے عمل), topic-04 ' +
        '(رسک کا انتظام / کثیر الجہتی ماحولیاتی معاہدے / پائیدار ترقی کے مقاصد (ایس ڈی جی) / عوامی صحت سے متعلق ماحولیاتی قوانین...).',
      'Every required outcome is assessed in Urdu: the 10/10/5 bank spans all four topics (MCQs 1-3 -> 5.1; 4-7 -> 5.2/5.3; 8 -> 5.3; 9-10 -> 5.4; RRQs 1-2 -> 5.1, ' +
        '3-4 -> 5.2, 5-7 -> 5.3, 8-10 -> 5.4; ERQs 1-4 one per topic plus the integrative ERQ-5), and each topic carries its 4-item formative set (اپنی سمجھ جانچیں).',
      'Full passage comparison across all 7 file pairs found no omissions or additions: every EN section has its UR counterpart and vice versa; no heading-only stubs.',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      'Independently answered all 10 Urdu MCQs from the Urdu text alone before reading the key: 1-b, 2-c, 3-c, 4-a, 5-b, 6-b, 7-c, 8-b, 9-b, 10-b - identical to the ' +
        'EN key and the UR key (unit-assessment.mdx:124-133); option order a-d preserved item-for-item; no translation reveals an answer or lowers cognitive demand.',
      'RRQ and ERQ task meaning, constraints (150-200 / 160-200 / 150-180 / 170-200 words), mark schemes (نمبر (2)/(4) allocations identical) and ERQ analytic rubric ' +
        'weights (0-3/0-2/0-1 bands, totals 10 each) are preserved (unit-assessment.mdx:135-172).',
      'FAIL locus: the RRQ-10 model answer misnames the subject of two of the six year-subject pairs - "ریو 1992 (موسم اور حیاتیاتی تنوع کنونشن)" and "پیرس 2015 (موسم)" ' +
        '(unit-assessment.mdx:151-153) render "climate" as "season" (EN :180-181), so a marker checking "1 per correct year-subject pair" against this model would accept ' +
        'the wrong subject word. Covered by blocking finding 4.',
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      'All 8 Urdu figures carry translated, descriptive alt text (topic-01:34,42; topic-02:34,41; topic-03:34,43; topic-04:39,52) and render through the lazy-loading ' +
        '<Figure> component (loading=lazy; in-viewport images complete with naturalWidth>0; zero 4xx/5xx requests - render-inspect.json).',
      'dir=rtl and lang=ur on all 7 pages; the Nastaliq webfont loads for page prose (document.fonts.check true, loaded family "Noto Nastaliq Urdu"); A4 print ' +
        'emulation shows 0 clipped article elements with dark figure variants hidden and light variants visible (printcheck-ur.json).',
      'Figure-label rendering defects are recorded under the rtl criterion (fig-U5-1 clipped labels, fig-U5-4 overlap); the console hydration errors are recorded as ' +
        'advisory (the English pages share them).',
    ],
  },
  {
    id: 'completeness',
    status: 'pass',
    evidence: [
      'Heading- and passage-level parity verified across all 7 file pairs: index (intro, outcomes, prerequisite, in-this-unit, how-to-use), each topic (classroom ' +
        'situation, explanation, activity, check-your-understanding, summary, self-assessment checklist, practicum, summative task, mini-rubric, further reading), ' +
        'unit-assessment (unit summary, summative assessment with MCQ/RRQ/ERQ banks, answers and marking guidance with all three subsections), teacher-notes (all 5 sections).',
      'All 8 figure IDs present in the Urdu files pointing at .ur.svg variants; word counts, activity timings (25/20/25/25 منٹ) and checklist item counts preserved; ' +
        'the 10/10/5 bank structure and blooms_summary descriptions match the English.',
    ],
  },
  {
    id: 'semantics',
    status: 'fail',
    evidence: [
      'Material divergences: "toothless talk shops" negation reversed (topic-04:60, teacher-notes:29 - blocking finding 3); "spill" rendered as the stage term ' +
        'اخراج/excretion (topic-02:74 - blocking finding 8); "climate" rendered موسم/season in the RRQ-10 model answer and both governance figures (blocking finding 4); ' +
        '"trainee teacher" reversed to "trained teacher" (advisory finding 10); "unglamorous" rendered with the non-word "بے نم والا" (advisory 15 repair list).',
      'Preserved correctly (spot-verified paired passages): the CO mechanism (binds the blood\'s oxygen seats hundreds of times more tightly; body suffocates with ' +
        'clean-looking lungs - topic-01:36); dose = concentration x time (topic-01:63); the four-stage journey with its two outcomes (topic-02:36-39); the phase-1/phase-2 ' +
        'balance and bioactivation risk (topic-03:36); the four risk management options with the school example (topic-04:33); the six MEAs with years and subjects ' +
        '(topic-04:41-46); the PEPA 1997 / NEQS / provincial-agency chain (topic-04:56); the 24-district arsenic finding (topic-01:44).',
      'Epistemic force preserved: modal claims stay modal (بڑھا سکتا ہے / کر سکتا ہے for "can raise" / "can be"); no may-to-always shifts found; quantities and dates ' +
        'checked one-for-one (4.2 million -> 42 لاکھ; 195 parties; 2 degrees / 1.5; all six MEA years).',
    ],
  },
  {
    id: 'terminology',
    status: 'fail',
    evidence: [
      'Frozen bank compliance where banked terms apply: Rubric = معیارِ جانچ (all four mini-rubric headings and the ERQ معیارِ جانچ sections); Summative Assessment = ' +
        'مجموعی جائزہ (unit-assessment:24); Group Work = گروہی کام (teacher-notes:22); Teaching Strategies = حکمتِ تدریس (teacher-notes:20); Self-Assessment = خود جائزہ ' +
        '(checklist headings). The bank was not modified.',
      'FAIL loci: detoxification prose/figure split صاف کرنا vs ڈی ٹاکسیفیکیشن (blocking finding 5); arsenic misspelled آرینک x12 against Unit 2\'s آرسینک in the bound bytes (advisory 11, resolved outside this review by the sibling commit f5da152); ' +
        'واقفیت for exposure with the figure using رابطہ (advisory 9); Bloom "Evaluate" split جانچیں/تشخیص colliding with the banked Assessment = تشخیص (advisory 12).',
      'The ten authored Urdu concept labels flagged for G5 review in specs/content/gnas-301/concepts/unit-05.md:27-42 were each compared against the prose: نقصان تک راستہ, ' +
        'خوراک اور راستہ, زینو بائیوٹک کا سفر, ایس ڈی جی کا ڈھانچہ and پاکستان کا ماحولیاتی قانونی ڈھانچہ are consistent with the prose; ڈی ٹاکسیفیکیشن اور بایو ایکٹیویشن, ' +
        'قدری ڈی ٹاکسیفیکیشن نظام, خطرے کے انتظام کے اختیارات and کثیر الفریقی ماحولیاتی معاہدے drift from the prose students read (advisory 13).',
    ],
  },
  {
    id: 'register',
    status: 'pass',
    evidence: [
      'Overall academic-plain (درسی مگر عام فہم) per style-guide.md:129: natural sentence order, gender-inclusive first-person checklists (سکتا/سکتی ہوں), consistent ' +
        'transliteration conventions for technical loans (سی او، پی ایم 2.5، این ای کیو ایس، پی ای پی اے، اے کیو آئی), and the classroom narratives kept concrete and local ' +
        '(کراچی، لوڈشیڈنگ، روئی کے کھیت).',
      'A repair list of coinages, calques and agreement errors is recorded as advisory finding 14 (بے نم والا، سطر، قطرے، حقیقی والا، طلبے، جماعتی صورتحال, and others); ' +
        'each is localized and does not block comprehension of the surrounding passages.',
    ],
  },
  {
    id: 'rtl',
    status: 'fail',
    evidence: [
      'Programmatic checks passed on the rendered Urdu pages (render-inspect.json, bidi-check.json, printcheck-ur.json): dir=rtl and lang=ur on all 7 pages; computed ' +
        'direction rtl on article, h1 and lists; Nastaliq webfont loads for page prose; Western digits only (0 Eastern/Arabic-Indic digits, 144 Western digits in the ' +
        'assessment); Latin embeds (WHO, option letters a-d) correctly isolated; tables fit the 360px viewport (width 328, no document overflow on any page); A4 print ' +
        'emulation clean (0 clipped elements, light figure variants visible).',
      'FAIL loci: (1) the platform RTL alignment defect - the Urdu build CSS flips text-align:right to left so Urdu headings and short/last lines anchor to the physical ' +
        'left edge on every Urdu page, production-confirmed (blocking finding 7; rtl-alignment-defect.txt); (2) fig-U5-1.ur.svg\'s 10 second-line stage labels clipped at ' +
        'y=0 from invalid y attributes (blocking finding 6; check-y-attr.txt, ur-figure-measurements.json); (3) fig-U5-4.ur.svg label overlap and duplicated fragment (advisory 14).',
      'Limitation: no human-eye visual confirmation of Nastaliq legibility/shaping in this session (advisory 17); 20 PNGs (desktop 1280x800, narrow 360x640, A4 print ' +
        '794x1123, and 8 Urdu figure renders) are saved under renders-20260924T081245Z for that confirmation.',
    ],
  },
];

const commands = [
  { name: 'verify-manifest', exit_code: 0, log_path: `${L}/verify-manifest.txt` },
  { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.txt` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.txt` },
  { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.txt` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.txt` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.txt` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.txt` },
  { name: 'build', exit_code: 0, log_path: `${L}/build.txt` },
  { name: 'serve', exit_code: 0, log_path: `${L}/serve.txt` },
  { name: 'render-review', exit_code: 0, log_path: `${L}/render-review.log` },
  { name: 'measure-ur-figure-text', exit_code: 0, log_path: `${L}/measure-ur-figure-text.txt` },
  { name: 'measure-en-figure-text', exit_code: 0, log_path: `${L}/measure-en-figure-text.txt` },
  { name: 'check-y-attr', exit_code: 0, log_path: `${L}/check-y-attr.txt` },
  { name: 'printcheck-ur', exit_code: 0, log_path: `${L}/printcheck-ur.txt` },
  { name: 'bidi-check', exit_code: 0, log_path: `${L}/bidi-check.txt` },
  { name: 'figure-label-extraction', exit_code: 0, log_path: `${L}/figure-labels.txt` },
];

const report = {
  schema_version: 1,
  course_code: 'GNAS-301',
  unit_no: 5,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:019-author-gnas-301',
  reviewer_run_id: 'agent:g5-reviewer:gnas301-u5-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T08:12:45Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  g3_report:
    'specs/content/gnas-301/reviews/unit-05/G3/round-02/agent-g3-gnas301-u5-run002.json (NOT accepted: disposition revise with 5 unresolved blocking findings; ' +
    '5 of 7 English unit files in this G5 manifest differ from that report\'s bound inputs because the round-2 repairs were applied post-report - see blocking finding 1 and G-2026-32)',
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
};

const out = 'specs/content/gnas-301/reviews/unit-05/G5/agent-g5-gnas301-u5-run001.json';
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log('report written:', out);
console.log('disposition:', report.disposition);
console.log('findings:', findings.filter((f) => f.severity === 'blocking').length, 'blocking,', findings.filter((f) => f.severity === 'advisory').length, 'advisory');
console.log('criteria:', criteria.map((c) => `${c.id}=${c.status}`).join(' '));
console.log('commands:', commands.length, 'evidence files:', Object.keys(evidence).length);
