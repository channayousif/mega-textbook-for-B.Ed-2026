---
id: crew-batch-20261127-0745-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261127-0745
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/032-textbook-visuals/20261298-efmp-301-u05-slide-deck.green.prompt.md
 - history/prompts/crew/crew-batch-20261127-0745-cifix1.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u05-slides.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u09-flashcards.misc.prompt.md
 - history/prompts/efmp-303/crew-efmp-303-u02-refresh_figures.misc.prompt.md
 - history/prompts/general/2487-efmp-301-u09-flashcards.general.prompt.md
 - specs/content/efmp-303/reviews/unit-02/G2/20261127T064035854Z-gates.json
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261127T064035854Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - specs/content/svg-style-baseline.json
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-301/unit-09.json
 - specs/studio/slides/efmp-301/unit-05.json
 - static/img/figures/efmp-303/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-1.ur.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-2.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-2.ur.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-3.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-3.ur.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-4.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-4.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-4.ur.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-5.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-5.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-5.ur.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-6.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-6.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-6.ur.svg
 - static/studio/flashcards/efmp-303/unit-01.json
 - static/studio/flashcards/efmp-303/unit-02.json
 - static/studio/flashcards/efmp-303/unit-03.json
 - static/studio/flashcards/efmp-303/unit-05.json
 - static/studio/flashcards/efmp-303/unit-06.json
 - static/studio/flashcards/efmp-304/unit-01.json
 - static/studio/flashcards/efmp-304/unit-02.json
 - static/studio/flashcards/efmp-304/unit-03.json
 - static/studio/flashcards/efmp-304/unit-04.json
 - static/studio/flashcards/efmp-304/unit-05.json
 - static/studio/flashcards/efmp-304/unit-06.json
 - static/studio/flashcards/efmp-305/unit-06.json
 - static/studio/flashcards/geng-300/unit-01.json
 - static/studio/flashcards/geng-301/unit-03.json
 - static/studio/flashcards/gicp-400/unit-03.json
 - static/studio/flashcards/gicp-400/unit-07.json
 - static/studio/flashcards/gpks-402/unit-01.json
 - static/studio/flashcards/gpks-402/unit-06.json
 - static/studio/flashcards/gqur-301/unit-11.json
 - static/studio/flashcards/gqur-301/unit-13.json
 - static/studio/flashcards/gqur-301/unit-15.json
 - static/studio/flashcards/gqur-301/unit-16.json
 - static/studio/flashcards/gsos-301/unit-01.json
 - static/studio/flashcards/gsos-301/unit-05.json
 - static/studio/flashcards/gsos-301/unit-06.json
 - static/studio/slides/efmp-301/unit-05.en.pptx
 - static/studio/slides/efmp-301/unit-05.ur.pptx
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261127-0745-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-0745`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #927 (checks: build). Run `gh pr checks 927` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#927) changes, which belong to the crew jobs efmp-303-u02-refresh_figures, efmp-301-u09-flashcards, efmp-301-u05-slides. Change only what the merge or CI needs.

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
- (batch-20261127-0301-cifix1, fix, claude_crew) CI's figure-geometry job still has to re-run and confirm on PR #921.
- (batch-20261127-0301-cifix1, fix, claude_crew) EFPC-411 Unit 1 G3/G4/G5 rows stay open; this PR certifies nothing.
- (batch-20261127-0301-cifix1, fix, claude_crew) Do not restore the longer Urdu label forms removed here (سپروائزر کی ہدایت میں, غیر کام والے جوڑے کو نام لے کر پرامن کیا, اور ریاضی کے مراحل کی وضاحت کرتی ہیں, متحرک کلاس پر غرق کرتا ہے): they overran the columns under the CI fallback face.
- (batch-20261125-1831-cifix1, fix, claude_crew) CI's figure-geometry job still has to re-run and confirm on PR #869; earlier batches on this PR family had the same local-passes/CI-pending pattern.
- (batch-20261125-1831-cifix1, fix, claude_crew) do not restore the longer `فطری طور پر پورا کرتی ہے` header line at x=448, it is the string that overran the column in DejaVu.


## Response snapshot

Reworded the EFMP-301 Unit 5 slide outline bullet that introduced the forbidden phrase "marking scheme" (the PR #927 built-output answer-key failure), restoring topic-02's own wording, and committed the fix with its PHR; `npm run check:content` passes.

## Outcome

- Impact: fix for CREW Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 71 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Reworded the EFMP-301 Unit 5 slide outline bullet that introduced the forbidden phrase "marking scheme" (the PR #927 built-output answer-key failure), restoring topic-02's own wording, and committed the fix with its PHR; `npm run check:content` passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI's build job must re-run and confirm on PR #927.
  - `static/studio/slides/efmp-301/unit-05.en.pptx` still holds the old phrase; the gate does not scan `.pptx`, so regenerate offline if the download should match the outline.
  - the source answer-key gate does not scan `specs/studio/` or generated `static/` decks, so this class of defect only fails in CI's built-output scan.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
