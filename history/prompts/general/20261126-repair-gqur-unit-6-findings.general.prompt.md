---
id: 20261126
title: Repair GQUR Unit 6 findings
stage: general
date: 2026-11-05
surface: agent
model: Codex (exact build unavailable)
feature: none
branch: crew/gqur-301-u06-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, gqur-301, unit-06]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-06/topic-02.mdx
  - docs/semester-2/gqur-301/unit-06/topic-03.mdx
  - docs/semester-2/gqur-301/unit-06/unit-assessment.mdx
  - specs/content/gqur-301/coverage/unit-06.md
  - specs/content/gqur-301/figures/unit-06.md
  - specs/content/gqur-301/sources/unit-06.md
  - specs/content/gqur-301/tasks.md
  - static/img/figures/gqur-301/unit-06/fig-U6-6.dark.svg
  - static/img/figures/gqur-301/unit-06/fig-U6-6.svg
  - specs/content/gqur-301/reviews/unit-06/author-repair/
tests:
  - npm run check:content (origin/main baseline, all 14 pass)
  - scripts/heavy.sh npm test (31 files, 368 tests pass)
  - npm run check:content (post-repair validation and fix loop)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied F3-F7 author repairs, sourced PBS census data, corrected figure teaching inferences, and appended an unticked advisory G3 tracker row. F1, F2 and F8 remain explicitly assigned to owner/review hosts. No push or PR.

## Outcome

- ✅ Impact: Corrected statistical precision, assessment alignment and unsupported teaching inferences.
- 🧪 Tests: 368 unit tests pass; content baseline passes; final content validation recorded in author-repair logs.
- 📁 Files: Three English MDX files, figure pair, Unit 6 governance records, tracker and author handoff.
- 🔁 Next prompts: Fresh independent G3 after authority/provenance resolution, authorised geometry and narrow/A4 inspection, then translation.
- 🧠 Reflection: Summary statistics prompt diagnosis; they cannot select a programme or establish universal claims.

## Handoff (for CEO and agents)

- Shipped / changed: F3-F7 repairs and source provenance, advisory tracker row; all work stays on assigned branch.
- Decisions the team must respect: G3/G5 stay open, no certification; crew browser prohibition overrides local geometry command requirement.
- Pending / next owner: Owner/evaluator: G1; review host: historical provenance, frozen handoff, figure geometry, narrow and A4 inspection; translator: absent Urdu mirror after prerequisites.
- Paperclip issues affected: gqur-301-u06-repair_en; no ticket identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Stale G2 evidence expected after content edits; browser-based validation unavailable under explicit brief.
- Graders run and results (PASS/FAIL): Baseline content PASS; unit tests PASS; final content result recorded in author-repair evidence.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of committed repaired inputs.
