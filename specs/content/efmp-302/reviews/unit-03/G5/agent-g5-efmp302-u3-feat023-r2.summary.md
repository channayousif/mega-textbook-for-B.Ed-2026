# G5 Urdu review - EFMP-302 Unit 3 (feat023-r2) - ESCALATE (all criteria pass; G3 dependency only)

Fresh advisory G5 review of the EFMP-302 Unit 3 Urdu mirror ("Becoming an Effective
Teacher"), cycle 2 of the feature-023 submission, binding current bytes at commit
c138103 (the repair commit) against the prepared feat023-r2 manifest. All 140 bound
inputs were digest-verified through the contract library's recompute
(`logs-feat023-r2/verify-inputs.log`), and `git show c138103 --stat` confirms the repair
commit touched exactly the five stated Urdu files - topic-01, topic-02, topic-03,
topic-05 and unit-teacher-notes - with nothing else changed.

**Disposition: escalate** - all ten criteria pass on the current bytes, but the
unresolved uncertain G3-dependency finding (U-01) forbids a pass under the contract.
This is the same posture as the Unit 2 G5 cycle-2 report.
Report: `specs/content/efmp-302/reviews/unit-03/G5/agent-g5-efmp302-u3-feat023-r2.json`
(validated: structurally valid, escalate).

## All eight cycle-1 blocking repairs verify

Each repair was verified three ways - in the source bytes, in the served pages of the
fresh shared two-locale build (grep over the built HTML), and in rendered close-ups
(`renders-feat023-r2/v-repair-*.png`, composited for reading) - with the old defect
forms confirmed absent from the served pages:

1. **B-01** `topic-02.mdx:189-190` - summary now reads "جوش عموماً مہارت کے پیچھے آتا
   ہے، آگے نہیں" (enthusiasm follows competence), matching the English and the Urdu
   body's own line at :61-62.
2. **B-02** `topic-01.mdx:74-75` - "غلط یا محض اشارہ شدہ تعریفیں" (inaccurate or
   merely implied definitions); the stray negation that inverted the Taylor and Thion
   finding is gone, and the prose now agrees with fig-U3-2.ur.svg.
3. **B-03** `topic-01.mdx:123-124` - "معروضی لگتا ہے" (feels objective); the
   موضوعی/معروضی inversion is fixed.
4. **B-04** `unit-teacher-notes.mdx:65` - "کسی زیرِ خدمت استاد کے مشاہدے" (a serving
   teacher); فرضی (fictional) is gone.
5. **B-05** `topic-05.mdx:82` - "یقینی بنانے کا طریقہ ہے کہ کوئی آپ کی بات نہیں
   سنتا" (ensuring nobody listens to you); the direction now matches the English and
   the assessment key, removing the unit's self-contradiction.
6. **B-06** `topic-05.mdx:85-86` - "چاہے اس کا ارادہ کیا جائے یا نہ کیا جائے، ہوتی
   رہتی ہے" (whether or not it is intended); the tautology is gone.
7. **B-07** `topic-02.mdx:131-132` - "ہر سبق اسی وقت بنا بنا کر پڑھایا جاتا ہے"
   (every lesson improvised on the spot); the adaptability failure mode RRQ 4 assesses
   is restored.
8. **B-08** `topic-03.mdx:207-209` - "ایک سوچا سمجھا طے شدہ راستے کے طور پر بیان کی
   ہے، کسی ماخذ سے حاصل کردہ دریافت کے طور پر نہیں" (a reasoned default rather than
   a sourced finding); the noun is restored and the sentence is grammatical.

## What passes (all ten criteria)

- **authority** - every guide leaf for 3.1-3.5 and all six unit outcomes taught and
  assessed in Urdu; the English comparison base re-verified byte-identical (all 109
  shared inputs, by digest) to the advisory G3 cycle-2 pass, with the dependency
  recorded as uncertain finding U-01.
- **sources** - the epistemic-honesty passages survive exactly (Furlich scope with the
  verbal-significant/non-verbal-not result and the unstated-sample-size instruction;
  the 93% caution and its practitioner's-heuristic replacement; the Keelson Ghana
  scope), and the two cycle-1 source defects (B-02, B-08) are repaired.
- **coverage** - all 13 sub-topics taught; the 2+2+1 per-topic assessment blueprint
  holds in Urdu; depth-gate exit 0.
- **assessment** - all 10 Urdu MCQs solved blind from Urdu alone: 1-ج, 2-الف, 3-ب,
  4-د, 5-الف, 6-ج, 7-د, 8-ب, 9-الف, 10-د - identical to the Urdu key and the English
  key with option order preserved. RRQ schemes total 50/50 with the humour exception
  intact; the ERQ 10-cap survives; no leaks and no demand-level change.
- **accessibility** - render inspection over the served build (chromium 149.0.7827.0,
  port 4623): desktop 1280x900, narrow 360x780 and A4 print all clean (zero defects,
  nothing unreachable, nothing clipped); measure-figure-text clean on all 20 Urdu
  variants.
