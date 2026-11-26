---
id: crew-efpc-411-u01-author-cifix1
title: crew fix EFPC-411 unit 1
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u01-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - catalog/course-guides.json
 - docs/semester-4/efpc-411/_category_.json
 - docs/semester-4/efpc-411/course-overview.mdx
 - docs/semester-4/efpc-411/unit-01/index.mdx
 - docs/semester-4/efpc-411/unit-01/topic-01.mdx
 - docs/semester-4/efpc-411/unit-01/topic-02.mdx
 - docs/semester-4/efpc-411/unit-01/topic-03.mdx
 - docs/semester-4/efpc-411/unit-01/topic-04.mdx
 - docs/semester-4/efpc-411/unit-01/unit-assessment.mdx
 - history/prompts/efpc-411/crew-efpc-411-u01-author-cifix1.misc.prompt.md
 - history/prompts/efpc-411/crew-efpc-411-u01-author.green.prompt.md
 - specs/content/efpc-411/concepts/unit-01.md
 - specs/content/efpc-411/coverage/unit-01.md
 - specs/content/efpc-411/figures/unit-01.banner.md
 - specs/content/efpc-411/figures/unit-01.md
 - specs/content/efpc-411/reviews/unit-01/G2/20261126T020510698Z-gates.json
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261126T020510698Z/validate-content.txt
 - specs/content/efpc-411/sources/texts/hec-2013-currdev.md
 - specs/content/efpc-411/sources/texts/hec-2013-methods.md
 - specs/content/efpc-411/sources/texts/hec-2013-practicum.md
 - specs/content/efpc-411/sources/texts/teach-primary-2021.md
 - specs/content/efpc-411/sources/unit-01.md
 - specs/content/efpc-411/tasks.md
 - static/guides/semester-4/efpc-411.pdf
 - static/img/figures/efpc-411/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-1.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-2.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-3.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-4.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-5.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-7.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-8.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u01-author-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #882 (checks: rls). Run `gh pr checks 882` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
- (efpc-411-u01-author, author, agy) Unit 1 English draft is ready for independent G3 review; banner figure fig-U1-9 is prompt-only for the illustration pipeline.


## Response snapshot

Merged `origin/main` into `crew/efpc-411-u01-author` so the stale `student-notes` RLS test and migration 0058 match the live shared Supabase, and committed the fix PHR with `npm run check:content` green (14/14).

## Outcome

- Impact: fix for EFPC-411 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 47 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged `origin/main` into `crew/efpc-411-u01-author` so the stale `student-notes` RLS test and migration 0058 match the live shared Supabase, and committed the fix PHR with `npm run check:content` green (14/14).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Push the branch so PR #882 re-runs CI; the RLS red was shared-DB schema drift (main's 0058), not EFPC-411 content.
  - Unit 1 English is ready for independent G3; banner figure fig-U1-9 is still prompt-only for the illustration pipeline.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
