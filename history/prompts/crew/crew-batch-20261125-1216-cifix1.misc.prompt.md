---
id: crew-batch-20261125-1216-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261125-1216
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-409/unit-05/index.mdx
 - docs/semester-4/efmp-409/unit-05/topic-01.mdx
 - docs/semester-4/efmp-409/unit-05/topic-02.mdx
 - docs/semester-4/efmp-409/unit-05/topic-03.mdx
 - docs/semester-4/efmp-409/unit-05/unit-assessment.mdx
 - docs/semester-4/efmp-409/unit-05/unit-teacher-notes.mdx
 - history/prompts/crew/crew-batch-20261125-1216-cifix1.misc.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u04-translate.green.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u04-translate.misc.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u05-author-conflict1.misc.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u05-author-conflict2.misc.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u05-author-conflict3.misc.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u05-author.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/unit-teacher-notes.mdx
 - specs/content/efmp-409/concepts/unit-05.md
 - specs/content/efmp-409/coverage/unit-05.md
 - specs/content/efmp-409/figures/unit-05.banner.md
 - specs/content/efmp-409/figures/unit-05.md
 - specs/content/efmp-409/reviews/unit-04/G4/translation-handoff.md
 - specs/content/efmp-409/reviews/unit-05/G2/20261125T085534293Z-gates.json
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-concept-graph.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-depth-gate.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-docs-sync.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-figures.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/check-no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-05/G2/logs-20261125T085534293Z/validate-content.txt
 - specs/content/efmp-409/sources/texts/inverge-2025-punjab.md
 - specs/content/efmp-409/sources/texts/pie-1959-commission.md
 - specs/content/efmp-409/sources/texts/pie-1979-policy.md
 - specs/content/efmp-409/sources/texts/pie-1998-policy.md
 - specs/content/efmp-409/sources/texts/saiyid-nihcr.md
 - specs/content/efmp-409/sources/texts/wb-wdi-2026.md
 - specs/content/efmp-409/sources/unit-05.md
 - specs/content/efmp-409/tasks.md
 - static/img/figures/efmp-409/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-1.ur.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-2.ur.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-4.ur.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-5.ur.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-6.ur.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-1.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-2.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-3.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-3.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-5.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-6.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261125-1216-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261125-1216`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #792 (checks: figure-geometry). Run `gh pr checks 792` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#792) changes, which belong to the crew jobs efmp-409-u05-author, efmp-409-u04-translate. Change only what the merge or CI needs.

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
- (batch-20261124-2201-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on the PR, though the local `--ci-fonts --changed 8fa83e44...` run is the same measurement and exits 0.
- (batch-20261124-2201-cifix1, fix, claude_crew) This PR certifies nothing; G3 and the Unit 3 Urdu mirror remain open.
- (batch-20261124-1946-cifix1, fix, claude_crew) CI's build job still has to confirm the acorn error is gone (`npm run build` was not run locally, per the brief); the now-unreferenced old evidence set `20261124T184540786Z-gates.json` and its logs dir were left in place, matching the earlier Unit 4 precedent.
- (batch-20261124-1946-cifix1, fix, claude_crew) G3 and the Urdu mirror for Unit 3 remain open; this PR certifies nothing.
- (batch-20261124-1845-cifix1, fix, claude_crew) CI measures changed SVGs with a DejaVu Sans fallback and no Noto Nastaliq; local default-font runs can pass a file CI fails, so always re-check with `--ci-fonts`.


## Response snapshot

Re-broke the two over-wide Urdu headings in efmp-409 `fig-U4-4.ur.svg` onto two lines (and regenerated its derived dark variant) to clear the CI figure-geometry overlap, with all content gates passing.

## Outcome

- Impact: fix for CREW Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 65 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Re-broke the two over-wide Urdu headings in efmp-409 `fig-U4-4.ur.svg` onto two lines (and regenerated its derived dark variant) to clear the CI figure-geometry overlap, with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI's figure-geometry job still has to confirm on PR #792, though the local `--ci-fonts --changed origin/main` run is the same measurement and exits 0.
  - Urdu-only figure edits do not stale a unit's G2 evidence (it binds English SVGs only), so no gate-evidence refresh was needed; G3 and the unit-03 Urdu mirror remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
