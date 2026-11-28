---
id: crew-efmp-301-u04-studio_publish
title: crew studio_publish EFMP-301 unit 4
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u04-studio_publish
user: crew
command: crew studio_publish
labels: ["crew", "claude_crew", "studio_publish"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/029-notebook-studio/20261310-efmp-301-u04-studio-publish.green.prompt.md
 - specs/studio/efmp-301/media-unit-04.json
 - specs/studio/efmp-301/unit-04.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u04-studio_publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-studio_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner watched the private Study Studio items of EFMP-301 Unit 4 and approved them with `crew approve-studio` (via web at 2026-11-27T23:19:17.418Z). Approved keys: t2-ur-video, t3-en-video, t3-ur-video, t3-en-audio-p1, t3-ur-audio-p1. For each approved key still at `qa3-pass`: `node scripts/notebook-studio/media-ledger.mjs advance EFMP-301 4 <key> approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew approve-studio via web"}}}'`. Then for each approved item (and any already `approved` from an earlier run) set exactly that video public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and `node scripts/notebook-studio/media-ledger.mjs advance EFMP-301 4 <key> public --json '{"published_at":"<now ISO>"}'`. Then run `node scripts/notebook-studio/place-media.mjs EFMP-301 4`, `node scripts/check-studio-manifest.mjs` and `node scripts/build-studio-index.mjs`, and commit the ledger, the unit's Studio manifest and your PHR. Change no other video.

Follow `.claude/skills/studio-media/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 4 Study Studio only: `specs/studio/efmp-301/media-unit-04.json`, the unit's manifest `specs/studio/efmp-301/unit-04.json`, its mind map labels files `specs/studio/efmp-301/unit-04-topic-NN-mindmap-labels.json` and the placed mind map and study guide files under `static/studio/efmp-301/unit-04/`, plus your PHR. Audio and video files live under ~/studio-media and never enter git.

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
- (efmp-301-u04-studio_media-r1, studio_media, claude_crew) Owner spot-check, 5 private links to watch: https://youtu.be/egOH0dxmmw4 (t2-ur-video), https://youtu.be/eSxw0ibxBG4 (t3-en-video), https://youtu.be/lSrCeh7b0tE (t3-ur-video), https://youtu.be/vWa7LGS1xjs (t3-en-audio-p1), https://youtu.be/kmia64M6asc (t3-ur-audio-p1); reply `crew approve-studio EFMP-301 4`.
- (efmp-301-u04-studio_media-r1, studio_media, claude_crew) The YouTube hourly cap held until 2026-11-26T11:04:32Z; I finished all prep, waited out the 14-minute hold inside the same open media-hours window and uploaded at 11:05Z (the brief said stop on hold, so flag it if you want the literal stop instead). The ledger CLI is case-sensitive: `status EFMP-301 4` returns `[]`, use `efmp-301`.
- (efmp-301-u04-studio_media-r1, studio_media, claude_crew) For `studio_publish`: `t3-ur-audio-p1` still carries an English `alt` (give it Urdu at placement so the RTL panel reads Urdu); the `t3-en-audio-p1` QG2 note about the zero-money line is stale (`docs/semester-1/efmp-301/unit-04/topic-03.mdx:131` does say it); the QG3 embed check stays deferred to the placement build.
- (efmp-301-u04-studio_media, studio_media, claude_crew) next allowed YouTube upload 2026-11-26T11:04:32Z; `t3-ur-audio-p1` is the only item left, at `qa2-pass` (UR audio podcast `PLH7WvExVOw8U`), then QG3, `sheet EFMP-301 4`.
- (efmp-301-u04-studio_media, studio_media, claude_crew) new private link for the owner is https://youtu.be/vWa7LGS1xjs (EN audio, `vWa7LGS1xjs`); the ledger's `t3-en-audio-p1` QG2 note is stale, `topic-03.mdx:131` does say "Nothing in that design costs money".


## Response snapshot

Published and placed the five owner-approved EFMP-301 Unit 4 Study Studio audio/video items (one `update_video` to public, five ledger advances, five manifest rows, Urdu alt for `t3-ur-audio-p1`) and committed the ledger, manifest and PHR with all content gates passing.

## Outcome

- Impact: studio_publish for EFMP-301 Unit 4 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Published and placed the five owner-approved EFMP-301 Unit 4 Study Studio audio/video items (one `update_video` to public, five ledger advances, five manifest rows, Urdu alt for `t3-ur-audio-p1`) and committed the ledger, manifest and PHR with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The QG3 playlist/embed check for the five items stays deferred to the placement build, as the earlier job recorded; no playlist helper exists in `scripts/`, so a `list_videos` query per title only confirms status, not playlist membership.
  - The `t3-en-audio-p1` QG2 note about the zero-money line is stale (`docs/semester-1/efmp-301/unit-04/topic-03.mdx:131` does say it); left as recorded rather than rewriting review evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
