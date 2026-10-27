---
id: 0889
title: Queue Urdu figure redraws
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/lead-g3-rereview
user: M Yousif Channa
command: (board-direct) crew.mjs add ... fix --task
labels: ["board-direct", "crew", "figures", "urdu"]
links:
  spec: null
  ticket: null
  adr: null
  pr: "#342"
files:
 - ~/.crew/mega-book/board.json (two queued jobs; not in the repo)
tests:
 - none (queueing only)
---

## Prompt

yes to redraw,

## Response snapshot

I queued two crew `fix` jobs with `node scripts/crew/crew.mjs add`:
- `efmp-303-u06-fix-r1`: redraw `fig-U6-2.ur.svg`. Its labels sit outside empty boxes and are clipped at the right edge. The cause is likely the `scale(-1 1)` text mirroring, so the redraw should use RTL coordinates directly.
- `efmp-301-u04-fix-r1`: redraw `fig-U4-3.ur.svg`. Arrows and a black wedge cross the panel text, and labels overlap.

Each task requires the same checks:
- measure with CI fonts (`FONTCONFIG_FILE` without `~/.local/share/fonts`) and with host fonts
- render to PNG and inspect it visually
- regenerate the dark variants
- pass `check:content`
- build on main after #342

## Outcome

- ✅ Impact: both broken Urdu figures are on the crew board.
- 🧪 Tests: none run; the workers run them.
- 📁 Files: crew state only.
- 🔁 Next prompts: review the batch PR that carries the redraws.
- 🧠 Reflection: the geometry measurer passed both figures. A rendered visual check is the only gate that saw these defects.

## Handoff (for CEO and agents)

- Shipped / changed: two queued crew jobs.
- Decisions the team must respect: an Urdu figure fix is accepted only after a CI-font measurement and a rendered visual check.
- Pending / next owner:
  - crew lead: run the jobs.
  - If a job starts before #342 merges, expect a merge-fix follow-up.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the measurer is blind to text placed outside its box when the box is empty.
- Graders run and results (PASS/FAIL): none.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have the figure gate flag a painted panel that contains no text.
