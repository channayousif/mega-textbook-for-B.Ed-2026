---
id: 20261243
title: Feature 031 Social Updates, core (collector, card, image posting, ledger)
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 031-social-updates
branch: feat/031-social-updates
user: M Yousif Channa
command: social updates feature
labels: [board-direct, social-updates]
links:
  spec: specs/031-social-updates/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/social/updates.mjs
  - scripts/social/card.mjs
  - scripts/social/publish.mjs
  - scripts/notebook-studio/social-post.mjs
  - tests/unit/social-updates.test.mjs
  - tests/unit/media-isolation.test.mjs
  - .claude/skills/social-updates/SKILL.md
  - .claude/skills/media-studio/SKILL.md
  - specs/031-social-updates/spec.md
  - specs/031-social-updates/plan.md
  - specs/031-social-updates/tasks.md
  - specs/decisions/log.md
tests:
  - tests/unit/social-updates.test.mjs (11)
  - tests/unit/media-isolation.test.mjs
  - tests/unit/notebook-studio-social.test.mjs
---

## Prompt

i want to extend updates this feature to create social media posts on supporting platforms, it should be tied to green prs and may be handeled by crew seamlessly with proper branding and informative style for providing platform updates and features to the viewers and audiences

(owner choices in plan mode: "Auto for content, approve features"; "Daily roundup"; "Branded image
card + caption"; scope "New content, Platform features, Media, Review and imrovements/updates to
existing content")

## Response snapshot

- Collector reads only deployed work: the live news feed, public teasers, and merged `feat(...)`
  PRs whose merge commit the deploy log shows live. Two daily drafts, content and feature, each
  source id posted once.
- Deterministic content copy (EN and UR); feature lines are written by the crew worker per the new
  skill, and `check` refuses unwritten ones.
- 1080x1350 brand card rendered with sharp; checked by eye on today's live data (two layout passes:
  Urdu anchoring, headline wrap, pill fit, Urdu lines for short cards).
- Image posting added to social-post.mjs (Facebook photo by URL, Instagram image by URL, LinkedIn
  image upload); cards go to a public `social-cards` storage bucket.
- Ledger `specs/social/updates.json` with pilot approval, auto-approval for content afterwards,
  owner approval for features.

## Outcome

- ✅ Impact: the posting pipeline exists and is tested; nothing is posted until the pilot.
- 🧪 Tests: social-updates 11, isolation and social-post tests pass.
- 📁 Files: see front matter.
- 🔁 Next prompts: PR 2 crew stage and commands; PR 3 pilot.
- 🧠 Reflection: "only deployed work" is enforced by reading the live feed, not the repository.

## Handoff (for CEO and agents)

- Shipped / changed: scripts/social, image posts, skill, spec, D-2026-0096.
- Decisions the team must respect: content auto-posts only after the pilot; features need `crew post`.
- Pending / next owner: Claude: crew stage (PR 2) and pilot (PR 3). ADR candidate "crew-published
  social posts" awaits the owner's consent.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: SVG `direction` flipped the Urdu anchor in librsvg; fixed by anchoring only.
- Graders run and results (PASS/FAIL): unit PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add the highlight's course badge colour per course.
