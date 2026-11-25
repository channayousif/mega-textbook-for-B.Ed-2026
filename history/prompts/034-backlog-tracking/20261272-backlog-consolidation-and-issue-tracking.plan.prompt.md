---
id: 20261272
title: Backlog consolidation and GitHub issue tracking
stage: plan
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-backlog-tracking
user: M Yousif Channa
command: plan mode, then sp.taskstoissues flow via scripts/issue-sync.mjs
labels: [board-direct, tracking, backlog]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/863
files:
  - specs/034-backlog-tracking/spec.md
  - specs/034-backlog-tracking/plan.md
  - specs/034-backlog-tracking/tasks.md
  - scripts/issue-sync.mjs
  - tests/unit/issue-sync.test.mjs
  - .github/ISSUE_TEMPLATE/task.yml
  - .github/ISSUE_TEMPLATE/config.yml
  - AGENTS.md
  - specs/backlog.md
  - specs/001-content-platform/tasks.md
  - specs/013-authoring-system-v2/tasks.md
  - specs/014-agent-review-governance/tasks.md
  - specs/018-author-geng300/tasks.md
  - specs/019-author-gnas-301/tasks.md
  - specs/020-author-gict-300/tasks.md
  - specs/021-author-gqur-300/tasks.md
  - specs/022-author-efmp-301/tasks.md
  - specs/027-video-studio/tasks.md
  - specs/028-news-ticker/tasks.md
  - specs/029-notebook-studio/tasks.md
  - specs/032-textbook-visuals/tasks.md
  - specs/maintenance/vscode-containment/tasks.md
tests:
  - tests/unit/issue-sync.test.mjs (4 passed)
  - node scripts/issue-sync.mjs reports "All tasks are in step with issues."
---

## Prompt

create a plan with stages and proper tracking to complete the previous plans and tasks which could not be completed due to some reason. the problem is that in each plan few tasks remain incomplete and they are piled up. also add the new tasks, ensure a tracking system. my proposal is convert each task in to issue with tasktoissue skill to create github issues which can be tracked and solutions may be discussed. the new tasks:

Admin guide should be for admin only, not for student or teacher. fix

In the main menu, contact page is wrongly labelled as "institutions". fix

create a floating notes widget for taking notes for students and teachers with link to the dashboard section.

re-arrange the landing page, hero section should be in the full view, currently viewer has to scroll to view it due to news ticker and top menu. 

in mobile view, replace the user profile name with round icon with initial letter to save te space, show only search icon, language and profile icon, so that the textbook logo can breath. 

instead of Choose programme, say Explore the course catalogue

optimize images on landing page for speed, specially for mobile view

the Learning aids and Features section slide the cards into carousel instead of grid.

the last section "Start with one topic today" change "Choose programme" to Explore the course catalogue. Also Improve the moving character. it looks too basic and feels confusing sometime.

there must be a section for "Become a reviewer" link. it may be framed in persuasive language to help us to find errors/iprovements in the content. 

for the pages whose Urdu translation is not available, gray-out the language toggle tool and add callout box informing the translation is not available yet.

the unit assessment page: format the different questions properly with MCQ cards listing stem and choices properly with Radio(for single option) and checkboxes(for multi select). also CRQ and ERQ cards. the mcq section duplication on https://textbook.com.pk/semester-1/geng-300/unit-02/unit-assessment/ is observed, the latter mcqs card seems to be promising, it can be extended to all courses/units.

## Response snapshot

Planned in plan mode (owner rulings: scope "Everything", tracking "labels + milestones + board",
admin guide moves into /app/admin). Built Feature 034 (033 was taken): spec, plan and one
consolidated tasks.md with 67 open tasks across stages 2-6 (12 new site tasks, carried-over tasks
from 001/013/014/027/028/029/032/vscode-containment, 14 still-relevant backlog items, 21 open
curriculum gaps). Added `scripts/issue-sync.mjs` (drift report plus idempotent `--create`, the
sp.taskstoissues flow via gh since no GitHub MCP is connected) with tests. Created 14 area, 4 type,
3 priority and a `blocked:owner` label, five stage milestones, and issues #796-#862; numbers are
written back on the 034 task lines and on the original spec lines. Closed superseded plans 018-022
as `[-]`, added a triage table to specs/backlog.md, and an AGENTS.md rule that leftover tasks carry
an issue number.

## Outcome

- ✅ Impact: every unfinished task is a GitHub issue with a stage milestone and labels; drift is reportable.
- 🧪 Tests: issue-sync unit tests pass; drift report clean.
- 📁 Files: see list above.
- 🔁 Next prompts: board created (project 4, 67 issues: 44 Blocked on owner, 23 Todo); start Stage 2 (#797-#799).
- 🧠 Reflection: the local checkout was stale; the inventory had to come from origin/main. Several backlog items and the 029 YouTube task were already delivered.

## Handoff (for CEO and agents)

- Shipped / changed: Feature 034 tracking system; issues #796-#862; milestones Stage 2-6; labels area:/type:/priority:/blocked:owner.
- Decisions the team must respect: unticked tasks at PR end carry `(#N)`; PRs use `Closes #N`; `- [-]` means closed as superseded; `specs/content/` trackers are exempt; T021 (assessment cards) must not edit unit MDX or expose answer keys; T034 and T044 edit gate scripts and need the owner's timing.
- Pending / next owner: owner grants the project scope (T006) and works the blocked:owner issues in Stage 6; agents take Stage 2, then 3 and 4.
- Paperclip issues affected: none (Paperclip retired); GitHub issues #796-#862 created.

## Evaluation notes (flywheel)

- Failure modes observed: stale local checkout would have reported specs 011 and 031 as unfinished.
- Graders run and results (PASS/FAIL): vitest issue-sync PASS; issue-sync drift report PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): run `issue-sync.mjs` from the crew daily digest.
