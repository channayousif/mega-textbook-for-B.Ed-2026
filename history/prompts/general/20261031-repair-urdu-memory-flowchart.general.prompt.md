---
id: 20261031
title: Repair Urdu memory flowchart
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/efmp-301-u04-fix-r1
user: a2ahs
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "efmp-301", "unit-04", "figures"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg
  - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.dark.svg
  - history/prompts/general/20261031-repair-urdu-memory-flowchart.general.prompt.md
tests:
  - "check:content: all 13 gates pass on branch and origin/main"
  - "measure-figure-text: both variants pass with host and restricted CI fonts"
  - "figures:variants:check: pass, 1006 figures"
  - "figure-palette.test.mjs: 46 tests pass"
  - "Playwright PNG inspection: all 12 Unit 4 Urdu SVGs in both font environments"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief read verbatim:

# Crew job efmp-301-u04-fix-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-fix-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Redraw the Urdu figure static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg (how information travels through memory). Rendered, the forward arrows run through the panel text, a large black wedge/path crosses the encoding and working-memory panels, labels overlap inside the encoding panel, and the two-line caption under the bin icon collides. Match the English fig-U4-3.svg layout, mirrored for RTL. Measure with CI fonts, not the host Nastaliq: write a fontconfig file that includes only /usr/share/fonts and /etc/fonts/conf.d, then run FONTCONFIG_FILE=<that file> node scripts/measure-figure-text.mjs <svg>. It must pass both with and without that variable. Then render each Urdu SVG to PNG with Playwright and look at it: every label inside its own box, no arrow crossing text, nothing outside the canvas. Regenerate dark variants (npm run figures:variants), keep figure IDs, alt text and the manifest row, run npm run check:content. Build on main after PR #342 merges (it touches these files).

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

## Notes from earlier jobs on this unit
- (efmp-301-u04-fix, fix, codex) G3 is marked stale and needs a fresh independent review.
- (efmp-301-u04-fix, fix, codex) G3 is marked stale and needs a fresh independent review.


## Response snapshot

Repaired the mirrored memory flowchart, regenerated its dark variant, and validated geometry and rendered output in both font environments. All content gates pass on branch and main. No push or PR.

## Outcome

- ✅ Impact: Forward arrows remain in panel gaps; malformed wedge is removed; encoding labels and bin captions have safe spacing.
- 🧪 Tests: All 13 content gates pass; both geometry font environments pass; variants fresh; 46 palette tests pass.
- 📁 Files: Two Unit 4 SVGs and this PHR.
- 🔁 Next prompts: Independent G3/G5 review remains with the review owner. Other existing Urdu figure geometry issues can be assigned separately.
- 🧠 Reflection: Text measurement alone does not reveal malformed paths or all optical collisions; inspect PNGs as well.

## Handoff (for CEO and agents)

- Shipped / changed: Continued the uncommitted repair; expanded the canvas and panels, raised instructional type sizes, corrected RTL paths and icons, separated labels, and regenerated dark SVG.
- Decisions the team must respect: Figure IDs, manifest row, MDX alt text and standalone accessible title/description preserved. No review or publication status changed. PR #342 is already an ancestor of this checkout. The specific PNG-render requirement was treated as an exception to the general Playwright prohibition; no site build or server was run.
- Pending / next owner: Review owner: fresh independent G3/G5. Existing fig-U4-4 labels cross table columns with CI fallback fonts; other unchanged Unit 4 SVGs have optical issues. Existing unrelated static/content-status.json timestamp/commit changes were left unstaged. Scratch fontconfig, PNGs and logs remain under ignored .crew/.
- Paperclip issues affected: efmp-301-u04-fix-r1; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Original SVG contained incorrect absolute coordinates in arrowheads, forward connectors and storage icon; font-dependent line heights crowded captions. Earlier uncommitted repair had already corrected several paths.
- Graders run and results (PASS/FAIL): PASS: branch and origin/main content gates; both font geometry checks; dark freshness; palette tests. Visual inspection confirms repaired fig-U4-3 in both themes and fonts. Other existing figure issues are recorded above.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Review unchanged Urdu tables independently with the restricted CI font configuration.
