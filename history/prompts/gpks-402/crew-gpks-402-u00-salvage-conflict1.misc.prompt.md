---
id: crew-gpks-402-u00-salvage-conflict1
title: crew fix GPKS-402 unit 0
stage: misc
date: 2026-10-18
surface: agent
model: codex
feature: gpks-402
branch: crew/gpks-402-u00-salvage
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/_category_.json
 - docs/semester-2/gpks-402/course-overview.mdx
 - history/prompts/general/0108-author-gpks-402-pakistan-studies-unit-01.general.prompt.md
 - history/prompts/general/0109-gpks-402-content-spec-repairs-post-intake.general.prompt.md
 - history/prompts/general/0140-tex72-resume-intake-prerequisite.general.prompt.md
 - history/prompts/general/0159-gpks402-salvage-rebase-gates.general.prompt.md
 - history/prompts/general/0160-tex88-gpks402-fresh-g0-g1-intake.general.prompt.md
 - history/prompts/general/0161-gpks402-salvage-rebase-phr-renumber.general.prompt.md
 - history/prompts/general/0162-gpks402-salvage-gate-recheck.general.prompt.md
 - history/prompts/general/0163-gpks402-salvage-rebase-main-8e779fc4.general.prompt.md
 - history/prompts/general/0164-gpks402-salvage-current-recheck.general.prompt.md
 - history/prompts/general/0165-gpks402-salvage-rebase-369bf469.general.prompt.md
 - history/prompts/general/0166-gpks402-salvage-recheck-369bf469.general.prompt.md
 - history/prompts/general/0167-gpks402-salvage-recheck-369bf469.general.prompt.md
 - history/prompts/general/0168-gpks402-salvage-rebase-65d2428e.general.prompt.md
 - history/prompts/gpks-402/0335-merge-main-resolve-registries.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u00-salvage.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/course-overview.mdx
 - specs/content/gpks-402/content-spec.md
 - specs/content/gpks-402/intake-88/evaluation.md
 - specs/content/gpks-402/intake-88/manifest.json
 - specs/content/gpks-402/intake/evaluation.md
 - specs/content/gpks-402/intake/manifest.json
 - specs/content/gpks-402/tasks.md
 - specs/content/terminology.csv
 - specs/decisions/log.md
 - specs/gaps.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u00-salvage-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u00-salvage`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
PR #167 conflicts with main. Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
The whole GPKS-402 course: its docs and i18n trees, `specs/content/gpks-402/`, its figures, and the shared files its PR already touches.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Resolved PR #167 merge conflicts, preserved both registries’ additions, repaired the decision ID collision, and verified all content gates pass.

## Outcome

- Impact: fix for GPKS-402 Unit 0 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved PR #167 merge conflicts, preserved both registries’ additions, repaired the decision ID collision, and verified all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
