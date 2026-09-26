# G3 review summary - EFMP-302 Unit 6 (feat023-r1)

- **Report**: `specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json`
- **Disposition**: **escalate** (advisory; not a gate completion)
- **Reviewer**: `agent:g3-reviewer`, run `agent-g3-efmp302-u6-feat023-r1`, model LongCat-2.0
- **Author run**: `commit:15ee421` (worktree HEAD; manifest verified 101/101 paths and digests)
- **Reviewed**: 2026-09-24, against the prepared manifest at `feat023-r1/manifest.json`
- **Supersedes**: runs 001, 002, 003 and 007

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | **fail** |
| coverage | pass |
| assessment | pass |
| accessibility | pass |
| readability | pass |
| pedagogy | pass |

## What changed since run-007 (verified against current bytes)

- **A1 repaired and verified**: the decision register is now bound - `specs/decisions/log.md`
  is a required input and reports bind the ruling entries they cite via the `rulings` map
  (checked by `validateReport`). This report binds D-2026-0001/-0002/-0004/-0005.
- **P1 repaired and verified**: fig-U6-5's caption now says the PLC's "cost is time rather
  than money", consistent with its "Low money, high time" Cost cell; no longer claims
  "costs the least money" against Reflective tools' "Almost none".
- **A2 repaired and verified** (the parent carried it as owner-judgement; it is in fact
  resolved): owner decision D-2026-0004 (2026-09-20) extends D-2026-0002 course-wide, and
  `content-spec.md` "Course review plan" now carries the one-page PD plan with the
  superseded wording recorded.
- **P2 repaired and verified** (also carried as owner-judgement; in fact resolved): commit
  9972d70 relabelled MCQ 6 (Analyze -> Understand) and RRQ 3/4/9 (Remember -> Understand),
  each gaining an explanation clause; marks 27/66 -> 24/63; the blooms_summary now agrees
  with the spec band and the items; `check:bloom-bands` exits 0 over 400 items.

## Still open (carried, owner-judgement - verified live in current bytes)

- **S1 (blocking)**: seven coverage rows assert groundings the prose never cites in the
  named sections (U6-05/06 -> day1999, U6-07/08/10 -> villegas2003, U6-12/13 -> guskey2000).
- **S2 (blocking)**: topic-01's Guskey (2000) and Villegas-Reimers (2003) attributions carry
  no level-of-support declaration and no point-of-use uncorroborated disclosure; both texts
  are declared unretrievable. D-2026-0001's Limits retain this as a failure.
- **S3 (uncertain)**: no bound source text for any of Unit 6's six keys. hennessy2022
  (abstract) and kwakman2003 (record + absent abstract) were independently re-verified via
  OpenAlex this run; the four print/report sources remain unread. Note: the handoff listed
  suarez2022 as a Unit 6 excerpt - Unit 6 does not cite it.
- Advisories carried: S4 (villegas2003 "print-only book" mislabel), X1 (identical accessible
  names), X2 (fig-U6-2's four narrow dashed boxes - re-measured live), X3 (small desktop
  table-figure text - re-measured live), P3 (misconception only in teacher notes), P4
  (identity through-line absent), P5 (reviewer-register sentences), P6 (CON-6-12 mapped to
  RRQ-08 which tests U6-09).
- Advisories new: U6-07 (Conferences) has no dedicated bank item; RRQ 4's "new-teacher
  transition" stem is ambiguous (the mark scheme reads the transition OUT of the stage);
  fig-U6-3's transition labels graze adjacent stage boxes (cosmetic, legible).

## Figure-internal geometry (the G-2026-62 verification)

Rendered-DOM leaf-text bounding boxes were measured over all 8 unit-06 figures x both EN
theme variants (16 SVGs): **zero text-on-text superposition, zero wordmark collisions, zero
viewBox escapes**. The instrument was validated by a negative control on the b8f8ffe-era
bytes, where it flags 25 stacked-baseline superpositions - so the clean result on the
reverted (69bae9e) bytes is meaningful. fig-U6-2's X2 rect escapes remain (advisory, text
15.4-25.2 units past the dashed edge, fully legible, nothing clipped). render-inspect's one
flagged defect (fig-U6-6 "did not load") was investigated and dismissed: a lazy-load
measurement race on the unit's longest page; the image fetches HTTP 200 and renders once
scrolled into view.

## Commands

All six contract gates exit 0 (validate:content, check:depth-gate, check:figures,
check:no-em-dash, check:no-answer-keys, check:docs-sync), plus check:bloom-bands,
check:concept-graph and check:source-floor, a both-locale site build, render-inspect
(exit 1 on the dismissed lazy-load false positive; disposition recorded), the composite
render-review record, measure-figure-text, and this run's geometry/verification instruments.
67 evidence files hashed; 31 PNGs. Report validates:
`node scripts/review-evidence.mjs validate <report>` -> structurally valid, escalate.

## Why escalate and not revise or pass

Everything except `sources` passes on current bytes, and the two blocking findings (S1, S2)
are the ones the parent marked owner-judgement: they cannot be repaired by the author within
this cycle (re-grounding coverage rows or disclosing an unread source at the point of use in
the spine passage are owner decisions under D-2026-0001/D-2026-0005, which route Unit 6's
open findings to the owner). A pass is forbidden by the unresolved blocking findings; revise
would imply an author repair cycle the submission's governance does not authorise.
