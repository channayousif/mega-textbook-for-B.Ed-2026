---
id: crew-efmp-406-u06-review_ur
title: crew review_ur EFMP-406 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: efmp-406
branch: crew/efmp-406-u06-review_ur
user: crew
command: crew review_ur
labels: ["crew", "agy", "review_ur"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/crew-efmp-406-u06-review_ur.misc.prompt.md
 - specs/content/efmp-406/reviews/unit-06/G5/5b89c8ab-b21b-47d8-a039-009f638815d0.json
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/advisory-tracker-row.md
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/check-depth-gate.log
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/check-docs-sync.log
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/check-figures.log
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/check-no-answer-keys.log
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/check-no-em-dash.log
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/independent-urdu-mcq-derivation.md
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/manifest.json
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/render-review.txt
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/summary.md
 - specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/validate-content.log
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u06-review_ur

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u06-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of EFMP-406 Unit 6 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Completed independent G5 Urdu review for EFMP-406 Unit 6, producing a validated escalate report, evidence bundle, and advisory tracker row highlighting content omission in topic-02.mdx:46 and headless render constraints.

## Outcome

- Impact: review_ur for EFMP-406 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed independent G5 Urdu review for EFMP-406 Unit 6, producing a validated escalate report, evidence bundle, and advisory tracker row highlighting content omission in topic-02.mdx:46 and headless render constraints.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F1 blocking content defect: `topic-02.mdx:46` contains a truncated sentence dropping the clause translation for supported word reading (`اگر بچہ اس جملے کو پڑھ نہیں سکتا، ۔`), and `topic-01.mdx:76` omits words in the three-question list (`کردار ہے؟`).
  - Real browser rendering (desktop, 360px mobile, A4 print) was unverified under crew brief tool restrictions; an authorised browser session must inspect Nastaliq shaping and RTL layout before qualification.
  - Automated G5 certification remains open because the G3 dependency is an unsigned human desk review (CMY) and the earlier automated G3 manifest is stale against post-review commits.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
