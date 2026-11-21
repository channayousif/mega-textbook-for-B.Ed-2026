---
id: 20261233
title: Teaser batch 3, six Shorts uploaded private (recipe v3, two-pass assembler)
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/teasers-batch3
user: M Yousif Channa
command: resume shorts batch 3
labels: [board-direct, studio-teaser, media-studio]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/recipes/teaser@3.json
  - specs/studio/teasers/{gqur-300,efmp-305,geng-301,gpks-402,gqur-301,gsos-301}.json
  - specs/studio/teasers/media-teasers.json
  - scripts/notebook-studio/assemble-teaser.mjs
  - scripts/media/recipes.mjs
  - scripts/crew/media.mjs
  - tests/unit/notebook-studio-teaser.test.mjs
  - .claude/skills/media-studio/SKILL.md
  - .claude/skills/studio-teaser/SKILL.md
  - specs/decisions/log.md
tests:
  - tests/unit/notebook-studio-teaser.test.mjs (32 pass)
  - npm run test:media (40 pass)
  - npm run test:crew (150 pass)
---

## Prompt

678 is not on the main, ci running, resume shorts batch 3

(follow-ups in the same session: "resume" three times after the session was killed; owner answer
to the length question: "Faster voice to fit 30 s")

## Response snapshot

- #678 had merged into the stacked branch after its base was already merged, so its commit was
  cherry-picked onto main as #679 (merged).
- Batch 3: saved the cross-post records and the GPKS-402 map-free shot-2 script, dropped the old
  uncommitted social-post change (superseded by #679), rebased on main. QG1 and QG2 (whisper,
  0.91-1.0) on the six unchecked takes (GQUR-301 shots 1-5, GPKS-402 shot 2 take 2), frame strips
  read, verdicts recorded; all six teasers to `clips-qa`.
- Assembly first failed QG1: every Short came out at the uncut 34.8 s because a fixed -35 dB
  silence threshold finds no pause in Veo Lite shots (ambience bed). Made the threshold adaptive
  (mean loudness minus 8 dB, within -35..-22). The Shorts then ran 30.4-33.1 s, still over the
  teaser@2 limit; the owner chose a faster voice, so recipe `teaser@3` (1.4x) was added and the
  six scripts relabelled (QG0 passes; label-only change, made after the owner's approval).
- The adaptive cut split shots into more segments, and the single ffmpeg graph then queued every
  later input's frames: it passed 3.5 GB and the session memory cap (systemd, agents/editor
  slices) killed it, taking the Claude session with it twice. Rewrote the assembler into two
  passes (each segment rendered alone from a seeked input, then the concat demuxer plus reminder,
  beat bed and whooshes): ffmpeg peaks at 809 MB. Assemblies ran in a 2.8 GB `systemd-run` scope
  inside the agents slice so an overrun kills only the job.
- Six Shorts at 27.5-29.9 s, QG1 encoded pass (-15.3 to -16.7 LUFS), 9-frame sheets and
  thumbnails read, whisper on the full GQUR-300 Short confirms no word cut (0.958). Uploaded
  private with playlist and thumbnail, QG3 pass:
  GQUR-300 uqt3LR8XIW0, EFMP-305 o-qh7iMDPA4, GENG-301 M-9XdegQL-0, GPKS-402 rn5h_utUprg,
  GQUR-301 kNFsqdPHyVU, GSOS-301 MYeopBflsA0.

## Outcome

- ✅ Impact: batch 3 waits only on the owner's spot-check; the assembler no longer needs more than
  about 1 GB, so the crew's `media_assemble` stage fits the host limits.
- 🧪 Tests: notebook-studio-teaser 32/32, test:media 40/40, test:crew 150/150.
- 📁 Files: recipe teaser@3, six scripts, ledger, assembler two-pass rewrite and adaptive silence
  threshold, crew brief recipe reference, skills, D-2026-0095.
- 🔁 Next prompts: owner watches the six; "approve" records gates.owner and publishes; then
  cross-posts per platform.
- 🧠 Reflection: a pipeline change that multiplies segments changes the memory shape of one big
  ffmpeg graph; measure peak memory after any cutter change.

## Handoff (for CEO and agents)

- Shipped / changed: six batch-3 Urdu teasers private on YouTube (IDs above), ledger at
  `qa3-pass`; recipe teaser@3 is now `CURRENT_TEASER_RECIPE` and the crew brief names it;
  assemble-teaser.mjs renders in two passes with an adaptive silence threshold.
- Decisions the team must respect: D-2026-0095 (voice 1.4x, 30 s enforced). Run heavy media jobs
  inside a capped `systemd-run --user --scope` in the agents slice so an overrun cannot kill the
  session.
- Pending / next owner: owner spot-check. Flags for the owner: GPKS-402 shot 1 has a large
  Pakistan flag behind the presenter (also on the thumbnail) and small flags in shot 4, against
  the no-flags imagery rule (QA1 pass-with-notes); its shot-2 museum portraits are AI-made.
  GSOS-301 shot 1 has semi-readable shop signs; EFMP-305 shot 3 a small blurred map-like puzzle.
  A GPKS-402 retake needs a new owner script approval (its script changed after approval). The
  ledger `script_sha256` of all six still names the approved text; the recipe label edit is
  recorded here. `crew media on` stays the owner's call.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: fixed silence threshold on ambient audio; unbounded ffmpeg filter
  queues; QA verdict passed in an earlier session missed a flag in shot 1.
- Graders run and results (PASS/FAIL): QG0 PASS x6, QG1 clip PASS x6, QG2 PASS x6, QG1 encoded
  PASS x6, QG3 PASS x6.
- Prompt variant (if applicable): teaser@3
- Next experiment (smallest change to try): add "no flags" to the recipe prompt tail in the next
  recipe version.
