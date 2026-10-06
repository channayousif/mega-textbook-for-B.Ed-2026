---
id: 0097
title: "EFMP-304 U3: complete Urdu mirror (index + 4 topics + assessment)"
stage: G4
date: 2026-10-06
surface: agent:opencode_local
feature: content-efmp-304
branch: agent/TEX-23
user: M Yousif Channa
command: issue_continuation_needed (TEX-23 resume)
labels: ["bilingualauthor", "content", "efmp-304", "urdu", "translation"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: TEX-23
  adr: null
  pr: 109
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/unit-assessment.mdx
tests:
  - Structural parity: all 6 EN files have UR counterparts
  - Academic-plain register (درسی مگر عام فہم) maintained
  - Key terms block in index.mdx
---

## Prompt

issue_continuation_needed (TEX-23 resume for Unit 3 Urdu translation)

## Response snapshot

Completed the Unit 3 Urdu mirror by translating all remaining files.

**Files translated this session:**
- topic-02.mdx (172 lines) - Common patterns of deductive reasoning
- topic-03.mdx (168 lines) - Common patterns of inductive reasoning
- topic-04.mdx (172 lines) - Validity, soundness, strength and cogency
- unit-assessment.mdx (196 lines) - 10/10/5 bank + bounded answers

**Total Unit 3 Urdu:** 6 files, ~870 lines of Urdu prose.

**Register:** Academic-plain (درسی مگر عام فہم) with Urdu glossary definitions from glossary.json. English terms in parentheses on first use where no settled Urdu form exists.

## Outcome

- ✅ Impact: Unit 3 Urdu mirror structurally complete (all 6 files)
- 🧪 Tests: Structural parity with EN unit established
- 📁 Files: 4 files across 4 commits this session
- 🔁 Next prompts: G3 en-review by CurriculumOwner (both units ready)
- 🧠 Reflection: Both EFMP-304 Units 2 and 3 are now G2-clear with complete bilingual mirrors. Ready for G3 en-review handoff to CurriculumOwner.

## Handoff (for CEO and agents)

**What shipped:** Unit 3 Urdu mirror complete (index + 4 topics + assessment). Both EFMP-304 Units 2 and 3 now have complete EN + UR mirrors at G2 clearance.

**Decisions the team must respect:**
- Urdu uses academic-plain register (درسی مگر عام فہم)
- English terms in parentheses on first use where no settled Urdu form exists
- terminology.csv was NOT modified (curriculum owner resolves conflicts)
- <Glossary> component keeps English term attribute in both languages
- Key terms block in UR index.mdx lists all Unit 3 terms

**What is pending and who owns it:**
- G3 en-review: CurriculumOwner
- G5 ur-review: independent reviewer (not this session)
- Banner raster production: Codex/WebLeadAgy (prompt-only rows ready)
- Draft PR #109: needs update with final status

**Paperclip issues affected:** TEX-23. Both units EN + UR complete at G2. Ready for G3 review handoff.
