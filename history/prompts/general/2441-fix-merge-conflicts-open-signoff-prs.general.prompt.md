---
id: 2441
title: Fix merge conflicts on open G3 sign-off PRs
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/g3-signoff-20261102T143309Z, crew/g3-signoff-20261102T213059Z, crew/g3-signoff-20261102T214514Z
user: M Yousif Channa
command: none
labels: [board-direct, merge-conflict, g3-signoff]
links:
  spec: null
  ticket: null
  adr: null
  pr: "#411, #419, #420"
files:
  - specs/content/*/tasks.md (G3 tracker rows, union-merged)
tests:
  - npm run check:content (13/13 pass on each branch)
---

## Prompt

fix merge conflicts for open prs

## Response snapshot

Three open PRs (#411, #419, #420, all G3 sign-off desk exports) were CONFLICTING with main.
Merged origin/main into each branch. Every conflict was in an append-only course tracker
(`specs/content/<course>/tasks.md`): both sides appended G3 desk rows citing different ledger
rows. Resolved by keeping both sides (union), ordered chronologically by desk timestamp so the
newest decision is last: for #411 (142352Z) the branch rows precede main's 211054Z rows; for
#419 (212740Z) and #420 (213256Z) main's rows come first. Diff against main is additive only.

## Outcome

- ✅ Impact: #411, #419, #420 mergeable again; no tracker row dropped.
- 🧪 Tests: npm run check:content 13/13 on all three merged branches.
- 📁 Files: tracker tasks.md files for 13-14 courses per PR; this PHR.
- 🔁 Next prompts: owner merges the PRs; merge order does not matter, but each later merge
  may re-conflict on the same trackers and need the same union resolution.
- 🧠 Reflection: desk exports for overlapping units keep colliding on shared trackers.

## Handoff (for CEO and agents)

- Shipped / changed: main merged into the three sign-off branches, conflicts union-resolved, pushed.
- Decisions the team must respect: tracker rows are append-only; never drop either side of a
  sign-off conflict. Several units now carry more than one desk decision (e.g. #411 and the
  already-merged #417 both sign EFMP-301 U2 with different ledger rows); the latest row wins.
- Pending / next owner: owner to merge #411, #419, #420 (re-resolve if one merge re-conflicts another).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: sibling desk-export PRs conflict on every shared tasks.md.
- Graders run and results (PASS/FAIL): check:content PASS (x3).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a `merge=union` gitattribute for `specs/content/*/tasks.md`.
