---
id: 20261112
title: Fix Unit Three Figure Geometry
stage: misc
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: giss-401
branch: crew/batch-20261103-0200
user: crew
command: Read .crew/brief.md
labels: ["codex", "crew", "ci-fix", "figure-geometry"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/424
files:
  - specs/content/giss-401/tasks.md
  - static/img/figures/giss-401/unit-03/fig-U3-1.dark.svg
  - static/img/figures/giss-401/unit-03/fig-U3-1.svg
  - static/img/figures/giss-401/unit-03/fig-U3-3.dark.svg
  - static/img/figures/giss-401/unit-03/fig-U3-3.svg
  - static/img/figures/giss-401/unit-03/fig-U3-4.dark.svg
  - static/img/figures/giss-401/unit-03/fig-U3-4.svg
  - specs/content/giss-401/reviews/unit-03/G2/20261103T021930441Z-gates.json
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-bloom-bands.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-concept-graph.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-figures.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T021930441Z/validate-content.txt
  - history/prompts/giss-401/20261112-fix-unit-three-figure-geometry.misc.prompt.md
tests:
  - gh pr checks 424 and gh run view 41563444448 --log-failed
  - Local Pillow DejaVu font-metric simulation, 24 findings before and zero after
  - XML text comparison preserves all wording except whitespace
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs --refresh-stale
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped overflowing labels and citations in Unit 3 figures 1 and 3, and stage descriptions in figure 4. Regenerated three dark variants and refreshed Unit 3 G2 evidence through the supported script. No review certification or publication change.

## Outcome

- ✅ Impact: Repairs all 24 reported geometry findings without changing instructional wording, prompts, alt text, IDs or font sizes.
- 🧪 Tests: Initial content gates passed. After SVG edits the pipeline gate correctly rejected stale G2 evidence; supported refresh repaired it. Regenerated the ignored content-status report after refreshing evidence; final content gates pass (13/13). Browser geometry was not run because the crew brief explicitly prohibits Playwright.
- 📁 Files: Six SVG assets, one tracker evidence reference, generated Unit 3 G2 evidence and logs, and this PHR.
- 🔁 Next prompts: CI should rerun figure-geometry after the owner pushes the committed branch.
- 🧠 Reflection: DejaVu advance metrics reproduced all 24 CI findings with subpixel differences before repair and found zero afterward. This is a simulation, not a Chromium measurement.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 SVG text reflow and matching dark variants; fresh deterministic G2 evidence.
- Decisions the team must respect: Preserve original wording and figure contracts. G3/G5 remain open and unsigned. Do not push or open another PR.
- Pending / next owner: Owner or crew runner must push and let CI run actual Chromium figure geometry; this job is explicitly forbidden from running Playwright, builds or dev servers.
- Paperclip issues affected: PR #424; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Long unwrapped table labels overflowed cells. A wide centred stage description began inside the neighbouring centre panel and was attributed to that panel. SVG edits invalidated G2 input digests as designed.
- Graders run and results (PASS/FAIL): Font simulation PASS (24 before, zero after); text preservation PASS; supported G2 draft gates PASS; final content gates PASS (13/13).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the unchanged CI figure-geometry job on these committed assets.
