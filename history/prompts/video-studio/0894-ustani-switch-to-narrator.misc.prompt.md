---
id: 0894
title: Ustani switches to the consented narrator
stage: misc
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "v005", "consent", "pi-08", "adr"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0013-ustani-voice-consented-narrator.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/347
files:
 - video-studio/history/adr/0013-ustani-voice-consented-narrator.md (new)
 - video-studio/brand/voices/ustani.md
 - video-studio/brand/brand-bible.yaml
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - none (decision record; round 9 evidence in results-round9-*)
---

## Prompt

prefer her voice

## Response snapshot

Recorded VS-ADR-0013: Ustani's card now clones the narrator's reference `ref-ustani-rec1.wav`
(SHA-256 d05de3c5...) under consent `narrator-02`, same engine, settings and lexicon. The card and
the brand bible mark Ustani cleared to publish; the ElevenLabs reference is retired to evaluation
only. The verbal-only consent is recorded as a gap: a written note from the narrator is advised.

## Outcome

- Impact: both characters now have publishable, consented voices.
- Tests: none run; evidence is round 9.
- Files: see `files`. No media, names or consent records in git.
- Next prompts: written note from the narrator; owner squash-merges PR #347; V006, V007.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: VS-ADR-0013 and Ustani's card switch. PR #347.
- Decisions to respect: Ustani clones `ref-ustani-rec1.wav` only; the narrator is cited only as `narrator-02`; ElevenLabs voices stay evaluation only; any further card change needs an ADR.
- Pending: written consent note from the narrator (owner); squash merge of PR #347 (owner); V006, V007.
- Paperclip issues affected: none.
