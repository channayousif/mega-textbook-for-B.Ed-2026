---
id: 20261283
title: EFMP-407 Urdu teaser clips (5/5 passing, one retake)
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/efmp-407-u00-teaser_clips
user: crew
command: .crew/brief.md
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - history/prompts/030-media-studio/20261283-efmp-407-teaser-clips.green.prompt.md
tests:
  - node scripts/media/teaser-clips.mjs efmp-407 (exit 0, then exit 0 for the shot 3 retake)
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job efmp-407-u00-teaser_clips

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u00-teaser_clips`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved the efmp-407-ur script with `crew approve-script` (via openclaw at 2026-11-26T09:28:10.543Z, script sha256 c4590a70ac6e9608e03150952efaeba6550f88f5ad53b2f9cfb6c9241acad874). If the ledger item is still `scripted`, record it first: `node scripts/notebook-studio/teaser.mjs advance efmp-407-ur script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"2026-11-26","note":"crew approve-script via openclaw"}}}'` (it refuses if the script changed). Then run `node scripts/media/teaser-clips.mjs efmp-407`: it makes every missing shot through gflow (recovering a clip Flow finished but did not report, never paying twice), records each take, and prints the QG1 result and the QG2 transcript match with a 3-frame strip. Read every strip image and transcript: fail a take with a drawn camera interface, readable text, a map or flag, wrong dress, or speech that misses the line; record each verdict with `node scripts/notebook-studio/teaser.mjs clipqa efmp-407-ur <shot> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"claude","notes":"..."}'`. Retake a failed shot once with `node scripts/media/teaser-clips.mjs efmp-407 --shots <n>` (at most two retakes per shot; never retake a shot because gflow timed out, the script recovers it). When every shot has a passing take, advance to `clips-generated` and then `clips-qa` with `{"gates":{"clips":{"verdict":"pass","by":"claude"}}}`. If teaser-clips.mjs exits 3, 4 or 5 (MEDIA-HOLD: quota, no producer, or held for the owner), stop: commit any takes it recorded, print its MEDIA-HOLD line as a CREW-HANDOFF line, and exit. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

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
- (efmp-407-u00-teaser_script, teaser_script, claude) `objectives` omitted because `parseOverview` (scripts/notebook-studio/describe.mjs) needs "## Course learning outcomes" but the EFMP-407 overview says "## Learning outcomes"; adding them later is metadata only and does not reopen approval.
- (efmp-407-u00-teaser_script, teaser_script, claude) PHR id 20261245 was the next free id on origin/main at commit time; renumber if a sibling branch merges the same id first.

## Response snapshot

The ledger item was still `scripted` and the script sha256 matched, so the owner approval was
recorded first (state `script-approved`). `teaser-clips.mjs efmp-407` made all five shots on gflow
(veo_lite, 10 credits each, 50 total). A first background run was killed by the tool's 10-minute
background limit after shot 2; the resumed run made shots 3, 4 and 5 and recovered nothing twice
(the journal showed no unsubmitted duplicate). Shot 3 take 1 was failed on review: every frame
carried a drawn REC indicator, a battery icon and viewfinder corner brackets. It was retaken once
(`--shots 3`), and take 2 is clean. All five shots now have a passing take; the item is `clips-qa`.

- Shot 1 take 1: QG1 pass, QG2 1.0, pass (presenter with a sapling in a school garden).
- Shot 2 take 1: QG1 pass, QG2 1.0, pass (pupils at desks with leaves and plants).
- Shot 3 take 1: QG1 pass, QG2 1.0, fail (REC viewfinder overlay). Shot 3 take 2: QG1 pass,
  QG2 0.944, pass.
- Shot 4 take 1: QG1 pass, QG2 0.941, pass (courtyard planting, crane).
- Shot 5 take 1: QG1 pass, QG2 1.0, pass (corridor CTA with a blurred phone screen).

## Outcome

- ✅ Impact: efmp-407-ur reached `clips-qa` with a passing take for every shot; 60 credits spent
  (five first takes plus one retake), gflow balance 674 before the run.
- 🧪 Tests: teaser-clips exit 0 (full run) and exit 0 (shot 3 retake); check:content PASS.
- 📁 Files: specs/studio/teasers/media-teasers.json (ledger item efmp-407-ur), this PHR.
- 🔁 Next prompts: the next job assembles the Short (`assemble-teaser.mjs efmp-407 ur <out> 1 2 3 4 5`,
  using the chosen takes, so shot 3 resolves to take 2) and uploads it private.
- 🧠 Reflection: Veo Lite still draws a REC viewfinder overlay on about one shot in five even with the
  "no camera interface" prompt, so a human look at every strip is what catches it.

## Handoff (for CEO and agents)

- Shipped / changed: efmp-407-ur is `clips-qa`; owner script gate, five takes and five QA verdicts are
  recorded in `specs/studio/teasers/media-teasers.json`. Media stays under
  `~/studio-media/teasers/efmp-407/ur/` (not in git).
- Decisions the team must respect: shot 3 assembles from take 2 (`chosenTakes` picks the latest
  passing take); take 1 is the failed REC-overlay clip. Nothing was assembled, uploaded or published.
- Pending / next owner: the next teaser_clips/assemble job runs `assemble-teaser.mjs` with
  `1 2 3 4 5`, then QG1 encoded, then a private upload; only the owner's `crew publish` may make it
  public. The daily youtube.upload channel is at its 4/4 cap until 2026-11-26T19:00:00Z, so an upload
  attempt before then will hold.
- Paperclip issues affected: none (crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: the tool's 10-minute background limit killed the first clip run mid-way;
  resuming was safe because the producer journals every submission before the call and the ledger
  holds the recorded takes, so no clip was paid for twice.
- Graders run and results (PASS/FAIL): QG1 pass x6; QG2 1.0, 1.0, 1.0(fail), 0.944, 0.941, 1.0;
  check:content PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): run long clip generations with an explicit 2-hour
  background timeout, or in chunks of two shots, so a tool limit never interrupts a run.
