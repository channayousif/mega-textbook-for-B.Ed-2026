---
id: crew-gicp-400-u00-media_assemble
title: crew media_assemble GICP-400 unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: gicp-400
branch: crew/gicp-400-u00-media_assemble
user: crew
command: crew media_assemble
labels: ["crew", "claude_crew", "media_assemble"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gicp-400/crew-gicp-400-u00-media_assemble.misc.prompt.md
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u00-media_assemble

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u00-media_assemble`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Assemble and upload the gicp-400-ur Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs gicp-400 ur ~/studio-media/teasers/gicp-400/ur/teaser.mp4 <shot1> ... <shot5>` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded`, look at the end card and thumbnail, and advance to `assembled` and `qa-pass`. Upload with youtube-uploader `upload_video` using `node scripts/notebook-studio/teaser.mjs meta gicp-400-ur` (privacy_status private, the AI-content disclosure on), then `update_video` with the playlist and thumbnail, and advance to `uploaded-private`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. QG3: `list_videos` shows it private and processed, title and description intact; advance to `qa3-pass`. Continue from whatever state the item is in. The owner watches it and replies `crew publish gicp-400-ur` or `crew reject gicp-400-ur <note>`. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The GICP-400 teaser only: `specs/studio/teasers/gicp-400.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (gicp-400-u00-teaser_clips, teaser_clips, claude) assemble with chosen takes shot1 t1, shot2 t3, shot3 t3, shot4 t1, shot5 t1 (in `~/studio-media/teasers/gicp-400/ur/`); shots 2 and 3 have no takes left.
- (gicp-400-u00-teaser_clips, teaser_clips, claude) for the owner sheet, point to the soap bubbles in shot 5 and the ornate verandah in shot 4; check the caption crop on shots 2 and 3, which were enlarged from an 82% crop.
- (gicp-400-u00-teaser_script, teaser_script, claude) The five Urdu objectives are left out until `parseOverview` (scripts/notebook-studio/describe.mjs) reads the "Course objectives" heading. Adding them later is metadata only and does not reopen approval.
- (gicp-400-u00-teaser_script, teaser_script, claude) When the clips are reviewed, fail any take that shows a flag, emblem, map, portrait or readable text; the topic makes these likely.


## Response snapshot

Assembled the GICP-400 Urdu Short from the chosen takes, passed encoded QG1, uploaded it private as `moAasL2nNZs` with the teaser playlist and custom thumbnail, passed QG3, and advanced `gicp-400-ur` to `qa3-pass`.

## Outcome

- Impact: media_assemble for GICP-400 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Assembled the GICP-400 Urdu Short from the chosen takes, passed encoded QG1, uploaded it private as `moAasL2nNZs` with the teaser playlist and custom thumbnail, passed QG3, and advanced `gicp-400-ur` to `qa3-pass`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `gicp-400-ur` is at `qa3-pass` (private `moAasL2nNZs`); the owner watches `https://youtube.com/shorts/moAasL2nNZs` and replies `crew publish gicp-400-ur` or `crew reject gicp-400-ur <note>`; the crew never publishes it.
  - `youtube.upload` is at its 4/4 daily cap, held until 2026-11-27T19:00:00Z (00:00 PKT Nov 28); any further upload that day holds.
  - `T sheet` must-watch is `efmp-406-ur` (first ur teaser); gicp-400-ur is one of 4 ready items but not must-watch (clips gate `pass`, no notes). Accepted owner notes: shot 5 soap bubbles, shot 4 ornate verandah, shots 2-3 are 82% crops.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
