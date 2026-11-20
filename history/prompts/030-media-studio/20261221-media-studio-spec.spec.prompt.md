---
id: 20261221
title: Media Studio specification
stage: spec
date: 2026-11-20
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio
user: M Yousif Channa
command: /sp.specify
labels: [board-direct, media-studio, studio-teaser, notebook-studio, crew]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/030-media-studio/spec.md
  - specs/030-media-studio/checklists/requirements.md
tests:
  - none (specification)
---

## Prompt

currently there are three ways to create audio and video content, one is this course teaser system and second is with gemini notebook system, third the crew only makes svgs and raster images. i want to consolidate the systems to cater audio, video and image creation needs.

(owner answers: "Crew drafts, owner gates (Recommended)"; "Spec + ADR, then phases (Recommended)"; earlier: on-screen presenter in opening and closing clips, off-screen voice in the middle; embed on course overview page and home/catalogue cards; "proceed after uploading all six generated teasers")

/sp.specify Media Studio: consolidate the three media pipelines (course teaser Shorts via gflow/Veo, Gemini Notebook Studio audio/video/docs via nlm, and crew SVG/raster figures via generate-illustration.mjs) into one system with a single job model, one state vocabulary, a producer registry generalised from ADR-0036 (image: agy, gflow nano, Codex; video clip: gflow veo, manual Flow; audio/video overview: nlm; SVG: Codex, Claude) with per-producer quota/unavailable handling, versioned recipes (energetic teaser template: on-screen presenter via Flow Character ingredient with a preset voice in shots 1 and 5, off-screen voice over action in shots 2-4, Urdu <= 18 words, 1.25x pace), shared quality gates (QG0 script, QG1 technical media-qa, QG2 meaning via whisper and frames, QG3 post-upload) and owner gates (script approval before credits, spot-check, public). Owner rulings 2026-11-20: crew drafts audio, video and images when producers are reachable; owner gates approval, spot-check and public; private uploads first. gflow finished-clip detection must be fixed or worked around. Public teasers embed on course overview pages and on home/catalogue course cards. Existing pipelines keep working throughout; no gate script may import the new shared core (review evidence binding).

## Response snapshot

Created branch 030-media-studio and specs/030-media-studio/spec.md: six user stories (crew-drafted
teaser with owner gates, energetic versioned recipe, one status view, producer fallback and
recovery without double payment, public teasers on the site, existing work unaffected), 19
functional requirements, six key entities, seven measurable success criteria, edge cases,
assumptions, dependencies and out-of-scope. Quality checklist passes with no clarification markers.

## Outcome

- ✅ Impact: specification ready for /sp.plan.
- 🧪 Tests: none (specification stage).
- 📁 Files: spec.md, checklists/requirements.md.
- 🔁 Next prompts: /sp.plan for 030-media-studio; ADR after owner consent; decision-log entry.
- 🧠 Reflection: the review-evidence binding is the main structural constraint; it is a requirement (FR-018), not a plan detail.

## Handoff (for CEO and agents)

- Shipped / changed: Feature 030 spec (Media Studio).
- Decisions the team must respect: crew drafts audio/video/images, owner approves scripts before credits, spot-checks and publishes; private first; teaser recipe v2 (presenter shots 1 and 5, action shots 2-4, Urdu <= 18 words, about 1.25x pace, under 30 s); no gate may depend on the shared core.
- Pending / next owner: Claude runs /sp.plan and /sp.tasks; owner consents to the ADR; the decision-log entry amending D-2026-0082 and Feature 029 needs the owner's confirmation.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: none at spec stage.
- Graders run and results (PASS/FAIL): spec quality checklist PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): plan Phase 2 shared core with adapter tests first.
