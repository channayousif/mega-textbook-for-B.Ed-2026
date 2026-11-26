---
id: crew-efmp-407-u00-media_assemble
title: crew media_assemble EFMP-407 unit 0
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: efmp-407
branch: crew/efmp-407-u00-media_assemble
user: crew
command: crew media_assemble
labels: ["crew", "claude_crew", "media_assemble"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261285-efmp-407-teaser-assemble-upload.green.prompt.md
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u00-media_assemble

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u00-media_assemble`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Assemble and upload the efmp-407-ur Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs efmp-407 ur ~/studio-media/teasers/efmp-407/ur/teaser.mp4 <shot1> ... <shot5>` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded`, look at the end card and thumbnail, and advance to `assembled` and `qa-pass`. Upload with youtube-uploader `upload_video` using `node scripts/notebook-studio/teaser.mjs meta efmp-407-ur` (privacy_status private, the AI-content disclosure on), then `update_video` with the playlist and thumbnail, and advance to `uploaded-private`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. QG3: `list_videos` shows it private and processed, title and description intact; advance to `qa3-pass`. Continue from whatever state the item is in. The owner watches it and replies `crew publish efmp-407-ur` or `crew reject efmp-407-ur <note>`. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The EFMP-407 teaser only: `specs/studio/teasers/efmp-407.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) Shot 3 assembles from take 2; take 1 is the failed REC-overlay clip, so `assemble-teaser.mjs efmp-407 ur <out> 1 2 3 4 5` resolves the right take via `chosenTakes`.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) `youtube.upload` is at its 4/4 daily cap until 2026-11-26T19:00:00Z (00:00 PKT Nov 27), so an upload attempt before then will hold.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) PHR id 20261283 was the next free id on origin/main at commit time (20261245 was already taken).
- (efmp-407-u00-teaser_script, teaser_script, claude) `objectives` omitted because `parseOverview` (scripts/notebook-studio/describe.mjs) needs "## Course learning outcomes" but the EFMP-407 overview says "## Learning outcomes"; adding them later is metadata only and does not reopen approval.
- (efmp-407-u00-teaser_script, teaser_script, claude) PHR id 20261245 was the next free id on origin/main at commit time; renumber if a sibling branch merges the same id first.


## Response snapshot

Assembled the EFMP-407 Urdu Short from the chosen takes, passed encoded QG1, and advanced the ledger to qa-pass, with the private upload held by pacing until 2026-11-26T20:22:25Z.

## Outcome

- Impact: media_assemble for EFMP-407 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Assembled the EFMP-407 Urdu Short from the chosen takes, passed encoded QG1, and advanced the ledger to qa-pass, with the private upload held by pacing until 2026-11-26T20:22:25Z.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - efmp-407-ur is at qa-pass; the next job re-checks `youtube.upload` (held until 2026-11-26T20:22:25.607Z), uploads private, then `update_video` with playlist `PLCJn7gAoYIJs` and the recorded thumbnail, QG3, `qa3-pass`.
  - shot 3 assembles from take 2 (take 1 is the failed REC-overlay clip); nothing may be made public until the owner's `crew publish efmp-407-ur`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
