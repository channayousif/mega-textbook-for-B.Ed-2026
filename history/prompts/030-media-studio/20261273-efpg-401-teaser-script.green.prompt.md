---
id: 20261273
title: EFPG-401 Urdu teaser script
stage: green
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/efpg-401-u00-teaser_script
user: M Yousif Channa
command: none
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/efpg-401.json
  - specs/studio/teasers/media-teasers.json
tests:
  - node scripts/notebook-studio/teaser.mjs check efpg-401 (QG0 pass)
  - npm run check:content (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrote the Urdu teaser script for EFPG-401 Teaching of English on recipe teaser@3: a woman
presenter in a maroon shalwar kameez and cream dupatta speaks to camera in shots 1 and 5
(primary classroom, school corridor), an unseen woman narrator voices shots 2-4 (dolly, tracking,
crane), every Urdu line 13-16 words, facts only from the course overview and catalog/courses.json
(Grades I to VIII; the four skills listening, speaking, reading and writing; activities for each
skill; modern methods and approaches; lesson plans for prose, poetry, composition and grammar;
audio-visual aids; assessing progress in English). No unit count is claimed because the overview
does not state one. No maps, flags, alphabet charts or readable text. Added end card, YouTube
title, keywords and an Urdu course_summary. QG0 passed; planned `efpg-401-ur` and advanced it to
`scripted` with the file's sha256 and the QG0 gate. No generator was called and no approval was
recorded.

## Outcome

- ✅ Impact: efpg-401-ur waits at `scripted` for the owner's `crew approve-script efpg-401-ur`.
- 🧪 Tests: QG0 pass; check:content pass (14 gates).
- 📁 Files: the script and its one ledger item.
- 🔁 Next prompts: owner approval, then the teaser_clips stage.
- 🧠 Reflection: the EFPG-401 overview lists its six objectives under "## Course objectives", which `parseOverview` does not read, so QG0 counts 0 outcomes and rejects an `objectives` list; omitted, as for EFMP-406/407.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/teasers/efpg-401.json (teaser@3, ur only) and the efpg-401-ur ledger item at `scripted`.
- Decisions the team must respect: no credits before the owner approves the script; editing the script after approval reopens it.
- Pending / next owner: owner reviews the Urdu lines and approves; `objectives` (six in the overview) are omitted until `parseOverview` (scripts/notebook-studio/describe.mjs) accepts the "Course objectives" heading (metadata only; adding them later does not reopen approval).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: overview heading variant breaks the objectives count in QG0 (third course).
- Graders run and results (PASS/FAIL): QG0 PASS, check:content PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): let parseOverview accept "Learning outcomes" and "Course objectives" headings.
