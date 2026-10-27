---
id: 20261031
title: Sync batch CI geometry repairs
stage: general
date: 2026-10-28
surface: agent
model: gpt-6
feature: none
branch: crew/batch-20261027-0132
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "ci", "figure-geometry"]
links:
  spec: null
  ticket: null
  adr: null
  pr: "https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/342"
files:
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-1.ur.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.dark.svg
 - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.svg
 - static/content-status.json
 - history/prompts/general/20261031-sync-batch-ci-geometry-repairs.general.prompt.md
tests:
 - npm run check:content (before and after repair, 13 gates pass)
 - git diff --check (pass)
 - Eight repaired assets match successful CI head 6a9cf549 byte for byte
 - gh pr checks 342 (all pass)
 - gh run view 40433210608 --log-failed (12 geometry findings inspected)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Copied the eight already repaired Urdu SVG assets from origin/main into this older checkout and retained the existing content-status tracker hash refresh. PR #342 is already merged with green CI. No push or new PR.

## Outcome

- ✅ Impact: The branch now contains the exact geometry repairs that passed CI on PR #342.
- 🧪 Tests: All 13 content gates pass; repaired assets match the green CI head. No local browser measurement: the brief explicitly forbids Playwright and measure-figure-text imports playwright-core.
- 📁 Files: Eight SVG variants, the pre-existing generated status refresh, and this PHR.
- 🔁 Next prompts: None for this bounded CI fix.
- 🧠 Reflection: The brief was stale relative to the remote PR, but the local checkout still needed the known repairs.

## Handoff (for CEO and agents)

- Shipped / changed: Ported existing fixes for panel height, footnote spacing and greenhouse label overlap; included existing status hash refresh.
- Decisions the team must respect: Preserve IDs, labels, alt text and gate status. Geometry success does not certify pedagogical quality.
- Pending / next owner: Owner/crew: the earlier repair PHR on main records that EFMP-301 U4 fig-U4-3 and EFMP-303 U6 fig-U6-2 still need visual redraws despite passing geometry. Local browser runs remain prohibited by this brief.
- Paperclip issues affected: PR #342, already merged; no issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: CI fallback fonts exposed spills and overlaps missed under the host Urdu font. The local branch predates the merged repair.
- Graders run and results (PASS/FAIL): check:content PASS (13/13); diff whitespace PASS; CI repaired-byte identity PASS.
- Prompt variant (if applicable): not applicable
- Next experiment (smallest change to try): Keep future visual redraw work separate from this exact CI repair port.
