---
id: 20261267
title: LinkedIn comment permission researched; first comments pasted by the owner
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/phr-linkedin-comments
user: M Yousif Channa
command: none
labels: [board-direct, career, linkedin, social]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - ~/career main (commit bc6880e, pushed): scripts/crew/linkedin.mjs, scripts/crew/posts-pipeline.mjs, tests/posts.test.mjs, README.md
  - history/prompts/general/20261267-linkedin-first-comment-manual.general.prompt.md
tests:
  - career: node --test tests/*.test.mjs (15 pass); build/posts.py --week 2026-W49 --text ok
---

## Prompt

look into getting comment permission from LinkedIn

yes make both changes

## Response snapshot

Researched the 403 on POST /rest/socialActions/{urn}/comments. LinkedIn's docs map comment creation to w_member_social_feed, which comes only with the Community Management API: registered legal organisations, commercial use, verified business email, verified company page, a new app with no other products, and LinkedIn review. That does not fit an individual officer's personal profile or the no-selling rule, and browser automation of comments would break LinkedIn's terms. Recommended pasting the first comment by hand. On approval, made the comment call opt-in (LINKEDIN_COMMENTS=1) and made the crew send the comment text to #career as its own message after each post.

## Outcome

- ✅ Impact: no failing comment call or warning on each post; the owner copies the first comment from one Discord message.
- 🧪 Tests: 15 node tests pass, including the manual and opt-in comment paths.
- 📁 Files: career repo (see files); this PHR.
- 🔁 Next prompts: none required; revisit only if a registered organisation ever applies for the Community Management API.
- 🧠 Reflection: the "post, comment and like" wording of w_member_social is misleading; the comment endpoint needs w_member_social_feed.

## Handoff (for CEO and agents)

- Shipped / changed: ~/career main pushed (private repo). No production or textbook-repo change besides this PHR.
- Decisions the team must respect: LinkedIn first comments on the owner's posts are pasted by him; do not apply for the Community Management API or automate comments through a browser session.
- Pending / next owner: none. Note for the owner: he dropped P-2, so 26 Nov has no post.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an API scope described as covering comments did not cover the comment endpoint.
- Graders run and results (PASS/FAIL): career node tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none.
