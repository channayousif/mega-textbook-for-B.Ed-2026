---
id: 20261304
title: Owner Decisions page (Feature 035)
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 035-owner-decisions
branch: feat/owner-decisions
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "admin", "crew"]
links:
  spec: specs/035-owner-decisions/spec.md
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: null
files:
 - supabase/migrations/0059_owner_decisions.sql
 - scripts/crew/owner-queue.mjs
 - scripts/crew/decisions-sync.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/tick.sh
 - src/lib/ownerDecisions.ts
 - src/pages/app/admin/decisions.tsx
 - src/lib/dashboardNav.ts
 - src/pages/app/admin/index.tsx
 - tests/crew/owner-decisions.test.mjs
 - tests/unit/ownerDecisions.test.mjs
 - tests/rls/owner-decisions.test.mjs
 - tests/e2e/admin-and-dashboard-a11y.spec.ts
 - tests/profile-dependents.mjs
 - ops/crew/README.md
 - .claude/skills/media-studio/SKILL.md
 - specs/035-owner-decisions/spec.md
 - specs/035-owner-decisions/plan.md
 - specs/035-owner-decisions/tasks.md
tests:
 - node --test tests/crew/*.test.mjs (223 pass)
 - scripts/heavy.sh npm test (636 pass after registering owner_decisions.decided_by)
 - npm run check:docs-sync, check:no-em-dash, check:no-service-key
 - node scripts/crew/decisions-sync.mjs --dry-run against live crew state (8 items)
---

## Prompt

show the status of media creation system, create a full piture of the system in diagram as artifact

1. there are many things waiting on me and i donot have one place to sort them out and decide about them for eg: 

Waiting on you (owner gates)
1
Approve or reject one teaser script: GISS-401 Urdu. No credits are spent until you do.
crew approve-script giss-401-ur or crew reject giss-401-ur <note>
3
Watch three private Shorts, then publish or reject: EFMP-406 (QG2 0.714 on shot 3, whisper spelling only), EFMP-407, EFPG-401 (pseudo-script on a book cover in shot 1).
crew publish <key>
5
Study Studio, EFMP-301 Unit 4: 3 videos and 2 audio briefs private on YouTube (T2 ur video, T3 en video, T3 ur video, T3 en audio, T3 ur audio).
crew approve-studio EFMP-301 4
3
Study Studio, GENG-300 Unit 1 (in progress, 3 more items still assembling): T1 en audio, T1 en video, T2 en audio. Approve once the unit is complete.

2. My proposal is to create a page in the admin dashboard for decisions about the items waiting on me with proper description and links to the artifacts required to make the decisions.

also I want to extend image creation and add a second flow, notebook account. we already have second google pro subscription on which agy2 is working. further I want to benefit from free resources from cloudfare, it is already integrated and our domain is also hosted in it, specially 2000 neurons for workers Ai with open source models.

## Response snapshot

Published a private Media Studio Map artifact (status and full system diagram, from origin/main because
the owner checkout was 252 commits behind). Planned three PRs (owner-approved): 1) Owner Decisions page,
2) second-account producers (agy2 images, gflow2, nlm2), 3) Cloudflare Workers AI (free 10,000
neurons/day, not 2,000: illustration pilot, QG2 whisper offload, text drafts). This PR is part 1: a
host-pushed `owner_queue`, owner `owner_decisions` rows via RPC, `decisions-sync.mjs` in the tick
applying them through `crew.mjs cmd ... --via web --json`, and the `/app/admin/decisions` page.

## Outcome

- ✅ Impact: one admin page lists teaser scripts, private Shorts, Study Studio units, social posts, crew questions and a G3 link, and queues the owner's decision through the crew's own checks.
- 🧪 Tests: crew 223 pass; vitest 636 pass; RLS test written (runs once 0059 is applied); docs-sync, em-dash, service-key checks pass.
- 📁 Files: listed above.
- 🔁 Next prompts: apply migration 0059 (owner confirms); Feature 036 second-account producers; Feature 037 Workers AI.
- 🧠 Reflection: `npm run check:all` includes build and vitest, so it is a heavy job and must go through scripts/heavy.sh.

## Handoff (for CEO and agents)

- Shipped / changed: Feature 035 code, migration 0059 (not yet applied), tick step `decisions-sync.mjs --in-tick`, `crew.mjs cmd --json`, BOARD.md link to the page.
- Decisions the team must respect: the page only records instructions; the crew applies them via `crew.mjs cmd` (via `web`) with the existing checks; a decision on a changed item (digest) is refused; the service key stays in signoff.env and is stripped from the child command.
- Pending / next owner: 0059 applied to live Supabase on 2026-11-27 after the owner's "ok" (psql --single-transaction on supabase-db, then NOTIFY pgrst; grants verified; RLS test passes live; rollback: `drop table public.owner_decisions, public.owner_queue cascade; drop function public.record_owner_decision(text,text,text,jsonb), public.withdraw_owner_decision(uuid), public.replace_owner_queue(jsonb,timestamptz), public.mark_owner_decision(uuid,text,text,text);`). Owner merges #935, then makes one real decision (T010, #934). Claude does Features 036 and 037 next.
- Paperclip issues affected: none (Paperclip retired); GitHub issues for T009/T010.

## Evaluation notes (flywheel)

- Failure modes observed: a full gate run started an unguarded build; stopped it.
- Graders run and results (PASS/FAIL): crew tests PASS, vitest PASS, docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): show the Decisions page count in the WhatsApp digest.
