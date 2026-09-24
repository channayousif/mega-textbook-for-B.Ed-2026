---
id: "0004"
title: "G1 content-spec and intake cycle"
stage: misc
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: author-unit (G1 stage) + prepare-intake-evidence
labels: ["gqur-300", "content-spec", "g1", "intake", "evaluator", "d-2026-0040", "g-2026-28"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-300/content-spec.md
  - specs/content/gqur-300/intake/manifest.json
  - specs/content/gqur-300/intake/evaluation.md
  - specs/decisions/log.md
  - specs/gaps.md
tests:
  - Evaluator D-2026-0040: 7/8 criteria pass, readings escalated (G-2026-28)
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Phase 2: author specs/content/gqur-300/content-spec.md (status: draft) with course-wide
items verbatim from the guide, 6 per-unit blocks (Sub-topic checklist, Topic list, Depth
budget, Common misconceptions, Figure plan, 10/10/5 blueprint), apply D-2026-0001 and
D-2026-0012, commit, run prepare-intake-evidence, spawn the evaluator agent FRESH with the
D-code block D-2026-0040..0049, apply findings (max 2 repair cycles), only after approval
set status: approved.

## Response snapshot

Authored the content-spec: 6 units (guide's explicit headings), 30 sub-topics (24 guide
bullets, 5 compound bullets split using the guide's own words), 18 topics (3 per unit),
36 planned figures (2 per topic; >= 1 concept-map/flowchart/timeline per unit), 5 CLOs
verbatim, derived week schedule 3/3/3/2/3/2 across 16 weeks labelled per D-2026-0012.
Committed at ffd1f6f and prepared the 54-input intake bundle.

Fresh evaluator (first pass) recorded D-2026-0040: identity, partition, coverage,
outcomes, blueprint, structure, decision-residue all PASS; readings escalated as G-2026-28
because steen2001's ERIC locator was false (ED459269 is an unrelated West Virginia report;
the Steen book is not in ERIC), graawe is unresolvable in every registry (Open Library,
Internet Archive, ERIC; Cognella 403), and ncm2006 carried unverified imprint additions.
Two line-reference repairs were also listed.

Applied repair cycle 1 at 139876c: steen2001 locator corrected to the verified Internet
Archive record (archive.org/details/mathematicsdemoc0000unse, Open Library OL18229070W,
ISBN 0970954700); graawe and ncm recorded guide-required at bibliographic level only in
the D-2026-0010 manner with limits stated at point of use (ncm's unverified year/grades/
imprint removed); curated-supplementary widened with five verified ERIC articles
(grawe2012 EJ981327, sikko2023 EJ1450768, gula2025 EJ1489427, mcclure2020 EJ1480153,
tout2020 EJ1266633) plus verified OpenStax Prealgebra 2e; every unit now maps at least one
verified open-access source (D-2026-0013 floor); guide line refs corrected (546-680,
558-563); Unit 4 CLO-4 trace tightened. Re-prepared the bundle and spawned a fresh
evaluator for the re-evaluation.

## Outcome

- Impact: content-spec repaired after the first intake evaluation; re-evaluation in flight
- Tests: D-2026-0040 recorded (7/8 pass); G-2026-28 open pending the re-evaluation
- Files: content-spec.md, intake bundle, decisions log, gaps register
- Next prompts: re-evaluation verdict; then status: approved + tracker + Unit 1 authoring
- Reflection: the false ERIC number originated in my own drafting (I trusted a web-search
  summary that named ED459269 without fetching the record). The lesson: never cite a
  locator without fetching it; the evaluator's independent verification caught it. The
  D-2026-0010/0013 precedents gave a clean, owner-established path for the two
  unresolvable entries, so the repair did not need to invent a treatment.

## Evaluation notes (flywheel)

- Failure modes observed: citing an ERIC number from a search-result summary without
  fetching the record; adding bibliographic detail (year, grade range, imprint) that the
  guide does not give and no bound input verifies.
- Graders run and results: evaluator pass 1 = 7/8 PASS + 1 escalation; repair cycle 1
  applied; re-evaluation pending.
- Prompt variant (if applicable): null
- Next experiment: verify every locator by direct fetch before it enters a spec.
