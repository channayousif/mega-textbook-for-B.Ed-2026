---
id: 20261308
title: Meta AI smoke test (spec 033 US1)
stage: misc
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 033-meta-ai-producer
branch: docs/meta-ai-smoke-test
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio"]
links:
  spec: specs/033-meta-ai-producer/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/033-meta-ai-producer/smoke-test.md
tests:
 - none (manual smoke test; five images scored with the illustrate checks)
---

## Prompt

check meta ai, its also logged in on davinci

yes do it.

## Response snapshot

Checked meta.ai read-only in the davinci workspace Chrome: signed in, composer and Create images
available, no history. With the owner's go, ran spec 033 User Story 1: five approved prompts
(EFPG-401 U1 fig-U1-10 and fig-U1-13; GNAS-301 U1 fig-U1-10, -12 and -13) with the house-style brief, one
new chat each, driven over CDP, 90 s apart. All five 2048x1152 in 13-26 s, all carry a Meta C2PA
credential. Verdicts: 5/5 pass the hard rules, 1 pass and 4 pass-with-notes; four of five follow the
prompt more closely than the placed image. Wrote specs/033-meta-ai-producer/smoke-test.md and a private
side-by-side artifact (https://claude.ai/artifact/59TCj46eY5TSLip1fo1APe).

## Outcome

- ✅ Impact: the owner has the evidence for a go/no-go on a Meta image producer.
- 🧪 Tests: none; manual scoring against the illustrate checks.
- 📁 Files: specs/033-meta-ai-producer/smoke-test.md.
- 🔁 Next prompts: owner go/no-go; if go, build User Story 2 (meta lane, pacing channel meta.image).
- 🧠 Reflection: meta.ai's composer is a contenteditable box that needs a real click before typing.

## Handoff (for CEO and agents)

- Shipped / changed: the smoke-test record; no code, no placed images.
- Decisions the team must respect: spec 033 stays draft until the owner decides; nothing calls meta.ai automatically.
- Pending / next owner: owner go/no-go and a check of Meta's terms of use for textbook images.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: first attempt typed into a hidden textarea and nothing was sent.
- Graders run and results (PASS/FAIL): manual illustrate checks, 5/5 pass hard rules.
- Prompt variant (if applicable): house style plus approved row prompt, prefixed "Create one image, landscape 16:9."
- Next experiment (smallest change to try): add "flat-vector" emphasis to bring Meta closer to the house style.
