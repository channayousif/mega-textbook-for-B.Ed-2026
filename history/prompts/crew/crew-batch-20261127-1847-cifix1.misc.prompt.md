---
id: crew-batch-20261127-1847-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261127-1847
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew/crew-batch-20261127-1847-cifix1.misc.prompt.md
 - history/prompts/efpg-402/20261305-efpg402-u07-translate-g2-refresh.green.prompt.md
 - history/prompts/efpg-402/crew-efpg-402-u07-translate.green.prompt.md
 - history/prompts/efpg-402/crew-efpg-402-u07-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-07/unit-assessment.mdx
 - specs/content/efpg-402/reviews/unit-07/G2/20261127T175057783Z-gates.json
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-07/G2/logs-20261127T175057783Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - specs/content/efpg-402/translations/unit-07/handoff.md
 - static/img/figures/efpg-402/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-1.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-10.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-10.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-2.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-3.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-4.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-4.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-5.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-5.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-6.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-6.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-7.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-7.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-8.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-8.ur.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-9.ur.dark.svg
 - static/img/figures/efpg-402/unit-07/fig-U7-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261127-1847-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-1847`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #939 (checks: figure-geometry). Run `gh pr checks 939` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#939) changes, which belong to the crew jobs efpg-402-u07-translate. Change only what the merge or CI needs.

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
- (batch-20261127-1517-cifix1, fix, claude_crew) CI's figure-geometry job must re-run on PR #936 to confirm; the local `--ci-fonts --changed 956c4ba...` run is the same measurement and exits 0.
- (batch-20261127-1517-cifix1, fix, claude_crew) Keep these wrapped two-line forms; restoring the single-line labels reintroduces the DejaVu overlaps. `fig-U4-10.ur.svg` row 2 now has three lines in the right column where the other rows have two (the 68px row fits it).
- (batch-20261127-1517-cifix1, fix, claude_crew) Brace-free `$...$` spans remain in Unit 4 (`topic-02.mdx`, `unit-assessment.mdx`); they build fine but render literally, as before. EFPG-402 Unit 4 G3/G4/G5 stay open; this job certifies nothing.
- (batch-20261127-1300-cifix1, fix, claude_crew) CI's figure-geometry job must re-run on PR #931 to confirm; the local `--ci-fonts --changed c8efed9...` run is the same measurement and exits 0.
- (batch-20261127-1300-cifix1, fix, claude_crew) Keep the wrapped two-line forms; restoring the single-line headers or the long accuracy cell reintroduces the DejaVu overlaps.


## Response snapshot

Wrapped the three over-wide right-column Urdu labels in EFPG-402 Unit 7 figure fig-U7-10 (and its dark twin) onto two lines, clearing the CI figure-geometry overlaps, and committed the fix with its PHR.

## Outcome

- Impact: fix for CREW Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 42 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrapped the three over-wide right-column Urdu labels in EFPG-402 Unit 7 figure fig-U7-10 (and its dark twin) onto two lines, clearing the CI figure-geometry overlaps, and committed the fix with its PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI's figure-geometry job must re-run on PR #939 to confirm; the local `--ci-fonts --changed 4148f598...` run is the same measurement and exits 0.
  - Keep these wrapped two-line forms; restoring the single-line labels reintroduces the DejaVu overlaps. `fig-U7-10.ur.svg` row 1 now has 3 lines and row 4 has 4 lines in the right column where the other columns have 2.
  - EFPG-402 Unit 7 G3/G4/G5 stay open; this job certifies nothing and touched no reviewer registry, evidence or publication state.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
