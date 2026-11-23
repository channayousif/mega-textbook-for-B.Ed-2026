---
id: 20261254
title: Unit self-check with server marking (Feature 032 phase C, part 1)
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/032-self-check
user: M Yousif Channa
command: "Terms + server marking" (Phase C choice)
labels: [board-direct, interactivity, supabase]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - supabase/migrations/0055_self_check.sql (applied live 2026-11-23)
  - scripts/quiz/import-assessment-mcq.mjs (run live: 2,270 items)
  - src/lib/selfCheck.ts, src/components/SelfCheck.tsx, src/theme/DocItem/Content.tsx, src/css/custom.css
  - tests/rls/self-check.test.mjs, tests/unit/self-check-import.test.mjs, tests/e2e/self-check.spec.ts
tests:
  - npm run test:rls -- tests/rls/self-check.test.mjs (2 passed, live)
  - vitest tests/unit/self-check-import.test.mjs (3 passed)
---

## Prompt

Phase C choice: "Terms + server marking (Recommended)".

## Response snapshot

- Migration 0055: self_check_items (own table, so teacher quiz assignments that draw every
  quiz_items row are unchanged), self_check_attempts, self_check_questions() (public, no key) and
  check_self_quiz() (sign-in, whole set, score and wrong numbers only, 5 checks per unit per day).
  Applied live in one transaction; PostgREST reloaded.
- Importer parses five assessment layouts (lettered and dashed options, Urdu letters, bold,
  inline and table keys) and validates every key against its options before writing: 227 of 259
  pages valid (every English page); 2,270 items imported (140 units EN, 87 UR).
- <SelfCheck> on each unit assessment page via the DocItem wrapper (no MDX edits); guests see the
  questions and a sign-in link; hidden in print.
- Caveat: the page's bounded answers section already shows the key above the self-check, so this
  is a practice tool, not a sealed test.
- Security note: sourcing .env.local echoed a fragment of a Google OAuth client secret (malformed
  line 5) into this session's tool output; reported to the owner.

## Outcome

- ✅ Impact: every unit assessment page can mark its MCQs on the server.
- 🧪 Tests: RLS 2/2 live; unit 3/3; e2e added.
- 📁 Files: see front matter.
- 🔁 Next prompts: flashcards (crew key terms + <Flashcards>); parse the 32 remaining Urdu pages;
  re-run the importer after assessment edits (source_sha records the page version).
- 🧠 Reflection: the quiz bank was empty; reusing quiz_items would have changed teacher quizzes.

## Handoff (for CEO and agents)

- Shipped / changed: see files; live migration and data.
- Decisions the team must respect: keys never in client bundles; marking only via check_self_quiz.
- Pending / next owner: Claude: flashcards, Urdu parser. Owner: rotate the exposed OAuth secret if
  wanted; fix .env.local line 5.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: shell-sourcing an env file with a malformed line echoes values.
- Graders run and results (PASS/FAIL): RLS PASS; unit PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a CI job that re-imports when an assessment page changes.
