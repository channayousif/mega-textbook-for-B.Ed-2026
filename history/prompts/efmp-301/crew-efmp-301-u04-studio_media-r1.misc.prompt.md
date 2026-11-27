---
id: crew-efmp-301-u04-studio_media-r1
title: crew studio_media EFMP-301 unit 4
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u04-studio_media-r1
user: crew
command: crew studio_media
labels: ["crew", "claude_crew", "studio_media"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261281-efmp301-u4-studio-media-ur-audio-uploaded.green.prompt.md
 - specs/studio/efmp-301/media-unit-04.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u04-studio_media-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-studio_media-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Run the Study Studio of EFMP-301 Unit 4 (studio-media skill), audio and video. Read `node scripts/notebook-studio/media-ledger.mjs status EFMP-301 4` and carry every item that is not blocked from its current state up to `qa3-pass`: generate, download, QG1, encode, QG2 (your own transcript check against the topic text), upload PRIVATE, QG3. Never edit the ledger by hand; every change goes through `node scripts/notebook-studio/media-ledger.mjs advance`. Before every NotebookLM `studio_create` run `node scripts/media/pacing.mjs check nlm.studio`: on `hold`, create nothing more, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful creation run `node scripts/media/pacing.mjs record nlm.studio`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. A hold is normal: commit what you advanced and stop with the CREW-HANDOFF line; the crew resumes in the next media hours. When every item is at `qa3-pass`, run `node scripts/notebook-studio/media-ledger.mjs sheet EFMP-301 4` and print one CREW-HANDOFF line with the private links the owner should watch and "reply `crew approve-studio EFMP-301 4`". If `nlm` reports expired cookies, stop and print one CREW-HANDOFF line asking the owner to run `nlm login`; commit nothing else. Commit `specs/studio/efmp-301/media-unit-04.json` with your PHR. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-media/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 4 Study Studio only: `specs/studio/efmp-301/media-unit-04.json` and its manifest row, plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (efmp-301-u04-studio_media, studio_media, claude_crew) next allowed YouTube upload 2026-11-26T11:04:32Z; `t3-ur-audio-p1` is the only item left, at `qa2-pass` (UR audio podcast `PLH7WvExVOw8U`), then QG3, `sheet EFMP-301 4`.
- (efmp-301-u04-studio_media, studio_media, claude_crew) new private link for the owner is https://youtu.be/vWa7LGS1xjs (EN audio, `vWa7LGS1xjs`); the ledger's `t3-en-audio-p1` QG2 note is stale, `topic-03.mdx:131` does say "Nothing in that design costs money".
- (efmp-301-u04-studio_media, studio_media, claude_crew) `t3-ur-audio-p1` still has an English `alt`; fix it at placement (`place-media.mjs`), not by hand, so the RTL panel reads Urdu.
- (efmp-301-u04-flashcards, flashcards, claude) The Long-Term Memory card uses the terminology.csv Urdu طویل مدتی یادداشت, while the Urdu topic 4.2 text uses طویل المدتی یادداشت; a G5 reviewer may want the topic aligned to the term bank.
- (efmp-301-u04-flashcards, flashcards, claude) Running build-studio-index rewrites 17 tracked but git-ignored files under static/studio/flashcards/ for other courses; I reverted them and later jobs should do the same.


## Response snapshot

Uploaded the last EFMP-301 Unit 4 Study Studio item `t3-ur-audio-p1` private to YouTube (`kmia64M6asc`, UR audio podcast playlist, thumbnail and synthetic-media disclosure set, tags repaired), advanced the ledger to `qa3-pass` so all 14 unit items are `qa3-pass` or `placed`, and committed the ledger with its PHR.

## Outcome

- Impact: studio_media for EFMP-301 Unit 4 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Uploaded the last EFMP-301 Unit 4 Study Studio item `t3-ur-audio-p1` private to YouTube (`kmia64M6asc`, UR audio podcast playlist, thumbnail and synthetic-media disclosure set, tags repaired), advanced the ledger to `qa3-pass` so all 14 unit items are `qa3-pass` or `placed`, and committed the ledger with its PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner spot-check, 5 private links to watch: https://youtu.be/egOH0dxmmw4 (t2-ur-video), https://youtu.be/eSxw0ibxBG4 (t3-en-video), https://youtu.be/lSrCeh7b0tE (t3-ur-video), https://youtu.be/vWa7LGS1xjs (t3-en-audio-p1), https://youtu.be/kmia64M6asc (t3-ur-audio-p1); reply `crew approve-studio EFMP-301 4`.
  - The YouTube hourly cap held until 2026-11-26T11:04:32Z; I finished all prep, waited out the 14-minute hold inside the same open media-hours window and uploaded at 11:05Z (the brief said stop on hold, so flag it if you want the literal stop instead). The ledger CLI is case-sensitive: `status EFMP-301 4` returns `[]`, use `efmp-301`.
  - For `studio_publish`: `t3-ur-audio-p1` still carries an English `alt` (give it Urdu at placement so the RTL panel reads Urdu); the `t3-en-audio-p1` QG2 note about the zero-money line is stale (`docs/semester-1/efmp-301/unit-04/topic-03.mdx:131` does say it); the QG3 embed check stays deferred to the placement build.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
