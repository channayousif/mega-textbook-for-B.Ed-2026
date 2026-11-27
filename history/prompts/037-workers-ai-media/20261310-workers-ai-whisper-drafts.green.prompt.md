---
id: 20261310
title: Workers AI whisper for QG2 and text drafts (Feature 037)
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 037-workers-ai-media
branch: feat/workers-ai-whisper
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio"]
links:
  spec: specs/037-workers-ai-media/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/media/producers/cfai.mjs
 - scripts/media/qg2.mjs
 - scripts/media/teaser-clips.mjs
 - scripts/media/cfai-text.mjs
 - scripts/media/producers/README.md
 - tests/unit/media-cfai.test.mjs
 - .claude/skills/media-studio/SKILL.md
 - .claude/skills/studio-teaser/SKILL.md
 - specs/037-workers-ai-media/spec.md
 - specs/037-workers-ai-media/plan.md
 - specs/037-workers-ai-media/tasks.md
tests:
 - node --test tests/crew/*.test.mjs (226 pass)
 - scripts/heavy.sh npm test (644 pass)
 - live QG2 via Workers AI and two live drafts
---

## Prompt

merge on green

move to next

## Response snapshot

#946, #948 and #949 merged (#949 retargeted to main after #946 merged; the watcher found it merged).
Part 3: `cfai.mjs` Workers AI client (host-local token, 9,000-neuron cap per UTC day with a ledger,
error mapping to quota/unavailable, usage.neurons recorded); `qg2()` async with Workers AI whisper by
default and local whisper fallback, engine recorded in the teaser ledger precheck; `cfai-text.mjs`
drafts with Gemma, thinking off (2-4 neurons a draft instead of ~140). Live: QG2 on EFMP-406 shot 3 gave
0.714 like local in 3.4 s for 6 neurons.

## Outcome

- ✅ Impact: QG2 no longer needs a heavy whisper job on the production host; free drafts for captions and descriptions.
- 🧪 Tests: crew 226, vitest 644 (8 new).
- 📁 Files: listed above.
- 🔁 Next prompts: owner merges; optional: use drafts in the social roundup and media_assemble briefs.
- 🧠 Reflection: reasoning models on a neuron budget need thinking switched off for short drafts.

## Handoff (for CEO and agents)

- Shipped / changed: Workers AI QG2 engine with fallback; draft CLI; skills updated.
- Decisions the team must respect: D-2026-0103 (no Cloudflare images, free allowance only); drafts are always checked before use.
- Pending / next owner: owner merges this PR.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Gemma with thinking on returned empty or truncated drafts.
- Graders run and results (PASS/FAIL): crew PASS, vitest PASS.
- Prompt variant (if applicable): chat_template_kwargs.enable_thinking=false.
- Next experiment (smallest change to try): wire `cfai-text.mjs youtube` into the media_assemble brief for upload descriptions.
