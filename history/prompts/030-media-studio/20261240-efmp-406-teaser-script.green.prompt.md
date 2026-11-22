---
id: 20261240
title: EFMP-406 Urdu teaser script
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/efmp-406-u00-teaser_script
user: M Yousif Channa
command: none
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/efmp-406.json
  - specs/studio/teasers/media-teasers.json
tests:
  - node scripts/notebook-studio/teaser.mjs check efmp-406 (QG0 pass)
  - npm run check:content (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrote the Urdu teaser script for EFMP-406 Contemporary Literacies on recipe teaser@3: a man
presenter speaks to camera in shots 1 and 5, an unseen woman narrator voices shots 2-4 (dolly,
tracking, crane), every Urdu line 14-17 words, facts only from the course overview and
catalog/courses.json (literacy beyond reading and writing; critical, digital, media, visual and
information literacy; online communication, social media and responsible use; six units;
learner-centred and project-based approaches). Added end card, YouTube title, keywords and an Urdu
course_summary. QG0 passed; planned `efmp-406-ur` and advanced it to `scripted` with the file's
sha256 and the QG0 gate. No generator was called and no approval was recorded.

## Outcome

- ✅ Impact: efmp-406-ur waits at `scripted` for the owner's `crew approve-script efmp-406-ur`.
- 🧪 Tests: QG0 pass; check:content pass.
- 📁 Files: the script and its one ledger item.
- 🔁 Next prompts: owner approval, then the teaser_clips stage.
- 🧠 Reflection: the overview's "## Learning outcomes" heading does not match the parser's "## Course learning outcomes", so QG0 counts 0 outcomes and rejects any `objectives` list.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/teasers/efmp-406.json (teaser@3, ur only) and the efmp-406-ur ledger item at `scripted`.
- Decisions the team must respect: no credits before the owner approves the script; editing the script after approval reopens it.
- Pending / next owner: owner reviews the Urdu lines and approves; `objectives` were omitted because `parseOverview` (scripts/notebook-studio/describe.mjs) looks only for "## Course learning outcomes" while the EFMP-406 overview says "## Learning outcomes" (metadata only; adding them later does not reopen approval).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: overview heading variant breaks the objectives count in QG0.
- Graders run and results (PASS/FAIL): QG0 PASS, check:content PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): let parseOverview accept both "Learning outcomes" headings.
