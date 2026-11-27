---
id: 20261295
title: EFPG-401 Urdu teaser clips (5/5 passing, one retake)
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/efpg-401-u00-teaser_clips
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
  - history/prompts/030-media-studio/20261295-efpg-401-teaser-clips.green.prompt.md
tests:
  - node scripts/media/teaser-clips.mjs efpg-401 (exit 0)
  - node scripts/media/teaser-clips.mjs efpg-401 --shots 1 (exit 0)
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

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

The ledger item was still `scripted` and the script sha256 matched, so the owner approval was recorded
first (state `script-approved`). `teaser-clips.mjs efpg-401` made all five shots on gflow (veo_lite,
10 credits each). A first background run was killed by the tool's default 10-minute background limit
after shot 1; the resumed run (explicit 2-hour timeout) made shots 2 to 5 and recovered nothing twice.
Shot 2's first submission was refused by Flow's WAF (`PUBLIC_ERROR_UNUSUAL_ACTIVITY`, HTTP 403) and
was not charged; the retry of the retake hit the same WAF once and the next attempt succeeded, so the
WAF refusals cost no credits and no take. Shot 1 take 1 was failed on review: every frame carried a
drawn REC indicator, a battery icon and viewfinder corner brackets. It was retaken once (`--shots 1`)
and take 2 is clean. All five shots now have a passing take; the item is `clips-qa`.

- Shot 1 take 1: QG1 pass, QG2 1.0, fail (drawn REC viewfinder overlay). Shot 1 take 2: QG1 pass,
  QG2 1.0, pass-with-notes (red book cover carries sharp Urdu-like pseudo-script).
- Shot 2 take 1: QG1 pass, QG2 1.0, pass (dolly along desks, wall poster and notebooks pseudo-text).
- Shot 3 take 1: QG1 pass, QG2 1.0, pass (tracking shot, teacher in blue dupatta, picture cards).
- Shot 4 take 1: QG1 pass, QG2 0.882, pass (verandah crane, picture chart and speaker; whisper wrote
  audio-visual aids in Urdu script, the whole line is spoken).
- Shot 5 take 1: QG1 pass, QG2 1.0, pass (corridor CTA, phone with a dark blank screen).

## Outcome

- ✅ Impact: efpg-401-ur reached `clips-qa` with a passing take for every shot; 60 credits spent
  (five first takes plus one retake) from a 614-credit balance.
- 🧪 Tests: teaser-clips exit 0 (full run) and exit 0 (shot 1 retake); check:content PASS (14/14).
- 📁 Files: specs/studio/teasers/media-teasers.json (ledger item efpg-401-ur), this PHR.
- 🔁 Next prompts: the next job assembles the Short (`assemble-teaser.mjs efpg-401 ur <out> 1 2 3 4 5`,
  using the chosen takes, so shot 1 resolves to take 2) and uploads it private.
- 🧠 Reflection: Flow's WAF refused two submissions with `PUBLIC_ERROR_UNUSUAL_ACTIVITY` and charged
  nothing; the producer's journal recovery dropped the refused entry on the next run (the balance did
  not move), so a WAF refusal is safe to retry and must not be mistaken for a failed take.

## Handoff (for CEO and agents)

- Shipped / changed: efpg-401-ur is `clips-qa`; owner script gate, six takes and six QA verdicts are
  recorded in `specs/studio/teasers/media-teasers.json`. Media stays under
  `~/studio-media/teasers/efpg-401/ur/` (not in git).
- Decisions the team must respect: shot 1 assembles from take 2 (`chosenTakes` picks the latest
  passing take); take 1 is the failed REC-overlay clip. Nothing was assembled, uploaded or published.
- Pending / next owner: the next job runs `assemble-teaser.mjs efpg-401 ur <out> 1 2 3 4 5`, then QG1
  encoded, then a private upload; only the owner's `crew publish` may make it public. Two of the five
  shots (2 and 3) carry sharp Urdu-like pseudo-text on a wall poster and a book cover; both were passed
  as pseudo-script, not readable words, and the owner may still reject them at spot-check.
- Paperclip issues affected: none (crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: the tool's default 10-minute background limit killed the first clip run
  mid-way (the resumed run was safe because the producer journals every submission before the call and
  the ledger holds the recorded takes); Flow's WAF refused two submissions with no charge and the
  journal recovery cleared them on the next run.
- Graders run and results (PASS/FAIL): QG1 pass x6; QG2 1.0, 1.0(fail), 1.0, 1.0, 0.882, 1.0;
  check:content PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): run long clip generations with an explicit 2-hour
  background timeout, or in chunks of two shots, so a tool limit never interrupts a run; treat a Flow
  WAF refusal as retryable, not as a failed take.
