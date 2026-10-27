---
id: 0892
title: Bilal uses the owner's voice
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "consent", "pi-08"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0012-bilal-voice-owner-recording.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/history/adr/0012-bilal-voice-owner-recording.md (new)
 - video-studio/brand/voices/shagird.md (reference switched, cleared)
 - video-studio/brand/brand-bible.yaml (Bilal voice status)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
 - $MEDIA_ROOT/consents/2026-10-narrator-01.md (not in git; SHA-256 cbee0bcf1fe30591ea7073418a943f64da1d5c46f178d7ba9a0e608129ccf1b3)
tests:
 - npm test; tsc --noEmit; zero em dashes; no media staged
---

## Prompt

Complete and sign to use my voice

## Response snapshot

An agent cannot sign for the owner, so the consent was recorded from the owner's own words and
their answers to four scope questions: all platforms (YouTube, Instagram, Facebook, TikTok,
textbook.com.pk, any other), promotional use yes, Kaggle processing agreed, published videos stay
up on withdrawal. Record `narrator-01` is in `$MEDIA_ROOT/consents/` (no signed scan). VS-ADR-0012
switches Bilal's card to the owner's WAV take (`ref-shagird-rec3.wav`); Bilal is cleared to publish.

## Outcome

- Impact: Bilal has a publishable voice with clear rights; Ustani is still blocked (ElevenLabs reference).
- Tests: see `tests`.
- Files: see `files`. No media or consent record in git.
- Next prompts: a consented recording (or secured rights) for Ustani; V006 import validation; V007 first short.
- Reflection: consent scope was asked, not assumed; the record quotes the owner verbatim.

## Handoff (for CEO and agents)

- Shipped / changed: VS-ADR-0012; Bilal card on the owner's voice. PR #336.
- Decisions to respect: Bilal clones `ref-shagird-rec3.wav` under consent `narrator-01`; the scope in that record binds every use; withdrawal stops new audio and deletes Kaggle data, published videos stay. Ustani may not be published until her card records rights.
- Pending: Ustani rights or a consented female recording (owner); V006, V007; PR #336 merge (owner).
- Paperclip issues affected: none.
