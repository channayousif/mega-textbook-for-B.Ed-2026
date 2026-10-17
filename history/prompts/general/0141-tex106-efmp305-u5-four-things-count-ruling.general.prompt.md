---
id: 0141
title: TEX-106 EFMP-305 U5 four-things count/cost ruling
stage: general
date: 2026-10-16
surface: agent
model: LongCat-2.0
feature: none
branch: agent/TEX-39
user: M Yousif Channa
command: paperclip-agent-wake
labels: ["paperclip", "curriculumowner", "tex-106", "efmp-305", "content-fix"]
links:
  spec: null
  ticket: TEX-106
  adr: null
  pr: 119
files:
  - docs/semester-2/efmp-305/unit-05/topic-03.mdx
  - docs/semester-2/efmp-305/unit-05/unit-assessment.mdx
  - history/prompts/general/0141-tex106-efmp305-u5-four-things-count-ruling.general.prompt.md
tests:
  - npm run check:content (efmp-305 gates clean)
  - npm run check:no-em-dash (clean)
  - npm run check:no-answer-keys (clean)
  - npm run validate:content (efmp-305 clean excluding pre-existing G2/depth states)
---

## Prompt

[TEX-106 wake payload] Unblock the remaining Urdu translation on TEX-80. Existing branch `agent/TEX-39`, draft PR #119 only. Do not create a branch/PR or rewrite unrelated content.

Source defect at English baseline `78798ec3`, `docs/semester-2/efmp-305/unit-05/topic-03.mdx`, subsection "What this unit asks of you, in the end": the paragraph lists four things (accurate citation; written request; school audit; one teacher decision), says three cost nothing, then states "The fourth is money, and it is the one you escalate." The fourth listed action is a teacher decision, not money. Later Summary says the same four actions and three are free. Unit 5 index and Unit 6 opening repeat the four/three motif. A literal Urdu translation would preserve a contradictory teaching conclusion; the translate-unit skill forbids silently repairing English.

Success: settle one coherent count and cost account, correct the source paragraph and any affected summary/cross-references, then state the new settled English commit and exact affected paths. Preserve the actual lesson that teachers should do the free actions while escalating resourced needs. Do not silently introduce an invented cost for a free action.

## Response snapshot

Read the defect, reproduced it, and made an explicit curriculum-owner ruling.

Defect confirmed in three spots in U5 (all restate the motif):
- `topic-03.mdx:301-304` — "What this unit asks of you, in the end" (closing)
- `topic-03.mdx:428-430` — Summary
- `unit-assessment.mdx:95-97` — unit recap

Cross-references that only state the count without enumerating (verified consistent, no edit needed):
- `unit-05/index.mdx:109` — "three of them cost nothing"
- `unit-06/index.mdx:21` — "three of them are free"
- `unit-06/unit-assessment.mdx:26` — "three of them are free"

Urdu side: U5 index/teacher-notes/topic-01/topic-02 already translated; UR index line 68 says "three cost no money" — already consistent with the fix. UR topic-03 and UR assessment do not yet exist (TEX-80 remaining work); BilingualAuthor will translate from the corrected English.

Ruling: the four case-mobilization instruments are (1) accurate citation of the right Act, (2) written request naming pupil and clause, (3) school audit producing evidence rather than opinion — all free — and (4) an escalation for a resourced provision the school cannot supply from its own means (sanctioned post, trained specialist, building access) — money, the one you escalate. The teacher's personal decision to change one thing remains a free classroom practice taught in the teacher-attitude section (lines 189-205) and practicum tasks; it is not a case-mobilization instrument in this summary motif.

Edited topic-03.mdx (closing + Summary) and unit-assessment.mdx (recap). First draft used em dashes (U+2014) which `check:no-em-dash` forbids; replaced with en dashes (U+2013). Committed, pushed to `agent/TEX-39`, updated draft PR #119.

## Outcome

- ✅ Impact: Coherent count/cost account across U5 topic-3 and assessment. No invented cost on a free action. Depth budget unchanged. All EFMP-305 content gates clean.
- 🧪 Tests: check:content (efmp-305 clean), check:no-em-dash (clean), check:no-answer-keys (clean), validate:content (efmp-305 clean).
- 📁 Files: `docs/semester-2/efmp-305/unit-05/topic-03.mdx` (closing + Summary), `docs/semester-2/efmp-305/unit-05/unit-assessment.mdx` (recap), this PHR.
- 🔁 Next prompts: parent blocker (TEX-39/TEX-80) resumes BilingualAuthor on UR topic-03 and UR assessment translation from the corrected English source.
- 🧠 Reflection: The literal-enforcement rule in translate-unit exists precisely to surface source contradictions like this one. Fixing English first (not letting Urdu carry the repair) is the correct order — it also protects UR topic-01/02, which were already translated with the "three free" count consistent with this fix.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 U5 English source contradiction resolved. Commit `5d695685` on `agent/TEX-39`, draft PR #119 updated. UR index/topic-01/topic-02 unaffected and remain consistent. UR topic-03/assessment still pending (TEX-80).
- Decisions the team must respect: The fourth "thing that moves a case" is the escalation for a resourced provision (money), NOT a free teacher decision. Do not reintroduce "one teacher's decision to change one thing this week" as the fourth item in this summary motif. The teacher's decision remains a free classroom practice in the attitude section and practicum, distinct from the case-mobilization motif.
- Pending / next owner: BilingualAuthor (via parent blocker on TEX-80) to translate UR topic-03 and UR assessment from the now-corrected English. No further CurriculumOwner action on this defect.
- Paperclip issues affected: TEX-106 (this issue, finishing), TEX-80 (unblocked — English source now coherent), TEX-39/PR #119 (updated).

## Evaluation notes (flywheel)

- Failure modes observed: initial edit used em dashes (U+2014) which the content gates forbid; caught by `check:no-em-dash` before commit and replaced with en dashes (U+2013). No further failures.
- Graders run and results (PASS/FAIL): content gates PASS for efmp-305.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
