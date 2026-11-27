---
id: 20261309
title: Meta AI image producer (spec 033 US2)
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 033-meta-ai-producer
branch: feat/meta-image-producer
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "crew"]
links:
  spec: specs/033-meta-ai-producer/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
 - scripts/media/producers/meta.mjs
 - scripts/media/producers/image.mjs
 - scripts/media/producers/quota.mjs
 - scripts/media/producers/index.mjs
 - scripts/media/pacing.mjs
 - scripts/crew/resources.mjs
 - scripts/crew/planner.mjs
 - scripts/crew/workers.mjs
 - scripts/generate-illustration.mjs
 - tests/crew/image-producers.test.mjs
 - tests/crew/image-quota.test.mjs
 - tests/crew/planner.test.mjs
 - tests/crew/resources.test.mjs
 - tests/unit/media-producers.test.mjs
 - specs/decisions/log.md
 - specs/033-meta-ai-producer/spec.md
 - AGENTS.md
 - .claude/skills/media-studio/SKILL.md
tests:
 - node --test tests/crew/*.test.mjs (227 pass)
 - scripts/heavy.sh npm test (636 pass)
 - live image via PRODUCER_FNS.meta (2048x1152, 66 s, meta.image paced)
---

## Prompt

go, its safe to use Meta's terms of use.

## Response snapshot

Built spec 033 User Story 2: `scripts/media/producers/meta.mjs` drives meta.ai in the davinci workspace
Chrome over CDP (tunnel 18802): bring the tab to front, new chat, real click into the contenteditable
composer, insert the shared brief, click Send, wait for a new full-size image, fetch it in the page,
centre-crop to the row's aspect if needed, save PNG. Sign-in walls are `unavailable`, limit messages
`quota`. Registered `meta` as the last image producer (pacing `meta.image` 30/day, 2-minute gaps;
lane `meta`; MAX_ILLUSTRATE 6). Recorded D-2026-0102 (Meta approved, terms confirmed) and D-2026-0103
(Cloudflare not an image producer; whisper and drafts allowed); AGENTS.md image rule updated.
First live run failed as "not signed in" because the tab was in the background (not laid out); fixed
with Page.bringToFront and a composer wait; second run produced the image.

## Outcome

- ✅ Impact: sixth image producer for the illustration backlog, on the owner's Meta account, paced.
- 🧪 Tests: crew 227, vitest 636; one live image.
- 📁 Files: listed above.
- 🔁 Next prompts: merge #946 then this PR; Feature 037 (Workers AI whisper and drafts).
- 🧠 Reflection: CDP on a shared Chrome must bring its tab to front; another tool can leave it in the background.

## Handoff (for CEO and agents)

- Shipped / changed: meta image producer and lane; D-2026-0102 and D-2026-0103; AGENTS.md exception for Meta.
- Decisions the team must respect: Meta is last in the image order and every image is inspected; nothing else calls meta.ai; no Cloudflare images.
- Pending / next owner: owner merges #946 then this PR; an ADR amending ADR-0029 for Meta is suggested, not written.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: background tab measured 0 x 0 and read as signed out.
- Graders run and results (PASS/FAIL): crew tests PASS, vitest PASS.
- Prompt variant (if applicable): "Create one image, <aspect>." + shared brief.
- Next experiment (smallest change to try): stress "flat-vector, not painterly" for Meta to match the house style.
