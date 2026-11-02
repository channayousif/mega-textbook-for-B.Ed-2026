---
id: 20261107
title: Unblock EFMP-406 Unit 2 and Unit 6 batch conflicts
stage: general
date: 2026-11-02
surface: agent
model: claude-opus-5-5
feature: efmp-406
branch: crew/efmp-406-u06-author
user: M Yousif Channa
command: /crew-lead
labels: [board-direct, crew-lead]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-406/tasks.md
  - specs/content/efmp-406/reviews/unit-06/G2/20261102T171620632Z-gates.json
  - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T171620632Z/
tests:
  - npm run check:content (13/13 PASS on u02 alone, u06 alone, and u02+u06 combined on origin/main ddc9f9d9)
---

## Prompt

✅ efmp-406-u05-translate by codex: Preserved the complete Unit 5 Urdu mirror and relocated its handoff to restore the English G2 evidence binding.
🔴 efmp-406-u02-author still cannot join a batch after 5 merge fi, fix merge conflicts

## Response snapshot

Both efmp-406-u02-author and efmp-406-u06-author were gate_red after 5 merge fixes each. Every hourly batch
landed another EFMP-406 unit on the shared `specs/content/efmp-406/tasks.md` (and source notes), so each fix
was stale by the next batch. The lead merged origin/main into both branches by hand: u02 kept its newer Unit 5
G2 evidence path plus main's Unit 5 G3 advisory row; u06 kept main's Unit 5 rows and its own Unit 6 rows and
authoring handoff. A combined trial then showed the second loop: Unit 2's `unit-02-*` design files bind to
every unit's G2 manifest, so Unit 6's G2 evidence went stale once both met. The u06 branch was rebuilt on top
of u02 and `node scripts/prepare-gate-evidence.mjs --refresh-stale` re-evidenced Unit 6. Both branches were
pushed, the ~/crew-system local copies fast-forwarded, and both jobs set back to `ready`.

## Outcome

- ✅ Impact: two red EFMP-406 author jobs can join the next batch together.
- 🧪 Tests: check:content 13/13 PASS for each branch and the combination.
- 📁 Files: EFMP-406 tracker and a fresh Unit 6 G2 evidence set.
- 🔁 Next prompts: watch the next batch; fix the design-file binding so one unit stops invalidating the others.
- 🧠 Reflection: a per-branch merge fix cannot win against hourly batches on a shared tracker; trial the ready jobs together.

## Handoff (for CEO and agents)

- Shipped / changed: crew/efmp-406-u02-author (88604a0f) and crew/efmp-406-u06-author (contains u02) merged with main ddc9f9d9 and set `ready`.
- Decisions the team must respect: u06 now includes u02's commits, so they must batch together or u02 first; do not batch u06 without u02.
- Pending / next owner: lead/maintenance to make `unit-02-*` design files unit-scoped in the G2 manifest binding (lead). Owner: PR #411 (G3 sign-off) already conflicts with main on ten course trackers and needs a re-sync before merging.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: merge-fix budget spent on a moving shared tracker; G2 manifests cross-bound across units.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): have batch.mjs trial-merge all ready jobs of one course together before queuing per-branch fixes.
