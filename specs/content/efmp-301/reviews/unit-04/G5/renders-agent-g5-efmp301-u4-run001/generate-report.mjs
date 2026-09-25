// Report generator for agent-g5-efmp301-u4-run001 (G5 Urdu, EFMP-301 Unit 4).
// Builds the contract JSON and hashes every evidence artifact it cites.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const ROOT = process.cwd();
const DIR = 'specs/content/efmp-301/reviews/unit-04/G5';
const LOGS = `${DIR}/logs-agent-g5-efmp301-u4-run001`;
const RENDERS = `${DIR}/renders-agent-g5-efmp301-u4-run001`;
const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const prepared = JSON.parse(readFileSync(`${DIR}/manifest.json`, 'utf8'));

const evidence = {};
for (const f of readdirSync(`${ROOT}/${LOGS}`)) evidence[`${LOGS}/${f}`] = digest(`${ROOT}/${LOGS}/${f}`);
const RENDER_DIR = RENDERS;
for (const f of readdirSync(`${ROOT}/${RENDER_DIR}`)) evidence[`${RENDER_DIR}/${f}`] = digest(`${ROOT}/${RENDER_DIR}/${f}`);

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 4,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:973d9c0d',
  reviewer_run_id: 'agent-g5-efmp301-u4-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T20:27:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: prepared.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-04/G3/agent-g3-efmp301-u4-run001.json',
  input_manifest: prepared.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'G3 dependency unmet for the bound English: the only G3 report (specs/content/efmp-301/reviews/unit-04/G3/agent-g3-efmp301-u4-run001.json, advisory, disposition revise) binds PRE-repair English digests (topic-01 c65f3f29..., topic-02 e73b3a6b..., topic-03 dab63c05..., unit-assessment 94a91baf..., concepts/unit-04.md a80d4cc5...) while this review binds the post-repair English (2d627ba6..., 2940b5c7..., 91114d57..., 97cd31c6..., 84657bab...); a G3 run-002 manifest (specs/content/efmp-301/reviews/unit-04/G3/run-002/manifest.json) was prepared against the current English (unit-file digests identical to this manifest) but NO run-002 report exists, so the current English has never been re-reviewed at G3. Recorded as a dependency escalation to the owner (GQUR-300 PR #65 precedent); the full Urdu-vs-bound-English comparison was still performed.',
        'Guide authority carried into Urdu: the teacher notes\' Weeks 8-9 sequencing (i18n/ur/.../unit-teacher-notes.mdx intro and sequencing table) mirrors the guide\'s Chapter 4 allotment as verified by G3 run001 against Scheme-and-Course-guides/extracted-text/1st 2026.txt lines 1099-1110; the Urdu teaches and assesses the same three outcomes (SLO:EFMP-301-4-1/4-2/4-3 in every file\'s clo_refs, including the G3-repaired SLO:EFMP-301-4-2 on topic-02.mdx:9).',
        'No signed or accepted G3 evidence exists for this unit under ADR-0019 advisory mode (specs/reviewers/registry.json has no qualified reviewers); this report is likewise advisory only.',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'All English citations are carried into the Urdu with the same supporting meaning: (Spielman, Jenkins & Lovett, 2020) for the perception definition (UR topic-01.mdx:54), the memory-systems quotes (UR topic-02.mdx:38-44) and active rehearsal (UR topic-02.mdx:56); (Ariel & Karpicke, 2018) for the spacing and retrieval-practice evidence (UR topic-02.mdx:54-56), matching the G3-repaired attribution; (Seifert & Sutton, 2009) for the named problem-solving strategies and transfer (UR topic-03.mdx:46,56).',
        'Direct quotations are translated with citations retained in Latin script ("the way sensory information is organized, interpreted, and consciously experienced" -> UR topic-01.mdx:54; "a powerful learning tool for promoting long-term retention" and "over a less effective strategy (restudying)" -> UR topic-02.mdx:56; "Active rehearsal is a way of attending..." -> UR topic-02.mdx:56); the Further reading lists are identical to the English in all three topics (UR topic-01.mdx:116-122, topic-02.mdx:108-114, topic-03.mdx:129-135).',
        'No Urdu-only source claims, dropped citations or invented attributions found in the passage-by-passage comparison of all six file pairs.',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'Structural parity verified file by file: index (all sections incl. outcomes, prerequisites, how-to-use), topic-01/02/03 (all nine parts each: real classroom situation, explanation, activity, check your understanding x5, summary, self-assessment checklist x4, try this at your practicum school, summative task with mini-rubric, further reading), unit-assessment (unit summary, 10 MCQs, 10 RRQs, 5 ERQs, MCQ key, 10 RRQ model answers, 5 ERQ rubrics), teacher notes (all sections incl. the 4-row sequencing table). No heading-only stubs; no omitted passages.',
        'All six figures are wired to .ur.svg variants with translated alt texts (UR topic-01.mdx:32,64; topic-02.mdx:30,60; topic-03.mdx:32,70); check:figures exit 0; figures:variants:check exit 0.',
        'All unit learning outcomes are taught and assessed in Urdu (UR index.mdx:34-39; the G3-repaired 4/3/3 MCQ and 3/4/3 RRQ topic spread is mirrored exactly), and every English-side G3 repair is mirrored: "nearly half" gorilla finding (UR topic-01.mdx:48), SLO:EFMP-301-4-2 on topic-02 (UR topic-02.mdx:9), Ariel & Karpicke citations, and the anchored cat example (UR topic-03.mdx:93).',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'Independent blind solve: the reviewer answered all 10 Urdu MCQs from the Urdu alone before opening either key and derived 1-b, 2-b, 3-b, 4-b, 5-b, 6-c, 7-b, 8-c, 9-b, 10-b; the Urdu key (UR unit-assessment.mdx:126-135) matches exactly and the English key (EN unit-assessment.mdx:162-173) is identical letter for letter.',
        'Option order a/b/c/d preserved in all 10 items; no Urdu option reveals an answer or lowers cognitive demand; Bloom tags match item for item (MCQs Remember/Understand/Apply; RRQs Understand with Apply at items 4 and 10; ERQs Analyze x3, Evaluate, Create); each Urdu MCQ key rationale conveys the same reason as its English counterpart.',
        'RRQ model answers and mark schemes match (e.g. RRQ 1: 1 for all three properties + 1 for examples; RRQ 8: 2 split 1 for three named + 1 for instances); all five ERQ rubrics carry identical criterion rows and allocations (5+7+4+4 = 20 for ERQ 1-3, 6+6+4+4 = 20 for ERQ 4-5), each out of 20 as in the English (UR unit-assessment.mdx:154-199 vs EN unit-assessment.mdx:206-251).',
        'Advisory notes recorded as findings: MCQ 3 options a/c are elliptical in both languages (inherited English-side defect, faithfully mirrored) and the Urdu ERQ 2 stem drops "on Monday night" (immaterial to the task demand).',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Render inspection of the production build (renders-agent-g5-efmp301-u4-run001/render-review.log, render-inspect.json): all six Urdu pages serve html dir=rtl lang=ur; 0 broken images, 0 images without alt, 0 skipped heading levels, 0px document overflow at 1280x900; body prose resolves the self-hosted "Noto Nastaliq Urdu", "Noto Naskh Arabic", "Jameel Noori Nastaleeq" stack.',
        '360px: 0px document overflow on all six pages; every content table is direction=rtl and fits without scrolling (scrollWidth === clientWidth === 328); all figures fit the viewport. A4 print emulation: 0 clipped elements on all six pages, nav/header/footer hidden, and the bounded answers section renders on unit-assessment (print-a4-*.png/.pdf saved).',
        'Each topic page loads its two .ur.svg figures plus the .ur.dark.svg variants under data-theme=dark (verified in-browser); 25 real PNG renders (plus 6 A4 print PDFs) saved and hashed in evidence_manifest.',
        'LIMITATION recorded as an uncertain finding: this session could not visually view PNG pixels (file reader returned no image data; no MCP browser available - no system Chrome, no root to install). Judgements rest on DOM measurements, direct SVG bbox measurement, sharp pixel statistics (all 25 PNGs non-blank, channel stdev 29-54) and extracted label text; the PNGs are saved unaltered for human re-inspection.',
      ],
    },
    {
      id: 'completeness',
      status: 'pass',
      evidence: [
        'Passage-by-passage alignment of all six file pairs found no material omissions or additions: every English paragraph, list item, table row, rubric row, checklist item and figure has an Urdu counterpart; the Urdu adds only the pipeline-required key_terms frontmatter block (UR index.mdx:13-17; both entries conform to terminology.csv).',
        'Quantities, dates and names preserved throughout: 60 pupils and one blackboard; 24 km / 40 minutes / answers 36 and 64; seven plus or minus two (Miller) and near four (Cowan); seconds to a minute; eight words at one per second; 3 pens for Rs 45 and 7 pens; 40 pupils / 5 per bench / 6 benches; 8:00 / 10:30 / 160 km; 3- and 5-litre jugs measuring 4; 250-300 word tasks; two-week plan; ten minutes; five-question exit quiz (3 today, 2 last week); Weeks 8 and 9; "nearly half" of gorilla-study viewers.',
        'The English index\'s cross-references and instructional sequences are mirrored (topic order, "test the claims on yourself", unit-assessment pointer), and the UR topic files carry the same Glossary wiring (<Glossary term="Attention" /> resolves to the bilingual glossary.json entry, verified in the built page).',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'fig-U4-3 alt text (UR topic-02.mdx:30): English "sensory memory briefly holds impressions" is rendered "حسی یادداشت دوبارہ تاثرات تھامتی ہے" - "briefly" has become "دوبارہ" ("again"), a semantic error in a screen-reader-facing description. Blocking finding.',
        'UR topic-02.mdx:58: English "the October chapter loses to the November chapter that shared its shelf" is rendered "اکتوبر کا بپ نومبر کے بپ سے ہار جاتا ہے جس نے اس کی آلہ شیئر کی" - "shelf" has become "آلہ" (tool), corrupting the interference metaphor. Blocking finding.',
        'UR topic-02.mdx:56: "its mnemonic benefits run \'over a less effective strategy (restudying)\'" is rendered with the calque "پر چلتا ہے" ("runs on"), obscuring the comparative the citation supports. Advisory finding.',
        'UR index.mdx:26: "retrieval practised" is rendered "دہرائی کی مشق" (repetition practice), merging retrieval practice with repetition. Advisory finding. Minor modal notes: UR topic-01.mdx:50 "may concentrate beautifully" -> "دے سکتا ہے" (can); UR topic-03.mdx:30 "works often enough in a textbook to survive" drops the survival nuance.',
      ],
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'Working Memory (blocking): terminology.csv:98 banks "عامل یادداشت / فعال یادداشت" (note: EFMP-301 U1 prose uses عامل یادداشت), but the unit prose uses "کام کرنے والی یادداشت" throughout (UR index.mdx:36; topic-02.mdx:38-46 passim; topic-03.mdx:58; unit-assessment.mdx:29,72-76,80,102-107; teacher-notes) while the unit\'s own fig-U4-3 label and specs/content/efmp-301/concepts/unit-04.md use the banked عامل یادداشت - prose, figure and bank disagree inside one unit.',
        'Rubric (blocking): terminology.csv:72 banks معیارِ جانچ (prose term adopted 2026-09-14) but the unit uses the transliterations منی روبرک (UR topic-01.mdx:107, topic-02.mdx:99, topic-03.mdx:120) and روبرکس (UR unit-assessment.mdx:124,152; teacher-notes) - the same defect class the unit-02 G5 review flagged blocking; usage is repo-wide, so the owner must either enforce the bank or re-bank the transliteration.',
        'Concept Formation (advisory): bank term تصور سازی (terminology.csv:69) vs the unit\'s تصور کی تشکیل (UR index.mdx:38; topic-03.mdx:36,42; unit-assessment RRQ model answer 10); the banked term appears nowhere under i18n/.',
        'Figure/prose divergence on core vocabulary (advisory, owner alignment): deductive = استنتاجی (fig-U4-5.ur.svg, concepts/unit-04.md) vs استخراجی (all prose); heuristic = قاعدہ سر انگشت (fig-U4-5/6.ur.svg) vs ہیورسٹک (prose); means-ends = ذرائع و اغراض (figures) vs ذریعہ سے مقصد تجزیہ (prose); spotlight = سپاٹ لائٹ (fig-U4-1.ur.svg, glossary.json, concept graph) vs روشنی کا ستون (prose); evidence = شہادت (fig-U4-4.ur.svg, concept graph) vs ثبوت (prose). Schema stays خاکہ, consistent with Unit 3; recall is یاد دہانی unit-wide (یاد آوری proposed for the owner); the translated Spielman quote uses مختصر مدتی where the bank has قلیل مدتی.',
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'Non-word "بپ" for "chapter" (blocking): 9 occurrences - UR topic-02.mdx:26,28,54,58 (x2); unit-assessment.mdx:114,165; unit-teacher-notes.mdx:33 (x2). Standard باب, which other units use, is intended; the token impedes fluent academic-plain reading.',
        'Misspelling شاگرڈ for شاگرد (blocking): UR index.mdx:26 and topic-01.mdx:26 (the "better pupils" staff-room quote); the same defect class the unit-02 G5 review flagged blocking.',
        'Non-word figure label (blocking): fig-U4-1.ur.svg renders "neighbour\'s chatter" as "پڑوسی کی بکچ" - "بکچ" is not an Urdu word (apparent truncation of بک بک).',
        'Calques and grammar slips to smooth at repair time (advisory, register is otherwise academic-plain and readable): کلاسیک مطالعے (topic-01.mdx:48), پہلی ہاتھ (topic-01.mdx:54), نبضنا (topic-02.mdx:36, likely نبڑنا), نامی ملاقاتوں (topic-01.mdx:88), قریب قریب مس والی مثالیں (topic-03 passim), انگلی پر گنتی والا اصول (topic-03.mdx:50), صورت بہبود for formative (teacher-notes:68, also flagged by unit-02 G5), میرے جانے والے (topic-03.mdx:56), سنیک ہی نہیں (topic-01.mdx:48), پڑھانا کا مطلب (topic-01.mdx:62), دنیا کی داخل (topic-02.mdx:38); figure-label grammar: شاگردوں اپنی گلی سے missing کی (fig-U4-2.ur.svg), پہلا کڑی (fig-U4-6.ur.svg), بھول جانے زنجیر کو (fig-U4-3.ur.svg), تفصیل بیانی and جانچ پہچان (fig-U4-4.ur.svg).',
      ],
    },
    {
      id: 'rtl',
      status: 'fail',
      evidence: [
        'Rendered pages pass: dir=rtl lang=ur on all six pages; tables direction=rtl and fitting at 360px (no scroll needed); 0px overflow desktop and narrow; A4 print unclipped; figure geometry mirrored per style guide v4.1 (UR label x-coordinates reflect the EN geometry, e.g. fig-U4-1 EN x=32 -> UR x=748 in the 780-unit viewBox); .ur.dark.svg variants load under data-theme=dark.',
        'fig-U4-4.ur.svg and fig-U4-4.ur.dark.svg clipping (blocking): in the mirrored leftmost column, "اسکول کی سطح پر" starts at x=-3.2 and "سب سے سستی اور سب" at x=-2.0 against the 780x470 viewBox (text-anchor=end at x=119; a third label overflows by 0.8), so the leading glyph edges are cut in both variants. Measured directly in-browser (fig-u4-4-clip-detail.log, capture-pixel-stats.json).',
        'Cosmetic (advisory): one empty <text> element each in fig-U4-2.ur.svg, fig-U4-4.ur.svg and fig-U4-6.ur.svg (figure-measure.log).',
        'No text-on-text overprint found in any of the twelve .ur/.ur.dark variants (pairwise bbox overlap = 0); the declared Nastaliq font stack is present in all variants. Systemic webfont-in-SVG caveat recorded as an uncertain finding (labels cannot use the page webfont inside an <img>).',
      ],
    },
  ],
  findings: [
    {
      severity: 'uncertain',
      message: '[authority] G3 dependency unmet for the bound English (escalation to the owner, GQUR-300 PR #65 precedent): the only G3 report (specs/content/efmp-301/reviews/unit-04/G3/agent-g3-efmp301-u4-run001.json) is advisory with disposition revise and binds the PRE-repair English (topic-01 c65f3f29..., topic-02 e73b3a6b..., topic-03 dab63c05..., unit-assessment 94a91baf... vs this review\'s 2d627ba6..., 2940b5c7..., 91114d57..., 97cd31c6...). The English was repaired afterwards (commits a7a1a215, dd7e323e) and the Urdu mirror updated (973d9c0d); a G3 run-002 manifest was prepared against the current English but no run-002 report exists, so the current English has not been re-reviewed at G3. This G5 review performed the full comparison against the current bound English regardless; the owner must decide whether a fresh G3 pass over the current English is required before any acceptance path.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[semantics] i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-02.mdx:30 (fig-U4-3 alt text): English "sensory memory briefly holds impressions" is rendered "حسی یادداشت دوبارہ تاثرات تھامتی ہے" - "briefly" has become "دوبارہ" ("again"), so a screen-reader user is told sensory memory holds impressions AGAIN rather than briefly. Repair to e.g. "حسی یادداشت مختصر وقت کے لیے تاثرات تھامتی ہے".',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[semantics] i18n/ur/.../unit-04/topic-02.mdx:58: English "the October chapter loses to the November chapter that shared its shelf" is rendered "اکتوبر کا بپ نومبر کے بپ سے ہار جاتا ہے جس نے اس کی آلہ شیئر کی" - "shelf" has become "آلہ" (tool/instrument), corrupting the interference metaphor (two chapters occupying the same slot). Repair to e.g. "جس نے اس کا تختہ شیئر کیا" or restructure the metaphor.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[terminology] Working Memory drift against the frozen bank: terminology.csv:98 banks "عامل یادداشت / فعال یادداشت" (note: EFMP-301 U1 prose uses عامل یادداشت), but this unit\'s prose uses "کام کرنے والی یادداشت" throughout (index.mdx:36; topic-02.mdx:38-46; topic-03.mdx:58; unit-assessment.mdx:29,72-76,80,102-107; teacher-notes), while the unit\'s own fig-U4-3 label and specs/content/efmp-301/concepts/unit-04.md use the banked عامل یادداشت. Prose, figure and bank disagree inside one unit, and Unit 1\'s prose disagrees too. Per style guide ## Terminology bank this conflict is for the curriculum owner to resolve (either re-term the prose to a banked form or bank the new term); do not edit the bank to secure a pass.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[terminology] Rubric drift against the frozen bank: terminology.csv:72 banks معیارِ جانچ (prose term adopted 2026-09-14) but the unit uses منی روبرک (topic-01.mdx:107, topic-02.mdx:99, topic-03.mdx:120) and روبرکس (unit-assessment.mdx:124,152; teacher-notes). Same defect class as the unit-02 G5 blocking finding; usage is repo-wide (units 7, 10, EFMP-302), so the owner should either enforce the bank across units or re-bank the transliteration.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[register] Non-word "بپ" used for "chapter" 9 times: topic-02.mdx:26,28,54,58 (x2); unit-assessment.mdx:114,165; unit-teacher-notes.mdx:33 (x2). The intended word is باب, which other EFMP-301 units use; the token is not Urdu and impedes fluent reading. Replace all 9.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[register] Misspelling شاگرڈ (with ڈ) for شاگرد at index.mdx:26 and topic-01.mdx:26 (the staff-room "better pupils" quote). Same defect class the unit-02 G5 review flagged as blocking; correct spelling is used elsewhere in this unit.',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[rtl] static/img/figures/efmp-301/unit-04/fig-U4-4.ur.svg and fig-U4-4.ur.dark.svg: two leftmost-column labels are clipped past the viewBox left edge - "اسکول کی سطح پر" bbox x=-3.2 and "سب سے سستی اور سب" x=-2.0 (viewBox 780x470, text-anchor=end at x=119; "اپنے ساتھی کو سمجھاؤ" also overflows by 0.8). The leading glyph edges are cut in both light and dark variants. Repair by shifting the column anchor right or shortening the labels, then regenerate the dark variant (npm run figures:variants).',
      resolved: false,
    },
    {
      severity: 'blocking',
      message: '[register/rtl] static/img/figures/efmp-301/unit-04/fig-U4-1.ur.svg (and .ur.dark.svg): "neighbour\'s chatter" is rendered "پڑوسی کی بکچ" - "بکچ" is not an Urdu word (apparent truncation of بک بک). Repair the label in both variants.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[terminology] Figure/prose divergence on core vocabulary needing owner alignment: deductive reasoning = استنتاجی in fig-U4-5.ur.svg and concepts/unit-04.md vs استخراجی in all prose; heuristic = قاعدہ سر انگشت in fig-U4-5/6.ur.svg vs ہیورسٹک in prose; means-ends analysis = ذرائع و اغراض (figures) vs ذریعہ سے مقصد تجزیہ (prose); spotlight = سپاٹ لائٹ (fig-U4-1.ur.svg, glossary.json, concept graph) vs روشنی کا ستون (prose); evidence = شہادت (fig-U4-4.ur.svg, concept graph) vs ثبوت (prose). A learner cross-referencing prose and figures meets two vocabularies for the same concepts; align on one rendering per term (owner ruling where the bank is silent).',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[terminology] Concept Formation: bank term تصور سازی (terminology.csv:69) vs the unit\'s تصور کی تشکیل (index.mdx:38; topic-03.mdx:36,42; unit-assessment RRQ model answer 10). The banked term appears nowhere under i18n/; owner ruling needed.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[semantics] topic-02.mdx:56: "its mnemonic benefits run \'over a less effective strategy (restudying)\'" is rendered "اس کا یادداشتی فائدہ \'کم مؤثر حکمت عملی (دوبارہ پڑھنا)\' پر چلتا ہے" - the comparative "over" (= superior to / compared with) is calqued as "پر چلتا ہے" ("runs on"), obscuring the comparison the Ariel & Karpicke citation supports. Suggest "...کے مقابلے میں زیادہ ہیں".',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[semantics] index.mdx:26: "retrieval practised" is rendered "دہرائی کی مشق" (repetition practice), merging retrieval practice with repetition - two distinct concepts in this unit\'s own vocabulary (حاصل کرنے کی مشق would align with the unit\'s retrieval term).',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[semantics] unit-assessment.mdx:114 (ERQ 2 stem) drops "on Monday night" present in the English stem (EN unit-assessment.mdx:139-141). Immaterial to the task demand; restore for fidelity (پیر کی رات).',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[register] Localized calques, coinages and grammar slips to smooth at repair time (register is otherwise academic-plain and readable): کلاسیک مطالعے (topic-01.mdx:48), پہلی ہاتھ (topic-01.mdx:54), نبضنا (topic-02.mdx:36, likely نبڑنا), نامی ملاقاتوں (topic-01.mdx:88), قریب قریب مس والی مثالیں for near-misses (topic-03 passim), انگلی پر گنتی والا اصول for rule of thumb (topic-03.mdx:50), صورت بہبود for formative work (teacher-notes:68, also flagged by the unit-02 G5 review), میرے جانے والے (topic-03.mdx:56), سنیک ہی نہیں (topic-01.mdx:48), پڑھانا کا مطلب (topic-01.mdx:62), دنیا کی داخل (topic-02.mdx:38), یاد دہانی for recall unit-wide (یاد آوری proposed for the owner), مختصر مدتی vs bank قلیل مدتی in the translated Spielman quote (topic-02.mdx:56); figure-label grammar: شاگردوں اپنی گلی سے missing کی (fig-U4-2.ur.svg), پہلا کڑی gender (fig-U4-6.ur.svg), بھول جانے زنجیر کو (fig-U4-3.ur.svg), تفصیل بیانی and جانچ پہچان (fig-U4-4.ur.svg).',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[rtl] Cosmetic: one empty <text> element each in fig-U4-2.ur.svg, fig-U4-4.ur.svg and fig-U4-6.ur.svg (figure-measure.log); remove when those figures are next edited.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[assessment] MCQ 3 options a/c are elliptical in both languages (EN "interpretation and perception is detection" / "conscious and perception is automatic"; UR "تشریح اور ادراک پتہ لگانا" / "شعوری اور ادراک خود کار") - an inherited English-side wording defect faithfully mirrored; the repair belongs to the English bank, with the Urdu then following.',
      resolved: false,
    },
    {
      severity: 'uncertain',
      message: '[accessibility] Render-pixel relay limitation: this reviewer session could not visually view the captured PNG renders (the session\'s file reader returned no image data for PNGs, and both MCP browsers were unavailable - no system Chrome, and installing it needs root). Visual judgements rest on DOM-level measurement, direct SVG bbox measurement in the browser, sharp pixel statistics (25 PNGs, none blank, channel stdev 29-54) and extracted label text. The same limitation was recorded by the G3 run001 review and the unit-02/unit-12 G5 reviews; the PNGs are saved unaltered for human or qualified re-inspection.',
      resolved: false,
    },
    {
      severity: 'uncertain',
      message: '[rtl] Systemic (owner decision, also recorded by the unit-02 G5 review): Urdu figure labels live inside <img>-embedded SVGs, which cannot use the page\'s self-hosted Nastaliq webfont; on devices without Noto Nastaliq Urdu / Jameel Noori Nastaleeq installed the labels fall back to system Arabic-script fonts. The declared font stack is present in all twelve .ur/.ur.dark variants of this unit; whether to embed the font in the SVGs (file-size cost) or accept the fallback is an owner-level tradeoff.',
      resolved: false,
    },
    {
      severity: 'advisory',
      message: '[assessment, informational] Assessment equivalence verified: the reviewer blind-solved all 10 Urdu MCQs before reading either key (1-b, 2-b, 3-b, 4-b, 5-b, 6-c, 7-b, 8-c, 9-b, 10-b) and the Urdu and English keys are identical letter for letter; option order, cognitive-demand tags, RRQ mark schemes and ERQ rubric allocations (20 marks each) all correspond. No Urdu item reveals an answer or lowers demand.',
      resolved: false,
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${LOGS}/figures-variants-check.log` },
    { name: 'build-first-attempt', exit_code: 1, log_path: `${LOGS}/build.log` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build-retry.log` },
    { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.log` },
    { name: 'manifest-verify', exit_code: 0, log_path: `${LOGS}/manifest-verify.log` },
    { name: 'svg-text-extract', exit_code: 0, log_path: `${LOGS}/svg-text-extract.log` },
    { name: 'render-inspect', exit_code: 0, log_path: `${LOGS}/render-inspect-console.log` },
    { name: 'render-review', exit_code: 0, log_path: `${RENDER_DIR}/render-review.log` },
    { name: 'figure-measure', exit_code: 0, log_path: `${RENDER_DIR}/figure-measure.log` },
    { name: 'fig-u4-4-clip-detail', exit_code: 0, log_path: `${LOGS}/fig-u4-4-clip-detail.log` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(`${ROOT}/${DIR}/agent-g5-efmp301-u4-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('report written:', `${DIR}/agent-g5-efmp301-u4-run001.json`);
console.log('criteria:', report.criteria.map((c) => `${c.id}=${c.status}`).join(' '));
console.log('findings:', report.findings.filter((f) => f.severity === 'blocking').length, 'blocking,',
  report.findings.filter((f) => f.severity === 'uncertain').length, 'uncertain,',
  report.findings.filter((f) => f.severity === 'advisory').length, 'advisory');
console.log('evidence files:', Object.keys(evidence).length);
