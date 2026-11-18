---
id: 20261213
title: Illustrate multi-producer agy gflow codex
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/illustrate-multi-producer
user: M Yousif Channa
command: none
labels: [board-direct, crew, illustrate, gflow, codex, quota]
links:
  spec: null
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - scripts/lib/image-quota.mjs
  - scripts/lib/image-producers.mjs
  - scripts/generate-illustration.mjs
  - scripts/crew/crew.mjs
  - scripts/crew/workers.mjs
  - tests/crew/image-quota.test.mjs
  - tests/crew/image-producers.test.mjs
  - specs/decisions/log.md
  - .claude/skills/generate-figures/SKILL.md
  - .claude/skills/studio-teaser/SKILL.md
  - ops/crew/README.md
tests:
  - npm run test:crew (138/138 pass)
  - generate-illustration.mjs GNAS-301 1 --dry-run with temp quota records (codex when agy is out and the tunnel is down; gflow when the tunnel is up; exit 3 when all are out; legacy record read as agy)
  - node scripts/check-docs-sync.mjs and check-no-em-dash.mjs pass
---

## Prompt

apart from agy, how else we can generate raster images, the work is quite big so agy needs a hang, may be codex and open code also can help? check out possibilities

(Follow-ups in the same session: "ask again"; owner chose "Fallback (Recommended)". Then: "gflow can also generate images, we have already generated character sheets for shorts pipeline, evaluate it"; owner chose "Crew, when tunnel up (Recommended)" and "agy, gflow, Codex (Recommended)", then approved the plan.)

## Response snapshot

What was evaluated:
- **agy** has one image model (`gemini-3.1-flash-image`) and no second pool.
- **Codex** has `image_generation` enabled. Its built-in `image_gen` needs no API key, and it already
  placed images in 8 crew illustrate jobs.
- **opencode** has only text models and one vision-reading model, so it cannot produce images.
- **gflow** offers Nano Banana 2.1 or Pro through Flow on the owner's PC. Images have so far cost about
  0 credits (observed only), quota exhaustion is reported as exit 21, and it is reachable only while the
  tunnel is up.
- A real bug: the existing chain `illustrate: ['agy','codex']` never helped, because the script always
  called agy, and PR #629's hold blocked Codex too.

What was built:
- **Quota records:** per-producer records in `image-quota.json`, with the PR #629 single record read as
  agy. Fallback holds are 6 h for agy and Codex and 24 h for gflow.
- **Producers module:** a new `scripts/lib/image-producers.mjs`, imported only by
  `generate-illustration.mjs`.
  - agy: the existing call.
  - gflow: a minimal Streamable HTTP MCP client over `node:http` that calls `gflow_generate_image` with
    nano2, count 1 and classic UI. It fetches the JPEG over 18801 and stages it as PNG.
  - Codex: `codex exec` with one `image_gen` call; it takes the newest PNG under
    `~/.codex/generated_images`.
- **`generate-illustration.mjs --producer auto`:** tries agy, gflow and Codex in order. On a quota error
  it records the producer and retries the same row on the next one; an unreachable producer is skipped
  for the run. It exits 3 only when none is left. Each image's producer and model are printed on its
  log line.
- **Crew:** illustrate jobs are held only when no producer is available. The requeue path pins a retold
  quota on the producer it names. The brief forbids calling image tools directly. BOARD shows the
  producer status.
- **Records:** decision D-2026-0085 amends D-2026-0082 for illustrations only.

## Outcome

- ✅ Impact: illustrate keeps producing on gflow or Codex while agy's image quota is out; three
  separate quotas instead of one.
- 🧪 Tests: test:crew 138/138, including gflow against a local MCP stub (success, rate-limit, closed
  tunnel); dry-run producer selection verified.
- 📁 Files: two new libs (one rewritten), one new test file, script and crew edits, decision log, three
  doc lines.
- 🔁 Next prompts: owner starts `gflow serve` and the 18801 file server; after merge, fast-forward
  `~/crew-system` and watch the first illustrate job for `by gflow` or `by codex` lines.
- 🧠 Reflection: a fallback chain is only real if the step that does the work honours it; the worker
  chain had a Codex entry for weeks that could never produce an image.

## Handoff (for CEO and agents)

- Shipped / changed:
  - `generate-illustration.mjs` now has three producers (agy, gflow, Codex) with per-producer quota
    records.
  - The crew holds illustrate jobs only when all three are out.
- Decisions the team must respect:
  - D-2026-0085: producer order is agy, gflow, Codex. gflow is used only through the script and only
    while the tunnel is up.
  - One illustrate job at a time.
  - Workers never call `generate_image` or `image_gen` themselves.
  - Every image is still inspected before it is placed.
- Pending / next owner:
  - Owner: keep the PC tunnel up when gflow should help.
  - Crew lead: fast-forward `~/crew-system` after merge.
  - The first live gflow run confirms the image file path served over 18801.
  - ADR-0029 amendment suggested, not written.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: a stage chain listed a fallback worker that could not change the actual image
  producer; a single global quota record blocked independent producers.
- Graders run and results (PASS/FAIL): test:crew PASS; check-docs-sync PASS; check-no-em-dash PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): if gflow is reliable, consider two illustrate jobs in
  parallel (one per producer).
