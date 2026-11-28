---
id: 20261311
title: EFPG-401 Urdu teaser published after owner web approval
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5
feature: 030-media-studio
branch: crew/efpg-401-u00-media_publish
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
  - history/prompts/030-media-studio/20261311-efpg-401-teaser-publish.green.prompt.md
tests:
  - list_videos shows -mJSyWxcAyA privacy_status public
  - npm run check:content (all 14 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Contents of .crew/brief.md:

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

efpg-401-ur was still `qa3-pass` (no earlier attempt had touched it). Advanced to `approved` with the
owner gate recorded verbatim from the web `crew publish` approval, then called `update_video` on
`-mJSyWxcAyA` with `privacy_status: public` and confirmed it via `list_videos` (public, title and
description intact). Advanced to `public` with `published_at` 2026-11-28T10:03:49Z, refreshed the
view counts and wrote `specs/studio/teaser-stats.json`. No other video was changed. Media files were
not touched.

## Outcome

- ✅ Impact: the EFPG-401 Urdu Short is live at https://youtube.com/shorts/-mJSyWxcAyA and the
  ledger's state matches YouTube, so `pickHomeTeasers` can now rank it.
- 🧪 Tests: `list_videos` shows `-mJSyWxcAyA` public; `npm run build:content-status` then
  `npm run check:content`, all 14 gates pass.
- 📁 Files: teaser ledger, teaser stats, this PHR.
- 🔁 Next prompts: owner pins the comment from `teaser.mjs meta efpg-401-ur`; cross-posting (step 11)
  if the owner wants it.
- 🧠 Reflection: the brief's exact commands work unchanged; the only judgement call was taking the
  ledger's `published_at` from this job's clock rather than YouTube's publish timestamp.

## Handoff (for CEO and agents)

- Shipped / changed: efpg-401-ur is `public`; `teaser-stats.json` now carries `-mJSyWxcAyA`
  (1 view, 1 like) alongside the other 15 public teasers.
- Decisions the team must respect: `gates.owner` records the owner's web approval
  (2026-11-27T20:17:02.416Z); `published_at` is this job's write time, not YouTube's.
- Pending / next owner: pin the comment (the MCP has no comment tool) and optionally set the
  Short's "Related video" in YouTube Studio. Shot 1's book-cover pseudo-lettering and the
  blurred pseudo-text on the shots 2-3 wall posters were flagged at QG1/QG2 and accepted by the
  owner's spot-check; only reopen if the owner raises it.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none. The `update_video` reply is `{"privacy_status":"success"}`, so
  `list_videos` is the real confirmation and was read rather than assumed.
- Graders run and results (PASS/FAIL): see tests.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none; the media_publish brief matched the skill exactly.
