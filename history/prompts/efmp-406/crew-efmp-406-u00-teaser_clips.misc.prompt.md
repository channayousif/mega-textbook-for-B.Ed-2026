---
id: crew-efmp-406-u00-teaser_clips
title: crew teaser_clips EFMP-406 unit 0
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u00-teaser_clips
user: crew
command: crew teaser_clips
labels: ["crew", "claude", "teaser_clips"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261247-efmp-406-teaser-clips.green.prompt.md
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u00-teaser_clips

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u00-teaser_clips`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved the efmp-406-ur script with `crew approve-script` (via openclaw at 2026-11-22T15:05:16.266Z, script sha256 b209bab9a2d8420920e188d9c35cb6eb5f5ff90e8e36d15a94494aafaf63dc5b). If the ledger item is still `scripted`, record it first: `node scripts/notebook-studio/teaser.mjs advance efmp-406-ur script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"2026-11-22","note":"crew approve-script via openclaw"}}}'` (it refuses if the script changed). Then run `node scripts/media/teaser-clips.mjs efmp-406`: it makes every missing shot through gflow (recovering a clip Flow finished but did not report, never paying twice), records each take, and prints the QG1 result and the QG2 transcript match with a 3-frame strip. Read every strip image and transcript: fail a take with a drawn camera interface, readable text, a map or flag, wrong dress, or speech that misses the line; record each verdict with `node scripts/notebook-studio/teaser.mjs clipqa efmp-406-ur <shot> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"claude","notes":"..."}'`. Retake a failed shot once with `node scripts/media/teaser-clips.mjs efmp-406 --shots <n>` (at most two retakes per shot; never retake a shot because gflow timed out, the script recovers it). When every shot has a passing take, advance to `clips-generated` and then `clips-qa` with `{"gates":{"clips":{"verdict":"pass","by":"claude"}}}`. If teaser-clips.mjs exits 3, 4 or 5 (MEDIA-HOLD: quota, no producer, or held for the owner), stop: commit any takes it recorded, print its MEDIA-HOLD line as a CREW-HANDOFF line, and exit. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The EFMP-406 teaser only: `specs/studio/teasers/efmp-406.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (efmp-406-u00-teaser_script, teaser_script, claude) `objectives` are omitted because `parseOverview` (`scripts/notebook-studio/describe.mjs`) expects "## Course learning outcomes" but the EFMP-406 overview says "## Learning outcomes"; this is metadata only, so they can be added later without reopening the approval.


## Response snapshot

Recorded the owner's script approval for efmp-406-ur, generated shots 1 and 3 and passed them in QA, and stopped on a MEDIA-HOLD waiting for the owner to make shot 4 in Flow.

## Outcome

- Impact: teaser_clips for EFMP-406 Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the owner's script approval for efmp-406-ur, generated shots 1 and 3 and passed them in QA, and stopped on a MEDIA-HOLD waiting for the owner to make shot 4 in Flow.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - MEDIA-HOLD: held - waiting for the owner: make shot 4 in Flow from /home/a2ahs/studio-media/inbox/efmp-406-ur-prompts.html and save it as efmp-406-ur_shot-4.mp4
  - Shot 2 was never sent to Flow because gflow's credit check errored, so it was not billed; shots 2, 4 and 5 all still need a first take. Check the gflow serve window on the PC, then rerun `node scripts/media/teaser-clips.mjs efmp-406`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
