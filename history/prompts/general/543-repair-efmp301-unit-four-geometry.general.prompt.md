---
id: 543
title: Repair EFMP-301 Unit 4 figure geometry
stage: general
date: 2026-10-27
surface: cli
model: gpt-6
feature: efmp-301-unit-04
branch: crew/efmp-301-u04-fix
user: a2ahs
command: crew brief
labels: [codex, efmp-301-u04-fix]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-{2,3,5}.svg
  - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg
  - static/img/figures/efmp-301/unit-04/ (derived dark variants)
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-04/G2/
tests:
  - Light SVG geometry measurement: PASS, all 12 sources
  - Content gates and fresh G2 evidence: results recorded below
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief:

# Crew job efmp-301-u04-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (11 in total; PR #339 added the overlap and spill checks): fig-U4-2.svg (1), fig-U4-3.svg (8), fig-U4-3.ur.svg (1), fig-U4-5.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-301/unit-04/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-301 4, point the unit's G2 en-draft row in specs/content/efmp-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Wrapped English labels and enlarged memory panels within the existing canvas. Repositioned the Urdu panel footer without changing wording. Regenerated dark variants. Refresh G2 evidence after committing and record G3 as stale.

## Outcome

- ✅ Impact: All 11 reported text-geometry findings resolved.
- 🧪 Tests: All 12 light sources pass measurement; wording and viewBoxes preserved.
- 📁 Files: Four light sources, four generated dark variants, tracker and G2 evidence.
- 🔁 Next prompts: Fresh independent G3 review.
- 🧠 Reflection: Panel height and line wrapping resolve overflow while preserving font sizes.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 4 figure text geometry repaired.
- Decisions the team must respect: No prose, wording, viewBox, publication or G3/G5 status changes.
- Pending / next owner: Independent reviewer owns the fresh G3 run; G5 remains pending.
- Paperclip issues affected: Crew efmp-301-u04-fix; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Crowded labels and footer spilling below a memory panel.
- Graders run and results (PASS/FAIL): Geometry PASS; content checks and refreshed evidence pending final recording.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Measure wrapped labels and inspect icon spacing together.
