// Assembles agent-g5-efmp301-u2-run001.json from the prepared manifest, the
// reviewer's findings, and the real evidence bytes on disk. Verdict text lives
// here only as written by the reviewer; nothing in this script derives it.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const digest = (b) => createHash('sha256').update(b).digest('hex');
const manifest = JSON.parse(readFileSync('specs/content/efmp-301/reviews/unit-02/G5/manifest.json', 'utf8'));
const DIR = 'specs/content/efmp-301/reviews/unit-02/G5';
const LOGD = `${DIR}/logs-agent-g5-efmp301-u2-run001`;
const REND = `${DIR}/renders-agent-g5-efmp301-u2-run001`;

const evidence = {};
for (const f of readdirSync(LOGD)) evidence[`${LOGD}/${f}`] = digest(readFileSync(`${LOGD}/${f}`));
for (const f of readdirSync(REND)) evidence[`${REND}/${f}`] = digest(readFileSync(`${REND}/${f}`));

const EN = 'docs/semester-1/efmp-301/unit-02';
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02';

const findings = [
  // ---- blocking semantic/omission defects ----
  { severity: 'blocking', resolved: false, message: `G3 dependency not satisfied for the bound English: the only G3 report (specs/content/efmp-301/reviews/unit-02/G3/20260925T084500Z-g3-attempt-01.json) is advisory, unsigned, disposition revise with 5 open blocking findings, and reviewed the PRE-repair English; the English was then repaired at commit acd0868f and the manifest binds the post-repair bytes, which no G3 report (signed or advisory; run-002 has a manifest but no report) covers. Escalated to the curriculum owner per the GQUR-300 PR #65 precedent. The full EN-UR comparison below was nevertheless performed against the current bound English.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-01.mdx:56 - "Children babble before they speak words" is rendered "بچے بولنے سے پہلے بولتے ہیں" (children speak before speaking), a circular non-sequitur in the orderly-sequence principle passage. Repair: e.g. "بچے الفاظ بولنے سے پہلے آوازیں نکالتے ہیں". The following two clauses restore babble->words->sentences only partially.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-01.mdx:56 - "whatever the staff room claims about prodigies" is rendered "اسٹاف روم جتنے بھی عبوری کہانیاں کرے"; "prodigies" (نابغہ بچے) is mistranslated as "عبوری" (transitional), producing a meaningless phrase in the no-skipping claim.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-01.mdx:82 (activity item 3) - "The pupil can now subtract with borrowing, after three weeks of practice sums" is rendered "ادھار لینے والے حساب میں جمع کر سکتا ہے": جمع (addition) is written where تفریق (subtraction) is meant, changing the mathematical meaning of the sorting item.` },
  { severity: 'blocking', resolved: false, message: `Untranslated English words embedded in Urdu prose: ${UR}/topic-01.mdx:68 "some ذہنی عملوں کی بنیادی رفتار" (EN "certain" left as "some"); ${UR}/topic-01.mdx:80 "اوپر والی shelf" (EN "shelf"); ${UR}/topic-04.mdx:54 "جگہ کو track کرنا ہے" (EN "track"). All three must be Urdu.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-03.mdx:46 - "They describe readiness, never worth" is rendered "وہ تیاری بیان کرتے ہیں، اجازت نہیں دیتے" ("they describe readiness, they do not give permission"), a meaningless rendering that drops the stages-never-deserve-worth claim in the misconception box.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-03.mdx:44 - "test a general claim ('all metals sink' - and find the counter-example)" is rendered "جانچ سکتا ہے اور جواب مل سکتا ہے": "counter-example" (مثالِ مخالف) became "an answer", losing the formal-operations concept the sentence teaches.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-03.mdx:58,60,64 - three cited passages are dropped: (a) the Seifert & Sutton (2009) quoted definition of social development ("the long-term changes in relationships and interactions involving self, peers, and family" / "how friendships develop") plus its citation; (b) Erikson's first psychosocial crisis "trust and mistrust" with the quoted "development of trust between caregiver and child" plus its citation - replaced by an added "محفوظ بنیاد" (secure base) claim not in the English; (c) the peer-group sentence's "making friends, being a friend" quotation, the Erikson school-age crises AND Maslow's hierarchy references, the claim "by the teenage years friends carry at least as much weight as adults", and its citation - replaced by an added "peaks in adolescence" claim. Citations and quotations must retain their supporting meaning.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-03.mdx:60 - "That is not a verdict on the pupil; it is a reason for a teacher to be reliable" is rendered as a causal claim "یہ استاد کے قابل بھروسہ ہونے کی وجہ سے ہے" (this is because the teacher is reliable), reversing the prescriptive point; and the contrast class "a pupil whose experience says otherwise" is dropped from the preceding sentence.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-04.mdx:72 (activity item 1) - "A Class 3 teacher introduces multiplication with bundles of sticks before the times table" is rendered "ضرب کا تعارف پہاڑوں کی گڈیوں سے پہلے کرتا ہے": (a) "bundles of sticks" became "پہاڑوں کی گڈیوں" (bundles of mountains); (b) the sequence is reversed - the Urdu says the introduction happens BEFORE the sticks, so the EN's matched-teaching example reads as a mismatch.` },
  { severity: 'blocking', resolved: false, message: `${UR}/unit-assessment.mdx:48 (MCQ 3 stem) and :119 (ERQ 5) - "cannot follow ... instructions" is rendered "ہدایات نہیں مانگ سکتا" (cannot ASK FOR instructions) using مانگنا instead of e.g. "پر عمل نہیں کر سکتا", garbling both assessment stems.` },
  { severity: 'blocking', resolved: false, message: `${UR}/unit-assessment.mdx:144 (RRQ model answer 5) - "fit the page to the fingers rather than drill the fingers to the page" is rendered "انگلیوں کو صفحے پر ڈھالیں، نہ کہ انگلیوں کو صفحے پر تھوپیں": both clauses now say fingers-to-page, so the marking guidance reverses the EN's first instruction (adapt the page, not the fingers).` },
  { severity: 'blocking', resolved: false, message: `${UR}/unit-teacher-notes.mdx:47 - the quoted answer "nothing you can measure" is rendered "کچھ بھی جو آپ ناپ سکیں" (anything you can measure) with the negation dropped, reversing the answer that is meant to break the development-equals-size equation.` },
  // ---- moderate defects ----
  { severity: 'blocking', resolved: false, message: `${UR}/topic-03.mdx:62 - "thinking on two levels at once" is rendered "ایک سطح پر دو طرح کی سوچ" (two kinds of thinking on ONE level), and "is social training as much as cognitive" loses "social" ("تربیت بھی اور ادراک بھی"), in the Piaget dramatic-play passage.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-02.mdx:26 - "The Government Girls Primary School" is rendered "سرکاری اسکول" with "Girls" (لڑکیوں کا) dropped, inconsistent with ہیڈ مسٹریس at :101 and with topic-04 where لڑکیوں کے پرائمری اسکول is kept.` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-04.mdx:73 (activity item 2) - the quoted fifth instruction drops "underline": "عبارت پر واپس جائیں اور کوئی بھی لفظ جو آپ نے جواب 2 میں استعمال کیا" has no verb for what to do with the word (EN: "underline any word you used in answer 2").` },
  { severity: 'blocking', resolved: false, message: `${UR}/topic-03.mdx:38 - "The ages are approximate; the order is not" is rendered "عمریں تقریباً ہیں؛ ترتیب نہیں", whose natural reading is "there is no order", the opposite of the fixed-order claim; the ellipsis must be expanded (e.g. "ترتیب تقریبی نہیں").` },
  { severity: 'blocking', resolved: false, message: `${UR}/unit-assessment.mdx:42,101 and ${UR}/topic-02.mdx - "crossover years" is rendered "مخلوط سالوں" (mixed years), which reads as co-education years and is a term the topic prose never establishes (topic 2.2 calls it the "مشہور اور کبھی کبھی عجیب دور"); the assessment item therefore hinges on a term the studied text does not teach.` },
  { severity: 'blocking', resolved: false, message: `${UR}/unit-teacher-notes.mdx:63 - "they are almost always the mixtures" (mixtures of engines) is rendered "یہ تقریباً ہمیشہ ملاپ ہوتے ہیں" ("they are reconciliations"), a wrong word (ملاپ = reconciliation) for مل جل صورتیں.` },
  { severity: 'blocking', resolved: false, message: `${UR}/unit-teacher-notes.mdx:69 - "formative work" is rendered "صورت بہبود کام", a non-word coinage; the banked adjective تشکیلی (Formative Assessment = تشکیلی تشخیص) exists and was not used.` },
  { severity: 'advisory', resolved: false, message: `${UR}/topic-01.mdx:48 - "a pupil who is taller is not thereby more developed in any sense a teacher cares about" is rendered with a trailing spoken-style "نہیں" after a long positive clause and drops the comparative "more" ("نشوونما پا لیتا ہے"), leaving the negation scope unclear; and :54 "Long plateaus are punctuated by bursts" becomes "لمبے مدتی جماؤ کو دھماکوں سے روک دیا جاتا ہے" (plateaus are stopped by explosions), an unnatural rendering.` },
  { severity: 'advisory', resolved: false, message: `${UR}/topic-02.mdx:70 and ${UR}/topic-01.mdx - the comparatives "The classroom version of the principle matters more than the biology" (topic-03 EN line 125, rendered as "جماعت کی سطح پر اصول کا سب سے زیادہ کام کا حصہ یہ ہے") and similar more-than claims drop the comparison; meaning is recoverable but weakened.` },
  { severity: 'advisory', resolved: false, message: `${UR}/topic-02.mdx:52 - "sexual maturation" is coined as "جنسری پختگی" (جنسری is not a standard Urdu word) while ${UR}/unit-assessment.mdx:40 uses the standard "جنسی پختگی"; :60 transliterates "moves" as "موور کرے" and :72 renders a race "heat" as "ہیٹ" (which reads as temperature).` },
  { severity: 'advisory', resolved: false, message: `${UR}/topic-03.mdx:26 - "the taller of two identical glasses" drops "identical" (دو ایک جیسے گلاس), weakening the conservation demonstration's setup; :36 adds "سوئس ماہر نفسیات" (Swiss psychologist) not present in the EN.` },
  { severity: 'advisory', resolved: false, message: `${UR}/topic-02.mdx:79 (CYU 2) - "why gross-motor readiness arrives before fine-motor readiness matters for handwriting" is compressed to "بڑی حرکی تیاری باریک تحریر کے لیے کیوں پہلے آتی ہے", conflating the two readiness concepts; :81,92 (CYU 4, checklist) render "what each responds to" as "ہر ایک کیا جواب دیتا ہے" (what answer each gives).` },
  { severity: 'advisory', resolved: false, message: `${UR}/topic-02.mdx:64 and ${UR}/topic-04.mdx:64 - "once a term" is rendered "ایک بار موسم میں" (once a season); ٹرم is the school term. topic-03:64 also breaks the "holds social information no mark sheet supplies" clause into the ungrammatical "کوئی نمبر شیٹ فراہم نہیں کردہ معلومات رکھتا ہے".` },
  // ---- terminology ----
  { severity: 'blocking', resolved: false, message: `Terminology-bank drift: "Rubric" is banked as معیارِ جانچ (prose term adopted 2026-09-14) but the unit uses transliterations منی روبرک (topic rubrics) and روبرکس/روبرک (teacher notes :69, assessment :151); "Learning" is banked as سیکھنا but the prose engine term is تعلم while the .ur.svg figures label it سیکھنا, so prose and its own figures disagree on a core term; "Motivation" is banked as محرک but topic-04:62 uses حوصلہ; "Individual Differences" is banked as انفرادی اختلافات but topic-03:46 uses انفرادی فرق. Do not change the bank here; the owner must resolve each conflict per style-guide "Terminology bank".` },
  { severity: 'advisory', resolved: false, message: `Inconsistent recurring renderings across the unit: evidence = شہادت (topics 1-2, index) vs ثبوت (topic-03:28, topic-04 rubric, assessment key 10); feeling = جذبات (topic-01, topic-03 heading) vs احساس (topic-03:50, assessment summary/model answers); plateau = جماؤ (topics) vs میدان (assessment summary/key 6); "badly formed question" = غلط ساخت کا سوال (topic-01) vs بری طرح بنا سوال (assessment RRQ 2); "small for his age" = عمر کے مطابق چھوٹا (topic-02) vs عمر کے مقابلے چھوٹا (assessment RRQ 3); reading = پڑھائی (topic-01) vs مطالعہ (assessment MCQ 4).` },
  { severity: 'advisory', resolved: false, message: `New technical terms introduced by this unit need an owner ruling before the bank is updated (proposed, not applied): بقا (conservation), الٹ پلٹ (reversibility - informal register; قابلِ الٹ پھیر is the formal coinage), مرکز سے ہٹنا (decentration), حسی حرکی / قبل عملی / ٹھوس عملی / رسمی عملی (Piaget stages; note رسمی means ceremonial-formal - صوری is the logic sense of "formal"), وابستگی (attachment), نشو (growth), تعلم (learning as engine).` },
  // ---- register/orthography ----
  { severity: 'blocking', resolved: false, message: `Register/orthography defects that impede fluent academic-plain reading (درسی مگر عام فہم): the misspelling شاگرڈ for شاگرد occurs 10 times (topic-01 x6 incl. :48,56,80-87; topic-03 x3; topic-02 x1); Arabic yeh used for Urdu baari-yeh in اٹھوائي (topic-02:97); gender-agreement errors (فرق فرق بتانے assessment ERQ1 rubric; مرحلوں کی الفاظ topic-04:46,69; اچھال ہو رہی تھی topic-01:54; سکھائی ہو topic-01:96; بنی ہوئی کھیل topic-03:62); broken constructions (کچھ نہیں بھی نہیں topic-01:72; جاگتا ہوا سوتا نہیں topic-01:84; روے کو topic-04:58).` },
  { severity: 'advisory', resolved: false, message: `Register calques and transliterations to smooth at repair time: سرزمین for "territory" (topic-03:44,54), دھاگہ کھو دیتی for "loses the thread" (topic-04:54), مجموعی کام for "Summative task", جڑاؤ (assessment ERQ2 rubric), پولیس نہ کریں for "do not just police it" (topic-04:60), شیو/فٹنگ/منیجر transliterations, "باقاعدہ قواعد" losing "negotiated" rules (topic-03:62), "کلاسک جانچ" (topic-03:40), "نامی شاگرد" for "named pupil" (teacher notes :71 vs index "ایک شاگرد کو یاد رکھیں").` },
  // ---- uncertain ----
  { severity: 'uncertain', resolved: false, message: `Render-inspection limitation: this reviewer session could not visually view the captured PNG renders (the session's file-reading tool returns no image content for PNG/JPEG, verified on multiple files). All structural render properties (dir=rtl, Nastaliq webfont application to prose, table column order, zero overflow at 1280/360, print-stylesheet behaviour, figure variant wiring, shaped non-tofu figure labels via canvas ink analysis) were verified programmatically in the real Chromium browser, but pixel-level human judgement of Nastaliq legibility and visual bidi punctuation remains open; the 22 committed PNGs under renders-agent-g5-efmp301-u2-run001/ are the evidence for that human pass during repair verification.` },
  { severity: 'uncertain', resolved: false, message: `Urdu figure labels render in fallback Arabic-script fonts (FreeSerif/Unifont on this host) because a page webfont cannot cross into an <img>-embedded SVG and no system Nastaliq font exists here; labels are shaped and legible but Nastaliq only on clients with a system Nastaliq/Nastaleeq font. This is the repo-wide figure convention, identical to the reviewed EFMP-301 Unit 1 and EFMP-302 Unit 1 figures, so it is recorded as a platform observation for the owner, not a Unit 2 defect.` },
  { severity: 'advisory', resolved: false, message: `Informational: check:pipeline-gate currently fails course-wide ("G2 en-draft: stale or incomplete input manifest" for EFMP-301 units 2-12), a pre-existing G2 evidence-freshness gap for the owner; it is not a Unit 2 Urdu defect and the parity/terminology portion for this unit is inert while translation_status stays draft. The unit's UR key_terms (Development/نشوونما, Cognitive Development/ادراکی نشوونما) were verified to conform to terminology.csv manually.` },
  { severity: 'advisory', resolved: false, message: `Assessment equivalence verified despite the stem defects: all 10 Urdu MCQs were answered blind by the reviewer before either key was read (derived key b,a,d,c,b,b,b,c,c,b), matching both the Urdu key (unit-assessment.mdx:125-134) and the EN key (docs unit-assessment.mdx:173-189) exactly; option ordering, RRQ/ERQ task demands and Bloom tags otherwise correspond, and the ERQ rubric mark totals (20 each) match.` },
  { severity: 'advisory', resolved: false, message: `Mid-review input change, recorded for audit: after the initial 128/128 digest verification (13:13 local), commits 678a6f2d (Unit 12 G3 round-1 repairs, extended source excerpts) and 43e2e859 changed 2 of the 128 bound inputs (specs/content/efmp-301/sources/texts/seifert2009.md, vosniadou2001.md). Every Unit 2 input was verified byte-identical across ec4863a8..HEAD (empty diff over the unit-02 EN/UR directories, terminology.csv, style-guide.md, unit-02 figure assets and coverage/sources/figures manifests), so the EN-UR comparison, blind assessment derivation, gate runs and browser renders all reflect the bound unit bytes. The parent re-prepared the manifest at HEAD c2cd6f64 (this report binds that manifest) and preserved the originally bound manifest as manifest-run001-superseded-20260925T1313Z.json; the re-verification is logged in manifest-reverify.log.` },
];

const criteria = [
  { id: 'authority', status: 'fail', evidence: [
    'G3 dependency unsatisfied for the bound English: specs/content/efmp-301/reviews/unit-02/G3/20260925T084500Z-g3-attempt-01.json is advisory/unsigned, disposition revise (authority, sources, assessment, accessibility failed; 5 open blocking findings); English repaired afterwards at commit acd0868f; G3 run-002 has a manifest only, no report; the G5 manifest binds post-repair bytes',
    'Urdu outcomes mirror the approved unit outcomes (UR index.mdx:29-38 clo_refs SLO:EFMP-301-2-1/2-2 retained; all four topics and the 10/10/5 bank present)',
  ] },
  { id: 'sources', status: 'fail', evidence: [
    `${UR}/topic-03.mdx:58 - Seifert & Sutton (2009) quoted definition of social development + citation dropped`,
    `${UR}/topic-03.mdx:60 - Erikson trust/mistrust quotation + citation dropped; "secure base" added`,
    `${UR}/topic-03.mdx:64 - Erikson school-age crises + Maslow + quotation + friends-vs-adults claim + citation dropped`,
    `Further-reading citations retained verbatim in all files (e.g. ${UR}/topic-01.mdx:133-136); remaining in-text citations retained (topic-03:36,38,62; topic-02:36,44,52,56; topic-04:44,46,54)`,
  ] },
  { id: 'coverage', status: 'pass', evidence: [
    'All four topics, index, unit-assessment (10 MCQ + 10 RRQ + 5 ERQ + keys/rubrics) and teacher notes exist as complete Urdu mirrors; no heading-only stubs found in the passage-by-passage comparison',
    'Both unit outcomes taught and assessed in Urdu: SLO 2-1 via topics 2.1-2.2 + MCQs 1-7 + RRQs 1-5,8-10; SLO 2-2 via topics 2.3-2.4 + MCQs 8-10 + RRQs 6-7 + ERQs 1-5',
    'Semantic defects are recorded under semantics/completeness; outcome coverage itself is complete',
  ] },
  { id: 'assessment', status: 'fail', evidence: [
    'Blind derivation of all 10 Urdu MCQs (b,a,d,c,b,b,b,c,c,b) matches both keys; key correspondence verified',
    `${UR}/unit-assessment.mdx:48 MCQ 3 stem and :119 ERQ 5 - "cannot follow instructions" rendered as "نہیں مانگ سکتا" (cannot ask for)`,
    `${UR}/unit-assessment.mdx:144 RRQ model answer 5 - page/fingers direction reversed in marking guidance`,
    `${UR}/topic-04.mdx:72 activity item 1 - matched/mismatched sequence reversed + sticks mistranslated`,
    `${UR}/unit-assessment.mdx:42,101 - "crossover years" rendered with a term the topic text never establishes`,
  ] },
  { id: 'accessibility', status: 'pass', evidence: [
    'All 8 <Figure> alt texts translated into Urdu (topic-01:32,62; topic-02:30,62; topic-03:30,68; topic-04:32,64) and figure src wired to .ur.svg variants; rendered pages expose them (render-inspect.log)',
    'No horizontal overflow/clipping at 1280 and 360 on any of the 7 Urdu pages (render-inspect.log overflow probes: 0 elements)',
    'Print stylesheet applies: nav/navbar/TOC/footer/pagination hidden under print emulation (font-probe/render logs); no console errors',
    'Caveat: pixel-level visual legibility could not be viewed by this session - see the uncertain finding; PNGs committed for human inspection',
  ] },
  { id: 'completeness', status: 'fail', evidence: [
    'Passage-by-passage EN-UR comparison across index, 4 topics, assessment, teacher notes, figure captions/labels performed (all 7 file pairs fully read and aligned)',
    'Omissions: three cited passages (topic-03:58,60,64); "Government Girls" (topic-02:26); "identical" glasses (topic-03:26); "underline" (topic-04:73); "a pupil whose experience says otherwise" (topic-03:60); "suddenly" (topic-01:80)',
    'Additions: "محفوظ بنیاد" secure base (topic-03:60); "peaks in adolescence" (topic-03:64); "Swiss psychologist" (topic-03:36)',
    'Untranslated English residue: "some" (topic-01:68), "shelf" (topic-01:80), "track" (topic-04:54)',
  ] },
  { id: 'semantics', status: 'fail', evidence: [
    'Negation dropped: "nothing you can measure" -> "کچھ بھی جو آپ ناپ سکیں" (teacher-notes:47)',
    'Meaning reversed/garbled: "never worth" -> "اجازت نہیں دیتے" (topic-03:46); "counter-example" -> "جواب" (topic-03:44); "subtract" -> "جمع" (topic-01:82); babble clause circular (topic-01:56); "prodigies" -> "عبوری" (topic-01:56); activity item 1 sequence reversed (topic-04:72); RRQ-5 page/fingers reversed (assessment:144); "reason to be reliable" -> causal claim (topic-03:60)',
    'Ambiguity: "The ages are approximate; the order is not" -> "ترتیب نہیں" readable as "no order" (topic-03:38)',
    'Modal/comparative weakening: "matters more than the biology" (topic-02:70); "more developed" (topic-01:48); "seem to make no progress" (topic-01:54)',
  ] },
  { id: 'terminology', status: 'fail', evidence: [
    'Bank-conformant: Development/نشوونما, Cognitive/ادراکی, Emotional/جذباتی, Social/معاشرتی نشوونما, Adolescence/مراہقت, Maturation/پختگی, Heredity/وراثت, Environment/ماحول, Peer Group/ہم عمر گروہ, Readiness/تیاری; UR index key_terms conform to terminology.csv',
    'Drift: Rubric (معیارِ جانچ banked vs منی روبرک/روبرکس used); Learning (سیکھنا banked vs تعلم in prose vs سیکھنا in figures); Motivation (محرک vs حوصلہ); Individual Differences (انفرادی اختلافات vs انفرادی فرق); Formative (تشخیلی banked vs صورت بہبود coined)',
    'Inconsistent pairs within the unit: شہادت/ثبوت, جذبات/احساس, جماؤ/میدان, عمر کے مطابق/مقابلے چھوٹا, پڑھائی/مطالعہ',
    'New terms proposed for owner: بقا, الٹ پلٹ, مرکز سے ہٹنا, حسی حرکی, قبل عملی, ٹھوس عملی, رسمی عملی, وابستگی, نشو, تعلم',
  ] },
  { id: 'register', status: 'fail', evidence: [
    'Academic-plain register broadly achieved (درسی مگر عام فہم), but marred by: شاگرڈ misspelling x10 (topic-01, topic-02, topic-03)',
    'Orthography: Arabic yeh in اٹھوائي (topic-02:97); روے for رویے (topic-04:58)',
    'Grammar: gender-agreement errors (assessment ERQ1 "فرق فرق", topic-04:46,69 "مرحلوں کی الفاظ", topic-01:54,96, topic-03:62) and broken constructions (topic-01:72,84; topic-03:64)',
    'Calques/transliterations: سرزمین, دھاگہ کھو دیتی, موور کرے, ہیٹ, پولیس, جڑاؤ, مجموعی کام (see findings)',
  ] },
  { id: 'rtl', status: 'pass', evidence: [
    'Real-browser inspection (Chromium 149 via repo Playwright 1.61.1) of all 7 Urdu pages at 1280 and 360 and under print emulation; dir=rtl throughout; prose computed font "Noto Nastaliq Urdu" with webfont loaded (16px/35.2px line-height)',
    'Tables render RTL with first column rightmost (topic-01 rubric: معیار at x=1127 of 561-1264; ERQ5 table معیار right block, نمبر left block)',
    'All 8 .ur.svg + .ur.dark.svg serve 200; light variant lazy-loads on scroll; dark variant selected under data-theme=dark; canvas ink analysis proves shaped non-tofu Urdu labels; timeline fig-U2-7 mirrored right-to-left per style-guide convention',
    '22 PNG renders committed under renders-agent-g5-efmp301-u2-run001/ (normal, 360px, A4 print, all 8 figure variants); pixel-level viewing by this reviewer was not possible (see uncertain finding)',
  ] },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 2,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:90c3f10',
  reviewer_run_id: 'agent-g5-efmp301-u2-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T18:12:00Z',
  completed_at: '2026-09-25T19:10:00Z',
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-02/G3/20260925T084500Z-g3-attempt-01.json',
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGD}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGD}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGD}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGD}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGD}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGD}/check-docs-sync.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGD}/render-review.log` },
    { name: 'check:pipeline-gate (informational)', exit_code: 1, log_path: `${LOGD}/check-pipeline-gate-informational.log` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(`${DIR}/agent-g5-efmp301-u2-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('report written; evidence files:', Object.keys(evidence).length);
