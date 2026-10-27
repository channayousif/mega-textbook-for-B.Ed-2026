---
id: 543
title: Repair EFMP-303 Unit 6 figure geometry
stage: green
date: 2026-10-27
surface: agent
model: gpt-6
feature: 009-figure-rendering
branch: crew/efmp-303-u06-fix
user: crew
command: crew brief
labels: ["codex", "efmp-303", "figure-geometry"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-06/
  - docs/semester-2/efmp-303/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-01.mdx
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-06/G2/
tests:
  - Figure geometry: 12 light SVGs pass
  - SVG optimisation: seven sources below 20 KB
  - Content gates and refreshed G2 evidence: recorded in follow-up commit
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief supplied by that prompt:

# Crew job efmp-303-u06-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (13 in total; PR #339 added the overlap and spill checks): fig-U6-1.ur.svg (1), fig-U6-2.svg (7), fig-U6-2.ur.svg (1), fig-U6-3.ur.svg (1), fig-U6-4.ur.svg (1), fig-U6-5.ur.svg (1), fig-U6-6.ur.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-303/unit-06/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-303 6, point the unit's G2 en-draft row in specs/content/efmp-303/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-303-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
- (efmp-303-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
- (efmp-303-u06-translate, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
- (efmp-303-u06-translate, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.


## Response snapshot

Repaired six Urdu wordmark anchors and widened and rewrapped the English SDG4 map. Expanded the SDG4 canvas and both locale carriers to height 540. Regenerated dark variants. Commit the repair before preparing fresh G2 evidence and recording the stale G3 handoff.

## Outcome

- ✅ Impact: All 13 reported geometry defects repaired without changing wording or prose.
- 🧪 Tests: Light geometry measurement exits 0; optimised sources are within budget. Final content and evidence checks recorded below when complete.
- 📁 Files: Seven light sources, seven generated dark variants, two carrier heights, tracker and G2 evidence.
- 🔁 Next prompts: Fresh independent G3; Urdu rendered inspection and G5 remain pending.
- 🧠 Reflection: Mirrored transforms require anchors that both place the wordmark correctly and keep local measured bounds within the canvas.

## Handoff (for CEO and agents)

- Shipped / changed: Geometry repair and regenerated variants; fresh deterministic G2 evidence follows the content commit.
- Decisions the team must respect: Preserve all wording, alt text, meaning and draft/review status. SDG4 Figure carriers use height 540 in both locales.
- Pending / next owner: Independent reviewer owns fresh G3; Urdu inspection and independent G5 remain pending.
- Paperclip issues affected: Crew job efmp-303-u06-fix; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Six wordmark overflows; seven SDG4 map label spills and collisions.
- Graders run and results (PASS/FAIL): PASS: light SVG measurement and source budgets. Content gates rerun after dark variant generation.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No new experiment required; obtain fresh independent review.
