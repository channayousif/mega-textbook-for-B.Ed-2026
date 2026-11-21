---
id: 20261228
title: Media Studio crew stages
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio-us1
user: M Yousif Channa
command: none
labels: [board-direct, media-studio, crew]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/crew/media.mjs
  - scripts/crew/crew.mjs
  - scripts/crew/planner.mjs
  - scripts/crew/workers.mjs
  - scripts/crew/state.mjs
  - scripts/media/teaser-clips.mjs
  - scripts/notebook-studio/teaser.mjs
  - tests/crew/media-stages.test.mjs
  - tests/crew/worker-chains.test.mjs
  - ops/crew/README.md
  - specs/030-media-studio/tasks.md
tests:
  - npm run test:crew (147 pass, 8 new)
  - npx vitest run (47 files, 525 tests pass)
  - node scripts/check-docs-sync.mjs (pass)
  - crew.mjs plan --dry-run on a copy of the live crew state with media on (queues one teaser_script, corpus focus unchanged)
  - no change under scripts/lib, scripts/check-*.mjs, contracts or specs/content
---

## Prompt

will be merged on green, continue with stage 3

## Response snapshot

Implemented Feature 030 US1 (T029-T034): crew stages teaser_script, teaser_clips, media_assemble,
media_publish and audio_overview in a pure module (scripts/crew/media.mjs) wired into the planner,
briefs, launch guard, reaper and owner commands. Owner gates in code: `crew approve-script` records
the script hash; teaser_clips is planned and launched only while the hash still matches, and the
teaser ledger itself now refuses a script or publish gate not passed by the owner and a clip for a
changed script; media_publish is queued only by `crew publish` and is the only brief that may set a
video public. One media job at a time, at most six scripts awaiting the owner, teaser_clips held
(no attempt spent) while gflow is offline or out of quota, quota recorded from MEDIA-HOLD lines.
A clip driver (scripts/media/teaser-clips.mjs) runs the producers, records takes under the ledger
lock and pre-checks QG1/QG2. Media stages are off until `crew media on`.

## Outcome

- ✅ Impact: the crew can draft, generate, assemble and upload private teasers end to end, with the owner's approval and publish steps enforced in code.
- 🧪 Tests: crew 147/147 (8 new), vitest 525/525, docs-sync pass, dry-run plan on live state.
- 📁 Files: crew media module and wiring, clip driver, owner-only ledger gates, tests, crew README.
- 🔁 Next prompts: merge #672 and this PR; land the batch-3 teasers branch; then `crew media on`. Next stage: US3 status view (T035-T037).
- 🧠 Reflection: a test that calls a producer must point its quota file at a temp path; one run wrote a 2099 gflow quota into the host cache (removed at once).

## Handoff (for CEO and agents)

- Shipped / changed: scripts/crew/media.mjs; media stages in workers.mjs, crew.mjs (plan, launch guard, reap, commands, BOARD.md section); teaser.mjs owner-only gates, scriptSha, rehash; scripts/media/teaser-clips.mjs.
- Decisions the team must respect: media stages stay off until the owner says `crew media on`; only the owner's `crew approve-script` lets clips spend credits; only `crew publish` lets a video go public; a script edited after approval needs a new approval; clip/upload stages run only on the claude worker.
- Pending / next owner: owner merges #672 then this PR; batch-3 teasers PR must land before `crew media on` (else GQUR-300 and five others are redrafted); Claude continues with US3.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: worker-chains test pins every stage chain (updated); a producer test leaked a quota record into ~/.cache (fixed with MEGA_BOOK_MEDIA_QUOTA_FILE in the test).
- Graders run and results (PASS/FAIL): test:crew PASS; vitest PASS; docs-sync PASS; dry-run plan PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run one teaser_clips job live on a batch-3 retake once the tunnel is up.
