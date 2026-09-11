---
id: 0008
title: Merge 26 once CI is green
stage: green
date: 2026-09-10
surface: agent
model: claude-opus-5
feature: none
branch: main
user: channayousif@gmail.com
command: (chat)
labels: ["merge", "ci", "spec-004"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/26
files:
 - history/prompts/general/0007-merge-pr-30-and-26.general.prompt.md
 - history/prompts/general/0008-merge-26-on-green.general.prompt.md
tests:
 - CI run 34560453188 (build: success, e2e: success)
---

## Prompt

merge #26 once CI is green

## Response snapshot

CI run 34560453188 on commit `10904de` came back `build: success | e2e: success`. PR #26 was
`MERGEABLE / CLEAN` against the post-#30 `main`, and was merged with a merge commit; the
`fix/unit-mark-studied-hydration` branch was deleted.

`main` now carries the Spec 004 FR-006 read-back: a student who marks a unit studied sees it
as studied on every subsequent load, which was the user's reported bug #1.

Housekeeping: #30 and #26 each carried a PHR numbered `0006`
(`0006-adopt-revised-board-scheme-2026` and `0006-merge-pr-30-and-26`), which only collided
once both merged. The latter was renumbered to `0007` on `main` per the CLAUDE.md rule
("on collision, increment again").

## Outcome

- ✅ Impact: user-reported bug #1 fixed on `main`. Both requested PRs (#30, #26) merged.
- 🧪 Tests: CI build + e2e green; locally `npm test` 136/136, `tsc` clean, the self-mark e2e
  spec passing against the live Supabase.
- 📁 Files: 1 PHR renumbered, 1 PHR added.
- 🔁 Next prompts: #27 (Spec 012 visual density) -> then retarget #28 to main; #29 (Spec 011
  dashboards) after migrations 0038-0041 are deployed and its `build: failure` is diagnosed.
- 🧠 Reflection: PHR IDs allocated on parallel branches collide at merge, not at write time.
  Worth checking `main` for the next free ID rather than the current branch.

## Evaluation notes (flywheel)

- Failure modes observed: PHR ID collision across concurrently open branches.
- Graders run and results (PASS/FAIL): CI build PASS, CI e2e PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): have the PHR ID allocator consult `origin/main`
  plus all open branches rather than the working tree alone.
