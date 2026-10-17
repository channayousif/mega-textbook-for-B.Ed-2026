---
id: 0143
title: TEX-109 EFMP-305 U5 RRQ 6 accommodations-escalation ruling
stage: general
date: 2026-10-16
surface: agent
model: LongCat-2.0
feature: none
branch: agent/TEX-39
user: M Yousif Channa
command: paperclip-agent-wake
labels: ["paperclip", "curriculumowner", "tex-109", "efmp-305", "content-fix"]
links:
  spec: null
  ticket: TEX-109
  adr: null
  pr: 119
files:
  - docs/semester-2/efmp-305/unit-05/unit-assessment.mdx
  - history/prompts/general/0143-tex109-efmp305-u5-rrq6-accommodations-escalation-ruling.general.prompt.md
tests:
  - npm run check:no-em-dash (PASS)
  - npm run check:no-answer-keys (PASS)
  - npm run check:content EFMP-305 specific gates (concept-graph 9-item count pre-existing, no new failures from this edit)
---

## Prompt

[TEX-109 wake payload] Settle a coherent English RRQ 6 and model answer, preserving the teaching distinction between classroom accommodations and a prescribed hearing aid requiring specialist assessment/escalation. Existing agent/TEX-39 / draft PR #119 only; preserve current Urdu draft files and coordinate serial branch access.

At settled source 5d695685, docs/semester-2/efmp-305/unit-05/unit-assessment.mdx, restricted-response question 6 asks for six accommodations and which of THEM is the one genuinely requiring money. Its model answer lists six: front seat; teacher facing class; written instructions (chalk cost); rotating partner; visual support (about Rs 70); adapted assessment. Then it names a prescribed hearing aid, absent from those six, as the money item and awards one mark for it. A student following the question cannot identify that seventh item from the requested list. The chart/chalk cost also requires distinguishing minor classroom consumables from a genuinely resourced escalation.

Owner question: should RRQ 6 explicitly ask for six classroom accommodations PLUS a separate prescribed hearing-aid escalation, or should the six-item answer itself be revised? Choose and correct the English question/answer/scoring coherently; do not let the Urdu translator silently change the task. Return exact corrected commit and any review-freshness requirement. The Urdu draft currently mirrors the unresolved wording and remains draft. TEX-106 resolved the earlier four-actions motif; this is a separate newly translated assessment mismatch. TEX-107 remains the independent Units 1-3 G3 prerequisite.

## Response snapshot

Read the defect at commit 5d695685 on the assessment file (RRQ 6 question lines 203-206, model answer lines 318-327). Confirmed the mismatch: the question says "identify which of them" (of the six accommodations) is the money item, but the model answer identifies a prescribed hearing aid that is NOT among the six listed accommodations. A student cannot derive that seventh item from the list.

Curriculum ruling: Option A (ask for six classroom accommodations, then separately name the escalation item). The unit teaches a deliberate boundary: classroom accommodations are changes a teacher/school can make within a week at trivial or no cost (front seat, facing class, written instructions, rotating partner, hand-drawn charts, adapted assessment), while a prescribed hearing aid is a fundamentally different category requiring specialist audiological assessment and written escalation. Option B (folding the hearing aid into the accommodation list) would blur that teaching distinction.

Edited the question to: "List six classroom accommodations... state what each costs, and name the one provision for this pupil that is not a classroom accommodation but a prescribed device requiring specialist assessment. Explain why that provision is an escalation rather than a classroom change."

Edited the model answer to: list the six accommodations with costs, explicitly note chalk and chart paper as "minor classroom consumables, not a resourced escalation," then identify the prescribed hearing aid as the escalation item requiring specialist assessment, with the mark scheme kept coherent (1 mark per accommodation with cost stated, max 4; 1 mark for identifying the hearing aid as the escalation requiring specialist assessment).

Committed as 9b14d48e on agent/TEX-39, pushed to update draft PR #119.

## Outcome

- ✅ Impact: RRQ 6 question, model answer, and mark scheme are now internally consistent. The six accommodations are all classroom-level changes with stated costs (chalk and chart paper flagged as minor consumables). The prescribed hearing aid is correctly positioned as a separate escalation item a student can identify from the question. Mark scheme coherent with the question. Teaching distinction between classroom accommodation and specialist escalation preserved.
- 🧪 Tests: check:no-em-dash PASS, check:no-answer-keys PASS. check:content EFMP-305 concept-graph 9-item count is a pre-existing gate miscount (RRQs 1-10 all present; my edit touched only wording, not structure), no new failures introduced.
- 📁 Files: docs/semester-2/efmp-305/unit-05/unit-assessment.mdx (question + answer + mark scheme), this PHR.
- 🔁 Next prompts: UR assessment for EFMP-305 Unit 5 (TEX-80 remaining work) to be translated from the corrected English source once it reaches that unit. Urdu currently has no U5 assessment file (only index, topic-01, topic-02 translated per TEX-106 PHR). No banner change — U5 English remains in draft pending TEX-107 G3 review.
- 🧠 Reflection: This defect is the same class as TEX-106 — a question that points at "which of them" referencing an item the student never listed. The fix pattern is the same: make the question and answer enumerate the same set of items. The chalk/Rs 70 "cost" detail needed explicit framing as minor consumables so a student does not misread them as the escalation.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 U5 RRQ 6 question, model answer, and mark scheme corrected. Commit 9b14d48e on agent/TEX-39, draft PR #119 auto-updated.
- Decisions the team must respect: The six accommodations in RRQ 6 are all classroom-level changes (front seat, facing class, written instructions, rotating partner, hand-drawn charts, adapted assessment). The prescribed hearing aid is NOT one of the six — it is the escalation item, a separate category requiring audiological assessment. Do not fold the hearing aid into the accommodation list or revert to "which of them." Chalk and chart paper are minor consumables, not the resourced escalation the question points at.
- Pending / next owner: TEX-80 (BilingualAuthor) — UR assessment translation for Unit 5 from corrected English. TEX-107 (G3 review Units 1-3) remains an independent prerequisite. No CurriculumOwner action required on this defect.
- Paperclip issues affected: TEX-109 (this issue, finishing), TEX-39/PR #119 (updated), TEX-80 (English source now coherent for UR assessment).

## Evaluation notes (flywheel)

- Failure modes observed: None new. The initial read confirmed the defect reproduced exactly as described in the task. No em dash issues in the edit.
- Graders run and results (PASS/FAIL): check:no-em-dash PASS, check:no-answer-keys PASS. check:content PASS for EFMP-305 wording/structure (concept-graph 9-item count pre-existing, unrelated to this edit).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
