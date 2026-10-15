---
id: 0103
title: "TEX-16 Licence index: sweep معیارِ نشان دہی → معیارِ جانچ"
stage: content
date: 2026-10-09
surface: agent
model: claude-opus-5-5
feature: licence
branch: agent/TEX-16
user: BilingualAuthor (Paperclip wake)
command: paperclipai
labels: ["bilingualauthor", "content", "licence", "terminology-sweep"]
links:
  spec: specs/content/terminology.csv
  ticket: TEX-16
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs-licence/current/index.mdx
tests:
 - npm run check:content (12/13 pass; check:content-status pre-existing fail, unrelated)
---

## Prompt

TEX-16 — Sweep the licence index to معیارِ جانچ for 'rubric' (2 lines, Reviewer-recommended). The licence track index was the last place in the Urdu tree still using معیارِ نشان دہی. Both occurrences on lines 12 and 29 of i18n/ur/docusaurus-plugin-content-docs-licence/current/index.mdx needed updating to the frozen terminology bank term معیارِ جانچ. Also decide whether the (روبرک) parenthetical gloss stays.

## Response snapshot

Replaced both occurrences of معیارِ نشان دہی with معیارِ جانچ. Dropped the (روبرک) parenthetical from line 12: the English source carries no gloss, and the frozen terminology bank uses معیارِ جانچ without one. Committed and pushed to agent/TEX-16. 12 of 13 content gates pass; the one failure (check:content-status) is pre-existing and unrelated to this change.

## Outcome

- ✅ Impact: the entire Urdu tree now uses معیارِ جانچ consistently for "rubric". No remaining occurrences of معیارِ نشان دہی in the licence index.
- 🧪 Tests: 12/13 content gates pass. check:content-status fails pre-existing (static/content-status.json missing).
- 📁 Files: i18n/ur/docusaurus-plugin-content-docs-licence/current/index.mdx (2 lines changed).
- 🔁 Next prompts: draft PR to open for CurriculumOwner review.
- 🧠 Reflection: a grep with `i18n/ur/*` (single-level glob) missed a third occurrence in pedagogy/c-classroom-management/practice.mdx. That file is outside TEX-16's stated scope (index only) and is noted for CurriculumOwner to triage.

## Handoff (for CEO and agents)

- **What shipped:** terminology sweep on the licence Urdu index — معیارِ نشان دہی → معیارِ جانچ, (روبرک) gloss removed.
- **Decisions the team must respect:** the frozen term معیارِ جانچ is now used everywhere in the licence index. No English page changes were needed.
- **What is pending and who owns it:** CurriculumOwner review of the draft PR. Additionally, one more occurrence of معیارِ نشان دہی exists in `i18n/ur/docusaurus-plugin-content-docs-licence/current/pedagogy/c-classroom-management/practice.mdx` — outside TEX-16 scope, flagged for owner triage.
- **Paperclip issues affected:** TEX-16 (this task).
