---
id: 2472
title: ADRs for news feed and weekly digest
stage: misc
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: 028-news-ticker
branch: feat/028-news-ticker
user: M Yousif Channa
command: /sp.adr news-feed-and-public-news-table
labels: [board-direct]
links:
  spec: specs/028-news-ticker/spec.md
  ticket: null
  adr: history/adr/0034-news-feed-sources-and-public-news-table.md, history/adr/0035-weekly-digest-email-delivery.md
  pr: null
files:
  - history/adr/0034-news-feed-sources-and-public-news-table.md
  - history/adr/0035-weekly-digest-email-delivery.md
  - history/adr/README.md
tests:
  - node scripts/check-docs-sync.mjs (in sync)
---

## Prompt

commit and go ahead, run adr

## Response snapshot

Ran /sp.adr over specs/028-news-ticker/plan.md. Clustered Feature 028's decisions into two independent ADRs that passed the significance test (impact, alternatives, cross-cutting):
ADR-0034 News feed sources and public news table (git-derived build-time events + first anon-readable table with RPC-only audited writes) and
ADR-0035 Weekly digest email delivery (edge function + host cron + ISO-week ledger + HMAC one-click unsubscribe, default-on per owner ruling).
Checked against ADR-0006/0007/0008/0032: consistent, no conflicts. Both indexed in history/adr/README.md; status Accepted by owner instruction.

## Outcome

- ✅ Impact: two accepted ADRs recording why news is git-derived and how the weekly email is delivered and consented.
- 🧪 Tests: check-docs-sync passes.
- 📁 Files: two ADRs and the ADR index.
- 🔁 Next prompts: commit, PR, then rollout of migrations, secrets, functions and cron.
- 🧠 Reflection: the ticker data model and the email delivery can evolve independently, so they are separate ADRs rather than one Feature 028 ADR.

## Handoff (for CEO and agents)

- Shipped / changed: ADR-0034 and ADR-0035 (Accepted), ADR index updated.
- Decisions the team must respect: never store private data in `news_items` (it is public once live); content news comes from git, not from CI database writes; the weekly email is one per ISO week via `digest_runs`, and unsubscribe links must stay POST-only behind the confirm page.
- Pending / next owner: rollout per ops/news/README.md (board).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; ADR grader checks (clustered, alternatives with rationale, pros and cons, concise) pass for both.
- Graders run and results (PASS/FAIL): ADR checklist PASS x2; docs-sync PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
