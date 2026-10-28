---
id: 0902
title: Crew finishes one course before the next
stage: general
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/crew-course-focus
user: M Yousif Channa
command: (board-direct) plan approved: crew course focus
labels: ["board-direct", "crew", "planner", "scheduling"]
links:
  spec: null
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
 - scripts/crew/planner.mjs (focusCourse, IN_FLIGHT, isCorpusStage)
 - scripts/crew/crew.mjs (plan() withholds author jobs for non-focus new courses; queueOrder puts the focus after the owner's priority list)
 - scripts/crew/resume.mjs (Focus line in "Resume here")
 - tests/crew/planner.test.mjs
 - tests/crew/resume.test.mjs
tests:
 - npm run test:crew (82 pass)
 - crew.mjs plan --dry-run on the live board, before and after the GPKS-402 approval
---

## Prompt

why the course GPKS-402 is still not authored, fix it. Configure crew to complete one course before moving to the next. many incomplete courses are not desired, prioritise completing what was initiated.

## Response snapshot

The GPKS-402 half ships in PR #360 (PHR 0901). This PR adds the crew focus.

**Owner ruling (AskUserQuestion):** a course is finished *for the crew* once no crew work is left on it; whatever remains waits on the owner. Only then may the crew start a new course.

- **Started course:** at least one authored unit, or corpus crew work in flight on the board.
- **Crew work left:** jobs that are queued, running, pr_open, ready or batched.
  - Maintenance and intel stages never count.
  - `gate_red` and `blocked` jobs wait on a person, so they never hold the crew.
- **`focusCourse`:** picks the started course with work left and the fewest jobs remaining, ties broken by catalog order. With none left, it picks the first approved but unstarted course.
- **`plan()`:** withholds author jobs for every other unstarted course. The focus is stored on `board.focus`, and the plan line prints it along with any held jobs.
- **`queueOrder`:** the owner's `crew prioritise` list first, then the focus course, then everything else.
- **BOARD.md:** a Focus line under "Resume here".

**Dry runs on the live board:**
- On current main: focus EFMP-301 (1 job left).
- With GPKS-402 approved: the same focus, and the 6 GPKS-402 author jobs are held. They start once EFMP-301, GNAS-301 and GQUR-300 have no crew work left; those three currently have the requeued merge fixes and one repair between them.

## Outcome

- ✅ Impact: at most one new course is started at a time, after the started courses have no crew work left.
- 🧪 Tests: 82/82 crew tests pass, including the new focusCourse and Focus-line tests.
- 📁 Files: listed above.
- 🔁 Next prompts: the owner merges #360 and this PR.
- 🧠 Reflection: the corpus is fully authored for the 12 started courses. Their real bottleneck is the owner's G3 sign-off (78 units), which the crew cannot speed up.

## Handoff (for CEO and agents)

- Shipped / changed: crew course focus.
- Decisions the team must respect:
  - One new course at a time.
  - "Finished" means no crew work left. `gate_red` and `blocked` do not hold the crew.
  - The owner's `crew prioritise` overrides the focus.
- Pending / next owner:
  - Owner: merge this PR (protected `scripts/crew/`).
  - Optional: an ADR for the scheduling policy (`/sp.adr crew-course-focus`), suggested and not created.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): test:crew PASS; dry run PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): show per-course "done for the crew / waits on owner" counts in the digest.
