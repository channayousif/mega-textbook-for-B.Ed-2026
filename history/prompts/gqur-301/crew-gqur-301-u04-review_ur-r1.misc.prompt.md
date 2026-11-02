---
id: crew-gqur-301-u04-review_ur-r1
title: crew review_ur GQUR-301 unit 4
stage: misc
date: 2026-11-02
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u04-review_ur-r1
user: crew
command: crew review_ur
labels: ["crew", "agy", "review_ur"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/crew-gqur-301-u04-review_ur-r1.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-04/G5/0333a7a5-e17d-4366-9d59-35aaff232a33.json
 - specs/content/gqur-301/reviews/unit-04/G5/0333a7a5-e17d-4366-9d59-35aaff232a33.summary.md
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/advisory-tracker-row.md
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/check-figures.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/exit-codes.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/independent-urdu-mcq-derivation.md
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/measure-figure-text.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/render-review.txt
 - specs/content/gqur-301/reviews/unit-04/G5/logs-0333a7a5/validate-content.txt
 - specs/content/gqur-301/reviews/unit-04/G5/prep-0333a7a5/manifest.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u04-review_ur-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u04-review_ur-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of GQUR-301 Unit 4 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-04/`.

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

Completed independent G5 Urdu review of GQUR-301 Unit 4, generating validated advisory escalate evidence, summary, gate logs, independent MCQ derivations, and PHR.

## Outcome

- Impact: review_ur for GQUR-301 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed independent G5 Urdu review of GQUR-301 Unit 4, generating validated advisory escalate evidence, summary, gate logs, independent MCQ derivations, and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Repair F1 in topic-01.mdx:34 and topic-02.mdx:34 by adding Urdu children to Glossary tags (<Glossary term="Mean">حسابی اوسط</Glossary> and <Glossary term="Median">وسطانیہ</Glossary>).
  - Real browser rendering of Urdu pages (desktop, 360px viewport, A4 print) remains unverified and must be run on a browser-capable host before G5 certification.
  - The curriculum owner should review candidate terms in concepts/unit-04.md (مرکزی رجحان کی پیمائش, حسابی اوسط, تعددی جدول کی اوسط, غیر معمولی قدر, وسطانیہ, وسطانیہ کی پائیداری) for promotion into terminology.csv.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
