---
id: 557-repair-gqur301-unit-five-g3
title: Repair GQUR-301 Unit 5 from the latest G3 report
stage: misc
date: 2026-11-10
surface: agent
model: crew
feature: gqur-301
branch: crew/gqur-301-u05-repair_en-r1
user: crew
command: opencode worker on .crew/brief.md
labels: ["crew", "opencode", "gqur-301", "unit-05", "g3-repair"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: history/adr/0019-agent-review-independence.md
  pr: null
files:
  - docs/semester-2/gqur-301/unit-05/unit-assessment.mdx
  - docs/semester-2/gqur-301/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-01.mdx
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-05/G2/20261110T070719044Z-gates.json
tests:
  - npm run check:content
  - npm test
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of the latest G3 report (20261108T203238Z-g3-desk-13351a7b.json) to GQUR-301 Unit 5. The report's input manifest matches the current Unit 5 bytes (after translation_status normalisation), but its three content findings describe the pre-repair state already fixed by commit c358e8dc9 (2026-11-05). Strengthened them anyway: RRQ 6 now uses an unmistakably right-skewed counterexample (1, 2, 2, 2, 3, 100) and states that the median equals the mode, so the median is not greater than the mode; RRQ 7 states the modal wage is earned by 3 of 12 workers, is not what most workers earn and is not a majority figure; Topic 5.1 attributes the grouped-mode estimate to Lane (2023, Chapter 3), matching the bound Lane excerpt. All edits mirrored in Urdu. Refreshed the Unit 5 G2 gate evidence, which the content edits had made stale, and appended the advisory G3 tracker row. G3 left unticked.

## Outcome

- ✅ Impact: Unit 5 G3 content findings resolved and strengthened; G2 evidence refreshed; advisory tracker row appended; all content gates and unit tests pass.
- 🧪 Tests: `npm run check:content` all 14 gates pass; `npm test` 448 tests pass.
- 📁 Files: EN and UR unit-assessment.mdx and topic-01.mdx edited; tasks.md G2 row repointed and G3 row appended; new G2 gate evidence and logs added.
- 🔁 Next prompts: fresh independent G3 review of Unit 5 (ADR-0019); render inspection (narrow viewport and A4 print) on a non-production host.
- 🧠 Reflection: A report can carry forward findings from a pre-repair state even when its input manifest matches current bytes; verify each finding against the current text before editing.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 5 RRQ 6 counterexample, RRQ 7 majority language and Topic 5.1 Lane attribution repaired in EN and UR; G2 evidence refreshed (20261110T070719044Z-gates.json); advisory G3 row appended for report 13351a7b.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this change certifies nothing. The uncertain findings (author/run provenance, open G1, solve-before-key verification, rendered narrow/A4 inspection) are not author-repairable and remain for the evaluator/review host.
- Pending / next owner: fresh independent G3 review of Unit 5; owner adjudication of the open G1 intake evidence; render inspection on a non-production host.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: stale review findings can persist in a new report even when the manifest matches current bytes; always diff each finding against the current text.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS; `npm test` PASS (448 tests).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
