---
id: 545
title: Author GPKS402 constitutional development unit
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 (Codex)
feature: gpks-402-unit-03
branch: crew/gpks-402-u03-author
user: crew owner
command: Read .crew/brief.md and carry it out completely
labels: [codex, crew, gpks-402, unit-03]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gpks-402/unit-03/index.mdx
  - docs/semester-2/gpks-402/unit-03/topic-01.mdx
  - docs/semester-2/gpks-402/unit-03/topic-02.mdx
  - docs/semester-2/gpks-402/unit-03/unit-assessment.mdx
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/coverage/unit-03.md
  - specs/content/gpks-402/sources/unit-03.md
  - specs/content/gpks-402/concepts/unit-03.md
  - specs/content/gpks-402/figures/unit-03.md
  - specs/content/gpks-402/authoring/unit-03.md
  - specs/content/gpks-402/sources/texts/
  - static/img/figures/gpks-402/unit-03/
tests:
  - "npm run check:content: baseline all 13 PASS; final run recorded below"
  - "MDX compile: all four pages PASS"
  - "figure-palette.test.mjs: 46/46 PASS"
  - "figures:variants:check: PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored the English unit, seven-ID coverage and concept records, verified sources and bound notes, 10/10/5 assessment with bounded guidance, and four English light/dark SVG pairs. Prepared deterministic G2 evidence; independent review and Urdu remain open. No push or PR.

## Outcome

- ✅ Impact: English constitutional development unit available for independent review; 76-minute reading estimate within the approved band.
- 🧪 Tests: All content gates pass after generated G2 evidence and content-status refresh; four MDX files parse; palette suite 46/46 passes. Browser geometry withheld because the brief forbids Playwright.
- 📁 Files: Four MDX pages, unit-specific governance and source records, tracker rows, eight SVGs and G2 evidence.
- 🔁 Next prompts: Independent G3; separate Urdu translation and figure localisation; permitted SVG geometry check.
- 🧠 Reflection: The older skill describes prompt-only figures, but the current gate requires rendered output. Applied the current gate without weakening shared rules.

## Handoff (for CEO and agents)

- Shipped / changed: English Unit 3, dated primary evidence, complete bank, concept graph, placed schematics and deterministic evidence.
- Decisions the team must respect: Keep 1973 Preamble distinct from 1985 Article 2A, date the First Amendment to its 1964 effect despite its 1963 title, and label the 2012 reading edition. No G3/G5 self-certification.
- Pending / next owner: Independent G3 reviewer; separate Urdu job for prose and RTL variants; authorised session for mandatory Chromium SVG geometry because this brief forbids Playwright.
- Paperclip issues affected: No issue identifier supplied; crew job gpks-402-u03-author.

## Evaluation notes (flywheel)

- Failure modes observed: Initial gates exposed missing bound source notes, output-only figure density, missing G2 and stale generated status. Repaired those without editing gate scripts. Preview inspection found and repaired a long concept-map heading.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates after evidence; MDX parse; 46 palette tests; derived variants. NOT RUN: build, server, Playwright/geometry, prohibited by brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the geometry script only in a session with an explicit exception or a brief permitting Chromium.
