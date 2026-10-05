---
id: 0095
title: "EFMP-304 U2: complete Urdu mirror (index + 4 topics + assessment)"
stage: G4
date: 2026-10-05
surface: agent
model: claude-opus-5-5
feature: content-efmp-304
branch: agent/TEX-23
user: M Yousif Channa
command: run_liveness_continuation (TEX-23 resume)
labels: ["bilingualauthor", "content", "efmp-304", "urdu", "translation"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: TEX-23
  adr: null
  pr: 109
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/unit-assessment.mdx
tests:
  - Structural parity: all 6 EN files have UR counterparts
  - Academic-plain register (درسی مگر عام فہم) maintained
  - Key terms block in index.mdx
---

## Prompt

run_liveness_continuation (TEX-23 resume after Unit 2 G2 + Unit 3 G2 + figures)

## Response snapshot

Completed the Unit 2 Urdu mirror by translating all remaining files.

**Files translated:**
- topic-02.mdx (157 lines) - Who is speaking, to whom, about what
- topic-03.mdx (168 lines) - Types of argument
- topic-04.mdx (203 lines) - Finding the premises, the conclusion, and the non-arguments
- unit-assessment.mdx (190 lines) - 10/10/5 bank + bounded answers

**Total Unit 2 Urdu:** 6 files, ~780 lines of Urdu prose.

**Register:** Academic-plain (درسی مگر عام فہم) with Urdu glossary definitions from glossary.json. English terms in parentheses on first use where no settled Urdu form exists. <Glossary> component keeps English term attribute.

## Outcome

- ✅ Impact: Unit 2 Urdu mirror structurally complete (all 6 files)
- 🧪 Tests: Structural parity with EN unit
- 📁 Files: 6 files across 4 commits
- 🔁 Next prompts: Unit 3 Urdu translation (index + 4 topics + assessment)
- 🧠 Reflection: Urdu translation requires careful attention to academic-plain register, terminology consistency, and natural Urdu sentence structure (verb-final). The assessment translation preserves the 10/10/5 bank structure and bounded answers section.

## Handoff (for CEO and agents)

**What shipped:** Unit 2 Urdu mirror complete (index + 4 topics + assessment). Draft PR #109 updated.

**Decisions the team must respect:**
- Urdu uses academic-plain register (درسی مگر عام فہم)
- English terms in parentheses on first use where no settled Urdu form exists
- terminology.csv was NOT modified (curriculum owner resolves conflicts)
- <Glossary> component keeps English term attribute in both languages
- Key terms block in UR index.mdx lists all Unit 2 terms

**What is pending and who owns it:**
- Unit 3 Urdu translation (index + 4 topics + assessment): BilingualAuthor
- Banner raster production: Codex/WebLeadAgy
- G3 en-review: CurriculumOwner
- G5 ur-review: independent reviewer (not this session)

**Paperclip issues affected:** TEX-23. Unit 2 EN + UR complete. Unit 3 EN complete, UR pending.
