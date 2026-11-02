---
id: 0903
title: G3 desk lanes and suggestions
stage: general
date: 2026-11-02
surface: agent
model: claude-opus-5-5
feature: none
branch: feature/g3-desk-lanes
user: M Yousif Channa
command: none
labels: ["board-direct", "g3-signoff", "admin-desk", "adr-0032", "crew"]
links:
  spec: null
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: null
files:
 - src/lib/g3Desk.ts
 - src/pages/app/admin/g3-signoff.tsx
 - src/components/G3Desk.module.css
 - tests/unit/g3Desk.test.mjs
tests:
 - tests/unit/g3Desk.test.mjs (26 pass, 7 new)
 - npm run build
---

## Prompt

why crew is not processing newly developed course specs

(follow-ups in the same session)

resume

approve all the specs and make crew start the work. why local main is behind origin main. should we sync them?

(answer to the catalog question) our goal is to continuously add new courses so this limitation is a bottleneck, every new addition will invalidate the existing g3 rewiv must be avoided

how can we simplify g3 signoff on the admin panel, currently the is a long list of check boxes and no clear suggestions, make the process simple to sign-offs courses with options/suggestions provided for quick signoff units

## Response snapshot

Diagnosis: crew is idle (focus null, nothing in flight) because the six Semester 3 specs (EFMP-406/407, EFPG-401, GICP-400, GISS-401, GUHQ-301) are only on the unpushed local branch `content/sem3-content-specs`, and are all `status: draft`. `specUnitNumbers()` queues author jobs only for `status: approved` specs on main. Adding the courses to `catalog/courses.json` would make every G2/G3/G5 manifest stale, because `review-evidence.mjs` binds the whole catalog. A per-course binding was planned (Track 2) but not built. The owner then redirected the session to the G3 desk.

Shipped in this PR: the desk's default view is now a "To do" list in three lanes, built from the live desk data (89 units awaiting):
- Ready to certify (31): one click per unit, per course, or for all, with a Read link per unit and one pair of attestations per batch.
- Your ruling needed (8): each open uncertain finding and each unverified criterion becomes a question with "Accept as is / I checked: it passes" or "Needs a fix" buttons. `applyRulings` then suggests certify or revise.
- Send back to the crew (50): failed criteria, open blocking findings or failing gates. One click sends them back with an auto-written note (`revisionNote`) that lists the failures and open findings.
The unit drawer leads with a suggested-decision card. The criteria grid, findings checkboxes and tracker history are collapsed under Details. The old filtered table is kept as "All units (advanced)". `batchEligible` now ignores the agent's `render-review` exit code, because `certificationInput` replaces it with the owner's own `rendered_inspected` attestation.

No database, trigger or sync change: every lane item passes `signoffProblem`, the client mirror of trigger 0050.

## Outcome

- ✅ Impact: G3 sign-off goes from a 7-dropdown, N-checkbox form per unit to one suggested action per unit and one bulk action per lane.
- 🧪 Tests: tests/unit/g3Desk.test.mjs 26/26; lane logic run against the live g3-desk.json gives 31/8/50, and every suggested item passes signoffProblem.
- 📁 Files: src/lib/g3Desk.ts, src/pages/app/admin/g3-signoff.tsx, src/components/G3Desk.module.css, tests/unit/g3Desk.test.mjs.
- 🔁 Next prompts: Track 1 (approve the six Semester 3 specs, push the branch, start crew); Track 2 (bind evidence to the reviewed course's own catalog entry, then add the catalog entries); give an owner-requested revise one fresh review_en.
- 🧠 Reflection: 50 of the 89 "awaiting" units had failed criteria or open blocking findings. The desk had been asking the owner to judge units that only needed repair.

## Handoff (for CEO and agents)

- Shipped / changed: G3 desk lane view (`/app/admin/g3-signoff`), pure helpers `laneOf`, `suggestion`, `revisionNote`, `rulingQuestions`, `applyRulings`, `laneInput` in `src/lib/g3Desk.ts`.
- Decisions the team must respect: lane rules live in `g3Desk.ts` only; the agent's `render-review` exit code no longer blocks a clean certify (the owner's rendered_inspected attestation is the render check). Ledger trigger 0050 and signoff-sync are unchanged.
- Pending / next owner: owner works the desk. Crew owner (board-direct): (1) an owner revise on an escalated unit at the cycle cap is repaired but never re-reviewed (`planner.mjs` reReviewDue, MAX_REVIEW_CYCLES = 2), so it returns to the desk unverified; (2) Semester 3 spec approval (Track 1) and per-course catalog binding (Track 2) are not started.
- Paperclip issues affected: none (Paperclip retired; crew drives corpus work).

## Evaluation notes (flywheel)

- Failure modes observed: the desk put repair work in front of the owner as sign-off work; its batch rule required an agent render-review that only a person can give.
- Graders run and results (PASS/FAIL): vitest g3Desk PASS; npm run build (see PR).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): let crew auto-queue repair_en for send_back-lane units whose cycles are not exhausted, so they never reach the desk.
