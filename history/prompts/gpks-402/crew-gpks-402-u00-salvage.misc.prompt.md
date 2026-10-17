---
id: crew-gpks-402-u00-salvage
title: crew salvage GPKS-402 unit 0
stage: misc
date: 2026-10-17
surface: agent
model: claude
feature: gpks-402
branch: crew/gpks-402-u00-salvage
user: crew
command: crew salvage
labels: ["crew", "claude", "salvage"]
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

# Crew job gpks-402-u00-salvage

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u00-salvage`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
This branch carries earlier, unfinished work from PR #153 (agent/TEX-88). Run `git fetch origin && git rebase origin/main`, resolve every conflict (keep this unit's content; take main's version of shared files such as the style guide, gates and catalog), then make every content gate pass. Extra instructions: This branch holds the fresh G0/G1 intake (D-2026-0069) and supersedes the older agent/TEX-44. Shared files (glossary.json, specs/decisions/log.md, specs/gaps.md, terminology.csv): keep both sides' entries, never drop main's rows. The pipeline gate fails on main today only on stale G2 manifests for other courses; ignore those.

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

Rebased the GPKS-402 salvage branch onto origin/main 65d2428e with no conflicts, confirmed all 13 content gates pass, and committed PHR 0168 without pushing or opening a PR.

## Outcome

- Impact: salvage for GPKS-402 Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Rebased the GPKS-402 salvage branch onto origin/main 65d2428e with no conflicts, confirmed all 13 content gates pass, and committed PHR 0168 without pushing or opening a PR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
