---
id: crew-social-2026-11-23-roundup
title: crew social_roundup SOCIAL unit 11230
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: social
branch: crew/social-2026-11-23-roundup
user: crew
command: crew social_roundup
labels: ["crew", "claude", "social_roundup"]
links:
  spec: specs/content/social/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/031-social-updates/20261255-social-roundup-2026-11-23-second.green.prompt.md
 - specs/social/updates.json
tests:
 - npm run check:content
---

## Prompt

# Crew job social-2026-11-23-roundup

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/social-2026-11-23-roundup`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Make today's social roundup of deployed work. Run `node scripts/social/updates.mjs collect`. For each new draft: if it is a feature post, write the English and Urdu line for every highlight marked needs_copy from its PR (`gh pr view <n>`) with `node scripts/social/updates.mjs copy <id> <n> --en "..." --ur "..." --card-en "..." --card-ur "..."` (the caption line explains the change in plain words for an ordinary reader, at most 320 characters; the card line is at most 68; never edit the ledger file by hand); then `node scripts/social/updates.mjs check <id>` until it passes and `node scripts/social/updates.mjs render <id>`, and read the card image (nothing clipped, Urdu right to left, the address visible). A content draft: `node scripts/social/updates.mjs approve <id> --by auto` (the ledger refuses during the pilot; then leave it for the owner) and `node scripts/social/updates.mjs publish <id>`. A feature draft: stop at the rendered card; the owner approves it. Follow the social-updates skill. Never post anything that is not approved; never approve a feature post yourself (only the owner does, with `crew post <id>`). When done, run `node scripts/social/updates.mjs snapshot` and commit `specs/social/updates.json` with your PHR.

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


## Response snapshot

Collected the second 2026-11-23 roundup, published the EFMP-301 animations and GICP-400 Unit 7 content post to Facebook, Instagram and LinkedIn, wrote and rendered the Study Studio and "Watch it animate" feature card for the owner, and committed the ledger snapshot with PHR 20261255.

## Outcome

- Impact: social_roundup for SOCIAL Unit 11230 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Collected the second 2026-11-23 roundup, published the EFMP-301 animations and GICP-400 Unit 7 content post to Facebook, Instagram and LinkedIn, wrote and rendered the Study Studio and "Watch it animate" feature card for the owner, and committed the ledger snapshot with PHR 20261255.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The pilot is over, so content roundups now auto-approve and publish. Feature post 2026-11-23-feature-2 waits for the owner's `crew post`.
  - The generator's `updated` card line leaves out the course title ("GICP-400 Unit 7 improved"); fix it in the generator, not by hand.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
