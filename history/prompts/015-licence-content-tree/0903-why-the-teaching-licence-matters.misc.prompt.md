---
id: 0903
title: Why the Teaching Licence matters section
stage: misc
date: 2026-10-30
surface: agent
model: claude-opus-5-5
feature: 015-licence-content-tree
branch: content/licence-why-it-matters
user: M Yousif Channa
command: none
labels: ["board-direct", "licence", "content", "video-studio", "steda"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - licence/index.mdx (new section "Why the Teaching Licence matters")
 - i18n/ur/docusaurus-plugin-content-docs-licence/current/index.mdx (Urdu mirror "ٹیچنگ لائسنس کیوں اہم ہے")
tests:
 - npm run check:content: 13/13 gates pass
 - npm run build: pass; section present in build/licence/ and build/ur/licence/
 - Every claim re-read against the policy PDF on 2026-10-30 (clauses 1.1.1-1.1.9, 2.1, 2.4-2.6, 2.9, 3.1.1, 3.3.1, Background)
---

## Prompt

use studio as default, then start the site section, change to "why the Teaching licence matters"

## Response snapshot

Set the studio backdrop as the default video set (PR #381). Added a cited section "Why the
Teaching Licence matters" to the licence landing page and its Urdu mirror: who issues the licence
and what the test is based on, the three categories and the classes each covers, eligibility for
new graduates (degree alone) and in-service teachers (with 2 or 3 years' experience, private
schools included), five-year validity with CPD renewal and the six-month re-sit, the policy's stated
purpose in its own words, and a note that the rollout is phased and portability between provinces
is planned, not in force. Source: STEDA, Teaching License Policy, Sindh 2023 (page and PDF).

## Outcome

- Impact: the first licence reel (episode 20261030-licence-intro) can take its source snapshot from this merged Urdu section; viewers land on a page with the same facts.
- Tests: see `tests`.
- Files: see `files`.
- Next prompts: owner merges; reel episode files and script are drafted from the merged Urdu text; owner script gate.
- Reflection: the policy does not make the licence mandatory for jobs or tie it to pay; the section says neither.

## Handoff (for CEO and agents)

- Shipped / changed: licence landing page section in EN and UR.
- Decisions to respect: never claim the licence is mandatory for hiring or raises pay; portability is planned, not in force; cite STEDA (2023) for any licence-benefit claim.
- Pending: owner merge and deploy; video episode 1 script (Claude) and script gate (owner).
- Paperclip issues affected: none.
