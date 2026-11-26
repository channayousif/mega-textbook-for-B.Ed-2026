---
id: crew-efpg-401-u00-teaser_clips
title: crew teaser_clips EFPG-401 unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpg-401
branch: crew/efpg-401-u00-teaser_clips
user: crew
command: crew teaser_clips
labels: ["crew", "claude_crew", "teaser_clips"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261295-efpg-401-teaser-clips.green.prompt.md
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u00-teaser_clips

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u00-teaser_clips`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved the efpg-401-ur script with `crew approve-script` (via openclaw at 2026-11-26T09:28:11.277Z, script sha256 174b861e2957d023e1851daaef9034db85d4b8f75f3f4592a5adcd3b92017931). If the ledger item is still `scripted`, record it first: `node scripts/notebook-studio/teaser.mjs advance efpg-401-ur script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"2026-11-26","note":"crew approve-script via openclaw"}}}'` (it refuses if the script changed). Then run `node scripts/media/teaser-clips.mjs efpg-401`: it makes every missing shot through gflow (recovering a clip Flow finished but did not report, never paying twice), records each take, and prints the QG1 result and the QG2 transcript match with a 3-frame strip. Read every strip image and transcript: fail a take with a drawn camera interface, readable text, a map or flag, wrong dress, or speech that misses the line; record each verdict with `node scripts/notebook-studio/teaser.mjs clipqa efpg-401-ur <shot> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"claude","notes":"..."}'`. Retake a failed shot once with `node scripts/media/teaser-clips.mjs efpg-401 --shots <n>` (at most two retakes per shot; never retake a shot because gflow timed out, the script recovers it). When every shot has a passing take, advance to `clips-generated` and then `clips-qa` with `{"gates":{"clips":{"verdict":"pass","by":"claude"}}}`. If teaser-clips.mjs exits 3, 4 or 5 (MEDIA-HOLD: quota, no producer, or held for the owner), stop: commit any takes it recorded, print its MEDIA-HOLD line as a CREW-HANDOFF line, and exit. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

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
- (efpg-401-u00-teaser_script, teaser_script, claude) `objectives` left out because `parseOverview` (scripts/notebook-studio/describe.mjs) doesn't read the overview's "## Course objectives" heading; adding them later is metadata only and does not reopen approval.
- (efpg-401-u00-teaser_script, teaser_script, claude) PHR id 20261273 was the next free id on origin/main when I committed; renumber it if a sibling branch merges the same id first.

## Response snapshot

Recorded the owner's script approval, generated and QA-passed all five EFPG-401 Urdu teaser shots
(one retake for a drawn REC overlay), advanced efpg-401-ur to clips-qa, and committed the ledger plus
PHRs.

## Outcome

- Impact: teaser_clips for EFPG-401 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14/14) in the job worktree.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the owner's script approval, generated and QA-passed all five EFPG-401
  Urdu teaser shots (one retake for a drawn REC overlay), advanced efpg-401-ur to clips-qa, and
  committed the ledger plus PHRs.
- Decisions the team must respect: shot 1 assembles from take 2 (`chosenTakes`); take 1 is the failed
  REC-overlay clip. Nothing was assembled, uploaded or published.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `assemble-teaser.mjs efpg-401 ur <out> 1 2 3 4 5` resolves the right take per shot via
    `chosenTakes`; shot 1 uses take 2.
  - Shots 2 and 3 carry sharp Urdu-like pseudo-text on a wall poster and a book cover; both passed as
    pseudo-script, and the owner may still reject them at spot-check.
  - Flow's WAF refused two submissions (`PUBLIC_ERROR_UNUSUAL_ACTIVITY`) and charged nothing; the
    journal recovery cleared them, so a WAF refusal is retryable, not a failed take.
  - PHR id 20261295 was the next free id on origin/main at commit time (20261273 was already taken).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none beyond the WAF refusals and the tool's default background time limit.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
