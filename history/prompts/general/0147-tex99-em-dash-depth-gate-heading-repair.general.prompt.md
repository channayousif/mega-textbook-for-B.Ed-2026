---
id: 0147
title: TEX-99 em-dash and depth-gate heading repair on agent/TEX-40
stage: general
date: 2026-10-16
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-40
user: M Yousif Channa
command: paperclip-heartbeat
labels: ["curriculumowner", "tex-99", "efmp-303", "unit-4", "formatting-repair"]
links:
  spec: null
  ticket: TEX-99
  adr: null
  pr: 120
files:
 - docs/semester-2/efmp-303/unit-04/topic-02.mdx
 - history/prompts/general/0147-tex99-em-dash-depth-gate-heading-repair.general.prompt.md
tests:
 - check:no-answer-keys PASS
 - validate:content PASS
 - no-em-dash: grep U+2014 exit 1 (clean)
---

## Prompt

[TEX-99 reopened via comment from BilingualAuthor on TEX-65] The reviewed parity check exposed two English deterministic failures from TEX-99:
1. topic-02 uses "## A classroom scenario" but depth-gate requires "## A real classroom situation".
2. Line 70 has U+2014 rejected by no-em-dash.
Please make a bounded formatting repair preserving explicit hypothetical framing and all meaning on agent/TEX-40 / PR #120.

## Response snapshot

Checked out agent/TEX-40 via the existing TEX-65 worktree (BilingualAuthor already had it checked out with uncommitted Urdu work; reused it to avoid a second worktree on the same branch).

Edit 1 — topic-02.mdx line 20: changed heading from "## A classroom scenario" back to "## A real classroom situation" (the depth-gate's exact required string). Hypothetical body text ("Consider the following scenario: a provincial government...") left unchanged.

Edit 2 — topic-02.mdx line 70: replaced the U+2014 em dash ("released — and") with a spaced hyphen ("released - and"). No meaning change.

Committed only docs/semester-2/efmp-303/unit-04/topic-02.mdx (BilingualAuthor's uncommitted Urdu files in the same worktree were left untracked and untouched). Pushed to agent/TEX-40. Commit 5eb57728.

Gates: check:no-answer-keys PASS, validate:content PASS, grep U+2014 clean.

## Outcome

- ✅ Impact: depth-gate heading restored and em-dash removed; TEX-65 build/render checks can pass against 5eb57728. Hypothetical framing and funding/release logic fully preserved.
- 🧪 Tests: check:no-answer-keys PASS; validate:content PASS; no-em-dash clean.
- 📁 Files: topic-02.mdx (heading + one dash); this PHR.
- 🔁 Next prompts: TEX-65 BilingualAuthor can re-run render/build checks against 5eb57728.
- 🧠 Reflection: the depth-gate pins the exact heading string, so even a well-intentioned synonym ("classroom scenario") breaks the gate — gate-sensitive strings must be left byte-identical unless the gate itself is changed.

## Handoff (for CEO and agents)

- Shipped / changed: commit 5eb57728 on agent/TEX-40 (PR #120); heading restored to "## A real classroom situation"; em dash on line 70 replaced with hyphen.
- Decisions the team must respect: hypothetical vignette framing is preserved; heading string is now gate-compliant. Do not rename the heading again without checking the depth-gate.
- Pending / next owner: TEX-65 BilingualAuthor re-run render/build checks against 5eb57728.
- Paperclip issues affected: TEX-99, TEX-65, TEX-58.

## Evaluation notes (flywheel)

- Failure modes observed: a content edit (synonym heading) broke a deterministic gate that pins an exact string; an em dash (U+2014) slipped into prose and failed the no-em-dash check. Both are lint-class failures, caught only by the build/render parity check downstream.
- Graders run and results (PASS/FAIL): check:no-answer-keys PASS; validate:content PASS; no-em-dash PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add the depth-gate heading strings to a lint rule or checklist so synonym edits are caught at authoring time, not at render time.
