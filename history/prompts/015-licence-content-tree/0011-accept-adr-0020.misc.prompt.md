---
id: 0011
title: Accept ADR-0020
stage: misc
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: adr/0020-accept
user: M Yousif Channa
command: merge 47 and accept the ADR
labels: ["adr-0020", "spec-015", "accepted", "t045"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/47
files:
 - history/adr/0020-content-tracks.md
 - specs/015-licence-content-tree/tasks.md
 - specs/015-licence-content-tree/validation.md
tests:
 - PR #47 CI CONCLUSION=success on ed9b148, the branch HEAD
 - npm run check:content (7/7)
---

## Prompt

merge 47 and accept the ADR

## Response snapshot

Waited for a real conclusion rather than merging on a pending run. PR #47's CI had been queued
behind an `in_progress` run on `main` for roughly 20 minutes - the `shared-supabase` concurrency
group with `cancel-in-progress: false` serializing them, working as designed. It returned
`CONCLUSION=success SHA=ed9b148`, which matched the branch HEAD, so the result covered the whole
stack rather than an earlier commit.

Merged as `23e5293`, then flipped ADR-0020 on main.

Followed the ADR-0019 house form rather than a bare status flip: the status line records **how**
acceptance happened, `Accepted (owner instruction 2026-09-13: "merge 47 and accept the ADR")`, and
the Feature line now names the implementing PR. For a decision that fixes URL structure and is not
reversible once candidates have bookmarked a location, the trail matters more than the word.

T045 closed. Feature 015 is **47 of 47**.

## Outcome

- ✅ Impact: the content-track decision is recorded as accepted with its provenance, and feature 015 is complete end to end.
- 🧪 Tests: PR #47 CI success on the branch HEAD; check:content 7/7 after the edit.
- 📁 Files: ADR-0020 status and feature line, tasks.md T045, validation.md closing section.
- 🔁 Next prompts: open the EFMP-408 content-spec PR off the updated main; then v4.0 and the freeze, which is what gates actual prose.
- 🧠 Reflection: the concurrency group made this look stuck when it was queued. Checking the queue rather than the single run is what distinguished the two.

## Evaluation notes (flywheel)

- Failure modes observed: a long-pending CI run that reads as stuck but is correctly serialized; the temptation to merge on "MERGEABLE / CLEAN" when that reflects mergeability, not test results.
- Graders run and results (PASS/FAIL): CI conclusion matched branch HEAD PASS; check:content PASS; 47/47 tasks PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none for this feature; the next real test is whether v4.0 lands without disturbing the walker, since both touch the same gate scripts.
