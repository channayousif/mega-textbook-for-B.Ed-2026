---
id: 0903
title: Semester 3 content specs and intake
stage: general
date: 2026-10-31
surface: agent
model: claude-opus-5-5
feature: none
branch: content/sem3-content-specs
user: M Yousif Channa
command: board-direct
labels: ["board-direct", "semester-3", "content-spec", "intake", "crew"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-406/content-spec.md
 - specs/content/efmp-407/content-spec.md
 - specs/content/efpg-401/content-spec.md
 - specs/content/gicp-400/content-spec.md
 - specs/content/giss-401/content-spec.md
 - specs/content/guhq-301/content-spec.md
 - specs/content/*/intake/manifest.json (six bundles)
 - specs/content/*/intake/evaluation.md and register-entries.md (written by the evaluators)
 - history/prompts/general/0903-semester-3-content-specs-and-intake.general.prompt.md
tests:
 - npm run check:depth-gate (pass after each spec)
 - npm run check:no-em-dash (pass)
 - npm run check:pipeline-gate (pass; catalog left untouched)
---

## Prompt

if crew has finished courses of 2 semesters, then move to the next course

(Follow-up answer to "Which course should I write the spec for first?": "All 6 specs now".)

## Response snapshot

The crew had no work left on Semesters 1-2 (546 jobs merged; the rest waits on human G3 sign-off). It cannot start Semester 3 itself: the planner only takes courses whose content-spec is `approved`, and crew workers may not edit the catalog or a content-spec. Semester 3 in the 2026 Scheme has seven courses; GARH-400 has no guide, so six specs were drafted from `3rd 2026.txt`: EFMP-406, EFMP-407, EFPG-401, GICP-400, GISS-401, GUHQ-301 (GETH-401, the non-Muslim alternative to GISS-401, is not drafted). Every reading was checked against Crossref, OpenAlex or Open Library; each unit binds at least one open-access source. Each spec ends with `## Drafting notes for intake` listing what the drafter could not settle.

Found while drafting: adding a course to `catalog/courses.json` makes the pipeline gate fail for 89 units, because every G2 manifest and all 211 G3 reports bind that file whole. The catalog was reverted; each spec carries a "Proposed catalog entry" instead. Six intake bundles were frozen at 815d59fd and six independent evaluator agents were launched, each writing only to its own `intake/` folder with pre-allocated IDs (D-2026-0075 to 0080; G-2026-155 to 214) so parallel runs could not collide in the shared registers.

## Outcome

- ✅ Impact: six draft Semester 3 content specs and intake bundles on branch `content/sem3-content-specs`; nothing merged, catalog unchanged
- 🧪 Tests: depth, em-dash and pipeline gates pass
- 📁 Files: six specs, six intake bundles, this PHR
- 🔁 Next prompts: owner ruling on the catalog binding; owner review of the six intake decisions; then the crew can start Semester 3
- 🧠 Reflection: the catalog is a corpus-wide G2/G3 input, so "add the next course" is not a content-only change today

## Handoff (for CEO and agents)

- Shipped / changed: draft content specs (status: draft) for EFMP-406, EFMP-407, EFPG-401, GICP-400, GISS-401, GUHQ-301, with frozen intake bundles; six intake evaluations recorded: all six partial (D-2026-0075 to D-2026-0080, pending-owner-review; 28 gaps G-2026-155 to 159, 165 to 169, 175 to 179, 185 to 189, 195 to 197, 205 to 209). EFPG-401 "marking scheme" wording replaced after its evaluation, so D-2026-0077's bundle is stale for that spec.
- Decisions the team must respect: do not add Semester 3 courses to `catalog/courses.json` until the owner rules on narrowing the catalog binding in `scripts/lib/review-evidence.mjs` (or accepts re-opening all G2/G3 evidence); no spec is `approved`, so the crew must not author Semester 3 units yet.
- Pending / next owner: owner confirms or rejects D-2026-0075 to D-2026-0080 and answers the gaps; GUHQ identity (401/301, credits, semester), EFMP-406 reading list, EFPG-401 many-topic units and GISS-401/GUHQ-301 scholar review need owner decisions; GETH-401 and GARH-400 still need specs (GARH-400 needs a guide).
- Paperclip issues affected: none (Paperclip retired).

## Intake results (2026-10-31)

All six intake evaluations came back partial. Shared across all six: the catalog entry does not exist (owner call), and `D-2026-0053` item 2 (readings, open-access floor) and item 1 (week grouping) are scoped to Semester 2 only, so the owner must extend them to Semester 3. Course-specific: EFMP-406 title (Literacy vs Literacies) and an off-topic reading list; EFMP-407 guide misprints, Topic 3.2 has no retrievable source, Brundtland framing; EFPG-401 formative counts for 4-7-topic units and derived Unit 4 rows; GICP-400 "duties of citizens" untaught, Qureshi title; GISS-401 week grouping; GUHQ-301 topics-as-weeks and Unit 2 formative count (identity already settled by G-2026-04).

Author repairs still to make (no ruling needed): EFMP-406 add the guide's second assessment block; EFPG-401 add Lois Arthur to Nolasco, correct the Celce-Murcia note (OL16476622W), keep "Carvan" as printed; GICP-400 add the Constitution to Unit 3's mapped readings and a source for the 25th Amendment; GISS-401 add a registry open-access source to Unit 1 and fix the Maududi ISBN edition; GUHQ-301 make Unit 2's summative Analyze-or-higher and cite G-2026-04. Each repair stales that course's intake bundle; re-run intake after the owner's rulings.

## Evaluation notes (flywheel)

- Failure modes observed: three guide readings carry wrong locators (EFMP-407: a DOI and an IUCN URL that resolve to other works; `sdgpakistan.pk` now hosts an unrelated commercial site); catalog edit stales corpus evidence.
- Graders run and results (PASS/FAIL): depth gate PASS; pipeline gate PASS (with catalog reverted).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): bind only a course's own catalog entry in G2/G3 manifests, as was done for `terminology.csv`.
