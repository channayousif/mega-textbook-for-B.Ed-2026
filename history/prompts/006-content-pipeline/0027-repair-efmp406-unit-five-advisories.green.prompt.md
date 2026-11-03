---
id: 0027
title: Repair EFMP406 Unit Five Advisories
stage: green
date: 2026-11-03
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-406-u05-repair_en
user: crew
command: Carry out .crew/brief.md
labels: ["codex", "crew", "repair_en", "efmp-406"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - docs/semester-3/efmp-406/unit-05/index.mdx
  - docs/semester-3/efmp-406/unit-05/topic-02.mdx
  - docs/semester-3/efmp-406/unit-05/topic-01.mdx
  - docs/semester-3/efmp-406/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/unit-assessment.mdx
  - specs/content/efmp-406/tasks.md
  - specs/content/efmp-406/reviews/unit-05/G3/repair-handoff.md
  - history/prompts/006-content-pipeline/0027-repair-efmp406-unit-five-advisories.green.prompt.md
tests:
  - "npm run check:content: baseline all 14 passed; final rerun pending G2 refresh"
  - "scripts/heavy.sh npm test: 31 files, 368 tests passed"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the five report advisories as bounded bilingual clarifications and an explicit handoff of owner/tooling limits. G3 stays open. Refreshing stale Unit 5 G2 evidence before final checks and local commit.

## Outcome

- ✅ Impact: Fictional examples and source limits are explicit in English and Urdu.
- 🧪 Tests: All 368 unit tests passed; final 14-gate rerun follows deterministic evidence refresh.
- 📁 Files: Four EN/UR page pairs, Unit 5 tracker and repair handoff, PHR; fresh Unit 5 G2 logs/evidence to follow.
- 🔁 Next prompts: Fresh independent review, permitted browser/print checks and owner catalog ruling.
- 🧠 Reflection: Existing source notes had the limits, but reader-facing summaries needed the same precision.

## Handoff (for CEO and agents)

- Shipped / changed: Labeled fictional examples; limited Minott to its abstract; qualified Indonesian higher education findings and correlation; recorded tooling and catalog boundaries.
- Decisions the team must respect: G3/G5 remain open; do not change catalog or approved content-spec, self-sign, or infer browser acceptance from static checks.
- Pending / next owner: Independent reviewers own fresh English/Urdu review; owner owns catalog ruling and permitted rendering session.
- Paperclip issues affected: No issue ID supplied; crew job efmp-406-u05-repair_en.

## Evaluation notes (flywheel)

- Failure modes observed: Editing unit prose invalidated its existing G2 manifest and ignored derived content-status report.
- Graders run and results (PASS/FAIL): Unit tests PASS (368); origin/main baseline PASS (14 gates); final rerun pending.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Refresh only Unit 5 deterministic evidence and rerun the complete content tier.
