---
id: 20261038
title: Fix Unit Two Figure Geometry
stage: green
date: 2026-10-28
surface: agent
model: GPT-6
feature: gpks-402
branch: crew/batch-20261028-1200
user: owner
command: crew brief batch-20261028-1200-cifix1
labels: ["codex", "crew", "ci-fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/364
files:
  - static/img/figures/gpks-402/unit-02/fig-U2-1.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-1.dark.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-4.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-4.dark.svg
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-02/G2/20261028T121740498Z-gates.json
  - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/
  - history/prompts/gpks-402/20261038-fix-unit-two-figure-geometry.green.prompt.md
tests:
  - node scripts/prepare-gate-evidence.mjs GPKS-402 2
  - npm run build:content-status
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gpks-402/unit-02/*.svg
  - npm run figures:variants:check
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR #364 checks and failed run 40684396893. Widened the timeline panel by 15px and table canvas by 40px, moving the significance column 35px right in both themes. Preserved all instructional wording. All eight SVG variants pass geometry measurement; content and variant gates pass. Committed locally without pushing.

## Outcome

- ✅ Impact: Resolved the figure-geometry CI failures with four asset edits and refreshed stale G2 evidence.
- 🧪 Tests: All 13 content gates pass; eight SVG measurements pass; 1018 source variants are current; diff whitespace check passes.
- 📁 Files: Four SVG assets, refreshed G2 evidence and logs, tracker reference, plus this PHR.
- 🔁 Next prompts: None required for this fix.
- 🧠 Reflection: Measured labels need sufficient panel width and column spacing rather than estimated character widths.

## Handoff (for CEO and agents)

- Shipped / changed: Timeline panel and table spacing repaired in light and dark SVGs; regenerated deterministic G2 evidence and updated its tracker reference.
- Decisions the team must respect: Preserve existing prose, review statuses and publication state. No certification performed.
- Pending / next owner: Crew owner owns pushing and rerunning remote CI.
- Paperclip issues affected: PR #364; no separate issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Scientific Society label spilled 3.4px outside its panel; seven pairs of table labels overlapped in each theme. The post-edit content run detected stale G2 inputs, resolved by preparing fresh gate evidence on committed assets. The generated, ignored content-status report then required regeneration, with no publication state change.
- Graders run and results (PASS/FAIL): PASS: content gates, figure geometry, dark variant freshness, git diff --check.
- Prompt variant (if applicable): Not applicable.
- Next experiment (smallest change to try): Run the existing CI figure-geometry job on this commit.
