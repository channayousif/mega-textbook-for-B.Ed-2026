---
id: 0090
title: Release TEX-7 practice corrections under hold
stage: general
date: 2026-10-04
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-7
user: M Yousif Channa
command: free-form request (board-direct PR triage)
labels: ["board-direct", "licence", "urdu", "content-fix", "licence-paid-layer-hold"]
links:
  spec: null
  ticket: TEX-7
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/88
files:
 - licence/pedagogy/{b,d,e}-*/practice.mdx (from commit d03ec5f7)
 - i18n/ur/docusaurus-plugin-content-docs-licence/current/pedagogy/{a,b,c,d,e}-*/practice.mdx (from commit d03ec5f7)
 - history/prompts/general/0090-release-tex7-practice-corrections-under-hold.general.prompt.md
tests:
 - npm run check:content (12/13 PASS; check:content-status needs the build artefact, produced in CI)
---

## Prompt

renumber 87, and option b for 88

(Option b: release PR #88 as a standalone content fix while the Licence paid-layer hold stays on
checkout, entitlements and launch.)

## Response snapshot

PR #88 (TEX-7, CurriculumOwner) carries G5 corrections to the 5 Licence pedagogy practice pages in
both locales: rubric rows rebalanced without changing totals (3.5 + 3.5 merged into one 7-mark
worked example; 4.5 + 1.5 re-weighted to 4 + 2), and Urdu wording fixes. These pages are already
on `main` and publicly readable on the free licence track, so the fix improves live content and
commits the team to nothing paid. The branch was brought up to date with `main` (merge
`3e59f959`), content gates run, and the PR taken out of draft for the board to merge.

## Outcome

- ✅ Impact: corrected Urdu and rubric weights on 5 live practice pages, independent of the paid launch.
- 🧪 Tests: check:content 12/13 PASS locally; full build and e2e in CI.
- 📁 Files: 8 practice.mdx files (agent commit) plus this PHR.
- 🔁 Next prompts: board merges #88; TEX-7 stays held for the go-live gate decision.
- 🧠 Reflection: content corrections and launch gating had been bundled in one held tree; separating them lets fixes ship.

## Handoff (for CEO and agents)

- Shipped / changed: PR #88 ready to merge as a content fix (Urdu + rubric corrections on the 5 Licence practice pages).
- Decisions the team must respect: merging #88 does **not** release the hold. TEX-7, TEX-8 and TEX-18 stay paused; no checkout, entitlement, gating or launch work until the board releases them.
- Pending / next owner: board merges #88. CurriculumOwner does not resume TEX-7 until the hold is released.
- Paperclip issues affected: TEX-7 (still held; its correction work is delivered via #88).

## Evaluation notes (flywheel)

- Failure modes observed: the agent PR carried no PHR; this record covers it.
- Graders run and results (PASS/FAIL): check:content 12/13 PASS (content-status needs build).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
