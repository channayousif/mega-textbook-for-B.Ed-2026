import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-02/G5/manifest.json', 'utf8'));
const evidence = JSON.parse(readFileSync('/tmp/evidence-hashes.json', 'utf8'));
const L = 'specs/content/gqur-300/reviews/unit-02/G5/logs-agent-g5-gqur300-u2-run001';
const R = 'specs/content/gqur-300/reviews/unit-02/G5/renders-agent-g5-gqur300-u2-run001';

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 2,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:ea3877dd44663172464b6d30b231bdb594338dc9',
  reviewer_run_id: 'agent-g5-gqur300-u2-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T02:31:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {},
  rubric_version: '1.0.0',
  skill_version: '1.1.0',
  reviewed_commit: 'ea3877dd44663172464b6d30b231bdb594338dc9',
  prepared_manifest: 'specs/content/gqur-300/reviews/unit-02/G5/manifest.json',
  superseded_reports: [],
  g3_dependency: {
    accepted_g3_evidence: 'none. ADR-0019 keeps the G3 stage advisory and agent certification blocked; specs/reviewers/registry.json has no enabled reviewers.',
    best_available: 'specs/content/gqur-300/reviews/unit-02/G3/agent-g3-gqur300-u2-run001.json (advisory, unsigned, disposition revise, reviewed commit 235af7b)',
    english_inputs_changed_since_g3: 'yes - 8 of the 96 entries shared with the G3 manifest differ (topic-02, topic-03, unit-assessment, unit-teacher-notes, course-overview, concepts/unit-02.md, fig-U2-1.svg, fig-U2-1.dark.svg) because the author applied the G3 run001 repairs at 93e6321 and later. All five G3 run001 repairs were verified present in the bound English. The bound English inputs are the comparison base used throughout this review.',
  },
  summary: '', // filled below
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'Guide leaves G2.1-G2.4 and the content-spec Unit 2 sub-topic checklist (specs/content/gqur-300/content-spec.md, ## Unit 2, bound as the ADR-0027 Unit-2 slice) remain the approved scope; the Urdu index and topic structure carry the same titles, clo_refs and outcomes as the English (i18n/ur/.../unit-02/index.mdx frontmatter and ULO list match docs/.../unit-02/index.mdx).',
        'FAIL: the Urdu topic-01 activity and check-your-understanding sections present Unit 4 Topic 4.1 measurement-conversion material (i18n/ur/.../unit-02/topic-01.mdx:82-98, identical to i18n/ur/.../unit-04/topic-01.mdx:72-96), which is outside Unit 2\'s approved guide-derived scope; the English sections at docs/.../unit-02/topic-01.mdx:87-105 (bazaar ledger; number-line items) are the authorized content. See findings F1/F2.',
        'Urdu unit-level outcomes are still taught (explanations faithful) and assessed by the faithfully translated unit bank (all 10 MCQs, 10 RRQs, ERQs 2-5), so the failure is localized to the topic-01 formative sections.',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'All three bound sources remain cited in the Urdu files: NCC in topic-01 prose (UR:53-54) and Further reading; OpenStax in all three topics\' Further reading; gula2025 in topic-03 prose (UR:69-70) and Further reading (UR:142-144). The sources registry (specs/content/gqur-300/sources/unit-02.md) supports all three keys; the Urdu gula2025 Further-reading form (volume 25(1), 171-184, DOI) matches the registry.',
        'FAIL: the NCC citation sentence is compressed and its claim altered - EN "publishes the national mathematics curriculum for Grades 1-12 ... whole numbers and integers sit at its foundation, as they do in every school curriculum" becomes "NCC ke maths documents place whole numbers and integers in the elementary-secondary years" (topic-01 UR:53-54 vs EN:55-57); the Grades 1-12 scope and the every-curriculum comparison are dropped and "foundation" becomes a grade-band placement. See finding F13.',
        'FAIL: gula2025\'s "the mark of a genuine numeracy task" is rendered "ma\'ayari adadi kaam" (standard numeracy task), weakening the source\'s distinct-category claim that the G3 repair added this citation to support (topic-03 UR:69-70 vs EN:64-66). See finding F14.',
        'Unverifiable sources: none declared for this unit and none needed; source substance was verified by the G3 run001 retrieval and is unchanged in the bound English.',
      ],
    },
    {
      id: 'coverage',
      status: 'fail',
      evidence: [
        'Taught: all six sub-topics U2-01..U2-06 are taught in Urdu under the same headings as the coverage matrix (specs/content/gqur-300/coverage/unit-02.md) - topic-01 "tamam adad aur sahih adad" / "kasrein aur aishariye", topic-02 "nisbat aur tanasub" / "feesad", topic-03 "qotein aur jazar" / "rozmara itlaqat" - verified passage by passage.',
        'Assessed: the Urdu unit bank assesses all six sub-topics exactly as the English does (MCQ-01..10, RRQ-01..10, ERQ-01..05 all translated faithfully; independently answered, see assessment-independent-working.txt).',
        'FAIL: the Urdu topic-01 formative cycle does not assess U2-01/U2-02 - its activity and check sections are Unit 4 Topic 4.1 metric-conversion material (findings F1/F2), so the guide leaf G2.1\'s formative coverage is broken in the Urdu mirror while the English covers it.',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent answering of the Urdu bank (assessment-independent-working.txt): MCQ key agreement 10/10 (derived a,b,a,c,b,b,b,b,b,b); all 10 RRQ model answers agree with independent derivation; ERQs 2-5 arithmetically sound and matching (6,400 tie; 15-by-15 and 175 more tiles; 80/70/73.3/72/90 with the 42/60 analysis; 8 vans, 24,000 within 25,000, alternative 22,500). Option order, mark allocations (2/2/2 mini-rubrics; RRQ totals; ERQ totals 6/6/6/7/10) and Bloom labels are unchanged; no item leaks its answer; no item is lowered to recall by the translation.',
        'FAIL: the Urdu ERQ-1 rubric states "1,200 taqseem 7.33 taqreeban 171 rupees" - 1,200/7.33 is about 164, not 171; the English rubric reads "1,200 / 7 gives about 171 rupees per batch" (unit-assessment UR:187-190 vs EN:196-199). The Urdu mixes the 7.33 divisor with the /7 result: the marking guidance contains a false computation. See finding F4.',
        'FAIL: the Urdu topic-01 check items are not the English items (Unit 4 material substituted), so that formative assessment\'s meaning, answers and cognitive demand do not correspond (finding F2).',
      ],
    },
    {
      id: 'accessibility',
      status: 'fail',
      evidence: [
        'Rendered Urdu inspection (render-review.txt, render-inspection.json): all six pages render dir=rtl lang=ur; the self-hosted Noto Nastaliq Urdu webfont is the only loaded font, is the computed prose font, and document.fonts.check returns true for the full topic-01 article text, so every prose glyph is Nastaliq-covered; horizontal overflow 0 px at desktop 1280, narrow 360 (DPR 2 mobile) and A4 print emulation on all six pages; navbar/sidebar hidden in print; both figure images per topic wired to the .ur.svg variants with Urdu alt text; dark variants present and display:none until dark theme; light/dark Urdu figure labels identical.',
        'FAIL: the side note "0 ko tamam adad gina jata hai" in fig-U2-1.ur.svg and fig-U2-1.ur.dark.svg is clipped about 40 px past the left edge of the 780x470 viewBox (getBBox x1=-40.7; pixel analysis finds ink in columns 0-2 at the note\'s rows; the English variant carries the G3-repaired safe placement). A learner cannot recover the note. check:figures and scripts/measure-figure-text.mjs both pass because neither measures left-edge glyph geometry. See finding F5.',
        'Readability of prose is otherwise intact; the broken word "shar-bat" (F6) and the Cyrillic "zapas" (F7) render as script switches inside sentences and harm comprehension at those two spots.',
      ],
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        'FAIL: two whole sections of Urdu topic-01 are replaced by other-unit content: the activity (EN:87-94 bazaar ledger, 25 minutes -> UR:82-88 conversion market, 20 minutes) and check your understanding (EN:96-105 four number-system items -> UR:90-98 four Unit 4 conversion/measurement items). Findings F1/F2 with full paired text in bilingual-comparison.txt.',
        'FAIL: the topic-02 add-to-scale misconception paragraph drops the batch-feeds-20 explanation, the 50-person counterexample (15 spoons, 10 tea), "cooks for only 40" and "ten guests go hungry", leaving the UR explanation unable to support UR check-item 5 and RRQ-06, which quote the full batch rule (topic-02 UR:53-56 vs EN:55-61). Finding F3.',
        'Further omissions recorded as advisory: teacher-notes drops "the second-largest raw number" qualifier (F16) and misrenders the plan/carry-out instruction (F15); index drops "hover or tap" (F17); topic-02 rubric drops "not merely named" (UR:132); ERQ-4 stem drops nothing material.',
        'Everything else is complete: no heading-only stubs; all nine-part topic cycles present in Urdu; index, explanations, activities (topic-02/03), check items (topic-02/03), summaries, checklists, practicum tasks, summative tasks, mini-rubrics, further reading, the full unit bank with answers and marking guidance, and the teacher notes are all present and passage-complete apart from the items listed.',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'FAIL: the misconception invariant "the amount per person" is translated as "taste" ("zaiqe ko nisbat chahiye", topic-02 UR:55), replacing the mathematical invariant with a sensory one (finding F3).',
        'FAIL: "Mr. Rashid" becomes "Ms. Rashid" (mas rashed, topic-01 UR:27) for a male character with masculine verb agreement (finding F12).',
        'FAIL: source-bearing claims altered: NCC sentence (F13) and "genuine numeracy task" -> "standard" (F14).',
        'FAIL: teacher-notes instruction "let the class build the plan before you show the carry-out step" becomes "let the class make the operation step itself first" (F15); "make the abstract concrete" becomes "make the summary solid" (khalas = summary, F15).',
        'Further semantic drifts recorded as advisory (finding F17): "integer sense" -> "number sense"; "confused" -> "gets alarmed"; "performs worst" -> "least actor" (adakar); "bracket a root" -> "test a root"; "defensible computation" -> "defensive computation"; "justified choice" -> "legitimate choice"; "tiling" -> "making squares" (index).',
        'Negation, modal force, quantities, percentages, dates and comparisons were checked passage by passage across all six file pairs and are otherwise preserved (e.g. "never adds" -> "kabhi nahin"; "must agree" -> "zaruri hai"; all rupee amounts, counts and percentages identical); full log in bilingual-comparison.txt.',
      ],
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'Bank-bound terms: "Rubric" (terminology.csv:72, ma\'yar-e-jaanch, prose term adopted 2026-09-14) is rendered as the transliterations "mini rubrik" (topic files) and "rubriks" (unit-assessment UR:185) - drift from the bank (finding F10). "Self-Assessment" (bank: khud jaiza / khud tashkheesi) is rendered "khud jaanch" in every checklist heading (F10). "Summative assessment" -> "mujmali jaiza" matches the bank\'s accepted pair.',
        'Mathematics terms are not banked (the bank holds education-psychology terms only), so the unit\'s internally consistent choices were checked against standard Urdu usage and glossary.json: ratio/nisbat, proportion/tanasub, percentage/feesad, power/quwwat, base/asas, square root/jazar, fraction/kasr, decimal/a\'ishariya, numerator/shumaar kuninda, denominator/nisab numa, rate/sharah are all standard and consistent with the concept-graph labels (concepts/unit-02.md).',
        'DISPUTED (owner ruling requested, findings F8/F9): "Whole number" -> "tamam adad" (literally "all numbers"; standard is mukammal adad) - used in the index, topic-01, topic-03 item 3, MCQ-01, RRQ-07, teacher notes, fig-U2-1.ur.svg and the CON-2-1 label, and embedded in glossary.json; "Exponent" -> "wasi\'" (literally "wide"; standard is quwwat-numa) - topic-03 UR:40,52 and glossary.json. Both are misleading as literal readings; both are consistent across the unit, so this is a course-level terminology dispute, not unit-local drift. The bank was not edited.',
        'Script integrity: the broken word "shar-bat" (Arabic-script shar + Latin "bat", teacher-notes UR:44), the Cyrillic word "zapas" (topic-03 UR:134, unit-assessment UR:197) and the untranslated English "tutors" (topic-01 UR:84, topic-02 UR:80, topic-03 UR:84, teacher-notes UR:10 - a course-wide pattern shared with unit-01) all occur inside Urdu prose (findings F6/F7/F19).',
        'The 13 authored concept labels flagged for G5 review in concepts/unit-02.md were each confirmed serviceable except CON-2-1\'s "tamam adad" (F8); survivors other than that dispute can be promoted into the bank per that file\'s request.',
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'The register is academic-plain (darsi magar a\'am fehmi) for the large majority of the prose: short sentences, everyday classroom grounding (Jodia Bazaar, Skardu, Nawabshah, rupee examples preserved), technical terms defined at first use in plain words, consistent with style-guide ## UR register rules.',
        'FAIL: localized broken or ungrammatical constructions an entering B.Ed student will stumble on: "do jug shar-bat ke jag daalein" (doubled "jug" plus the corrupted sherbet word, teacher-notes UR:44, F6); "chaar amal kasron aur a\'ishariyon ke saath saath saath dikhata hai" (triple saath, missing object marker, topic-01 UR:67-68); "jo hisaab jo baad mein aata hai" (doubled jo, topic-03 UR:70); "sqrt(50) aapas mein 7 aur 8 ke beech baiththa hai" (redundant aapas mein, topic-03 UR:48-49); "battery ka satah" (gender error, topic-02 UR:64); verb-first orders "nikaalein ek theila" (topic-01 UR:126, unit-assessment UR:121); "classic trap" calqued as "klasik jaal" (topic-02 UR:66-67, summary UR:104).',
        'Address gender: the unit consistently addresses the reader in the feminine (karati hain, sakti hun), matching GQUR-300 units 1 and 4, while EFMP-301/302 mix genders; recorded as a corpus-wide convention question for the owner (finding F20), not a unit-local defect.',
      ],
    },
    {
      id: 'rtl',
      status: 'fail',
      evidence: [
        'Rendered RTL verified on all six pages: dir=rtl, lang=ur, Urdu h1 per file, Nastaliq webfont loaded and covering all prose glyphs, zero horizontal overflow at 1280/360/print, print stylesheet hides chrome (render-review.txt; screenshots for all six pages at three viewport setups in renders-agent-g5-gqur300-u2-run001/).',
        'Figures: all six .ur.svg variants translate the English labels faithfully (verified label by label against the English SVGs) and mirror their horizontal layout per style-guide v4.1 - the two tables put the row-label column rightmost, the flowchart\'s branches and the tile-growth sequence read right to left, the wordmark moves to the left edge; light and dark Urdu twins are identical; the Figure img tags point at the .ur.svg sources with Urdu alt text (verified in the rendered DOM, not only in the MDX).',
        'Numerals and embedded Latin: Western digits inside RTL prose render without overflow; the intentional Latin embeds (sqrt(64), 8^2, MCQ/RRQ/ERQ labels, citation names and URLs) render as intended; ratio notation uses the Urdu "be" ("18 be 12") consistently.',
        'FAIL: fig-U2-1.ur.svg and fig-U2-1.ur.dark.svg clip the side note at the left edge (x=84 text-anchor=end, glyph box to x1=-40.7 in the 780-wide viewBox; ink in columns 0-2 of the standalone render at the note\'s rows). The anchor was swapped for RTL but the x was not reflected about the viewBox centre (the true mirror of the repaired English placement is x=696), so the note runs off the canvas (finding F5).',
        'Platform observation (advisory, not a unit defect): the sidebar/breadcrumb category label renders in English on the Urdu pages because no Urdu tree in the corpus carries a translated _category_.json; the draft badge itself renders in Urdu.',
      ],
    },
  ],
  findings: [], // filled below
  commands: [
    { name: 'input-binding-verification', exit_code: 0, log_path: `${L}/input-binding-verification.txt` },
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.txt` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.txt` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.txt` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.txt` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.txt` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.txt` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${L}/check-concept-graph.txt` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${L}/check-bloom-bands.txt` },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: `${L}/check-pipeline-gate.txt` },
    { name: 'build', exit_code: 0, log_path: `${L}/build.txt` },
    { name: 'serve', exit_code: 0, log_path: `${L}/serve.txt` },
    { name: 'render-review', exit_code: 0, log_path: `${L}/render-review.txt` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${L}/measure-figure-text.txt` },
    { name: 'measure-ur-text-bbox', exit_code: 1, log_path: `${L}/measure-ur-text-bbox.txt` },
    { name: 'pixel-clip-standalone', exit_code: 0, log_path: `${L}/pixel-clip-standalone.txt` },
    { name: 'font-coverage', exit_code: 0, log_path: `${L}/font-coverage.txt` },
    { name: 'assessment-independent-working', exit_code: 0, log_path: `${L}/assessment-independent-working.txt` },
    { name: 'bilingual-comparison', exit_code: 0, log_path: `${L}/bilingual-comparison.txt` },
  ],
  evidence_manifest: evidence,
};

report.findings = [
  { severity: 'blocking', resolved: false, message: 'F1 Urdu topic-01 ACTIVITY REPLACED with Unit 4 material: i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-01.mdx:82-88 carries "sargray: tabdeeli ka bazaar" (conversion market: six market slips, unit conversion, rate-card pricing, 20 minutes) instead of the English bazaar ledger activity (docs/semester-1/gqur-300/unit-02/topic-01.mdx:87-94: mock shop ledger, number line, closing position, fraction-to-decimal check, 25 minutes). The substituted text is Unit 4 Topic 4.1\'s activity (docs/.../unit-04/topic-01.mdx:75-82 and i18n/ur/.../unit-04/topic-01.mdx:72-88). REPAIR: translate the English bazaar ledger activity into this section.' },
  { severity: 'blocking', resolved: false, message: 'F2 Urdu topic-01 CHECK YOUR UNDERSTANDING REPLACED with Unit 4 material: i18n/ur/.../unit-02/topic-01.mdx:90-98 contains the four metric-conversion/measurement items (3.4 m to cm; 250 cm roll for 15 m; "tank holds 500"; tablecloth and dupatta-border shapes) instead of the English number-system items (docs/.../unit-02/topic-01.mdx:96-105: order 2, -3, 1/2, 0.75, -0.5 on a number line; 9,000/4,500 integer position; 3/4 kg flour recipes from 1.5 kg; explain 12 x 0.1 < 12). The substituted items are i18n/ur/.../unit-04/topic-01.mdx:84-96. The Urdu formative cycle therefore does not assess U2-01/U2-02. REPAIR: translate the four English items.' },
  { severity: 'blocking', resolved: false, message: 'F3 Urdu topic-02 misconception paragraph compressed and its invariant changed: i18n/ur/.../unit-02/topic-02.mdx:53-56 drops the batch-feeds-20 explanation, the 50-person counterexample (multiplier 2.5; 15 spoons of sugar, 10 of tea), "cooks for only 40" and "ten guests go hungry", quotes a truncated rule ("30 more people, so 6 more spoons of sugar" - no batch, no tea) and replaces the invariant "the amount per person" with "taste" ("zaiqe ko nisbat chahiye"). The English (docs/.../unit-02/topic-02.mdx:55-61) is the G3-repaired non-doubling version; the Urdu explanation no longer supports UR check-item 5 (UR:95-97) or RRQ-06 (i18n/ur/.../unit-02/unit-assessment.mdx:108-109), which quote the full batch rule. REPAIR: translate the repaired English paragraph in full, restoring the per-person invariant and the worked numbers.' },
  { severity: 'blocking', resolved: false, message: 'F4 Arithmetic error in the Urdu ERQ-1 rubric: i18n/ur/.../unit-02/unit-assessment.mdx:187-190 says "1,200 taqseem 7.33 taqreeban 171 rupees per batch" - 1,200/7.33 is about 164, not 171. The English rubric (docs/.../unit-02/unit-assessment.mdx:196-199) reads "1,200 / 7 gives about 171 rupees per batch". The Urdu topic-01 mini-rubric (UR topic-01:132-134) carries both computations correctly (7.33 -> 164; 7 -> 171), so the assessment file mixed the two. REPAIR: restore "1,200 taqseem 7 taqreeban 171 rupees" (or present both computations as the topic file does).' },
  { severity: 'blocking', resolved: false, message: 'F5 Clipped figure text in the Urdu variants: static/img/figures/gqur-300/unit-02/fig-U2-1.ur.svg and fig-U2-1.ur.dark.svg anchor the side note "0 ko tamam adad gina jata hai" at x=84 with text-anchor="end", so the glyphs run leftward off the canvas; in-browser getBBox measures the note at x1=-40.7..x2=84.3 (y 417-432) in the 780x470 viewBox and pixel analysis of the standalone render finds ink in columns 0-2 at the note\'s rows (measure-ur-text-bbox.txt, pixel-clip-standalone.txt, fig-U2-1-ur-standalone.png). The English fig-U2-1.svg carries the G3-repaired safe placement (x=84, text-anchor="start"); the Urdu variant swapped the anchor for RTL but did not reflect x about the viewBox centre (true mirror: x=696, text-anchor="end"). check:figures and scripts/measure-figure-text.mjs both pass (neither measures left-edge glyph geometry). REPAIR: re-place the note at the mirrored position in both Urdu variants, then re-measure.' },
  { severity: 'blocking', resolved: false, message: 'F6 Corrupted word and garbled sentence in the teacher notes: i18n/ur/.../unit-02/unit-teacher-notes.mdx:44 renders "pour two jugs of sherbat" as "do jug shar-bat ke jug daalein" - the word sherbat is broken into Arabic-script shar plus Latin "bat" (bytes: shar + "bat"), and the phrase doubles "jug" ungrammatically. This is the add-to-scale demonstration sentence the G3 repair targeted; the instruction cannot be read as written. REPAIR: "do jug shirbat daalein" (or equivalent grammatical Urdu).' },
  { severity: 'blocking', resolved: false, message: 'F7 Cyrillic word inside Urdu prose: "spare tiles for future repairs" is rendered "marmamat ke liye ZAPAS tile" with the Russian word запас (U+0437 U+0430 U+043F U+0430 U+0441) at i18n/ur/.../unit-02/topic-03.mdx:134 (mini-rubric) and i18n/ur/.../unit-02/unit-assessment.mdx:197 (ERQ-3 rubric). It renders as a script switch mid-sentence. REPAIR: replace with an Urdu word (izafi / zakheera / spare).' },
  { severity: 'uncertain', resolved: false, message: 'F8 Terminology dispute - "whole number" is rendered "tamam adad" (literally "all numbers") throughout the unit (index UR:2-3,21; topic-01 UR:2-3,21,37,39; topic-03 UR:94; unit-assessment UR:36,145; teacher-notes UR:41; fig-U2-1.ur.svg; concepts/unit-02.md CON-2-1). The standard Urdu mathematics term is "mukammal adad". The choice is consistent across the unit and is embedded in glossary.json (the Integer entry\'s Urdu definition uses "tamam adad"), but it is not banked (terminology.csv has no mathematics entries) and MCQ-01\'s stem "kas fehrist mein sirf tamam adad hain?" reads as "which list contains only all numbers?", which can mislead an examinee. OWNER RULING REQUESTED: bank "Whole number" (proposed mukammal adad) or bless tamam adad, and align glossary.json and the concept label. The bank was not edited by this review.' },
  { severity: 'uncertain', resolved: false, message: 'F9 Terminology dispute - "exponent" is rendered "wasi\'" (literally "wide/spacious"; standard: quwwat-numa) at i18n/ur/.../unit-02/topic-03.mdx:40,52, matching glossary.json\'s Exponent entry ("wasi\' (exponent)"). A misleading literal calque, though defined inline at first use. OWNER RULING REQUESTED together with F8; the bank was not edited.' },
  { severity: 'uncertain', resolved: false, message: 'F10 Bank drift on bound terms: "Rubric" (terminology.csv row 72: ma\'yar-e-jaanch, prose term adopted 2026-09-14, with a note that no course uses the former term) is rendered as transliterations "mini rubrik" (i18n/ur/.../unit-02/topic-01.mdx:130, topic-02.mdx:126, topic-03.mdx:129) and "rubriks" (unit-assessment.mdx:185); "Self-Assessment" (bank: khud jaiza / khud tashkheesi) is rendered "khud jaanch" in every topic checklist heading. REPAIR: use the bank terms (ma\'yar-e-jaanch; khud jaiza), or record an owner ruling extending the bank. "Summative assessment" -> "mujmali jaiza" matches the bank\'s accepted pair; the topic heading "mujmali kaam" is a variant of the bank family (recorded, not counted a defect).' },
  { severity: 'uncertain', resolved: false, message: 'F11 English-review dependency is advisory only: no accepted G3 evidence exists for this unit (ADR-0019; specs/reviewers/registry.json has no enabled reviewers), and the only English review, the advisory G3 run001 report (specs/content/gqur-300/reviews/unit-02/G3/agent-g3-gqur300-u2-run001.json, disposition revise, unsigned), reviewed different English bytes for 8 of 96 shared inputs (topic-02, topic-03, unit-assessment, unit-teacher-notes, course-overview, concepts/unit-02.md, fig-U2-1.svg, fig-U2-1.dark.svg) - the author applied its repairs at commit 93e6321 and later. All five G3 run001 repairs were verified present in the bound English (non-doubling 30-more-people case; gula2025 prose citation; CON-2-7 unlinked from RRQ-05; fig-U2-1 note repositioned; 42/60 "second-largest raw number"). This review used the bound English inputs as the comparison base per the parent\'s instruction. A future pass would additionally require accepted G3 evidence for these exact English bytes; no g3_report field is set because no accepted report exists.' },
  { severity: 'advisory', resolved: false, message: 'F12 "Mr. Rashid" is rendered "Ms. Rashid" (mas rashed) at i18n/ur/.../unit-02/topic-01.mdx:27 although the character is male (his brother\'s shop; masculine verb agreement "hanste hain"). REPAIR: mister rashed.' },
  { severity: 'advisory', resolved: false, message: 'F13 The NCC citation sentence is compressed and its claim altered: docs/.../unit-02/topic-01.mdx:55-57 ("The National Curriculum Council publishes the national mathematics curriculum for Grades 1-12 (NCC, n.d.); whole numbers and integers sit at its foundation, as they do in every school curriculum, because everyday bookkeeping demands them") becomes i18n/ur/.../topic-01.mdx:53-54 ("NCC\'s mathematics documents place whole numbers and integers in the elementary-secondary years because everyday bookkeeping demands them (NCC, undated)") - the Grades 1-12 publication scope and the every-curriculum comparison are dropped and "foundation of the curriculum" becomes a grade-band placement. REPAIR: translate the sentence in full.' },
  { severity: 'advisory', resolved: false, message: 'F14 "the mark of a genuine numeracy task" is rendered "the mark of a standard numeracy task" (ma\'ayari adadi kaam) at i18n/ur/.../unit-02/topic-03.mdx:69-70, weakening the gula2025 claim the citation supports; the sentence is also moved from before the operation bullets to after them, and the vans worked example is moved after the units paragraph (EN order: bullets, worked example, units; UR order: bullets, citation, units, worked example) - instructional sequence altered with content preserved. REPAIR: "asli adadi kaam" (genuine) and restore the English order.' },
  { severity: 'advisory', resolved: false, message: 'F15 Teacher-notes instruction drift: "let the class build the plan before you show the carry-out step" (docs/.../unit-teacher-notes.mdx:32-33) becomes "let the class make the operation step itself first" (i18n/ur/.../unit-teacher-notes.mdx:32-33) - the plan is dropped and the carry-out step is misattributed to the class; "real mock materials" loses "mock" (UR:34-35); "make the abstract concrete" becomes "make the summary solid" (khalas = summary; intended tajarredi/abstract). REPAIR: translate the plan/carry-out distinction and "abstract" correctly.' },
  { severity: 'advisory', resolved: false, message: 'F16 The teacher-notes relay guidance drops the G3-repaired qualifier "(42/60, the second-largest raw number)" (docs/.../unit-teacher-notes.mdx:60-63 vs i18n/ur/.../unit-teacher-notes.mdx:56-57, which keeps only "(42/60)"), and "performs worst" is rendered "is the least actor" (sab se kam adakar hae - adakar means actor) in the same line, in unit-assessment ERQ-4 (i18n/ur/.../unit-assessment.mdx:133) and its rubric (UR:199). REPAIR: restore the qualifier; "sab se kam karkardagi rahi".' },
  { severity: 'advisory', resolved: false, message: 'F17 Localized word-level drifts: "integer sense" -> "number sense" (topic-01 UR:47); "confused" -> "gets alarmed" (ghabra jaata hai, topic-01 UR:30); "hover or tap them" -> "go to them" (index UR:57); "tiling" -> "making squares" (index UR:23); "either defensible computation earns the mark" -> "any defensive computation takes the mark" (topic-01 UR:134); "justified choice" -> "legitimate choice" (unit-assessment UR:205); "marking guidance" -> "indication guidance" (nishaan-dehi, unit-assessment UR:141); "check" (bracket a root) -> "test" (jaanch-na, index UR:35). REPAIR: adjust each toward the English meaning.' },
  { severity: 'advisory', resolved: false, message: 'F18 Citation-form parity: the gula2025 Further-reading entry differs between locales - EN cites the ERIC URL without volume/pages (docs/.../topic-03.mdx:151-153), UR cites volume 25(1), 171-184 and the DOI without the ERIC URL (i18n/ur/.../topic-03.mdx:142-144); both forms resolve to the same record and the sources registry carries both. OpenStax chapter titles are translated into Urdu in all three topics (e.g. "bab 1: tamam adad"), changing the cited titles\' surface form. REPAIR (optional): align the two locales\' reference lists.' },
  { severity: 'advisory', resolved: false, message: 'F19 The English word "tutors" is left untranslated inside Urdu prose at i18n/ur/.../unit-02/topic-01.mdx:84, topic-02.mdx:80, topic-03.mdx:84 and unit-teacher-notes.mdx:10 (frontmatter blooms_summary), where the English says "Your tutor" (singular). This mirrors unit-01\'s Urdu (course-wide pattern; no Urdu unit uses the transliteration tutor), so it is recorded as a course-level convention question for the owner rather than a unit-02-only defect.' },
  { severity: 'advisory', resolved: false, message: 'F20 Register notes: the unit addresses the reader exclusively in the feminine (karati hain, sakti hun, karen gi), consistent with GQUR-300 units 1 and 4 but mixed across the corpus (EFMP-301/302 use both genders) - an owner ruling on corpus-wide gender address would prevent drift. Localized ungrammatical constructions to smooth: triple "saath" (topic-01 UR:67-68), "jo hisaab jo" (topic-03 UR:70), redundant "aapas mein" (topic-03 UR:48-49), "battery ka satah" (topic-02 UR:64), verb-first "nikaalein ek theila" (topic-01 UR:126, unit-assessment UR:121), "klasik jaal" calque (topic-02 UR:66-67,104), ambiguous trailing clause in the assessment guidance (teacher-notes UR:71-73).' },
];

report.summary = 'G5 Urdu review of GQUR-300 Unit 2 (Numbers and Operations): complete bilingual comparison of the six bound Urdu files against the six bound English files, independent answering of the Urdu assessment bank, deterministic gates, and a rendered Urdu inspection (production build of both locales, Chromium at desktop 1280, narrow 360 and A4 print emulation). All 115 bound inputs digest-verify against the prepared manifest at HEAD ea3877d (the content-spec entry binds the ADR-0027 Unit-2 slice and .mdx translation_status lines are normalized, per scripts/lib/review-evidence.mjs; see input-binding-verification.txt).\n\nDisposition is revise, with seven blocking defects, four uncertain findings needing owner rulings or accepted dependency evidence, and nine advisory findings. The blocking defects: (1-2) the Urdu topic-01 activity and check-your-understanding sections are wholesale replacements with Unit 4 Topic 4.1 metric-conversion material, not translations of the English bazaar-ledger activity and number-system items, so the Urdu formative cycle does not assess U2-01/U2-02; (3) the topic-02 add-to-scale misconception paragraph is heavily compressed, drops the repaired worked counterexample, and replaces the "amount per person" invariant with "taste", leaving the Urdu explanation unable to support its own check item 5 and RRQ-06; (4) the Urdu ERQ-1 rubric states 1,200/7.33 gives about 171 rupees, which is false (about 164; the English says 1,200/7 gives 171); (5) the side note in fig-U2-1.ur.svg and its dark twin is clipped about 40 px off the left edge of the viewBox (anchor swapped for RTL but x not reflected; verified by getBBox, pixel analysis and source inspection; both figure gates pass because neither measures left-edge glyph geometry); (6) the sherbat demonstration sentence in the teacher notes contains a corrupted word (Arabic-script shar + Latin "bat") and a doubled "jug"; (7) the Russian word запас appears in place of an Urdu word in two rubric passages.\n\nEverything else the rubric asks for largely holds: the explanations, the classroom situations, the topic-02/03 activities and check items, the summaries, checklists, practicum and summative tasks are faithful and complete; the 10/10/5 bank is translated with option order, marks, Bloom labels and answer key intact (independently answered, 10/10 MCQ agreement, all RRQ/ERQ models sound except the ERQ-1 rubric line); the register is academic-plain; the rendered Urdu pages are properly RTL with the self-hosted Nastaliq webfont covering every prose glyph, zero overflow at all three viewport setups, correct print behaviour, and all six .ur.svg figure variants correctly mirrored right-to-left with faithful labels. Terminology is internally consistent, but two non-standard mathematics terms ("tamam adad" for whole number, "wasi\'" for exponent) are embedded in both the unit and glossary.json and are referred to the owner as disputes, alongside the bank-bound "Rubric" being rendered as a transliteration.\n\nDependency status (stated per the parent\'s instruction): no accepted G3 evidence exists - the G3 stage is advisory under ADR-0019 and the registry is empty; the best-available English-review context is the advisory G3 run001 report over pre-repair English bytes (8 of 96 shared inputs differ from the bound English because the author applied that report\'s repairs at 93e6321 and later; all five repairs verified present in the bound English). The bound English inputs were the comparison base throughout. A future pass would additionally require accepted G3 evidence for these exact English bytes and resolution of the terminology disputes.\n\nDeterministic gates at HEAD: validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync, check:concept-graph, check:bloom-bands and check:pipeline-gate all exit 0. Note that the EN-UR structural parity checks inside check:pipeline-gate fire only at translation_status: reviewed, so they are dormant for this unit (all six Urdu files are draft) and the manual passage comparison in bilingual-comparison.txt is the parity evidence; no translation_status value was changed by this review.\n\nThis report is advisory. It is unsigned, no qualification record or protected registry entry exists for this reviewer, and nothing here certifies the unit, activates a reviewer, or writes a tracker row.';

const out = 'specs/content/gqur-300/reviews/unit-02/G5/agent-g5-gqur300-u2-run001.json';
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out, 'with', Object.keys(report.evidence_manifest).length, 'evidence entries,', report.criteria.length, 'criteria,', report.findings.length, 'findings');
