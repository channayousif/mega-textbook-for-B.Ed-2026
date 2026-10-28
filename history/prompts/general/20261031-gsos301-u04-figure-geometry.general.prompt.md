---
id: 20261031
title: Repair gsos-301 unit 4 figure text geometry
stage: green
date: 2026-10-27
surface: cli
model: longcat/LongCat-2.0
feature: 009-figure-rendering
branch: crew/gsos-301-u04-fix
user: crew
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: [opencode]
links:
  spec: specs/009-figure-rendering
  ticket: null
  adr: null
  pr: null
files:
  changed:
    - static/img/figures/gsos-301/unit-04/fig-U4-2.svg
    - static/img/figures/gsos-301/unit-04/fig-U4-2.dark.svg
    - static/img/figures/gsos-301/unit-04/fig-U4-3.svg
    - static/img/figures/gsos-301/unit-04/fig-U4-3.dark.svg
    - docs/semester-2/gsos-301/unit-04/topic-01.mdx
    - docs/semester-2/gsos-301/unit-04/topic-02.mdx
    - specs/content/gsos-301/tasks.md
    - static/content-status.json
tests:
  unit:
    - scripts/measure-figure-text.mjs (fig-U4-2, fig-U4-3 exit 0)
  gates:
    - npm run check:content (13/13 pass)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

The brief requested fixing 3 text-geometry problems in gsos-301 unit 4 SVGs (fig-U4-2.svg had 1 spill, fig-U4-3.svg had 1 overlap + 1 spill). Follow the svg-authoring guide "Fit and spacing" section, edit only light .svg and .ur.svg, measure until clean, regenerate dark variants, update Figure carrier heights, prepare gate evidence, and update tasks.md.

## Response snapshot

1. Ran `scripts/measure-figure-text.mjs` to identify exact defects:
   - fig-U4-2: "school on the same grade: may be" spills 223px (31-char label in 200px column)
   - fig-U4-3: "Equal rights..." overlaps "Change unpaid..." by 6.9px; "Change unpaid..." spills 303px (bottom row labels in 220px panels)

2. Fixed fig-U4-2: wrapped the overflowing label onto two lines ("school on the same" / "grade: may be"), grew row 3 panels from 100px to 120px, updated viewBox 440->460, repositioned Intragenerational panel and text, moved bottom grid line and wordmark.

3. Fixed fig-U4-3: wrapped all three bottom-row labels onto two lines each, grew panels from 56px to 70px, updated viewBox 560->574, shifted the "Both responses" summary box, connecting line, and wordmark down. Also wrapped the summary box text onto two lines.

4. Ran `npm run figures:variants` to regenerate 2 dark variants.

5. Added width={780} height={460} / width={860} height={574} to the Figure carriers in topic-01.mdx and topic-02.mdx.

6. Committed figure + carrier changes.

7. Ran `node scripts/prepare-gate-evidence.mjs GSOS-301 4` -> wrote new G2 evidence file.

8. Updated tasks.md: pointed Unit 4 G2 row at new gates file, appended "Stale since the figure-geometry repair; needs a fresh G3 run" to Unit 4 G3 row.

9. Ran `npm run build:content-status` then `npm run check:content` -> 13/13 gates pass.

## Outcome

- ✅ Impact: All 3 text-geometry defects resolved; measure-figure-text.mjs exits 0 for both files; all 13 content gates pass.
- 🧪 Tests: measure-figure-text.mjs (PASS), check:content (13/13 PASS).
- 📁 Files: 4 SVG files (2 light + 2 dark), 2 mdx carriers, tasks.md, content-status.json.
- 🔁 Next prompts: A fresh G3 en-review is needed for Unit 4 (the brief's translate/assessment blockers from earlier jobs remain).
- 🧠 Reflection: The figure text-geometry check uses actual Chromium getBBox measurements, so label widths must be planned conservatively. Wrapping to two lines and growing row height is the right fix per the svg-authoring guide. The content-status.json staleness is a prestart-hook artifact that needs an explicit rebuild before check:content.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U4-2 and fig-U4-3 geometry repaired; dark variants regenerated; Figure carriers updated with new viewBox dimensions; G2 gate evidence refreshed; G3 row marked stale.
- Decisions the team must respect: No wording changes were made to labels, only line breaks. Only the light .svg sources were edited by hand; dark variants were derived. No prose in the unit files was changed.
- Pending / next owner: Unit 4 G3 en-review needs a fresh run (the old codex review is now stale). The G4 translation remains blocked per earlier jobs' notes about English assessment/coverage defects.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: None. The measurement loop converged in one iteration per file after the wrap-and-grow fix.
- Graders run and results (PASS/FAIL): measure-figure-text.mjs PASS, check:content 13/13 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
