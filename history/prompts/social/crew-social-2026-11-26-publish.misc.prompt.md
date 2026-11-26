---
id: crew-social-2026-11-26-publish
title: crew social publish 2026-11-26 (two approved feature posts, one paced out)
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: social
branch: crew/social-2026-11-26-publish
user: crew
command: crew social publish (social-2026-11-26-publish)
labels: ["crew", "claude_crew", "social_roundup", "social_publish"]
links:
  spec: specs/031-social-updates/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/social/updates.json
 - history/prompts/social/crew-social-2026-11-26-publish.misc.prompt.md
tests:
 - node scripts/social/updates.mjs check 2026-11-23-feature-2 (pass)
 - node scripts/social/updates.mjs check 2026-11-25-feature (pass)
 - npm run check:content (all 14 gates pass)
---

## Prompt

# Crew job social-2026-11-26-publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/social-2026-11-26-publish`.
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

## Response snapshot

Two posts were `approved` on the host ledger, both feature posts the owner approved on Discord
(`approved.by: owner`): `2026-11-23-feature-2` (PR #736 Study Studio Animations tab, PR #733 the
"Watch it animate" button) and `2026-11-25-feature` (PR #752 quiz drafts, #747 sign-up banner,
#743 presentation tab, #741 flashcards). Both passed `updates.mjs check` and both cards were already
rendered and public in the `social-cards` bucket.

I published them in ledger order with `updates.mjs publish`:

- `2026-11-23-feature-2` posted on all three platforms at 10:04:10 UTC: Facebook
  `1404300426106517_122111798259545614`, Instagram `DgM2OcpDqTZ`, LinkedIn
  `urn:li:share:7531659055858262017`. State is now `posted`.
- `2026-11-25-feature` failed on all three platforms with `paced: social.<platform>: hourly cap of 1
  reached` (the first post had just used the hour's single slot). The retry failed the same way, so
  per the brief I printed SOCIAL-HOLD for each platform and left the post `approved` for the next
  run. Its recorded reset times are 12:04-12:13 UTC (17:04-17:13 PKT).

Then `updates.mjs snapshot` wrote `specs/social/updates.json`, and `npm run check:content` passed
all 14 gates.

SOCIAL-HOLD 2026-11-25-feature facebook: paced: social.facebook: hourly cap of 1 reached; next at 2026-11-26T12:09:29.705Z
SOCIAL-HOLD 2026-11-25-feature instagram: paced: social.instagram: hourly cap of 1 reached; next at 2026-11-26T12:08:45.303Z
SOCIAL-HOLD 2026-11-25-feature linkedin: paced: social.linkedin: hourly cap of 1 reached; next at 2026-11-26T12:13:51.253Z

## Outcome

- ✅ Impact: the owner-approved feature post `2026-11-23-feature-2` is live on Facebook, Instagram and
  LinkedIn. `2026-11-25-feature` is still `approved`, held by the per-platform hourly cap, and waits
  for the next publish run.
- 🧪 Tests: `updates.mjs check` passed for both posts; `npm run build:content-status` then
  `npm run check:content` passed all 14 content gates.
- 📁 Files: `specs/social/updates.json` (ledger snapshot) and this PHR.
- 🔁 Next prompts: a publish run after 17:13 PKT on 2026-11-26 publishes `2026-11-25-feature`.
- 🧠 Reflection: the pacing rule (1 post per platform per hour, 2 h gap) means a publish run with two
  approved posts can only ever send one; the second always holds. The stage could say so, or the
  scheduler could queue one publish run per post two hours apart.

## Handoff (for CEO and agents)

- Shipped / changed: `2026-11-23-feature-2` published to Facebook
  (https://www.facebook.com/1404300426106517_122111798259545614), Instagram
  (https://www.instagram.com/p/DgM2OcpDqTZ/) and LinkedIn
  (https://www.linkedin.com/feed/update/urn:li:share:7531659055858262017/). `2026-11-25-feature`
  remains `approved` with all three platforms `failed` (paced), next allowed 12:04-12:13 UTC.
- Decisions the team must respect: only the two owner-approved posts were published; nothing was
  self-approved, and no feature post was approved by an agent.
- Pending / next owner: no owner action needed. The next publish run sends `2026-11-25-feature`.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the hourly cap of 1 per platform makes the second approved post in a run
  hold on every platform; the failure is a pace hold, not a platform error, so retrying inside the
  same run cannot succeed.
- Graders run and results (PASS/FAIL): `updates.mjs check` PASS x2; `npm run check:content` PASS (14/14).
- Prompt variant (if applicable): crew social publish brief (first publish run).
- Next experiment (smallest change to try): have the publish stage publish at most one post per
  platform per run, or have the scheduler queue one publish run per approved post two hours apart.
