---
id: crew-social-2026-11-26-publish-r1
title: crew social_roundup SOCIAL unit 11261
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: social
branch: crew/social-2026-11-26-publish-r1
user: crew
command: crew social_roundup
labels: ["crew", "claude_crew", "social_roundup"]
links:
  spec: specs/content/social/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/social/crew-social-2026-11-26-publish-r1.misc.prompt.md
 - specs/social/updates.json
tests:
 - npm run check:content
---

## Prompt

# Crew job social-2026-11-26-publish-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/social-2026-11-26-publish-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Publish the approved social posts: for each post `node scripts/social/updates.mjs show` lists as approved, run `node scripts/social/updates.mjs publish <id>` (it posts to Facebook, Instagram and LinkedIn, retries only the platforms that failed, and records each permalink). Print each result. A platform that fails twice: print a SOCIAL-HOLD line with the error and leave it for the next run. Follow the social-updates skill. Never post anything that is not approved; never approve a feature post yourself (only the owner does, with `crew post <id>`). When done, run `node scripts/social/updates.mjs snapshot` and commit `specs/social/updates.json` with your PHR.

Follow `.claude/skills/social-updates/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/social/updates.json` (the ledger snapshot) and your PHR only. Cards live in ~/studio-media/social and the public social-cards bucket; they never enter git.

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
- (social-2026-11-26-publish, social_roundup, claude_crew) `2026-11-25-feature` is still `approved`; all three platforms are recorded `failed` (paced), next allowed 12:04-12:13 UTC (17:04-17:13 PKT), so a publish run after that will send it.
- (social-2026-11-26-publish, social_roundup, claude_crew) pacing allows 1 post per platform per hour, so a publish run with two approved posts can only ever send one; the second always holds. The stage or scheduler could account for this.


## Response snapshot

Published the owner-approved feature post 2026-11-25-feature to Facebook, Instagram and LinkedIn after waiting out the per-platform pacing window, and committed the ledger snapshot with its PHR.

## Outcome

- Impact: social_roundup for SOCIAL Unit 11261 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Published the owner-approved feature post 2026-11-25-feature to Facebook, Instagram and LinkedIn after waiting out the per-platform pacing window, and committed the ledger snapshot with its PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The crew caps publish runs at two a day and queues the second as soon as the first ends; this run began at 10:31 UTC, inside the 2 h per-platform gap, so it waited to 12:16 UTC and published once. A later publish run may need to wait for the pacing reset, or the scheduler should queue at that time.
  - No approved, unposted post remains on the host ledger; all six posts are `posted`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
