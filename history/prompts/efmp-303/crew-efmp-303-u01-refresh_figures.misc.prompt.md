---
id: crew-efmp-303-u01-refresh_figures
title: crew refresh_figures EFMP-303 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: efmp-303
branch: crew/efmp-303-u01-refresh_figures
user: crew
command: crew refresh_figures
labels: ["crew", "claude", "refresh_figures"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-303/unit-01/fig-U1-1.svg to fig-U1-8.svg (with .ur, .dark and .ur.dark variants)
 - specs/content/svg-style-baseline.json
 - specs/content/efmp-303/tasks.md
 - specs/content/efmp-303/reviews/unit-01/G2/20261127T005405134Z-gates.json
tests:
 - measure-figure-text on the 16 light SVGs
 - check:svg-style
 - prepare-gate-evidence EFMP-303 1
 - check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief task text: "Redraw the placed SVG schematics of EFMP-303 Unit 1 to the improved standard (Feature 032
phase D, D-2026-0097/0098; owner, 2026-11-23: \"we can rewrite existing figures and diagrams to improved
versions\"). [...] a visual redraw, never a content change [...] Rebuild each Urdu twin from the new English
drawing with the Urdu labels of the old .ur.svg [...]" (full text in the job's .crew/brief.md).

## Response snapshot

Redrew fig-U1-1 to fig-U1-8 in English and Urdu with layer groups and named nodes. An uncommitted earlier
attempt on the branch had changed labels, arrows and positions, so it was replaced: the new drawings take
every label from the committed files. Fast-forwarded the branch to origin/main before building.

## Outcome

- ✅ Impact: eight schematics of EFMP-303 Unit 1 meet the current SVG standard in both languages.
- 🧪 Tests: measure-figure-text, check:svg-style and check:content pass; renders read by the agent.
- 📁 Files: 32 SVGs, the svg-style baseline, G2 evidence and the tracker.
- 🔁 Next prompts: fresh G3 run for Unit 1.
- 🧠 Reflection: compare a leftover redraw with the committed labels before building on it.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U1-1 to fig-U1-8 redrawn (committed on the crew branch, not pushed, no PR).
- Decisions the team must respect: no label wording changed. fig-U1-4's two main connectors are now
  double-headed, as its alt text and manifest prompt already state; fig-U1-3's overlapping line pairs are
  single double-headed lines. fig-U1-5 and fig-U1-7 moved from a 900 to a 780 canvas at the same aspect
  ratio, so the MDX width and height were left alone.
- Pending / next owner: fresh G3 run; G5 reviewer should check the Urdu drawings. None of the eight was a
  complex picture needing a raster.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: leftover attempt reworded labels; Urdu punctuation and leading numerals misordered
  in SVG text without right-to-left marks.
- Graders run and results (PASS/FAIL): check:content PASS (14 gates); measure-figure-text PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): mention right-to-left marks in bilingual-figures.md.
