---
id: 20261114
title: Repair GENG-300 Unit 4 G3 findings
stage: general
date: 2026-11-03
surface: agent
model: gpt-6
feature: content-pipeline
branch: crew/geng-300-u04-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew"]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - docs/semester-1/geng-300/unit-04/topic-01.mdx
  - docs/semester-1/geng-300/unit-04/topic-02.mdx
  - docs/semester-1/geng-300/unit-04/topic-03.mdx
  - static/img/figures/geng-300/unit-04/fig-U4-1.svg
  - static/img/figures/geng-300/unit-04/fig-U4-1.dark.svg
  - specs/content/geng-300/sources/unit-04.md
  - specs/content/geng-300/tasks.md
  - specs/content/geng-300/reviews/unit-04/repair-en-20261103.md
tests:
  - Content gates and origin/main comparison pending completion
  - npm test via scripts/heavy.sh pending completion
  - Scoped dark variant freshness PASS
  - Browser geometry and render review prohibited by crew brief
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Separated the table footer and wordmark in both themes; added explicit source-limit disclosures; appended the requested advisory repairs row with G3 open. Render and source verification remain pending. Refreshing deterministic G2 evidence after committing bound inputs.

## Outcome

- ✅ Impact: Bounded repair of the latest Unit 4 G3 findings without certification.
- 🧪 Tests: Validation results will be appended after the final check.
- 📁 Files: Unit 4 topics, figures, sources, repair handoff and tracker; mandatory PHR outside the content scope.
- 🔁 Next prompts: Independent reviewer or owner supplies rendered inspection and source verification.
- 🧠 Reflection: Do not call static geometry reasoning a browser check.

## Handoff (for CEO and agents)

- Shipped / changed: Footer separation and reader-visible source limitations.
- Decisions the team must respect: Preserve original review; G3 remains open; no push or PR.
- Pending / next owner: Independent review host: browser geometry, rendered pages and print evidence; owner/reviewer: original source texts.
- Paperclip issues affected: Crew job geng-300-u04-repair_en; no issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: SVG and prose edits invalidate the deterministic G2 input manifest; refresh evidence for committed bytes.
- Graders run and results (PASS/FAIL): Pending final content and unit-test results; dark variant check PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Run an authorised rendered inspection on the frozen repaired inputs.