- **completeness** - no omissions, no additions, no stubs across the eight file pairs;
  figures wired to `.ur.svg`; all 40 built figure SVGs hash-match static/; no
  collateral regression from the repairs.
- **semantics** - the eight repairs verified faithful in their surrounding context by a
  full re-read of all eight file pairs; every quantity, date, comparison and
  instructional sequence re-checked and preserved.
- **terminology** - key_terms bank-accepted (terminology.csv:111-113); bank terms
  honored in prose; the 17 concept labels remain fit.
- **register** - academic-plain (درسی مگر عام فہم) throughout; the repairs themselves
  read naturally.
- **rtl** - fig-U3-6 (de-escalation flowchart) geometrically mirrored right-to-left
  (start x=650 -> outcomes x=30 vs English 30 -> 640); fig-U3-9's timeline stations
  reversed (transmitter at x=780 right, present at x=135 left vs English 120/765);
  bidi punctuation around embedded Latin verified in rendered close-ups; RTL table
  order correct; Nastaliq legible in all viewports and print.

## Why escalate rather than pass

The G5 rubric requires accepted G3 evidence for the exact English inputs, but ADR-0019
blocks agent certification, so no signed G3 evidence exists. The best available is the
feat023 advisory chain (G3 cycle 2 passed all seven criteria after the b8f8ffe figure
revert), and this run verified by digest that its English binding is byte-identical to
this review's. Per the contract, an unresolved uncertain finding forbids a pass, so the
disposition is escalate with all criteria passing - the same posture as Unit 2's G5
cycle 2. OWNER DECISION NEEDED per G-2026-65: accept the advisory chain as sufficient
for the G5 stage, or commission fresh G3 passes, before any G5 tracker row is treated
as more than advisory.

## Unresolved advisories (A-U1..A-U7, preserved from cycle 1)

Cycle 1 failed the terminology and register criteria on items its own findings array
classified as advisory; this cycle re-verified those items on unchanged bytes and
records them as advisory-severity, consistent with the Unit 2 feat023 bar (register and
terminology passed there with comparable word-choice advisories). None inverts meaning,
none affects assessment, none blocks comprehension:

- **A-U1** ten-instance typo/garble cluster (جتنا سنتا ہے، کوشائے، غبط، غرب مقصد،
  دونوز، پہچاننے یوگ، سجھاتا، تبدیلا داعی، لے گا آئے گا، مشاہہ) - each a
  single-word repair.
- **A-U2** terminology drift: "high-stakes" -> اعلیٰ دہشت (terror); "professionalism"
  rendered پیشہ ورانہ رویہ at load-bearing sites vs the bank draft term پیشہ واریت;
  "mentor" -> سربراہ استاد (head teacher) in the teacher notes; خودنمائی for
  self-report; بے ترتیب overloading; شہادت register (owner preference).
- **A-U3** grammar slips (اوپر کا شکل، سبق کا منزل، اس کی میکانزم، کسی حقائق میں),
  calques (مقابلہ بازی، کارآمد دوبارہ ترتیب، مطالعہ کیس، پیداواری فریمنگ) and
  inconsistent embedded Latin (conclusion, assignment, paraphrase, fail).
- **A-U4** concept-label nuances for the owner (moral agent -> اخلاقی نمونہ flattens
  the agent nuance; change agent -> تبدیلی کا داعی; CON-3-5 عوامل vs عمل).
- **A-U5** the carried English-side advisories (A-02, A-03, A-04, A-06, A-09, A-10,
  A-11, A-13, A-N3) are faithfully mirrored and affect the Urdu reader identically.
- **A-U6** assessment surface nits with no effect on answers (MCQ 7 option الف stray
  "میں"; RRQ 6 stem agreement slip; MCQ 10 key's looser "پار کر لیا ہے").
- **A-U7** fig-U3-4's marginal 1.2px bounding-box graze, proven ink-free by cycle 1's
  pixel analysis; this cycle's geometry checks report it clean.

## Commands and evidence

All six deterministic gates exit 0 (validate:content, check:depth-gate, check:figures,
check:no-em-dash, check:no-answer-keys, check:docs-sync), as do measure-figure-text,
the input verification, the G3 dependency digest check, the render inspection (port
4623, Urdu route, 8 pages, desktop/narrow/print/SVG-geometry) and three targeted
screenshot passes over the repair sites and the assessment. The site-build entry
records the shared build's freshness evidence (built immediately after c138103; all
eight repaired passages present and all old defect forms absent in the served pages;
all 40 built figure SVGs hash-match static/) - no rebuild was performed. Evidence: 73
files under `logs-feat023-r2/` and `renders-feat023-r2/`, all SHA-256 hashed in the
report's evidence manifest.

Advisory only: no signing, no registry or tracker change, translation_status stays
draft. The G5 tracker row for Unit 3 remains the parent's and owner's action.
