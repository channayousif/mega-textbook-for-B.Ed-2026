---
id: 20261313
title: GICP-400 Urdu teaser published after owner web approval
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5
feature: 030-media-studio
branch: crew/gicp-400-u00-media_publish
user: M Yousif Channa
command: crew media_publish
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - specs/studio/teaser-stats.json
  - history/prompts/030-media-studio/20261313-gicp-400-teaser-publish.green.prompt.md
tests:
  - list_videos shows moAasL2nNZs privacy_status public
  - npm run check:content (all 14 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Contents of .crew/brief.md:

# Crew job gicp-400-u00-media_publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u00-media_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved publishing gicp-400-ur (`crew publish` via web at 2026-11-27T20:17:02.776Z, video moAasL2nNZs). If the item is `qa3-pass`, advance it: `node scripts/notebook-studio/teaser.mjs advance gicp-400-ur approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew publish via web"}}}'`. Then set exactly that video (moAasL2nNZs) public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and advance to `public` with `{"published_at":"<now ISO>"}`. Then run `node scripts/notebook-studio/teaser-stats.mjs` and commit `specs/studio/teaser-stats.json` (the home page ranks teasers by it). Change no other video.

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
- (gicp-400-u00-media_assemble, media_assemble, claude_crew) `gicp-400-ur` is at `qa3-pass` (private `moAasL2nNZs`); the owner watches `https://youtube.com/shorts/moAasL2nNZs` and replies `crew publish gicp-400-ur` or `crew reject gicp-400-ur <note>`; the crew never publishes it.
- (gicp-400-u00-media_assemble, media_assemble, claude_crew) `youtube.upload` is at its 4/4 daily cap, held until 2026-11-27T19:00:00Z (00:00 PKT Nov 28); any further upload that day holds.
- (gicp-400-u00-media_assemble, media_assemble, claude_crew) `T sheet` must-watch is `efmp-406-ur` (first ur teaser); gicp-400-ur is one of 4 ready items but not must-watch (clips gate `pass`, no notes). Accepted owner notes: shot 5 soap bubbles, shot 4 ornate verandah, shots 2-3 are 82% crops.
- (gicp-400-u00-teaser_clips, teaser_clips, claude) assemble with chosen takes shot1 t1, shot2 t3, shot3 t3, shot4 t1, shot5 t1 (in `~/studio-media/teasers/gicp-400/ur/`); shots 2 and 3 have no takes left.
- (gicp-400-u00-teaser_clips, teaser_clips, claude) for the owner sheet, point to the soap bubbles in shot 5 and the ornate verandah in shot 4; check the caption crop on shots 2 and 3, which were enlarged from an 82% crop.

## Response snapshot

`gicp-400-ur` was still `qa3-pass` (no earlier attempt had touched it; `git log origin/main..HEAD`
was empty and the tree clean). The owner's web `crew publish` approval was confirmed in
`~/.crew/mega-book/media.json` (2026-11-27T20:17:02.776Z, `youtube_id` moAasL2nNZs) before acting.
Advanced to `approved` with the owner gate verbatim, then called `update_video` on `moAasL2nNZs`
with `privacy_status: public` and confirmed via `list_videos` (public, title and description
intact, thumbnail present). Advanced to `public` with `published_at` 2026-11-28T11:03:21Z, then
ran `teaser-stats.mjs`, which added `moAasL2nNZs` (20 views, 1 like). No other video was changed;
no media file was touched. The job ran at 16:03 PKT, inside media hours.

## Outcome

- ✅ Impact: the GICP-400 Urdu Short is live at https://youtube.com/shorts/moAasL2nNZs and the
  ledger's state matches YouTube, so `pickHomeTeasers` can now rank it.
- 🧪 Tests: `list_videos` shows `moAasL2nNZs` public; `npm run build:content-status` then
  `npm run check:content`, all 14 gates pass with no finding.
- 📁 Files: teaser ledger, teaser stats, this PHR.
- 🔁 Next prompts: owner pins the comment from `teaser.mjs meta gicp-400-ur`; cross-posting
  (step 11) if the owner wants it.
- 🧠 Reflection: the brief's commands worked unchanged; the only judgement call was taking the
  ledger's `published_at` from this job's clock rather than YouTube's publish timestamp
  (YouTube reported 2026-11-27T10:42:38Z for the now-public video).

## Handoff (for CEO and agents)

- Shipped / changed: `gicp-400-ur` is `public`; `teaser-stats.json` now carries `moAasL2nNZs`
  (20 views, 1 like) alongside the other public teasers.
- Decisions the team must respect: `gates.owner` records the owner's web approval
  (2026-11-27T20:17:02.776Z); `published_at` is this job's write time, not YouTube's.
- Pending / next owner: pin the comment (the MCP has no comment tool) and optionally set the
  Short's "Related video" in YouTube Studio. The QG1/QG2 notes the owner accepted at spot-check
  (shot 5 soap bubbles, shot 4 ornate verandah, shots 2-3 enlarged from 82% crops) are recorded
  on the clip rows; only reopen if the owner raises them.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none. The `update_video` reply is `{"privacy_status":"success"}`, so
  `list_videos` was read as the real confirmation rather than assumed.
- Graders run and results (PASS/FAIL): see tests.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none; the media_publish brief matched the skill exactly.
