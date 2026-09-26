// Assembles the G5 report for EFMP-301 Unit 12 (agent-g5-efmp301-u12-run001).
// Reads the parent's prepared manifest for input_manifest/skill_digest, embeds the
// reviewer's criteria/findings/commands, hashes every evidence artifact and writes
// the contract report JSON. Evidence-only; changes no content.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ROOT = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const G5 = 'specs/content/efmp-301/reviews/unit-12/G5';
const LOGS = `${G5}/logs-agent-g5-efmp301-u12-run001`;
const RENDERS = `${G5}/renders-agent-g5-efmp301-u12-run001`;

const manifest = JSON.parse(readFileSync(`${ROOT}/${G5}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(`${ROOT}/${p}`)).digest('hex');

const evidence = {};
for (const f of readdirSync(`${ROOT}/${LOGS}`)) evidence[`${LOGS}/${f}`] = sha(`${LOGS}/${f}`);
for (const f of readdirSync(`${ROOT}/${RENDERS}`)) evidence[`${RENDERS}/${f}`] = sha(`${RENDERS}/${f}`);
evidence[`${G5}/summary-run001.txt`] = sha(`${G5}/summary-run001.txt`);

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 12,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:8b67651c',
  reviewer_run_id: 'agent-g5-efmp301-u12-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T18:40:00Z',
  completed_at: '2026-09-25T19:31:00Z',
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-12/G3/agent-g3-efmp301-u12-run001.json',
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'G3 dependency unmet: no accepted or signed G3 evidence exists (ADR-0019 advisory mode; specs/reviewers/registry.json has no enabled reviewers). The best available English review, specs/content/efmp-301/reviews/unit-12/G3/agent-g3-efmp301-u12-run001.json (disposition revise, 5 blocking + 9 advisory findings), binds the PRE-repair English: its input_manifest digests differ from this review\'s bound inputs for docs/semester-1/efmp-301/unit-12/topic-01.mdx, topic-02.mdx, topic-03.mdx, unit-assessment.mdx, unit-teacher-notes.mdx, the six figure SVGs, specs/content/efmp-301/sources/unit-12.md, coverage/unit-12.md and concepts/unit-12.md. The English was repaired at commit 678a6f2d after that review; this manifest binds the post-repair English at 43e2e859. Per the G5 rubric a changed English digest invalidates the dependency. Escalated to the owner (GQUR-300 PR #65 precedent); the full Urdu-vs-current-English comparison was still performed.',
        'Run identity note: the parent handoff cited authoring commit 0ac568a, which is verifiably the Unit 7 authoring commit (git show 0ac568aa); the Unit 12 authoring commit is 8b67651c (used as author_run_id, consistent with the G3 report). G4 Urdu mirror: commit c5b19c76 (PHR 0068); post-G3 repairs mirrored into Urdu in 678a6f2d.',
        'Guide-chain substance re-verified against the current bound English within this review: the Week 16 four-bullet partition, the three SLO clo_refs (identical in every Urdu file\'s frontmatter), the guide\'s five teaching strategies and practical-work list (teacher notes), and the shared Week 16 framing all carry into the Urdu with the same claims (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-12/index.mdx:24-53, unit-teacher-notes.mdx:23-58).',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'Citations carried intact in Urdu: Khizar, Anwar & Malik (2019) inline at topic-02.mdx:48 with the same public-accountability-not-private-virtue claim as the bound excerpt (sources/texts/khizar2019.md:12-26); Further Reading lists identical to the English in all three topics (topic-01.mdx:106-109, topic-02.mdx:113-118, topic-03.mdx:106-110) including URLs and the translated link text "کتاب اوپن ٹیکسٹ بک لائبریری میں".',
        'The post-repair sources registry (specs/content/efmp-301/sources/unit-12.md:17) honestly scopes seifert2009 as Chapters 1 and 8 being Further Reading, not bound support - matching what both the English and Urdu Further Reading actually ask of the learner; the WHO/Vosniadou/Khizar rows support the same claims the Urdu prose makes.',
        'No Urdu-only source claims found: every citation, quotation and qualification in the Urdu traces to the same passage as the English (spot-checked topic-02:48 against khizar2019.md; topic-01:38,42 confidentiality/escalation limits against Unit 11\'s established line).',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'Every outcome taught in Urdu: ULO 1 (three-way distinction, programme) at topic-01.mdx:34-54; ULO 2 (first line, referral) at topic-01.mdx:44-54; ULO 3 (five duties, decision path, Pakistan standards) at topic-02.mdx:34-63; ULO 4 (course whole applied to one episode) at topic-03.mdx:34-41; ULO 5 (technology affordances/costs) at topic-03.mdx:44-54 - verified against the English section-by-section, not headings only.',
        'Every outcome assessed in Urdu: MCQ 1-5/RRQ 1-4 (12.1), MCQ 6-8/RRQ 6-8 (12.2), MCQ 9-10/RRQ 5,9,10 (12.3), ERQ 1-3 per topic, ERQ 4 integrative, ERQ 5 capstone - mirroring the rebalanced English blueprint (unit-assessment.mdx:33-118).',
        'No omissions or additions found across index (incl. key_terms block), topics, assessment, teacher notes, captions and figure labels; the post-repair English additions (Hyderabad counselor week at topic-01:48, floods referral at topic-01:52, worked examples in topic-01) are all present in the Urdu.',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent solve of all 10 Urdu MCQs before comparison (logs-agent-g5-efmp301-u12-run001/blind-derivation.md): derived key 1b 2a 3b 4d 5c 6a 7b 8d 9c 10c is identical to the delivered Urdu key (unit-assessment.mdx:124-133) and to the English key (docs/.../unit-assessment.mdx:167-178); option order a-d preserved item-for-item; no Urdu option reveals an answer or collapses a distractor; Bloom labels match item-for-item (یاد رکھنا/سمجھنا/لاگو کرنا/تجزیہ/تخلیق/جائزہ).',
        'ERQ rubrics identical in rows and totals (6+7+3+4, 5+7+4+4, 6+7+3+4, 6+7+3+4, 8+6+2+4 = 20 each; unit-assessment.mdx:154-197 vs English :218-261); post-repair spot checks mirrored: RRQ 9 model answer "یونٹ 4 کا قیاس" (Unit 4\'s analogy, :147) and topic-03.mdx:48 both carry the repaired attribution.',
        'FAIL loci: RRQ 2 model answer\'s causal clause is garbled - English "because what is written stops being what happened" (docs/.../unit-assessment.mdx:187-188) vs Urdu "کیونکہ جو لکھا گیا وہ جو ہوا وہ رکھ جاتا ہے" (i18n/.../unit-assessment.mdx:140), ungrammatical with the "stops being" sense lost; and the capstone task word "justified" is rendered جائز والا (legitimate) at unit-assessment.mdx:118 and index.mdx:35 while the ERQ 5 rubric itself uses the correct جواز والا (:195) - see findings A1/A2.',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Rendered Urdu inspection of all six pages at 1280x800, 360x640 narrow and 794x1123 A4 print emulation from the worktree build (exit 0) served at localhost:3215 (logs-agent-g5-efmp301-u12-run001/render-review.log; render-audit-ur.json + 25 PNGs under renders-agent-g5-efmp301-u12-run001/): no document overflow at any width; every content table fits without horizontal scroll at 360px (clientWidth 328 === scrollWidth 328, rightmost cell right edge 344 < 360) and at print width; answers, rubrics, MCQ options and figures not clipped.',
        'Figures render 328x198 narrow / 703x424 desktop with non-empty Urdu alt text and lazy loading; dark variants swap under [data-theme=dark] (light 0x0, dark 703x424; topic-01-dark.png); the nine-part heading order renders on all three topics.',
        'Reviewer image-channel limitation recorded honestly as advisory finding A9: the session could not display PNG content, so visual verification rests on the browser-measured geometry above plus source-level label analysis; the saved PNGs remain evidence for human verification.',
      ],
    },
    {
      id: 'completeness',
      status: 'pass',
      evidence: [
        'Section-by-section parity verified, not heading parity: index (opening, outcomes x5, prerequisites, In-this-unit x3, how-to-use x4, key_terms block present per the G4 contract), topic-01/02/03 (real situation, explanation with all subsections, activity with all steps, 5 check items, summary, 4-item checklist, practicum, summative task with 4-row mini-rubric, further reading), unit-assessment (3-paragraph unit summary, 10 MCQ + 10 RRQ + 5 ERQ, MCQ key with rationales, 10 RRQ model answers with marks, 5 ERQ rubrics), teacher notes (all seven sections incl. the sequencing table and the repaired practical-work framing).',
        'Figure captions/alt texts translated for all six figures and wired to the .ur.svg variants (topic-01.mdx:30,56; topic-02.mdx:30,50; topic-03.mdx:30,42); no heading-only stubs found.',
        'Frontmatter parity: course_code, unit_no, topic_no, clo_refs, est_reading_minutes identical to the English in all six files; translation_status: draft on both sides (honest pre-review state).',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'BLOCKING B1 - negation reversal: English topic-01.mdx:124-126 asks for sentences "that would have opened the door without opening a counseling session"; Urdu topic-01.mdx:63 "جو دروازہ کھولتے بغیر مشاورت سیشن کھولے" reads "which opens a counseling session without opening the door" - the بغیر binds to the wrong clause and the instruction is reversed.',
        'BLOCKING B2 - valence reversal: English topic-02.mdx:47 "the pupil you cannot help liking" (an affinity example beside the patron\'s child and the colleague\'s nephew); Urdu topic-02.mdx:38 "وہ شاگرد جسے پسند نہ کرنا آپ نہیں روک سکتے" reads "the pupil you cannot stop yourself from disliking" - the example\'s valence is reversed.',
        'Minor divergences recorded as advisory findings: "corridors" as گلیوں/streets (A3); "the counselor, too, escalates" as bare بڑھاوا دیتا ہے (A4); RRQ 2 model-answer clause (A1); "justified" as جائز والا (A2). Quantities, dates, comparisons and causal claims otherwise checked and preserved (ninety seconds نوے سیکنڈ topic-02:61; sixty pupils ساٹھ topic-03:48; one-device-per-four ہر چار شاگردوں کے لیے ایک آلہ topic-03:26; third Monday مسلسل تیسرا پیر topic-03:54; the misconception blocks\' negations all intact).',
      ],
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'Banked-term drift (owner resolution required per style-guide "Terminology bank"): "Ethical Dilemma" banked اخلاقی مخمصہ (terminology.csv:109) and used by the unit\'s own fig-U12-3.ur.svg column header, but the prose uses دو پہلو throughout (topic-02.mdx:3,65,69,71,94,102,103; index.mdx:34; unit-assessment.mdx:110,112) - prose, figure and bank disagree on the unit\'s second most frequent concept word; teacher-notes.mdx:54 itself lists the banked اخلاقی مخمصہ.',
        '"Rubric" banked معیارِ جانچ as the adopted prose term (terminology.csv:72) but rendered منی روبرک/روبرکس (topic-01.mdx:95, topic-02.mdx:102, topic-03.mdx:95, unit-assessment.mdx:3,150, unit-teacher-notes.mdx:64) - the same course-wide convention as EFMP-301 Units 1-3, so the conflict predates this unit but stands.',
        '"National Professional Standards for Teachers" has a banked draft phrase اساتذہ کے لیے قومی پیشہ ورانہ معیارات (terminology.csv:115, flagged "needs human review at G5") but topic-02.mdx:48 transliterates نیشنل پروفیشنل اسٹینڈرڈز فار ٹیچرز. Banked terms that ARE honoured: Professional Ethics پیشہ ورانہ اخلاقیات (topic-02 passim, Glossary-linked), Guidance and Counseling رہنمائی اور مشاورت (prose form with اور vs the banked و - recorded as advisory A9-adjacent note in the summary), Reinforcement تقویت, Classroom Management جماعتی انتظام (fig-U12-6).',
        'Prose/figure term splits inside the Urdu unit (advisory A6): counselor مشیر vs کاؤنسلر (fig-U12-2.ur.svg); honest reporting ایماندار رپورٹنگ vs سچی رپورٹنگ (fig-U12-3.ur.svg); cluster جھرمٹ vs گچھے (fig-U12-5.ur.svg); evidence ثبوت vs شہادت (fig-U12-5.ur.svg); discipline ضابطہ vs علم (fig-U12-1.ur.svg note).',
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'The register is largely academic-plain and an entering B.Ed student can follow it (glossed first uses, natural order in most sentences, English technical terms consistently transliterated where used: کوئز ایپ، لیڈر بورڈ، ٹیبلٹ)، but a proofreading pass is owed: شاگرڈ/شاگر for شاگرد at 6 loci (topic-01.mdx:46; topic-02.mdx:38,40; topic-03.mdx:48; unit-assessment.mdx:142,143); بازخرد for بازخورد at 6 loci (topic-03.mdx:48,76,99; unit-assessment.mdx:86,132,147); کام کی میٹز for the established کام کی میز (topic-03.mdx:38,50; Unit 4\'s Urdu and this unit\'s own assessment:143 use میز).',
        'Grammar/coinage slips: "کیا چھوٹا نام لیں" (topic-01.mdx:62) garbled for "name what it missed"; "اس نے پیشے کا وہ حصہ نہیں ملا" dative slip and "جو استاد ... ملے گی/کرے گی" gender agreement (topic-02.mdx:63); "اسکول کا اوسط" (unit-assessment.mdx:98); نشانہ باند for نشانہ باندھا (topic-03.mdx:52; unit-teacher-notes.mdx:33); پیشن گوئی for پیش گوئی (topic-02.mdx:108; unit-assessment.mdx:169); دو پہلوئوں nonstandard plural (index.mdx:3,10,34; topic-02.mdx:3); استادوں for اساتذہ (topic-02.mdx:94).',
        'Non-standard coinage "صورت بہبود کام" for "formative work" (unit-teacher-notes.mdx:64) against the bank\'s تشکیلی family (terminology.csv:20,73,88) and Unit 1\'s own تشکیلی کام - course-wide (Units 2-12), recorded for the owner; "counter-example" weakened to "کھڑا ہوا جواب" (unit-teacher-notes.mdx:46); "thesis in miniature" as "مقالہ چھوٹی شکل میں" (unit-teacher-notes.mdx:33).',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'Rendered RTL verified on all six Urdu pages: lang=ur, dir=rtl, Noto Nastaliq Urdu webfont loaded (document.fonts) and applied to the prose (nastaliq-bidi-audit.log); no overflow or clipping at 360px narrow or A4 print; tables fit without scroll; the HTML tables mirror for free under dir=rtl.',
        'Figure mirroring per style-guide v4.1 verified in geometry: the .ur.svg variants reflect x about the viewBox centre and swap text-anchor (measured: fig-U12-3.ur fifth-row column-2 text bbox 535.2..626.0 ends 12px clear of the 638 grid line; column-3 263.8..370.0; duty 642.7..763.3 - no column crossing, no text-on-text, no panel crossing in any of the 12 variants; figure-overprint-audit-ur.log). The G3 repair locus (fig-U12-3 fifth row) is collision-free in both light and dark Urdu variants, with all five row separators present.',
        'Bidi punctuation measured correct: every discriminable SVG label ending in ، or ؛ renders the mark on the LEFT side of the run (bbox comparison with the mark stripped; nastaliq-bidi-audit.log); embedded Latin (ERQ, MCQ, textbook.com.pk, ہ 1-2 station markers) renders in place; the fig-U12-6 timeline reads right-to-left (station 1 rightmost, line drawn 750->30) and its Urdu alt text correctly says دائیں سے بائیں. Figure-label content defects (fig-U12-6 Unit 9 "تشخیص نما" meaningless fragment, Unit 10 dangling کے; fig-U12-5 شہادت for evidence) are recorded as advisory findings A5/A6 - they are translation-content errors, not RTL mechanics failures.',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: '[semantics] Negation reversal in the topic-01 activity step 2. EN docs/semester-1/efmp-301/unit-12/topic-01.mdx:124-126 asks for the sentences "that would have opened the door without opening a counseling session"; UR i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-12/topic-01.mdx:63 reads "جو دروازہ کھولتے بغیر مشاورت سیشن کھولے" - "which opens a counseling session without opening the door". The بغیر binds to the wrong clause, so the Urdu instructs the opposite of the English. Repair: e.g. "جو دروازہ کھولیں مگر مشاورت سیشن نہ کھولیں".',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: '[semantics] Valence reversal in the fairness duty\'s examples. EN topic-02.mdx:47 "the pupil you cannot help liking" (an affinity case beside the patron\'s child and the colleague\'s nephew); UR topic-02.mdx:38 "وہ شاگرد جسے پسند نہ کرنا آپ نہیں روک سکتے" - "the pupil you cannot stop yourself from disliking". The example\'s valence is reversed. Repair: "وہ شاگرد جسے پسند کرنے سے آپ نہیں روک سکتے".',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: '[authority] G3 dependency unmet. No accepted or signed G3 evidence exists (ADR-0019: certification not provisioned; registry empty). The best available English review, specs/content/efmp-301/reviews/unit-12/G3/agent-g3-efmp301-u12-run001.json (advisory, disposition revise, 5 blocking + 9 advisory findings), binds the pre-repair English: its manifest digests differ from this review\'s bound inputs for the five unit MDX files, the six figure SVGs, sources, coverage and concepts. The English was repaired at 678a6f2d after that review; this G5 binds the post-repair English at 43e2e859. Per the G5 rubric a changed English digest invalidates the dependency. Escalation to the owner (GQUR-300 PR #65 precedent): a fresh G3 round on the post-repair English, or an owner-accepted dependency basis, must precede any G5 pass. The full Urdu-vs-current-English comparison was performed regardless, and the post-repair changes were verified as mirrored in Urdu.',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: '[terminology] Banked-term drift needing owner decisions (style guide: a conflict between a translator\'s term choice and the bank is resolved by the curriculum owner). (a) "Ethical Dilemma" is banked as اخلاقی مخمصہ (terminology.csv:109) and the unit\'s own fig-U12-3.ur.svg column header uses مخمصہ, but the prose uses دو پہلو throughout - prose, figure and bank disagree on the unit\'s second most frequent concept word. (b) "Rubric" is banked as معیارِ جانچ, the adopted prose term since 2026-09-14 (terminology.csv:72), but the unit uses منی روبرک/روبرکس (topic-01:95, topic-02:102, topic-03:95, unit-assessment:3,150, teacher-notes:64) - the same course-wide convention as EFMP-301 Units 1-3, so the conflict predates this unit. (c) "National Professional Standards for Teachers" has a banked draft phrase (terminology.csv:115, flagged "needs human review at G5") but topic-02:48 transliterates نیشنل پروفیشنل اسٹینڈرڈز فار ٹیچرز.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[semantics] RRQ 2 model answer, garbled causal clause. EN unit-assessment.mdx:187-188 "because what is written stops being what happened" vs UR unit-assessment.mdx:140 "کیونکہ جو لکھا گیا وہ جو ہوا وہ رکھ جاتا ہے" - ungrammatical and the "stops being" sense is lost; the rest of the model answer is intact and the marks (1+1) are unaffected. Repair: e.g. "کیونکہ جو لکھا جاتا ہے وہ ہونے والی بات نہیں رہتا".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[semantics/terminology] "justified" rendered جائز والا (legitimate - a false friend) at index.mdx:35 ("جائز والے منصوبے سے جواب دیں"), topic-03.mdx:10 (blooms_summary) and unit-assessment.mdx:118 (ERQ 5 task), while the ERQ 5 rubric itself correctly uses جواز والا (unit-assessment.mdx:195). The capstone\'s justify-with-evidence demand is recoverable from the task elaboration but the word should be unified on جواز والا.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[semantics/register] "corridors" rendered گلیوں (streets/lanes) throughout: topic-01.mdx:46, 48, 91, 93; unit-assessment.mdx:110 and the ERQ 1 rubric title :154 ("گلی والا نسخہ"). The English image is guidance happening informally inside the school (corridor = گلیارہ/برآمدہ); the Urdu relocates it to the street. The instructional meaning (untrained, unrecorded, informal) survives, but the image is wrong and load-bearing in the ERQ 1 title. Repair: گلیاروں/برآمدوں میں.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[semantics] "and the counselor, too, escalates" rendered "اور مشیر بھی بڑھاوا دیتا ہے" (topic-01.mdx:42). Bare بڑھاوا دینا reads "promotes/encourages"; Unit 11\'s established usage carries a destination ("استاد ہیڈ ٹیچر یا مقرر کردہ شخص تک بڑھاوا دیتا ہے", unit-11/topic-02.mdx:49) which makes the meaning clear, but this instance has none. Repair: e.g. "مشیر بھی معاملہ آگے بڑھاتا ہے".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[rtl/terminology] fig-U12-6 Urdu timeline station labels (both light and dark variants): the Unit 9 station reads "تشخیص نما" - the fragment نما is meaningless, an artifact of imitating the English hyphen-split "assess-/ment" (banked term: تشخیص); the Unit 10 station reads "تدریسی تعلم کے" with a dangling کے. Repair: "تشخیص" and "تدریسی تعلم" (static/img/figures/efmp-301/unit-12/fig-U12-6.ur.svg and .ur.dark.svg).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[terminology] Prose/figure term splits inside the Urdu unit, each individually readable but inconsistent where the unit\'s integration design leans on the term: counselor مشیر (prose) vs کاؤنسلر (fig-U12-2.ur.svg); honest reporting ایماندار رپورٹنگ (prose) vs سچی رپورٹنگ (fig-U12-3.ur.svg); cluster جھرمٹ (prose, topic-03:38,68,76) vs گچھے (fig-U12-5.ur.svg title and labels); evidence ثبوت (prose) vs شہادت/testimony (fig-U12-5.ur.svg branch "شہادت اور فیصلے" - also a wrong word for evidence); discipline ضابطہ (prose, topic-01:40,76) vs علم (fig-U12-1.ur.svg note "تین علم", also grammatically odd for "three disciplines").',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[register] Recurring one-word slips, each a localized repair: شاگرڈ/شاگر for شاگرد (topic-01:46; topic-02:38,40; topic-03:48; unit-assessment:142,143); بازخرد for بازخورد (topic-03:48,76,99; unit-assessment:86,132,147); کام کی میٹز for the cross-unit term کام کی میز (topic-03:38,50 - Unit 4\'s Urdu and this unit\'s own assessment:143 use میز); نشانہ باند for نشانہ باندھا/مرکوز (topic-03:52; unit-teacher-notes:33); پیشن گوئی for پیش گوئی (topic-02:108; unit-assessment:169); دو پہلوئوں nonstandard plural (index:3,10,34; topic-02:3); استادوں for اساتذہ (topic-02:94, twice); grammar slips "کیا چھوٹا نام لیں" (topic-01:62), "اس نے پیشے کا وہ حصہ نہیں ملا" and "جو استاد ... ملے گی/کرے گی" (topic-02:63), "اسکول کا اوسط" (unit-assessment:98).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[register] "formative work" rendered صورت بہبود کام (unit-teacher-notes.mdx:64) - a non-standard coinage; the bank\'s formative family is تشکیلی (terminology.csv:20 "Formative Assessment" تشکیلی تشخیص, :73, :88) and EFMP-301 Unit 1\'s own teacher notes use تشکیلی کام. The coinage is course-wide (Units 2-12 use it), so this is recorded for the owner rather than as a unit-12-only repair. Also minor: "counter-example" weakened to "کھڑا ہوا جواب" (teacher-notes:46); "the course\'s thesis in miniature" as "کورس کا مقالہ چھوٹی شکل میں" (teacher-notes:33); banked رہنمائی و مشاورت (with و) vs the prose\'s رہنمائی اور مشاورت - the teacher notes\' own banked-terms list cites the و form (teacher-notes:54); banked پیشہ ورانہ معیارات vs prose معیار (topic-02:48; index:34).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: '[accessibility/rtl] Reviewer image-channel limitation, recorded honestly: this reviewing session could not display PNG content (the Read tool returned no image data for PNGs; the chrome-devtools and playwright MCP browsers found no system Chrome at /opt/google/chrome/chrome). Visual verification therefore rests on browser-measured geometry (render-audit-ur.json: no overflow at 360px/A4 print on any page; tables fit; figure sizes; dark swap; figure-overprint-audit-ur.log: no collisions in any of the 12 Urdu variants; nastaliq-bidi-audit.log: Nastaliq loaded, trailing punctuation on the correct side) plus source-level analysis of every SVG label. The 25 saved PNG renders remain evidence for human or superseding-reviewer verification. Render access itself was not missing - pages built, served and rendered in a real Chromium and were measured; only the reviewer\'s image display channel was unavailable. Had all other criteria passed, this limitation would have pushed the disposition to escalate rather than pass.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${LOGS}/figures-variants-check.log` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build.log` },
    { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.log` },
    { name: 'manifest-verify', exit_code: 0, log_path: `${LOGS}/manifest-verify.log` },
    { name: 'render-inspect-ur', exit_code: 0, log_path: `${LOGS}/render-inspect-ur.log` },
    { name: 'figure-overprint-audit-ur', exit_code: 0, log_path: `${LOGS}/figure-overprint-audit-ur.log` },
    { name: 'nastaliq-bidi-audit', exit_code: 0, log_path: `${LOGS}/nastaliq-bidi-audit.log` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(`${ROOT}/${G5}/agent-g5-efmp301-u12-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('report written;', Object.keys(evidence).length, 'evidence entries');
