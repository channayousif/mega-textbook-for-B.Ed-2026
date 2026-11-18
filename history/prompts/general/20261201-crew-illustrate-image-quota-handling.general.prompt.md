---
id: 20261201
title: Crew illustrate image quota handling
stage: general
date: 2026-11-16
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-illustrate-quota
user: M Yousif Channa
command: none
labels: [board-direct, crew, illustrate, quota]
links:
  spec: null
  ticket: null
  adr: history/adr/0029
  pr: null
files:
  - scripts/lib/image-quota.mjs
  - scripts/generate-illustration.mjs
  - scripts/crew/workers.mjs
  - scripts/crew/crew.mjs
  - tests/crew/image-quota.test.mjs
tests:
  - npm run test:crew (129/129 pass)
  - generate-illustration.mjs GISS-401 6 with an active quota record exits 3 without calling agy
---

## Prompt

the crew keeps pushing for failed raster image generation jobs by agy and creating prs for phr only with no output. fix it , add quota handling for images

## Response snapshot

Cause: agy's Gemini image quota (gemini-3.1-flash-image) was exhausted until 2026-11-17T11:00:06Z. Each
`illustrate` job ran `generate-illustration.mjs`, which exited 3, then agy committed its own PHR and
exited 0. `finishSuccess` saw a commit and counted the job as a success; the quota check in `reapOne` only
fires on a non-zero exit or no commit. The planner then queued `-r1` and the loop repeated: about 25
PHR-only batch PRs (#604-#628) merged on 2026-11-15/16.

Fix:
- `scripts/lib/image-quota.mjs`: host-wide record `~/.cache/mega-book/image-quota.json` (`resetAt`).
- `generate-illustration.mjs`: records the quota on QUOTA_EXHAUSTED, refuses (exit 3, no agy call) while
  the record is active unless `--force`, clears it after a real generation.
- crew: `launchQueued` holds `illustrate` jobs while the quota is active; `reapOne` requeues an illustrate
  job that hit the image quota and made nothing (resets its worktree, drops the PHR, no attempt spent, agy
  not cooled, records the reset from the handoff text if the script did not); `finishSuccess` rejects any
  job whose only output is under `history/prompts/`; the illustrate brief says commit nothing on exit 3;
  BOARD.md shows the image-quota hold.

## Outcome

- ✅ Impact: no more PHR-only illustrate PRs; illustrate waits for the image quota instead of burning runs.
- 🧪 Tests: npm run test:crew 129/129; manual early-exit check of generate-illustration.mjs.
- 📁 Files: one new lib, one new test, three edited scripts.
- 🔁 Next prompts: after merge, fast-forward the crew's local checkout so the tick runs the new code.
- 🧠 Reflection: "committed something" is not "did the work"; the PHR the worker writes must not count.

## Handoff (for CEO and agents)

- Shipped / changed: image-quota record and hold for `illustrate`; PHR-only output now fails every stage.
- Decisions the team must respect: an illustrate job never commits on an exhausted image quota; do not
  delete `~/.cache/mega-book/image-quota.json` to force runs, use `--force` only for a deliberate manual try.
- Pending / next owner: crew lead: sync the crew checkout after merge; GISS-401 U1-U6, GENG-301, GICT-300
  illustrations resume after 2026-11-17T11:00Z.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: success detection counted a worker-written PHR as output; text-quota detection
  ignored a separate image quota reported on exit 0.
- Graders run and results (PASS/FAIL): test:crew PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): surface the image-quota hold in the daily digest.
