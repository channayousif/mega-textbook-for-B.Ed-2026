---
id: crew-efmp-305-u04-translate-r1
title: crew retry translate EFMP-305 unit 4
stage: misc
date: 2026-10-19
surface: agent
model: longcat/LongCat-2.0
feature: efmp-305
branch: crew/efmp-305-u04-translate-r1
user: crew
command: crew translate retry
labels: ["crew", "opencode", "translate", "verify"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-305/crew-efmp-305-u04-translate-r1.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified EFMP-305 Unit 4 Urdu mirror is already complete on this branch (matches origin/main exactly; earlier work merged via PR #226). Ran all 13 content gates — all pass. Both index.mdx files remain translation_status: draft as required. No new files to commit; working tree clean.

## Outcome

- ✅ Impact: verified EFMP-305 Unit 4 Urdu mirror completeness and gate-clean state on retry branch.
- 🧪 Tests: npm run check:content — all 13 gates pass (with temporary reviewed flip reverted).
- 📁 Files: none changed (branch identical to origin/main).
- 🔁 Next prompts: crew lead to derive next stage from main after merge.
- 🧠 Reflection: translation work was already complete from earlier attempt; this was a verification pass.

## Handoff (for CEO and agents)

- Shipped / changed: nothing new — verified existing translation is gate-clean.
- Decisions the team must respect: G3/G5 stay advisory; translation_status stays draft pending independent G5.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; branch is clean and matches main.
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief v1 retry r1.
- Next experiment (smallest change to try): none.
