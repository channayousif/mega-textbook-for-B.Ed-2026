---
id: 20261252
title: Social posts in descriptive language with full course titles; first roundup posted
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 031-social-updates
branch: feat/social-descriptive-copy
user: M Yousif Channa
command: Post now, use full course titles with codes, use descriptive language for ordinary audience
labels: [board-direct, social]
links:
  spec: specs/031-social-updates/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/social/updates.mjs
  - scripts/social/card.mjs
  - scripts/crew/social.mjs
  - .claude/skills/social-updates/SKILL.md
  - tests/unit/social-updates.test.mjs
tests:
  - npx vitest run tests/unit/social-updates.test.mjs tests/unit/notebook-studio-social.test.mjs (19 passed)
---

## Prompt

Post now, use full course titles with codes, use descriptive language for ordinary audience to promote understanding.

## Response snapshot

- Rewrote the two waiting drafts (2026-11-23 content and feature) with full course titles and
  codes and plain explanations (unit topics, what the videos show, why the diagrams help), every
  fact taken from the catalogue and unit titles; re-rendered the cards; posted both to Facebook,
  Instagram and LinkedIn. The content post was the pilot.
- Code: each highlight now has a short card line (`card_en`/`card_ur`, at most 68 characters) and
  a caption sentence (`en`/`ur`, at most 320); the generator looks up course titles in
  `catalog/courses.json` and writes descriptive copy for every kind (course, units, Urdu,
  figures, revisions, reviews, teasers); `check` enforces the card, caption, headline and the
  Instagram 2,200-character limit; `copy` takes card lines for feature posts; the crew brief and
  the social-updates skill carry the rule.
- Auto-publishing of content is held (ledger `config.pilot` back on, with a note) until this
  generator is live in the crew checkout, so tonight's roundup does not post in the old style.

## Outcome

- ✅ Impact: posts explain what is new to an ordinary reader, with full course titles.
- 🧪 Tests: 19 social tests pass.
- 📁 Files: see front matter. Ledger and cards are host-local (~/studio-media/social).
- 🔁 Next prompts: after merge, fast-forward the crew checkout and set `config.pilot` false
  (remove the hold); add the animated figures to the media lines.
- 🧠 Reflection: the card and the caption need different lengths; one string for both forced
  terse copy.

## Handoff (for CEO and agents)

- Shipped / changed: descriptive copy, card lines, checks, skill and brief.
- Decisions the team must respect: owner rule 2026-11-23, full course titles with codes and
  descriptive language in every social post.
- Pending / next owner: Claude: lift the hold once the crew checkout has this code.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a long caption over Instagram's limit; headline cut on the card.
- Graders run and results (PASS/FAIL): vitest PASS; checkDraft PASS on both posts.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): show the owner a rendered preview in the digest.
