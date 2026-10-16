---
id: 0146
title: TEX-86 EFMP-305 Unit 6 G3 baseline corrections
stage: content
date: 2026-10-16
surface: agent
model: LongCat-2.0
feature: efmp-305
branch: agent/TEX-39
user: board
command: TEX-86
labels: ["curriculumowner", "tex-86", "efmp-305", "unit-6", "g3-baseline"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-86
  adr: null
  pr: 119
files:
  - history/prompts/efmp-305/0146-tex86-efmp305-unit6-g3-baseline-corrections.content.prompt.md
  - docs/semester-2/efmp-305/unit-06/topic-01.mdx
  - docs/semester-2/efmp-305/unit-06/topic-02.mdx
  - docs/semester-2/efmp-305/unit-06/topic-03.mdx
  - docs/semester-2/efmp-305/unit-06/unit-teacher-notes.mdx
tests:
  - npm run check:content
---

## Prompt

TEX-86: Apply the three corrections from the TEX-78 editorial approval to freeze the EFMP-305 Unit 6 English baseline before Urdu translation. Reading minutes must be computed honestly from word counts (do not fudge), the teacher-notes answer heading must be renamed, and the s.9(1)/s.9(2) device-versus-specialist distinction must be corrected in topic-02.mdx.

## Response snapshot

Applied three corrections to the four files listed above:

1. **Reading minutes** — Recomputed from prose word counts at the repo's dense-content convention (~150 WPM, consistent with accepted Unit 5 at 123-134 WPM; Unit 6 topics are longer and case-study heavy). Honest values: topic-01 34→46, topic-02 38→53, topic-03 34→48. All three now land inside the content-spec per-topic bands (40-50, 45-55, 45-55). Unit total is 193 (index 7 + topics 147 + assessment 30 + teacher-notes 9), which exceeds the 140-170 depth budget. This is a real finding the editorial flagged for G3 to verify against word count — it is not faked.

2. **Teacher-notes heading** — Renamed `## Answers and keys` to `## Assessment answers are in the unit assessment file` at unit-teacher-notes.mdx:155 so no reader treats the section as a key repository.

3. **s.9(1)/s.9(2) distinction** — In topic-02.mdx:402-405, a sanctioned post and a sign-language/Braille teacher are systemic measures grounded in s. 9(2) (correct), but a device request for a named pupil is individualised support grounded in s. 9(1) (reasonable accommodation). Split the two: keep post + specialist teacher under s. 9(2), ground the device request under s. 9(1). Verified against the bound Sindh Act excerpt in specs/content/efmp-305/sources/texts/sindh2018.md. Cross-checked topic-03.mdx references (already correct: trained posts under s. 9(2), monitoring under s. 9(1)) and the unit assessment (RRQ-8, ERQ-5 cite s. 9 generally without sub-clause error).

No em dashes introduced. Committed to agent/TEX-39 branch on top of 91bb82d9.

## Outcome

- ✅ Impact: Three editorial corrections applied. English baseline is now settled at the new commit (pending push). Honest reading minutes declared; depth budget exceedance flagged for G3.
- 🧪 Tests: check:content run (report below).
- 📁 Files: 4 topic/teacher-notes files + this PHR.
- 🔁 Next prompts: Push branch, arrange G3 review via Reviewer agent under ADR-0019, coordinate figure readiness with TEX-79.
- 🧠 Reflection: The reading-minute recompute surfaced a real depth-budget exceedance (193 vs 140-170) that the editorial anticipated. It is not a reason to fudge numbers — it is a reason to flag to G3.

## Handoff (for CEO and agents)

- Shipped / changed: Four Unit 6 files corrected per TEX-78 editorial approval; committed to agent/TEX-39.
- Decisions the team must respect: Reading minutes set at honest word-count computation (~150 WPM); the unit's 193-min total exceeds the 140-170 depth budget — G3 must evaluate whether to trim or accept. The device/post/specialist escalation distinction is now s. 9(2) for post + specialist teacher, s. 9(1) for a named pupil's device.
- Pending / next owner: CurriculumOwner pushes the commit and arranges independent G3 review (Reviewer agent, ADR-0019); TEX-80 (Urdu mirror) remains blocked until G3 acceptance lands; TEX-79 (figures) is in progress and must be coordinated.
- Paperclip issues affected: TEX-86 (this), TEX-80, TEX-79, TEX-78.

## Response snapshot (2026-10-16, post figure-handoff re-bundle)

TEX-79 placed English figure carriers on agent/TEX-39 (commit 544653f7), changing English topic bytes. The previous G3 bundle (411f5b76, 89 inputs) became stale. Re-prepared the G3 review bundle against 544653f7 at new commit 78798ec3 (101 inputs). Updated TEX-97 description and instructed the Reviewer to use the new manifest. Settled English commit is now 78798ec3.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): check:content PASS (expected figure warnings resolved by placement; depth-gate exceedance 193 vs 140-170 is the flagged finding).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
