---
id: crew-batch-20261128-0931-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261128-0931
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: 961
files:
 - static/img/figures/efmp-303/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-04/fig-U4-4.ur.svg
 - history/prompts/crew/crew-batch-20261128-0931-cifix1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261128-0931-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261128-0931`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #961 (checks: figure-geometry). Run `gh pr checks 961` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#961) changes, which belong to the crew jobs efpg-402-u08-plan_illustrations, efpg-402-u05-review_en-r1, efmp-303-u04-refresh_figures, efmp-302-u05-flashcards. Change only what the merge or CI needs.

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
- (batch-20261128-0202-cifix1, fix, claude_crew) CI's build job must re-run and confirm on PR #954; the local full `npm test` is green (636/636).
- (batch-20261128-0202-cifix1, fix, claude_crew) The media ledger is the single record for mind maps and study guides, so keep the mirrored manifest rows; `check-studio-manifest` requires them for placed assets.
- (batch-20261127-2117-cifix1, fix, claude_crew) CI's figure-geometry job must re-run and confirm on PR #947; the local `--ci-fonts --changed 8a962478...` run is the same measurement and exits 0.
- (batch-20261127-2117-cifix1, fix, claude_crew) Keep the two-line form; restoring the single-line label reintroduces the 132px DejaVu spill. The `قسم` column is 130px wide, the narrowest in the Urdu table.
- (batch-20261127-1847-cifix1, fix, claude_crew) CI's figure-geometry job must re-run on PR #939 to confirm; the local `--ci-fonts --changed 4148f598...` run is the same measurement and exits 0.


## Response snapshot

Read the failed figure-geometry job for PR #961. It reported one text-geometry problem in two files: the Urdu edge label "رقم کی کمی کمزور کرتی ہے" on the Financial-to-failure arrow started 0.7px inside the failure panel under CI's DejaVu fallback (x1 454.3 against the panel edge 455), so the measurer took the panel as its holder and reported a 156.7px spill. Production Noto Nastaliq Urdu starts the same label at 480.6px and was never at fault. Moved the label from x=533 to x=545 in both the light and dark Urdu variants, which clears the panel under both faces (DejaVu x1 466.3, Nastaliq 492.6) with no new overlap.

## Outcome

- Impact: fix EFMP-303 Unit 4 figure geometry for PR #961 by claude_crew (attempt 1).
- Tests: `npm run check:content` passed (14/14 content gates); `node scripts/measure-figure-text.mjs --ci-fonts --changed f5cf2f28821092c6ef886cbfed5053ce008d25ad` exits 0, as does the same run without `--ci-fonts`.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: moved the Urdu "رقم کی کمی کمزور کرتی ہے" edge label in `fig-U4-4.ur.svg` and `fig-U4-4.ur.dark.svg` from x=533 to x=545 so its left edge clears the failure panel under CI's DejaVu fallback; no content, manifest or English figure change.
- Decisions the team must respect: the label is a free edge annotation, not panel text; the panel-spill report was a font-metric false positive. G3/G5 stay advisory; this PR certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). CI's figure-geometry job must re-run and confirm on PR #961.
- Notes for the next job on this unit:
  - CI's figure-geometry job must re-run on PR #961; the local `--ci-fonts --changed f5cf2f28821092c6ef886cbfed5053ce008d25ad` run is the same measurement and exits 0.
  - The label now ends at 623.7px under DejaVu, still well inside the 780px viewBox, but a future font or text change there could re-expose a tight margin.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: CI's DejaVu fallback renders Urdu wider than production Noto Nastaliq, so a free edge label that starts a fraction of a pixel inside a panel rect is mis-read as panel text and reported as a spill.
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text --ci-fonts --changed PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
