---
id: crew-efpg-401-u00-media_publish
title: crew media_publish EFPG-401 unit 0
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efpg-401
branch: crew/efpg-401-u00-media_publish
user: crew
command: crew media_publish
labels: ["crew", "claude_crew", "media_publish"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261311-efpg-401-teaser-publish.green.prompt.md
 - specs/studio/teaser-stats.json
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u00-media_publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u00-media_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved publishing efpg-401-ur (`crew publish` via web at 2026-11-27T20:17:02.416Z, video -mJSyWxcAyA). If the item is `qa3-pass`, advance it: `node scripts/notebook-studio/teaser.mjs advance efpg-401-ur approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew publish via web"}}}'`. Then set exactly that video (-mJSyWxcAyA) public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and advance to `public` with `{"published_at":"<now ISO>"}`. Then run `node scripts/notebook-studio/teaser-stats.mjs` and commit `specs/studio/teaser-stats.json` (the home page ranks teasers by it). Change no other video.

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The EFPG-401 teaser only: `specs/studio/teasers/efpg-401.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (efpg-401-u00-media_assemble, media_assemble, claude) Owner should check the pseudo-Urdu lettering on the shot 1 book cover (no meaningful words), the blurred pseudo-text on wall posters, and that the private Short plays.
- (efpg-401-u00-media_assemble, media_assemble, claude) The thumbnail's course badge text touches its box edge (`scripts/notebook-studio/thumbnail.mjs`, outside this job's scope).
- (efpg-401-u00-teaser_clips, teaser_clips, claude_crew) Shot 1 assembles from take 2 (`chosenTakes`); take 1 is the failed REC-overlay clip, so `assemble-teaser.mjs efpg-401 ur <out> 1 2 3 4 5` resolves it.
- (efpg-401-u00-teaser_clips, teaser_clips, claude_crew) Shots 2 and 3 carry sharp Urdu-like pseudo-text (wall poster, red book cover); both passed as pseudo-script rather than readable words, and the owner may still reject them at spot-check.
- (efpg-401-u00-teaser_clips, teaser_clips, claude_crew) Flow's WAF refused two submissions at no charge and the journal recovery cleared them, so a WAF refusal is retryable, not a failed take.


## Response snapshot

Published the EFPG-401 Urdu teaser `-mJSyWxcAyA` (qa3-pass to public), confirmed it public on the channel, and refreshed the teaser stats the home page ranks by.

## Outcome

- Impact: media_publish for EFPG-401 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Published the EFPG-401 Urdu teaser `-mJSyWxcAyA` (qa3-pass to public), confirmed it public on the channel, and refreshed the teaser stats the home page ranks by.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The owner still needs to pin the comment (the MCP has no comment tool) and may set the Short's "Related video" in YouTube Studio.
  - Shot 1's book-cover pseudo-lettering and the shots 2-3 wall-poster pseudo-text were flagged at QG1/QG2 and accepted at the owner's spot-check; reopen only if the owner raises it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
