# G5 Urdu review - EFMP-302 Unit 3 (feat023-r1) - REVISE

Fresh advisory G5 review of the EFMP-302 Unit 3 Urdu mirror ("Becoming an Effective Teacher"),
cycle 1 of the feature-023 submission, binding current bytes at commit 86ce1dd against the
prepared feat023-r1 manifest. All 140 bound inputs were digest-verified through the contract
library's own recompute (`logs-feat023-r1/verify-inputs.log`), and the complete bilingual
comparison covered all eight English/Urdu file pairs plus all ten figures and their 20 Urdu
variants.

**Disposition: revise** - 6 criteria pass, 4 fail (sources, semantics, terminology, register).
Report: `specs/content/efmp-302/reviews/unit-03/G5/agent-g5-efmp302-u3-feat023-r1.json`
(validated: structurally valid, revise).

## What passes

- **authority** - every guide leaf for 3.1-3.5 and all six unit outcomes are taught and assessed
  in Urdu. The English comparison base was verified byte-identical (all 30 English-side inputs,
  by digest) to the advisory G3 cycle-2 pass, so unlike Unit 2 no English bytes changed after
  that pass; the missing accepted-G3 dependency is recorded as uncertain finding U-01 in the
  G-2026-65 pattern.
- **coverage** - all 13 sub-topics taught; the 2+2+1 per-topic assessment blueprint holds in Urdu.
- **assessment** - all 10 Urdu MCQs solved blind from Urdu alone: 1-ج, 2-الف, 3-ب, 4-د, 5-الف,
  6-ج, 7-د, 8-ب, 9-الف, 10-د - identical to the Urdu key and the English key with option order
  preserved (الف/ب/ج/د = a/b/c/d). RRQ schemes total 50/50 with the humour exception intact;
  the ERQ 10-cap survives; no answer is leaked and no demand level changes.
- **accessibility** - render inspection over the served two-locale build: desktop 1280x900,
  narrow 360x780 and A4 print all clean (zero defects, nothing unreachable, nothing clipped);
  measure-figure-text clean on all 20 Urdu variants.
- **completeness** - no omissions, no additions, no stubs across the eight file pairs; figures
  wired to `.ur.svg`; Further reading mirrored.
- **rtl** - fig-U3-6 (de-escalation flowchart) is geometrically mirrored to flow right-to-left
  (start x=650 -> outcomes x=30 vs English 30 -> 640); fig-U3-9's timeline stations are reversed
  (780/570/360/140 vs 120/330/540/760); bidi punctuation around embedded Latin (Goe، Bell اور
  Little (2008); Furlich (2016); 614; 93 فیصد) verified in rendered close-ups; RTL table order
  correct at 360px; Nastaliq legible in all viewports and print.

The epistemic-honesty passages the submission depends on all survive translation exactly, in
prose, figures and the assessment key: the Furlich 2016 scope (verbal significant / non-verbal
not; no sample size or country; university not school), the 93% caution and its
practitioner's-heuristic replacement, and the Keelson Ghana scope.

## Why it revises - eight blocking Urdu defects

1. **B-01** `topic-02.mdx:189-190` - the summary inverts the topic: "جوش عموماً مہارت کے آگے
   آتا ہے، پیچھے نہیں" says enthusiasm usually comes BEFORE competence, contradicting both the
   English and the Urdu body's own correct line at :61-62.
2. **B-02** `topic-01.mdx:74-75` - the cited Taylor and Thion finding is inverted: "merely
   implied" becomes "نہ صرف اشارہ شدہ" ("not merely implied"); fig-U3-2.ur.svg renders the same
   finding correctly, proving the right form was available.
3. **B-03** `topic-01.mdx:123-124` - "feels objective" rendered "موضوعی لگتا ہے"; موضوعی
   standardly means subjective (معروضی = objective), inverting the sentence's rhetoric.
4. **B-04** `unit-teacher-notes.mdx:65` - "a serving teacher" rendered "فرضی استاد" (fictional
   teacher), misdescribing the three observation tasks.
