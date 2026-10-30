---
id: 0904
title: Licence episode 1 script draft
stage: misc
date: 2026-10-30
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-licence-intro
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "licence", "script", "episode"]
links:
  spec: video-studio/specs/001-urdu-shorts-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - video-studio/episodes/20261030-licence-intro/episode.json (new, production, script_review)
 - video-studio/episodes/20261030-licence-intro/script.json (new, 8 lines, 123 words)
 - video-studio/episodes/20261030-licence-intro/source.snapshot.md (new, Urdu licence landing page at cb393b06)
tests:
 - validate('script') and validate('episode'): pass
 - Every excerpt is verbatim in source.snapshot.md; every beat and recap line cites one
 - npm test (video-studio): 21 pass
---

## Prompt

merged all, draft the episode script

## Response snapshot

PRs #380, #381 and #382 were still open (two blocked on a required review), so nothing was merged
yet; drafted from the #382 branch. Wrote episode 20261030-licence-intro in production mode: the Urdu
landing page snapshotted with SHA-256 and revision, eight cited excerpts, and an eight-line script
(Bilal asks and closes, Ustani explains) trimmed from 186 to 123 words so it lands near 60 s at the
measured V007 pace. CTA uses the approved `licence-prep` template.

## Outcome

- Impact: the script is ready for the pedagogy and Urdu reviews and the owner's script gate.
- Tests: see `tests`.
- Files: see `files`.
- Next prompts: owner merges #380, #381, #382 (then the snapshot revision is updated to the merge commit); reviewer reports; `npm run approve -- 20261030-licence-intro script` by the owner; voice on Kaggle.
- Reflection: the sample voices run about 2.2 words a second with gaps, slower than the brand bible's 150 wpm; size scripts from the measured pace.

## Handoff (for CEO and agents)

- Shipped / changed: licence episode 1 files at script_review.
- Decisions to respect: no claim that the licence is mandatory or raises pay; every factual line cites the site's Urdu section, not the PDF directly.
- Pending: PR merges (owner); pedagogy and Urdu reviewer reports; owner script gate; voicing after the gate.
- Paperclip issues affected: none.
