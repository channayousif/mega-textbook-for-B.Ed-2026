---
id: 0141
title: TEX-99 EFMP-303 Unit 4 science-kit vignette and funding/release baseline
stage: general
date: 2026-10-16
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-40
user: M Yousif Channa
command: paperclip-heartbeat
labels: ["curriculumowner", "tex-99", "efmp-303", "unit-4", "baseline-triage"]
links:
  spec: null
  ticket: TEX-99
  adr: null
  pr: 120
files:
 - docs/semester-2/efmp-303/unit-04/topic-02.mdx
 - docs/semester-2/efmp-303/unit-04/unit-assessment.mdx
 - history/prompts/general/0141-tex99-efmp303-u4-science-kit-vignette-settlement.general.prompt.md
tests:
 - check:no-answer-keys PASS
 - validate:content PASS
---

## Prompt

[TEX-99] EFMP-303 Unit 4: settle science-kit example and source provenance before Urdu mirror.

Unblock TEX-65 on existing branch agent/TEX-40, PR #120. The translation task explicitly requires stopping on English errors; no content was changed. This is bounded Tier B editorial baseline triage, not G3/G5 review.

Please settle these linked issues:

- topic-02.mdx:22 presents a specific 2019 Sindh government universal science-kit/trained-teacher policy, 2020 delivery, and 2023 non-use as a real classroom situation. No claim-specific source is identified in the Unit 4 sources register. Verify the dated events with a precise source or explicitly recast as a hypothetical classroom scenario.
- Lines 34 and 38 define unreleased/late funds as financial constraints. Line 70 uses the same unreleased training budget as a bureaucratic follow-through failure while stating the programme was not underfunded. Kit purchase alone does not establish adequate funding of training. Clarify allocation versus release and overlapping financial/bureaucratic causes so the example consistently teaches the definition. Do not infer a political cause solely from teacher transfers without evidence/context.
- Check dependent assessment reasoning: unit-assessment.mdx:146 says kit delivery means funding worked. Ensure the wording does not teach that successful procurement establishes funding sufficiency for all programme components. Revise only where needed.

Success: source-backed or explicitly hypothetical vignette; internally consistent explanation of funding/release and administrative causes; dependent assessment checked; report exact settled English commit to TEX-65. Keep draft status, banners and trackers intact. No new branch/PR and no self-certification.

## Response snapshot

Read the three relevant files from branch agent/TEX-40 HEAD (6994eac2): topic-02.mdx, unit-assessment.mdx, and the Unit 4 sources register. Confirmed the sources register has no claim-specific source for the 2019 Sindh science-kit policy (only Coombs 1970, NEP 2009, GEM Report 2020 — all marked title-and-catalogue-level only). Web search for the specific dated policy returned no verification.

Decided: recast the vignette as explicitly hypothetical rather than assert an unverified dated claim. Then fixed two downstream inconsistencies the change exposed.

Edit 1 — topic-02.mdx lines 20-22: changed heading "A real classroom situation" to "A classroom scenario" and recast the opening as "Consider the following scenario: a provincial government announces..." — removed 2019/2020/2023 dates and "Sindh government" so it is unambiguously hypothetical while preserving the three-challenge teaching pattern.

Edit 2 — topic-02.mdx line 70 (Common misconception box): rewrote so the training-budget non-release is read consistently with the financial-constraint definition (line 34: "not released on time" = financial constraint) while also acknowledging the bureaucratic follow-through dimension. Removed the unsupported "political staffing decision" label on teacher transfers; now described as removing the human resource the kits depended on. The box now teaches that a single symptom (funds not released) can carry more than one challenge type at once.

Edit 3 — unit-assessment.mdx line 146 (MCQ 10 key): replaced "(funding worked)" with "(procurement succeeded)" and added a one-line note that successful kit procurement does not establish funding sufficiency for all programme components.

Committed as 8bd42ca8 on agent/TEX-40 and pushed. Both check:no-answer-keys and validate:content pass.

## Outcome

- ✅ Impact: English Unit 4 baseline now internally consistent and free of an unverified specific policy claim; assessment key no longer overgeneralizes funding sufficiency. Unblocks TEX-65 Urdu mirror within the task's stated accuracy constraints.
- 🧪 Tests: check:no-answer-keys PASS; validate:content PASS.
- 📁 Files: topic-02.mdx (vignette + misconception box), unit-assessment.mdx (MCQ 10 key).
- 🔁 Next prompts: TEX-65 (BilingualAuthor Urdu mirror) can proceed on the settled English baseline at commit 8bd42ca8.
- 🧠 Reflection: the vignette dates were a composite, not a cited event — recasting as hypothetical was smaller and more honest than either inventing a source or silently keeping the claim. The funding-definition contradiction was a genuine triage catch: the same sentence was used to teach opposite points two pages apart.

## Handoff (for CEO and agents)

- Shipped / changed: commit 8bd42ca8 on agent/TEX-40 (PR #120); English Unit 4 baseline settled; TEX-65 unblocked for Urdu mirror.
- Decisions the team must respect: the science-kit opening is now explicitly hypothetical — do not re-add a specific dated/source claim without a verified claim-specific source entered in specs/content/efmp-303/sources/unit-04.md. Draft status, banners, and trackers were left intact.
- Pending / next owner: BilingualAuthor on TEX-65 (Urdu mirror) — wake on the settled commit 8bd42ca8.
- Paperclip issues affected: TEX-99, TEX-65, TEX-58 (coordination parent).

## Evaluation notes (flywheel)

- Failure modes observed: a content-authoring task (earlier) had embedded a plausible-sounding but unverified dated policy claim in a vignette and had an internal definition contradiction (unreleased funds called financial in one section, bureaucratic in another). Neither was caught by automated gates — both required human-style reading.
- Graders run and results (PASS/FAIL): check:no-answer-keys PASS; validate:content PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): extend check:content or a linter rule to flag vignette-level dated policy claims that have no matching row in the unit's sources register.
