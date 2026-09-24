---
id: "0044"
title: "EFMP-302 Unit 3 G3 revise and figure repair"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 023-author-efmp-302
branch: 023-author-efmp-302
user: orchestrator
command: completion-agent phase 2 (G3 reviews)
labels: [efmp-302, unit-03, g3, review, figures, repair, feat023]
links:
  spec: specs/023-author-efmp-302/spec.md
  ticket: null
  adr: ADR-0019, ADR-0024
  pr: null
files:
  - specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r1.json
  - specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r1.summary.md
  - static/img/figures/efmp-302/ (132 files reverted; fig-U3-6 fixed)
  - specs/content/efmp-302/reviews/unit-0*/G2/20260924T14*.json (all rebound)
  - specs/content/efmp-302/tasks.md
tests:
  - node scripts/review-evidence.mjs validate (report) -> valid, disposition revise
  - node scripts/measure-figure-text.mjs (all units) -> fig-U3-6 clean; 10 pre-existing cosmetic grazes
  - npm run figures:variants:check -> OK (432 figures)
  - npm run check:figures -> pass
  - prepare-gate-evidence EFMP-302 1..6 -> all 8 gates PASS per unit
---

## Prompt

Phase 2 continuation: fresh advisory G3 review for Unit 3 (five topics), then apply sensible
repairs within the two-cycle budget.

## Response snapshot

The fresh Unit 3 G3 review (feat023-r1, 111 inputs at 53caf73) returned **revise**: one blocking
finding (B-01) - the 2026-09-21 b8f8ffe "SVG re-optimisation" pass had enlarged fonts via a
duplicating CSS override and re-wrapped long labels into tspan blocks with colliding baselines,
so distinct strings printed on top of each other in 9 of 10 unit-03 figures (18 full
superpositions measured via rendered-DOM geometry and pixel ink-intersection; both theme
variants), and all 10 MDX carriers were left 50px short of the enlarged viewBoxes. No gate saw
it: check:figures reads no glyph geometry and measure-figure-text checks only viewBox overflow
and the wordmark. A sweep confirmed the damage was course-wide (all 50 EN SVGs across units 1-6
carry the pattern; ~1000 estimated collisions).

Repair (69bae9e): reverted all 132 figure files under static/img/figures/efmp-302/ to their
pre-b8f8ffe state (no later commit had touched them; this is the geometry the run-001..007
reviews, Unit 1's certification and Unit 2's rate-probe translation were built on), then
re-applied the one repair b8f8ffe had incidentally absorbed: run-007 A-01, the fig-U3-6
outcome-box/wordmark collision (box height 64 to 56, wordmark to y=512, both variants).
measure-figure-text reports fig-U3-6 clean; figures:variants:check passes (432 figures);
check:figures passes; 10 pre-existing cosmetic shape-wordmark grazes remain (reported-not-failed
class prior reviews accepted). G2 evidence rebound for all six units; tracker rows updated.
Cycle 2 (feat023-r2) spawned to verify the repair.

## Outcome

- ✅ Impact: the course-wide figure regression is repaired at the geometry the prior evidence
  was built on; Unit 3's blocking finding addressed within cycle 1 of the budget.
- 🧪 Tests: all listed gates green; report validated.
- 📁 Files: listed above; commits 69bae9e, 419e119, 7a87094.
- 🔁 Next prompts: Unit 3 G3 cycle 2 (running); then Unit 2 G3 cycle 2 (its cycle-1 pass was
  obtained against the broken figures), then Units 4-6 cycle 1.
- 🧠 Reflection: a mass "optimisation" commit that changes every asset is a review-scope bomb -
  the fresh review caught it because it measured rendered geometry, not just gate exit codes.

## Evaluation notes (flywheel)

- Failure modes observed: the deterministic gates have a blind spot for text-on-text overlap
  inside committed SVGs; a gap entry will record it for the owner.
- Graders run and results: all green as listed.
- Prompt variant: g3-reviewer cycle-2 template with explicit repair-verification instructions.
- Next experiment: cycle-2 verification of the reverted geometry.
