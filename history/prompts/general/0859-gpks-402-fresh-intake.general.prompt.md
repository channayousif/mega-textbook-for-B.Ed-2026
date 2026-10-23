---
id: 0859
title: GPKS-402 fresh G0/G1 intake
stage: general
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: none
branch: intake/gpks-402-20261023
user: M Yousif Channa
command: evaluate-intake (evaluator agent, fresh session)
labels: ["board-direct", "gpks-402", "intake", "G0", "G1"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gpks-402/intake-20261023/manifest.json
 - specs/content/gpks-402/intake-20261023/evaluation.md
 - specs/decisions/log.md
 - specs/gaps.md
tests:
 - manifestFor() recompute: 57 inputs, 0 mismatches, digest reproduces
 - lightweight content gates exit 0 (they walk no GPKS-402 units); check:content-status stale, unrelated
---

## Prompt

for GPKS-402 · Pakistan Studies, why nothing is on live site?

yes, run a fresh intake

## Response snapshot

GPKS-402 has no units on main because its content-spec is `status: draft` and the crew planner only plans units for approved specs. The prior approval D-2026-0069 was pending-owner-review and void because the bound input `specs/content/terminology.csv` changed. Parent prepared a fresh bundle (`prepare-intake-evidence.mjs`, 57 inputs at 413d76ea, commit 23c2f632) and launched an independent evaluator agent.

Evaluator result D-2026-0071 (pending-owner-review, supersedes D-2026-0069): identity, partition (on D-2026-0053/0070), coverage, outcomes, structure pass; blueprint passes except Units 4 and 6 "Formative 5-8 items" line, escalated as G-2026-154 (style guide 5-8 default conflicts with the per-topic floor of 3 for units with 3+ topics; corpus-wide). Readings FAIL (author repair): broken/wrong URLs for pak-constitution-1973 (404 confirmed by parent), unesco-pak-education, sbp-annual; home-page-only URLs for mofa-foreign-policy, na-lahore-resolution, pbs-pak-stats; HEC entry names no document; no open-access row records registry and verification date; Unit 3 has no open-access source. Decision-residue FAIL: D-2026-0052's Units-column mismatches persist (two remain, one new). Spec status unchanged (draft).

## Outcome

- ✅ Impact: intake re-run on current inputs; blockers identified precisely.
- 🧪 Tests: manifest verification PASS; gates exit 0 (non-probative for an unauthored course).
- 📁 Files: bundle, evaluation.md, D-2026-0071, G-2026-154.
- 🔁 Next prompts: author repair of the GPKS-402 reading list; owner ruling on G-2026-154; another fresh intake.
- 🧠 Reflection: D-2026-0069 approved readings that a live link check fails; earlier source-floor pass was vacuous (no authored units).

## Handoff (for CEO and agents)

- Shipped / changed: fresh intake evidence and D-2026-0071 on branch intake/gpks-402-20261023 (unpushed).
- Decisions the team must respect: GPKS-402 content-spec stays draft; no GPKS-402 unit may be authored until an intake approves and the owner confirms.
- Pending / next owner: author repairs to readings and the Units column (crew or author); owner ruling on G-2026-154; owner to confirm or reject D-2026-0071; then a fresh intake.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: D-2026-0069 "Bound to" digest is 63 hex chars and does not match intake-88/manifest.json; `bound()` excludes `/intake/` but not `intake-NN/` or `intake-<date>/`, so bundle dirs fall into their own course's bound set.
- Graders run and results (PASS/FAIL): manifest recompute PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): exclude `/intake[^/]*/` in bound().
