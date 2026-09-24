---
id: "0009"
title: "G5 phase complete, PR opened"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: review-evidence + g5-reviewer + prepare-gate-evidence + gh pr create
labels: ["gqur-300", "g5", "reviews", "repairs", "sweep", "escalations", "pr"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: ADR-0019
  pr: https://github.com/channayousif/mega-book-for-B.Ed-2026/pull/65
files:
  - specs/content/gqur-300/reviews/unit-01..06/G5/ (six run001 reports + renders + logs)
  - i18n/ur/.../gqur-300/unit-01..06/ (G5 repairs, all six units)
  - docs/semester-1/gqur-300/unit-01..06/ (EN-side repairs: clo_refs, citations, alt order)
  - static/img/figures/gqur-300/unit-0*/ (label and geometry repairs)
  - specs/content/gqur-300/concepts/unit-04..06.md (label repairs)
  - specs/gaps.md (G-2026-30, G-2026-41 appended)
  - specs/content/gqur-300/tasks.md (G5 advisory rows recorded, all unchecked)
tests:
  - npm run check:content PASS (11/11) after every repair cycle
  - npm run check:all PASS (17/17) at the PR head after the origin/main merge
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Phase 5: G5 Urdu review on EVERY unit (advisory, fresh g5-reviewer per unit, max 2 concurrent
per the coordinator capacity note). Phase 6: merge origin/main, npm run check:all, push, open a
PR (do not merge). Coordinator additions: the load-gate rule (no build-heavy steps above load 8)
and the G-code block map (G-2026-28..30 plus the extension G-2026-41..50; G-2026-31..40 reserved
for GNAS-301).

## Response snapshot

G5 run001 completed for all six units (dispositions: revise). Each review found real
translation defects the structural gates cannot see: Unit 1 had a fabricated source passage,
a weekday change and a reversed meaning; Unit 2's Urdu topic-01 activity and check-your-
understanding were wholesale copies of Unit 4's material; Unit 3's ERQ-4 stem omitted the
45-rupee price, making the item unsolvable; Unit 4 garbled "opposite sides equal" and leaked
a rounding direction; Unit 5 garbled "snack" into a non-word; Unit 6 corrupted "data-informed"
into "absolute" (the exact misconception the unit corrects) and "gap" into "joy". Every
actionable finding was repaired, in both locales where the defect was English-side (clo_refs,
citation forms, fig-U6-1's alt order). A course-wide sweep applied the defect classes the
first two reviews proved systemic: 'tutors' transliterated, ربرک replaced with the banked
معیارِ جانچ, گروہی adopted, حکمتِ تدریس, خود جائزہ, key_terms blocks in every UR index.

Two operational lessons: the sweep itself introduced one defect (a teacher-notes line
addressing the tutor-reader as "your tutor", caught by the Unit 3 review), and a git add -A
swept a reviewer's temporary build directories into version control (removed; .gitignore's
build/ rule does not cover build-g5-* names).

Escalations recorded in specs/gaps.md: G-2026-30 (the G3 dependency chain - no accepted G3
evidence can cover the post-repair English inputs; owner accepts the advisory chain or
commissions a fresh G3 pass) and G-2026-41 (consolidated terminology and register rulings:
disputed coinages embedded in glossary.json, the Assessment/Evaluate mapping, Tally/Records,
perimeter/sides, numeracy drift, canteen, reader-gender policy, Latin terms, SVG font and
scaling properties).

origin/main moved twice during the run (GENG-300's PR #64 landed mid-phase); the merge was
resolved by union in the two hot files (decision log: D-2026-0030 before D-2026-0040..0042;
gaps: G-2026-25/26 before G-2026-28/29/30/41). All 17 full gates pass at the PR head.
Branch pushed; PR #65 opened against main (not merged, per the brief).

## Outcome

- Impact: GQUR-300 fully authored, reviewed (advisory) and repaired in both locales; PR #65 open
- Tests: check:content 11/11 and check:all 17/17 at the PR head
- Files: six G5 reports, repairs across all six units (both locales), figures, concepts, gaps
- Next prompts: owner rulings on G-2026-29/30/41; fresh G3 pass or advisory-chain acceptance;
  the human quality pass before any translation_status flip
- Reflection: the G5 reviews vindicated the advisory design - every unit's review found
  semantic defects that no automated gate measures, and the repairs are now traceable to
  independent evidence. The systemic-sweep pattern (repair a proven defect class everywhere,
  then let the remaining reviews verify it) worked, at the cost of one sweep-introduced
  defect that the next review caught.

## Evaluation notes (flywheel)

- Failure modes observed: translation drift that inverts or garbles meaning while passing
  every structural check; wholesale section copies between units; a repair sweep that
  fixed a pattern but broke one referent; git add -A committing untracked build artifacts.
- Graders run and results: check:content PASS and check:all PASS throughout; reviews advisory.
- Prompt variant (if applicable): null
- Next experiment: null
