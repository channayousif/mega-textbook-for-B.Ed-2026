---
id: 0109
title: efmp-305-assessment-split-repair
stage: general
date: 2026-10-10
surface: agent
model: claude-opus-5.5
feature: none
branch: agent/TEX-39
user: M Yousif Channa
command: apply owner ruling D-2026-0053 item 6 (assessment split 40/60)
labels: ["bilingualauthor", "efmp-305", "assessment-split"]
links:
  spec: null
  ticket: TEX-39
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/119
files:
  - specs/content/efmp-305/content-spec.md
  - docs/semester-2/efmp-305/course-overview.mdx
tests:
  - grep for 80/20 restatements (none found)
---

## Prompt

Owner ruling D-2026-0053 item 6: EFMP-305 assessment split is 40 formative / 60 summative. Fix content-spec.md and course-overview.mdx accordingly.

## Response snapshot

Updated content-spec.md assessment section to state 40/60 split per owner ruling, dropping the 80/20 label. Updated course-overview.mdx front matter (summative: 60, formative: 40) and prose (40% formative / 60% summative, removed "follows the course guide"). Verified no 80/20 restatements in unit assessments or teacher notes. Urdu course-overview not yet created.

## Outcome

- Impact: Assessment split corrected to 40/60 per owner ruling
- Tests: grep confirmed no 80/20 restatements
- Files: 2 modified
- Next: Awaiting board confirmation

## Handoff (for CEO and agents)

- Shipped: EFMP-305 assessment split repair complete
- Decisions: 40/60 split is binding per D-2026-0053 item 6
- Pending: Board confirmation via request_confirmation interaction
- Paperclip issues affected: TEX-39 (in_review)
