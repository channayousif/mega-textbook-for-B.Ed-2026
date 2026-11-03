# Independent G5 Review Summary: EFMP-305 Unit 2 (Urdu)

**Course**: EFMP-305 (Inclusive Education, B.Ed 4-Year Semester 2)
**Unit**: Unit 2 - Understanding Learner Diversity
**Stage**: G5 (Urdu independent review, ADR-0019)
**Reviewer**: `agent:opencode`
**Run ID**: `crew-run:efmp-305-u02-g5-rabe274b8`
**Model**: LongCat-2.0
**Disposition**: `escalate`
**Report**: `specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json`
**Evidence**: `specs/content/efmp-305/reviews/unit-02/logs-abe274b8/`

## 1. Executive summary

This is the first independent G5 review of the Urdu mirror of EFMP-305 Unit 2. The reviewer
did not translate or author the unit. The English dependency is the accepted human desk
sign-off `specs/content/efmp-305/reviews/unit-02/G3/20261102T140729Z-g3-desk-5da9d105.json`;
all 92 shared input digests match the current commit, so the same English inputs are bound.

The bilingual comparison is complete and clean at the structural level. Heading vectors,
table shapes, paragraph-block counts and frontmatter match the English exactly in all five
files. All 10 MCQs solve to the published key; option order, RRQ mark schemes (29 marks)
and the five ERQ rubrics mirror the English. No material semantic divergence was found.

The disposition is **escalate**, for two reasons:

1. **Render access is missing.** Page-level browser inspection (normal 1280, narrow 360,
   A4 print) could not be performed because the crew brief forbids `npm run build`, a dev
   server and Playwright, and no `build/` exists. This model cannot read image content.
   Criteria `accessibility` and `rtl` are recorded as `unverified`. The G5 rubric states
   that missing render access requires escalation.
2. **Terminology bank departures need an owner ruling.** The prose systematically renders
   "assessment" as جانچ while the frozen bank maps Assessment to تشخیص (and the index
   `key_terms` declares تشخیص); "slow learner" is rendered سست طالب علم against the banked
   کمزور متعلم; the Learning Outcome heading uses تعلیمی نتائج against the banked
   نتیجہ ہائے تعلم; and Labelling has no bank entry and appears as لیبل / لیبلنگ / ٹھپا.

All six deterministic gates pass at exit 0. The report is advisory under ADR-0019; it does
not certify, tick G5, or sign anything.

## 2. Criterion results

| Criterion | Status | Headline |
|---|---|---|
| authority | pass | Same guide sub-topics, same SLO refs, same spec/coverage binding. |
| sources | pass | All four citations retained with supporting meaning; unverifiable-source declarations still honest. |
| coverage | pass | U2-1..U2-5 taught in Urdu; block counts identical; 10/10/5 bank covers the outcomes. |
| assessment | pass | Blind solve 10/10; option mapping A->الف preserved; RRQ 29 marks; ERQ rubrics match. |
| accessibility | **unverified** | Static structure passes; page render unavailable. |
| completeness | pass | Passage-by-passage parity; frontmatter exact; one minor formatting note. |
| semantics | pass | No material divergence; three minor advisories. |
| terminology | **fail** | Assessment/Slow Learner/Learning Outcome bank departures; Labelling unbanked. |
| register | pass | Academic-plain; minor calque advisories. |
| rtl | **unverified** | Static RTL/bidi checks pass; visual page inspection unavailable. |

## 3. Blocking / uncertain findings

### U-1 Render access missing (uncertain)
Page-level browser inspection could not be performed. The crew brief forbids `npm run build`,
a dev server and Playwright; no `build/` exists; this model cannot read image content.
`accessibility` and `rtl` are unverified. Per the G5 rubric and the review-unit skill, this
escalates. Evidence: `logs-abe274b8/render-review.log` and eight committed sharp PNGs of the
Urdu figure variants. A human should inspect those PNGs, then run a real render pass.

### U-2 Terminology bank departures (uncertain, owner ruling)
- **Assessment**: bank تشخیص; prose جانچ (42 occurrences), with تشخیص reserved for medical
  diagnosis. The bank itself uses جانچ in تشخیصی جانچ (Diagnostic Assessment), so the bank
  is internally split. Either bank جانچ as an accepted pair for Assessment or require the
  banked form in prose.
- **Slow Learner**: bank کمزور متعلم; prose سست طالب علم (summative task) and سست قاری.
- **Learning Outcome**: bank نتیجہ ہائے تعلم; heading تعلیمی نتائج.
- **Labelling**: no bank entry; rendered لیبل (57x), لیبلنگ (20x), ٹھپا (5x). The G4 handoff
  proposed لیبلنگ / منفی ٹھپا لگانا.

The unit's actual key terms (Learner diversity, Impairment, Disability, Handicap, Learning
difficulty, Social difference, Labelling, Stigma) otherwise agree with
`specs/content/efmp-305/concepts/unit-02.md`.

## 4. Advisory findings

- **A-1 Semantic drift (minor)**: `topic-02.ur:21` renders "what she could do instead" as
  کیا کر سکتی تھی (counterfactual past) while the following activity asks what the teacher
  could do "starting tomorrow". Consider کیا کر سکتی ہے.
- **A-2 Register (minor)**: "I am stupid" -> میں نالائق ہوں softens the child's self-talk;
  نالائق means incapable rather than stupid.
- **A-3 Formatting parity**: `topic-02.ur` Further reading presents the Westwood and Florian
  descriptions as bullets; the English runs them inline.
- **A-4 RTL typography**: `topic-01.ur:58` uses `(ADHD - Attention Deficit Hyperactivity
  Disorder)` with a spaced hyphen inside a Latin parenthetical; style guide v4.6 prefers a
  colon for elaborating clauses.
- **A-5 G3 signature**: the accepted G3 evidence is a human desk sign-off without a detached
  Ed25519 signature. The human path is satisfied, but automatic acceptance is not possible.

## 5. Evidence artifacts

- Six gate logs: `logs-abe274b8/{validate-content, check-depth-gate, check-figures,
  check-no-em-dash, check-no-answer-keys, check-docs-sync}.log` (all exit 0).
- `logs-abe274b8/measure-figure-text.log`: glyph geometry clean across all 16 SVG variants.
- `logs-abe274b8/render-figures.log` + eight PNGs: the four Urdu figure variants and their
  dark twins, rasterised with sharp at intrinsic size.
- `logs-abe274b8/render-review.log`: the partial static inspection and its limitation.
- `G5/manifest.json`: 108 bound inputs prepared from the reviewed commit.

## 6. Advisory tracker row (for the parent to append)

The reviewer does not edit the tracker. Suggested row, to be appended by the crew lead:

```
| Unit 2 | G5 ur-review | ▢ | | advisory run abe274b8: escalate; page-level render inspection unavailable (no build/dev server/Playwright; model cannot read images), accessibility+rtl unverified; terminology bank departures (Assessment جانچ vs تشخیص, Slow Learner سست طالب علم vs کمزور متعلم, Learning Outcome تعلیمی نتائج vs نتیجہ ہائے تعلم, Labelling unbanked لیبل/لیبلنگ/ٹھپا) need owner ruling; all six deterministic gates pass; report specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json |
```
