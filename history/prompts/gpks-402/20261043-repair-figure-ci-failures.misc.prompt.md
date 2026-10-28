---
id: 20261043
title: Repair GPKS figure CI failures
stage: misc
date: 2026-10-28
surface: agent
model: GPT-6 Codex
feature: gpks-402
branch: crew/batch-20261028-1715
user: crew
command: Read .crew/brief.md
labels: ["codex", "crew", "ci-fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/367
files:
  - static/img/figures/gpks-402/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/gpks-402/unit-02/fig-U2-1.ur.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-2.dark.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-2.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-3.dark.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-3.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-4.dark.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-4.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-6.dark.svg
  - static/img/figures/gpks-402/unit-06/fig-U6-6.svg
tests:
  - "gh pr checks 367 and gh run view 40734141955 --log-failed"
  - "npm run check:content: initial 13 gates pass; repair run requires refreshed G2 evidence"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read the brief, existing commits, repository guidance and CI logs. Reflowed table and diagram labels without changing wording, enlarged the Urdu timeline panel, and regenerated dark variants. Refresh Unit 6 G2 evidence after committing the bound SVG inputs, then rerun all content gates.

## Outcome

- ✅ Impact: Repairs address the figure-geometry findings for five figures in the batch scope.
- 🧪 Tests: Baseline check:content passed all 13 gates. After SVG edits, the only finding is stale Unit 6 G2 evidence; refresh and final verification follow this input commit. Browser geometry verification is deferred to CI because the brief forbids Playwright.
- 📁 Files: Five SVG sources and their five dark variants; this PHR. A follow-up evidence commit refreshes Unit 6 G2 and its tracker reference.
- 🔁 Next prompts: Platform owner investigates unrelated e2e failures; CI measures the committed SVGs.
- 🧠 Reflection: CI build passed. Four failing e2e cases concern admin, student and teacher dashboards and reviewer jobs, outside the permitted content scope.

## Handoff (for CEO and agents)

- Shipped / changed: Wrapped labels and expanded containers in GPKS-402 Units 2 and 6; regenerated matching dark variants.
- Decisions the team must respect: Preserve figure wording, IDs, alt text and prompts. No build, dev server, or Playwright run locally. No G3/G5 certification or publication changes.
- Pending / next owner: Crew worker refreshes G2 evidence and reruns check:content in the follow-up commit. Platform owner owns dashboard and reviewer e2e timeouts; fresh CI owns geometry verification.
- Paperclip issues affected: PR #367; gpks-402-u06-author; gpks-402-u02-translate.

## Evaluation notes (flywheel)

- Failure modes observed: Text exceeded table columns and diagram panels. SVG changes invalidate deterministic G2 input hashes.
- Graders run and results (PASS/FAIL): Initial content gates PASS (13/13); intermediate pipeline gate FAIL only for stale Unit 6 evidence, to be refreshed next.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the changed-SVG geometry CI job after these commits are pushed by the owner.
