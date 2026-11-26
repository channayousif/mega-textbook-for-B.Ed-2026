---
id: crew-social-2026-11-26-publish-r1
title: crew social publish r1 2026-11-26 (approved feature post sent after the pacing window)
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: social
branch: crew/social-2026-11-26-publish-r1
user: crew
command: crew social publish (social-2026-11-26-publish-r1)
labels: ["crew", "claude_crew", "social_roundup", "social_publish"]
links:
  spec: specs/031-social-updates/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/social/updates.json
 - history/prompts/social/crew-social-2026-11-26-publish-r1.misc.prompt.md
tests:
 - node scripts/social/updates.mjs check 2026-11-25-feature (pass)
 - npm run check:content (all 14 gates pass)
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

One post was `approved` on the host ledger: `2026-11-25-feature`, the feature post the owner approved on
Discord (`approved.by: owner`, via `discord_channel`). It passed `updates.mjs check` and its card was
already rendered and public in the `social-cards` bucket. All three platforms were recorded `failed`
(paced) by the first publish run at 10:04 UTC, with reset times 12:04-12:13 UTC.

This run started at 10:31 UTC, before the pacing window opened. The crew scheduler caps publish runs at
two a day (`social-2026-11-26-publish` and this `-r1`), so recording a second pacing failure now would
have left the post unsent until the next day. I waited inside the run until 12:16 UTC (after the latest
possible due time, 12:14:09 UTC) and then ran `updates.mjs publish 2026-11-25-feature` once. It posted
on all three platforms at 12:16:15 UTC:

- Facebook `1404300426106517_122111841033545614` (https://www.facebook.com/1404300426106517_122111841033545614)
- Instagram `17969591046236119` (https://www.instagram.com/p/DgNFVvtjRT0/)
- LinkedIn `urn:li:share:7531692293188403202` (https://www.linkedin.com/feed/update/urn:li:share:7531692293188403202/)

The ledger state is now `posted` on all three platforms. `updates.mjs snapshot` wrote
`specs/social/updates.json`, and `npm run check:content` passed all 14 gates.

## Outcome

- ✅ Impact: the owner-approved feature post `2026-11-25-feature` is live on Facebook, Instagram and
  LinkedIn. Nothing else was posted; no post was self-approved.
- 🧪 Tests: `updates.mjs check 2026-11-25-feature` passed before publishing; `npm run
  build:content-status` then `npm run check:content` passed all 14 content gates.
- 📁 Files: `specs/social/updates.json` (ledger snapshot) and this PHR.
- 🔁 Next prompts: none. The ledger has no approved, unposted post left.
- 🧠 Reflection: the scheduler queues the second publish run as soon as the first finishes, which can be
  hours before the 2 h per-platform gap allows. Waiting inside the run (the job timeout is 3 h) got the
  post out the same day; a cleaner fix is for the scheduler to queue a publish run at the pacing reset
  time, or for the publish stage to say it may wait.

## Handoff (for CEO and agents)

- Shipped / changed: `2026-11-25-feature` published to Facebook
  (https://www.facebook.com/1404300426106517_122111841033545614), Instagram
  (https://www.instagram.com/p/DgNFVvtjRT0/) and LinkedIn
  (https://www.linkedin.com/feed/update/urn:li:share:7531692293188403202/). Ledger snapshot committed.
- Decisions the team must respect: only the owner-approved post was published; nothing was self-approved,
  and no feature post was approved by an agent. The publish run waited out the pacing window instead of
  recording a second failure.
- Pending / next owner: no owner action needed. No approved, unposted post remains.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a publish run queued immediately after the previous one lands inside the 2 h
  per-platform gap, so an attempt at that moment only records a pace hold. The two-publish-runs-a-day cap
  means such a hold can leave a post unsent until the next day.
- Graders run and results (PASS/FAIL): `updates.mjs check` PASS; `npm run check:content` PASS (14/14).
- Prompt variant (if applicable): crew social publish brief (second publish run, `-r1`).
- Next experiment (smallest change to try): have `socialDue`/`socialPhase` queue a publish run at the
  channel's pacing reset time (or when `toPublish` first appears after that time), so the run does not
  have to wait inside the job.