5. **B-05** `topic-05.mdx:82` - "nobody listens to you" flipped to "کسی کو آپ کو سنانے سے
   روکنے" (stopping anyone from telling you); the assessment key gets it right, so the unit
   contradicts itself.
6. **B-06** `topic-05.mdx:85-86` - "whether or not it is intended" loses ارادہ and becomes the
   tautology "چاہے بھی ہو یا نہ ہو، ہوتی ہے".
7. **B-07** `topic-02.mdx:131-132` - "every lesson is improvised" garbled to "مہارت سے ہوا ہوا
   ہے" (reads as "done with skill"), breaking the adaptability failure mode RRQ 4 assesses.
8. **B-08** `topic-03.mdx:207-208` - the goe2008 scope note's "reasoned default rather than a
   sourced finding" loses its noun and its syntax; only the "not a sourced finding" fragment
   survives.

## The G3 dependency (uncertain finding U-01)

ADR-0019 blocks agent certification, so no accepted (signed) G3 evidence exists. The best
available is the feat023 advisory chain: cycle 1 found the b8f8ffe figure regression, cycle 2
(`G3/agent-g3-efmp302-u3-feat023-r2.json`) passed all seven criteria after the revert. This run
verified by digest that the English inputs bound here are byte-identical to that pass, and
proceeded with them as the authoritative comparison base, recording the dependency rather than
aborting (the G-2026-65 course-wide pattern). The owner must decide, per G-2026-65, whether to
accept the advisory chain or commission fresh G3 passes before any G5 row is treated as more
than advisory.

## Advisory findings (seven)

- **A-U1** a ten-instance typo/garble cluster (جتنا سنتا ہے، کوشائے، غبط، غرب مقصد، دونوز،
  پہچاننے یوگ، سجھاتا، تبدیلا داعی، لے گا آئے گا، مشاہہ) - each a single-word repair.
- **A-U2** terminology drift: "high-stakes" -> اعلیٰ دہشت (terror); "professionalism" rendered
  پیشہ ورانہ رویہ at load-bearing sites vs the bank draft term پیشہ واریت; "mentor" ->
  سربراہ استاد (head teacher) in the teacher notes.
- **A-U3** register: grammar slips (اوپر کا شکل، سبق کا منزل، اس کی میکانزم، کسی حقائق میں),
  calques (مقابلہ بازی، کارآمد دوبارہ ترتیب، مطالعہ کیس، پیداواری فریمنگ) and inconsistent
  embedded Latin (conclusion, assignment, paraphrase, fail).
- **A-U4** concept labels: all 17 authored labels confirmed fit; moral agent -> اخلاقی نمونہ
  (exemplar) and change agent -> تبدیلی کا داعی (advocate) flatten the agent nuance - owner
  decision before promotion into the bank.
- **A-U5** the carried English-side advisories (A-02, A-03, A-04, A-06, A-09, A-10, A-11, A-13,
  A-N3) are faithfully mirrored in the Urdu and now affect the Urdu reader identically.
- **A-U6** assessment surface nits with no effect on answers (MCQ 7 option الف stray "میں";
  RRQ 6 stem agreement slip).
- **A-U7** fig-U3-4's Urdu annotation stack has a 1.2px bounding-box graze proven ink-free by
  pixel analysis (~2px clean gap); no repair required.

## Commands and evidence

All six deterministic gates exit 0 (validate:content, check:depth-gate, check:figures,
check:no-em-dash, check:no-answer-keys, check:docs-sync), as do measure-figure-text, the render
inspection (port 4622, Urdu route, 8 pages, 26 artifacts) and the site-build freshness check
(all 40 built figure SVGs hash-match static; all 8 built Urdu Unit 3 pages carry current-content
markers - the shared build at 86ce1dd is fresh for this unit, no rebuild needed). This run's own
text-overlap instrument over the 20 Urdu figure variants, validated by a synthetic negative
control, found zero real overlaps. Evidence: 57 files under `logs-feat023-r1/` and
`renders-feat023-r1/`, all SHA-256 hashed in the report's evidence manifest.

Advisory only: no signing, no registry or tracker change, translation_status stays draft. The
G5 tracker row for Unit 3 remains the parent's and owner's action.
