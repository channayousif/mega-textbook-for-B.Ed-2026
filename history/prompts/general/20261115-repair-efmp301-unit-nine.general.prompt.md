---
id: 20261115
title: Repair EFMP301 Unit Nine
stage: general
date: 2026-11-03
surface: agent
model: Codex (exact model revision unavailable)
feature: efmp-301
branch: crew/efmp-301-u09-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "repair_en", "efmp-301", "unit-09"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-301/unit-09/topic-01.mdx
  - docs/semester-1/efmp-301/unit-09/topic-02.mdx
  - docs/semester-1/efmp-301/unit-09/topic-03.mdx
  - docs/semester-1/efmp-301/unit-09/unit-assessment.mdx
  - docs/semester-1/efmp-301/unit-09/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/unit-teacher-notes.mdx
  - specs/content/efmp-301/concepts/unit-09.md
  - specs/content/efmp-301/coverage/unit-09.md
  - specs/content/efmp-301/figures/unit-09.md
  - specs/content/efmp-301/sources/unit-09.md
  - specs/content/efmp-301/tasks.md
  - static/img/figures/efmp-301/unit-09/fig-U9-6.dark.svg
  - static/img/figures/efmp-301/unit-09/fig-U9-6.svg
  - static/img/figures/efmp-301/unit-09/fig-U9-6.ur.dark.svg
  - static/img/figures/efmp-301/unit-09/fig-U9-6.ur.svg
  - specs/content/efmp-301/reviews/unit-09/repairs/20261103-codex/handoff.md
  - history/prompts/general/20261115-repair-efmp301-unit-nine.general.prompt.md
tests:
  - "npm run check:content: baseline 13/13 passed; final rerun after evidence refresh"
  - "TMPDIR=$PWD/.crew/test-tmp scripts/heavy.sh npm test: 28 files, 347 tests passed"
  - "node scripts/measure-figure-text.mjs: all four changed SVGs passed"
  - "npm run validate:content and npm run check:depth-gate: passed after repairs"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the latest Unit 9 G3 content findings in English and Urdu, corrected figure 6 and assessment mappings, recorded the advisory repair row, and retained render/provenance owner handoffs. Committing only on the assigned branch.

## Outcome

- ✅ Impact: Repaired assessment spread, option positions, Bloom demand, scenario continuity, practical authority, dual-use claims, activity timing, reliability uncertainty and ERQ marking.
- 🧪 Tests: 347 unit tests and changed-SVG geometry passed; baseline content gates green; refresh final deterministic evidence and rerun content gates.
- 📁 Files: Five English and five Urdu MDX files, four governance tables, tracker, four SVG variants, repair handoff and PHR; deterministic evidence refresh follows.
- 🔁 Next prompts: Owner arranges permitted current render review and authenticated independent review within cycle limits.
- 🧠 Reflection: A single score cannot establish reliability; edited content requires fresh deterministic input digests.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 9 repairs mirrored into Urdu, with model outlines and clear limits.
- Decisions the team must respect: No approved spec changes, no publication-state changes, G3/G5 remain open, draft translation status retained.
- Pending / next owner: Owner/render host: narrow/A4/glyph checks; owner/review host: authenticated provenance and independent review.
- Paperclip issues affected: Crew job efmp-301-u09-repair_en; no external issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: First edited gate run caught a 201-character description, coverage/source key mismatch, stale G2 digest and generated status cache; corrected inputs before refreshing evidence.
- Graders run and results (PASS/FAIL): PASS: baseline 13 content gates, 347 unit tests, four SVG geometry checks, corrected validation/depth; final gate run pending evidence refresh.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use the committed clean input manifest for permitted render inspection and independent review.
