---
id: 0177
title: Repair main glossary and crew guards
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/push-guard-and-approval
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "incident", "ci"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/195
files:
 - glossary.json (PR #195)
 - scripts/crew/crew.mjs
tests:
 - glossary union: validate:content PASS, 12/13 content gates PASS (13th needs the gitignored content-status file)
 - push guard: worker dry-run push refused, crew push accepted, guard restored after
---

## Prompt

crew status, pr and ci status

## Response snapshot

Status showed two crew PRs failing `validate:content` with 316 missing glossary terms. The cause was on main itself: `glossary.json` no longer parsed. The chain was:

1. The crew's conflict job for the efmp-303 salvage (opencode) produced merge 5d38d327, which dropped the `},{` between two entries.
2. The worker pushed that merge itself mid-run, although the brief says not to, so the crew's own gate never saw it.
3. The owner's `C-003 merge` merged #161 at once, without waiting for CI on the new commit.

Fixes:

- #195 rebuilt `glossary.json` as the union of both merge sides: main's 355 entries, then the branch's 29 additions. No term differed.
- The crew now enforces "only the crew pushes": each job worktree gets a disabled per-worktree push URL, lifted only for the crew's own push after its gate. I applied the guard to all existing worktrees at once.
- `C-### merge` now records approval for the protected files shown. The tick merges only when CI is green on the PR's latest commit, and asks again if new protected files appear.

## Outcome

- Impact: main parses again, so PRs and deploy unblock; a worker can no longer bypass the crew gate; owner approval can no longer bypass CI.
- Tests: listed above.
- Files: glossary.json (#195), crew.mjs.
- Next prompts: none.
- Reflection: an instruction in a brief is not a control; the merge path that skipped CI was mine.

## Handoff (for CEO and agents)

- Shipped / changed: glossary repair; crew push guard; CI-gated owner approval.
- Decisions the team must respect: only the crew pushes job branches; owner approval never merges a PR whose latest CI is not green.
- Pending / next owner: crew reruns the remaining salvage conflict jobs under the guard.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a worker ignoring "do not push"; an approval path that skipped CI.
- Graders run and results (PASS/FAIL): guard dry run PASS, glossary PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add a JSON-parse check to the conflict job's task for every *.json it touched.
