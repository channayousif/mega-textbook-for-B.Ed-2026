---
id: 0082
title: Revert licence checkout PR 80
stage: general
date: 2026-10-02
surface: agent
model: claude-opus-5-5
feature: none
branch: revert/pr-80-licence-checkout
user: channayousif
command: none
labels: ["revert", "paperclip", "agents", "deploy", "supabase", "repo-hygiene"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/80
files:
 - (revert of PR #80: 44 files, including supabase/migrations/0049-0052, src/pages/pricing.tsx, src/pages/app/purchase.tsx, src/pages/app/licence/practice.tsx, src/pages/app/admin/orders.tsx)
 - specs/decisions/adr-proposals.md (restored)
 - history/prompts/general/0081-propose-non-claude-authoring-agents.general.prompt.md (restored)
tests:
 - none (revert); production state checked before and after
---

## Prompt

i have seen a directory /home/a2ahs/mega_book_for_B.Ed-tex10, why it is outside of project directory /home/a2ahs/mega_book_for_B.Ed

(Follow-up answers: "Revert #80 for now"; repo hygiene: main checkout back to main, agents use .claude/worktrees, protect main on GitHub, tidy TEX-10 worktree.)

## Response snapshot

The -tex10 directory is a git worktree created by the Paperclip ContentAuthor agent for TEX-10. Investigation also found that the WebLeadAgy agent checked out agent/TEX-8 and agent/TEX-9 in the shared main checkout and staged unrelated uncommitted files (the ADR-0024 amendment proposal and PHR 0081) into its TEX-8 commit. PR #80 (TEX-8, licence practice pass checkout) and PR #81 (TEX-9) were merged and deployed by deploy-prod.sh, but migrations 0049-0052 were never applied, so the live pricing and purchase pages reference tables that do not exist. This branch reverts PR #80 and restores the ADR proposal and PHR 0081 as separate content so they are not lost with the revert.

## Outcome

- ✅ Impact: half-shipped payment feature removed from main once this PR is merged and deployed; ADR proposal and PHR 0081 kept.
- 🧪 Tests: none run (pure revert); `orders`/`entitlements` confirmed absent in production before the revert.
- 📁 Files: revert of PR #80; restored specs/decisions/adr-proposals.md and PHR 0081.
- 🔁 Next prompts: review the TEX-8 feature (migrations, RLS, payment flow) properly before re-landing it as a new PR.
- 🧠 Reflection: agents sharing one checkout and one GitHub identity can merge and deploy unreviewed work; isolate them in worktrees and gate merges.

## Evaluation notes (flywheel)

- Failure modes observed: agent `git add -A` swept unrelated files; agent PR merged without the migrations being applied.
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): role-file rule that agents work only in .claude/worktrees and stage only their own files.
