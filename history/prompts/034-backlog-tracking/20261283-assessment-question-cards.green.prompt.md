---
id: 20261283
title: Unit assessment question cards and a single MCQ set
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-assessment-cards
user: M Yousif Channa
command: continue (#808)
labels: [board-direct, assessment]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#808"
  adr: null
  pr: null
files:
  - src/rehype/assessment-cards.mjs
  - src/rehype/topic-enhance.mjs
  - docusaurus.config.ts
  - src/components/SelfCheck.tsx
  - src/css/custom.css
  - tests/unit/assessment-cards.test.mjs
  - tests/e2e/assessment-cards.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tests/unit/assessment-cards.test.mjs (3 passed)
  - tsc (no errors in changed files)
  - tests/e2e/assessment-cards.spec.ts (CI)
---

## Prompt

continue

## Response snapshot

The duplication came from the plain MDX MCQ list plus the injected SelfCheck repeating the same
ten MCQs at the bottom. A new rehype plugin (sibling of topic-enhance, same no-content-edit
approach) marks the lists after the "(MCQs)", "(RRQs)" and "(ERQs)" headings (the Latin marker is in
both locales; answer-key headings never carry it) as card lists, turns Bloom levels into chips,
puts each indented MCQ option on its own line or classes a nested option list, and leaves an empty
slot before the MCQ list. SelfCheck now renders into that slot as numbered cards with radio rows
(Urdu shows الف، ب، ج، د; the server still keys a-f) and hides the plain list on screen; print and
no-JavaScript keep the plain list. Units without server items show the plain list as cards. A stem
that says "select all that apply" gets checkboxes and sends sorted letters ("a,c"); no current item
needs it. Corpus survey: 158 English assessment pages share the three headings; options are written
three ways, all handled.

## Outcome

- ✅ Impact: every assessment page shows each question once, as a card; MCQs are answerable with radios and server-marked.
- 🧪 Tests: plugin unit tests 3/3; e2e on GENG-300 Unit 2 (EN and UR route).
- 📁 Files: see list above.
- 🔁 Next prompts: Stage 5 carry-over issues.
- 🧠 Reflection: no unit MDX was edited, so no G2/G3 evidence goes stale; answer keys stay in their section and on the server.

## Handoff (for CEO and agents)

- Shipped / changed: #808 (the PR closes it).
- Decisions the team must respect: assessment card styling comes from `src/rehype/assessment-cards.mjs`; keep the "(MCQs)/(RRQs)/(ERQs)" heading markers in new banks. A multi-select MCQ needs its key stored as sorted letters ("a,c") by the importer.
- Pending / next owner: owner eyeballs an assessment page after deploy.
- Paperclip issues affected: none; GitHub #808.

## Evaluation notes (flywheel)

- Failure modes observed: one wrong list index in the first test draft.
- Graders run and results (PASS/FAIL): vitest 3/3 PASS; tsc PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
