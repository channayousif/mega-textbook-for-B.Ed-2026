---
id: 543
title: gsos-301-u02-fix-figure-geometry
stage: general
date: 2026-10-27T05:52:00Z
surface: opencode
model: LongCat-2.0
feature: null
branch: crew/gsos-301-u02-fix
user: crew-lead
command: ".crew/brief.md: fix figure text-geometry problems for GSOS-301 Unit 2"
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gsos-301/unit-02/fig-U2-1.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-2.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-3.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-4.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-4.dark.svg
  - docs/semester-2/gsos-301/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-02/G2/20261027T055052042Z-gates.json
tests:
  - measure-figure-text.mjs: PASS (all 8 unit-02 SVGs, 0 problems)
  - check:content: PASS (12/13; content-status pre-existing failure on main)
---

## Prompt

Read .crew/brief.md and carry it out completely. It is your whole task.

Brief: Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for GSOS-301 Unit 2 (10 in total). The brief specified: fix wordmark overflow in 6 SVGs (fig-U2-1, U2-1.ur, U2-2, U2-2.ur, U2-3, U2-3.ur), and fix 4 overlaps in fig-U2-4.svg. Then run measure until exit 0, run figures:variants, commit, prepare-gate-evidence, update tasks.md, and commit.

## Response snapshot

Identified two defect classes:

1. **Wordmark overflow (6 files)**: CSS rule `text { text-anchor: middle; }` overrode the `text-anchor="end"` attribute on the wordmark, causing "textbook.com.pk" to center at x=768 instead of ending there (34.6px overflow). Fixed by adding `text-anchor: end` to the `.wm` class in each SVG.

2. **Table text overlap (fig-U2-4.svg)**: Mead's-stages table had labels spanning 3 lines that crossed column boundaries (key activity into example column, age range into key activity). Re-wrapped all table labels to fit within column widths, grew row heights to accommodate 4-line rows, and expanded the viewBox from 780x470 to 780x490. Updated EN and UR `<Figure>` carrier heights from 470 to 490.

Ran `npm run figures:variants` to regenerate 7 dark variants. Committed figure changes, then ran `prepare-gate-evidence.mjs GSOS-301 2`, pointed the G2 tracker row at the new gates file, marked G3 en-review stale, and committed.

## Outcome

- ✅ Impact: All 8 unit-02 SVGs pass measure-figure-text.mjs with 0 problems. No prose changes. No new content-gate failures vs. main.
- 🧪 Tests: measure exits 0 for all 8 SVGs. check:content: 12/13 pass; the 1 failure (check:content-status) pre-exists on main.
- 📁 Files: 16 files in first commit (14 svg + 2 mdx), 10 files in second commit (tasks.md + evidence JSON + 8 log files).
- 🔁 Next prompts: None.
- 🧠 Reflection: The wordmark bug (CSS specificity overriding an attribute) was the same pattern in 6 files — a shared boilerplate defect. Caught by PR #339's new overlap/spill checks.

## Handoff (for CEO and agents)

- Shipped / changed: All GSOS-301 unit-02 light SVGs (and their derived dark variants) now pass measure-figure-text.mjs. fig-U2-4 viewBox is now 780x490; EN/UR carrier heights updated. G2 evidence refreshed; G3 row marked stale.
- Decisions the team must respect: G3 en-review for Unit 2 needs a fresh run — it was marked stale because the figure geometry repair invalidated the prior review input. Do not certify from the old G3 evidence.
- Pending / next owner: G3 fresh run for Unit 2 (owner: G3 reviewer). G5 Urdu review remains pending (translation stays draft per earlier jobs).
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: CSS `text-anchor: middle` on the generic `text` selector silently overrides `text-anchor` attributes on child elements — `.wm` needs its own `text-anchor: end` declaration.
- Graders run and results (PASS/FAIL): measure-figure-text.mjs PASS; check:content 12/13 (content-status pre-existing FAIL on main).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Consider adding `text-anchor: end` to the shared boilerplate's `.wm` class to prevent recurrence in future units.
