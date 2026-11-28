---
id: 20261317
title: Content Pack v2 Stages 3-4 Flow kit and pack scripts
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 038-content-pack-v2
branch: feature/038-stage3-4-kit-scripts
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "content-pack"]
links:
  spec: specs/038-content-pack-v2/spec.md
  ticket: null
  adr: history/adr/0040-content-pack-v2-supersedes-the-teaser-model.md
  pr: null
files:
 - specs/studio/flow/{README.md,prompt-formula.md,shot-list.template.csv,credit-log.csv,library.md}
 - scripts/media/pack/{paths,intake,debrand,captions,highlights,reframe,metadata,embed}.mjs
 - scripts/media/pack/README.md
 - scripts/media/producers/cfai.mjs
 - tests/unit/media-pack-scripts.test.mjs
 - specs/038-content-pack-v2/{tasks.md,PLAN-v2.md}
tests:
 - scripts/heavy.sh npx vitest run (4 files, 52 pass; 17 new)
 - live on EFMP-301 U4 T1/T2 NotebookLM overviews: debrand detect found the outro logo card by its cut on all 3 (end - 3.00 s); confirmed tail render ends on content; captions 139 cues / 1,425 words in 43 s on Workers AI (about 370 neurons); highlights 6 candidates; reframe 1080x1920 stacked base clip; intake and metadata draft
 - check-docs-sync, check-studio-manifest pass; no long dashes
---

## Prompt

ok move on

## Response snapshot

Read the owner's cast decisions from the approval page: all four approved (recorded on the Stage 2
branch). Flow image caps on both accounts were full until 00:00 PKT, so sheets wait. Built Stage 3,
the Flow kit (shot prompt formula with the verbatim character blocks and style token, mode table,
watermark rule, shot-list template, credit log, library), and Stage 4, seven pack scripts with pure,
tested cores. Measured three real NotebookLM overviews first: none opens with a logo, each holds a
NotebookLM-style title slide for 18-35 s while the narrator speaks, and each ends on a "Gemini
Notebook" logo card for exactly 3 s. So debrand trims the outro (and a logo intro when present) and
reports the title-slide span for the opener to cover rather than cutting lesson audio. Added
`transcribeTimed` to the Workers AI client after a live check showed word-level timings. Scripts are
Node, not the Python the brief named, to reuse the repo's ffmpeg, Workers AI and manifest code.

## Outcome

- ✅ Impact: every scripted pipeline step from intake to embed runs on a real topic; the remaining stages are the Remotion templates, the admin page, the prompts and crew wiring.
- 🧪 Tests: 52 focused vitest pass; live runs listed above.
- 📁 Files: listed above.
- 🔁 Next prompts: owner rules on the corner "Gemini Notebook" mark; character test images after 00:00 PKT; Stage 5 Remotion templates.
- 🧠 Reflection: measuring the real videos before coding changed the design (title slide is covered, not cut).

## Handoff (for CEO and agents)

- Shipped / changed: Flow kit; `scripts/media/pack/*`; `transcribeTimed` in cfai.mjs.
- Decisions the team must respect: debrand never cuts the NotebookLM title-slide span (it carries narration); render refuses unconfirmed cuts; uploads are private with the synthetic-media flag; the disclosure line is fixed in `metadata.mjs`.
- Pending / next owner: every NotebookLM slide carries a small "Gemini Notebook" mark in the bottom-right corner. ADR-0040 allows removing visible marks only by an official setting or by regenerating, and NotebookLM has no setting; owner to rule whether it stays, or whether flagship topics are rebuilt from our own visuals. Character test images (T009) after the Flow caps reset.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: "Ms." ended a caption mid-sentence (fixed with an abbreviation guard); the Write tool stored escaped long dashes as literal characters (rewritten as escapes).
- Graders run and results (PASS/FAIL): vitest PASS; live checks PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run highlights with a real `[SHORT-CANDIDATE]` script once Stage 7 prompts exist.
