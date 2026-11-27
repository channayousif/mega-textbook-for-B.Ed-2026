---
id: 20261279
title: Become a reviewer section on the landing page
stage: green
date: 2026-11-26
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-reviewer-section
user: M Yousif Channa
command: continue to next issue (#805)
labels: [board-direct, landing]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#805"
  adr: null
  pr: null
files:
  - src/pages/index.tsx
  - src/components/landing/copy.ts
  - src/components/landing/landing.module.css
  - tests/e2e/landing-reviewer.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - tsc (no errors in changed files)
  - tests/e2e/landing-reviewer.spec.ts (CI)
---

## Prompt

merge on green, close the issues when done. continue to next issue

## Response snapshot

Added a teal "Become a reviewer" band before the final call to action: eyebrow "Help improve the
textbook", heading "Spot a mistake? Become a reviewer.", a short persuasive paragraph, a card with
three steps (choose the B.Ed or the licence and a course, describe your experience, review at your
own pace once approved), an "Apply to review" button to `/app/reviewer/apply`, and a note pointing
to "Suggest improvement" at the end of any page. Urdu copy in the plain register. The copy states
only what exists (applications are public; admins approve), per the owner-confirmed landing facts.

## Outcome

- ✅ Impact: readers see a clear invitation to help find errors and improvements.
- 🧪 Tests: e2e checks the link in both languages.
- 📁 Files: see list above.
- 🔁 Next prompts: #804 moving character (needs owner approval of a screenshot).
- 🧠 Reflection: the per-page button is "Suggest improvement", not "Report an error"; the note uses the real label.

## Handoff (for CEO and agents)

- Shipped / changed: #805 (the PR closes it).
- Decisions the team must respect: landing copy describes only what exists today.
- Pending / next owner: owner may adjust the Urdu wording.
- Paperclip issues affected: none; GitHub #805.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): tsc PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
