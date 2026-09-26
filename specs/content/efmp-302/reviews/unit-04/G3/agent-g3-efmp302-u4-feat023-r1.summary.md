# G3 review summary - EFMP-302 Unit 4, feature 023 cycle 1

- **Report**: `specs/content/efmp-302/reviews/unit-04/G3/agent-g3-efmp302-u4-feat023-r1.json`
  (validated: `node scripts/review-evidence.mjs validate` -> structurally valid)
- **Reviewer**: `agent:g3-reviewer`, run `agent-g3-efmp302-u4-feat023-r1`, model LongCat-2.0,
  fresh session that did not author or translate these bytes
- **Author run**: `commit:51f46ec` (manifest `feat023-r1/manifest.json`, 103 inputs, all
  digest-verified; the manifest recomputes identically)
- **Disposition**: **pass** (advisory; not a signature, registry entry or acceptance - the
  read-only `accept` verifier rejects with `CONTENT_REVIEW_PUBLIC_KEY is not provisioned`)

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | pass |
| coverage | pass |
| assessment | pass |
| accessibility | pass |
| readability | pass |
| pedagogy | pass |

## The two run-007 blocking findings - repaired and now verified

1. **fig-U4-3 caption overprinting the wordmark** (run-007 measured a 4.5 px overprint at
   commit 0222168). The ded73ec repair is verified by this reviewer's own rendered-DOM
   measurement: caption line 1 ends at x=713.4 against the wordmark's x=775.7 - a 62.3 px
   clearance, in both theme variants. Visually confirmed in
   `renders-feat023-r1/crop-desktop-fig-U4-3-feat023-r1.png`.
2. **The caption's quantitative claim about the unread NPST document** ("Most come from the
   performance band"). Absent from every carrier in the current bytes: caption, `<desc>`,
   img alt and the figures-manifest row were each read. The replacement ("The three shown
   below are drawn from performance and skills") is a statement about the diagram itself.
   The `## Unverifiable sources` declaration again discloses exactly what it leaves
   uncorroborated (ten standard names, three-part division, 2009 origin).

The run-007 escalation over the feature-022 cycle budget is answered by this fresh
submission (cycle 1 of 2). The repair-displacement pattern run-007 warned about was
specifically re-checked in the repaired artifact: no new defect found.

## Figure-internal geometry (the G-2026-62 lesson applied)

The b8f8ffe re-optimisation that shipped overlapping figure text was reverted by 69bae9e;
these are the reverted bytes. Because no gate measures text-on-text overlap, this review
measured it directly: rendered-DOM `getBBox` for every `<text>` element in all 8 unit-04
figures, both EN theme variants (16 files), pairwise intersection at a 0.1 user-unit
epsilon. **Result: zero text-on-text candidates (no two glyph boxes even touch) and zero
wordmark collisions.** A pixel ink-intersection instrument was built into the measurement
for any candidate pair; none arose. `measure-figure-text` is clean on all 16 files;
`render-inspect` reports 0 defects across desktop 1280x900, narrow 360x780 and A4 print;
figures are keyboard-reachable scrollable regions (`tabindex="0" role="region"` + aria-label)
and the whole diagram is swipe-reachable at 360 px (scroll test: image right edge 344 px).

## Assessment

All 25 items solved blind before the key was read
(`logs-feat023-r1/assessment-derivation.log`): 10/10 MCQ keys agree, all ten RRQ schemes
sum to their stated totals, the 10/10/5 blueprint holds (>= 2 MCQ and >= 2 RRQ per topic,
one ERQ per topic plus the integrative ERQ-02, four-criterion analytic rubrics out of 20
with the 10-mark cap), and the run-006 RRQ-05 repair remains sound.

## Carried advisories (18, none blocking)

RRQ recall weighting (~43/59 marks); RRQ-03 four requirements vs three payable marks; the
Topic 3.4 cross-reference collecting teacher gaze instead of pupil contributions; the
unglossed **Certification** key term; carr2000 declared but unused; the npst attempt-log
divergence; the 2008/2009 origin divergence across bound guides; one grammar slip
("an recognised programme"); the fig-U4-4 alt not carrying the caveat's force; topic-01's
near-universal/thirty-years claim resting on the unread UNESCO source (covered by its
declaration); the missing at-rest scroll affordance on overflowing figures; fig-U4-3's
1.2 px indicator-box graze; fig-U4-3's caption sentence being image-only text; RRQ-09's
missing model answer; the unreconciled topic-03/04 one-document tension; CLO 6's weaker
fit; MCQ-06's *(Apply)* label; topic-04's Isore referent generalisation.

## Commands (all exit 0, logs under `logs-feat023-r1/`)

validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys,
check:docs-sync, check:concept-graph, measure-figure-text, measure-text-overlap,
site-build (both locales), render-review. Evidence manifest: 42 artifacts (16 PNG renders,
7 print PDFs, 15 logs, 4 JSON/script records).
