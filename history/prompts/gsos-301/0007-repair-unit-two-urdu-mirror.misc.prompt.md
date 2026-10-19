---
id: 0007
title: Repair Unit Two Urdu Mirror
stage: misc
date: 2026-10-19
surface: agent
model: gpt-6
feature: gsos-301
branch: crew/gsos-301-u02-translate-r1
user: board
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "translation", "GSOS-301", "unit-02"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gsos-301/0007-repair-unit-two-urdu-mirror.misc.prompt.md
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/figures/unit-02.translation-handoff.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
tests:
  - "check:content baseline: all 13 PASS on unchanged origin/main"
  - "temporary reviewed parity probe: structural/figure PASS; expected unfinished G4/G5 and derived-status failures; flags restored"
  - "direct metadata/component/heading/figure/assessment/terminology checks: PASS"
  - "figures:variants:check: PASS (810 sources)"
  - "build:content-status: regenerated ignored report after tracker digest changed"
  - "final check:content: all 13 PASS"
  - "git diff --check: PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the complete existing GSOS-301 Unit 2 Urdu mirror, repaired semantic shifts and untranslated reading-guide prose across all five files, updated the existing in-progress G4 row, and recorded source/version, terminology and review handoff. Translation remains draft. Committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Five-page Urdu mirror repaired against the existing English baseline without changing English academic inputs or review authority.
- 🧪 Tests: All 13 content gates pass in draft; conditional parity inspected with reversible flags; existing figure variants and direct source invariants pass.
- 📁 Files: Five Urdu MDX files, Unit 2 G4 tracker notes, translation handoff and this PHR.
- 🔁 Next prompts: English G3 repairs, then accepted-baseline alignment and independent rendered G5 review.
- 🧠 Reflection: Green draft gates do not check semantic equivalence or actual rendered Urdu. Known English defects require an authoring pass.

## Handoff (for CEO and agents)

- Shipped / changed: Localized the remaining explanatory reading prose, restored hedges and examples, repaired reversed cultural comparison and narrowed or inflated Urdu meanings, preserved figures and assessment structure.
- Decisions the team must respect: Frozen terminology unchanged; translation_status draft; G4 stays in progress; G3/G5 never certified. Brief forbids build/dev server, overriding skill build/render steps. Explicit brief requests a G4 row, so update existing notes rather than append duplicate or certify.
- Pending / next owner: English author/G3 owner resolves citations, stages, Bloom/rubric/coverage findings; curriculum owner considers proposed unbanked terms; independent G5 reviewer inspects desktop/narrow/A4 Urdu after English acceptance. See unit-02.translation-handoff.md.
- Paperclip issues affected: No Paperclip issue was supplied or changed.

## Evaluation notes (flywheel)

- Failure modes observed: Prior mirror overstated possibility and biological/social claims, omitted example details and retained English reading prose. Reviewed probe correctly refused incomplete stages and stale derived status.
- Graders run and results (PASS/FAIL): Draft content suite PASS (13/13); direct parity and terminology PASS; figure variants PASS; temporary reviewed suite FAIL only on unfinished G4/G5 and temporary derived-status mismatch.
- Prompt variant (if applicable): crew/gsos-301-u02-translate-r1
- Next experiment (smallest change to try): Inspect actual rendered Urdu after settling English G3 issues; do not infer display quality from source parity.
