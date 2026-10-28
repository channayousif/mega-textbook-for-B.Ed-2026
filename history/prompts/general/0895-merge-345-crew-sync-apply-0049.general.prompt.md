---
id: 0895
title: Merge 345, enable crew sync, apply 0049
stage: general
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/g3-signoff-desk
user: M Yousif Channa
command: (board-direct) merge #345 when green; create signoff.env; apply 0049 to production
labels: ["board-direct", "production", "supabase", "migration", "crew", "g3"]
links:
  spec: null
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/345
files:
 - ~/.crew/mega-book/signoff.env (host only, mode 600, never committed)
tests:
 - 0049 applied with psql --single-transaction ON_ERROR_STOP (exit 0); RLS on, insert-only policy present
 - service key GET /rest/v1/g3_signoffs -> 200; anon -> 401
 - signoff-sync.mjs --dry-run with signoff.env -> "nothing queued", exit 0
---

## Prompt

merge when green, turn on crew sync, Apply 0049 to production.

## Response snapshot

- **0049 (`page_feedback`):** applied to production exactly as it is on main, in one transaction. RLS is on, and the only policy allows INSERT for everyone. I sent `NOTIFY pgrst` so the API serves the table.
- **Crew sync:** I created `~/.crew/mega-book/signoff.env` (mode 600) with `SUPABASE_URL=https://api.textbook.com.pk` and `SUPABASE_SERVICE_ROLE_KEY`, both taken from the existing `.env.local`.
  - The service key reads `g3_signoffs` (200). The anon key is refused (401).
  - A dry run of `signoff-sync.mjs` printed "nothing queued".
  - The live `tick.sh` merges main every tick, so the sync starts on the first tick after #345 merges.
- **Merge:** #345 merges when CI is green. The first run failed `e2e`: `page.locator('tbody tr')` matched the hidden rows of the collapsed By-course table. The units table now has `aria-label="Units"`, and the test scopes to it.

## Outcome

- ✅ Impact: the feedback widget's table exists on production; G3 desk decisions will become crew PRs once #345 is on main.
- 🧪 Tests: listed above.
- 📁 Files: host config only, plus this PHR.
- 🔁 Next prompts: the owner records the first decisions on `/app/admin/g3-signoff`.
- 🧠 Reflection: 0049 accepts unbounded anonymous inserts and has no admin read policy. It works for the widget, but it is open to spam, and admins can read it only with the service key.

## Handoff (for CEO and agents)

- Shipped / changed:
  - `page_feedback` is live on production.
  - `signoff.env` is in place.
  - #345 merges on green.
- Decisions the team must respect: `signoff.env` holds the service key. Only the subshell in `tick.sh` reads it, so never source it into a worker's environment.
- Pending / next owner:
  - Follow-up migration for `page_feedback`: a length check on `comment` and `page_path`, an `is_admin()` select policy, and possibly rate limiting. Unowned; suggested.
  - Default privileges give anon and authenticated TRUNCATE on new tables. TRUNCATE is not reachable through PostgREST, so this is low risk. Noted only.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): apply PASS, REST privilege probe PASS, sync dry run PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): record applied migrations in a table so "is 00NN on production?" has an answer.
