---
id: 0343
title: "GSOS-301 U02 G4 translate complete Urdu mirror"
stage: general
date: 2026-10-18
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u02-translate
user: crew
command: .crew/brief.md
labels: [gsos-301, unit-02, g4, urdu-translation, crew]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
  - specs/content/gsos-301/tasks.md
  - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.svg
  - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.dark.svg
tests:
  - npm run check:content (all 13 gates PASS)
  - npm run figures:variants:check (800 figures OK)
  - npm run check:no-em-dash (PASS)
  - npm run check:no-answer-keys (PASS)
  - npm run check:figures (PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated GSOS-301 Unit 2 into its complete Urdu mirror at G4 per `.claude/skills/translate-unit/SKILL.md`:
1. Authored all four `.ur.svg` localized schematic files (`fig-U2-1.ur.svg`, `fig-U2-2.ur.svg`, `fig-U2-3.ur.svg`, `fig-U2-4.ur.svg`) with Nastaliq font stacks, RTL text anchors and reading order, and derived clean `.ur.dark.svg` variants via `npm run figures:variants`.
2. Authored complete academic-plain Urdu translations for all 5 unit files (`index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and newly translated `unit-teacher-notes.mdx`), ensuring exact 1:1 heading vector parity, component count preservation, zero em dashes, and `key_terms` bound strictly to `terminology.csv`.
3. Preserved assessment bank structure: 10 MCQs, 10 RRQs, 5 ERQs, translated option letters (الف, ب, ج, د), translated Bloom tags, and translated bounded answers section without leaking English answer-key tokens.
4. Updated `specs/content/gsos-301/tasks.md` G4 row and confirmed all 13 content gates pass.

## Outcome

- ✅ Impact: GSOS-301 Unit 2 now has a complete, fully verified G4 Urdu mirror matching English structure and terminology.
- 🧪 Tests: `npm run check:content` (all 13 gates pass).
- 📁 Files: 5 Urdu content files, 8 figure variant SVGs, tasks.md.
- 🔁 Next prompts: G5 independent Urdu review in a separate fresh session.
- 🧠 Reflection: Creating `.ur.svg` with proper RTL layout and verifying heading level vectors programmatically ensures zero structural drift between English and Urdu.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror for GSOS-301 Unit 2 (5 MDX files, 4 `.ur.svg` + 4 `.ur.dark.svg` assets, updated tasks.md G4 row).
- Decisions the team must respect: translation_status remains `draft` pending independent G5 review; G4 tracker row marked in-progress with `auto:gates`.
- Pending / next owner: Independent G5 Urdu reviewer session for GSOS-301 Unit 2.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Pre-existing missing `content-status.json` built via `build:content-status`.
- Graders run and results (PASS/FAIL): npm run check:content → 13 PASS / 0 FAIL.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
