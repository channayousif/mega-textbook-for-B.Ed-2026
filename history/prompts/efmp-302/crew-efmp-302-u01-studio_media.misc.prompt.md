---
id: crew-efmp-302-u01-studio_media
title: crew studio_media EFMP-302 unit 1
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-302
branch: crew/efmp-302-u01-studio_media
user: crew
command: crew studio_media
labels: ["crew", "claude_crew", "studio_media"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-302/crew-efmp-302-u01-studio_media.misc.prompt.md
 - specs/studio/efmp-302/media-unit-01.json
 - specs/studio/efmp-302/unit-01-mnemonics.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u01-studio_media

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u01-studio_media`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Run the Study Studio of EFMP-302 Unit 1 (studio-media skill): audio, video, mind maps and study guides. This job holds the SECOND NotebookLM account (lane notebook2): pass `--profile second` to every `nlm` command, and if you use the NotebookLM MCP tools, first call `profile` with action `switch` and name `second` (never `make_default`). Create the notebook in that account; never use the default profile in this job. This unit has no Study Studio ledger yet: plan it first (studio-media skill, step 1) with the owner-approved LEAN recipe (`specs/029-notebook-studio/rollout.md`, 2026-11-27). For every topic of the unit, plan one audio brief (part 1) in English with `node scripts/notebook-studio/media-ledger.mjs plan EFMP-302 1 --json '...'` (prompt `specs/studio/prompts/audio.md`, a title and alt text from the topic itself), and the same in Urdu when the topic's Urdu mirror exists. Plan ONE video per language for the whole unit, recorded on topic 1 (prompt `specs/studio/prompts/video-unit.md`, titled as the unit overview, with the whole unit as its source pack); Urdu only when every topic of the unit has its Urdu mirror. Plan no per-topic videos and no "go deeper" parts unless the owner names this unit for the full recipe. For every topic also plan one English mind map (kind `mindmap`, prompt `specs/studio/prompts/mindmap.md`), and plan ONE study guide per language for the whole unit on topic 1 (kind `studyguide`, prompt `specs/studio/prompts/study-guide.md`; Urdu only when every topic has its Urdu mirror). Build the source pack and the notebook as the skill says. Read `node scripts/notebook-studio/media-ledger.mjs status EFMP-302 1` and carry every audio and video item that is not blocked from its current state up to `qa3-pass`: generate, download, QG1, encode, QG2 (your own transcript check against the topic text), upload PRIVATE, QG3. Mind maps and study guides take the short path `planned` -> `generated` -> `downloaded` -> `qa2-pass` -> `placed` and are never uploaded: create them with NotebookLM (`nlm mindmap create <notebook> --title "<topic title>"`; `nlm report create <notebook> --format 'Study Guide'` in English, `--format 'Create Your Own' --prompt "<study-guide prompt + Urdu register suffix>"` in Urdu), download them under ~/studio-media/efmp-302/unit-01/, and for QG2 check every node or section against the topic text. For a mind map write `specs/studio/efmp-302/unit-01-topic-NN-mindmap-labels.json` (`en_fix` for corrected labels, `ur` with an Urdu label for every node, `ur_title`). At `qa2-pass` run `node scripts/notebook-studio/place-media.mjs efmp-302 1`, which cleans each study guide of answer and rubric sections, writes the files under `static/studio/`, adds the manifest rows and advances them to `placed`; then run `node scripts/check-studio-manifest.mjs`. Never edit the ledger by hand; every change goes through `node scripts/notebook-studio/media-ledger.mjs advance`. Before every NotebookLM `studio_create` run `node scripts/media/pacing.mjs check nlm2.studio`: on `hold`, create nothing more, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful creation run `node scripts/media/pacing.mjs record nlm2.studio`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. A hold is normal: commit what you advanced and stop with the CREW-HANDOFF line; the crew resumes in the next media hours. When every audio and video item is at `qa3-pass` (and every mind map and study guide `placed`), run `node scripts/notebook-studio/media-ledger.mjs sheet EFMP-302 1` and print one CREW-HANDOFF line with the private links the owner should watch and "reply `crew approve-studio EFMP-302 1`". If `nlm` reports expired cookies, stop and print one CREW-HANDOFF line asking the owner to run `nlm login --profile second`; commit nothing else. Commit `specs/studio/efmp-302/media-unit-01.json`, any placed mind map and study guide files, their labels files and manifest rows, with your PHR. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-media/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 1 Study Studio only: `specs/studio/efmp-302/media-unit-01.json`, the unit's manifest `specs/studio/efmp-302/unit-01.json`, its mind map labels files `specs/studio/efmp-302/unit-01-topic-NN-mindmap-labels.json` and the placed mind map and study guide files under `static/studio/efmp-302/unit-01/`, plus your PHR. Audio and video files live under ~/studio-media and never enter git.

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
- (efmp-302-u01-flashcards, flashcards, claude) `node scripts/build-studio-index.mjs` rewrites tracked, git-ignored files under `static/studio/flashcards/` for other courses; restore them with `git checkout -- static/studio/flashcards` before committing.
- (efmp-302-u01-flashcards, flashcards, claude) EFMP-302 U1's G3 en-review is still stale from the earlier fix job; this deck is outside the review evidence and does not change it.
- (efmp-302-u01-fix, fix, opencode) EFMP-302 Unit 1's G3 en-review is now stale and needs a fresh independent review run (ADR-0019).

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Planned and built the EFMP-302 Unit 1 Study Studio on the second NotebookLM account, carried six audio briefs through QG1/encode/QG2 with the first uploaded private at `qa3-pass`, and committed the ledger, mnemonics and PHR.

## Outcome

- Impact: studio_media for EFMP-302 Unit 1 by claude_crew (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned and built the EFMP-302 Unit 1 Study Studio on the second NotebookLM account, carried six audio briefs through QG1/encode/QG2 with the first uploaded private at `qa3-pass`, and committed the ledger, mnemonics and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Both lanes are at their Pacific-day caps (`nlm2.studio` 6/6, `youtube.upload` 4/4, held until 2026-11-28T19:00Z), so the ten still-`planned` items (t4 audios, both unit videos, four mind maps, two study guides) resume next media day; the five `qa2-pass` briefs are encoded and only need an upload slot.
  - The owner can watch the one ready item now, https://youtu.be/1EDcts9vRag, but `crew approve-studio efmp-302 1` should wait until the remaining audio and video items reach `qa3-pass`; no EFMP-302 video playlist exists, so the videos go up without one.
  - The second `nlm` profile's cookies expire within minutes, so refresh before each NotebookLM batch (`sh .crew/nlm-refresh.sh`, then `refresh_auth`); the Urdu briefs' transcripts come back in Devanagari and carry an `urdu_flag` for the owner's ear.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
