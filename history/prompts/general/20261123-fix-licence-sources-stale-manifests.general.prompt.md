---
id: 20261123
title: Fix PR 444 CI by moving the licence source record
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/licence-hec-guides
user: M Yousif Channa
command: none
labels: [board-direct, licence, ci]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/444
files:
  - specs/content/licence-hec-sources.md
  - .gitignore
  - history/prompts/general/20261122-download-licence-hec-guides.general.prompt.md
  - history/prompts/general/20261123-fix-licence-sources-stale-manifests.general.prompt.md
tests:
  - npm run check:pipeline-gate
---

## Prompt

ci failed

## Response snapshot

`check:pipeline-gate` reported 103 units with a stale G2 input manifest. Cause: `manifestRoots` binds every tracked file under `Scheme-and-Course-guides/`, and the PR committed a README there. Moved the record to `specs/content/licence-hec-sources.md`, which no manifest binds, instead of refreshing 103 evidence records.

## Outcome

- ✅ Impact: The PR no longer changes any bound input, so existing G2 evidence stays valid.
- 🧪 Tests: See the PR for the `check:pipeline-gate` and CI results.
- 📁 Files: One record moved, one ignore comment and one PHR updated, this PHR added.
- 🔁 Next prompts: none
- 🧠 Reflection: The PR description said no site content changed, which was true, but the review manifests bind more than site content.

## Handoff (for CEO and agents)

- Shipped / changed: The licence source record now lives at `specs/content/licence-hec-sources.md`.
- Decisions the team must respect: Do not commit files under `Scheme-and-Course-guides/` casually; any tracked change there makes the G2 evidence of the whole corpus stale. Git-ignored files there are not bound.
- Pending / next owner: Owner merges PR 444.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: A docs-only commit inside a bound input tree re-opened 103 units.
- Graders run and results (PASS/FAIL): check:pipeline-gate, see PR
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
