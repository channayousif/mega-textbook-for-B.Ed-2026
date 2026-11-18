---
id: 20261189-repair-gqur301-unit-eight-g3
title: Repair GQUR-301 Unit 8 from the latest G3 report
stage: general
date: 2026-11-10
surface: agent
model: crew
feature: gqur-301
branch: crew/gqur-301-u08-repair_en-r1
user: crew
command: opencode worker on .crew/brief.md
labels: ["crew", "opencode", "gqur-301", "unit-08", "g3-repair"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: history/adr/0019-agent-review-independence.md
  pr: null
files:
  - specs/content/gqur-301/tasks.md
  - history/prompts/general/20261189-repair-gqur301-unit-eight-g3.general.prompt.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of the latest G3 report (20261108T203238Z-g3-desk-8c860a6f.json) to GQUR-301 Unit 8. The report's findings are carried forward from the pre-repair state already fixed by commit a2c198f71 (2026-11-05): F1 no longer calls a no-repetition lock rule safer, F2 no longer attributes P(n, r) notation to the bibliographic-only Chaudhry and Kamal text, F3 qualifies the fig-U8-2 caption with "distinct" and F4 limits fig-U8-5 and its alt text to distinct items without unordered repetition with disjoint cases in the side note, all mirrored in Urdu. Verified each finding against the current EN and UR bytes; no further content edit was required. Appended the advisory Unit 8 G3 tracker row naming the report and left G3 unticked.

## Outcome

- ✅ Impact: Unit 8 G3 content findings verified resolved; advisory tracker row appended; G3 left open.
- 🧪 Tests: `npm run check:content` all 14 gates pass.
- 📁 Files: specs/content/gqur-301/tasks.md edited; PHR added.
- 🔁 Next prompts: fresh independent G3 review of Unit 8 (ADR-0019); render inspection (narrow viewport and A4 print) on a non-production host.
- 🧠 Reflection: A report can carry forward findings from a pre-repair state even when some input-manifest hashes match current bytes; verify each finding against the current text before editing.

## Handoff (for CEO and agents)

- Shipped / changed: verified the 2026-11-08 G3 findings are already resolved on origin/main by a2c198f71; appended the Unit 8 G3 tracker row naming the report.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this change certifies nothing. F5-F8 (author-run provenance, open G1, rendered inspection, bound source / answer-blind evidence) are not author-repairable and remain for the evaluator/review host.
- Pending / next owner: fresh independent G3 review of Unit 8; owner adjudication of the open G1 intake evidence; render inspection on a non-production host.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: stale review findings can persist in a new report even when some manifest hashes match current bytes; always diff each finding against the current text.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (14/14 gates).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
