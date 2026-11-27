# Tasks: Feature 035 - Owner Decisions page

- [x] T001 Spec, plan and tasks for Feature 035
- [x] T002 Migration 0059: `owner_queue`, `owner_decisions`, record/withdraw/replace/mark RPCs
- [x] T003 `scripts/crew/owner-queue.mjs` queue builder and `commandFor`, with tests (`tests/crew/owner-decisions.test.mjs`)
- [x] T004 `crew.mjs cmd --json` reports `{ ok, reply }` from the handlers' refusals
- [x] T005 `scripts/crew/decisions-sync.mjs` and the tick.sh step
- [x] T006 Page `/app/admin/decisions`, pure `src/lib/ownerDecisions.ts` with tests, nav and hub card
- [x] T007 RLS test `tests/rls/owner-decisions.test.mjs`
- [x] T008 Docs: `ops/crew/README.md` owner commands, `media-studio` SKILL.md
- [ ] T009 Apply migration 0059 to live Supabase and run `npm run test:rls -- owner-decisions` (owner confirms) (#933)
- [ ] T010 First real decision from the page applied by the crew (`via: "web"`) (#934)
