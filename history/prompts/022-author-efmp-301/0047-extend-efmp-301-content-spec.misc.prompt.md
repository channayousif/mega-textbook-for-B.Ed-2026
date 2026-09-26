---
id: "0047"
title: "Extend EFMP-301 content spec"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "orchestrator task assignment (Phase 2)"
labels: [content-spec, efmp-301, intake, g0, g1, d-2026-0012]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-book-for-B.Ed-2026/pull/66
files:
  - specs/content/efmp-301/content-spec.md
  - specs/content/efmp-301/intake/manifest.json
tests:
  - "npm run check:content (10/11 pass; pipeline-gate red on status: draft, expected pending intake)"
  - "node scripts/prepare-intake-evidence.mjs EFMP-301 specs/content/efmp-301/intake (58 inputs at a104623a)"
---

## Prompt

Orchestrator assignment (Phase 2): extend specs/content/efmp-301/content-spec.md to the
guide-determined full course, keeping Unit 1's approved G1 blocks byte-identical where
possible, then re-run G0/G1 intake with the evaluator under the D-2026-0043..0052 block.

## Response snapshot

Extended the content-spec from Unit-1-only to the full 6-unit course. Course-wide items
added from the guide (6 CLOs verbatim, 5 teaching strategies, 5 practical-work items,
60/40 default with the guide's silence stated, reading list). Both guide books verified
retrievable and open access on 2026-09-24 (Seifert & Sutton 2009 2nd ed. self-hosted;
Seifert's Connexions col11302 revised edition via Open Textbooks for Hong Kong), so no
open_access_floor is declared and the D-2026-0013 print-monograph situation does not
arise. Week schedule transcribes the guide's 16-week/12-chapter table; the units 2+
partition (U2=Ch2 W3-4, U3=Ch3 W5-7, U4=Ch4+5 W8-10, U5=Ch6+7+8 W11-13, U6=Ch9-12 W14-16)
is labelled derived per D-2026-0012. Five new unit blocks carry sub-topic checklists
(60 new IDs), topic lists, depth budgets, misconceptions, Pakistan-grounded
worked-example plans, figure plans (46 figures, >= 2 per topic, >= 1 schematic per unit)
and 10/10/5 blueprints. Unit 1's blocks stay at document level with no "## Unit 1"
heading: analysis of every gate consumer (check-unit-depth, check-concept-graph,
check-bloom-bands, review-evidence sliceSpec) showed that adding the heading would bring
Unit 1 into depth-gate scope and fail it on the frozen coverage/sources files
(comma-joined source cells, 3-column Reinforcement rows, missing bound excerpts), while
the document-level shape keeps every gate green exactly as on main. Intake evidence
prepared (58 inputs) and handed to a fresh evaluator agent with the pre-allocated
D-2026-0043..0052 block.

## Outcome

- ✅ Impact: content-spec extended to the full course; G0/G1 re-intake in flight.
- 🧪 Tests: check:content 10/11 (pipeline-gate red only on status: draft, the expected
  pre-approval state); depth/concept-graph/bloom/no-em-dash gates individually green.
- 📁 Files: specs/content/efmp-301/content-spec.md, specs/content/efmp-301/intake/manifest.json.
- 🔁 Next prompts: evaluator decision; then either repairs + approval + tracker
  extension + Unit 2 authoring, or a BLOCKED turn for owner rulings.
- 🧠 Reflection: before restructuring a governance document shared with a frozen golden
  unit, trace every gate's parser first - the "obvious" fix (adding a ## Unit 1 heading)
  would have broken the build on files the mandate forbids editing.

## Evaluation notes (flywheel)

- Failure modes observed: none; the derived partition is explicitly labelled and routed
  to the evaluator rather than silently decided.
- Graders run and results (PASS/FAIL): check:content 10/11 PASS at the extension commit
  (a104623); the single FAIL is the designed pre-approval state.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
