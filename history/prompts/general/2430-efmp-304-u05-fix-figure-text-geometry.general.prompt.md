---
id: 2430
title: Repair EFMP-304 Unit 5 figure text-geometry (fig-U5-7)
stage: general
date: 2026-10-27T14:00:00Z
surface: docs
model: longcat/LongCat-2.0
feature: efmp-304
branch: crew/efmp-304-u05-fix
user: crew
command: .crew/brief.md
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-304/unit-05/fig-U5-7.svg
  - static/img/figures/efmp-304/unit-05/fig-U5-7.ur.svg
  - static/img/figures/efmp-304/unit-05/fig-U5-7.dark.svg
  - static/img/figures/efmp-304/unit-05/fig-U5-7.ur.dark.svg
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-05/G2/20261027T085730956Z-gates.json
  - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/*.txt
tests:
  - node scripts/measure-figure-text.mjs fig-U5-7.svg fig-U5-7.ur.svg → exit 0
  - npm run figures:variants → 2 dark variants written
  - npm run check:content → 13/13 gates pass
---

## Prompt

Read .crew/brief.md and carry it out completely. It is your whole task.

Brief: fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for EFMP-304 Unit 5 (9 findings in fig-U5-7.svg). Follow svg-authoring.md "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or viewBox height; never shrink text below 12px; do not change wording beyond line breaks; keep Urdu wording. Edit only light .svg and .ur.svg sources. Measure until exit 0, then npm run figures:variants. If viewBox height changes, update both <Figure> carriers. After committing, run prepare-gate-evidence, point G2 row at new gates file, append "Stale since the figure-geometry repair; needs a fresh G3 run" to G3 row.

## Response snapshot

Rewrote `fig-U5-7.svg` and `fig-U5-7.ur.svg` with reworked column widths and wrapped labels. Column layout changed from (90/100/130/120/100/180) to (90/140/130/100/120/140) — Stages and Misses widened to absorb the overflowing labels, Time cost and From narrowed to keep the 720px total. Row heights grew from 60px to 70px (Kolb, Gibbs, Schön) and 85px (Brookfield) to accommodate wrapped text. Wrapped labels: "Concrete to abstract" → 2 lines (Stages), "Autobiographical, students, colleagues, theory" → 4 lines (Stages), "Reflection-in/on-action" → 2 lines (Stages), "Power dynamics" → 2 lines (Misses), "Broader systemic" → 2 lines (Misses), "Structured planning" → 2 lines (Misses). Urdu wording preserved; only line breaks and column geometry changed. Urdu wordmark moved to bottom-left for RTL. Regenerated dark variants. Ran `prepare-gate-evidence.mjs EFMP-304 5`, updated tasks.md G2 row to `20261027T085730956Z-gates.json` and appended stale-G3 note.

## Outcome

- ✅ Impact: fig-U5-7 text-geometry repaired; 9 findings → 0. Dark variants regenerated. G2 re-certified.
- 🧪 Tests: `measure-figure-text.mjs` exits 0 for both EN and UR SVGs. `check:content` 13/13 pass.
- 📁 Files: 4 SVG sources + regenerated dark variants, tasks.md G2/G3 rows updated, new G2 gates.json and log files.
- 🔁 Next prompts: A fresh G3 review is needed for EFMP-304 Unit 5 (the G3 en-review row is now flagged stale).
- 🧠 Reflection: Column wrapping alone was insufficient for "Autobiographical, students, colleagues, theory" in a 100px column at any font size ≥12px — the whole word "Autobiographical" alone exceeds the usable width. Widening the Stages column to 140px was the minimal change that lets it fit at 13px. The Urdu twin passed the original measurement but needed column-width mirroring to stay visually aligned with the English twin.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U5-7.svg/.ur.svg light + dark (4 files), tasks.md G2/G3 rows, G2 gates evidence.
- Decisions the team must respect: Column widths for this table are now 90/140/130/100/120/140 (not the original 90/100/130/120/100/180). The Urdu wordmark is bottom-left (RTL-correct). The G3 en-review row is stale and needs a fresh independent review before the unit can advance.
- Pending / next owner: Owner should schedule a fresh G3 review for EFMP-304 Unit 5. No further figure work is owed on this unit's fig-U5-7.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: The previous worker exited without committing any change (per brief feedback). This attempt committed incrementally: figure fix first, then tasks.md + gate evidence.
- Graders run and results (PASS/FAIL): measure-figure-text.mjs PASS, check:content PASS (13/13).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
