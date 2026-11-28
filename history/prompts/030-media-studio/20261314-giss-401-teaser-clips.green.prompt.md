---
id: 20261314
title: GISS-401 Urdu teaser clips (5/5 passing, one retake)
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/giss-401-u00-teaser_clips
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
  - history/prompts/030-media-studio/20261314-giss-401-teaser-clips.green.prompt.md
tests:
  - node scripts/media/teaser-clips.mjs giss-401 (exit 0)
  - node scripts/media/teaser-clips.mjs giss-401 --shots 5 (exit 0)
  - npm run check:content (14/14 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job giss-401-u00-teaser_clips

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u00-teaser_clips`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved the giss-401-ur script with `crew approve-script` (via web at 2026-11-27T20:17:01.093Z, script sha256 686d0c21bf9eb90bd2054dc9f1191e4831253a884a5872d24378ed23bf3c41e2). If the ledger item is still `scripted`, record it first: `node scripts/notebook-studio/teaser.mjs advance giss-401-ur script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew approve-script via web"}}}'` (it refuses if the script changed). Then run `node scripts/media/teaser-clips.mjs giss-401`: it makes every missing shot through gflow (recovering a clip Flow finished but did not report, never paying twice), records each take, and prints the QG1 result and the QG2 transcript match with a 3-frame strip. Read every strip image and transcript: fail a take with a drawn camera interface, readable text, a map or flag, wrong dress, or speech that misses the line; record each verdict with `node scripts/notebook-studio/teaser.mjs clipqa giss-401-ur <shot> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"claude","notes":"..."}'`. Retake a failed shot once with `node scripts/media/teaser-clips.mjs giss-401 --shots <n>` (at most two retakes per shot; never retake a shot because gflow timed out, the script recovers it). When every shot has a passing take, advance to `clips-generated` and then `clips-qa` with `{"gates":{"clips":{"verdict":"pass","by":"claude"}}}`. If teaser-clips.mjs exits 3, 4 or 5 (MEDIA-HOLD: quota, no producer, or held for the owner), stop: commit any takes it recorded, print its MEDIA-HOLD line as a CREW-HANDOFF line, and exit. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The GISS-401 teaser only: `specs/studio/teasers/giss-401.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (giss-401-u00-teaser_script, teaser_script, agy_claude) The overview uses "Course objectives" not "Course learning outcomes", so the objectives field is omitted (matches GICP-400 pattern). If the overview is later standardised, objectives can be added as metadata without reopening script approval.

## Response snapshot

The ledger item was still `scripted` and the script sha256 matched the approval, so the owner gate was
recorded first (state `script-approved`). The first clip run was stopped at the tool's 10-minute background
limit one minute after shot 1 was submitted; the resumed run recovered that clip from the gflow download
folder (`recovered: download folder`, media id 287b08db, no second charge) and generated shots 2 to 5.
Shot 5 take 1 was failed on review: frames 2 and 3 carried a drawn REC indicator with a red dot and
viewfinder/battery marks in the top corners. It was retaken once (`--shots 5`) and take 2 is clean. All
five shots now have a passing take; the item is `clips-qa`.

- Shot 1 take 1: QG1 pass, QG2 1.0, pass (recovered clip; presenter, plain green blackboard, plain book).
- Shot 2 take 1: QG1 pass, QG2 1.0, pass (dolly along desks; notebook pages blurred, no readable words).
- Shot 3 take 1: QG1 pass, QG2 1.0, pass (verandah tracking shot, plain closed notebooks).
- Shot 4 take 1: QG1 pass, QG2 0.933, pass (courtyard crane; whisper heard فروغ as فروق, the line is spoken).
- Shot 5 take 1: QG1 pass, QG2 0.929, fail (drawn REC viewfinder overlay). Shot 5 take 2: QG1 pass,
  QG2 1.0, pass (corridor CTA, phone with a dark blank screen).

## Outcome

- ✅ Impact: giss-401-ur reached `clips-qa` with a passing take for every shot; 60 credits spent
  (five first takes plus one retake) from a 534-credit balance on a2ahs-alpha.
- 🧪 Tests: teaser-clips exit 0 (full run) and exit 0 (shot 5 retake); check:content PASS (14/14).
- 📁 Files: specs/studio/teasers/media-teasers.json (ledger item giss-401-ur), this PHR.
- 🔁 Next prompts: the next job assembles the Short (`assemble-teaser.mjs giss-401 ur <out> 1 2 3 4 5`,
  which resolves shot 5 to take 2 through `chosenTakes`) and uploads it private.
- 🧠 Reflection: stopping a clip run is safe because the producer journals every submission before the
  MCP call and the next run adopts the finished file by folder mtime, so a tool timeout never becomes a
  second charge; the journal entry was `submitted` when the run was stopped and `done`/`recovered` on the
  resume.

## Handoff (for CEO and agents)

- Shipped / changed: giss-401-ur is `clips-qa`; the owner script gate, six takes and six QA verdicts are
  recorded in `specs/studio/teasers/media-teasers.json`. Media stays under
  `~/studio-media/teasers/giss-401/ur/` (not in git).
- Decisions the team must respect: shot 5 assembles from take 2 (`chosenTakes` picks the latest passing
  take); take 1 is the failed REC-overlay clip. Nothing was assembled, uploaded or published.
- Pending / next owner: the next job runs `assemble-teaser.mjs giss-401 ur <out> 1 2 3 4 5`, then QG1
  encoded, then a private upload; only the owner's `crew publish` may make it public. Shot 2's open
  notebook pages carry faint blurred marks (no readable words) and were passed; the owner may still reject
  at spot-check.
- Paperclip issues affected: none (crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: the tool's default 10-minute background limit stopped the first clip run after
  shot 1 was submitted; recovery adopted the finished clip from the gflow folder with no second charge.
  Veo Lite drew a REC viewfinder overlay on one take out of six (shot 5 take 1), which the strip review
  caught before assembly.
- Graders run and results (PASS/FAIL): QG1 pass x6; QG2 1.0, 1.0, 1.0, 0.933, 0.929(fail), 1.0;
  check:content PASS 14/14.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): run long clip generations with an explicit 2-hour background
  timeout, or in chunks of two shots, so a tool limit never interrupts a run; review the top corners of
  every strip first, since that is where Veo draws its viewfinder marks.
