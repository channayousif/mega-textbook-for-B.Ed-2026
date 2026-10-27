---
id: 544
title: Fix figure text-geometry for GNAS-301 Unit 1
stage: fix
date: 2026-10-27T15:44:00Z
surface: gnas-301-u01
model: claude-opus-4-20250514
feature: gnas-301
branch: crew/gnas-301-u01-fix
user: a2ahs
command: Read .crew/brief.md and carry it out completely
labels: [crew, opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  changed:
    - static/img/figures/gnas-301/unit-01/fig-U1-2.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-2.dark.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-3.ur.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-3.ur.dark.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-6.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-6.dark.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-8.svg
    - static/img/figures/gnas-301/unit-01/fig-U1-8.dark.svg
    - docs/semester-1/gnas-301/unit-01/topic-03.mdx
    - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-03.mdx
    - specs/content/gnas-301/tasks.md
    - specs/content/gnas-301/reviews/unit-01/G2/20261027T154441214Z-gates.json
    - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/*.txt
    - static/content-status.json
tests:
  - scripts/measure-figure-text.mjs: PASS (16/16 SVGs)
  - npm run figures:variants: PASS (4 dark variants written)
  - npm run check:content: PASS (13/13 content gates)
  - npm run build:content-status: PASS
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Fixed 5 figure text-geometry findings reported by `scripts/measure-figure-text.mjs`:
1. fig-U1-2.svg: wrapped "One Sindh classroom example" to two lines in header, grew header panel from h=40 to h=44, shifted all data rows down 4px.
2. fig-U1-3.ur.svg: flipped caption "مسائل (رنگین تیر)" from text-anchor="end" to "start" to clear the RTL wordmark.
3. fig-U1-6.svg: moved columns left (col2: 196->160, col3: 316->280, col4: 556->520), wrapped four long issue labels to two lines each, grew affected row heights 52->60, grew viewBox height 470->490, updated caption and wordmark positions.
4. fig-U1-8.svg: shifted column 2 from x=180 to x=200 throughout to clear "In the community" sub-head.

Regenerated dark variants via `npm run figures:variants`. Updated Figure height carriers in both EN and UR topic-03.mdx for fig-U1-6 (470->490). Ran `node scripts/prepare-gate-evidence.mjs GNAS-301 1`, pointed both G2 en-draft rows at the new gates file, appended stale note to G3 row, rebuilt content-status.json. All content gates pass.

## Outcome

- ✅ Impact: All 5 figure text-geometry findings resolved; 16/16 SVGs pass measure-figure-text; all 13 content gates pass.
- 🧪 Tests: measure-figure-text (PASS), figures:variants (PASS), check:content (PASS), build:content-status (PASS).
- 📁 Files: 15 files changed across SVGs, dark variants, Figure carriers, tasks.md, G2 evidence, and content-status.json.
- 🔁 Next prompts: None. Unit 1 G3 review remains owner-gated (G-2026-24).
- 🧁 Reflection: The fig-U1-6 issue required a full column re-layout rather than a single wrap; measuring after each edit is essential since one fix can expose another.

## Handoff (for CEO and agents)

- Shipped / changed: Figure geometry for GNAS-301 Unit 1 is clean. G2 gate evidence refreshed. G3 row marked stale.
- Decisions the team must respect: fig-U1-6 viewBox height is now 490 (not 470). Do not revert this without updating both Figure carriers.
- Pending / next owner: G3 en-review for Unit 1 remains owner-gated under G-2026-24; needs a fresh review run when authorized. Course overview credit split and shared excerpt heading remain course-owner follow-ups.
- Paperclip issues affected: None.

## Evaluation notes (flywheel)

- Failure modes observed: fig-U1-6 required cascading row shifts when wrapping labels; initial column reposition exposed further overlaps that needed wrapping.
- Graders run and results (PASS/FAIL): measure-figure-text PASS, check:content PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
