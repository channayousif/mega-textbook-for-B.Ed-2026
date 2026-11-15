---
id: 0008
title: Produce GENG Unit Two Illustrations
stage: green
date: 2026-11-15
surface: agent
model: GPT-6 (Codex)
feature: 009-figure-rendering
branch: crew/geng-300-u02-illustrate
user: crew
command: Read .crew/brief.md and execute
labels: ["codex", "geng-300", "unit-02", "illustrate"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - docs/semester-1/geng-300/unit-02/index.mdx
  - docs/semester-1/geng-300/unit-02/topic-01.mdx
  - docs/semester-1/geng-300/unit-02/topic-02.mdx
  - docs/semester-1/geng-300/unit-02/topic-03.mdx
  - specs/content/geng-300/figures/unit-02.md
  - specs/content/geng-300/figures/unit-02.banner.md
  - static/img/figures/geng-300/unit-02/fig-U2-7.webp
  - static/img/figures/geng-300/unit-02/fig-U2-8.webp
  - static/img/figures/geng-300/unit-02/fig-U2-9.webp
  - static/img/figures/geng-300/unit-02/fig-U2-10.webp
tests:
  - Baseline build:content-status and check:content passed all 14 gates at origin/main 4afd7143719c2666f85bff10fd51deb7b705aee2
  - Visual inspection of all four generated images passed
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced and inspected the three topic scenes and unit banner using Codex built-in image generation on 2026-11-15 after the required Gemini topic and banner commands failed with QUOTA_EXHAUSTED. Approved prompts and alt text remain in the two unit manifests. Each accepted scene uses Pakistani dress, appropriate classroom settings and geometric page marks without text. GENG-300 is English-only (catalog bilingual: false), with no Urdu mirror to wire.

### Visual inspection and provenance

- fig-U2-8: Codex built-in, 2026-11-15. Teacher compares newspaper and textbook; pairs discuss versus trace columns; girl raises her hand.
- fig-U2-9: Codex built-in, 2026-11-15. Tired line-by-line reading contrasts with focused previewing of headings and question-writing.
- fig-U2-10: Codex built-in, 2026-11-15. Raised hands for recall contrast with thoughtful evaluation and writing after a deeper question.
- fig-U2-7: Codex built-in, 2026-11-15. Three adult student-teacher groups question a newspaper, underline and annotate textbooks, and listen while taking two-column notes.
- All four: no readable text, scripture, calligraphy, sacred persons, maps, flags or emblems; dress, setting, teaching purpose and alt descriptions checked. No rejected candidates.
- Required Gemini calls both returned exit 3, quota reset 2026-11-17T11:00:06Z. The owned banner agy child was sent SIGTERM after waiting without a file; script reported quota failure and released its lock. No other session was stopped.

## Outcome

- ✅ Impact: Four optimized raster illustrations support the Unit 2 classroom examples.
- 🧪 Tests: Baseline 14/14 content gates passed; final evidence and gate outcomes recorded below after validation.
- 📁 Files: Four WebPs, four English MDX carriers, two manifests and this PHR; G2 tracker and evidence refresh follows the content commit.
- 🔁 Next prompts: Owner escalation and independent review remain open as recorded in the existing tracker.
- 🧠 Reflection: Quota failure required the explicitly permitted alternate producer; visual acceptance preceded placement.

## Handoff (for CEO and agents)

- Shipped / changed: Three topic scenes and unit banner produced, inspected and placed with original IDs and English alt text.
- Decisions the team must respect: Approved prompts and alt text are unchanged. Course is English-only; no Urdu mirror exists. G3/G5 and translation status unchanged.
- Pending / next owner: Existing E1, E2 and U1 escalations remain owner/render-host work; fresh G3 requires owner authorisation. No build, server, deployment or publication run.
- Paperclip issues affected: GENG-300 Unit 2 illustration crew job; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Gemini quota exhausted for both required generation commands; Codex built-in fallback succeeded.
- Graders run and results (PASS/FAIL): Baseline check:content PASS, visual inspection PASS; final checks appended after evidence refresh.
- Prompt variant (if applicable): Approved manifest prompts with shared house style and explicit exclusion of lettering, sacred imagery and decorative titles.
- Next experiment (smallest change to try): None required; qualified independent reviewers retain pedagogical certification authority.
